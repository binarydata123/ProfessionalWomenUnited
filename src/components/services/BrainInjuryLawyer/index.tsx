'use client';
import React, { useState, useEffect } from 'react';
import './style.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Slider from '@/commonUI/SliderHome';
import LawyerCard from '@/components/lawyer/LawyerCard';
import { getAllLawyersDataByIds } from '../../../../lib/frontendapi';

export default function BrainInjuryLawyer() {
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

								<span style={{ color: 'rgba(9, 63, 56, 1)' }}>Find a Lawyer</span>
							</div>
						</section>
					</div>
					<div className="row">
						<div className="col-lg-7">
							<h1 className="font-larger weight-bold green-medium-dark mobile-m-0">
								Brain Injury Lawyer in Dubai
							</h1>
							<p className="weight-light social-link font-medium mt-4">
								{isMobileView ? (
									<>
										{showFullText ? (
											<>
												A brain injury lawyer specializes in representing individuals who have
												sustained injuries to the brain due to accidents, medical malpractice,
												or other negligence. They work to secure compensation for their clients
												to cover medical expenses and other implications.
												<br />
												At Professional Women United, our team of experienced brain injury lawyers will
												guide you through the legal process, offering support and expertise to
												help achieve the best possible result for your case.
											</>
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
									<>
										A brain injury lawyer specializes in representing individuals who have sustained
										injuries to the brain due to accidents, medical malpractice, or other
										negligence. They work to secure compensation for their clients to cover medical
										expenses and other implications.
										<br />
										At Professional Women United, our team of experienced brain injury lawyers will guide you
										through the legal process, offering support and expertise to help achieve the
										best possible result for your case.
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
								src="/images/legal-service/brain_injury_lawyer.jpeg"
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
								<span className="green-med">Brain Injury </span>{' '}
								<span className="green-med-col">Statistics</span>
							</h2>
							<p className="weight-light font-medium text-white mt-3">
								Brain injuries, known as traumatic brain injuries (TBI), can have serious consequences.
								They are a leading cause of death, and it helps to understand the statistics surrounding
								them.
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
											214,110
										</span>
										TBI-related hospitalizations occurred in 2020.
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
											69,473
										</span>
										TBI-related deaths were recorded in 2021.
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
											2x
										</span>
										more likely for males to be hospitalized and three times more likely to die from
										a TBI compared to females.
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
														Understanding Traumatic Brain Injuries
													</button>
												</h2>
												<div
													id="collapseOne"
													className="accordion-collapse collapse show"
													aria-labelledby="headingOne"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														Traumatic brain injuries (TBIs) can significantly impact a
														person's life, causing various effects such as headaches,
														dizziness, memory issues, and mood swings. Managing daily
														activities, work responsibilities, and social interactions might
														become difficult for individuals with TBIs. Seeking medical
														attention, undergoing specialized therapies, and coping with
														emotional distress are common aspects of TBI recovery, often
														accompanied by substantial financial costs.
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
														Preventing Traumatic Brain Injuries
													</button>
												</h2>
												<div
													id="collapseTwo1"
													className="accordion-collapse collapse"
													aria-labelledby="headingTwo1"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														Preventing TBIs involves being aware of common causes like falls
														or sports accidents. It’s also important to use safety gear such
														as helmets or seat belts to reduce the risk of head injuries
														during accidents. Moreover, ensuring prompt medical intervention
														and appropriate support from healthcare professionals and
														educators can minimize the severity of potential TBIs and allow
														for better recovery outcomes.
													</div>
												</div>
											</div>
											<div className="accordion-item">
												<h2 className="accordion-header" id="headingThree">
													<button
														className="accordion-button text-white"
														type="button"
														data-bs-toggle="collapse"
														data-bs-target="#collapsethree"
														aria-expanded="true"
														aria-controls="collapsethree">
														Getting Legal Help for Traumatic Brain Injuries
													</button>
												</h2>
												<div
													id="collapsethree"
													className="accordion-collapse collapse"
													aria-labelledby="headingthree"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														In cases where TBIs result from others' negligence or
														wrongdoing, seeking legal assistance from brain injury lawyers
														becomes essential. Brain injury lawyers specialize in TBI cases
														and advocate for individuals to secure compensation for medical
														expenses and other related needs. Our traumatic brain injury
														lawyers at Professional Women United negotiate with insurance companies and,
														if necessary, represent clients in court proceedings to ensure
														fair treatment and just outcomes for TBI victims.
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
														Getting Legal Help for Traumatic Brain Injuries
													</button>
												</h2>
												<div
													id="collapsefour"
													className="accordion-collapse collapse"
													aria-labelledby="headingfour"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														In cases where TBIs result from others' negligence or
														wrongdoing, seeking legal assistance from brain injury lawyers
														becomes essential. Brain injury lawyers specialize in TBI cases
														and advocate for individuals to secure compensation for medical
														expenses and other related needs. Our traumatic brain injury
														lawyers at Professional Women United negotiate with insurance companies and,
														if necessary, represent clients in court proceedings to ensure
														fair treatment and just outcomes for TBI victims.
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
								Seeking Legal Recourse{' '}
								<span className="green-medium-2">for Traumatic Brain Injuries</span>
							</h2>
							<Image src="/images/car/Frame.jpg" alt="faq-img" className="m-none effect" width={516} height={550} />
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
											Negligence in Accidents
										</button>
									</h2>
									<div
										id="collapseOne"
										className="accordion-collapse collapse show"
										aria-labelledby="headingOne"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											In cases where TBIs result from accidents caused by another party's
											negligence, such as car crashes or slip-and-fall incidents, victims may
											pursue legal action. Negligence claims assert that the responsible party
											failed to exercise reasonable care, leading to the accident and subsequent
											injury. Brain injury victims seek compensation for medical expenses, lost
											wages, and other damages incurred due to the accident.
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
											Medical Malpractice
										</button>
									</h2>
									<div
										id="collapseTwo"
										className="accordion-collapse collapse"
										aria-labelledby="headingTwo"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Medical malpractice occurs when healthcare professionals fail to provide the
											standard of care expected in their field, resulting in patient harm. In
											cases where TBIs occur due to medical errors during surgery, childbirth, or
											misdiagnosis, victims can file malpractice claims. These claims seek
											compensation for additional medical costs and other damages resulting from
											the malpractice.
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
											Product Liability
										</button>
									</h2>
									<div
										id="collapseThree"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Product liability cases arise when defective products cause injury to
											consumers. If a defective product, such as a faulty helmet or car seat,
											contributes to a TBI, the manufacturer or distributor may be liable. Brain
											injury victims pursue product liability claims to seek compensation for
											their injuries, including rehabilitation costs and other issues caused by
											the accident.
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
											Workplace Accidents
										</button>
									</h2>
									<div
										id="collapsefour"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Injuries sustained in workplace accidents, such as falls from heights or
											exposure to hazardous materials, can result in TBIs. In such cases, workers'
											compensation claims may provide benefits to cover medical expenses and lost
											wages. However, if the injury resulted from employer negligence or a third
											party's actions, the victim may pursue additional compensation through
											personal injury claims.
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
											Assault and Battery
										</button>
									</h2>
									<div
										id="collapsefive"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Victims of intentional harm, such as assault and battery, may seek
											compensation for TBIs through civil lawsuits. These cases assert that the
											perpetrator's actions directly resulted in the injury. While criminal
											charges may be pursued separately by authorities, civil lawsuits allow
											victims to hold the perpetrator financially accountable for their actions.
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<h2 className="accordion-header" id="headingsix">
										<button
											className="accordion-button collapsed"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapsesix"
											aria-expanded="false"
											aria-controls="collapsesix">
											Recreational Activities and Sports Injuries
										</button>
									</h2>
									<div
										id="collapsesix"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Participants in recreational activities and sports may sustain TBIs due to
											negligence or reckless behavior by coaches, organizers, or other
											participants. In such cases, victims may pursue legal action to recover
											compensation for their injuries. Claims may allege inadequate safety
											measures, improper supervision, or failure to warn of known risks.
											Compensation that the victim has the right to seek may cover medical
											expenses, rehabilitation costs, and recompense for pain and suffering.
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
									Why Should I <br />{' '}
									<span className="green-medium-2">
										Hire a Brain Injury Lawyer <br />{' '}
									</span>{' '}
									from Professional Women United?
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
												Expertise in Brain Injury Law
											</button>
										</h2>
										<div
											id="collapseEight"
											className="accordion-collapse collapse show"
											aria-labelledby="headingEight"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												At Professional Women United, our brain injury lawyers specialize in this complex
												area of law. With years of experience and a deep understanding of the
												medical and legal aspects of brain injuries, our brain injury lawyers
												are equipped to handle even the most challenging cases. From traumatic
												brain injuries to concussions, we have the knowledge and skills
												necessary to advocate effectively for our clients.
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
												Personalized Legal Representation
											</button>
										</h2>
										<div
											id="collapseNine"
											className="accordion-collapse collapse"
											aria-labelledby="headingNine"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Every brain injury case is unique, so we provide personalized legal
												representation tailored to each client's specific needs and
												circumstances. Traumatic brain injury lawyers in Dubai take the time to
												listen to our clients, understand their concerns, and develop customized
												strategies to achieve the best possible outcome for their cases. With
												Professional Women United, you can trust that your case will receive the
												individualized attention it deserves.
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
												Proven Track Record of Success
											</button>
										</h2>
										<div
											id="collapseTen"
											className="accordion-collapse collapse"
											aria-labelledby="headingTen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												At Professional Women United, we have a proven track record of success in
												representing clients who have suffered from brain injuries. Our brain
												injury lawyers have secured substantial settlements and verdicts for our
												clients, helping them obtain the compensation they need to cover medical
												expenses, lost wages, and other damages. Be it negotiating with
												insurance companies or litigating in court, our traumatic brain injury
												lawyers have the skills and resources to advocate for your rights
												effectively.
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
												Compassionate and Supportive Guidance
											</button>
										</h2>
										<div
											id="collapseEleven"
											className="accordion-collapse collapse"
											aria-labelledby="headingEleven"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Facing a brain injury can be an overwhelming ordeal, but you don't have
												to go through it alone. Our team at Professional Women United provides compassionate
												and supportive guidance to our clients every step of the way. We
												understand the physical, emotional, and financial toll a brain injury
												can take, and we are committed to helping our clients go through the
												legal process with empathy and care.
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
												Access to Medical Experts and Resources
											</button>
										</h2>
										<div
											id="collapseTweleve"
											className="accordion-collapse collapse"
											aria-labelledby="headingTweleve"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Brain injury cases often require the expertise of medical professionals
												to assess the extent of the injury and its long-term effects. At Connect
												Legal, we have access to a network of trusted medical experts who can
												provide valuable insights and testimony to support our clients' cases.
												We also have access to resources and tools specifically designed for
												brain injury litigation, giving our clients a competitive advantage in
												pursuing justice.
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
												Dedicated Advocacy for Your Rights
											</button>
										</h2>
										<div
											id="collapseThirteen"
											className="accordion-collapse collapse"
											aria-labelledby="headingThirteen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Above all, hiring a brain injury lawyer from Professional Women United means having
												a dedicated advocate who will fight tirelessly for your rights. Our
												brain injury lawyers are passionate about helping clients seek justice
												and fair compensation for their harm. Whether through negotiation or
												litigation, we are committed to achieving the best possible outcome for
												our clients and holding negligent parties accountable for their actions.
												With Professional Women United, you can rest assured that your case is in capable
												hands.
											</div>
										</div>
									</div>
								</div>
								<div className="about-btn-two mt-lg-5 mt-3">
									<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue half-button">
										<span className="text-white set-lawyer-icon">
											<Link href="/find-a-lawyer" style={{ color: 'white' }}>
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
							<Image src="/images/car/Group2944.png" alt=" Still have questions?" width={516} height={549} />

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
							Discover the <span className="green-medium-2">Top Brain Injury Lawyers in Dubai</span>
						</h3>
						<p className="font-medium weight-light text-black-add-fig mt-3">
							{isMobileViewDiscover ? (
								<>
									{showFullTextDiscover ? (
										<>
											At Professional Women United, our top brain injury lawyers possess a unique combination
											of legal expertise, compassion, and dedication to client advocacy. They have
											extensive experience handling complex brain injury cases and a track record
											of successful outcomes for their clients. You can trust that you're working
											with the best brain injury lawyers in UAE who will prioritize your needs and
											strive for the best results.
										</>
									) : (
										'At Professional Women United, we are proud to house some of the top motorcycle accident lawyers in the UAE legal industry. Our team comprises'
									)}
									<br />
									<div className="mt-3 mb-3 d-lg-none d-block weight-bold ">
										<Link href="javascript:void(0)" onClick={handleToggleDiscoverText} style={{ color: '#02142d' }}>
											{showFullTextDiscover ? 'Show Less' : 'Show More'}
										</Link>
									</div>
								</>
							) : (
								<>
									At Professional Women United, our top brain injury lawyers possess a unique combination of legal
									expertise, compassion, and dedication to client advocacy. They have extensive
									experience handling complex brain injury cases and a track record of successful
									outcomes for their clients. You can trust that you're working with the best brain
									injury lawyers in UAE who will prioritize your needs and strive for the best
									results.
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

			<section id="legal-issues" className="legal-issues  mobile-bg-color mt-5 mb-5">
				<div className="container text-center">
					<div className="needlawyer-text text-center">
						<h6 className="text-center p-0">LEGAL ISSUES</h6>
					</div>
					<h3 className="font-smaller weight-bold social-link">
						What Do Clients
						<span className="green-medium-2">
							{' '}
							Most Frequently <br /> Search For?
						</span>
					</h3>
					<p className="font-medium weight-medium social-link set-text-padding color-frequent set-top-mrgin-mbl">
						Clients frequently seek knowledgeable legal representation and clarity when seeking information
						on brain injury cases. At Professional Women United, we ensure that your traumatic brain injury lawyer
						understands the complexities of your situation and can provide clear guidance on your legal
						options.
						<br />
						Select the legal issue you face and connect with a legal expert.
					</p>
					<ul className="pt-3 class-add">
						<li>
							<Link href="#">Traumatic Brain Injury (TBI) compensation</Link>
						</li>
						<li>
							<Link href="#">Concussion-related legal matters</Link>
						</li>
						<li>
							<Link href="#">Medical malpractice leading to brain injury</Link>
						</li>
						<li>
							<Link href="#">Workplace accidents causing brain injuries</Link>
						</li>
						<li>
							<Link href="#">Car accidents resulting in brain trauma</Link>
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
									How Lawyers Can Assist in
									<span className="green-medium-2">Brain Injury</span>-Related Legal Matters
								</h2>
								<div className="mt-4">
									<Link href={'/find-a-lawyer'}>
										<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 set-law-btn-2">
											<span className="text-white"> Find a Lawyer </span>
										</button>
									</Link>
								</div>
							</div>
							<div className="row mt-5 benefit-margin" style={{ marginBottom: '65px' }}>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												Legal Advice and Guidance
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />A brain injury lawyer can provide
										crucial legal advice and guidance to individuals dealing with brain
										injury-related legal matters. They explain your rights and options and outline
										potential legal strategies in addition to offering invaluable support. Whether
										you're dealing with a traumatic brain injury from an accident or medical
										malpractice, a skilled brain injury lawyer can help you understand the legal
										implications and make informed decisions about your case.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												Representation in Negotiations
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										When you’re dealing with insurance companies or opposing parties, having a brain
										injury lawyer by your side can level the playing field. They can represent your
										interests during negotiations, making sure that you are not taken advantage of
										and that any settlement offers adequately compensate you for your injuries and
										losses. With their experience in negotiation tactics and knowledge of relevant
										laws, they work to achieve the best possible outcome for your case.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												Litigation Support
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										In cases where negotiation fails to yield a satisfactory resolution, a brain
										injury lawyer can provide expert litigation support. They have all the skills
										and resources to prepare a strong legal case. This includes gathering evidence,
										interviewing witnesses, and presenting arguments in court. With their courtroom
										experience and dedication to advocating for their clients, they strive to secure
										favorable verdicts and judgments that provide justice and compensation for those
										who have suffered brain injuries.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												Access to Medical Experts
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Brain injury cases often require the expertise of medical professionals to
										assess the extent of the injury and its impact on the victim's life. A brain
										injury lawyer can help connect you with trusted medical experts who can provide
										valuable testimony and evidence to support your case. Whether it's determining
										the long-term effects of a traumatic brain injury or establishing causation in a
										medical malpractice claim, having access to qualified medical experts
										strengthens your legal position and increases your chances of success in court.
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
													What types of cases do brain injury lawyers handle?
												</button>
											</h2>
											<div
												id="collapseOne"
												className="accordion-collapse collapse show"
												aria-labelledby="headingOne"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													Brain injury lawyers handle a variety of cases involving traumatic
													brain injuries, concussions, medical malpractice resulting in brain
													damage, workplace accidents causing head trauma, and car accidents
													leading to brain injuries.
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
													How can I afford a brain injury lawyer?
												</button>
											</h2>
											<div
												id="collapseTwo1"
												className="accordion-collapse collapse"
												aria-labelledby="headingTwo1"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													Many brain injury lawyers work on a contingency fee basis, meaning
													they only get paid if you win your case. This arrangement allows
													individuals to access legal representation without upfront costs.
													Some law firms offer free initial consultations to discuss your case
													and payment options.
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
													How long do I have to file a brain injury lawsuit?
												</button>
											</h2>
											<div
												id="collapseThree"
												className="accordion-collapse collapse"
												aria-labelledby="headingThree"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													The statute of limitations for filing a brain injury lawsuit varies
													by jurisdiction. It's essential to consult with a traumatic brain
													injury lawyer as soon as possible to ensure you don't miss any
													deadlines for filing your claim.
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
													What damages can I recover in a brain injury case?
												</button>
											</h2>
											<div
												id="collapseFour"
												className="accordion-collapse collapse"
												aria-labelledby="headingFour"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													In a brain injury case, you may be eligible to recover damages for
													medical expenses, lost wages, pain and suffering, loss of enjoyment
													of life, and other related costs. A brain injury lawyer can assess
													the specifics of your case and help you pursue the maximum
													compensation available.
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
													How long does it take to resolve a brain injury case?
												</button>
											</h2>
											<div
												id="collapseFive"
												className="accordion-collapse collapse"
												aria-labelledby="headingFive"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													The timeline for resolving a brain injury case depends on various
													factors, including the complexity of the case, the severity of the
													injury, and whether the case goes to trial. While some cases may
													settle relatively quickly through negotiation, others may take
													longer to resolve. Your brain injury lawyer can provide an estimate
													based on the specifics of your situation.
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
