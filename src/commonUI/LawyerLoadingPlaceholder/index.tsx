import React from 'react';
import {Placeholder} from 'react-bootstrap';
export default function LawyerLoadingPlaceholder() {
	return (
		<>
			<div
				className="w-100 mb-2"
				style={{
					borderRadius: '16px',
					backgroundColor: '#c4907352',
					height: `190px`,
					opacity: '0.5',
					marginBottom: '25px'
				}}
			></div>
			<Placeholder xs={6} style={{marginBottom: '25px', backgroundColor: '#c4907352', height: '30px'}} />
			<br />
			<Placeholder xs={8} style={{marginBottom: '15px', backgroundColor: '#c4907352', height: '20px'}} />
			<br />
			<Placeholder xs={3} style={{marginBottom: '15px', backgroundColor: '#c4907352', height: '20px'}} />
			<br />
			<Placeholder xs={6} style={{marginBottom: '15px', backgroundColor: '#c4907352', height: '20px'}} />
			<br />
			<Placeholder xs={4} style={{backgroundColor: '#c4907352', height: '30px'}} />
			<Placeholder xs={4} style={{marginLeft: '25px', backgroundColor: '#c4907352', height: '30px'}} />
		</>
	);
}
