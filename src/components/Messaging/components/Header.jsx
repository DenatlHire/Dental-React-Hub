import React from "react";

const Header = ({ user, currentUserId }) => {
	// Ping every time user opens chat??
	const [actualOtherParticipant] = [user?.participant, user?.otherParticipant].filter(p => p?.id !== currentUserId)
	const hasName = actualOtherParticipant?.firstname || actualOtherParticipant?.lastname;

	return (
		<header className="header chat__header py-4">
			{/* <div className="chat__avatar-wrapper">
				<img src={user.profile_picture} alt={user?.name} className="avatar" />
			</div> */}

			<div className="chat__contact-wrapper mx-3">
				<div className="chat__contact-name h1 text-black">{hasName ? (`${actualOtherParticipant?.firstname} ${actualOtherParticipant?.lastname}`) : actualOtherParticipant?.username} &bull; {actualOtherParticipant?.role}</div>
			</div>
		</header>
	);
};

export default Header;
