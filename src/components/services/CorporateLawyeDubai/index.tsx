'use client';
import React, { useState, useEffect } from 'react';
import './style.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Slider from '@/commonUI/SliderHome';
import LawyerCard from '@/components/lawyer/LawyerCard';
import { getAllLawyersDataByIds } from '../../../../lib/frontendapi';

export default function CorporateLawyeDubai() {
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
								Corporate Lawyer in Dubai
							</h1>
							<p className="weight-light social-link font-medium mt-4">
								{isMobileView ? (
									<>
										{showFullText ? (
											<>
												A corporate lawyer specializes in providing legal advice and
												representation to businesses on a wide range of corporate matters,
												including mergers and acquisitions, corporate governance, and compliance
												with regulations. . <br />
												At Professional Women United, our corporate lawyers offer comprehensive legal
												solutions tailored to each client's specific needs and objectives. They
												work closely with businesses to handle legal issues, avoid risks, and
												achieve their strategic goals efficiently and effectively.
											</>
										) : (
											'A corporate lawyer specializes in providing legal advice and representation to businesses on a wide range of corporate matters, including mergers and acquisitions, corporate governance, and compliance with regulations.'
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
										A corporate lawyer specializes in providing legal advice and representation to
										businesses on a wide range of corporate matters, including mergers and
										acquisitions, corporate governance, and compliance with regulations. . <br />
										At Professional Women United, our corporate lawyers offer comprehensive legal solutions
										tailored to each client's specific needs and objectives. They work closely with
										businesses to handle legal issues, avoid risks, and achieve their strategic
										goals efficiently and effectively.
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
							{/* <img
								src="/images/corporate.jpeg"
								alt="AdobeStock"
								className="effect show-hide"
								width="100%"
								style={{ borderRadius: '8px' }}
							/> */}
							<Image
								src="/images/corporate.jpeg"
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
						<div className="col-lg-12 col-md-12">
							<div className="content-wrapper">
								<h2 className="font-smaller weight-bold text-white">
									<span className="green-med">Product Liability in the</span>{' '}
									<span className="green-med-col">UAE</span>
								</h2>
								<p className="weight-light font-medium text-white mt-3">
									Product liability refers to the legal responsibility of manufacturers, distributors,
									sellers, and other entities involved in making and selling goods. They are held
									accountable for any harm or damages caused by their products to consumers. This
									includes harms or losses resulting from defects, hazards, or failures in design,
									manufacturing, labeling, or warnings associated with the product. Product liability
									laws aim to protect consumers by ensuring those responsible for the safety and
									quality of goods are held accountable for any shortcomings.
								</p>
							</div>
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
												Introduction of New Corporate Vehicles
											</button>
										</h2>
										<div
											id="collapseOne"
											className="accordion-collapse collapse show"
											aria-labelledby="headingOne"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0 text-white">
												<ul className="custom-bullets mt-3 mb-3">
													<li>
														The New Companies Law introduces Special Purpose Acquisition
														Companies (SPACs) and Special Purpose Vehicles (SPVs), improving
														options for mergers and acquisitions (M&A) and foreign
														investment.
													</li>
													<li>
														SPACs, approved by the UAE Securities and Commodities Authority
														(SCA), facilitate IPOs and serve as a PJSC for acquiring or
														merging companies.
													</li>
													<li>
														SPVs, separate entities for financing operations, offer
														flexibility in bond issuances and credit transactions.
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
												Key Changes to Limited Liability Companies (LLCs)
											</button>
										</h2>
										<div
											id="collapseTwo1"
											className="accordion-collapse collapse"
											aria-labelledby="headingTwo1"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0 text-white">
												<ul className="custom-bullets mt-3 mb-3">
													<li>Managers' powers extension for up to six months.</li>
													<li>
														Relaxation of quorum requirements for general assembly meetings.
													</li>
													<li>Reduction of statutory reserves from 10% to 5%.</li>
													<li>
														Inclusion of dispute settlement methods in Memorandum of
														Association.
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
												Key Changes to Public Joint Stock Companies (PJSCs)
											</button>
										</h2>
										<div
											id="collapseThree"
											className="accordion-collapse collapse"
											aria-labelledby="headingThree"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0 text-white">
												<ul className="custom-bullets mt-3 mb-3">
													<li>Directors' replacement within 30 days of departure.</li>
													<li>
														Subscription share requirements are specified in the prospectus.
													</li>
													<li>
														Authorization to issue discounted shares is subject to SCA
														approval.
													</li>
													<li>
														Directors' remuneration is capped at 10% of net profits or a
														lump sum fee of up to AED 200,000 in case of profit failure.
													</li>
												</ul>
												The New Companies Law signifies the UAE's commitment to economic
												development and alignment with international best practices. Existing
												companies must adjust within one year, underlining the UAE's drive to
												enhance competitiveness and attract investments.
												<br /> If you’re looking for a corporate lawyer in UAE to help you
												introduce the New Companies Law to your corporation, make sure to
												contact us.
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="about-btn-two mt-lg-5 mt-3">
								<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue findlawyermargin">
									<span className="text-white findlawyertext">
										<Link href={'/auth/create-profile/?role=lawyer'} style={{ color: 'white' }}>
											Find a Lawyer
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
								Understanding <span className="green-medium-2">Corporate Governance</span>
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
											Importance of Corporate Governance
										</button>
									</h2>
									<div
										id="collapseOne"
										className="accordion-collapse collapse show"
										aria-labelledby="headingOne"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Corporate governance covers the rules, practices, and processes by which
											businesses are directed and controlled. It allows for transparency,
											accountability, and fairness in decision-making, protects stakeholders'
											interests, and fosters long-term sustainability.
											<br />
											Key aspects include:
											<ul className="custom-bullets mt-3 mb-3">
												<li>Integrity, transparency, accountability, and fairness</li>
												<li>
													Ethical conduct, responsible leadership, and prudent risk management
												</li>
												<li>
													Protection of shareholder interests and enhancement of long-term
													value
												</li>
												<li>Compliance with legal and regulatory requirements</li>
												<li>
													Effective oversight and strategic guidance by the board of directors
												</li>
												<li>Alignment of corporate strategies with shareholder interests</li>
												<li>
													Promotion of transparency and open communication with stakeholders
												</li>
												<li>
													Implementation of best practices to mitigate risks and enhance
													processes
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
											Key Principles of Corporate Governance
										</button>
									</h2>
									<div
										id="collapseTwo"
										className="accordion-collapse collapse"
										aria-labelledby="headingTwo"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Effective corporate governance is guided by integrity, transparency,
											accountability, and fairness. These principles shape the behavior of
											directors, officers, and executives to promote ethical conduct, responsible
											leadership, and prudent risk management.
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
											Role of Board of Directors
										</button>
									</h2>
									<div
										id="collapseThree"
										className="accordion-collapse collapse"
										aria-labelledby="headingThree"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											The board of directors plays a central role in corporate governance,
											overseeing the company's strategic direction, monitoring performance, and
											safeguarding shareholder interests. Through regular meetings, committees,
											and fiduciary duties, directors make sure that the company operates by legal
											and ethical standards. <br />
											Key aspects include:
											<ul className="custom-bullets mt-3 mb-3">
												<li>
													Strategic direction: Setting the company's long-term goals and
													objectives
												</li>
												<li>
													Performance monitoring: Evaluating financial and operational
													performance
												</li>
												<li>
													Shareholder interests: Representing shareholders and ensuring their
													interests are prioritized
												</li>
												<li>
													Compliance oversight: Making sure the company operates within legal
													and ethical boundaries
												</li>
												<li>
													Committee responsibilities: Establishing specialized committees to
													address specific governance matters
												</li>
											</ul>
											By fulfilling these responsibilities, the board of directors contributes to
											effective corporate governance and overall success.
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
											Enhancing Shareholder Value
										</button>
									</h2>
									<div
										id="collapseFour"
										className="accordion-collapse collapse"
										aria-labelledby="headingFour"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											One primary objective of corporate governance is to improve shareholder
											value. By promoting transparency, ensuring effective risk management, and
											aligning corporate strategies with shareholder interests, companies can
											attract investment, build trust, and achieve sustainable growth.
											<br />
											Boosting shareholder value is a core goal of corporate governance. It
											involves aligning company strategies with shareholder interests, promoting
											transparency, and managing risks effectively. By prioritizing long-term
											sustainability and growth, companies can attract investments, build trust,
											and promote ongoing success.
											<br />
											This focus on delivering consistent value over time helps companies earn
											trust with investors, secure funding for important projects, and ultimately
											create lasting value for everyone involved. It's about making smart
											decisions that benefit shareholders now and in the future, ensuring the
											company's prosperity in a competitive market.
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
											Corporate Governance Best Practices
										</button>
									</h2>
									<div
										id="collapseFive"
										className="accordion-collapse collapse"
										aria-labelledby="headingFive"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Best practices in corporate governance include maintaining a diverse and
											independent board, establishing clear policies and procedures, conducting
											regular audits and assessments, and fostering open communication with
											stakeholders. These practices help avoid risks, enhance decision-making
											processes, and promote shareholder value creation.
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
											Role of Corporate Culture
										</button>
									</h2>
									<div
										id="collapseSix"
										className="accordion-collapse collapse"
										aria-labelledby="headingSix"
										data-bs-parent="#accordionExample">
										<div className="accordion-body border-0">
											Corporate culture plays a significant role in shaping behavior and driving
											organizational performance. A positive corporate culture, characterized by
											shared values and a commitment to ethical conduct, fosters employee
											engagement, innovation, and long-term success.
											<ul className="custom-bullets mt-3 mb-3">
												<li>Shared values and ethical standards guide employee behavior</li>
												<li>
													Performance monitoring: Evaluating financial and operational
													performance
												</li>
												<li>
													Open communication channels encourage collaboration and feedback
												</li>
												<li>
													Emphasis on diversity and inclusion promotes a supportive work
													environment
												</li>
												<li>
													Continuous learning opportunities empower employees and enhance
													skills
												</li>
												<li>
													Recognition and reward systems reinforce desired behaviors and
													performance
												</li>
											</ul>
											By promoting a positive corporate culture, organizations can strengthen
											their reputations, attract and retain talent, and effectively adapt to
											changing market dynamics.
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
										Corporate Lawyer <br />{' '}
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
												Expertise in Corporate Law
											</button>
										</h2>
										<div
											id="collapseEight"
											className="accordion-collapse collapse show"
											aria-labelledby="headingEight"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Hiring a corporate lawyer from Professional Women United allows access to
												professionals with extensive expertise in corporate law. Our corporate
												lawyers specialize in handling a wide range of corporate matters,
												including mergers and acquisitions, contract negotiation, and corporate
												governance. With years of experience and a deep understanding of the
												legal landscape, these attorneys are equipped to provide comprehensive
												legal solutions tailored to your business needs.
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
												Track Record of Success
											</button>
										</h2>
										<div
											id="collapseNine"
											className="accordion-collapse collapse"
											aria-labelledby="headingNine"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												At Professional Women United, our corporate lawyers have a proven track record of
												success representing clients in various corporate law matters. They have
												consistently achieved favorable outcomes for clients and are committed
												to delivering results that exceed expectations.
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
												Every business is unique, which is why our corporate lawyers offer
												personalized legal representation to each client. They take the time to
												understand your business objectives, challenges, and priorities,
												allowing them to provide tailored legal solutions that align with your
												goals. Whether you're a small startup or a multinational corporation,
												they are committed to serving as trusted advisors and advocates for your
												business.
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
												Strategic Advice and Guidance
											</button>
										</h2>
										<div
											id="collapseEleven"
											className="accordion-collapse collapse"
											aria-labelledby="headingEleven"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Navigating the complexities of corporate law requires strategic thinking
												and sound legal advice. Our corporate lawyers in Dubai offer expert
												guidance on various business matters, helping you make informed
												decisions that mitigate risks and maximize growth opportunities. Whether
												you’re considering a major business transaction or seeking advice on
												corporate governance issues, our attorneys provide practical solutions
												that align with your long-term objectives.
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
												Efficient Resolution of Disputes
											</button>
										</h2>
										<div
											id="collapseTweleve"
											className="accordion-collapse collapse"
											aria-labelledby="headingTweleve"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Corporate disputes can disrupt business operations and impact
												profitability if not resolved promptly and effectively. Our corporate
												lawyers specialize in alternative dispute resolution methods, such as
												mediation and arbitration, to help clients achieve efficient and
												cost-effective resolutions. In cases where litigation is necessary, they
												have the skills and experience to advocate forcefully for your interests
												in court
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
												Accessibility and Communication
											</button>
										</h2>
										<div
											id="collapseThirteen"
											className="accordion-collapse collapse"
											aria-labelledby="headingThirteen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												At Professional Women United, we prioritize clear and open communication with our
												clients. Our corporate lawyers make themselves readily accessible to
												address your questions and concerns promptly, fostering a collaborative
												attorney-client relationship built on trust and transparency. Whether
												you need legal advice, updates on your case, or assistance with
												corporate transactions, they are here to support you every step of the
												way.
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
							<span className="green-medium-2 font-x-small weight-bold">TOP LEGAL EXPERTS</span>
						</h6>

						<h3 className="font-xxx-large weight-bold text-black mt-3 discover-font">
							Discover the <span className="green-medium-2">Top Corporate Lawyers in Dubai</span>
						</h3>
						<p className="font-medium weight-light text-black-add-fig mt-3">
							{isMobileViewDiscover ? (
								<>
									{showFullTextDiscover ? (
										<>
											At Professional Women United, our top corporate lawyers in Dubai are distinguished by
											their extensive legal expertise, dedication to client satisfaction, and
											proven track record of success. They possess a deep understanding of
											corporate law and business dynamics, allowing them to provide strategic
											advice and effective solutions to our clients. <br />
											Our corporate lawyers' commitment to excellence, professionalism, and strong
											advocacy for your interests distinguish them as top talents.
										</>
									) : (
										'At Professional Women United, our top corporate lawyers in Dubai are distinguished by their extensive legal expertise, dedication to client satisfaction, and proven track record of success. They possess a deep understanding of corporate law and business dynamics, allowing them to provide strategic advice and effective solutions to our clients. 										'
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
									At Professional Women United, our top corporate lawyers in Dubai are distinguished by their
									extensive legal expertise, dedication to client satisfaction, and proven track
									record of success. They possess a deep understanding of corporate law and business
									dynamics, allowing them to provide strategic advice and effective solutions to our
									clients. <br />
									Our corporate lawyers' commitment to excellence, professionalism, and strong
									advocacy for your interests distinguish them as top talents.
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
						Clients frequently search for knowledgeable legal representation and clarity when seeking
						information on corporate legal matters. At Professional Women United, we ensure that our corporate lawyer
						can provide expert guidance on various issues, including business transactions, corporate
						governance, mergers and acquisitions, and regulatory compliance.
						<br />
						Select the legal issue that you face and connect with a legal expert.
					</p>
					<ul className="pt-3 class-add">
						<li>
							<Link href="#">Business formation and structuring</Link>
						</li>
						<li>
							<Link href="#">Contract drafting and negotiation</Link>
						</li>
						<li>
							<Link href="#">Corporate governance and compliance</Link>
						</li>
						<li>
							<Link href="#">Mergers and acquisitions</Link>
						</li>
						<li>
							<Link href="#">Intellectual property protection for businesses</Link>
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
									How lawyers can assist in
									<span className="green-medium-2"> Corporate-Related </span>-related legal matters?
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
												Business Formation and Structuring
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Corporate lawyers help businesses choose the appropriate legal structure, such
										as partnerships, corporations, or limited liability companies, during the
										formation process. They guide clients through the legal requirements and
										implications of each structure, ensuring compliance with relevant regulations
										and maximizing benefits for the business and its stakeholders..
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#093F38' }}>
												Contract Drafting and Negotiation
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Corporate lawyers play a crucial role in drafting and negotiating client
										contracts. They make sure the contracts accurately reflect the parties'
										intentions, protect their clients' interests, and minimize legal risks. With
										their expertise in contract law and negotiation strategies, corporate lawyers
										help businesses secure favorable terms and avoid potential disputes.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#093F38' }}>
												Corporate Governance and Compliance
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Compliance with applicable laws and regulations is essential for businesses to
										operate ethically and avoid legal penalties. Corporate lawyers guide the company
										through corporate governance practices, including board responsibilities,
										shareholder rights, and regulatory compliance. They assist clients in developing
										and implementing policies and procedures to promote transparency,
										accountability, and legal compliance within the organization.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4"></div>
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
											analysis of their clients' cases and investigate the circumstances
											surrounding the alleged offense. They review evidence, interview witnesses,
											and identify legal issues or procedural errors that could benefit their
											clients' defense. By carefully preparing cases, they make sure that their
											clients receive a fair trial and are equipped to challenge the prosecution's
											arguments effectively.{' '}
										</div>
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
													What's the best way to set up my business legally?
												</button>
											</h2>
											<div
												id="collapseOne"
												className="accordion-collapse collapse show"
												aria-labelledby="headingOne"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													The best way to set up your business legally depends on what you
													want for your business and how much you want to be responsible for
													any problems that might come up. A corporate lawyer can help you
													determine the best option, like being a single owner, partnering
													with someone else, or creating a company.
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
													How can a lawyer help if I'm having a problem with a contract?
												</button>
											</h2>
											<div
												id="collapseTwo1"
												className="accordion-collapse collapse"
												aria-labelledby="headingTwo1"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													If you're having a problem with a contract, a lawyer can help you
													understand what the contract says and what you have to do. They can
													also talk to the other person involved and try to find a solution
													that works for everyone. Should it be necessary, they can also help
													you go to court.
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
													What do I need to do to follow the rules for my business?
												</button>
											</h2>
											<div
												id="collapseThree"
												className="accordion-collapse collapse"
												aria-labelledby="headingThree"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													Running a business means following a lot of rules, like paying taxes
													and treating your employees fairly. A lawyer who knows business
													rules can help you understand what you need to do and ensure you're
													doing everything right.
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
													How can I make sure no one steals my ideas for my business?
												</button>
											</h2>
											<div
												id="collapseFour"
												className="accordion-collapse collapse"
												aria-labelledby="headingFour"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													If you have a great idea for your business, you'll want to make sure
													no one else takes it. A lawyer can help you protect your
													intellectual property by getting special rights, like patents or
													trademarks, that make it illegal for others to use without your
													permission.
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
													What's involved in merging my business with another one?
												</button>
											</h2>
											<div
												id="collapseFive"
												className="accordion-collapse collapse"
												aria-labelledby="headingFive"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													If you’re planning to merge your business with another one, you must
													follow many legal regulations to ensure both companies agree on
													everything. A corporate lawyer can help you understand what you need
													and ensure everything goes smoothly.
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
