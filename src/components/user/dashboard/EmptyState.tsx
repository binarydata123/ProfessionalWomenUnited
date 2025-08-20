import DefaultButton from '@/commonUI/DefaultButton';
import React from 'react';

export default function EmptyState() {
	return (
		<div className="empty-state-wrapper">
			<div className="top-banner-box p-4 d-flex align-items-center">
				<div className="inner-content">
					<h1 className="">Welcome to Professional Women United!</h1>
					<p className="mt-3 mb-3">
						Connect with lawyers or legal consultants through our platform and get the legal help you need within the United Arab Emirates.
					</p>
					<DefaultButton className="mt-3">Find A Professional</DefaultButton>
				</div>
			</div>
			<div className="bottom-content mt-5">
				<div className="row">
					<div className="col-sm-6">
						<div className="left-bottom-bg inner-content p-3">
							<h2>Got A Legal Question?</h2>
							<p className="mt-3">
								Contribute to our legal community & grow your reach by sharing your expertise.{' '}
							</p>
							<DefaultButton
								className="w-100"
								color="rgba(196,144,115, 1)"
								background="rgba(9, 63, 56, 1)"
							>
								Ask A Lawyer
							</DefaultButton>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="right-bottom-bg p-3">
							<h2>Get Expert Advice for Free</h2>
							<p className="mt-3">
								Contribute to our legal community & grow your reach by sharing your expertise.{' '}
							</p>
							<DefaultButton className="w-100" color="rgba(32, 140, 132, 1)" background="#fff">
								Visit Legal Forum
							</DefaultButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
