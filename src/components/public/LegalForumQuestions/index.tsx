'use client';
import Image from 'next/image';
import React, {useEffect, useState} from 'react';
import {ChevronRightIcon} from '@heroicons/react/20/solid';
import UpperFooter from '@/components/public/UpperFooter';
import Link from 'next/link';
import {getAllQuestions, getAlltags, getQuestionWithTags} from '../../../../lib/frontendapi';
import {getAllBlogs} from '../../../../lib/blogapi';
import Blog from '@/components/public/Blog';
import Question from '@/components/public/Question';
import {useSearchParams} from 'next/navigation';
import LegalForumSearch from '../LegalForumSearch';

interface Props {
	questionsData?: any;
	slug?: string;
}

export default function LegalForumQuestions({questionsData, slug = ''}: Props) {
	const searchParams = useSearchParams();
	const [relatedBlogs, setrelatedBlogs]: any = useState([]);
	const [questions, setquestions]: any = useState(questionsData);
	const [tag_id, settagId]: any = useState(searchParams.get('tag_id'));
	const [tags, settags] = useState([]);
	const handleRelatedBlog = (data: any) => {
		getAllBlogs(data).then(res => {
			setrelatedBlogs(res.data);
		});
	};

	const handleQuestionWithTag = () => {
		if (tag_id) {
			const data = {
				service: slug,
				tag_id: tag_id
			};
			getQuestionWithTags(data).then(res => {
				res.data && setquestions(res.data);
			});
		}
	};

	const handleTags = () => {
		getAlltags({service: slug, count: 30}).then(res => {
			settags(res.data);
		});
	};

	const handleQuestion = () => {
		getAllQuestions().then(res => {
			setquestions(res.data);
		});
	};

	useEffect(() => {
		handleRelatedBlog({service_id: 1, count: 3, order_by: 'random'});
		handleTags();
		handleQuestionWithTag();
	}, []);

	return (
		<>
			<div className="legaltopic">
				<div id="legalforum">
					<LegalForumSearch />
				</div>

				<section className="py-4 pb-lg-5 pb-2">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-lg-6">
								<div className="gotalegalquestion">
									<h4>Don’t face legal issues alone - Find a professional today!</h4>
									<h5>Talk to a business attorney.</h5>
								</div>
							</div>
							<div className="col-lg-6 text-lg-end">
								<div className="gotalegalquestion">
									<Link href={'/find-a-professional'}>
										<button className="btn-commn text-capitalize">Find A {slug} Lawyer</button>
									</Link>
								</div>
							</div>
						</div>
						<div className="border"></div>
					</div>
				</section>

				<section id="popular-legal-articles">
					<div className="container">
						<div className="row">
							<div className="col-lg-8">
								<div className="row align-items-center py-4">
									<div className="col-lg-9">
										<div className="legal-articles browse-bay">
											<h3>Recently asked questions</h3>
										</div>
									</div>
									<div className="col-lg-3 text-end" id="all-btn-bg">
										<button
											onClick={handleQuestion}
											className="w-100 btn-get-free btn-commn bg-change d-flex gap-2 justify-content-lg-0 justify-content-center float-end"
										>
											<span className="">View More</span>
											<span className="border-radius-1 banner-arrow-btn">
												<ChevronRightIcon width={20} color={'#BE8363'} />
											</span>
										</button>
									</div>
								</div>
								<div className="main-accordian">
									<div className="accordion border-0" id="accordionExample">
										{questions &&
											questions.map((question: any, index: number) => (
												<Question question={question} Key={index} slug={slug} />
											))}
									</div>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="popular-btn text-start">
									<h4 className="">Related topics</h4>
									{tags &&
										tags.map((tag: any, index: number) => (
											<li className="" key={index}>
												<Link href={`/legal-forum/${tag.slug}?tag_id=${tag.tag_id}`}>
													{tag.tag_name}
												</Link>
											</li>
										))}
								</div>
							</div>
						</div>

						<div className="row align-items-center" id="get-legal-question">
							<div className="col-lg-8">
								<div className="gotalegalquestion">
									<h4>Got A Legal Question?</h4>
									<h5>Post your questions for FREE & get advice from multiple lawyers.</h5>
								</div>
							</div>
							<div className="col-lg-4 text-lg-end">
								<div className="gotalegalquestion">
									<Link
										href={`/legal-forum/${slug}/ask-a-lawyer${
											tag_id !== null ? `/?tag_id=${tag_id}` : ''
										}`}
									>
										<button className="btn-commn">Ask A Lawyer</button>
									</Link>
								</div>
							</div>
						</div>

						<div className="row align-items-center py-4">
							<div className="col-lg-6">
								<div className="legal-articles">
									<h3>Popular legal articles</h3>
								</div>
							</div>
							<div className="col-lg-6 text-end d-none d-lg-block" id="bussiness-btn">
								<Link href={'/blogs'} className="float-end">
									<button className="btn-get-free btn-commn bg-change d-flex gap-2 justify-content-lg-0 justify-content-center">
										<span className=""> View All</span>
										<span className="border-radius-1 banner-arrow-btn">
											<ChevronRightIcon width={20} color={'#BE8363'} />
										</span>
									</button>
								</Link>
							</div>
						</div>

						<div className="row g-5" id="bolgs">
							{relatedBlogs &&
								relatedBlogs.map((blog: any, index: number) => (
									<div className="col-lg-4" key={index}>
										<Blog blog={blog} />
									</div>
								))}
							<div className="col-lg-6 text-end d-block d-lg-none" id="bussiness-btn">
								<button className="btn-get-free btn-commn bg-change d-flex gap-2 justify-content-lg-0 justify-content-center">
									<span className=""> View All</span>
									<span className="border-radius-1 banner-arrow-btn">
										<ChevronRightIcon width={20} color={'#BE8363'} />
									</span>
								</button>
							</div>
						</div>
					</div>
				</section>
				<UpperFooter />
			</div>
		</>
	);
}
