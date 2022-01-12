import React, { Fragment } from "react";

import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat)

const Convo = ({ lastMsgRef, messages: calanderDateByMessage, currentUserId }) => {
	const formattedDatesSorted = Object.keys(calanderDateByMessage).sort((a, b) => dayjs(a).isAfter(b) ? 1 : -1)

	return formattedDatesSorted.map((formattedDate, dateIndex) => {
		const messages = calanderDateByMessage[formattedDate];
		return (
			<div key={`msgs-${dateIndex}`} className="d-flex flex-column w-100">
				<div className="chat__date-wrapper">
					<span className="chat__date"> {dayjs(formattedDate).format('MMMM D, YYYY')}</span>
				</div>
				<div className="chat__msg-group d-flex flex-column w-100">
					{messages.map((message, msgIndex) => {
						const assignRef = () =>
							dateIndex === formattedDatesSorted.length - 1 && msgIndex === messages.length - 1
								? lastMsgRef
								: undefined;

						const isCurrentUserMessage = parseInt(message.senderId, 10) !== currentUserId;
						return (
							<div className="my-1">
								<div className="d-flex">
									<div className={`mr-3 sidebar-contact__avatar-wrapper-small ${!isCurrentUserMessage ? 'hide-contact' : ''} align-self-end mb-2`}>
										<img
											src={'data:image/png;base64,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'}
											alt={message.profile_picture}
											className="avatar"
										/>
									</div>
									{isCurrentUserMessage ? (
										<div className="chat__msg chat__msg--rxd p-5 w-100">
											<span>{message.message}</span>
											<span className="chat__msg-filler"> </span>
											<span className="chat__msg-footer">
												{dayjs(message.createdAt).format('LT')}
											</span>
										</div>
									) : (
										<p className="chat__msg chat__msg--sent p-5 w-100">
											<span>{message.message}</span>
											<span className="chat__msg-filler"> </span>
											<span className="chat__msg-footer">
												<span className="text-white">{dayjs(message.createdAt).format('LT')} </span>
											</span>
										</p>
									)}

									<div className={`ml-3 sidebar-contact__avatar-wrapper-small ${isCurrentUserMessage ? 'hide-contact' : ''} align-self-end mb-2`}>
										<img
											src={'https://bondprinting.com/wp-content/uploads/2019/03/placeholder-face-big.png'}
											alt={message.profile_picture}
											className="avatar"
										/>
									</div>

									{/* Scroll to this anchor placed below the chat */}
									<div ref={assignRef()} style={{ position: 'absolute', top: '115%', left: 0 }}></div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	});
};

export default Convo;


function Divider(props) {
	return props.title
		? (
			<Fragment>
				<div className="col"><hr /></div>
				<div className="col-auto">{props.title}</div>
				<div className="col"><hr /></div>
			</Fragment>
		) : <hr />
}
