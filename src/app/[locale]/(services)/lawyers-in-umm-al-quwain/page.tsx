import React from 'react';
import { Metadata } from 'next';
import BestLawyersUmmAlQuwain from '@/components/services/BestLawyersUmmAlQuwain';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Find the Best Lawyers in Umm Al Quwain | Professional Women United',
		description:
			'Connecting you with the best lawyers Umm Al Quwain has to offer, Professional Women United is your gateway to professional legal representation. Start your search now!',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/lawyers-in-umm-al-quwain`
		},
		openGraph: {
			title: 'Find the Best Lawyers in Umm Al Quwain | Professional Women United',
			description:
				'Connecting you with the best lawyers Umm Al Quwain has to offer, Professional Women United is your gateway to professional legal representation. Start your search now!',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/lawyers-in-umm-al-quwain`,
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
			<BestLawyersUmmAlQuwain />
		</>
	);
}
