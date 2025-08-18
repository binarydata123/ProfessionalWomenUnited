import Rating from '@/commonUI/Rating';
import React, { useState, useEffect, useContext } from 'react';
import { getRecentReviews } from '../../../../lib/lawyerapi';
import ImagePlaceholder from '@/commonUI/ImagePlaceholder';
import AuthContext from '@/context/AuthContext';

export default function RecentReviews() {
	const { user } = useContext(AuthContext)
	const [reviews, setReviews]: any = useState([]);


	useEffect(() => {
		fetchRecentReviews(user?.id, 4);
	}, []);

	const fetchRecentReviews = async (userId: any, count: any) => {
		getRecentReviews({ memberId: userId, count: count })
			.then(data => {
				setReviews(data.reviews);
				console.log(data.reviews);

			})
			.catch(error => {
				console.error(error);
			});
	};

	const formatDate = (dateString: string | number | Date) => {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};
		const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
		const parts = formattedDate.split(' ');
		const month = parts[0];
		const day = parts[1];
		const year = parts[2];
		return `${day} ${month}, ${year}`;
	};

	return (
		<div>
			{reviews.length > 0 ? (
				<div>
					{reviews.map((review: any, index: any) => (
						<div className="card-notifaction recent-reviews-rating mt-2">
							<div>
								<div className="row" key={index}>
									<div className="col-6">
										<Rating rating={review.stars} />
										<p className="social-link weight-medium font-x-small">{review.title}</p>
									</div>
									<div className="col-6 text-right">
										<p className="list-right-text">{`${review.name} • ${formatDate(
											review.created_at
										)}`}</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<div>
					<ImagePlaceholder
						buttonText="Update your Profile"
						text="You don’t have any reviews."
						link="/lawyer/profile/edit"
						height={250}
						image={'/images/review-placeholder.png'}
					/>
				</div>
			)}
		</div>
	);
}
