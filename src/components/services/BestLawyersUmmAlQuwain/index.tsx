'use client';
import React, { useState, useEffect } from 'react';
import './style.css';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Slider from '@/commonUI/SliderHome';
import LawyerCard from '@/components/lawyer/LawyerCard';
import { getAllLawyersDataByIds } from '../../../../lib/frontendapi';

export default function BestLawyersUmmAlQuwain() {
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
										alt="Professional Forum"
										width={16}
										height={16}
									/>
								</span>

								<span style={{ color: 'rgba(196,144,115)' }}>Find A Professional</span>
							</div>
						</section>
					</div>
					<div className="row">
						<div className="col-lg-7">
							<h1 className="font-larger weight-bold green-medium-dark mobile-m-0">
								Find the Best Professionals in Umm Al Quwain
							</h1>
							<p className="weight-light social-link font-medium mt-4">
								{isMobileView ? (
									<>
										{showFullText ? (
											<>
												Connecting you with the best lawyers Umm Al Quwain has to offer, Professional Women United is your gateway to professional legal representation. Our platform simplifies the process of finding the perfect lawyer for your needs with a user-friendly interface and a curated selection of experts. Whether you require assistance with family matters, business transactions, or property disputes, Professional Women United ensures seamless access to the best lawyers in Umm Al Quwain with just a couple of clicks! Start your search today and find the perfect lawyer for your case.
											</>
										) : (
											'Finding the best lawyer in Dubai is quick and easy with Professional Women United. We offer the most user-friendly platform for connecting clients with the best lawyers in the USA and simplifying the process of finding top-tier legal representation. '
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
										Connecting you with the best lawyers Umm Al Quwain has to offer, Professional Women United is your gateway to professional legal representation. Our platform simplifies the process of finding the perfect lawyer for your needs with a user-friendly interface and a curated selection of experts. Whether you require assistance with family matters, business transactions, or property disputes, Professional Women United ensures seamless access to the best lawyers in Umm Al Quwain with just a couple of clicks! Start your search today and find the perfect lawyer for your case.
									</>
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
								src="/images/legal-service/Dubai.png"
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

			<section className="questions-part">
				<div className="container">
					<div className="row">
						<div className="col-lg-7 text-right order-lg-0 order-last">
							<div className="still" id="accordianSectionGreen">
								<h3 className="font-smaller weight-bold text-black-add-fig">
									Why Should I Hire a {' '}
									<span className="green-medium-2">
										Lawyer in <span className="desktop-br"><br /></span>{' '}Umm Al Quwain {' '}
									</span>{' '}
									through Professional Women United?
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
												Expertise in Varied Legal Areas
											</button>
										</h2>
										<div
											id="collapseEight"
											className="accordion-collapse collapse show"
											aria-labelledby="headingEight"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Professionals in Umm Al Quwain possess expertise in various legal areas, making sure your specific needs are met with precision. Our platform connects you with lawyers who specialize in your required field, be it Family Professional, real estate matters, or business transactions. Hiring a lawyer in Umm Al Quwain through Professional Women United guarantees that you receive tailored guidance and representation relevant to your case.
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
												Convenient Access to Women Professionals
											</button>
										</h2>
										<div
											id="collapseNine"
											className="accordion-collapse collapse"
											aria-labelledby="headingNine"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Professional Women United provides convenient access to top-tier legal professionals in Umm Al Quwain. With just a few clicks, you can browse through our curated selection of lawyers, view their profiles, and connect with the perfect match for your needs. Our user-friendly platform makes it easy to find and hire the best lawyer in Umm Al Quwain, saving you time and hassle in your search for legal assistance.
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
												Personalized Legal Strategies
											</button>
										</h2>
										<div
											id="collapseTen"
											className="accordion-collapse collapse"
											aria-labelledby="headingTen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												The lawyers in Umm Al Quwain on Professional Women United develop personalized legal strategies designed to maximize success and achieve favorable outcomes for their clients. By understanding your objectives, concerns, and constraints, they craft customized approaches tailored to your specific needs. Be it negotiating settlements, litigating in court, or providing strategic advice, lawyers on our platform employ tactics adapted to your unique circumstances.
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
												Comprehensive Legal Support
											</button>
										</h2>
										<div
											id="collapseEleven"
											className="accordion-collapse collapse"
											aria-labelledby="headingEleven"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												Professional Women United offers comprehensive legal support across a wide range of practice areas in Umm Al Quwain. From Family Professional and real estate matters to business transactions and civil litigation, our platform connects you with lawyers who specialize in various areas of law, providing comprehensive assistance for your diverse legal needs. Whether you need advice, representation, or help with legal documentation, the attorneys on our platform are equipped to handle all aspects of your case with professionalism and expertise.
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
												Rigorous Selection Process
											</button>
										</h2>
										<div
											id="collapseTweleve"
											className="accordion-collapse collapse"
											aria-labelledby="headingTweleve"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												All lawyers listed on Professional Women United undergo a rigorous selection process to ensure that only the most qualified and reputable legal professionals are represented. Each lawyer in Umm Al Quwain goes through assessments of their qualifications, experience, and ethical standards. This way, when you hire a lawyer through Professional Women United, you&apos;re working with a trusted professional who meets our criteria for excellence and reliability.
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
												Specialization in Local Laws
											</button>
										</h2>
										<div
											id="collapseThirteen"
											className="accordion-collapse collapse"
											aria-labelledby="headingThirteen"
											data-bs-parent="#accordionExample">
											<div className="accordion-body border-0">
												The lawyers on Professional Women United possess extensive knowledge and expertise in local laws and regulations specific to Umm Al Quwain. Their familiarity with the region&apos;s legal landscape, including specific statutes, regulations, and court procedures, allows them to handle your case with precision and effectiveness. Whether you&apos;re facing issues related to property law, commercial transactions, or family matters, you can trust that the lawyers in Umm Al Quwain can provide strategic guidance and representation tailored to your needs.
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
							<span className="green-medium-2 font-x-small weight-bold">TOP Professional experts</span>
						</h6>

						<h3 className="font-xxx-large weight-bold text-black mt-3 discover-font">
							Discover the <span className="green-medium-2">Top Professionals in Umm Al Quwain</span>
						</h3>
						<p className="font-medium weight-light text-black-add-fig mt-3">
							{isMobileViewDiscover ? (
								<>
									{showFullTextDiscover ? (
										<>
											The best lawyers in Umm Al Quwain are set apart by their exceptional legal expertise, extensive experience, and proven track record of success. With a deep knowledge of local laws and regulations, these Professional experts can handle complex professional issues with precision. They are committed to providing personalized and effective solutions tailored to each client&apos;s unique needs.
											<br />
											At Professional Women United, we select the best lawyers in Umm Al Quwain so that you receive professionalism, dedication, and a relentless pursuit of excellence in all the professional services you need.

										</>
									) : (
										'The best lawyers in Umm Al Quwain are set apart by their exceptional legal expertise, extensive experience, and proven track record of success. With a deep knowledge of local laws and regulations, these Professional experts can handle complex professional issues with precision.'
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
									The best lawyers in Umm Al Quwain are set apart by their exceptional legal expertise, extensive experience, and proven track record of success. With a deep knowledge of local laws and regulations, these Professional experts can handle complex professional issues with precision. They are committed to providing personalized and effective solutions tailored to each client&apos;s unique needs.
									<br />
									At Professional Women United, we select the best lawyers in Umm Al Quwain so that you receive professionalism, dedication, and a relentless pursuit of excellence in all the professional services you need.

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
						<h6 className="text-center p-0">professional issueS</h6>
					</div>
					<h3 className="font-smaller weight-bold social-link">
						What Do clients
						<span className="green-medium-2">
							{' '}
							most frequently <br /> searched for?
						</span>
					</h3>
					<p className="font-medium weight-medium social-link set-text-padding color-frequent set-top-mrgin-mbl">
						Clients often look for Professional Information to find knowledgeable representation and clarity on matters of law. Whether you’re dealing with personal injury claims, Family Professional matters, employment disputes, or real estate issues, we connect you with Professional experts who can provide tailored guidance.
						<br />
						Select the professional issue you&apos;re facing and connect with a legal expert.
					</p>
					<ul className="pt-3 class-add">
						<li>
							<Link href="#">Personal Injury Claims</Link>
						</li>
						<li>
							<Link href="#">Family Professional (Divorce, Child Custody)</Link>
						</li>
						<li>
							<Link href="#">Employment Law</Link>
						</li>
						<li>
							<Link href="#">Real Estate Law (Property Disputes, Tenancy Issues)</Link>
						</li>
						<li>
							<Link href="#">Business Law (Contracts, Corporate Governance)</Link>
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
									How can lawyers
									<span className="green-medium-2"> in Umm Al Quwain</span> help me?
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
												Providing Expert professional advice
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Professionals in Umm Al Quwain offer expert professional advice tailored to your specific situation. They analyze your case thoroughly, explaining your rights and options in clear terms. With their deep understanding of the law, they provide strategic guidance to help you make informed decisions and handle yOur professional matters with confidence.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												Representation in Legal Proceedings
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										Whether you&apos;re facing civil litigation, criminal charges, or administrative hearings, our best lawyers in Umm Al Quwain can represent you effectively in legal proceedings. They use their knowledge of the legal system and courtroom experience to advocate on your behalf, present your case, and work towards achieving the best possible outcome for your situation.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												Negotiating Settlements and Agreements
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										One of the key roles of lawyers in Umm Al Quwain is negotiating settlements and agreements outside of court. They use their negotiation skills and legal expertise to engage in constructive dialogue with opposing parties, aiming to reach mutually acceptable resolutions that suit your interests. By pursuing alternative dispute resolution methods, they help you avoid the time, expense, and uncertainty of litigation.
									</div>
								</div>
								<div className="col-lg-12">
									<div className="titleHow pt-lg-0">
										<div className=" pt-4">
											<h4 className="text-start weight-bold" style={{ color: '#c49073' }}>
												Drafting Legal Documents
											</h4>
										</div>
										<div className="text-start Discover-lawyer" />
										From contracts and agreements to legal pleadings and letters, lawyers in Umm Al Quwain can draft a wide range of legal documents on your behalf. They make sure all documents are meticulously prepared, accurately reflecting your intentions and objectives while adhering to relevant laws and regulations. Whether you&apos;re entering into a business transaction or initiating legal proceedings, our attorneys offer comprehensive document drafting services to support yOur professional needs.
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
													How do I choose the right lawyer for my case?
												</button>
											</h2>
											<div
												id="collapseOne"
												className="accordion-collapse collapse show"
												aria-labelledby="headingOne"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													When selecting a lawyer in Umm Al Quwain through Professional Women United, you’ll want to consider their expertise in your specific legal area, track record of success, and communication style. Review their profile, client reviews, and case history to make sure they meet your needs and expectations.
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
													What types of professional issues can Professional Women United help with?
												</button>
											</h2>
											<div
												id="collapseTwo1"
												className="accordion-collapse collapse"
												aria-labelledby="headingTwo1"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													Professional Women United’s network of attorneys can help with a wide range of legal matters, including Family Professional, real estate transactions, business disputes, employment issues, and more. Our platform connects you with lawyers in Umm Al Quwain who specialize in various practice areas, ensuring comprehensive support for your diverse legal needs.
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
													How much will hiring a lawyer through Professional Women United cost?
												</button>
											</h2>
											<div
												id="collapseThree"
												className="accordion-collapse collapse"
												aria-labelledby="headingThree"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													The cost of hiring a lawyer through Professional Women United depends on the complexity of your case, the lawyer&apos;s experience, and the services required. Many lawyers offer flexible fee structures, including hourly rates, flat fees, and contingency arrangements. Before proceeding with your case, consider discussing the fee structure and payment terms with your chosen lawyer.
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
													What should I expect during my initial consultation with a lawyer?
												</button>
											</h2>
											<div
												id="collapseFour"
												className="accordion-collapse collapse"
												aria-labelledby="headingFour"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													During your initial consultation with a lawyer in Umm Al Quwain, you can expect to discuss the details of your case, your objectives, and any concerns you may have. The lawyer will ask questions to gather relevant information and provide an assessment of yOur professional options. It&apos;s also an opportunity for you to assess whether the lawyer is the right fit for your needs.
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
													What steps should I take to prepare for my initial consultation with a lawyer?
												</button>
											</h2>
											<div
												id="collapseFive"
												className="accordion-collapse collapse"
												aria-labelledby="headingFive"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													To prepare for your initial consultation with a lawyer, gather any relevant documents or information related to your case, including contracts, correspondence, and legal notices. Make a list of questions or concerns you'd like to discuss with the lawyer and be prepared to provide honest and accurate information about your situation. This will help ensure a productive and informative consultation.
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
													How long will it take to resolve my professional issue?
												</button>
											</h2>
											<div
												id="collapseSix"
												className="accordion-collapse collapse"
												aria-labelledby="headingSix"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													The duration of yOur professional matter depends on various factors, including the complexity of the case, the cooperation of involved parties, and the court&apos;s schedule. Your lawyer will provide an estimate based on their experience and familiarity with similar cases. They&apos;ll work diligently to resolve your professional issue efficiently while keeping you informed of any developments along the way.
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
													What if I'm not satisfied with my lawyer&apos;s services?
												</button>
											</h2>
											<div
												id="collapseSeven"
												className="accordion-collapse collapse"
												aria-labelledby="headingSeven"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													If you&apos;re not satisfied with your lawyer&apos;s services, communicate your concerns directly with them to address any issues. If the matter remains unresolved, you can try looking for a second opinion from another lawyer or exploring alternative dispute resolution methods. Professional Women United aims to ensure client satisfaction and can guide in resolving disputes with legal professionals.
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
													How do I know if I need a lawyer for my professional issue?
												</button>
											</h2>
											<div
												id="collapseEight"
												className="accordion-collapse collapse"
												aria-labelledby="headingEight"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													To figure out if you need a lawyer for yOur professional matter, consider the complexity of the issue, the potential consequences involved, and your comfort level with navigating the legal process on your own. Consulting with a lawyer can provide clarity on your rights, options, and the best course of action to take.
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
													What are the benefits of hiring a lawyer compared to representing myself?
												</button>
											</h2>
											<div
												id="collapsenine"
												className="accordion-collapse collapse"
												aria-labelledby="headingnine"
												data-bs-parent="#accordionExample">
												<div className="accordion-body border-0 text-white">
													Hiring a lawyer offers several advantages over representing yourself, including access to legal expertise, familiarity with court procedures, negotiation skills, and the ability to advocate effectively on your behalf. An attorney can also help you avoid common pitfalls and overcome complex professional issues with confidence, potentially leading to favorable outcomes in your case.
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
