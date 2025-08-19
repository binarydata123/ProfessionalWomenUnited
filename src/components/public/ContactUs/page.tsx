'use client';
import Image from 'next/image';
import React, { useContext, useState } from 'react';
import './contect-us.css';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-toastify';
import { contactUsStore } from '../../../../lib/frontendapi';
// import { ContactUsValidation } from '../../../app/[locale]/utils/validation';
import FormInput from '@/commonUI/FormInput';
import FormTextarea from '@/commonUI/FormTextArea';
import AuthContext from '@/context/AuthContext';
import { useTranslations } from 'next-intl';


export default function ContactUs() {
	const t = useTranslations('Index');
	const { user } = useContext(AuthContext)
	const [errors, seterrors]: any = useState({});
	const initialFormData = {
		user_id: user?.id,
		user_is: '',
		name: '',
		email: '',
		message: ''
	};
	const [contactUsData, setcontactUsData] = useState(initialFormData);

	const handleInputChange = (event: any) => {
		const { name, value } = event.target;
		setcontactUsData({
			...contactUsData,
			[name]: value
		});
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		const validateData = ContactUsValidation(contactUsData);
		if (Object.keys(validateData).length > 0) {
			seterrors(validateData);
			return;
		}

		contactUsStore(contactUsData).then(res => {
			toast.success(res.message);
			setcontactUsData(initialFormData);
			seterrors({});
		});
	};

	const ContactUsValidation = (data: any) => {

		const errors: any = {};
		const { name, email, message } = data;

		if (!name) {
			errors.name = t('errNAme');
		} else if (/[^a-zA-Z\s]/.test(name)) {
			errors.name = 'Name should only contain letters and spaces';
		}

		if (!email) {
			errors.email = t('errEmail');
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			errors.email = 'Invalid email format';
		}

		if (!message) {
			errors.message = t('errMessage');
		} else if (/[^a-zA-Z]/.test(message)) {
			errors.message = 'Message should only contain letters';
		}
		return errors;
	};


	return (
		<>
			<div className="contect pt-4" id="contect-main">
				<div className="container">
					<h5>{t('contact_us')}</h5>
					<div className="row align-items-center g-5">
						<div className="col-lg-6">
							<div className="contect-us">
								<h6>{t('your_questions_matter')}</h6>
								<h1>
									<span> {t('contact_us')} </span>
									{/* Us */}
								</h1>
								<p className="pb-5">{t('supoortext')}</p>
								<label htmlFor="" className="mb-3">
									{t('ima')}
								</label>
								<form onSubmit={handleSubmit} className="contact-form">
									<div className="there-check-box">
										<div className="form-check form-check-inline">
											<input
												className="form-check-input"
												type="radio"
												name="user_is"
												value={'lawyer'}
												id="inlineRadio1"
												defaultValue="option1"
												onChange={handleInputChange}
											/>
											<label className="form-check-label mx-2" htmlFor="inlineRadio1">
												Professional
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												className="form-check-input"
												type="radio"
												name="user_is"
												value={'individual'}
												onChange={handleInputChange}
												id="inlineRadio2"
												defaultValue="option2"
											/>
											<label className="form-check-label" htmlFor="inlineRadio2">
												{t('individual')}
											</label>
										</div>
									</div>
									<FormInput
										type="text"
										placeholder={t('first_name')}
										onChange={handleInputChange}
										name="name"
										label={t('full_name')}
										value={contactUsData.name}
										error={errors.name}
										className="form-control"
										maxLength={50} />
									<FormInput
										type="email"
										placeholder={t('email_example')}
										className="form-control"
										// label={'Email*'}
										label={t('email')}
										value={contactUsData.email}
										error={errors.email}
										onChange={handleInputChange}
										name="email"
										maxLength={100} />

									<FormTextarea
										className="form-control"
										rows={6}
										name="message"
										// label={'Your Message*'}
										label={t('your_message')}
										onChange={handleInputChange}
										error={errors.message}
										maxLength={1000}
										value={contactUsData.message}
										placeholder={t('let_us_know')} />
									<p className="mt-4 set-term-use">{t('terms_of_use')}</p>
									<div>
										<button
											type="submit"
											className=" w-100 btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 mt-5"
										>
											<span className="text-white">{t('submit')}</span>
											<span className="border border-radius-1 banner-arrow-btn">
												<ChevronRightIcon width={20} color={'#fff'} />
											</span>
										</button>
									</div>
								</form>
							</div>
						</div>
						<div className="col-lg-6 d-none d-lg-block">
							<div>
								<img src="/images/contact/contact.png" alt="contact image" className="effect" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container" id="main-box-contact">
				<div className="row pt-5">
					<div className="col-lg-4 text-lg-start text-center">
						<div className="contact-box">
							<Image
								src="/images/contact/sms.png"
								alt="contact@connectlegal.com"
								width={40}
								height={40}
							/>
							<h5>{t('write_to_us')}</h5>
							<a href="mailto:wisuva@mailinator.com">
								{' '}
								<p>contact@profesionalwomen.com</p>
							</a>
						</div>
					</div>
					<div className="col-lg-4 text-lg-start text-center">
						<div className="contact-box pl-lg-2">
							<Image src="/images/contact/call-calling.png" alt="contact-number" width={40} height={40} />
							<h5>{t('talk_to_us')}</h5>
							<a href="tel:+97143316688">
								{' '}
								<p>+159654894564</p>
							</a>
						</div>
					</div>
					<div className="col-lg-4 text-lg-start text-center">
						<div className="contact-box border-none pl-2">
							<Image src="/images/contact/location.png" alt="contact-address" width={40} height={40} />
							<h5>{t('visit_us')}</h5>
							<a href="https://goo.gl/maps/7hfKjBNd8t5vuLej8" target="blank">
								{' '}
								<p>804, City Tower 2, willaim Road, USA</p>
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
