import React from 'react';
import { Metadata } from 'next';
import BestLawyersFujairah from '@/components/services/BestLawyersFujairah';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Best Professionals Fujairah',
		description:
			'Professional Women United simplifies the process of finding the best lawyer in Fujairah. Search through our selection of lawyers and find the best one for your case!',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/lawyers-in-fujairah`
		},
		openGraph: {
			title: 'Best Professionals Fujairah		',
			description:
				'Professional Women United simplifies the process of finding the best lawyer in Fujairah. Search through our selection of lawyers and find the best one for your case!',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/lawyers-in-fujairah`,
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
			<BestLawyersFujairah />
		</>
	);
}
