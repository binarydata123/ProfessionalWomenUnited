import React from 'react';
import './about.css';
import AboutUs from '@/components/public/AboutUs';
import { Metadata } from 'next';
import { getAllMetaData } from '../../../../lib/frontendapi';

export async function generateMetadata(): Promise<Metadata> {
	const meta = await getAllMetaData({ title: 'about_us_meta_title', description: 'about_us_meta_description' });
	return {
		title: meta.data.about_us_meta_title
			? meta.data.about_us_meta_title
			: `About us | ${process.env.NEXT_APP_NAME}`,
		description: meta.data.about_us_meta_description
			? meta.data.about_us_meta_description
			: `${process.env.NEXT_APP_NAME}`,
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/about-us`
		},
		openGraph: {
			title: meta.data.about_us_meta_title
				? meta.data.about_us_meta_title
				: `About us | ${process.env.NEXT_APP_NAME}`,
			description: meta.data.about_us_meta_description
				? meta.data.about_us_meta_description
				: `${process.env.NEXT_APP_NAME}`,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/about-us`,
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

export default function page() {
	return <AboutUs />;
}
