import { Metadata } from 'next';
import LegalForum from '@/components/public/LegalForum';
import { getAllServices, getAlltags, getTotalQuestions, getAllMetaData } from '../../../../lib/frontendapi';
import { getAllBlogs } from '../../../../lib/blogapi';
import './legalforum.css';

export async function generateMetadata(): Promise<Metadata> {
	const meta = await getAllMetaData({ title: 'legal_forum_meta_title', description: 'legal_forum_meta_description' });
	return {
		title: meta.data.legal_forum_meta_title
			? meta.data.legal_forum_meta_title
			: `Professional Forum | ${process.env.NEXT_APP_NAME}`,
		description: meta.data.legal_forum_meta_description
			? meta.data.legal_forum_meta_description
			: `${process.env.NEXT_APP_NAME}`,
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/legal-forum`
		},
		openGraph: {
			title: meta.data.legal_forum_meta_title
				? meta.data.legal_forum_meta_title
				: `Professional Forum | ${process.env.NEXT_APP_NAME}`,
			description: meta.data.legal_forum_meta_description
				? meta.data.legal_forum_meta_description
				: `${process.env.NEXT_APP_NAME}`,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/legal-forum`,
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

export default async function Page() {
	const data: any = await getData();
	return (
		<LegalForum
			serviceData={data.services}
			blogsData={data.blogs}
			tagsData={data.tags}
			TotalQuestion={data.totalQuestion}
		/>
	);
}

async function getData() {
	try {
		const services = await getAllServices();
		const blogs = await getAllBlogs({ count: 3, order_by: 'random' });
		const tags = await getAlltags({ count: 19 });
		const totalQuestion = await getTotalQuestions();
		return {
			services: services.data,
			blogs: blogs.data,
			tags: tags.data,
			totalQuestion: totalQuestion.data[0]
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
}
