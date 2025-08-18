import DateFormat from '@/commonUI/DateFormat';
import Rating from '@/commonUI/Rating';
import React from 'react';

interface Props {
	data?: any;
}

export default function Review({data}: Props) {
	return (
		<div className="review-wrapper">
			<div className="row mt-4">
				<div className="col-sm-8 col-8">
					<div className="top-review-section ">
						<ul className="star-rating">
							<Rating rating={data.stars} />
						</ul>
					</div>
					<div className="upload-date">
						<p className="social-link weight-medium font-x-small">
							{data.name} • <DateFormat date={data.created_at} />
						</p>
					</div>
				</div>
			</div>

			<div className="reviews mt-2">
				<div className="review-card">
					<h4 className="social-link font-large weight-medium">{data.title}</h4>
					<p className="text-sonic-silver font-small weight-light">{data.description}</p>
				</div>
			</div>
		</div>
	);
}
