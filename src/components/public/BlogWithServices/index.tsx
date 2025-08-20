'use client';
import React, { useEffect, useState } from 'react';
import { getAllBlogs } from '../../../../lib/blogapi';
import Slider from '@/commonUI/Slider';
import Blog from '../Blog';
import Pagination from '@/commonUI/Pagination';
import './BlogWithServices.css';
import ServiceLoadingPlaceholder from '@/commonUI/ServiceLoadingPlaceholder';
import { getAllServices } from '../../../../lib/frontendapi';
import Cookies from 'js-cookie';
import Popup from '@/commonUI/Popup';
import Link from 'next/link';

interface Props {
	blogData?: any;
	serviceData?: any;
}

export default function BlogWithServices({ blogData, serviceData }: Props) {
	// console.log(blogData)
	const [blogs, setblogs] = useState(blogData);
	const [services, setservices]: any = useState(serviceData);
	const [currentPage, setCurrentPage] = useState(1);
	const [activeServices, setactiveServices] = useState(null);
	const [isLoading, setisLoading] = useState(true);
	const [startPosition, setstartPosition]: any = useState(0);

	const itemsPerPage = 15;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentBlogs = blogData?.slice(startIndex, endIndex);
	const [showPopup, setShowPopup] = useState(false);

	const [totalPages, setTotalblogs] = useState(0);

	useEffect(() => {
		getAllBlogs().then(res => {
			setblogs(res.data);
		});

		getAllServices().then(res => {
			setservices(res.data);
		});
	}, []);

	const handleBlogs = (currentPage: any, serviceId = null) => {
		if (serviceId) {
			getAllBlogs({ service_id: serviceId }).then(res => {
				setblogs(
					res.data.slice((currentPage - 1) * itemsPerPage, (currentPage - 1) * itemsPerPage + itemsPerPage)
				);
				setTotalblogs(Math.ceil(res.data.length / itemsPerPage));
			});
		} else {
			setblogs(blogData?.slice((currentPage - 1) * itemsPerPage, (currentPage - 1) * itemsPerPage + itemsPerPage));
			setTotalblogs(Math.ceil(blogData?.length / itemsPerPage));
		}
	};

	useEffect(() => {
		handleBlogs(currentPage);
		if (serviceData) {
			setisLoading(false);
		}
	}, []);

	const handlePageChange = (newPage: any) => {
		setCurrentPage(newPage);
		handleBlogs(newPage, activeServices);
	};

	const handleBlogByService = (services_id: any, index: number) => {
		handleBlogs(1, services_id);
		setactiveServices(services_id);
		setCurrentPage(1);
		setstartPosition(index);
	};

	useEffect(() => {
		const hasPopupShownBefore = Cookies.get('hasPopupblogShown');
		if (!hasPopupShownBefore) {
			// If the popup has not been shown before, set a timeout to show it after 5 seconds
			const popupTimeout = setTimeout(() => {
				setShowPopup(true);
				Cookies.set('hasPopupblogShown', 'true', { expires: 1 }); // expires in 1 day
			}, 10000);
			return () => clearTimeout(popupTimeout);
		}
	}, []);

	return (
		<div className="blog-with-service-wrapper">
			<section className="explore-blogs">
				<div className="container">
					<div className="text--lg-center explore-blogs-title">
						<h3>Explore Blogs</h3>
						<ul className="all-type-of d-flex gap-2">
							<li
								onClick={() => handleBlogByService(null, 0)}
								className={`m-0 ${!activeServices && 'first-active'}`}>
								All
							</li>
							{isLoading && process.env.NEXT_PUBLIC_DATA_LOADING_PLACEHOLDER === 'true' ? (
								<ServiceLoadingPlaceholder />
							) : (
								services && (
									<Slider
										autoWidth={true}
										nav={false}
										dots={false}
										loop={false}
										startPosition={startPosition}>
										{services.map((item: any, index: any) => (
											<li
												className={`m-0 ${activeServices === item.id && 'first-active'}`}
												key={index}
												onClick={() => handleBlogByService(item.id, index)}>
												{item.name} Profession
											</li>
										))}
									</Slider>
								)
							)}
						</ul>
					</div>
				</div>
			</section>

			<section className="blog-section-all">
				<div className="container">
					<div className="row g-3 images-blog-text">
						{blogs?.map((item: any, index: number) => (
							<div className="col-lg-4 mt-5" key={index}>
								<Blog blog={item} />
							</div>
						))}
					</div>
					<div className="legal-sights">
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							handlePageChange={handlePageChange}
						/>
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
						<h4 className='green-med-pop text-center need-advice-txt'>Need Professional Advice?</h4>
						<p className='text-white text-center pop-dis'>Connect with top professionals in the USA and get the expert help you need.</p>
						<Link href={'/find-a-professional'} >
							<button className="btn-get-free btn-commn mx-auto m-w-full">
								Find A Professional</button>
						</Link>
					</div>
				</section>
			</Popup>
		</div>
	);
}