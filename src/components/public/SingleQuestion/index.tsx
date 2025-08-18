'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, {useContext, useEffect, useState} from 'react';
import {ChevronRightIcon} from '@heroicons/react/20/solid';
import UpperFooter from '@/components/public/UpperFooter';
import Answer from '@/components/public/Answer';
import Question from '@/components/public/Question';
import DateFormat from '@/commonUI/DateFormat';
import Blog from '@/components/public/Blog';
import PrimaryButton from '@/commonUI/PrimaryButton';
import {toast} from 'react-toastify';
import {getSingleQuestionByIdOrSlug, storeQuestionResponse} from '../../../../lib/frontendapi';
import FormTextarea from '@/commonUI/FormTextArea';
import AuthContext from '@/context/AuthContext';

interface Props {
	slug?: string;
	questionSlug?: string;
	question?: any;
	response?: any;
	relatedQuestion?: any;
	relatedBlogs?: any;
}

export default function SingleQuestion({
	slug = '',
	questionSlug = '',
	question,
	response,
	relatedBlogs,
	relatedQuestion
}: Props) {
	const {user} = useContext(AuthContext)
	const [questionResponse, setquestionResponse]: any = useState([]);
	const [showCommentField, setshowCommentField]: any = useState(false);
	const [comment, setcomment]: any = useState('');
	const [error, seterror] = useState(false);

	useEffect(() => {
		const filteredData = response.filter((answer: any) => answer.legal_response_status === 'active' && answer.member_status !== 'deleted');
		setquestionResponse(filteredData);
	}, []);

	const getSingleQuestion = (slug: string) => {
		const data = {
			input: slug
		};

		getSingleQuestionByIdOrSlug(data).then(res => {
			// Filter the records where legal_response_status is 'active'
			const filteredResponses = res.data.filter((item: any) => item.legal_response_status === 'active' && item.member_status !== 'deleted');

			// Update the state with the filtered data
			setquestionResponse(filteredResponses);
		});
	};

	const handleComment = () => {
		if (comment !== '') {
			const data = {
				legal_forum_id: question.forum_id,
				user_id: user?.id,
				message: comment
			};
			storeQuestionResponse(data).then(res =>
				res.status === true ? toast.success(res.message) : toast.error(res.message)
			);
			seterror(false);
			setshowCommentField(false);
			getSingleQuestion(questionSlug);
		} else {
			seterror(true);
		}
	};

	const scrollToBottom = (e: any) => {
		e.preventDefault();
		const targetId = e.target.getAttribute('data-target');
		const targetElement = document.getElementById(targetId);
		if (targetElement) {
			window.scrollTo({
				top: targetElement.offsetTop,
				behavior: 'smooth'
			});
		}
	};

	return (
		<>
			<div className="legaltopic single-question-page">
				<section>
					<div className="container">
						<div id="legal-serve">
							<span>Home</span>
							<span>
								<Image
									src="/images/legal-service/arrow-right.png"
									alt="Legal Forum"
									width={16}
									height={16}
								/>
							</span>
							<span>Legal Forum</span>
							<span>
								<Image
									src="/images/legal-service/arrow-right.png"
									alt="Legal Forum"
									width={16}
									height={16}
								/>
							</span>
							<Link href={`/legal-forum/${slug}`}>
								<span>{slug}</span>
							</Link>
							<span>
								<Image
									src="/images/legal-service/arrow-right.png"
									alt="Legal Forum"
									width={16}
									height={16}
								/>
							</span>
							<span>{question && question.question}</span>
						</div>
					</div>
				</section>
			</div>
			<section id="posted-on-dd-month-yyyy">
				<div className="container">
					<div className="row g-5">
						<div className="col-lg-9">
							<div className="posted-on-dd-month-yyyy-text">
								{question && (
									<>
										<h6>
											Posted on <DateFormat date={question.forum_created_at} />{' '}
										</h6>

										<h1>{question.question}</h1>
										<p>
											{question.description}
											<br />
											{question.description && question.description.length > 200 && (
												<a href="#">Show More</a>
											)}
											<br />
											<button className="btn-info text-capitalize">{slug} Law</button>
										</p>
									</>
								)}
							</div>
							<br />
							<br />
							<div className="border"></div>
							<div className="mt-4">
								<div className="row">
									<div className="col-lg-6">
										{user?.role === 'lawyer' ? (
											<button
												className="btn-commn w-100"
												onClick={() =>
													setshowCommentField(
														(prevShowCommentField: boolean) => !prevShowCommentField
													)
												}
											>
												Comment
											</button>
										) : (
											<Link href={'/ask-a-lawyer'}>
												<button className="btn-commn w-100">Ask A Lawyer - it’s FREE!</button>
											</Link>
										)}
									</div>
									<div className="col-lg-6 mt-lg-0 mt-2">
										<button
											className="btn-questions"
											data-target={'related-question'}
											onClick={e => scrollToBottom(e)}
										>
											View Related Questions
										</button>
									</div>
								</div>
							</div>
							{showCommentField && (
								<div className="mt-4 row">
									<div className="answer-box col-sm-12">
										<div className="form-group">
											<FormTextarea
												maxLength={500}
												name=""
												label={'Provide your Answer:'}
												onChange={e => setcomment(e.target.value)}
												error={error}
												className={`form-control mt-3`}
												rows={5}
												placeholder="Your answer..."
											/>
										</div>
										<PrimaryButton className="mt-3 float-right" onClick={handleComment}>
											Submit
										</PrimaryButton>
									</div>
								</div>
							)}

							<div className="lawyer-advice">
								{questionResponse && <h4>{questionResponse.length} lawyer advice</h4>}
							</div>
							{questionResponse &&
								questionResponse.map((answer: any, index: number) => (
									<Answer loginUser={user} answer={answer} Key={index} />
								))}
						</div>
					</div>
				</div>
			</section>

			<div className="container  d-none d-lg-block">
				<div className="row align-items-center" id="get-legal-question">
					<div className="col-lg-8">
						<div className="gotalegalquestion">
							<h4>Got A Legal Question?</h4>
							<h5>Post your questions for FREE & get advice from multiple lawyers.</h5>
						</div>
					</div>
					<div className="col-lg-4 text-lg-end">
						<div className="gotalegalquestion">
							<Link href={`/legal-forum/${slug}/ask-a-lawyer`}>
								<button className="btn-commn">Ask A Lawyer</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<section id="related-question">
				<div className="container">
					<div className="row align-items-center py-lg-4 pb-4">
						<div className="col-6">
							<div className="legal-articles browse-bay">
								<h3>Related Questions</h3>
							</div>
						</div>
						<div className="col-6 text-end" id="all-btn-bg">
							<button className="btn-get-free btn-commn bg-change d-flex gap-2 justify-content-lg-0 justify-content-center float-end">
								<span className="">View More</span>
								<span className="border-radius-1 banner-arrow-btn">
									<ChevronRightIcon width={20} color={'#BE8363'} />
								</span>
							</button>
						</div>
					</div>
					<div className="main-accordian">
						<div className="accordion border-0" id="accordionExample">
							<div className="row">
								{relatedQuestion &&
									relatedQuestion.map((item: any, index: number) => (
										<div className="col-sm-6" key={index}>
											<Question slug={slug} question={item} Key={`question-${index}`} />
										</div>
									))}
							</div>
						</div>
					</div>

					<div className="row align-items-center py-4">
						<div className="col-lg-6">
							<div className="legal-articles">
								<h3>Related reading</h3>
							</div>
						</div>
						<div className="col-lg-6 text-end d-none d-lg-block" id="bussiness-btn">
							<Link href={'/blogs'}>
								<button className="btn-get-free btn-commn float-end bg-change d-flex gap-2 justify-content-lg-0 justify-content-center">
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
							relatedBlogs.map((item: any, index: number) => (
								<div className="col-sm-4" key={index}>
									<Blog blog={item} key={`blog-${index}`} />
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
		</>
	);
}
