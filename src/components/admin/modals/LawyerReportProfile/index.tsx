'use client';
import Image from 'next/image';
import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import LawyerReportInfo from '../LawyerReportInfo';
import { CheckIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { updateLawerReportStatus } from '../../../../../lib/adminapi';
import Popup from '@/commonUI/Popup';
import ViewProfile from '@/components/lawyer/Popup/ViewProfile';
import Link from 'next/link';
import Swal from 'sweetalert2';
import AuthContext from '@/context/AuthContext';
import { getAdminImageSrc130x130 } from '@/app/[locale]/commonfunctions/commonfunctions';

export default function LawyerProfile(props: any) {
	const { user } = useContext(AuthContext)
	const single_lawyer = props.single_lawyer;
	const single_lawyer_member_report = props.single_lawyer_member_report;
	const userData = props.single_user_data;
	const lawyer_current_plan = props.lawyer_current_plan;
	const [user_id, setUserId] = useState('');
	const currentYear = new Date().getFullYear();
	const [viewProfile, setviewProfile] = useState(false);

	useEffect(() => {
		if (user)
			user?.id ? setUserId(user?.id) : setUserId('');
	}, []);

	const changeLawyerReportStatus = (report_by_member_id: any, report_to_member_id: any, updated_status: any) => {
		let text_msg;

		if (updated_status == 'approved') {
			text_msg = 'To approved the lawyer account';
		} else {
			text_msg = 'To suspend the lawyer account';
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
						report_by_member_id: report_by_member_id,
						report_to_member_id: report_to_member_id,
						user_id: user_id,
						status: updated_status
					};

					updateLawerReportStatus(data)
						.then(res => {
							if (res.status == true) {
								props.closeProfilePopup();
								Swal.fire('Success!', res.message, 'success');
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
	return (
		<div className={`lawyer-profile-wrapper`}>
			<div className="row m-center">
				<div className="col-sm-2 pr-0">
					<Image
						src={getAdminImageSrc130x130(single_lawyer.profile_image, single_lawyer.gender)}
						alt="user-popup"
						width={130}
						height={130}
						layout="responsive"
						className="w-130 m-img-fixed"
					/>
				</div>
				<div className="col-sm-10">
					<p className="font-large social-link weight-bold ">
						{single_lawyer?.full_name}{' '}
						<span className="sub-span">
							{lawyer_current_plan == 'monthly'
								? 'Monthly Subscription'
								: lawyer_current_plan == 'quarterly'
									? 'Quarterly Subscription'
									: 'No Plan Purchased'}
						</span>
					</p>

					{single_lawyer?.designation && (
						<div>
							<span className="font-small weight-semi-bold social-link">
								{single_lawyer?.designation} at {single_lawyer?.company_name}
							</span>
						</div>
					)}

					<ul className="rating-location">
						{single_lawyer?.location_name && (
							<li className="loc">
								<i className="fa-solid fa-location-dot"></i> {single_lawyer?.location_name}
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

			<LawyerReportInfo lawyerInfo={props.single_lawyer} />

			<div className="report-user-wrapper mt-4">
				<div className="row">
					<div className="col-sm-8 col-5">
						<h5 className="modal-title f-22 weight-bold  green-dark">Report For :</h5>
					</div>
					<div className="col-sm-4 col-7 text-right">
						<p>
							<a
								className="boysenberry font-small weight-semi-bold "
								target="_blank"
								href={`/find-a-lawyer/${single_lawyer.slug}`} rel="noreferrer"
							>
								View Public Profile <i className="fa-solid fa-angle-right box-right icon-size-10"></i>
							</a>
						</p>
					</div>
				</div>

				<form>
					<div className="form-fild-des">
						{single_lawyer_member_report.reason === 'inappropriate/offensive' && (
							<label className="social-link font-small weight-medium w-100 mt-2">
								<input
									type="radio"
									name="report_type"
									checked={single_lawyer_member_report.reason === 'inappropriate/offensive'}
								/>
								<span className="checkmark"></span>
								Inappropriate/Offensive
							</label>
						)}

						{single_lawyer_member_report.reason === 'spam' && (
							<label className="social-link font-small weight-medium w-100 mt-2">
								<input
									type="radio"
									value="spam"
									name="report_type"
									checked={single_lawyer_member_report.reason === 'spam'}
								/>
								<span className="checkmark"></span>
								Spam (ads, self-promotion)
							</label>
						)}

						{single_lawyer_member_report.reason == 'other' && (
							<>
								<label className="social-link font-small weight-medium w-100 mt-2">
									<input
										type="radio"
										value="other"
										name="report_type"
										checked={single_lawyer_member_report.reason === 'other'}
									/>
									<span className="checkmark"></span>
									Other
								</label>

								<textarea
									placeholder="Write message here."
									className="form-fild w-100 h-175"
									disabled
									value={single_lawyer_member_report.message}
								></textarea>
							</>
						)}
					</div>
				</form>
				<p className="text-sonic-silver weight-medium font-small text-capitalize">
					Report By {userData.full_name}{' '}
					<Link
						className="weight-medium font-small green-medium-2 mt- "
						href={``}
						onClick={() => {
							setviewProfile(true);
						}}
					>
						( View Profile | Public Profile )
					</Link>
				</p>
			</div>
			{single_lawyer_member_report?.reports_status == 'pending' && (
				<div className="row mt-4 mb-4">
					<div className="col-sm-6 m-m-b-1 modal-ft mb-2">
						<button
							type="button"
							className="btn btn-cancel w-100 save-pad"
							onClick={e =>
								changeLawyerReportStatus(
									single_lawyer_member_report?.report_by_member_id,
									single_lawyer_member_report?.report_to_member_id,
									'rejected'
								)
							}
						>
							<XMarkIcon width={20} color={'#BE8363'} />
							Suspend
						</button>
					</div>

					<div className="col-sm-6 m-m-b-1 modal-ft approved_status mb-2">
						<button
							type="button"
							className="btn btn-approve w-100 save-pad text-white"
							onClick={e =>
								changeLawyerReportStatus(
									single_lawyer_member_report?.report_by_member_id,
									single_lawyer_member_report?.report_to_member_id,
									'approved'
								)
							}
						>
							<CheckIcon width={20} color={'#208C84'} className="mx-2 text-white" />
							Approve
						</button>
					</div>
				</div>
			)}

			<Popup
				show={viewProfile}
				title=""
				size="sm"
				footer={false}
				onCancel={() => setviewProfile(false)}
				onOk={() => setviewProfile(false)}
				className='report-view-user-model'
			>
				{userData && <ViewProfile userData={userData} />}
			</Popup>
		</div>
	);
}
