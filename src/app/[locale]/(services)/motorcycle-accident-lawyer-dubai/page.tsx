import React from 'react';
import { Metadata } from 'next';
import MotorcycleAccidentLawyerDubai from '@/components/services/MotorcycleAccidentLawyerDubai';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Motorcycle Accident Lawyer in Dubai – Connect Legal',
		description:
			'A motorcycle accident lawyer in Dubai can aid you in claiming compensation for injuries and damages. Connect Legal is ready to assist you.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/motorcycle-accident-lawyer-dubai`
		},
		openGraph: {
			title: 'Motorcycle Accident Lawyer in Dubai – Connect Legal',
			description:
				'A motorcycle accident lawyer in Dubai can aid you in claiming compensation for injuries and damages. Connect Legal is ready to assist you.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/motorcycle-accident-lawyer-dubai`,
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
			<MotorcycleAccidentLawyerDubai />
		</>
	);
}
