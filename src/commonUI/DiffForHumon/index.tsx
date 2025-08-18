import React from 'react';
import TimeAgo from 'timeago-react';

interface Props {
	date?: any;
}

export default function DiffForHuman({date}: Props) {
	return <TimeAgo datetime={date} locale="en" />;
}
