import LinkButton from '@/commonUI/LinkButton';
import Link from 'next/link';
import React from 'react';
import './countcard.css';
interface Props {
	href?: string;
	linkText?: string;
	linkColor?: string;
	countColor?: string;
	count?: any;
	backgroundImage?: string;
	backgroundColor?: string;
}

export default function CountCard({
	href = '/',
	countColor = '#fff',
	linkText,
	linkColor = '#fff',
	count = 0,
	backgroundColor,
	backgroundImage
}: Props) {
	return (
		<div className="count-card-wrapper add-none">
			<Link href={href}>
				<div
					className="dash-card-g back-dash-card-1"
					style={{
						backgroundImage: `url(${backgroundImage})`,
						backgroundColor: `${backgroundColor}`
					}}
				>
					<p className="font-large weight-bold" style={{ color: `${countColor}` }}>
						{count}
					</p>
					<LinkButton className="hover-comf" color={linkColor}>
						{linkText}
					</LinkButton>
				</div>
			</Link>
		</div>
	);
}
