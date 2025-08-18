import React from 'react';
import { Metadata } from 'next';
import PersonalInjuryLawyer from '@/components/services/PersonalInjuryLawyer';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Personal Injury Lawyer in Dubai – Connect Legal",
		description: "Suffered an injury? A personal injury lawyer in Dubai can help you seek compensation. Connect Legal is here to assist you every step of the way.",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/personal-injury-lawyer-dubai`
		},
		openGraph: {
			title: "Personal Injury Lawyer in Dubai – Connect Legal",
			description: "Suffered an injury? A personal injury lawyer in Dubai can help you seek compensation. Connect Legal is here to assist you every step of the way.",
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/personal-injury-lawyer-dubai`,
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
			<PersonalInjuryLawyer />
		</>
	);
}
