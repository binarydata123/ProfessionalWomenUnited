import React from 'react';
import type { Metadata } from 'next';
import ForgotPassword from '@/components/public/ForgotPassword';

export const metadata: Metadata = {
	title: 'Recover Your Password - Professional Women United',
	description: 'Reset your password on Professional Women United. Enter your email to receive instructions on how to recover your account.',
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password`
	},
	openGraph: {
		title: 'Recover Your Password - Professional Women United',
		description: 'Reset your password on Professional Women United. Enter your email to receive instructions on how to recover your account.',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/forgot-password`,
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

export default function forgotPasword() {

	return (
		<>
			<ForgotPassword />
		</>
	);
}
