'use client';
import Image from 'next/image';
import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import LawyerInfo from '../LawyerInfo';
import { CheckIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { getAdminImageSrc130x130 } from '@/app/[locale]/commonfunctions/commonfunctions';
import { updateLawerStatus } from '../../../../../lib/adminapi';
import { toast } from 'react-toastify';
import AuthContext from '@/context/AuthContext';

export default function LawyerProfile(props: any) {
	const { user } = useContext(AuthContext)
	const single_lawyer = props.single_lawyer;
	const lawyer_current_plan = props.lawyer_current_plan;
	const [user_id, setUserId] = useState('');
	const currentYear = new Date().getFullYear();

	useEffect(() => {
		if (user)
			user?.id ? setUserId(user?.id) : setUserId('');
	}, []);

	const changeLawyerStatus = (id: any, updated_status: any) => {
		try {
			const data = {
				lawyer_id: id,
				user_id: user_id,
				status: updated_status
			};

			updateLawerStatus(data)
				.then(res => {
					if (res.status == true) {
						toast.success(res.message);
						props.closeProfilePopup();
					} else {
						toast.error(res.message);
					}
				})
				.catch(err => {
					if (err.response) {
						toast.error('An error occurred during registration');
					}
				});
		} catch (error) {
			console.error(error);
		}
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
							{single_lawyer.status === 'active' ? (
								<button
									className="monthly mx-2"
									style={{ color: '#02142d', backgroundColor: '#c490731F' }}
								>
									Approved
								</button>
							) : single_lawyer.status === 'deactive' ? (
								<button
									className="monthly mx-2"
									style={{ color: '#F79E1B', backgroundColor: '#FFAC331F' }}
								>
									Pending
								</button>
							) : (
								<button
									className="monthly mx-2"
									style={{ color: '#D04E4F', backgroundColor: '#D04E4F1F' }}
								>
									Rejected
								</button>
							)}
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

			{single_lawyer?.status == 'deactive' && (
				<div className="row mt-4 mb-4">
					<div className="col-sm-6 m-m-b-1 modal-ft  mb-2">
						<button
							type="button"
							className="btn btn-cancel w-100 save-pad"
							onClick={e => changeLawyerStatus(single_lawyer?.id, 'suspended')}
						>
							<XMarkIcon width={20} color={'#BE8363'} />
							Reject
						</button>
					</div>

					<div className="col-sm-6 m-m-b-1 modal-ft approved_status mb-2">
						<button
							type="button"
							className="btn btn-approve w-100 save-pad text-white"
							onClick={e => changeLawyerStatus(single_lawyer?.id, 'active')}
						>
							<CheckIcon width={20} color={'#c49073'} className="mx-2 text-white" />
							Approve
						</button>
					</div>
				</div>
			)}

			<LawyerInfo lawyerInfo={props.single_lawyer} />
		</div>
	);
}
