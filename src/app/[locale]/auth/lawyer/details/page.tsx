import React from 'react';
import { ArrowSmallLeftIcon } from '@heroicons/react/20/solid';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import './payment-details.css';
export default function stepTwo() {
	return (
		<>
			<div className="auth-page-wrapper" id="stepTwo">
				<a href="#" className="backtobtn">
					<ArrowSmallLeftIcon width={20} />
					Back
				</a>
				<div className="row">
					<div className="">
						<div className="payment-box">
							<h3>You are subscribing to our</h3>
							<h2>Monthly Plan</h2>
							{/* <p className="p-text-label">Start your FREE 1 month trial on our platform.</p> */}
							<div className="payment-detail">
								<h6>Payment Due</h6>
								<p className="" style={{ fontWeight: '400' }}>
									Your payment method will be charged by the due date.
								</p>
								<div className="row align-items-center">
									<div className="col-lg-9">
										<div className="payment-plan">
											<h5>Professional Women United: Monthly Plan </h5>
											<p style={{ fontWeight: '400' }}>charged monthly</p>
										</div>
									</div>
									<div className="col-lg-3 text-end">
										<div className="payment-plan">
											<h3>
												<span> AED </span> 2x
											</h3>
										</div>
									</div>
								</div>
								<div className="icon-plan d-none d-lg-block">
									<span>We accept:</span>
									<img src="/Visa.png" alt="Visa" />
									<img src="/Group.png" alt="Group" />
								</div>
							</div>
							<form action="" className="plan-detail-form">
								<div className="row">
									<div className="col-md-12">
										<label htmlFor="">Card Number*</label>
										<input type="text" className="form-control" maxLength={50} />
									</div>
									<div className="col-lg-6">
										<label htmlFor="">Expiry Date*</label>
										<input type="text" className="form-control" maxLength={10} />
									</div>
									<div className="col-lg-6">
										<label htmlFor="cvv">CVV*</label>
										<input type="text" className="form-control" maxLength={3} />
									</div>
								</div>
								<div className="btn-plan">
									<button className="btn-get-free btn-commn bg-change d-flex gap-2 justify-content-lg-0 justify-content-center w-100">
										<span className="">Start 1 Month Free Trial</span>
										<span className="border-radius-1 banner-arrow-btn">
											<ChevronRightIcon width={20} color={'#fff'} />
										</span>
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
