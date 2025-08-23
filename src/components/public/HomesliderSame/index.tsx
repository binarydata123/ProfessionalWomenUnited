import React from 'react';
import { StarIcon } from '@heroicons/react/20/solid';
import Slider from '@/commonUI/Slider';
import Image from 'next/image';
export default function HomesliderSame() {
	return (
		<>
			<section id="silder-section">
				<div className="container">
					<div className="needlawyer-text">
						<h6 className="text-start">TOP Professional experts</h6>
						<h2 className="text-start">
							<span className="span"> Discover the </span>top lawyers in
							<br />
							Dubai
						</h2>
					</div>
					<div className="row">
						<div className="col-md-12">
							<Slider
								className="mt-5"
								items={4}
								responsive={{
									0: {
										items: 1
									},
									600: {
										items: 3
									},
									991: {
										items: 3
									},
									1200: {
										items: 3
									},
									1366: {
										items: 4
									},
									1440: {
										items: 4
									},
									1500: {
										items: 4
									}
								}}
							>
								<div className="testimonial">
									<div className="pic">
										<Image
											src="/images/user-image.png"
											className="effect"
											alt="Discover the to lawyer"
											width={1200}
											height={380}
											layout="responsive"
											objectFit="cover"
										/>
									</div>
									<h3 className="testimonial-title">Avi Hassan</h3>
									<p className="description">
										Legal Consultant <span>at</span> Company Name
									</p>
									<p className="stong-text">
										<span>
											<StarIcon
												width={20}
												color="#c49073"
												style={{ marginRight: '5px', height: '30px' }}
											/>{' '}
										</span>
										<span>
											<strong>4.0</strong>
										</span>
										<span>(10 reviews) </span>
									</p>
									<div>
										<button>Family Professional</button>
									</div>
								</div>
								<div className="testimonial">
									<div className="pic">
										<Image
											src="/images/user-image.png"
											className="effect"
											alt="Discover the to lawyer"
											width={1200}
											height={380}
											layout="responsive"
											objectFit="cover"
										/>
									</div>
									<h3 className="testimonial-title">Avi Hassan</h3>
									<p className="description">
										Legal Consultant <span>at</span> Company Name
									</p>
									<p className="stong-text">
										<span>
											<StarIcon
												width={20}
												color="#c49073"
												style={{ marginRight: '5px', height: '30px' }}
											/>{' '}
										</span>
										<span>
											<strong>4.0</strong>
										</span>
										<span>(10 reviews) </span>
									</p>
									<div>
										<button>Bank Law</button>
									</div>
								</div>
								<div className="testimonial">
									<div className="pic">
										<Image
											src="/images/user-image.png"
											className="effect"
											alt="Discover the to lawyer"
											width={1200}
											height={380}
											layout="responsive"
											objectFit="cover"
										/>
									</div>
									<h3 className="testimonial-title">Avi Hassan</h3>
									<p className="description">
										Legal Consultant <span>at</span> Company Name
									</p>
									<p className="stong-text">
										<span>
											<StarIcon
												width={20}
												color="#c49073"
												style={{ marginRight: '5px', height: '30px' }}
											/>{' '}
										</span>
										<span>
											<strong>4.0</strong>
										</span>
										<span>(10 reviews) </span>
									</p>
									<div>
										<button>Commercial Law</button>
									</div>
								</div>
								<div className="testimonial">
									<div className="pic">
										<Image
											src="/images/user-image.png"
											className="effect"
											alt="Discover the to lawyer"
											width={1200}
											height={380}
											layout="responsive"
											objectFit="cover"
										/>
									</div>
									<h3 className="testimonial-title">Avi Hassan</h3>
									<p className="description">
										Legal Consultant <span>at</span> Company Name
									</p>
									<p className="stong-text">
										<span>
											<StarIcon
												width={20}
												color="#c49073"
												style={{ marginRight: '5px', height: '30px' }}
											/>{' '}
										</span>
										<span>
											<strong>4.0</strong>
										</span>
										<span>(10 reviews) </span>
									</p>
									<div>
										<button>Family Professional</button>
									</div>
								</div>
								<div className="testimonial">
									<div className="pic">
										<Image
											src="/images/user-image.png"
											className="effect"
											alt="Discover the to lawyer"
											width={1200}
											height={380}
											layout="responsive"
											objectFit="cover"
										/>
									</div>
									<h3 className="testimonial-title">Avi Hassan</h3>
									<p className="description">
										Legal Consultant <span>at</span> Company Name
									</p>
									<p className="stong-text">
										<span>
											<StarIcon
												width={20}
												color="#c49073"
												style={{ marginRight: '5px', height: '30px' }}
											/>{' '}
										</span>
										<span>
											<strong>4.0</strong>
										</span>
										<span>(10 reviews) </span>
									</p>
									<div>
										<button>Family Professional</button>
									</div>
								</div>
							</Slider>
							<div className="text-end all-btn mt-5">
								<button>View All</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
