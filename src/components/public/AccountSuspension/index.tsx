'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Popup from '@/commonUI/Popup';
import FormTextarea from '@/commonUI/FormTextArea';
import FormInput from '@/commonUI/FormInput';
import { supportValidation } from '@/utils/validation';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';
import { storeSupportMessage } from '../../../../lib/frontendapi';

export default function AccountSuspension() {
	const [disagreeDecisionModal, setdisagreeDecisionModal] = useState(false);
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
	const [errors, seterrors]: any = useState({});
	const initialData = {
		member_type: 'professional',
		name: '',
		email: '',
		message: ''
	};
	const [formData, setformData] = useState(initialData);

	const handleFormSubmit = (e: any) => {
		e.preventDefault();
		const validateData = supportValidation(formData);
		if (Object.keys(validateData).length > 0) {
			seterrors(validateData);
			return;
		} else {
			seterrors({});
		}
		if (recaptchaValue) {
			storeSupportMessage(formData).then(res => {
				if (res.status === false) {
					toast.error(res.message);
				} else {
					setformData(initialData);
					toast.success(res.message);
				}
			});
		} else {
			toast.info('Please complete the recaptcha verification');
		}
	};
	return (
		<>
			<section id="accountsuspension">
				<div className="container">
					<div className="text-center">
						<div className="em" id="accountsuspension-box">
							<h3>Your account has been suspended.</h3>
							<p>
								We suspend accounts that violate our <span> Community Guidelines.</span>{' '}
							</p>
							<div className="hr-line"></div>
							<h4>What this means?</h4>
							<p>
								Your profile will not be visible to other people on Professional Women United from now, and you
								cannot use it.
							</p>
							<h4>What can you do?</h4>
							<p>
								You have 90 days left to disagree with our decision. We may require some information to
								review your account again.
							</p>
							<button
								className="btn-commn w-100"
								data-bs-toggle="modal"
								data-bs-target="#exampleModal"
								type="button"
								onClick={() => setdisagreeDecisionModal(true)}
							>
								Disagree with decision
							</button>
						</div>
					</div>
				</div>
			</section>
			<div>
				<Popup
					show={disagreeDecisionModal}
					onCancel={() => setdisagreeDecisionModal(false)}
					onOk={() => setdisagreeDecisionModal(false)}
					size="sm"
				>
					<div className="row">
						<div className="col-lg-6 d-none d-lg-block">
							<div className="account-image">
								<Image
									src="/images/center-img.png"
									alt="Appeal Account"
									layout="responsive"
									width={1440}
									height={890}
								/>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="appeal-account-suspension">
								<h4>
									Appeal Account <span>Suspension</span>
								</h4>
								<p>We're here to support and assist you every step of the way</p>
								<form className="making-inquery" onSubmit={handleFormSubmit}>
									<label htmlFor="" className="pb-4">
										I’m a
									</label>
									<div className="d-flex">
										<div className="form-check">
											<input
												className="form-check-input p-0"
												type="radio"
												name="flexRadioDefault5"
												id="flexRadioDefault5"
												checked={formData.member_type === 'professional' ? true : false}
												onClick={() => setformData({ ...formData, member_type: 'professional' })}
											/>
											<label className="form-check-label pt-0" htmlFor="flexRadioDefault5">
												Professional
											</label>
										</div>
										<div className="form-check" style={{ marginLeft: '20px' }}>
											<input
												className="form-check-input p-0"
												type="radio"
												name="flexRadioDefault6"
												id="flexRadioDefault6"
												checked={formData.member_type === 'user' ? true : false}
												onClick={() => setformData({ ...formData, member_type: 'user' })}
											/>
											<label className="form-check-label pt-0" htmlFor="flexRadioDefault6">
												User
											</label>
										</div>
									</div>
									<FormInput
										type="text"
										label={'Name*'}
										error={errors.name}
										value={formData.name}
										className="form-control"
										maxLength={100}
										placeholder="First Name"
										onChange={(e: any) => setformData({ ...formData, name: e.target.value })}
									/>
									<FormInput
										type="email"
										label={'Email*'}
										value={formData.email}
										error={errors.email}
										className="form-control"
										maxLength={100}
										placeholder="emailid@email.com"
										onChange={(e: any) => setformData({ ...formData, email: e.target.value })}
									/>
									<FormTextarea
										name=""
										label={'Your Message'}
										value={formData.message}
										className="form-control"
										error={errors.message}
										maxLength={100}
										onChange={e => setformData({ ...formData, message: e.target.value })}
										placeholder="Let us know how we can help you..."
									/>
									<div className="teams">
										<span>
											By clicking on Submit you accept the <a href="#">Terms of use</a>{' '}
										</span>
									</div>
									<div className="form-group">
										<label htmlFor="exampleInputEmail1" className="pb-2 pt-2">
											Please check the box below to proceed*
										</label>
									</div>
									<ReCAPTCHA
										sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
										onChange={(value: any) => setRecaptchaValue(value)}
									/>
									<button
										type="submit"
										className="w-100 btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 mt-5 mb-lg-0 mb-5"
									>
										<span>Submit</span>
										<span className="border border-radius-1 banner-arrow-btn">
											<ChevronRightIcon width={20} color={'#fff'} />
										</span>
									</button>
								</form>
							</div>
						</div>
					</div>
				</Popup>
			</div>
		</>
	);
}
