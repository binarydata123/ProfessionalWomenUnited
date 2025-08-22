'use client';
import React, { useState, useEffect } from 'react';
import './style.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Slider from '@/commonUI/SliderHome';
import LawyerCard from '@/components/lawyer/LawyerCard';
import { getAllLawyersDataByIds } from '../../../../lib/frontendapi';
import { useTranslations } from 'next-intl';

export default function MedicalMalpracticeLawyer() {
	const t = useTranslations('medicalMalpracticeLawyer');
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

								<span style={{ color: 'rgba(196,144,115)' }}>{t('Find_a_Lawyer')}</span>
							</div>
						</section>
					</div>
					<div className="row">
						<div className="col-lg-7">
							<h1 className="font-larger weight-bold green-medium-dark mobile-m-0">
								{t('Medical_Malpractice_Lawyer')}
							</h1>
							<p className="weight-light social-link font-medium mt-4">
								{isMobileView ? (
									<>
										{showFullText ? (
											<>
												{t('A_medical_malpractice_lawyer')}
												<br />
												<br />
												{t('At_Connect_Legal_we_connect')}
											</>
										) : (
											`${t('A_medical_malpractice_lawyer')}`
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
										{t('A_medical_malpractice_lawyer')}
										<br />
										<br />
										{t('At_Connect_Legal_we_connect')}
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
								src="/images/legal-service/medical.jpg"
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

			<section className="why-join">
				<div className="container">
					<div className="row mt-md-5 align-items-end">
						<div className="col-lg-4 col-md-12">
							<h2 className="font-smaller weight-bold text-white">
								<span className="green-med">{t('Medical_Malpractice_')}</span>{' '}
								<span className="green-med-col">{t('Statistics_Globally')}</span>
							</h2>
							<p className="weight-light font-medium text-white mt-3">
								{t('Medical_malpractice_occurs_when')}
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
										style={{ color: 'rgb(249,242,239)' }}>
										<span
											className="font-xxx-large weight-bold fontfamSet"
											style={{ marginRight: '10px', color: '#fff' }}>
											96.9%
										</span>
										{t('of_successful_medical')}
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
										style={{ color: 'rgb(249,242,239)' }}>
										<span
											className="font-xxx-large weight-bold fontfamSet"
											style={{ marginRight: '10px', color: '#fff' }}>
											3 to 5%
										</span>
										{t('of_medical_procedures')}
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
										style={{ color: 'rgb(249,242,239)' }}>
										<span
											className="font-xxx-large weight-bold fontfamSet"
											style={{ marginRight: '10px', color: '#fff' }}>
											1/3
										</span>
										{t('One_third_of_care_providers')}
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
												<h2 className="accordion-header" id="headingTwo1">
													<button
														className="accordion-button text-white"
														type="button"
														data-bs-toggle="collapse"
														data-bs-target="#collapseTwo1"
														aria-expanded="true"
														aria-controls="collapseTwo1">
														{t('UAE_Civil_Law_System')}
													</button>
												</h2>
												<div
													id="collapseTwo1"
													className="accordion-collapse collapse show"
													aria-labelledby="headingTwo1"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														{t('In_the_UAE_the_legal_system')}
													</div>
												</div>
											</div>
											<div className="accordion-item">
												<h2 className="accordion-header" id="headingOne">
													<button
														className="accordion-button text-white"
														type="button"
														data-bs-toggle="collapse"
														data-bs-target="#collapseOne"
														aria-expanded="true"
														aria-controls="collapseOne">
														{t(
															'Key_Procedures_and_Considerations_in_UAEs_Medical_Malpractice_Claims'
														)}
													</button>
												</h2>
												<div
													id="collapseOne"
													className="accordion-collapse collapse "
													aria-labelledby="headingOne"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														{t('Medical_malpractice_claims_in_the')}
														<br />
														{t('By_setting_clear_rules_and')}
													</div>
												</div>
											</div>
											<div className="accordion-item">
												<h2 className="accordion-header" id="headingThree">
													<button
														className="accordion-button text-white"
														type="button"
														data-bs-toggle="collapse"
														data-bs-target="#collapseThree3"
														aria-expanded="true"
														aria-controls="collapseThree3">
														{t('The_Role_of_Medical_Liability_Committees_in_UAE')}
													</button>
												</h2>
												<div
													id="collapseThree3"
													className="accordion-collapse collapse "
													aria-labelledby="headingThree"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														{t('Medical_liability_committees_play')}
														<br />
														{t('Upon_receiving_a_complaint_the_committee')}
														<br />
														{t('If_you_ve_been_a_victim_of_medical')}
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
													style={{ color: 'white' }}>
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
								{t('Common_Causes_of')}
								<span className="green-medium-2">{t('_Medical_Malpractice')}</span>
							</h2>
							{/* <img src="/images/car/Frame.jpg" alt="faq-img" className="m-none effect" /> */}
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
											{t('Misdiagnosis')}
										</button>
									</h2>
									<div
										id="collapseOne"
										className="accordion-collapse collapse show"
										aria-labelledby="headingOne"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">{t('Misdiagnosis_occurs_when')}</div>
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
											{t('Surgical_Errors')}
										</button>
									</h2>
									<div
										id="collapseTwo"
										className="accordion-collapse collapse"
										aria-labelledby="headingTwo"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">{t('Surgical_errors_encompass')}</div>
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
											{t('Medication_Mistakes')}
										</button>
									</h2>
									<div
										id="collapseThree"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											{t('Medication_mistakes_involve')}
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
											{t('Communication_Failures')}
										</button>
									</h2>
									<div
										id="collapsefour"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											{t('Communication_failures_between')}
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
											{t('Inadequate_Follow_Up_Care')}
										</button>
									</h2>
									<div
										id="collapseFive"
										className="accordion-collapse collapse"
										aria-labelledby="headingFive"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											{t('Inadequate_follow_up_care_occurs')}
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
									{t('Why_Should_I_Hire_a')} <br />{' '}
									<span className="green-medium-2">
										{t('Medical__Malpractice')}
										<br />{' '}
									</span>{' '}
									{t('Lawyer_from_Connect_Legal')}
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
												{t('Specialized_Knowledge_of_UAE_Medical_Malpractice_Laws')}
											</button>
										</h2>
										<div
											id="collapseEight"
											className="accordion-collapse collapse show"
											aria-labelledby="headingEight"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('Our_network_of_lawyers_possesses')}
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
												{t('Tailored_Legal_Strategies')}
											</button>
										</h2>
										<div
											id="collapseNine"
											className="accordion-collapse collapse"
											aria-labelledby="headingNine"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('Medical_malpractice_cases_can')}
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
												{t('Proven_Track_Record_of_Success')}
											</button>
										</h2>
										<div
											id="collapseTen"
											className="accordion-collapse collapse"
											aria-labelledby="headingTen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('The_legal_professionals_sourced_through')}
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
												{t('Effective_Negotiation_Skills')}
											</button>
										</h2>
										<div
											id="collapseEleven"
											className="accordion-collapse collapse"
											aria-labelledby="headingEleven"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('At_Connect_Legal_we_only_work')}
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
												{t('Extensive_Trial_Experience')}
											</button>
										</h2>
										<div
											id="collapseTweleve"
											className="accordion-collapse collapse"
											aria-labelledby="headingTweleve"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('In_cases_where_litigation_becomes')}
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
												{t('Compassionate_Client_Support')}
											</button>
										</h2>
										<div
											id="collapseThirteen"
											className="accordion-collapse collapse"
											aria-labelledby="headingThirteen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('Facing_a_medical_malpractice_claim')}
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
											{/* <span className="border-btn-lawyer"> */}
											{/* <ChevronRightIcon width={20} color={'#fff'} /> */}
											{/* </span> */}
										</span>
									</button>
								</div>
							</div>
						</div>
						<div className="col-lg-5 mb-lg-0 mb-4">
							{/* <img src="/images/car/Group2944.png" alt=" Still have questions?" /> */}
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
							<span className="green-medium-2 font-x-small weight-bold">TOP Professional experts</span>
						</h6>

						<h3 className="font-xxx-large weight-bold text-black mt-3 discover-font">
							{t('Discover_the')}{' '}
							<span className="green-medium-2">{t('Top_Medical_Malpractice_Lawyers_in_Dubai')}</span>
						</h3>
						<p className="font-medium weight-light text-black-add-fig mt-3">
							{isMobileViewDiscover ? (
								<>
									{showFullTextDiscover ? (
										<>
											{t('At_Connect_Legal_we_pride_ourselves')}
											<br />
											{t('They_demonstrate_impeccable')}
										</>
									) : (
										`${t('At_Connect_Legal_we_pride_ourselves')}`
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
									{t('At_Connect_Legal_we_pride_ourselves')}
									<br />
									{t('They_demonstrate_impeccable')}
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

			<section id="legal-issues" className="legal-issues  mobile-bg-color mt-5 mb-5">
				<div className="container text-center">
					<div className="needlawyer-text text-center">
						<h6 className="text-center p-0">professional issueS</h6>
					</div>
					<h3 className="font-smaller weight-bold social-link">
						{t('What_Do_Clients')}
						<span className="green-medium-2">
							{' '}
							{t('Most_Frequently')} <br /> {t('Search_For')}
						</span>
					</h3>
					<p className="font-medium weight-medium social-link set-text-padding color-frequent set-top-mrgin-mbl">
						{t('Clients_frequently_seek_knowledgeable_legal')}
						<br />
						{t('Select_the_legal_issue_youre_facing_and_connect_with_a_legal_expert')}
					</p>
					<ul className="pt-3 class-add">
						<li>
							<Link href="#">{t('Understanding_medical_malpractice_laws_in_Dubai')}</Link>
						</li>
						<li>
							<Link href="#">{t('Finding_experienced_medical_malpractice_lawyers')}</Link>
						</li>
						<li>
							<Link href="#">{t('Exploring_options_for_compensation_for_medical_negligence')}</Link>
						</li>
						<li>
							<Link href="#">{t('Seeking_guidance_on_filing_a_medical_malpractice_claim')}</Link>
						</li>
						<li>
							<Link href="#">
								{t('Clarifying_liability_in_cases_of_surgical_errors_or_misdiagnosis')}
							</Link>
						</li>
					</ul>
				</div>
			</section>
			<section className="howBenefitsLawyer">
				<div className="container">
					<div className="row">
						<div className="col-lg-5 order-lg-0 order-last mt-lg-0 mt-5 benefit-margin-top margin-botm">
							{/* <img src="/images/car/Benefits-pic.jpg" alt="Benefits-pic" /> */}
							<Image src="/images/car/Benefits-pic.jpg" alt="Benefits-pic" width={512} height={720} />
						</div>
						<div className="col-lg-7 needlawyer-text-motor">
							<div className="titleHow">
								<h6 className="text-start">BENEFITS</h6>
								<h2 className="text-black-add-fig Discover-lawyer discover-text-fun">
									{t('How_Lawyers_Can_Assist_in')}
									<span className="green-medium-2"> {t('Medical_Malpractice')}</span>-
									{t('Related_Legal_Matters')}
								</h2>
								<div className="mt-4">
									<Link href={'/find-a-professional'}>
										<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 set-law-btn-2">
											<span className="text-white"> Find A Professional </span>
										</button>
									</Link>
								</div>
							</div>
							<div className="row mt-4 mb-4">
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												{t('Case_Evaluation_and_Consultation')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('Medical_malpractice_lawyers_offer_comprehensive')}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												{t('Negotiation_with_Insurance_Companies')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('Experienced_medical_malpractice_lawyers')}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												{t('Litigation_and_Court_Representation')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('In_cases_where_settlement_negotiations')}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												{t('Guidance_Throughout_the_Legal_Process')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('Medical_malpractice_attorneys_offer_clients')}
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
													{t('What_constitutes_medical_malpractice')}
												</button>
											</h2>
											<div
												id="collapseOne"
												className="accordion-collapse collapse show"
												aria-labelledby="headingOne"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('Medical_malpractice_refers_to_situations')}
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
													{t('How_do_I_know_if_I_have_a_valid_medical_malpractice_claim')}
												</button>
											</h2>
											<div
												id="collapseTwo1"
												className="accordion-collapse collapse"
												aria-labelledby="headingTwo1"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('Determining_the_validity_of_a_medical')}
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
													{t('What_damages_can_I_recover_in_a_medical_malpractice_lawsuit')}
												</button>
											</h2>
											<div
												id="collapseThree"
												className="accordion-collapse collapse"
												aria-labelledby="headingThree"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('Eligible_damages_in_a_medical_malpractice')}
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
													{t('How_long_do_I_have_to_file_a_medical_malpractice_claim')}
												</button>
											</h2>
											<div
												id="collapseFour"
												className="accordion-collapse collapse"
												aria-labelledby="headingFour"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('The_rules_of_limitations_for_filing_a_medical')}
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
													{t(
														'What_role_does_medical_malpractice_insurance_play_in_a_lawsuit'
													)}
												</button>
											</h2>
											<div
												id="collapseFive"
												className="accordion-collapse collapse"
												aria-labelledby="headingFive"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('Medical_malpractice_insurance_provides')}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-12 col-xl-5 col-md-12">
								{/* <img src="/images/layer.png" alt="faq-img" className="mt-5 m-none effect" /> */}
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
