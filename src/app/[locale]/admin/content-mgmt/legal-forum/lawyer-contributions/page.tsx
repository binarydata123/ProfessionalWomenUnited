'use client';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Table from '@/commonUI/Table';
import EyeButton from '@/commonUI/TableActionButtons/EyeButton';
import { getAllLegalForumLawyerContributionForAdmin, deleteLegalForumByAdmin } from '../../../../../../../lib/adminapi';
import Pagination from '@/commonUI/Pagination';
import Swal from 'sweetalert2';
import Image from 'next/image';
import DropDown from '@/commonUI/DropDown';
import IconButton from '@/commonUI/IconButton';
import ReportAccount from '@/components/admin/modals/ReportAccount';
import Popup from '@/commonUI/Popup';
import AuthContext from '@/context/AuthContext';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

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

	const [lawyer_id, setLawyerId] = useState('');
	const [reportAccount, setreportAccount] = useState(false);

	useEffect(() => {
		if (user)
			user?.id ? setUserId(user?.id) : setUserId('');
		handleChange('name', '', user?.id);
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
			default:
				break;
		}

		const data = {
			name: inputName === 'name' ? value : name,
			user_id: user_id
		};

		getAllLegalForumLawyerContributionForAdminData(data);
	};

	const getAllLegalForumLawyerContributionForAdminData = async (data: any) => {
		try {
			const response = await getAllLegalForumLawyerContributionForAdmin(data);
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
			text: 'You Want to remove the question',
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

	const closeReportPopup = () => {
		setreportAccount(false);
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
				</div>
			</div>

			<p className="font-small weight-light social-link mt-3 mb-3">
				Displaying <span className="span-color-dash weight-bold">{filter_users.length}</span> lawyer
				contributions
			</p>

			<div className="table-part mt-3">
				<Table columns={['Name', 'Designation', 'Contributions', 'Actions']} data={currentLawyer}>
					{(rowData, index) => (
						<tr key={index}>
							<td data-th="Name">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class text-capitalize">{rowData.member_name}</Tooltip>}>
									<span
										className="font-small weight-light social-link text-capitalize"
									>
										{rowData.member_name && rowData.member_name.length > 100
											? rowData.member_name.substring(0, 100) + '...'
											: rowData.member_name}
									</span>
								</OverlayTrigger>
							</td>

							<td data-th="Designation">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class text-capitalize">{rowData.designation} <br /> {rowData.company_name}</Tooltip>}>
									<span
										className="font-small weight-medium social-link text-primary text-capitalize"
									>
										{rowData.designation && rowData.designation > 50
											? rowData.designation.substring(0, 50) + '...'
											: rowData.designation}
									</span>
								</OverlayTrigger>

								<p className="font-x-small text-sonic-silver weight-light">
									{rowData.company_name && rowData.company_name > 50
										? rowData.company_name.substring(0, 50) + '...'
										: rowData.company_name}
								</p>
							</td>

							<td data-th="Contributions">
								<p className="font-small weight-medium social-link">{rowData.response_count}</p>
							</td>

							<td data-th="Actions " className="text-center">
								<Link
									href={`/admin/content-mgmt/legal-forum/lawyer-contributions/${rowData.member_id}`}
								>
									<EyeButton Tooltip="View Contributions" />
								</Link>

								<DropDown
									label={
										<IconButton>
											<i className="fa-solid fa-ellipsis"></i>
										</IconButton>
									}
								>
									<ul>
										<Link href={`/find-a-lawyer/${rowData.slug}`} target="_blank">
											<li>View Public Profile</li>
										</Link>
										<li>
											<Link
												href={''}
												onClick={() => {
													setreportAccount(true);
													setLawyerId(rowData?.member_id);
												}}
											>
												Report Account
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
				title="Report Account"
				show={reportAccount}
				size="sm"
				footer={false}
				onCancel={() => setreportAccount(false)}
				onOk={() => setreportAccount(false)}
			>
				<ReportAccount lawyerId={lawyer_id} closeReportPopup={closeReportPopup} />
			</Popup>
		</div>
	);
}
