import React from 'react';
import {Placeholder} from 'react-bootstrap';
export default function ServiceLoadingPlaceholder() {
	return (
		<>
			<Placeholder as="p" animation="glow">
				<div
					style={{
						height: '45px',
						width: '100%',
						backgroundColor: '#c6eee266',
						padding: '20px',
						borderRadius: '8px'
					}}
				></div>
			</Placeholder>
		</>
	);
}
