import React from "react";

const Header = ({ convo, currentUserId }) => {
	const participantUserInfo = convo?.participant;
	const otherParticipantUserInfo = convo?.otherParticipant;
	const actualOtherUserInfo = [participantUserInfo, otherParticipantUserInfo].find(p => p?.user_id?.id !== currentUserId)

	return (
		<header className="header chat__header py-4">
			{/* <div className="chat__avatar-wrapper">
				<img src={user.profile_picture} alt={user?.name} className="avatar" />
			</div> */}

			<div className="chat__contact-wrapper mx-3">
				<div className="chat__contact-name h1 text-black">{
					actualOtherUserInfo?.user_id?.firstname || actualOtherUserInfo?.user_id?.lastname
						? (`${actualOtherUserInfo?.user_id?.firstname} ${actualOtherUserInfo?.user_id?.lastname}`)
						: actualOtherUserInfo?.user_id?.clinicname} &bull; {actualOtherUserInfo?.practice_type}
				</div>
			</div>
		</header>
	);
};

export default Header;
