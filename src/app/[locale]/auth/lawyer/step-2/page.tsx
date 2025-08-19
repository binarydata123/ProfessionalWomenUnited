import React from 'react';
import type { Metadata } from 'next';
import './step-2.css';
import LawyerStepTwo from '@/components/public/LawyerStepTwo';

export const metadata: Metadata = {
	title: 'Complete Your Lawyer Profile - Professional Women United',
	description: 'Provide additional information to complete your lawyer profile on Professional Women United and connect with clients.',
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/lawyer/step-2`
	},
	openGraph: {
		title: 'Complete Your Lawyer Profile - Professional Women United',
		description: 'Provide additional information to complete your lawyer profile on Professional Women United and connect with clients.',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/lawyer/step-2`,
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

export default function stepTwo() {
	return (
		<>
			<LawyerStepTwo />
		</>
	);
}
