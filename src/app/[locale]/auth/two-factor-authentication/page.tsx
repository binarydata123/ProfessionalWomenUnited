'use client';
import { useState, useEffect, useContext, useRef } from 'react'; // Import useState
import { ArrowSmallLeftIcon } from '@heroicons/react/20/solid';
import './verifyOtp.css';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { twoSetpAuthVerfiyOTP, resendTwoSetpAuthVerifyOtp } from '../../../../../lib/frontendapi';
import AuthContext from '@/context/AuthContext';
import Cookies from 'js-cookie';

interface OTPInputProps {
	id: any;
	previousId: any;
	nextId: any;
	value: any;
	onValueChange: any;
	handleSubmit: any;
}

const OTPInputGroup = () => {
	const router = useRouter();
	const { user } = useContext(AuthContext)
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingTwo, setIsLoadingTwo] = useState(false);
	const [redirectUrl, setredirectUrl]: any = useState(null);
	const [userEmail, setUserEmail] = useState(Cookies.get('email'))
	const submittedRef = useRef(false); // Ref to track if OTP has been submitted

	useEffect(() => {
		if (user?.two_factor_auth === 'no' && !submittedRef.current) { // Check if OTP has not been submitted yet
			handleSubmit();
			submittedRef.current = true; // Mark OTP as submitted to prevent further submissions
		}
	}, [user?.two_factor_auth]);

	useEffect(() => {
		const url: any = window.sessionStorage.getItem('redirect_url');
		if (url) {
			setredirectUrl(url);
		}
		setUserEmail(Cookies.get('email'))
	}, []);

	const [inputValues, setInputValues] = useState({
		input1: '',
		input2: '',
		input3: '',
		input4: '',
		input5: '',
		input6: ''
	});
	const handleInputChange = (inputId: any, value: any) => {
		if (value === null || '') {
			return false;
		}
		setInputValues(prevInputValues => ({
			...prevInputValues,
			[inputId]: value
		}));
	};

	const handleSubmit = () => {
		setIsLoading(true);
		const otp = user?.two_factor_auth === 'no' ?
			user?.logindate.split("").join("") :
			Object.values(inputValues).join("");

		const data = {
			user_email: user?.email,
			otp: otp
		};

		const isEmpty = otp.split("").some((value: string) => value === '');
		if (isEmpty) {
			toast.error('Please fill in all OTP fields.');
			setIsLoading(false);
			return;
		}
		twoSetpAuthVerfiyOTP(data)
			.then(res => {
				if (res.status == true) {
					const { token, user } = res.data;
					Cookies.set('session_token', token)
					toast.success(res.message);
					Cookies.set('two_step_auth', 'true');
					if (redirectUrl) {
						setTimeout(() => {
							router.push(redirectUrl);
						});
						return;
					}

					if (user?.role == 'enduser') {
						setTimeout(() => {
							router.push('/user/dashboard');
						}, 1000);
					}

					if (user?.role == 'lawyer') {
						setTimeout(() => {
							router.push('/lawyer/dashboard');
						}, 1000);
					}

					if (user?.role == 'admin') {
						setTimeout(() => {
							router.push('/admin/dashboard');
						}, 1000);
					}
				} else {
					toast.error(res.message);
					setIsLoading(false);
				}
			})
			.finally(() => {
				setIsLoading(false); // Set loading state to false after API call completes
			});
	};



	const handleresendTwoSetpAuthVerifyOtpSubmit = () => {
		setIsLoadingTwo(true);
		const data = {
			user_id: user?.id,
			user_name: user?.username,
			user_email: user?.email
		};
		resendTwoSetpAuthVerifyOtp(data)
			.then(res => {
				if (res.status == true) {
					toast.success(res.message);
				} else {
					toast.error(res.message);
				}
			})
			.catch(err => {
				if (err.response) {
					toast.error('An error occurred during registration');
				}
			})
			.finally(() => {
				setIsLoadingTwo(false);
			});
	};

	return (
		<>
			<div className="otp-virify">
				<Link href="/auth/login" className="backtobtn">
					<ArrowSmallLeftIcon width={20} />
					Back
				</Link>
				<div className="text-center mx-width-600 ">
					<h2>Two Factor Authentication</h2>
					<p>
						Please enter the One-Time Password (OTP) sent to <br />
						<span>{user?.email || userEmail}</span> to verify your account.
					</p>
					<ul className="inputflex ">
						<li>
							<OTPInput
								id="input1"
								value={user?.two_factor_auth === 'no' ? user?.logindate.split("")[0] : inputValues.input1}
								onValueChange={handleInputChange}
								previousId={null}
								handleSubmit={handleSubmit}
								nextId="input2"
							/>
						</li>
						<li>
							<OTPInput
								id="input2"
								value={user?.two_factor_auth === 'no' ? user?.logindate.split("")[1] : inputValues.input2}
								onValueChange={handleInputChange}
								previousId="input1"
								handleSubmit={handleSubmit}
								nextId="input3"
							/>
						</li>
						<li>
							<OTPInput
								id="input3"
								value={user?.two_factor_auth === 'no' ? user?.logindate.split("")[2] : inputValues.input3}
								onValueChange={handleInputChange}
								previousId="input2"
								handleSubmit={handleSubmit}
								nextId="input4"
							/>
						</li>

						<li></li>
						<li>
							<OTPInput
								id="input4"
								value={user?.two_factor_auth === 'no' ? user?.logindate.split("")[3] : inputValues.input4}
								onValueChange={handleInputChange}
								previousId="input3"
								handleSubmit={handleSubmit}
								nextId="input5"
							/>
						</li>
						<li>
							<OTPInput
								id="input5"
								value={user?.two_factor_auth === 'no' ? user?.logindate.split("")[4] : inputValues.input5}
								onValueChange={handleInputChange}
								previousId="input4"
								handleSubmit={handleSubmit}
								nextId="input6"
							/>
						</li>
						<li>
							<OTPInput
								id="input6"
								value={user?.two_factor_auth === 'no' ? user?.logindate.split("")[5] : inputValues.input6}
								onValueChange={handleInputChange}
								previousId="input5"
								handleSubmit={handleSubmit}
								nextId=""
							/>
						</li>
					</ul>
					<div className="mt-4">
						<button className="btn-commn w-100" onClick={handleSubmit} disabled={isLoading}>
							{isLoading ? 'Please wait...' : 'Go to Dashboard'}
						</button>
					</div>
					<p className="mt-5" onClick={isLoadingTwo ? undefined : handleresendTwoSetpAuthVerifyOtpSubmit}>
						Didn't receive an OTP? <span>{isLoadingTwo ? 'Please wait...' : 'Resend OTP'} </span>
					</p>
				</div>
			</div>
		</>
	);
};

const OTPInput = ({ id, previousId, nextId, value, onValueChange, handleSubmit }: OTPInputProps) => {
	const handleKeyUp = (e: any) => {
		if (e.keyCode === 8 || e.keyCode === 37) {
			const prev = document.getElementById(previousId);
			if (prev) {
				prev.focus();
			}
		} else if (
			(e.keyCode >= 48 && e.keyCode <= 57) ||
			(e.keyCode >= 65 && e.keyCode <= 90) ||
			(e.keyCode >= 96 && e.keyCode <= 105) ||
			e.keyCode === 39
		) {
			const next = document.getElementById(nextId);
			if (next) {
				next.focus();
			} else {
				handleSubmit();
			}
		}
	};
	return (
		<input
			id={id}
			name={id}
			type="text"
			value={value}
			maxLength={1}
			onChange={e => onValueChange(id, e.target.value)}
			onKeyUp={handleKeyUp}
		/>
	);
};

export default OTPInputGroup;
