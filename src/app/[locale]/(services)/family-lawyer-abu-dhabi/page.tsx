import React from 'react';
import { Metadata } from 'next';
import FamilyLawyers from '@/components/services/FamilyLawyers';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Family Lawyer in Abu Dhabi | Connect Legal',
		description:
			' At Connect Legal, we connect you with the best family lawyer in Abu Dhabi who can help you win your case. Find the best lawyer for your case today! ',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/family-lawyer-abu-dhabi`
		},
		openGraph: {
			title: 'Family Lawyer in Abu Dhabi | Connect Legal',
			description:
				' At Connect Legal, we connect you with the best family lawyer in Abu Dhabi who can help you win your case. Find the best lawyer for your case today! ',
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
