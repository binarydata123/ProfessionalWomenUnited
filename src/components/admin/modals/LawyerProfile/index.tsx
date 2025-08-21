'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import './style.css';
import UpgradeAccount from '../UpgradeAccount';
import LawyerInfo from '../LawyerInfo';
import Popup from '@/commonUI/Popup';
import ReportAccount from '../ReportAccount';
import SendMessage from '../SendMessage';
import { getAdminImageSrc130x130 } from '@/app/[locale]/commonfunctions/commonfunctions';

export default function LawyerProfile(props: any) {
	const single_lawyer = props.single_lawyer;
	const lawyer_current_plan = props.lawyer_current_plan;

	const [reportLawyer, setreportLawyer] = useState(false);
	const [lawyer_tab, setLawyerTab] = useState('Upgrade Account');
	const [upgradeAccount, setupgradeAccount] = useState(false);
	const [sendMessage, setsendMessage] = useState(false);

	const currentYear = new Date().getFullYear();

	const toggleUpgradeAccount = () => {
		setupgradeAccount(prevState => !prevState);
		setsendMessage(false);
		setreportLawyer(false);

		if (lawyer_tab == 'Upgrade Account') {
			setLawyerTab('View Account');
		} else {
			setLawyerTab('Upgrade Account');
		}
	};

	const reportAccount = () => {
		setreportLawyer(true);
		setupgradeAccount(false);
		setsendMessage(false);
	};

	const handleMessage = () => {
		setsendMessage(true);
		setreportLawyer(false);
		setupgradeAccount(false);
	};

	const closeReportPopup = () => {
		props.closeLawyerProfile();
	};

	const closeSendMessagePopup = () => {
		props.closeLawyerProfile();
	};

	return (
		<div className={`lawyer-profile-wrapper`}>
			<div className="row text-left">
				<div className="col-sm-2 pr-0 img-mall">
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
						<p className="font-small  weight-semi-bold social-link">
							{single_lawyer?.designation}
							{/* at {single_lawyer?.company_name} */}
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

			<div className="row mt-4 mb-4 align-items-center">
				<div className="col-sm-4 m-m-b-1  mb-2">
					<button type="button" className="btn btn-cancel w-100 save-pad" onClick={toggleUpgradeAccount}>
						{lawyer_tab}
					</button>
				</div>
				<div className="col-sm-4 m-m-b-1 modal-ft">
					<button type="button" className="btn btn-cancel w-100 save-pad" onClick={reportAccount}>
						Report Account
					</button>
				</div>
				<div className="col-sm-4">
					<button
						className="bg-893168 weight-semi-bold font-small w-100  mar-top-min b-r-btn save-pad"
						onClick={handleMessage}
					>
						Message
					</button>
				</div>
			</div>
			{upgradeAccount ? (
				<UpgradeAccount lawyerId={props.single_lawyer.id} lawyerSlug={props.single_lawyer.slug} />
			) : reportLawyer ? (
				<ReportAccount lawyerId={props.single_lawyer.id} closeReportPopup={closeReportPopup} />
			) : sendMessage ? (
				<SendMessage lawyerId={props.single_lawyer.id} closeSendMessagePopup={closeSendMessagePopup} />
			) : (
				<LawyerInfo lawyerInfo={props.single_lawyer} />
			)}
		</div>
	);
}
