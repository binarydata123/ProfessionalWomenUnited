'use client';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';

import Table from '@/commonUI/Table';
import {getDbStructure} from '../../../lib/adminapi';
import axios from 'axios';
export default function Page() {
	const [message, setMessage] = useState('');
	const [message2, setMessage2] = useState('');
	const [message3, setMessage3] = useState('');

	const [messageforfile, setSuccessMessage] = useState('');
	const [errormessage4, setErrorMessage4] = useState('');
	const [file, setFile] = useState(null);
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

	const handleFileChange = (event: any) => {
		setSuccessMessage('');
		setErrorMessage4('');
		const selectedFile = event.target.files[0];

		setFile(selectedFile);
	};

	const handleFormSubmit = async (event: any) => {
		event.preventDefault();
		setSuccessMessage('');
		setErrorMessage4('');
		if (!file) {
			setErrorMessage4('Please select a file.');
			return;
		}
		const formData = new FormData();
		formData.append('envFile', file);

		try {
			const response = await axios.request({
				url: `${process.env.NEXT_PUBLIC_API_URL}/upload-env`,
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'multipart/form-data'
				},
				data: formData
			});

			if (response.status === 200) {
				setErrorMessage4('');
				setSuccessMessage('Environment file uploaded successfully.');
			} else {
				setErrorMessage4('Failed to upload environment file.');
			}
		} catch (error) {
			setSuccessMessage('');
			setErrorMessage4('An error occurred while uploading the file.');
		}
	};

	const dropDatabase = async () => {
		try {
			const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/drop-database', {
				method: 'GET'
			});

			if (response.ok) {
				const data = await response.json();
				setMessage(data.message);
			} else {
				setMessage('Error running migration and seeder');
			}
		} catch (error) {
			console.error(error);
			setMessage('An error occurred');
		}
	};

	const handleRunMigrationAndSeeder = async () => {
		try {
			const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/run-migration-and-seeder', {
				method: 'GET'
			});

			if (response.ok) {
				const data = await response.json();
				setMessage2(data.message);
			} else {
				setMessage2('Error running migration and seeder');
			}
		} catch (error) {
			console.error(error);
			setMessage2('An error occurred');
		}
	};

	const downloadenv = async () => {
		try {
			const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/download-env', {
				method: 'GET',
				headers: {
					Accept: 'application/octet-stream'
				}
			});

			if (response.ok) {
				const blob = await response.blob();

				const url = window.URL.createObjectURL(blob);

				const a = document.createElement('a');
				a.href = url;
				a.download = '.env';
				document.body.appendChild(a);
				a.click();

				window.URL.revokeObjectURL(url);
				a.remove();
			} else {
				setMessage3('Error downloading env');
			}
		} catch (error) {
			console.error(error);
			setMessage3('An error occurred');
		}
	};
	return (
		<>
			{authenticated ? (
				<div
					className="buttonStyle"
					style={{
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center'
					}}
				>
					<div className="table-part dbMargin">
						<button
							className="btn btn-outline-success text-center btn-lawyer mt-3 w-100"
							onClick={dropDatabase}
						>
							Drop Database
						</button>
						<p>{message}</p>
					</div>
					<div className="table-part dbMargin">
						<button
							className="btn btn-outline-success text-center btn-lawyer mt-3 w-100"
							onClick={handleRunMigrationAndSeeder}
						>
							Run Migration & Seeder
						</button>
						<p>{message2}</p>
					</div>
					<div className="table-part dbMargin">
						<button
							className="btn btn-outline-success text-center btn-lawyer mt-3 w-100"
							onClick={downloadenv}
						>
							Download ENV file
						</button>
						<p>{message3}</p>
					</div>

					<div className="table-part dbMargin">
						<input
							type="file"
							accept=".env"
							placeholder="Table Name.."
							className="form-fild  w-100 sp-right"
							onChange={handleFileChange}
						/>
						<button
							className="btn btn-outline-success text-center btn-lawyer mt-3 w-100"
							onClick={handleFormSubmit}
						>
							Upload ENV file
						</button>
						<p>{messageforfile}</p>
						<p>{errormessage4}</p>
					</div>
				</div>
			) : null}
		</>
	);
}
