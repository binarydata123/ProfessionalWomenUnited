'use client';
import React, { useContext, useEffect, useState } from 'react';
import './settings.css';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { EyeSlashIcon, EyeIcon } from '@heroicons/react/20/solid';
import { cancelPlanSubscription, changePassword, getNotificationSettings, updateNotificationSettings, updatetwofactorSettings } from '../../../../lib/lawyerapi';
import { signOut } from 'next-auth/react';
import AuthContext from '@/context/AuthContext';
import { getSingleUserDetails } from '../../../../lib/frontendapi';

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
	const [twoFactorAuth, setTwoFactorAuth] = useState(false);

	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);

	const [planname, setPlanName] = useState('');
	const [plandayleft, setPlanDayleft] = useState<any>('');
	const [loading, setLoading] = useState(false);
	const [showCancelModal, setShowCancelModal] = useState(false);
	const [subscriptionStatus, setSubscriptionStatus] = useState('');
	const [subscriptionEndDate, setSubscriptionEndDate] = useState('');

	useEffect(() => {
		if (user?.id) {
			setUserId(user.id);
			handleGetSettings(user.id);
			getSingleUserDetailsData(user.id);
		}
	}, [user]);

	const handleUpdatePassword = async (user_id: any, newPassword: string) => {
		const isValid = validateForm();
		if (isValid) {
			try {
				const res = await changePassword(user?.id, newPassword);
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

	const calculateDaysLeft = (targetDate: string) => {
		const today = new Date();
		const target = new Date(targetDate);
		const timeDiff = Number(target) - Number(today);
		const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
		return daysLeft;
	};

	const getSingleUserDetailsData = async (id: any) => {
		try {
			const res = await getSingleUserDetails(id);
			console.log('User details response:', res); // Debug log

			if (res.status == true) {
				// Set subscription status from the response
				setSubscriptionStatus(res.data.payment_status);
				console.log('Payment status:', res.data.payment_status); // Debug log

				// Set subscription end date if available
				if (res.data.subscription_expiry_date) {
					setSubscriptionEndDate(res.data.subscription_expiry_date);
				}

				// Set 2FA status
				if (res.data.two_factor_auth) {
					setTwoFactorAuth(res.data.two_factor_auth === 'yes');
				}
				// Set plan information - FIXED LOGIC
				// Check if there's a plan name and it's not "Not purchased"
				if (res.plan_name && res.plan_name !== "Not purchased") {
					setPlanName(res.plan_name);
					if (res.data.subscription_expiry_date) {
						const daysLeft = calculateDaysLeft(res.data.subscription_expiry_date);
						setPlanDayleft(daysLeft);
					}
				} else {
					setPlanName('');
					setPlanDayleft('');
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleCancelClick = () => {
		setShowCancelModal(true);
	};


	const handleCancelSubscription = async () => {
		try {
			setLoading(true);
			setShowCancelModal(false);
			const res = await cancelPlanSubscription({ user_id: user?.id });
			if (res.status === true) {
				toast.success('Subscription cancelled successfully');
				// Refresh the user data to update the status
				getSingleUserDetailsData(user?.id);
			} else {
				toast.error(res.message || 'Failed to cancel subscription');
			}
		} catch (err) {
			toast.error('Something went wrong while cancelling');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};
	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	const handleTwoFactorToggle = async () => {
		try {
			const newTwoFactorStatus = !twoFactorAuth;
			setTwoFactorAuth(newTwoFactorStatus);

			const res = await updatetwofactorSettings(user_id, newTwoFactorStatus);

			if (res.status === true) {
				toast.success(`Two-factor authentication ${newTwoFactorStatus ? 'enabled' : 'disabled'} successfully`);
			} else {
				// Revert if API call fails
				setTwoFactorAuth(!newTwoFactorStatus);
				toast.error('Failed to update two-factor authentication settings');
			}
		} catch (err) {
			console.log(err);
			// Revert on error
			setTwoFactorAuth(!twoFactorAuth);
			toast.error('Something went wrong while updating two-factor authentication');
		}
	};

	return (
		<div>
			{showCancelModal && (
				<div className="modal-overlay">
					<div className="modal-content">
						<div className="modal-header">
							<h3>Cancel Subscription</h3>
							<button
								className="modal-close"
								onClick={() => setShowCancelModal(false)}
							>
								&times;
							</button>
						</div>
						<div className="modal-body">
							<p>Are you sure you want to cancel your {planname} subscription?</p>
							<p>You'll still have access to premium features for the remaining {plandayleft} days.</p>
						</div>
						<div className="modal-footer">
							<button
								className="btn btn-outline-secondary text-center btn-lawyer"
								onClick={() => setShowCancelModal(false)}
								style={{ minWidth: '140px' }}
							>
								Keep Subscription
							</button>
							<button
								className="btn btn-outline-danger text-center btn-lawyer"
								onClick={handleCancelSubscription}
								disabled={loading}
								style={{ minWidth: '140px' }}
							>
								{loading ? 'Cancelling...' : 'Yes, Cancel Subscription'}
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="right-body mt-2">
				<h4 className="font-xx-large social-link  weight-semi-bold">Settings</h4>
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
				{/* Active Subscription Section */}
				{planname && plandayleft && subscriptionStatus !== 'cancelled' && (
					<div className="subscription-section mb-5">
						<p className="font-small color-light mb-2 weight-medium">Subscription</p>
						<hr className="hr-line mt-0" />
						<div className="subscription-card p-4 bg-light rounded">
							<p className="subscription-status font-large">
								<span className="weight-semi-bold">Subscribed to </span>
								<span className="plan-name text-success">{planname}</span>
								<div className="subscription-progress mt-3">
									<div className="progress-bar-container bg-secondary rounded" style={{ height: '8px' }}>
										<div
											className="progress-bar-fill bg-success rounded"
											style={{
												height: '100%',
												width: `${Math.max(5, (30 - plandayleft) / 30 * 100)}%`
											}}
										></div>
									</div>
									<div className="days-left-text font-small mt-1">
										({plandayleft} {plandayleft === 1 ? 'day' : 'days'} left)
									</div>
								</div>
							</p>

							<button
								className="btn btn-outline-danger mt-3"
								onClick={handleCancelClick}
								disabled={loading}
							>
								{loading ? 'Cancelling...' : 'Cancel Subscription'}
							</button>
						</div>
					</div>
				)}

				{/* Cancelled Subscription Status */}
				{subscriptionStatus === 'cancelled' && (
					<div className="cancelled-subscription-section mb-5">
						<p className="font-small color-light mb-2 weight-medium">Subscription Status</p>
						<hr className="hr-line mt-0" />
						<div className="cancelled-subscription-card p-4 bg-light rounded border-left-cancelled">
							<div className="d-flex align-items-center">
								<div className="cancelled-icon mr-3">
									{/* Using a simple X icon if Font Awesome is not available */}
									<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-danger">
										<path d="M18.364 5.636l-1.414-1.414L12 10.586 7.05 5.636 5.636 7.05 10.586 12l-4.95 4.95 1.414 1.414L12 13.414l4.95 4.95 1.414-1.414L13.414 12l4.95-4.95z" />
									</svg>
								</div>
								<div>
									<p className="subscription-status font-large mb-1">
										<span className="weight-semi-bold"> Subscription Cancelled</span>
									</p>
									{subscriptionEndDate ? (
										<p className="font-small text-muted mb-0">
											Your subscription will remain active until {formatDate(subscriptionEndDate)}
										</p>
									) : (
										<p className="font-small text-muted mb-0">
											Your subscription has been cancelled.
										</p>
									)}
								</div>
							</div>
						</div>
					</div>
				)}

				<p className="font-small color-light mb-2 weight-medium">Privacy</p>
				<hr className="hr-line mt-0" />
				<p className="font-large social-link weight-semi-bold m-font-20 mb-2  ">Privacy Policy</p>
				<p className="font-large social-link weight-semi-bold m-font-20 mb-2  ">Terms of Use</p>
				<p className="font-large social-link weight-semi-bold m-font-20 mb-2  ">Community Guidelines</p>
				<p className="font-large social-link weight-semi-bold m-font-20 mb-2  ">Professional Information</p>
				<div className="mt-5">
					<p className="font-small color-light mb-2 weight-medium">Security</p>
					<hr className="hr-line mt-0" />

					<div className="row">
						<div className="col-sm-10 col-9">
							<p className="font-large social-link weight-semi-bold m-font-18">Two-Factor Authentication</p>
							<p className="font-small weight-medium text-sonic-silver w-100">
								Add an extra layer of security to your account. When enabled, you'll need to enter a verification code from your authenticator app when signing in.
							</p>
						</div>
						<div className="col-sm-2 col-3 text-right">
							<div className="switch-btn mt-2">
								<label className="switch">
									<input
										type="checkbox"
										checked={twoFactorAuth}
										onChange={handleTwoFactorToggle}
									/>
									<span className="slider round"></span>
								</label>
							</div>
						</div>
					</div>

					{twoFactorAuth && (
						<div className="alert alert-info mt-3">
							<strong>Two-factor authentication is enabled</strong>
							<p className="mb-0 mt-1 font-small">
								You'll be prompted for a verification code on your next login.
							</p>
						</div>
					)}
				</div>
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
								Opt-in to receive messages from Professional about potential career opportunities.
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
