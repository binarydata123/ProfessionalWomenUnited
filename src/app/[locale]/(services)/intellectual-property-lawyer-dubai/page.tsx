import React from 'react';
import { Metadata } from 'next';
import IntellectualPropertyLawyer from '@/components/services/IntellectualPropertyLawyer';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Intellectual Property Lawyer in Dubai – Professional Women United',
		description:
			'Protect your creative and industrial property with an intellectual property lawyer in Dubai. Professional Women United can guide you through the process.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL} /intellectual-property-lawyer-dubai
`
		},
		openGraph: {
			title: 'Intellectual Property Lawyer in Dubai – Professional Women United',
			description:
				'Protect your creative and industrial property with an intellectual property lawyer in Dubai. Professional Women United can guide you through the process.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL} /intellectual-property-lawyer-dubai
`,
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
			<IntellectualPropertyLawyer />
		</>
	);
}
