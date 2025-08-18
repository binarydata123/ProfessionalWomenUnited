'use client';
import React, { useState, useEffect, useContext } from 'react';
import {
	getAllReviews,
	getAvgRatingReview,
	getStarRatingReview,
	saveReviewReply,
	saveReviewReport,
	getFlagReport,
	flagUnreport
} from '../../../../../../lib/lawyerapi';
import Rating from '@/commonUI/Rating';
import { RiFlag2Line, RiFlag2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Popup from '@/commonUI/Popup';
import AuthContext from '@/context/AuthContext';
import { formatDateMonthDayYear } from '@/app/[locale]/commonfunctions/commonfunctions';

export default function Reviews() {
	const { user } = useContext(AuthContext)
	const [allreviews, setAllReviews]: any = useState([]);
	const [showReplySection, setShowReplySection] = useState(null);
	const [avgrating, setAvgRating]: any = useState([]);
	const [avgrating1, setAvgRating1]: any = useState([]);
	const [starrating, setStarRating]: any = useState([]);
	const [replyText, setReplyText] = useState('');
	const [user_id, setUserId] = useState('');
	const [reportSubmitPopup, setreportSubmitPopup] = useState(false);
	const [reportReason, setReportReason] = useState<string>('');
	const [reviewsForReport, setreviewsForReport]: any = useState([]);

	const [reportStatus, setReportStatus] = useState({});
	const [calculatedStarRatings, setCalculatedStarRatings] = useState({
		star_5: 0,
		star_4: 0,
		star_3: 0,
		star_2: 0,
		star_1: 0
	});

	const handleReplyTextChange = (e: any) => {
		setReplyText(e.target.value);
	};

	useEffect(() => {
		user?.id ? setUserId(user?.id) : setUserId('');
		getAllReviewData(user?.id);
		getAvgRatingData(user?.id);
		getStarRatingData(user?.id);
	}, []);

	const getAvgRatingData = async (user_id: any) => {
		try {
			const avgRatingReviewData = await getAvgRatingReview({ memberId: user_id });
			const avgRatingReviewString = avgRatingReviewData.avg_rating_review;
			const [averageRating, reviewsText] = avgRatingReviewString.split(' ');
			const reviewsCount = reviewsText.replace(/\D+/g, '');
			setAvgRating(averageRating);
			setAvgRating1(reviewsCount);
		} catch (error) {
			console.error('Error fetching average rating:', error);
		}
	};

	const getStarRatingData = async (user_id: any) => {
		try {
			const starRatingReviewData = await getStarRatingReview({ memberId: user_id });
			const starRatingReviewDataString = starRatingReviewData.star_rating;
			const totalReviews = 100 / starRatingReviewDataString.total_reviews;
			const star5 = starRatingReviewDataString.star_5 * totalReviews;
			const star4 = starRatingReviewDataString.star_4 * totalReviews;
			const star3 = starRatingReviewDataString.star_3 * totalReviews;
			const star2 = starRatingReviewDataString.star_2 * totalReviews;
			const star1 = starRatingReviewDataString.star_1 * totalReviews;
			const calculatedStarRatings = {
				star_5: star5,
				star_4: star4,
				star_3: star3,
				star_2: star2,
				star_1: star1
			};
			setCalculatedStarRatings({
				star_5: star5,
				star_4: star4,
				star_3: star3,
				star_2: star2,
				star_1: star1
			});
			const calculatedStarRatingsJSON = JSON.stringify(calculatedStarRatings);
			setStarRating(starRatingReviewDataString);
		} catch (error) {
			console.error('Error fetching star rating:', error);
		}
	};

	const getAllReviewData = async (user_id: any) => {
		try {
			const reviewsData = await getAllReviews({ memberId: user_id });
			setAllReviews(reviewsData.allreviews);
			getAllFlagReviews();
		} catch (error) {
			console.error('Error fetching reviews:', error);
		}
	};

	const toggleReplySection = (reviewId: any) => {
		if (showReplySection === reviewId) {
			setShowReplySection(null);
		} else {
			setShowReplySection(reviewId);
		}
	};

	const starRatingsData = [
		{ rating: 1, width: calculatedStarRatings.star_1, count: starrating.star_1 },
		{ rating: 2, width: calculatedStarRatings.star_2, count: starrating.star_2 },
		{ rating: 3, width: calculatedStarRatings.star_3, count: starrating.star_3 },
		{ rating: 4, width: calculatedStarRatings.star_4, count: starrating.star_4 },
		{ rating: 5, width: calculatedStarRatings.star_5, count: starrating.star_5 }
	];

	const handleSubmitReply = (reviewId: any) => {
		if (replyText.trim() === '') {
			toast.error('Please enter a reply.');
			return;
		}
		const data = {
			user_id: user_id,
			review_id: reviewId,
			reply_text: replyText
		};
		saveReviewReply(data)
			.then(response => {
				if (response.message) {
					toast.success('Reply submitted successfully.');
					setReplyText('');
				} else if (response.error) {
					toast.error('Failed to submit reply. Please try again.');
				} else {
					toast.error('An unexpected response was received.');
				}
				setShowReplySection(null);
				getAllFlagReviews();
			})
			.catch(error => {
				console.error(error);
				toast.error('An error occurred while submitting the reply.');
			});
	};

	const handleReport = () => {
		const data = {
			user_id: user_id,
			review_id: reviewsForReport.id,
			reported_by: user_id,
			reported_to: reviewsForReport.review_by_member_id,
			report_reason: reportReason
		};
		if (!reportReason) {
			toast.error('Please select atleast one option.');
			return;
		}

		saveReviewReport(data)
			.then(response => {
				if (response.message == 'Review reported successfully') {
					toast.success('Reported successfully');
					setreportSubmitPopup(false);
				} else {
					toast.error('This review has already been previously reported');
				}
				getAllFlagReviews();
			})
			.catch(error => {
				console.error(error);
				toast.error('An error occurred while reporting the review');
				setreportSubmitPopup(false);
			});
	};

	const handleflagUnreport = async (reviewId: any) => {
		const data = {
			user_id: user_id,
			id: reviewId
		};
		flagUnreport(data)
			.then(response => {
				if (response.message === 'Row deleted successfully') {
					toast.success('Review unreported successfully');
					setReportStatus({ ...reportStatus, [reviewId]: 'unreported' });
				} else {
					toast.error('Failed to unreport the review. Please try again.');
				}
				getAllFlagReviews();
			})
			.catch(error => {
				console.error(error);
				toast.error('An error occurred while unreporting the review');
			});
	};

	const getAllFlagReviews = async () => {
		try {
			const reviewsData = await getAllReviews({ memberId: user?.id });
			const allReviews = reviewsData.allreviews;
			for (let index = 0; index < allReviews.length; index++) {
				const item = allReviews[index];
				const res = await getFlagReport({ review_id: item.id, reported_to: user?.id });
				item.report = res.data[0].is_reported == '1' ? 'true' : 'false';
			}
			setAllReviews(allReviews);
		} catch (error) {
			console.error('Error fetching reviews and reports:', error);
		}
	};

	const handleReportReasonChange = (e: any) => {
		const selectedValue = e.target.value;
		setReportReason(selectedValue);
	};

	return (
		<div className="edit-profile-wrapper">
			<div className="right-body mt-1">
				<h5 className="font-x-large22 weight-bold green-dark">Review Breakdown</h5>
				<div className="row">
					<div className="col-sm-3">
						<div className="card text-center m-w-141">
							<h2 className="font-larger social-link weight-bold Manrope">
								<i className="fa-solid fa-star font-xx-large green-medium-1 star-"></i> {avgrating}
							</h2>
							<p className="font-x-small text-sonic-silver weight-light">{avgrating1} reviews</p>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="card">
							{starRatingsData.reverse().map((starData, index) => (
								<div className="star-review" key={index}>
									<div className="d-flex">
										<p className="font-small weight-bold w-10">{starData.rating}</p>&nbsp;&nbsp;
										<i className="fa-solid fa-star font-small green-medium-1 "></i>&nbsp;&nbsp;
										<div className="prog">
											<div className="pag-box mt-2">
												<div
													className="g-pag-box"
													style={{
														width: `${starData.width}%`,
														backgroundColor: 'desired-color'
													}}
												></div>
											</div>
										</div>
										&nbsp;&nbsp;
										<p className="font-small weight-medium text-sonic-silver w-10">
											{starData.count}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
					<hr />
				</div>

				<div className="all-reviews">
					<h5 className="font-x-large22 weight-bold green-dark">All Reviews</h5>
					{allreviews.map((review: any, index: any) => (
						<div key={index}>
							<div className="row mt-3">
								<div className="col-sm-8 col-8">
									<div className="top-review-section">
										<Rating rating={review.stars} />
									</div>
									<div className="upload-date">
										<p className="social-link weight-medium font-x-small">
											{review.name} • {formatDateMonthDayYear(review.created_at)}{' '}
										</p>
									</div>
								</div>
								<div className="col-sm-4 col-4 text-right">
									<div className="right-side-report">
										<span
											className="text-sonic-silver font-x-small weight-medium"
											onClick={() => {
												if (review.report == 'true') {
													handleflagUnreport(review.id);
												} else {
													setreportSubmitPopup(true);
													setreviewsForReport(review);
												}
											}}
											style={{ cursor: 'pointer' }}
										>
											{review.report == 'true' ? (
												<RiFlag2Fill width={20} color="#02142d" />
											) : (
												<RiFlag2Line width={20} />
											)}{' '}
											Report
										</span>
									</div>
								</div>
							</div>
							<div className="reviews my-3">
								<div className="review-card">
									<h4 className="social-link font-large weight-medium">{review.title}</h4>
									<p className="text-sonic-silver font-small weight-light">{review.description}</p>
									{review.reply ? (
										<div className="reply-box mt-3">
											<p className="text-sonic-silver font-small weight-light">{review.reply}</p>
											<p className="text-sonic-silver font-x-small weight-semi-bold">
												{formatDateMonthDayYear(review.reply_date)}
											</p>
										</div>
									) : (
										<div>
											<p
												id="reply-btn"
												className="mt-2 boysenberry font-small weight-semi-bold"
												style={{ cursor: 'pointer' }}
												onClick={() => toggleReplySection(review.id)}
											>
												<i className="fa-solid fa-reply"></i> Reply
											</p>
										</div>
									)}
									{showReplySection == review.id && (
										<div id="reply-area">
											<textarea
												className="form-fild w-100 h-110"
												placeholder="Your reply..."
												maxLength={1000}
												onChange={handleReplyTextChange}
											></textarea>
											<div className="text-right">
												<button
													className="bg-893168 weight-semi-bold font-small save-pad mar-top-min mt-3"
													onClick={() => handleSubmitReply(review.id)}
												>
													Submit
												</button>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<Popup show={reportSubmitPopup} size="sm" footer={false} onCancel={() => setreportSubmitPopup(false)}>
				<div className="modal-body">
					<h5 className="modal-title f-22 weight-bold social-link mb-4" id="exampleModalLabel">
						Report Review
					</h5>
					<p className="text-sonic-silver weight-medium font-small ">Select a reason:</p>
					<div className="form-fild-des">
						<label className="social-link font-small weight-medium w-100 mt-2">
							<input
								type="radio"
								name="report"
								value="inappropriate"
								onChange={handleReportReasonChange}
							/>
							<span className="checkmark"></span>
							Inappropriate
						</label>
						<label className="social-link font-small weight-medium w-100 mt-2">
							<input type="radio" name="report" value="irrelevant" onChange={handleReportReasonChange} />
							<span className="checkmark"></span>
							Irrelevant
						</label>
						<label className="social-link font-small weight-medium w-100 mt-2">
							<input
								type="radio"
								name="report"
								value="spam(ads, self-promotion)"
								onChange={handleReportReasonChange}
							/>
							<span className="checkmark"></span>
							Spam (ads, self-promotion)
						</label>
						<label className="social-link font-small weight-medium w-100 mt-2">
							<input
								type="radio"
								name="report"
								value="abusive-message"
								onChange={handleReportReasonChange}
							/>
							<span className="checkmark"></span>
							Abusive Message
						</label>
					</div>
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-cancel" onClick={() => setreportSubmitPopup(false)}>
						Cancel
					</button>
					<button
						className="bg-893168 weight-semi-bold font-small  mar-top-min b-r-btn"
						onClick={handleReport}
					>
						Report
					</button>
				</div>
			</Popup>
		</div>
	);
}
