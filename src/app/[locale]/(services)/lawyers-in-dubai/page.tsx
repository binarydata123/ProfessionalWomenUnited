import React from 'react';
import { Metadata } from 'next';
import BestLawyersDubai from '@/components/services/BestLawyersDubai';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Find a Lawyer in Dubai | Connect Legal',
		description:
			'Connect Legal simplifies finding the best lawyer in Dubai. Our platform connects you with top legal professionals in the UAE for your case. Try it now!',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/lawyers-in-dubai`
		},
		openGraph: {
			title: 'Find a Lawyer in Dubai | Connect Legal',
			description:
				'Connect Legal simplifies finding the best lawyer in Dubai. Our platform connects you with top legal professionals in the UAE for your case. Try it now!',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/lawyers-in-dubai`,
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
			<BestLawyersDubai />
		</>
	);
}
