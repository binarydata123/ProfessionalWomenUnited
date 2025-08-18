import React from 'react';
import { Metadata } from 'next';
import EmploymentLawyerDubai from '@/components/services/EmploymentLawyerDubai';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Employment Lawyer in Dubai – Connect Legal',
		description:
			'Handle employment disputes or agreements with an employment lawyer in Dubai. Connect Legal provides expert guidance for all employment issues.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/employment-lawyer-dubai`
		},
		openGraph: {
			title: 'Employment Lawyer in Dubai – Connect Legal',
			description:
				'Handle employment disputes or agreements with an employment lawyer in Dubai. Connect Legal provides expert guidance for all employment issues.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/employment-lawyer-dubai`,
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
			<EmploymentLawyerDubai />
		</>
	);
}
