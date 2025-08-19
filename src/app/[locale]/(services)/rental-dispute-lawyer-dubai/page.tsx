import React from 'react';
import { Metadata } from 'next';
import RentalDisputeLawyers from '@/components/services/RentalDisputeLawyers';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Rental Dispute Lawyer in Dubai – Professional Women United',
		description:
			'Solve rental disputes swiftly with a rental dispute lawyer in Dubai. Professional Women United offers expert advice to landlords and tenants alike.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/rental-dispute-lawyer-dubai
`
		},
		openGraph: {
			title: 'Rental Dispute Lawyer in Dubai – Professional Women United',
			description:
				'Solve rental disputes swiftly with a rental dispute lawyer in Dubai. Professional Women United offers expert advice to landlords and tenants alike.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/rental-dispute-lawyer-dubai
`,
			siteName: process.env.NEXT_APP_NAME,
			images: [
				{
					url: `${process.env.NEXT_PUBLIC_BASE_URL}/OG-image.jpg`,
					width: 350,
					height: 50
				}
			],
			type: 'website'
		}
	};
}

export default function Page() {
	return (
		<>
			<RentalDisputeLawyers />
		</>
	);
}
