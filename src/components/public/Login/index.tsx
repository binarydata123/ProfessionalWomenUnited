'use client';
import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';
import { useState, useEffect } from 'react'; // Import useState
import { useRouter } from 'next/navigation';
import { userlogin, googleLogin } from '../../../../lib/frontendapi';
import { signIn, signOut, useSession } from 'next-auth/react';
import { EyeSlashIcon, EyeIcon, ArrowSmallLeftIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-toastify';
import AuthContext from '@/context/AuthContext';
import Cookies from 'js-cookie';
import { resendEmailVerifyOtp } from '../../../../lib/lawyerapi';


interface FormData {
	email: string;
	password: string;
}

export default function Login() {

	const router = useRouter();
	const { data: session } = useSession();

	const [formData, setFormData] = useState<FormData>({
		email: '',
		password: ''
	});

	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const { login } = useContext(AuthContext)

	useEffect(() => {
		if (session) {
			SocialData(session.user, 'google');
		}
	}, [session]);

	const SocialData = (user: any, type: any) => {
		const data = {
			first_name: user.name,
			email: user.email
		};
		googleLogin(data)
			.then(res => {
				if (res.status == true) {
					const token = res.data.token;
					Cookies.set('session_token', token);
					if (res.data.user.role == 'lawyer') {
						if (res.data.user.profile_status == 'legal-step') {
							router.push('/auth/lawyer/step-2');
						}
						if (res.data.user.profile_status == 'payment-step') {
							router.push('/auth/lawyer/choose-pricing-plan');
						}

						if (res.data.user.profile_status == 'email-verification-step') {
							window.sessionStorage.setItem('payment_status', 'paid');
							handleResendEmailVerifyOtpSubmit(
								res.data.user.id,
								res.data.user.first_name,
								res.data.user.email
							);
						}

						if (res.data.user.profile_status == 'completed') {
							if (res.data.user.two_factor_auth == 'yes') {
								Cookies.set('two_step_auth', 'false');
								router.push('/auth/two-factor-authentication');
							} else {
								Cookies.set('two_step_auth', 'true');
								router.push('/lawyer/dashboard');
							}
						}
					}
					if (res.data.user.role == 'enduser') {
						if (res.data.user.two_factor_auth == 'yes') {
							Cookies.set('two_step_auth', 'false');
							router.push('/auth/two-factor-authentication');
						} else {
							Cookies.set('two_step_auth', 'true');
							router.push('/user/dashboard');
						}
					}
					if (res.data.user.role == 'admin') {
						if (res.data.user.two_factor_auth == 'yes') {
							Cookies.set('two_step_auth', 'false');
							router.push('/auth/two-factor-authentication');
						} else {
							Cookies.set('two_step_auth', 'true');
							router.push('/admin/dashboard');

						}
					}
				} else {
					toast.error(res.message);

					if (res.type == 'google') {
						signOut({ redirect: false }).then();
					}
				}
			})
			.catch(error => { });
	};

	function validateForm() {
		const newErrors: { [key: string]: string } = {};

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

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const isValid = validateForm();
		if (isValid) {
			setIsLoading(true);
			login(formData.email, formData.password)
				.then((res: any) => {
					if (res) {
						setIsLoading(false);
						if (res.user.role == 'lawyer') {
							if (res.user.profile_status == 'legal-step') {
								router.push('/auth/lawyer/step-2');
							}
							if (res.user.profile_status == 'completed') {
								if (res.user.two_factor_auth == 'yes') {
									Cookies.set('two_step_auth', 'false');
									router.push('/auth/two-factor-authentication');
								} else {
									router.push('/auth/two-factor-authentication');
								}
							}
						} else {
							if (res.user.role === 'enduser') {
								if (res.user.two_factor_auth === 'yes') {
									Cookies.set('two_step_auth', 'false');
									router.push('/auth/two-factor-authentication');
								} else {
									router.push('/auth/two-factor-authentication');
								}
							} else if (res.user.role === 'admin') {
								if (res.user.two_factor_auth === 'yes') {
									Cookies.set('two_step_auth', 'false');
									router.push('/auth/two-factor-authentication');
								} else {
									router.push('/auth/two-factor-authentication');
								}
							} else if (res.account === 'suspended') {
								router.push('/account-suspended');
							} else {
								toast.error(res.message);
							}
						}
					}
				})
				.catch(err => {
					throw err;
				})
				.finally(() => {
					setTimeout(() => {
						setIsLoading(false);
					}, 1000);
				});
		}
	}
	const handleResendEmailVerifyOtpSubmit = (user_id: any, user_name: any, user_email: any) => {
		setIsLoading(true);
		const data = {
			user_id: user_id,
			user_name: user_name,
			user_email: user_email
		};
		resendEmailVerifyOtp(data)
			.then(res => {
				if (res.status == true) {
					toast.success(res.message);
					setTimeout(() => {
						router.push('/auth/lawyer/verify-otp');
					}, 1000);
				} else {
					setIsLoading(false);
					toast.error(res.message);
				}
			})
			.catch(err => {
				if (err.response) {
					toast.error('An error occurred during registration');
					setIsLoading(false);
				}
			});
	};

	return (
		<>
			<div className="auth-page-wrapper">
				<div className="row">
					<div className="">
						<div className="main-login top-sp-big">
							<Link href="/" className="backtobtn mb-3">
								<ArrowSmallLeftIcon width={20} />
								Back
							</Link>
							<h1>
								<span>Welcome</span> Back!
							</h1>
							<p className="p-text-label">Login to continue your professional journey.</p>
							<form className="commanclassall" id="paymentform" onSubmit={handleSubmit}>
								<div className="form-group">
									<label htmlFor="exampleInputEmail1" className="pb-2 pt-2">
										Email*
									</label>
									<input
										type="email"
										className="form-control"
										autoComplete="off"
										placeholder="user@email.com"
										maxLength={50}
										value={formData.email}
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
										maxLength={50}
										value={formData.password}
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
								<small className="mt-2 text-end d-block ">
									<Link href="/auth/forgot-password " className="link-color">
										{' '}
										Forgot Password?
									</Link>
								</small>

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
									<FcGoogle width={30} /> Log In with Google
								</button> */}
								<p className="mt-4 text-center register-page-link">
									Dont have an account?
									<Link href="/auth/choose-profile"> Create an account</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
