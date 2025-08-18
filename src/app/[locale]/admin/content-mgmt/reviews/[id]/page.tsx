'use client';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getSingleLawyerDetails } from '../../../../../../../lib/frontendapi';
import {
	getSingleLawyerReviewsDetails,
	saveReviewReportByAdmin,
	updateLawerReviewsReportStatus
} from '../../../../../../../lib/adminapi';
import LawyerProfile from '@/components/admin/modals/LawyerProfile';
import Popup from '@/commonUI/Popup';
import SendMessage from '@/components/admin/modals/SendMessage';
import ReportAccount from '@/components/admin/modals/ReportAccount';
import Rating from '@/commonUI/Rating';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import AuthContext from '@/context/AuthContext';
import { formatAdminReviewDate, getAdminImageSrc130x130 } from '@/app/[locale]/commonfunctions/commonfunctions';

export default function Page({ params }: { params: { id: string } }) {
	const { user } = useContext(AuthContext)
	const [user_id, setUserId] = useState('');
	const [single_lawyer, setSingleLawyerData] = useState<any>('');
	const currentYear = new Date().getFullYear();
	const [sendMessage, setSendMessage] = useState(false);
	const [reportAccount, setReportAccount] = useState(false);
	const [reviews, setSingleLawyerReviews] = useState<any>([]);
	const [viewProfile, setViewProfile] = useState(false);
	const [reportReason, setReportReason] = useState<string>('');
	const [review_id, setReviewId] = useState<any>('');
	const [report_to_id, setReportToId] = useState<any>('');
	const [reportSubmitPopup, setReportSubmitPopup] = useState(false);

	useEffect(() => {
		if (user) {
			user?.id ? setUserId(user?.id) : setUserId('');
			handleSingleLawyerDetails(params.id);
			handleSingleLawyerReviewsDetails(user?.id, params.id);
		}
	}, []);

	const handleSingleLawyerDetails = async (id: any) => {
		try {
			const res = await getSingleLawyerDetails(id);
			if (res.status == true) {
				setSingleLawyerData(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleSingleLawyerReviewsDetails = async (userId: any, lawyerId: any) => {
		try {
			const res = await getSingleLawyerReviewsDetails(userId, lawyerId);
			if (res.status == true) {
				setSingleLawyerReviews(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const changeLawyerReviewReportStatus = (report_id: any, review_id: any, updated_status: any) => {
		let text_msg;

		if (updated_status == 'approved') {
			text_msg = 'Do you want to reject the reported request on this review';
		} else {
			text_msg = 'Do you want to approved the reported request on this review';
		}

		Swal.fire({
			title: 'Are you sure?',
			text: text_msg,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#02142d',
			cancelButtonColor: '#D04E4F',
			confirmButtonText: 'Yes'
		}).then(result => {
			if (result.isConfirmed) {
				try {
					const data = {
						report_id: report_id,
						review_id: review_id,
						user_id: user_id,
						status: updated_status
					};

					updateLawerReviewsReportStatus(data)
						.then(res => {
							if (res.status == true) {
								Swal.fire('Success!', res.message, 'success');
								handleSingleLawyerReviewsDetails(user_id, params.id);
							} else {
								console.error('An error occurred');
							}
						})
						.catch(err => {
							if (err.response) {
								console.error('An error occurred');
							}
						});
				} catch (error) {
					console.error(error);
				}
			}
		});
	};

	const handleReportReasonChange = (e: any) => {
		const selectedValue = e.target.value;
		setReportReason(selectedValue);
	};

	const handleReport = () => {
		const data = {
			user_id: user_id,
			review_id: review_id,
			reported_by: user_id,
			reported_to: report_to_id,
			report_reason: reportReason
		};

		if (!reportReason) {
			toast.error('Please select atleast one option.');
			return;
		}

		saveReviewReportByAdmin(data)
			.then(response => {
				if (response.status == true) {
					toast.success(response.message);
					handleSingleLawyerReviewsDetails(user_id, params.id);
					setReportSubmitPopup(false);
				} else {
					toast.error('This review has already been previously reported');
				}
			})
			.catch(error => {
				console.error(error);
				toast.error('An error occurred while reporting the review');
				setReportSubmitPopup(false);
			});
	};

	return (
		<div>
			<Link href={'/admin/content-mgmt/reviews'}>
				<p className="font-small weight-semi-bold mt-3 boysenberry">
					<i className="fa-solid fa-arrow-left-long"></i>&nbsp; Back
				</p>
			</Link>
			<div className="card-inquiries bg-card-whitsde mt-2">
				<div className="row">
					<div className="col-sm-10">
						<div className="d-flex align-items-center">
							<div className="pr-0">
								<Image
									src={getAdminImageSrc130x130(single_lawyer.profile_image, single_lawyer.gender)}
									alt="user-popup"
									width={130}
									height={130}
									layout="responsive"
									className="w-130 m-img-fixed m-0"
								/>
							</div>
							<div className="sub-span-data">
								<p className="font-large social-link weight-bold ">
									{single_lawyer?.full_name}{' '}
									<span className="sub-span">
										{single_lawyer.plan_name == 'monthly'
											? 'Monthly Subscription'
											: single_lawyer.plan_name == 'quarterly'
												? 'Quarterly Subscription'
												: 'No Plan Purchased'}
									</span>
								</p>
								{single_lawyer?.designation && (
									<p className="font-small  weight-semi-bold social-link">
										{single_lawyer?.designation} at {single_lawyer?.company_name}
									</p>
								)}
								<ul className="rating-location">
									{single_lawyer?.location_name && (
										<li className="loc">
											<Image
												src="/images/location.svg"
												alt="location"
												width={20}
												height={20}
												style={{ marginRight: '4px' }}
											/>
											{single_lawyer?.location_name}
										</li>
									)}

									{single_lawyer?.avg_rating_and_reviews ? (
										<>
											<li className="rev">
												<i className="fa-solid fa-star"></i>{' '}
												<b>
													{single_lawyer?.avg_rating_and_reviews
														? single_lawyer.avg_rating_and_reviews.split('(')[0]
														: ''}
												</b>
											</li>
											<li className="rev">
												<span>
													(
													{single_lawyer?.avg_rating_and_reviews
														? single_lawyer.avg_rating_and_reviews.split('(')[1]
														: ''}
												</span>
											</li>
										</>
									) : (
										<li className="rev">
											<span>Review not available</span>
										</li>
									)}
								</ul>
								{single_lawyer?.service_name &&
									single_lawyer.service_name.split(',').map((service: any, index: any) => (
										<button className="btn-mini success-btn mr-1 mb-2" key={index}>
											{service}
										</button>
									))}
								{single_lawyer?.acquired && currentYear - single_lawyer?.acquired > 0 && (
									<button className="btn-mini danger-btn mr-1 mb-2">
										Licensed for {currentYear - single_lawyer?.acquired} years
									</button>
								)}
								{single_lawyer?.consultation_duration && (
									<button className="btn-mini danger-btn">
										Free Consultation: {single_lawyer?.consultation_duration}
									</button>
								)}
							</div>
						</div>
					</div>
					<div className="col-xl-2 text-right">
						<button className="btn-primary  w-100 gap-2  mt-1 mb-2" onClick={() => setViewProfile(true)}>
							View Profile{' '}
						</button>

						<button
							type="button"
							className="btn-secondary  w-100 mr-1 mb-2"
							onClick={() => setSendMessage(true)}
						>
							Message
						</button>
						<button className="btn-tertiary mt-1" onClick={() => setReportAccount(true)}>
							{' '}
							Report User
						</button>
					</div>
				</div>
			</div>

			<div className="row mt-3 mb-3">
				<div className="col-8">
					<button className="btn-tertiary1 mt-1  "> Reviews ({reviews.length})</button>
				</div>
				<div className="col-4 text-right">
					<p>
						<Link
							href={`/find-a-lawyer/${single_lawyer.slug}`}
							className="font-small weight-semi-bold mt-1 boysenberry text-center"
						>
							View Public Profile <i className="fa-solid fa-angle-right box-right icon-size-10"></i>
						</Link>
					</p>
				</div>
			</div>
			<hr></hr>
			{reviews.map((review: any, index: any) => (
				<>
					<div className="row mt-2">
						<div className="col-sm-8  col-8">
							<div className="top-review-section ">
								<Rating rating={review.stars} />
							</div>
							<div className="upload-date">
								<p className="social-link weight-medium font-x-small mt-1">
									{review.name} • {formatAdminReviewDate(review.created_at)}{' '}
									{review.status == 'approved' ? (
										<button
											className="monthly"
											style={{ color: '#02142d', backgroundColor: '#c490731F' }}
										>
											Approved
										</button>
									) : (
										<button
											className="monthly"
											style={{ color: '#D04E4F', backgroundColor: '#D04E4F1F' }}
										>
											Deleted
										</button>
									)}
								</p>
							</div>
						</div>
						{review.report_status == null && (
							<div className="col-sm-4  col-4 text-right">
								<div className="right-side-report">
									<span
										className="text-sonic-silver font-x-small weight-medium"
										role="button"
										onClick={() => {
											setReviewId(review.id);
											setReportToId(review.review_by_member_id);
											setReportSubmitPopup(true);
										}}
									>
										<i className="fa-regular fa-flag"></i> report
									</span>
								</div>
							</div>
						)}
					</div>

					<div className="reviews my-3 mb-4">
						<div className="review-card">
							<h4 className="social-link font-large weight-medium">{review.title}</h4>
							<p className="text-sonic-silver font-small weight-light">{review.description}</p>
						</div>
						{review.reply && (
							<div className="reply-box mt-3">
								<p className="text-sonic-silver font-small weight-light">{review.reply}</p>
								<p className="text-sonic-silver font-x-small weight-semi-bold">
									{formatAdminReviewDate(review.created_at)}
								</p>
							</div>
						)}

						{review.report_status == 'active' && (
							<div className="card mt-3 pb-1">
								<p className="social-link font-small weight-medium">Pending Approval:</p>
								<div className="row mt-3">
									<div className="col-sm-6">
										<button
											className="btn-secondary-small left-icon w-100"
											onClick={e =>
												changeLawyerReviewReportStatus(
													review?.report_id,
													review?.review_id,
													'approved'
												)
											}
										>
											<i className="fa-solid fa-xmark"></i> Reject
										</button>
									</div>
									<div className="col-sm-6">
										<button
											type="button"
											className="btn-secondary-small-true left-icon mb-3 w-100"
											onClick={e =>
												changeLawyerReviewReportStatus(
													review?.report_id,
													review?.review_id,
													'decline'
												)
											}
										>
											<i className="fa-solid fa-check"></i> Approve
										</button>
									</div>
								</div>
							</div>
						)}

						{review.report_status == 'approved' && (
							<div className="card mt-3 pb-1">
								<div className="row mt-3">
									<div className="col-sm-6">
										<button type="button" className="btn-secondary-small-true left-icon mb-3 w-100">
											<i className="fa-solid fa-check"></i> Approved
										</button>
									</div>
								</div>
							</div>
						)}

						{review.report_status == 'decline' && (
							<div className="card mt-3 pb-1">
								<div className="row mt-3">
									<div className="col-sm-6">
										<button className="btn-secondary-small left-icon w-100">
											<i className="fa-solid fa-xmark"></i> Rejected
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
					<hr></hr>
				</>
			))}

			<Popup
				show={viewProfile}
				onCancel={() => setViewProfile(false)}
				onOk={() => setViewProfile(false)}
				footer={false}
			>
				<LawyerProfile single_lawyer={single_lawyer} lawyer_current_plan={single_lawyer.plan_name} />
			</Popup>

			<Popup
				title="Send Message"
				show={sendMessage}
				size="sm"
				okText="Report"
				footer={false}
				onCancel={() => setSendMessage(false)}
				onOk={() => setSendMessage(false)}
			>
				<SendMessage lawyerId={single_lawyer.id} />
			</Popup>

			<Popup
				title="Report Account"
				show={reportAccount}
				size="sm"
				footer={false}
				onCancel={() => setReportAccount(false)}
				onOk={() => setReportAccount(false)}
			>
				<ReportAccount lawyerId={single_lawyer.id} />
			</Popup>

			<Popup show={reportSubmitPopup} size="sm" footer={false} onCancel={() => setReportSubmitPopup(false)}>
				<div className="modal-body">
					<h5 className="modal-title f-22 weight-bold social-link mb-4" id="exampleModalLabel">
						Report Review
					</h5>
					<p className="text-sonic-silver weight-medium font-small ">Select a reason:</p>
					<div className="form-fild-des">
						<label className="social-link font-small weight-medium w-100 mt-2">
							<input
								type="radio"
								name="report"
								value="inappropriate"
								onChange={handleReportReasonChange}
							/>
							<span className="checkmark"></span>
							Inappropriate
						</label>
						<label className="social-link font-small weight-medium w-100 mt-2">
							<input type="radio" name="report" value="irrelevant" onChange={handleReportReasonChange} />
							<span className="checkmark"></span>
							Irrelevant
						</label>
						<label className="social-link font-small weight-medium w-100 mt-2">
							<input
								type="radio"
								name="report"
								value="spam(ads, self-promotion)"
								onChange={handleReportReasonChange}
							/>
							<span className="checkmark"></span>
							Spam (ads, self-promotion)
						</label>
						<label className="social-link font-small weight-medium w-100 mt-2">
							<input
								type="radio"
								name="report"
								value="abusive-message"
								onChange={handleReportReasonChange}
							/>
							<span className="checkmark"></span>
							Abusive Message
						</label>
					</div>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-cancel" onClick={() => setReportSubmitPopup(false)}>
						Cancel
					</button>
					<button
						className="bg-893168 weight-semi-bold font-small  mar-top-min b-r-btn"
						onClick={handleReport}
					>
						Report
					</button>
				</div>
			</Popup>
		</div>
	);
}
