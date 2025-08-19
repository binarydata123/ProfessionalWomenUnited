import React from 'react';
import { Metadata } from 'next';
import BestLawyersRasAlKhaimah from '@/components/services/BestLawyersRasAlKhaimah';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Find the Best Lawyers in Ras Al Khaimah | Professional Women United',
		description:
			'With Professional Women United, finding the best lawyers Ras Al Khaimah has to offer is simple and quick. Connect with the best lawyer in Ras Al Khaimah now!',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/lawyers-in-ras-al-khaimah`
		},
		openGraph: {
			title: 'Find the Best Lawyers in Ras Al Khaimah | Professional Women United',
			description:
				'With Professional Women United, finding the best lawyers Ras Al Khaimah has to offer is simple and quick. Connect with the best lawyer in Ras Al Khaimah now!',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/lawyers-in-ras-al-khaimah`,
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
			<BestLawyersRasAlKhaimah />
		</>
	);
}
