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

export default function ChildSupportLawyer() {
	const t = useTranslations('childsupport')
	const [lawyers, setlawyers] = useState([]);

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
											alt="Professional Forum"
											width={16}
											height={16}
										/>
									</span>
									{/* <span>Areas of Law</span>
									<span>
										<Image
											src="/images/legal-service/arrow-right.png"
											alt="Professional Forum"
											width={16}
											height={16}
										/>
									</span> */}

									<span style={{ color: 'rgba(196,144,115)' }}>{t('Find_a_Lawyer')}</span>
								</div>
							</div>
						</section>
					</div>
					<div className="row">
						<div className="col-lg-6">
							<h1 className="font-larger weight-bold green-medium-dark mobile-m-0">

								{t("Child_Support_Lawyer")}
							</h1>
							<p className="weight-light social-link font-medium mt-4">
								{t("A_child_support_lawyer_specializes")}

							</p>

							<div className="mt-3 mb-3 d-lg-none d-block weight-bold ">
								<Link href="/" style={{ color: '#02142d' }}>
									Show More
								</Link>
							</div>

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

							<Image src="/images/legal-service/child_support_lawyer.jpeg" alt="AdobeStock" className="effect show-hide" width={516} height={344} style={{ borderRadius: '8px' }} />

						</div>
					</div>
				</div>
			</section>

			<section className="why-join">
				<div className="container">
					<div className="row mt-md-5">
						<div className="col-lg-12 col-md-12">
							<h2 className="font-smaller weight-bold text-white">
								<span className="green-med">{t("Child_Support_Laws_in")} </span>{' '}
								<span className="green-med-col"> {t("the_UAE")}</span>
							</h2>
							<p className="weight-light font-small text-white">
								{t("In_the_UAE_child_support_is_governed_by_Federal")}


							</p>
						</div>
					</div>
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
										{t("Roles_of_Custodian_and_Guardian")}


									</button>
								</h2>
								<div
									id="collapseOne"
									className="accordion-collapse collapse show"
									aria-labelledby="headingOne"
									data-bs-parent="#accordionExample">
									<div className="accordion-body border-0 text-white">
										{t("In_UAE_family_law,_the_mother")}
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

										{t("Determination_of_Child_Support_Amount")}


									</button>
								</h2>
								<div
									id="collapseTwo1"
									className="accordion-collapse collapse"
									aria-labelledby="headingTwo1"
									data-bs-parent="#accordionExample">
									<div className="accordion-body border-0 text-white">

										{t("The_Dubai_Courts_provide_guidelines_for_determining")}

									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="about-btn-two mt-lg-5 mt-3">
						<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue findlawyermargin">
							<span className="text-white findlawyertext">
								<Link href={'/auth/create-profile/?role=lawyer'} style={{ color: 'white' }}>
									Find A Professional
								</Link>
							</span>
						</button>
					</div>
				</div>
			</section>
			<section className="faq-part">
				<div className="container">
					<div className="row sectionGap flex-wrap-none">
						<div className="col-lg-12 col-xl-5 col-md-12">
							<h2 className="font-smaller text-black  weight-bold mb-4">
								{t("Child_Protection_Laws_in_the_UAE")}	 <span className="green-medium-2">{t("the_UAE")} </span>
							</h2>
							<Image src="/images/car/Frame.jpg" alt="faq-img" className="m-none effect" width={516} height={550} />
						</div>
						<div className="col-lg-11 col-12 col-xl-7 col-md-11" id="commoncause">
							<div className="accordion mt-5 margin-top-1" id="accordionExample">
								<div>

									{t("Children_in_the_United_Arab_Emirates")}
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header" id="headingOne">
										<button
											className="accordion-button"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseOne"
											aria-expanded="true"
											aria-controls="collapseOne">
											{t("Reporting_Mechanisms_for_Child_Abuse")}
										</button>
									</h2>
									<div
										id="collapseOne"
										className="accordion-collapse collapse show"
										aria-labelledby="headingOne"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">

											{t("In_the_UAE,_individuals_and_professionals_are_mandated")}

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

											{t("Intervention_Procedures_by_Authorities")}
										</button>
									</h2>
									<div
										id="collapseTwo"
										className="accordion-collapse collapse"
										aria-labelledby="headingTwo"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">

											{t("Upon_receiving_reports_of_ child_abuse")}
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
											{t("Legal_Penalties_for_Offenders")}

										</button>
									</h2>
									<div
										id="collapseThree"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											{t("Perpetrators_of_child_abuse")}
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

											{t("Protection_Orders_and_Support_Services")}
										</button>
									</h2>
									<div
										id="collapsefour"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">

											{t("Courts_in_the_UAE_have_the_authority")}
										</div>
									</div>
								</div>

								<div className="accordion-item">
									<h2 className="accordion-header" id="headingfive">
										<button
											className="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapsefive"
											aria-expanded="false"
											aria-controls="collapsefive">

											{t("Prevention_and_Awareness_Initiatives")}
										</button>
									</h2>
									<div
										id="collapsefive"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">

											{t("To_prevent_child_abuse_and_promote")}
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
									{t("Why_Should_I_Hire_a_Child_Support")} <br />{' '}
									<span className="green-medium-2">
										{t('Child_Support_Lawyer')} <br />{' '}
									</span>{' '}
									{t('from_Connect_Legal?')}
								</h3>
								{/* <p className="font-medium weight-light text-black-add-fig mt-3">
									Navigating child custody disputes requires specialized expertise and compassionate
									guidance. Discover why hiring a custody lawyer from Professional Women United can make all the
									difference in your case.
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

												{t("Expertise_in_Family_Law")}
											</button>
										</h2>
										<div
											id="collapseEight"
											className="accordion-collapse collapse show"
											aria-labelledby="headingEight"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t("Our_child_support_lawyers_at_Connect_Legal")}

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

												{t("Personalized_Legal_Strategies")}
											</button>
										</h2>
										<div
											id="collapseNine"
											className="accordion-collapse collapse"
											aria-labelledby="headingNine"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">

												{t("We_understand_that_every_family's")}

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

												{t("Strong_Advocacy_in_Court")}
											</button>
										</h2>
										<div
											id="collapseTen"
											className="accordion-collapse collapse"
											aria-labelledby="headingTen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">

												{t("When_negotiations_fail")}
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

												{t("Compassionate_Support_and_Guidance")}

											</button>
										</h2>
										<div
											id="collapseEleven"
											className="accordion-collapse collapse"
											aria-labelledby="headingEleven"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">

												{t("Navigating_child_support_issues")}

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

												{t("Comprehensive_Legal_Services")}

											</button>
										</h2>
										<div
											id="collapseTweleve"
											className="accordion-collapse collapse"
											aria-labelledby="headingTweleve"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t("In_addition_to_child_support")}

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
							<Image src="/images/car/Group2944.png" alt=" Still have questions?" width={516} height={549} />
						</div>
					</div>
				</div>
			</section>

			<section className="discover">
				<div className="container">
					<div className="still">
						<h3 className="font-xxx-large weight-bold text-black">
							{t("Discover_the_Top_Child_Support_Lawyers_in_Dubai")}
							<span className="green-medium-2">{t("Child_Support")}</span>

						</h3>
						<p className="font-medium weight-light text-black mt-3">
							{t("The_top_child_support_lawyers_in_Dubai")}

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
					<div className="needlawyer-text-motor">
						<h6 className="text-center p-0">professional issueS</h6>
					</div>
					<h3 className="font-xxx-large weight-bold social-link">
						{t("What_Do_Clients_Most_Frequently_Search_For")}
						<span className="green-medium-2">
							{' '}
							{t("Most_Frequently_Search_For")}



						</span>
					</h3>
					<p className="font-medium weight-light social-link mt-3">

						{t("Clients_most_frequently_search_for_knowledgeable")}
					</p>
					<h5 className="mt-4" style={{ color: '#4F4F4F' }}>


						{t("Select_the_legal_issue_you_face_and_connect_with_a_legal")}
					</h5>
					<ul className="pt-3 class-add">
						<li>
							<Link href="#">   {t("Child_support_calculation_and_enforcement")}</Link>
						</li>
						<li>
							<Link href="#"> {t("Custody_and_visitation_rights")}</Link>
						</li>
						<li>
							<Link href="#"> {t("Modification_of_child_support_orders")}</Link>
						</li>
						<li>
							<Link href="#"> {t("Legal_remedies_for_non-payment_of_child_support")}</Link>
						</li>
						<li>
							<Link href="#">{t("International_child_support_issues")}  </Link>
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
									{t("How_Lawyers_Can_Assist_in_Child_Support-Related_Legal_Matters")}
									<span className="green-medium-2"> {t("Child_Supportz")}</span>-{t("Related_Legal_Matters")}
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
												{t("Expert_Guidance_on_Child_Support_Laws_in_the_UAE")}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />

										{t("Our_team_of_UAE_child_support_lawyers")}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>

												{t("Skilled_Representation_in_Child_Support_Negotiations")}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />

										{t("Our_child_support_lawyers_in_Dubai_offer")}

									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												{t("Courtroom_Advocacy_in_Child_Support_Cases")}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t("In_cases_where_negotiations_fail_to_show_a_satisfactory")}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>

												{t("Support_in_Enforcing_Child_Support_Orders")}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t("We_assist_in_enforcing_court-ordered")}

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
									<p className="font-x-small green-medium-2 weight-bold mb-2">{t("FAQ")}</p>
									<h2 className="font-smaller  weight-bold mb-4">
										{t("Got_questions")} <br />
										<span className="green-medium-2"> {t("We_have_answers")}</span>
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

													{t("Why_do_I_need_a_child_support_lawyer?")}
												</button>
											</h2>
											<div
												id="collapseOne"
												className="accordion-collapse collapse show "
												aria-labelledby="headingOne"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">

													{t("Hiring_a_child_support_or_child_custody_lawyer")}

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

													{t("How_can_a_child_support_lawyer_help_me_calculate_child_support_payments?")}
												</button>
											</h2>
											<div
												id="collapseTwo1"
												className="accordion-collapse collapse"
												aria-labelledby="headingTwo1"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t("Child_support_lawyers_are_well-versed_in_the_formulas")}

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
													{t("What_should_I_do_if_my_ex-spouse_refuses_to_pay_child_support?")}
												</button>
											</h2>
											<div
												id="collapseThree"
												className="accordion-collapse collapse"
												aria-labelledby="headingThree"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">

													{t("If_your_ex-spouse_refuses_to_pay_child_support,_seeking_legal")}
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

													{t("Can_a_child_support_lawyer_help_modify_existing_child_support_orders?")}
												</button>
											</h2>
											<div
												id="collapseFour"
												className="accordion-collapse collapse"
												aria-labelledby="headingFour"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">

													{t("Yes,_a_child_support_lawyer_can_assist_in_modifying")}
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

													{t("How_long_does_resolving_a_child_support_case_with_a_lawyer's_assistance_take?")}
												</button>
											</h2>
											<div
												id="collapseFive"
												className="accordion-collapse collapse"
												aria-labelledby="headingFive"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">

													{t("The_duration_of_a_child_support_case_can_vary_depending_on_various_factors,")}
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
