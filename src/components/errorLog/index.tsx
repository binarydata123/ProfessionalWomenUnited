'use client';
import React, {useState, useEffect} from 'react';
import {getFailerErrorLog, deleteerrorlog, handledeleteAllData} from '../../../lib/frontendapi';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from '@/commonUI/Pagination';
import Link from 'next/link';

interface allErrorlogs {
	error_message: string;
	id: string;
	file_name: string;
	line_number: string;
}
export default function Errorlogs() {
	const [allErrorlogs, setAllErrorlog] = useState<allErrorlogs[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [filteredErrorlogs, setFilteredErrorlogs] = useState<allErrorlogs[]>([]);
	const [searchQuery, setSearchQuery] = useState('');

	const [name, setErrorlogName] = useState('');
	const [id, setErrorlogId] = useState('');

	const [modalConfirm, setModalConfirm] = useState(false);
	const [processing, setProcessing] = useState(false);
	const [showPopupunsave, setShowPopupunsave] = useState(false);
	const [showPopupunsave1, setShowPopupunsave1] = useState(false);
	const [showmessage, setShowmessage] = useState('');
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
	const modalConfirmClose = () => {
		setModalConfirm(false);
	};

	const pageSize = 20;

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await getFailerErrorLog();
			if (response.status == true) {
				setAllErrorlog(response.data);
				filterBlogs(response.data, searchQuery);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const filterBlogs = (allErrorlogs: allErrorlogs[], searchValue: string) => {
		const filteredErrorlogs = allErrorlogs.filter(Errorlog => {
			const errorMessageMatch = Errorlog.error_message.toLowerCase().includes(searchValue.toLowerCase());
			const fileNameMatch =
				Errorlog.file_name && Errorlog.file_name.toLowerCase().includes(searchValue.toLowerCase());
			const lineNumberMatch =
				Errorlog.line_number &&
				Errorlog.line_number.toString().toLowerCase().includes(searchValue.toLowerCase());
			const idMatch = Errorlog.id && Errorlog.id.toString().toLowerCase() === searchValue.toLowerCase();

			return errorMessageMatch || fileNameMatch || lineNumberMatch || idMatch;
		});

		setFilteredErrorlogs(filteredErrorlogs);
		setCurrentPage(1);
	};

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value.toLowerCase();
		setSearchQuery(searchValue);
		filterBlogs(allErrorlogs, searchValue);
	};

	const onPageChange = (page: number) => {
		setCurrentPage(page);
	};
	const paginate = (items: any[], pageNumber: number, pageSize: number) => {
		const startIndex = (pageNumber - 1) * pageSize;
		return items.slice(startIndex, startIndex + pageSize);
	};
	const paginatedErrorlog = paginate(filteredErrorlogs, currentPage, pageSize);

	const handleCancel = () => {
		setModalConfirm(false);
	};

	const resetForm = () => {
		setErrorlogName('');
		setErrorlogId('');
	};

	function handledeleteerrorlog(error_message: string, file_name: string) {
		const confirmDelete = window.confirm('Are you sure you want to delete the Error Log?');

		if (confirmDelete) {
			const data = {
				error_message: error_message,
				file_name: file_name
			};
			deleteerrorlog(data)
				.then(res => {
					if (res.status === true) {
						fetchData();
					} else {
						console.log('Deletion failed');
						// fetchData();
					}
				})
				.catch(() => {
					console.log('Deletion failed');
				});
		} else {
			console.log('Deletion canceled');
		}
	}

	function handledeleteAllErrorLog() {
		const confirmDelete = window.confirm('Are you sure you want to delete the All Error Log?');

		if (confirmDelete) {
			handledeleteAllData()
				.then(res => {
					if (res.status === true) {
						window.location.reload();
					} else {
					}
				})
				.catch(() => {});
		} else {
		}
	}

	return (
		<>
			{authenticated ? (
				<div
					// className="banner-part home-page-banner-back"
					style={{
						padding: '8% 1%',
						background: `url('images/errorlog-back.jpg')`
					}}
				>
					<div
						className=""
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							padding: '4px 4%',
							marginBottom: '1%',
							width: '100%'
						}}
					>
						<h5 className="f-100 w-700" style={{color: 'var(--green-dark)'}}>
							Displaying <span className="span-color-dash">Error</span> Logs
						</h5>

						<button
							className="btn btn-outline-success btn-login"
							style={{
								fontSize: '19px'
							}}
							onClick={() => handledeleteAllErrorLog()}
						>
							Delete All
						</button>
					</div>
					<div className="data-management">
						<div className="row justify-content-end" id="Errorlog_input">
							<div className="col-lg-5 col-md-12">
								<div>
									<div className="input-group  mb-2">
										<input
											type="text"
											className="form-control"
											placeholder="Search message here.."
											value={searchQuery}
											onChange={handleSearch}
										/>
									</div>
								</div>
							</div>

							<div className="col-lg-2 col-md-12">
								<button
									type="button"
									className="btn btn-outline-success btn-lawyer hide-btn"
									onClick={() => {
										setModalConfirm(true);
										resetForm();
										toast.dismiss();
									}}
								>
									Search Message
								</button>
							</div>
						</div>
						<div className="table-part mt-4 max-w overflow-auto">
							<table className="rwd-table" style={{width: '100%', tableLayout: 'auto'}}>
								<tbody>
									<tr>
										<th
											style={{
												backgroundColor: '#001A38',
												color: '#FFFFFF',
												textAlign: 'center'
											}}
											className="border-1 p-2"
										>
											Action
										</th>
										<th
											style={{
												backgroundColor: '#001A38',
												color: '#FFFFFF',
												textAlign: 'center'
											}}
											className="border-1 p-2"
										>
											Error Message
										</th>
										<th
											style={{
												backgroundColor: '#001A38',
												color: '#FFFFFF',
												textAlign: 'center'
											}}
											className="border-1 p-2"
										>
											Line
										</th>
										<th
											style={{
												backgroundColor: '#001A38',
												color: '#FFFFFF',
												textAlign: 'center'
											}}
											className="border-1 p-2"
										>
											File Name
										</th>
										<th
											style={{
												backgroundColor: '#001A38',
												color: '#FFFFFF',
												textAlign: 'center'
											}}
											className="border-1 p-2"
										>
											Count
										</th>
									</tr>

									{paginatedErrorlog.map((item: any, index: any) => (
										<tr key={index}>
											<td data-th="Action" className="text-center border-1 p-2">
												<i
													className="fa-regular fa-trash-can del-trash"
													onClick={() =>
														handledeleteerrorlog(item.error_message, item.file_name)
													}
													style={{color: 'red', cursor: 'pointer'}}
												></i>
											</td>
											<td data-th="Error Message" className="text-start border-1 p-2">
												{item.error_message}
											</td>
											<td data-th="Line" className="text-center border-1 p-2">
												{item.line_number ? item.line_number : 'null'}
											</td>
											<td data-th="File Name" className="text-start border-1 p-2">
												{item.file_name}
											</td>
											<td data-th="File Name" className="text-start border-1 p-2">
												{item.duplicate_count} <span>time</span>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="pagination-wrapper mt-4" style={{display: 'flex', justifyContent: 'flex-end'}}>
							<Pagination
								currentPage={currentPage}
								totalPages={Math.ceil(filteredErrorlogs.length / pageSize)}
								handlePageChange={onPageChange}
							/>
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}
