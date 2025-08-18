import React from 'react';
import { Metadata } from 'next';
import ImmigrationLawyer from '@/components/services/ImmigrationLawyer';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Immigration Lawyer in Dubai – Connect Legal',
		description:
			'Navigate immigration laws and regulations with an immigration lawyer in Dubai. Connect Legal provides expert legal counsel.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/immigration-lawyer-dubai`
		},
		openGraph: {
			title: 'Immigration Lawyer in Dubai – Connect Legal',
			description:
				'Navigate immigration laws and regulations with an immigration lawyer in Dubai. Connect Legal provides expert legal counsel.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/immigration-lawyer-dubai`,
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
			<ImmigrationLawyer />
		</>
	);
}
