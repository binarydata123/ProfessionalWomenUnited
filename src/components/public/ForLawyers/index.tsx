'use client';
import React, { useEffect, useState } from 'react';
import './for-lawyers.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import UpperFooter from '@/components/public/UpperFooter';
import Testimonial from '@/components/public/Testimonial/page';
import { getAllMemberShipPlan } from '../../../../lib/frontendapi';

interface MembershipPlan {
	id: number;
	name: string;
	description: string;
	monthly_amount: string;
	yearly_amount: string;
	quarterly_amount: string;
	monthly_desc: string;
	quarterly_desc: string;
	// ... other properties ...
}

export default function Page() {
	const [isMonthly, setIsMonthly] = useState('monthly');
	const [membershipPlan, setMembershipPlan] = useState<MembershipPlan | null>(null);
	const [selectedPlan, setSelectedPlan] = useState('individuals');
	// const handlePlanSelection = (plan: string) => {
	// 	setIsMonthly(plan);
	// };

	const getAllMemberShipPlanData = async () => {
		try {
			const res: any = await getAllMemberShipPlan();
			if (res.status == true) {
				setMembershipPlan(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getAllMemberShipPlanData();
	}, []);

	const handlePlanSelection = (plan: string) => {
		console.log('Selected Plan:', plan);
		setSelectedPlan(plan === selectedPlan ? '' : plan);
	};
	const [plan, setPlan] = useState('');

	const handleMonthlyPlanToggle = () => {
		const newPlan = plan === 'yes' ? 'no' : 'yes';
		setPlan(newPlan);
		setIsMonthly(newPlan === 'yes' ? 'quarterly' : 'monthly');
	};


	return (
		<>
			<section className="about-banner">
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<h1 className="font-larger weight-bold social-link mt-5 mobile-m-0">
								Be Found.
								<br /> Join the best
								<span className="green-medium-2"> legal network in Dubai!</span>
							</h1>
							<p className="weight-bold social-link font-medium mt-4">
								Something about how Professional Women United provides value to lawyers, specifically financialy.
							</p>

							<div className="lawyers-online-img  mt-4 mb-4">
								<ul>
									<li>
										<Image
											src="/images/Home/Frame1.png"
											alt="notif-img-boy"
											width={39}
											height={39}
											className="effect"
										/>
									</li>
									<li>
										<Image
											src="/images/Home/Frame2.png"
											alt="notif-img-boy"
											width={39}
											height={39}
										/>
									</li>
									<li>
										<Image
											src="/images/Home/Frame3.png"
											alt="notif-img-boy"
											width={39}
											height={39}
										/>
									</li>
									<li>
										<Image
											src="/images/Home/Frame4.png"
											alt="notif-img-boy"
											width={39}
											height={39}
										/>
									</li>
									<li>
										<Image
											src="/images/Home/Frame5.png"
											alt="notif-img-boy"
											width={39}
											height={39}
										/>
									</li>
									<li className="position-growing p-ding">
										250+ Professionals & Growing
										<div className="blinking"></div>
									</li>
								</ul>
							</div>

							<div className="about-btn-two mt-lg-5 mt-3">
								<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue">
									<span className="text-white">
										<Link href={'/auth/create-profile/?role=professional'} style={{ color: 'white' }}>
											Join Us
										</Link>
									</span>
									<span className="border border-radius-1 banner-arrow-btn">
										<ChevronRightIcon width={20} color={'#fff'} />
									</span>
								</button>

								<button className="btn-get-free btn-commn ml-2 d-none d-lg-block">
									<span className="text-white">
										<Link
											href="/auth/professional/choose-pricing-plan"
											style={{ color: 'rgba(196,144,115)' }}
										>
											View Pricing Plans
										</Link>
									</span>
								</button>
							</div>
						</div>
						<div className="col-lg-6 text-right tab-center">
							<img
								src="/images/lawyer-legal-network.webp"
								alt="about-img-banner"
								className="effect show-hide"
							/>
						</div>
					</div>
				</div>
			</section>

			<section className="why-join">
				<div className="container">
					<p className="font-x-small text-white weight-bold mb-2">WHY JOIN US?</p>
					<h2 className="font-smaller weight-bold text-white mb-5">Grow yOur professional practice with ease.</h2>
					<div className="row mt-5">
						<div className="col-lg-4 col-md-4">
							<div className="box-acc">
								<img
									src="/images/FOR-LAWYERS-PAGE/people.png"
									alt="about-icon-1"
									className="w-48 effect"
								/>
								<h4 className="f-24 text-white mb-4 mt-4 weight-bold">Access More Clients</h4>
								<p className="weight-light font-small text-white">
									By joining our platform, you will have access to a wider client base seeking legal
									advice across different categories.
								</p>
							</div>
						</div>

						<div className="col-lg-4 col-md-4">
							<div className="box-acc">
								<img
									src="/images/FOR-LAWYERS-PAGE/global-search.png"
									alt="about-icon-2"
									className="w-48 effect "
								/>
								<h4 className="f-24 text-white mb-4 mt-4 weight-bold">Increase Visibility</h4>
								<p className="weight-light font-small text-white">
									Showcase your expertise and experience to potential clients by creating a detailed
									profile on our platform.
								</p>
							</div>
						</div>

						<div className="col-lg-4 col-md-4">
							<div className="box-acc">
								<img
									src="/images/FOR-LAWYERS-PAGE/microphone.png"
									alt="about-icon-3"
									className="w-48 effect"
								/>
								<h4 className="f-24 text-white mb-4 mt-4 weight-bold">Streamline Communication</h4>
								<p className="weight-light font-small text-white">
									Easily Connect with Professionals on our platform for faster response times and
									streamlined communication.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="how-it sp-90">
				<div className="container">
					<p className="font-x-small green-medium-2 weight-bold mb-2 text-center">HOW IT WORKS?</p>
					<h2 className="font-smaller weight-bold social-link mb-5 text-center">
						Connecting with clients just got easier
					</h2>
					<div className="row mt-5">
						<div className="col-lg-4 col-md-12">
							<div className="box-acc text-center">
								<img src="/images/how-it-icon-1.png" alt="how-it-icon-1" className="w-64 effect" />
								<h4 className="f-24 green-dark mb-1 mt-4 weight-bold">Sign Up</h4>
								<p className="weight-light font-small text-sonic-silver">
									Sign up and create your profile on our platform with ease.{' '}
								</p>
							</div>
						</div>

						<div className="col-lg-4 col-md-12">
							<div className="box-acc text-center">
								<img src="/images/how-it-icon-2.png" alt="how-it-icon-2" className="w-64 effect" />
								<h4 className="f-24 green-dark mb-1 mt-4 weight-bold">Receive Requests</h4>
								<p className="weight-light font-small text-sonic-silver">
									Get client requests based on your expertise after creating your profile.
								</p>
							</div>
						</div>

						<div className="col-lg-4 col-md-12">
							<div className="box-acc text-center">
								<img src="/images/how-it-icon-3.png" alt="how-it-icon-3" className="w-64 effect" />
								<h4 className="f-24 green-dark mb-1 mt-4 weight-bold">Connect</h4>
								<p className="weight-light font-small text-sonic-silver">
									Communicate with clients easily and efficiently through our platform.
								</p>
							</div>
						</div>
					</div>
					<div className="text-center mt-4 justify-content-center d-flex">
						<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2">
							<span className="text-white">
								<Link href="/auth/create-profile" style={{ color: 'white' }}>
									Sign Up Now
								</Link>
							</span>
							<span className="border border-radius-1 banner-arrow-btn">
								<ChevronRightIcon width={20} color={'#fff'} />
							</span>
						</button>
					</div>
				</div>
			</section>

			<Testimonial />

			<section className="pricing-part">
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<p className="font-x-small weight-bold green-dark">PRICING PLAN</p>
							<h2 className="font-smaller weight-bold mt-2">
								Our prices are designed to <br />
								<span className="green-dark">meet your needs</span>
							</h2>
							<p className="font-medium weight-medium text-sonic-silver mt-2">
								Join our platform and grow yOur professional practice with our flexible pricing options.
							</p>
						</div>
						<div className="col-lg-4" id="nav-tab" role="tablist">
							<div className="btn-group-893168 d-flex justify-content-lg-center mar-top-125">
								<button
									className={
										selectedPlan === 'individuals'
											? 'bg-893168 add-space weight-semi-bold font-small'
											: 'btn white-893168 add-space boysenberry weight-semi-bold font-small b-r-2-r'
									}

									id="nav-home-tab"
									data-bs-toggle="tab"
									data-bs-target="#nav-home"
									type="button"
									role="tab"
									aria-controls="nav-home"
									onClick={() => handlePlanSelection('individuals')}
									aria-selected="true"
								>
									For Individuals
								</button>
								<button
									className={
										selectedPlan === 'firms'
											? 'bg-893168 add-space weight-semi-bold font-small'
											: 'btn white-893168 add-space boysenberry weight-semi-bold font-small b-r-2-r'
									}
									id="nav-profile-tab"
									data-bs-toggle="tab"
									data-bs-target="#nav-profile"
									type="button"
									role="tab"
									onClick={() => handlePlanSelection('firms')}
									aria-controls="nav-profile"
									aria-selected="false"
								>
									For Firms
								</button>
							</div>
						</div>
						<div className="tab-content" id="nav-tabContent">
							<div
								className="tab-pane fade show active"
								id="nav-home"
								role="tabpanel"
								aria-labelledby="nav-home-tab"
							>
								{selectedPlan === 'individuals' && (
									<div className="row">
										<div className="col-lg-7 col-md-12">
											<div className="card-box mt-3">
												<div className="row">
													<div className="col-sm-6">
														<img
															src="/images/how-it-icon-3.png"
															alt="how-it-icon-3"
															className="w-64"
														/>
														<h5 className="green-medium-2 weight-semi-bold font-xx-large mt-2">
															{isMonthly == 'monthly' ? 'Solo Professional Plan' : ' Solo Professional Plan'}
														</h5>
													</div>
													<div className="col-sm-6 text-right tab-left">
														<div className="social-link weight-bold f-22 m-top-80">
															{isMonthly == 'monthly' ? (
																<h6 className="social-link weight-bold f-22 m-top-80">
																	USD{' '}
																	<span className="text-xx-50">
																		{membershipPlan && membershipPlan.monthly_amount}

																	</span>
																	{/* /month */}
																</h6>
															) : (
																<h6 className="social-link weight-bold f-22 m-top-80">
																	USD{' '}
																	<span className="text-xx-50">
																		{membershipPlan && membershipPlan.quarterly_amount}

																	</span>
																	/yearly
																</h6>
															)}
														</div>
													</div>
													<div className='row'>
														<div className='col-md-6 d-flex'>

														</div>
														<div className='col-md-6 d-flex'>
															<p className="font-small weight-medium social-link mt-2"> MONTHLY
															</p>
															<div className="switch-btn mt-2">
																<label className="switch ">
																	<input
																		type="checkbox"
																		checked={plan === 'yes'}
																		onChange={handleMonthlyPlanToggle}
																	/>
																	<span className="slider round"></span>
																</label>
															</div>
															<p className="font-small weight-medium social-link mt-2" style={{ paddingLeft: '10px' }}> YEARLY
															</p>
															<p className="font-small weight-medium social-link mt-2 set-flat-offer"> Flat 25% off
															</p>
														</div>

													</div>
												</div>
												{/* <div className="benefits mt-4">
													<p className="font-medium weight-semi-bold social-link">Benefits:</p>
													<p className="font-small weight-medium social-link mt-3">
														<i className="fa-solid fa-check"></i> Enhanced Profile Visibility
													</p>
													<p className="font-small weight-medium social-link mt-2">
														<i className="fa-solid fa-check"></i> Real-time Notifications{' '}
													</p>
													<p className="font-small weight-medium social-link mt-2">
														<i className="fa-solid fa-check"></i> Unlimited Client Connections
													</p>
													<p className="font-small weight-medium social-link mt-2">
														<i className="fa-solid fa-check"></i> Review Management{' '}
													</p>
													<p className="font-small weight-medium social-link mt-2">
														<i className="fa-solid fa-check"></i> Priority Matchmaking{' '}
													</p>
													<p className="font-small weight-medium social-link mt-2">
														<i className="fa-solid fa-xmark"></i> Dedicated Support{' '}
													</p>
												</div> */}

												<div className="text-center mt-4">
													<button className=" w-100 btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2">
														<span className="text-white">
															<Link href="/auth/create-profile" style={{ color: 'white' }}>
																{/* Get 1 Month Free Trial */}
																{
																	isMonthly === 'monthly'
																		? `Pay ${membershipPlan ? membershipPlan.monthly_amount : ''}`
																		: `Pay ${membershipPlan ? membershipPlan.yearly_amount : ''}`
																}
															</Link>
														</span>
														<span className="border border-radius-1 banner-arrow-btn">
															<ChevronRightIcon width={20} color={'#fff'} />
														</span>
													</button>
												</div>
											</div>
										</div>
										<div className="col-lg-5 col-md-12 position-relative">
											<div className="trolli-image">
												<img
													src="/images/FOR-LAWYERS-PAGE/png.png"
													alt="Monthly Plan"
													className="effect"
												/>
											</div>
										</div>
									</div>
								)}
								{selectedPlan === 'firms' && (
									<div className="row">
										<div className="col-lg-7 col-md-12">
											<div className="card-box mt-3">
												<div className="row">
													<div className="col-sm-6">
														<img
															src="/images/how-it-icon-3.png"
															alt="how-it-icon-3"
															className="w-64"
														/>
														<h5 className="green-medium-2 weight-semi-bold font-xx-large mt-2">
															{isMonthly == 'monthly' ? 'Firm Focus Plan' : ' Solo Professional Plan'}
														</h5>
													</div>
													<div className="col-sm-6 text-right tab-left">
														<div className="social-link weight-bold f-22 m-top-80">
															<h6 className="social-link">
																<span style={{ fontSize: '40px', fontWeight: '700' }}>
																	Let's Talk
																</span>
															</h6>

														</div>
													</div>
												</div>
												{/* <div className="benefits mt-4">
													<p className="font-medium weight-semi-bold social-link">Benefits:</p>
													<p className="font-small weight-medium social-link mt-3">
														<i className="fa-solid fa-check"></i> Enhanced Profile Visibility
													</p>
													<p className="font-small weight-medium social-link mt-2">
														<i className="fa-solid fa-check"></i> Real-time Notifications{' '}
													</p>
													<p className="font-small weight-medium social-link mt-2">
														<i className="fa-solid fa-check"></i> Unlimited Client Connections
													</p>
													<p className="font-small weight-medium social-link mt-2">
														<i className="fa-solid fa-check"></i> Review Management{' '}
													</p>
													<p className="font-small weight-medium social-link mt-2">
														<i className="fa-solid fa-check"></i> Priority Matchmaking{' '}
													</p>
													<p className="font-small weight-medium social-link mt-2">
														<i className="fa-solid fa-check"></i> Dedicated Support{' '}
													</p>
													<p className="font-small weight-medium social-link mt-2">
														<i className="fa-solid fa-check"></i> Unlimited Professional Profiles{' '}
													</p>
												</div> */}

												<div className="text-center mt-4">
													<button className=" w-100 btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2">
														<span className="text-white">
															<Link href="/contact-us" style={{ color: 'white' }}>
																Contact Sales
															</Link>
														</span>
														<span className="border border-radius-1 banner-arrow-btn">
															<ChevronRightIcon width={20} color={'#fff'} />
														</span>
													</button>
												</div>
											</div>
										</div>
										<div className="col-lg-5 col-md-12 position-relative">
											<div className="trolli-image">
												<img
													src="/images/FOR-LAWYERS-PAGE/png.png"
													alt="Monthly Plan"
													className="effect"
												/>
											</div>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="faq-part">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-xl-7 col-md-12">
							<p className="font-x-small green-medium-2 weight-bold mb-2">FAQs</p>
							<h2 className="font-smaller text-black  weight-bold mb-4">
								Got Questions? <br /> <span className="green-medium-2"> We have answers.</span>
							</h2>
							<div className="accordion mt-5" id="accordionExample">
								<div className="accordion-item">
									<h2 className="accordion-header" id="headingOne">
										<button
											className="accordion-button"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseOne"
											aria-expanded="true"
											aria-controls="collapseOne"
										>
											How do I sign up as a lawyer?
										</button>
									</h2>
									<div
										id="collapseOne"
										className="accordion-collapse collapse show"
										aria-labelledby="headingOne"
										data-bs-parent="#accordionExample"
									>
										<div className="accordion-body border-0">
											This is the third item's accordion body. It is hidden by default, until the
											collapse plugin adds the appropriate classes that we use to style each
											element.
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header" id="headingTwo">
										<button
											className="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseTwo"
											aria-expanded="false"
											aria-controls="collapseTwo"
										>
											What are the fees associated with using the platform?
										</button>
									</h2>
									<div
										id="collapseTwo"
										className="accordion-collapse collapse"
										aria-labelledby="headingTwo"
										data-bs-parent="#accordionExample"
									>
										<div className="accordion-body border-0">
											This is the third item's accordion body. It is hidden by default, until the
											collapse plugin adds the appropriate classes that we use to style each
											element.
										</div>
									</div>
								</div>
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
											How are client requests assigned to lawyers?
										</button>
									</h2>
									<div
										id="collapseThree"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample"
									>
										<div className="accordion-body border-0">
											This is the third item's accordion body. It is hidden by default, until the
											collapse plugin adds the appropriate classes that we use to style each
											element.
										</div>
									</div>
								</div>

								<div className="accordion-item">
									<h2 className="accordion-header" id="headingfour">
										<button
											className="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapsefour"
											aria-expanded="false"
											aria-controls="collapsefour"
										>
											How can I update my profile information?
										</button>
									</h2>
									<div
										id="collapsefour"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample"
									>
										<div className="accordion-body border-0">
											This is the third item's accordion body. It is hidden by default, until the
											collapse plugin adds the appropriate classes that we use to style each
											element.
										</div>
									</div>
								</div>

								<div className="accordion-item">
									<h2 className="accordion-header" id="headingFive">
										<button
											className="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseFive"
											aria-expanded="false"
											aria-controls="collapseFive"
										>
											What happens if I need to cancel a consultation with a client?
										</button>
									</h2>
									<div
										id="collapseFive"
										className="accordion-collapse collapse"
										aria-labelledby="headingFive"
										data-bs-parent="#accordionExample"
									>
										<div className="accordion-body border-0">
											This is the third item's accordion body. It is hidden by default, until the
											collapse plugin adds the appropriate classes that we use to style each
											element.
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-12 col-xl-5 col-md-12">
							<img src="/images/faq-img.png" alt="faq-img" className="mt-5 m-none effect" />
						</div>
					</div>
				</div>
			</section>

			<section className="questions-part">
				<div className="container">
					<div className="row">
						<div className="col-lg-7 d-none d-lg-block">
							<img src="/images/section-image.svg" alt=" Still have questions?" />
						</div>
						<div className="col-lg-5 text-right">
							<div className="still">
								<h3 className="font-xxx-large weight-bold text-white">Still have questions?</h3>
								<p className="font-medium weight-light text-white mt-3">
									If you have any additional questions or need assistance with signing up, please
									don't hesitate to contact our support team. We're always here to help!
								</p>
								<Link href="/contact-us">
									<button className="bg-893168 weight-semi-bold font-small icon-big mt-4 width-cover-btn">
										<Image
											src="/images/about-us/message-text.png"
											width={24}
											height={24}
											alt="Contact Us"
											style={{ marginRight: '12px' }}
										/>{' '}
										Contact Us
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="mt-5 pt-3">
				<UpperFooter />
			</div>
		</>
	);
}
