'use client';
import React, { useState, useEffect, useContext } from 'react';
import Popup from '@/commonUI/Popup';
import Link from 'next/link';
import DropDown from '@/commonUI/DropDown';
import Table from '@/commonUI/Table';
import SendMessage from '@/components/admin/modals/SendMessage';
import EyeButton from '@/commonUI/TableActionButtons/EyeButton';
import MessageButton from '@/commonUI/TableActionButtons/MessageButton';
import { getAllUserFilteredForAdmin, getSingleUserDetailByAdmin, updateLawerStatus } from '../../../../../../lib/adminapi';
import { formatDateToDDMMYYYYMMAPPORVAL } from '@/app/[locale]/commonfunctions/commonfunctions';
import Pagination from '@/commonUI/Pagination';
import IconButton from '@/commonUI/IconButton';
import ViewProfile from '@/components/lawyer/Popup/ViewProfile';
import Swal from 'sweetalert2';
import Image from 'next/image';
import AuthContext from '@/context/AuthContext';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

export default function Page() {
	const { user } = useContext(AuthContext)
	const [user_id, setUserId] = useState('');
	const [filter_users, SetFilterUsers] = useState([]);
	const [viewProfile, setviewProfile] = useState(false);
	const [sendMessage, setsendMessage] = useState(false);
	const [name, setName] = useState('');
	const [status, setStatus] = useState('');

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPageStr = process.env.NEXT_PUBLIC_ITEM_PER_PAGE ?? '0';
	const itemsPerPage = parseInt(itemsPerPageStr, 10); // Parse to an integer with base 10

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentLawyer = filter_users.slice(startIndex, endIndex);
	const totalPages = Math.ceil(filter_users.length / itemsPerPage);

	const [type_start_date, setStartDatetype] = useState('text');
	const [start_date, setStartDateValue] = useState('');

	const [type_end_date, setEndDatetype] = useState('text');
	const [end_date, setEndDateValue] = useState('');

	const [lawyer_id, setLawyerId] = useState('');

	const [userData, setUserData] = useState<any | null>(null);

	const handleStartDateClick = () => {
		setStartDatetype('date');
	};

	const handleEndDateClick = () => {
		setEndDatetype('date');
	};

	useEffect(() => {
		if (user) {
			user?.id ? setUserId(user?.id) : setUserId('');
			handleChange('status', '', user?.id);
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
			case 'status':
				setStatus(value);
				break;
			default:
				break;
		}

		const data = {
			name: inputName === 'name' ? value : name,
			start_date: inputName === 'start_date' ? value : start_date,
			end_date: inputName === 'end_date' ? value : end_date,
			status: inputName === 'status' ? value : status,
			user_id: user_id
		};

		getAllUserFilteredForAdminData(data);
	};

	const getAllUserFilteredForAdminData = async (data: any) => {
		try {
			const response = await getAllUserFilteredForAdmin(data);
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

	const handleViewProfile = async (memberId: number) => {
		const data = {
			user_id: user_id,
			memberId: memberId
		};
		try {
			const response = await getSingleUserDetailByAdmin(data);
			if (response.status === true) {
				setUserData(response.data);
				setviewProfile(true);
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	const changeUserStatus = (id: any, updated_status: any) => {
		// Show a confirmation dialog

		let text_msg;

		if (updated_status == 'active') {
			text_msg = 'To approved the user account';
		} else if (updated_status == 'suspended') {
			text_msg = 'To suspend the user account';
		} else {
			text_msg = 'To delete the user account';
		}

		Swal.fire({
			title: 'Are you sure?',
			text: text_msg,
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

	const closeSendMessagePopup = () => {
		setsendMessage(false);
		handleChange('status', '', user_id);
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
					<div className="col-sm-6 col-md-6 col-lg-3 text-end">
						<select
							className="form-fild  w-100"
							value={status}
							onChange={e => handleChange('status', e.target.value, user_id)}
						>
							<option value={''}>Select Status</option>
							<option value={'active'}>Approved</option>
							<option value={'suspended'}>Suspended</option>
							<option value={'deleted'}>Deleted</option>
						</select>
					</div>
					{/* <div className="col-lg-2 text-end order-lg-0 order-first">
            <DropDown
              align={'end'}
              label={<img src="/images/bg-dott.svg" alt="lll" />}>
              <ul>
                <li>
                  <Link href={''}>Export as .xls/.xlsx</Link>
                </li>
                <li>
                  <Link href={''}>Export as .csv</Link>
                </li>
              </ul>
            </DropDown>
          </div> */}
				</div>
			</div>

			<p className="font-small weight-light social-link mt-3 mb-3">
				Displaying <span className="span-color-dash weight-bold">{filter_users.length}</span> users
			</p>

			<div className="table-part">
				<Table
					columns={['Name', 'Contact Information', 'Created On', 'Last Online', 'Status', 'Actions']}
					data={currentLawyer}
				>
					{(rowData, index) => (
						<tr key={index}>
							<td data-th="Name">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{rowData.full_name}</Tooltip>}>
									<span className="font-small weight-light social-link text-capitalize">
										{rowData.full_name && rowData.full_name.length > 50
											? rowData.full_name.substring(0, 50) + '...'
											: rowData.full_name}
									</span>
								</OverlayTrigger>
							</td>
							<td data-th="Contact Information">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{rowData.email} <br /> {rowData.phone_number}</Tooltip>}>
									<span className="font-small weight-medium social-link ">
										{rowData.email && rowData.email > 30
											? rowData.email.substring(0, 30) + '...'
											: rowData.email}
									</span>
								</OverlayTrigger>
								<p className="font-x-small text-sonic-silver weight-light">
									{rowData.phone_number && rowData.phone_number.length > 30
										? rowData.phone_number.substring(0, 30) + '...'
										: rowData.phone_number}
								</p>
							</td>
							<td data-th="Created On">
								<p className="font-x-small social-link weight-medium">
									{formatDateToDDMMYYYYMMAPPORVAL(rowData.created_at)}
								</p>
							</td>
							<td data-th="Last Online">
								<p className="font-x-small social-link weight-medium">
									{formatDateToDDMMYYYYMMAPPORVAL(rowData.last_seen)}
								</p>
							</td>
							<td data-th="Status">
								{rowData.status == 'active' ? (
									<button
										className="monthly"
										style={{ color: '#02142d', backgroundColor: '#c490731F' }}
									>
										Approved
									</button>
								) : rowData.status == 'suspended' ? (
									<button
										className="monthly"
										style={{ color: '#F79E1B', backgroundColor: '#FFAC331F' }}
									>
										Suspended
									</button>
								) : (
									<button
										className="monthly"
										style={{ color: '#D04E4F', backgroundColor: '#D04E4F1F' }}
									>
										Deleted
									</button>
								)}
							</td>

							<td data-th="Actions " className="text-right ">
								<EyeButton onClick={() => handleViewProfile(rowData.id)} Tooltip="View Profile" />
								<MessageButton
									Tooltip={'Send Message'}
									onClick={() => {
										setsendMessage(true);
										setLawyerId(rowData?.id);
									}}
								/>
								<DropDown
									align={'end'}
									label={
										<IconButton>
											<i className="fa-solid fa-ellipsis"></i>
										</IconButton>
									}
								>
									<ul>
										<li>
											<Link href={''} onClick={() => handleViewProfile(rowData.id)}>
												View Public Profile
											</Link>
										</li>

										{rowData.status != 'deleted' && (
											<li>
												<Link href={``} onClick={e => changeUserStatus(rowData?.id, 'deleted')}>
													Delete Account
												</Link>
											</li>
										)}

										{rowData.status != 'active' && (
											<li>
												<Link href={``} onClick={e => changeUserStatus(rowData?.id, 'active')}>
													Approve Account
												</Link>
											</li>
										)}
										{rowData.status != 'suspended' && (
											<li>
												<Link
													href={``}
													onClick={e => changeUserStatus(rowData?.id, 'suspended')}
												>
													Suspend Account
												</Link>
											</li>
										)}
									</ul>
								</DropDown>
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
				show={viewProfile}
				title=""
				size="sm"
				footer={false}
				onCancel={() => setviewProfile(false)}
				onOk={() => setviewProfile(false)}
			>
				{userData && <ViewProfile userData={userData} />}
			</Popup>

			<Popup
				title="Send Message"
				show={sendMessage}
				size="sm"
				okText="Report"
				footer={false}
				onCancel={() => setsendMessage(false)}
				onOk={() => setsendMessage(false)}
			>
				<SendMessage lawyerId={lawyer_id} closeSendMessagePopup={closeSendMessagePopup} />
			</Popup>
		</div>
	);
}
