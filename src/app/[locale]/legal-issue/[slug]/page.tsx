import React from 'react';
import type { Metadata } from 'next';
import './homepagedasktop.css';
import { getAllLawyersOrFilter } from '../../../../../lib/frontendapi';
import LegalIsuueLawyers from '@/components/public/LegalIsuueLawyers';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	return {
		title: 'Legal Issues - Professional Women United',
		description: 'Explore legal issues on Professional Women United. Find information and resources on a variety of legal topics. Get guidance and support for your legal concerns.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/legal-issue/${params.slug}`
		},
		openGraph: {
			title: 'Legal Issues - Professional Women United',
			description: 'Explore legal issues on Professional Women United. Find information and resources on a variety of legal topics. Get guidance and support for your legal concerns.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/legal-issue/${params.slug}`,
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
	};
}

export default async function Page({ params }: { params: { slug: string } }) {
	const lawyers = await getData(params.slug);
	if (!lawyers) {
		notFound()
	}
	return <LegalIsuueLawyers service={params.slug} relatedLawyers={lawyers} />;
}

async function getData(service: string) {
	try {
		const lawyers = await getAllLawyersOrFilter({ p_service_name: service, count: 8 });
		return lawyers.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
}
