'use client';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import ImagePlaceholder from '@/commonUI/ImagePlaceholder';
import Popup from '@/commonUI/Popup';
import ReportUser from '@/components/lawyer/Popup/ReportUser';
import './inquiries.css';
import Inquiries from '@/components/lawyer/Inquiries';
import { GetAllInquiries, deleteInquiry } from '../../../../../lib/lawyerapi';
import Pagination from '@/commonUI/Pagination';
import AuthContext from '@/context/AuthContext';

export default function Page() {
	const { user } = useContext(AuthContext)
	const [activeTab, setActiveTab] = useState('inbox');
	const [showreportUserPopop, setshowreportUserPopop] = useState(false);
	const [deleteMessagePopop, setdeleteMessagePopop] = useState(false);
	const [viewProfile, setviewProfile] = useState(false);
	const [inboxInquiries, setinboxInquiries] = useState([]);
	const [savedInquiries, setsavedInquiries] = useState([]);
	const [selectedInqId, setSelectedInqId] = useState<number | null>(null);
	const [user_id, setUserId] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const [isFetchingData, setIsFetchingData] = useState(true);

	const [paginatedInquiries, setPaginatedInquiries] = useState([]);

	useEffect(() => {
		setIsFetchingData(true);
		user?.id ? setUserId(user?.id) : setUserId('');

		fetchInboxInquiries(user?.id, 'index');
		fetchSavedInquiries(user?.id, 'saved');
		setIsFetchingData(false);
	}, []);

	const handleMessageTabs = (message: string) => {
		fetchSavedInquiries(user_id, 'saved');
		fetchInboxInquiries(user_id, 'index');

		setActiveTab(message);
		// setCurrentPage(1);
	};

	const fetchSavedInquiries = async (userId: any, Inqtype: string) => {
		try {
			const res = await GetAllInquiries(userId, Inqtype);
			if (res.status == true) {
				setsavedInquiries(res.data);
			} else if (res.status == false) {
				setsavedInquiries([]);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const fetchInboxInquiries = async (userId: any, Inqtype: string) => {
		try {
			const res = await GetAllInquiries(userId, Inqtype);
			if (res.status == true) {
				setinboxInquiries(res.data);
			} else if (res.status == false) {
				setinboxInquiries([]);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleDeleteInquiry = (inqId: number) => {
		setSelectedInqId(inqId);
		setdeleteMessagePopop(true);
	};

	const deleteInquiryApiCall = async () => {
		const data = {
			user_id: user_id,
			inqId: selectedInqId
		};
		try {
			const response = await deleteInquiry(data);
			if (response.status === true) {
				setdeleteMessagePopop(false);
				fetchInboxInquiries(user_id, 'index');
				fetchSavedInquiries(user_id, 'saved');
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	const handlePageChange = (page: any) => {
		setCurrentPage(page);
	};

	const getCurrentInquiries = () => {
		if (activeTab == 'inbox') {
			return inboxInquiries;
		} else {
			return savedInquiries;
		}
	};

	const refreshPage = () => {
		fetchSavedInquiries(user_id, 'saved');
		fetchInboxInquiries(user_id, 'index');
	};


	useEffect(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = currentPage * itemsPerPage;
		const currentInquiries = getCurrentInquiries();
		setPaginatedInquiries(currentInquiries.slice(startIndex, endIndex));
	}, [currentPage, savedInquiries, inboxInquiries, activeTab]);

	return (
		<div className="right-body">

			<div className="pt-5">
				<h4 className="font-xx-large social-link mb-3 weight-semi-bold p-0 mt-3">Inquiries</h4>
				<div className="row mb-1">
					<div className="col-sm-12">
						<div className="nav-tab p-set pl-0">
							<ul className="p-0">
								<li className={activeTab === 'inbox' ? 'active' : ''}>
									<Link
										aria-current="page"
										href="JavaScript:void(0)"
										onClick={() => handleMessageTabs('inbox')}
									>
										Inbox ({inboxInquiries.length})
									</Link>
								</li>
								<li className={activeTab === 'saved' ? 'active' : ''}>
									<Link href="JavaScript:void(0)" onClick={() => handleMessageTabs('saved')}>
										Saved ({savedInquiries.length})
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="mt-4">
					{paginatedInquiries.length === 0 && !isFetchingData ? (
						<ImagePlaceholder
							height={300}
							image="/images/inquiry-image.png"
							text="You don’t have any inquiries."
							link="/lawyer/profile/edit"
							buttonText="Update your Profile"
						/>
					) : (
						paginatedInquiries.map((item, index) => (
							<Inquiries
								index={index}
								item={item}
								onDelete={handleDeleteInquiry}
								refreshPage={refreshPage}
							/>
						))
					)}
					{isFetchingData && (
						<>
							<div className="skeleton-box"></div>
							<div className="skeleton-box"></div>
							<div className="skeleton-box"></div>
							<div className="skeleton-box"></div>
							<div className="skeleton-box"></div>
							<div className="skeleton-box"></div>
							<div className="skeleton-box"></div>
							<div className="skeleton-box"></div>
							<div className="skeleton-box"></div>
							<div className="skeleton-box"></div>
						</>
					)}
				</div>

				{getCurrentInquiries().length > 10 && (
					<div className="text-right mt-5 m-none float-end d-flex">
						<p className="mt-2 weight-light text-sonic-silver">
							Showing {Math.min(currentPage * itemsPerPage, getCurrentInquiries().length)} of{' '}
							{getCurrentInquiries().length}
						</p>
						<Pagination
							currentPage={currentPage}
							totalPages={Math.ceil(getCurrentInquiries().length / itemsPerPage)}
							handlePageChange={handlePageChange}
						/>
					</div>
				)}
				<Popup
					show={showreportUserPopop}
					title="Report User"
					onCancel={() => setshowreportUserPopop(false)}
					onOk={() => setshowreportUserPopop(false)}
				>
					<ReportUser />
				</Popup>

				<Popup
					show={deleteMessagePopop}
					title="Delete message ?"
					size="sm"
					footer={false}
					onCancel={() => setdeleteMessagePopop(false)}
					okText="confirm"
					closeText="Cancel"
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
			</div>
		</div>
	);
}
