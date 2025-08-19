import React from 'react';
import { Metadata } from 'next';
import MarriageLawyer from '@/components/services/MarriageLawyer';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Marriage Lawyers in Dubai – Professional Women United',
		description:
			'Ensure your marriage aligns with local laws using a marriage lawyer in Dubai. Professional Women United can guide you through marital legal requirements.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/marriage-lawyers-dubai
	`
		},
		openGraph: {
			title: 'Marriage Lawyers in Dubai – Professional Women United',
			description:
				'Ensure your marriage aligns with local laws using a marriage lawyer in Dubai. Professional Women United can guide you through marital legal requirements.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/marriage-lawyers-dubai
	`,
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
			<MarriageLawyer />
		</>
	);
}
