'use client';
import React, { useState, useEffect, useContext } from 'react';
import DefaultButton from '@/commonUI/DefaultButton';
import Link from 'next/link';
import { getAllPostsByCount, getRecentlyViewlawyer } from '../../../../lib/enduserapi';

import LinkButton from '@/commonUI/LinkButton';
import '../dashboard/dashboard.css';
import AuthContext from '@/context/AuthContext';
import { formatDateMonthDayYear, getAdminImageSrc130x130 } from '@/app/[locale]/commonfunctions/commonfunctions';

export default function UserDashboard() {

	const { user } = useContext(AuthContext)
	const [allpost, setAllPosts]: any = useState([]);
	const [recentlyviewlawyer, setRecentlyViewlawyer]: any = useState([]);

	useEffect(() => {
		getAllPostData(user?.id, 5);
		getAllRecentlylawyer(user?.id, 3);
	}, []);

	const getAllPostData = async (user_id: any, count: any) => {
		try {
			const postData = await getAllPostsByCount({ memberId: user_id, count });
			setAllPosts(postData.posts);
		} catch (error) {
			console.error('Error fetching reviews:', error);
		}
	};

	const getAllRecentlylawyer = async (user_id: any, count: any) => {
		try {
			const lawyerData = await getRecentlyViewlawyer({ viewBy: user_id, count });
			setRecentlyViewlawyer(lawyerData.data);
		} catch (error) {
			console.error('Error fetching reviews:', error);
		}
	};

	return (
		<>
			<div className="legal-issues">
				<div className="row align-items-center py-3">
					<div className="col-lg-8 col-md-12">
						<h3 className="green-dark weight-semi-bold font-xx-large">Don’t face legal issues alone!</h3>
						<p className="green-dark weight-light font-x-small">
							Our experienced team is here to help you every step of the way.{' '}
						</p>
					</div>
					<div className="col-lg-4 col-md-12 text-right tab-left">
						<Link href="/find-a-lawyer">
							<DefaultButton className=" mt-3">Find A Lawyer </DefaultButton>
						</Link>
					</div>
				</div>
			</div>

			<div className="row">
				<div className="col-lg-6 col-md-12">
					<div className="dashboard-recently">
						<div className="recent-reviews mt-1">
							<div className="row">
								<div className="col-8">
									<p className="font-large weight-semi-bold green-dark"> Recent Posts</p>
								</div>
								<div className="col-4 text-right">
									<p>
										<Link
											href="/user/legal-questions/posts"
											className="boysenberry font-x-small weight-semi-bold "
										>
											View All <LinkButton />
										</Link>
									</p>
								</div>
							</div>
							{allpost?.length > 0 ? (
								allpost.map((post: any, index: any) => (
									<div className="card-notifaction mt-2">
										<Link href={`/legal-forum/${post.service_slug}/${post.slug}`}>
											<div className="row align-items-center">
												<div className="col-10">
													<p className="text-sonic-silver weight-semi-bold font-small-12">
														Posted on {formatDateMonthDayYear(post.created_at)}
													</p>
													<p className="social-link weight-semi-bold font-x-small">
														{post.question}
													</p>
												</div>
												<div className="col-2 text-right pt-1 right-arrow-icon">
													<i
														className="fa-solid fa-angle-right mt-2"
														style={{ color: '#000' }}
													></i>
												</div>
											</div>
										</Link>
									</div>
								))
							) : (
								<div className="bottom-content mt-5">
									<div className="row">
										<div className="col-sm-12">
											<div className="left-bottom-bg inner-content p-3">
												<h2>Got A Legal Question?</h2>
												<p className="mt-3">
													Contribute to our legal community & grow your reach by sharing your
													expertise.{' '}
												</p>
												<Link href="/find-a-lawyer">
													<DefaultButton
														className="w-100"
														color="rgba(196,144,115, 1)"
														background="rgba(9, 63, 56, 1)"
													>
														Ask A Lawyer
													</DefaultButton>
												</Link>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
				<div className="col-lg-6 col-md-12">
					<div className="dashboard-recently">
						<div className="recent-reviews mt-1">
							<div className="row">
								<div className="col-8">
									<p className="font-large weight-semi-bold green-dark"> Recently Viewed</p>
								</div>
								<div className="col-4 text-right">
									<p>
										<Link
											href="/user/lawyers"
											className="boysenberry font-x-small weight-semi-bold "
										>
											View All <LinkButton />
										</Link>
									</p>
								</div>
							</div>

							{recentlyviewlawyer.length > 0 ? (
								recentlyviewlawyer.map((laywer: any, index: any) => (
									<div className="card-notifaction mt-2" key={index}>
										<Link href={`/find-a-lawyer/${laywer.slug}`}>
											<div className="row m-center align-items-center">
												<div className="col-sm-2 pr-0">
													<img
														src={getAdminImageSrc130x130(
															laywer.profile_image,
															laywer.gender
														)}
														alt="user-popup"
														width={80}
														height={80}
														className="w-130 m-img-fixed"
													/>
												</div>

												<div className="col-sm-9">
													<p className="font-large social-link weight-bold ">
														{laywer.full_name}{' '}
													</p>
													<p className="font-small weight-semi-bold social-link">
														{laywer.designation}{' '}
														{laywer.company_name && <span style={{ color: 'gray' }}>at</span>}{' '}
														{laywer.company_name}
													</p>

													<ul className="rating-location">
														{laywer.location_name ? (
															<li className="loc">
																<i className="fa-solid fa-location-dot"></i>{' '}
																{laywer.location_name}
															</li>
														) : null}
														<li className="rev">
															{' '}
															<i className="fa-solid fa-star"></i>{' '}
															<b>{laywer.avg_rating_and_reviews}</b>
														</li>
													</ul>
													<button className="btn-mini success-btn mr-1 mb-2">
														{laywer.service_name} Law
													</button>
												</div>
											</div>
										</Link>
									</div>
								))
							) : (
								<div className="bottom-content mt-5">
									<div className="row">
										<div className="col-sm-12">
											<div className="right-bottom-bg p-3">
												<h2>Get Expert Advice for Free</h2>
												<p className="mt-3">
													Contribute to our legal community & grow your reach by sharing your
													expertise.{' '}
												</p>
												<Link href="/legal-forum">
													<DefaultButton
														className="w-100"
														color="rgba(32, 140, 132, 1)"
														background="#fff"
													>
														Visit Legal Forum
													</DefaultButton>
												</Link>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
