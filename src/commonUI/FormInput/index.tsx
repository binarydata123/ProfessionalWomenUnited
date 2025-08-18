'use client';
import React from 'react';
import './style.css';

interface FormInputProps {
	name?: string;
	type?: string | 'number' | 'text' | 'email';
	required?: boolean;
	className?: string;
	label?: any;
	maxLength?: number;
	placeholder?: string;
	onChange?: any;
	height?: number;
	value?: any;
	error?: any;
	onFocus?: any;
	onBlur?: any;
}

export default function FormInput({
	name,
	className,
	type = 'text',
	required,
	maxLength = 30,
	label,
	value,
	placeholder,
	error,
	onChange,
	height = 55,
	onFocus,
	onBlur
}: FormInputProps) {
	return (
		<div className="form-group form-group-wrapper">
			<div className="d-flex input-box">
				<input
					type={type}
					name={name}
					maxLength={maxLength}
					className={`form-control ${className} ${error && 'error-input'}`}
					autoComplete="off"
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					style={{ height: `${height}px` }}
					onFocus={onFocus}
					onBlur={onBlur}
				/>
				{label && (
					<label
						htmlFor="exampleInputEmail1"
						className={`pb-2 pt-2 label-${className} ${error && 'error-text'}`}
					>
						{label}
					</label>
				)}
			</div>
			{error && <small className={`error-message message-${className}`}>{error}</small>}
		</div>
	);
}
