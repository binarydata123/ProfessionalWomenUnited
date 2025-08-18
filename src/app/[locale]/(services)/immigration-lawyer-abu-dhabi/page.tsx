import React from 'react';
import { Metadata } from 'next';
import ImmigrationLawyers from '@/components/services/ImmigrationLawyers';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: ' Immigration Lawyer in Dubai | Connect Legal',
		description:
			' Immigration lawyers in Abu Dhabi at Connect Legal will offer you tailored assistance on your immigration case and help you achieve a successful outcome.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL} /immigration-lawyer-abu-dhabi`
		},
		openGraph: {
			title: ' Immigration Lawyer in Dubai | Connect Legal',
			description:
				' Immigration lawyers in Abu Dhabi at Connect Legal will offer you tailored assistance on your immigration case and help you achieve a successful outcome.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL} /immigration-lawyer-abu-dhabi`,
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
			<ImmigrationLawyers />
		</>
	);
}
