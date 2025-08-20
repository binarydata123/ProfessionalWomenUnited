import React from 'react';
import './tesimonial.css';
import SliderWithProgressBar from '../SliderWithProgressBar/page';

export default function page() {
	return (
		<>
			<section className="test-part">
				<div className="container-fluid p-0">
					<div className="row align-items-center">
						<div className="col-lg-4">
							<div className="tes-sp">
								<p className="font-x-small green-medium-2 weight-bold mb-2">TESTIMONIALS</p>
								<h3 className="font-xxx-large weight-bold social-link">
									Real experiences from
									<span className="green-medium-2"> Women Professionals</span>
								</h3>
								<button className="btn-208C84 mt-4 effect">View All</button>
							</div>
						</div>

						<div className="col-lg-8">
							<div className="silder-imge">
								<SliderWithProgressBar />
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
