'use client';
import { ChevronRightIcon, StarIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import Popup from '@/commonUI/Popup';
import { checkUserOnline, getSingleLawyerDetails } from './../../../../lib/frontendapi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import ImageComponent from '@/commonUI/ImageComponent';
import LawyerLoadingPlaceholder from '@/commonUI/LawyerLoadingPlaceholder';
import AuthContext from '@/context/AuthContext';
import { FaRegEye, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import './style.css';
import { useRouter } from 'next/navigation';

interface Props {
	lawyer?: any;
	Key?: any;
	showLocation?: boolean;
	ContinueButton?: boolean;
	ShowLoader?: boolean;
}

export default function ProfessionalCard({
	lawyer,
	Key,
	showLocation = true,
	ContinueButton = false,
	ShowLoader = true
}: Props) {
	const { user } = useContext(AuthContext);
	const router = useRouter();
	const [singleProfessional, setSingleProfessional] = useState<any>('');

	const [isLoading, setIsLoading] = useState(false);

	// const handleSingleProfessionalDetails = async (id: any) => {
	// 	try {
	// 		const res = await getSingleLawyerDetails(id);
	// 		if (res.status == true) {
	// 			setSingleProfessional(res.data);
	// 		}
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	useEffect(() => {
		if (lawyer) {
			setIsLoading(false);
		}
	}, []);

	if (isLoading && ShowLoader && process.env.NEXT_PUBLIC_DATA_LOADING_PLACEHOLDER === 'true') {
		return <LawyerLoadingPlaceholder />;
	}

	const placeholderImgUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/default/${lawyer.gender == 'male' ? 'male-professional.png' : 'female-professional.png'}`;

	// Format rating text
	const formatRating = (ratingText?: string) => {
		if (!ratingText) return null;

		const parts = ratingText.split('(');
		if (parts.length === 2) {
			return {
				rating: parts[0].trim(),
				reviews: `(${parts[1].trim()}`
			};
		}
		return {
			rating: ratingText,
			reviews: ''
		};
	};

	const ratingData = formatRating(lawyer?.avg_rating_and_reviews);
	const primaryService = lawyer?.service_name?.split(',')[0];

	// Function to handle phone call
	const handlePhoneCall = (phoneNumber: string) => {
		// Remove any non-digit characters except '+' for international numbers
		const cleanedNumber = phoneNumber.replace(/[^\d+]/g, '');
		window.location.href = `tel:${cleanedNumber}`;
	};

	return (
		<>
			<div className="professional-card" key={Key}>
				<div className="professional-image-container">
					<Link href={`/find-a-professional/${lawyer?.slug}`}>
						<div
							// className="professional-image"
							className={lawyer?.profile_image ? "professional-image" : "professional-image-dummy"}
							style={{
								backgroundImage: `url("${lawyer?.profile_image
									? `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/profile/${encodeURIComponent(lawyer.profile_image)}`
									: lawyer?.gender === 'female'
										? '/images/female-vectors-blank-profile.png'
										: '/images/female-vectors-blank-profile.png'
									}")`
							}}

						>
							{lawyer?.is_new == 1 && (
								<div className="new-badge">
									New
									<Image
										src="/images/contact/blink.svg"
										alt="New professional"
										width={10}
										height={10}
									/>
								</div>
							)}

							<div className="image-overlay">
								{ContinueButton && (
									<button className="continue-button">
										Continue
										<span className="arrow-icon">
											<ChevronRightIcon width={16} color={'#fff'} />
										</span>
									</button>
								)}
							</div>
						</div>
					</Link>
				</div>

				<div className="professional-info ">
					<div className="name-title-container">
						<Link href={`/find-a-professional/${lawyer?.slug}`}>
							<h3 className="professional-name">
								{lawyer?.full_name?.toLowerCase().replace(/\b\w/g, (char: string) => char.toUpperCase())}
							</h3>
						</Link>
						<p className="professional-title">{primaryService}</p>
					</div>

					<div className="location-rating-row">
						{showLocation && lawyer?.location_name && (
							<div className="professional-location">
								<HiOutlineLocationMarker className="location-icon" />
								{lawyer.location_name}
							</div>
						)}

						{ratingData ? (
							<div className="professional-rating">
								<StarIcon width={14} height={14} className="star-icon" />
								<span className="rating-value">{ratingData.rating}</span>
								<span className="reviews-count">{ratingData.reviews}</span>
							</div>
						) : (
							<div className="professional-rating no-reviews">No reviews yet</div>
						)}
					</div>
					<p className="professional-description">
						{lawyer?.bio ? (
							lawyer.bio.length > 100 ? `${lawyer.bio.substring(0, 100)}...` : lawyer.bio
						) : (
							""
						)}
					</p>

					<div className="professional-contact">
						<div className="direct-line">
							<div className="direct-line-label">
								<FaPhoneAlt className="phone-icon" size={20} />
								{lawyer?.phone_number ? (
									<span
										className="phone-number clickable-phone"
										onClick={() => handlePhoneCall(lawyer.phone_number)}
									>
										{lawyer.phone_number}
									</span>
								) : (
									<span className="phone-number">+1 (555) 123-4567</span>
								)}
							</div>

						</div>
					</div>

					<div className="professional-actions">
						<a
							href={`tel:${lawyer.phone_number}`} className="text-white">
							<button className="contact-button">
								<FaEnvelope className="button-icon" />
								Contact Me
							</button></a>
						<Link href={`/find-a-professional/${lawyer?.slug}`}>
							<button
								className="profile-button"
							>
								<FaRegEye className="button-icon" />
								View Profile
							</button></Link>
					</div>
				</div>
			</div>

		</>
	);
}
