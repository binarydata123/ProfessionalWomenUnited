import type { Metadata } from 'next';
import { getAllquestionsBySlug, getSingleQuestionByIdOrSlug, getAllMetaData } from '../../../../../../lib/frontendapi';
import SingleQuestion from '@/components/public/SingleQuestion';
import './question-page.css';
import '../legaltopic.css';
import '../../legalforum.css';
import { getAllBlogs } from '../../../../../../lib/blogapi';
import { notFound } from 'next/navigation';

type Props = {
	params: { slug: string; question: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const meta = await getAllMetaData({ title: 'legal_forum_meta_title', description: 'legal_forum_meta_description' });
	if (!meta) {
		notFound()
	}
	return {
		title: meta.data.legal_forum_meta_title
			? meta.data.legal_forum_meta_title
			: `Legal Forum | ${process.env.NEXT_APP_NAME}`,
		description: meta.data.legal_forum_meta_description
			? meta.data.legal_forum_meta_description
			: `${process.env.NEXT_APP_NAME}`,
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/legal-forum/${params.slug}/${params.question}`
		},
		openGraph: {
			title: meta.data.legal_forum_meta_title
				? meta.data.legal_forum_meta_title
				: `Legal Forum | ${process.env.NEXT_APP_NAME}`,
			description: meta.data.legal_forum_meta_description
				? meta.data.legal_forum_meta_description
				: `${process.env.NEXT_APP_NAME}`,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/legal-forum/${params.slug}/${params.question}`,
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

export default async function Page({ params }: { params: { slug: string; question: string } }) {
	const data: any = await getData(params.slug, params.question);
	if (!data) {
		notFound()
	}
	return (
		<SingleQuestion
			relatedBlogs={data.relatedBLog}
			slug={params.slug}
			question={data.question[0]}
			response={data.question}
			relatedQuestion={data.relatedQuestion}
			questionSlug={params.question}
		/>
	);
}

async function getData(slug: string, questionSlug: string) {
	try {
		const question = await getSingleQuestionByIdOrSlug({ input: questionSlug });
		const relatedQuestion = await getAllquestionsBySlug({ slug: slug, count: 10 });
		const relatedBLog = await getAllBlogs({ service_id: null, count: 3, order_by: 'random' });
		return {
			question: question.data,
			relatedQuestion: relatedQuestion.data,
			relatedBLog: relatedBLog.data
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
}
