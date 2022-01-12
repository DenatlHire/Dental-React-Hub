import React from "react";
import "./styles/main.css";
import Contact from "./Contact";

const Sidebar = ({ conversations, currentUserId }) => {
	return (
		<aside className="sidebar">
			{/* <div className="search-wrapper">
				<div className="search-icons">
					<Icon id="search" className="search-icon" />
					<button className="search__back-btn">
						<Icon id="back" />
					</button>
				</div>
				<input className="search" placeholder="Search or start a new chat" />
			</div> */}
			<div className="sidebar__contacts pt-5">
				{conversations?.map((convo, index) => (
					<Contact key={index} convo={convo} currentUserId={currentUserId} />
				))}
			</div>
		</aside>
	);
};

export default Sidebar;
