import React from 'react';
import './style.css';

interface Props {
	name: string;
	value?: any;
	className?: string;
	checked?: boolean;
	onClick?: () => void;
}

export default function Checkbox({name, className, checked = true, value, onClick}: Props) {
	return (
		<div className="checkbox-wrapper">
			<label className="main social-link font-small weight-medium mt-2">
				<input
					type="checkbox"
					name={name}
					value={value}
					className={`${className}`}
					onClick={onClick}
					checked={checked}
					id="form-checkbox"
				/>
				<span className="geekmark"></span>
			</label>
		</div>
	);
}
