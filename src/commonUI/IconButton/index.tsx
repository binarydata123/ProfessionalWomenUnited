import React from 'react';
import {ChevronRightIcon} from '@heroicons/react/20/solid';
import './style.css';

interface IconButtonProps {
	label?: string;
	className?: string;
	children?: React.ReactNode;
	showIcon?: boolean;
	color?: string;
	background?: string;
	height?: number;
	width?: number;
	fontSize?: number;
	onClick?: () => void;
}

export default function IconButton({
	label,
	className,
	children,
	color = '#BE836314',
	background = '#BE836314',
	height = 28,
	width = 28,
	fontSize = 16,
	onClick
}: IconButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`icon-button-wrapper ${className}`}
			style={{
				fontSize: `${fontSize}px`,
				color: `${color}`,
				background: `${background}`,
				height: `${height}px`,
				width: `${width}px`
			}}
		>
			<span>{children || label}</span>
		</button>
	);
}
