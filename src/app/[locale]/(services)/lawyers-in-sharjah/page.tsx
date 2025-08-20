import React from 'react';
import { Metadata } from 'next';
import BestLawyersSharjah from '@/components/services/BestLawyersSharjah';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Find Lawyer Professionals Sharjah | Professional Women United',
		description:
			'Find the best lawyers in Sharjah with Professional Women United. Expert advice for family, business, and property matters. Start your search today!',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/lawyers-in-sharjah`
		},
		openGraph: {
			title: 'Find Lawyer Professionals Sharjah | Professional Women United',
			description:
				'Find the best lawyers in Sharjah with Professional Women United. Expert advice for family, business, and property matters. Start your search today!',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/lawyers-in-sharjah`,
			siteName: process.env.NEXT_APP_NAME,
			images: [
				{
					url: `${process.env.NEXT_PUBLIC_BASE_URL}/OG-image.jpg`,
					width: 350,
					height: 50
				}
			],
			type: 'website'
		}
	};
}

export default function Page() {
	return (
		<>
			<BestLawyersSharjah />
		</>
	);
}
