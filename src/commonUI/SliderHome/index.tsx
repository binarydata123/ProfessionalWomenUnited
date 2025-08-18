'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './SliderHome.css';

const OwlCarousel = dynamic(() => import('react-owl-carousel'), {ssr: false});
interface SliderProps {
	items?: number;
	dots?: boolean;
	nav?: boolean;
	loop?: boolean;
	autoWidth?: boolean;
	className?: string;
	children: any;
	responsive?: any;
	startPosition?: any;
}
export default function Slider({
	className,
	autoWidth = false,
	children,
	responsive,
	items = 4,
	dots = true,
	nav = false,
	loop = true,
	startPosition = 0
}: SliderProps) {
	const customNavText = ['<', '>'];
	return (
		<OwlCarousel
			responsive={responsive}
			className={`owl-theme ${className}`}
			items={items}
			loop={loop}
			dots={dots}
			autoWidth={autoWidth}
			margin={20}
			nav={nav}
			navText={customNavText}
			dotClass="owl-dot" // Set the class name for dots
			navClass={['custom-owl-prev', 'custom-owl-next']}
			startPosition={startPosition}
			style={{
				zIndex: 0
			}}
		>
			{children}
		</OwlCarousel>
	);
}
