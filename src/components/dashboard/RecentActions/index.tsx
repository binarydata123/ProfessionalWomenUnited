'use client';
import React, {useState} from 'react';
import ImagePlaceholder from '@/commonUI/ImagePlaceholder';
import LinkButton from '@/commonUI/LinkButton';
import './recent-action.css';
import {StarIcon} from '@heroicons/react/20/solid';

interface RecentProps {
	data?: any[];
	title?: string;
	type?: string | 'review' | 'post' | 'inquiry';
	onClick?: () => void;
}

export default function RecentActions({data, title, type, onClick}: RecentProps) {
	const [showFilledReviews, setshowFilledReviews] = useState(false);

	const toggleShowFilledReviews = () => {
		setshowFilledReviews(prevState => !prevState);
	};

	return (
		<div className="recent-action-wrapper">
			<div className="recent-reviews mt-4 fff">
				<div className="row">
					<div className="col-8">
						<p className="font-large weight-semi-bold green-dark">{title}</p>
					</div>
					<div className="col-4 text-right">
						<LinkButton height={0} onClick={toggleShowFilledReviews}>
							View all
						</LinkButton>
					</div>
				</div>
				{showFilledReviews === true ? (
					<>
						<div className="card-notifaction mt-2">
							<div className="row align-items-center">
								<div className="col-6">
									<ul className="star-rating">
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li className="not">
											<StarIcon width={15} color={'#F2F2F2'} />
										</li>
										<li>4.0</li>
									</ul>
									<p className="social-link weight-medium font-x-small">Review Title Goes Here</p>
								</div>
								<div className="col-6 text-right">
									<p className="list-right-text">John Doe • Month DD, YYYY </p>
								</div>
							</div>
						</div>

						<div className="card-notifaction mt-2">
							<div className="row align-items-center">
								<div className="col-6">
									<ul className="star-rating">
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li className="not">
											<StarIcon width={15} color={'#F2F2F2'} />
										</li>
										<li>4.0</li>
									</ul>
									<p className="social-link weight-medium font-x-small">Review Title Goes Here</p>
								</div>
								<div className="col-6 text-right">
									<p className="list-right-text">John Doe • Month DD, YYYY </p>
								</div>
							</div>
						</div>

						<div className="card-notifaction mt-2">
							<div className="row align-items-center">
								<div className="col-6">
									<ul className="star-rating">
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li className="not">
											<StarIcon width={15} color={'#F2F2F2'} />
										</li>
										<li>4.0</li>
									</ul>
									<p className="social-link weight-medium font-x-small">Review Title Goes Here</p>
								</div>
								<div className="col-6 text-right">
									<p className="list-right-text">John Doe • Month DD, YYYY </p>
								</div>
							</div>
						</div>

						<div className="card-notifaction mt-2">
							<div className="row align-items-center">
								<div className="col-6">
									<ul className="star-rating">
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li className="not">
											<StarIcon width={15} color={'#F2F2F2'} />
										</li>
										<li>4.0</li>
									</ul>
									<p className="social-link weight-medium font-x-small">Review Title Goes Here</p>
								</div>
								<div className="col-6 text-right">
									<p className="list-right-text">John Doe • Month DD, YYYY </p>
								</div>
							</div>
						</div>

						<div className="card-notifaction mt-2">
							<div className="row align-items-center">
								<div className="col-6">
									<ul className="star-rating">
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li>
											<StarIcon width={15} color="#c49073" />
										</li>
										<li className="not">
											<StarIcon width={15} color={'#F2F2F2'} />
										</li>
										<li>4.0</li>
									</ul>
									<p className="social-link weight-medium font-x-small">Review Title Goes Here</p>
								</div>
								<div className="col-6 text-right">
									<p className="list-right-text">John Doe • Month DD, YYYY </p>
								</div>
							</div>
						</div>
					</>
				) : (
					<ImagePlaceholder
						buttonText="Update your Profile"
						text="You don’t have any reviews."
						height={242}
						image={'/images/review-placeholder.png'}
					/>
				)}
			</div>
		</div>
	);
}
