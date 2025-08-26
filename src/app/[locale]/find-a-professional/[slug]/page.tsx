import SingleLawyer from '@/components/lawyer/SingleLawyer';
import './lawyer-profile.css';
import { getAllMetaData, getSingleLawyerDetails } from '../../../../../lib/frontendapi';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SingleProfession from '@/components/lawyer/SingleProfession';

type Props = {
	params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const meta = await getData(params.slug);
	if (!meta) {
		notFound()
	}
	return {
		title: meta.meta_title ? meta.meta_title : `Find a Professional | ${process.env.NEXT_APP_NAME}`,
		description: meta.meta_description ? meta.meta_description : `${process.env.NEXT_APP_NAME}`,
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/find-a-professional/${params.slug}`
		},
		openGraph: {
			title: meta.meta_title ? meta.meta_title : `Find a Professional | ${process.env.NEXT_APP_NAME}`,
			description: meta.meta_description ? meta.meta_description : `${process.env.NEXT_APP_NAME}`,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/find-a-professional/${params.slug}`,
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

	const data = await getData(params.slug);
	if (!data) {
		notFound()
	}
	if (data.status == 'suspended') {
		notFound()
	}
	return <SingleLawyer slug={params.slug} />;
	// return <SingleProfession />;
}

async function getData(slug: string) {
	try {
		const res = await getSingleLawyerDetails(slug);
		return res.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
}