import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderWithProgressBar.css';

const SliderWithProgressBar = () => {
	const sliderRef = useRef(null);
	const [progressWidth, setProgressWidth] = useState(25);
	const [progressWidthBelow, setProgressWidthBelow] = useState(50);
	const [slidesToShow, setSlidesToShow] = useState(2); // Number of slides to show
	let isWidth50 = false;
	const updateProgress = (currentSlide: any, slideCount: any) => {
		const calc = isWidth50 ? '50' : '25'; // Alternate between '50' and '25'

		if (calc === '50') {
			setProgressWidth(50);
			setProgressWidthBelow(50);
		} else {
			setProgressWidth(25);
			setProgressWidthBelow(50);
		}

		isWidth50 = !isWidth50; // Toggle the variable for the next iteration
	};

	const settings = {
		slidesToShow,
		slidesToScroll: 1,
		margin: 0,
		speed: 400,
		beforeChange: (currentSlide: any, nextSlide: any) => {
			updateProgress(nextSlide, slidesToShow);
		}
	};

	useEffect(() => {
		// Function to update the number of slides to show based on the screen width
		const updateSlidesToShow = () => {
			const screenWidth = window.innerWidth;
			if (screenWidth < 768) {
				setSlidesToShow(1); // Show 1 slide for smaller screens (e.g., mobile)
			} else {
				setSlidesToShow(2); // Show 2 slides for larger screens
			}
		};

		// Initial setup
		updateSlidesToShow();

		// Listen for window resize events to update the number of slides to show
		window.addEventListener('resize', updateSlidesToShow);

		// Clean up the event listener when the component unmounts
		return () => {
			window.removeEventListener('resize', updateSlidesToShow);
		};
	}, []);

	useEffect(() => {
		if (sliderRef.current) {
			updateProgress(0, slidesToShow);
		}
	}, [slidesToShow]);

	return (
		<div className="slider-container">
			<div className="progress-container">
				<div className="progress" style={{ width: `${progressWidth}%` }} />
				<div className="progress-shadow" style={{ width: `${progressWidthBelow}%` }} />
			</div>
			<Slider ref={sliderRef} {...settings}>
				<div>
					<div className="card-box-rest mar">
						<div className="c-h-200">
							<p className="font-large text-black weight-medium">
								"I've been able to connect with more clients than ever before since joining the
								platform. It's been a game-changer for my practice."
							</p>
						</div>
						<div className="row">
							<div className="col">
								<img src="/images/user-img.png" alt="user-img" className="w-80 effect" />
							</div>
							<div className="col-sm-10 col-9">
								<div className="name-location">
									<p className="font-medium weight-semi-bold text-black mt-2">John Smith</p>
									<p className="font-small weight-light text-black">Business Professional, </p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="card-box-rest">
						<div className="c-h-200">
							<p className="font-large text-black weight-medium">
								"I've been able to connect with more clients than ever before since joining the
								platform. It's been a game-changer for my practice."
							</p>
						</div>
						<div className="row">
							<div className="col">
								<img src="/images/user-img.png" alt="user-img" className="w-80 effect" />
							</div>
							<div className="col-sm-10 col-9">
								<div className="name-location">
									<p className="font-medium weight-semi-bold text-black mt-2">John Smith</p>
									<p className="font-small weight-light text-black">Business Professional, </p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="card-box-rest">
						<div className="c-h-200">
							<p className="font-large text-black weight-medium">
								"I've been able to connect with more clients than ever before since joining the
								platform. It's been a game-changer for my practice."
							</p>
						</div>
						<div className="row">
							<div className="col">
								<img src="/images/user-img.png" alt="user-img" className="w-80 effect" />
							</div>
							<div className="col-sm-10 col-9">
								<div className="name-location">
									<p className="font-medium weight-semi-bold text-black mt-2">John Smith</p>
									<p className="font-small weight-light text-black">Business Professional, </p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="card-box-rest">
						<div className="c-h-200">
							<p className="font-large text-black weight-medium">
								"I've been able to connect with more clients than ever before since joining the
								platform. It's been a game-changer for my practice."
							</p>
						</div>
						<div className="row">
							<div className="col">
								<img src="/images/user-img.png" alt="user-img" className="w-80 effect" />
							</div>
							<div className="col-sm-10 col-9">
								<div className="name-location">
									<p className="font-medium weight-semi-bold text-black mt-2">John Smith</p>
									<p className="font-small weight-light text-black">Business Professional, </p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Slider>
		</div>
	);
};

export default SliderWithProgressBar;
