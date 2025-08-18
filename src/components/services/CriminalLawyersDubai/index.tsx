'use client';
import React, { useState, useEffect } from 'react';
import './style.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Slider from '@/commonUI/SliderHome';
import LawyerCard from '@/components/lawyer/LawyerCard';
import { getAllLawyersDataByIds } from '../../../../lib/frontendapi';

export default function CriminalLawyersDubai() {
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
							<h1 className="font-larger weight-bold green-medium-dark mobile-m-0">Criminal Lawyers in Dubai
							</h1>
							<p className="weight-light social-link font-medium mt-4">
								{isMobileView ? (
									<>
										{showFullText ? (
											<>
												A criminal lawyer specializes in defending individuals accused of
												committing crimes. They provide legal representation throughout all
												stages of the criminal justice process, from investigation and arrest to
												trial and sentencing. <br />
												At Connect Legal, we offer expert criminal defense services tailored to
												each client's unique circumstances. Our team of experienced criminal
												lawyers in Abu Dhabi diligently protects our clients' rights, challenges
												evidence, negotiates plea deals, and advocates in court to guarantee the
												best possible outcomes for our clients.{' '}
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
										A criminal lawyer specializes in defending individuals accused of committing
										crimes. They provide legal representation throughout all stages of the criminal
										justice process, from investigation and arrest to trial and sentencing. <br />
										At Connect Legal, we offer expert criminal defense services tailored to each
										client's unique circumstances. Our team of experienced criminal lawyers in Abu
										Dhabi diligently protects our clients' rights, challenges evidence, negotiates
										plea deals, and advocates in court to guarantee the best possible outcomes for
										our clients.{' '}
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
							<Image src="/images/legal-service/criminal_lawyer.jpeg" alt="AdobeStock" className="effect show-hide" width={516} height={344} style={{ borderRadius: '8px' }} />

						</div>
					</div>
				</div>
			</section>

			<section className="why-join">
				<div className="container">
					<div className="row mt-md-5 align-items-end">
						<div className="col-lg-12 col-xl-12 col-md-12">
							<h2 className="font-smaller weight-bold text-white">
								<span className="green-med">Major Crime Statistics in </span>{' '}
								<span className="green-med-col">UAE </span>
							</h2>
							<div className="accordion-body border-0 text-white">
								Recent years have seen fluctuating major crime rates in the UAE, reflecting diverse
								trends in criminal activity across various categories.
								<ul className="custom-bullets mt-3 mb-3">
									<li>
										0.3 willful murders per 100,000 people in 2022, slightly increased from 0.3 in
										2021.
									</li>
									<li>
										2.0 aggravated assaults per 100,000 people in 2022, returning to its 2020 peak
										after a decrease.
									</li>
									<li>
										3.1 robberies per 100,000 people in 2022, marking the highest rate observed.
									</li>
									<li>9.9 thefts per 100,000 people in 2022, up from 7.7 in 2020.</li>
									<li>1.3 abductions per 100,000 people in 2022, maintaining the rate from 2021.</li>
									<li>
										3.2 grand auto thefts per 100,000 people in 2022, the highest rate recorded.
									</li>
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
														Criminal Law in the UAE
													</button>
												</h2>
												<div
													id="collapseOne"
													className="accordion-collapse collapse show"
													aria-labelledby="headingOne"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														The United Arab Emirates (UAE) has a robust legal system
														governing criminal activities within its borders, based on
														Islamic Sharia law, civil law principles, and customary law.
														Understanding this overview is essential for residents and
														visitors to avoid legal troubles. The UAE emphasizes equality
														before the law, with strict penalties for criminal activities to
														maintain public order and safety.
														<ul className="custom-bullets mt-3 mb-3">
															<li>
																Categorization of crimes: Crimes in the UAE are divided
																into general crimes, financial crimes, cybercrimes, and
																drug-related offenses.
															</li>
															<li>
																Penalties: The penalties for crimes in the UAE can be
																severe, depending on the nature and gravity of the
																offense. These penalties aim to deter individuals from
																engaging in criminal activities.
															</li>
															<li>
																Rehabilitation: In addition to criminal penalties, the
																UAE focuses on the rehabilitation and reintegration of
																offenders into society through various programs and
																initiatives.
															</li>
															<li>
																Legal awareness: Individuals must familiarize themselves
																with the UAE's criminal laws to avoid unintentional
																violations. Seeking legal advice or consulting reliable
																sources can help understand the legal framework and
																regulations in the UAE.
															</li>
														</ul>
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
														Types of Crimes Punishable Under UAE Law
													</button>
												</h2>
												<div
													id="collapseTwo"
													className="accordion-collapse collapse "
													aria-labelledby="headingTwo"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														The UAE categorizes crimes into various types, each with
														distinct punishments, emphasizing compliance with the law and
														avoiding legal repercussions.
														<ul className="custom-bullets mt-3 mb-3">
															<li>
																Theft: Unlawful taking of others’ property can result in
																severe penalties such as imprisonment and fines.
															</li>
															<li>
																Fraud: Deceptive practices, such as identity theft and
																credit card fraud, can result in imprisonment, fines,
																and deportation.
															</li>
															<li>
																Assault and violence: Crimes involving intentional
																physical harm or injury to others entail penalties
																ranging from imprisonment to mandatory counseling.
															</li>
															<li>
																Drug offenses: Possession, use, or trafficking of
																illegal drugs is strictly prohibited, leading to lengthy
																prison sentences, hefty fines, and even the death
																penalty.
															</li>
															<li>
																Cybercrimes: Activities like hacking and online fraud
																carry penalties such as imprisonment, fines, and
																deportation.
															</li>
															<li>
																Public order and morality: Offenses like public
																intoxication and indecent behavior result in
																imprisonment, fines, and deportation.
															</li>
														</ul>
														Understanding these types of crimes is crucial for residents and
														visitors to ensure compliance with UAE law and maintain a safe
														environment.
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
														Legal Safeguards for Defendants in the UAE
													</button>
												</h2>
												<div
													id="collapseThree"
													className="accordion-collapse collapse "
													aria-labelledby="headingThree"
													data-bs-parent="#accordionExample">
													<div className="accordion-body border-0 text-white">
														The United Arab Emirates (UAE) upholds a well-established legal
														framework that safeguards defendants' rights throughout criminal
														proceedings. Governed by Federal Law No. 35 of 1992, the UAE
														Penal Code outlines the criminal procedure and rights afforded
														to defendants during legal proceedings.
														<ul className="custom-bullets mt-3 mb-3">
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
														</ul>
														<div className="accordion-body border-0 text-white">
															These legal safeguards ensure that defendants in the UAE are
															treated fairly, have access to due process, and can defend
															themselves effectively.
															<br />
															For legal assistance and guidance throughout criminal
															proceedings, seek the expertise of experienced criminal
															lawyers at Connect Legal.
														</div>
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
								Understanding <span className="green-medium-2">Criminal Laws in the UAE</span>
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
											Theft and Robbery Laws
										</button>
									</h2>
									<div
										id="collapseOne"
										className="accordion-collapse collapse show"
										aria-labelledby="headingOne"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Assault and violence pose significant threats to societal safety, prompting
											robust legal responses in the UAE. The Penal Code delineates clear
											consequences for such offenses, ranging from fines to imprisonment.
											Legislative initiatives aimed at victim protection highlight the UAE's
											commitment to fostering a secure environment.
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
											Drug Offenses in the UAE
										</button>
									</h2>
									<div
										id="collapseTwo"
										className="accordion-collapse collapse"
										aria-labelledby="headingTwo"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											The UAE enforces strict laws against drug offenses, considering them serious
											crimes. Possession, use, or trafficking of illegal drugs can lead to
											imprisonment and hefty fines. Penalties vary based on the type and quantity
											of drugs involved, with trafficking carrying particularly severe
											consequences, including life imprisonment or the death penalty.
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
											Cybercrime Legal Implications
										</button>
									</h2>
									<div
										id="collapseThree"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Cybercrime poses a growing threat in the UAE, with hacking, identity theft,
											and online fraud being major concerns. The UAE Cybercrime Law criminalizes
											such activities, imposing imprisonment and fines on offenders. The
											government collaborates with international organizations to combat cyber
											threats effectively, aiming to create a safe digital environment.
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
											Assault and Violence Liability
										</button>
									</h2>
									<div
										id="collapsefour"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Assault and violence pose significant threats to societal safety, prompting
											strong legal responses in the UAE. The Penal Code delineates clear
											consequences for such offenses, ranging from fines to imprisonment.
											Legislative initiatives aimed at victim protection highlight the UAE's
											commitment to fostering a secure environment.
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
									Why Should I Hire a <br />{' '}
									<span className="green-medium-2">
										Criminal Lawyer <br />{' '}
									</span>{' '}
									from Connect Legal?
								</h3>
								<p className="font-medium weight-light text-black-add-fig mt-3">
									Hiring a criminal lawyer in Dubai from Connect Legal ensures you have access to
									professionals who are well-versed in the details of the country's criminal legal
									system. We will make sure that you find the best criminal lawyers in Abu Dhabi,
									Dubai, and the UAE at Connect Legal. Our lawyers deeply understand UAE laws and
									regulations, allowing them to handle your case effectively and provide sound legal
									advice specific to the local context.
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
												Expertise in Criminal Law UAE
											</button>
										</h2>
										<div
											id="collapseEight"
											className="accordion-collapse collapse show"
											aria-labelledby="headingEight"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Hiring a criminal lawyer in Dubai from Connect Legal ensures you have
												access to professionals who are well-versed in the details of the
												country's criminal legal system. We will make sure that you find the
												best criminal lawyers in Abu Dhabi, Dubai, and the UAE at Connect Legal.
												Our lawyers deeply understand UAE laws and regulations, allowing them to
												handle your case effectively and provide sound legal advice specific to
												the local context.
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
												Proven Track Record of Success
											</button>
										</h2>
										<div
											id="collapseNine"
											className="accordion-collapse collapse"
											aria-labelledby="headingNine"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												At Connect Legal, we have a history of securing favorable outcomes for
												our clients facing criminal charges. From minor infractions to serious
												felonies, our team of the best criminal lawyers in Abu Dhabi, Dubai, and
												the UAE has successfully defended numerous individuals, earning their
												trust through our dedication, skill, and commitment to achieving
												justice.
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
												Personalized Legal Representation
											</button>
										</h2>
										<div
											id="collapseTen"
											className="accordion-collapse collapse"
											aria-labelledby="headingTen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												We understand that every criminal case is unique, so we offer
												personalized legal representation to each client. Our criminal lawyers
												take the time to listen to your concerns, assess your situation, and
												develop a customized strategy to achieve the best possible result for
												your case. Be it through negotiation or litigation, our team of criminal
												lawyers in Dubai and Abu Dhabi prioritizes your interests and works
												tirelessly to protect your rights.
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
												Compassionate Support
											</button>
										</h2>
										<div
											id="collapseEleven"
											className="accordion-collapse collapse"
											aria-labelledby="headingEleven"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Facing wrongful criminal charges can be a daunting experience, but you
												don't have to go through it alone. At Connect Legal, our criminal lawyer
												will provide compassionate support to you every step of the way. From
												the initial consultation to resolving your case, our team of criminal
												lawyers in Dubai and beyond offers guidance, reassurance, and unwavering
												support during this challenging time.
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
												Accessibility and Communication
											</button>
										</h2>
										<div
											id="collapseTweleve"
											className="accordion-collapse collapse"
											aria-labelledby="headingTweleve"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												We prioritize clear and open communication with our clients, making sure
												that you are informed and involved throughout the legal process. We’ll
												help you find the best criminal lawyer in Abu Dhabi, Dubai, or anywhere
												else in the UAE who will be ready to address your questions and concerns
												promptly. You can expect a transparent and collaborative criminal
												lawyer-client relationship built on trust and mutual respect.
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
												Client Satisfaction
											</button>
										</h2>
										<div
											id="collapseThirteen"
											className="accordion-collapse collapse"
											aria-labelledby="headingThirteen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Client satisfaction is our top priority at Connect Legal. We strive to
												exceed our clients' expectations by providing responsive communication,
												transparent guidance, and aggressive advocacy. Our commitment to client
												satisfaction has earned us numerous positive reviews and referrals,
												which show our client's trust and confidence in our legal team.
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
							Discover the <span className="green-medium-2">Top Criminal Lawyers in Dubai</span>
						</h3>
						<p className="font-medium weight-light text-black-add-fig mt-3">
							{isMobileViewDiscover ? (
								<>
									{showFullTextDiscover ? (
										<>
											At Connect Legal, our top criminal lawyers in Dubai excel in legal expertise
											and client advocacy. They navigate complex cases precisely and
											professionally, earning your trust and respect. Our criminal
											lawyers—Dubai-based or beyond—will show commitment to achieving favorable
											outcomes and work hard to win the case.
										</>
									) : (
										'At Connect Legal, we are proud to house some of the top motorcycle accident lawyers in the UAE legal industry. Our team comprises'
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
									At Connect Legal, our top criminal lawyers in Dubai excel in legal expertise and
									client advocacy. They navigate complex cases precisely and professionally, earning
									your trust and respect. Our criminal lawyers—Dubai-based or beyond—will show
									commitment to achieving favorable outcomes and work hard to win the case.
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
						What Do clients
						<span className="green-medium-2">
							{' '}
							most frequently <br /> searched for?
						</span>
					</h3>
					<p className="font-medium weight-medium social-link set-text-padding color-frequent set-top-mrgin-mbl">
						Individuals seeking legal information on criminal law are typically concerned with finding
						knowledgeable legal representation and clarity regarding their legal options. Our criminal
						lawyers at Connect Legal will provide expert guidance and advocate effectively on your behalf.
						<br />
						Select the legal issue that you face and connect with a legal expert.
					</p>
					<ul className="pt-3 class-add">
						<li>
							<Link href="#">Criminal defense strategies</Link>
						</li>
						<li>
							<Link href="#">Legal rights during arrest and interrogation</Link>
						</li>
						<li>
							<Link href="#">Penalties for criminal offenses</Link>
						</li>
						<li>
							<Link href="#">Bail and pretrial procedures</Link>
						</li>
						{/* <li>
							<Link href="#">Medical expenses coverage</Link>
						</li>
						<li>
							<Link href="#">Negotiating settlements</Link>
						</li> */}
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
									How lawyers can assist in
									<span className="green-medium-2"> Crime-Related </span>-related legal matters?
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
											<h4 className="text-start weight-bold" style={{ color: '#093F38' }}>
												Legal Advice and Guidance
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Criminal lawyers offer essential legal advice and guidance to individuals facing
										criminal charges. They explain the legal process, discuss potential outcomes,
										and provide strategic advice on proceeding with the case. By understanding the
										intricacies of criminal law, criminal lawyers allow their clients to make
										informed decisions and effectively deal with the legal system.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#093F38' }}>
												Representation in Court
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										One of the primary roles of a criminal lawyer is to represent their clients in
										court proceedings. They advocate for their clients' rights, present legal
										arguments, cross-examine witnesses, and challenge evidence presented by the
										prosecution. The criminal lawyers’ courtroom experience and knowledge of
										criminal law enable them to mount a robust defense and work towards achieving an
										ideal outcome for their clients
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#093F38' }}>
												Negotiation and Settlement
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Our motorcycle accident lawyers in the UAE are skilled negotiators who work
										diligently to reach favorable settlements for their clients in motorcycle
										accident cases. They engage in negotiations with insurance companies and
										opposing parties to secure maximum compensation for medical expenses, injuries,
										and other damages. Lawyers strive to achieve swift and fair resolutions that
										address their clients needs and interests.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#093F38' }}>
												Negotiating Plea Deals
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Criminal lawyers are skilled negotiators who can work with prosecutors to
										negotiate plea deals on behalf of their clients. They assess the strength of the
										prosecution's case and leverage their knowledge of the law to secure favorable
										terms for their clients, such as reduced charges or sentencing. By negotiating
										plea deals, they aim to minimize the potential consequences of criminal charges
										and protect their clients' interests.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#093F38' }}>
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
													What should I do if I'm arrested?
												</button>
											</h2>
											<div
												id="collapseOne"
												className="accordion-collapse collapse show"
												aria-labelledby="headingOne"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													If you're arrested, it's essential to remain calm and exercise your
													right to remain silent. Refrain from providing any information to
													the police until you have consulted with a criminal lawyer. Contact
													a lawyer as soon as possible to understand your rights and receive
													legal guidance.
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
													How can a criminal lawyer help me if I'm charged with a crime?
												</button>
											</h2>
											<div
												id="collapseTwo1"
												className="accordion-collapse collapse"
												aria-labelledby="headingTwo1"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													A criminal lawyer can provide valuable assistance if you're charged
													with a crime. They will assess the details of your case, explain
													your legal options, and develop a defense strategy tailored to your
													specific circumstances. Whether through negotiation or litigation,
													they will advocate fiercely on your behalf to achieve the best
													possible outcome for your case.
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
													What should I expect during the criminal trial process?
												</button>
											</h2>
											<div
												id="collapseThree"
												className="accordion-collapse collapse"
												aria-labelledby="headingThree"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													During the criminal trial process, you can expect various stages,
													including arraignment, pretrial hearings, trial proceedings, and
													sentencing (if convicted). Your criminal lawyer will guide you
													through each step, prepare you for court appearances, and
													effectively represent you in front of the judge and jury.
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
													How much does it cost to hire a criminal lawyer?
												</button>
											</h2>
											<div
												id="collapsefour"
												className="accordion-collapse collapse"
												aria-labelledby="headingfour"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													The cost of hiring a criminal lawyer can vary depending on factors
													such as the complexity of your case, the lawyer's experience, and
													the location of the legal proceedings. Some criminal lawyers offer
													flexible payment options, including hourly rates, flat fees, or
													contingency fees, where applicable. It's essential to discuss fees
													and payment arrangements with your lawyer during the initial
													consultation.
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
													Can I change my lawyer if I'm not satisfied with their
													representation?
												</button>
											</h2>
											<div
												id="collapseFive"
												className="accordion-collapse collapse"
												aria-labelledby="headingFive"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													Yes, you have the right to change your lawyer if you're not
													satisfied with their representation. However, it's crucial to
													consider the timing and potential implications of switching
													attorneys, especially if your case is already in progress. Discuss
													your concerns with your current lawyer and explore your options for
													finding new legal representation if necessary.
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
