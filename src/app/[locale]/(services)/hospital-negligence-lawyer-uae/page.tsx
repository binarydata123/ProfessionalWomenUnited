import React from 'react';
import { Metadata } from 'next';
import HospitalNegligenceLawyer from '@/components/services/HospitalNegligenceLawyer';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Hospital Negligence Lawyer in UAE – Professional Women United",
		description: "For cases of hospital negligence, a hospital negligence lawyer in UAE can assist you. Contact Professional Women United for professional legal support.",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/hospital-negligence-lawyer-uae`
		},
		openGraph: {
			title: "Hospital Negligence Lawyer in UAE – Professional Women United",
			description: "For cases of hospital negligence, a hospital negligence lawyer in UAE can assist you. Contact Professional Women United for professional legal support.",
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/hospital-negligence-lawyer-uae`,
			siteName: process.env.NEXT_APP_NAME,
			images: [
				{
					url: `${process.env.NEXT_PUBLIC_BASE_URL}/OG-image.jpg`,
					width: 350,
					height: 50,
				},
			],
			type: 'website',
		},
	};
}

export default function Page() {

	return (
		<>
			<HospitalNegligenceLawyer />
		</>
	);
}
