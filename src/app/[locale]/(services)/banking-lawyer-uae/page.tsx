import React from 'react';
import { Metadata } from 'next';
import BankingLawyerUae from '@/components/services/BankingLawyerUae';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Banking Lawyer in UAE – Professional Women United',
		description:
			'Navigate your banking professional issues with a banking lawyer in UAE. Professional Women United offers expert advice and support.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/banking-lawyer-uae`
		},
		openGraph: {
			title: 'Banking Lawyer in UAE – Professional Women United',
			description:
				'Navigate your banking professional issues with a banking lawyer in UAE. Professional Women United offers expert advice and support.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/banking-lawyer-uae`,
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
			<BankingLawyerUae />
		</>
	);
}
