import React from 'react';
import { Metadata } from 'next';
import CommercialLawyerDubai from '@/components/services/CommercialLawyerDubai';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Commercial Lawyer in Dubai – Professional Women United',
		description:
			'For commercial law issues, contact Professional Women United to find a commercial lawyer in Dubai who can provide strategic legal advice.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/commercial-lawyer-dubai`
		},
		openGraph: {
			title: 'Commercial Lawyer in Dubai – Professional Women United',
			description:
				'For commercial law issues, contact Professional Women United to find a commercial lawyer in Dubai who can provide strategic legal advice.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/commercial-lawyer-dubai`,
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
			<CommercialLawyerDubai />
		</>
	);
}
