import React from "react";
import { Link } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
// import { useUsersContext } from "context/usersContext";
import personPng from './assets/person.png';
import {useActualOtherParticipant} from '../../hooks/useActualOtherParticipant';

const Contact = ({ convo, currentUserId }) => {
	// const actualRecipientId = [convo.participant?.user_id, convo.otherParticipant?.user_id].find(p => (p?.user_id || p) !== currentUserId)

	// const userUrl = actualRecipientId ? `users/${actualRecipientId?.id || actualRecipientId}` : undefined;
	// const [user, , userLoading] = useAxios(userUrl, { loadingByDefault: true });

	const [user, userLoading] = useActualOtherParticipant(convo, currentUserId);

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
					<h2 className="sidebar-contact__name mb-0">{getNameLine(user)}</h2>
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

	function getNameLine(user) {
		if (!user) {
			return [];
		}

		return (user.firstname || user.lastname)
			? [user.firstname, user.lastname].join(' ')
			: [user.clinicname, user.practice_type].join(' • ')
	}
};

export default Contact;
