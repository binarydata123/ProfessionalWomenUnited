'use client';
import React, {useState, useEffect} from 'react';
import './style.css';
import Image from 'next/image';
import Link from 'next/link';
import {ChevronRightIcon} from '@heroicons/react/20/solid';
import Slider from '@/commonUI/SliderHome';
import LawyerCard from '@/components/lawyer/LawyerCard';
import {getAllLawyersDataByIds} from '../../../../lib/frontendapi';
import {useTranslations} from 'next-intl';

export default function MaritimeLawyer() {
	const [lawyers, setlawyers] = useState([]);
	const [showFullText, setShowFullText] = useState(false);
	const [isMobileView, setIsMobileView] = useState(false);
	const [showFullTextDiscover, setShowFullTextDiscover] = useState(false);
	const [isMobileViewDiscover, setIsMobileViewDiscover] = useState(false);
	const t  = useTranslations("maritimelawyer");

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

								<span style={{color: 'rgba(9, 63, 56, 1)'}}>{t('Find_a_Lawyer')}</span>
							</div>
						</section>
					</div>
					<div className="row">
						<div className="col-lg-7">
							<h1 className="font-larger weight-bold green-medium-dark mobile-m-0">
								{t('Maritime_Lawyer_in_Dubai')}
							</h1>
							<p className="weight-light social-link font-medium mt-4">
								{isMobileView ? (
									<>
										{showFullText ? (
											<>
												{t('A_maritime_lawyer_specializesS')}
												<br /> {t('The_experienced_maritime')}
											</>
										) : (
											'A maritime lawyer specializes in legal matters related to shipping, navigation, and maritime activities, such as cargo disputes, vessel accidents, or environmental regulations. They offer expertise in international and local maritime laws. '
										)}
										<br />
										<div className="mt-3 mb-3 d-lg-none d-block weight-bold ">
											<Link href="#" onClick={handleToggleText} style={{color: '#02142d'}}>
												{showFullText ? 'Show Less' : 'Show More'}
											</Link>
										</div>
									</>
								) : (
									<>
										{t('A_maritime_lawyer_specializesS')}
										<br /> {t('The_experienced_maritime')}
									</>
								)}
							</p>

							<div className="about-btn-two mt-lg-5 mt-3">
								<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue">
									<span className="text-white">
										<Link href="/find-a-lawyer" className="findlawyertext">
											Find a Lawyer
										</Link>
									</span>
								</button>
							</div>
						</div>
						<div className="col-lg-5 text-right tab-center">
							<Image
								src="/images/legal-service/maritime_lawyer.jpeg"
								alt="AdobeStock"
								className="effect show-hide"
								width={516}
								height={344}
								style={{borderRadius: '8px'}}
							/>
						</div>
					</div>
				</div>
			</section>

			<section className="why-join">
				<div className="container">
					<div className="row mt-md-5 align-items-end">
						<div className="col-lg-12 col-xl-12 col-md-12">
							<h2 className="font-smaller weight-bold text-white">
								<span className="green-med">{t('Key_Changes_in_UAE_Maritime_Law')}</span>{' '}
								<span className="green-med-col"> {t('Maritime_Law')} </span>
							</h2>
							<div className="accordion-body border-0 text-white">
							{t('The_UAE')} 
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
														{t('Ownership_of_a_UAE_Registered_Vessel')} 
													</button>
												</h2>
												<div
													id="collapseOne"
													className="accordion-collapse collapse show"
													aria-labelledby="headingOne"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
													{t('The_New_Maritime_Law_introduces')} 
														<ul className="custom-bullets mt-3 mb-3">
															<li>
															{t('UAE_nationality')} 
															</li>
															<li>
															{t('Registration')} 
															</li>
															<li>
															{t('Ownership_requirements')} 
															</li>
														</ul>
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
														{t('Registration_of_a_Vessel_in_the_UAE')} 
													</button>
												</h2>
												<div
													id="collapseTwo1"
													className="accordion-collapse collapse"
													aria-labelledby="headingTwo1"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
													{t('The_New_Maritime_Law_outlines')} 
														<ul className="custom-bullets mt-3 mb-3">
															<li>
															{t('Specifications_approval')} 															</li>
															<li>
															{t('Under_construction_ships_register')} 	
															</li>
															<li>
															{t('Shipbuilders_responsibility')} 	
															</li>
														</ul>
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
														{t('Bareboat_Chartering')} 	
													</button>
												</h2>
												<div
													id="collapseThree"
													className="accordion-collapse collapse"
													aria-labelledby="headingThree"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
													{t('The_New_Maritime_Law_introducesS')} 	
														<ul className="custom-bullets mt-3 mb-3">
															<li>
															{t('Chartering_in')} 	
															</li>
															<li>
															{t('Chartering_out')} 	
															</li>
															<li>
															{t('New_provisions')} 	
															</li>
														</ul>
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
													Find a Lawyer
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
							{t('Maritime_Safety')} 	 <span className="green-medium-2">{t('Regulations')} </span>
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
											{t('International_Conventions_and_Protocols')} 
										</button>
									</h2>
									<div
										id="collapseOne"
										className="accordion-collapse collapse show"
										aria-labelledby="headingOne"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
										{t('Maritime_safety_is_governed')} 
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
											{t('Safety_Inspections_and_Compliance')} 
										</button>
									</h2>
									<div
										id="collapseTwo"
										className="accordion-collapse collapse"
										aria-labelledby="headingTwo"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
										{t('Regulatory_authorities_conduct')} 
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
												{t('Training_and_Certification_of_Seafarers')} 
										</button>
									</h2>
									<div
										id="collapseThree"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
										{t('To_operate_vessels_safely')} 
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
											{t('Vessel_Design_and_Construction_Standards')} 
										</button>
									</h2>
									<div
										id="collapsefour"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
										{t('International_regulations_specify')} 
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
									{t('Emergency_Preparedness_and_Drills')} 

										</button>
									</h2>
									<div
										id="collapseFive"
										className="accordion-collapse collapse"
										aria-labelledby="headingFive"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
										{t('Maritime_safety_includes_preparedness')} 
										</div>
									</div>
								</div>
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
								{t('Why_Should_I_Hire_a_')}  <br />{' '}
									<span className="green-medium-2">
									{t('Maritime_Lawyer')}  <br />{' '}
									</span>{' '}
									{t('from_Connect_Legal?')} 
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
													{t('Expertise_in_Maritime_Law_and_Regulations')} 
											</button>
										</h2>
										<div
											id="collapseEight"
											className="accordion-collapse collapse show"
											aria-labelledby="headingEight"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
											{t('The_maritime_lawyers')} 
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
												{t('Proven_Success_in_Litigation_and_Dispute_Resolution')} 
											</button>
										</h2>
										<div
											id="collapseNine"
											className="accordion-collapse collapse"
											aria-labelledby="headingNine"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
											{t('The_maritime_lawyers_on_Connect')} 
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
												{t('Tailored_Legal_Solutions_for_Your_Needs')} 
											</button>
										</h2>
										<div
											id="collapseTen"
											className="accordion-collapse collapse"
											aria-labelledby="headingTen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
											{t('The_attorneys_in_our_network')} 
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
												{t('Strong_Network_and_Industry_Connections')} 
											</button>
										</h2>
										<div
											id="collapseEleven"
											className="accordion-collapse collapse"
											aria-labelledby="headingEleven"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
											{t('The_maritime_lawyers_on_our')} 
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
												{t('Prompt_and_Transparent_Communication')} 
											</button>
										</h2>
										<div
											id="collapseTweleve"
											className="accordion-collapse collapse"
											aria-labelledby="headingTweleve"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
											{t('Maritime_lawyers_prioritize')} 
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
												{t('Dedicated_Client_Support_and_Advocacy')} 
											</button>
										</h2>
										<div
											id="collapseThirteen"
											className="accordion-collapse collapse"
											aria-labelledby="headingThirteen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
											{t('Our_lawyer_base_is_dedicated_to')} 
											</div>
										</div>
									</div>
								</div>
								<div className="about-btn-two mt-lg-5 mt-3">
									<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue half-button">
										<span className="text-white set-lawyer-icon">
											<Link href="/find-a-lawyer" style={{color: 'white'}}>
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
							<Image
								src="/images/car/Group2944.png"
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
							<span className="green-medium-2 font-x-small weight-bold">TOP LEGAL EXPERTS</span>
						</h6>

						<h3 className="font-xxx-large weight-bold text-black mt-3 discover-font">
						{t('Discover_the')}  <span className="green-medium-2">{t('Top_Maritime_Lawyers_in_Dubai')}</span>
						</h3>
						<p className="font-medium weight-light text-black-add-fig mt-3">
							{isMobileViewDiscover ? (
								<>
									{showFullTextDiscover ? (
										<>
											{t('Connect_Legal_boasts_some')} 
										</>
									) : (
										'Professional Women United boasts some of the top maritime lawyers in Dubai, known for their exceptional knowledge and dedication to marine law. Our network of experts is well-versed in local and international regulations, making them highly adept at handling complex cases and legal challenges. Top talents on our platform are characterized by meticulous attention to detail, strong negotiation skills, and a client-focused approach. 										'
									)}
									<br />
									<div className="mt-3 mb-3 d-lg-none d-block weight-bold ">
										<Link
											href="javascript:void(0)"
											onClick={handleToggleDiscoverText}
											style={{color: '#02142d'}}>
											{showFullTextDiscover ? 'Show Less' : 'Show More'}
										</Link>
									</div>
								</>
							) : (
								<>
									{t('Connect_Legal_boasts_some')} 
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
					{t('What_Do_Clients?')} 
						<span className="green-medium-2">
							{' '}
							{t('Most_Frequently_Search_For')} 
						</span>
					</h3>
					<p className="font-medium weight-medium social-link set-text-padding color-frequent set-top-mrgin-mbl">
					{t('Individuals_seeking_legal_information')} 
						<br />
						{t('Select_the_legal')} 
					</p>
					<ul className="pt-3 class-add">
						<li>
							<Link href="#">{t('Maritime_contracts_and_agreements')} </Link>
						</li>
						<li>
							<Link href="#">{t('Compliance_with_international_shipping_laws')}</Link>
						</li>
						<li>
							<Link href="#">{t('Vessel_registration_and_ownership')}</Link>
						</li>
						<li>
							<Link href="#">{t('Maritime_insurance_and_liability')}</Link>
						</li>
						<li>
							<Link href="#">{t('Dispute_resolution_and_litigation')}</Link>
						</li>
						<li>
							<Link href="#">{t('Ship_financing_and_transactions')}</Link>
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
								{t('How_Lawyers_Can_Assist_in')}
																	<span className="green-medium-2"> {t('Maritime')}</span>{t('Related_Legal_Matters')}
								</h2>
								<div className="mt-4">
									<Link href={'/find-a-lawyer'}>
										<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 set-law-btn-2">
											<span className="text-white"> Find a Lawyer </span>
										</button>
									</Link>
								</div>
							</div>
							<div className="row mt-5 benefit-margin" style={{marginBottom: '65px'}}>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{color: '#093F38'}}>
											{t('Drafting_and_Reviewing_Maritime_Contracts')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />A maritime lawyer can assist in
										{t('A_maritime_lawyer_can_assist_in')}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{color: '#093F38'}}>
											{t('Handling_Disputes_and_Litigation')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('Maritime_lawyers_excel_at_managing')}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{color: '#093F38'}}>
											{t('Ensuring_Compliance_with_Regulations')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('Dealing_with_international')}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{color: '#093F38'}}>
											{t('Advising_on_Vessel_Registration_and_Ownership')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('Maritime_lawyers_help_clients_with')}
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
									{t('Got_questions')} <br />
										<span className="green-medium-2"> {t('We_have_answers')}</span>
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
													{t('What_does_a_maritime_lawyer_do?')}
												</button>
											</h2>
											<div
												id="collapseOne"
												className="accordion-collapse collapse show"
												aria-labelledby="headingOne"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
												{t('A_maritime_lawyer_specializes')}
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
										{t('What_role_does')}												</button>
											</h2>
											<div
												id="collapseTwo1"
												className="accordion-collapse collapse"
												aria-labelledby="headingTwo1"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
												{t('A_maritime_lawyer_provides_valuable')}	
													<br /> {t('By_representing_clients_in_negotiations')}	
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
													{t('How_can_a_maritimeS')}	
												</button>
											</h2>
											<div
												id="collapseThree"
												className="accordion-collapse collapse"
												aria-labelledby="headingThree"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
												{t('A_maritime_lawyer_can')}	
													<br />{t('By_staying_up_to_date')}	
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
													{t('What_kind_of_maritime')}	
												</button>
											</h2>
											<div
												id="collapseFour"
												className="accordion-collapse collapse"
												aria-labelledby="headingFour"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
												{t('Connect_Legal_offers_a')}
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
													{t('How_can_a_maritime')}
												</button>
											</h2>
											<div
												id="collapseFive"
												className="accordion-collapse collapse"
												aria-labelledby="headingFive"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
												{t('A_maritime_lawyer_can_guide')}

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
																									{t('What_is_the_importance')}

												</button>
											</h2>
											<div
												id="collapseSix"
												className="accordion-collapse collapse"
												aria-labelledby="headingSix"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
												{t('Hiring_a_maritime_lawyer_for')}
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
													{t('How_do_maritime_lawyers')}
												</button>
											</h2>
											<div
												id="collapseSeven"
												className="accordion-collapse collapse"
												aria-labelledby="headingSeven"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
												{t('Maritime_lawyers_at_Connect')}
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
												{t('How_do_the_maritime_lawyers')}
												</button>
											</h2>
											<div
												id="collapseEight"
												className="accordion-collapse collapse"
												aria-labelledby="headingEight"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
												{t('The_maritime_law_experts_on')}

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
