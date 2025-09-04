import React from 'react';
import { Metadata } from 'next';
import BankingLawyerUae from '@/components/services/BankingLawyerUae';
import InsolvencyLawyer from '@/components/services/BankruptcyLawyerUuae';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Bankruptcy Lawyer in USA – Professional Women United',
		description:
			'Facing financial distress? A bankruptcy lawyer in USA can provide the guidance you need. Contact Professional Women United today.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/bankruptcy-lawyer-usa`
		},
		openGraph: {
			title: 'Bankruptcy Lawyer in USA – Professional Women United',
			description:
				'Facing financial distress? A bankruptcy lawyer in USA can provide the guidance you need. Contact Professional Women United today.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/bankruptcy-lawyer-usa`,
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
			<InsolvencyLawyer />
		</>
	);
}
