import React from 'react';
import Image from 'next/image';
import './placeholder.css';
import LinkButton from '../LinkButton';
import Link from 'next/link';

interface ImageProps {
	image?: any;
	text?: string;
	link?: string;
	title?: string;
	buttonText?: string;
	showButton?: boolean;
	height?: number;
	onclick?: () => void;
}

export default function ImagePlaceholder({
	image,
	text,
	title,
	link = '',
	height,
	showButton = true,
	buttonText,
	onclick
}: ImageProps) {
	return (
		<div className="image-placeholder-wrapper" style={{height: `${height}px`}}>
			<div className="main-content">
				<Image src={image} alt={image} width={100} height={100} className="mb-2" />
				<h3>{title}</h3>
				<p>{text}</p>
				{showButton ? (
					<Link href={link}>
						<LinkButton onClick={onclick} className="mt-1">
							{buttonText}
						</LinkButton>
					</Link>
				) : null}
			</div>
		</div>
	);
}
