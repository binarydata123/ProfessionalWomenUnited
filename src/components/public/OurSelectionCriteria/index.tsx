'use client';
import React, {useContext} from 'react';
import AuthContext from '@/context/AuthContext';

export default function OurSelectionCriteria() {
	const {locale} = useContext(AuthContext);
	return (
		<>
			<div id="main-div" className={`${locale} pb-0`}>
				<div className="selection-page">
					<div className="selection-container">
						<header className="selection-header">
							<h1>Our Selection Criteria</h1>
							<p>
								At <strong>Professional Women United</strong>, we are dedicated to recognizing and
								showcasing exceptional professionals who make a difference in their communities and
								industries. Our goal is to provide representation that reflects the diversity,
								expertise, and leadership found throughout the United States.
							</p>
						</header>

						<section className="selection-section">
							<h2>Nationwide Representation</h2>
							<p>
								We proudly feature professionals located within the{' '}
								<strong>200 largest U.S. cities</strong> to ensure a wide-reaching and inclusive network
								of accomplished individuals. This approach guarantees that our community reflects the
								full spectrum of excellence across major metropolitan areas, offering visibility to
								professionals from every corner of the nation.
							</p>
							<p>
								By highlighting experts from diverse locations, we promote collaboration, connection,
								and recognition across industries. Our platform is designed to help professionals gain
								the exposure they deserve while allowing audiences nationwide to discover trusted
								leaders close to home.
							</p>
						</section>

						<section className="selection-section selection-image-section">
							<img
								src="/professional-women/OurSelectionCriteria/business-people-collection-collage.jpg"
								alt="business-people-collection-collage"
							/>
						</section>

						<section className="selection-section">
							<h2>How We Select Featured Professionals</h2>
							<ul className="list-disc list-inside space-y-2">
								<li>Demonstrated excellence and leadership in their respective fields</li>
								<li>Proven commitment to ethical and professional standards</li>
								<li>Contributions to community, innovation, or industry growth</li>
								<li>Representation of diversity, inclusion, and social impact</li>
							</ul>
							<p>
								Each professional undergoes a careful review to ensure alignment with our mission and
								values before being featured.
							</p>
						</section>

						<section className="selection-section">
							<h2>Why This Matters</h2>
							<p>
								By curating professionals from the largest metropolitan areas, we create a platform that
								connects talent with opportunity — locally and nationally. This ensures every featured
								member is part of a trusted, verified, and recognized community of achievers.
							</p>
						</section>

						<footer className="selection-footer">
							<p>
								Our commitment to featuring professionals across the 200 largest U.S. cities reflects
								our dedication to diversity, quality, and inclusion. Every profile represents a story of
								hard work, achievement, and professional integrity.
							</p>
						</footer>
					</div>
				</div>
			</div>
		</>
	);
}
