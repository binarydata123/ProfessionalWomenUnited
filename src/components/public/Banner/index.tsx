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
							Connecting <span>Top Women Professionals</span><br /> Nationwide
						</h1>
						<p className="hero-subtitle">
							Build trusted connections with award-winning women professionals across the United States.
							Our platform helps you find the right expert, at the right time.
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
