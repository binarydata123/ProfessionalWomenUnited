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

export default function CriminalLawyersDubai() {
	const t = useTranslations('criminalLawyerInAbuDhabi');
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
								{t('Criminal_Lawyers_in_Abu_Dhabi')}
							</h1>
							<p className="weight-light social-link font-medium mt-4">
								{isMobileView ? (
									<>
										{showFullText ? (
											<>{t('A_criminal_lawyer_in_Abu_Dhabi')}</>
										) : (
											'A motorcycle accident lawyer specializes in representing individuals who have been involved in motorcycle accidents. They provide legal assistance to help victims recover compensation for damages such as medical expenses, lost wages, pain and suffering, and property damage.'
										)}
										<br />
										<div className="mt-3 mb-3 d-lg-none d-block weight-bold ">
											<Link href="#" onClick={handleToggleText} style={{ color: '#02142d' }}>
												{showFullText ? 'Show Less' : 'Show More'}
											</Link>
										</div>
									</>
								) : (
									<>{t('A_criminal_lawyer_in_Abu_Dhabi')}</>
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
								src="/images/legal-service/criminal_lawyer.jpeg"
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
						<div className="col-lg-12 col-xl-12 col-md-12">
							<h2 className="font-smaller weight-bold text-white">
								<span className="green-med">{t('Crime_Statistics_in_the')}</span>{' '}
								<span className="green-med-col">{t('UAE')}</span>
							</h2>
							<div className="accordion-body border-0 text-white">
								{t('Recent_crime_statistics_in')}
								<ul className="custom-bullets mt-3 mb-3">
									<li>{t('robberies_per')}</li>
									<li>{t('thefts_per')}</li>
									<li>{t('grand_auto_thefts')}</li>
									{/* <li>1.3 abductions per 100,000 people in 2022, maintaining the rate from 2021.</li>
									<li>
										3.2 grand auto thefts per 100,000 people in 2022, the highest rate recorded.
									</li> */}
								</ul>
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
														{t('Criminal_Law_in_the_UAE')}
													</button>
												</h2>
												<div
													id="collapseOne"
													className="accordion-collapse collapse show"
													aria-labelledby="headingOne"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														{t('The_legal_system_of_the_United')}
													</div>
												</div>
											</div>

											<div className="accordion-item">
												<h2 className="accordion-header" id="headingTwo">
													<button
														className="accordion-button text-white"
														type="button"
														data-bs-toggle="collapse"
														data-bs-target="#collapseTwo"
														aria-expanded="true"
														aria-controls="collapseTwo">
														{t('Types_of_Crimes_Punishable_Under_UAE_Law')}
													</button>
												</h2>
												<div
													id="collapseTwo"
													className="accordion-collapse collapse "
													aria-labelledby="headingTwo"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														{t('In_the_UAE_crimes_are_categorized')}
														<ul className="custom-bullets mt-3 mb-3">
															<li>{t('Theft_Illegal_taking_of_others')}</li>
															<li>{t('Fraud_Activities_like_identity')}</li>
															<li>{t('Assault_and_violence_Intentional_physical')}</li>
															<li>
																Drug offenses: Possession, use, or trafficking of
																illegal drugs is strictly prohibited, leading to lengthy
																prison sentences, hefty fines, and even the death
																penalty.
															</li>
															<li>{t('Drug_related_offenses_cybercrimes_and')}</li>
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
														{t('Legal_Safeguards_for_Defendants_in_the_UAE')}
													</button>
												</h2>
												<div
													id="collapseThree"
													className="accordion-collapse collapse "
													aria-labelledby="headingThree"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														{t('The_UAE_maintains_a_robust_legal')}
														{t('Upholding_the_presumption_of_innocence')}
														<br />
														{t('Defendants_also_have_the_right')}
														{/* <ul className="custom-bullets mt-3 mb-3">
															<li>
																Presumption of innocence: Defendants are presumed
																innocent until proven guilty by Article 38 of the UAE
																Constitution.
															</li>
															<li>
																Right to legal representation: Defendants have the right
																to legal representation to ensure a fair trial and
																effective defense.
															</li>
															<li>
																Informed of charges: Defendants must be notified of the
																charges against them and provided with detailed
																explanations and evidence.
															</li>
															<li>
																Right to present evidence: Defendants can present
																evidence and witnesses in their defense, challenging
																prosecution evidence.
															</li>
															<li>
																Right to remain silent: Defendants have the right to
																remain silent and are not obligated to testify against
																themselves.
															</li>
															<li>
																Right to speedy trial: Defendants are entitled to a
																timely resolution of criminal cases to avoid undue
																delays.
															</li>
															<li>
																Protection from torture: Defendants are protected from
																any form of torture or cruel treatment during the legal
																process.
															</li>
														</ul> */}
														{/* <div className="accordion-body border-0 text-white">
															These legal safeguards ensure that defendants in the USA are
															treated fairly, have access to due process, and can defend
															themselves effectively.
															<br />
															For legal assistance and guidance throughout criminal
															proceedings, seek the expertise of experienced criminal
															lawyers at Professional Women United.
														</div> */}
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

			<section className="questions-part">
				<div className="container">
					<div className="row">
						<div className="col-lg-7 text-right order-lg-0 order-last">
							<div className="still" id="accordianSectionGreen">
								<h3 className="font-smaller weight-bold text-black-add-fig">
									{t('Why_Should_I_Hire_a')}
									<br />{' '}
									<span className="green-medium-2">
										{t('Criminal_Lawyer')} <br />{' '}
									</span>{' '}
									{t('from_Connect_Legal')}
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
												{t('Extensive_Experience_and_Expertise')}
											</button>
										</h2>
										<div
											id="collapseEight"
											className="accordion-collapse collapse show"
											aria-labelledby="headingEight"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('Criminal_lawyers_on_our_platform_possess')}
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
												{t('Personalized_Legal_Representation')}
											</button>
										</h2>
										<div
											id="collapseNine"
											className="accordion-collapse collapse"
											aria-labelledby="headingNine"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('Our_criminal_attorneys_in_Abu_Dhabi')}
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
												{t('Strong_Track_Record_of_Success')}
											</button>
										</h2>
										<div
											id="collapseTen"
											className="accordion-collapse collapse"
											aria-labelledby="headingTen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('The_criminal_lawyers_we_connect')}
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
												{t('Access_to_Resources_and_Support')}
											</button>
										</h2>
										<div
											id="collapseEleven"
											className="accordion-collapse collapse"
											aria-labelledby="headingEleven"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('Finding_a_criminal_lawyer_in_Abu_Dhabi')}
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
												{t('Transparent_Communication_and_Updates')}
											</button>
										</h2>
										<div
											id="collapseTweleve"
											className="accordion-collapse collapse"
											aria-labelledby="headingTweleve"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('At_Connect_Legal_our_attorneys_prioritize')}
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
												{t('Client_Centered_Approach')}
											</button>
										</h2>
										<div
											id="collapseThirteen"
											className="accordion-collapse collapse"
											aria-labelledby="headingThirteen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('The_criminal_lawyers_in_Abu_Dhabi')}
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
							{t('Discover_the_')}
							<span className="green-medium-2">{t('Top_Criminal_Lawyers_in_Abu_Dhabi')}</span>
						</h3>
						<p className="font-medium weight-light text-black-add-fig mt-3">
							{isMobileViewDiscover ? (
								<>
									{showFullTextDiscover ? (
										<>{t('At_Connect_Legal_we_pride_ourselves')}</>
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
								<>{t('At_Connect_Legal_we_pride_ourselves')}</>
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
						<h6 className="text-center p-0">LEGAL ISSUES</h6>
					</div>
					<h3 className="font-smaller weight-bold social-link">
						{t('What_Do_Clients')}
						<span className="green-medium-2">
							{' '}
							{t('Most_Frequently')} <br />
							{t('Search_For')}
						</span>
					</h3>
					<p className="font-medium weight-medium social-link set-text-padding color-frequent set-top-mrgin-mbl">
						{t('Clients_often_seek_legal_information')}
						<br />
						{t('Select_the_legal_issue_your_facing_and_connect_with_a_legal_expert')}
					</p>
					<ul className="pt-3 class-add">
						<li>
							<Link href="#">{t('Defense_against_criminal_charges')}</Link>
						</li>
						<li>
							<Link href="#">{t('Legal_advice_on_criminal_investigations')}</Link>
						</li>
						<li>
							<Link href="#">{t('Representation_in_court_hearings_and_trials')}</Link>
						</li>
						<li>
							<Link href="#">{t('Understanding_criminal_law_procedures')}</Link>
						</li>
						<li>
							<Link href="#">{t('Plea_bargaining_and_negotiation')}</Link>
						</li>
						<li>
							<Link href="#">{t('Expungement_of_criminal_records')}</Link>
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
									<span className="green-medium-2"> {t('Crime_Related')} </span>-{t('Crime_Related')}
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
												{t('Legal_Representation_and_Defense')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('Criminal_lawyers_play_a_crucial_role')}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												{t('Guidance_and_Advice')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('In_crime_related_legal_matters')}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												{t('Negotiation_and_Advocacy')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('Criminal_lawyers_in_Abu_Dhabi')}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												Negotiating Plea Deals
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Criminal lawyers are skilled negotiators who can work with prosecutors to
										negotiate plea deals on behalf of their clients. They assess the strength of the
										prosecution&apos;s case and leverage their knowledge of the law to secure
										favorable terms for their clients, such as reduced charges or sentencing. By
										negotiating plea deals, they aim to minimize the potential consequences of
										criminal charges and protect their clients&apos; interests.
									</div>
								</div>
								{/* <div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{color: '#c49073'}}>
												Case Analysis and Investigation
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Before forming a defense strategy, criminal lawyers carry out a thorough
										analysis of their clients' cases and investigate the circumstances surrounding
										the alleged offense. They review evidence, interview witnesses, and identify
										legal issues or procedural errors that could benefit their clients' defense. By
										carefully preparing cases, they make sure that their clients receive a fair
										trial and are equipped to challenge the prosecution's arguments effectively.{' '}
									</div>
								</div> */}
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
									<p className="font-x-small green-medium-2 weight-bold mb-2"> FAQs</p>
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
													{t('What_should_I_do_if_Ive_been_accused_of_a_crime')}
												</button>
											</h2>
											<div
												id="collapseOne"
												className="accordion-collapse collapse show"
												aria-labelledby="headingOne"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('If_you_been_accused_of_a_crime')}
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
													{t('What_are_my_rights_if_Im_arrested')}
												</button>
											</h2>
											<div
												id="collapseTwo1"
												className="accordion-collapse collapse"
												aria-labelledby="headingTwo1"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('If_your_arrested_you_have_the_right')}
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
													{t('How_long_does_a_criminal_case_take_to_resolve')}
												</button>
											</h2>
											<div
												id="collapseThree"
												className="accordion-collapse collapse"
												aria-labelledby="headingThree"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('The_duration_of_a_criminal_case')}
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="headingfour">
												<button
													className="accordion-button text-white"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target="#collapsefour"
													aria-expanded="true"
													aria-controls="collapsefour">
													{t('What_are_the_potential_consequences_of_a_criminal_conviction')}
												</button>
											</h2>
											<div
												id="collapsefour"
												className="accordion-collapse collapse"
												aria-labelledby="headingfour"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('The_potential_consequences_of')}
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
													{t('Can_I_appeal_a_criminal_conviction')}
												</button>
											</h2>
											<div
												id="collapseFive"
												className="accordion-collapse collapse"
												aria-labelledby="headingFive"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('Yes_you_have_the_right_to_appeal_a_criminal')}
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
								<h6 className="pt-0">GOT A PROFESSIONAL QUESTION?</h6>
								<h2>
									<span className="span">Join Our Legal Forum and </span>
									Get Expert
									<br /> Advice for Free.
								</h2>
								<p>
									Make an appointment with Advocates and Legal consultancy, one of the leading law
									firms in Abu Dubai and across the UAE, Today! or chat with a{' '}
									<Link className="underlineClass" href="/find-a-professional">
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
