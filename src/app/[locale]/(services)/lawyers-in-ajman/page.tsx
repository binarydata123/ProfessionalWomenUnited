import React from 'react';
import { Metadata } from 'next';
import BestLawyersAjman from '@/components/services/BestLawyersAjman';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Find the Best Lawyers in Ajman | Connect Legal',
		description:
			'Find the best lawyers in Ajman with Connect Legal. We are your go-to platform for connecting with top-tier legal professionals in the region.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/lawyers-in-ajman`
		},
		openGraph: {
			title: 'Find the Best Lawyers in Ajman | Connect Legal',
			description:
				'Find the best lawyers in Ajman with Connect Legal. We are your go-to platform for connecting with top-tier legal professionals in the region.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/lawyers-in-ajman`,
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
			<BestLawyersAjman />
		</>
	);
}
