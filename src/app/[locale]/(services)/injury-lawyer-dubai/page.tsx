import React from 'react';
import { Metadata } from 'next';
import PersonalInjuryLawyer from '@/components/services/PersonalInjuryLawyer';
import InjuryLawyer from '@/components/services/InjuryLawyer';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Injury Lawyer in Dubai – Connect Legal",
		description: "Injured and seeking justice? An injury lawyer in Dubai can help. Connect Legal provides expert legal counsel for injury cases.",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/injury-lawyer-dubai`
		},
		openGraph: {
			title: "Injury Lawyer in Dubai – Connect Legal",
			description: "Injured and seeking justice? An injury lawyer in Dubai can help. Connect Legal provides expert legal counsel for injury cases.",
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/injury-lawyer-dubai`,
			siteName: process.env.NEXT_APP_NAME,
			images: [
				{
					url: `${process.env.NEXT_PUBLIC_BASE_URL}/OG-image.jpg`,
					width: 350,
					height: 50,
				},
			],
			type: 'website',
		},
	};
}

export default function Page() {

	return (
		<>

			<InjuryLawyer />
		</>
	);
}
