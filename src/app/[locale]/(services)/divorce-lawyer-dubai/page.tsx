import React from 'react';
import { Metadata } from 'next';
import DivorceLawyer from '@/components/services/DivorceLawyer';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Divorce Lawyer in Dubai – Professional Women United',
		description:
			'Need guidance on divorce proceedings? Professional Women United can help you find a divorce lawyer in Dubai who offers expert advice for yOur professional needs.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/divorce-lawyer-dubai`
		},
		openGraph: {
			title: ' Divorce Lawyer in Dubai – Professional Women United',
			description:
				'Need guidance on divorce proceedings? Professional Women United can help you find a divorce lawyer in Dubai who offers expert advice for yOur professional needs.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/divorce-lawyer-dubai`,
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
			<DivorceLawyer />
		</>
	);
}
