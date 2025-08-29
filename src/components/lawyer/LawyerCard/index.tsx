'use client';
import { ChevronRightIcon, StarIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import './style.css';
import Popup from '@/commonUI/Popup';
import { checkUserOnline, getSingleLawyerDetails } from './../../../../lib/frontendapi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import ImageComponent from '@/commonUI/ImageComponent';
import LawyerLoadingPlaceholder from '@/commonUI/LawyerLoadingPlaceholder';
import AuthContext from '@/context/AuthContext';

interface Props {
	lawyer?: any;
	Key: any;
	showLocation?: boolean;
	ContinueButton?: boolean;
	ShowLoader?: boolean;
}
export default function LawyerCard({
	lawyer,
	Key,
	showLocation = true,
	ContinueButton = false,
	ShowLoader = true
}: Props) {

	const { user } = useContext(AuthContext);
	const [single_lawyer, setSingleLawyerData] = useState<any>('');
	const [showMore, setShowMore] = useState(false);
	const [isOnline, setisOnline] = useState(false);
	const toggleShowMore = () => setShowMore(!showMore);
	const currentYear = new Date().getFullYear();
	const [viewProfile, setviewProfile] = useState(false);
	const [isLoading, setisLoading] = useState(false);

	const handleSingleLawyerDetails = async (id: any) => {
		try {
			const res = await getSingleLawyerDetails(id);
			if (res.status == true) {
				setSingleLawyerData(res.data);
				setviewProfile(true);
			}
		} catch (err) {
			console.log(err);
		}
	};

	// const handleIsOnline = (id: any = lawyer.id) => {
	// 	checkUserOnline({ user_id: id }).then(res => {
	// 		const sec = parseInt(res.data);
	// 		if (sec < 120) {
	// 			setisOnline(true);
	// 		}
	// 	});
	// };

	useEffect(() => {
		// handleIsOnline(lawyer.id);
		if (lawyer) {
			setisLoading(false);
		}
	}, []);

	if (isLoading && ShowLoader && process.env.NEXT_PUBLIC_DATA_LOADING_PLACEHOLDER === 'true') {
		return <LawyerLoadingPlaceholder />;
	}

	const placeholderImgUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/default/${lawyer.gender == 'male' ? 'female-lawyer-306x200.png' : 'female-lawyer-306x200.png'}`;

	return (
		<div className="lawyer-card-wrapper" key={Key}>
			<div className="testimonial">
				<Link href={`/find-a-professional/${lawyer?.slug}`}>
					<div className="pic pic-box1 position-relative">
						<div className="portfolioDisc">
							{ContinueButton && (
								<span className=" w-100 btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2">
									<span className="text-white">Continue</span>
									<span className="border border-radius-1 banner-arrow-btn">
										<ChevronRightIcon width={20} color={'#fff'} />
									</span>
								</span>
							)}
						</div>

						<div className="portfolioDisc_data row">


							{lawyer?.is_new == 1 && (
								<div className="freeconsultation_new bg-change cursor-pointer col-3 ">
									New
									<Image
										src="/images/contact/blink.svg"
										alt="lawyer is new or not blink image"
										width={10}
										height={10}
									/>
								</div>
							)}
						</div>
						<div
							// className="lawyer-img-set-mobile"
							className={
								lawyer?.profile_image ? "lawyer-img-set-mobile" : "lawyer-dummy-image"
							}
							style={{
								// backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_URL}/images/${lawyer?.profile_image}`,
								backgroundImage: `url(${lawyer?.profile_image
									? `${process.env.NEXT_PUBLIC_BASE_URL}/images/${lawyer.profile_image}`
									: "/images/women.png"
									})`,
								backgroundSize: 'cover',
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'center top',
							}}>
						</div>
					</div>

				</Link>
				<Link href={`/find-a-professional/${lawyer?.slug}`}>
					<h3 className="testimonial-title" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ textDecoration: 'none' }}>
						{/* {lawyer?.full_name} */}
						{lawyer?.full_name
							?.toLowerCase()
							.replace(/\b\w/g, (char: string) => char.toUpperCase())}
						{isOnline}
					</h3>
				</Link>

				<span className="description">
					{lawyer?.designation && lawyer.designation.length > 30
						? lawyer.designation.slice(0, 30) + '...'
						: lawyer?.designation} {' '}

				</span>

				{showLocation && (
					<div className="location-move">
						<HiOutlineLocationMarker width={20} />
						{lawyer?.location_name}
					</div>
				)}
				<p className="stong-text">
					{lawyer?.avg_rating_and_reviews ? (
						<span style={{ display: 'flex', alignItems: 'center' }}>
							<StarIcon
								width={20}
								color="#c49073"
								style={{ marginRight: '5px', height: '30px' }}
							/>
							<span>
								<strong>{lawyer.avg_rating_and_reviews.split('(')[0]}</strong>
							</span>
							<span>({lawyer.avg_rating_and_reviews.split('(')[1]})</span>
						</span>
					) : (
						<span></span>
					)}

				</p>

				<div className="btn-family-more">
					{lawyer?.service_name && (
						// <Link href={`/legal-services/${lawyer?.service_slug}`}>
						// </Link>
						<button> {lawyer?.service_name.split(',')[0]} Profession</button>
					)}
					<span className="view-more-btn" onClick={() => handleSingleLawyerDetails(lawyer.id)}>
						More details
					</span>
				</div>
			</div>
			<Popup
				show={viewProfile}
				onCancel={() => setviewProfile(false)}
				onOk={() => setviewProfile(false)}
				footer={false}
			>
				<div className="" id="modal-body-style">
					<div className="row align-items-center g-3">
						<div className="col-md-8">
							<div className="testimonial">
								<div className="pic position-relative lawyer-img">
									<ImageComponent
										src={
											lawyer?.profile_image
												? `${process.env.NEXT_PUBLIC_BASE_URL}/images/${lawyer.profile_image}`
												: '/images/women.png'
										} placeholderImgUrl={
											process.env.NEXT_PUBLIC_IMAGE_URL +
											`/images/default/${lawyer.gender == 'female' ? 'female-lawyer-306x200.png' : 'female-lawyer-306x200.png'
											}`
										}
										alt="user-popup"
										className="image-width-cording"
										width={200}
										height={200}
									/>

								</div>
								<h3 className="testimonial-title" data-bs-toggle="modal" data-bs-target="#exampleModal">
									{single_lawyer?.full_name}
								</h3>
								{single_lawyer?.designation && <p className="description py-3">{single_lawyer?.designation}</p>}
								{single_lawyer?.location_name && (
									<div className="location-move p-0">
										<Image
											src="/images/contact/location.png"
											alt="location icon image"
											width={20}
											height={20}
											objectFit="cover"
										/>
										{single_lawyer?.location_name}
									</div>
								)}

								<p className="stong-text m-0">
									<span>
										<StarIcon width={20} color="#c49073" style={{ marginRight: '5px', height: '30px' }} />
									</span>
									{single_lawyer?.avg_rating_and_reviews ? (
										<>
											<span>
												<strong>
													{single_lawyer?.avg_rating_and_reviews
														? single_lawyer.avg_rating_and_reviews.split('(')[0]
														: ''}
												</strong>
											</span>
											<span>
												(
												{single_lawyer?.avg_rating_and_reviews
													? single_lawyer.avg_rating_and_reviews.split('(')[1]
													: ''}
											</span>
										</>
									) : (
										<span>Review not available</span>
									)}
								</p>

								<div className="btn-family-more d-flex">
									{lawyer?.service_name &&
										lawyer.service_name.split(',').map((service: any, index: any) => (
											<button className="mx-1" key={index}>
												{service} Profession
											</button>
										))}

									{single_lawyer?.acquired && currentYear - single_lawyer?.acquired > 0 && (
										<button className="btn-color ml-2">
											Licensed for {currentYear - single_lawyer?.acquired} years
										</button>
									)}

									<br />
									{single_lawyer?.consultation_duration && (
										<button className="btn-color">
											Free Consultation: {single_lawyer?.consultation_duration}
										</button>
									)}
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							<>
								<Link
									href={`/find-a-professional/${single_lawyer?.slug}/make-an-inquiry`}

									className="text-white"
								>
									<button className="btn-commn" style={{ width: '100%' }}>Make An Inquiry</button>
								</Link>
							</>
						</div>
					</div>

					{single_lawyer?.bio ? (
						<div className="detail-fil">
							<div className="About-detail">
								<h3>About {single_lawyer?.full_name
									?.toLowerCase()
									.replace(/\b\w/g, (char: string) => char.toUpperCase())}</h3>
								{/* <p className="mb-3">
								<Image src="/images/map.png" alt="map icon image" width={20} height={20} />
								Legal Jurisdiction: <span>{single_lawyer?.jurisdiction_name}</span>
							</p> */}
							</div>

							<div className="more-detail">
								{single_lawyer?.specializ_name && (
									<>
										<strong>Specializes In:</strong>
										<p>{single_lawyer?.specializ_name}</p>
									</>
								)}
								{single_lawyer?.bio && (
									<>
										<strong>Bio:</strong>

										{single_lawyer.bio.length > 150 ? (
											<>
												{showMore ? (
													<div dangerouslySetInnerHTML={{ __html: single_lawyer.bio }} />
												) : (
													<div dangerouslySetInnerHTML={{ __html: `${single_lawyer.bio.slice(0, 150)}${single_lawyer.bio.length > 150 ? '...' : ''}` }} />
												)}
											</>
										) : (
											<div dangerouslySetInnerHTML={{ __html: single_lawyer.bio }} />
										)}
									</>
								)}



								{single_lawyer?.hourly_rate_range && (
									<>
										<h3 className="pb-0">Cost</h3>
										<p>Hourly Rates</p>
										<div className="body-font-text text-capitalize">
											{single_lawyer?.hourly_rate_range}
										</div>
									</>
								)}

								{single_lawyer?.payment_method && (
									<>
										<p>Payment Methods</p>
										<div className="body-font-text text-capitalize">
											{single_lawyer?.payment_method}
										</div>
									</>
								)}
							</div>
						</div>
					) : (
						<></>
					)}
				</div>
			</Popup>
		</div>
	);
}
