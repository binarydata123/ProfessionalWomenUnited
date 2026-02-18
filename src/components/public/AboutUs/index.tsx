'use client';
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import UpperFooter from '@/components/public/UpperFooter';
import Testimonial from '@/components/public/Testimonial/page';
import AuthContext from '@/context/AuthContext';
import { log } from 'console';

export default function AboutUs() {
	const { locale } = useContext(AuthContext)
	const [isFixed, setIsFixed] = useState(false);
	const [srollcount, setScrolCount] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const threshold = 600;
			const scrollY = window.scrollY;

			if (scrollY <= threshold) {
				setIsFixed(true);
			} else {
				setIsFixed(false);
				setScrolCount(0);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		window.addEventListener('scroll', listenToScroll);
		return () => window.removeEventListener('scroll', listenToScroll);
	}, []);

	const listenToScroll = () => {
		const heightToHideFrom = 5;
		const winScroll = window.scrollY;

		if (winScroll > heightToHideFrom) {
			isVisible && setIsVisible(false);
		} else {
			setIsVisible(true);
		}
	};

	return (
		<>
			<div id="main-div" className={`${locale} pb-0`}>
				<section className="about-banner parent-container pb-0">
					<div
						className="sticky-element"
						style={{
							position: isFixed ? 'fixed' : 'absolute',
							width: '100%',
							transition: ' position  0.5s ease-in-out'
						}}
					>
						<div className="container">
							<div className="row">
								<div className="col-12 col-lg-8">
									<h1 className="font-larger weight-bold social-link mt-5 mobile-m-0 ">
										{/* Connect{isVisible ? 'ing you to' : ''} */}
										Connecting You with
										<br />
										<span className="green-medium-2 ">
											{/* Legal {isVisible ? 'experts' : ''}. */}
											Trusted Professionals

										</span>
									</h1>
									<p className="weight-bold social-link font-medium mt-4">
										At Professional Women United, our mission is simple: to connect individuals and businesses with reliable, experienced professionals who can deliver real results.
									</p>

									<div className="lawyers-online-img  mt-4 mb-4">
										<ul>
											<li>
												<Image
													src="/images/Home/Frame1.png"
													alt="notif-img-boy"
													width={39}
													height={39}
												/>
											</li>
											<li>
												<Image
													src="/images/Home/Frame2.png"
													alt="notif-img-boy"
													width={39}
													height={39}
												/>
											</li>
											<li>
												<Image
													src="/images/Home/Frame3.png"
													alt="notif-img-boy"
													width={39}
													height={39}
												/>
											</li>
											<li>
												<Image
													src="/images/Home/Frame4.png"
													alt="notif-img-boy"
													width={39}
													height={39}
												/>
											</li>
											<li>
												<Image
													src="/images/Home/Frame5.png"
													alt="notif-img-boy"
													width={39}
													height={39}
												/>
											</li>
											<li className="position-growing">
												250+ Professionals & Growing
												<div className="blinking"></div>
											</li>
											{/* <li>
												<div className="lawyers-online">
													<h4 className="d-flex align-items-center gap-1">
														4700+ <span> Cases Resolved</span>
													</h4>
												</div>
											</li> */}
										</ul>
									</div>

									<div
										className="about-btn-two mt-2"
										style={srollcount ? { visibility: 'hidden' } : { visibility: 'visible' }}
									>
										<button className="btn-get-free btn-commn  w-100-percentue">
											<span className="text-white">
												<Link href="/auth/create-profile/?role=professional" style={{ color: 'white' }}>
													Join As Professional
												</Link>
											</span>
										</button>
										<button className={`${locale == 'ar' ? 'btn-get-free btn-commn ml-2 set-top-btn-about set-abt-btn' : 'btn-get-free btn-commn ml-2 set-top-btn-about'}`}>
											<span className="text-white">
												<Link href="/find-a-professional" style={{ color: 'rgb(196,144,115)' }}>
													Find A Professional
												</Link>
											</span>
										</button>
									</div>
								</div>
								<div className="col-sm-4 text-right tab-center d-none d-lg-block">
									<img
										src="/images/about-us/banner.png"
										alt="about-img-banner"
										className="banner-img effect"
									/>

								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="why-join" id="your-section-id">
					<div className="container">
						<div className="row">
							<div className="col-lg-6" id="our-heading">
								<h2 className="font-smaller weight-bold text-white">
									Our <span>Story</span>
								</h2>
							</div>
							<div className="col-lg-6">
								<div className="our-story-text">
									<p>
										{/* Established in 2014, our company is a professional advice platform that connects
										clients with top-rated professionals across the USA. With our user-friendly platform,
										clients can easily find and connect with experienced professionals, while professionals can
										efficiently manage their practice and expand their client base. */}
										our story- Founded in 2025, Professional Women United is a new organization with a simple vision—to make it easy for consumers to find expert women professionals in their city. We have already grown into a community of more than 250 experienced experts, helping over 4,700 clients across the USA achieve clarity, overcome challenges, and move forward with confidence. Our platform serves both sides of the journey: clients gain quick access to top-rated professionals they can rely on, while professionals get recognized for being the best in their respective city and profession. They also benefit from tools that help them expand their reach and manage their practice with ease. At Professional Women United, we are more than a platform—we are a network where knowledge meets opportunity and meaningful connections drive real results.
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="find-the-right">
					<div className="container">
						<div className="row g-3 align-items-center">
							<div className="col-lg-6">
								<div className="find-text">
									<h2>
										Find the right <br /> Professional...
									</h2>
									<p>
										{/* Are you looking for a{' '}
										<Link className="underlineClass" href="/find-a-professional">
											professional consultant in Usa{' '}
										</Link> */}
										Looking for trusted guidance to move forward with confidence? At Professional Women United, we make it easy to connect with experienced consultants across the USA. Whether you need advice for your business, career, finances, or personal growth, our network of experts is here to support you every step of the way.
										<br></br>
										With just a few clicks, you can find the perfect professional who understands your needs and is ready to help you achieve your goals.

									</p>
									<Link href={'/find-a-professional'}>
										<button className="btn-commn">Find A Professional</button>
									</Link>
								</div>
							</div>
							<div className="col-lg-6 d-none d-lg-block">
								<img src="/images/about-us/image1.jpg" alt=" Find the right" className="effect" />
							</div>
						</div>
					</div>
				</section>
				<section id="find-the-right">
					<div className="container">
						<div className="row g-3 align-items-center">
							<div className="col-lg-6 d-none d-lg-block">
								<img src="/images/about-us/image2.jpg" alt="or the right client" className="effect" />
							</div>
							<div className="col-lg-6">
								<div className="find-text cover-padding">
									<h2>Or the right client...</h2>
									<p className="p-0">
										{/* If you are a professional looking to put your knowledge into practice, this is the
										ideal place for you.{' '}
										<Link className="underlineClass" href="/">
											Professional Women United
										</Link>{' '}
										is the space were you can find users looking for professional advice in real time. Make
										the most out of your expertise and find the ideal clients to support here. */}
										Ready to put your expertise into action? This is the place to connect directly with people actively looking for professional advice. Showcase your skills, grow your practice, and build meaningful client relationships—all in real time.

									</p>
									<Link href="/auth/create-profile/?role=professional">
										<button className="btn-commn">Join As Professional</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>
				<Testimonial />
				<section className="faq-part">
					<div className="container">
						<div className="row">
							<div className="col-lg-12 col-xl-7 col-md-12">
								<p className="font-x-small green-medium-2 weight-bold mb-2">FAQs</p>
								<h2 className="font-smaller text-black  weight-bold mb-4">
									Got Questions? <br />
									<span className="green-medium-2"> We have answers.</span>
								</h2>
								<div className="accordion mt-5" id="accordionExample">
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingOne">
											<button
												className="accordion-button"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseOne"
												aria-expanded="true"
												aria-controls="collapseOne"
											>
												How do I sign up as a professional?
											</button>
										</h2>
										<div
											id="collapseOne"
											className="accordion-collapse collapse show"
											aria-labelledby="headingOne"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body border-0">
												Membership is by invitation only and is strictly reserved for the professional women that have been selected as the best in their respective city and profession. If you have received an invitation then, go to our “For Professionals” section and create your Professional Women United account. Setting up a professional expert profile only takes a few minutes. Once your profile is ready, you can start providing support to individuals in need.

											</div>
										</div>
									</div>
									{/* <div className="accordion-item">
										<h2 className="accordion-header" id="headingTwo">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseTwo"
												aria-expanded="false"
												aria-controls="collapseTwo"
											>
												What are the fees associated with using the platform?
											</button>
										</h2>
										<div
											id="collapseTwo"
											className="accordion-collapse collapse"
											aria-labelledby="headingTwo"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body border-0">
												Fees may vary depending on the type of consultation or service offered. Professionals are encouraged to review our fee structure when setting up their profile. For more detailed information, you can contact our support team.
											</div>
										</div>
									</div> */}
									<div className="accordion-item">
										<h2 className="accordion-header" id="headingThree">
											<button
												className="accordion-button collapsed"
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseThree"
												aria-expanded="false"
												aria-controls="collapseThree"
											>
												How are client requests assigned to professionals?
											</button>
										</h2>
										<div
											id="collapseThree"
											className="accordion-collapse collapse"
											aria-labelledby="headingThree"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body border-0">
												Client requests are matched based on your expertise, availability, and the specific needs of the client. This ensures that each client receives support from the most suitable professional.
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
												aria-controls="collapsefour"
											>
												How can I update my profile information?
											</button>
										</h2>
										<div
											id="collapsefour"
											className="accordion-collapse collapse"
											aria-labelledby="headingThree"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body border-0">
												You can update your profile information at any time by logging into your Professional Women United account and navigating to the “Edit Profile” section. Keep your information up to date to ensure clients have the most accurate details about your services.
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
												aria-controls="collapseFive"
											>
												How do I nominate a professional woman for membership?
											</button>
										</h2>
										<div
											id="collapseFive"
											className="accordion-collapse collapse"
											aria-labelledby="headingFive"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body border-0">
												Please email all nominations to:&nbsp;
												<a href="mailto:nominate@professionalwomenunited.com" style={{ color: '#153060' }}>
													nominate@professionalwomenunited.com
												</a>											</div>
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
												aria-controls="collapseSix"
											>
												What are the fees associated with using the platform?
											</button>
										</h2>
										<div
											id="collapseSix"
											className="accordion-collapse collapse"
											aria-labelledby="headingSix"
											data-bs-parent="#accordionExample"
										>
											<div className="accordion-body border-0">
												We never charge the public for using our platform to find the best woman professionals in their area.
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-12 col-xl-5 col-md-12">
								<img src="/images/young-professional-woman-seated-with-a-smile-in-an-office.jpg" alt="faq-img" className="mt-5 m-none effect abt-womn-pic" />
							</div>
						</div>
					</div>
				</section>

				<section className="questions-part">
					<div className="container">
						<div className="row">
							<div className="col-lg-7 d-none d-lg-block">
								<img src="/images/section-image.svg" alt="questions-part" />
							</div>
							<div className="col-lg-5 text-right">
								<div className="still">
									<h3 className="font-xxx-large weight-bold text-white">Still have questions?</h3>
									<p className="font-medium weight-light text-white mt-3">
										If you have any additional questions or need assistance with signing up, our support team is here to help. Don’t hesitate to reach out—we’re always happy to assist you!
									</p>
									<Link href={'/contact-us'}>
										<button className="bg-893168 weight-semi-bold font-small icon-big mt-4 transtion">
											<Image
												src="/images/about-us/message-text.png"
												width={24}
												height={24}
												alt="Still have questions?"
												style={{ marginRight: '12px' }}
											/>{' '}
											Contact Us
										</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</section>
				<div className="mt-5 pt-3">
					<UpperFooter />
				</div>
			</div>
		</>
	);
}
