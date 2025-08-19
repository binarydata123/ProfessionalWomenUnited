'use client';
import React from 'react';
import ImagePlaceholder from '@/commonUI/ImagePlaceholder';
import LinkButton from '@/commonUI/LinkButton';
import DefaultButton from '@/commonUI/DefaultButton';
import { XMarkIcon } from '@heroicons/react/20/solid';
import CountCard from '@/components/common/CountCard';
import Link from 'next/link';

export default function EmptyState() {
	return (
		<div className="lawywer-dashboard-empty-state-wrapper">
			<>
				<div className="row mt-4">
					<div className="col-lg-12 col-xl-8 col-md-12">
						<div className="row">
							<div className="col-6">
								<CountCard
									backgroundImage="/images/Profile-dash.jpg"
									count={0}
									linkText={'Profile Views'}
									href={'/lawyer/profile'}
								/>
							</div>
							<div className="col-6">
								<CountCard
									backgroundImage="/images/Profile-dash2.jpg"
									count={0}
									linkText={'Inquiries'}
									href={'/lawyer/inquires'}
								/>
							</div>
							<div className="col-sm-12">
								<div className="recent-action-wrapper mt-2">
									<div className="row">
										<div className="col-8">
											<p className="font-large weight-semi-bold green-dark">Recent Reviews</p>
										</div>
										<div className="col-4 text-right">
											<LinkButton height={0}>View all</LinkButton>
										</div>
									</div>
									<ImagePlaceholder
										buttonText="Update your Profile"
										text="You don’t have any reviews."
										height={250}
										image={'/images/review-placeholder.png'}
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-12 col-xl-4 col-md-12">
						<div className="recent-reviews dashboard-banner banner-box mb-2 position-relative">
							<div>
								<div className="position-absolute cross-btn">
									<button className="btn p-0 m-2">
										<XMarkIcon width={20} color="rgba(9, 63, 56, 1)" />
									</button>
								</div>
								<h2 className="text-center">Welcome to Professional Women United!</h2>
								<p className="text-center">
									Connect with lawyers or legal consultants through our platform and get the legal help you need within the United Arab Emirates.
								</p>
								<Link href={'/lawyer/profile/edit'}>
									<DefaultButton className="w-100 mt-3">Update Profile</DefaultButton>
								</Link>
							</div>
						</div>
						<div className="recent-reviews dashboard-banner banner-2 position-relative">
							<div>
								<div className="position-absolute cross-btn">
									<button className="btn p-0 m-2">
										<XMarkIcon width={20} color="rgba(9, 63, 56, 1)" />
									</button>
								</div>
								<h2>Find clients easily...</h2>
								<p className="mt-2">
									Contribute to our legal community & grow your reach by sharing your expertise.{' '}
								</p>
								<Link href={'/lawyer/legal-community'}>
									<LinkButton height={42} className="banner-button mt-3 w-100" color="#208C84">
										Go to Legal Community
									</LinkButton>
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className="recent-reviews mt-4 fff">
					<div className="row">
						<div className="col-8">
							<p className="font-large weight-semi-bold green-dark">Recent Inquiries</p>
						</div>
						<div className="col-4 text-right">
							<LinkButton>View All</LinkButton>
						</div>
					</div>
					<ImagePlaceholder
						buttonText="Update your Profile"
						text="You don’t have any inquiries."
						height={350}
						image={'/images/inquiry-image.png'}
					/>
				</div>
			</>
		</div>
	);
}
