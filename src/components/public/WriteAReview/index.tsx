'use client';
import React, { useState, useEffect, useContext } from 'react';
import { MapPinIcon } from '@heroicons/react/20/solid';
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import Popup from '@/commonUI/Popup';
import ReviewSubmitted from '@/components/public/Popup/ReviewSubmitted';
import StarRating from '@/commonUI/StarRating';
import FormTextarea from '@/commonUI/FormTextArea';
import FormInput from '@/commonUI/FormInput';
import { saveReview } from '../../../../lib/frontendapi';
import { WriteAReviewValidation } from '@/utils/validation';
import { useRouter } from 'next/navigation';
import { getSessionData, removeSessionData, setRedirectUrl, setSessionData } from '@/utils/session';
import { toast } from 'react-toastify';
import AuthContext from '@/context/AuthContext';
import { getLawyerImageSrc180x180 } from '@/app/[locale]/commonfunctions/commonfunctions';
interface Props {
	slug?: string;
	lawyer?: any;
}

export default function WriteAReview({ slug = '', lawyer }: Props) {

	console.log(lawyer, 'testttt');

	const [isSticky, setIsSticky] = useState(false);
	const [reviewSubmitted, setreviewSubmitted] = useState(false);
	const [errors, seterrors]: any = useState({});
	const [anonymous, setanonymous] = useState(false);
	const currentYear = new Date().getFullYear();
	const router = useRouter();
	const { user } = useContext(AuthContext);
	const initialData = {
		review_by_member_id: 0,
		review_to_member_id: lawyer.id,
		stars: 0,
		is_hired: 'yes',
		title: '',
		description: '',
		is_anonymous: 'yes',
		name: '',
		email: ''
	};

	const [reviewData, setreviewData] = useState(initialData);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setIsSticky(true);
			} else {
				setIsSticky(false);
			}
		};
		handleLoginUser();
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [reviewData.review_by_member_id]);

	const handleLoginUser = async () => {
		setreviewData({ ...initialData, review_by_member_id: parseInt(user?.id) });
		const storedReviewData = window.sessionStorage.getItem('review_data');

		if (storedReviewData) {
			setreviewData(JSON.parse(storedReviewData));
		}
		removeSessionData('redirect_url');
	};

	const handleReviewSubmit = (e: any) => {
		e.preventDefault();
		const validationErrors = WriteAReviewValidation(reviewData);
		if (Object.keys(validationErrors).length > 0) {
			seterrors(validationErrors);
			return;
		} else {
			seterrors({});
		}
		if (user?.id) {
			saveReview(reviewData).then(res => {
				if (res.data[0].result_message == 'You have already reviewd this profile.') {
					toast.error(res.data[0].result_message);
				} else {
					// Review saved successfully
					setreviewData(initialData);
					setreviewSubmitted(true);
				}
			});
		} else {
			// Set session data
			setRedirectUrl('redirect_url');
			setSessionData('review_data', JSON.stringify(reviewData));

			// Redirect the user
			router.push('/auth/choose-profile');
		}
	};

	return (
		<>
			<section className="blog-section start">
				<div className="container">
					<div className="text-left-line text-start pt-lg-5 mt-2">
						<ul>
							<li>
								<Link href="#" className="unactive">
									Home
								</Link>
							</li>
							<li>
								<Image
									src="/images/legal-service/arrow-right.png"
									alt="arrow-right"
									width={15}
									height={15}
								/>
							</li>
							<li>
								<Link href="#" className="unactive">
									Find a lawyer
								</Link>
							</li>
							<li>
								<Image
									src="/images/legal-service/arrow-right.png"
									alt="arrow-right"
									width={15}
									height={15}
								/>
							</li>
							<li>
								<Link href="#">{lawyer.full_name}</Link>
							</li>
						</ul>
					</div>
				</div>
			</section>

			<section>
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="profile-data">
								<div className="row">
									<div className="col-lg-3 col-3">
										<div className="profile-user">
											{/* <ImageComponent
												src={
													process.env.NEXT_PUBLIC_IMAGE_URL +
													'/images/profile/' +
													lawyer.profile_image
												}
												placeholderImgUrl={
													lawyer.gender === 'male' || 'other'
														? `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/default/male-lawyer-306x200.png`
														: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/default/female-lawyer-306x200.png`
												}
												alt="profile-user"
												width={200}
												height={200}
												// layout="responsive"
											/> */}
											<Image
												src={getLawyerImageSrc180x180(
													lawyer.profile_image,
													lawyer.gender
												)}
												alt="profile-user"
												width={180}
												height={180}
												className=" m-img-fixed"
											/>
										</div>
									</div>
									<div className="col-lg-9 col-9">
										<div className="row">
											<div className="col-lg-12">
												<div className="data-profile-user">
													<h3>{lawyer.full_name}</h3>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-lg-12">
												<div className="company-detail">
													<p>
														{lawyer.designation}

														{lawyer?.firm_name && lawyer.firm_name.length > 0 ? (
															<span className="location-move-set">
																at {' '} <Link href={`/firms/${lawyer?.firm_slug}`} style={{ color: '#02142d', fontSize: '14px', fontWeight: '600' }}>{lawyer.firm_name}</Link>
															</span>
														) : ""}
													</p>
													<p>
														<MapPinIcon
															width={20}
															height={20}
															style={{ marginRight: '4px' }}
														/>{' '}
														{lawyer.location_name}
													</p>
													<p>
														<StarIcon width={20} height={20} />

														{lawyer?.avg_rating_and_reviews ? (
															<>
																<span>
																	<strong>
																		{lawyer?.avg_rating_and_reviews
																			? lawyer.avg_rating_and_reviews.split(
																				'('
																			)[0]
																			: ''}
																	</strong>
																</span>
																<span>
																	(
																	{lawyer?.avg_rating_and_reviews
																		? lawyer.avg_rating_and_reviews.split('(')[1]
																		: ''}
																</span>
															</>
														) : (
															<span>Review not available</span>
														)}
													</p>

													<div className="btn-family-more d-flex testimonial">
														{lawyer?.service_name &&
															lawyer.service_name
																.split(',')
																.map((service: any, index: any) => (
																	<button className="mx-1" key={index}>
																		{service} Law
																	</button>
																))}

														{lawyer?.acquired && currentYear - lawyer?.acquired > 0 && (
															<button className="btn-color ml-2">
																Licensed for {currentYear - lawyer?.acquired} years
															</button>
														)}

														<br />
														{lawyer?.consultation_duration && (
															<button className="btn-color">
																Free Consultation: {lawyer?.consultation_duration}
															</button>
														)}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="accordion d-block d-lg-none write-accordian" id="accordionExample">
								<div className="accordion-item">
									<h2 className="accordion-header" id="headingThree">
										<button
											className="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseThree"
											aria-expanded="false"
											aria-controls="collapseThree"
										>
											<div className="legal-review">
												<h6>Professional Women United Review Guidelines</h6>
											</div>
										</button>
									</h2>
									<div
										id="collapseThree"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample"
									>
										<div className="accordion-body p-0">
											<div className="legal-reviwes">
												<p>
													To ensure the integrity of our reviews, please follow these
													guidelines:
												</p>
												<p>Be specific</p>
												<p>
													Clearly explain the actions taken or not taken by the lawyer in your
													case. We only accept reviews from those who have contacted,
													consulted with, or hired the attorney.
												</p>
												<p>Protect your privacy</p>
												<p>
													Avoid sharing any personally identifiable information such as your
													name or email address.
												</p>
												<p>Maintain a helpful tone</p>
												<p>Refrain from posting hostile or insulting content.</p>
												<p>Stick to the facts</p>
												<p>
													Reviews containing unsupported accusations will not be approved. Let
													your review be based on verifiable information.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="overall-rating">
								<h5>Overall rating</h5>
								<form onSubmit={handleReviewSubmit}>
									<StarRating
										className="write-a-review-rating-box"
										label={'Select a rating for your lawyer*'}
										error={errors.stars}
										initialRating={reviewData.stars}
										onRatingChange={(newRating: any) =>
											setreviewData({ ...reviewData, stars: newRating })
										}
									/>
									<p>Did you hire or just consult this lawyer?*</p>

									<div className="d-flex">
										<div className="form-check">
											<input
												className="form-check-input"
												type="radio"
												value="yes"
												checked={reviewData.is_hired === 'yes' && true}
												onClick={(e: any) =>
													setreviewData({
														...reviewData,
														is_hired: e.target.value
													})
												}
											/>
											<label className="form-check-label pt-0" htmlFor="flexRadioDefault1">
												Hired
											</label>
										</div>
										<div className="form-check" style={{ marginLeft: '20px' }}>
											<input
												className="form-check-input"
												type="radio"
												value="no"
												checked={reviewData.is_hired === 'no' && true}
												onClick={(e: any) =>
													setreviewData({
														...reviewData,
														is_hired: e.target.value
													})
												}
											/>
											<label className="form-check-label pt-0" htmlFor="flexRadioDefault2">
												Consulted
											</label>
										</div>
									</div>
									<FormInput
										name=""
										type="text"
										className="form-control"
										label={
											<>
												Review title*
												<span className="d-inline conuter float-end">
													<span>100</span>
												</span>
											</>
										}
										error={errors.title}
										value={reviewData.title}
										onChange={(e: any) => setreviewData({ ...reviewData, title: e.target.value })}
									/>
									<div>
										<FormTextarea
											maxLength={2000}
											label={
												<>
													Write a review*
													<span className="d-inline conuter float-end">
														<span>2000</span>
													</span>
												</>
											}
											error={errors.review}
											value={reviewData.description}
											onChange={(e: any) =>
												setreviewData({
													...reviewData,
													description: e.target.value
												})
											}
										/>
									</div>

									<p className="mt-3">Would you like to post this review anonymously?</p>
									<div className="d-flex">
										<div className="form-check d-flex align-items-center">
											<input
												className="form-check-input"
												type="radio"
												value="yes"
												checked={anonymous && true}
												onClick={() => setanonymous(true)}
											/>
											<label className="form-check-label p-0" htmlFor="flexRadioDefault5">
												YES
											</label>
										</div>
										<div
											className="form-check d-flex align-items-center"
											style={{ marginLeft: '20px' }}
										>
											<input
												className="form-check-input"
												type="radio"
												value="no"
												checked={!anonymous && true}
												onClick={() => setanonymous(false)}
											/>
											<label className="form-check-label p-0" htmlFor="flexRadioDefault6">
												NO
											</label>
										</div>
									</div>

									{!anonymous && (
										<>
											<FormInput
												type="text"
												name=""
												label={'Name'}
												error={errors.name}
												value={reviewData.name}
												onChange={(e: any) =>
													setreviewData({ ...reviewData, name: e.target.value })
												}
											/>
											<FormInput
												type="email"
												name=""
												label={'Email'}
												error={errors.email}
												value={reviewData.email}
												onChange={(e: any) =>
													setreviewData({ ...reviewData, email: e.target.value })
												}
											/>
										</>
									)}
									<label htmlFor="">Please check the box below to proceed*</label>
									<button className="btn-commn w-100" type="submit">
										Submit Review
									</button>
								</form>
								<p>
									By clicking the “Submit” button, you agree to Professional Women United’s
									<Link href="#"> terms of use.</Link> Please see our
									<Link href="#"> community guidelines</Link> and
									<Link href="#"> privacy policy</Link> for information on posting to Professional Women United
									and how we collect, use, and share information you provide to us.
								</p>
							</div>
						</div>

						<div className="col-lg-4 mt-3 d-none d-lg-block">
							<div className={`connect-legal-review  ${isSticky ? 'sticky-profile' : ''}`}>
								<div className="connect-legal-review-class">
									<div className="row">
										<div className="col-lg-8">
											<div className="legal-review d-none d-lg-block">
												<h6>Professional Women United Review Guidelines</h6>
											</div>
										</div>
										<div className="col-lg-4 text-end d-none d-lg-block">
											<div className="img-legal-review">
												<Image
													src="/images/profile/Vector.png"
													width={56}
													height={56}
													alt="profile-Vector"
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="legal-reviwes d-none d-lg-block">
									<p>To ensure the integrity of our reviews, please follow these guidelines:</p>
									<p>Be specific</p>
									<p>
										Clearly explain the actions taken or not taken by the lawyer in your case. We
										only accept reviews from those who have contacted, consulted with, or hired the
										attorney.
									</p>
									<p>Protect your privacy</p>
									<p>
										Avoid sharing any personally identifiable information such as your name or email
										address.
									</p>
									<p>Maintain a helpful tone</p>
									<p>Refrain from posting hostile or insulting content.</p>
									<p>Stick to the facts</p>
									<p>
										Reviews containing unsupported accusations will not be approved. Let your review
										be based on verifiable information.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Popup
				show={reviewSubmitted}
				size="sm"
				footer={false}
				onCancel={() => setreviewSubmitted(false)}
				onOk={() => setreviewSubmitted(false)}
			>
				<ReviewSubmitted />
			</Popup>
		</>
	);
}
