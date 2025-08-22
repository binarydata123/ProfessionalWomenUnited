'use client';
import React, { useContext, useEffect, useState } from 'react';
import './ask-a-lawyer.css';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { askAlawyer, getAllServices } from '../../../../lib/frontendapi';
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import FormTextarea from '@/commonUI/FormTextArea';
import FormInput from '@/commonUI/FormInput';
import { getSessionData, setRedirectUrl, setSessionData } from '@/utils/session';
import AuthContext from '@/context/AuthContext';
import Cookies from 'js-cookie';

interface Props {
	slug?: string;
}

export default function AskAlawyer({ slug = '' }: Props) {
	const { user } = useContext(AuthContext)
	const searchParams = useSearchParams();
	const [tag_id, settagId]: any = useState(searchParams.get('tag_id'));
	const [legalIssueService, setlegalIssueService] = useState('');
	const [services, setservices]: any = useState([]);
	const router = useRouter();

	const initialFormData: any = {
		question: '',
		service: slug,
		description: '',
		hire_a_lawyer: 'yes',
		user_id: user?.id,
		tag_id: tag_id
	};

	const [formData, setFormData] = useState(initialFormData);
	const [errors, seterrors]: any = useState({});

	const handleInputChange = (event: any) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleLegalIssue = (e: any = null) => {
		const question = getSessionData('ask_a_lawyer');
		if (question) {
			setFormData(question);
		}
		const issue = window.sessionStorage.getItem('legal_issue');
		if (issue) {
			setFormData({ ...formData, description: issue });
		}
	};

	useEffect(() => {
		handleLegalIssue();
		handleServices();
	}, []);

	const handleSubmit = (e: any) => {
		e.preventDefault();
		if (!formData.question) {
			seterrors({});
			seterrors({ question: 'Please provide your question.' });
			return;
		}
		if (!formData.service) {
			seterrors({});
			seterrors({ service: 'Please provide your service.' });
			return;
		}
		if (!formData.description) {
			seterrors({});
			seterrors({
				description: 'Please provide a description for your question.'
			});
			return;
		}

		if (!user?.id) {
			const questionData = JSON.stringify(formData);
			setSessionData('ask_a_lawyer', questionData);
			setRedirectUrl('ask_a_lawyer_url');
			router.push('/auth/login');
			toast.info('Please login your account!');
			return;
		}
		askAlawyer(formData).then(res => {
			toast.success(res.message);
			setFormData(initialFormData);
			seterrors({});
			Cookies.remove('ask_a_lawyer');
		});
	};

	const handleServices = () => {
		getAllServices().then(res => {
			setservices(res.data);
		});
	};

	return (
		<>
			<div className="main-section pt-4">
				<div className="container">
					<h5>Ask a Professional</h5>
					<div className="ask-a-lawyer">
						<div className="text-center">
							<h1>Ask A Professional</h1>
							<p>
								Get the conversation rolling. Describe your professional issue & seek solutions from legal
								experts.
							</p>
							<div className="line-hr"></div>
						</div>
						<div className="main-accordian">
							<div className="accordion border-0" id="accordionExample">
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
											<div className="accordian-tabs-class">
												<h6>Our Process & Tips</h6>
											</div>
										</button>
									</h2>
									<div
										id="collapseOne"
										className="accordion-collapse collapse"
										aria-labelledby="headingOne"
										data-bs-parent="#accordionExample"
									>
										<div className="accordion-body border-0">
											<h3>Our Process</h3>
											<ul>
												<li>Ask your question - it’s FREE. </li>
												<li>After review, your question will be live. </li>
												<li>Get notified when a lawyer responds</li>
											</ul>
											<h3>Tips</h3>
											<h6>Be specific</h6>
											<p>
												Clearly explain the actions taken or not taken by the lawyer in your
												case.
											</p>
											<h6>Stick to the facts</h6>
											<p>Questions containing unsupported accusations will not be approved.</p>
											<h6>Protect your privacy</h6>
											<p>Avoid sharing any personally identifiable information.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="legal-issue">
							<form onSubmit={handleSubmit}>
								<FormInput
									type="text"
									name="question"
									label={'Ask your question*'}
									value={formData.question}
									onChange={handleInputChange}
									className="form-control"
									maxLength={100}
									error={errors.question}
									placeholder="We suggest starting your questions with “How”, “What”, “Why”, “When”, “Can I...”, “Do I...” or “Will I...”"
								/>{' '}
								<br />
								{slug === '' && (
									<div className="pt-1 mb-4" id="edit-connect">
										<label htmlFor="" className={`${errors.service ? 'error-text' : ''}`}>
											Select your issue type*
										</label>
										<div>
											<div className="dropdown w-100">
												<button
													className={`dropdown-toggle ${errors.service ? 'error-input' : ''}`}
													type="button"
													id="dropdownMenuButton1"
													data-bs-toggle="dropdown"
													aria-expanded="false"
												>
													<span
														className={`dropdown-toggle text-capitalize ${formData.service !== '' ? 'text-dark' : ''
															}`}
													>
														{formData.service || 'Choose an issue'}
													</span>
												</button>
												<Image
													src="/images/legal-service/Vector.png"
													alt="Vector-image"
													width={20}
													height={20}
												/>
												<p className="text-danger text-start p-0">{errors.service}</p>
												<ul
													className="dropdown-menu shadow-lg"
													aria-labelledby="dropdownMenuButton1"
												>
													{services &&
														services.map((service: any, index: number) => (
															<li
																className={`p-2 ${legalIssueService !== '' ? 'text-dark' : ''
																	}`}
																onClick={() =>
																	setFormData({
																		...formData,
																		service: service.slug
																	})
																}
															>
																{service.name}
															</li>
														))}
												</ul>
											</div>
										</div>
									</div>
								)}
								<FormTextarea
									className="form-control"
									label={'Describe your professional issue*'}
									rows={6}
									name="description"
									error={errors.description}
									value={formData.description}
									onChange={handleInputChange}
									maxLength={2000}
									placeholder="Be specific, clearly define what your professional issue is and avoid sharing personally identifiable information..."
								/>
								<br />
								<label htmlFor="">Do you plan on hiring a lawyer for this issue?*</label>
								<div className="there-check-box d-flex align-items-center">
									<div className="form-check form-check-inline d-flex align-items-center">
										<input
											className="form-check-input"
											type="radio"
											value={'yes'}
											name={'hire_a_lawyer'}
											onChange={handleInputChange}
											id="inlineRadio1"
											defaultValue="option1"
											checked={formData.hire_a_lawyer === 'yes' ? true : false}
										/>
										<br />
										<label className="form-check-label" htmlFor="inlineRadio1">
											Yes
										</label>
									</div>
									<div className="form-check form-check-inline d-flex align-items-center">
										<input
											className="form-check-input"
											type="radio"
											value={'no'}
											name={'hire_a_lawyer'}
											onChange={handleInputChange}
											id="inlineRadio2"
											defaultValue="option2"
											checked={formData.hire_a_lawyer === 'no' ? true : false}
										/>
										<label className="form-check-label" htmlFor="inlineRadio2">
											No
										</label>
									</div>
									<div className="form-check form-check-inline d-flex align-items-center">
										<input
											className="form-check-input"
											type="radio"
											id="inlineRadio3"
											value={'maybe'}
											name={'hire_a_lawyer'}
											onChange={handleInputChange}
											defaultValue="option3"
											checked={formData.hire_a_lawyer === 'maybe' ? true : false}
										/>
										<label className="form-check-label" htmlFor="inlineRadio3">
											Maybe
										</label>
									</div>
								</div>
								<button
									type="submit"
									className=" btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 mt-5"
								>
									<span className="text-white">Continue</span>
									<span className="border border-radius-1 banner-arrow-btn">
										<ChevronRightIcon width={20} color={'#fff'} />
									</span>
								</button>
							</form>
						</div>
						<div className="privacy-policy mb-5">
							<span>
								Questions are posted anonymously on Professional Women United. By clicking on ‘Continue’
								<br /> you agree to our{' '}
								<Link href="#" style={{ textDecoration: 'underline', color: '#CCCCCC' }}>
									Terms of Service
								</Link>{' '}
								&{' '}
								<Link href="#" style={{ textDecoration: 'underline', color: '#CCCCCC' }}>
									Privacy Policy
								</Link>{' '}
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
