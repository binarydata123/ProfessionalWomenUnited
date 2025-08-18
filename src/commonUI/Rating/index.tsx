import React from 'react';
import {AiFillStar} from 'react-icons/ai';
import './style.css';

interface Props {
	rating?: number;
	width?: number;
}

export default function Rating({width = 20, rating = 4}: Props) {
	const data = [{}, {}, {}, {}, {}];
	return (
		<div className="rating-star-wrapper">
			<ul className="d-flex rating-star-list star-rating">
				{data.map((item, index) => (
					<li key={index}>
						<AiFillStar style={{color: `${index < rating ? '#c49073' : '#F2F2F2'}`, width: `${width}px`}} />
					</li>
				))}
				<li>{rating}.0</li>
			</ul>
		</div>
	);
}
