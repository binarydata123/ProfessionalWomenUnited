import Author from '@/components/public/Author'
import React from 'react'
import './about.css'
import { getAllAuthor, getAllMetaData } from '../../../../lib/frontendapi';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
	const meta = await getAllMetaData({ title: 'blogs_meta_title', description: 'blogs_meta_description' });
	return {
		title: meta.data.blogs_meta_title ? meta.data.blogs_meta_title : `Authors | ${process.env.NEXT_APP_NAME}`,
		description: meta.data.blogs_meta_description
			? meta.data.blogs_meta_description
			: `${process.env.NEXT_APP_NAME}`,
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/author`
		},
		openGraph: {
			title: meta.data.blogs_meta_title ? meta.data.blogs_meta_title : `Authors | ${process.env.NEXT_APP_NAME}`,
			description: meta.data.blogs_meta_description
				? meta.data.blogs_meta_description
				: `${process.env.NEXT_APP_NAME}`,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/author`,
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

export default async function page() {
	const data: any = await getData();

	return (
		<div>
			<Author authors={data.data} />
		</div>
	)
}

async function getData() {
	try {
		const authors = await getAllAuthor();
		return {
			data: authors.data,
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
}
