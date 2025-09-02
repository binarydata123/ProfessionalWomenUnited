'use client';
import React, { useContext, useEffect, useState } from 'react';
import LawyerDashboard from '@/components/lawyer/dashboard';
import EmptyState from '@/components/lawyer/dashboard/EmptyState';
import './dash.css';
import { getSingleUserDetails } from '../../../../../lib/frontendapi';
import { cancelPlanSubscription } from '../../../../../lib/lawyerapi';
import AuthContext from '@/context/AuthContext';
import { capitalizeFirstWord } from '../../commonfunctions/commonfunctions';
import { toast } from 'react-toastify';

export default function Dashboard() {
	const { user } = useContext(AuthContext);
	const [showFilledState, setshowFilledState] = useState(true);
	const [username, setUserName] = useState('');
	const [planname, setPlanName] = useState('');
	const [plandayleft, setPlanDayleft] = useState<any>('');
	const [viewProfile, setviewProfile] = useState(false);
	const [loading, setLoading] = useState(false);
	const [showCancelModal, setShowCancelModal] = useState(false);

	const calculateDaysLeft = (targetDate: string) => {
		const today = new Date();
		const target = new Date(targetDate);
		const timeDiff = Number(target) - Number(today);
		const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
		return daysLeft;
	};

	useEffect(() => {
		if (user) {
			getSingleUserDetailsData(user?.id);
		}
	}, [user]);

	// const getSingleUserDetailsData = async (id: any) => {
	// 	try {
	// 		const res = await getSingleUserDetails(id);
	// 		console.log(res.data, 'fdgdfgdfg')
	// 		if (res.status == true) {
	// 			setUserName(res.data.first_name);
	// 			setPlanName(res.plan_name);
	// 			const daysLeft = calculateDaysLeft(res.data.subscription_expiry_date);
	// 			setPlanDayleft(daysLeft);
	// 		}
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };
	const getSingleUserDetailsData = async (id: any) => {
		try {
			const res = await getSingleUserDetails(id);
			if (res.status == true) {
				setUserName(res.data.first_name);

				// if (res.data.payment_status === "cancelled") {
				if (res.data.subscription_expiry_date === null) {

					setPlanName('');
					setPlanDayleft('');
				} else {
					setPlanName(res.plan_name);
					const daysLeft = calculateDaysLeft(res.data.subscription_expiry_date);
					setPlanDayleft(daysLeft);
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
				setPlanName('');
				setPlanDayleft('');
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

	return (
		<div className="lawyer-dashboard-wrapper">
			{/* Cancel Subscription Confirmation Modal */}
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
								className="btn btn-secondary"
								onClick={() => setShowCancelModal(false)}
							>
								Keep Subscription
							</button>
							<button
								className="btn btn-danger"
								onClick={handleCancelSubscription}
								disabled={loading}
							>
								{loading ? 'Cancelling...' : 'Yes, Cancel Subscription'}
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="right-body">
				<div className="mmm m-top-sp">
					<div className="dashboard-header">
						<div className="col-lg-12 col-xl-6">
							<h2 className="font-smaller weight-bold social-link">
								Hello
								<span className="green-medium-2"> {capitalizeFirstWord(username)}</span>
							</h2>
						</div>
						{planname && plandayleft && (
							<div className="subscription-section">
								<div className="subscription-card">
									<p className="subscription-status">
										{planname ? (
											<>
												Subscribed to{' '}
												<span className="plan-name">
													{planname}
												</span>
												<div className="subscription-progress mt-2">
													<div className="progress-bar-container">
														<div
															className="progress-bar-fill"
															style={{ width: `${Math.max(5, (30 - plandayleft) / 30 * 100)}%` }}
														></div>
													</div>
													<div className="days-left-text">
														({plandayleft} {plandayleft === 1 ? 'day' : 'days'} left)
													</div>
												</div>
											</>
										) : (
											<span className="no-subscription">No active subscription</span>
										)}
									</p>

									{planname && (
										<button
											className="btn-cancel-subscription"
											onClick={handleCancelClick}
											disabled={loading}
										>
											{loading ? 'Cancelling...' : 'Cancel Subscription'}
										</button>
									)}
								</div>
							</div>
						)}
					</div>

					{showFilledState ? <LawyerDashboard /> : <EmptyState />}
				</div>
			</div>
		</div>
	);
}