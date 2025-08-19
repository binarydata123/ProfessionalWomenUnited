import React from 'react';
import { Metadata } from 'next';
import CarAccidentLawyerDubai from '@/components/services/CarAccidentLawyerDubai';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Car Accident Lawyer in Dubai – Professional Women United',
		description:
			'Recover your losses from a traffic incident with a car accident lawyer in Dubai. Professional Women United provides the expert advice you need.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/car-accident-lawyer-dubai`
		},
		openGraph: {
			title: 'Car Accident Lawyer in Dubai – Professional Women United',
			description:
				'Recover your losses from a traffic incident with a car accident lawyer in Dubai. Professional Women United provides the expert advice you need.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/car-accident-lawyer-dubai`,
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
			<CarAccidentLawyerDubai />
		</>
	);
}
