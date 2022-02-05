import React, { useState } from "react";
import Icon from "../components/Icon";

const ChatInput = ({
	onSubmit,
}) => {
	const [message, setMessage] = useState();
	return (
		<div className="chat__input-wrapper px-5 my-3">
			<input
				className="chat__input ps-4"
				placeholder="Type a message"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyDown={detectEnterPress}
			/>
			<button disabled={!message} onClick={onSubmitLocal}>
				<Icon id="send" className="chat__input-icon" />
			</button>
		</div>
	);

	function detectEnterPress(e) {
		if (message && (e.key === "Enter" || e.keyCode === 13)) {
			onSubmitLocal()
		}
	}

	function onSubmitLocal() {
		onSubmit(message)
		setMessage('')
	}
};

export default ChatInput;
