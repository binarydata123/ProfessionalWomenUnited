'use client';
import DateFormat from '@/commonUI/DateFormat';
import Link from 'next/link';
import React, {useEffect, useState} from 'react';
import {TotalLikeAndDeslikeOnQuestion, totalLikesInQuestion, totalanswerInQuestion} from '../../../../lib/frontendapi';

interface Props {
	question: any;
	Key: any;
	slug?: string;
}

export default function Question({question, Key, slug}: Props) {
	const [answerCount, setanswerCount] = useState();
	const [likesCount, setlikesCount] = useState();

	const handleAnswerCount = (question_id: any = question.id) => {
		totalanswerInQuestion({forum_id: question_id}).then(res => {
			setanswerCount(res.data[0].count);
		});
	};

	const totalLikeOnQuestion = (id: any) => {
		TotalLikeAndDeslikeOnQuestion({question_id: id}).then(res => {
			setlikesCount(res.likes);
		});
	};

	useEffect(() => {
		handleAnswerCount(question.id);
		totalLikeOnQuestion(question.id);
	}, [answerCount]);

	return (
		<div className="accordion-item" key={`${Key}`}>
			<Link href={`/legal-forum/${slug}/${question.slug}`}>
				<h2 className="accordion-header" id="headingOne">
					<button
						className="accordion-button collapsed"
						type="button"
						// data-bs-toggle="collapse"
						data-bs-target={`#collapseOne-${question.id}`}
						aria-expanded="false"
						aria-controls={`collapseOne-${question.id}`}
					>
						<div className="accordian-tabs-class">
							<p>
								Posted on <DateFormat date={question.created_at} /> <span>• {answerCount} answer </span>
							</p>
							<h6>{question.question}</h6>
							<span>{likesCount} people found this helpful</span>
						</div>
					</button>
				</h2>
			</Link>
		</div>
	);
}
