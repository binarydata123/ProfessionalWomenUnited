import React from 'react';
import { Metadata } from 'next';
import FinancialLawyerDubai from '@/components/services/FinancialLawyerDubai';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "Financial Lawyer in Dubai – Professional Women United",
		description: "Manage your financial legal needs with a finance lawyer in Dubai. Professional Women United offers professional advice to navigate financial regulations.",
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/financial-lawyer-dubai`
		},
		openGraph: {
			title: "Financial Lawyer in Dubai – Professional Women United",
			description: "Manage your financial legal needs with a finance lawyer in Dubai. Professional Women United offers professional advice to navigate financial regulations.",
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/financial-lawyer-dubai`,
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
			<FinancialLawyerDubai />
		</>
	);
}
