import React from 'react';
import { Metadata } from 'next';
import PremsiesLiabilityLawyer from '@/components/services/PremsiesLiabilityLawyer';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Premises Liability Lawyer in UAE – Connect Legal',
		description:
			'Address premises liability issues with a premises liability lawyer in UAE. Connect Legal can help you navigate your legal rights and options.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/premises-liability-lawyer-uae`
		},
		openGraph: {
			title: 'Premises Liability Lawyer in UAE – Connect Legal',
			description:
				'Address premises liability issues with a premises liability lawyer in UAE. Connect Legal can help you navigate your legal rights and options.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/premises-liability-lawyer-uae`,
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
			<PremsiesLiabilityLawyer />
		</>
	);
}
