import React from 'react';
import {ToastContainer} from 'react-toastify';
// import "./toastr.css"
import 'react-toastify/dist/ReactToastify.css';

export default function ToastrContainer() {
	return (
		<div className="toastr-wrapper">
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored"
			/>
		</div>
	);
}
