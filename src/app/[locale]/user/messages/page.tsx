'use client';
import React, { useState, useEffect, useContext } from 'react';
import './messages.css';
import Link from 'next/link';
import ImagePlaceholder from '@/commonUI/ImagePlaceholder';
import Popup from '@/commonUI/Popup';
import ViewProfile from '@/components/user/Popup/ViewProfile';
import { toast } from 'react-toastify';
import { BsStarFill } from 'react-icons/bs';
import Pagination from '@/commonUI/Pagination';

import {
	getUserInquries,
	deleteUserInquiry,
	getLawyerDetailByInquiry,
	reportInquiriesByuser,
	unReportInquiriesByUser,
	SaveInquiriesByUser
} from '../../../../../lib/enduserapi';
import DropDown from '@/commonUI/DropDown';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import AuthContext from '@/context/AuthContext';
import { formatDateTime } from '../../commonfunctions/commonfunctions';

export default function Dashboard() {

	const { user } = useContext(AuthContext);
	const [showInboxMessage, setshowInboxMessage] = useState(true);
	const [deleteMessagePopop, setdeleteMessagePopop] = useState(false);
	const [viewProfile, setviewProfile] = useState(false);
	const [user_id, setUserId] = useState('');
	const [allinquires, setAllInquires]: any = useState([]);
	const [savedInquiries, setsavedInquiries] = useState([]);
	const [selectedInqId, setSelectedInqId]: any = useState<number | null>(null);
	const [laywerData, setLaywerData] = useState<any | null>(null);
	const [isOtherChecked, setIsOtherChecked] = useState(false);
	const [reportReason, setReportReason] = useState<string>('');
	const [otherReason, setOtherReason] = useState<string>('');
	const [reportSubmitPopup, setreportSubmitPopup] = useState(false);
	const [saveMessages, setSaveMessages] = useState<Record<number, boolean>>({});
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentInquires = allinquires.slice(startIndex, endIndex);
	const totalPages = Math.ceil(allinquires.length / itemsPerPage);
	const handlePageChange = (newPage: any) => {
		setCurrentPage(newPage);
	};

	const [currentPageSaved, setCurrentPageSaved] = useState(1);
	const itemsPerPageSaved = 10;
	const startIndexSaved = (currentPageSaved - 1) * itemsPerPageSaved;
	const endIndexSaved = startIndexSaved + itemsPerPageSaved;
	const currentSavedInquires = savedInquiries.slice(startIndexSaved, endIndexSaved);
	const totalPagesSaved = Math.ceil(savedInquiries.length / itemsPerPageSaved);
	const handlePageChangeSaved = (newPage: number) => {
		setCurrentPageSaved(newPage);
	};

	const toggleMessages = (msg: string) => {
		if (msg === 'inbox') {
			setshowInboxMessage(true);
		} else {
			setshowInboxMessage(false);
		}
	};

	useEffect(() => {
		user?.id ? setUserId(user?.id) : setUserId('');
		getAllInquiresData(user?.id);
		fetchSavedInquiries(user?.id, 'saved');
	}, []);

	useEffect(() => {
		const defaultSaveMessages: Record<number, boolean> = {};
		allinquires.forEach((inquiry: any) => {
			defaultSaveMessages[inquiry.inquiry_id] = inquiry.inquiry_saved === 1;
		});

		setSaveMessages(defaultSaveMessages);
	}, [allinquires]);

	const getAllInquiresData = async (user_id: any) => {
		try {
			const inquiresData = await getUserInquries({
				memberId: user_id,
				Inqtype: 'index'
			});
			setAllInquires(inquiresData.data);
		} catch (error) {
			console.error('Error fetching reviews:', error);
		}
	};

	const handleReportReasonChange = (e: any) => {
		const selectedValue = e.target.value;
		setOtherReason(selectedValue === 'other' ? '' : otherReason);
		setReportReason(selectedValue);
		setIsOtherChecked(selectedValue === 'other' ? !isOtherChecked : false);
	};

	const fetchSavedInquiries = async (user_id: any, Inqtype: string) => {
		try {
			const res = await getUserInquries({ memberId: user_id, Inqtype });
			if (res.status == true) {
				setsavedInquiries(res.data);
			} else {
				setsavedInquiries([]);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleReportMessages = async (inqId: number) => {
		const reasonToReport = isOtherChecked ? otherReason : reportReason;
		if (!reasonToReport) {
			toast.error('Reason for report is required');
			return;
		}
		try {
			const response = await reportInquiriesByuser(user_id, inqId, reportReason, otherReason);
			if (response.status === true) {
				toast.success('Inquiry successfully reported');
				setreportSubmitPopup(false);
				getAllInquiresData(user_id);
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	const handleUnreportMessages = async (inqId: number) => {
		try {
			const response = await unReportInquiriesByUser(user_id, inqId);
			if (response.status === true) {
				getAllInquiresData(user_id);
				toast.success('Inquiry unreported successfully ');
				setreportSubmitPopup(false);
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	const handleSaveMessages = async (inqId: number) => {
		const currentSaveState = saveMessages[inqId] || false;
		const newSaveMessages = {
			...saveMessages,
			[inqId]: !currentSaveState
		};

		try {
			const response = await SaveInquiriesByUser(user_id, inqId, currentSaveState);
			setSaveMessages(newSaveMessages);
			if (response.status === true) {
				toast.success(response.message);
				getAllInquiresData(user_id);
				fetchSavedInquiries(user_id, 'saved');
			}
		} catch (error) {
			console.error('Error saving messages:', error);
		}
	};

	const openReportPopup = (inqId: number, report: any) => {
		setSelectedInqId(inqId);
		if (report == null) {
			setreportSubmitPopup(true);
		} else {
			handleUnreportMessages(inqId);
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
			const response = await deleteUserInquiry(data);
			if (response.status === true) {
				setdeleteMessagePopop(false);
				getAllInquiresData(user_id);
				fetchSavedInquiries(user_id, 'saved');
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	const handleViewProfile = async (memberId: number) => {
		const data = {
			user_id: user_id,
			memberId: memberId
		};
		try {
			const response = await getLawyerDetailByInquiry(data);
			if (response.status === true) {
				setLaywerData(response.data);
				setviewProfile(true);
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	return (
		<div className="right-body">
			<div className="height-fixed1 p-remove mt-5">
				<div id="sticky">
					<h4 className="font-xx-large social-link mb-3 weight-semi-bold">Messages</h4>
					<div className="row mb-1">
						<div className="col-sm-12">
							<div className="nav-tab p-set d-flex justify-content-between border-bottom">
								<ul className="pb-2 pb-lg-0">
									<li className={`${showInboxMessage ? 'active' : ''}`}>
										<Link onClick={e => toggleMessages('inbox')} href="">
											Inbox ({allinquires.length})
										</Link>
									</li>
									<li className={`${!showInboxMessage ? 'active' : ''}`}>
										<Link onClick={e => toggleMessages('saved')} href="">
											Saved ({savedInquiries.length})
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				{showInboxMessage ? (
					<div>
						{currentInquires.length > 0 ? (
							currentInquires.map((inquiry: any, index: any) => (
								<div
									className={`card-inquiries mt-3 ${inquiry.status === 'unseen' || inquiry.inquiry_status === 'unseen'
										? 'active'
										: ''
										}`}
									key={index}
								>
									<div className="row align-items-center">
										<div className="col-lg-9 col-md-8 col-8 d-flex">
											<div className="mx-1 mt-2">
												{inquiry.inquiry_saved ? (
													<p
														style={{ cursor: 'pointer' }}
														onClick={() => handleSaveMessages(inquiry.inquiry_id)}
													>
														<BsStarFill width={20} color="#02142d" />
													</p>
												) : (
													<p
														style={{ cursor: 'pointer' }}
														onClick={() => handleSaveMessages(inquiry.inquiry_id)}
													>
														<img src="/images/Union.svg" alt="Union" />
													</p>
												)}
											</div>
											<Link
												href={`/user/messages/${inquiry.inquiry_id}`}
												className="d-flex align-items-center"
											>
												<div className="mx-2">
													<p className="green-dark font-small weight-bold">
														{inquiry.recipient_fullname}
													</p>
													{inquiry.response_type === 'text' ||
														inquiry.response_type === null ? (
														<p className="text-sonic-silver font-x-small weight-light">
															{inquiry.response_message !== null
																? inquiry.response_message
																: inquiry.message}
														</p>
													) : (
														<div>
															{inquiry.response_type === 'pdf' && (
																<img src="/icon/pdf.png" alt="pdf-file" width={30} />
															)}
															{inquiry.response_type === 'doc' && (
																<img src="/icon/doc.png" alt="image-file" width={30} />
															)}
															{inquiry.response_type === 'xls' && (
																<img
																	src="/icon/excel.png"
																	alt="image-file"
																	width={30}
																/>
															)}
															{inquiry.response_type === 'ppt' && (
																<img src="/icon/ppt.png" alt="image-file" width={30} />
															)}
															{inquiry.response_type === 'image' && (
																<p className="text-sonic-silver font-x-small weight-light">
																	Image
																</p>
															)}
															{inquiry.response_type === 'video' && (
																<p className="text-sonic-silver font-x-small weight-light">
																	Video
																</p>
															)}
														</div>
													)}
												</div>
											</Link>
										</div>
										<div className="col-lg-2 col-md-2 p-0 col-2 text-right">
											<p className="green-dark font-x-small weight-bold">
												{formatDateTime(inquiry.inquiry_created_at)}
											</p>
										</div>
										<div className="col-lg-1 col-md-2 col-2 text-center" id="border-none">
											<DropDown
												label={<EllipsisHorizontalIcon color="#000" width={20} height={20} />}
											>
												<ul>
													<li
														onClick={() => handleViewProfile(inquiry.inquiry_to_member_id)}
														className="active"
													>
														View Profile
													</li>
													<li
														style={{ cursor: 'pointer' }}
														onClick={() =>
															openReportPopup(inquiry.inquiry_id, inquiry.report_inquiry)
														}
													>
														{inquiry.report_inquiry ? (
															<span>UnReport</span>
														) : (
															<span>Report</span>
														)}
													</li>
													<li onClick={() => handleDeleteInquiry(inquiry.inquiry_id)}>
														Delete
													</li>
												</ul>
											</DropDown>
										</div>
									</div>
								</div>
							))
						) : (
							<ImagePlaceholder
								height={300}
								image="/images/inquiry-image.png"
								text="You don’t have any messages."
								buttonText="Find A lawyer"
								link="/find-a-lawyer"
							/>
						)}
					</div>
				) : (
					<div>
						{currentSavedInquires.length > 0 ? (
							currentSavedInquires.map((inquiry: any, index: any) => (
								<div
									className={`card-inquiries mt-3 ${inquiry.status === 'unseen' ? 'active' : ''}`}
									key={index}
								>
									<div className="row align-items-center">
										<div className="col-lg-9 col-md-8 col-8 d-flex">
											<div className="mx-1 mt-2">
												{inquiry.inquiry_saved ? (
													<p
														style={{ cursor: 'pointer' }}
														onClick={() => handleSaveMessages(inquiry.inquiry_id)}
													>
														<BsStarFill width={20} color="#02142d" />
													</p>
												) : (
													<p
														style={{ cursor: 'pointer' }}
														onClick={() => handleSaveMessages(inquiry.inquiry_id)}
													>
														<img src="/images/Union.svg" alt="Union" />
													</p>
												)}
											</div>
											<Link
												href={`/user/messages/${inquiry.inquiry_id}`}
												className="d-flex align-items-center"
											>
												<div className="mx-2">
													<p className="green-dark font-small weight-bold">
														{inquiry.recipient_fullname}
													</p>
													{inquiry.response_type === 'text' ||
														inquiry.response_type === null ? (
														<p className="text-sonic-silver font-x-small weight-light">
															{inquiry.response_message !== null
																? inquiry.response_message
																: inquiry.message}
														</p>
													) : (
														<div>
															{inquiry.response_type === 'pdf' && (
																<img src="/icon/pdf.png" alt="pdf-file" width={30} />
															)}
															{inquiry.response_type === 'doc' && (
																<img src="/icon/doc.png" alt="image-file" width={30} />
															)}
															{inquiry.response_type === 'xls' && (
																<img
																	src="/icon/excel.png"
																	alt="image-file"
																	width={30}
																/>
															)}
															{inquiry.response_type === 'ppt' && (
																<img src="/icon/ppt.png" alt="image-file" width={30} />
															)}
															{inquiry.response_type === 'image' && (
																<p className="text-sonic-silver font-x-small weight-light">
																	Image
																</p>
															)}
															{inquiry.response_type === 'video' && (
																<p className="text-sonic-silver font-x-small weight-light">
																	Video
																</p>
															)}
														</div>
													)}
												</div>
											</Link>
										</div>
										<div className="col-lg-2 col-md-2 p-0 col-2 text-right">
											<p className="green-dark font-x-small weight-bold">
												{formatDateTime(inquiry.inquiry_created_at)}
											</p>
										</div>
										<div className="col-lg-1 col-md-2 col-2 text-center">
											<DropDown
												label={<EllipsisHorizontalIcon color="#000" width={20} height={20} />}
											>
												<ul>
													<li onClick={() => handleViewProfile(inquiry.inquiry_to_member_id)}>
														View Profile
													</li>
													<li onClick={() => handleDeleteInquiry(inquiry.inquiry_id)}>
														Delete
													</li>
												</ul>
											</DropDown>
										</div>
									</div>
								</div>
							))
						) : (
							<ImagePlaceholder
								height={300}
								image="/images/inquiry-image.png"
								text="You don’t have any messages."
								buttonText="Find A lawyer"
								link="/find-a-lawyer"
							/>
						)}
					</div>
				)}

				{showInboxMessage ? (
					<div className="text-right mt-5 m-none">
						{currentInquires.length > 10 && (
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								handlePageChange={handlePageChange}
							/>
						)}
					</div>
				) : (
					<div className="text-right mt-5 m-none">
						{currentSavedInquires.length > 10 && (
							<Pagination
								currentPage={currentPageSaved}
								totalPages={totalPagesSaved}
								handlePageChange={handlePageChangeSaved}
							/>
						)}
					</div>
				)}

				<Popup
					show={deleteMessagePopop}
					title="Delete message ?"
					size="sm"
					onCancel={() => setdeleteMessagePopop(false)}
					onOk={deleteInquiryApiCall}
					okText="confirm"
				>
					<p>This action will remove the message from your inbox.</p>
				</Popup>

				<Popup
					show={viewProfile}
					title=""
					size="sm"
					footer={false}
					onCancel={() => setviewProfile(false)}
					onOk={() => setviewProfile(false)}
				>
					{laywerData && <ViewProfile laywerData={laywerData} />}
				</Popup>

				<Popup show={reportSubmitPopup} size="sm" footer={false} onCancel={() => setreportSubmitPopup(false)}>
					<div className="modal-body">
						<h5 className="modal-title f-22 weight-bold social-link mb-4" id="exampleModalLabel">
							Report User
						</h5>
						<p className="text-sonic-silver weight-medium font-small ">Select a reason:</p>
						<div className="form-fild-des">
							<label className="social-link font-small weight-medium w-100 mt-2">
								<input
									type="radio"
									name="report"
									value="inappropriate/offensive"
									onChange={handleReportReasonChange}
								/>
								<span className="checkmark"></span>
								Inappropriate/Offensive
							</label>
							<label className="social-link font-small weight-medium w-100 mt-2">
								<input type="radio" name="report" value="spam" onChange={handleReportReasonChange} />
								<span className="checkmark"></span>
								Spam (ads, self-promotion)
							</label>
							<label className="social-link font-small weight-medium w-100 mt-2">
								<input
									type="radio"
									name="report"
									value="other"
									checked={isOtherChecked}
									onChange={handleReportReasonChange}
								/>
								<span className="checkmark"></span>
								Other
							</label>
							{isOtherChecked && (
								<textarea
									className="form-fild w-100 h-110"
									style={{ height: '110px' }}
									placeholder="Please state a reason..."
									value={otherReason}
									onChange={e => setOtherReason(e.target.value)}
								></textarea>
							)}
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-cancel" onClick={() => setreportSubmitPopup(false)}>
							Cancel
						</button>
						<button
							className="bg-893168 weight-semi-bold font-small  mar-top-min b-r-btn"
							onClick={() => handleReportMessages(selectedInqId)}
						>
							Report
						</button>
					</div>
				</Popup>
			</div>
		</div>
	);
}
