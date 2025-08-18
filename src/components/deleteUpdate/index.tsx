'use client';

import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Page() {
	const [tablename, setTableName] = useState('');
	const [updatetablename, setUpdateTableName] = useState('');
	const [id, setId] = useState('');
	const [message, setMessage] = useState('');
	const [message2, setMessage2] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [errorMessage2, setErrorMessage2] = useState('');
	const [columnname, setColumnName] = useState('');
	const [updatevalue, setUpdateValue] = useState('');
	const [updateid, setUpdateId] = useState('');
	const handleDeleteRow = async (tablename: any, id: any) => {
		try {
			if (!tablename || !id) {
				console.error('Tablename and/or ID is null.');
				setErrorMessage('Tablename and/or ID is null.');
				return;
			}
			setErrorMessage('');
			const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/delete-table-row`, {
				headers: {
					Accept: 'application/json'
				},
				params: {
					tablename: tablename,
					id: id
				}
			});

			if (response.status === 200) {
				// Data deleted successfully
				setMessage('Data deleted successfully');
			} else {
				// Handle the error here
				console.error('Failed to delete data.');
			}
		} catch (error) {
			// Handle any network or other errors
			console.error(error);
		}
	};

	const handleUpdateData = async (updatetablename: any, columnname: any, updatevalue: any, updateid: any) => {
		try {
			if (!updatetablename || !columnname || !updatevalue || !updateid) {
				setErrorMessage2('Please fill correct information.. ');
				return;
			}
			setErrorMessage('');
			const response = await axios.request({
				url: `${process.env.NEXT_PUBLIC_API_URL}/update-table-data`,
				method: 'post', // Added the missing comma here
				headers: {
					Accept: 'application/json' // Removed the extra comma here
				},
				data: {
					updatetablename: updatetablename,
					columnname: columnname,
					updatevalue: updatevalue,
					updateid: updateid
				}
			});
			if (response.data.status === true) {
				setMessage2('Data Updated successfully');
			} else {
				// Handle the error here
				console.error('Failed to update data.');
			}
		} catch (error) {
			// Handle any network or other errors
			console.error(error);
		}
	};

	return (
		<div
			className=""
			style={{
				display: 'flex',
				justifyContent: 'space-around',
				marginTop: '2rem',
				padding: '2rem'
			}}
		>
			<div className="col-sm-4">
				<p className="font-large social-link weight-semi-bold m-font-20 mb-2  ">Delete Row From Database</p>
				<label className="font-small  weight-medium text-sonic-silver w-100">Table Name</label>
				<div className="icon-fild">
					<input
						type="text"
						placeholder="Table Name"
						className="form-fild  w-100 sp-right"
						value={tablename}
						onChange={e => {
							setTableName(e.target.value);
							setErrorMessage('');
							setMessage('');
						}}
					/>
				</div>

				<label className="font-small  weight-medium password-sonic-silver w-100 mt-4">ID</label>
				<div className="icon-fild">
					<input
						type="text"
						placeholder="ID .. "
						className="form-fild  w-100 sp-right"
						value={id}
						onChange={e => {
							setId(e.target.value);
							setErrorMessage('');
							setMessage('');
						}}
					/>
					{/* <i className="fa-regular fa-eye"></i> */}
				</div>
				<button
					type="button"
					className="btn btn-outline-success text-center btn-lawyer mt-3 w-100"
					onClick={e => handleDeleteRow(tablename, id)}
				>
					Delete Row
				</button>
				<p style={{marginTop: '2rem'}}>
					{message}
					{errorMessage}
				</p>
			</div>
			<div className="col-sm-4">
				<p className="font-large social-link weight-semi-bold m-font-20 mb-2  ">Update Data</p>
				<label className="font-small  weight-medium text-sonic-silver w-100">Table Name</label>
				<div className="icon-fild">
					<input
						type="text"
						placeholder="Table Name"
						className="form-fild  w-100 sp-right"
						value={updatetablename}
						onChange={e => {
							setUpdateTableName(e.target.value);
							setErrorMessage2('');
							setMessage2('');
						}}
					/>
				</div>

				<label className="font-small  weight-medium password-sonic-silver w-100 mt-4">Column Name</label>
				<div className="icon-fild">
					<input
						type="text"
						placeholder="Column Name.."
						className="form-fild  w-100 sp-right"
						value={columnname}
						onChange={e => {
							setColumnName(e.target.value);
							setErrorMessage2('');
							setMessage2('');
						}}
					/>
					{/* <i className="fa-regular fa-eye"></i> */}
				</div>
				<label className="font-small  weight-medium password-sonic-silver w-100 mt-4">Value</label>
				<div className="icon-fild">
					<input
						type="text"
						placeholder="Value .. "
						className="form-fild  w-100 sp-right"
						value={updatevalue}
						onChange={e => {
							setUpdateValue(e.target.value);
							setErrorMessage2('');
							setMessage2('');
						}}
					/>
					{/* <i className="fa-regular fa-eye"></i> */}
				</div>
				<label className="font-small  weight-medium password-sonic-silver w-100 mt-4">ID</label>
				<div className="icon-fild">
					<input
						type="text"
						placeholder="ID .. "
						className="form-fild  w-100 sp-right"
						value={updateid}
						onChange={e => {
							setUpdateId(e.target.value);
							setErrorMessage2('');
							setMessage2('');
						}}
					/>
					{/* <i className="fa-regular fa-eye"></i> */}
				</div>
				<button
					type="button"
					className="btn btn-outline-success text-center btn-lawyer mt-3 w-100"
					onClick={e => handleUpdateData(updatetablename, columnname, updatevalue, updateid)}
				>
					Update Data
				</button>
				<p style={{marginTop: '2rem'}}>
					{message2}
					{errorMessage2}
				</p>
			</div>
		</div>
	);
}
