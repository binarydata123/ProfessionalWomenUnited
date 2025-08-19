import React from 'react';
import type { Metadata } from 'next';
import './choose-profile.css';
import ChooseProfileSection from '@/components/public/ChooseProfile';
import { ArrowSmallLeftIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Choose Your Profile - Professional Women United',
	description: 'Select your role on Professional Women United to either expand your reach as a lawyer or get legal advice as an user.',
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/choose-profile`
	},
	openGraph: {
		title: 'Choose Your Profile - Professional Women United',
		description: 'Select your role on Professional Women United to either expand your reach as a lawyer or get legal advice as an user.',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/choose-profile`,
		siteName: `${process.env.NEXT_APP_NAME}`,
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_BASE_URL}/OG-image.jpg`,
				width: 350,
				height: 50,
			},
		],
		type: 'website',
	},
}

export default function ChooseProfile() {

	return (
		<div className="auth-page-wrapper w-100">

			<div className="main-login chooseProfile top-sp-big">
				<Link href="/" className="backtobtn mb-5">
					<ArrowSmallLeftIcon width={20} />
					Back
				</Link>
				<h1>
					<span>Join Our </span>Professional Women's Network
				</h1>
				<p className="p-text-label pb-3">
					Get recognized as a top professional in your city and connect with new opportunities.
				</p>
			</div>
			<ChooseProfileSection />
		</div>
	);
}