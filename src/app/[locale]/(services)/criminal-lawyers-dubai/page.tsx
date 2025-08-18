import React from 'react';
import { Metadata } from 'next';
import BankingLawyerUae from '@/components/services/BankingLawyerUae';
import CriminalLawyersDubai from '@/components/services/CriminalLawyersDubai';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Criminal Lawyers in Dubai – Connect Legal',
		description:
			'Defend against criminal charges with a criminal lawyer in Dubai. Connect Legal provides access to experienced defense attorneys.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/criminal-lawyers-dubai`
		},
		openGraph: {
			title: 'Criminal Lawyers in Dubai – Connect Legal',
			description:
				'Defend against criminal charges with a criminal lawyer in Dubai. Connect Legal provides access to experienced defense attorneys.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/criminal-lawyers-dubai`,
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
			<CriminalLawyersDubai />
		</>
	);
}
