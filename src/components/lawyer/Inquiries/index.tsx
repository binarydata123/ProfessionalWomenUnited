'use client';
import React, { useState, useEffect, useContext } from 'react';
import DropDown from '@/commonUI/DropDown';
import Link from 'next/link';
import Popup from '@/commonUI/Popup';
import ReportAccount from '@/components/admin/modals/ReportAccount';
import ViewProfile from '@/components/lawyer/Popup/ViewProfile';
import { formatDateTime } from '@/app/[locale]/commonfunctions/commonfunctions';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import {
	SaveInquiriesByLawyer,
	getUserDetailByInquiry,
	reportInquiriesByLawyer,
	unReportInquiriesByLawyer
} from '../../../../lib/lawyerapi';
import './Inquiries.css';
import { BsStarFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { usePathname } from 'next/navigation';
import AuthContext from '@/context/AuthContext';
interface Props {
	index?: number;
	item?: any;
	onDelete: (inqId: number) => void;
	refreshPage: () => void;
}

export default function Inquiries({ index = 0, item, onDelete, refreshPage }: Props) {
	const { user } = useContext(AuthContext)
	const [reportAccount, setreportAccount] = useState(false);
	const [deleteUser, setdeleteUser] = useState(false);
	const [userData, setUserData] = useState<any | null>(null);
	const [viewProfile, setviewProfile] = useState(false);
	const [user_id, setUserId] = useState('');
	const isActive = item.status === 'unseen';
	const [saveMessage, setsaveMessage] = useState(false);
	const [reportMessage, setreportMessage] = useState(false);
	const [reportSubmitPopup, setreportSubmitPopup] = useState(false);
	const [reportReason, setReportReason] = useState<string>('');
	const [otherReason, setOtherReason] = useState<string>('');
	const [isOtherChecked, setIsOtherChecked] = useState(false);

	const pathname = usePathname();

	useEffect(() => {
		user?.id ? setUserId(user?.id) : setUserId('');

		const inqSavedStatus = item.inquiry_saved;
		inqSavedStatus == 1 ? setsaveMessage(true) : setsaveMessage(false);

		const inqReportStatus = item.report_inquiry;
		setreportMessage(inqReportStatus !== null ? true : false);
	}, [item]);

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
			console.error('Error reporting messages:', error);
		}
	};

	const handleSaveMessages = async () => {
		setsaveMessage(!saveMessage);
		try {
			const response = await SaveInquiriesByLawyer(user_id, item.inquiry_id, saveMessage);
			if (response.status === true) {
				toast.success(response.message);
				// window.location.reload();
				refreshPage();
			}
		} catch (error) {
			console.error('Error saving messages:', error);
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

	const handleUnreportMessages = async () => {
		try {
			const response = await unReportInquiriesByLawyer(user_id, item.inquiry_id);
			if (response.status === true) {
				setreportMessage(false);
				toast.success('Inquiry unreported successfully ');
				setreportSubmitPopup(false);
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	const handleReportMessages = async () => {
		const reasonToReport = isOtherChecked ? otherReason : reportReason;
		if (!reasonToReport) {
			toast.error('Reason for report is required');
			return;
		}
		try {
			const response = await reportInquiriesByLawyer(user_id, item.inquiry_id, reportReason, otherReason);
			if (response.status === true) {
				setreportMessage(true);
				toast.success('Inquiry successfully reported');
				setreportSubmitPopup(false);
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	return (
		<div
			className={`card-inquiries mt-2 ${item.status === 'unseen' || item.inquiry_status === 'unseen' ? 'active' : ''
				}`}
		>
			<div className="row align-items-center">
				<div className="col-lg-9 col-md-8 col-8 d-flex">
					{pathname.includes('/dashboard') ? null : (
						<div
							className="info-btn gap-4  align-items-center p-2"
							style={{ cursor: 'pointer' }}
							onClick={handleSaveMessages}
						>
							{saveMessage == true ? (
								<BsStarFill width={20} color="#02142d" />
							) : (
								<img src="/images/Union.svg" alt="card-inquiries" />
							)}
						</div>
					)}
					<Link href={`/professional/inquiries/${item.inquiry_id}`}>
						<p className="green-dark font-small weight-bold">{item.inquirer_fullname}</p>
						{item.response_type === 'text' || item.response_type === null ? (
							<p className="text-sonic-silver font-x-small weight-light">
								{item.message.length > 120
									? `${item.message.slice(0, 120)}...`
									: item.response_message !== null
										? item.response_message
										: item.message}
							</p>
						) : (
							<div>
								{item.response_type === 'pdf' && <img src="/icon/pdf.png" alt="pdf-file" width={30} />}
								{item.response_type === 'doc' && (
									<img src="/icon/doc.png" alt="image-file" width={30} />
								)}
								{item.response_type === 'xls' && (
									<img src="/icon/excel.png" alt="image-file" width={30} />
								)}
								{item.response_type === 'ppt' && (
									<img src="/icon/ppt.png" alt="image-file" width={30} />
								)}
								{item.response_type === 'image' && (
									<p className="text-sonic-silver font-x-small weight-light">Image</p>
								)}
								{item.response_type === 'video' && (
									<p className="text-sonic-silver font-x-small weight-light">Video</p>
								)}
							</div>
						)}
					</Link>
				</div>
				<div className="col-lg-2  col-md-2 p-0 col-2 text-right">
					<p className="green-dark font-x-small weight-bold ">{formatDateTime(item.inquiry_created_at)}</p>
				</div>
				<div className="col-lg-1 col-md-2 col-2 text-center" id="lawyer-dash">
					<DropDown label={<EllipsisHorizontalIcon color="#000" width={20} height={20} />}>
						<ul>
							<li onClick={() => handleViewProfile(item.inquiry_by_member_id)}>View Profile</li>
							<li onClick={() => openReportPopup()}>{reportMessage ? 'Unreport' : 'Report'}</li>
							<li onClick={() => onDelete(item.inquiry_id)}>Delete</li>
						</ul>
					</DropDown>
				</div>
			</div>
			{/* <Popup
        show={reportAccount}
        title="Report Account"
        size="sm"
        onCancel={() => setreportAccount(false)}
        onOk={() => setreportAccount(false)}>
        <ReportAccount />
      </Popup> */}

			<Popup
				show={deleteUser}
				title="Delete Account"
				size="sm"
				onCancel={() => setdeleteUser(false)}
				onOk={() => setdeleteUser(false)}
			>
				Are you sure to delete account?
			</Popup>

			<Popup
				show={viewProfile}
				title=""
				size="sm"
				footer={false}
				onCancel={() => setviewProfile(false)}
				onOk={() => setviewProfile(false)}
			>
				{userData && <ViewProfile userData={userData} />}
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
						onClick={handleReportMessages}
					>
						Report
					</button>
				</div>
			</Popup>
		</div>
	);
}
