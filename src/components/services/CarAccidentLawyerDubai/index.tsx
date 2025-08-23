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
export default function CarAccidentLawyerDubai() {
	const [lawyers, setlawyers] = useState([]);
	const t = useTranslations("CarAccidentLawyer");

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

									<span style={{ color: 'rgba(196,144,115)' }}>{t('Find_a_Lawyer')}</span>
								</div>
							</div>
						</section>
					</div>
					<div className="row">
						<div className="col-lg-7">
							<h1 className="font-larger weight-bold green-medium-dark mobile-m-0">
								{t("Car_Accident_Lawyer_in_Dubai")}
							</h1>
							<p className="weight-light social-link font-medium mt-4">
								{t("Car_accident_lawyers_provide_crucial")}
								<br />
								{t("These_legal_professionals")}
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
						<div className="col-lg-5 text-right tab-center">
							<Image src="/images/legal-service/car_accident_lawyer.jpeg" alt="AdobeStock" className="effect show-hide" width={516} height={344} style={{ borderRadius: '8px' }} />
						</div>
					</div>
				</div>
			</section>

			<section className="why-join">
				<div className="container">
					<div className="row mt-md-5 align-items-end">
						<div className="col-lg-4 col-md-12">
							<h2 className="font-smaller weight-bold text-white">
								<span className="green-med">{t("Car_Accident")} </span>{' '}
								<span className="green-med-col">{t("Statistics")}</span>
							</h2>
							<p className="weight-light font-small text-white">
								{t("In_Dubai,_the_number_of_active")}
							</p>
						</div>
						<div className="col-lg-8 col-md-12  mt-md-0 mt-4 text-lg-0 text-center " id="commaonSection">
							<div className="row align-items-lg-center">
								<div className="col-lg-1 p-lg-0 col-3">
									<img src="/images/car/Vector.svg" alt="about-icon-1" className=" effect imgSize" />
								</div>
								<div className="col-lg-11 col-9 p-lg-0">
									<p
										className="weight-bold f-20 text-start"
										style={{ color: 'rgb(249,242,239)' }}>
										<span className="font-xxx-large" style={{ marginRight: '10px', color: '#fff' }}>
											343
										</span>
										{t("343_deaths_resulting")}
									</p>
								</div>
							</div>
							<div className="row align-items-lg-center">
								<div className="col-lg-1 p-lg-0 col-3">
									<img src="/images/car/Vector2.svg" alt="about-icon-1" className=" effect imgSize" />
								</div>
								<div className="col-lg-11 col-9 p-lg-0">
									<p
										className="weight-bold f-20 text-start"
										style={{ color: 'rgb(249,242,239)' }}>
										<span className="font-xxx-large" style={{ marginRight: '10px', color: '#fff' }}>
											3,000
										</span>
										{t("3,000_recorded")}
									</p>
								</div>
							</div>

							<div className="row align-items-lg-center">
								<div className="col-lg-1 p-lg-0 col-3">
									<img src="/images/car/vector3.svg" alt="about-icon-1" className=" effect imgSize" />
								</div>
								<div className="col-lg-11 col-9 p-lg-0">
									<p
										className="weight-bold f-20 text-start"
										style={{ color: 'rgb(249,242,239)' }}>
										<span className="font-xxx-large" style={{ marginRight: '10px', color: '#fff' }}>
											66%
										</span>
										{t("66%_of_accidents")}
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
														{t("Total_Collisions")}
													</button>
												</h2>

												<div
													id="collapseOne"
													className="accordion-collapse collapse show"
													aria-labelledby="headingOne"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														{t("As_reported_by_the")}
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
														{t("Injury_Causing_Collisions")}
													</button>
												</h2>
												<div
													id="collapseTwo1"
													className="accordion-collapse collapse"
													aria-labelledby="headingTwo1"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														{t("Out_of_the_320_traffic_a")}
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
														{t("Fatal_Causing_Collisions")}
													</button>
												</h2>
												<div
													id="collapseThree"
													className="accordion-collapse collapse"
													aria-labelledby="headingThree"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														{t("A_number_of_traffic")}
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="about-btn-two mt-lg-5 mt-3">
										<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue">
											<span className="text-white">
												<Link
													href={'/auth/create-profile/?role=professional'}
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
					<div className="row">
						<div className="col-lg-12 col-xl-5 col-md-12">
							<h2 className="font-smaller text-black  weight-bold mb-4">
								{t("Which_Roads_in_Dubai")}<span className="green-medium-2">{t("Dubai_Are_The_Most_Dangerous")}</span>
							</h2>
							<Image src="/images/car/Frame.jpg" alt="faq-img" className="m-none effect" width={516} height={550} />
						</div>
						<div className="col-lg-1 p-0 col-1 col-xl-1 col-md-1"></div>
						<div className="col-lg-11 col-11 col-xl-6 col-md-11">
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
											{t("E611:_Emirates_Road")}
										</button>
									</h2>
									<div
										id="collapseOne"
										className="accordion-collapse collapse show"
										aria-labelledby="headingOne"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											{t("Emirates_Road,_also_known")}
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
											{t("E11:_Sheikh_Zayed_Road")}
										</button>
									</h2>
									<div
										id="collapseTwo"
										className="accordion-collapse collapse"
										aria-labelledby="headingTwo"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											{t("Sheikh_Zayed_Road_is_a_perfect")}
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
											{t("E44:_Al_Khail_Road")}
										</button>
									</h2>
									<div
										id="collapseThree"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											{t("Connecting_Dubai")}
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
											{t("E311:_Sheikh_Mohammed_Bin_Zayed_Road")}
										</button>
									</h2>
									<div
										id="collapsefour"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											{t("Known_as_Sheikh_Mohammed_Bin_Zayed_Road")}
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
											{t("E66:_Dubai-Al_Ain_Road")}
										</button>
									</h2>
									<div
										id="collapseFive"
										className="accordion-collapse collapse"
										aria-labelledby="headingFive"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											{t("Dubai-Al_Ain_Road,_known")}
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
								<h3 className="font-xxx-large weight-bold text-black">
									{t('Why_Should_I_Hire')} <br />{' '}
									<span className="green-medium-2">
										{t('Construction_Accident_Lawyer')} <br />{' '}
									</span>{' '}
									{t('from_Connect_Legal')}
								</h3>
								<p className="font-medium weight-light text-black mt-3">
									{t('When_you_been_involved')}
								</p>
								<div className="accordion mt-5" id="">
									{/* <div className=""> */}
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingEight">
											<button
												className="accordion-button"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseEight"
												aria-expanded="true"
												aria-controls="collapseEight">
												{t('Expert_legal_guidance_and_representation')}
											</button>
										</h2>
										<div
											id="collapseEight"
											className="accordion-collapse collapse show"
											aria-labelledby="headingEight"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('Our_car_accident_lawyers')}
												<br />
												{t('Whether_you_re_negotiating')}

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
												{t('Comprehensive_Case_Evaluation')}
											</button>
										</h2>
										<div
											id="collapseNine"
											className="accordion-collapse collapse"
											aria-labelledby="headingNine"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('When_you_choose_a_car')}
												<br />
												{t('With_their_meticulous')}
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
												{t('Negotiation_Skills')}
											</button>
										</h2>
										<div
											id="collapseTen"
											className="accordion-collapse collapse"
											aria-labelledby="headingTen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('Negotiating_with_insurance')}
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
												{t('Resources_and_Network')}
											</button>
										</h2>
										<div
											id="collapseEleven"
											className="accordion-collapse collapse"
											aria-labelledby="headingEleven"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('At_Connect_Legal,_our')}
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
												{t('Proven_Track_Record_of_Success')}
											</button>
										</h2>
										<div
											id="collapseTweleve"
											className="accordion-collapse collapse"
											aria-labelledby="headingTweleve"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('When_you_hire')}
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
												{t('Compassionate_and_Personalized_Service')}
											</button>
										</h2>
										<div
											id="collapseThirteen"
											className="accordion-collapse collapse"
											aria-labelledby="headingThirteen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												{t('At_Connect_Legal,_we_understand')}
												<br />
												{t('We_will_keep_you')}
												<br />
												{t('Whether_you_re_hiring')}<br />

											</div>
										</div>
									</div>
								</div>
								<div className="about-btn-two mt-lg-5 mt-3">
									<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue">
										<span className="text-white">
											<Link href="/find-a-professional" style={{ color: 'white' }}>
												Find A Professional
											</Link>
											<ChevronRightIcon width={20} color={'#fff'} />
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
							<span className="green-medium-2">TOP Professional experts</span>
						</h6>

						<h3 className="font-xxx-large weight-bold text-black mt-3">
							{t('Discover_the')} <span className="green-medium-2">{t('Top_Construction_Accident_Lawyers_in_Dubai')}</span>
						</h3>
						<p className="font-medium weight-light text-black mt-3">
							{t('You_don’t_have_to_search')}
						</p>
					</div>
				</div>
			</section>

			<div className="container">
				{/* <LawyersList />
				<div className="text-end all-btn mt-5">
					<button>View All</button>
				</div> */}
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
						{t('What_Do_Clients')}
						<span className="green-medium-2">
							{' '}
							{t('Most_Frequently_Search_For?')}
						</span>
					</h3>
					<p className="font-medium weight-medium social-link set-text-paddings color-frequent set-top-mrgin-mbl">
						{t('Clients_most_frequently_search')}
						<br />
						{t('Select_the_legal_issue_you_face_and_connect_with_a_legal_expert')}
					</p>
					<ul className="pt-3 class-add">
						<li>
							<Link href="#">{t('Car_Accidents')}</Link>
						</li>
						<li>
							<Link href="#">{t('Car_Accident_Injuries')}</Link>
						</li>
						<li>
							<Link href="#">{t('Truck_Accidents')}</Link>
						</li>
						<li>
							<Link href="#">{t('Motorcycle_Accidents')}</Link>
						</li>
						<li>
							<Link href="#">{t('Property_Damage')}</Link>
						</li>
						<li>
							<Link href="#">{t('Disputes_with_Insurance_Company')} </Link>
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
								<h2
									className="text-black Discover-lawyer"
									style={{ fontSize: '40px', lineHeight: '1.3', fontWeight: '700' }}>
									{t('How_Lawyers_Can_Assist_in')}
									<span className="green-medium-2"> 	{t('car')}</span>	{t('Related_Legal_Matters')}
								</h2>
								<Link href={'/find-a-professional'}>
									<button className="w-40 btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 mt-3">
										<span className="text-white"> Find A Professional </span>
									</button>
								</Link>
							</div>
							<div className="row mt-4" style={{ marginBottom: '65px' }}>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												{t('Related_Legal_Matters')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('when_you_hire_a_car_accident')}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												{t('negotiation_with_insurance_companies')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('navigating_the_complexities')}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												{t('evidence_gathering')}

											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('building_a_strong_case_requires')}
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												{t('court_representation')}
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										{t('if_negotiations_with_insurance')}
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
										<span className="green-medium-2"> {t('We_have_answers')} </span>
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
													{t('what_happens_if_the_other_driver_doesnt_have_insurance')}
												</button>
											</h2>
											<div
												id="collapseOne"
												className="accordion-collapse collapse show"
												aria-labelledby="headingOne"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('this_can_be_a_tricky_situation')}
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
													{t('can_i_still_hire_a_lawyer_if_i_was_partially_at_fault')}
												</button>
											</h2>
											<div
												id="collapseTwo1"
												className="accordion-collapse collapse"
												aria-labelledby="headingTwo1"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('yes_you_can_comparative_neg')}
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
													{t('what_types_of_damages')}
												</button>
											</h2>
											<div
												id="collapseThree"
												className="accordion-collapse collapse"
												aria-labelledby="headingThree"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('Car_accident_lawyers')}
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
													{t('what_should_i_do_after')}
												</button>
											</h2>
											<div
												id="collapseFour"
												className="accordion-collapse collapse"
												aria-labelledby="headingFour"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('some_key_steps_are_to_seek_medical')}
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
													{t('is_there_a_deadline_to_file_a_car_accident_lawsuit')}
												</button>
											</h2>
											<div
												id="collapseFive"
												className="accordion-collapse collapse"
												aria-labelledby="headingFive"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													{t('each_state_has_a_statute_of_limitations')}
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
