import React from 'react';
import { Metadata } from 'next';
import ChildCustodyLawyerUae from '@/components/services/ChildCustodyLawyerUae';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Child Custody Lawyer in UAE – Connect Legal',
		description:
			'Secure the best possible outcome for child custody with a child custody lawyer in UAE. Contact Connect Legal for specialized legal support.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/child-custody-lawyer-uae`
		},
		openGraph: {
			title: 'Child Custody Lawyer in UAE – Connect Legal',
			description:
				'Secure the best possible outcome for child custody with a child custody lawyer in UAE. Contact Connect Legal for specialized legal support.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/child-custody-lawyer-uae`,
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
			<ChildCustodyLawyerUae />
		</>
	);
}
