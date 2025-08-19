import React from 'react';
import { Metadata } from 'next';
import PatentLawyerinDubai from '@/components/services/PatentLawyerinDubai';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Patent Lawyer in Dubai',
		description:
			'Protect your inventions with a patent lawyer in Dubai. Professional Women United provides expert advice on securing and defending patents.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/patent-lawyer-dubai`
		},
		openGraph: {
			title: 'Patent Lawyer in Dubai',
			description:
				'Protect your inventions with a patent lawyer in Dubai. Professional Women United provides expert advice on securing and defending patents.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/patent-lawyer-dubai`,
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
			<PatentLawyerinDubai />
		</>
	);
}
