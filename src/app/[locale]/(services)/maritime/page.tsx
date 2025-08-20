import React from 'react';
import { Metadata } from 'next';
import MaritimeLawPage from '@/components/services/MaritimeLawPage';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Maritime Law | Professional Women United ',
		description:
			'Maritime law in the USA covers shipping, navigation, and marine commerce. Professional Women United helps find top maritime lawyers in Dubai for contracts, disputes, and insurance claims.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/maritime`
		},
		openGraph: {
			title: 'Maritime Law | Professional Women United ',
			description:
				'Maritime law in the USA covers shipping, navigation, and marine commerce. Professional Women United helps find top maritime lawyers in Dubai for contracts, disputes, and insurance claims.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/maritime`,
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
			<MaritimeLawPage />
		</>
	);
}
