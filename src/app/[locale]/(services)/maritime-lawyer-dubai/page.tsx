import React from 'react';
import { Metadata } from 'next';
import MaritimeLawyer from '@/components/services/MaritimeLawyer';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Maritime Lawyer in Dubai – Professional Women United',
		description:
			'For maritime legal concerns, a maritime lawyer in Dubai can provide you with expert advice. Contact Professional Women United for assistance.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/maritime-lawyer-dubai
`
		},
		openGraph: {
			title: 'Maritime Lawyer in Dubai – Professional Women United',
			description:
				'For maritime legal concerns, a maritime lawyer in Dubai can provide you with expert advice. Contact Professional Women United for assistance.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/maritime-lawyer-dubai
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
			<MaritimeLawyer />
		</>
	);
}
