'use client';
import React, { useState, useEffect, useContext } from 'react';
import Popup from '@/commonUI/Popup';
import Link from 'next/link';
import DropDown from '@/commonUI/DropDown';
import Table from '@/commonUI/Table';
import LawyerReportProfile from '@/components/admin/modals/LawyerReportProfile';
import EyeButton from '@/commonUI/TableActionButtons/EyeButton';
import {
	getAllReportLawyersFilteredForAdmin,
	getAllEndUser,
	updateLawerReportStatus,
	getSingleLawyerMemberReportDetails
} from '../../../../../../../lib/adminapi';
import { getSingleLawyerDetails } from '../../../../../../../lib/frontendapi';
import Pagination from '@/commonUI/Pagination';
import Swal from 'sweetalert2';
import Image from 'next/image';
import AuthContext from '@/context/AuthContext';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

export default function reportCenter() {
	const { user } = useContext(AuthContext)
	const [user_id, setUserId] = useState('');
	const [filter_lawyer, SetFilterLawyer] = useState([]);
	const [viewProfile, setviewProfile] = useState(false);
	const [name, setName] = useState('');
	const [report_by, setReportBy] = useState('');
	const [plan, setPlan] = useState('');
	const [status, setStatus] = useState('');
	const [allusers, setUsers] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPageStr = process.env.NEXT_PUBLIC_ITEM_PER_PAGE ?? '0';
	const itemsPerPage = parseInt(itemsPerPageStr, 10); // Parse to an integer with base 10

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentLawyer = filter_lawyer.slice(startIndex, endIndex);
	const totalPages = Math.ceil(filter_lawyer.length / itemsPerPage);

	const [single_lawyer, setSingleLawyerData] = useState<any>('');
	const [lawyer_current_plan, setLawyerCurrentPlan] = useState<any>('');
	const [single_lawyer_member_report, setSingleLawyerMemberReportData] = useState<any>('');

	const [single_user_data, setSingleUserData] = useState<any>('');

	useEffect(() => {
		if (user) {
			user?.id ? setUserId(user?.id) : setUserId('');
			getAllEndUserData(user?.id);
			handleChange('status', '', user?.id);
		}
	}, []);

	const closeProfilePopup = () => {
		setviewProfile(false);
		handleChange('status', '', user_id);
	};

	const handlePageChange = (newPage: any) => {
		setCurrentPage(newPage);
	};

	const getAllEndUserData = async (id: any) => {
		try {
			const res = await getAllEndUser(id);
			if (res.status == true) {
				setUsers(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleChange = (inputName: any, value: any, user_id: any) => {
		setCurrentPage(1);

		switch (inputName) {
			case 'name':
				setName(value);
				break;
			case 'report_by':
				setReportBy(value);
				break;
			case 'plan':
				setPlan(value);
				break;
			case 'status':
				setStatus(value);
				break;
			default:
				break;
		}

		const data = {
			name: inputName === 'name' ? value : name,
			report_by: inputName === 'report_by' ? value : report_by,
			plan: inputName === 'plan' ? value : plan,
			status: inputName === 'status' ? value : status,
			user_id: user_id
		};

		getAllReportLawyersFilteredForAdminData(data);
	};

	const getAllReportLawyersFilteredForAdminData = async (data: any) => {
		try {
			const response = await getAllReportLawyersFilteredForAdmin(data);
			if (response.status == true) {
				SetFilterLawyer(response.data);
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
				setviewProfile(true);
				setLawyerCurrentPlan(plan);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handelSingelLawyerMemberReport = async (report_to_member_id: any, report_by_member_id: any) => {
		try {
			const res = await getSingleLawyerMemberReportDetails(report_by_member_id, report_to_member_id, user_id);
			if (res.status == true) {
				setSingleLawyerMemberReportData(res.data);
				setSingleUserData(res.userData);
				setviewProfile(true);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const changeLawyerReportStatus = (report_by_member_id: any, report_to_member_id: any, updated_status: any) => {
		let text_msg;

		if (updated_status == 'rejected') {
			text_msg = 'To approved the lawyer account';
		} else {
			text_msg = 'To suspend the lawyer account';
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
						report_by_member_id: report_by_member_id,
						report_to_member_id: report_to_member_id,
						user_id: user_id,
						status: updated_status
					};

					updateLawerReportStatus(data)
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
							className="form-fild text-capitalize w-100"
							value={report_by}
							onChange={e => handleChange('report_by', e.target.value, user_id)}
						>
							<option value="">Report By</option>
							{allusers.map((users: any) => (
								<option key={users.id} value={users.id} className="text-capitalize">
									{users.first_name} {users.last_name}
								</option>
							))}
						</select>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-3">
						<select
							className="form-fild  w-100"
							value={plan}
							onChange={e => handleChange('plan', e.target.value, user_id)}
						>
							<option value={''}>Select Plan</option>
							<option value={'monthly'}>Monthly</option>
							<option value={'quarterly'}>Quarterly</option>
							<option value={'not_purchased'}>Not Purchased</option>
						</select>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-3">
						<select
							className="form-fild  w-100"
							value={status}
							onChange={e => handleChange('status', e.target.value, user_id)}
						>
							<option value={''}>Select Status</option>
							<option value={'pending'}>Pending</option>
							<option value={'approved'}>Approved</option>
							<option value={'reject'}>Rejected</option>
						</select>
					</div>
				</div>
			</div>

			<p className="font-small weight-light social-link mt-3 mb-3">
				Displaying <span className="span-color-dash weight-bold">{filter_lawyer.length}</span> professionals
			</p>

			<div className="table-part">
				<Table
					columns={['Name', 'Designation', 'Plan', 'Report By', 'Report Status', 'Actions']}
					data={currentLawyer}
				>
					{(rowData, index) => (
						<tr key={index}>
							<td data-th="Name">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{rowData.full_name_reported_to} </Tooltip>}>
									<span className="font-small weight-light social-link text-capitalize">
										{rowData.full_name_reported_to && rowData.full_name_reported_to.length > 50
											? rowData.full_name_reported_to.substring(0, 50) + '...'
											: rowData.full_name_reported_to}
									</span>
								</OverlayTrigger>
							</td>
							<td data-th="Designation">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{rowData.designation} <br /> {rowData.company_name}</Tooltip>}>
									<span className="font-small weight-medium social-link">
										{rowData.designation && rowData.designation.length > 30
											? rowData.designation.substring(0, 30) + '...'
											: rowData.designation}
									</span>
								</OverlayTrigger>
								<p className="font-x-small text-sonic-silver weight-light">
									{rowData.company_name && rowData.company_name.length > 30
										? rowData.company_name.substring(0, 30) + '...'
										: rowData.company_name}
								</p>
							</td>
							<td data-th="Plan">
								<button className="monthly">
									{rowData.plan_name == 'monthly'
										? 'Monthly'
										: rowData.plan_name == 'quarterly'
											? 'Quarterly'
											: 'Not Purchased'}
								</button>
							</td>
							<td data-th="Report By">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{rowData.full_name_reported_by}</Tooltip>}>
									<span className="font-small social-link weight-light text-capitalize">
										{rowData.full_name_reported_by && rowData.full_name_reported_by.length > 50
											? rowData.full_name_reported_by.substring(0, 50) + '...'
											: rowData.full_name_reported_by}
									</span>
								</OverlayTrigger>
							</td>
							<td data-th="Report Status">
								{rowData.reports_status == 'approved' ? (
									<button
										className="monthly"
										style={{ color: '#02142d', backgroundColor: '#c490731F' }}
									>
										Approved
									</button>
								) : rowData.reports_status == 'pending' ? (
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
							<td data-th="Actions" className="text-center">
								<EyeButton
									onClick={() => {
										handleSingleLawyerDetails(rowData?.report_to_member_id, rowData?.plan_name);
										handelSingelLawyerMemberReport(
											rowData?.report_to_member_id,
											rowData?.report_by_member_id
										);
									}}
									Tooltip="View Profile"
								/>
								<DropDown align={'end'} label={<i className="fa-solid fa-ellipsis"></i>}>
									<ul>
										<li>
											<Link href={`/find-a-professional/${rowData.slug}`}>View Public Profile</Link>
										</li>
										{rowData.reports_status == 'rejected' && (
											<li>
												<Link
													href={``}
													onClick={e =>
														changeLawyerReportStatus(
															rowData?.report_by_member_id,
															rowData?.report_to_member_id,
															'approved'
														)
													}
												>
													Suspend Account
												</Link>
											</li>
										)}
										{rowData.reports_status == 'approved' && (
											<li>
												<Link
													href={``}
													onClick={e =>
														changeLawyerReportStatus(
															rowData?.report_by_member_id,
															rowData?.report_to_member_id,
															'rejected'
														)
													}
												>
													Approved Account
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
				onCancel={() => setviewProfile(false)}
				onOk={() => setviewProfile(false)}
				footer={false}
			>
				<LawyerReportProfile
					single_lawyer={single_lawyer}
					single_lawyer_member_report={single_lawyer_member_report}
					single_user_data={single_user_data}
					lawyer_current_plan={lawyer_current_plan}
					closeProfilePopup={closeProfilePopup}
				/>
			</Popup>
		</div>
	);
}
