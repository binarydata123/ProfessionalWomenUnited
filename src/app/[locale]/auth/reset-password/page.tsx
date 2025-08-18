'use client';
import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { resetPassword } from '../../../../../lib/frontendapi';
import { signIn, signOut, useSession } from 'next-auth/react';
import FormInput from '@/commonUI/FormInput';
import './reset-password.css';

interface FormData {
	password: string;
	confirmPassword: string;
}

export default function resetPasword() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [formData, setFormData] = useState<FormData>({
		password: '',
		confirmPassword: ''
	});
	const [errors, setErrors] = useState<any>({});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isPopupOpen, setIsPopupOpen] = useState(false); // State for the black color popup
	const token = searchParams.get('token');
	const userEmail = searchParams.get('email');

	function hasLetters(password: string) {
		return /[A-Za-z]/.test(password);
	}

	function hasNumbers(password: string) {
		return /\d/.test(password);
	}

	function hasSpecialChars(password: string) {
		return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		if (!formData.password) {
			setErrors({ password: 'Please fill this field' });
			return;
		}

		if (formData.password.length < 8) {
			setErrors({ password: 'Password must be at least 8 characters long' });
			return;
		}

		if (!/(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!])/.test(formData.password)) {
			setErrors({ password: 'Password must contain at least 1 letter, 1 number, and 1 special character' });
			return;
		}

		// Check if passwords match
		if (formData.password !== formData.confirmPassword) {
			setErrors({ confirmPassword: 'Passwords do not match' });
			return;
		}

		setErrors({});

		const data = {
			token: token,
			email: userEmail,
			password: formData.password,
			password_confirmation: formData.confirmPassword
		};
		resetPassword(data)
			.then(res => {
				if (res.success === true) {
					toast.success(res.msg);
					router.push('/auth/login');
				} else {
					toast.error(res.msg);
				}
			})
			.catch(err => { });
	}

	return (
		<>
			<div className="auth-page-wrapper">
				<div className="row">
					<div className="">
						<div className="main-login">
							<h1>
								<span>Forgot</span> Password?
							</h1>
							<p className="p-text-label">Let’s get you connected.</p>
							<form className="" id="paymentform" onSubmit={handleSubmit}>
								<div className={`form-grou mt-3 position-relative ${isPopupOpen ? 'popup-open' : ''}`}>
									<FormInput
										type={showPassword ? 'text' : 'password'}
										placeholder="New Password"
										value={formData.password}
										error={errors.password}
										label={'New Password*'}
										onChange={(e: any) => setFormData({ ...formData, password: e.target.value })}
										onFocus={() => setIsPopupOpen(true)}
										onBlur={() => setIsPopupOpen(false)}
									/>
									<span
										className={`eye-icon position-absolute fafa_eye ${showPassword ? 'show' : ''}`}
										onClick={() => setShowPassword(!showPassword)}
									>
										<i
											className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
											aria-hidden="true"
										></i>
									</span>
									{isPopupOpen && (
										<div className="strong-password-popup">
											<div className={hasLetters(formData.password) ? 'success' : 'error'}>
												<p>
													<i
														className={
															hasLetters(formData.password)
																? 'fas fa-check success'
																: 'fas fa-times error'
														}
													></i>
													Contains letters.
												</p>
											</div>
											<div className={hasNumbers(formData.password) ? 'success' : 'error'}>
												<p>
													<i
														className={
															hasNumbers(formData.password)
																? 'fas fa-check success'
																: 'fas fa-times error'
														}
													></i>
													Contains numbers.
												</p>
											</div>
											<div className={hasSpecialChars(formData.password) ? 'success' : 'error'}>
												<p>
													<i
														className={
															hasSpecialChars(formData.password)
																? 'fas fa-check success'
																: 'fas fa-times error'
														}
													></i>
													Contains special character.
												</p>
											</div>
										</div>
									)}
								</div>
								<div className="form-grou mt-3 position-relative">
									<FormInput
										type={showConfirmPassword ? 'text' : 'password'}
										placeholder="Confirm Password"
										value={formData.confirmPassword}
										error={errors.confirmPassword}
										label={'Confirm Password*'}
										onChange={(e: any) =>
											setFormData({
												...formData,
												confirmPassword: e.target.value
											})
										}
									/>
									<span
										className={`eye-icon position-absolute fafa_eye ${showConfirmPassword ? 'show' : ''
											}`}
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									>
										<i
											className={`fa ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
											aria-hidden="true"
										></i>
									</span>
								</div>
								<button
									type="submit"
									className="btn btn-outline-success text-center btn-lawyer mt-3 w-100"
								>
									Reset Password
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
