import React from 'react';

interface SuccessButtonProps {
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

export default function SuccessButton({label, className = '', children, onClick}: SuccessButtonProps) {
	return (
		<div className="success-btn-wrapper">
			<button onClick={onClick} className={`btn-primary-true ${className}`}>
				{label || children}
			</button>
		</div>
	);
}
