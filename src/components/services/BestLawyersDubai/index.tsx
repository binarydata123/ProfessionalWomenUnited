'use client';
import React, { useState, useEffect } from 'react';
import './style.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Slider from '@/commonUI/SliderHome';
import LawyerCard from '@/components/lawyer/LawyerCard';
import { getAllLawyersDataByIds } from '../../../../lib/frontendapi';

export default function BestLawyersDubai() {
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
										alt="Professional Forum"
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
								Find A Professional in Dubai
							</h1>
							<p className="weight-light social-link font-medium mt-4">
								{isMobileView ? (
									<>
										{showFullText ? (
											<>
												Finding the best lawyer in Dubai is quick and easy with Professional Women United.
												We offer the most user-friendly platform for connecting clients with the
												best lawyers in the USA and simplifying the process of finding top-tier
												legal representation.
												<br />
												Our intuitive interface and detailed selection process ensure that you
												can easily locate the best lawyer in Dubai for your specific legal
												needs. Whether you need legal assistance with Family Professional, corporate
												matters, or real estate issues, our platform offers the expertise you
												require.
											</>
										) : (
											'Finding the best lawyer in Dubai is quick and easy with Professional Women United. We offer the most user-friendly platform for connecting clients with the best lawyers in the USA and simplifying the process of finding top-tier legal representation. '
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
										Finding the best lawyer in Dubai is quick and easy with Professional Women United. We offer
										the most user-friendly platform for connecting clients with the best lawyers in
										the UAE and simplifying the process of finding top-tier legal representation.
										<br />
										Our intuitive interface and detailed selection process ensure that you can
										easily locate the best lawyer in Dubai for your specific legal needs. Whether
										you need legal assistance with Family Professional, corporate matters, or real estate
										issues, our platform offers the expertise you require.
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
								src="/images/legal-service/Dubai.png"
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
										Lawyer in <span className="desktop-br"><br /></span>{' '}Dubai {' '}
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
												In-Depth Understanding of Dubai&apos;s Legal Environment
											</button>
										</h2>
										<div
											id="collapseEight"
											className="accordion-collapse collapse show"
											aria-labelledby="headingEight"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Professionals at Professional Women United possess an in-depth understanding of
												Dubai&apos;s legal environment, including local regulations, customs,
												and practices. This insight allows them to handle your case effectively
												within the context of Dubai&apos;s legal landscape, providing you with
												strategic advantages and guaranteeing compliance with local laws.
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
												Extensive Network of Women Professionals
											</button>
										</h2>
										<div
											id="collapseNine"
											className="accordion-collapse collapse"
											aria-labelledby="headingNine"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												We offer an extensive network of the best lawyers in Dubai, allowing you
												to access a diverse pool of expertise and experience. Whether you need
												help with Family Professional, corporate matters, or intellectual property
												issues, our platform connects you with lawyers in Dubai who specialize
												in your specific area of need. You can expect to receive comprehensive
												support for your legal matters.
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
												Efficient Resolution of Legal Disputes
											</button>
										</h2>
										<div
											id="collapseTen"
											className="accordion-collapse collapse"
											aria-labelledby="headingTen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Professionals on our platform excel in efficiently resolving legal disputes in
												Dubai, offering alternative methods such as mediation and arbitration.
												By leveraging their negotiation skills and legal expertise, they
												facilitate amicable resolutions outside of court, minimizing time,
												costs, and stress associated with traditional litigation processes. This
												approach prioritizes your interests and preserves relationships, leading
												to mutually beneficial outcomes for all parties involved.
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
												Commitment to Ethical Standards
											</button>
										</h2>
										<div
											id="collapseEleven"
											className="accordion-collapse collapse"
											aria-labelledby="headingEleven"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												We maintain the highest ethical standards in the legal profession,
												making sure all attorneys on our platform uphold integrity, honesty, and
												trustworthiness. When you hire a lawyer in Dubai through Professional Women United
												in Dubai, you can rest assured that you're working with a legal
												professional who prioritizes your interests and operates with utmost
												integrity, giving you peace of mind throughout your legal proceedings.
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
												Proven Track Record of Success in Dubai
											</button>
										</h2>
										<div
											id="collapseTweleve"
											className="accordion-collapse collapse"
											aria-labelledby="headingTweleve"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Professional Women United has a proven track record of successfully connecting
												clients with top-tier legal representation in Dubai. Our selection of
												the best lawyers in Dubai has achieved favorable outcomes for numerous
												clients across a wide range of legal matters, earning a reputation for
												excellence in the local professional community. When you partner with us,
												you're choosing a trusted ally with a demonstrated history of delivering
												results.
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
												Transparent Communication Throughout the Legal Process
											</button>
										</h2>
										<div
											id="collapseThirteen"
											className="accordion-collapse collapse"
											aria-labelledby="headingThirteen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												We believe in promoting transparent communication throughout the legal
												process. Our lawyers in Dubai are committed to keeping you informed at
												every stage, providing regular updates and clear explanations of complex
												legal concepts. With open communication channels, you can trust that
												you&apos;ll always be updated on your case's progress and any
												developments that may arise.
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
							Discover the <span className="green-medium-2">Top Professionals in Dubai</span>
						</h3>
						<p className="font-medium weight-light text-black-add-fig mt-3">
							{isMobileViewDiscover ? (
								<>
									{showFullTextDiscover ? (
										<>
											The best lawyers in Dubai are known for their exceptional legal expertise,
											extensive experience, and proven track record of success. These legal
											professionals have a deep understanding of local laws and regulations,
											allowing them to handle complex professional issues with precision.
											<br />
											At Professional Women United, we only list the best lawyers in Dubai so that you get
											personalized and effective legal solutions tailored to your unique needs. Be
											it resolving disputes, drafting contracts, or representing you in court, the
											lawyers on our platform demonstrate professionalism, dedication, and a
											relentless pursuit of excellence in their practice.
										</>
									) : (
										'The best lawyers in Dubai are known for their exceptional legal expertise, extensive experience, and proven track record of success. These legal professionals have a deep understanding of local laws and regulations, allowing them to handle complex professional issues with precision.'
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
									The best lawyers in Dubai are known for their exceptional legal expertise, extensive
									experience, and proven track record of success. These legal professionals have a
									deep understanding of local laws and regulations, allowing them to handle complex
									professional issues with precision.
									<br />
									At Professional Women United, we only list the best lawyers in Dubai so that you get
									personalized and effective legal solutions tailored to your unique needs. Be it
									resolving disputes, drafting contracts, or representing you in court, the lawyers on
									our platform demonstrate professionalism, dedication, and a relentless pursuit of
									excellence in their practice.
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
						Clients normally search for expert legal representation to address their concerns and get
						clarity on legal matters. They seek guidance on various issues ranging from personal injury
						claims to Family Professional matters like divorce and child custody, employment disputes, real estate
						issues such as property disputes and tenancy matters, and business law matters.
						<br />
						Select the professional issue you&apos;re facing and connect with a legal expert.
					</p>
					<ul className="pt-3 class-add">
						<li>
							<Link href="#">Personal Injury Claims</Link>
						</li>
						<li>
							<Link href="#">Family Professional (Divorce, Child Custody)</Link>
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
									<span className="green-medium-2"> in Dubai</span> help me?
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
												Navigating Dubai&apos;s Legal Landscape
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Professionals in Dubai are skilled at dealing with the city&apos;s complex legal
										landscape, including its unique regulations, business environment, and cultural
										dynamics. With their deep understanding of Dubai&apos;s legal framework, they
										provide strategic advice and representation tailored to your specific needs,
										guaranteeing compliance with local laws and maximizing opportunities for
										success.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												Strategic Legal Planning for Business Growth
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Our attorneys in Dubai excel in strategic legal planning, helping businesses
										avoid potential legal risks while maximizing growth opportunities. They conduct
										comprehensive assessments of your business operations and objectives, developing
										proactive strategies to navigate regulatory requirements, protect intellectual
										property, and guarantee compliance with local laws. By aligning legal strategies
										with your business goals, they help you achieve sustainable growth and long-term
										success in Dubai&apos;s dynamic marketplace.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												Legal Compliance and Risk Management
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Professionals in Dubai offer expertise in risk management, helping you identify,
										assess, and mitigate legal risks associated with their business operations or
										personal affairs. They carry out thorough risk assessments, analyzing potential
										liabilities and legal exposure to develop proactive strategies that minimize the
										likelihood of adverse outcomes. By providing tailored risk management advice and
										guidance, our attorneys help you make informed decisions and overcome legal
										challenges.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												Advising on Shariah-Compliant Transactions
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Given Dubai&apos;s significant Islamic finance sector, lawyers in Dubai offer
										expertise in Shariah-compliant transactions. They have a deep understanding of
										Islamic finance principles and regulations, advising clients on structuring
										transactions that comply with Shariah law while meeting their financial
										objectives. Whether you&apos;re involved in Islamic banking, sukuk issuance, or
										Islamic investment funds, the best lawyers in Dubai can provide guidance and
										make sure your transactions meet Shariah principles.
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
													How do I find the best lawyer in Dubai through Professional Women United?
												</button>
											</h2>
											<div
												id="collapseOne"
												className="accordion-collapse collapse show"
												aria-labelledby="headingOne"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													Finding the best lawyer in Dubai is simple with Professional Women United. Our
													user-friendly platform allows you to browse through a curated
													selection of top-tier legal professionals, each with expertise in
													various practice areas. You can easily review their profile to make
													an informed decision that aligns with your specific needs.
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
													What types of legal matters can I seek assistance with through
													Professional Women United?
												</button>
											</h2>
											<div
												id="collapseTwo1"
												className="accordion-collapse collapse"
												aria-labelledby="headingTwo1"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													Professional Women United offers expertise across a wide range of legal areas,
													including Family Professional, corporate matters, real estate issues,
													intellectual property, and more. Whether you&apos;re dealing with
													personal injury claims, employment disputes, property disputes, or
													contractual matters, our platform connects you with the lawyers who
													specialize in your specific area of need.
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
													How can a lawyer from Professional Women United help me navigate Dubai&apos;s
													legal landscape?
												</button>
											</h2>
											<div
												id="collapseThree"
												className="accordion-collapse collapse"
												aria-labelledby="headingThree"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													Professionals from Professional Women United possess a deep understanding of
													Dubai&apos;s legal environment, including local regulations,
													customs, and practices. This insight allows them to handle your case
													effectively within the context of Dubai&apos;s legal landscape,
													providing you with strategic advantages and ensuring compliance with
													local laws.
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
													What is the process for resolving legal disputes through Connect
													Legal?
												</button>
											</h2>
											<div
												id="collapseFour"
												className="accordion-collapse collapse"
												aria-labelledby="headingFour"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													Professional Women United prioritizes efficient resolution of legal disputes in
													Dubai. The lawyers on our platform excel in alternative dispute
													resolution methods such as mediation and arbitration, minimizing
													time, costs, and stress associated with traditional litigation
													processes. By leveraging negotiation skills and legal expertise,
													they facilitate amicable resolutions outside of court, prioritizing
													your interests and preserving relationships.
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
													How does Professional Women United ensure confidentiality and trust in the legal
													process?
												</button>
											</h2>
											<div
												id="collapseFive"
												className="accordion-collapse collapse"
												aria-labelledby="headingFive"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													Professional Women United maintains the highest ethical standards in the legal
													profession, ensuring strict confidentiality of client information.
													The lawyers we select for you adhere to professional standards and
													legal obligations to maintain integrity, honesty, and
													trustworthiness, providing you with peace of mind throughout your
													legal proceedings. You can trust that your sensitive legal matters
													will be handled with the utmost discretion and professionalism.
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
													How do I know if I need to hire a lawyer?
												</button>
											</h2>
											<div
												id="collapseSix"
												className="accordion-collapse collapse"
												aria-labelledby="headingSix"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													You may need to hire a lawyer if you're facing a professional issue that
													requires expert guidance, representation, or assistance. Common
													situations that call for a lawyer include personal injury claims,
													divorce or family disputes, business transactions, real estate
													matters, employment disputes, criminal charges, and estate planning.
													If you're not sure whether you need a lawyer, consider consulting
													with one to discuss your situation and explore your options.
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="headingSeven">
												<button
													className="accordion-button text-white"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target="#collapseSeven"
													aria-expanded="true"
													aria-controls="collapseSeven">
													What should I consider before hiring a lawyer in Dubai?
												</button>
											</h2>
											<div
												id="collapseSeven"
												className="accordion-collapse collapse"
												aria-labelledby="headingSeven"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													Before hiring a lawyer in Dubai, account for factors such as their
													experience, expertise in your specific professional issue, track record of
													success, communication style, and fees. Take the time to research
													and meet with potential lawyers to make sure they are the right fit
													for your case.
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="headingEight">
												<button
													className="accordion-button text-white"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target="#collapseEight"
													aria-expanded="true"
													aria-controls="collapseEight">
													How much does it cost to hire a lawyer in Dubai?
												</button>
											</h2>
											<div
												id="collapseEight"
												className="accordion-collapse collapse"
												aria-labelledby="headingEight"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													The cost of hiring a lawyer in Dubai varies depending on factors
													such as the lawyer&apos;s experience, expertise, the complexity of
													the case, and the billing structure (such as hourly rates, flat
													fees, or contingency fees). It&apos;s essential to discuss fees and
													payment arrangements with your lawyer upfront to ensure transparency
													and avoid any surprises later on.
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
									<span className="span">Join Our Professional Forum and </span>
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
