import React from 'react';
import { Metadata } from 'next';
import BrainInjuryLawyer from '@/components/services/BrainInjuryLawyer';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Brain Injury Lawyer in Dubai – Professional Women United',
		description:
			'Recover from traumatic injuries with a brain injury lawyer in Dubai. Professional Women United is here to help with expert professional advice.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/brain-injury-lawyer-dubai`
		},
		openGraph: {
			title: 'Brain Injury Lawyer in Dubai – Professional Women United',
			description:
				'Recover from traumatic injuries with a brain injury lawyer in Dubai. Professional Women United is here to help with expert professional advice.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/brain-injury-lawyer-dubai`,
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
			<BrainInjuryLawyer />
		</>
	);
}
