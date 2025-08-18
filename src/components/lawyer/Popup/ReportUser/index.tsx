import React from 'react';
import './modal-popup.css';

export default function ReportUser() {
	return (
		<div className="report-user-modal-wrapper">
			<p className="text-sonic-silver weight-medium font-small ">Select a reason:</p>
			<div className="form-fild-des">
				<label className="social-link font-small weight-medium w-100 mt-2">
					<input type="checkbox" />
					<span className="checkmark"></span>
					Inappropriate/Offensive
				</label>
				<label className="social-link font-small weight-medium w-100 mt-2">
					<input type="checkbox" />
					<span className="checkmark"></span>
					Spam (ads, self-promotion)
				</label>
				<label className="social-link font-small weight-medium w-100 mt-2">
					<input type="checkbox" />
					<span className="checkmark"></span>
					Other
				</label>
				<textarea rows={3} placeholder="Please state a reason..." className="w-100"></textarea>
			</div>
		</div>
	);
}
