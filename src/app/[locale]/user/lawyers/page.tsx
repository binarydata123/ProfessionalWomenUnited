'use client';
import React, { useState, useEffect, useContext } from 'react';
import './lawyer.css';
import Link from 'next/link';
import {
	getRecentUserlawyer,
	getlawyerSavedByUser,
	getSavedlawyerByUser,
	lawyerSavedByUser,
	lawyerReportByUser,
	lawyerdeleteByUser
} from '../../../../../lib/enduserapi';
import ImagePlaceholder from '@/commonUI/ImagePlaceholder';
import LaywerRecent from '@/components/user/LaywerRecent';
import { toast } from 'react-toastify';
import Pagination from '@/commonUI/Pagination';
import Popup from '@/commonUI/Popup';
import LawyerSaved from '@/components/user/LawyerSaved';
import AuthContext from '@/context/AuthContext';

export default function page() {
	const { user } = useContext(AuthContext);
	const [user_id, setUserId] = useState('');
	const [lawyer, setAllLawyer]: any = useState([]);
	const [savedlawyer, setsavedLawyers] = useState([]);
	const [reportSubmitPopup, setreportSubmitPopup] = useState(false);
	const [selectedLawyerId, setSelectedLawyerId] = useState(null);
	const [checkreport, setCheckReport]: any = useState(false);
	const [checksavelawyer, setCheckSaveLawyer]: any = useState(false);
	const [showRecentMessage, setshowRecentMessage] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentPosts = lawyer ? lawyer.slice(startIndex, endIndex) : null;
	const totalPages = Math.ceil(lawyer?.length / itemsPerPage);
	const [isOtherChecked, setIsOtherChecked] = useState(false);
	const [reportReason, setReportReason] = useState<string>('');
	const [otherReason, setOtherReason] = useState<string>('');
	const handlePageChange = (newPage: any) => {
		setCurrentPage(newPage);
	};

	const [currentPageSaved, setCurrentPageSaved] = useState(1);
	const itemsPerPageSaved = 8;
	const startIndexSaved = (currentPageSaved - 1) * itemsPerPageSaved;
	const endIndexSaved = startIndexSaved + itemsPerPageSaved;
	const currentSavedLawyers = savedlawyer.slice(startIndexSaved, endIndexSaved);
	const totalPagesSaved = Math.ceil(savedlawyer.length / itemsPerPageSaved);

	const handlePageChangeSaved = (newPage: number) => {
		setCurrentPageSaved(newPage);
	};

	useEffect(() => {
		user?.id ? setUserId(user?.id) : setUserId('');
		getAllLawyerData(user?.id);
		getSavedAllLawyerData(user?.id);
	}, [checksavelawyer, checkreport, user_id]);

	const getAllLawyerData = async (user_id: any) => {
		try {
			const res = await getRecentUserlawyer({ memberId: user_id });
			setAllLawyer(res.data);
		} catch (error) {
			console.error('Error fetching reviews:', error);
		}
	};

	const getSavedAllLawyerData = async (user_id: any) => {
		try {
			const res = await getSavedlawyerByUser({ memberId: user_id });
			setsavedLawyers(res.data);
		} catch (error) {
			console.error('Error fetching reviews:', error);
		}
	};

	const getCheckSavedLawyer = async (user_id: any, lawyerId: any) => {
		try {
			const res = await getlawyerSavedByUser({
				memberId: user_id,
				lawyerId: lawyerId
			});
			const savedValue = res.data;

			if (savedValue == '1') {
				setCheckSaveLawyer(savedValue);
			} else {
				setCheckSaveLawyer(savedValue);
			}
		} catch (error) {
			console.error('Error fetching check saved lawyer data:', error);
		}
	};

	const toggleMessages = (msg: string) => {
		if (msg === 'inbox') {
			setshowRecentMessage(true);
		} else {
			setshowRecentMessage(false);
		}
	};

	const deletelaywerApiCall = async (lawyer_id: any) => {
		const data = {
			memberId: user_id,
			lawyerId: lawyer_id
		};
		try {
			const response = await lawyerdeleteByUser(data);
			if (response.message == true) {
				toast.success('Lawyer remove successfully');
			}
			handleSaveLayer(lawyer_id);
			getAllLawyerData(user_id);
			setAllLawyer();
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	const deleteRecentlaywerApiCall = async (id: any) => {
		const data = {
			memberId: user_id,
			lawyerId: id
		};
		try {
			const response = await lawyerdeleteByUser(data);
			if (response.message == true) {
				toast.success('Lawyer remove successfully');
			}
			getCheckSavedLawyer(user_id, id);
			getAllLawyerData(user_id);
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	const handleSaveLayer = async (lawyerId: any) => {
		try {
			setCheckSaveLawyer(() => !checksavelawyer);
			const response = await lawyerSavedByUser({ memberId: user_id, lawyerId });
		} catch (error) {
			console.error('Error saving messages:', error);
		}
	};

	const handleRecentSaveLayer = async (lawyerId: any) => {
		try {
			setCheckSaveLawyer(() => !checksavelawyer);
			const response = await lawyerSavedByUser({ memberId: user_id, lawyerId });
		} catch (error) {
			console.error('Error saving messages:', error);
		}
	};
	const handleReportMessages = async () => {
		const reasonToReport = isOtherChecked ? otherReason : reportReason;
		if (!reasonToReport) {
			toast.error('Please select a reason for the report.');
			return;
		}

		try {
			const data = {
				reportedBy: user_id,
				reportedTo: selectedLawyerId,
				reportReason: reportReason,
				otherReason: otherReason
			};

			const response = await lawyerReportByUser(data);

			if (response.status === true) {
				toast.success('Lawyer successfully reported');
				setreportSubmitPopup(false);
				setCheckReport(true);
				setreportSubmitPopup(false);
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	const handleReportReasonChange = (e: any) => {
		const selectedValue = e.target.value;
		setOtherReason(selectedValue === 'other' ? '' : otherReason);
		setReportReason(selectedValue);
		setIsOtherChecked(selectedValue === 'other' ? !isOtherChecked : false);
	};

	return (
		<>
			<div className="right-body">
				<div className="height-fixed1">
					<div id="sticky">
						<h4 className="font-xx-large social-link weight-semi-bold">Lawyers</h4>
						<div className="row mb-1">
							<div className="col-sm-12">
								<div className="nav-tab p-set d-flex justify-content-between">
									<ul>
										<li className={`${showRecentMessage ? 'active' : ''}`}>
											<Link onClick={e => toggleMessages('inbox')} href="">
												Recent
											</Link>
										</li>
										<li className={`${!showRecentMessage ? 'active' : ''}`}>
											<Link onClick={e => toggleMessages('saved')} href="">
												Saved ({savedlawyer.length})
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					<div className="height-fixed">
						{showRecentMessage ? (
							<div className="mt-4">
								{currentPosts.length > 0 ? (
									currentPosts.map((lawyerdata: any, index: any) => (
										<LaywerRecent
											lawyerdata={lawyerdata}
											key={lawyerdata.id}
											handleDelete={() => deleteRecentlaywerApiCall(lawyerdata.id)}
											handleSave={() => handleRecentSaveLayer(lawyerdata.id)}
										/>
									))
								) : (
									<ImagePlaceholder
										height={300}
										image="/images/cant-find.svg"
										text="Seems like you haven't found a lawyer."
										buttonText="Find A Lawyer"
										link="/find-a-lawyer"
									/>
								)}
							</div>
						) : (
							<div className="mt-5">
								{currentSavedLawyers.length > 0 ? (
									currentSavedLawyers.map((lawyerdata: any, index: any) => (
										<LawyerSaved
											lawyerdata={lawyerdata}
											key={index}
											handleDelete={() => deletelaywerApiCall(lawyerdata.lawyer_id)}
											handleSave={() => handleSaveLayer(lawyerdata.lawyer_id)}
										/>
									))
								) : (
									<ImagePlaceholder
										height={300}
										image="/images/cant-find.svg"
										text="Seems like you haven't found a lawyer."
										buttonText="Find A Lawyer"
										link="/find-a-lawyer"
									/>
								)}
							</div>
						)}
						{showRecentMessage ? (
							<div className="text-right mt-5 m-none">
								{currentPosts.length > 10 && (
									<Pagination
										currentPage={currentPage}
										totalPages={totalPages}
										handlePageChange={handlePageChange}
									/>
								)}
							</div>
						) : (
							<div className="text-right mt-5 m-none">
								{currentSavedLawyers.length > 10 && (
									<Pagination
										currentPage={currentPageSaved}
										totalPages={totalPagesSaved}
										handlePageChange={handlePageChangeSaved}
									/>
								)}
							</div>
						)}
					</div>

					<Popup
						show={reportSubmitPopup}
						size="sm"
						footer={false}
						onCancel={() => setreportSubmitPopup(false)}
					>
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
									<input
										type="radio"
										name="report"
										value="spam"
										onChange={handleReportReasonChange}
									/>
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
							<button
								type="button"
								className="btn btn-cancel"
								onClick={() => setreportSubmitPopup(false)}
							>
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
			</div>
		</>
	);
}
