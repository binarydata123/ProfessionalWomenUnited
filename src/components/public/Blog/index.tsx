'use client';
import DateFormat from '@/commonUI/DateFormat';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import './style.css';
import Image from 'next/image';
import ImageComponent from '@/commonUI/ImageComponent';
import CardLoadingPlaceholder from '@/commonUI/CardLoadingPlaceholder';

interface Props {
	blog?: any;
}

export default function Blog({ blog }: Props) {
	const [isLoading, setisLoading] = useState(true);

	useEffect(() => {
		if (blog) {
			setisLoading(false);
		}
	}, []);

	if (isLoading && process.env.NEXT_PUBLIC_DATA_LOADING_PLACEHOLDER === 'true') {
		return <CardLoadingPlaceholder />;
	}
	return (
		<div key={blog.id} className="blog-text-all blog-card-wrapper images-blog-text">
			<Link href={`/blogs/${blog.slug}`}>
				{blog.image ? (
					<ImageComponent
						className="mb-2 d-lg-block float-left"
						src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/connect-Legal/Blogs/${blog.image}`}
						// placeholderImgUrl={process.env.NEXT_PUBLIC_IMAGE_URL + `/images/default/1920x1080.png`}
						placeholderImgUrl={
							process.env.NEXT_PUBLIC_BASE_URL + `/images/624x351.png`
						}
						alt={blog.image_alt_text}
						height={350}
						width={350}
					/>
				) : (
					<ImageComponent
						className="mb-2 d-lg-block float-left"
						// placeholderImgUrl={process.env.NEXT_PUBLIC_IMAGE_URL + `/images/default/1920x1080.png`}
						placeholderImgUrl={
							process.env.NEXT_PUBLIC_BASE_URL + `/images/624x351.png`
						}
						alt={blog.image_alt_text}
						height={350}
						width={350}
					/>
				)}
			</Link>
			<Link href={`/legal-services/banking`}>
				<span className="law-btn">{blog?.service_name || blog?.services?.name || 'Women'} Profession</span>
			</Link>
			<Link href={`/blogs/${blog.slug}`}>
				<h5>{blog.title && blog.title.length > 50 ? blog.title.substring(0, 50) + '...' : blog.title}</h5>
			</Link>
			<span className="pt-3">
				<DateFormat date={blog.created_at} /> • {blog.time_to_read ? blog.time_to_read : '5 min read'}
			</span>
		</div>
	);
}
