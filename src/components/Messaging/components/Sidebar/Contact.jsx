import React from "react";
import { Link } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
// import { useUsersContext } from "context/usersContext";
import personPng from './assets/person.png';

const Contact = ({ convo, currentUserId }) => {
	const participantUserInfo = convo?.participant;
	const otherParticipantUserInfo = convo?.otherParticipant;
	const actualOtherParticipantUserInfo = [participantUserInfo, otherParticipantUserInfo].find(p => p.user_id.id !== currentUserId)

	return (
		<Link
			className="sidebar-contact my-2"
			to={`/messaging/${convo.id}`}
			// onClick={() => setUserAsUnread(contact.id)}
		>
			<div className="sidebar-contact__avatar-wrapper">
				<img
					src={convo.profile_picture || personPng}
					alt={convo.profile_picture}
					className="avatar"
				/>
			</div>
			<div className="sidebar-contact__content">
				<div className="sidebar-contact__top-content">
					<h2 className="sidebar-contact__name mb-0">{getNameLine(actualOtherParticipantUserInfo)}</h2>
					{/* <span className="sidebar-contact__time">
						{formatTime(lastMessage.time)}
					</span> */}
				</div>
				<div className="sidebar-contact__bottom-content ">
					<p className="sidebar-contact__message-wrapper mb-0">
						<span
							className={`sidebar-contact__message ${!!convo.unread ? "sidebar-contact__message--unread" : ""}`}
						>
							{'some message'}
							{/* {lastMessage?.content || '...'} */}
						</span>
					</p>
					<div className="sidebar-contact__icons">
						{/* {!!convo.unread && (
							<span className="sidebar-contact__unread">{convo.unread}</span>
						)} */}
					</div>
				</div>
			</div>
		</Link>
	);

	function getNameLine(userInfo) {
		if (!userInfo) {
			return [];
		}

		return (userInfo.user_id.firstname || userInfo.user_id.lastname)
			? [userInfo.user_id.firstname, userInfo.user_id.lastname].join(' ')
			: [userInfo.user_id.clinicname, userInfo.practice_type].join(' • ')
	}
};

export default Contact;
