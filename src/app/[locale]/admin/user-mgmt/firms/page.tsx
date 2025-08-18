'use client';
import React, { useState, useEffect, useContext } from 'react';
import Popup from '@/commonUI/Popup';
import Link from 'next/link';
import DropDown from '@/commonUI/DropDown';
import Table from '@/commonUI/Table';
import { getAllFirmsForAdmin, deleteFirmByAdmin, getAllUnassignedLawyers, assignFirmToLawyer, getAllAssignedLawyersToFirm, removeFirmToLawyer, archiveToFirm, approveToFirmByAdmin, assignFirmOwnerToLawyer } from '../../../../../../lib/adminapi';
import { getAllCountries } from '../../../../../../lib/frontendapi';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Pagination from '@/commonUI/Pagination';
import Image from 'next/image';
import AuthContext from '@/context/AuthContext';
import DefaultButton from '@/commonUI/DefaultButton';
import AddFirm from '@/components/admin/modals/AddFirm';
import EditButton from '@/commonUI/TableActionButtons/EditButton';
import IconButton from '@/commonUI/IconButton';
import DeleteButton from '@/commonUI/TableActionButtons/DeleteButton';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import './lawyer.css';
import { formatDateToDDMMYYYYMM, getAdminImageSrc130x130 } from '@/app/[locale]/commonfunctions/commonfunctions';


export default function lawyers() {
	const { user } = useContext(AuthContext)
	const [user_id, setUserId] = useState('');
	const [firmdata, SetFirmData]: any = useState([]);
	const [alllawyerdata, SetAllLawyerData] = useState<{ id: string }[]>([]);
	const [assignedlawyerdata, SetAssignedLawyerData]: any = useState<{ id: string }[]>([]);
	const [lawyerpopup, setLawyerPopup] = useState(false);
	const [removelawyerpopup, setRemoveLawyerPopup] = useState(false);
	const [name, setName] = useState('');
	const [location, setLocation] = useState('');
	const [allCountries, setCountries] = useState<any[]>([]); // Make sure to replace 'any[]' with the correct type
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPageStr = process.env.NEXT_PUBLIC_ITEM_PER_PAGE ?? '0';
	const itemsPerPage = parseInt(itemsPerPageStr, 10);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentLawyer = firmdata.slice(startIndex, endIndex);
	const totalPages = Math.ceil(firmdata.length / itemsPerPage);
	const [addNewfirm, setaddNewFirm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [firmId, setFirmId] = useState<string | null>('');
	const [firmDetails, setFirmDetails] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [firmName, setFirmName] = useState('');
	const [selectedLawyers, setSelectedLawyers] = useState<string[]>([]);
	const [selectedCountry, setSelectedCountry] = useState('');

	useEffect(() => {
		if (user) {
			user?.id ? setUserId(user?.id) : setUserId('');
			handleChange('status', 'active', user?.id);
		}
		getAllFirmsData();
		getAllUnAssignedData();
		getAssignedLawyerFirmData();
		getAllCountriesData();

	}, []);

	const handlePageChange = (newPage: any) => {
		setCurrentPage(newPage);
	};

	const handleEditFirm = (firmId: any) => {
		fetchFirmDetails(firmId);
		setFirmId(firmId);
		setaddNewFirm(true);
	};

	const handleAddLawyerFirm = (firmId: any) => {
		const firm = firmdata.find((firm: any) => firm.id === firmId);
		const newName = firm ? firm.firm_name : 'Unknown Firm';
		setFirmName(newName);
		setFirmId(firmId);
		setLawyerPopup(true);
	};

	const handleRemoveLawyerFirm = (firmId: any) => {
		const firm = firmdata.find((firm: any) => firm.id === firmId);
		const newName = firm ? firm.firm_name : 'Unknown Firm';
		setFirmName(newName);
		setFirmId(firmId);
		setRemoveLawyerPopup(true);
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

	const handleChange = (inputName: any, value: any, user_id: any) => {
		setCurrentPage(1);

		switch (inputName) {
			case 'name':
				setName(value);
				break;
			case 'location':
				setLocation(value);
				setSelectedCountry(value); // Set the selected country

				break;
			default:
				break;
		}
	};

	const getAllFirmsData = async () => {
		try {
			const data = {
				user_id: user?.id
			}
			const response = await getAllFirmsForAdmin(data);

			if (response.status == true) {
				SetFirmData(response.data);
			} else {
				SetFirmData([]);
			}
		} catch (error) {
			console.error('Error fetching lawyers:', error);
		}
	};

	const getAllUnAssignedData = async () => {
		try {
			const data = {
				user_id: user?.id
			}
			const response = await getAllUnassignedLawyers(data);
			if (response.status == true) {
				SetAllLawyerData(response.data);
				console.log(response.data);

			} else {
				SetAllLawyerData([]);
			}
		} catch (error) {
			console.error('Error fetching lawyers:', error);
		}
	};

	const getAssignedLawyerFirmData = async () => {
		try {
			const data = {
				user_id: user?.id
			}
			const response = await getAllAssignedLawyersToFirm(data);
			if (response.status == true) {
				SetAssignedLawyerData(response.data);
			} else {
				SetAssignedLawyerData([]);
			}
		} catch (error) {
			console.error('Error fetching lawyers:', error);
		}
	};
	const fetchFirmDetails = async (firmId: any) => {
		try {
			const data = {
				firmId: firmId,
				user_id: user?.id
			}
			const response = await getAllFirmsForAdmin(data);
			if (response.status === true) {
				setFirmDetails(response.data);
			}
		} catch (error) {
			console.error('Error fetching firm details:', error);
		}
	};
	useEffect(() => {
		if (firmId) {
			fetchFirmDetails(firmId);
		}
	}, [firmId]);

	const deletefirm = (id: any, updated_status: any) => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'You Want to remove the firm',
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
					deleteFirmByAdmin(data)
						.then(res => {
							if (res.status == true) {
								handleChange('sort_by', '', user_id);
								Swal.fire('Success!', res.message, 'success');
								getAllFirmsData();
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


	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const data = {
			memberId: selectedLawyers,
			firmId: firmId,
			user_id: user_id
		};
		assignFirmToLawyer(data)
			.then(res => {
				if (res.status == true) {
					toast.success(res.message);
					resetForm();
					setLawyerPopup(false);
					getAllUnAssignedData();
					getAssignedLawyerFirmData();
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

	function handleRemoveLawyer(lawyerId: string) {
		const data = {
			memberId: lawyerId,
			user_id: user_id
		};
		removeFirmToLawyer(data)
			.then(res => {
				if (res.status) {
					toast.success(res.message);
					getAssignedLawyerFirmData();
					getAllUnAssignedData();
					getAllFirmsData();
				} else {
					toast.error(res.message);
				}
			})
			.catch(err => {
				console.error(err);
				toast.error('An error occurred while removing the lawyer');
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	function handleAdminMakeOwnerToLawyer(lawyerId: string, newStatus: boolean) {
		const data = {
			member_id: lawyerId,
			user_id: user_id,
			firm_owner: newStatus,
		};
		assignFirmOwnerToLawyer(data)
			.then(res => {
				if (res.status) {
					toast.success(res.message);
					getAssignedLawyerFirmData();
					getAllUnAssignedData();
					getAllFirmsData();
				} else {
					toast.error(res.message);
				}
			})
			.catch(err => {
				console.error(err);
				toast.error('An error occurred while removing the lawyer');
			})
			.finally(() => {
				setIsLoading(false);
			});
	}

	function toggleFirmOwnerStatus(lawyerId: string) {
		const lawyer = filteredAssignedLawyers.find((lawyer: { id: string; }) => lawyer.id === lawyerId);
		if (lawyer) {
			const currentStatus: boolean = lawyer.firm_owner === 1;
			// Toggle the status
			const newStatus: boolean = !currentStatus;
			handleAdminMakeOwnerToLawyer(lawyerId, newStatus);
		} else {
			console.error('Lawyer not found');
		}
	}


	const resetForm = () => {
		setSelectedLawyers([]);
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, lawyerId: string) => {
		const isChecked = e.target.checked;
		if (isChecked) {
			setSelectedLawyers(prevSelected => [...prevSelected, lawyerId]);
		} else {
			setSelectedLawyers(prevSelected => prevSelected.filter(id => id !== lawyerId));
		}
	};

	const filteredAssignedLawyers = assignedlawyerdata.filter((lawyer: any) =>
		lawyer.firm_id === firmId &&
		lawyer.full_name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	function handleArchive(event: React.FormEvent<HTMLFormElement>, firmId: string) {
		event.preventDefault();
		const data = {
			firmId: firmId,
			user_id: user_id
		};
		archiveToFirm(data)
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

	function handleApprove(event: React.FormEvent<HTMLFormElement>, firmId: string) {
		event.preventDefault();
		const data = {
			firmId: firmId,
			user_id: user_id
		};
		approveToFirmByAdmin(data)
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

	const getCountryNameById = (countryId: any) => {
		const country = allCountries.find(country => country.id === countryId);
		return country ? country.name : 'Unknown Country';
	};

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
					<div className="col-sm-6 col-md-6 col-lg-3">

					</div>
					<div className="col-sm-6 col-md-6 col-lg-3">
						<DefaultButton
							showIcon={false}
							height={53}
							className="w-100 d-flex align-items-center justify-content-center create-blog new-tag"
							onClick={() => {
								setaddNewFirm(true);
							}}
						>
							<p className="d-flex align-items-center font-bold" onClick={() => setFirmId(null)}>
								<span className="plues-icon">+</span> Add Firm
							</p>
						</DefaultButton>
					</div>
				</div>
			</div>

			<p className="font-small weight-light social-link mt-3 mb-3">
				Displaying <span className="span-color-dash weight-bold">{firmdata.length}</span> Firms
			</p>

			<div className="table-part">
				<Table columns={['Name', 'Lawyers Listed', 'Added by', 'Added on', 'Actions']}
					data={currentLawyer.filter((firm: { firm_name: string; country_id: string; }) => {
						const nameMatch = firm.firm_name.toLowerCase().includes(name.toLowerCase());
						const countryId = firm.country_id;
						const locationMatch = selectedCountry === '' || `${countryId}` === selectedCountry;
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
									overlay={<Tooltip className="in" id="tooltip-top" > {getCountryNameById(rowData.country_id)} </Tooltip>}>
									<span className="font-x-small text-sonic-silver weight-light" >
										{getCountryNameById(rowData.country_id)}

									</span></OverlayTrigger>{' '}
								<button className="monthly">
									{rowData.created_by === '1' ? '' : rowData.status === 'pending' ? 'Requested' : ''}
								</button>
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
									{rowData.created_by == '1' || rowData.created_by == '2'
										? 'Admin'
										: 'Lawyer'}
								</button>
							</td>
							<td data-th="Last Online">
								<p className="font-x-small social-link weight-medium">
									{formatDateToDDMMYYYYMM(rowData.created_at)}
								</p>
							</td>
							<td data-th="Actions" className="text-right">
								<EditButton
									Tooltip="Edit Firm"
									onClick={() => handleEditFirm(rowData.id)
									}

								/>
								<DeleteButton
									Tooltip="Delete Firm"
									onClick={e => deletefirm(rowData?.id, 'deleted')}
								/>

								<DropDown align={'end'}
									label={
										<IconButton>
											<i className="fa-solid fa-ellipsis"></i>
										</IconButton>
									}>
									<ul className='set-admin-tag'>
										<li>
											<Link href={`/firms/${rowData.slug}`} target="_blank">
												View Public Profile
											</Link>
										</li>
										<li>
											<Link
												href={''}
												onClick={() => handleAddLawyerFirm(rowData.id)
												}
											>
												Add Lawyers
											</Link>
										</li>
										<li>
											<Link
												href={''}
												onClick={() => handleRemoveLawyerFirm(rowData.id)
												}
											>
												Remove Lawyers
											</Link>
										</li>
										<li>
											<Link
												href={''}
												onClick={(e: any) => handleArchive(e, rowData.id)}
											>
												Archive
											</Link>
										</li>
										{rowData.created_by !== '1' && rowData.status == 'pending' && (
											<li>
												<Link
													href={''}
													onClick={(e: any) => handleApprove(e, rowData.id)}
												>
													Approve Firm
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
				size="lg"
				show={addNewfirm}
				className="create-tags"
				title={firmId ? 'Edit Firm' : 'Add a Firm'}
				onCancel={() => setaddNewFirm(false)}
				onOk={() => setaddNewFirm(false)}
				footer={false}
			>
				<AddFirm firmId={firmId} firmDetails={firmDetails} onCancel={() => { setaddNewFirm(false), getAllFirmsData() }} />
			</Popup>

			<Popup
				size="lg"
				show={lawyerpopup}
				className="create-tags"
				title={firmId ? `Add Lawyers for ${firmName}` : "Add Lawyers"}
				onCancel={() => setLawyerPopup(false)}
				onOk={() => setLawyerPopup(false)}
				footer={false}
			>
				<p className="weight-medium font-small color-light">Search and add lawyers to the firm</p>
				<div className="icon-fild p-set mt-1 position-relative">
					<input
						type="text"
						placeholder=""
						className="form-fild w-100"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<Image
						src="/images/search-normal.svg"
						alt="search-normal"
						className="magnify-search"
						width={20}
						height={20}
					/>
				</div>
				<br />
				<form className="mt-2" onSubmit={handleSubmit} >
					{alllawyerdata.length > 0 ? (
						alllawyerdata
							.filter((lawyer: any) =>
								lawyer.full_name.toLowerCase().includes(searchQuery.toLowerCase())
							)
							.map((lawyerdata: any, index: any) => (
								<div className="card-inquiries bg-card-white mt-2" key={index}>
									<div className="row">
										<div className="col-md-11 col-7">
											<div className="row m-center">
												<div className='col-md-1 col-1 check-box-test d-flex align-items-center justify-content-center'>
													<input
														type="checkbox"
														value={lawyerdata.id}
														onChange={(e) => handleCheckboxChange(e, lawyerdata.id)}
													/>
												</div>

												<div className="col-md-3 col-4 pr-0 big-screen-w">
													<Link href="">
														<img
															src={getAdminImageSrc130x130(lawyerdata.profile_image, lawyerdata.gender)}
															alt="lawyer-profile"
															width={130}
															height={130}
															className="w-130 m-img-fixed"
														/>
													</Link>
												</div>
												<br />
												<div className="col-md-8 col-7 position-relative">
													<Link href="">
														<p className="font-large social-link weight-bold">{lawyerdata.full_name} </p>
													</Link>
													<div className="d-none d-lg-block">
														<p className="font-small weight-semi-bold social-link">
															{lawyerdata.service_name}
														</p>
														<ul className="rating-location py-1 m-0">
															{lawyerdata.location_name ? (
																<li className="loc">
																	<i className="fa-solid fa-location-dot"></i> {lawyerdata.location_name}
																</li>
															) : null}
															<li className="rev">
																{' '}
																<i className="fa-solid fa-star"></i> {lawyerdata.avg_rating_and_reviews}
															</li>
														</ul>
														<button className="btn-mini success-btn mr-1 mb-2">
															{`${lawyerdata.service_name} Law`}
														</button>
														<button className="btn-mini danger-btn mr-1 mb-2">
															Licensed for {lawyerdata.license_for_years} Years
														</button>
														<button className="btn-mini danger-btn ">
															Free Consultation: {lawyerdata.consultation_duration}
														</button>
													</div>
												</div>
											</div>
										</div>
										<div className="col-md-1 col-4">
											<button
												className="btn btn-secondary b-none"
												type="button"
												id="dropdownMenu2"
												data-bs-toggle="dropdown"
												aria-expanded="false"
											>
												<img src="/icon/more.svg" alt="more-icon" className="img-set" width={25} />
											</button>
											<ul
												className="dropdown-menu text-right f-w-4 drop-btn"
												aria-labelledby="dropdownMenu2"
											>
												<li className="active">
													<Link href={`/find-a-lawyer/${lawyerdata.slug}`} target="_blank">
														<p
															style={{ cursor: 'pointer', fontSize: '15px', color: '#000' }}
														>
															{' '}
															View Public Profile{' '}
														</p>
													</Link>
												</li>
											</ul>
										</div>
									</div>
								</div>
							))) : (
						<div className="not-found-message text-center">
							<p>No lawyers found.</p>
						</div>
					)}
					<div className="modal-ft">
						<div className="row mt-4">
							<div className="col-sm-3 col-4">
								<button
									type="button"
									className="btn btn-cancel w-100 save-pad cancel-class"
									data-bs-dismiss="modal"
									onClick={() => setLawyerPopup(false)}
								>
									Cancel
								</button>
							</div>
							<div className="col-sm-9 col-8">
								<button
									type="submit"
									disabled={isLoading}
									className="bg-893168 weight-semi-bold font-small w-100  mar-top-min b-r-btn save-pad"
								>
									{!isLoading ? (firmId ? 'Update' : 'Save & Publish') : 'Please wait...'}
								</button>
							</div>
						</div>
					</div>
				</form>
			</Popup>

			<Popup
				size="lg"
				show={removelawyerpopup}
				className="create-tags"
				title={firmId ? `Remove Lawyers from ${firmName}` : "Remove Lawyers"}
				onCancel={() => setRemoveLawyerPopup(false)}
				onOk={() => setRemoveLawyerPopup(false)}
				footer={false}
			>
				<p className="weight-medium font-small color-light">Search and remove lawyers from the firm</p>
				<div className="icon-fild p-set mt-1 position-relative">
					<input
						type="text"
						placeholder=""
						className="form-fild w-100"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<Image
						src="/images/search-normal.svg"
						alt="search-normal"
						className="magnify-search"
						width={20}
						height={20}
					/>
				</div>
				<br />
				{filteredAssignedLawyers.length > 0 ? (
					filteredAssignedLawyers
						.filter((lawyer: any) =>
							lawyer.firm_id === firmId &&
							lawyer.full_name.toLowerCase().includes(searchQuery.toLowerCase())
						)
						.map((lawyerdata: any, index: any) => (
							<div className="card-inquiries bg-card-white mt-2" key={index}>
								<div className="row">
									<div className="col-md-11 col-7">
										<div className="row m-center">
											<div className="col-md-3 col-4 pr-0 big-screen-w">
												<Link href="">
													<img
														src={getAdminImageSrc130x130(lawyerdata.profile_image, lawyerdata.gender)}
														alt="lawyer-profile"
														width={130}
														height={130}
														className="w-130 m-img-fixed"
													/>
												</Link>
											</div>
											<br />
											<div className="col-md-9 col-8 position-relative">
												<Link href="">
													<p className="font-large social-link weight-bold">{lawyerdata.full_name} </p>
												</Link>
												<div className="d-none d-lg-block">
													<p className="font-small weight-semi-bold social-link">
														{lawyerdata.service_name} at {firmName}
													</p>
													<ul className="rating-location py-1 m-0">
														{lawyerdata.location_name ? (
															<li className="loc">
																<i className="fa-solid fa-location-dot"></i> {lawyerdata.location_name}
															</li>
														) : null}
														<li className="rev">
															{' '}
															<i className="fa-solid fa-star"></i> {lawyerdata.avg_rating_and_reviews}
														</li>
													</ul>
													<button className="btn-mini success-btn mr-1 mb-2">
														{`${lawyerdata.service_name} Law`}
													</button>
													<button className="btn-mini danger-btn mr-1 mb-2">
														Licensed for {lawyerdata.license_for_years} Years
													</button>
													<button className="btn-mini danger-btn ">
														Free Consultation: {lawyerdata.consultation_duration}
													</button>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-1 col-4">
										<button
											className="btn btn-secondary b-none"
											type="button"
											id="dropdownMenu2"
											data-bs-toggle="dropdown"
											aria-expanded="false"
										>
											<img src="/icon/more.svg" alt="more-icon" className="img-set" width={25} />
										</button>

										<ul
											className="dropdown-menu text-right f-w-4 drop-btn"
											aria-labelledby="dropdownMenu2"
										>
											<li className="active">
												<p
													className="weight-semi-bold"
													style={{ cursor: 'pointer' }}
													onClick={() => handleRemoveLawyer(lawyerdata.id)}
												>
													Remove{' '}
												</p>
												<p
													className="weight-semi-bold"
													style={{ cursor: 'pointer' }}
													onClick={() => toggleFirmOwnerStatus(lawyerdata.id)}
												>
													{lawyerdata.firm_owner == 1 ? 'Remove from Firm Owner' : 'Add to Firm Owner'}{' '}
												</p>

											</li>
										</ul>
									</div>
								</div>
							</div>
						))) : (
					<div className="not-found-message text-center">
						<p>No lawyers found.</p>
					</div>
				)}
			</Popup>
		</div>
	);
}
