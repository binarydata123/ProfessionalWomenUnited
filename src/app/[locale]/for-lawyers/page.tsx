import React from 'react';
import ForLawyers from '@/components/public/ForLawyers';
import { getAllMetaData } from '../../../../lib/frontendapi';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
	const meta = await getAllMetaData({ title: 'for_lawyers_meta_title', description: 'for_lawyers_meta_description' });
	return {
		title: meta.data.for_lawyers_meta_title
			? meta.data.for_lawyers_meta_title
			: `For A Lawyer | ${process.env.NEXT_APP_NAME}`,
		description: meta.data.for_lawyers_meta_description
			? meta.data.for_lawyers_meta_description
			: `${process.env.NEXT_APP_NAME}`,
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/for-lawyers`
		},
		openGraph: {
			title: meta.data.for_lawyers_meta_title
				? meta.data.for_lawyers_meta_title
				: `For A Lawyer | ${process.env.NEXT_APP_NAME}`,
			description: meta.data.for_lawyers_meta_description
				? meta.data.for_lawyers_meta_description
				: `${process.env.NEXT_APP_NAME}`,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/for-lawyers`,
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

export default function Page() {
	return <ForLawyers />;
}
