'use client';
import React, {useState} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import './lawyer.css';
import Image from 'next/image';

export default function LawyersLayout({children}: {children: React.ReactNode}) {
	const pathname = usePathname();

	return (
		<div className="right-body overflow-hidden">
			<ul className="list-12 mb-3">
				<li>
					<Link href="/admin/dashboard">
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
						User Mgmt. &nbsp;
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
						{' '}
						Professionals
					</Link>
				</li>
			</ul>
			<section>
				<div id="legal-serve" className="pb-0">
					<Link href="/admin/dashboard">
						<span>Dashboard</span>
					</Link>
					<span>
						<Image src="/images/legal-service/arrow-right.png" alt="User Mgmt" width={16} height={16} />
					</span>
					<span>User Mgmt.</span>
					<span>
						<Image src="/images/legal-service/arrow-right.png" alt="Professionals" width={16} height={16} />
					</span>
					<span>Professionals</span>
				</div>
			</section>
			<h4 className="font-xx-large social-link weight-semi-bold mb-3 p-0 pt-4">Professionals</h4>
			<div className="nav-tab use-lawyer p-set p-0 border-0">
				<ul className="border-bottom">
					<li className={pathname === '/admin/user-mgmt/lawyers' ? 'active' : ''}>
						<Link aria-current="page" href="/admin/user-mgmt/lawyers">
							Active
						</Link>
					</li>
					<li className={pathname === '/admin/user-mgmt/lawyers/approvals' ? 'active' : ''}>
						<Link href="/admin/user-mgmt/lawyers/approvals">Approvals</Link>
					</li>
					<li className={pathname === '/admin/user-mgmt/lawyers/report-center' ? 'active' : ''}>
						<Link href="/admin/user-mgmt/lawyers/report-center">Report Center</Link>
					</li>
				</ul>
			</div>

			{children}
		</div>
	);
}
