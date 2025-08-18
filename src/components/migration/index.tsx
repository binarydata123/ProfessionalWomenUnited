'use client';
import React, {useEffect, useState} from 'react';
import {ChevronDownIcon} from '@heroicons/react/20/solid';
export default function Page() {
	const [selectedOptiondrop, setselectedOptiondrop] = useState('');
	const [message, setMessage] = useState('');
	const [message2, setMessage2] = useState('');
	const [selectedOptionMigration, setSelectedOptionMigration] = useState('');
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

	const truncateTableData = async () => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/drop-field/${selectedOptiondrop}`, {
				method: 'POST'
			});
			if (response.ok) {
				const data = await response.json();
				setMessage(data.message);
			} else {
				setMessage('Error running drop');
			}
		} catch (error) {
			console.error(error);
			setMessage('Error running drop');
		}
	};

	const migrateFieldData = async () => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/migrate-fields/${selectedOptionMigration}`,
				{
					method: 'GET'
				}
			);
			if (response) {
				const data = await response.json();
				if (data.status === true) {
					setMessage2(data.message);
				} else {
					setMessage2('Error running migrations');
				}
			} else {
			}
		} catch (error) {
			console.error(error);
			setMessage2('Error running migrations');
		}
	};

	return (
		<>
			{authenticated ? (
				<div className="container mt-5">
					<div className="row">
						<div className="buttonStyle">
							<div className="table-part dbMargin migrationseeder">
								<div>
									<div className="row g-3">
										<div className="col-md-6">
											<div className="row align-items-center g-3">
												<div className="col-md-10">
													<div className="custom-select position-relative">
														<select
															className="form-control"
															value={selectedOptiondrop}
															onChange={e => {
																setselectedOptiondrop(e.target.value);
																setMessage('');
															}}
														>
															<option value="">Options </option>
															<option value="procedure">Stored Procedure</option>
															<option value="function">Function</option>
															<option value="trigger">Trigger</option>
														</select>
														<div className="custom-select-arrow">
															<ChevronDownIcon width={20} height={20} color="#000" />
														</div>
													</div>
												</div>

												<div className="col-md-2">
													<button
														className="btn btn-outline-success btn-lawyer hide-btn"
														onClick={truncateTableData}
													>
														Drop
													</button>
												</div>
											</div>
											<p>{message}</p>
										</div>
										<div className="col-md-6">
											<div className="row align-items-center g-3">
												<div className="col-md-10">
													<div className="custom-select position-relative">
														<select
															className="form-control"
															value={selectedOptionMigration}
															onChange={e => {
																setSelectedOptionMigration(e.target.value);
																setMessage2('');
															}}
														>
															<option value="">Options</option>
															<option value="procedure">Stored Procedure</option>
															<option value="function">Function</option>
															<option value="trigger">Trigger</option>
															<option value="table">Table</option>
														</select>
														<div className="custom-select-arrow">
															<ChevronDownIcon width={20} height={20} color="#000" />
														</div>
													</div>
												</div>
												<div className="col-md-2 text-lg-end">
													<button
														className="btn btn-outline-success btn-lawyer hide-btn"
														onClick={migrateFieldData}
													>
														Migrate
													</button>
												</div>
											</div>
											<p>{message2}</p>
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
