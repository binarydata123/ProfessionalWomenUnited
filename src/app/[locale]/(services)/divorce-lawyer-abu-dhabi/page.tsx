import React from 'react';
import { Metadata } from 'next';
import DivorceLawyersAbuDhabi from '@/components/services/DivorceLawyersAbuDhabi';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Divorce Lawyer in Abu Dhab – Professional Women United',
		description:
			'Need legal assistance with your divorce proceedings? Find the best divorce lawyer in Abu Dhabi through Professional Women United and secure the best outcome for your case..',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/divorce-lawyer-abu-dhabi`
		},
		openGraph: {
			title: ' Divorce Lawyer in Abu Dhab – Professional Women United',
			description:
				'Need legal assistance with your divorce proceedings? Find the best divorce lawyer in Abu Dhabi through Professional Women United and secure the best outcome for your case..',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/divorce-lawyer-abu-dhabi`,
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
			<DivorceLawyersAbuDhabi />
		</>
	);
}
