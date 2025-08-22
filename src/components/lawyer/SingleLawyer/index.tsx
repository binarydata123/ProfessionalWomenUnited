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
			if (res.data == 'Saved lawyer successfully.') {
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

	return (
		<>
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

			<section>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							{isLoading ? (
								<LawyerProfileLoadingPlaceholder />
							) : (
								<div className="profile-data data-same">
									<div className="row">
										<div className="col-md-2 col-3">
											<div className="profile-user">
												{/* <div id="setlawyerimg"
													style={{
														backgroundImage: `url(${getLawyerImageSrc180x180(single_lawyer?.profile_image, single_lawyer.gender)})`,
														backgroundSize: 'contain',
														backgroundRepeat: 'no-repeat',
														backgroundPosition: 'center',
														width: '100%',
														height: '150px',
														borderRadius: '10px' 
													}}>
												</div> */}
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
													alt="user-popup"
													className="img-responsive m-img-fixed"
													width={150}
													height={150}
													style={{ borderRadius: '10px' }}
												/>
											</div>
										</div>
										<div className="col-md-10 col-9">
											<div className="row">
												<div className="col-6">
													<div className="data-profile-user">
														<h2> {single_lawyer?.full_name}</h2>
													</div>
												</div>
												<div className="col-6 text-end">
													<div className="data-profile-user">
														<img
															src="/images/profile/fluent_share-16-filled.png"
															width={25}
															height={25}
															alt="share professional profile"
															style={{ cursor: 'pointer' }}
															onClick={() => setshare(!share)}
														/>

														{user?.id && user?.id != lawyer_Id && (
															<>
																{bookmark ? (
																	<BsFillBookmarkFill
																		style={{ cursor: 'pointer' }}
																		onClick={() =>
																			handleSaveLawyer(single_lawyer.id)
																		}
																		color="#c49073"
																		width={20}
																	/>
																) : (
																	<BsBookmark
																		style={{ cursor: 'pointer' }}
																		onClick={() =>
																			handleSaveLawyer(single_lawyer.id)
																		}
																		color="#c49073"
																		width={20}
																	/>
																)}
															</>
														)}

														{share && (
															<div className="mt-3">
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
														)}
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-lg-8">
													<div className="company-detail">

														{single_lawyer?.designation && (
															<span style={{ fontWeight: '600', fontSize: '20px' }}>{single_lawyer?.designation}</span>
														)}{' '}
														{single_lawyer?.firm_name && single_lawyer.firm_name.length > 0 ? (
															<span className="location-move-set">
																at {' '} <Link href={`/firms/${single_lawyer?.firm_slug}`}>{single_lawyer.firm_name}</Link>
															</span>
														) : ""}
														{single_lawyer?.location_name && (
															<p>
																<MapPinIcon width={20} height={20} />{' '}
																{single_lawyer?.location_name}
															</p>
														)}

														<div className="mt-2">
															{/* {single_lawyer?.service_name &&
																single_lawyer.service_name
																	.split(',')
																	.map((service: any, index: any) => (
																		<Link
																			href="JavaScript:void(0)"
																			key={index}
																			className="mb-2 mx-1 first_child"
																		>
																			{service}
																		</Link>
																	))} */}

															{single_lawyer?.service_name &&
																single_lawyer.service_name
																	.split(',')
																	.map((service: any, index: any) => (
																		<Link
																			href="JavaScript:void(0)"
																			className="mb-2"
																			key={index}
																		>
																			<button className="primary-true-green mb-2 mr-1">
																				{service}
																			</button>
																		</Link>
																	))}

															{/* {single_lawyer?.acquired ? (
																currentYear - single_lawyer?.acquired > 0 && (
																	<Link
																		href="JavaScript:void(0)"
																		className="mb-2 mx-1 last_child"
																	>
																		Licensed for{' '}
																		{currentYear - single_lawyer?.acquired} years
																	</Link>
																)
															) : (
																<></>
															)}
															{single_lawyer?.consultation_duration && (
																<Link
																	href="JavaScript:void(0)"
																	className="mb-2  mx-1 last_child"
																>
																	Free Consultation:{' '}
																	{single_lawyer?.consultation_duration}
																</Link>
															)} */}
														</div>
													</div>
												</div>
												<div className="col-lg-4 text-end pt-3  d-none d-lg-block">
													<>
														<Link
															href={`/find-a-professional/${slug}/make-an-inquiry`}
															className="text-white"
														>
															<button className="btn-commn">Make An Inquiry</button>
														</Link>
													</>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-4 text-end pt-3 d-block d-lg-none">
										<div className="company-detail-btn">
											{user?.id != lawyer_Id && (
												<Link
													href={`/find-a-professional/${slug}/make-an-inquiry`}
													className="text-white"
												>
													<button className="btn-commn">Make An Inquiry</button>
												</Link>
											)}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="container">
					<ul
						className={` profile-dataa profile-d-changee nav nav-pills mb-3 mt-4 ${isSticky ? 'sticky-profile' : ''
							}`}
					>
						{isLoading ? (
							<div
								style={{
									height: '30px',
									backgroundColor: 'rgb(249,242,239)',
									width: '6%',
									marginBottom: '10px',
									marginRight: '10px'
								}}
							></div>
						) : (
							<>
								<li className="nav-item" role="presentation">
									<button
										className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
										onClick={() => handleTabClick('about')}
									>
										<Link
											href="#pills-contact-tab1"
											style={{ color: '#02142d' }}
											onClick={e => scrollToBottom(e)}
										>
											About
										</Link>
									</button>
								</li>
							</>
						)}

						{isLoading ? (
							<div
								style={{
									height: '30px',
									backgroundColor: 'rgb(249,242,239)',
									width: '8%',
									marginBottom: '10px',
									marginRight: '10px'
								}}
							></div>
						) : (
							<>
								<li className="nav-item" role="presentation">
									<button
										className={`nav-link ${activeTab === 'Reviews' ? 'active' : ''}`}
										onClick={() => handleTabClick('Reviews')}
									>
										<Link
											href="#pills-contact-tab2"
											style={{ color: '#1F1F1F', marginLeft: '10px' }}
											onClick={e => scrollToBottom(e)}
										>
											Reviews
										</Link>
									</button>
								</li>
							</>
						)}

						{isLoading ? (
							<div
								style={{
									height: '30px',
									backgroundColor: 'rgb(249,242,239)',
									width: '6%',
									marginBottom: '10px'
								}}
							></div>
						) : (
							<>
								<li className="nav-item" role="presentation">
									<button
										className={`nav-link ${activeTab === 'Rates' ? 'active' : ''}`}
										onClick={() => handleTabClick('Rates')}
									>
										<Link
											href="#pills-contact-tab3"
											style={{ color: '#1F1F1F' }}
											onClick={e => scrollToBottom(e)}
										>
											Rates
										</Link>
									</button>
								</li>
							</>
						)}
					</ul>
				</div>
				<hr />
			</section>

			<section>
				<div className="container">
					<div className="row">
						<div className="col-lg-8 mb-5">
							<div className="abcd pb-lg-0 pb-5">
								<div id="pills-contact-tab1">
									<div className="row mb-3">
										<div className="col-6 pt-4">
											<h1 className="font-x-large22 weight-bold green-dark">
												{isLoading ? (
													<div
														style={{
															height: '30px',
															backgroundColor: 'rgb(249,242,239)',
															width: '250px'
														}}
													></div>
												) : (
													<>About {single_lawyer?.full_name}</>
												)}
											</h1>
										</div>
									</div>

									{isLoading ? (
										<div
											style={{
												height: '30px',
												backgroundColor: 'rgb(249,242,239)',
												width: '200px'
											}}
										></div>
									) : (
										<>
											{single_lawyer?.linkedin_url && (
												<p>
													<a
														href={single_lawyer?.linkedin_url}
														target="_blank"
														className="green-medium-2  font-medium" rel="noreferrer"
													>
														<Image
															src="/images/Blogs/iconoir_linkedin.svg"
															alt="iconoir_linkedin"
															width={20}
															height={20}
														/>{' '}
														&nbsp; LinkedIn
													</a>
												</p>
											)}
										</>
									)}

									{/* {isLoading ? (
										<div
											className="mt-2"
											style={{
												height: '30px',
												backgroundColor: 'rgb(249,242,239)',
												width: '500px'
											}}
										></div>
									) : (Community Contributions:
										<>
											<p className="text-sonic-silver">
												<Image src="/images/map.png" alt="location" width={20} height={20} />
												<Link href="JavaScript:void(0)" className="green-medium-2  font-medium">
													{' '}
													&nbsp; Legal Jurisdiction:
												</Link>{' '}
												{single_lawyer?.jurisdiction_name}
											</p>
										</>
									)} */}
									{single_lawyer?.specializ_name && (
										<>
											{isLoading ? (
												<div
													style={{
														height: '20px',
														backgroundColor: 'rgb(249,242,239)',
														width: '200px'
													}}
												></div>
											) : (
												<p className="font-medium  weight-medium text-sonic-silver mt-2">
													Specializes In:
												</p>
											)}

											{isLoading ? (
												<div
													style={{
														height: '20px',
														backgroundColor: 'rgb(249,242,239)',
														width: '200px'
													}}
												></div>
											) : (
												<>
													{' '}
													<p className="font-small  weight-light text-sonic-silver mt-2">
														{single_lawyer?.specializ_name}
													</p>
												</>
											)}
										</>
									)}
									{/* {isLoading ? (
										<div
											className="mt-2"
											style={{
												height: '20px',
												backgroundColor: 'rgb(249,242,239)',
												width: '250px'
											}}
										></div>
									) : (
										<p className="font-medium  weight-medium text-sonic-silver mt-2">
											{' '}
											Community Contributions:{' '}
										</p>
									)} */}

									{/* <div className="row">
										<div className="col-sm-4">
											{isLoading ? (
												<div
													className="mt-2"
													style={{
														height: '50px',
														backgroundColor: 'rgb(249,242,239)',
														width: '200px'
													}}
												></div>
											) : (
												<div className="card-frame mt-2 mb-4">
													<div className="row">
														<div className="col-3 pr-0">
															<img src="/images/like-tag.png" alt="like-tag" />
														</div>
														<div className="col-9 p-0">
															<div className="like-tag">
																<h6>{community_contribution}</h6>
																<p>Questions Answered</p>
															</div>
														</div>
													</div>
												</div>
											)}
										</div>
									</div> */}

									{/* {single_lawyer?.bio && (
										<>
											{isLoading ? (
												<div
													style={{
														height: '20px',
														backgroundColor: 'rgb(249,242,239)',
														width: '100px'
													}}
												></div>
											) : (
												<p className="font-medium  weight-medium text-sonic-silver mt-2">
													Bio:
												</p>
											)}

											{isLoading ? (
												<div
													style={{
														height: '500px',
														backgroundColor: 'rgb(249,242,239)',
														width: '100px'
													}}
												></div>
											) : (
												<p className="font-small  weight-light text-sonic-silver">
													{showMore
														? single_lawyer?.bio
														: `${single_lawyer?.bio.slice(0, 500)}${single_lawyer?.bio.length > 500 ? '...' : ''
														}`}
												</p>
											)}
											{isLoading ? (
												<div
													style={{
														height: '20px',
														backgroundColor: 'rgb(249,242,239)',
														width: '100px'
													}}
												></div>
											) : (
												<>
													{single_lawyer?.bio.length > 500 && (
														<div>
															<a
																href="JavaScript:void(0)"
																onClick={toggleShowMore}
																className="green-medium-2  font-x-small weight-semi-bold"
															>
																{' '}
																{showMore ? 'Show Less' : 'Show More'}{' '}
															</a>
														</div>
													)}
												</>
											)}
										</>
									)} */}
									{single_lawyer?.bio && (
										<>
											{isLoading ? (
												<div
													style={{
														height: '20px',
														backgroundColor: 'rgb(249,242,239)',
														width: '100px'
													}}
												></div>
											) : (
												<p className="font-medium  weight-medium text-sonic-silver mt-2">
													Bio:
												</p>
											)}
											{
												single_lawyer.bio.length > 500 ? (
													<>
														{showMore ? (
															<>
																<div dangerouslySetInnerHTML={{ __html: single_lawyer.bio }} />
																<a
																	href="JavaScript:void(0)"
																	onClick={toggleShowMore}
																	className="green-medium-2 font-x-small weight-semi-bold"
																>
																	Show Less
																</a>
															</>
														) : (
															<>
																<div dangerouslySetInnerHTML={{ __html: single_lawyer.bio.substring(0, 500) }} />
																<a
																	href="JavaScript:void(0)"
																	onClick={toggleShowMore}
																	className="green-medium-2 font-x-small weight-semi-bold"
																>
																	Show More
																</a>
															</>
														)}
													</>
												) : (
													<div dangerouslySetInnerHTML={{ __html: single_lawyer.bio }} />
												)
											}
										</>
									)}

									{single_lawyer?.acquired && currentYear - single_lawyer?.acquired > 0 && (
										<p className="font-medium  weight-medium text-sonic-silver mt-3">
											{' '}
											Licensed for 9 years:{' '}
										</p>
									)}

									<div className="row">
										<div className="col-sm-7">
											{isLoading ? (
												<div
													className="mt-2"
													style={{
														height: '20px',
														backgroundColor: 'rgb(249,242,239)',
														width: '100px'
													}}
												></div>
											) : (
												<>
													<div className="card-frame card-frame-2 mt-2">
														<div className="row">
															{single_lawyer?.acquired &&
																currentYear - single_lawyer?.acquired > 0 && (
																	<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
																		<p className="	font-x-small text-sonic-silver weight-light">
																			Acquired
																		</p>
																		<p className="font-medium  weight-medium text-sonic-silver mt-2">
																			{single_lawyer?.acquired}
																		</p>
																	</div>
																)}

															{single_lawyer?.location_name && (
																<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
																	<p className="font-x-small text-sonic-silver weight-light">
																		Location
																	</p>
																	<p className="font-medium  weight-medium text-sonic-silver mt-2">
																		{single_lawyer?.location_name}
																	</p>
																</div>
															)}

															{single_lawyer?.status == 'active' && (
																<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
																	<p className="font-x-small text-sonic-silver weight-light">
																		Status
																	</p>
																	<p className="font-medium  weight-medium green-medium-2 mt-2">
																		ACTIVE{' '}
																	</p>
																</div>
															)}
															{single_lawyer?.updated_at && (
																<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
																	<p className="font-x-small text-sonic-silver weight-light">
																		Updated
																	</p>
																	<p className="font-medium  weight-medium text-sonic-silver mt-2">
																		{new Date(
																			single_lawyer.updated_at
																		).toLocaleDateString('en-GB', {
																			day: '2-digit',
																			month: '2-digit',
																			year: 'numeric'
																		})}
																	</p>
																</div>
															)}
														</div>
													</div>
												</>
											)}
										</div>
									</div>
								</div>
								<br />
								<div id="pills-contact-tab2">
									<div className="row align-items-center">
										<div className="col-6">
											{isLoading ? (
												<div
													style={{
														height: '50px',
														backgroundColor: 'rgb(249,242,239)',
														width: '200px'
													}}
												></div>
											) : (
												<h5 className="font-xx-large weight-semi-bold green-dark">Reviews</h5>
											)}
										</div>
										<div className="col-6 text-right">
											{isLoading ? (
												<div
													style={{
														height: '50px',
														backgroundColor: 'rgb(249,242,239)',
														width: '200px',
														float: 'right'
													}}
												></div>
											) : (
												<>
													{user?.id != lawyer_Id && (
														<Link href={`/find-a-professional/${slug}/write-a-review`}>
															<button className="btn-secondary">Write A Review</button>
														</Link>
													)}
												</>
											)}
										</div>
									</div>
									<ReviewsAverage
										average={reviewsAvg.averageRating}
										totalReviews={reviewsAvg.totalReviews}
										ratingsByStars={reviewsAvg.ratingsByStars}
									/>

									<div className="all-reviews">
										{allReviews &&
											allReviews
												.slice(0, visibleReviews)
												.map((item: any, index: number) => <Review data={item} />)}
									</div>

									{allReviews.length > 3 && (
										<div className="text-center py-4">
											<p
												className="read-more-reviews"
												style={{ cursor: 'pointer' }}
												onClick={() => setvisibleReviews(visibleReviews + 2)}
											>
												Read More Reviews
											</p>
										</div>
									)}
								</div>

								<div id="pills-contact-tab3" className="mt-3">
									{(single_lawyer?.consultation_duration ||
										single_lawyer?.hourly_rate_range ||
										single_lawyer?.payment_method) && (
											<h5 className="font-xx-large weight-semi-bold green-dark">Rates</h5>
										)}

									{single_lawyer?.consultation_duration && (
										<>
											<p className="font-small  weight-light text-sonic-silver mt-2">
												Consultation
											</p>
											<p className="font-large weight-bold green-medium-2 text-capitalize">
												Free Consultation: {single_lawyer?.consultation_duration}
											</p>
										</>
									)}

									{single_lawyer?.hourly_rate_range && (
										<>
											<p className="font-small  weight-light text-sonic-silver mt-2">
												Hourly Rates
											</p>
											<p className="font-large weight-bold green-medium-2 text-capitalize">
												{single_lawyer?.hourly_rate_range}
											</p>
										</>
									)}

									{single_lawyer?.payment_method && (
										<>
											<p className="font-small  weight-light text-sonic-silver mt-2">
												Payment Methods
											</p>
											<p className="font-large weight-bold green-medium-2 text-capitalize">
												{single_lawyer?.payment_method}
											</p>
										</>
									)}
								</div>
							</div>
						</div>

						<div className="col-lg-4 d-none d-md-block">
							{isLoading ? (
								<div
									style={{
										height: '400px',
										backgroundColor: 'rgb(249,242,239)',
										width: '400px',
										borderRadius: '8px'
									}}
								></div>
							) : (
								<div className={`profile-data profile-d-change ${isSticky ? 'sticky-profile' : ''}`}>
									<div className="row">
										<div className="col-12">
											<div className="row">
												<div className="col-12">
													<div className="profile-user">

														{/* <div style={{
															backgroundImage: `url(${getLawyerImageSrc180x180(single_lawyer?.profile_image, single_lawyer.gender)})`,
															backgroundSize: 'contain',
															backgroundRepeat: 'no-repeat',
															backgroundPosition: 'center',
															width: '125px',
															height: '90px', 
															borderRadius: '10px' 

														}}>
														</div> */}
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
															width={110}
															height={100}
															className=" m-img-fixed"
															style={{ borderRadius: '10px' }}
														/>


													</div>
													<div className="data-profile-user font-sm">
														<h3>{single_lawyer?.full_name}</h3>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-lg-12">
													<div className="company-detail">
														{single_lawyer?.designation && (
															<span className="profile-d-change1" style={{ fontWeight: '600', fontSize: '20px' }}>
																{single_lawyer?.designation}
															</span>
														)}{' '}
														{single_lawyer?.firm_name && single_lawyer.firm_name.length > 0 ? (
															<span className="location-move-set">
																at {' '} <Link href={`/firms/${single_lawyer?.firm_slug}`}>{single_lawyer.firm_name}</Link>
															</span>
														) : ""}

														{single_lawyer?.location_name && (
															<p>
																<MapPinIcon width={20} height={20} />
																{single_lawyer?.location_name}
															</p>
														)}

														<p className="cursor-pointer">
															<Link
																href="#pills-contact-tab2"
																style={{ color: '#1F1F1F' }}
																onClick={e => scrollToBottom(e)}
															>
																<StarIcon width={20} height={20} />
																{single_lawyer?.avg_rating_and_reviews ? (
																	<>
																		<strong>
																			{single_lawyer?.avg_rating_and_reviews
																				? single_lawyer.avg_rating_and_reviews.split(
																					'('
																				)[0]
																				: ''}
																		</strong>{' '}
																		(
																		{single_lawyer?.avg_rating_and_reviews
																			? single_lawyer.avg_rating_and_reviews.split(
																				'('
																			)[1]
																			: ''}{' '}
																	</>
																) : (
																	<small className="mx-1">Review not available</small>
																)}
															</Link>
														</p>

														<div className="mt-2">
															{single_lawyer?.service_name &&
																single_lawyer.service_name
																	.split(',')
																	.map((service: any, index: any) => (
																		<Link
																			href="JavaScript:void(0)"
																			className="mb-2"
																			key={index}
																		>
																			<button className="primary-true-green mb-2 mr-1">
																				{service}
																			</button>
																		</Link>
																	))}

															{single_lawyer?.acquired &&
																currentYear - single_lawyer?.acquired > 0 && (
																	<Link href="JavaScript:void(0)" className="mb-2">
																		<button className="btn-primary-red mb-2 mr-1">
																			Licensed for{' '}
																			{currentYear - single_lawyer?.acquired}{' '}
																			years
																		</button>
																	</Link>
																)}
															{single_lawyer?.consultation_duration && (
																<Link href="JavaScript:void(0)" className="mb-2">
																	<button className="btn-primary-red">
																		Free Consultation:{' '}
																		{single_lawyer?.consultation_duration
																			? single_lawyer?.consultation_duration
																			: 'No'}
																	</button>
																</Link>
															)}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-12 col-12 text-end pt-3 d-block">
										<div className="company-detail-btn">
											{user?.id != lawyer_Id && (
												<Link
													href={`/find-a-professional/${slug}/make-an-inquiry`}
													className="text-white"
												>
													<button className=" w-100 btn-commn">Make An Inquiry</button>
												</Link>
											)}
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
