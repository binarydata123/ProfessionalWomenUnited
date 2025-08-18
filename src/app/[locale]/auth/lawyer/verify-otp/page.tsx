'use client';
import { useState, useEffect, useContext } from 'react'; // Import useState
import { ArrowSmallLeftIcon } from '@heroicons/react/20/solid';
import './verifyOtp.css';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { checkEmailVerfiyOTP, resendEmailVerifyOtp } from '../../../../../../lib/lawyerapi';
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
	const { user } = useContext(AuthContext)
	const router = useRouter();
	const [user_id, setUserId] = useState('');
	const [user_email, setUserEmail] = useState('');
	const [user_name, setUserName] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingTwo, setIsLoadingTwo] = useState(false);

	useEffect(() => {
		const memberplan = Cookies.get('membership');

		const payment_status = window.sessionStorage.getItem('payment_status');
		if (memberplan === 'true') {
			if (payment_status !== 'paid') {
				router.push('/auth/login');
			} else {
				setUserId(user?.id || '');
				setUserEmail(user?.email || '');
				setUserName(user?.name || '');
			}
		} else {
			setUserId(user?.id || '');
			setUserEmail(user?.email || '');
			setUserName(user?.name || '');
		}
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
		// Check if any input field is empty
		const isEmpty = Object.values(inputValues).some(value => value === '');

		if (isEmpty) {
			toast.error('Please fill in all OTP fields.');
		} else {
			setIsLoading(true);

			const otp = Object.values(inputValues).join('');

			const data = {
				user_id: user_id,
				user_name: user_name,
				user_email: user_email,
				otp: otp
			};

			checkEmailVerfiyOTP(data)
				.then(res => {
					if (res.status == true) {
						toast.success(res.message);
						Cookies.remove('session_token');
						setTimeout(() => {
							router.push('/auth/login');
						}, 1000);
					} else {
						toast.error(res.message);
						setIsLoading(false);
					}
				})
				.catch(err => {
					if (err.response) {
						toast.error('An error occurred during registration');
					}
					setIsLoading(false);
				});
		}
	};

	const handleResendEmailVerifyOtpSubmit = () => {
		setIsLoadingTwo(true);
		const data = {
			user_id: user_id,
			user_name: user_name,
			user_email: user_email
		};
		resendEmailVerifyOtp(data)
			.then(res => {
				if (res.status == true) {
					toast.success(res.message);
					setIsLoading(false);
				} else {
					toast.error(res.message);
					setIsLoading(false);
				}
			})
			.catch(err => {
				if (err.response) {
					toast.error('An error occurred during registration');
				}
			});
	};

	return (
		<>
			<div className="otp-virify">
				<Link href="#" className="backtobtn">
					<ArrowSmallLeftIcon width={20} />
					Back
				</Link>
				<div className="text-center mx-width-600 ">
					<h2>OTP Verification</h2>
					<p>
						Please enter the One-Time Password (OTP) sent to <br />
						<span>{user_email}</span> to verify your account.
					</p>
					<ul className="inputflex ">
						<li>
							<OTPInput
								id="input1"
								value={inputValues.input1}
								onValueChange={handleInputChange}
								previousId={null}
								handleSubmit={handleSubmit}
								nextId="input2"
							/>
						</li>
						<li>
							<OTPInput
								id="input2"
								value={inputValues.input2}
								onValueChange={handleInputChange}
								previousId="input1"
								handleSubmit={handleSubmit}
								nextId="input3"
							/>
						</li>
						<li>
							<OTPInput
								id="input3"
								value={inputValues.input3}
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
								value={inputValues.input4}
								onValueChange={handleInputChange}
								previousId="input3"
								handleSubmit={handleSubmit}
								nextId="input5"
							/>
						</li>
						<li>
							<OTPInput
								id="input5"
								value={inputValues.input5}
								onValueChange={handleInputChange}
								previousId="input4"
								handleSubmit={handleSubmit}
								nextId="input6"
							/>
						</li>
						<li>
							<OTPInput
								id="input6"
								value={inputValues.input6}
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
					<p className="mt-5" onClick={isLoadingTwo ? undefined : handleResendEmailVerifyOtpSubmit}>
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
				// const inputGroup = document.getElementById('OTPInputGroup');

				// if (inputGroup && inputGroup.dataset['autosubmit']) {
				//     //submit the form
				//     // handleSubmit();

				// }
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
