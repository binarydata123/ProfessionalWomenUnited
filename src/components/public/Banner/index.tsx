'use client';
import React, { useEffect, useState, useContext } from 'react';

import './banner.css';

export default function Banner() {



	return (
		<div className='bg-color-blue'>
			{/* <section id="banner-section" className="banner-wrapper">
				<div className="container">
					<div className="row">
						<div className="col-md-8">
							<div className="banner-text-left">
								<h1 className="rtlHead">
									Find Top Women Professionals Nationwide
								</h1>
								<p className="rtlPera">
								Connect with award-winning women professionals through our platform and find the top-rated experts you need across the United States.
								</p>
							</div>
						</div>
						<div className="col-md-4">
						
						</div>
					</div>

				
				</div>
			</section> */}
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
            <a href="#directory" className="btn-primary">Find a Professional</a>
            <a href="#about" className="btn-secondary">Learn More</a>
          </div>
        </div>
      </div>
    </section>
		</div>
	);
}
