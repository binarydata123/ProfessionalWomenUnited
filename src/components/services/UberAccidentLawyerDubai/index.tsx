'use client';
import React, { useState, useEffect } from 'react';
import './style.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Slider from '@/commonUI/SliderHome';
import LawyerCard from '@/components/lawyer/LawyerCard';
import { getAllLawyersDataByIds } from '../../../../lib/frontendapi';

export default function UberAccidentLawyerDubai() {
	const [lawyers, setlawyers] = useState([]);
	const [showFullText, setShowFullText] = useState(false);
	const [isMobileView, setIsMobileView] = useState(false);
	const [showFullTextDiscover, setShowFullTextDiscover] = useState(false);
	const [isMobileViewDiscover, setIsMobileViewDiscover] = useState(false);

	const handleToggleText = () => {
		setShowFullText(!showFullText);
	};
	const handleToggleDiscoverText = () => {
		setShowFullTextDiscover(!showFullTextDiscover);
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobileView(window.innerWidth < 768);
			setIsMobileViewDiscover(window.innerWidth < 768);
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		getAllLawyersDataByIds().then(res => {
			setlawyers(res.data);
		});
	}, []);

	return (
		<>
			<section className="about-banner">
				<div className="container">
					<div className="legaltopic single-question-page">
						<section>
							<div id="legal-serve">
								<span>Home</span>
								<span>
									<Image
										src="/images/legal-service/arrow-right.png"
										alt="Legal Forum"
										width={16}
										height={16}
									/>
								</span>

								<span style={{ color: 'rgba(9, 63, 56, 1)' }}>Find a Lawyer</span>
							</div>
						</section>
					</div>
					<div className="row">
						<div className="col-lg-7">
							<h1 className="font-larger weight-bold green-medium-dark mobile-m-0">
								Uber Accidents Lawyer in Dubai
							</h1>
							<p className="weight-light social-link font-medium mt-4">
								{isMobileView ? (
									<>
										{showFullText ? (
											<>
												An Uber accident lawyer represents clients involved in accidents while
												using Uber services. They handle legal aspects such as insurance claims,
												negotiations, and litigation to secure compensation for their client's
												injuries or damages.
												<br />
												Professional Women United is committed to providing top-notch legal representation
												for individuals involved in Uber accidents. Our team of experienced Uber
												accident lawyers understands the complexities of these cases and works
												tirelessly to protect your rights.
											</>
										) : (
											'An Uber accident lawyer represents clients involved in accidents while using Uber services. They handle legal aspects such as insurance claims, negotiations, and litigation to secure compensation for their clients injuries or damages. '
										)}
										<br />
										<div className="mt-3 mb-3 d-lg-none d-block weight-bold ">
											<Link href="#" onClick={handleToggleText} style={{ color: '#02142d' }}>
												{showFullText ? 'Show Less' : 'Show More'}
											</Link>
										</div>
									</>
								) : (
									<>
										An Uber accident lawyer represents clients involved in accidents while using
										Uber services. They handle legal aspects such as insurance claims, negotiations,
										and litigation to secure compensation for their client's injuries or damages.
										<br />
										Professional Women United is committed to providing top-notch legal representation for
										individuals involved in Uber accidents. Our team of experienced Uber accident
										lawyers understands the complexities of these cases and works tirelessly to
										protect your rights.
									</>
								)}
							</p>

							<div className="about-btn-two mt-lg-5 mt-3">
								<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue">
									<span className="text-white">
										<Link href="/find-a-lawyer" style={{ color: 'white' }}>
											Find a Lawyer
										</Link>
									</span>
								</button>
							</div>
						</div>
						<div className="col-lg-5 text-right tab-center">
							<Image src="/images/legal-service/uber_accident_lawyer.jpeg" alt="AdobeStock" className="effect show-hide" width={516} height={344} style={{ borderRadius: '8px' }} />

						</div>
					</div>
				</div>
			</section>

			<section className="why-join">
				<div className="container">
					<div className="row mt-md-5 align-items-end ">
						<div className="col-lg-4 col-md-12 ">
							<h2 className="font-smaller weight-bold text-white">
								<span className="green-med">Uber Statistics</span>{' '}
								<span className="green-med-col">MENA Region</span>
							</h2>
							<p className="weight-light font-medium text-white mt-3">
								Uber's data-driven insights shed light on mobility trends in the MENA region,
								highlighting the impact of ridesharing on tourism, economic growth, and sustainable
								transportation initiatives.
							</p>
						</div>
						<div className="col-lg-8 col-md-12  mt-md-0 mt-4 text-lg-0 text-center" id="commaonSection">
							<div className="row align-items-lg-center set-pad-stat set-mob-pad">
								<div className="col-lg-1 p-lg-0 col-3">
									<img src="/images/car/Vector.svg" alt="about-icon-1" className=" effect imgSize" />
								</div>
								<div className="col-lg-11 col-9 p-lg-0">
									<p
										className="weight-semi-bold f-20 text-start"
										style={{ color: 'rgba(198, 238, 226, 1)' }}>
										<span
											className="font-xxx-large weight-bold fontfamSet"
											style={{ marginRight: '10px', color: '#fff' }}>
											136
										</span>
										million trips in MENA received a five-star rating, highlighting service quality.
									</p>
								</div>
							</div>
							<div className="row align-items-lg-center set-pad-stat set-mob-pad">
								<div className="col-lg-1 p-lg-0 col-3">
									<img src="/images/car/Vector2.svg" alt="about-icon-1" className=" effect imgSize" />
								</div>
								<div className="col-lg-11 col-9 p-lg-0">
									<p
										className="weight-semi-bold f-20 text-start"
										style={{ color: 'rgba(198, 238, 226, 1)' }}>
										<span
											className="font-xxx-large weight-bold fontfamSet"
											style={{ marginRight: '10px', color: '#fff' }}>
											25%
										</span>
										of trips in UAE aim to be emissions-free by 2030 through Ubergreen.
									</p>
								</div>
							</div>

							<div className="row align-items-lg-center set-pad-stat set-mob-pad">
								<div className="col-lg-1 p-lg-0 col-3">
									<img src="/images/car/vector3.svg" alt="about-icon-1" className=" effect imgSize" />
								</div>
								<div className="col-lg-11 col-9 p-lg-0">
									<p
										className="weight-semi-bold f-20 text-start"
										style={{ color: 'rgba(198, 238, 226, 1)' }}>
										<span
											className="font-xxx-large weight-bold fontfamSet"
											style={{ marginRight: '10px', color: '#fff' }}>
											over 9%
										</span>
										of trips in UAE in Q1 2023 were emission-free, showcasing progress in
										sustainable transportation.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="faq-part">
				<div className="container">
					<div className="row sectionGap flex-wrap-none">
						<div className="col-lg-12 col-xl-5 col-md-12">
							<h2 className="font-smaller text-black  weight-bold mb-4">
								Major Causes of <span className="green-medium-2">Uber Accidents</span>
							</h2>
							<Image src="/images/car/Frame.jpg" alt="faq-img" className="m-none effect" width={516} height={550} />
						</div>
						<div className="col-lg-11 col-12 col-xl-7 col-md-11" id="commoncause">
							<div className="accordion mt-5 margin-top-1" id="accordionExample">
								<div className="accordion-item">
									<h2 className="accordion-header" id="headingOne">
										<button
											className="accordion-button"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseOne"
											aria-expanded="true"
											aria-controls="collapseOne">
											Speeding
										</button>
									</h2>
									<div
										id="collapseOne"
										className="accordion-collapse collapse show"
										aria-labelledby="headingOne"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Speeding is a significant contributing factor to Uber accidents worldwide.
											Drivers may exceed the speed limit to complete trips faster, leading to a
											higher risk of collisions, especially in urban areas with heavy traffic.
											Speeding also reduces reaction time, making it challenging to avoid
											obstacles or sudden changes in road conditions. Uber drivers should adhere
											to speed limits and prioritize safety over speed to mitigate the risk of
											accidents.
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
											aria-controls="collapseTwo">
											Driving Under the Influence (DUI)
										</button>
									</h2>
									<div
										id="collapseTwo"
										className="accordion-collapse collapse"
										aria-labelledby="headingTwo"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Driving under the influence of alcohol or drugs poses a serious threat to
											road safety, not only for Uber drivers but also for passengers and other
											road users. Intoxicated drivers may exhibit impaired judgment, decreased
											coordination, and slower reaction times, increasing the likelihood of
											accidents. Uber's zero-tolerance policy for impaired driving aims to deter
											drivers from operating vehicles while under the influence and protect the
											safety of all individuals on the road.
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
											aria-controls="collapseThree">
											Distracted Driving
										</button>
									</h2>
									<div
										id="collapseThree"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Distracted driving, such as using mobile phones, eating, or adjusting
											navigation systems while driving, is a common cause of Uber accidents.
											Diverting attention from the road significantly increases the risk of
											collisions, as drivers may fail to notice hazards or react promptly. Uber
											drivers must prioritize concentration on the road and minimize distractions
											to ensure the safety of passengers and others sharing the road.
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
											aria-controls="collapsefour">
											Fatigue
										</button>
									</h2>
									<div
										id="collapsefour"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Fatigue is a prevalent issue among Uber drivers, especially those working
											long hours to maximize earnings. Prolonged driving without adequate rest can
											lead to drowsiness, impaired cognitive function, and decreased alertness,
											increasing the likelihood of accidents. Implementing policies to limit
											driving hours, encouraging rest breaks, and promoting driver well-being are
											essential strategies to address fatigue-related risks and prevent accidents
											in the ridesharing industry.
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
											aria-controls="collapseFive">
											Vehicle Maintenance Issues
										</button>
									</h2>
									<div
										id="collapseFive"
										className="accordion-collapse collapse"
										aria-labelledby="headingFive"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Neglected vehicle maintenance can contribute to Uber accidents by
											compromising the safety and performance of vehicles. Mechanical failures,
											such as brake malfunctions or tire blowouts, can occur if vehicles are not
											regularly inspected and maintained. Uber drivers should prioritize vehicle
											upkeep, including routine inspections, repairs, and maintenance checks, to
											make sure their vehicles meet safety standards and minimize the risk of
											accidents on the road.
										</div>
									</div>
								</div>
								{/* <div className="accordion-item">
									<h2 className="accordion-header" id="headingSix">
										<button
											className="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseSix"
											aria-expanded="false"
											aria-controls="collapseSix">
											Distracted Driving
										</button>
									</h2>
									<div
										id="collapseSix"
										className="accordion-collapse collapse"
										aria-labelledby="headingSix"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Just like impaired riding, distracted driving, including activities like
											texting, talking on the phone, or adjusting music controls while riding,
											poses a significant threat to motorcycle safety. Diverted attention from the
											road increases the likelihood of missing critical cues and not being able to
											react to dangerous situations.
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header" id="headingSeven">
										<button
											className="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseSeven"
											aria-expanded="false"
											aria-controls="collapseSeven">
											Poor Weather Conditions
										</button>
									</h2>
									<div
										id="collapseSeven"
										className="accordion-collapse collapse"
										aria-labelledby="headingSeven"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Poor weather conditions, such as rain, fog, or strong winds, create
											challenging riding conditions and increase the risk of accidents. Reduced
											visibility, slippery road surfaces, and other weather-related issues cause
											significant danger to motorcyclists. Adapting riding techniques, using
											appropriate gear like rain suits and anti-fog visors, and exercising caution
											in bad weather conditions are essential for improving the motorcyclist’s
											safety.
										</div>
									</div>
								</div> */}
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="questions-part">
				<div className="container">
					<div className="row">
						<div className="col-lg-7 text-right order-lg-0 order-last">
							<div className="still" id="accordianSectionGreen">
								<h3 className="font-smaller weight-bold text-black-add-fig">
									Why Should I Hire a <br />{' '}
									<span className="green-medium-2">
										Uber Accident Lawyer <br />{' '}
									</span>{' '}
									from Professional Women United?
								</h3>
								{/* <p className="font-medium weight-light text-black-add-fig mt-3">
									Professional Women United specializes in motorcycle accident cases, offering clients expert
									legal representation and personalized support. Hiring a motorcycle accident lawyer
									from Professional Women United can provide you with the expert assistance and support you need
									to get through this challenging time.
								</p> */}
								<div className="accordion mt-4" id="setbotomspace">
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingEight">
											<button
												className="accordion-button"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseEight"
												aria-expanded="true"
												aria-controls="collapseEight">
												Extensive Experience in Uber Accident Cases
											</button>
										</h2>
										<div
											id="collapseEight"
											className="accordion-collapse collapse show"
											aria-labelledby="headingEight"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Professional Women United offers specialized expertise and a track record of success
												in handling Uber accident cases. Our Uber accident lawyers have
												extensive experience representing clients involved in Uber accidents. We
												understand the complexities of these cases and have the expertise to
												secure favorable outcomes for our clients.
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingNine">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseNine"
												aria-expanded="false"
												aria-controls="collapseNine">
												Personalized Legal Representation
											</button>
										</h2>
										<div
											id="collapseNine"
											className="accordion-collapse collapse"
											aria-labelledby="headingNine"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												At Professional Women United, we provide personalized legal representation tailored
												to the unique circumstances of each case. Our UAE Uber accident lawyers
												take the time to understand our client's needs and concerns, offering
												guidance and support throughout the legal process.
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingTen">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseTen"
												aria-expanded="false"
												aria-controls="collapseTen">
												Proven Track Record of Success
											</button>
										</h2>
										<div
											id="collapseTen"
											className="accordion-collapse collapse"
											aria-labelledby="headingTen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Professional Women United has a proven track record of successfully obtaining
												favorable settlements and verdicts for Uber accident victims. Our Uber
												accident lawyers in the UAE have successfully represented numerous
												clients and helped them recover the compensation they deserve for their
												injuries and damages.
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingEleven">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseEleven"
												aria-expanded="false"
												aria-controls="collapseEleven">
												Strong Negotiation Skills
											</button>
										</h2>
										<div
											id="collapseEleven"
											className="accordion-collapse collapse"
											aria-labelledby="headingEleven"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Our Uber accident lawyers possess strong negotiation skills to advocate
												for your interests in settlement negotiations with insurance companies
												and other parties involved in the case. We work tirelessly to guarantee
												our clients receive maximum compensation for their losses.
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingTweleve">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseTweleve"
												aria-expanded="false"
												aria-controls="collapseTweleve">
												Comprehensive Legal Support
											</button>
										</h2>
										<div
											id="collapseTweleve"
											className="accordion-collapse collapse"
											aria-labelledby="headingTweleve"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Professional Women United offers comprehensive legal support to Uber accident
												victims, including assistance with insurance claims, accident
												investigation, gathering evidence, and representing clients in court if
												necessary. Our Dubai Uber accident lawyers handle all aspects of the
												case, allowing our clients to focus on their recovery.
											</div>
										</div>
									</div>
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingThirteen">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseThirteen"
												aria-expanded="false"
												aria-controls="collapseThirteen">
												Compassionate and Responsive Representation
											</button>
										</h2>
										<div
											id="collapseThirteen"
											className="accordion-collapse collapse"
											aria-labelledby="headingThirteen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												We understand how Uber accidents can physically, emotionally, and
												financially impact victims and their families. At Professional Women United, the
												Uber accident lawyers provide compassionate and responsive
												representation, guiding our clients through the legal process with care
												and empathy.
											</div>
										</div>
									</div>
								</div>
								<div className="about-btn-two mt-lg-5 mt-3">
									<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue half-button">
										<span className="text-white set-lawyer-icon">
											<Link href="/find-a-lawyer" style={{ color: 'white' }}>
												Find a Lawyer
											</Link>{' '}
											<span className="border-btn-lawyer">
												<ChevronRightIcon width={20} color={'#fff'} />
											</span>
										</span>
									</button>
								</div>
							</div>
						</div>
						<div className="col-lg-5 mb-lg-0 mb-4">
							<Image src="/images/car/Group2944.png" alt=" Still have questions?" width={516} height={549} />
						</div>
					</div>
				</div>
			</section>
			<section className="discover">
				<div className="container">
					<div className="still">
						<h6 className="text-start">
							<span className="green-medium-2 font-x-small weight-bold">TOP LEGAL EXPERTS</span>
						</h6>

						<h3 className="font-xxx-large weight-bold text-black mt-3 discover-font">
							Discover the <span className="green-medium-2">Top Uber Accident Lawyers in Dubai</span>
						</h3>
						<p className="font-medium weight-light text-black-add-fig mt-3">
							{isMobileViewDiscover ? (
								<>
									{showFullTextDiscover ? (
										<>
											At Professional Women United, our top Uber accident lawyers in Dubai are distinguished
											by their exceptional legal insight, dedication to client advocacy, and
											commitment to achieving favorable outcomes.
											<br />
											They possess a deep understanding of Dubai's legal landscape and specialize
											in navigating the complexities of Uber accident cases with precision and
											expertise. Our Uber accident lawyers’ unparalleled attention to detail,
											strategic thinking, and relentless pursuit of justice for our clients make
											them invaluable assets to our firm and trusted advocates for accident
											victims in Dubai.
										</>
									) : (
										'At Professional Women United, we are proud to house some of the top motorcycle accident lawyers in the UAE legal industry. Our team comprises'
									)}
									<br />
									<div className="mt-3 mb-3 d-lg-none d-block weight-bold ">
										<Link href="javascript:void(0)" onClick={handleToggleDiscoverText} style={{ color: '#02142d' }}>
											{showFullTextDiscover ? 'Show Less' : 'Show More'}
										</Link>
									</div>
								</>
							) : (
								<>
									At Professional Women United, our top Uber accident lawyers in Dubai are distinguished by their
									exceptional legal insight, dedication to client advocacy, and commitment to
									achieving favorable outcomes.
									<br />
									They possess a deep understanding of Dubai's legal landscape and specialize in
									navigating the complexities of Uber accident cases with precision and expertise. Our
									Uber accident lawyers’ unparalleled attention to detail, strategic thinking, and
									relentless pursuit of justice for our clients make them invaluable assets to our
									firm and trusted advocates for accident victims in Dubai.
								</>
							)}
						</p>
					</div>
				</div>
			</section>

			<div className="container">
				<div className="row">
					<div className="col-md-12 homeSlider">
						{lawyers.length > 0 && (
							<Slider
								nav={false}
								loop={true}
								dots={true}
								className="mt-1"
								items={4}
								responsive={{
									0: {
										items: 1
									},
									600: {
										items: 2
									},
									768: {
										items: 2
									},
									991: {
										items: 3
									},
									1200: {
										items: 3
									},
									1366: {
										items: 4
									},
									1440: {
										items: 4
									},
									1500: {
										items: 4
									}
								}}>
								{lawyers.map((lawyer: any, index: number) => (
									<LawyerCard ShowLoader={false} lawyer={lawyer} Key={index} showLocation={false} />
								))}
							</Slider>
						)}
						<div className="text-end all-btn">
							<Link href="/find-a-lawyer">
								<button>View All</button>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<section id="legal-issues" className="legal-issues mobile-bg-color  mt-5 mb-5">
				<div className="container text-center">
					<div className="needlawyer-text text-center">
						<h6 className="text-center p-0">LEGAL ISSUES</h6>
					</div>
					<h3 className="font-smaller weight-bold social-link">
						What Do clients
						<span className="green-medium-2">
							{' '}
							most frequently <br /> searched for?
						</span>
					</h3>
					<p className="font-medium weight-medium social-link set-text-paddings color-frequent set-top-mrgin-mbl">
						Clients most frequently search for knowledgeable legal representation to guide them through the
						complexities of their legal issues, seeking clarity and understanding about their rights and
						options. They prioritize finding experienced Uber accident lawyers who can offer strategic
						advice and effective solutions tailored to their needs.
						<br />
						Select the legal issue you face and connect with a legal expert.
					</p>
					<ul className="pt-3 class-add">
						<li>
							<Link href="#">Personal injury claims related to Uber accidents</Link>
						</li>
						<li>
							<Link href="#">Insurance coverage and claims processing</Link>
						</li>
						<li>
							<Link href="#">Liability of Uber drivers and the company</Link>
						</li>
						<li>
							<Link href="#">Compensation for injuries and damages</Link>
						</li>
						<li>
							<Link href="#">Legal procedures and options for pursuing a case against Uber</Link>
						</li>
						<li>
							<Link href="#">Understanding ridesharing service regulations and laws </Link>
						</li>
					</ul>
				</div>
			</section>
			<section className="howBenefitsLawyer">
				<div className="container">
					<div className="row">
						<div className="col-lg-5 order-lg-0 order-last mt-lg-0 mt-5 benefit-margin-top margin-botm">
							<Image src="/images/car/Benefits-pic.jpg" alt="Benefits-pic" width={512} height={720} />
						</div>
						<div className="col-lg-7 needlawyer-text-motor">
							<div className="titleHow">
								<h6 className="text-start">BENEFITS</h6>
								<h2 className="text-black-add-fig Discover-lawyer discover-text-fun">
									How lawyers can assist in
									<span className="green-medium-2"> uber accident</span>-related legal matters?
								</h2>
								<div className="mt-4">
									<Link href={'/find-a-lawyer'}>
										<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 set-law-btn-2">
											<span className="text-white"> Find a Lawyer </span>
										</button>
									</Link>
								</div>
							</div>
							<div className="row mt-5 benefit-margin" style={{ marginBottom: '65px' }}>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#093F38' }}>
												Expert Guidance on Legal Procedures
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Navigating the aftermath of an Uber accident can be overwhelming, especially
										when understanding the legal procedures involved. An Uber accident lawyer offers
										invaluable expertise in this regard, guiding clients through each step of the
										legal process with clarity and confidence.
										<br />
										From filing insurance claims to gathering evidence and preparing for potential
										litigation, these lawyers make sure that clients are well-informed and prepared
										for what lies ahead. Their deep understanding of the intricate legal framework
										surrounding ridesharing accidents allows them to provide strategic advice and
										proactive solutions, ultimately empowering clients to make informed decisions
										and protect their rights effectively.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#093F38' }}>
												Negotiation with Insurance Companies
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Dealing with insurance companies can be daunting, especially when seeking fair
										compensation for injuries and damages sustained in an Uber accident. An
										experienced Uber accident lawyer possesses the negotiation skills and industry
										knowledge necessary to navigate this process effectively on behalf of their
										clients. They understand the tactics employed by insurance adjusters and are
										skilled at countering them to secure maximum compensation for their clients.
										<br />
										By advocating for their clients’ rights and presenting compelling evidence of
										the damages incurred, these lawyers do their best to achieve favorable
										settlement outcomes that adequately address their client's needs and expenses.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#093F38' }}>
												Representation in Court Proceedings
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										In some cases, resolving Uber accident claims may require litigation to pursue
										justice and fair compensation for victims. In such instances, having skilled
										representation in court is essential for protecting one's legal rights and
										interests.
										<br />
										An Uber accident lawyer is equipped to provide zealous advocacy and
										representation throughout the litigation process, be it filing the initial
										complaint or presenting arguments in court and advocating for favorable verdicts
										or settlements. They possess the courtroom experience and legal acumen necessary
										to navigate the complexities of legal proceedings effectively, ensuring that
										their clients' voices are heard and their interests are vigorously defended.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#093F38' }}>
												Local Expertise and Resources
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										When it comes to Uber accidents, legal matters may vary based on jurisdictional
										laws and regulations. Therefore, having a lawyer with local expertise and
										resources can be advantageous for dealing with the legal landscape of a
										particular region. An Uber accident lawyer in Dubai, for example, possesses a
										deep understanding of local laws, court procedures, and legal precedents
										relevant to ridesharing accidents in the region.
										<br />
										This localized knowledge allows them to tailor their legal strategies to the
										unique circumstances of each case, leveraging their connections and resources
										within the community to provide comprehensive and effective legal representation
										for their clients.
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="gotQuestions">
				<section className="">
					<div className="container">
						<div className="row">
							<div className="col-lg-12 col-xl-7 col-md-12">
								<div className="gotTitle">
									<p className="font-x-small green-medium-2 weight-bold mb-2">FAQs</p>
									<h2 className="font-smaller  weight-bold mb-4">
										Got Questions? <br />
										<span className="green-medium-2"> We have answers.</span>
									</h2>
								</div>
								<div className="gotAccordion" id="accordionExamplelegalquestion">
									<div className="accordion mt-5" id="accordionExample">
										<div className="accordion-item">
											<h2 className="accordion-header" id="headingOne">
												<button
													className="accordion-button text-white"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target="#collapseOne"
													aria-expanded="true"
													aria-controls="collapseOne">
													What should I do immediately after an Uber accident?
												</button>
											</h2>
											<div
												id="collapseOne"
												className="accordion-collapse collapse show"
												aria-labelledby="headingOne"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													If you're involved in an Uber accident, prioritize your safety and
													the safety of others involved. Make sure to seek medical attention
													for any injuries, if necessary. Then, contact the authorities to
													report the accident and gather information from the Uber driver and
													any witnesses. It's also crucial to document the scene by taking
													photos and exchanging insurance information with the Uber driver.
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="headingTwo1">
												<button
													className="accordion-button text-white"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target="#collapseTwo1"
													aria-expanded="true"
													aria-controls="collapseTwo1">
													How can an Uber accident lawyer help me?
												</button>
											</h2>
											<div
												id="collapseTwo1"
												className="accordion-collapse collapse"
												aria-labelledby="headingTwo1"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													An Uber accident lawyer can assist you in various ways, including
													navigating the legal process, negotiating with insurance companies,
													and representing you in court if necessary. They can help you
													understand your rights, gather evidence to support your claim and
													pursue fair compensation for your injuries and damages.
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="headingThree">
												<button
													className="accordion-button text-white"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target="#collapseThree"
													aria-expanded="true"
													aria-controls="collapseThree">
													What compensation am I entitled to after an Uber accident?
												</button>
											</h2>
											<div
												id="collapseThree"
												className="accordion-collapse collapse"
												aria-labelledby="headingThree"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													The compensation you may be entitled to after an Uber accident can
													vary depending on factors such as the extent of your injuries,
													medical expenses, lost wages, and pain and suffering. An Uber
													accident lawyer can assess your case and help you pursue
													compensation for economic and non-economic damages.
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="headingFour">
												<button
													className="accordion-button text-white"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target="#collapseFour"
													aria-expanded="true"
													aria-controls="collapseFour">
													How long do I have to file a claim after an Uber accident?
												</button>
											</h2>
											<div
												id="collapseFour"
												className="accordion-collapse collapse"
												aria-labelledby="headingFour"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													The statute of limitations for filing a claim after an Uber accident
													varies by jurisdiction. In some areas, you may have a limited time
													frame, such as one to two years, to file a claim. It's essential to
													consult with an Uber accident lawyer promptly to understand the
													deadlines that apply to your case and take appropriate legal action.
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="headingFive">
												<button
													className="accordion-button text-white"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target="#collapseFive"
													aria-expanded="true"
													aria-controls="collapseFive">
													What if the Uber driver was at fault for the accident?
												</button>
											</h2>
											<div
												id="collapseFive"
												className="accordion-collapse collapse"
												aria-labelledby="headingFive"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													If the Uber driver was at fault for the accident, you may be able to
													pursue a claim against their insurance policy or Uber's insurance
													coverage. An Uber accident lawyer can help you navigate the claims
													process and hold the responsible parties accountable for your
													injuries and damages.
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="headingSix">
												<button
													className="accordion-button text-white"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target="#collapseSix"
													aria-expanded="true"
													aria-controls="collapseSix">
													How much does it cost to hire an Uber accident lawyer?
												</button>
											</h2>
											<div
												id="collapseSix"
												className="accordion-collapse collapse"
												aria-labelledby="headingSix"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													Many Uber accident lawyers operate on a contingency fee basis. This
													means they only get paid if they obtain full compensation for you.
													Typically, their fee is a percentage of the settlement or court
													award. This arrangement allows accident victims to access legal
													representation without upfront costs or financial risk. However, you
													should discuss fees and payment terms with your lawyer during the
													initial consultation.
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-12 col-xl-5 col-md-12">
								<Image src="/images/layer.png" alt="faq-img" className="mt-5 m-none effect" width={516} height={549} />
							</div>
						</div>
					</div>
				</section>
			</section>
			<section id="needlawyer" className="getlegal pb-5">
				<div className="container" id="bg-color">
					<div className="row">
						<div className="col-md-6 d-none d-lg-block">
							<div className="needlawyer-text pt-lg-0 pt-4 hover">
								<Image
									src="/images/Home/legal-forum-legal-advice-free.webp"
									alt="GOT A LEGAL QUESTION"
									height={370}
									width={620}
									layout="responsive"
								/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="needlawyer-text pt-0">
								<h6 className="pt-0">GOT A LEGAL QUESTION?</h6>
								<h2>
									<span className="span">Join Our Legal Forum and </span>
									Get Expert
									<br /> Advice for Free.
								</h2>
								<p>
									Make an appointment with Advocates and Legal consultancy, one of the leading law
									firms in Dubai and across the UAE, Today! or chat with a{' '}
									<Link className="underlineClass" href="/find-a-lawyer">
										professional lawyer online
									</Link>{' '}
									for free across UAE now, We work on a wide range of legal matters.
								</p>
								<Link
									href={'/legal-forum'}
									className="w-35 chang-width btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2">
									<span className="text-white"> Visit Legal Forum </span>
									<span className="border border-radius-1 banner-arrow-btn">
										<ChevronRightIcon width={20} color={'#fff'} />
									</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
