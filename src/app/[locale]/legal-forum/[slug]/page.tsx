import type { Metadata } from 'next';
import { getAllquestionsBySlug, getAllMetaData } from '../../../../../lib/frontendapi';
import LegalForumQuestions from '@/components/public/LegalForumQuestions';
import './legaltopic.css';
import '../legalforum.css';
import { notFound } from 'next/navigation';

type Props = {
	params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const meta = await getAllMetaData({ title: 'legal_forum_meta_title', description: 'legal_forum_meta_description' });
	if (!meta) {
		notFound()
	}
	return {
		title: meta.data.legal_forum_meta_title
			? meta.data.legal_forum_meta_title
			: `Professional Forum | ${process.env.NEXT_APP_NAME}`,
		description: meta.data.legal_forum_meta_description
			? meta.data.legal_forum_meta_description
			: `${process.env.NEXT_APP_NAME}`,
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/legal-forum/${params.slug}`
		},
		openGraph: {
			title: meta.data.legal_forum_meta_title
				? meta.data.legal_forum_meta_title
				: `Professional Forum | ${process.env.NEXT_APP_NAME}`,
			description: meta.data.legal_forum_meta_description
				? meta.data.legal_forum_meta_description
				: `${process.env.NEXT_APP_NAME}`,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/legal-forum/${params.slug}`,
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
	const questions: any = await getData(params.slug);
	if (!questions) {
		notFound()
	}
	return <LegalForumQuestions slug={params.slug} questionsData={questions} />;
}

async function getData(slug: string) {
	try {
		const questions = await getAllquestionsBySlug({ slug: slug });
		return questions.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
}
