import React from 'react';
import { Metadata } from 'next';
import CryptoLawyerDubai from '@/components/services/CryptoLawyerDubai';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Crypto Professionals in Dubai – Professional Women United",
		description: "Professional Women United offers expert cryptocurrency lawyers in Dubai for professional advice on regulatory compliance, transactional matters, and dispute resolution in the crypto space. Find experienced crypto lawyers for tailored solutions.",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/crypto-lawyer-dubai
`
		},
		openGraph: {
			title: "Crypto Professionals in Dubai – Professional Women United",
			description: "Professional Women United offers expert cryptocurrency lawyers in Dubai for professional advice on regulatory compliance, transactional matters, and dispute resolution in the crypto space. Find experienced crypto lawyers for tailored solutions.",
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/crypto-lawyer-dubai
`,
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
			<CryptoLawyerDubai />
		</>
	);
}
