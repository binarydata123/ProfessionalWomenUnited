'use client';
import React, { useContext, useEffect, useState } from 'react';
import './settings.css';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/20/solid';
import { changePassword, getNotificationSettings, updateNotificationSettings } from '../../../../lib/adminapi';
import { signOut } from 'next-auth/react';
import AuthContext from '@/context/AuthContext';

export default function Settings() {
	const { user, logout } = useContext(AuthContext)
	const router = useRouter();
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [user_id, setUserId] = useState('');
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [newsLetter, setNewsLetter] = useState('');
	const [announcement, setAnnouncement] = useState('');
	const [messageFromClient, setMessageFromClient] = useState('');
	const [recommendation, setRecommendation] = useState('');

	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);

	useEffect(() => {
		if (user)
			user?.id ? setUserId(user?.id) : setUserId('');

		handleGetSettings(user?.id);
	}, []);

	const handleUpdatePassword = async (user_id: any, newPassword: string) => {
		const isValid = validateForm();
		if (isValid) {
			try {
				const res = await changePassword(user_id, newPassword);
				if (res.success == true) {
					toast.success('password updated successfully');
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	const handleGetSettings = async (user_id: any) => {
		try {
			const res = await getNotificationSettings(user_id);
			setNewsLetter(res.data[0].newslatter);
			setAnnouncement(res.data[0].announcement);
			setMessageFromClient(res.data[0].message_from_client);
			setRecommendation(res.data[0].recommendation);
		} catch (err) {
			console.log(err);
		}
	};

	const handleNewsletter = () => {
		const newNewsletter = newsLetter === 'yes' ? 'no' : 'yes';
		setNewsLetter(newNewsletter);
		handleNotificationUpdate(user_id, newNewsletter, announcement, messageFromClient, recommendation);
	};

	const handleAnnouncement = () => {
		const newAnnouncement = announcement === 'yes' ? 'no' : 'yes';
		setAnnouncement(newAnnouncement);
		handleNotificationUpdate(user_id, newsLetter, newAnnouncement, messageFromClient, recommendation);
	};

	const handleMessageFromClient = () => {
		const newMessageFromClient = messageFromClient === 'yes' ? 'no' : 'yes';
		setMessageFromClient(newMessageFromClient);
		handleNotificationUpdate(user_id, newsLetter, announcement, newMessageFromClient, recommendation);
	};

	const handleRecommendation = () => {
		const newRecommendation = recommendation === 'yes' ? 'no' : 'yes';
		setRecommendation(newRecommendation);
		handleNotificationUpdate(user_id, newsLetter, announcement, messageFromClient, newRecommendation);
	};

	const handleNotificationUpdate = async (
		user_id: any,
		newslatter: string,
		announcement: string,
		messageFromClient: string,
		recommendation: string
	) => {
		try {
			const response = await updateNotificationSettings(
				user_id,
				newslatter,
				announcement,
				messageFromClient,
				recommendation
			);
			if (response.status === true) {
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	function redirectToLogin() {
		router.push('/auth/login');
	}
	function handleLogout(e: any) {
		e.preventDefault();
		logout()
		signOut({ redirect: false }).then();
		redirectToLogin();
	}

	function validateForm() {
		const newErrors: { [key: string]: string } = {};

		if (!newPassword) {
			newErrors.newPassword = 'Password is required';
		} else if (newPassword.length < 8) {
			newErrors.newPassword = 'Password should be at least 8 characters long';
		}
		if (!confirmPassword) {
			newErrors.confirmPassword = 'Confirm Password is required';
		} else if (confirmPassword.length < 8) {
			newErrors.confirmPassword = 'Password should be at least 8 characters long';
		} else if (newPassword !== confirmPassword) {
			newErrors.confirmPassword = 'Password and confirm password not matched';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	return (
		<div>
			<div className="right-body">
				<h4 className="font-xx-large social-link  weight-semi-bold mt-2">Settings</h4>
			</div>
			<hr className="hr-line mt-0" />

			<div className="right-body pt-0">
				<p className="font-small color-light mb-2 weight-medium">Account</p>
				<hr className="hr-line mt-0" />

				<div className="row mb-5">
					<div className="col-sm-6">
						<p className="font-large social-link weight-semi-bold m-font-20 mb-2  ">Change Password</p>
						<label className="font-small  weight-medium text-sonic-silver w-100">New Password*</label>
						<div className="icon-fild">
							<input
								type={showNewPassword ? 'text' : 'password'}
								placeholder="Password"
								className="form-fild  w-100 sp-right"
								value={newPassword}
								onChange={e => setNewPassword(e.target.value)}
							/>
							{/* <i className="fa-regular fa-eye"></i> */}
							<span
								className={`eye-icon position-absolute fafa_eye ${showNewPassword ? 'show' : ''}`}
								onClick={() => setShowNewPassword(!showNewPassword)}
							>
								{showNewPassword ? (
									<EyeSlashIcon className="icon-class" width={20} />
								) : (
									<EyeIcon className="icon-class" width={20} />
								)}
							</span>
							{errors.newPassword && (
								<small className="error-message text-danger">{errors.newPassword}</small>
							)}
						</div>

						<label className="font-small  weight-medium password-sonic-silver w-100 mt-4">
							Re-type Password*
						</label>
						<div className="icon-fild">
							<input
								type={showConfirmPassword ? 'text' : 'password'}
								placeholder="Confirm Password"
								className="form-fild  w-100 sp-right"
								value={confirmPassword}
								onChange={e => setConfirmPassword(e.target.value)}
							/>
							{/* <i className="fa-regular fa-eye"></i> */}
							<span
								className={`eye-icon position-absolute fafa_eye ${showConfirmPassword ? 'show' : ''}`}
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							>
								{showConfirmPassword ? (
									<EyeSlashIcon className="icon-class" width={20} />
								) : (
									<EyeIcon className="icon-class" width={20} />
								)}
							</span>
							{errors.confirmPassword && (
								<small className="error-message text-danger">{errors.confirmPassword}</small>
							)}
						</div>
						<button
							type="button"
							className="btn btn-outline-success text-center btn-lawyer mt-3 w-100"
							onClick={e => handleUpdatePassword(user_id, newPassword)}
						>
							Update Password
						</button>
					</div>
				</div>

				<p className="font-small color-light mb-2 weight-medium">Privacy</p>
				<hr className="hr-line mt-0" />
				<p className="font-large social-link weight-semi-bold m-font-20 mb-2  ">Privacy Policy</p>
				<p className="font-large social-link weight-semi-bold m-font-20 mb-2  ">Terms of Use</p>
				<p className="font-large social-link weight-semi-bold m-font-20 mb-2  ">Community Guidelines</p>
				<p className="font-large social-link weight-semi-bold m-font-20 mb-2  ">Legal Information</p>

				<div className="mt-5">
					<p className="font-small color-light mb-2 weight-medium">Notifications</p>
					<hr className="hr-line mt-0" />
					<div className="row">
						<div className="col-sm-10 col-9">
							<p className="font-large social-link weight-semi-bold m-font-18   ">Newsletter</p>
							<p className="font-small  weight-medium text-sonic-silver w-100">
								Subscribe to our newsletter to receive the latest updates, news, and promotions.
							</p>
						</div>
						<div className="col-sm-2 col-3 text-right">
							<div className="switch-btn mt-2">
								<label className="switch ">
									<input
										type="checkbox"
										checked={newsLetter === 'yes' ? true : false}
										onClick={handleNewsletter}
									/>
									<span className="slider round"></span>
								</label>
							</div>
						</div>
					</div>

					<div className="row mt-4">
						<div className="col-sm-10 col-9">
							<p className="font-large social-link weight-semi-bold m-font-18   ">Recommendations</p>
							<p className="font-small  weight-medium text-sonic-silver w-100">
								Allow us to provide you with personalized recommendations based on your usage.
							</p>
						</div>
						<div className="col-sm-2 col-3 text-right">
							<div className="switch-btn mt-2">
								<label className="switch ">
									<input
										type="checkbox"
										checked={recommendation === 'yes' ? true : false}
										onClick={handleRecommendation}
									/>
									<span className="slider round"></span>
								</label>
							</div>
						</div>
					</div>

					<div className="row mt-4">
						<div className="col-sm-10 col-9">
							<p className="font-large social-link weight-semi-bold m-font-18   ">Announcements</p>
							<p className="font-small  weight-medium text-sonic-silver w-100">
								Stay informed about important announcements, new features, and improvements.
							</p>
						</div>
						<div className="col-sm-2 col-3 text-right">
							<div className="switch-btn mt-2">
								<label className="switch ">
									<input
										type="checkbox"
										checked={announcement === 'yes' ? true : false}
										onClick={handleAnnouncement}
									/>
									<span className="slider round"></span>
								</label>
							</div>
						</div>
					</div>

					<div className="row mt-4">
						<div className="col-sm-10 col-9">
							<p className="font-large social-link weight-semi-bold m-font-18   ">Message from Clients</p>
							<p className="font-small  weight-medium text-sonic-silver w-100">
								Opt-in to receive messages from legal firms about potential career opportunities.
							</p>
						</div>
						<div className="col-sm-2 col-3 text-right">
							<div className="switch-btn mt-2">
								<label className="switch ">
									<input
										type="checkbox"
										checked={messageFromClient === 'yes' ? true : false}
										onClick={handleMessageFromClient}
									/>
									<span className="slider round"></span>
								</label>
							</div>
						</div>
					</div>
				</div>

				<hr className="hr-line mt-4 mb-4" />
				<p className="font-large social-link weight-semi-bold m-font-20 mb-2  ">Help</p>
				<p className="font-large color-red weight-semi-bold mb-2  " onClick={handleLogout}>
					<Link href="#" className="log-red">
						Log Out
					</Link>
				</p>
			</div>
		</div>
	);
}
