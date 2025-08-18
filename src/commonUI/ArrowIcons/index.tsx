import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import './icon.css';

interface LinkButtonProps {
	label?: string;
	className?: string;
	children?: React.ReactNode;
	color?: string;
	fontSize?: number;
	height?: number;
	onClick?: () => void;
}

export default function page({
	label,
	className,
	children,
	color = '#c49073',
	fontSize = 16,
	height = 42,
	onClick
}: LinkButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`link-button ${className}`}
			style={{ fontSize: `${fontSize}px`, color: `${color}`, height: `${height}px` }}
		>
			<span>{children || label}</span>
			<span className="link-button-icon">
				<ChevronRightIcon width={fontSize} />
			</span>
		</button>
	);
}
