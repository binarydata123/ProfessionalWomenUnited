import React from 'react';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/20/solid';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import './style.css';

export default function LawyersList() {
	return (
		<div className="lawyer-list-wrapper">
			<div className="row g-3">
				<div className="col-lg-3">
					<div className="testimonial">
						<div className="pic pic-box1 position-relative">
							<div className="portfolioDisc">
								<Link
									href="/auth/login-2"
									className=" w-100 btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2"
								>
									<span className="text-white">Continue</span>
									<span className="border border-radius-1 banner-arrow-btn">
										<ChevronRightIcon width={20} color={'#fff'} />
									</span>
								</Link>
							</div>
							<div className="freeconsultation">
								Free Consultation<div className="blinking"></div>
							</div>
							<Image
								src="/images/find-a-professional/profile-Picture.jpg"
								alt="profile-Picture"
								width={1200}
								height={380}
								layout="responsive"
								objectFit="cover"
							/>
						</div>
						<h3 className="testimonial-title" data-bs-toggle="modal" data-bs-target="#exampleModal">
							Avi Hassan
						</h3>
						<p className="description">
							Legal Consultant <span>at</span> Company Name
						</p>
						<div className="location-move">
							<img src="/images/contact/location.png" alt="location" width={20} height={20} />
							Dubai
						</div>
						<p className="stong-text">
							<span>
								<StarIcon width={20} color="#208C84" style={{ marginRight: '5px', height: '30px' }} />
							</span>
							<span>
								<strong>4.0</strong>
							</span>
							<span>(10 reviews) </span>
						</p>
						<div className="btn-family-more">
							<button>Family Law</button>
							<a href="#">More details</a>
						</div>
					</div>
				</div>
				<div className="col-lg-3">
					<div className="testimonial">
						<div className="pic pic-box1 position-relative">
							<div className="portfolioDisc">
								<Link
									href="/auth/login-2"
									className=" w-100 btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2"
								>
									<span className="text-white">Continue</span>
									<span className="border border-radius-1 banner-arrow-btn">
										<ChevronRightIcon width={20} color={'#fff'} />
									</span>
								</Link>
							</div>
							<div className="freeconsultation bg-change">
								New
								<Image src="/images/contact/blink.svg" alt="blink" width={25} height={25} />
							</div>
							<Image
								src="/images/find-a-professional/second.png"
								alt="Avi Hassan"
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
						<div className="location-move">
							<img src="/images/contact/location.png" alt="Dubai" width={20} height={20} />
							Dubai
						</div>
						<p className="stong-text">
							<span>
								<StarIcon width={20} color="#208C84" style={{ marginRight: '5px', height: '30px' }} />
							</span>
							<span>
								<strong>4.0</strong>
							</span>
							<span>(10 reviews) </span>
						</p>
						<div className="btn-family-more">
							<button>Family Law</button>
							<a href="#">More details</a>
						</div>
					</div>
				</div>
				<div className="col-lg-3">
					<div className="testimonial">
						<div className="pic pic-box1 position-relative">
							<div className="portfolioDisc">
								<Link
									href="/auth/login-2"
									className=" w-100 btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2"
								>
									<span className="text-white">Continue</span>
									<span className="border border-radius-1 banner-arrow-btn">
										<ChevronRightIcon width={20} color={'#fff'} />
									</span>
								</Link>
							</div>
							<Image
								src="/images/find-a-professional/women.png"
								alt="Company Name"
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
						<div className="location-move">
							<img src="/images/contact/location.png" alt="location" width={20} height={20} />
							Dubai
						</div>
						<p className="stong-text">
							<span>
								<StarIcon width={20} color="#208C84" style={{ marginRight: '5px', height: '30px' }} />
							</span>
							<span>
								<strong>4.0</strong>
							</span>
							<span>(10 reviews) </span>
						</p>
						<div className="btn-family-more">
							<button>Family Law</button>
							<a href="#">More details</a>
						</div>
					</div>
				</div>
				<div className="col-lg-3">
					<div className="testimonial">
						<div className="pic pic-box1 position-relative">
							<div className="portfolioDisc">
								<Link
									href="/auth/login-2"
									className=" w-100 btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2"
								>
									<span className="text-white">Continue</span>
									<span className="border border-radius-1 banner-arrow-btn">
										<ChevronRightIcon width={20} color={'#fff'} />
									</span>
								</Link>
							</div>
							<Image
								src="/images/find-a-professional/women.png"
								alt="Avi Hassan"
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
						<div className="location-move">
							<img src="/images/contact/location.png" alt="location" width={20} height={20} />
							Dubai
						</div>
						<p className="stong-text">
							<span>
								<StarIcon width={20} color="#208C84" style={{ marginRight: '5px', height: '30px' }} />
							</span>
							<span>
								<strong>4.0</strong>
							</span>
							<span>(10 reviews) </span>
						</p>
						<div className="btn-family-more">
							<button>Family Law</button>
							<a href="#">More details</a>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
}
