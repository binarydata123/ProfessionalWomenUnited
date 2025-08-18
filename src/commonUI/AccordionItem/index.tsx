import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

interface Props {
	title?: string;
	children?: React.ReactNode;
	collapse?: boolean;
	Key?: any;
}

export default function AccordionItem({title, children, Key}: Props) {
	return (
		<Accordion.Item eventKey={Key}>
			<Accordion.Header>{title}</Accordion.Header>
			<Accordion.Body>{children}</Accordion.Body>
		</Accordion.Item>
	);
}
