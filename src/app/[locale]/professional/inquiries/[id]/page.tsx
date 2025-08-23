'use client';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { toast } from 'react-toastify';
import { ChevronLeftIcon } from '@heroicons/react/20/solid';
import { RiFlag2Line, RiFlag2Fill, RiFilePdfFill, RiFilePdf2Line, RiVideoAddLine, RiFile2Line } from 'react-icons/ri';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { VscSend } from 'react-icons/vsc';
import '../inquiries.css';
import Image from 'next/image';
import Link from 'next/link';
import PrimaryButton from '@/commonUI/PrimaryButton';
import {
	getmessagesByInquiry,
	SaveInquiriesByLawyer,
	reportInquiriesByLawyer,
	unReportInquiriesByLawyer,
	markReadInquiry,
	sendInquiryResponse,
	getUserDetailByInquiry
} from '../../../../../../lib/lawyerapi';
import {
	formatDateTime,
	capitalizeFirstLetterOfEachWord,
	formatDateTimeForChat
} from '../../../commonfunctions/commonfunctions';
import Popup from '@/commonUI/Popup';
import AuthContext from '@/context/AuthContext';

interface Message {
	inquiry_by: any;
	message: string;
	created_at: any;
	inquiry_by_image_name: string;
	inquiry_by_gender: string;
	type: any;
}

export default function Page({ params }: { params: { id: number } }) {
	const { user } = useContext(AuthContext)
	const messageListRef = useRef<HTMLDivElement | null>(null);
	const [reportSubmitPopup, setreportSubmitPopup] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [saveMessage, setsaveMessage] = useState(false);
	const [reportMessage, setreportMessage] = useState(false);
	const [isOtherChecked, setIsOtherChecked] = useState(false);
	const [reportReason, setReportReason] = useState<string>('');
	const [otherReason, setOtherReason] = useState<string>('');
	const [user_id, setUserId] = useState('');
	const [userName, setuserName] = useState('');
	const [messageText, setMessageText] = useState('');
	const [inquiryByUserId, setInquiryByUserId] = useState('');
	const [attachment, setAttachment] = useState<File | null>(null);
	const [attachmentURL, setAttachmentURL] = useState<string | null>(null);
	const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);
	const [attachmentIcon, setAttachmentIcon] = useState<React.ReactNode | null>(null);
	const [viewProfile, setviewProfile] = useState(false);
	const [userData, setUserData] = useState<UserData | null>(null); // Add userData state
	const inqId = params.id;

	useEffect(() => {
		user?.id ? setUserId(user?.id) : setUserId('');
		user?.name ? setuserName(capitalizeFirstLetterOfEachWord(user?.name)) : setuserName('');

		fetchMessages(user?.id, inqId);
		handleReadInquiry(user?.id, inqId);
	}, []);

	// Add the handleViewProfile function
	const handleViewProfile = async (memberId: number) => {
		const data = {
			user_id: user_id,
			memberId: memberId
		};
		try {
			const response = await getUserDetailByInquiry(data);
			if (response.status === true) {
				setUserData(response.data);
				setviewProfile(true);
			}
		} catch (error) {
			console.error('Error fetching user profile:', error);
		}
	};
	useEffect(() => {
		if (inquiryByUserId) {
			handleViewProfile(parseInt(inquiryByUserId));
		}
	}, [inquiryByUserId]);


	useEffect(() => {
		if (messageListRef.current) {
			messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
		}
	}, [messages]);

	const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			const selectedFile = e.target.files[0];
			if (selectedFile.size <= 1024 * 1024 * 10) {
				setAttachment(selectedFile);

				if (selectedFile.type.startsWith('image/')) {
					const fileURL = URL.createObjectURL(selectedFile);
					setThumbnailURL(fileURL);
					setAttachmentIcon(null);
				} else if (selectedFile.type === 'application/pdf') {
					setAttachmentIcon(<Image src="/icon/pdf.png" alt="pdf-file" width={50} height={50} />);
					setThumbnailURL(null);
				} else if (selectedFile.type.startsWith('video/')) {
					setAttachmentIcon(<RiVideoAddLine size={32} />);
					setThumbnailURL(null);
				} else if (
					selectedFile.type === 'application/msword' ||
					selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
				) {
					setAttachmentIcon(<Image src="/icon/doc.png" alt="pdf-file" width={50} height={50} />);
					setThumbnailURL(null);
				} else if (
					selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
					selectedFile.type === 'application/vnd.ms-excel'
				) {
					setAttachmentIcon(<Image src="/icon/excel.png" alt="pdf-file" width={50} height={50} />);
					setThumbnailURL(null);
				} else if (
					selectedFile.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
					selectedFile.type === 'application/vnd.ms-powerpoint'
				) {
					setAttachmentIcon(<Image src="/icon/ppt.png" alt="pdf-file" width={50} height={50} />);
					setThumbnailURL(null);
				}
			} else {
				toast.error('File size should not exceed 10 MB.');
				e.target.value = '';
			}
		}
	};

	const handleRemoveAttachment = () => {
		setAttachment(null);
		setThumbnailURL(null);
		setAttachmentIcon(null);
	};

	const handleReadInquiry = async (user_id: any, inqId: number) => {
		try {
			const response = await markReadInquiry(user_id, inqId);
		} catch (error) {
			console.error('Error fetching messages:', error);
		}
	};

	const handleSaveMessages = async () => {
		setsaveMessage(!saveMessage);
		try {
			const response = await SaveInquiriesByLawyer(user_id, inqId, saveMessage);
			if (response) {
				// router.push('/professional/inquiries');
			}
		} catch (error) {
			console.error('Error saving messages:', error);
		}
	};

	const handleReportMessages = async () => {
		const reasonToReport = isOtherChecked ? otherReason : reportReason;
		if (!reasonToReport) {
			toast.error('Reason for report is required');
			return;
		}
		try {
			const response = await reportInquiriesByLawyer(user_id, inqId, reportReason, otherReason);
			if (response.status === true) {
				setreportMessage(true);
				toast.success('Inquiry successfully reported');
				setreportSubmitPopup(false);
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	const handleUnreportMessages = async () => {
		try {
			const response = await unReportInquiriesByLawyer(user_id, inqId);
			if (response.status === true) {
				setreportMessage(false);
				toast.success('Inquiry unreported successfully ');
				setreportSubmitPopup(false);
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	const fetchMessages = async (user_id: any, inqId: number) => {
		try {
			const response = await getmessagesByInquiry(user_id, inqId);
			console.log(response.data, 'fgdfgdfg')
			setMessages(response.data);
			setInquiryByUserId(response.data[0].by_id);
			const inqSavedStatus = response.inqSavedStatus[0].inqSavedStatus;
			inqSavedStatus == 1 ? setsaveMessage(true) : setsaveMessage(false);
			const inqReportStatus = response.inqReportStatus[0].inqReportStatus;
			inqReportStatus == 1 ? setreportMessage(true) : setreportMessage(false);
		} catch (error) {
			console.error('Error fetching messages:', error);
		}
	};

	const handleReportReasonChange = (e: any) => {
		const selectedValue = e.target.value;
		setOtherReason(selectedValue === 'other' ? '' : otherReason);
		setReportReason(selectedValue);
		setIsOtherChecked(selectedValue === 'other' ? !isOtherChecked : false);
	};

	const openReportPopup = () => {
		if (reportMessage === false) {
			setreportSubmitPopup(true);
		} else {
			handleUnreportMessages();
		}
	};

	const sendMessage = async () => {
		if (!(messageText.trim() !== '' || attachment)) {
			return;
		}

		try {
			const formData = new FormData();
			formData.append('user_id', user_id);
			formData.append('inqId', inqId.toString());
			formData.append('inquiryByUserId', inquiryByUserId);
			formData.append('message', messageText);

			if (attachment) {
				if (attachment.type.startsWith('image/')) {
					formData.append('attachment_type', 'image');
				} else if (attachment.type.startsWith('video/')) {
					formData.append('attachment_type', 'video');
				} else if (attachment.type === 'application/pdf') {
					formData.append('attachment_type', 'pdf');
				} else if (
					attachment.type === 'application/msword' ||
					attachment.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
				) {
					formData.append('attachment_type', 'doc');
				} else if (
					attachment.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
					attachment.type === 'application/vnd.ms-excel'
				) {
					formData.append('attachment_type', 'xls');
				} else if (
					attachment.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ||
					attachment.type === 'application/vnd.ms-powerpoint'
				) {
					formData.append('attachment_type', 'ppt');
				}
				formData.append('attachment', attachment);
			} else {
				formData.append('attachment_type', 'text');
			}

			const response = await sendInquiryResponse(formData);
			if (response) {
				setMessageText('');
				setAttachment(null);
				setAttachmentURL(null);
				fetchMessages(user_id, inqId);
			}
		} catch (error) {
			console.error('Error sending message:', error);
		}
	};

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	const profileImageSrc =
		messages?.length > 0
			? messages[0].inquiry_by_image_name
				? '/images/profile/' + messages[0].inquiry_by_image_name
				: messages[0].inquiry_by_gender === 'male'
					? '/images/default/group-242.png'
					: messages[0].inquiry_by_gender === 'female'
						? '/images/default/group-242.png'
						: '/images/default/group-242.png'
			: '';

	return (
		<>
			<div className="single-inquiry-wrapper pt-5 mt-3">
				<div className="right-body">
					<Link href={'/professional/inquiries'} className="one-step-back-button">
						<ChevronLeftIcon width={20} /> Inbox
					</Link>
					<div className="client-info d-lg-flex justify-content-between">
						<div className="left-info d-lg-flex align-items-center gap-2">
							{/* {messages?.length > 0 ? (
								<Image
									src={process.env.NEXT_PUBLIC_IMAGE_URL + profileImageSrc}
									alt="single-inquiry"
									width={40}
									height={40}
								/>
							) : (
								<Image src={'/images/profile-circle.png'} alt="single-inquiry" width={40} height={40} />
							)} */}
							<h4 className="py-3">{messages?.length > 0 ? messages[0].inquiry_by : 'Client Name'}</h4>

						</div>



						<div className="right-info-btn d-flex align-items-center gap-2">
							<p
								className="info-btn d-flex gap-2 align-items-center"
								style={{ cursor: 'pointer' }}
								onClick={openReportPopup}
							>
								{reportMessage ? (
									<RiFlag2Fill width={20} color="#02142d" />
								) : (
									<RiFlag2Line width={20} />
								)}
								<span>Report</span>
							</p>
							<p
								className="info-btn d-flex gap-2 align-items-center"
								style={{ cursor: 'pointer' }}
								onClick={handleSaveMessages}
							>
								{saveMessage ? <BsStarFill width={20} color="#02142d" /> : <BsStar width={20} />}
								<span>Save</span>
							</p>
						</div>
					</div>
					{viewProfile && userData && (
						<div className="user-profile-details">
							<div className="d-flex align-items-center mb-2">
								<span className="text-muted me-2">Email:</span>
								<span>{userData.email}</span>
							</div>
							<div className="d-flex align-items-center mb-2">
								<span className="text-muted me-2">Location:</span>
								<span>{userData.location_name}</span>
							</div>
							<div className="d-flex align-items-center mb-2">
								<span className="text-muted me-2">Phone:</span>
								<span>{userData.phone_number}</span>
							</div>
							{/* <p>Email: {userData.email}</p>
							<p>Location: {userData.location_name}</p>
							<p>Phone: {userData.phone_number}</p> */}
							{/* <p>Gender: {userData.gender}</p> */}
						</div>
					)}
				</div>
				<hr />
				<div className="inquiry-message-box right-body">
					<div className="message-list" ref={messageListRef}>
						{messages?.map((message, index) => (
							<div
								className={`inquiry-message-item ${message.inquiry_by === userName ? 'active' : ''
									} mt-3`}
								key={index}
							>
								<h5>
									{message.inquiry_by === userName ? 'You ' : message.inquiry_by} •{' '}
									<span>{formatDateTimeForChat(message.created_at)}</span>
								</h5>
								{message.type === 'text' && <p className="mt-2">{message.message}</p>}
								{message.type == 'image' && (
									<Link
										href={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/chat/${message.message}`}
										target="_blank"
										rel="noopener noreferrer"
									>
										<img
											src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/chat/${message.message}`}
											alt="Image Attachment"
											className="attachment-preview m-2"
											width="300px"
										/>
									</Link>
								)}
								{message.type == 'pdf' && (
									<a
										href={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/chat/${message.message}`}
										target="_blank"
										className="mt-2"
										rel="noopener noreferrer"
									>
										<Image src="/icon/pdf.png" alt="pdf-file" width={50} height={50} />
									</a>
								)}
								{message.type == 'video' && (
									<video controls width="320" height="240" className="mt-2">
										<source
											src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/chat/videos/${message.message}`}
											type="video/mp4"
										/>
									</video>
								)}

								{message.type == 'doc' && (
									<a
										href={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/chat/${message.message}`}
										target="_blank"
										className="mt-2"
										rel="noopener noreferrer"
									>
										<Image src="/icon/doc.png" alt="pdf-file" width={50} height={50} />
									</a>
								)}

								{message.type == 'xls' && (
									<a
										href={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/chat/${message.message}`}
										target="_blank"
										className="mt-2"
										rel="noopener noreferrer"
									>
										<Image src="/icon/excel.png" alt="pdf-file" width={50} height={50} />
									</a>
								)}

								{message.type == 'ppt' && (
									<a
										href={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/chat/${message.message}`}
										target="_blank"
										className="mt-2"
										rel="noopener noreferrer"
									>
										<Image src="/icon/ppt.png" alt="pdf-file" width={70} height={70} />
									</a>
								)}
							</div>
						))}
					</div>
					<div className="message-send-area">
						{attachment && (
							<div className="attachment-box">
								{thumbnailURL && (
									<img
										src={thumbnailURL}
										alt="Image Attachment"
										width="200px"
										className="attachment-preview"
									/>
								)}
								<div className="attachment-info">
									{attachmentIcon && <div className="attachment-icon">{attachmentIcon}</div>}
									<div className="attachment-name">{attachment.name}</div>
								</div>
								<button className="btn btn-sm btn-danger mb-2" onClick={handleRemoveAttachment}>
									Remove
								</button>
							</div>
						)}
						<div className="input-group mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Type a message"
								aria-label="Recipient's username"
								aria-describedby="basic-addon2"
								value={messageText}
								onChange={e => setMessageText(e.target.value)}
								onKeyDown={handleInputKeyDown}
							/>
							<span className="input-group-text file-attachments">
								<label htmlFor="attachmentInput" style={{ cursor: 'pointer' }}>
									<img src="/images/paperclip-2.png" alt="Upload Icon" />
									<input
										id="attachmentInput"
										type="file"
										accept="image/*, video/*, application/pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
										style={{ display: 'none' }}
										onChange={handleAttachmentChange}
									/>
								</label>
							</span>
							<div className="input-group-append">
								<PrimaryButton onClick={sendMessage}>
									<VscSend width={30} />
								</PrimaryButton>
							</div>
						</div>
					</div>
				</div>
			</div>
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
						onClick={handleReportMessages}
					>
						Report
					</button>
				</div>
			</Popup>
		</>
	);
}
