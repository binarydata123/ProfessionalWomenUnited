import React from 'react';
import { Metadata } from 'next';
import CriminalLawyers from '@/components/services/CriminalLawyers';
export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Criminal Lawyer in Abu Dhabi | Professional Women United',
		description:
			'Discover expert criminal lawyers in Abu Dhabi with Professional Women United. Our platform connects you with top criminal lawyers known for their expertise and dedication.!',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/criminal-lawyers-abu-dhabi`
		},
		openGraph: {
			title: 'FCriminal Lawyer in Abu Dhabi | Professional Women United		',
			description:
				'Discover expert criminal lawyers in Abu Dhabi with Professional Women United. Our platform connects you with top criminal lawyers known for their expertise and dedication.!',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/criminal-lawyers-abu-dhabi`,
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
			<CriminalLawyers />
		</>
	);
}
