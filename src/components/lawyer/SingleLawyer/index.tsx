'use client';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPinIcon } from '@heroicons/react/20/solid';
import { StarIcon } from '@heroicons/react/24/solid';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import Image from 'next/image';
import './singleLawyer.css';
import { getReviewsAverage, getSingleLawyerDetails, isLawyerSaved, saveLawyer } from '../../../../lib/frontendapi';
import { insertProfileView } from '../../../../lib/enduserapi';
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
import ReviewsAverage from '@/commonUI/ReviewsAverage';
import Review from '@/components/public/Review';
import { getAllReviewFrontend } from '../../../../lib/lawyerapi';
import LawyerProfileLoadingPlaceholder from '@/commonUI/LawyerProfileLoadingPlaceholder';
import AuthContext from '@/context/AuthContext';
import ImageComponent from '@/commonUI/ImageComponent';
import { getLawyerImageSrc180x180 } from '@/app/[locale]/commonfunctions/commonfunctions';

const currentYear = new Date().getFullYear();

interface Props {
	slug?: string;
}

export default function SingleLawyer({ slug = '' }: Props) {
	const { user } = useContext(AuthContext)
	const [isSticky, setIsSticky] = useState(false);
	const [loginUser, setloginUser]: any = useState([]);
	const [bookmark, setbookmark] = useState(false);
	const [single_lawyer, setSingleLawyerData] = useState<any>('');
	const [showMore, setShowMore] = useState(false);
	const [activeTab, setActiveTab] = useState('about');
	const [community_contribution, setCommunityContributionCount] = useState('');
	const [reviewsAvg, setreviewsAvg]: any = useState([]);
	const [share, setshare] = useState(false);
	const [allReviews, setallReviews]: any = useState([]);
	const toggleShowMore = () => setShowMore(!showMore);
	const [user_Id, setUserId] = useState('');
	const [lawyer_Id, setlawyersId] = useState('');
	const [visibleReviews, setvisibleReviews] = useState(3);

	useEffect(() => {
		handleSingleLawyerDetails(slug);
		const handleScroll = () => {
			if (window.scrollY > 300) {
				setIsSticky(true);
			} else {
				setActiveTab('about');
				setIsSticky(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			if (user) {
				setUserId(user?.id);
			}
			const res = await getSingleLawyerDetails(slug);
			setlawyersId(res.data.id);

			if (user_Id && lawyer_Id) {
				try {
					await insertProfileView(user_Id, lawyer_Id);
				} catch (error) { }
			}
		};

		fetchData();
	}, [user_Id, lawyer_Id]);

	const handleSingleLawyerDetails = async (id: any) => {
		try {
			const res = await getSingleLawyerDetails(id);
			if (res.status == true) {
				setSingleLawyerData(res.data);
				setCommunityContributionCount(res.community_contribution);
				handleReviewsAvg(res.data.id);
				handleAllReviewData(res.data.id);
				setloginUser(user);
				checkLawyerSaved(res.data.id, user?.id);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleAllReviewData = async (user_id: any) => {
		try {
			const reviewsData: any = await getAllReviewFrontend({ memberId: user_id });
			setallReviews(reviewsData.allreviews);
		} catch (error) {
			console.error('Error fetching reviews:', error);
		}
	};

	const handleReviewsAvg = (id: any) => {
		getReviewsAverage(id).then(res => {
			setreviewsAvg(res.data);
		});
	};

	const handleTabClick = (tabName: any) => {
		setActiveTab(tabName);
	};

	const checkLawyerSaved = (lawyer_id: any, member_id: any) => {
		isLawyerSaved({
			memberId: member_id,
			lawyerId: lawyer_id
		}).then((res: any) => {
			if (res.data == '1') {
				setbookmark(true);
			} else {
				setbookmark(false);
			}
		});
	};

	const scrollToBottom = (e: any) => {
		e.preventDefault();
		const targetId = e.target.getAttribute('href').substring(1);
		const targetElement = document.getElementById(targetId);
		if (targetElement) {
			window.scrollTo({
				top: targetElement.offsetTop,
				behavior: 'smooth'
			});
		}
	};

	const handleSaveLawyer = (id: any) => {
		saveLawyer({
			memberId: user?.id,
			lawyerId: id
		}).then(res => {
			if (res.data == 'saved professional successfully.') {
				setbookmark(true);
			} else {
				setbookmark(false);
			}
		});
	};
	const [isLoading, setisLoading] = useState(true);
	useEffect(() => {
		setisLoading(false);
	});

	const capitalize = (str: string) => {
		if (!str) return "";
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	return (
		<>
			<style jsx>{`
        :root {
          --primary: #C49073;
          --primary-light: #fef7ed;
          --primary-medium: #fed7aa;
        }

        .gradient-bg {
          background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-medium) 100%);
        }

        .hover-scale {
          transition: transform 0.2s ease-in-out;
        }

        .hover-scale:hover {
          transform: scale(1.05);
        }

        .tab-active {
          color: var(--primary) !important;
          border-color: var(--primary) !important;
        }

        .specialization-badge {
          background-color: var(--primary);
          color: white;
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 500;
          margin: 4px;
          display: inline-block;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border: 1px solid #fbbf24;
          padding: 24px;
          margin-bottom: 24px;
        }

        .btn-primary-custom {
          background-color: var(--primary);
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease-in-out;
          border: none;
          cursor: pointer;
        }

        .btn-primary-custom:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          transform: scale(1.05);
          background-color: var(--primary);
          color: white;
        }

        .btn-secondary-custom {
          background-color: white;
          color: #374151;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          border: 2px solid #d1d5db;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .btn-secondary-custom:hover {
          border-color: #9ca3af;
          background-color: white;
          color: #374151;
        }

        .profile-img {
          width: 128px;
          height: 128px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          border: 4px solid white;
        }

        .icon {
          width: 16px;
          height: 16px;
          display: inline-block;
          vertical-align: middle;
        }

        .star-filled {
          color: #fbbf24;
        }

        .nav-tabs .nav-link {
          border: none;
          border-bottom: 2px solid transparent;
          color: #6c757d;
          font-weight: 500;
          padding: 1rem 0.5rem;
          margin-right: 1.5rem;
        }

        .nav-tabs .nav-link.active {
          color: var(--primary);
          border-color: var(--primary);
          background: transparent;
        }

        .nav-tabs .nav-link:hover {
          border-color: #dee2e6 #dee2e6 #dee2e6;
        }

        .border-amber-100 {
          border-color: #fef3c7 !important;
        }
      `}</style>

			{/* Breadcrumb Section */}
			<section className="blog-section start">
				<div className="container">
					<div className="text-left-line text-start pt-lg-5 mt-4">
						{isLoading ? (
							<div
								style={{
									height: '20px',
									backgroundColor: 'rgb(234,212,199)',
									width: '20%',
									marginBottom: '10px'
								}}
							></div>
						) : (
							<ul>
								<li>
									<Link href="/" className="unactive">
										Home
									</Link>
								</li>
								<li>
									<img
										src="/images/legal-service/arrow-right.png"
										alt="right arrow"
										width={15}
										height={15}
									/>
								</li>
								<li>
									<Link href="/find-a-professional" className="unactive">
										Find a professional
									</Link>
								</li>
								<li>
									<Image
										src="/images/legal-service/arrow-right.png"
										alt="right arrow"
										width={15}
										height={15}
									/>
								</li>
								<li>
									<Link href="JavaScript:void(0)">{single_lawyer?.full_name}</Link>
								</li>
							</ul>
						)}
					</div>
				</div>
			</section>

			{/* Header Section */}
			<div className="bg-white shadow-sm border-bottom border-amber-100">
				<div className="container-xl py-4">
					<div className="d-flex flex-column flex-md-row align-items-md-center gap-4">
						{/* Profile Image */}
						<div className="flex-shrink-0 text-center text-md-start">
							{isLoading ? (
								<div
									style={{
										width: '128px',
										height: '128px',
										borderRadius: '50%',
										backgroundColor: 'rgb(249,242,239)'
									}}
								></div>
							) : (
								<ImageComponent
									src={getLawyerImageSrc180x180(
										single_lawyer?.profile_image,
										single_lawyer.gender
									)}
									placeholderImgUrl={
										process.env.NEXT_PUBLIC_IMAGE_URL +
										`/images/default/${single_lawyer.gender == 'male' ? 'male-lawyer-306x200.png' : 'female-lawyer-306x200.png'
										}`
									}
									alt={single_lawyer.full_name}
									width={128}
									height={128}
									className="profile-img"
									style={{ objectFit: 'cover' }}
								/>
							)}
						</div>

						{/* Profile Info */}
						<div className="flex-grow-1">
							{isLoading ? (
								<>
									<div
										style={{
											height: '30px',
											backgroundColor: 'rgb(249,242,239)',
											width: '250px',
											marginBottom: '10px'
										}}
									></div>
									<div
										style={{
											height: '20px',
											backgroundColor: 'rgb(249,242,239)',
											width: '200px',
											marginBottom: '10px'
										}}
									></div>
								</>
							) : (
								<>
									<h1 className="h2 fw-bold text-dark">
										{single_lawyer?.full_name
											?.toLowerCase()
											.replace(/\b\w/g, (char: string) => char.toUpperCase())}
									</h1>
									<div className="d-flex flex-wrap align-items-center gap-2 fs-5 text-secondary mb-2">
										{single_lawyer?.designation && (
											<span className="fw-semibold" style={{ color: 'var(--primary)' }}>
												{single_lawyer?.designation}
											</span>
										)}
										{single_lawyer?.company_name && (
											<>
												<span className="text-secondary">•</span>
												<span>{single_lawyer?.company_name}</span>
											</>
										)}
									</div>
								</>
							)}
							<div className="d-flex flex-wrap align-items-center gap-3 text-muted small">
								{single_lawyer?.location_name && (
									<div className="d-flex align-items-center gap-1">
										<i className="bi bi-geo-alt"></i>
										<span>{single_lawyer?.location_name}</span>
									</div>
								)}
								{single_lawyer?.status == 'active' && (
									<div className="d-flex align-items-center gap-1">
										<i className="bi bi-check-circle-fill text-success"></i>
										<span className="text-success fw-medium">ACTIVE</span>
									</div>
								)}
								{single_lawyer?.updated_at && (
									<div className="d-flex align-items-center gap-1">
										<i className="bi bi-calendar-event"></i>
										<span>
											Updated{' '}
											{new Date(single_lawyer.updated_at).toLocaleDateString('en-GB', {
												day: '2-digit',
												month: '2-digit',
												year: 'numeric'
											})}
										</span>
									</div>
								)}
							</div>
						</div>

						{/* Action Buttons */}
						<div className="d-flex flex-column flex-sm-row gap-2 mt-3 mt-md-0">
							{user?.id != lawyer_Id && (
								<Link
									href={`/find-a-professional/${slug}/make-an-inquiry`}
									className="text-white text-decoration-none"
								>
									<button className="btn btn-primary-custom hover-scale d-flex align-items-center">
										<i className="bi bi-chat-dots me-2"></i>
										Make An Inquiry
									</button>
								</Link>
							)}
							<button
								className="btn btn-secondary-custom"
								onClick={() => setshare(!share)}
							>
								Share Profile
							</button>

							{user?.id && user?.id != lawyer_Id && (
								<>
									{bookmark ? (
										<BsFillBookmarkFill
											style={{ cursor: 'pointer', color: '#c49073', width: '20px', height: '20px', marginLeft: '10px', marginTop: '10px' }}
											onClick={() => handleSaveLawyer(single_lawyer.id)}
										/>
									) : (
										<BsBookmark
											style={{ cursor: 'pointer', color: '#c49073', width: '20px', height: '20px', marginLeft: '10px', marginTop: '10px' }}
											onClick={() => handleSaveLawyer(single_lawyer.id)}
										/>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Share Buttons */}
			{share && (
				<div className="container-xl py-2">
					<div className="d-flex justify-content-center">
						<FacebookShareButton
							url={`${process.env.NEXT_PUBLIC_BASE_URL}/find-a-professional/${single_lawyer.slug}`}
						>
							<FacebookIcon size={32} round className="m-2" />
						</FacebookShareButton>
						<RedditShareButton
							url={`${process.env.NEXT_PUBLIC_BASE_URL}/find-a-professional/${single_lawyer.slug}`}
						>
							<RedditIcon size={32} round className="m-2" />
						</RedditShareButton>
						<WhatsappShareButton
							url={`${process.env.NEXT_PUBLIC_BASE_URL}/find-a-professional/${single_lawyer.slug}`}
						>
							<WhatsappIcon size={32} round className="m-2" />
						</WhatsappShareButton>
						<LinkedinShareButton
							url={`${process.env.NEXT_PUBLIC_BASE_URL}/find-a-professional/${single_lawyer.slug}`}
						>
							<LinkedinIcon size={32} round className="m-2" />
						</LinkedinShareButton>
					</div>
				</div>
			)}

			{/* Navigation Tabs */}
			<div className="bg-white border-bottom border-gray-200">
				<div className="container-xl">
					<ul className="nav nav-tabs border-0" id="myTab" role="tablist">
						<li className="nav-item" role="presentation">
							<button
								className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
								onClick={() => handleTabClick('about')}
								type="button"
								role="tab"
							>
								About
							</button>
						</li>
						<li className="nav-item" role="presentation">
							<button
								className={`nav-link ${activeTab === 'Reviews' ? 'active' : ''}`}
								onClick={() => handleTabClick('Reviews')}
								type="button"
								role="tab"
							>
								Reviews
							</button>
						</li>
						<li className="nav-item" role="presentation">
							<button
								className={`nav-link ${activeTab === 'Rates' ? 'active' : ''}`}
								onClick={() => handleTabClick('Rates')}
								type="button"
								role="tab"
							>
								Rates
							</button>
						</li>
					</ul>
				</div>
			</div>

			{/* Main Content */}
			<div className="container-xl py-4 gradient-bg min-vh-100">
				<div className="row g-4">
					{/* Main Content Area */}
					<div className="col-lg-8">
						<div className="tab-content" id="myTabContent">
							{/* About Tab */}
							<div className={`tab-pane fade ${activeTab === 'about' ? 'show active' : ''}`} id="about" role="tabpanel">
								{/* Specialization Card */}
								{single_lawyer?.specializ_name && (
									<div className="card">
										<h3 className="h5 fw-bold text-dark mb-3">Specializes In:</h3>
										<div className="d-flex flex-wrap">
											{single_lawyer.specializ_name.split(',').map((specialization: string, index: number) => (
												<span key={index} className="specialization-badge">
													{specialization.trim()}
												</span>
											))}
										</div>
									</div>
								)}

								{/* Bio Section */}
								{single_lawyer?.bio && (
									<div className="card">
										<h3 className="h5 fw-bold text-dark mb-3">Bio:</h3>
										<div>
											{single_lawyer.bio.length > 500 ? (
												<>
													<div
														className="text-secondary lh-base"
														id="bio-text"
														dangerouslySetInnerHTML={{
															__html: showMore ? single_lawyer.bio : single_lawyer.bio.substring(0, 500) + '...'
														}}
													/>
													<button
														onClick={toggleShowMore}
														className="btn btn-link p-0 text-decoration-none mt-2 small fw-medium"
														style={{ color: 'var(--primary)' }}
													>
														{showMore ? 'Show Less' : 'Show More'}
													</button>
												</>
											) : (
												<div
													className="text-secondary lh-base"
													dangerouslySetInnerHTML={{ __html: single_lawyer.bio }}
												/>
											)}
										</div>
									</div>
								)}

								{/* Additional Info Card */}
								<div className="card">
									<div className="row">
										{single_lawyer?.acquired && currentYear - single_lawyer?.acquired > 0 && (
											<div className="col-md-6 mb-3">
												<p className="font-x-small text-sonic-silver weight-light">Acquired</p>
												<p className="font-medium weight-medium text-sonic-silver mt-2">
													{single_lawyer?.acquired}
												</p>
											</div>
										)}

										{single_lawyer?.location_name && (
											<div className="col-md-6 mb-3">
												<p className="font-x-small text-sonic-silver weight-light">Location</p>
												<p className="font-medium weight-medium text-sonic-silver mt-2">
													{single_lawyer?.location_name}
												</p>
											</div>
										)}

										{single_lawyer?.address && (
											<div className="col-md-6 mb-3">
												<p className="font-x-small text-sonic-silver weight-light">Address</p>
												<p className="font-medium weight-medium text-sonic-silver mt-2">
													{single_lawyer?.address}
												</p>
											</div>
										)}

										{single_lawyer?.status == 'active' && (
											<div className="col-md-6 mb-3">
												<p className="font-x-small text-sonic-silver weight-light">Status</p>
												<p className="font-medium weight-medium green-medium-2 mt-2">
													ACTIVE
												</p>
											</div>
										)}

										{single_lawyer?.updated_at && (
											<div className="col-md-6 mb-3">
												<p className="font-x-small text-sonic-silver weight-light">Updated</p>
												<p className="font-medium weight-medium text-sonic-silver mt-2">
													{new Date(single_lawyer.updated_at).toLocaleDateString('en-GB', {
														day: '2-digit',
														month: '2-digit',
														year: 'numeric'
													})}
												</p>
											</div>
										)}
									</div>
								</div>
							</div>

							{/* Reviews Tab */}
							<div className={`tab-pane fade ${activeTab === 'Reviews' ? 'show active' : ''}`} id="reviews" role="tabpanel">
								<div className="card">
									<div className="row align-items-center mb-4">
										<div className="col-6">
											<h3 className="h5 fw-bold text-dark mb-0">Reviews</h3>
										</div>
										<div className="col-6 text-end">
											{user?.id != lawyer_Id && (
												<Link href={`/find-a-professional/${slug}/write-a-review`}>
													<button className="btn-secondary-custom">Write A Review</button>
												</Link>
											)}
										</div>
									</div>

									<ReviewsAverage
										average={reviewsAvg.averageRating}
										totalReviews={reviewsAvg.totalReviews}
										ratingsByStars={reviewsAvg.ratingsByStars}
									/>

									<div className="vstack gap-3">
										{allReviews && allReviews.slice(0, visibleReviews).map((item: any, index: number) => (
											<div key={index} className="border-bottom pb-3">
												<div className="d-flex align-items-center gap-2 mb-2">
													<div className="d-flex">
														{[...Array(5)].map((_, starIndex) => (
															<StarIcon
																key={starIndex}
																width={16}
																height={16}
																className={starIndex < item.rating ? 'star-filled' : 'text-muted'}
															/>
														))}
													</div>
													<span className="text-muted small">• {new Date(item.created_at).toLocaleDateString()}</span>
												</div>
												<p className="text-secondary mb-1">"{item.review}"</p>
												<p className="text-muted small">- {item.reviewer_name || 'Anonymous'}</p>
											</div>
										))}
									</div>

									{allReviews.length > 3 && visibleReviews < allReviews.length && (
										<div className="text-center py-4">
											<p
												className="read-more-reviews"
												style={{ cursor: 'pointer', color: 'var(--primary)' }}
												onClick={() => setvisibleReviews(visibleReviews + 2)}
											>
												Read More Reviews
											</p>
										</div>
									)}
								</div>
							</div>

							{/* Rates Tab */}
							<div className={`tab-pane fade ${activeTab === 'Rates' ? 'show active' : ''}`} id="rates" role="tabpanel">
								{(single_lawyer?.consultation_duration ||
									single_lawyer?.hourly_rate_range ||
									single_lawyer?.payment_method) && (
										<div className="card">
											<h3 className="h5 fw-bold text-dark mb-4">Rates</h3>
											<div className="vstack gap-3">
												{single_lawyer?.consultation_duration && (
													<div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
														<div>
															<h4 className="h6 fw-semibold text-dark mb-0">Consultation</h4>
															<p className="text-muted small mb-0">Free Consultation</p>
														</div>
														<div className="text-end">
															<p className="h6 fw-bold mb-0" style={{ color: 'var(--primary)' }}>
																{single_lawyer?.consultation_duration}
															</p>
														</div>
													</div>
												)}

												{single_lawyer?.hourly_rate_range && (
													<div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
														<div>
															<h4 className="h6 fw-semibold text-dark mb-0">Hourly Rates</h4>
														</div>
														<div className="text-end">
															<p className="h6 fw-bold mb-0" style={{ color: 'var(--primary)' }}>
																{single_lawyer?.hourly_rate_range}
															</p>
														</div>
													</div>
												)}

												{single_lawyer?.payment_method && (
													<div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
														<div>
															<h4 className="h6 fw-semibold text-dark mb-0">Payment Methods</h4>
														</div>
														<div className="text-end">
															<p className="h6 fw-bold mb-0" style={{ color: 'var(--primary)' }}>
																{single_lawyer?.payment_method}
															</p>
														</div>
													</div>
												)}
											</div>
										</div>
									)}
							</div>
						</div>
					</div>

					{/* Sidebar */}
					<div className="col-lg-4">
						<div className="vstack gap-4">
							{/* Contact Card */}
							<div className="card">
								<h3 className="h5 fw-bold text-dark mb-3">Contact Information</h3>
								<div className="vstack gap-2">
									{single_lawyer?.location_name && (
										<div className="d-flex align-items-center gap-2">
											<i className="bi bi-geo-alt text-muted"></i>
											<span className="text-secondary">{single_lawyer?.location_name}</span>
										</div>
									)}
									{single_lawyer?.linkedin_url && (
										<div className="d-flex align-items-center gap-2">
											<i className="bi bi-linkedin text-primary"></i>
											<a
												href={single_lawyer?.linkedin_url}
												target="_blank"
												rel="noopener noreferrer"
												className="text-primary text-decoration-none"
											>
												LinkedIn Profile
											</a>
										</div>
									)}
									{single_lawyer?.website_link && (
										<div className="d-flex align-items-center gap-2">
											<i className="bi bi-globe text-primary"></i>
											<a
												href={single_lawyer?.website_link}
												target="_blank"
												rel="noopener noreferrer"
												className="text-primary text-decoration-none"
											>
												Website
											</a>
										</div>
									)}
								</div>
							</div>

							{/* Status Card */}
							<div className="card">
								<h3 className="h5 fw-bold text-dark mb-3">Status</h3>
								<div className="vstack gap-2">
									{single_lawyer?.status == 'active' && (
										<div className="d-flex align-items-center gap-2">
											<i className="bi bi-check-circle-fill text-success"></i>
											<span className="text-success fw-medium">Currently Active</span>
										</div>
									)}
									<div className="d-flex align-items-center gap-2">
										<i className="bi bi-clock text-muted"></i>
										<span className="text-muted small">Available for consultations</span>
									</div>
								</div>
							</div>

							{/* Services Card */}
							{single_lawyer?.service_name && (
								<div className="card">
									<h3 className="h5 fw-bold text-dark mb-3">Services</h3>
									<div className="d-flex flex-wrap">
										{single_lawyer.service_name.split(',').map((service: string, index: number) => (
											<span key={index} className="specialization-badge mb-2">
												{service.trim()}
											</span>
										))}
									</div>
								</div>
							)}

							{/* Quick Actions */}
							<div className="card">
								<h3 className="h5 fw-bold text-dark mb-3">Quick Actions</h3>
								<div className="vstack gap-2">
									{user?.id != lawyer_Id && (
										<Link
											href={`/find-a-professional/${slug}/make-an-inquiry`}
											className="text-white text-decoration-none"
										>
											<button className="btn btn-primary-custom hover-scale w-100">
												Make An Inquiry
											</button>
										</Link>
									)}
									{user?.id != lawyer_Id && (
										<Link
											href={`/find-a-professional/${slug}/make-an-inquiry`}
											className="text-decoration-none"
										>
											<button className="btn btn-secondary-custom w-100">
												Send Message
											</button>
										</Link>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}