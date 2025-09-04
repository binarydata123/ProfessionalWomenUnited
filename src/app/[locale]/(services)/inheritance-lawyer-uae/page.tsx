import React from 'react';
import { Metadata } from 'next';
import InheritanceLawyerUae from '@/components/services/InheritanceLawyerUae';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Inheritance Lawyer in USA – Professional Women United',
		description:
			'Plan your estate or handle inheritance disputes with an inheritance lawyer in USA. Professional Women United offers expert legal assistance.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/inheritance-lawyer-usa`
		},
		openGraph: {
			title: 'Inheritance Lawyer in USA – Professional Women United',
			description:
				'Plan your estate or handle inheritance disputes with an inheritance lawyer in USA. Professional Women United offers expert legal assistance.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/inheritance-lawyer-usa`,
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
			<InheritanceLawyerUae />
		</>
	);
}
