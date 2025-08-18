'use client';
import React from 'react';
import Link from 'next/link';
import './style.css';
import LinkButton from '@/commonUI/LinkButton';

interface Props {
	title?: string;
	className?: string;
	href?: string;
	children?: React.ReactNode;
}

export default function RecentBox({title, href, children, className}: Props) {
	return (
		<div className={`recent-reviews recent-action-wrapper ${className}`}>
			<div className="row recent-reviews-header">
				<div className="col-8 ">
					<p className="font-large weight-semi-bold green-dark">{title}</p>
				</div>
				{href && (
					<div className="col-4 text-right">
						<Link href={href}>
							<LinkButton>View All</LinkButton>
						</Link>
					</div>
				)}
			</div>
			{children}
		</div>
	);
}
