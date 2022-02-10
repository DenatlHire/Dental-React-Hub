import React, { useEffect, useRef, useMemo } from "react";
import "./styles/main.css";
import "./styles/common.css";
import "./styles/overrides.css";

import ChatInput from "./components/ChatInput";
import Header from "./components/Header";
import Icon from "./components/Icon";
import Convo from "./components/Convo";
import { useInterval } from 'ahooks';
import { useParams, useHistory } from "react-router-dom";
import { useUrlSearchParams } from './hooks/useUrlSearchParams';
import { useQuery } from 'react-query';

import axios from "axios";
import { groupBy } from "lodash";
import dayjs from "dayjs";
import Sidebar from './components/Sidebar';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);


const Messaging = () => {
	const lastMsgRef = useRef(null);
	const history = useHistory();
	const { id: targetConversationId } = useParams();
	const searchParams = useUrlSearchParams();
	const recipientId = parseInt(searchParams.get('recipient'));

	const [conversations, conversationsLoading, refetchConversations] = useConversations(targetConversationId);
	const [currentUserInfo] = useCurrentUserInfo();

	const { data: messageHistory, refetch: refreshMessages } = useQuery(
		['convo-messages', 'conversation', targetConversationId], 
		fetchConversationMessages, 
		{ enabled: !!targetConversationId }
	);

	const [draftRecipientUserInfo] = useDraftRecipientUserInfo(conversations, recipientId, conversationsLoading, targetConversationId);

	const selectedConvo = useMemo(() =>
		conversations?.find((conv) => conv.id === Number(targetConversationId)));

	useEffect(() => {
		messageHistory?.length && scrollToLastMsg();
	}, [messageHistory?.length]);

	const messageChecks = useRef(0);

	// TODO: when user submits a new message allow them to fetch again
	useInterval(() => {
		rehydrateConversationMessages();

		async function rehydrateConversationMessages() {
			// reduce requests to the server
			if (messageChecks.current > 8) {
				setTimeout(() => {
					messageChecks.current = 0;
				}, 90 * 1000);
			} else {
				messageChecks.current = messageChecks.current + 1;
				refreshMessages();
			}
		}
	}, targetConversationId ? 25 * 1000 : null, { immediate: true });

	const messageIds = messageHistory?.map(m => m.id).join();
	const calanderDateByMessage = useMemo(() => groupBy(messageHistory, chatMsg => {
		const dayDate = dayjs(chatMsg.createdAt);
		return `${dayDate.year()}-${dayDate.month() + 1}-${dayDate.day() + 1}`; // YYYY-MM-DD
	}), [messageIds]);

	return (
		<>
			<div className="my-5" style={{ height: '100px' }} />
			<div className="chat-container h-100 overflow-hidden mb-5" style={{ maxWidth: '1200px', minHeight: '700px', maxHeight: '800px' }}>
				<Sidebar
					conversations={currentUserInfo && draftRecipientUserInfo
						? [{ id: 'draft', participant: currentUserInfo, otherParticipant: draftRecipientUserInfo }, ...conversations]
						: conversations}
					currentUserId={currentUserInfo?.user_id?.id}
				/>
				<div className="chat">
					<div className="chat__body">
						<div className="chat__bg" />

						{/* Top Header */}
						<Header convo={selectedConvo} currentUserId={currentUserInfo?.user_id?.id} />

						{/* Displayed Chat Messages Section */}
						<div className="chat__content">
							<Convo lastMsgRef={lastMsgRef} messages={calanderDateByMessage} currentUserId={currentUserInfo?.user_id?.id} />
						</div>

						{/* New Message Input Section */}
						<div className="chat__footer">
							<button
								className="chat__scroll-btn"
								aria-label="scroll down"
								onClick={scrollToLastMsg}
							>
								<Icon id="downArrow" />
							</button>
							<ChatInput
								onSubmit={onSubmitMessage}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="my-5" style={{ height: '220px' }} />
		</>
	);

	async function onSubmitMessage(message) {
		if (targetConversationId && targetConversationId !== 'draft') {
			await axios.post('/chat-message', {
				message,
				conversationId: targetConversationId, // if exists just provide this
			});

			refreshMessages();
			scrollToLastMsg();
		} else {
			if (draftRecipientUserInfo) {
				const createNewChat = await axios.post('/chat-message', {
					message,
					otherParticipant: draftRecipientUserInfo.id,
				});

				refetchConversations();
				history.push(`/messaging/${createNewChat?.data?.conversation?.id}`);
				scrollToLastMsg();
			}
		}
	}

	function scrollToLastMsg() {
		lastMsgRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
			inline: 'end',
		});
	}
};

export default Messaging;

function useCurrentUserInfo() {
	const { data: currentUser, isLoading: loadingCurrentUser } = useQuery(['me', '/users/me'], fetchUrl, {
		enabled: true
	});
	const currentUserInfoQuery = !loadingCurrentUser && currentUser
		? `/user-informations?user_id=${currentUser.id}`
		: undefined;

	const { data: currentUserInfo } = useQuery(['currentUser', currentUserInfoQuery], fetchUrl, {
		enabled: !!currentUserInfoQuery
	});
	return [currentUserInfo?.[0]];
}

function useConversations(targetConversationId) {
	const history = useHistory()
	const { data, isLoading, refetch } = useQuery(['conversation'], fetchConversations, {
		enabled: true
	});
	useEffect(() => {
		const latestConversation = conversations?.[0];
		if (targetConversationId && latestConversation?.id) {
			history.push(`/messaging/${latestConversation?.id}`);
		}
	}, [data]);
	const conversations = data || [];
	return [conversations.sort((a, b) => b.id - a.id), isLoading, refetch]
}

function useDraftRecipientUserInfo(conversations, recipientId, loadingConversations, targetConversationId) {
	const history = useHistory();

	useEffect(() => {
		if (!loadingConversations && recipientId) {
			const hasUserBeenMessagedBefore = !!conversations.find(c => c.participant.user_id.id === recipientId || c.otherParticipant.user_id.id === recipientId);
			if (!hasUserBeenMessagedBefore) {
				history.push(`/messaging/draft?recipient=${recipientId}`);
			}
		}
	}, [recipientId, loadingConversations]);

	const draftRecipientId = targetConversationId === 'draft' ? recipientId : undefined;
	const draftUserUrl = draftRecipientId ? `/user-informations?user_id=${draftRecipientId}` : undefined;

	const { data } = useQuery(['draftUrl', draftUserUrl], fetchUrl, {
		enabled: !!draftUserUrl
	});
	const draftRecipientUserInfo = data?.[0];
	return recipientId ? [draftRecipientUserInfo] : [];
}

async function fetchUrl({ queryKey: [resource, url] }) {
	return (await axios.get(`${url}`)).data
}

async function fetchConversations({ queryKey: [resource] }) {
	return (await axios.get(`/${resource}`)).data
}

async function fetchConversationMessages({ queryKey: [, resource, id] }) {
	return (await axios.get(`/${resource}/${id}`)).data
}
