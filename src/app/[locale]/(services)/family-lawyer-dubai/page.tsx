import React from 'react';
import { Metadata } from 'next';
import FamilyLawyerDubai from '@/components/services/FamilyLawyerDubai';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Family Professionalyer in Dubai – Professional Women United',
		description:
			'Protect your family\'s future with the help of a Family Professionalyer in Dubai.Professional Women United can assist you in navigating complex Family Professional matters.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/family-lawyer-dubai`
		},
		openGraph: {
			title: 'Family Professionalyer in Dubai – Professional Women United',
			description:
				'Protect your family\'s future with the help of a Family Professionalyer in Dubai.Professional Women United can assist you in navigating complex Family Professional matters.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/family-lawyer-dubai`,
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
			<FamilyLawyerDubai />
		</>
	);
}
