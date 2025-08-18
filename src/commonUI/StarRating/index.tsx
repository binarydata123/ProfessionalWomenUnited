import { useState } from 'react';
import Image from 'next/image';
import FormInput from '../FormInput';
import './style.css';

interface Props {
	initialRating?: any;
	onRatingChange?: any;
	error?: any;
	label?: any;
	className?: string;
}

const StarRating = ({ initialRating, onRatingChange, error, label, className = '' }: Props) => {
	const maxRating = 5;
	const [rating, setRating] = useState(initialRating);

	const handleStarClick = (clickedRating: any) => {
		setRating(clickedRating);
		if (onRatingChange) {
			onRatingChange(clickedRating);
		}
	};

	const starElements: JSX.Element[] = []; // Specify the type explicitly as JSX.Element[]

	for (let i = 1; i <= maxRating; i++) {
		starElements.push(
			<li key={i} onClick={() => handleStarClick(i)}>
				<Image
					src={i <= rating ? '/images/profile/colorstar.png' : '/images/profile/withoutstar.png'}
					width={40}
					height={40}
					layout="responsive"
					alt="without-star"
				/>
			</li>
		);
	}

	return (
		<div className={className}>
			<FormInput label={label} value={initialRating} className="d-none error-title-1" error={error} />
			<ul className="d-flex star">{starElements}</ul>
			<FormInput label={label} value={initialRating} className="d-none error-title-2" error={error} />
		</div>
	);
};

export default StarRating;
