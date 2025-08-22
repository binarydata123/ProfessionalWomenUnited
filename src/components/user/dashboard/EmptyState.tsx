import DefaultButton from '@/commonUI/DefaultButton';
import React from 'react';

export default function EmptyState() {
	return (
		<div className="empty-state-wrapper">
			<div className="top-banner-box p-4 d-flex align-items-center">
				<div className="inner-content">
					<h1 className="" style={{ color: '#fff' }}>Welcome to Professional Women United!</h1>
					<p className="mt-3 mb-3" style={{ color: '#fff' }}>
						Connect with Professionals or professional consultants through our platform and get the professional help you need within the United States of America.
					</p>
					<DefaultButton className="mt-3">Find A Professional</DefaultButton>
				</div>
			</div>
			<div className="bottom-content mt-5">
				<div className="row">
					<div className="col-sm-6">
						<div className="left-bottom-bg inner-content p-3">
							<h2>GOT A PROFESSIONAL QUESTION?</h2>
							<p className="mt-3">
								Contribute to our professional community & grow your reach by sharing your expertise.{' '}
							</p>
							<DefaultButton
								className="w-100"
								color="rgba(196,144,115, 1)"
								background="rgba(196,144,115)"
							>
								Ask A Professional
							</DefaultButton>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="right-bottom-bg p-3">
							<h2>Get Expert Advice for Free</h2>
							<p className="mt-3">
								Contribute to our professional community & grow your reach by sharing your expertise.{' '}
							</p>
							<DefaultButton className="w-100" color="rgba(32, 140, 132, 1)" background="#fff">
								Visit Professional Forum
							</DefaultButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
