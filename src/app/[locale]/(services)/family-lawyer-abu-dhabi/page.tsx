import React from 'react';
import { Metadata } from 'next';
import FamilyLawyers from '@/components/services/FamilyLawyers';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Family Professionalyer in Abu Dhabi | Professional Women United',
		description:
			' At Professional Women United, we connect you with the best Family Professionalyer in Abu Dhabi who can help you win your case. Find the best lawyer for your case today! ',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/family-lawyer-abu-dhabi`
		},
		openGraph: {
			title: 'Family Professionalyer in Abu Dhabi | Professional Women United',
			description:
				' At Professional Women United, we connect you with the best Family Professionalyer in Abu Dhabi who can help you win your case. Find the best lawyer for your case today! ',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/family-lawyer-abu-dhabi`,
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
			<FamilyLawyers />
		</>
	);
}
