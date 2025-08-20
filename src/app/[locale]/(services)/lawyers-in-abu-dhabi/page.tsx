import React from 'react';
import { Metadata } from 'next';
import BestLawyersAbuDhabi from '@/components/services/BestLawyersAbuDhabi';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Find a Professional in Abu Dhabi | Professional Women United',
		description:
			' Professional Women United connects you with the top lawyers in Abu Dhabi. From corporate matters to personal challenges, find expert legal assistance in just a few clicks.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/lawyers-in-dubai`
		},
		openGraph: {
			title: 'Find a Professional in Abu Dhabi | Professional Women United',
			description:
				' Professional Women United connects you with the top lawyers in Abu Dhabi. From corporate matters to personal challenges, find expert legal assistance in just a few clicks.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/lawyers-in-dubai`,
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
			<BestLawyersAbuDhabi />
		</>
	);
}
