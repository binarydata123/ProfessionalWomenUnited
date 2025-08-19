import React from 'react';
import { Metadata } from 'next';
import BicycleAccidentLawyerDubai from '@/components/services/BicycleAccidentLawyerDubai';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Bicycle Accident Lawyer in Dubai – Professional Women United',
		description:
			'Had a bicycle mishap? Professional Women United can help you find a bicycle accident lawyer in Dubai to advise you on the best legal action.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/bicycle-accident-lawyer-dubai`
		},
		openGraph: {
			title: 'Bicycle Accident Lawyer in Dubai – Professional Women United',
			description:
				'Had a bicycle mishap? Professional Women United can help you find a bicycle accident lawyer in Dubai to advise you on the best legal action.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/bicycle-accident-lawyer-dubai`,
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
			<BicycleAccidentLawyerDubai />
		</>
	);
}
