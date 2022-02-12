import React, { useState } from "react";
import Icon from "../components/Icon";

const ChatInput = ({
	onSubmit,
}) => {
	const [message, setMessage] = useState();
	return (
		<div className="chat__input-wrapper px-5 mx-2 my-3">
			<textarea
				style={{ resize: 'none' }}
				className="chat__input"
				placeholder="Type a message"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				// onKeyDown={detectEnterPress}
				rows="2"
				spellCheck={'true'}
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
