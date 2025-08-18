import React from 'react';
import { Metadata } from 'next';
import ArbitrationLawyer from '@/components/services/ArbitrationLawyer';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Arbitration Lawyer in UAE – Connect Legal',
		description:
			'For arbitration matters, a skilled arbitration lawyer in UAE can assist you. Reach out to Connect Legal for professional guidance.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/arbitration-lawyer-uae`
		},
		openGraph: {
			title: 'Arbitration Lawyer in UAE – Connect Legal',
			description:
				'For arbitration matters, a skilled arbitration lawyer in UAE can assist you. Reach out to Connect Legal for professional guidance.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/arbitration-lawyer-uae`,
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
			<ArbitrationLawyer />
		</>
	);
}
