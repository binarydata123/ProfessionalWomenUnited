import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { createLawyerInquiresByAdmin } from '../../../../../lib/adminapi';
import { toast } from 'react-toastify';
import AuthContext from '@/context/AuthContext';

interface FormData {
	inquiry_by_member_id: string;
	inquiry_to_member_id: string;
	message: string;
	message_type: string;
}

export default function SendMessage(props: any) {
	const { user } = useContext(AuthContext)
	const lawyerid = props.lawyerId;

	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const [formData, setFormData] = useState<FormData>({
		inquiry_by_member_id: '',
		inquiry_to_member_id: '',
		message: '',
		message_type: ''
	});

	const [user_id, setUserId] = useState('');

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (user)
			user?.id ? setUserId(user?.id) : setUserId('');
	}, []);

	function validateForm() {
		const newErrors: { [key: string]: string } = {};
		if (!formData.message) {
			newErrors.message = 'Please enter a msg';
		}

		if (!formData.message_type) {
			newErrors.message_type = 'Please choose a platform';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setFormData({ ...formData, message_type: value });
	};

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
		const isValid = validateForm();
		if (isValid) {
			const data = {
				lawyer_id: lawyerid,
				user_id: user_id,
				message: formData.message,
				message_type: formData.message_type // Add message to data
			};

			try {
				createLawyerInquiresByAdmin(data)
					.then(res => {
						if (res.status == true) {
							toast.success(res.message);
							setFormData({ ...formData, message: '' });
							props.closeSendMessagePopup();
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
		<div className="send-message-wrapper">
			<div className="row">
				<div className="col-8">
					<p className="text-sonic-silver weight-medium font-small ">Write a message*</p>
				</div>
				{/* <div className="col-4 text-right">
          <p className="Chinese-silver font-x-small weight-light">2000</p>
        </div> */}
			</div>
			<form onSubmit={handleSubmit}>
				<div className="form-fild-des">
					<textarea
						placeholder="Write message here.."
						className="form-fild  w-100 h-175"
						value={formData.message}
						onChange={e => setFormData({ ...formData, message: e.target.value })}
					>
						{' '}
					</textarea>
					{errors.message && <small className="error-message text-danger d-block">{errors.message}</small>}
					<div className="row mt-2">
						<div className="col-sm-12">
							<p className="text-sonic-silver weight-medium font-small mb-2">
								How would you like to send this message?
							</p>
						</div>
						<div className="col-md-5">
							<label className="social-link font-small weight-medium w-100 mt-2">
								<input
									type="radio"
									value="inplatform"
									name="message_type"
									onChange={handleRadioChange}
								/>
								<span className="checkmark"></span>
								In Platform
							</label>
						</div>
						<div className="col-md-4">
							<label className="social-link font-small weight-medium w-100 mt-2">
								<input type="radio" value="email" name="message_type" onChange={handleRadioChange} />
								<span className="checkmark"></span>
								Email
							</label>
						</div>
						<div className="col-md-3">
							<label className="social-link font-small weight-medium w-100 mt-2">
								<input type="radio" value="both" name="message_type" onChange={handleRadioChange} />
								<span className="checkmark"></span>
								Both
							</label>
						</div>
					</div>

					{errors.message_type && (
						<small className="error-message text-danger d-block">{errors.message_type}</small>
					)}

					<div className="text-end float-end ">

						<Button className="modal-ok-button text-white mt-2 mx-2" onClick={props.closeSendMessagePopup}>
							Cancel
						</Button>
						<Button
							type="submit"
							className="modal-cancel-button modal-ok-button text-white mt-2"
							disabled={isLoading}
						>
							{isLoading ? 'Please wait...' : 'Send'}
						</Button>
					</div>
				</div>
			</form >
		</div >
	);
}
