import React from 'react';
import { Metadata } from 'next';
import BusinessLawyer from '@/components/services/BusinessLawyer';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Business Lawyer in Dubai – Connect Legal',
		description:
			'Expand or protect your business with a business lawyer in Dubai. Connect Legal provides expert consultations for all your business law needs.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/business-lawyer-dubai`
		},
		openGraph: {
			title: 'Business Lawyer in Dubai – Connect Legal',
			description:
				'Expand or protect your business with a business lawyer in Dubai. Connect Legal provides expert consultations for all your business law needs.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/business-lawyer-dubai`,
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
			<BusinessLawyer />
		</>
	);
}
