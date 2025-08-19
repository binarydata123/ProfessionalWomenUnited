import React from 'react';
import { Metadata } from 'next';
import CorporateLawyeDubai from '@/components/services/CorporateLawyeDubai';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Corporate Lawyer in Dubai – Professional Women United',
		description:
			'Safeguard your corporate interests with a corporate lawyer in Dubai. Professional Women United can assist you in all corporate law matters.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/corporate-lawyer-dubai`
		},
		openGraph: {
			title: 'Corporate Lawyer in Dubai – Professional Women United',
			description:
				'Safeguard your corporate interests with a corporate lawyer in Dubai. Professional Women United can assist you in all corporate law matters.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/corporate-lawyer-dubai`,
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
			<CorporateLawyeDubai />
		</>
	);
}
