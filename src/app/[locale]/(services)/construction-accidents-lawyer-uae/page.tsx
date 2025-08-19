import React from 'react';
import { Metadata } from 'next';
import ConstructionAccidentLawyerUae from '@/components/services/ConstructionAccidentLawyerUae';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Construction Accident Lawyers in UAE – Professional Women United',
		description:
			'Injured on a construction site? A construction accident lawyer in UAE can help. Contact Professional Women United for expert advice.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/construction-accident-lawyer-uae`
		},
		openGraph: {
			title: 'Construction Accident Lawyers in UAE – Professional Women United',
			description:
				'Injured on a construction site? A construction accident lawyer in UAE can help. Contact Professional Women United for expert advice.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/construction-accident-lawyer-uae`,
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
			<ConstructionAccidentLawyerUae />
		</>
	);
}
