'use client';
import React, { useState, useEffect, useRef, useContext } from 'react';
import Link from 'next/link';
import './laywersaved.css';
import {
	lawyerReportByUser,
	lawyerUnReportByUser,
	lawyerReportCheckByUser,
	getlawyerSavedByUser
} from '../../../../lib/enduserapi';
import {
	FacebookShareButton,
	FacebookIcon,
	RedditShareButton,
	RedditIcon,
	WhatsappShareButton,
	WhatsappIcon,
	LinkedinShareButton,
	LinkedinIcon
} from 'next-share';
import { toast } from 'react-toastify';
import Popup from '@/commonUI/Popup';
import AuthContext from '@/context/AuthContext';
import { getAdminImageSrc130x130 } from '@/app/[locale]/commonfunctions/commonfunctions';

interface Props {
	lawyerdata?: any;
	handleDelete?: any;
	handleSave?: any;
}
export default function LawyerSaved({ lawyerdata, handleDelete, handleSave }: Props) {
	const { user } = useContext(AuthContext)
	const [user_id, setUserId] = useState('');
	const anchorRef = useRef<HTMLAnchorElement | null>(null);
	const [reportSubmitPopup, setreportSubmitPopup] = useState(false);
	const [reportMessage, setreportMessage] = useState(false);
	const [selectedLawyerId, setSelectedLawyerId] = useState(null);
	const [checkreport, setCheckReport]: any = useState(false);
	const [checksavelawyer, setCheckSaveLawyer]: any = useState(false);
	const [isOtherChecked, setIsOtherChecked] = useState(false);
	const [reportReason, setReportReason] = useState<string>('');
	const [otherReason, setOtherReason] = useState<string>('');

	useEffect(() => {
		if (user) {
			user?.id ? setUserId(user?.id) : setUserId('');
			getCheckSavedLawyer(user?.id, lawyerdata.lawyer_id);
		}
		getCheckReportData(lawyerdata.lawyer_id);
	}, [checksavelawyer, checkreport, user_id, lawyerdata.lawyer_id]);

	const getCheckSavedLawyer = async (user_id: any, lawyerId: any) => {
		try {
			const res = await getlawyerSavedByUser({
				memberId: user_id,
				lawyerId: lawyerId
			});
			const savedValue = res.data;
			if (savedValue == '1') {
				setCheckSaveLawyer(true);
			} else {
				setCheckSaveLawyer(false);
			}
		} catch (error) {
			console.error('Error fetching check saved professional data:', error);
		}
	};

	const handleReportMessages = async () => {
		const reasonToReport = isOtherChecked ? otherReason : reportReason;
		if (!reasonToReport) {
			toast.error('Please select a reason for the report.');
			return; // Prevent further execution
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
				setreportMessage(true);
				toast.success('Professional successfully reported');
				setreportSubmitPopup(false);
				setCheckReport(true);
				setreportSubmitPopup(false);
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	const openReportPopup = (id: any = lawyerdata.lawyer_id) => {
		setSelectedLawyerId(id);
		setreportSubmitPopup(true);
	};

	const handleReportReasonChange = (e: any) => {
		const selectedValue = e.target.value;
		setOtherReason(selectedValue === 'other' ? '' : otherReason);
		setReportReason(selectedValue);
		setIsOtherChecked(selectedValue === 'other' ? !isOtherChecked : false);
	};

	const handleUnreportMessages = async (lawyer_id: any) => {
		const data = {
			loginId: user_id,
			lawyerId: lawyer_id
		};

		try {
			const response = await lawyerUnReportByUser(data);
			if (response.message === 'Row deleted successfully') {
				toast.success('Professional successfully unreported');
				setCheckReport(false);
			} else {
				alert('Failed to unreport the lawyer. Please try again.');
			}
		} catch (error) {
			console.error('Error unreporting lawyer:', error);
		}
	};

	const handleIconClick = (lawyerId: any) => {
		setSelectedLawyerId(prevSelectedId => {
			return prevSelectedId === lawyerId ? null : lawyerId;
		});
	};

	const getCheckReportData = async (lawyer_id: any = lawyerdata.lawyer_id) => {
		try {
			const res = await lawyerReportCheckByUser({
				primaryId: lawyer_id,
				reportedBy: user_id
			});
			if (res.data == '1') {
				setCheckReport(true);
			} else {
				setCheckReport(false);
			}
		} catch (error) {
			console.error('Error fetching check report data:', error);
		}
	};

	const handleCallbackSave = () => {
		setCheckSaveLawyer(() => !checksavelawyer);
		handleSave();
	};

	return (
		<>
			<div className="col-md-3 col-6 d-block d-md-none py-3">
				<div className="sort-down">
					<div className="accordion  accordian-phone" id="accordionExample">
						<div className="accordion-item">
							<h2 className="accordion-header" id="headingOne">
								<button
									className="accordion-button p-0 accordian-phone"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#collapseOne"
									aria-expanded="true"
									aria-controls="collapseOne"
								>
									Sort
								</button>
							</h2>
							<div
								id="collapseOne"
								className="accordion-collapse collapse"
								aria-labelledby="headingOne"
								data-bs-parent="#accordionExample"
							>
								<div className="accordion-body p-0">
									<ul className="d-block-li">
										<li className="d-block">Newest</li>
										<li className="d-block">Oldest</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="card-inquiries bg-card-white mt-2">
				<div className="row">
					<div className="col-md-9 col-7">
						<div className="row m-center">
							<div className="col-md-2 col-4 pr-0 big-screen-w">
								<Link href={`/find-a-professional/${lawyerdata.slug}`}>
									<img
										// src="/images/user-popup.png"
										src={getAdminImageSrc130x130(lawyerdata.profile_image, lawyerdata.gender)}
										alt="user-popup"
										width={130}
										height={130}
										// layout="responsive"
										className="w-130 h-130 m-img-fixed"
									/>
								</Link>
							</div>
							<div className="col-md-10 col-8 position-relative">
								<Link href={`/find-a-professional/${lawyerdata.slug}`}>
									<p className="font-large social-link weight-bold">{lawyerdata.full_name}</p>
								</Link>
								<div className="d-none d-lg-block">
									<p className="font-small weight-semi-bold social-link">
										{lawyerdata.service_name}
										{/* at {lawyerdata.company_name} */}
									</p>
									<ul className="rating-location py-1 m-0">
										{lawyerdata.location_name ? (
											<li className="loc">
												<i className="fa-solid fa-location-dot"></i> {lawyerdata.location_name}
											</li>
										) : null}
										<li className="rev">
											{' '}
											<i className="fa-solid fa-star"></i> {lawyerdata.avg_rating_and_reviews}
										</li>
									</ul>
									<button className="btn-mini success-btn mr-1 mb-2">
										{`${lawyerdata.service_name}`}
									</button>
									<button className="btn-mini danger-btn mr-1 mb-2">
										Licensed for {lawyerdata.license_for_years} Years
									</button>
									<button className="btn-mini danger-btn ">
										Free Consultation: {lawyerdata.consultation_duration}
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="col-md-3 col-5 text-right">
						<ul className="rating-location">
							<li className="mr-1 text-left">
								<div className="dropdown card-drop p-0 m-0">
									<button
										className="btn btn-secondary b-none"
										type="button"
										id="dropdownMenu2"
										data-bs-toggle="dropdown"
										aria-expanded="false"
									>
										<img src="/icon/more.svg" alt="more-icon" className="img-set" width={25} />
									</button>
									<ul
										className="dropdown-menu text-right f-w-4 w-100 drop-btn"
										aria-labelledby="dropdownMenu2"
									>
										<li className="active">
											<p
												className="weight-semi-bold"
												onClick={handleDelete}
												style={{ cursor: 'pointer' }}
											>
												{' '}
												Remove from list{' '}
											</p>
										</li>
										<li>
											{checkreport ? (
												<p
													className="weight-semi-bold"
													style={{ cursor: 'pointer' }}
													onClick={() => handleUnreportMessages(lawyerdata.lawyer_id)}
												>
													UnReport
												</p>
											) : (
												<p
													className="weight-semi-bold"
													style={{ cursor: 'pointer' }}
													onClick={() => openReportPopup(lawyerdata.lawyer_id)}
												>
													Report
												</p>
											)}
										</li>
									</ul>
								</div>
							</li>
							<li className="mr-1">
								<i
									className="fa-solid fa-share-from-square font-medium"
									onClick={() => handleIconClick(lawyerdata.lawyer_id)}
									ref={anchorRef}
								></i>
							</li>
							<li className="">
								{/* <i
                    className="fa-solid fa-bookmark font-medium"
                    style={{ cursor: 'pointer' }}
                    onClick={handleCallbackSave}></i> */}
								{checksavelawyer == '1' ? (
									<i
										className="fa-solid fa-bookmark font-medium"
										style={{ cursor: 'pointer' }}
										onClick={handleCallbackSave}
									></i>
								) : (
									<i
										className="fa-regular fa-bookmark font-medium"
										style={{ cursor: 'pointer' }}
										onClick={handleCallbackSave}
									></i>
								)}
							</li>
							{selectedLawyerId === lawyerdata.id && (
								<div className="mt-3">
									<FacebookShareButton
										url={`${process.env.NEXT_PUBLIC_BASE_URL}/find-a-professional/${lawyerdata.slug}`}
									>
										<FacebookIcon size={32} round className="m-2" />
									</FacebookShareButton>
									<RedditShareButton
										url={`${process.env.NEXT_PUBLIC_BASE_URL}/find-a-professional/${lawyerdata.slug}`}
									>
										<RedditIcon size={32} round className="m-2" />
									</RedditShareButton>
									<WhatsappShareButton
										url={`${process.env.NEXT_PUBLIC_BASE_URL}/find-a-professional/${lawyerdata.slug}`}
									>
										<WhatsappIcon size={32} round className="m-2" />
									</WhatsappShareButton>
									<LinkedinShareButton
										url={`${process.env.NEXT_PUBLIC_BASE_URL}/find-a-professional/${lawyerdata.slug}`}
									>
										<LinkedinIcon size={32} round className="m-2" />
									</LinkedinShareButton>
								</div>
							)}
						</ul>
						<div className="d-none d-lg-block">
							<Link href={`/find-a-professional/${lawyerdata.slug}/make-an-inquiry`}>
								<button className="btn-primary mt-1 mb-2">Make An Inquiry </button>
							</Link>
							<p className="mt-2 m-center">
								<Link
									className="boysenberry font-small weight-semi-bold"
									href={`/find-a-professional/${lawyerdata.slug}`}
								>
									View Profile{' '}
									<button className="btn-mini danger-btn border-none icon-rotate">
										<i className="fa-solid fa-arrow-up-long"></i>
									</button>
								</Link>
							</p>
						</div>
					</div>
					<div className="accordion d-block d-lg-none mt-3 accordian-phone" id="accordionExample">
						<div className="accordion-item">
							<h2 className="accordion-header" id="headingOneAccordian">
								<button
									className="accordion-button p-0 accordian-phone"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#collapseOnee"
									aria-expanded="true"
									aria-controls="collapseOne"
								>
									Additional Information
								</button>
							</h2>
							<div
								id="collapseOnee"
								className="accordion-collapse collapse"
								aria-labelledby="headingOneAccordian"
								data-bs-parent="#accordionExample"
							>
								<div className="accordion-body border-0">
									<div className="">
										<p className="font-small weight-semi-bold social-link">
											{lawyerdata.service_name}
											{/* at {lawyerdata.company_name} */}
										</p>
										<ul className="rating-location py-1 m-0">
											<li className="loc">
												<i className="fa-solid fa-location-dot"></i> {lawyerdata.location_name}
											</li>
											<li className="rev">
												{' '}
												<i className="fa-solid fa-star"></i> {lawyerdata.avg_rating_and_reviews}
											</li>
										</ul>
										<button className="btn-mini success-btn mr-1 mb-2">
											{lawyerdata.service_name}
										</button>
										<button className="btn-mini danger-btn mr-1 mb-2">Licensed for 9 years</button>
										<button className="btn-mini danger-btn ">
											Free Consultation: {lawyerdata.consultation_duration}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="d-block d-lg-none">
					<Link href={`/find-a-professional/${lawyerdata.slug}/make-an-inquiry`}>
						<button className="btn-primary  w-100 mt-1 mb-2">Make An Inquiry </button>
					</Link>
					<p className="mt-2 m-center">
						<Link
							className="boysenberry font-small weight-semi-bold"
							href={`/find-a-professional/${lawyerdata.slug}`}
						>
							View Profile{' '}
							<button className="btn-mini danger-btn border-none icon-rotate">
								<i className="fa-solid fa-arrow-up-long"></i>
							</button>
						</Link>
					</p>
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
