import React from 'react';
import {Placeholder} from 'react-bootstrap';
interface Props {
	height?: number;
}
export default function ImageLoadingPlacehoder({height = 280}: Props) {
	return (
		<Placeholder as={'p'} animation="glow">
			<Placeholder
				className="w-100"
				style={{
					borderRadius: '16px',
					backgroundColor: '#c4907352',
					height: `${height}px`,
					width: '320px'
				}}
			></Placeholder>
		</Placeholder>
	);
}
