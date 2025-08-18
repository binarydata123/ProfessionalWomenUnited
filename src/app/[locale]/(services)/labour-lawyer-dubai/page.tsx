import React from 'react';
import { Metadata } from 'next';
import LabourLawyer from '@/components/services/LabourLawyer';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Labour Lawyer in Dubai – Connect Legal',
		description:
			'Address workplace disputes or contracts with a labour lawyer in Dubai. Connect Legal offers comprehensive employment law services.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/labour-lawyer-dubai`
		},
		openGraph: {
			title: 'Labour Lawyer in Dubai – Connect Legal',
			description:
				'Address workplace disputes or contracts with a labour lawyer in Dubai. Connect Legal offers comprehensive employment law services.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/labour-lawyer-dubai`,
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
			<LabourLawyer />
		</>
	);
}
