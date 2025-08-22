'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import UpperFooter from '@/components/public/UpperFooter';
import Link from 'next/link';
import Blog from '@/components/public/Blog';
import LegalForumSearch from '../LegalForumSearch';
import SecondaryButton from '@/commonUI/SecondaryButton';
import { getAdminLegalServiceImageSrc } from '@/app/[locale]/commonfunctions/commonfunctions';

interface Props {
	serviceData?: any;
	blogsData?: any;
	tagsData?: any;
	TotalQuestion?: any;
}

export default function LegalForum({ serviceData, blogsData, tagsData, TotalQuestion }: Props) {
	return (
		<>
			<div id="legalforum">
				<LegalForumSearch />
			</div>

			<section className="py-4 pb-lg-5 pb-2">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6">
							<div className="gotalegalquestion">
								<h4>GOT A PROFESSIONAL QUESTION?</h4>
								<h5>Post your questions for FREE & get advice from multiple lawyers.</h5>
							</div>
						</div>
						<div className="col-lg-6 text-lg-end">
							<div className="gotalegalquestion p-0 m-0">
								<Link href={'/find-a-professional'} className="btn-commn">
									Ask A Professional
								</Link>
							</div>
						</div>
					</div>
					<div className="border"></div>
					<div className="row mt-4">
						<div className="col-lg-7">
							<div className="browse-bay">
								<h3>Browse by legal topics</h3>
								<div className="row g-3 pt-4">
									{serviceData &&
										serviceData.map((service: any, index: number) => (
											<div className="col-lg-4 col-6" key={index}>
												<Link href={`/legal-forum/${service.slug}`}>
													<div className="browse-icon legal-forum-service-name">
														<Image
															src={getAdminLegalServiceImageSrc(service.icon)}
															width={80}
															height={80}
															layout="responsive"
															alt={service.icon_alt_text}
														/>
														<h3 className="d-block">{service.name}</h3>
													</div>
												</Link>
											</div>
										))}
								</div>
							</div>
						</div>
						<div className="col-lg-5">
							<div className="popular-searches mt-0">
								<div className="text-100 text-end">
									<h2>{TotalQuestion.count}</h2>
									<h4>Questions Asked</h4>
								</div>
								<div className="border-line"></div>
								<div className="text-end Popular-text">
									<h3>
										<Image
											src="/images/legal/trend-up.png"
											alt="Popular Searches"
											width={24}
											height={24}
										/>
										Popular Searches
									</h3>
								</div>
								<div className="popular-btn text-end">
									{tagsData &&
										tagsData.map((tag: any, index: number) => (
											<li key={index}>
												<Link href={`/legal-forum/${tag.slug}?tag_id=${tag.tag_id}`}>
													{tag.tag_name}
												</Link>
											</li>
										))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="popular-legal-articles">
				<div className="container">
					<div className="row align-items-center py-4">
						<div className="col-lg-6 order-lg-0 order-last">
							<div className="legal-articles">
								<h3>Popular legal articles</h3>
							</div>
						</div>
						<div className="col-lg-6 text-end order-lg-0 order-first" id="all-btn-bg">
							<Link href={'/blogs'}>
								<SecondaryButton showIcon={true} className="d-flex float-end">
									<span className="mr-1"> View All</span>
									<span className="border-radius-1 banner-arrow-btn">
										<ChevronRightIcon width={20} color={'#BE8363'} />
									</span>
								</SecondaryButton>
							</Link>
						</div>
					</div>
					<div className="row g-5" id="bolgs">
						{blogsData &&
							blogsData.map((blog: any, index: number) => (
								<div className="col-lg-4" key={index}>
									<Blog blog={blog} />
								</div>
							))}
					</div>
				</div>
			</section>
			<UpperFooter />
		</>
	);
}
