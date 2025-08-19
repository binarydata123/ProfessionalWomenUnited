import React from 'react';
import { Metadata } from 'next';
import DisputeLawyerDubai from '@/components/services/DisputeLawyerDubai';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Rental Dispute Lawyer in Dubai – Professional Women United',
		description:
			'Resolve legal disputes effectively with a dispute resolution lawyer in Dubai. Contact Professional Women United for expert negotiation and litigation support.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/dispute-lawyer-dubai`
		},
		openGraph: {
			title: 'Rental Dispute Lawyer in Dubai – Professional Women United',
			description:
				'Resolve legal disputes effectively with a dispute resolution lawyer in Dubai. Contact Professional Women United for expert negotiation and litigation support.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/dispute-lawyer-dubai`,
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
			<DisputeLawyerDubai />
		</>
	);
}
