import React from 'react';
import type { Metadata } from 'next';
import Login from '@/components/public/Login';

export const metadata: Metadata = {
	title: 'Login to Professional Women United',
	description: 'Sign in to your Professional Women United account to access legal services and resources.',
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`
	},
	openGraph: {
		title: 'Login to Professional Women United',
		description: 'Sign in to your Professional Women United account to access legal services and resources.',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
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

export default function login() {
	return (
		<>
			<Login />
		</>
	);
}
