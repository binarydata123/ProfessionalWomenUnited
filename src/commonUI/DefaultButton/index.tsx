import React from 'react';
import {ChevronRightIcon} from '@heroicons/react/20/solid';
import './default-button.css';

interface DefaultButtonProps {
	label?: string;
	className?: string;
	children?: React.ReactNode;
	showIcon?: boolean;
	color?: string;
	background?: string;
	height?: number;
	fontSize?: number;
	onClick?: () => void;
}

export default function DefaultButton({
	label,
	className,
	children,
	showIcon = true,
	color = '#FFFFFF',
	background = '#c49073',
	height = 42,
	fontSize = 16,
	onClick
}: DefaultButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`default-button ${className}`}
			style={{
				fontSize: `${fontSize}px`,
				color: `${color}`,
				background: `${background}`,
				height: `${height}px`
			}}
		>
			<span>{children || label}</span>
			{showIcon ? (
				<span className="default-button-icon">
					<ChevronRightIcon width={fontSize} />
				</span>
			) : null}
		</button>
	);
}
