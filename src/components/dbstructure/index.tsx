'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import Table from '@/commonUI/Table';
import { getDbStructure } from '../../../lib/adminapi';
export default function Page() {
	const [data, setData]: any = useState([]);
	const [authenticated, setAuthenticated] = useState(false);

	const authenticateUser = () => {
		const enteredPassword = prompt('Please enter password to access this page.');
		if (enteredPassword === 'Welcome90#@!') {
			setAuthenticated(true);
		} else {
			alert('Authentication failed. Please try again.');
		}
	};

	useEffect(() => {
		authenticateUser();
	}, []);

	useEffect(() => {
		getDbStructure()
			.then(response => {
				setData(response.data);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);
	return (
		<>
			{authenticated ? (
				<div>
					<div className="table-part dbMargin">
						<table className="custom-table">
							<thead>
								<tr>
									<th className="text-center border-1">Structure</th>
									<th className="text-center border-1">Name</th>
								</tr>
							</thead>
							<tbody>
								{data.map((item: any, index: any) => (
									<tr key={index} style={{ border: '1px solid #ccc' }}>
										<td className="text-center border-1">{item.structure}</td>
										<td className="text-center border-1">
											{item.name} <br /> ( {item.type} ) <br />{' '}
											{new Date(item.created_at).toLocaleString('en-US', {
												month: 'short',
												day: 'numeric',
												hour: 'numeric',
												minute: 'numeric'
											})}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			) : null}
		</>
	);
}
