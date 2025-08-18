import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './style.css';

interface DropDownProps {
	label?: any;
	align?:
		| 'start'
		| 'end'
		| {sm: 'start' | 'end'}
		| {md: 'start' | 'end'}
		| {lg: 'start' | 'end'}
		| {xl: 'start' | 'end'}
		| {xxl: 'start' | 'end'};
	items?: any[];
	onClick?: () => void;
	children?: React.ReactNode;
	style?:any;
}

export default function DropDown({label, items, align = 'start', children, onClick,style}: DropDownProps) {
	return (
		<DropdownButton className="dropdown-wrapper" style={style} drop="down" align={align} onClick={onClick} title={label}>
			<div>{children}</div>
		</DropdownButton>
	);
}
