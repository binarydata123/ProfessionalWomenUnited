'use client';
import React, { useState, useEffect } from 'react';
import './style.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Slider from '@/commonUI/SliderHome';
import LawyerCard from '@/components/lawyer/LawyerCard';
import { getAllLawyersData } from '../../../../lib/frontendapi';
import { useTranslations } from 'next-intl';

export default function DivorceLawyersAbuDhabi() {
	const [lawyers, setlawyers] = useState([]);
	const [showFullText, setShowFullText] = useState(false);
	const [isMobileView, setIsMobileView] = useState(false);
	const [showFullTextDiscover, setShowFullTextDiscover] = useState(false);
	const [isMobileViewDiscover, setIsMobileViewDiscover] = useState(false);

	const t = useTranslations('divorceLawyerAbuDhabi');

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
		getAllLawyersData().then(res => {
			setlawyers(res.data);
		});
	}, []);

	return (
		<>
			<section className="about-banner">
				<div className="container">
					<div className="legaltopic single-question-page">
						<section>
							<div className="container">
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
							</div>
						</section>
					</div>
					<div className="row">
						<div className="col-lg-6">
							<h1 className="font-larger weight-bold green-medium-dark mobile-m-0">
								{t('Divorce_Lawyer')}
							</h1>
							<p className="weight-light social-link font-medium mt-4">
								{isMobileView ? (
									<>
										{showFullText ? (
											<>
												{t('A_divorce_lawyer_assists')}

												<br />
												{t('At_Connect_Legal,_we_connect ')}
											</>
										) : (
											'A divorce lawyer assists clients with the legal process of ending a marriage, handling issues such as asset division, spousal support, and child custody. They provide professional advice, represent clients in court, and work to negotiate fair settlements.'
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
										{t('A_divorce_lawyer_assists')}

										<br />
										{t('At_Connect_Legal,_we_connect ')}
									</>
								)}
							</p>
							<div className="about-btn-two mt-lg-5 mt-3">
								<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue">
									<span className="text-white">
										<Link href="/find-a-professional" style={{ color: 'white' }}>
											Find A Professional
										</Link>
									</span>
								</button>
							</div>
						</div>
						<div className="col-lg-6 text-right tab-center">
							<Image
								src="/images/legal-service/divorce_lawyer.jpeg"
								alt="AdobeStock"
								className="effect show-hide"
								width={624}
								height={415}
								style={{ borderRadius: '8px' }}
							/>
						</div>
					</div>
				</div>
			</section>

			<section className="why-join">
				<div className="container">
					<div className="row mt-md-5">
						<div className="col-lg-12 col-xl-12 col-md-12">
							<h2 className="font-smaller weight-bold text-white">
								<span className="green-med">{t('Divorce_Related')} </span>{' '}
								<span className="green-med-col">{t('UAE')} </span>
							</h2>
							<div className="accordion-body border-0 text-white">
								<li>{t('62% ')}</li>
								<li>{t('28% ')}</li>
								<li>{t('½ ')}</li>
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-xl-12 col-md-12">
							<div className="gotTitle"></div>
							<div className="gotAccordion">
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
												{t('Divorce_Day')}
											</button>
										</h2>
										<div
											id="collapseOne"
											className="accordion-collapse collapse show "
											aria-labelledby="headingOne"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0 text-white">
												{t('At_the_start_of_the_new_year')}
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
												{t('Shifts_in_Divorce_Rates')}
											</button>
										</h2>
										<div
											id="collapseTwo1"
											className="accordion-collapse collapse"
											aria-labelledby="headingTwo1"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0 text-white">
												{t('While_divorce_rates_have_varied')}
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
												{t('Impact_of_Increased')}
											</button>
										</h2>
										<div
											id="collapseThree"
											className="accordion-collapse collapse"
											aria-labelledby="headingThree"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0 text-white">
												{t('Legal_experts_have_observed_a')}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="about-btn-two mt-lg-5 mt-5 ">
								<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue mb-5 ">
									<span className="text-white">
										<Link href={'/auth/create-profile/?role=lawyer'} style={{ color: 'white' }}>
											Find A Professional
										</Link>
									</span>
								</button>
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
								The Impact of{' '}
								<span className="green-medium-2">{t('The_Legal_Process_of_Divorce')}</span>
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
							<div className="accordion mt-5 margin-top-1" id="accordionOne">
								<div className="accordion-item">
									<h2 className="accordion-header" id="headingOne">
										<button
											className="accordion-button"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseOne"
											aria-expanded="true"
											aria-controls="collapseOne">
											{t('Filing_for_Divorce')}
										</button>
									</h2>
									<div
										id="collapseOne"
										className="accordion-collapse collapse show"
										aria-labelledby="headingOne"
										data-bs-parent="#accordionOne">
										<div className="accordion-body border-0">
											{t('Filing_for_divorce_is_the_first_step')}
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header" id="headingTwo">
										<button
											className="accordion-button"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseTwo"
											aria-expanded="false"
											aria-controls="collapseTwo">
											{t('Serving_Divorce_Papers')}
										</button>
									</h2>
									<div
										id="collapseTwo"
										className="accordion-collapse collapse"
										aria-labelledby="headingTwo"
										data-bs-parent="#accordionOne">
										<div className="accordion-body border-0">
											{t('Once_the_divorce_petition_is_filed')}
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
											{t('Responding_to_the_Petition')}
										</button>
									</h2>
									<div
										id="collapseThree"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionOne">
										<div className="accordion-body border-0">
											{t('After_being_served_with_divorce_papers')}
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header" id="headingFour">
										<button
											className="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseFour"
											aria-expanded="false"
											aria-controls="collapseFour">
											{t('Discovery_and_Disclosure')}
										</button>
									</h2>
									<div
										id="collapseFour"
										className="accordion-collapse collapse"
										aria-labelledby="headingFour"
										data-bs-parent="#accordionOne">
										<div className="accordion-body border-0">
											{t('The_discovery_and_disclosure_phase')}
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
											{t('Negotiation_and_Settlement')}
										</button>
									</h2>
									<div
										id="collapseFive"
										className="accordion-collapse collapse"
										aria-labelledby="headingFive"
										data-bs-parent="#accordionOne">
										<div className="accordion-body border-0">
											{t('Many_divorces_are_resolved_through ')}
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
											{t('Court_Hearings_and_Trial')}
										</button>
									</h2>
									<div
										id="collapseSix"
										className="accordion-collapse collapse"
										aria-labelledby="headingSix"
										data-bs-parent="#accordionOne">
										<div className="accordion-body border-0">
											{t('If_negotiation_and_settlement_efforts ')}
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
									{t('Why_Should_I_Hire')}
									<br />{' '}
									<span className="green-medium-2">
										{t('Family_Lawyer')}
										<br />{' '}
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
												{t('Expertise_in_Family_Law')}
											</button>
										</h2>
										<div
											id="collapseEight"
											className="accordion-collapse collapse show"
											aria-labelledby="headingEight"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('By_hiring_a_divorce_lawyer_using_Connect_Legal')}
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
												{t('Personalized_Legal_Strategy')}
											</button>
										</h2>
										<div
											id="collapseNine"
											className="accordion-collapse collapse"
											aria-labelledby="headingNine"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('Divorce_cases_are_unique,_with_varying ')}
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
												{t('Strong_Negotiation_Skills')}
											</button>
										</h2>
										<div
											id="collapseTen"
											className="accordion-collapse collapse"
											aria-labelledby="headingTen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('Divorce_often_involves_negotiations_over')}
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
												{t('Comprehensive_Support_Services')}
											</button>
										</h2>
										<div
											id="collapseEleven"
											className="accordion-collapse collapse"
											aria-labelledby="headingEleven"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('Connect_Legal_offers_comprehensive ')}
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
												{t('Transparent_Communication')}
											</button>
										</h2>
										<div
											id="collapseTweleve"
											className="accordion-collapse collapse"
											aria-labelledby="headingTweleve"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('The_divorce_lawyers_we_list_on')}
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
												{t('Proven_Track_Record_of_Success')}
											</button>
										</h2>
										<div
											id="collapseThirteen"
											className="accordion-collapse collapse"
											aria-labelledby="headingThirteen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('Choosing_a_divorce_lawyer_from_Connect_Legal')}
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
						<h3 className="font-xxx-large weight-bold text-black">
							{t('Discover_the')}{' '}
							<span className="green-medium-2">{t('Top_Divorce_Lawyers_in_Abu_Dhabi')}</span>
						</h3>
						<p className="font-medium weight-light text-black-add-fig mt-3">
							{isMobileViewDiscover ? (
								<>
									{showFullTextDiscover ? (
										<>
											{t('At_Connect_Legal,_we_only_list ')}
											<br />
											{t('The_divorce_lawyers_in_Abu_Dhabi ')}
										</>
									) : (
										'At Professional Women United, we only list the top divorce lawyers in Abu Dhabi. They are distinguished by their extensive expertise in family law, strong negotiation skills, and personalized approach to each case. Our attorneys possess a deep understanding of local legal nuances and have a proven track record of achieving favorable outcomes for clients.'
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
									{t('At_Connect_Legal,_we_only_list ')}
									<br />
									{t('The_divorce_lawyers_in_Abu_Dhabi ')}
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
						<h6 className="text-center p-0">LEGAL ISSUES</h6>
					</div>
					<h3 className="font-xxx-large weight-bold social-link">
						{t('What_Do_Clients')}

						<span className="green-medium-2">
							{' '}
							{t('most_frequently')}
							<br />
							{t('searched_for')}
						</span>
					</h3>
					<p className="font-medium weight-light social-link mt-3">
						{t('Individuals_seeking_legal_information ')}
					</p>
					<h5 className="mt-4" style={{ color: '#4F4F4F' }}>
						{t('Select_the_legal_issue')}
					</h5>
					<ul className="pt-3 class-add">
						<li>
							<Link href="#">{t('Divorce_procedures_and_filing')}</Link>
						</li>
						<li>
							<Link href="#">{t('Child_custody_and_visitation_rights')}</Link>
						</li>
						<li>
							<Link href="#">{t('Alimony_and_spousal_support')}</Link>
						</li>
						<li>
							<Link href="#">{t('Division_of_marital_property')}</Link>
						</li>
						<li>
							<Link href="#">{t('Prenuptial_and_postnuptial_agreements')}</Link>
						</li>
						<li>
							<Link href="#">{t('Legal_advice_for_expatriates_facing_divorce')}</Link>
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
									{t('How_Lawyers_Can_Assist')}

									<span className="green-medium-2"> {t('divorce')}</span>
									{t('related_legal_matters')}
								</h2>
								{/* Hiring a divorce lawyer provides */}
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
												{t('Navigating_Divorce_Procedures')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('Divorce_attorneys_in_Abu_Dhabi_can ')}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												{t('Advocating_for_Child_Custody_and_Visitation_Rights')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('One_of_the_most_critical_roles_of_divorce_lawyers')}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												{t('Handling_Alimony_and_Spousal_Support')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('Divorce_lawyers_in_Abu_Dhabi_play')}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												{t('Dividing_Marital_Property')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('Divorce_lawyers_in_Abu_Dhabi_assist')}
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
									<p className="font-x-small green-medium-2 weight-bold mb-2">{t('FAQs')}</p>
									<h2 className="font-smaller  weight-bold mb-4">
										{t('Got_questions')}
										<br />
										<span className="green-medium-2">{t('We_have_answers')}</span>
									</h2>
								</div>
								<div className="gotAccordion">
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
													{t('What_are_the_first_steps_I_should ')}
												</button>
											</h2>
											<div
												id="collapseOne"
												className="accordion-collapse collapse show"
												aria-labelledby="headingOne"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('If_youre_looking_to_file_for_divorce_in_Abu_Dhabi')}
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
													{t('How_is_child_custody_determined')}
												</button>
											</h2>
											<div
												id="collapseTwo1"
												className="accordion-collapse collapse"
												aria-labelledby="headingTwo1"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('Child_custody_in_Abu_Dhabi')}
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
													{t('What_factors_influence_alimony')}
												</button>
											</h2>
											<div
												id="collapseThree"
												className="accordion-collapse collapse"
												aria-labelledby="headingThree"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('Alimony_and_spousal_support_decisions')}
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
													{t('How_is_marital_property_divided')}
												</button>
											</h2>
											<div
												id="collapseFour"
												className="accordion-collapse collapse"
												aria-labelledby="headingFour"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('Marital_property_is_divided_based_on ')}
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
													{t('Can_non-Muslim_expats_undergo ')}
												</button>
											</h2>
											<div
												id="collapseFive"
												className="accordion-collapse collapse"
												aria-labelledby="headingFive"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('Yes,_non-Muslim_expats_can_undergo ')}
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
													{t('How_long_does_the_divorce')}
												</button>
											</h2>
											<div
												id="collapseSix"
												className="accordion-collapse collapse "
												aria-labelledby="headingSix"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('The_duration_of_the_divorce_process_in ')}
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
