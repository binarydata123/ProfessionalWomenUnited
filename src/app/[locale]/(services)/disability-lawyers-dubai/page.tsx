import React from 'react';
import { Metadata } from 'next';
import DisabilityLawyersDubai from '@/components/services/DisabilityLawyersDubai';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Disability Lawyers in Dubai – Professional Women United',
		description:
			'Tackle disability law issues with a disability lawyer in Dubai. Professional Women United provides specialized advice to help you navigate these laws.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/disability-lawyers-dubai`
		},
		openGraph: {
			title: 'Disability Lawyers in Dubai – Professional Women United',
			description:
				'Tackle disability law issues with a disability lawyer in Dubai. Professional Women United provides specialized advice to help you navigate these laws.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/disability-lawyers-dubai`,
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
			<DisabilityLawyersDubai />
		</>
	);
}
