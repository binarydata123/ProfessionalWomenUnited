import React, {useState, useEffect} from 'react';
interface Props {
	average?: any;
	totalReviews?: any;
	ratingsByStars?: any;
}
export default function ReviewsAverage({average = 0, totalReviews = 0, ratingsByStars}: Props) {
	const allStarRatings = [1, 2, 3, 4, 5];
	const [isLoading, setisLoading] = useState(true);
	useEffect(() => {
		setisLoading(false);
	});

	return (
		<div className="row mt-3">
			<div className="col-sm-3 col-md-3 col-6 mb-md-0 mb-3">
				{isLoading ? (
					<div
						style={{
							height: '120px',
							backgroundColor: 'rgb(249,242,239)',
							width: '100%',
							marginBottom: '10px',
							borderRadius: '8px'
						}}
					></div>
				) : (
					<div className="card ">
						<h2 className="font-larger social-link weight-bold Manrope">
							<i className="fa-solid fa-star font-xx-large green-medium-1 star-"></i> {average}
						</h2>
						<p className="font-x-small text-sonic-silver weight-light">{totalReviews} customer reviews</p>
					</div>
				)}
			</div>
			<div className="col-sm-9">
				{isLoading ? (
					<div
						style={{
							height: '200px',
							backgroundColor: 'rgb(249,242,239)',
							width: '100%',
							borderRadius: '10px'
						}}
					></div>
				) : (
					<div className="card">
						{allStarRatings.map((rating, index) => (
							<div className="star-review mb-2" key={index}>
								<div className="d-flex">
									<p className="font-small weight-bold w-10">{rating}</p> &nbsp;&nbsp;
									<i className="fa-solid fa-star font-small green-medium-1 "></i>
									&nbsp;&nbsp;
									<div className="prog">
										<div className="pag-box mt-2">
											<div
												className="g-pag-box"
												style={{
													width: `${totalReviews * ratingsByStars?.[rating] || 0}%`,
													backgroundColor: 'desired-color'
												}}
											></div>
										</div>
									</div>
									&nbsp;&nbsp;
									<p className="font-small weight-medium text-sonic-silver w-10">
										{ratingsByStars?.[rating] || 0}
									</p>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
