'use client';
import React, { useContext } from 'react';
import { useState, useEffect } from 'react'; // Import useState
import { ArrowSmallLeftIcon } from '@heroicons/react/20/solid';
import './payment-details.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthContext from '@/context/AuthContext';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from './Checkout';

const promiseCheckout = loadStripe(
	"pk_test_FQu4ActGupRmMrkmBpwU26js"
);
// const promiseCheckout = loadStripe(
// 	"pk_live_51PCFO6A2kvlFiDWuYSDdIulqEf6IacZQRVucRXyoJhICbmN0EGZt1MideQfHQrIwUpGzscJi6dqRv282TCBr05n800YCX6O86V"
// );

interface FormData {
	CardNumber: string;
	CardExpiredMonth: string;
	CardExpiredYear: string;
	CardCvv: string;
}

export default function stepTwo() {
	const { user } = useContext(AuthContext)
	const router = useRouter();
	const [plan_type, setPlanType] = useState('');
	const [plan_amount, setPlanAmount] = useState('');

	useEffect(() => {
		if (user) {
			const temp_plan_type = window.sessionStorage.getItem('temp_plan_type');
			const temp_plan_amount = window.sessionStorage.getItem('temp_plan_amount');

			if (user) {
				if (user?.id == null || user?.role == 'enduser' || temp_plan_type == null || temp_plan_amount == null) {
					router.push('/auth/login');
				} else {
					setPlanType(temp_plan_type);
					setPlanAmount(temp_plan_amount);
				}
			}
		}
	}, [user]);


	return (
		<>
			<div className="auth-page-wrapper" id="stepTwo">
				<Link href="/auth/professional/choose-pricing-plan" className="backtobtn">
					<ArrowSmallLeftIcon width={20} />
					Back
				</Link>
				<div className="row">
					<div className="">
						<div className="payment-box">
							<h3>You are subscribing to our</h3>
							<h2>
								{plan_type.charAt(0).toUpperCase()}
								{plan_type.slice(1)} Plan
							</h2>
							<p className="p-text-label">
								{plan_type == 'monthly'
									// ? 'Start your FREE 1 month trial on our platform.'
									? ''
									: 'Start your plan on our platform.'}
							</p>
							<div className="payment-detail">
								<h6>Payment Due</h6>
								<p className="" style={{ fontWeight: '400' }}>
									Your payment method will be charged by the due date.
								</p>
								<div className="row align-items-center">
									<div className="col-lg-9">
										<div className="payment-plan">
											<h5>
												Professional Women United: {plan_type.charAt(0).toUpperCase()}
												{plan_type.slice(1)} Plan{' '}
											</h5>
											<p style={{ fontWeight: '400' }}>charged {plan_type}</p>
										</div>
									</div>
									<div className="col-lg-3 text-end">
										<div className="payment-plan">
											<h3>
												<span> USD </span>
												{Number(plan_amount)}
											</h3>
										</div>
									</div>
								</div>
								<div className="icon-plan d-none d-lg-block">
									<span>We accept:</span>
									<Image src="/Visa.png" alt="Visa.png" width={64} height={64} />
									<Image src="/Group.png" alt="Group.png" width={64} height={64} />
								</div>
							</div>
							<Elements stripe={promiseCheckout}>
								<Checkout />

							</Elements>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
