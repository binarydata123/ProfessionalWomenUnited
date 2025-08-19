import React from 'react';
import type { Metadata } from 'next';
import './choose-pricing-plan.css';
import LawyerChoosePlan from '@/components/public/LawyerChoosePlan';

export const metadata: Metadata = {
	title: 'Choose Your Pricing Plan - Professional Women United',
	description: 'Select the best pricing plan for your needs on Professional Women United. Explore our options and get started with the plan that suits you.',
	alternates: {
		canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/lawyer/choose-pricing-plan`
	},
	openGraph: {
		title: 'Choose Your Pricing Plan - Professional Women United',
		description: 'Select the best pricing plan for your needs on Professional Women United. Explore our options and get started with the plan that suits you.',
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/lawyer/choose-pricing-plan`,
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

export default function choosepricingplan() {

	return (
		<>
			<LawyerChoosePlan />
		</>
	);
}
