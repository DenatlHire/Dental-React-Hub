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

import axios from "axios";
import { groupBy } from "lodash";
import dayjs from "dayjs";
import Sidebar from './components/Sidebar';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

const Messaging = () => {
	const { id: targetConversationId } = useParams();
	const history = useHistory()

	const lastMsgRef = useRef(null);
	const [messageHistory, setMessageHistory] = useState([]);

	const [conversations, setConversations] = useState([]);
	const [currentUser, setCurrentUser] = useState({});

	useEffect(() => {
		getCurrentUser();

		async function getCurrentUser() {
			const userMeResp = await axios.get('/users/me');
			setCurrentUser(userMeResp?.data);
		}
	}, []);

	useEffect(() => {
		getConversations();

		async function getConversations() {
			const conversationResp = await axios.get('/conversation');
			setConversations(conversationResp?.data);

			if (!targetConversationId) {
				history.push(`/messaging/${conversationResp?.data?.[0]?.id}`)
			}
		}
	}, [targetConversationId]);

	console.log({
		conversations
	})

	const [selectedUser] = useMemo(() =>
		conversations?.filter((conv) => conv.id === Number(targetConversationId))
	);

	console.log({
		selectedUser,
		targetConversationId
	})

	// useEffect(() => {
	// 	if (!user) history.push("/");
	// 	else {
	// 		scrollToLastMsg();
	// 		setUserAsUnread(user.id);
	// 	}
	// }, []);

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
				<Sidebar conversations={conversations} currentUserId={currentUser?.id} />
				<div className="chat">
					<div className="chat__body">
						<div className="chat__bg"></div>

						{/* Top Header */}
						<Header user={selectedUser} currentUserId={currentUser?.id} />

						{/* Displayed Chat Messages Section */}
						<div className="chat__content">
							<Convo lastMsgRef={lastMsgRef} messages={calanderDateByMessage} currentUserId={currentUser?.id} />
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
		if (targetConversationId) {
			await axios.post('/chat-message', {
				message,
				conversationId: targetConversationId, // if exists just provide this
			});

			const convoMessagesResp = await axios.get(`/conversation/${targetConversationId}`);
			setMessageHistory(convoMessagesResp?.data);
			scrollToLastMsg();
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
