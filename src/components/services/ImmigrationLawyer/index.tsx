'use client';
import React, { useState, useEffect } from 'react';
import './style.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { getAllLawyersDataByIds } from '../../../../lib/frontendapi';
import Faq from './Faq';
import BenfitSection from './BenfitSection';
import HireSection from './HireSection';
import StatistcsSection from './StatistcsSection';
import LawyerSection from './LawyerSection';

export default function ImmigrationLawyer() {
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

								<span style={{ color: 'rgba(9, 63, 56, 1)' }}>Find A Professional</span>
							</div>
						</section>
					</div>
					<div className="row">
						<div className="col-lg-7">
							<h1 className="font-larger weight-bold green-medium-dark mobile-m-0">Immigration Lawyer in Dubai
							</h1>
							<p className="weight-light social-link font-medium mt-4">
								{isMobileView ? (
									<>
										{showFullText ? (
											<>
												An immigration lawyer assists individuals and businesses with matters
												related to immigration law, including visa applications, residency,
												citizenship, and deportation defense. They guide clients through complex
												legal processes and help resolve issues efficiently.
												<br />
												Our network of experienced immigration lawyers can provide personalized
												advice, represent clients in legal proceedings, and stay updated on
												changes in immigration regulations to ensure the best possible outcomes.
											</>
										) : (
											'An immigration lawyer assists individuals and businesses with matters related to immigration law, including visa applications, residency, citizenship, and deportation defense. They guide clients through complex legal processes and help resolve issues efficiently. '
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
										An immigration lawyer assists individuals and businesses with matters related to
										immigration law, including visa applications, residency, citizenship, and
										deportation defense. They guide clients through complex legal processes and help
										resolve issues efficiently.
										<br />
										Our network of experienced immigration lawyers can provide personalized advice,
										represent clients in legal proceedings, and stay updated on changes in
										immigration regulations to ensure the best possible outcomes.
									</>
								)}
							</p>

							<div className="about-btn-two mt-lg-5 mt-3">
								<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue">
									<span className="text-white">
										<Link href="/find-a-lawyer" className="findlawyertext">
											Find A Professional
										</Link>
									</span>
								</button>
							</div>
						</div>
						<div className="col-lg-5 text-right tab-center">
							<Image src="/images/legal-service/immigration_lawyer.jpeg"
								alt="AdobeStock" className="effect show-hide" width={516} height={344} style={{ borderRadius: '8px' }} />

						</div>
					</div>
				</div>
			</section>

			<StatistcsSection />
			<section className="faq-part">
				<div className="container">
					<div className="row sectionGap flex-wrap-none">
						<div className="col-lg-12 col-xl-5 col-md-12">
							<h2 className="font-smaller text-black  weight-bold mb-4">
								Enforcement and <span className="green-medium-2"> Penal Measures </span>
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
											Inspection and Control Power
										</button>
									</h2>
									<div
										id="collapseOne"
										className="accordion-collapse collapse show"
										aria-labelledby="headingOne"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Authorities hold the power to enforce immigration and residence laws.
											<ul className="custom-bullets mt-3 mb-3">
												<li>
													Stopping and searching vessels: Local and federal security
													authorities can stop and search vessels suspected of carrying
													individuals who have violated immigration laws.
												</li>
												<li>
													Authority of the Minister of Interior: The Minister of Interior can
													cancel visas, entry permissions, or residence licenses if it serves
													the public interest.
												</li>
											</ul>
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
											Deportation of Foreigners
										</button>
									</h2>
									<div
										id="collapseTwo"
										className="accordion-collapse collapse"
										aria-labelledby="headingTwo"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Foreigners may face deportation under specific circumstances.
											<ul className="custom-bullets mt-3 mb-3">
												<li>
													Public interest and safety: The Federal Public Prosecutor, Federal
													Authority for Identity and Citizenship, or other authorized entities
													can order the deportation of foreigners if it serves public
													interest, security, or morals.
												</li>
												<li>
													Family members' deportation: A deportation order for a foreigner can
													extend to their dependents.
												</li>
												<li>
													Detainment and grace period: Foreigners facing deportation may be
													detained or given a grace period to settle their affairs.
												</li>
											</ul>
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
											Offenses and Penalties
										</button>
									</h2>
									<div
										id="collapseThree"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Violations of the law carry penalties:
											<ul className="custom-bullets mt-3 mb-3">
												<li>
													Entry and residency violations: Foreigners illegally entering or
													residing in the country face penalties such as fines or
													imprisonment.
												</li>
												<li>
													Crimes related to visa fraud and employment: Those found using
													forged documents, false statements, or hiring foreigners without
													proper sponsorship face significant fines and imprisonment.
												</li>
												<li>
													Deportation orders: The courts may order the deportation of
													foreigners found guilty of serious offenses under the law.
												</li>
											</ul>
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
											Special Cases and Exemptions
										</button>
									</h2>
									<div
										id="collapsefour"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Certain individuals are exempt from the law:
											<ul className="custom-bullets mt-3 mb-3">
												<li>
													Diplomatic personnel: Heads of state, diplomatic missions, and
													consulate members have immunity according to international treaties.
												</li>
												<li>
													Holders of diplomatic passports: Individuals with diplomatic
													passports receive certain privileges and exemptions.
												</li>
												<li>
													Crew members: Crews of vessels and aircraft have specific exemptions
													based on their travel documents and profession.
												</li>
											</ul>
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
											Implementation and Coordination
										</button>
									</h2>
									<div
										id="collapseFive"
										className="accordion-collapse collapse"
										aria-labelledby="headingFive"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											The law provides guidance on enforcement:
											<ul className="custom-bullets mt-3 mb-3">
												<li>
													Implementation by authorities: The Federal Authority for Identity
													and Citizenship and the Ministry of Interior must implement the
													law's provisions.
												</li>
												<li>
													Data sharing: Authorities share data and collaborate to enforce
													immigration and residence laws effectively.
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<HireSection />
			<section className="discover">
				<div className="container">
					<div className="still">
						<h6 className="text-start">
							<span className="green-medium-2 font-x-small weight-bold">TOP LEGAL EXPERTS</span>
						</h6>

						<h3 className="font-xxx-large weight-bold text-black mt-3 discover-font">
							Discover the <span className="green-medium-2">Top Immigration Professionals in Dubai</span>
						</h3>
						<p className="font-medium weight-light text-black-add-fig mt-3">
							{isMobileViewDiscover ? (
								<>
									{showFullTextDiscover ? (
										<>
											Professional Women United has the best immigration lawyer Dubai has to offer.
											<br />
											<br />
											At Professional Women United, we pride ourselves in connecting you with top immigration
											lawyers in Dubai who excel in their field through a combination of expertise
											and dedication. Immigration lawyers possess in-depth knowledge of local and
											international immigration laws, allowing them to handle complex cases with
											efficiency and professionalism.
											<br /> What sets Professional Women United’s immigration lawyers apart is their
											personalized approach. They make sure each client receives tailored advice
											and comprehensive support throughout their legal journey. Trust us to find
											you the best immigration lawyer Abu Dhabi and Dubai have to offer as we
											handle your immigration matters with care and attention to detail.
										</>
									) : (
										'At Professional Women United, we pride ourselves in connecting you with top immigration lawyers in Dubai who excel in their field through a combination of expertise and dedication. Immigration lawyers possess in-depth knowledge of local and international immigration laws, allowing them to handle complex cases with efficiency and professionalism. 										'
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
									Professional Women United has the best immigration lawyer Dubai has to offer.
									<br />
									<br />
									At Professional Women United, we pride ourselves in connecting you with top immigration lawyers
									in Dubai who excel in their field through a combination of expertise and dedication.
									Immigration lawyers possess in-depth knowledge of local and international
									immigration laws, allowing them to handle complex cases with efficiency and
									professionalism.
									<br /> What sets Professional Women United’s immigration lawyers apart is their personalized
									approach. They make sure each client receives tailored advice and comprehensive
									support throughout their legal journey. Trust us to find you the best immigration
									lawyer Abu Dhabi and Dubai have to offer as we handle your immigration matters with
									care and attention to detail.
								</>
							)}
						</p>
					</div>
				</div>
			</section>

			<LawyerSection lawyers={lawyers} />

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
						Clients seeking legal information on immigration are often most concerned with navigating
						complex processes and guaranteeing compliance with laws and regulations.
						<br />
						Select the legal issue you’re facing and connect with a legal expert.
					</p>
					<ul className="pt-3 class-add">
						<li>
							<Link href="#">Visa Applications and Renewals</Link>
						</li>
						<li>
							<Link href="#">Work Permits and Employment Visas</Link>
						</li>
						<li>
							<Link href="#">Family and Dependent Visas</Link>
						</li>
						<li>
							<Link href="#">Citizenship and Naturalization</Link>
						</li>
						<li>
							<Link href="#">Appeals and Reconsiderations</Link>
						</li>
						<li>
							<Link href="#">Compliance and Legal Rights</Link>
						</li>
					</ul>
				</div>
			</section>

			<BenfitSection />
			<Faq />
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
