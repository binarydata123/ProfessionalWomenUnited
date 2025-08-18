import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { getLawyerReportAccountInfo, CreateOrUpdateLawyerReportAccount } from '../../../../../lib/adminapi';
import { toast } from 'react-toastify';
import AuthContext from '@/context/AuthContext';

interface FormData {
	report_type: string;
	report_msg: string;
}

export default function ReportAccount(props: any) {
	const { user } = useContext(AuthContext)
	const lawyerid = props.lawyerId;

	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const [formData, setFormData] = useState<FormData>({
		report_type: '',
		report_msg: ''
	});

	const [user_id, setUserId] = useState('');

	const [isLoading, setIsLoading] = useState(false);
	const [showTextArea, setShowTextArea] = useState(false);

	useEffect(() => {
		if (user)
			user?.id ? setUserId(user?.id) : setUserId('');
		fetchLawyerReportAccountInfo(user?.id, lawyerid);
	}, []);

	const fetchLawyerReportAccountInfo = async (userId: any, lawyerid: string) => {
		try {
			const res = await getLawyerReportAccountInfo(userId, lawyerid);
			if (res.status == true) {
				if (res.data.reason == 'other') {
					setFormData({
						...formData,
						report_type: res.data.reason,
						report_msg: res.data.message
					});
					setShowTextArea(true);
				} else {
					setFormData({
						...formData,
						report_type: res.data.reason,
						report_msg: res.data.message
					});
				}
			} else {
			}
		} catch (err) {
			console.log(err);
		}
	};

	function validateForm() {
		const newErrors: { [key: string]: string } = {};
		if (!formData.report_type) {
			newErrors.report_type = 'Please choose a reason';
		}

		if (formData.report_type == 'other' && formData.report_msg == '') {
			newErrors.report_msg = 'Please provide details for Other';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setFormData({ ...formData, report_type: value });

		// Show the textarea when "Other" is selected, hide it otherwise
		setShowTextArea(value === 'other');
	};

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
		const isValid = validateForm();
		if (isValid) {
			const data = {
				lawyer_id: lawyerid,
				user_id: user_id,
				reason: formData.report_type,
				message: formData.report_msg // Add message to data
			};

			try {
				CreateOrUpdateLawyerReportAccount(data)
					.then(res => {
						if (res.status == true) {
							toast.success(res.message);
							fetchLawyerReportAccountInfo(user_id, lawyerid);
							props.closeReportPopup();
						} else {
							toast.error(res.message);
						}
					})
					.catch(err => {
						if (err.response) {
							toast.error('An error occurred during registration');
						}
					})
					.finally(() => {
						setIsLoading(false);
					});
			} catch (error) {
				console.error(error);
				setIsLoading(false);
			}
		} else {
			setIsLoading(false);
		}
	}

	return (
		<div className="report-user-wrapper">
			<p className="text-sonic-silver weight-medium font-small ">Select a reason:</p>
			<form onSubmit={handleSubmit}>
				<div className="form-fild-des">
					<label className="social-link font-small weight-medium w-100 mt-2">
						<input
							type="radio"
							value="inappropriate/offensive"
							name="report_type"
							onChange={handleRadioChange}
							checked={formData.report_type === 'inappropriate/offensive'}
						/>
						<span className="checkmark"></span>
						Inappropriate/Offensive
					</label>
					<label className="social-link font-small weight-medium w-100 mt-2">
						<input
							type="radio"
							value="spam"
							name="report_type"
							onChange={handleRadioChange}
							checked={formData.report_type === 'spam'}
						/>
						<span className="checkmark"></span>
						Spam (ads, self-promotion)
					</label>
					<label className="social-link font-small weight-medium w-100 mt-2">
						<input
							type="radio"
							value="other"
							name="report_type"
							onChange={handleRadioChange}
							checked={formData.report_type === 'other'}
						/>
						<span className="checkmark"></span>
						Other
					</label>

					{errors.report_type && (
						<small className="error-message text-danger d-block">{errors.report_type}</small>
					)}

					{showTextArea && (
						<textarea
							placeholder="Write message here."
							className="form-fild w-100 h-175"
							value={formData.report_msg}
							onChange={e => setFormData({ ...formData, report_msg: e.target.value })}
						></textarea>
					)}

					{errors.report_msg && (
						<small className="error-message text-danger d-block">{errors.report_msg}</small>
					)}
					<div className="text-end float-end ">
						<Button className="modal-ok-button text-white mt-2 mx-2" onClick={props.closeReportPopup}>
							Cancel
						</Button>
						<Button
							type="submit"
							className="modal-cancel-button modal-ok-button text-white mt-2"
							disabled={isLoading}
						>
							{isLoading ? 'Please wait...' : 'Report'}
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
}
