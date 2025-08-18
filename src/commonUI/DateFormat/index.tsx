import React from 'react';

interface Props {
	date: any;
	options?: any;
}

export default function DateFormat({date, options = {day: 'numeric', month: 'long', year: 'numeric'}}: Props) {
	const newDate = new Date(date);
	return <>{newDate.toLocaleDateString('en-US', options)}</>;
}
