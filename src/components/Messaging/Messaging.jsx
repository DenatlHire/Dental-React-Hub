import React, { useEffect, useRef, useState, useMemo } from "react";
import "./styles/main.css";
import "./styles/common.css";
import "./styles/overrides.css";

import ChatInput from "./components/ChatInput";
import Header from "./components/Header";
import Icon from "./components/Icon";
import Convo from "./components/Convo";
import { useInterval } from 'ahooks';
import { useParams, useHistory } from "react-router-dom";
import { useQuery } from './hooks/useQuery';
import { useAxios } from './hooks/useAxios';

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
	const query = useQuery();

	const [messageHistory, setMessageHistory] = useState([]);

	const [conversations, conversationsLoading] = useConversations(targetConversationId);
	const [currentUserInfo] = useCurrentUserInfo();

	const recipientId = parseInt(query.get('recipient'));

	const [draftRecipientUserInfo] = useDraftRecipientUserInfo(conversations, recipientId, conversationsLoading, targetConversationId);

	const selectedConvo = useMemo(() =>
		conversations?.find((conv) => conv.id === Number(targetConversationId)));

	useEffect(() => {
		messageHistory?.length && scrollToLastMsg();
	}, [messageHistory?.length]);

	const messageChecks = useRef(0);

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
				const convoMessagesResp = await axios.get(`/conversation/${targetConversationId}`);
				setMessageHistory(convoMessagesResp?.data);
			}
		}
	}, targetConversationId ? 25 * 1000 : null, { immediate: true });

	const calanderDateByMessage = useMemo(() => groupBy(messageHistory, chatMsg => {
		const dayDate = dayjs(chatMsg.createdAt);
		return `${dayDate.year()}-${dayDate.month() + 1}-${dayDate.day() + 1}`; // YYYY-MM-DD
	}), [messageHistory?.length]);

	return (
		<>
			<div className="my-5" style={{ height: '100px' }} />
			<div className="chat-container h-100 overflow-hidden" style={{ maxWidth: '1200px', minHeight: '700px', maxHeight: '800px' }}>
				<Sidebar
					conversations={currentUserInfo && draftRecipientUserInfo
						? [{ id: 'draft', participant: currentUserInfo, otherParticipant: draftRecipientUserInfo }, ...conversations]
						: conversations}
					currentUserId={currentUserInfo?.user_id}
				/>
				<div className="chat">
					<div className="chat__body">
						<div className="chat__bg" />

						{/* Top Header */}
						<Header convo={selectedConvo} currentUserId={currentUserInfo?.user_id} />

						{/* Displayed Chat Messages Section */}
						<div className="chat__content">
							<Convo lastMsgRef={lastMsgRef} messages={calanderDateByMessage} currentUserId={currentUserInfo?.user_id} />
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
			<div className="py-5" style={{ height: '200px' }} />
		</>
	);

	async function onSubmitMessage(message) {
		if (targetConversationId && targetConversationId !== 'draft') {
			await axios.post('/chat-message', {
				message,
				conversationId: targetConversationId, // if exists just provide this
			});

			const convoMessagesResp = await axios.get(`/conversation/${targetConversationId}`);
			setMessageHistory(convoMessagesResp?.data);
			scrollToLastMsg();
		} else {
			if (draftRecipientUserInfo) {
				const convoMessagesResp = await axios.post('/chat-message', {
					message,
					otherParticipant: draftRecipientUserInfo.id,
				});
				setMessageHistory(convoMessagesResp?.data);
				scrollToLastMsg();
				history.push(`/messaging`);
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
	const [currentUser, , loadingCurrentUser] = useAxios('/users/me', { loadingByDefault: true });
	const currentUserInfoQuery = !loadingCurrentUser && currentUser
		? `/user-informations?user_id=${currentUser.id}`
		: undefined;
	const [currentUserInfo,] = useAxios(currentUserInfoQuery, { loadingByDefault: true });
	return [currentUserInfo];
}

function useConversations(targetConversationId) {
	const history = useHistory()

	const [convs, , loadingConversations] = useAxios('conversation', { loadingByDefault: true });
	useEffect(() => {
		const latestConversation = conversations?.[0];
		if (targetConversationId && latestConversation?.id) {
			history.push(`/messaging/${latestConversation?.id}`);
		}
	}, [convs]);
	const conversations = convs || [];
	return [conversations, loadingConversations]
}

function useDraftRecipientUserInfo(conversations, recipientId, loadingConversations, targetConversationId) {
	const history = useHistory();

	useEffect(() => {
		if (!loadingConversations && recipientId) {
			const hasUserBeenMessagedBefore = !!conversations.find(c => c.participant.user_id === recipientId || c.otherParticipant.user_id === recipientId);
			if (!hasUserBeenMessagedBefore) {
				history.push(`/messaging/draft?recipient=${recipientId}`);
			}
		}
	}, [recipientId, loadingConversations]);

	const draftRecipientId = targetConversationId === 'draft' ? recipientId : undefined;
	const draftUserUrl = draftRecipientId ? `/user-informations?user_id=${draftRecipientId}` : undefined;

	const [draftRecipientUserInfoList, , loadingDraftRecipient] = useAxios(draftUserUrl, { loadingByDefault: true });
	const draftRecipientUserInfo = draftRecipientUserInfoList?.[0];
	return [draftRecipientUserInfo];
}