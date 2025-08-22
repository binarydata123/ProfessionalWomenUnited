'use client';
import React, { useState, useEffect } from 'react';
import './style.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Slider from '@/commonUI/SliderHome';
import LawyerCard from '@/components/lawyer/LawyerCard';
import { getAllLawyersDataByIds } from '../../../../lib/frontendapi';

export default function BestLawyersSharjah() {
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

								<span style={{ color: 'rgba(196,144,115)' }}>Find A Professional</span>
							</div>
						</section>
					</div>
					<div className="row">
						<div className="col-lg-7">
							<h1 className="font-larger weight-bold green-medium-dark mobile-m-0">
								Find A Professional in Sharjah
							</h1>
							<p className="weight-light social-link font-medium mt-4">
								{isMobileView ? (
									<>
										{showFullText ? (
											<>
												Professional Women United is your go-to destination for connecting with the best
												lawyers Sharjah has to offer. We specialize in linking clients with the
												finest legal minds in the region, ready to handle a wide range of legal
												matters. Whether you require expert advice on family law, assistance
												with commercial contracts, or representation in property disputes, our
												platform will help you access the best legal expertise in Sharjah in a
												couple of clicks.
											</>
										) : (
											'Professional Women United is your go-to destination for connecting with the best lawyers Sharjah has to offer. We specialize in linking clients with the finest legal minds in the region, ready to handle a wide range of legal matters. 											'
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
										Professional Women United is your go-to destination for connecting with the best lawyers
										Sharjah has to offer. We specialize in linking clients with the finest legal
										minds in the region, ready to handle a wide range of legal matters. Whether you
										require expert advice on family law, assistance with commercial contracts, or
										representation in property disputes, our platform will help you access the best
										legal expertise in Sharjah in a couple of clicks.
									</>
								)}
							</p>

							<div className="about-btn-two mt-lg-5 mt-3">
								<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue">
									<span className="text-white">
										<Link href="/find-a-professional" className="findlawyertext">
											Find A Professional
										</Link>
									</span>
								</button>
							</div>
						</div>
						<div className="col-lg-5 text-right tab-center">
							<Image
								src="/images/legal-service/sharjah.png"
								alt="AdobeStock"
								className="effect show-hide"
								width={516}
								height={344}
								style={{ borderRadius: '8px' }}
							/>
						</div>
					</div>
				</div>
			</section>

			{/* <section className="why-join">
				<div className="container">
					<div className="row mt-md-5 align-items-end">
						<div className="col-lg-4 col-md-12">
							<h2 className="font-smaller weight-bold text-white">
								<span className="green-med">Motorcycle Accident</span>{' '}
								<span className="green-med-col">Statistics UAE</span>
							</h2>
							<p className="weight-light font-medium text-white mt-3">
								In 2022, the UAE experienced a substantial number of accidents involving motorcycles,
								bicycles, and e-scooters, highlighting critical concerns about road safety and the need
								for enhanced awareness and protective measures.
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
										style={{color: 'rgb(249,242,239)'}}>
										<span
											className="font-xxx-large weight-bold fontfamSet"
											style={{marginRight: '10px', color: '#fff'}}>
											728
										</span>
										road accidents involving motorcycles, bicycles, and e-scooters.
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
										style={{color: 'rgb(249,242,239)'}}>
										<span
											className="font-xxx-large weight-bold fontfamSet"
											style={{marginRight: '10px', color: '#fff'}}>
											53
										</span>
										fatalities and 965 injuries from motorcycle and e-scooter accidents.
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
										style={{color: 'rgb(249,242,239)'}}>
										<span
											className="font-xxx-large weight-bold fontfamSet"
											style={{marginRight: '10px', color: '#fff'}}>
											605
										</span>
										motorcycle accidents resulted in 45 deaths and 819 injuries.
									</p>
								</div>
							</div>
						</div>
						<div className="container">
							<div className="row">
								<div className="col-lg-12 col-xl-12 col-md-12">
									<div className="gotTitle"></div>
									<div className="gotAccordion" id="accordionExampleset">
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
														Demographics and Nationality Differences
													</button>
												</h2>
												<div
													id="collapseOne"
													className="accordion-collapse collapse show"
													aria-labelledby="headingOne"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														The study reveals a predominantly male patient population,
														comprising 98% of the cases, with a mean age of 29.8 years.
														Notably, 35% of patients were UAE nationals, showing a
														significant age difference compared to non-nationals.
														Furthermore, young UAE nationals were found to be at a higher
														risk of injury, often sustaining more abdominal injuries, while
														non-nationals tended to suffer lower limb injuries.
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
														Injury Patterns
													</button>
												</h2>
												<div
													id="collapseTwo1"
													className="accordion-collapse collapse"
													aria-labelledby="headingTwo1"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														Analysis of injury patterns highlights the prevalence of upper
														limb injuries (54%) and lower limb injuries (48%), followed
														closely by head (41%) and face (30%) injuries. The primary
														mechanism of injury was collisions with moving vehicles,
														underlining the inherent risks faced by motorcyclists on UAE
														roads.
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
														Severity and Outcomes
													</button>
												</h2>
												<div
													id="collapseThree"
													className="accordion-collapse collapse"
													aria-labelledby="headingThree"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														Concerning severity and outcomes, the median Injury Severity
														Score (ISS) was recorded at 4.5, with a median Glasgow Coma
														Scale (GCS) of 15. Patients experienced a mean hospital stay of
														8.8 days, with 15% requiring admission to the Intensive Care
														Unit (ICU) and a 6% in-hospital mortality rate.
														<br />
														These findings highlight the urgent need for targeted preventive
														measures to reduce the number and severity of motorcycle-related
														injuries in the USA. Strategies focusing on enhancing road
														safety, enforcing helmet laws, and promoting responsible riding
														behavior are crucial to minimize the risks faced by
														motorcyclists and improve overall road safety outcomes.
														<br />
														For those involved in motorcycle accidents, it’s vital to seek
														legal assistance through motorcycle accident lawyers and
														motorcycle injury lawyers. This will guarantee the necessary
														support and representation to pursue fair compensation and
														justice.
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="about-btn-two mt-lg-5 mt-3">
										<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue findlawyermargin">
											<span className="text-white findlawyertext">
												<Link
													href={'/auth/create-profile/?role=lawyer'}
													style={{color: 'white'}}>
													Find A Professional
												</Link>
											</span>
										</button>
									</div>
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
								Most Common Causes of <span className="green-medium-2">Motorcycle Accidents</span>
							</h2>
							<Image
								src="/images/car/Frame.jpg"
								alt="faq-img"
								className="m-none effect"
								width={516}
								height={550}
							/>
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
											Human Error
										</button>
									</h2>
									<div
										id="collapseOne"
										className="accordion-collapse collapse show"
										aria-labelledby="headingOne"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Human error is a leading cause of motorcycle accidents. It includes
											behaviors like speeding, reckless driving, and failure to yield. Addressing
											these behaviors through education, enforcement, and awareness campaigns is
											crucial for reducing accident rates.
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
											Unsafe Road Conditions
										</button>
									</h2>
									<div
										id="collapseTwo"
										className="accordion-collapse collapse"
										aria-labelledby="headingTwo"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Unsafe road conditions, including potholes, debris, and uneven surfaces,
											pose significant challenges to motorcyclists. Poorly maintained roads,
											inadequate road signs, and lack of visibility also increase the risk of
											accidents. Collaborative efforts between authorities and road maintenance
											teams are necessary to address these issues and enhance road safety for
											riders.
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
											Vehicle Factors
										</button>
									</h2>
									<div
										id="collapseThree"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Vehicle-related factors, such as mechanical failures, brake malfunctions,
											and defective parts, can lead to motorcycle accidents. Improper maintenance
											and neglecting regular inspections increase these risks. Ensuring proper
											vehicle maintenance, following the manufacturer guidelines, and quickly
											addressing any issues are key to preventing accidents due to vehicle
											factors.
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
											Lack of Rider Training and Experience
										</button>
									</h2>
									<div
										id="collapsefour"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Inexperienced riders or those lacking proper training are more prone to
											accidents. Poor maneuvering skills, inability to anticipate dangers, and
											improper handling of road situations contribute to accidents. Comprehensive
											rider training programs, along with mandatory licensing requirements and
											ongoing education initiatives, are essential for equipping riders with the
											skills and knowledge necessary for safe motorcycle driving.
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
											Impaired Riding
										</button>
									</h2>
									<div
										id="collapseFive"
										className="accordion-collapse collapse"
										aria-labelledby="headingFive"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Impaired riding, whether due to alcohol, drugs, or fatigue, significantly
											increases the risk of motorcycle accidents. Reduced reaction times, impaired
											judgment, and compromised coordination are common causes of collisions and
											loss of control. Strict enforcement of laws against driving under the
											influence, public awareness campaigns, and alternative transportation
											options are vital in combating impaired riding and preventing accidents.
										</div>
									</div>
								</div>
								<div className="accordion-item">
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</section> */}

			<section className="questions-part">
				<div className="container">
					<div className="row">
						<div className="col-lg-7 text-right order-lg-0 order-last">
							<div className="still" id="accordianSectionGreen">
								<h3 className="font-smaller weight-bold text-black-add-fig">
									Why Should I Hire a {' '}
									<span className="green-medium-2">
										Lawyer in <span className="desktop-br"><br /></span>{' '}Sharjah{' '}
									</span>{' '}
									through Professional Women United?
								</h3>
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
												Diverse Expertise
											</button>
										</h2>
										<div
											id="collapseEight"
											className="accordion-collapse collapse show"
											aria-labelledby="headingEight"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Professional Women United offers access to a wide range of legal professionals with
												diverse expertise. Whether you&apos;re dealing with family matters,
												business disputes, or real estate issues, our platform connects you with
												lawyers who specialize in your specific area of need. By hiring a lawyer
												in Sharjah through Professional Women United, you can rest assured that you&apos;re
												getting expert advice tailored to your unique circumstances.
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
												Local Insight
											</button>
										</h2>
										<div
											id="collapseNine"
											className="accordion-collapse collapse"
											aria-labelledby="headingNine"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												The lawyers we connect you with bring invaluable local insight to the
												table. They have a deep understanding of Sharjah&apos;s legal landscape,
												including local regulations, customs, and practices. This local
												knowledge gives you a strategic advantage in your legal proceedings,
												with the guarantee that your lawyer in Sharjah can deal with the local
												legal system effectively on your behalf.
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
												Client-Centric Approach
											</button>
										</h2>
										<div
											id="collapseTen"
											className="accordion-collapse collapse"
											aria-labelledby="headingTen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												At Professional Women United, our attorneys prioritize your needs above all else. We
												find the best lawyers in Sharjah who take the time to understand your
												objectives, concerns, and constraints, offering personalized legal
												strategies that align with your goals. With a client-centric approach,
												you can trust that your lawyer will always have your best interests at
												heart and will work tirelessly to achieve the best possible outcome for
												you.
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
												Transparent Communication
											</button>
										</h2>
										<div
											id="collapseEleven"
											className="accordion-collapse collapse"
											aria-labelledby="headingEleven"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												We believe in promoting transparent communication throughout the legal
												process. The lawyers on our platform are committed to keeping you
												informed at every stage, providing regular updates and clear
												explanations of complex legal concepts. With open communication
												channels, you can trust that you&apos;ll always be in the loop regarding
												your case&apos;s progress and any developments that may arise.
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
												Integrity and Trust
											</button>
										</h2>
										<div
											id="collapseTweleve"
											className="accordion-collapse collapse"
											aria-labelledby="headingTweleve"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Professional Women United maintains the highest ethical standards in the legal
												profession. We carefully select every lawyer on our platform to make
												sure they offer integrity, honesty, and trustworthiness. When you choose
												a specialist through Professional Women United, you&apos;ll be working with the best
												lawyer in Sharjah who prioritizes your interests and operates with the
												utmost integrity.
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
												Proven Success
											</button>
										</h2>
										<div
											id="collapseThirteen"
											className="accordion-collapse collapse"
											aria-labelledby="headingThirteen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Professional Women United has a proven track record of successfully connecting
												clients with top-tier legal representation in Sharjah. Our network of
												the best lawyers in Sharjah has achieved favorable outcomes for
												countless clients across a spectrum of legal matters. Partnering with us
												means having a trusted ally with a demonstrated history of delivering
												results.
											</div>
										</div>
									</div>
								</div>
								<div className="about-btn-two mt-lg-5 mt-3">
									<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue half-button">
										<span className="text-white set-lawyer-icon">
											<Link href="/find-a-professional" style={{ color: 'white' }}>
												Find A Professional
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
							<Image
								src="/images/car/whyshould.png"
								alt=" Still have questions?"
								width={516}
								height={549}
							/>
						</div>
					</div>
				</div>
			</section>
			<section className="discover">
				<div className="container">
					<div className="still">
						<h6 className="text-start">
							<span className="green-medium-2 font-x-small weight-bold">TOP Professional experts</span>
						</h6>

						<h3 className="font-xxx-large weight-bold text-black mt-3 discover-font">
							Discover the <span className="green-medium-2">Top Professionals in Sharjah</span>
						</h3>
						<p className="font-medium weight-light text-black-add-fig mt-3">
							{isMobileViewDiscover ? (
								<>
									{showFullTextDiscover ? (
										<>
											The best lawyers in Sharjah are distinguished by their exceptional legal
											expertise, extensive experience, and proven track record of success. With a
											deep understanding of local regulations, these attorneys have the ability
											and know-how to solve complex professional issues.
											<br />
											If you&apos;re looking for a lawyer who is committed to providing
											personalized and effective solutions tailored to your unique needs,
											you&apos;re at the right place. Be it resolving disputes, drafting
											contracts, or representing clients in court, at Professional Women United, we&apos;ll
											help you find the best lawyer Sharjah has to offer.
										</>
									) : (
										'The best lawyers in Sharjah are distinguished by their exceptional legal expertise, extensive experience, and proven track record of success. With a deep understanding of local regulations, these attorneys have the ability and know-how to solve complex professional issues. 										'
									)}
									<br />
									<div className="mt-3 mb-3 d-lg-none d-block weight-bold ">
										<Link
											href="javascript:void(0)"
											onClick={handleToggleDiscoverText}
											style={{ color: '#02142d' }}>
											{showFullTextDiscover ? 'Show Less' : 'Show More'}
										</Link>
									</div>
								</>
							) : (
								<>
									The best lawyers in Sharjah are distinguished by their exceptional legal expertise,
									extensive experience, and proven track record of success. With a deep understanding
									of local regulations, these attorneys have the ability and know-how to solve complex
									professional issues.
									<br />
									If you&apos;re looking for a lawyer who is committed to providing personalized and
									effective solutions tailored to your unique needs, you&apos;re at the right place.
									Be it resolving disputes, drafting contracts, or representing clients in court, at
									Professional Women United, we&apos;ll help you find the best lawyer Sharjah has to offer.
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
							<Link href="/find-a-professional">
								<button>View All</button>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<section id="legal-issues" className="legal-issues mobile-bg-color  mt-5 mb-5">
				<div className="container text-center">
					<div className="needlawyer-text text-center">
						<h6 className="text-center p-0">professional issueS</h6>
					</div>
					<h3 className="font-smaller weight-bold social-link">
						What Do clients
						<span className="green-medium-2">
							{' '}
							most frequently <br /> searched for?
						</span>
					</h3>
					<p className="font-medium weight-medium social-link set-text-padding color-frequent set-top-mrgin-mbl">
						Clients typically seek Professional Information with a primary focus on finding knowledgeable
						representation and clarification on their legal concerns.
						<br />
						Whether you&apos;re dealing with personal injury claims, family law matters, employment
						disputes, or real estate issues, we help you connect with Professional experts who can provide guidance
						tailored to your specific needs.
						<br />
						Select the professional issue you&apos;re facing and connect with a legal expert.
					</p>
					<ul className="pt-3 class-add">
						<li>
							<Link href="#">Personal Injury Claims</Link>
						</li>
						<li>
							<Link href="#">Family Law (Divorce, Child Custody)</Link>
						</li>
						<li>
							<Link href="#">Employment Law</Link>
						</li>
						<li>
							<Link href="#">Real Estate Law (Property Disputes, Tenancy Issues)</Link>
						</li>
						<li>
							<Link href="#">Business Law (Contracts, Corporate Governance)</Link>
						</li>
					</ul>
				</div>
			</section>

			<section className="howBenefitsLawyer">
				<div className="container">
					<div className="row">
						<div className="col-lg-5 order-lg-0 order-last mt-lg-0 mt-5 benefit-margin-top margin-botm">
							<Image src="/images/car/Group 2945.png" alt="Benefits-pic" width={512} height={720} />
						</div>
						<div className="col-lg-7 needlawyer-text-motor">
							<div className="titleHow">
								<h6 className="text-start">BENEFITS</h6>
								<h2 className="text-black-add-fig Discover-lawyer discover-text-fun">
									How can lawyers
									<span className="green-medium-2"> in Sharjah</span> help me?
								</h2>
								<div className="mt-4">
									<Link href={'/find-a-professional'}>
										<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 set-law-btn-2">
											<span className="text-white"> Find A Professional </span>
										</button>
									</Link>
								</div>
							</div>
							<div className="row mt-5 benefit-margin" style={{ marginBottom: '65px' }}>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												Mediation and Dispute Resolution
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Attorneys on our platform specialize in mediation and dispute resolution,
										offering alternative methods to resolve conflicts efficiently and
										cost-effectively. Whether it&apos;s a family dispute, commercial disagreement,
										or property conflict, they use their negotiation skills and legal expertise to
										find mutually beneficial solutions, avoiding the need for lengthy court
										proceedings.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												Estate Planning and Probate
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										If you need assistance with your real estate legal matters, we&apos;ll help you
										find it. Our network of Professional experts in Sharjah can provide comprehensive
										estate planning services, helping individuals protect their assets and ensure
										their wishes are carried out after their passing. From drafting wills and
										establishing trusts to navigating the probate process, they offer personalized
										guidance to protect your legacy and provide for your loved ones.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												Representation in Legal Proceedings
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Whether you&apos;re involved in civil litigation, criminal charges, or
										administrative hearings, lawyers in Ras Al Khaimah can represent you effectively
										in legal proceedings. They leverage their expertise to advocate on your behalf,
										deal with the court system, and work towards achieving the best possible outcome
										for your case.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												Legal Guidance and Advice
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Professionals in Sharjah provide valuable legal guidance and advice to individuals
										facing various professional issues. From clarifying complex legal concepts to outlining
										available options and potential risks, they offer insightful guidance to help
										clients make informed decisions. A lawyer in Sharjah can provide the clarity and
										direction you need to navigate the legal landscape with confidence.
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
													How do I know if I need a lawyer for my professional issue?
												</button>
											</h2>
											<div
												id="collapseOne"
												className="accordion-collapse collapse show"
												aria-labelledby="headingOne"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													If you&apos;re facing a complex legal matter or uncertainty
													regarding your rights, it can be a good idea to consult with a
													lawyer. Whether it&apos;s a personal injury claim, a family dispute,
													or a business contract, a lawyer can provide expert guidance
													tailored to your specific circumstances, helping you around the
													legal process with clarity and confidence.
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
													How can a motorcycle accident lawyer near me help me?
												</button>
											</h2>
											<div
												id="collapseTwo1"
												className="accordion-collapse collapse"
												aria-labelledby="headingTwo1"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													A motorcycle accident lawyer in Dubai can assist you in various
													ways, including offering professional advice, representing you in
													negotiations with insurance companies, and advocating for your
													rights in court if necessary. They are well-versed in Dubai legal
													system and can help you navigate the complexities of your case.
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
													Do I need to hire a motorcycle injury lawyer?
												</button>
											</h2>
											<div
												id="collapseThree"
												className="accordion-collapse collapse"
												aria-labelledby="headingThree"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													Hiring a motorcycle injury lawyer can significantly benefit your
													case if you&apos;ve been injured in a motorcycle accident. They can
													help you understand your legal rights, gather evidence to support
													your claim and negotiate with insurance companies on your behalf to
													ensure you receive fair compensation for your injuries.
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
													How do I choose the best UAE motorcycle accident lawyer?
												</button>
											</h2>
											<div
												id="collapseFour"
												className="accordion-collapse collapse"
												aria-labelledby="headingFour"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													When choosing a UAE motorcycle accident lawyer, consider their
													experience, track record of success, and specialization in
													motorcycle accident cases. Look for a lawyer who has a thorough
													understanding of UAE laws and regulations related to motorcycle
													accidents and who is committed to achieving the best possible
													outcome for your case.
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
													What should I expect during my initial consultation with a
													motorcycle accident lawyer?
												</button>
											</h2>
											<div
												id="collapseFive"
												className="accordion-collapse collapse"
												aria-labelledby="headingFive"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													During your initial consultation with a motorcycle accident lawyer,
													you can expect to discuss the details of your case, including the
													circumstances surrounding the accident and your injuries. The lawyer
													will assess the strength of your case, explain your legal options,
													and outline the potential outcomes and next steps in pursuing your
													claim.
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
													How much does it cost to hire a motorcycle accident lawyer?
												</button>
											</h2>
											<div
												id="collapseSix"
												className="accordion-collapse collapse"
												aria-labelledby="headingSix"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													The cost of hiring a motorcycle accident lawyer can vary depending
													on various factors, such as the complexity of your case and the
													lawyers fee structure. Some lawyers may work on a contingency fee
													basis, meaning they only get paid if they win your case and recover
													compensation for you. Its important to discuss fees and payment
													arrangements with your lawyer during the initial consultation.
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-12 col-xl-5 col-md-12">
								<Image
									src="/images/layer.png"
									alt="faq-img"
									className="mt-5 m-none effect"
									width={516}
									height={549}
								/>
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
									alt="GOT A Professional Question"
									height={370}
									width={620}
									layout="responsive"
								/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="needlawyer-text pt-0">
								<h6 className="pt-0">GOT A PROFESSIONAL QUESTION?</h6>
								<h2>
									<span className="span">Join Our Legal Forum and </span>
									Get Expert
									<br /> Advice for Free.
								</h2>
								<p>
									Make an appointment with Advocates and Legal consultancy, one of the leading law
									firms in Dubai and across the UAE, Today! or chat with a{' '}
									<Link className="underlineClass" href="/find-a-professional">
										professional lawyer online
									</Link>{' '}
									for free across UAE now, We work on a wide range of legal matters.
								</p>
								<Link
									href={'/legal-forum'}
									className="w-35 chang-width btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2">
									<span className="text-white"> Visit Professional Forum </span>
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
