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

export default function BestLawyersRasAlKhaimah() {
	const t = useTranslations('lawyerInRasAlKhaimah');
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

								<span style={{color: 'rgba(9, 63, 56, 1)'}}>{t('Find_a_Lawyer')}</span>
							</div>
						</section>
					</div>
					<div className="row">
						<div className="col-lg-7">
							<h1 className="font-larger weight-bold green-medium-dark mobile-m-0">
								{t('Find_the_Best_Lawyers_in_Ras_Al_Khaimah')}
							</h1>
							<p className="weight-light social-link font-medium mt-4">
								{isMobileView ? (
									<>
										{showFullText ? (
											<>{t('Find_the_best_lawyers_in_Ras')}</>
										) : (
											`${t('Find_the_best_lawyers_in_Ras')}`
										)}
										<br />
										<div className="mt-3 mb-3 d-lg-none d-block weight-bold ">
											<Link href="#" onClick={handleToggleText} style={{color: '#02142d'}}>
												{showFullText ? 'Show Less' : 'Show More'}
											</Link>
										</div>
									</>
								) : (
									<>{t('Find_the_best_lawyers_in_Ras')}</>
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
								src="/images/legal-service/Dubai.png"
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

			<section className="questions-part">
				<div className="container">
					<div className="row">
						<div className="col-lg-7 text-right order-lg-0 order-last">
							<div className="still" id="accordianSectionGreen">
								<h3 className="font-smaller weight-bold text-black-add-fig">
									{t('Why_Should_I_Hire_a')}{' '}
									<span className="green-medium-2">
										{t('Lawyer_in')}{' '}
										<span className="desktop-br">
											<br />
										</span>{' '}
										{t('Ras_Al_Khaimah')}{' '}
									</span>{' '}
									{t('Through_Connect_Legal')}
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
												{t('Diverse_Specializations')}
											</button>
										</h2>
										<div
											id="collapseEight"
											className="accordion-collapse collapse show"
											aria-labelledby="headingEight"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('Connect_Legal_connects_clients')}
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
												{t('Local_Insight')}
											</button>
										</h2>
										<div
											id="collapseNine"
											className="accordion-collapse collapse"
											aria-labelledby="headingNine"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('The_lawyers_in_Ras_Al_Khaimah')}
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
												{t('Client_Centric_Approach')}
											</button>
										</h2>
										<div
											id="collapseTen"
											className="accordion-collapse collapse"
											aria-labelledby="headingTen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('At_Connect_Legal_we_prioritize')}
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
												{t('Transparent_Communication')}
											</button>
										</h2>
										<div
											id="collapseEleven"
											className="accordion-collapse collapse"
											aria-labelledby="headingEleven"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('We_believe_in_promoting_transparent')}
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
												{t('Integrity_and_Trust')}
											</button>
										</h2>
										<div
											id="collapseTweleve"
											className="accordion-collapse collapse"
											aria-labelledby="headingTweleve"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('Connect_Legal_maintains_the')}
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
												{t('Proven_Success')}
											</button>
										</h2>
										<div
											id="collapseThirteen"
											className="accordion-collapse collapse"
											aria-labelledby="headingThirteen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('Connect_Legal_has_a_proven')}
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
							<span className="green-medium-2 font-x-small weight-bold">TOP LEGAL EXPERTS</span>
						</h6>

						<h3 className="font-xxx-large weight-bold text-black mt-3 discover-font">
							{t('Discover_the')}{' '}
							<span className="green-medium-2">{t('Top_Lawyers_in_Ras_Al_Khaimah')}</span>
						</h3>
						<p className="font-medium weight-light text-black-add-fig mt-3">
							{isMobileViewDiscover ? (
								<>
									{showFullTextDiscover ? (
										<>
											{t('At_Connect_Legal_we_find_the_top_lawyers')}
											<br />
											{t('What_sets_the_best_lawyers_in')}
										</>
									) : (
										'At Professional Women United, we find the top lawyers in Ras Al Khaimah known for their exceptional legal expertise, extensive experience, and proven track record of success. These legal professionals have a complete knowledge of local laws and regulations, allowing them to resolve complex legal issues.'
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
									{t('At_Connect_Legal_we_find_the_top_lawyers')}
									<br />
									{t('What_sets_the_best_lawyers_in')}
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
						{t('What_Do_Clients')}
						<span className="green-medium-2">
							{' '}
							{t('Most_Frequently')} <br /> {t('Search_For')}
						</span>
					</h3>
					<p className="font-medium weight-medium social-link set-text-padding color-frequent set-top-mrgin-mbl">
						{t('The_clients_on_our_platform_often_seek')}
						<br />
						{t('Select_the_legal_issue')}
					</p>
					<ul className="pt-3 class-add">
						<li>
							<Link href="#">{t('Personal_Injury_Claims')}</Link>
						</li>
						<li>
							<Link href="#">{t('Family_Law_Divorce_Child_Custody')}</Link>
						</li>
						<li>
							<Link href="#">{t('Employment_Law')}</Link>
						</li>
						<li>
							<Link href="#">{t('Real_Estate_Law_Property_Disputes_Tenancy_Issues')}</Link>
						</li>
						<li>
							<Link href="#">{t('Business_Law_Contracts_Corporate_Governance')}</Link>
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
									{t('How_Can_Lawyers')}
									<span className="green-medium-2"> {t('in_Ras_Al_Khaimah')}</span> {t('Help_Me')}
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
												{t('Strategic_Legal_Planning')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('Lawyers_in_Ras_Al_Khaimah_excel')}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{color: '#093F38'}}>
												{t('Personalized_Legal_Solutions')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('Legal_experts_at_Connect_Legal_provide')}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{color: '#093F38'}}>
												{t('Effective_Communication_and_Advocacy')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('Lawyers_in_Ras_Al_Khaimah_are_skilled')}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{color: '#093F38'}}>
												{t('Timely_Legal_Support')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('With_a_commitment_to_responsiveness')}
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
													{t('How_do_I_choose_the_right_lawyer_for_my_legal_issue')}
												</button>
											</h2>
											<div
												id="collapseOne"
												className="accordion-collapse collapse show"
												aria-labelledby="headingOne"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('Choosing_the_right_attorney')}
													<br />
													{t('Youll_also_want_to_schedule_consultations')}
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
													{t(
														'What_types_of_legal_issues_do_lawyers_in_Ras_Al_Khaimah_specialize_in_handling'
													)}
												</button>
											</h2>
											<div
												id="collapseTwo1"
												className="accordion-collapse collapse"
												aria-labelledby="headingTwo1"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('Lawyers_in_Ras_Al_Khaimah_specialize')}
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
													{t(
														'What_should_I_expect_during_my_initial_consultation_with_a_lawyer'
													)}
												</button>
											</h2>
											<div
												id="collapseThree"
												className="accordion-collapse collapse"
												aria-labelledby="headingThree"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('During_your_initial_consultation')}
													<br />
													{t('The_lawyer_will_ask_questions_to_gain')}
													<br />
													{t('Make_sure_you_bring_any_relevant')}
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
													{t(
														'How_can_a_lawyer_help_me_if_Ive_been_injured_in_Ras_Al_Khaimah'
													)}
												</button>
											</h2>
											<div
												id="collapseFour"
												className="accordion-collapse collapse"
												aria-labelledby="headingFour"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('If_youve_been_injured_a_lawyer')}
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
														'What_are_my_rights_and_responsibilities_when_working_with_a_lawyer'
													)}
												</button>
											</h2>
											<div
												id="collapseFive"
												className="accordion-collapse collapse"
												aria-labelledby="headingFive"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('When_working_with_a_lawyer')}
													<br />
													{t('Its_important_to_communicate_openly')}
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
													{t('Can_a_lawyer_help_me_start_a_business_in_Ras_Al_Khaimah')}
												</button>
											</h2>
											<div
												id="collapseSix"
												className="accordion-collapse collapse"
												aria-labelledby="headingSix"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('Yes_lawyers_in_Ras_Al_Khaimah')}
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
													{t(
														'How_can_I_find_the_best_lawyer_in_Ras_Al_Khaimah_for_my_specific_case'
													)}
												</button>
											</h2>
											<div
												id="collapseSeven"
												className="accordion-collapse collapse"
												aria-labelledby="headingSeven"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('At_Connect_Legal_we_make_finding')}
													<br />
													{t('With_our_diverse_network')}
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
													{t(
														'What_steps_should_I_take_if_Im_facing_criminal_charges_in_Ras_Al_Khaimah'
													)}
												</button>
											</h2>
											<div
												id="collapseEight"
												className="accordion-collapse collapse"
												aria-labelledby="headingEight"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('If_youre_facing_criminal_charges')}
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="headingnine">
												<button
													className="accordion-button text-white"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target="#collapsenine"
													aria-expanded="true"
													aria-controls="collapsenine">
													{t(
														'How_can_a_lawyer_assist_me_with_real_estate_transactions_in_Ras_Al_Khaimah'
													)}
												</button>
											</h2>
											<div
												id="collapsenine"
												className="accordion-collapse collapse"
												aria-labelledby="headingnine"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('Lawyers_in_Ras_Al_Khaimah_can_help')}
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
