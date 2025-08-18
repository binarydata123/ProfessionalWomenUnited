import { getAllServices, getAllMetaData } from '../../../../../lib/frontendapi';
import { Metadata } from 'next';
import LegalServices from '@/components/public/LegalServices';
import './service.css';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
	const meta = await getAllServices({ slug: params.slug });
	if (!meta) {
		notFound()
	}
	return {
		title: meta.data.service.seo_meta_title
			? meta.data.service.seo_meta_title
			: `Legal Services | ${process.env.NEXT_APP_NAME}`,
		description: meta.data.service.seo_meta_description
			? meta.data.service.seo_meta_description
			: `${process.env.NEXT_APP_NAME}`,
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/legal-services/${meta.data.service.slug}`
		},
		openGraph: {
			title: meta.data.service.seo_meta_title
				? meta.data.service.seo_meta_title
				: `Legal Services | ${process.env.NEXT_APP_NAME}`,
			description: meta.data.service.seo_meta_description
				? meta.data.service.seo_meta_description
				: `${process.env.NEXT_APP_NAME}`,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/legal-services/${meta.data.service.slug}`,
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
	const data: any = await getData(params.slug);
	if (!data) {
		notFound()
	}
	return <LegalServices service={data.service} allServices={data.all_services} />;
}

async function getData(slug: string) {
	try {
		const res = await getAllServices({ slug: slug });
		return res.data;

	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
}
