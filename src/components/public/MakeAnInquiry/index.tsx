'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MapPinIcon } from '@heroicons/react/20/solid';
import { StarIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { createInquiryWithoutLogin, createInquiryWithLogin, getSingleLawyerDetails } from '../../../../lib/frontendapi';
import { inquieryWithLoginValidation, inquieryWithoutLoginValidation } from '../../../utils/validation';
import { removeSessionData } from '../../../utils/session';
import FormInput from '@/commonUI/FormInput';
import Popup from '@/commonUI/Popup';
import FormTextarea from '@/commonUI/FormTextArea';
import AuthContext from '@/context/AuthContext';
import { getAdminImageSrc180x180, getAdminImageSrc80x80 } from '@/app/[locale]/commonfunctions/commonfunctions';

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	contactNumber: string;
	message: string;
}

interface Props {
	slug?: string;
}

export default function MakeAnInquiry({ slug = '' }: Props) {
	const { user } = useContext(AuthContext)
	const router = useRouter();
	const [inquirySubmited, setinquirySubmited] = useState(false);
	const [isLoggedIn, setisLoggedIn] = useState(false);
	const [user_id, setUserId] = useState('');
	const [userRole, setuserRole] = useState('');
	const [message, setMessage] = useState('');
	const [errors, setErrors] = useState<any>({});
	const [lawyer, setlawyer]: any = useState([]);
	const initialFormData = {
		firstName: '',
		lastName: '',
		email: '',
		contactNumber: '',
		message: ''
	};
	const [formData, setFormData] = useState<FormData>(initialFormData);

	useEffect(() => {
		user?.id ? setUserId(user?.id) : setUserId('');
		user?.role ? setuserRole(user?.role) : setuserRole('');
		user?.id ? setisLoggedIn(true) : setisLoggedIn(false);
		handleSingleLawyerDetails(slug);
		const issue = window.sessionStorage.getItem('legal_issue');
		if (issue) {
			setMessage(issue);
			setFormData({ ...formData, message: issue });
		}
	}, [user]);

	const handleSingleLawyerDetails = async (id: any) => {
		try {
			const res = await getSingleLawyerDetails(id);
			if (res.status == true) {
				setlawyer(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prevData => ({
			...prevData,
			[name]: value
		}));
	};

	const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(event.target.value);
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!isLoggedIn) {
			const validationErrors = inquieryWithoutLoginValidation(formData);
			if (Object.keys(validationErrors).length > 0) {
				setErrors(validationErrors);
				return;
			} else {
				setErrors({});
			}
		} else {
			const validationErrors = inquieryWithLoginValidation(message);
			if (Object.keys(validationErrors).length > 0) {
				setErrors(validationErrors);
				return;
			} else {
				setErrors({});
			}
		}

		const withoutLoginData = {
			inquiry_to_member_id: lawyer.id,
			first_name: formData.firstName,
			last_name: formData.lastName,
			email: formData.email,
			contact_number: formData.contactNumber,
			message: formData.message
		};

		const withLoginData = {
			inquiry_by: user_id,
			inquiry_to: lawyer.id,
			message: message
		};

		if (isLoggedIn) {
			createInquiryWithLogin(withLoginData)
				.then(res => {
					if (res.status === true) {
						setinquirySubmited(true);
					}
				})
				.catch(err => { });
		} else {
			createInquiryWithoutLogin(withoutLoginData)
				.then(res => {
					if (res.status === true) {
						setinquirySubmited(true);
					}
				})
				.catch(err => { });
		}
		removeSessionData('legal_issue');
		setFormData(initialFormData);
		setMessage('');
	};

	const placeholderImgUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/default/${lawyer.gender == 'male' ? 'male-lawyer-306x200.png' : 'female-lawyer-306x200.png'}`;


	return (
		<>
			<section className="blog-section start">
				<div className="container">
					<div className="text-left-line text-start pt-lg-5 mt-5">
						<ul>
							<li>
								<Link href="/" className="unactive">
									Home
								</Link>
							</li>
							<li>
								<Image
									src="/images/legal-service/arrow-right.png"
									alt="right arrow"
									width={15}
									height={15}
								/>
							</li>
							<li>
								<Link href="/find-a-professional" className="unactive">
									Find a professional
								</Link>
							</li>
							<li>
								<Image
									src="/images/legal-service/arrow-right.png"
									alt="right arrow"
									width={15}
									height={15}
								/>
							</li>
							<li>
								<Link href={`/find-a-professional/${lawyer.slug}`} className="unactive">
									{lawyer.full_name}
								</Link>
							</li>
							<li>
								<Image
									src="/images/legal-service/arrow-right.png"
									alt="right arrow"
									width={15}
									height={15}
								/>
							</li>
							<li>
								<Link href={''}>Make an Inquiry</Link>
							</li>
						</ul>
					</div>
				</div>
			</section>

			<section>
				<div className="container">
					<div className="row">
						<div className="col-lg-7 order-lg-0 order-last">
							{isLoggedIn ? (
								<div className="making-inquery">
									<div className="d-none d-lg-block">
										<h4>Make An Inquiry to {lawyer?.first_name
											?.toLowerCase()
											.replace(/\b\w/g, (char: string) => char.toUpperCase())}</h4>
										<p>Please fill out the form below and state the nature of your query.</p>
									</div>
									<form className="" onSubmit={handleSubmit}>
										<FormTextarea
											name="message"
											rows={6}
											className="form-control"
											required
											label={'Your Message'}
											maxLength={1000}
											placeholder="Briefly share your professional issue here..."
											value={message}
											error={errors.message}
											onChange={handleTextAreaChange}
										/>
										<button className="btn-commn w-100 mt-5 mb-5" type="submit">
											<span className="text-white">Submit</span>
										</button>
									</form>
								</div>
							) : (
								<div className="making-inquery">
									<div className="d-none d-lg-block">
										<h4>Make An Inquiry to {lawyer?.first_name
											?.toLowerCase()
											.replace(/\b\w/g, (char: string) => char.toUpperCase())}</h4>
										<p>Please fill out the form below and state the nature of your query.</p>
									</div>
									<form className="" onSubmit={handleSubmit}>
										<FormInput
											type="text"
											placeholder="First Name"
											name="firstName"
											value={formData.firstName}
											error={errors.firstName}
											label={'First Name*'}
											maxLength={100}
											onChange={handleFormChange}
										/>
										<FormInput
											type="text"
											placeholder="Last Name*"
											name="lastName"
											value={formData.lastName}
											error={errors.lastName}
											label={'Last Name*'}
											maxLength={100}
											onChange={handleFormChange}
										/>
										<FormInput
											type="email"
											placeholder="Email Address*"
											name="email"
											value={formData.email}
											error={errors.email}
											label={'Email*'}
											maxLength={100}
											onChange={handleFormChange}
										/>
										<FormInput
											type="tel"
											placeholder="Contact Number*"
											name="contactNumber"
											value={formData.contactNumber}
											error={errors.contactNumber}
											label={'Contact Number*'}
											maxLength={100}
											onChange={handleFormChange}
										/>
										<FormTextarea
											name="message"
											value={formData.message}
											className="form-control"
											label={'Your Message'}
											maxLength={1000}
											rows={6}
											onChange={handleFormChange}
											required
											error={errors.message}
											placeholder="Briefly share your professional issue here..."
										/>
										<button type="submit" className="btn-commn w-100 mt-5 mb-5">
											Submit
										</button>
									</form>
								</div>
							)}
						</div>
						<div className="col-lg-5 order-lg-0 order-first">
							<div className="">
								<div className="d-block d-lg-none making-inquery">
									<h4>Make An Inquiry to {lawyer?.first_name
										?.toLowerCase()
										.replace(/\b\w/g, (char: string) => char.toUpperCase())}</h4>
									<p>Please fill out the form below and state the nature of your query.</p>
								</div>
								<div className="profile-data">
									<div className="row">
										<div className="col-3">
											<div className="profile-user">
												<Image
													src={getAdminImageSrc80x80(lawyer?.profile_image, lawyer.gender)}
													// src={
													// 	getAdminImageSrc180x180(lawyer?.profile_image, lawyer.gender)
													// 	|| "/images/female-lawyer-180x180.png"
													// }
													alt={lawyer.full_name}
													width={180}
													height={180}
													layout="responsive"
													className=" m-img-fixed"
													style={{ borderRadius: '10px' }}
												/>
												{/* <div style={{
													backgroundImage: `url(${getLawyerImageSrc180x180(lawyer?.profile_image, lawyer.gender)})`,
													backgroundSize: 'contain',
													backgroundRepeat: 'no-repeat',
													backgroundPosition: 'center',
													width: '120px',
													height: '90px', // Adjust height as needed
													borderRadius: '10px' // Adjust the border radius as needed
												}}>
												</div> */}
											</div>
										</div>
										<div className="col-9">
											<div className="row">
												<div className="col-12">
													<div className="data-profile-user">
														<Link href={`/find-a-professional/${slug}`} target="_blank">
															<h3>{lawyer?.full_name
																?.toLowerCase()
																.replace(/\b\w/g, (char: string) => char.toUpperCase())}</h3>
														</Link>
													</div>
												</div>
											</div>
											<div className="row">
												<div className="col-lg-12">
													<div className="company-detail">
														{/* <p>
															{lawyer.designation}
														</p> */}
														{lawyer?.designation && (
															<span style={{ fontWeight: '600', fontSize: '20px' }}>{lawyer?.designation}</span>
														)}{' '}
														{/* {lawyer?.firm_name && lawyer.firm_name.length > 0 ? (
															<span className="location-move-set">
																at {' '} <Link href={`/firms/${lawyer?.firm_slug}`} style={{ color: '#02142d', fontSize: '14px', fontWeight: '600' }}>{lawyer.firm_name}</Link>
															</span>
														) : ""} */}
														{lawyer.location_name && (
															<p>
																<MapPinIcon
																	width={20}
																	height={20}
																	style={{ marginRight: '4px' }}
																/>
																{lawyer.location_name}
															</p>
														)}
														{lawyer.avg_rating_and_reviews && (
															<p>
																<StarIcon width={20} height={20} />
																{lawyer.avg_rating_and_reviews}
															</p>
														)}
														<div className="atypebtn mt-2 text-start">
															<div className="d-flex">
																{lawyer.service_name && (
																	<p>{lawyer.service_name} Profession</p>
																)}
																{lawyer.license_for_years && (
																	<p>Licensed for {lawyer.license_for_years} years</p>
																)}
															</div>
															{lawyer.consultation_duration && (
																<p className="m-0">
																	Free Consultation: {lawyer.consultation_duration}
																</p>
															)}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Popup show={inquirySubmited} size="sm" footer={false} onCancel={() => setinquirySubmited(false)}>
				<div className="modal-body">
					<div className="check-ani text-center mb-3">
						<img src="/images/ani.png" alt="ani" className="fa-spin" />
						<img src="/images/check.png" alt="ani" className="check-ani-img" />
					</div>
					<h5 className="modal-title f-22 weight-bold social-link mb-4 text-center" id="exampleModalLabel">
						{' '}
						Your Inquiry was submitted.
					</h5>
					<p className="font-medium social-link weight-light text-center mb-3">
						This professional typically responds in 48 hours. Go to your dashboard to see updates.{' '}
					</p>

					{user && user?.role === 'enduser' && (

						<Link href={`/${userRole === 'enduser' ? 'user' : userRole}/dashboard`}>
							<button className="btn-primary mb-2 w-100">Go to Dashboard</button>
						</Link>
					)}
					<Link href={'/'}>
						<button className="btn-secondary w-100">Go Home</button>
					</Link>
				</div>
			</Popup>
		</>
	);
}
