import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: "404 Not Found - Professional Women United | Find Experienced Professionals for YOur professional Needs",
		description: "Oops! It seems the page you're looking for is not found. No worries! Professional Women United is here to help you find experienced lawyers tailored to your specific professional issues. Explore our platform to discover a network of qualified attorneys ready to assist you. YOur professional solution is just a click away!",
		alternates: {
			canonical: '/'
		}
	}
}


export default function Page() {
	return (
		<>
			<section>
				<div className="container">
					<div className="text-center">
						<div className="empty-text">
							<Image src="/images/contact/bro.png" alt="Return to Homepage" width={290} height={220} />
							<h1>Oops! You've reached a Legal Dead End.</h1>
							<p>
								We apologize, but the page you're looking for seems to have taken an extended recess. It
								may have been moved, deleted, or never existed in the first place. Double-check the URL
								or navigate back to our homepage to find the Professional Information you need.
							</p>
							<Link href="/">
								<button className="btn-commn">
									Return to Homepage
								</button>
							</Link>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
