import React from 'react';
import type { Metadata } from 'next';
import './legal-Issue-description-flow.css';
import LegalIssuePage from '@/components/public/LegalIssuePage';

export const metadata: Metadata = {
	title: 'professional issues - Professional Women United',
	description: 'Explore professional issues on Professional Women United. Find information and resources on a variety of legal topics. Get guidance and support for your legal concerns.',
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/legal-issue`
	},
	openGraph: {
		title: 'professional issues - Professional Women United',
		description: 'Explore professional issues on Professional Women United. Find information and resources on a variety of legal topics. Get guidance and support for your legal concerns.',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/legal-issue`,
		siteName: `${process.env.NEXT_APP_NAME}`,
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_BASE_URL}/OG-image.jpg`,
				width: 350,
				height: 50,
			},
		],
		type: 'website',
	},
}

export default function Page() {
	return (
		<>
			<LegalIssuePage />
		</>
	);
}
