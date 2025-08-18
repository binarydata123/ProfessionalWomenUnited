'use client';
import React, { useState, useEffect, useContext } from 'react';
import Popup from '@/commonUI/Popup';
import Table from '@/commonUI/Table';
import {
	getAllSpecializationFilteredForAdmin,
	deleteSpecializationByAdmin,
	CreateorUpdateSpecializationByAdmin
} from '../../../../../../../lib/adminapi';
import { getAllServices } from '../../../../../../../lib/frontendapi';
import Pagination from '@/commonUI/Pagination';
import DeleteButton from '@/commonUI/TableActionButtons/DeleteButton';
import EditButton from '@/commonUI/TableActionButtons/EditButton';
import DefaultButton from '@/commonUI/DefaultButton';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Image from 'next/image';
import AuthContext from '@/context/AuthContext';
import { formatDateToDDMMYYYYMMAPPORVAL } from '@/app/[locale]/commonfunctions/commonfunctions';

interface FormData {
	specialization_name: string;
	service_id: string;
}

export default function lawyers() {
	const { user } = useContext(AuthContext)
	const [user_id, setUserId] = useState('');
	const [filter_lawyer, SetFilterLawyer] = useState([]);
	const [name, setName] = useState('');
	const [service, setService] = useState('');
	const [sort_by, setSortBy] = useState('');
	const [allservices, setServices] = useState([]);
	const [addNewSpecialization, setaddNewSpecialization] = useState(false);

	const [formData, setFormData] = useState<FormData>({
		specialization_name: '',
		service_id: ''
	});
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const [specialization_id, setSpecializationId] = useState('');

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
		getAllServicesData();
		handleChange('sort_by', '', user?.id);
	}, []);

	const handlePageChange = (newPage: any) => {
		setCurrentPage(newPage);
	};

	const getAllServicesData = async () => {
		try {
			const res = await getAllServices();
			if (res.status == true) {
				setServices(res.data);
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
			case 'service':
				setService(value);
				break;
			case 'sort_by':
				setSortBy(value);
				break;
			default:
				break;
		}

		const data = {
			name: inputName === 'name' ? value : name,
			service: inputName === 'service' ? value : service,
			sort_by: inputName === 'sort_by' ? value : sort_by,
			user_id: user_id
		};

		getAllSpecializationFilteredForAdminData(data);
	};

	const getAllSpecializationFilteredForAdminData = async (data: any) => {
		try {
			const response = await getAllSpecializationFilteredForAdmin(data);
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

	const Editspecialization = (id: any, specialization_name: any, service_id: any) => {
		setSpecializationId(id);

		setFormData({
			...formData,
			specialization_name: specialization_name,
			service_id: service_id
		});

		setaddNewSpecialization(true);
	};

	const changeUserStatus = (id: any, updated_status: any) => {
		// Show a confirmation dialog

		Swal.fire({
			title: 'Are you sure?',
			text: 'You Want to remove the specialization',
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

					deleteSpecializationByAdmin(data)
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
		if (!formData.specialization_name) {
			newErrors.specialization_name = 'Specialization name is required';
		}
		if (!formData.service_id) {
			newErrors.service_id = 'Service name is required';
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
				specialization_name: formData.specialization_name,
				specialization_id: specialization_id,
				service_id: formData.service_id,
				user_id: user_id
			};
			CreateorUpdateSpecializationByAdmin(data)
				.then(res => {
					if (res.status == true) {
						toast.success(res.message);
						handleChange('sort_by', '', user_id);
						setaddNewSpecialization(false);
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
								placeholder="Search for a specializations"
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
							value={service}
							onChange={e => handleChange('service', e.target.value, user_id)}
						>
							<option value="">Select Category</option>
							{allservices.map((services: any) => (
								<option key={services.id} value={services.id}>
									{services.name}
								</option>
							))}
						</select>
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
					<div className="col-sm-6 col-md-6 col-lg-3">
						<DefaultButton
							showIcon={false}
							height={53}
							className="mt-1 w-100"
							onClick={() => {
								setaddNewSpecialization(true);
								setSpecializationId('');
								setFormData({
									...formData,
									specialization_name: '',
									service_id: ''
								});
							}}
						>
							+ New Specialization
						</DefaultButton>
					</div>
				</div>
			</div>

			<p className="font-small weight-light social-link mt-3 mb-3">
				Displaying <span className="span-color-dash weight-bold">{filter_lawyer.length}</span> specialization
			</p>

			<div className="table-part mt-3">
				<Table columns={['Specializations', 'Category', 'Created On', 'Actions']} data={currentLawyer}>
					{(rowData, index) => (
						<tr key={index}>
							<td data-th="Specializations">
								<p className="font-small weight-light social-link text-capitalize" title="View Profile">
									{rowData.name && rowData.name.length > 20
										? rowData.name.substring(0, 20) + '...'
										: rowData.name}
								</p>
							</td>
							<td data-th="Category">
								<p className="font-small weight-medium social-link">{rowData.service_name}</p>
							</td>

							<td data-th="Created On">
								<p className="font-x-small social-link weight-medium">
									{formatDateToDDMMYYYYMMAPPORVAL(rowData.created_at)}
								</p>
							</td>
							<td data-th="Actions " className="text-right ">
								<EditButton
									Tooltip="Edit"
									onClick={e => Editspecialization(rowData?.id, rowData?.name, rowData?.service_id)}
								/>
								<DeleteButton
									Tooltip="Delete Specialization"
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
				show={addNewSpecialization}
				title={specialization_id ? 'Edit Specialization' : 'Create Specialization'}
				onCancel={() => setaddNewSpecialization(false)}
				onOk={() => setaddNewSpecialization(false)}
				footer={false}
			>
				<form className="mt-2" onSubmit={handleSubmit}>
					<div className="row">
						<div className="col-sm-8">
							<label className="font-small  weight-medium text-sonic-silver w-100">
								Name of specialization
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
						value={formData.specialization_name}
						maxLength={100}
						onChange={e => setFormData({ ...formData, specialization_name: e.target.value })}
					/>

					{errors.specialization_name && (
						<small className="error-message text-danger">{errors.specialization_name}</small>
					)}

					<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">Associated to</label>
					<select
						className="form-fild  w-100"
						value={formData.service_id}
						onChange={e => setFormData({ ...formData, service_id: e.target.value })}
					>
						<option value="">Select Legal Service</option>
						{allservices.map((services: any) => (
							<option key={services.id} value={services.id}>
								{services.name}
							</option>
						))}
					</select>

					{errors.service_id && <small className="error-message text-danger">{errors.service_id}</small>}

					<div className="modal-ft">
						<div className="row mt-4">
							<div className="col-sm-3 col-4">
								<button
									type="button"
									onClick={() => setaddNewSpecialization(false)}
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
									{!isLoading ? (specialization_id ? 'Update' : 'Save') : 'Please wait...'}
								</button>
							</div>
						</div>
					</div>
				</form>
			</Popup>
		</div>
	);
}
