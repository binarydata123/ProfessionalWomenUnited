'use client';
import React, { useState, useEffect, useContext } from 'react';
import Popup from '@/commonUI/Popup';
import Table from '@/commonUI/Table';
import {
	getAllJurisdictionFilteredForAdmin,
	deleteJurisdictionsByAdmin,
	CreateorUpdateJurisdictionsByAdmin
} from '../../../../../../lib/adminapi';
import { getAllCountries } from '../../../../../../lib/frontendapi';
import Pagination from '@/commonUI/Pagination';
import DeleteButton from '@/commonUI/TableActionButtons/DeleteButton';
import EditButton from '@/commonUI/TableActionButtons/EditButton';
import DefaultButton from '@/commonUI/DefaultButton';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Image from 'next/image';
import AuthContext from '@/context/AuthContext';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { formatDateToDDMMYYYYMMAPPORVAL } from '@/app/[locale]/commonfunctions/commonfunctions';

interface FormData {
	jurisdiction_name: string;
	country_id: string;
}

export default function lawyers() {
	const { user } = useContext(AuthContext)
	const [user_id, setUserId] = useState('');
	const [filter_lawyer, SetFilterLawyer] = useState([]);
	const [name, setName] = useState('');
	const [location, setLocation] = useState('');
	const [sort_by, setSortBy] = useState('');
	const [allcountries, setCountries] = useState([]);
	const [addNewJurisdiction, setaddNewJurisdiction] = useState(false);

	const [formData, setFormData] = useState<FormData>({
		jurisdiction_name: '',
		country_id: ''
	});
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const [jurisdiction_id, setJurisdictionId] = useState('');

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPageStr = process.env.NEXT_PUBLIC_ITEM_PER_PAGE ?? '0';
	const itemsPerPage = parseInt(itemsPerPageStr, 10); // Parse to an integer with base 10
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentLawyer = filter_lawyer.slice(startIndex, endIndex);
	const totalPages = Math.ceil(filter_lawyer.length / itemsPerPage);

	useEffect(() => {
		if (user)
			user?.id ? setUserId(user?.id) : setUserId('');
		getAllCountriesData();
		handleChange('sort_by', '', user?.id);
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

	const handleChange = (inputName: any, value: any, user_id: any) => {
		setCurrentPage(1);

		switch (inputName) {
			case 'name':
				setName(value);
				break;
			case 'location':
				setLocation(value);
				break;
			case 'sort_by':
				setSortBy(value);
				break;
			default:
				break;
		}

		const data = {
			name: inputName === 'name' ? value : name,
			location: inputName === 'location' ? value : location,
			sort_by: inputName === 'sort_by' ? value : sort_by,
			user_id: user_id
		};

		getAllJurisdictionFilteredForAdminData(data);
	};

	const getAllJurisdictionFilteredForAdminData = async (data: any) => {
		try {
			const response = await getAllJurisdictionFilteredForAdmin(data);
			if (response.status == true) {
				SetFilterLawyer(response.data);
			} else {
				// toast.error(response.message);
				SetFilterLawyer([]);
			}
		} catch (error) {
			console.error('Error fetching:', error);
		}
	};

	const Editjurisdictions = (id: any, jurisdiction_name: any, country_id: any) => {
		setJurisdictionId(id);

		setFormData({
			...formData,
			jurisdiction_name: jurisdiction_name,
			country_id: country_id
		});

		setaddNewJurisdiction(true);
	};

	const changeUserStatus = (id: any, updated_status: any) => {
		// Show a confirmation dialog

		Swal.fire({
			title: 'Are you sure?',
			text: 'You Want to remove the jurisdiction',
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

					deleteJurisdictionsByAdmin(data)
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

	function validateForm() {
		const newErrors: { [key: string]: string } = {};
		if (!formData.jurisdiction_name) {
			newErrors.jurisdiction_name = 'Jurisdiction name is required';
		}
		if (!formData.country_id) {
			newErrors.country_id = 'Location name is required';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
		const isValid = validateForm();
		if (isValid) {
			const data = {
				jurisdiction_name: formData.jurisdiction_name,
				jurisdiction_id: jurisdiction_id,
				country_id: formData.country_id,
				user_id: user_id
			};
			CreateorUpdateJurisdictionsByAdmin(data)
				.then(res => {
					if (res.status == true) {
						toast.success(res.message);
						setaddNewJurisdiction(false);
						handleChange('sort_by', '', user_id);
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
		} else {
			setIsLoading(false);
		}
	}

	return (
		<div>
			<div className="form-part mt-2">
				<div className="row align-items-center g-3">
					<div className="col-sm-6 col-md-6 col-lg-3">
						<div className="icon-fild icon-g p-set position-relative">
							<input
								type="text"
								placeholder="Search for a jurisdictions"
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
							{allcountries.map((countries: any) => (
								<option key={countries.id} value={countries.id}>
									{countries.name}
								</option>
							))}
						</select>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-3">
						<select
							className="form-fild add-icon w-100"
							value={sort_by}
							onChange={e => handleChange('sort_by', e.target.value, user_id)}
						>
							<option value={''}>Sort By</option>
							<option value={'ASC'}>Oldest</option>
							<option value={'DESC'}>Newest</option>
						</select>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-3">
						<DefaultButton
							height={55}
							showIcon={false}
							className="w-100 d-flex align-items-center justify-content-center create-blog"
						>
							<p
								className="d-flex align-items-center font-bold"
								onClick={() => {
									setaddNewJurisdiction(true);
									setJurisdictionId('');
									setFormData({
										...formData,
										jurisdiction_name: '',
										country_id: ''
									});
								}}
							>
								{' '}
								<span className="plues-icon">+</span> New Jurisdiction
							</p>
						</DefaultButton>
					</div>
				</div>
			</div>

			<p className="font-small weight-light social-link mt-3 mb-3">
				Displaying <span className="span-color-dash weight-bold">{filter_lawyer.length}</span> jurisdictions
			</p>

			<div className="table-part mt-3">
				<Table columns={['Jurisdiction', 'Location', 'Created On', 'Actions']} data={currentLawyer}>
					{(rowData, index) => (
						<tr key={index}>
							<td data-th="Jurisdiction">
								<OverlayTrigger
									placement="top"
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{rowData.jurisdiction_name}</Tooltip>}>
									<span className="font-small weight-light social-link text-capitalize" >
										{rowData.jurisdiction_name && rowData.jurisdiction_name.length > 80
											? rowData.jurisdiction_name.substring(0, 80) + '...'
											: rowData.jurisdiction_name}
									</span>
								</OverlayTrigger>
							</td>
							<td data-th="Location">
								<OverlayTrigger
									placement="top"
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{rowData.country_name}</Tooltip>}>
									<span className="font-small weight-medium social-link">{rowData.country_name}</span>
								</OverlayTrigger>
							</td>

							<td data-th="Created On">
								<OverlayTrigger
									placement="top"
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{formatDateToDDMMYYYYMMAPPORVAL(rowData.created_at)}</Tooltip>}>
									<span className="font-x-small social-link weight-medium">
										{formatDateToDDMMYYYYMMAPPORVAL(rowData.created_at)}
									</span>
								</OverlayTrigger>
							</td>
							<td data-th="Actions " className="text-right ">
								<EditButton
									Tooltip="Edit"
									onClick={e =>
										Editjurisdictions(rowData?.id, rowData?.jurisdiction_name, rowData?.country_id)
									}
								/>
								<DeleteButton
									Tooltip="Delete Jurisdiction"
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
				size="sm"
				show={addNewJurisdiction}
				title={jurisdiction_id ? 'Edit Jurisdiction' : 'Create Jurisdiction'}
				onCancel={() => setaddNewJurisdiction(false)}
				onOk={() => setaddNewJurisdiction(false)}
				footer={false}
			>
				<form className="mt-2" onSubmit={handleSubmit}>
					<div className="row">
						<div className="col-sm-8">
							<label className="font-small  weight-medium text-sonic-silver w-100">
								Name of jurisdiction
							</label>
						</div>
						<div className="col-sm-4 text-right">
							<p className="Chinese-silver font-x-small weight-light">100</p>
						</div>
					</div>
					<input
						type="text"
						placeholder="Enter Name"
						className="form-fild  w-100"
						value={formData.jurisdiction_name}
						maxLength={100}
						onChange={e => setFormData({ ...formData, jurisdiction_name: e.target.value })}
					/>

					{errors.jurisdiction_name && (
						<small className="error-message text-danger">{errors.jurisdiction_name}</small>
					)}

					<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">Location</label>
					<select
						className="form-fild  w-100"
						value={formData.country_id}
						onChange={e => setFormData({ ...formData, country_id: e.target.value })}
					>
						<option value="">Select Location</option>
						{allcountries.map((countries: any) => (
							<option key={countries.id} value={countries.id}>
								{countries.name}
							</option>
						))}
					</select>

					{errors.country_id && <small className="error-message text-danger">{errors.country_id}</small>}

					<div className="modal-ft">
						<div className="row mt-4">
							<div className="col-sm-3 col-4">
								<button
									type="button"
									onClick={() => setaddNewJurisdiction(false)}
									className="btn btn-cancel w-100 save-pad"
									data-bs-dismiss="modal"
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
									{!isLoading ? (jurisdiction_id ? 'Update' : 'Save') : 'Please wait...'}
								</button>
							</div>
						</div>
					</div>
				</form>
			</Popup>
		</div>
	);
}
