'use client';
import React from 'react';
import Link from 'next/link';
import './style.css';
import Image from 'next/image';

export default function ReviewsLayout({children}: {children: React.ReactNode}) {
	return (
		<div className="right-body overflow-hidden">
			<ul className="list-12 mb-3">
				<li>
					<Link href="#">
						Dashboard &nbsp;
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
							/>
						</svg>
					</Link>
				</li>
				<li>
					<Link href="#">
						Content Mgmt. &nbsp;
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
							/>
						</svg>
					</Link>
				</li>
				<li>
					<Link href="#" className="active">
						Tag Mgmt.
					</Link>
				</li>
			</ul>
			<section>
				<div id="legal-serve" className="pb-0">
					<Link href="/admin/dashboard">
						{' '}
						<span>Dashboard</span>
					</Link>
					<span>
						<Image src="/images/legal-service/arrow-right.png" alt="Content Mgmt" width={16} height={16} />
					</span>
					<span>Content Mgmt.</span>
					<span>
						<Image src="/images/legal-service/arrow-right.png" alt="Tag Mgmt" width={16} height={16} />
					</span>
					<span>Tag Mgmt.</span>
				</div>
			</section>
			<h4 className="font-xx-large social-link weight-semi-bold mb-3 p-0 pt-4">Tag Mgmt.</h4>
			{children}
		</div>
	);
}
