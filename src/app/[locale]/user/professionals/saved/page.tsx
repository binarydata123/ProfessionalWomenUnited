'use client';
import React from 'react';
import '../lawyer.css';
import Image from 'next/image';
import { BookmarkIcon } from '@heroicons/react/20/solid';

export default function saved() {
	return (
		<>
			<div className="card-inquiries bg-card-white mt-2">
				<div className="row">
					<div className="col-sm-9">
						<div className="row m-center">
							<div className="col-sm-2 pr-0 big-screen-w">
								<Image
									src="/images/user-popup.png"
									alt="user-popup"
									width={130}
									height={130}
									layout="responsive"
									className="w-130 m-img-fixed"
								/>
							</div>
							<div className="col-sm-10">
								<p className="font-large social-link weight-bold ">Sara Ali </p>
								<p className="font-small  weight-semi-bold social-link">
									Business Attorney at Company Name
								</p>
								<ul className="rating-location">
									<li className="loc">
										<i className="fa-solid fa-location-dot"></i> Dubai
									</li>
									<li className="rev">
										{' '}
										<i className="fa-solid fa-star"></i> <b>4.1</b> <span>(10 reviews)</span>
									</li>
								</ul>
								<button className="btn-mini success-btn mr-1 mb-2">Business Law</button>
								<button className="btn-mini danger-btn mr-1 mb-2">Licensed for 9 years</button>
								<button className="btn-mini danger-btn ">Free Consultation: 30 mins</button>
							</div>
						</div>
					</div>
					<div className="col-sm-3 text-right">
						<ul className="rating-location">
							<li className="mr-1">
								<i className="fa-solid fa-ellipsis font-medium"></i>
							</li>
							<li className="mr-1">
								{' '}
								<i className="fa-solid fa-share-from-square font-medium"></i>
							</li>
							<li className="">
								<BookmarkIcon width={20} color="rgba(32, 140, 132, 1)" />
							</li>
						</ul>
						<button className="btn-get-free btn-commn d-flex align-items-center justify-content-center w-100 gap-2 hover mt-1 mb-2">
							Make An Inquiry{' '}
						</button>
						<p className="mt-2 m-center">
							<a className="boysenberry font-small weight-semi-bold" href="#">
								View Profile{' '}
								<button className="btn-mini danger-btn border-none icon-rotate">
									<i className="fa-solid fa-arrow-up-long"></i>
								</button>
							</a>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
