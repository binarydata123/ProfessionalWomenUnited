import { Metadata, ResolvingMetadata } from 'next';
import { getAllBlogs, getSingleBlogBySlug } from '../../../../../lib/blogapi';
import SingleBlog from '@/components/public/SingleBlog/page';
import '../blogs.css';
import { notFound } from 'next/navigation';

type Props = {
	params: { slug: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
	const blog = await getData(params.slug);
	if (!blog) {
		notFound()
	}
	return {
		title: blog.meta_title ? blog.meta_title : `Insights | ${process.env.NEXT_APP_NAME}`,
		description: blog.meta_description ? blog.meta_description : `${process.env.NEXT_APP_NAME}`,
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${params.slug}`
		},
		openGraph: {
			title: blog.meta_title ? blog.meta_title : `Insights | ${process.env.NEXT_APP_NAME}`,
			description: blog.meta_description ? blog.meta_description : `${process.env.NEXT_APP_NAME}`,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${params.slug}`,
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
	const blog: any = await getData(params.slug);
	const relatedBlogs: any = await getAllBlogs({
		service_id: blog.service_id,
		count: 2,
		order_by: 'random'
	});

	if (!blog) {
		notFound()
	}

	return <SingleBlog blog={blog} relatedBlogs={relatedBlogs.data} />;
}

async function getData(slug: string) {
	try {
		const blog = await getSingleBlogBySlug(slug);
		return blog.data[0];
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
}
