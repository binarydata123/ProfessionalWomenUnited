'use client';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';

import Table from '@/commonUI/Table';
import {getDbStructure} from '../../../lib/adminapi';
export default function Page() {
	const [message, setMessage] = useState('');
	const [data, setData] = useState([]);
	const [message2, setMessage2] = useState('');
	const [message3, setMessage3] = useState('');
	const [tableName, setTableName] = useState('');
	const [tableNameToTruncate, setTableNameTruncate] = useState('');
	const [tableNameToSeeder, setTableNameToSeeder] = useState('');

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
	const getTableData = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-table-data/${tableName}`, {
				method: 'GET'
			});

			if (response.ok) {
				const data = await response.json();
				setData(data);
				setMessage(data.message);
			} else {
				setMessage('Error running migration and seeder');
			}
		} catch (error) {
			console.error(error);
			setMessage('An error occurred');
		}
	};
	const truncateTableData = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/truncate-table/${tableNameToTruncate}`, {
				method: 'POST'
			});

			if (response.ok) {
				const data = await response.json();

				setMessage2(data.message);
			} else {
				setMessage2('Error running tuncate');
			}
		} catch (error) {
			console.error(error);
			setMessage('An error occurred');
		}
	};
	const SeederTableData = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seeder-table/${tableNameToSeeder}`, {
				method: 'GET'
			});

			if (response.ok) {
				const data = await response.json();

				setMessage3(data.message);
			} else {
				setMessage3('Error running seeder');
			}
		} catch (error) {
			console.error(error);
			setMessage('An error occurred');
		}
	};

	return (
		<>
			{authenticated ? (
				<div className="buttonStyle">
					<div className="table-part dbMargin">
						<div className="container">
							<div className="row g-3">
								<div className="col-md-4">
									<div className="members-data">
										<div>
											<input
												type="text"
												placeholder="Table Name.."
												className="form-fild w-100 sp-right form-control"
												value={tableName}
												onChange={e => {
													setTableName(e.target.value);
													setMessage('');
												}}
											/>
											<button
												className="btn btn-outline-success btn-lawyer hide-btn"
												style={{marginTop: '2rem'}}
												onClick={getTableData}
											>
												Get Data
											</button>
											<p>{message}</p>
										</div>

										<details>
											<summary>Show JSON Data</summary>
										</details>
										<div style={{wordBreak: 'break-all'}}>
											<div>
												<pre style={{wordBreak: 'break-all'}}>
													{JSON.stringify(data, null, 2)}
												</pre>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-4">
									<div>
										<div>
											<input
												type="text"
												placeholder="Table Name To Truncate.."
												className="form-fild w-100 sp-right form-control"
												value={tableNameToTruncate}
												onChange={e => {
													setTableNameTruncate(e.target.value);
													setMessage2('');
												}}
											/>
											<button
												className="btn btn-outline-success btn-lawyer hide-btn"
												style={{marginTop: '2rem'}}
												onClick={truncateTableData}
											>
												Truncate
											</button>
											<p>{message2}</p>
										</div>
									</div>
								</div>
								<div className="col-md-4">
									<div>
										<div>
											<input
												type="text"
												placeholder="Table Name To Seed.."
												className="form-fild w-100 sp-right form-control"
												value={tableNameToSeeder}
												onChange={e => {
													setTableNameToSeeder(e.target.value);
													setMessage3('');
												}}
											/>
											<button
												className="btn btn-outline-success btn-lawyer hide-btn"
												style={{marginTop: '2rem'}}
												onClick={SeederTableData}
											>
												Seeder
											</button>
											<p>{message3}</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}
