import React from 'react';
import { Metadata } from 'next';
import PropertyLawyer from '@/components/services/PropertyLawyer';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Property Lawyer in Dubai – Professional Women United',
		description:
			'Deal with property issues confidently with a property lawyer in Dubai. Professional Women United is here to provide the support you need.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/property-lawyer-dubai`
		},
		openGraph: {
			title: 'Property Lawyer in Dubai – Professional Women United',
			description:
				'Deal with property issues confidently with a property lawyer in Dubai. Professional Women United is here to provide the support you need.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/property-lawyer-dubai`,
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
			<PropertyLawyer />
		</>
	);
}
