'use client';
import React, { useState, useEffect, useContext } from 'react';
import LinkButton from '@/commonUI/LinkButton';
import './dash.css';
import Link from 'next/link';
import DropDown from '@/commonUI/DropDown';
import RecentBox from '@/components/common/RecentBox';
import { getAllDasboardBoxCount, getAllRecentInquiries, getSingleInquiryResponseDataByd } from '../../../../../lib/adminapi';
import Image from 'next/image';
import ChatTranscript from '@/components/admin/modals/ChatTranscript';
import Popup from '@/commonUI/Popup';
import AuthContext from '@/context/AuthContext';

export default function Dashboard() {
	const { user } = useContext(AuthContext);
	const [user_id, setUserId] = useState('');
	const [dashboard_box, setDashboard] = useState<any>({});
	const [inquiries, SetInquiries] = useState<any>([]);
	const [inquiryData, setInquiryData] = useState<any | null>(null);
	const [viewProfile, setViewProfile] = useState(false);

	useEffect(() => {
		if (user) {
			user?.id ? setUserId(user?.id) : setUserId('');
			getAllDashboardBoxCountData(user?.id);
			getAllRecentInquiriesData(user?.id);
		}
	}, []);

	const getAllDashboardBoxCountData = async (user_id: any) => {
		try {
			const response = await getAllDasboardBoxCount(user_id);
			setDashboard(response.counts);
		} catch (error) {
			console.error('Error fetching inquiries:', error);
		}
	};

	const getAllRecentInquiriesData = async (user_id: any) => {
		try {
			const response = await getAllRecentInquiries(user_id);

			if (response.status == true) {
				SetInquiries(response.inquiries);
			} else {
				// toast.error(response.message);
			}
		} catch (error) {
			console.error('Error fetching inquiries:', error);
		}
	};

	const handleViewProfile = async (inquiryId: number) => {
		const data = {
			user_id: user_id,
			inquiryId: inquiryId
		};
		try {
			const response = await getSingleInquiryResponseDataByd(data);
			if (response.status === true) {
				setInquiryData(response.data);
				setViewProfile(true);
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	return (
		<div>
			<div className="right-body">
				<div className="mmm">
					<div className="row mt-4">
						<div className="col-lg-12 col-md-12">
							<div className="row">
								<div className="col-sm-4 mb-3">
									<Link href={'/admin/user-mgmt/professionals'}>
										<div className="dash-card-g dash-add back-dash-card">
											<p className="font-large text-white weight-bold">
												{dashboard_box.lawyer_count}
											</p>
											<LinkButton color="#fff" height={0}>
												Active Professionals
											</LinkButton>
										</div>
									</Link>
								</div>
								<div className="col-sm-4 mb-3">
									<Link href={'/admin/user-mgmt/users'}>
										<div className="dash-card-g dash-add back-dash-card">
											<p className="font-large text-white weight-bold">
												{dashboard_box.enduser_count}
											</p>
											<LinkButton color="#fff" height={0}>
												Individuals
											</LinkButton>
										</div>
									</Link>
								</div>
								<div className="col-sm-4 ">
									<Link href={'/admin/support'}>
										<div className="dash-card-g dash-add back-dash-card">
											<p className="font-large text-white weight-bold">
												{dashboard_box.support_count_all || 0}
											</p>
											<LinkButton color="#fff" height={0}>
												Support
											</LinkButton>
										</div>
									</Link>
								</div>
								<div className="col-sm-4 mt-3">
									<Link href={'/admin/settings/global-parameters/authors'}>
										<div className="dash-card-g dash-add back-dash-card">
											<p className="font-large text-white weight-bold">
												{dashboard_box.author_count_all}
											</p>
											<LinkButton color="#fff" height={0}>
												Authors
											</LinkButton>
										</div>
									</Link>
								</div>
								<div className="col-sm-4 mt-3">
									<Link href={'/admin/user-mgmt/inquiries'}>
										<div className="dash-card-g dash-add back-dash-card">
											<p className="font-large text-white weight-bold">
												{dashboard_box.total_inquiry_count}
											</p>
											<LinkButton color="#fff" height={0}>
												Inquiries
											</LinkButton>
										</div>
									</Link>
								</div>
								<div className="col-sm-4 mt-3">
									<Link href={'/admin/content-mgmt/blogs'}>
										<div className="dash-card-g dash-add back-dash-card">
											<p className="font-large text-white weight-bold">
												{dashboard_box.blog_count}
											</p>
											<LinkButton color="#fff" height={0}>
												Blogs Posted
											</LinkButton>
										</div>
									</Link>
								</div>
								<div className="col-sm-6 overflow-hidden" id="add-commn-id">
									<RecentBox
										title="Recent Inquiries"
										className="mt-4"
										href="/admin/user-mgmt/inquiries">
										{inquiries.map((inquiry: any, index: any) => (
											<div
												className="card-inquiries card-add mt-2 d-flex justify-content-between"
												key={index}>
												<div className="left-content">
													<p className="green-dark font-small weight-bold">
														{inquiry.inquirer_fullname}
													</p>
													<p className="text-sonic-silver font-x-small weight-light">
														{inquiry.message.length > 50
															? `${inquiry.message.substring(0, 50)}...`
															: inquiry.message}
													</p>
												</div>
												<div className="d-flex gap-1 align-items-center left-content">
													<p className="green-dark font-x-small weight-bold">
														{inquiry.created_at && inquiry.created_at.split(' ')[1]}
													</p>
													<DropDown
														align={'start'}
														label={
															<Image
																src="/images/more.svg"
																alt=""
																width={20}
																height={20}
															/>
														}>
														<ul>
															<li>
																<Link
																	href={''}
																	onClick={() => handleViewProfile(inquiry.id)}>
																	View
																</Link>
															</li>
														</ul>
													</DropDown>
												</div>
											</div>
										))}
									</RecentBox>
								</div>
								<div className="col-sm-3 mt-4">
									<Link href={'/admin/settings/roles-and-permissions/add-new-professional'}>
										<div className="dash-card-g dash-add back-dash-card">
											<LinkButton color="#fff" height={0}>
												Create Profile
											</LinkButton>
										</div>
									</Link>
								</div>
								<div className="col-sm-3 mt-4">
									<Link href="/admin/content-mgmt/blogs/create">
										<div className="dash-card-g dash-add back-dash-card">
											<LinkButton color="#fff" height={0}>
												Write a Blog
											</LinkButton>
										</div>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Popup
				show={viewProfile}
				title=""
				size="lg"
				footer={false}
				onCancel={() => setViewProfile(false)}
				onOk={() => setViewProfile(false)}>
				{inquiryData && <ChatTranscript inquiryData={inquiryData} />}
			</Popup>
		</div>
	);
}
