'use client';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Table from '@/commonUI/Table';
import EyeButton from '@/commonUI/TableActionButtons/EyeButton';
import { getAllLegalForumActiveFilteredForAdmin, deleteLegalForumByAdmin } from '../../../../../../lib/adminapi';
import Pagination from '@/commonUI/Pagination';
import Swal from 'sweetalert2';
import Image from 'next/image';
import DeleteButton from '@/commonUI/TableActionButtons/DeleteButton';
import AuthContext from '@/context/AuthContext';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { formatDateToDDMMYYYYMMAPPORVAL } from '@/app/[locale]/commonfunctions/commonfunctions';

export default function Page() {
	const { user } = useContext(AuthContext)
	const [user_id, setUserId] = useState('');
	const [filter_users, SetFilterUsers] = useState([]);
	const [name, setName] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPageStr = process.env.NEXT_PUBLIC_ITEM_PER_PAGE ?? '0';
	const itemsPerPage = parseInt(itemsPerPageStr, 10); // Parse to an integer with base 10

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentLawyer = filter_users.slice(startIndex, endIndex);
	const totalPages = Math.ceil(filter_users.length / itemsPerPage);

	const [type_start_date, setStartDateType] = useState('text');
	const [start_date, setStartDateValue] = useState('');

	const [type_end_date, setEndDateType] = useState('text');
	const [end_date, setEndDateValue] = useState('');

	const handleStartDateClick = () => {
		setStartDateType('date');
	};

	const handleEndDateClick = () => {
		setEndDateType('date');
	};

	useEffect(() => {
		if (user) {
			user?.id ? setUserId(user?.id) : setUserId('');
			handleChange('name', '', user?.id);
		}
	}, []);

	const handlePageChange = (newPage: any) => {
		setCurrentPage(newPage);
	};
	const handleChange = (inputName: any, value: any, user_id: any) => {
		setCurrentPage(1);

		switch (inputName) {
			case 'name':
				setName(value);
				break;
			case 'start_date':
				setStartDateValue(value);
				break;
			case 'end_date':
				setEndDateValue(value);
				break;
			default:
				break;
		}

		const data = {
			name: inputName === 'name' ? value : name,
			start_date: inputName === 'start_date' ? value : start_date,
			end_date: inputName === 'end_date' ? value : end_date,
			user_id: user_id
		};

		getAllLegalForumActiveFilteredForAdminataData(data);
	};

	const getAllLegalForumActiveFilteredForAdminataData = async (data: any) => {
		try {
			const response = await getAllLegalForumActiveFilteredForAdmin(data);
			if (response.status == true) {
				SetFilterUsers(response.data);
			} else {
				// toast.error(response.message);
				SetFilterUsers([]);
			}
		} catch (error) {
			console.error('Error fetching:', error);
		}
	};

	const changeUserStatus = (id: any, updated_status: any) => {
		// Show a confirmation dialog

		Swal.fire({
			title: 'Are you sure you want to remove the question ?',
			text: 'All responses related to this question will also be deleted.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#02142d',
			cancelButtonColor: '#D04E4F',
			confirmButtonText: 'Yes'
		}).then(result => {
			if (result.isConfirmed) {
				try {
					const data = {
						id: id,
						user_id: user_id,
						status: updated_status
					};

					deleteLegalForumByAdmin(data)
						.then(res => {
							if (res.status == true) {
								handleChange('name', '', user_id);
								Swal.fire('Success!', 'Question has been remove successfully', 'success');
							} else {
								console.error('An error occurred');
							}
						})
						.catch(err => {
							if (err.response) {
								console.error('An error occurred');
							}
						});
				} catch (error) {
					console.error(error);
				}
			}
		});
	};

	return (
		<div>
			<div className="form-part mt-2">
				<div className="row align-items-center g-3">
					<div className="col-sm-6 col-md-6 col-lg-3">
						<div className="icon-fild icon-g p-set position-relative">
							<input
								type="text"
								placeholder="Search for a users"
								className="form-fild w-100 sp-right"
								value={name}
								onChange={e => handleChange('name', e.target.value, user_id)}
							/>
							<Image
								src="/images/search-normal.png"
								width={24}
								height={24}
								alt="cdd"
								className="magnify-search"
							/>
						</div>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-2">
						<input
							type={type_start_date}
							placeholder="Start Date"
							onChange={e => handleChange('start_date', e.target.value, user_id)}
							onClick={handleStartDateClick}
							value={start_date}
							className="form-fild  w-100 "
						/>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-2">
						<input
							type={type_end_date}
							placeholder="End Date"
							onChange={e => handleChange('end_date', e.target.value, user_id)}
							onClick={handleEndDateClick}
							value={end_date}
							className="form-fild  w-100 "
						/>
					</div>
				</div>
			</div>

			<p className="font-small weight-light social-link mt-3 mb-3">
				Displaying <span className="span-color-dash weight-bold">{filter_users.length}</span> live posts
			</p>

			<div className="table-part mt-3">
				<Table columns={['Question', 'Posted By', 'Responses', 'Actions']} data={currentLawyer}>
					{(rowData, index) => (
						<tr key={index}>
							<td data-th="Question">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{rowData.question}</Tooltip>}>
									<span className="font-small weight-light social-link text-capitalize">
										{rowData.question && rowData.question.length > 200
											? rowData.question.substring(0, 200) + '...'
											: rowData.question}
									</span>
								</OverlayTrigger>
							</td>

							<td data-th="Posted by">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class text-capitalize">{rowData.full_name} <br /> {formatDateToDDMMYYYYMMAPPORVAL(rowData.created_at)}</Tooltip>}>
									<span className="font-small weight-medium social-link text-primary text-capitalize">
										{rowData.full_name && rowData.full_name > 20
											? rowData.full_name.substring(0, 20) + '...'
											: rowData.full_name}
									</span>
								</OverlayTrigger>
								<p className="font-x-small text-sonic-silver weight-light">
									{formatDateToDDMMYYYYMMAPPORVAL(rowData.created_at)}
								</p>
							</td>

							<td data-th="Responses">
								<p className="font-small weight-medium social-link">
									{rowData.legal_forum_responses_count}
								</p>
							</td>

							<td data-th="Actions " className="text-right ">
								<Link href={`/admin/content-mgmt/legal-forum/${rowData.id}`}>
									<EyeButton Tooltip="View Question" />
								</Link>
								<DeleteButton
									Tooltip="Delete Question"
									onClick={e => changeUserStatus(rowData?.id, 'deleted')}
								/>
							</td>
						</tr>
					)}
				</Table>
			</div>

			{currentLawyer.length > 0 && (
				<div className="text-right mt-5 m-none float-end">
					<Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
				</div>
			)}
		</div>
	);
}
