'use client';
import React, { useState, useEffect, useContext } from 'react';
import Popup from '@/commonUI/Popup';
import Table from '@/commonUI/Table';
import {
	getAllServicesFilteredForAdmin,
	deleteServicesByAdmin,
	CreateorUpdateServicesByAdmin
} from '../../../../../../../lib/adminapi';
import Pagination from '@/commonUI/Pagination';
import DeleteButton from '@/commonUI/TableActionButtons/DeleteButton';
import EditButton from '@/commonUI/TableActionButtons/EditButton';
import DefaultButton from '@/commonUI/DefaultButton';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Image from 'next/image';
import AuthContext from '@/context/AuthContext';
import { formatDateToDDMMYYYYMMAPPORVAL, getAdminLegalServiceImageSrc } from '@/app/[locale]/commonfunctions/commonfunctions';

interface FormData {
	name: string;
	description: string;
	image: string;
	icon: string;
	seo_meta_title: string;
	seo_meta_description: string;
}

export default function lawyers() {
	const { user } = useContext(AuthContext)
	const [user_id, setUserId] = useState('');
	const [filter_lawyer, SetFilterLawyer] = useState([]);
	const [name, setName] = useState('');
	const [service, setService] = useState('');
	const [sort_by, setSortBy] = useState('');
	const [addNewService, setaddNewService] = useState(false);

	const [formData, setFormData] = useState<FormData>({
		name: '',
		description: '',
		image: '',
		icon: '',
		seo_meta_title: '',
		seo_meta_description: ''
	});
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const [service_id, setServiceId] = useState('');

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPageStr = process.env.NEXT_PUBLIC_ITEM_PER_PAGE ?? '0';
	const itemsPerPage = parseInt(itemsPerPageStr, 10); // Parse to an integer with base 10
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentLawyer = filter_lawyer.slice(startIndex, endIndex);
	const totalPages = Math.ceil(filter_lawyer.length / itemsPerPage);

	const [showMore, setShowMore] = useState(false);
	const toggleShowMore = () => setShowMore(!showMore);

	const [icon, setIconImage] = useState('');
	const [iconPreview, setIconImagePreview] = useState<string | null>(null);
	const [dicon, setdIconImage] = useState('');

	const [banner, setBannerImage] = useState('');
	const [dbanner, setdBannerImage] = useState('');
	const [bannerPreview, setBannerImagePreview] = useState<string | null>(null);

	useEffect(() => {
		if (user)
			user?.id ? setUserId(user?.id) : setUserId('');
		handleChange('sort_by', '', user?.id);
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

		getAllServicesFilteredForAdminData(data);
	};

	const getAllServicesFilteredForAdminData = async (data: any) => {
		try {
			const response = await getAllServicesFilteredForAdmin(data);
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

	const Editservices = (id: any, name: any, description: any, image: any, icon: any, seo_meta_title: any, seo_meta_description: any) => {
		setServiceId(id);
		setFormData({
			...formData,
			name: name,
			description: description,
			seo_meta_title: seo_meta_title,
			seo_meta_description: seo_meta_description,
		});
		setdBannerImage(image);
		setdIconImage(icon);
		setIconImagePreview('');
		setBannerImagePreview('');
		setaddNewService(true);
		setIconImage('');
		setBannerImage('');
	};

	const changeUserStatus = (id: any, updated_status: any) => {
		// Show a confirmation dialog

		Swal.fire({
			title: 'Are you sure?',
			text: 'You Want to remove the service',
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

					deleteServicesByAdmin(data)
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
		if (!formData.name) {
			newErrors.name = 'Service name is required';
		}
		if (!formData.description) {
			newErrors.description = 'Description is required';
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
				name: formData.name,
				service_id: service_id,
				description: formData.description,
				icon: icon,
				banner: banner,
				user_id: user_id,
				seo_meta_title: formData.seo_meta_title,
				seo_meta_description: formData.seo_meta_description
			};
			CreateorUpdateServicesByAdmin(data)
				.then(res => {
					if (res.status == true) {
						toast.success(res.message);
						handleChange('sort_by', '', user_id);
						setaddNewService(false);
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

	const handleIconFileInputChange = (event: any) => {
		event.preventDefault();
		setdIconImage('');
		const selectedFile = event.target.files[0];

		setIconImage(selectedFile);
		if (selectedFile.type.includes('image')) {
			// Check if a new blog image is selected and set the appropriate states
			if (selectedFile) {
				setIconImagePreview(URL.createObjectURL(selectedFile));
			}
		} else {
			toast.error('Please upload an valid image file (JPEG,JPG,PNG).');
		}
	};

	const handleBannerImageInputChange = (event: any) => {
		event.preventDefault();
		setdBannerImage('');
		const selectedFile = event.target.files[0];
		setBannerImage(selectedFile);
		if (selectedFile.type.includes('image')) {
			// Check if a new blog image is selected and set the appropriate states
			if (selectedFile) {
				setBannerImagePreview(URL.createObjectURL(selectedFile));
			}
		} else {
			toast.error('Please upload an valid image file (JPEG,JPG,PNG).');
		}
	};

	const restform = () => {
		setServiceId('');
		setFormData({
			...formData,
			name: '',
			description: '',
			seo_meta_title: '',
			seo_meta_description: ''
		});
		setdBannerImage('');
		setdIconImage('');
		setIconImagePreview('');
		setBannerImagePreview('');
		setIconImage('');
		setBannerImage('');
		setaddNewService(true);
	};

	return (
		<div>
			<div className="form-part mt-2">
				<div className="row align-items-center g-3">
					<div className="col-sm-6 col-md-6 col-lg-3">
						<div className="icon-fild icon-g p-set position-relative">
							<input
								type="text"
								placeholder="Search for a professional services"
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
							className="form-fild add-icon w-100"
							value={sort_by}
							onChange={e => handleChange('sort_by', e.target.value, user_id)}
						>
							<option value={''}>Sort By</option>
							<option value={'ASC'}>Oldest</option>
							<option value={'DESC'}>Newest</option>
						</select>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-6 text-end">
						<DefaultButton
							showIcon={false}
							height={53}
							onClick={() => {
								restform();
							}}
						>
							<p className="w-100 d-flex align-items-center justify-content-center create-blo">
								<span className="plues-icon">+</span> New Service
							</p>
						</DefaultButton>
					</div>
				</div>
			</div>

			<p className="font-small weight-light social-link mt-3 mb-3">
				Displaying <span className="span-color-dash weight-bold">{filter_lawyer.length}</span> professional services
			</p>

			<div className="table-part mt-3">
				<Table
					columns={['Service', 'Description', 'Icon', 'Banner', 'Created On', 'Actions']}
					data={currentLawyer}
				>
					{(rowData, index) => (
						<tr key={index}>
							<td data-th="Professional Service">
								<p className="font-small weight-light social-link text-capitalize" title="View Profile">
									{rowData.name && rowData.name.length > 20
										? rowData.name.substring(0, 20) + '...'
										: rowData.name}
								</p>
							</td>
							<td data-th="Description">
								<p className="font-small weight-light text-sonic-silver">
									{showMore
										? rowData?.description
										: `${rowData?.description.slice(0, 250)}${rowData?.description.length > 250 ? '...' : ''
										}`}
								</p>

								{rowData.description.length > 250 && (
									<a
										href="JavaScript:void(0)"
										onClick={toggleShowMore}
										className="green-medium-2  font-x-small weight-semi-bold"
									>
										{' '}
										{showMore ? 'Show Less' : 'Show More'}{' '}
									</a>
								)}
							</td>

							<td data-th="Designation">
								<Image
									src={getAdminLegalServiceImageSrc(rowData.icon)}
									alt={rowData.icon_alt_text}
									width={70}
									height={70}
									layout="responsive"
									className="w-130 m-img-fixed"
								/>
							</td>

							<td data-th="Banner Image">
								<Image
									src={getAdminLegalServiceImageSrc(rowData.image)}
									alt={rowData.image_alt_text}
									width={100}
									height={100}
									layout="responsive"
									className="w-130 m-img-fixed"
								/>
							</td>

							<td data-th="Created On">
								<p className="font-x-small social-link weight-medium">
									{formatDateToDDMMYYYYMMAPPORVAL(rowData.created_at)}
								</p>
							</td>
							<td data-th="Actions " className="text-right ">
								<EditButton
									Tooltip="Edit"
									onClick={e =>
										Editservices(
											rowData?.id,
											rowData?.name,
											rowData?.description,
											rowData?.image,
											rowData?.icon,
											rowData?.seo_meta_title,
											rowData?.seo_meta_description,
										)
									}
								/>
								<DeleteButton
									Tooltip="Delete Service"
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
				size="lg"
				show={addNewService}
				title={service_id ? 'Edit Service' : 'Create Service'}
				onCancel={() => setaddNewService(false)}
				onOk={() => setaddNewService(false)}
				footer={false}
			>
				<form className="mt-2" onSubmit={handleSubmit}>
					<div className="row">
						<div className="col-sm-8">
							<label className="font-small  weight-medium text-sonic-silver w-100">Name of service</label>
						</div>
						<div className="col-sm-4 text-right">
							<p className="Chinese-silver font-x-small weight-light">100</p>
						</div>
					</div>
					<input
						type="text"
						placeholder="Enter Name"
						className="form-fild  w-100"
						value={formData.name}
						maxLength={100}
						onChange={e => setFormData({ ...formData, name: e.target.value })}
					/>

					{errors.name && <small className="error-message text-danger">{errors.name}</small>}

					<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">Description</label>

					<textarea
						className="form-fild  w-100 h-129"
						value={formData.description}
						placeholder="Write legal description here.."
						onChange={e => setFormData({ ...formData, description: e.target.value })}
					>
						{' '}
					</textarea>

					{errors.description && <small className="error-message text-danger">{errors.description}</small>}

					<div className="row mt-4">
						<div className="col-sm-8">
							<label className="font-small  weight-medium text-sonic-silver w-100">Seo Meta Title</label>
						</div>
						<div className="col-sm-4 text-right">
							<p className="Chinese-silver font-x-small weight-light">100</p>
						</div>
					</div>
					<input
						type="text"
						placeholder="Enter Meta Title"
						className="form-fild  w-100"
						value={formData.seo_meta_title}
						maxLength={200}
						onChange={e => setFormData({ ...formData, seo_meta_title: e.target.value })}
					/>

					{errors.seo_meta_title && <small className="error-message text-danger">{errors.seo_meta_title}</small>}

					<label className="font-small  weight-medium text-sonic-silver w-100 mt-2">Seo Meta Description</label>

					<input
						type="text"
						placeholder="Enter Meta Description"
						className="form-fild  w-100"
						value={formData.seo_meta_description}
						maxLength={250}
						onChange={e => setFormData({ ...formData, seo_meta_description: e.target.value })}
					/>

					{errors.seo_meta_description && <small className="error-message text-danger">{errors.seo_meta_description}</small>}

					<div className="row">
						<div className="col-sm-6 col-6">
							<div className="file-btn-upload mt-3">
								<input
									type="file"
									className="file-up w-100"
									onChange={handleIconFileInputChange}
									accept="image/jpeg, image/png"
								/>
								<button type="button" className="bg-893168 weight-semi-bold font-small save-pad">
									<i className="fa-solid fa-image" onChange={handleIconFileInputChange}></i> &nbsp;
									Upload Icon Image
								</button>
							</div>
							{iconPreview && (
								<Image
									src={iconPreview}
									alt="Preview"
									className="mt-2"
									height={100}
									width={100}
									style={{ objectFit: 'contain' }}
								/>
							)}
							{dicon && (
								<Image
									src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/Services/' + dicon}
									alt="Preview"
									className="mt-2"
									height={100}
									width={100}
									style={{ objectFit: 'contain' }}
								/>
							)}
						</div>

						<div className="col-sm-6 col-6">
							<div className="file-btn-upload mt-3">
								<input
									type="file"
									className="file-up w-100"
									onChange={handleBannerImageInputChange}
									accept="image/jpeg, image/png"
								/>
								<button type="button" className="bg-893168 weight-semi-bold font-small save-pad">
									<i className="fa-solid fa-image" onChange={handleBannerImageInputChange}></i> &nbsp;
									Upload Banner Image
								</button>
							</div>
							{bannerPreview && (
								<Image
									src={bannerPreview}
									alt="Preview"
									className="mt-2"
									height={100}
									width={100}
									style={{ objectFit: 'contain' }}
								/>
							)}
							{dbanner && (
								<Image
									src={process.env.NEXT_PUBLIC_IMAGE_URL + '/images/Services/' + dbanner}
									alt="Preview"
									className="mt-2"
									height={100}
									width={100}
									style={{ objectFit: 'contain' }}
								/>
							)}
						</div>
					</div>


					<div className="modal-ft">
						<div className="row mt-4">
							<div className="col-sm-3 col-4">
								<button
									type="button"
									onClick={() => setaddNewService(false)}
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
									{!isLoading ? (service_id ? 'Udpate' : 'Save') : 'Please wait...'}
								</button>
							</div>
						</div>
					</div>
				</form>
			</Popup>
		</div>
	);
}
