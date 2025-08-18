import React from 'react';
import { Metadata } from 'next';
import CivilLawyer from '@/components/services/CivilLawyer';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Civil Lawyer in Dubai – Connect Legal',
		description:
			'Resolve civil disputes effectively with a civil lawyer in Dubai. Contact Connect Legal for professional dispute resolution.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/civil-lawyer-dubai`
		},
		openGraph: {
			title: 'Civil Lawyer in Dubai – Connect Legal',
			description:
				'Resolve civil disputes effectively with a civil lawyer in Dubai. Contact Connect Legal for professional dispute resolution.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/civil-lawyer-dubai`,
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
			<CivilLawyer />
		</>
	);
}
