import React, { useState } from 'react';
import '../FormInput/style.css';
import { useTranslations } from 'next-intl';

interface FormTextareaProps {
	name?: string;
	required?: boolean;
	className?: string;
	label?: any;
	rows?: number;
	disabled?: boolean;
	maxLength?: number;
	placeholder?: string;
	onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
	value?: string;
	error?: any;
	onFocus?: () => void;
	onBlur?: () => void;
}

export default function FormTextarea({
	name,
	className,
	required,
	rows = 3,
	disabled = false,
	maxLength = 30,
	label,
	value,
	placeholder,
	error,
	onChange,
	onFocus,
	onBlur
}: FormTextareaProps) {
	const [charCount, setCharCount] = useState(value ? value.length : 0);
	const t = useTranslations('Index');

	const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const inputValue = event.target.value;
		if (inputValue.length <= maxLength) {
			setCharCount(inputValue.length);
			if (onChange) {
				onChange(event);
			}
		}
	};

	return (
		<div className="form-group form-group-wrapper">
			<div className="d-flex input-box">
				<textarea
					name={name}
					maxLength={maxLength}
					className={`form-control ${className} ${error && 'error-input'}`}
					autoComplete="off"
					placeholder={placeholder}
					value={value}
					disabled={disabled}
					onChange={handleTextareaChange}
					onFocus={onFocus}
					rows={rows}
					onBlur={onBlur}
					style={{ height: 'auto' }}
				/>
				{label && (
					<label htmlFor="textareaId" className={`pb-2 pt-2 ${error && 'error-text'}`}>
						{label}
					</label>
				)}
			</div>
			<div className="char-count text-end mt-1 d-flex justify-content-between">
				<p>
					<small className="error-message">{error}</small>
				</p>
				<p className="d-flex justify-content-end p-0">{maxLength - charCount} {t('remaining_characters')}</p>
			</div>
		</div>
	);
}
