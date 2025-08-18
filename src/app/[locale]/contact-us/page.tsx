import React from 'react';
import ContactUs from '@/components/public/ContactUs/page';
import { getAllMetaData } from '../../../../lib/frontendapi';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
	const meta = await getAllMetaData({ title: 'contact_us_meta_title', description: 'contact_us_meta_description' });
	return {
		title: meta.data.contact_us_meta_title
			? meta.data.contact_us_meta_title
			: `Contact us | ${process.env.NEXT_APP_NAME}`,
		description: meta.data.contact_us_meta_description
			? meta.data.contact_us_meta_description
			: `${process.env.NEXT_APP_NAME}`,
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/contact-us`
		},
		openGraph: {
			title: meta.data.contact_us_meta_title
				? meta.data.contact_us_meta_title
				: `Contact us | ${process.env.NEXT_APP_NAME}`,
			description: meta.data.contact_us_meta_description
				? meta.data.contact_us_meta_description
				: `${process.env.NEXT_APP_NAME}`,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact-us`,
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
	return <ContactUs />;
}
