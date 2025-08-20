import LatestBlog from '@/components/public/LatestBlog';
import { getAllBlogs, getLatestBlogs } from '../../../../lib/blogapi';
import BlogWithServices from '@/components/public/BlogWithServices';
import { getAllServices, getAllMetaData } from '../../../../lib/frontendapi';
import './blogs.css';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
	const meta = await getAllMetaData({ title: 'blogs_meta_title', description: 'blogs_meta_description' });
	return {
		title: meta.data.blogs_meta_title ? meta.data.blogs_meta_title : `Insights | ${process.env.NEXT_APP_NAME}`,
		description: meta.data.blogs_meta_description
			? meta.data.blogs_meta_description
			: `${process.env.NEXT_APP_NAME}`,
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs`
		},
		openGraph: {
			title: meta.data.blogs_meta_title ? meta.data.blogs_meta_title : `Insights | ${process.env.NEXT_APP_NAME}`,
			description: meta.data.blogs_meta_description
				? meta.data.blogs_meta_description
				: `${process.env.NEXT_APP_NAME}`,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs`,
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
		<>
			<section className="blogs-section">
				<div className="container">
					<div className="text-center mt-5">
						<h1>
							{' '}
							Legal <span>Insights</span>{' '}
						</h1>
						<p>
							"Professional Insights" is a concise, thought-provoking platform that provides readers with
							valuable perspectives and analysis.
						</p>
					</div>
				</div>
			</section>
			<LatestBlog latestBlog={data?.latestBlog} />
			<BlogWithServices blogData={data?.blogs} serviceData={data?.services} />
		</>
	);
}

async function getData() {
	try {
		const latestBlog = await getLatestBlogs();
		const blogs = await getAllBlogs();
		const services = await getAllServices();

		return {
			latestBlog: latestBlog.data,
			blogs: blogs.data,
			services: services.data
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
}
