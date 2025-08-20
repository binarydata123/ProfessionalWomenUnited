'use client';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import ImagePlaceholder from '@/commonUI/ImagePlaceholder';
import LinkButton from '@/commonUI/LinkButton';
import { getUserForumCount, getUserRecentPost, getUserTopContributors } from '../../../../../lib/enduserapi';
import Image from 'next/image';
import ArrowIcons from '../../../../commonUI/ArrowIcons';
import AuthContext from '@/context/AuthContext';
import { formatDateTime, getLawyerImageSrc70x70 } from '../../commonfunctions/commonfunctions';

export default function Overview() {
	const [forumcount, setAllForumCount]: any = useState(0);
	const [recentpost, setAllRecentPost]: any = useState([]);
	const [topcontributor, setAllTopContributor]: any = useState([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		getAllInquiresData(user?.id);
		getRecentPostData(user?.id);
		getUserTopContributorsData(user?.id);
	}, []);

	const getAllInquiresData = async (user_id: any) => {
		try {
			const res = await getUserForumCount({ memberId: user_id });
			if (res.status === true) {
				setAllForumCount(res.data);
			}
		} catch (error) {
			console.error('Error fetching forum count:', error);
		}
	};

	const getRecentPostData = async (user_id: any) => {
		try {
			const res = await getUserRecentPost({ memberId: user_id, count: 5 });
			if (res.status === true) {
				setAllRecentPost(res.data);
			}
		} catch (error) {
			console.error('Error fetching forum count:', error);
		}
	};

	const getUserTopContributorsData = async (user_id: any) => {
		try {
			const res = await getUserTopContributors({ memberId: user_id });
			if (res.status === true) {
				setAllTopContributor(res.data);
			}
		} catch (error) {
			console.error('Error fetching forum count:', error);
		}
	};

	return (
		<div className="right-body mt-2">
			<h5 className="font-x-large weight-bold green-dark mb-3">Community Insights</h5>
			<div className="row g-4">
				<div className="col-lg-4 col-md-12">
					<div className="dash-card-g back-dash-card-3">
						<p className="font-large text-white weight-bold">{forumcount}</p>
						<p>
							{' '}
							<Link
								href="/user/legal-questions/posts"
								className="green-medium-1 font-small-12 weight-semi-bold"
							>
								Questions Posted <ArrowIcons />{' '}
							</Link>
						</p>
					</div>
				</div>
				<div className="col-lg-4 col-md-12">
					<div className="dash-card-g back-dash-card-4">
						<p className="font-large text-white weight-bold">Got a Legal Question?</p>
						<p>
							{' '}
							<Link href="/find-a-lawyer" className="green-medium-1 font-small-12 weight-semi-bold">
								Ask A Lawyer <ArrowIcons />
							</Link>
						</p>
					</div>
				</div>
				<div className="col-lg-4 col-md-12">
					<div className="dash-card-g back-dash-card-5">
						<p className="font-large text-white weight-bold">What’s New?</p>
						<p>
							{' '}
							<Link href="/legal-forum" className="green-medium-1 font-small-12 weight-semi-bold">
								Go to Legal Forum <ArrowIcons />
							</Link>
						</p>
					</div>
				</div>
			</div>

			<div className="row mt-3 g-4">
				<div className="col-lg-8 col-md-12">
					<div className="missing-class-add">
						<div className="recent-reviews">
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
							{recentpost.length > 0 ? (
								recentpost.map((post: any, index: any) => (
									<div className="card-notifaction mt-2" key={index}>
										<Link href={`/legal-forum/${post.service_slug}/${post.slug}`}>
											<div className="row align-items-center">
												<div className="col-10">
													<p className="text-sonic-silver weight-semi-bold font-small-12">
														Posted on {formatDateTime(post.created_at)}{' '}
													</p>
													<p className="social-link weight-semi-bold font-x-small">
														{post.question}
													</p>
												</div>
												<div className="col-2 text-right pt-1 right-arrow-icon">
													<i className="fa-solid fa-angle-right mt-2"></i>
												</div>
											</div>
										</Link>
									</div>
								))
							) : (
								<ImagePlaceholder
									height={300}
									image="/images/inquiry-image.png"
									text="You don’t have any post."
									buttonText="Update your Profile"
								/>
							)}
						</div>
					</div>
				</div>
				<div className="col-lg-4 col-md-12">
					<div className="missing-class-add">
						<div className="recent-reviews m-top-30">
							<p className="font-large weight-semi-bold green-dark">Top Legal Contributors</p>
							{topcontributor.length > 0 ? (
								topcontributor.map((contributor: any, index: any) => (
									<div className="card-notifaction pad-sp mt-2">
										<Link href={`/find-a-professional/${contributor.slug}`}>
											<div className="row align-items-center">
												<div className="col-2 text-end">
													<p className="font-small weight-bold text-dark text-end">
														#{index + 1}
													</p>
												</div>
												<div className="col-7">
													<div className="row align-items-center">
														<div className="col p-0">
															<div>
																<Image
																	src={getLawyerImageSrc70x70(
																		contributor.profile_image,
																		contributor.gender
																	)}
																	alt="user-img2"
																	width={40}
																	height={40}
																	style={{ borderRadius: '40px' }}
																/>
															</div>
														</div>
														<div className="col-9">
															<div className="name-location">
																<p className="font-x-small weight-semi-bold social-link ">
																	{contributor.full_name}
																</p>
																<p className="social-link weight-light font-small-12">
																	{contributor.service_name}
																</p>
															</div>
														</div>
													</div>
												</div>
												<div className="col-3 text-right pl-0">
													<p className="green-medium-2 weight-semi-bold font-medium">
														{contributor.message_count}
													</p>
												</div>
											</div>
										</Link>
									</div>
								))
							) : (
								<ImagePlaceholder
									height={300}
									image="/images/inquiry-image.png"
									text="You don’t have any Contributors."
									buttonText="Update your Profile"
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
