import React from 'react';

export default function SplitReview(review: any) {
	review;
	const inputString = review.review;
	const regex = /^([\d.]+) \((.+)\)$/;
	const match = inputString.match(regex);
	let rating, reviews;

	if (match) {
		rating = match[1];
		reviews = match[2];
	}
	return (
		<div className="split-review-wrapper">
			<strong>{rating} </strong>
			{reviews}
		</div>
	);
}
