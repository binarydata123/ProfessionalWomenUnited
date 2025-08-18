import React from 'react';
import { Metadata } from 'next';
import ConstructionLawyerUae from '@/components/services/ConstructionLawyerUae';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Dubai Construction Lawyer – Connect Legal',
		description:
			'Navigate the complexities of the construction industry with a construction lawyer in Dubai. Connect Legal offers expert legal support.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/dubai-construction-lawyer`
		},
		openGraph: {
			title: 'Dubai Construction Lawyer – Connect Legal',
			description:
				'Navigate the complexities of the construction industry with a construction lawyer in Dubai. Connect Legal offers expert legal support.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/dubai-construction-lawyer`,
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
			<ConstructionLawyerUae />
		</>
	);
}
