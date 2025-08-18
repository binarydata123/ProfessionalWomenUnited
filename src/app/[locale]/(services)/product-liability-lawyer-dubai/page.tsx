import React from 'react';
import {Metadata} from 'next';
import ProductLiabilityLawyer from '@/components/services/ProductLiabilityLawyer';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Product Liability Lawyer in Dubai – Connect Legal',
		description:
			'For product liability cases, a product liability lawyer in Dubai can offer expert legal guidance. Contact Connect Legal for assistance.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/product-liability-lawyer-dubai`
		},
		openGraph: {
			title: 'Product Liability Lawyer in Dubai – Connect Legal',
			description:
				'For product liability cases, a product liability lawyer in Dubai can offer expert legal guidance. Contact Connect Legal for assistance.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/product-liability-lawyer-dubai`,
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
			<ProductLiabilityLawyer />
		</>
	);
}
