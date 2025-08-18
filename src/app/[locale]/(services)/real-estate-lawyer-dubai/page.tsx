import React from 'react';
import { Metadata } from 'next';
import RealEstateLawyers from '@/components/services/RealEstateLawyers';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Real Estate Lawyer in Dubai – Connect Legal',
		description:
			'Buying or selling property? A real estate lawyer in Dubai can guide you through the process. Contact Connect Legal for expert advice.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/real-estate-lawyer-dubai`
		},
		openGraph: {
			title: 'Real Estate Lawyer in Dubai – Connect Legal',
			description:
				'Buying or selling property? A real estate lawyer in Dubai can guide you through the process. Contact Connect Legal for expert advice.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/real-estate-lawyer-dubai`,
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
			<RealEstateLawyers />
		</>
	);
}
