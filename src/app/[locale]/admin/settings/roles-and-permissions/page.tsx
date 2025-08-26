'use client';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Table from '@/commonUI/Table';
import DropDown from '@/commonUI/DropDown';
import EyeButton from '@/commonUI/TableActionButtons/EyeButton';
import {
	getAllUserAndLaywerFilteredForAdmin,
	getSingleUserDetailByAdmin,
	importMembers,
	updateLawerStatus
} from '../../../../../../lib/adminapi';
import Pagination from '@/commonUI/Pagination';
import Swal from 'sweetalert2';
import DefaultButton from '@/commonUI/DefaultButton';
import DeleteButton from '@/commonUI/TableActionButtons/DeleteButton';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import EditButton from '@/commonUI/TableActionButtons/EditButton';
import LawyerProfile from '@/components/admin/modals/LawyerProfile';
import ViewProfile from '@/components/lawyer/Popup/ViewProfile';
import Popup from '@/commonUI/Popup';
import { getSingleLawyerDetails } from '../../../../../../lib/frontendapi';
import AuthContext from '@/context/AuthContext';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { formatDateToDDMMYYYYMMAPPORVAL } from '@/app/[locale]/commonfunctions/commonfunctions';

export default function Page() {
	const { user } = useContext(AuthContext)
	const router = useRouter();
	const [user_id, setUserId] = useState('');
	const [filter_users, SetFilterUsers] = useState([]);
	const [name, setName] = useState('');

	const [userType, setUserType] = useState('');
	const [sort_by, setSortBy] = useState('');
	const [status, setStatus] = useState('');

	const [viewLaywerProfile, setviewLawyerProfile] = useState(false);

	const [viewUserProfile, setviewUserProfile] = useState(false);

	const [single_lawyer, setSingleLawyerData] = useState<any>('');
	const [lawyer_current_plan, setLawyerCurrentPlan] = useState<any>('');

	const [userData, setUserData] = useState<any | null>(null);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPageStr = process.env.NEXT_PUBLIC_ITEM_PER_PAGE ?? '0';
	const itemsPerPage = parseInt(itemsPerPageStr, 10); // Parse to an integer with base 10

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentLawyer = filter_users.slice(startIndex, endIndex);
	const totalPages = Math.ceil(filter_users.length / itemsPerPage);


	useEffect(() => {
		if (user)
			user?.id ? setUserId(user?.id) : setUserId('');
		handleChange('sort_by', '', user?.id);
	}, []);

	const handlePageChange = (newPage: any) => {
		setCurrentPage(newPage);
	};

	const handleEditProfile = (id: any, role: any) => {
		if (role == 'enduser') {
			router.push(`/admin/settings/roles-and-permissions/edit-enduser/${id}`);
		} else {
			router.push(`/admin/settings/roles-and-permissions/edit-professional/${id}`);
		}
	};

	const handleViewProfile = async (id: any, role: any) => {
		if (role == 'enduser') {
			const data = {
				user_id: user_id,
				memberId: id
			};
			try {
				const response = await getSingleUserDetailByAdmin(data);
				if (response.status === true) {
					setUserData(response.data);
					setviewUserProfile(true);
				}
			} catch (error) {
				console.error('Error reporting messages:', error);
			}
		} else {
			try {
				const res = await getSingleLawyerDetails(id);
				if (res.status == true) {
					setSingleLawyerData(res.data);
					setLawyerCurrentPlan(res.data.plan);
					setviewLawyerProfile(true);
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	const handleChange = (inputName: any, value: any, user_id: any) => {
		setCurrentPage(1);

		switch (inputName) {
			case 'name':
				setName(value);
				break;
			case 'user':
				setUserType(value);
				break;
			case 'status':
				setStatus(value);
				break;
			case 'sort_by':
				setSortBy(value);
				break;
			default:
				break;
		}

		const data = {
			name: inputName === 'name' ? value : name,
			user: inputName === 'user' ? value : userType,
			status: inputName === 'status' ? value : status,
			sort_by: inputName === 'sort_by' ? value : sort_by,
			user_id: user_id
		};

		getAllUserAndLaywerFilteredForAdminData(data);
	};

	const getAllUserAndLaywerFilteredForAdminData = async (data: any) => {
		try {
			const response = await getAllUserAndLaywerFilteredForAdmin(data);
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
			text: 'You Want to remove the user',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#02142d',
			cancelButtonColor: '#D04E4F',
			confirmButtonText: 'Yes'
		}).then(result => {
			if (result.isConfirmed) {
				try {
					const data = {
						lawyer_id: id,
						user_id: user_id,
						status: updated_status
					};

					updateLawerStatus(data)
						.then(res => {
							if (res.status == true) {
								handleChange('status', '', user_id);
								Swal.fire('Success!', 'User has been remove successfully', 'success');
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

	const closeLawyerProfile = () => {
		setviewLawyerProfile(false);
		handleChange('sort_by', '', user_id);
	};

	return (
		<div>
			<div className="form-part mt-2">
				<div className="row g-3 align-items-center g-3">
					<div className="col-sm-6 col-md-6 col-lg-2">
						<div className="icon-fild icon-g p-set position-relative">
							<input
								type="text"
								placeholder="Search for a Professional"
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
							value={userType}
							onChange={e => handleChange('user', e.target.value, user_id)}
						>
							<option value={''}>User</option>
							<option value={'enduser'}>Individual</option>
							<option value={'professional'}>Professional</option>
						</select>
					</div>

					<div className="col-sm-6 col-md-6 col-lg-2">
						<select
							className="form-fild  w-100"
							value={status}
							onChange={e => handleChange('status', e.target.value, user_id)}
						>
							<option value={''}>Select Status</option>
							<option value={'active'}>Approved</option>
							<option value={'deactive'}>Pending</option>
							<option value={'suspended'}>Suspended</option>
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

					<div className="col-sm-6 col-md-6 col-lg-2">
						<Link href={'/admin/settings/roles-and-permissions/add-new-enduser'}>
							<DefaultButton height={55} showIcon={false} className="w-100 mt-1">
								+ Individual
							</DefaultButton>
						</Link>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-2">
						<Link href={'/admin/settings/roles-and-permissions/add-new-professional'}>
							<DefaultButton height={55} showIcon={false} className="w-100 mt-1">
								+ Professional
							</DefaultButton>
						</Link>
					</div>
				</div>
			</div>

			<p className="font-small weight-light social-link mt-3 mb-3">
				Displaying <span className="span-color-dash weight-bold">{filter_users.length}</span> professionals &
				individual
			</p>

			<div className="table-part mt-4">
				<Table columns={['From', 'User', 'Gender', 'Status', 'Date', 'Actions']} data={currentLawyer}>
					{(rowData, index) => (
						<tr key={index}>
							<td data-th="From">
								<OverlayTrigger
									placement="top"
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{rowData.full_name}</Tooltip>}>
									<span
										className="font-small weight-light social-link text-primary text-capitalize"
										title={rowData.full_name}
									>
										{rowData.full_name && rowData.full_name.length > 30
											? rowData.full_name.substring(0, 30) + '...'
											: rowData.full_name}
									</span>
								</OverlayTrigger>
								<br />
								<OverlayTrigger
									placement="top"
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{rowData.email}</Tooltip>}>
									<span className="font-x-small text-sonic-silver weight-light" title={rowData.email}>
										{' '}
										{rowData.email && rowData.email.length > 30
											? rowData.email.substring(0, 30) + '...'
											: rowData.email}
									</span>
								</OverlayTrigger>
							</td>
							<td data-th="User">
								<p className="font-small weight-light social-link text-primary">
									{' '}
									{rowData.role == 'enduser' ? 'Individual' : 'Professional'}
								</p>
							</td>

							<td data-th="Gender">
								<p className="font-small weight-light social-link text-capitalize"> {rowData.gender}</p>
							</td>

							<td data-th="Status">
								{rowData.status == 'active' ? (
									<button
										className="monthly"
										style={{ color: '#02142d', backgroundColor: '#c490731F' }}
									>
										Approved
									</button>
								) : rowData.status == 'deactive' ? (
									<button
										className="monthly"
										style={{ color: '#F79E1B', backgroundColor: '#FFAC331F' }}
									>
										Pending
									</button>
								) : (
									<button
										className="monthly"
										style={{ color: '#D04E4F', backgroundColor: '#D04E4F1F' }}
									>
										Suspended
									</button>
								)}
							</td>

							<td data-th="Created On">
								<p className="font-x-small social-link weight-medium">
									{formatDateToDDMMYYYYMMAPPORVAL(rowData.created_at)}
								</p>
							</td>

							<td data-th="Actions " className="text-center ">
								<EyeButton
									onClick={() => handleViewProfile(rowData.id, rowData.role)}
									Tooltip="View Profile"
								/>
								<EditButton
									onClick={() => handleEditProfile(rowData.id, rowData.role)}
									Tooltip="Edit Profile"
								/>

								<DeleteButton
									Tooltip={'Send Message'}
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

			<Popup
				show={viewLaywerProfile}
				onCancel={() => setviewLawyerProfile(false)}
				onOk={() => setviewLawyerProfile(false)}
				footer={false}
			>
				<LawyerProfile
					single_lawyer={single_lawyer}
					lawyer_current_plan={lawyer_current_plan}
					closeLawyerProfile={closeLawyerProfile}
				/>
			</Popup>

			<Popup
				show={viewUserProfile}
				title=""
				size="sm"
				footer={false}
				onCancel={() => setviewUserProfile(false)}
				onOk={() => setviewUserProfile(false)}
			>
				{userData && <ViewProfile userData={userData} />}
			</Popup>
		</div>
	);
}
