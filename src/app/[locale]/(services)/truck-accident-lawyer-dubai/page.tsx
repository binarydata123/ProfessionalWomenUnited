import React from 'react';
import { Metadata } from 'next';
import TruckAccidentlawyerDubai from '@/components/services/TruckAccidentlawyerDubai';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Truck Accident Lawyer in Dubai – Professional Women United',
		description:
			'If you\'ve been involved in a truck accident, a truck accident lawyer in Dubai can help.Contact Professional Women United for expert legal assistance.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/truck-accident-lawyer-dubai`
		},
		openGraph: {
			title: 'Truck Accident Lawyer in Dubai – Professional Women United',
			description:
				'If you\'ve been involved in a truck accident, a truck accident lawyer in Dubai can help.Contact Professional Women United for expert legal assistance.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/truck-accident-lawyer-dubai`,
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
			<TruckAccidentlawyerDubai />
		</>
	);
}
