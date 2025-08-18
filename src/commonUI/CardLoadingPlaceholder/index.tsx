'use client';
import React from 'react';
import {Card, Placeholder} from 'react-bootstrap';

interface Props {
	height?: number;
}

export default function CardLoadingPlaceholder({height = 190}: Props) {
	return (
		<div className="card-loading-placeholder">
			<Placeholder as="p" animation="glow">
				<Placeholder
					className="w-100 mb-2"
					style={{
						borderRadius: '16px',
						backgroundColor: '#c4907352',
						height: `${height}px`,
						opacity: '0.5'
					}}
				></Placeholder>
			</Placeholder>
			<Placeholder as="p" animation="glow">
				<Placeholder xs={10} style={{backgroundColor: '#c4907352', height: '30px'}} />
			</Placeholder>
			<Placeholder as="p" animation="glow">
				<Placeholder xs={5} style={{backgroundColor: '#c4907352', height: '20px'}} />
			</Placeholder>
			<Placeholder as="p" animation="glow">
				<div className="d-flex mt-1">
					<Placeholder lg={4} style={{backgroundColor: '#c4907352', height: '30px'}} />
					<Placeholder lg={4} style={{backgroundColor: '#c4907352', height: '30px', marginLeft: '20px'}} />
				</div>
			</Placeholder>
		</div>
	);
}
