'use client';
import React, { useState, useEffect } from 'react';
import './style.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Slider from '@/commonUI/SliderHome';
import { getAllLawyersData } from '../../../../lib/frontendapi';
import LawyerCard from '@/components/lawyer/LawyerCard';
import { useTranslations } from 'next-intl';
export default function FamilyLawyerDubai() {
	const [lawyers, setlawyers] = useState([]);
	const t = useTranslations('familyLawyer')
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

									<span style={{ color: 'rgba(196,144,115)' }}>Find A Professional</span>
								</div>
							</div>
						</section>
					</div>
					<div className="row">
						<div className="col-lg-6">
							<h1 className="font-larger weight-bold green-medium-dark mobile-m-0">{t("Family_Lawyer_in_Dubai")}</h1>
							<p className="weight-light social-link font-medium mt-4">
								{t("A_family_lawyer_is_a_legal_professional")}
								<br />
								<br />

								{t("Connect_Legal_offers_the_services")}
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
							<Image src="/images/legal-service/family_lawyer.jpeg" alt="AdobeStock" className="effect show-hide" width={624} height={415} style={{ borderRadius: '8px' }} />
						</div>
					</div>
				</div>
			</section>

			<section className="why-join">
				<div className="container">
					<div className="row mt-md-5">
						<div className="col-lg-12 col-md-12">
							<h2 className="font-smaller weight-bold text-white">
								<span className="green-med">{t("Family_Law_in_the_UAE")} </span>{' '}
								<span className="green-med-col"> {t("UAE")} </span>
							</h2>
							<p className="weight-light font-small text-white">

								{t("Understanding_family_law_in_the_UAE")}
							</p>
						</div>
					</div>
					{/* <div>
						
						
						<h2 className="weight-semi-bold text-white mt-3" style={{fontSize: '20px'}}>
							Expatriate Wills and Inheritance
						</h2>
						
						<div className="about-btn-two mt-lg-5 mt-3">
							<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue">
								<span className="text-white">
									<Link href="/find-a-professional" style={{color: 'white'}}>
										Find A Professional
									</Link>
								</span>
							</button>
						</div>
					</div> */}
					<div>
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
													{t("Marriage_and_Divorce_Reforms")}
												</button>
											</h2>
											<div
												id="collapseOne"
												className="accordion-collapse collapse show"
												aria-labelledby="headingOne"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													<ul className="text-white set-colison">
														<li>
															{t("Wide-ranging_changes_in_civil_family")}

														</li>
														{/* <li>
															Registered vehicles in the same year reached 1.83 million
														</li> */}
														<li>
															{t("Couples_can_now_marry_in_non-Sharia")}

														</li>
														<li>
															{t("Non-Muslim_expatriates_can_undergo")}
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

													{t("Child_Custody_Arrangements")}

												</button>
											</h2>
											<div
												id="collapseTwo1"
												className="accordion-collapse collapse"
												aria-labelledby="headingTwo1"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													<ul className="text-white set-colison">
														<li>


															{t("The_recent_legal_reforms_have_significantly")}

														</li>
														<li>
															{t("Previously,_custody_favored_the_mother")}

														</li>
														<li>

															{t("The_judiciary_aims_to_minimize")}
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

													{t("Alimony_and_Financial_Cons")}
												</button>
											</h2>
											<div
												id="collapseThree"
												className="accordion-collapse collapse"
												aria-labelledby="headingThree"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													<ul className="text-white set-colison">
														<li>

															{t("Alimony_arrangements_have_undergone")}

														</li>
														<li>

															{t("In_cases_of_dispute_factors_such_as")}

														</li>
														<li>

															{t("The_reforms_also_introduce_compensation")}
														</li>
													</ul>
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

													{t("Expatriate_Wills_and_Inheritance")}
												</button>
											</h2>
											<div
												id="collapseFour"
												className="accordion-collapse collapse"
												aria-labelledby="headingFour"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													<ul className="text-white set-colison">
														<li>

															{t("Expatriates_in_the_UAE_now")}
														</li>
														<li>

															{t("In_the_absence_of_a_will_inheritance")}
														</li>
														<li>

															{t("These_legal_reforms_provide_expatriates")}
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
											<Link href={'/auth/create-profile/?role=professional'} style={{ color: 'white' }}>
												Find A Professional
											</Link>
										</span>
									</button>
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

								{t("Common_Situations_Requiring_a_Family_Lawyer's_Assistance")}
								<span className="green-medium-2">{t("Requiring_a_Family_Lawyer's_Assistance")}</span>
							</h2>
							<Image src="/images/car/Frame.jpg" alt="faq-img" className="m-none effect" width={516} height={550} />
						</div>

						<div className="col-lg-11 col-12 col-xl-7 col-md-11" id="commoncause">
							<div className="accordion mt-5 margin-top-1" id="accordionExample">
								<div>

									{t("Individuals_may_encounter_complex_legal")}
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

											{t("Divorce_proceedingss")}
										</button>
									</h2>
									<div
										id="collapseOne"
										className="accordion-collapse collapse show"
										aria-labelledby="headingOne"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">

											{t("Divorce_proceedings_involve")}
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

											{t("Child_Custody_and_Visitation_Disputes")}

										</button>
									</h2>
									<div
										id="collapseTwo"
										className="accordion-collapse collapse"
										aria-labelledby="headingTwo"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">

											{t("Child_custody_and_visitation_disputes")}

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

											{t("Adoption_Proceedings")}
										</button>
									</h2>
									<div
										id="collapseThree"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">

											{t("Adoption_proceedings_involve_the_legal")}

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

											{t("Domestic_Violence_Matters")}
										</button>
									</h2>
									<div
										id="collapsefour"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">

											{t("Domestic_violence_matters_encompass")}
											<br />
											{t("When_facing_family-related_legal_challenges")}
											<br />
											{t("Whether_you're_navigating_a_divorce_")}
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
									{t("Why_Should_I_Hire")}<br />{' '}
									<span className="green-medium-2">
										{t("Family_Lawyer")} <br />{' '}
									</span>{' '}

									{t("from_Connect_Legal")}
								</h3>
								<p className="font-medium weight-light text-black-add-fig mt-3">

									{t("Looking_for_the_best_family_lawyer_Dubai_has?")}
								</p>
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

												{t("Expertise_in_Dubai_Family_Law")}
											</button>
										</h2>
										<div
											id="collapseEight"
											className="accordion-collapse collapse show"
											aria-labelledby="headingEight"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t("At_Connect_Legal,_our_family_lawyers")}
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

												{t("Personalized_Legal_Representation")}
											</button>
										</h2>
										<div
											id="collapseNine"
											className="accordion-collapse collapse"
											aria-labelledby="headingNine"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t("When_you_hire_a_family_lawyer_from_Connect_Legal,")}
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

												{t("Proven_Track_Record_of_Success")}
											</button>
										</h2>
										<div
											id="collapseTen"
											className="accordion-collapse collapse"
											aria-labelledby="headingTen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">

												{t("Connect_Legal_boasts_a_proven_track_record")}

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

												{t("Compassionate_and_Supportive_Guidance")}
											</button>
										</h2>
										<div
											id="collapseEleven"
											className="accordion-collapse collapse"
											aria-labelledby="headingEleven"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">

												{t("We_understand_that_family_law_matters")}
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

												{t("Strategic_Negotiation_Skills")}
											</button>
										</h2>
										<div
											id="collapseTweleve"
											className="accordion-collapse collapse"
											aria-labelledby="headingTweleve"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">

												{t("Our_Dubai_family_lawyers_are_skilled")}
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

												{t("Dedication_to_Client_Satisfaction")}
											</button>
										</h2>
										<div
											id="collapseThirteen"
											className="accordion-collapse collapse"
											aria-labelledby="headingThirteen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t("At_Connect_Legal,_client_satisfaction")}
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
							{t("Discover")}	 <span className="green-medium-2"> {t("Top_Family_Lawyers_in_Dubai")}</span>
						</h3>
						<p className="font-medium weight-light text-black mt-3">

							{t("Connect_Legal_prides_itself_on_being")}
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
					<h3 className="font-xxx-large weight-bold social-link">

						{t("What_Do_Clients")}
						<span className="green-medium-2">
							{' '}
							{t("Most_Frequently_Search_For?")}
						</span>
					</h3>
					<p className="font-medium weight-light social-link mt-3">

						{t("Clients_frequently_search_for_knowledgeable")}
					</p>
					<h5 className="mt-4" style={{ color: '#4F4F4F' }}>

						{t("Select_the_legal_issue_you")}
					</h5>
					<ul className="pt-3 class-add">
						<li>
							<Link href="#"> {t("Divorce_proceedings")}</Link>
						</li>
						<li>
							<Link href="#">{t("Child_custody_disputes")}</Link>
						</li>
						<li>
							<Link href="#">{t("Adoption_processes")}</Link>
						</li>
						<li>
							<Link href="#">{t("Domestic_violence_matters")}</Link>
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

									{t("How_Lawyers_Can_Assist_in")}

									<span className="green-medium-2"> 	{t("How_Lawyers_Can_Assist_in")}</span>-{t("related_legal_matters")}
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

												{t("Providing_Legal_Guidance_and_Advice")}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t("Family_lawyers_offer_invaluable_legal_guidance")}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												{t("Negotiating_Settlements")}											</h4>
										</div>
										<div className="text-start Discover-lawyer" />A significant aspect of a family
										{t("A_significant_aspect_of_a_family")}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												{t("Representing_Clients_in_Court")}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t("When_disputes_cannot_be_resolved")}
										<br />
										{t("With_their_knowledge_of_courtroom")}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												{t("Drafting_Legal_Documents")}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />

										{t("Family_lawyers_play_a_crucial")}
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
										{t("Got_Questions")} <br />
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
													{t("What_types_of_cases_do_family_lawyers_handle?")}
												</button>
											</h2>
											<div
												id="collapseOne"
												className="accordion-collapse collapse show "
												aria-labelledby="headingOne"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">

													{t("Family_lawyers_handle_a_wide_range")}

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

													{t("How_can_a_family_lawyer_help_with_divorce_proceedings?")}
												</button>
											</h2>
											<div
												id="collapseTwo1"
												className="accordion-collapse collapse"
												aria-labelledby="headingTwo1"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">

													{t("Family_lawyers_assist_with_divorce")}
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
													{t("What_factors_are_considered_in_child_custody_disputes?")}
												</button>
											</h2>
											<div
												id="collapseThree"
												className="accordion-collapse collapse"
												aria-labelledby="headingThree"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">

													{t("Child_custody_disputes_invloves")}
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
													{t("Can_a_family_lawyer_help_with_the_adoption_process?")}
												</button>
											</h2>
											<div
												id="collapseFour"
												className="accordion-collapse collapse"
												aria-labelledby="headingFour"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">

													{t("Yes,_family_lawyers_can_assist_with_adoption_processes")}

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
													{t("What_are_the_benefits_of_hiring_a_family_lawyer_for_family-related_legal_matters?")}
												</button>
											</h2>
											<div
												id="collapseFive"
												className="accordion-collapse collapse"
												aria-labelledby="headingFive"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t("Hiring_a_family_lawyer_ensures_that_individuals")}
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
