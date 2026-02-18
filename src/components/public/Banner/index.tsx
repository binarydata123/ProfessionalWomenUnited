'use client';
import React, { useEffect, useState, useContext } from 'react';

import './banner.css';
import Link from 'next/link';

export default function Banner() {



	return (
		<div className='bg-color-blue'>

			<section className="hero-banner">
				<div className="overlay"></div>
				<div className="container top-ban">
					<div className="hero-content">
						<h1 className="hero-title">
							We recognize <span>and connect you with award-winning women</span><br />experts across the U.S.
						</h1>
						<p className="hero-subtitle">
							Build trusted connections with women professionals that have ALL been voted best in their metro area. Our platform helps you find the right expert, at the right time.
						</p>
						<div className="hero-buttons">
							<Link href="/find-a-professional" className="btn-primary">Find a Professional</Link>
							<Link href="/about-us" className="btn-secondary">Learn More</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
