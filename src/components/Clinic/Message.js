import React,{useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// function Alert(props) {
// 	return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const FlashMessage = ({ message,messageType }) => {
	const [state, setState] =useState({
		open: true,
		vertical: 'top',
		horizontal: 'right'
	});

	const { vertical, horizontal, open } = state;

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	return (
		<div>
		  <Snackbar key={vertical + horizontal} anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={handleClose}>
		  <Alert onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
				{message}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default FlashMessage;
