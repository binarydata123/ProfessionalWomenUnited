import React from 'react';

interface SecondaryButtonProps {
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

export default function SecondaryButton({label, className = '', children, onClick}: SecondaryButtonProps) {
	return (
		<div className="secondary-btn-wrapper">
			<button onClick={onClick} className={`btn-secondary ${className}`}>
				{label || children}
			</button>
		</div>
	);
}
