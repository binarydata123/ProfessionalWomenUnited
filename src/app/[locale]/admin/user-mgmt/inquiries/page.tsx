'use client';
import React, { useState, useEffect, useContext } from 'react';
import Popup from '@/commonUI/Popup';
import Link from 'next/link';
import Table from '@/commonUI/Table';
import ChatTranscript from '@/components/admin/modals/ChatTranscript';
import EyeButton from '@/commonUI/TableActionButtons/EyeButton';
import {
	getAllInquiryFilteredForAdmin,
	getSingleInquiryResponseDataByd,
	deleteInquiryByAdmin,
	getSingleUserDetailByAdmin
} from '../../../../../../lib/adminapi';
import { getSingleLawyerDetails } from '../../../../../../lib/frontendapi';
import Pagination from '@/commonUI/Pagination';
import Swal from 'sweetalert2';
import DeleteButton from '@/commonUI/TableActionButtons/DeleteButton';
import ViewProfile from '@/components/lawyer/Popup/ViewProfile';
import LawyerProfile from '@/components/admin/modals/LawyerProfile';
import Image from 'next/image';
import AuthContext from '@/context/AuthContext';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { formatDateToDDMMYYYYMMAPPORVAL } from '@/app/[locale]/commonfunctions/commonfunctions';

export default function inquiries() {
	const { user } = useContext(AuthContext)
	const [user_id, setUserId] = useState('');
	const [filter_users, SetFilterUsers] = useState([]);
	const [viewProfile, setViewProfile] = useState(false);
	const [from_name, setFromName] = useState('');
	const [to_name, setToName] = useState('');
	const [sort_by, setSortBy] = useState('');

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPageStr = process.env.NEXT_PUBLIC_ITEM_PER_PAGE ?? '0';
	const itemsPerPage = parseInt(itemsPerPageStr, 10); // Parse to an integer with base 10

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentLawyer = filter_users.slice(startIndex, endIndex);
	const totalPages = Math.ceil(filter_users.length / itemsPerPage);

	const [userData, setUserData] = useState<any | null>(null);

	const [inquiryData, setInquiryData] = useState<any | null>(null);

	const [viewUserProfile, setViewUserProfile] = useState(false);
	const [viewLawyerProfile, setViewLawyerProfile] = useState(false);

	const [single_lawyer, setSingleLawyerData] = useState<any>('');
	const [lawyer_current_plan, setLawyerCurrentPlan] = useState<any>('');

	useEffect(() => {
		if (user) {
			user?.id ? setUserId(user?.id) : setUserId('');
			handleChange('sort_by', '', user?.id);
		}
	}, []);

	const handlePageChange = (newPage: any) => {
		setCurrentPage(newPage);
	};
	const handleChange = (inputName: any, value: any, user_id: any) => {
		setCurrentPage(1);

		switch (inputName) {
			case 'from_name':
				setFromName(value);
				break;
			case 'to_name':
				setToName(value);
				break;
			case 'sort_by':
				setSortBy(value);
				break;
			default:
				break;
		}

		const data = {
			from_name: inputName === 'from_name' ? value : from_name,
			to_name: inputName === 'to_name' ? value : to_name,
			sort_by: inputName === 'sort_by' ? value : sort_by,
			user_id: user_id
		};

		getAllInquiryFilteredForAdminData(data);
	};

	const getAllInquiryFilteredForAdminData = async (data: any) => {
		try {
			const response = await getAllInquiryFilteredForAdmin(data);
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

	const handleViewProfile = async (inquiryId: number) => {
		const data = {
			user_id: user_id,
			inquiryId: inquiryId
		};
		try {
			const response = await getSingleInquiryResponseDataByd(data);
			if (response.status === true) {
				setInquiryData(response.data);
				setViewProfile(true);
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	const changeUserStatus = (id: any, updated_status: any) => {
		// Show a confirmation dialog

		Swal.fire({
			title: 'Are you sure?',
			text: 'You Want to remove the inquiry',
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

					deleteInquiryByAdmin(data)
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

	const handleViewUserProfile = async (memberId: number) => {
		const data = {
			user_id: user_id,
			memberId: memberId
		};
		try {
			const response = await getSingleUserDetailByAdmin(data);
			if (response.status === true) {
				setUserData(response.data);
				setViewUserProfile(true);
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	const handleSingleLawyerDetails = async (id: any, plan: any) => {
		try {
			const res = await getSingleLawyerDetails(id);
			if (res.status == true) {
				setSingleLawyerData(res.data);
				setLawyerCurrentPlan(plan);
				setViewLawyerProfile(true);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="right-body overflow-hidden">
			<ul className="list-12 mb-3">
				<li>
					<Link href="/admin/dashboard">
						Dashboard &nbsp;<i className="fa-solid fa-play"></i>
					</Link>
				</li>
				<li>
					<Link href="#">
						User Mgmt. &nbsp;<i className="fa-solid fa-play"></i>
					</Link>
				</li>
				<li>
					<Link href="#" className="active">
						Inquiries
					</Link>
				</li>
			</ul>
			<section>
				<div id="legal-serve" className="pb-0">
					<Link href="/admin/dashboard">
						<span>Dashboard</span>
					</Link>
					<span>
						<Image src="/images/legal-service/arrow-right.png" alt="User Mgmt" width={16} height={16} />
					</span>
					<span>User Mgmt.</span>
					<span>
						<Image src="/images/legal-service/arrow-right.png" alt="Inquiries" width={16} height={16} />
					</span>
					<span>Inquiries</span>
				</div>
			</section>
			<h4 className="font-xx-large social-link weight-semi-bold mb-3 p-0 pt-4">Inquiries</h4>
			<div className="nav-tab use-lawyer p-set p-0 border-0">
				<ul className="border-bottom">
					<li className={'active'}>
						<Link href={''}>All</Link>
					</li>
				</ul>
			</div>
			<div className="form-part mt-2">
				<div className="row align-items-center g-3">
					<div className="col-sm-6 col-md-6 col-lg-3">
						<div className="icon-fild icon-g p-set position-relative">
							<input
								type="text"
								placeholder="Search for a user"
								className="form-fild w-100 sp-right"
								value={from_name}
								onChange={e => handleChange('from_name', e.target.value, user_id)}
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
						<div className="icon-fild icon-g p-set position-relative">
							<input
								type="text"
								placeholder="Search For a professional"
								className="form-fild w-100 sp-right"
								value={to_name}
								onChange={e => handleChange('to_name', e.target.value, user_id)}
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

			<p className="font-small weight-light social-link mt-3 mb-3">
				Displaying <span className="span-color-dash weight-bold">{filter_users.length}</span> inquires
			</p>

			<div className="table-part">
				<Table columns={['From', 'To', 'Created On', 'Actions']} data={currentLawyer}>
					{(rowData, index) => (
						<tr key={index}>
							<td data-th="From">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{rowData.inquirer_fullname} <br /> {rowData.inquirer_email}</Tooltip>}>
									<span className="font-small weight-medium primary-text"
										role="button"
										onClick={() => handleViewUserProfile(rowData.inquiry_by_member_id)}>
										{rowData.inquirer_fullname && rowData.inquirer_fullname.length > 50
											? rowData.inquirer_fullname.substring(0, 50) + '...'
											: rowData.inquirer_fullname}
									</span>
								</OverlayTrigger>

								<p
									className="font-x-small text-sonic-silver weight-light"
								>
									{rowData.inquirer_email && rowData.inquirer_email.length > 50
										? rowData.inquirer_email.substring(0, 50) + '...'
										: rowData.inquirer_email}
								</p>
							</td>
							<td data-th="To">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{rowData.recipient_fullname} <br /> {rowData.recipient_email}</Tooltip>}>
									<span
										className="font-small weight-medium primary-text"
										role="button"
										onClick={() =>
											handleSingleLawyerDetails(rowData?.inquiry_to_member_id, rowData?.plan_name)
										}>
										{rowData.recipient_fullname && rowData.recipient_fullname.length > 50
											? rowData.recipient_fullname.substring(0, 50) + '...'
											: rowData.recipient_fullname}
									</span>
								</OverlayTrigger>
								<p
									className="font-x-small text-sonic-silver weight-light"
								>
									{rowData.recipient_email && rowData.recipient_email.length > 50
										? rowData.recipient_email.substring(0, 50) + '...'
										: rowData.recipient_email}
								</p>
							</td>
							<td data-th="Created On">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{formatDateToDDMMYYYYMMAPPORVAL(rowData.inquiry_created_at)}</Tooltip>}>
									<span className="font-x-small social-link weight-medium">
										{formatDateToDDMMYYYYMMAPPORVAL(rowData.inquiry_created_at)}
									</span>
								</OverlayTrigger>

							</td>

							<td data-th="Actions " className="text-center ">
								<EyeButton onClick={() => handleViewProfile(rowData.id)} Tooltip="View Inquiry" />
								<DeleteButton
									Tooltip="Delete Inquiry"
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
				show={viewProfile}
				title=""
				size="lg"
				footer={false}
				onCancel={() => setViewProfile(false)}
				onOk={() => setViewProfile(false)}
			>
				{inquiryData && <ChatTranscript inquiryData={inquiryData} />}
			</Popup>

			<Popup
				show={viewUserProfile}
				title=""
				size="sm"
				footer={false}
				onCancel={() => setViewUserProfile(false)}
				onOk={() => setViewUserProfile(false)}
			>
				{userData && <ViewProfile userData={userData} />}
			</Popup>

			<Popup
				show={viewLawyerProfile}
				onCancel={() => setViewLawyerProfile(false)}
				onOk={() => setViewLawyerProfile(false)}
				footer={false}
			>
				<LawyerProfile single_lawyer={single_lawyer} lawyer_current_plan={lawyer_current_plan} />
			</Popup>
		</div>
	);
}
