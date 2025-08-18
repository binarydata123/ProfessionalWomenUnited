'use client';
import React, { useState, useEffect, useContext } from 'react';
import Popup from '@/commonUI/Popup';
import Link from 'next/link';
import DropDown from '@/commonUI/DropDown';
import Table from '@/commonUI/Table';
import LawyerApprovalProfile from '@/components/admin/modals/LawyerApprovalProfile';
import EyeButton from '@/commonUI/TableActionButtons/EyeButton';
import { getAllUnArchiveFirm, getAllLawyersFilteredForAdminApproval, unArchiveToFirm, updateLawerStatus } from '../../../../../../../lib/adminapi';
import { getAllCountries, getSingleLawyerDetails } from '../../../../../../../lib/frontendapi';
import Pagination from '@/commonUI/Pagination';
import Swal from 'sweetalert2';
import Image from 'next/image';
import AuthContext from '@/context/AuthContext';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import DefaultButton from '@/commonUI/DefaultButton';
import EditButton from '@/commonUI/TableActionButtons/EditButton';
import IconButton from '@/commonUI/IconButton';
import DeleteButton from '@/commonUI/TableActionButtons/DeleteButton';
import { toast } from 'react-toastify';
import { formatDateToDDMMYYYYMM } from '@/app/[locale]/commonfunctions/commonfunctions';

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
	const [firmdata, SetFirmData]: any = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPageStr = process.env.NEXT_PUBLIC_ITEM_PER_PAGE ?? '0';
	const itemsPerPage = parseInt(itemsPerPageStr, 10); // Parse to an integer with base 10

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentLawyer = firmdata.slice(startIndex, endIndex);
	const totalPages = Math.ceil(firmdata.length / itemsPerPage);

	const [single_lawyer, setSingleLawyerData] = useState<any>('');
	const [lawyer_current_plan, setLawyerCurrentPlan] = useState<any>('');



	useEffect(() => {
		if (user) {
			user?.id ? setUserId(user?.id) : setUserId('');
			getAllCountriesData();
			handleChange('status', '', user?.id);
		}
		getAllFirmsData();
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

	const getAllFirmsData = async () => {
		try {
			const data = {
				user_id: user?.id
			}
			const response = await getAllUnArchiveFirm(data);
			if (response.status == true) {
				SetFirmData(response.data);
			} else {
				SetFirmData([]);
			}
		} catch (error) {
			console.error('Error fetching lawyers:', error);
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
			text: 'To change the lawyer status',
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

	function handleUnArchive(event: React.FormEvent<HTMLFormElement>, firmId: string) {
		event.preventDefault();
		const data = {
			firmId: firmId,
			user_id: user_id
		};
		unArchiveToFirm(data)
			.then(res => {
				if (res.status === true) {
					toast.success(res.message);
					getAllFirmsData();
				} else {
					toast.error(res.message);
				}
			})
			.catch(err => {
				if (err.response) {
					toast.error('An error occurred');
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	return (
		<div>
			<div className="form-part mt-2">
				<div className="row align-items-center g-3">
					<div className="col-sm-6 col-md-6 col-lg-3">
						<div className="icon-fild icon-g p-set position-relative">
							<input
								type="text"
								placeholder="Search for a Firm"
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
				</div>
			</div>

			<p className="font-small weight-light social-link mt-3 mb-3">
				Displaying <span className="span-color-dash weight-bold">{firmdata.length}</span> Firms
			</p>

			<div className="table-part">
				<Table columns={['Name', 'Lawyers Listed', 'Added by', 'Added on', 'Actions']}
					data={currentLawyer.filter((firm: { firm_name: string; country_name: string; }) => {
						const nameMatch = firm.firm_name.toLowerCase().includes(name.toLowerCase());
						const locationMatch = location === '' || firm.country_name.trim().toLowerCase() === location.trim().toLowerCase();
						return nameMatch && locationMatch;
					})}
				>
					{(rowData, index) => (
						<tr key={index}>
							<td data-th="Name">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip className="in" id="tooltip-top" > {rowData.firm_name} </Tooltip>}>
									<span>
										{rowData.firm_name && rowData.firm_name.length > 50
											? rowData.firm_name.substring(0, 50) + '...'
											: rowData.firm_name}
									</span>
								</OverlayTrigger>
								<br />
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip className="in" id="tooltip-top" > {rowData.country_name} </Tooltip>}>
									<span className="font-x-small text-sonic-silver weight-light" >
										{rowData.country_name}
									</span></OverlayTrigger>
							</td>
							<td data-th="Designation">
								<br />
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip className="in" id="tooltip-top" > {rowData.lawyer_count} </Tooltip>}>
									<span className="font-x-small text-sonic-silver weight-light" >
										{rowData.lawyer_count}
									</span></OverlayTrigger>
							</td>
							<td data-th="Plan">
								<button className="monthly">
									{rowData.created_by == '1'
										? 'Admin'
										: rowData.created_by == user?.id
											? 'Lawyer'
											: ''}
								</button>
							</td>
							<td data-th="Last Online">
								<p className="font-x-small social-link weight-medium">
									{formatDateToDDMMYYYYMM(rowData.created_at)}
								</p>
							</td>
							<td data-th="Actions" className="center">
								<DropDown align={'end'}
									label={
										<IconButton>
											<i className="fa-solid fa-ellipsis"></i>
										</IconButton>
									}>
									<ul>
										<li>
											<Link
												href={''}
												onClick={(e: any) => handleUnArchive(e, rowData.id)}

											>
												UnArchive
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
