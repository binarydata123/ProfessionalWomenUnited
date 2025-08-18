import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

interface Props {
	children?: React.ReactNode;
	collapse?: boolean;
	flush?: boolean;
}

export default function AccordionUI({children, collapse = true, flush = true}: Props) {
	return (
		<div className="accordion-wrapper">
			<Accordion defaultActiveKey={collapse ? '1' : '0'} flush={flush}>
				{children}
			</Accordion>
		</div>
	);
}
