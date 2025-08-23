'use client';
import React, { useState, useEffect, useContext } from 'react';
import Popup from '@/commonUI/Popup';
import Link from 'next/link';
import DropDown from '@/commonUI/DropDown';
import Table from '@/commonUI/Table';
import LawyerApprovalProfile from '@/components/admin/modals/LawyerApprovalProfile';
import EyeButton from '@/commonUI/TableActionButtons/EyeButton';
import { getAllLawyersFilteredForAdminApproval, updateLawerStatus } from '../../../../../../../lib/adminapi';
import { getAllCountries, getSingleLawyerDetails } from '../../../../../../../lib/frontendapi';
import Pagination from '@/commonUI/Pagination';
import Swal from 'sweetalert2';
import Image from 'next/image';
import AuthContext from '@/context/AuthContext';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { formatDateToDDMMYYYYMMAPPORVAL } from '@/app/[locale]/commonfunctions/commonfunctions';

export default function approvals() {
	const { user } = useContext(AuthContext)
	const [user_id, setUserId] = useState('');
	const [filter_lawyer, SetFilterLawyer] = useState([]);
	const [viewProfile, setViewProfile] = useState(false);
	const [name, setName] = useState('');
	const [location, setLocation] = useState('');
	const [gender, setGender] = useState('');
	const [plan, setPlan] = useState('');
	const [status, setStatus] = useState('');
	const [allCountries, setCountries] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPageStr = process.env.NEXT_PUBLIC_ITEM_PER_PAGE ?? '0';
	const itemsPerPage = parseInt(itemsPerPageStr, 10); // Parse to an integer with base 10

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentLawyer = filter_lawyer.slice(startIndex, endIndex);
	const totalPages = Math.ceil(filter_lawyer.length / itemsPerPage);

	const [single_lawyer, setSingleLawyerData] = useState<any>('');
	const [lawyer_current_plan, setLawyerCurrentPlan] = useState<any>('');

	useEffect(() => {
		if (user) {
			user?.id ? setUserId(user?.id) : setUserId('');
			getAllCountriesData();
			handleChange('status', '', user?.id);
		}

	}, []);

	const handlePageChange = (newPage: any) => {
		setCurrentPage(newPage);
	};

	const getAllCountriesData = async () => {
		try {
			const res = await getAllCountries();
			if (res.status == true) {
				setCountries(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const closeProfilePopup = () => {
		setViewProfile(false);
		handleChange('status', '', user_id);
	};

	const handleChange = (inputName: any, value: any, user_id: any) => {
		setCurrentPage(1);

		switch (inputName) {
			case 'name':
				setName(value);
				break;
			case 'location':
				setLocation(value);
				break;
			case 'gender':
				setGender(value);
				break;
			case 'status':
				setStatus(value);
				break;
			default:
				break;
		}

		const data = {
			name: inputName === 'name' ? value : name,
			location: inputName === 'location' ? value : location,
			gender: inputName === 'gender' ? value : gender,
			status: inputName === 'status' ? value : status,
			plan: plan,
			user_id: user_id
		};

		getAllLawyersFilteredForAdminApprovalData(data);
	};

	const getAllLawyersFilteredForAdminApprovalData = async (data: any) => {
		try {
			const response = await getAllLawyersFilteredForAdminApproval(data);
			if (response.status == true) {
				const filteredLawyers = response.lawyers.filter((lawyer: any) => lawyer.status !== 'deleted');
				SetFilterLawyer(filteredLawyers);
			} else {
				// toast.error(response.message);
				SetFilterLawyer([]);
			}
		} catch (error) {
			console.error('Error fetching lawyers:', error);
		}
	};

	const handleSingleLawyerDetails = async (id: any, plan: any) => {
		try {
			const res = await getSingleLawyerDetails(id);
			if (res.status == true) {
				setSingleLawyerData(res.data);
				setViewProfile(true);
				setLawyerCurrentPlan(plan);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const changeLawyerStatus = (id: any, updated_status: any) => {
		// Show a confirmation dialog

		Swal.fire({
			title: 'Are you sure?',
			text: 'To change the professional status',
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
		<div>
			<div className="form-part mt-2">
				<div className="row align-items-center g-3">
					<div className="col-sm-6 col-md-6 col-lg-3">
						<div className="icon-fild icon-g p-set position-relative">
							<input
								type="text"
								placeholder="Search For a professional"
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
					<div className="col-sm-6 col-md-6 col-lg-3">
						<select
							className="form-fild  w-100"
							value={location}
							onChange={e => handleChange('location', e.target.value, user_id)}
						>
							<option value="">Select Location</option>
							{allCountries.map((countries: any) => (
								<option key={countries.id} value={countries.id}>
									{countries.name}
								</option>
							))}
						</select>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-3">
						<select
							className="form-fild  w-100"
							value={gender}
							onChange={e => handleChange('gender', e.target.value, user_id)}
						>
							<option value={''}>Select Gender</option>
							<option value={'male'}>Male</option>
							<option value={'female'}>Female</option>
							<option value={'other'}>Other</option>
						</select>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-3">
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
				</div>
			</div>

			<p className="font-small weight-light social-link mt-3 mb-3">
				Displaying <span className="span-color-dash weight-bold">{filter_lawyer.length}</span> professionals
			</p>

			<div className="table-part">
				<Table columns={['Applied On', 'Name', 'Designation', 'Status', 'Actions']} data={currentLawyer}>
					{(rowData, index) => (
						<tr key={index}>
							<td data-th="Applied On">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{formatDateToDDMMYYYYMMAPPORVAL(rowData.created_at)} </Tooltip>}>
									<span className="font-x-small social-link weight-medium">
										{formatDateToDDMMYYYYMMAPPORVAL(rowData.created_at)}
									</span>
								</OverlayTrigger>
							</td>
							<td data-th="Name">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class"> {rowData.full_name} </Tooltip>}>
									<span className="font-x-small social-link weight-medium">
										{rowData.full_name && rowData.full_name.length > 50
											? rowData.full_name.substring(0, 50) + '...'
											: rowData.full_name}
									</span>
								</OverlayTrigger>
							</td>
							<td data-th="Designation">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class"> {rowData.designation} <br />{rowData.company_name} </Tooltip>}>
									<span className="font-small weight-medium social-link">
										{rowData.designation && rowData.designation.length > 30
											? rowData.designation.substring(0, 30) + '...'
											: rowData.designation}
									</span>
								</OverlayTrigger>
								<p className="font-x-small text-sonic-silver weight-light" >
									{rowData.company_name && rowData.company_name.length > 30
										? rowData.company_name.substring(0, 30) + '...'
										: rowData.company_name}
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
										Rejected
									</button>
								)}
							</td>

							<td data-th="Actions" className="text-right">
								<EyeButton
									onClick={() => handleSingleLawyerDetails(rowData?.id, rowData?.plan_name)}
									Tooltip="View Profile"
								/>

								<DropDown align={'end'} label={<i className="fa-solid fa-ellipsis"></i>}>
									<ul>
										{rowData.status != 'active' && (
											<li>
												<Link
													href={``}
													onClick={e => changeLawyerStatus(rowData?.id, 'active')}
												>
													Approve
												</Link>
											</li>
										)}
										{rowData.status != 'suspended' && (
											<li>
												<Link
													href={``}
													onClick={e => changeLawyerStatus(rowData?.id, 'suspended')}
												>
													Reject
												</Link>
											</li>
										)}

										{rowData.status != 'deactive' && (
											<li>
												<Link
													href={``}
													onClick={e => changeLawyerStatus(rowData?.id, 'deactive')}
												>
													Pending
												</Link>
											</li>
										)}

										<li>
											<Link href={``} onClick={e => changeLawyerStatus(rowData?.id, 'deleted')}>
												Remove
											</Link>
										</li>
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
				onCancel={() => setViewProfile(false)}
				onOk={() => setViewProfile(false)}
				footer={false}
			>
				<LawyerApprovalProfile
					single_lawyer={single_lawyer}
					lawyer_current_plan={lawyer_current_plan}
					closeProfilePopup={closeProfilePopup}
				/>
			</Popup>
		</div>
	);
}
