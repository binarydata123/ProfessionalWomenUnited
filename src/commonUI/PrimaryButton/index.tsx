import React from 'react';
import './style.css';

interface PrimaryButtonProps {
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

export default function PrimaryButton({label, className = '', children, onClick}: PrimaryButtonProps) {
	return (
		<div className="primary-btn-wrapper">
			<button onClick={onClick} className={`btn-primary ${className}`}>
				{label || children}
			</button>
		</div>
	);
}
