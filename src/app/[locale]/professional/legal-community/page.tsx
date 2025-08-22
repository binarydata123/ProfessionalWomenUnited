'use client';
import React, { useState, useEffect, useContext } from 'react';
import './legal-community.css';
import Link from 'next/link';
import CountCard from '@/components/common/CountCard';
import RecentBox from '@/components/common/RecentBox';
import Contributors from '@/components/lawyer/Contributors';
import { countQuestionAnswersCount, getRecentPosts, getTopContributors } from '../../../../../lib/lawyerapi';
import AuthContext from '@/context/AuthContext';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { formatDateToDDMMYYYY } from '../../commonfunctions/commonfunctions';

interface RecentPost {
	posted_by: string;
	question: string;
	created_at: any;
	slug: any;
	service_id: any;
	service_slug: any;
}

export default function Overview() {
	const { user } = useContext(AuthContext);
	const [topContributors, setTopContributors] = useState([]);
	const [recentposts, setRecentposts] = useState<RecentPost[]>([]);
	const [questionAnswersCount, setQuestionAnswersCount] = useState<number>(0);

	useEffect(() => {
		fetchTopContributors(user?.id, 5);
		fetchRecentPosts(user?.id);
		fetchQuestionAnswersCount(user?.id);
	}, []);

	const fetchTopContributors = async (user_id: any, contributorCount: number) => {
		try {
			const response = await getTopContributors(user_id, contributorCount);
			setTopContributors(response.data);
		} catch (error) {
			console.error('Error in fetching top contributors:', error);
		}
	};

	const fetchRecentPosts = async (user_id: any) => {
		try {
			const response = await getRecentPosts(user_id);
			setRecentposts(response.data);
		} catch (error) {
			console.error('Error in fetching recent posts:', error);
		}
	};

	const fetchQuestionAnswersCount = async (user_id: any) => {
		try {
			const response = await countQuestionAnswersCount(user_id);
			setQuestionAnswersCount(response.data);
		} catch (error) {
			console.error('Error in fetching recent posts:', error);
		}
	};

	return (
		<div className="legal-community-overview-wrapper">
			<div className="mt-3">
				<h5 className="font-x-large22 weight-bold green-dark pb-3">Community Insights</h5>
				<div className="row  g-4 class-scroll">
					<div className="col-lg-12 col-xl-8 col-md-12">
						<div className="row">
							<div className="col-6">
								<CountCard
									count={questionAnswersCount}
									linkText="Questions Answered"
									href="/professional/legal-community/contribution"
									backgroundImage="/images/bg-question.jpg"
								/>
							</div>
							<div className="col-6">
								<CountCard
									count={'What’s New?'}
									linkText="Go to Legal Forum"
									href="/legal-forum"
									backgroundImage="/images/Profile-dash4.JPG"
								/>
							</div>
						</div>
						<RecentBox title="Recent Posts" href="/" className="mt-2">
							{recentposts &&
								recentposts.map((item, index) => (
									<Link key={index} href={`/legal-forum/${item.service_slug}/${item.slug}`}>
										<div className="card-notifaction mt-2" style={{ cursor: 'pointer' }}>
											<div className="row align-items-center">
												<div className="col-10">
													<p className="text-sonic-silver weight-semi-bold font-small-12">
														{item.posted_by} • {formatDateToDDMMYYYY(item.created_at)}{' '}
													</p>
													<OverlayTrigger
														placement="top"
														overlay={<Tooltip className="in" id="tooltip-top"><span>{item.question}</span></Tooltip>}>
														<span className="social-link weight-semi-bold font-x-small">
															{item.question}
														</span>
													</OverlayTrigger>
												</div>
												<div className="col-2 text-right pt-1 right-arrow-icon">
													<i className="fa-solid fa-angle-right mt-2"></i>
												</div>
											</div>
										</div>
									</Link>
								))}
						</RecentBox>
					</div>
					<div className="col-lg-12 col-xl-4 col-md-12">
						<RecentBox title="Top Contributors">
							{topContributors &&
								topContributors.map((item, index) => <Contributors index={index} item={item} />)}
						</RecentBox>
					</div>
				</div>
			</div>
		</div>
	);
}
