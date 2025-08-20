'use client';
import DateFormat from '@/commonUI/DateFormat';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ImageComponent from '@/commonUI/ImageComponent';
import ImageLoadingPlacehoder from '@/commonUI/ImageLoadingPlacehoder';
import { Placeholder } from 'react-bootstrap';
import { getLatestBlogs } from '../../../../lib/blogapi';

interface Props {
	latestBlog: any;
}

const extractTags = (titleWithTags: any) => {
	const regex = /<(.*?)>|&[^;]+;/g;
	const titleWithoutTags = titleWithTags.replace(regex, '');
	return titleWithoutTags.trim();
};

export default function LatestBlog({ latestBlog }: Props) {
	const [viewFullDescription, setviewFullDescription] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const [latestBlogData, setLatestBlogData] = useState(latestBlog);

	useEffect(() => {
		getLatestBlogs().then(res => {
			setLatestBlogData(res.data);
			setisLoading(false);
		});
	}, []);

	return (
		<div className="latest-blog-wrapper">
			<section className="tag-section">
				<div className="container">
					<div className="row g-4">
						<div className="col-lg-5">
							<Link href={`blogs/${latestBlogData?.slug}`}>
								<div className="images-blog">
									{isLoading && process.env.NEXT_PUBLIC_DATA_LOADING_PLACEHOLDER === 'true' ? (
										<ImageLoadingPlacehoder height={350} />
									) : latestBlogData?.image ? (
										<ImageComponent
											className="w-100"
											// src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/connect-Legal/Blogs/${latestBlogData?.image}`}
											src={
												latestBlogData?.image
													? `${process.env.NEXT_PUBLIC_IMAGE_URL}/connect-Legal/Blogs/${latestBlogData.image}`
													: `${process.env.NEXT_PUBLIC_BASE_URL}/images/624x351.png`
											}

											placeholderImgUrl={
												process.env.NEXT_PUBLIC_BASE_URL + `/images/624x351.png`
											}
											alt={latestBlogData?.image_alt_text}
											height={350}
											width={350}
											style={{ objectFit: 'contain' }}
										/>
									) : (
										<ImageComponent
											className="w-100"
											src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/624x351.png`}
											placeholderImgUrl={
												// process.env.NEXT_PUBLIC_IMAGE_URL + `/images/default/1920x1080.png`
												process.env.NEXT_PUBLIC_BASE_URL + `/images/624x351.png`
											}
											alt={latestBlogData?.image_alt_text}
											height={350}
											width={350}
											style={{ objectFit: 'contain' }}
										/>
									)}
								</div>
							</Link>
						</div>
						<div className="col-lg-7">
							<div className="images-blog-text ">
								{isLoading && process.env.NEXT_PUBLIC_DATA_LOADING_PLACEHOLDER === 'true' ? (
									<Placeholder as={'p'} animation="glow" className="p-0 mb-2">
										<Placeholder
											className="w-25"
											style={{ height: '30px', backgroundColor: '#f9f2ef' }}
										/>
									</Placeholder>
								) : (
									latestBlogData?.tag &&
									latestBlogData?.tag &&
									latestBlogData?.tag.split(',').map((tag: any, index: any) => (
										<span key={index} className="law-btn d-inline-block mx-1 text-capitalize mb-1">
											{tag.trim()} Law
										</span>
									))
								)}

								{isLoading && process.env.NEXT_PUBLIC_DATA_LOADING_PLACEHOLDER === 'true' ? (
									<Placeholder as={'p'} animation="glow">
										<Placeholder
											className="w-75"
											style={{ height: '70px', backgroundColor: '#f9f2ef' }}
										/>
									</Placeholder>
								) : (
									<h2>
										<Link href={`blogs/${latestBlogData?.slug}`} style={{ color: '#1f1f1f' }}>
											{latestBlogData?.title && latestBlogData?.title.length > 50
												? latestBlogData?.title.substring(0, 50) + '...'
												: latestBlogData?.title}
										</Link>{' '}
									</h2>
								)}

								{isLoading && process.env.NEXT_PUBLIC_DATA_LOADING_PLACEHOLDER === 'true' ? (
									<Placeholder as={'p'} animation="glow">
										<Placeholder
											className="w-100"
											style={{ height: '90px', marginTop: '30px', backgroundColor: '#f9f2ef' }}
										/>
									</Placeholder>
								) : (
									<p className="mb-2">
										{viewFullDescription
											? extractTags(latestBlogData?.description)
											: extractTags(latestBlogData?.description.slice(0, 180) + '...')}
									</p>
								)}

								{isLoading && process.env.NEXT_PUBLIC_DATA_LOADING_PLACEHOLDER === 'true' ? (
									<Placeholder as={'p'} animation="glow">
										<Placeholder
											className="w-20"
											style={{ marginTop: '15px', backgroundColor: '#f9f2ef' }}
										/>
									</Placeholder>
								) : (
									<span
										className="primary-text pt-2 font-small  d-inline w-max"
										onClick={() => setviewFullDescription(!viewFullDescription)}>
										{viewFullDescription ? 'View less' : 'View more'}
									</span>
								)}

								{isLoading && process.env.NEXT_PUBLIC_DATA_LOADING_PLACEHOLDER === 'true' ? (
									<Placeholder as={'p'} animation="glow">
										<Placeholder
											className="w-35"
											style={{ marginTop: '15px', backgroundColor: '#f9f2ef' }}
										/>
									</Placeholder>
								) : (
									<span>
										<DateFormat date={latestBlogData?.created_at} /> •{' '}
										{latestBlogData?.time_to_read ? latestBlogData?.time_to_read : '5 min read'}
									</span>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
