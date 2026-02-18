'use client';
import React, { useState, useEffect, useContext } from 'react';
import Popup from '@/commonUI/Popup';
import Link from 'next/link';
import Table from '@/commonUI/Table';
import ChatTranscript from '@/components/admin/modals/ChatTranscript';
import EyeButton from '@/commonUI/TableActionButtons/EyeButton';
import { getAllSupportFilteredForAdmin, deleteSupportByAdmin } from '../../../../../lib/adminapi';
import { formatDateToDDMMYYYYMMAPPORVAL } from '@/app/[locale]/commonfunctions/commonfunctions';
import Pagination from '@/commonUI/Pagination';
import Swal from 'sweetalert2';
import DeleteButton from '@/commonUI/TableActionButtons/DeleteButton';
import Image from 'next/image';
import AuthContext from '@/context/AuthContext';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

export default function support() {
	const { user } = useContext(AuthContext)
	const [user_id, setUserId] = useState('');
	const [filter_users, SetFilterUsers] = useState([]);
	const [viewProfile, setViewProfile] = useState(false);
	const [name, setName] = useState('');
	const [sort_by, setSortBy] = useState('');

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPageStr = process.env.NEXT_PUBLIC_ITEM_PER_PAGE ?? '0';
	const itemsPerPage = parseInt(itemsPerPageStr, 10); // Parse to an integer with base 10

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentLawyer = filter_users.slice(startIndex, endIndex);
	const totalPages = Math.ceil(filter_users.length / itemsPerPage);

	const [inquryData, setInquiryData] = useState<any | null>(null);

	const [resgisted_type, setResgistedType] = useState('');
	const [resolved_type, setResolvedType] = useState('');
	const [user_type, setUserType] = useState('');

	useEffect(() => {
		if (user)
			user?.id ? setUserId(user?.id) : setUserId('');
		handleChange('sort_by', '', user?.id);
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
			case 'user_type':
				setUserType(value);
				break;
			case 'resgisted_type':
				setResgistedType(value);
				break;
			case 'resolved_type':
				setResolvedType(value);
				break;
			case 'sort_by':
				setSortBy(value);
				break;
			default:
				break;
		}

		const data = {
			name: inputName === 'name' ? value : name,
			user_type: inputName === 'user_type' ? value : user_type,
			resgisted_type: inputName === 'resgisted_type' ? value : resgisted_type,
			resolved_type: inputName === 'resolved_type' ? value : resolved_type,
			sort_by: inputName === 'sort_by' ? value : sort_by,
			user_id: user_id
		};

		getAllSupportFilteredForAdminData(data);
	};

	const getAllSupportFilteredForAdminData = async (data: any) => {
		try {
			const response = await getAllSupportFilteredForAdmin(data);
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
			title: 'Are you sure?',
			text: 'You Want to remove the support ticket',
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

					deleteSupportByAdmin(data)
						.then(res => {
							if (res.status == true) {
								handleChange('sort_by', '', user_id);
								Swal.fire('Success!', res.message, 'success');
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
		<div className="">
			<div className="form-part mt-2">
				<div className="row g-3 align-items-center">
					<div className="col-sm-6 col-md-6 col-lg-4">
						<div className="icon-fild icon-g p-set position-relative">
							<input
								type="text"
								placeholder="Search from name"
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
						<select
							className="form-fild  w-100"
							value={user_type}
							onChange={e => handleChange('user_type', e.target.value, user_id)}
						>
							<option value={''}>User</option>
							<option value={'professional'}>Professional</option>
							<option value={'individual'}>Individual</option>
						</select>
					</div>

					<div className="col-sm-6 col-md-6 col-lg-2">
						<select
							className="form-fild  w-100"
							value={resgisted_type}
							onChange={e => handleChange('resgisted_type', e.target.value, user_id)}
						>
							<option value={''}>Registred</option>
							<option value={'yes'}>Yes</option>
							<option value={'no'}>No</option>
						</select>
					</div>

					<div className="col-sm-6 col-md-6 col-lg-2">
						<select
							className="form-fild  w-100"
							value={resolved_type}
							onChange={e => handleChange('resolved_type', e.target.value, user_id)}
						>
							<option value={''}>Resloved</option>
							<option value={'yes'}>Yes</option>
							<option value={'no'}>No</option>
						</select>
					</div>

					<div className="col-sm-6 col-md-6 col-lg-2">
						<select
							className="form-fild add-icon  w-100"
							value={sort_by}
							onChange={e => handleChange('sort_by', e.target.value, user_id)}
						>
							<option value={''}>Sort By</option>
							<option value={'ASC'}>Oldest</option>
							<option value={'DESC'}>Newest</option>
						</select>
					</div>
				</div>
			</div>

			<div className="table-part mt-3">
				<Table
					columns={['From', 'User', 'Registered', 'Resloved', 'Created On', 'Actions']}
					data={currentLawyer}
				>
					{(rowData, index) => (
						<tr key={index}>
							<td data-th="From">
								<OverlayTrigger
									placement="top"
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{rowData.name}</Tooltip>}>
									<span className="font-small weight-medium primary-text">
										{rowData.name && rowData.name.length > 20
											? rowData.name.substring(0, 20) + '...'
											: rowData.name}
									</span>
								</OverlayTrigger>
								<br />
								<OverlayTrigger
									placement="top"
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{rowData.email}</Tooltip>}>
									<span className="font-x-small text-sonic-silver weight-light">
										{rowData.email && rowData.email.length > 20
											? rowData.email.substring(0, 20) + '...'
											: rowData.email}
									</span>

								</OverlayTrigger>
							</td>
							<td data-th="User">
								<OverlayTrigger
									placement="top"
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{rowData.member_type}</Tooltip>}>
									<span className="font-small weight-medium primary-text text-capitalize">
										{rowData.member_type}
									</span>
								</OverlayTrigger>
							</td>

							<td data-th="User">

								<p
									className={`font-small weight-medium ${rowData.registered == 'Yes' ? 'primary-text' : 'text-danger'
										}`}
								>
									{rowData.registered}
								</p>
							</td>

							<td data-th="User">
								<p
									className={`font-small weight-medium ${rowData.resolve == 'Yes' ? 'primary-text' : 'text-danger'
										}`}
								>
									{rowData.resolve}
								</p>
							</td>

							<td data-th="Created On">
								<OverlayTrigger
									placement="top"
									overlay={<Tooltip className="in custom-tooltip-class">{formatDateToDDMMYYYYMMAPPORVAL(rowData.created_at)}</Tooltip>}>
									<span className="font-x-small social-link weight-medium">
										{formatDateToDDMMYYYYMMAPPORVAL(rowData.created_at)}
									</span>
								</OverlayTrigger>
							</td>

							<td data-th="Actions " className="text-center ">
								<Link href={`/admin/support/${rowData.id}`}>
									<EyeButton Tooltip="View Support Ticket" />
								</Link>
								<DeleteButton
									Tooltip="Delete Support ticket"
									onClick={e => changeUserStatus(rowData?.id, 'deleted')}
								/>
							</td>
						</tr>
					)}
				</Table>
			</div>

			{
				currentLawyer.length > 0 && (
					<div className="text-right mt-5 m-none float-end">
						<Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
					</div>
				)
			}

			<Popup
				show={viewProfile}
				title=""
				size="lg"
				footer={false}
				onCancel={() => setViewProfile(false)}
				onOk={() => setViewProfile(false)}
			>
				{inquryData && <ChatTranscript inquryData={inquryData} />}
			</Popup>
		</div >
	);
}
