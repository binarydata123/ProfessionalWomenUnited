import React from 'react';
import { Metadata } from 'next';
import ChildSupportLawyer from '@/components/services/ChildSupportLawyer';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Child Support Lawyer – Connect Legal',
		description:
			'Ensure your child receives adequate support. Connect Legal can help you find a child support lawyer in Dubai to guide you through the process.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/child-support-lawyer`
		},
		openGraph: {
			title: 'Child Support Lawyer – Connect Legal',
			description:
				'Ensure your child receives adequate support. Connect Legal can help you find a child support lawyer in Dubai to guide you through the process.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/child-support-lawyer`,
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
			<ChildSupportLawyer />
		</>
	);
}
