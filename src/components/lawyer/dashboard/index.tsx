'use client';
import React, { useState, useEffect, useContext } from 'react';
import CountCard from '@/components/common/CountCard';
import RecentBox from '@/components/common/RecentBox';
import Popup from '@/commonUI/Popup';
import RecentReviews from '../RecentReviews';
import Contributors from '../Contributors';
import Inquiries from '../Inquiries';
import DefaultButton from '@/commonUI/DefaultButton';
import Link from 'next/link';
import {
	getProfileView,
	getInqueryView,
	GetAllInquiries,
	deleteInquiry,
	getTopContributors
} from '../../../../lib/lawyerapi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getSingleUserDetails } from '../../../../lib/frontendapi';
import AuthContext from '@/context/AuthContext';
import Cookies from 'js-cookie';

export default function LawyerDashboard() {
	const { user } = useContext(AuthContext)
	const data = [{}, {}, {}, {}];
	const router = useRouter();
	const [profileViews, setProfileViews] = useState(null);
	const [inqueryViews, setInqueryViews] = useState(null);
	const [deleteMessagePopop, setdeleteMessagePopop] = useState(false);
	const [inboxInquiries, setinboxInquiries] = useState([]);
	const [selectedInqId, setSelectedInqId] = useState<number | null>(null);
	const [topContributors, setTopContributors] = useState([]);
	const [acquired, setAcquired] = useState('');
	const [showTopContributors, setShowTopContributors] = useState(false);



	useEffect(() => {
		if (user) {
			getSingleUserDetailsData(user?.id);
			fetchInboxInquiries(user?.id, 'index');
			fetchTopContributors(user?.id, 4);
		}

		const storedShowTopContributors = Cookies.get('showTopContributors');
		if (storedShowTopContributors) {
			setShowTopContributors(storedShowTopContributors === 'true');
		}
	}, [user]);

	const toggleTopContributors = () => {
		const newValue = !showTopContributors;
		setShowTopContributors(newValue);
		Cookies.set('showTopContributors', newValue.toString());
	};

	const refreshPage = () => {
		fetchInboxInquiries(user?.id, 'index');
	};

	const getSingleUserDetailsData = async (id: any) => {
		try {
			const res = await getSingleUserDetails(user?.id);
			if (res.status == true) {
				setAcquired(res.data.acquired);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const fetchInboxInquiries = async (userId: any, Inqtype: string) => {
		try {
			const response = await GetAllInquiries(user?.id, Inqtype);
			setinboxInquiries(response.data.slice(0, 4));
		} catch (error) {
			console.error('Error fetching inquiries:', error);
		}
	};

	const fetchTopContributors = async (user_id: any, contributorCount: number) => {
		try {
			const response = await getTopContributors(user_id, contributorCount);
			setTopContributors(response.data);
		} catch (error) {
			console.error('Error fetching inquiries:', error);
		}
	};

	const handleDeleteInquiry = (inqId: number) => {
		setSelectedInqId(inqId);
		setdeleteMessagePopop(true);
	};

	const deleteInquiryApiCall = async () => {
		const data = {
			user_id: user?.id,
			inqId: selectedInqId
		};
		try {
			const response = await deleteInquiry(data);
			if (response.status === true) {
				setdeleteMessagePopop(false);
				fetchInboxInquiries(user?.id, 'index');
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	useEffect(() => {
		if (user?.id && user?.role === 'lawyer') {
			Promise.all([getProfileView({ memberId: user?.id }), getInqueryView({ memberId: user?.id })])
				.then(([profileData, inqueryData]) => {
					const profileCount = profileData.view_count;
					const inqueryCount = inqueryData.view_count;
					setProfileViews(profileCount);
					setInqueryViews(inqueryCount);
				})
				.catch(error => {
					console.error(error);
				});
		}
	}, [router]);

	return (
		<>
			<div className="row mt-4 g-3">
				<div className="col-lg-12 col-xl-8 col-md-12">
					<div className="h-100">
						<div className="row">
							<div className="col-6">
								<CountCard
									backgroundImage="/images/Profile-dash.jpg"
									count={profileViews}
									linkText={'Profile Views'}
									href={'/lawyer/profile'}
								/>
							</div>

							<div className="col-6">
								<CountCard
									backgroundImage="/images/Profile-dash2.jpg"
									count={inqueryViews}
									linkText={'Inquiries'}
									href={'/lawyer/inquiries'}
								/>
							</div>
						</div>
						{acquired !== null && acquired !== '' ? (
							<div className="">
								<RecentBox className="mt-2" title="Recent Reviews" href="/lawyer/profile/reviews">
									<RecentReviews />
								</RecentBox>
							</div>
						) : (
							<div className="recent-reviews mt-4 p-4">
								<h5 className="p-2" style={{ color: '#c49073', fontSize: '20px' }}>
									Recent Reviews
								</h5>
								<div className="py-4">
									<div className="rest-reviwe justify-content-center aligm-items-center">
										<div className="text-center">
											<Image
												src="/images/review-placeholder.png"
												alt="Recent Reviews"
												width={120}
												height={120}
											/>
										</div>
										<div className="text-center mt-4">
											<p>You don’t have any reviews.</p>
										</div>
										<div>
											<Link href={'/lawyer/profile/edit'}>
												<DefaultButton
													height={50}
													className="w-100"
													background="#fff"
													color="#BE8363"
												>
													Update your Profile
												</DefaultButton>
											</Link>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				{/* {acquired !== null && acquired !== '' ? ( */}
				{showTopContributors ? (
					<div className="col-lg-12 col-xl-4 col-md-12">
						<div className="recent-reviews h-100">
							<p className="font-large weight-semi-bold green-dark">Top Contributors</p>
							{topContributors && topContributors?.length > 0 && topContributors?.map((item, index) => (
								<Contributors index={index} item={item} />
							))}
							<Link href={'/lawyer/legal-community'}>
								<DefaultButton
									height={50}
									className="w-100 mt-2 border"
									background="#fff"
									color="#c49073"
								>
									Go to Legal Community
								</DefaultButton>
							</Link>
						</div>
					</div>
				) : (
					<div className="col-lg-12 col-xl-4 col-md-12">
						<div className="recent-reviews h-100 p-0 border-0">
							<div className="welcome position-relative">
								<h3 style={{ color: '#fff' }}>
									Welcome to <br />
									Professional Women United!
								</h3>
								<p style={{ color: '#fff' }}>
									Connect with Professionals or legal consultants through our platform and get the legal help you need within the United Arab Emirates.
								</p>
								<Link href={'/lawyer/profile/edit'}>
									<button className="w-100 btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 mt-4">
										<span>Update Profile</span>
										<span className="banner-arrow-btn" onClick={toggleTopContributors}>
											<Image
												src="/images/Blogs/arrow-square-right.png"
												alt="Update Profile"
												width={20}
												height={20}

											/>
										</span>
									</button>
								</Link>
								<Image
									src="/images/Blogs/close-square.png"
									alt="close"
									width={20}
									height={20}
									className="arrow-top"
									onClick={toggleTopContributors}
								/>
							</div>
							<div className="recent-reviews position-relative mt-3" id="find-clients">
								<h5 className="">Find clients easily...</h5>
								<p>Contribute to our legal community & grow your reach by sharing your expertise.</p>
								<Link href={'/lawyer/legal-community'}>
									<DefaultButton
										height={50}
										className="w-100 mt-4 border-color"
										background="#fff"
										color="#c49073"
									>
										Go to Legal Community
									</DefaultButton>
								</Link>
								<Image
									src="/images/close-square.png"
									alt="close"
									width={20}
									height={20}
									className="arrow-top"
								/>
							</div>
						</div>
					</div>
				)}
			</div>
			{acquired !== null && acquired !== '' ? (
				<div className="">
					<RecentBox className="mt-2" title="Recent Inquiries" href="/lawyer/inquiries">
						{inboxInquiries.map((item, index) => (
							<Inquiries
								index={index}
								item={item}
								onDelete={handleDeleteInquiry}
								refreshPage={refreshPage}
							/>
						))}
					</RecentBox>
				</div>
			) : (
				<div className="recent-reviews mt-4 p-4">
					<div className="rest-reviwe justify-content-center  aligm-items-center py-5">
						<div className="text-center">
							<Image src="/images/chat.png" alt="Recent Reviews" width={120} height={120} />
						</div>
						<div className="text-center mt-4">
							<p>You don’t have any inquiries.</p>
						</div>
						<div>
							<Link href={'/lawyer/profile/edit'}>
								<DefaultButton height={50} className="w-100" background="#fff" color="#BE8363">
									Update your Profile
								</DefaultButton>
							</Link>
						</div>
					</div>
				</div>
			)}
			<Popup
				show={deleteMessagePopop}
				title="Delete message ?"
				onCancel={() => setdeleteMessagePopop(false)}
				footer={false}
				okText="confirm"
			>
				<p>This action will remove the message from your inbox.</p>
				<div className="modal-footer">
					<button type="button" className="btn btn-cancel" onClick={() => setdeleteMessagePopop(false)}>
						Cancel
					</button>
					<button
						className="bg-893168 weight-semi-bold font-small  mar-top-min b-r-btn"
						onClick={deleteInquiryApiCall}
					>
						Confirm
					</button>
				</div>
			</Popup>
		</>
	);
}
