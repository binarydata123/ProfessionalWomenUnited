'use client';
import { ArrowLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import Image from 'next/image';
import DateFormat from '@/commonUI/DateFormat';
import ImagePlaceholder from '@/commonUI/ImagePlaceholder';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'next-share';
import Blog from '@/components/public/Blog';
import React, { useEffect, useState } from 'react';
import ImageLoadingPlacehoder from '@/commonUI/ImageLoadingPlacehoder';
import DescriptionTagPlaceholder from '@/commonUI/DescriptionTagPlaceholder';
import Popup from '@/commonUI/Popup';
import Cookies from 'js-cookie';

interface Props {
	blog: any;
	relatedBlogs?: any;
}

export default function SingleBlog({ blog, relatedBlogs }: Props) {
	const [isSticky, setIsSticky] = useState(false);
	const [activeTab, setActiveTab] = useState('about');
	const [isLoading, setisLoading] = useState(false);
	const [showPopup, setShowPopup] = useState(false);

	const handleScroll = () => {
		if (window.scrollY > 300) {
			setIsSticky(true);
		} else {
			setActiveTab('about');
			setIsSticky(false);
		}
	};

	useEffect(() => {
		// Check if the popup should be shown (based on a flag stored in cookie)
		const hasPopupShownBefore = Cookies.get('hasPopupShown');
		if (!hasPopupShownBefore) {
			// If the popup has not been shown before, set a timeout to show it after 5 seconds
			const popupTimeout = setTimeout(() => {
				setShowPopup(true);
				// Set the flag in cookie to indicate that the popup has been shown
				Cookies.set('hasPopupShown', 'true', { expires: 1 }); // expires in 1 day
			}, 10000);

			// Cleanup function to clear the timeout if the component unmounts before the timeout
			return () => clearTimeout(popupTimeout);
		}
	}, []);


	useEffect(() => {
		// Add the scroll event listener when the component mounts
		window.addEventListener('scroll', handleScroll);

		// Remove the event listener when the component unmounts
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []); //

	const copyToClipboard = (url: any) => {
		const textField = document.createElement('textarea');
		textField.innerText = url;
		document.body.appendChild(textField);
		textField.select();
		document.execCommand('copy');
		textField.remove();
	};

	useEffect(() => {
		if (blog) {
			setisLoading(false);
		}
	}, [blog]);

	return (
		<>
			<section className="blog-section start">
				<div className="container">
					<div className="text-left-line text-start pt-lg-5 mt-2">
						{isLoading ? (
							<div
								style={{
									height: '20px',
									backgroundColor: 'rgb(249,242,239)',
									width: '370px'
								}}
							></div>
						) : (
							<ul>
								<li>
									<Link href="/blogs" className="unactive">
										Insights
									</Link>
								</li>
								<li>
									<Image
										src="/images/legal-service/arrow-right.png"
										alt={'right arrow'}
										width={15}
										height={15}
									/>
								</li>
								<li>
									<Link href={`/blogs/${blog.slug}`} >{blog.title}</Link>
								</li>
							</ul>
						)}

						<div className="images-blog-text pt-5 p-0">
							<div>
								{isLoading ? (
									<div
										style={{
											height: '20px',
											backgroundColor: 'rgb(249,242,239)',
											width: '50px',
											marginTop: '10px'
										}}
									></div>
								) : (
									<Link href="#">{blog.service_name}</Link>
								)}
							</div>
							<div className="mt-2">
								{isLoading ? (
									<div
										style={{
											height: '60px',
											backgroundColor: 'rgb(249,242,239)',
											width: '70%',
											marginTop: '30px'
										}}
									></div>
								) : (
									<h1>{blog.title}</h1>
								)}
							</div>
						</div>
					</div>
					<div className="by-author-name">
						{blog.author && (
							<Link href={`/author/${blog.author.slug}`}>
								<span >By</span> {blog.author.name}
							</Link>
						)
						}

						{isLoading ? (
							<div
								className="mt-2"
								style={{
									height: '20px',
									backgroundColor: 'rgb(249,242,239)',
									width: '25%'
								}}
							></div>
						) : (
							<>
								<ul>
									<li>
										<DateFormat date={blog.created_at} />
									</li>
									<li></li>
									<li> {blog.time_to_read ? blog.time_to_read : '5 min read'}</li>
								</ul>
							</>
						)}
					</div>
					<div className="row pt-5">
						<div className="col-lg-9">
							<div>
								{isLoading ? (
									<>
										<DescriptionTagPlaceholder />
										<DescriptionTagPlaceholder />
										<DescriptionTagPlaceholder />
										<DescriptionTagPlaceholder />
										<DescriptionTagPlaceholder />
										<DescriptionTagPlaceholder />
										<DescriptionTagPlaceholder />
										<DescriptionTagPlaceholder />
										<DescriptionTagPlaceholder />
										<DescriptionTagPlaceholder />
									</>
								) : (
									<div
										className="single_blog_data"
										dangerouslySetInnerHTML={{ __html: blog?.description ?? '' }}
									/>
								)}

								{blog.image && !isLoading ? (
									<Image
										className="w-100 mb-4 responsive-img"
										src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/connect-Legal/Blogs/${blog.image}`}
										alt={blog.image_alt_text}
										height={665}
										width={1920}
									/>
								) : (
									<div
										style={{
											height: '665px',
											backgroundColor: 'rgb(249,242,239)',
											width: '100%',
											marginBottom: '10px',
											borderRadius: '16px'
										}}
									></div>
								)}
							</div>
							<section className="connect-with-lawyes">
								<div className="connect-title">
									<h4>Connect with lawyers & seek expert legal advice</h4>
									<p>Check out how we can offer this service to you.</p>
									<Link href={'/find-a-lawyer'}>
										<button className="btn-commn bg-color">Find A Lawyer</button>
									</Link>
								</div>
							</section>
							<div className="all-post">
								<Link href="/blogs">
									<ArrowLeftIcon /> All Posts
								</Link>
							</div>
							<div className="shere-link">
								<h6 >Share</h6>
								<ul className="d-flex align-items-center">
									<li>
										<LinkedinShareButton
											url={`${process.env.NEXT_PUBLIC_BASE_URL}blogs/${blog.slug}`}
										>
											<Image
												width={24}
												height={24}
												src="/images/Blogs/iconoir_linkedin.svg"
												alt="icon"
											/>
										</LinkedinShareButton>
									</li>
									<li className="m-0">
										<TwitterShareButton
											url={`${process.env.NEXT_PUBLIC_BASE_URL}blogs/${blog.slug}`}
										>
											<i className="fa-brands fa-x-twitter m-0"></i>
										</TwitterShareButton>
									</li>
									<li>
										<FacebookShareButton
											url={`${process.env.NEXT_PUBLIC_BASE_URL}blogs/${blog.slug}`}
										>
											<Image width={24} height={24} src="/images/Blogs/facebook.png" alt="icon" />
										</FacebookShareButton>
									</li>
									<li>
										<a
											onClick={() =>
												copyToClipboard(`${process.env.NEXT_PUBLIC_BASE_URL}blogs/${blog.slug}`)
											}
											role="button"
											title="copy blog url"
										>
											<Image
												width={24}
												height={24}
												src="/images/Blogs/link-square.png"
												alt="icon"
											/>
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-lg-3">
							{isLoading ? (
								<div
									style={{
										height: '300px',
										backgroundColor: 'rgb(249,242,239)',
										width: '300px',
										borderRadius: '10px'
									}}
								></div>
							) : (
								<div className={`profile-data profile-d-change ${isSticky ? 'sticky-profile' : ''}`}>
									<div className={`left-bar-image ccc `}>
										<h6>GOT A LEGAL QUESTION?</h6>
										<p>Post a question for free on our Legal Forum</p>
										<Link href="/ask-a-lawyer">
											<button className="w-100 btn-get-free btn-commn bg-color d-flex align-items-center justify-content-center gap-2 mt-5">
												<span>Ask A Question</span>
												<span className="border border-radius-1 banner-arrow-btn">
													<ChevronRightIcon width={20} color={'#fff'} />
												</span>
											</button>
										</Link>
									</div>
								</div>
							)}
						</div>
					</div>

					<div className="row">
						<div className="col-lg-9 col-12">
							<div className="related-resources">
								<h2>Related Resources</h2>
							</div>
						</div>
						<div className="col-lg-3 col-12 d-none d-md-block">
							<div className="text-center pt-5">
								<Link
									href={'/blogs'}
									className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 blog-all-btn"
								>
									<span className=""> View All</span>
									<span className="border border-radius-1 banner-arrow-btn border-color ">
										<ChevronRightIcon width={20} color={'#BE8363'} />
									</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="blog-section-all">
				<div className="container pb-5">
					<div className="row g-4 images-blog-text">
						{relatedBlogs.length > 1 ? (
							relatedBlogs.map(
								(item: any, index: any) =>
									item.id !== blog.id && (
										<div className="col-lg-4" key={index}>
											<Blog blog={item} key={index} />
										</div>
									)
							)
						) : (
							<ImagePlaceholder
								height={250}
								showButton={false}
								text="No blog found!!"
								image={'/images/search-placeholder.png'}
							/>
						)}
					</div>
					<div className="col-lg-3 col-12 d-block d-md-none">
						<div className="text-center pt-5">
							<Link
								href={'/blogs'}
								className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 blog-all-btn"
							>
								<span className=""> View All</span>
								<span className="border border-radius-1 banner-arrow-btn border-color ">
									<ChevronRightIcon width={20} color={'#BE8363'} />
								</span>
							</Link>
						</div>
					</div>
				</div>
			</section>


			<Popup
				show={showPopup}
				onCancel={() => setShowPopup(false)}
				onOk={() => setShowPopup(false)}
				className="blog-popup-fix"
			>
				<section className="connect-with-lawyes-popup text-center" >
					<div className="connect-title">
						<h4 className='green-med-pop text-center need-advice-txt' >Need Legal Advice?</h4>
						<p className='text-white text-center pop-dis'>Connect with top lawyers in the UAE and get the expert help you need.</p>
						<Link href={'/find-a-lawyer'} >
							<button className="btn-get-free btn-commn mx-auto m-w-full">
								Find A Lawyer</button>
						</Link>
					</div>
				</section>
			</Popup>
		</>
	);
}