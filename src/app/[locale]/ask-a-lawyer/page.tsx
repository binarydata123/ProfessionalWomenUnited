import React from 'react';
import type { Metadata } from 'next';
import AskAlawyer from '@/components/public/AskAlawyer';
import '../legal-issue/legal-Issue-description-flow.css';

export const metadata: Metadata = {
	title: 'Ask a Lawyer - Professional Women United',
	description: 'Get professional advice and answers to your questions from experienced lawyers on Professional Women United. Ask a lawyer today!',
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/ask-a-lawyer`
	},
	openGraph: {
		title: 'Ask a Lawyer - Professional Women United',
		description: 'Get professional advice and answers to your questions from experienced lawyers on Professional Women United. Ask a lawyer today!',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/ask-a-lawyer`,
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

export default function page() {
	return <AskAlawyer />;
}
