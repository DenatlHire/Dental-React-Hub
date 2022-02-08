import React from "react";
import { useActualOtherParticipant } from '../hooks/useActualOtherParticipant';

const Header = ({ convo, currentUserId }) => {
	// Ping every time user opens chat??
	const [actualUser, isActualUserLoading] = useActualOtherParticipant(convo, currentUserId)

	return (
		<header className="header chat__header py-4">
			{/* <div className="chat__avatar-wrapper">
				<img src={user.profile_picture} alt={user?.name} className="avatar" />
			</div> */}

			<div className="chat__contact-wrapper mx-3">
				<div className="chat__contact-name h1 text-black">{
					actualUser?.firstname || actualUser?.lastname
						? (`${actualUser?.firstname} ${actualUser?.lastname}`)
						: actualUser?.clinicname} &bull; {actualUser?.practice_type}
				</div>
			</div>
		</header>
	);
};

export default Header;
