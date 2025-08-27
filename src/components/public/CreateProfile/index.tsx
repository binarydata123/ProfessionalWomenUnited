"use client"
import { useState, useEffect } from 'react'; // Import useState
import { ArrowSmallLeftIcon, EyeSlashIcon, EyeIcon } from '@heroicons/react/20/solid';
import ReCAPTCHA from 'react-google-recaptcha';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { userregister, googleRegister } from '../../../../lib/frontendapi';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';


interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export default function CreateProfile() {

	const router = useRouter();
	const [formData, setFormData] = useState<FormData>({
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	});

	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [showPassword, setShowPassword] = useState(false);
	const [role, setRole] = useState('');
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { data: session } = useSession();

	useEffect(() => {
		const user_role = window.sessionStorage.getItem('temp_user_role');

		if (!user_role) {
			router.push('/auth/choose-profile');
		} else {
			user_role ? setRole(user_role) : setRole('');
		}
		if (session) {
			SocialData(session.user, 'google');
		}
	}, [session]);

	const SocialData = (user: any, type: any) => {
		const data = {
			first_name: user.name,
			email: user.email,
			role: role
		};
		googleRegister(data)
			.then(res => {
				if (res.status == true) {
					const token = res.data.token;
					Cookies.set('session_token', token);

					if (res.status == true) {
						const token = res.data.token;
						Cookies.set('session_token', token);
						Cookies.set('userId', res.data.user.id);
						if (role == 'enduser') {
							toast.success(res.message);
							Cookies.set('two_step_auth', 'false');
							router.push('/auth/two-factor-authentication');
						} else {
							// toast.success(res.message);

							router.push('/auth/professional/step-2');

						}
					} else {
						// toast.error(res.message);
					}
				} else {
					toast.error(res.message);
				}
			})
			.catch(error => { });
	};
	function validateForm() {
		const newErrors: { [key: string]: string } = {};
		if (!formData.firstName) {
			newErrors.firstName = 'First name is required';
		}
		if (!formData.lastName) {
			newErrors.lastName = 'Last name is required';
		}
		if (!formData.email) {
			newErrors.email = 'Email is required';
		}
		if (!formData.password) {
			newErrors.password = 'Password is required';
		} else if (formData.password.length < 8) {
			newErrors.password = 'Password should be at least 8 characters long';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}
	const redirectlegalIssue = Cookies.get('legaluserId')


	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
		const isValid = validateForm();
		if (isValid) {
			const data = {
				id: redirectlegalIssue,
				first_name: formData.firstName,
				last_name: formData.lastName,
				email: formData.email,
				password: formData.password,
				role: role
			};
			userregister(data)
				.then(res => {
					if (res.status == true) {
						Cookies.set('userId', res.data.user.id)
						Cookies.remove('legaluserId');
						if (role == 'enduser') {
							toast.success(res.message + " please login your account");
							router.push('/auth/login');
						} else {
							const token = res.data.token;
							Cookies.set('session_token', token);
							window.location.href = '/auth/professional/step-2';
						}
					}
				})
				.catch(err => {
					if (err.response && err.response.data && err.response.data.errors) {
						const errors = err.response.data.errors;
						if (errors.email) {
							toast.error(errors.email[0]);
						} else {
							toast.error('An error occurred during registration');
						}
					} else {
						toast.error('An error occurred during registration');
					}
				})
				.finally(() => {
					setTimeout(() => {
						setIsLoading(false);
					}, 1000);
				});
			// if (recaptchaValue) {

			// } else {
			// 	toast.info('Please complete the recaptcha verification');
			// 	setIsLoading(false);
			// }
		} else {
			setIsLoading(false);
		}
	}


	return (
		<>
			<div className="auth-page-wrapper" id="payment">
				<Link href="/auth/choose-profile" className="backtobtn">
					<ArrowSmallLeftIcon width={20} />
					Back
				</Link>
				<div className="row">
					<div className="">
						<div className="main-login">
							{/* <h1>
								<span>Tell us a bit</span> about you
							</h1>
							<p className="p-text-label">
								Please share your basic information with us. This will help clients reach you easily.
							</p> */}
							{redirectlegalIssue ? (
								<>
									<h1>
										<span>Your issue has been</span> <br /> submitted!
									</h1>
									<p className="p-text-label">
										Create an account to access the answer & continue seeking legal counsel.
									</p>
								</>
							) : (
								<>
									<h1>
										<span>Tell us a bit</span> about you
									</h1>
									<p className="p-text-label">
										Please share your basic information with us. This will help clients reach you easily.
									</p>
								</>
							)}


							<form className="commanclassall" id="paymentform" onSubmit={handleSubmit}>
								<div className="row">
									<div className="col-md-6">
										<div className="form-group">
											<label htmlFor="exampleInputEmail1" className="pb-2">
												First Name*
											</label>
											<input
												type="text"
												className="form-control"
												placeholder="E.g. Dr. First Name"
												maxLength={50}
												value={formData.firstName}
												onChange={e => setFormData({ ...formData, firstName: e.target.value })}
											/>
											{errors.firstName && (
												<small className="error-message text-danger">{errors.firstName}</small>
											)}
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<label htmlFor="exampleInputEmail1" className="pb-2">
												Last Name*
											</label>
											<input
												type="text"
												className="form-control"
												placeholder="Last Name"
												maxLength={50}
												value={formData.lastName}
												onChange={e => setFormData({ ...formData, lastName: e.target.value })}
											/>
											{errors.lastName && (
												<small className="error-message text-danger">{errors.lastName}</small>
											)}
										</div>
									</div>
								</div>
								<div className="form-group">
									<label htmlFor="exampleInputEmail1" className="pb-2">
										Email*
									</label>
									<input
										type="email"
										className="form-control"
										autoComplete="off"
										placeholder="user@email.com"
										value={formData.email}
										maxLength={50}
										onChange={e => setFormData({ ...formData, email: e.target.value })}
									/>
									{errors.email && (
										<small className="error-message text-danger">{errors.email}</small>
									)}
								</div>
								<div className="form-grou  position-relative">
									<label htmlFor="exampleInputEmail1" className="pb-2">
										Password*
									</label>
									<input
										type={showPassword ? 'text' : 'password'}
										className="form-control position-relative"
										placeholder="Password"
										value={formData.password}
										maxLength={50}

										onChange={e => setFormData({ ...formData, password: e.target.value })}
									/>
									<span
										className={`eye-icon position-absolute fafa_eye ${showPassword ? 'show' : ''}`}
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeSlashIcon className="icon-class" width={20} />
										) : (
											<EyeIcon className="icon-class" width={20} />
										)}
									</span>
									{errors.password && (
										<small className="error-message text-danger">{errors.password}</small>
									)}
								</div>
								{/* <div className="form-group">
									<label htmlFor="exampleInputEmail1" className="pb-2 pt-2">
										Please check the box below to proceed*
									</label>
								</div> */}

								{/* <ReCAPTCHA
									// sitekey="6LdiRYQpAAAAAN6oGKa78jo0gLY2-2GipSm9t52r"
									sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
									onChange={(value: any) => setRecaptchaValue(value)}
								/> */}


								<button
									type="submit"
									className="btn btn-outline-success text-center btn-lawyer mt-3 w-100"
									disabled={isLoading}
								>
									{!isLoading ? 'Continue' : 'Please wait...'}
								</button>
								{/* <button
									type="button"
									className="btn btn-outline-dark d-flex align-items-center gap-1 justify-content-center  mt-3 w-100"
									onClick={() => signIn('google')}
								>
									<FcGoogle width={30} /> Sign up with Google
								</button> */}
								<p className="mt-4 text-center register-page-link">
									Already have an account?
									<Link href="/auth/login" style={{ color: '#c49073' }}> Log in</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div >
		</>
	);
}