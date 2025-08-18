import React from 'react';
import { Metadata } from 'next';
import EntertainmentLawyerDubai from '@/components/services/EntertainmentLawyerDubai';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Entertainment Lawyer in Dubai – Connect Legal",
		description: "Navigate the complexities of the entertainment industry with an entertainment lawyer in Dubai. Connect Legal offers tailored legal advice.",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/entertainment-lawyer-dubai`
		},
		openGraph: {
			title: "Entertainment Lawyer in Dubai – Connect Legal",
			description: "Navigate the complexities of the entertainment industry with an entertainment lawyer in Dubai. Connect Legal offers tailored legal advice.",
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/entertainment-lawyer-dubai`,
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
			<EntertainmentLawyerDubai />
		</>
	);
}
