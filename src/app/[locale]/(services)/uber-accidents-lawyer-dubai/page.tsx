import React from 'react';
import { Metadata } from 'next';
import UberAccidentLawyerDubai from '@/components/services/UberAccidentLawyerDubai';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Uber Accidents Lawyer in Dubai – Professional Women United',
		description:
			'Involved in a rideshare accident? Professional Women United can connect you with an Uber accidents lawyer in Dubai to handle your case.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/uber-accident-lawyer-dubai`
		},
		openGraph: {
			title: 'Uber Accidents Lawyer in Dubai – Professional Women United',
			description:
				' Involved in a rideshare accident? Professional Women United can connect you with an Uber accidents lawyer in Dubai to handle your case.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/uber-accident-lawyer-dubai`,
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
			<UberAccidentLawyerDubai />
		</>
	);
}
