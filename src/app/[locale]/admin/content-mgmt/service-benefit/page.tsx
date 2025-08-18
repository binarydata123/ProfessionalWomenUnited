'use client';
import React, { useState, useEffect, useContext } from 'react';
import Popup from '@/commonUI/Popup';
import Table from '@/commonUI/Table';
import { getAlServiceBenefitFilteredForAdmin, CreateorUpdateServiceBenefitByAdmin, deleteServiceBenefitByAdmin } from '../../../../../../lib/adminapi';
import { getAllServices } from '../../../../../../lib/frontendapi';
import Pagination from '@/commonUI/Pagination';
import DeleteButton from '@/commonUI/TableActionButtons/DeleteButton';
import EditButton from '@/commonUI/TableActionButtons/EditButton';
import DefaultButton from '@/commonUI/DefaultButton';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import AuthContext from '@/context/AuthContext';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { formatDateToDDMMYYYYMMAPPORVAL } from '@/app/[locale]/commonfunctions/commonfunctions';
const TextEditor = dynamic(() => import('../../../../../commonUI/TextEditor'), {
	ssr: false // Disable SSR for TextEditor component
});

interface FormData {
	benefit_one_title: string;
	benefit_one_desc: string;
	benefit_two_title: string;
	benefit_two_desc: string;
	benefit_three_title: string;
	benefit_three_desc: string;
	benefit_four_title: string;
	benefit_four_desc: string;
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
	const [addNewQa, setaddNewQa] = useState(false);

	const [formData, setFormData] = useState<FormData>({
		benefit_one_title: '',
		benefit_one_desc: '',
		benefit_two_title: '',
		benefit_two_desc: '',
		benefit_three_title: '',
		benefit_three_desc: '',
		benefit_four_title: '',
		benefit_four_desc: '',
		service_id: ''
	});
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const [qa_id, setQaId] = useState('');

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPageStr = process.env.NEXT_PUBLIC_ITEM_PER_PAGE ?? '0';
	const itemsPerPage = parseInt(itemsPerPageStr, 10); // Parse to an integer with base 10
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentLawyer = filter_lawyer.slice(startIndex, endIndex);
	const totalPages = Math.ceil(filter_lawyer.length / itemsPerPage);

	useEffect(() => {
		if (user) {
			user?.id ? setUserId(user?.id) : setUserId('');
			handleChange('sort_by', '', user?.id);
		}
		getAllServicesData();
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

		getAlServiceBenefitFilteredForAdminData(data);
	};

	const getAlServiceBenefitFilteredForAdminData = async (data: any) => {
		try {
			const response = await getAlServiceBenefitFilteredForAdmin(data);
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

	const handleBenefitOneDesc = (newValue: any) => {
		setFormData({ ...formData, benefit_one_desc: newValue });
	};
	const handleBenefitTwoDesc = (newValue: any) => {
		setFormData({ ...formData, benefit_two_desc: newValue });
	};
	const handleBenefitThreeDesc = (newValue: any) => {
		setFormData({ ...formData, benefit_three_desc: newValue });
	};
	const handleBenefitFourDesc = (newValue: any) => {
		setFormData({ ...formData, benefit_four_desc: newValue });
	};

	const Edittags = (id: any, benefit_one_title: any, benefit_one_desc: any, benefit_two_title: any, benefit_two_desc: any, benefit_three_title: any, benefit_three_desc: any, benefit_four_title: any, benefit_four_desc: any, service_id: any) => {
		setQaId(id);

		setFormData({
			...formData,
			benefit_one_title: benefit_one_title,
			benefit_one_desc: benefit_one_desc,
			benefit_two_title: benefit_two_title,
			benefit_two_desc: benefit_two_desc,
			benefit_three_title: benefit_three_title,
			benefit_three_desc: benefit_three_desc,
			benefit_four_title: benefit_four_title,
			benefit_four_desc: benefit_four_desc,
			service_id: service_id
		});

		setaddNewQa(true);
	};

	const changeUserStatus = (id: any) => {
		// Show a confirmation dialog

		Swal.fire({
			title: 'Are you sure?',
			text: 'You Want to remove the Benefits',
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
						user_id: user_id
					};

					deleteServiceBenefitByAdmin(data)
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
		if (!formData.benefit_one_title) {
			newErrors.benefit_one_title = 'Benefit one title is required';
		}
		if (!formData.benefit_one_desc) {
			newErrors.benefit_one_desc = 'Benefit one desc is required';
		}
		if (!formData.benefit_two_title) {
			newErrors.benefit_two_title = 'Benefit two title is required';
		}
		if (!formData.benefit_two_desc) {
			newErrors.benefit_two_desc = 'Benefit two desc is required';
		}
		if (!formData.benefit_three_title) {
			newErrors.benefit_three_title = 'Benefit three title is required';
		}
		if (!formData.benefit_three_desc) {
			newErrors.benefit_three_desc = 'Benefit three desc is required';
		}
		if (!formData.benefit_four_title) {
			newErrors.benefit_four_title = 'Benefit four title is required';
		}
		if (!formData.benefit_four_desc) {
			newErrors.benefit_four_desc = 'Benefit four desc is required';
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
				benefit_one_title: formData.benefit_one_title,
				benefit_one_desc: formData.benefit_one_desc,
				benefit_two_title: formData.benefit_two_title,
				benefit_two_desc: formData.benefit_two_desc,
				benefit_three_title: formData.benefit_three_title,
				benefit_three_desc: formData.benefit_three_desc,
				benefit_four_title: formData.benefit_four_title,
				benefit_four_desc: formData.benefit_four_desc,
				qa_id: qa_id,
				service_id: formData.service_id,
				user_id: user_id
			};
			CreateorUpdateServiceBenefitByAdmin(data)
				.then(res => {
					if (res.status == true) {
						toast.success(res.message);
						handleChange('sort_by', '', user_id);
						setaddNewQa(false);
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
								placeholder="Search for benefit"
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
							className="w-100 d-flex align-items-center justify-content-center create-blog new-tag"
							onClick={() => {
								setaddNewQa(true);
								setQaId('');
								setFormData({
									...formData,
									benefit_one_title: '',
									benefit_one_desc: '',
									benefit_two_title: '',
									benefit_two_desc: '',
									benefit_three_title: '',
									benefit_three_desc: '',
									benefit_four_title: '',
									benefit_four_desc: '',
									service_id: ''
								});
							}}
						>
							<p className="d-flex align-items-center font-bold">
								<span className="plues-icon">+</span> New Benefit
							</p>
						</DefaultButton>
					</div>
				</div>
			</div>

			<p className="font-small weight-light social-link mt-3 mb-3">
				Displaying <span className="span-color-dash weight-bold">{filter_lawyer.length}</span> Service Benefit
			</p>

			<div className="table-part mt-3">
				<Table columns={['Benefit', 'Category', 'Created On', 'Actions']} data={currentLawyer}>
					{(rowData, index) => (
						<tr key={index}>
							<td data-th="Benefit">
								<OverlayTrigger
									placement="top"
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{rowData.benefit_one_title}</Tooltip>}>
									<span
										className="font-small weight-light social-link text-capitalize"
										title={rowData.benefit_one_title}
									>
										{rowData.benefit_one_title && rowData.benefit_one_title.length > 100
											? rowData.benefit_one_title.substring(0, 100) + '...'
											: rowData.benefit_one_title}
									</span>
								</OverlayTrigger>
							</td>
							<td data-th="Category">
								<OverlayTrigger
									placement="top"
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class">{rowData.service_name}</Tooltip>}>
									<span className="font-small weight-medium social-link">{rowData.service_name}</span>
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
									onClick={e => Edittags(rowData?.id, rowData?.benefit_one_title, rowData?.benefit_one_desc, rowData?.benefit_two_title, rowData?.benefit_two_desc, rowData?.benefit_three_title, rowData?.benefit_three_desc, rowData?.benefit_four_title, rowData?.benefit_four_desc, rowData?.service_id)}
								/>
								<DeleteButton
									Tooltip="Delete"
									onClick={e => changeUserStatus(rowData?.id)}
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
				show={addNewQa}
				className="create-tags"
				title={qa_id ? 'Edit Service Benefit' : 'Create Service Benefit'}
				onCancel={() => setaddNewQa(false)}
				onOk={() => setaddNewQa(false)}
				footer={false}
			>
				<form className="mt-2" onSubmit={handleSubmit}>
					<div className="row">
						<div className="col-sm-8">
							<label className="font-small  weight-medium text-sonic-silver w-100 mb-2">
								Benefit One Title
							</label>
						</div>
						<div className="col-sm-4 text-right">
							<p className="Chinese-silver font-x-small weight-light">100</p>
						</div>
					</div>
					<input
						type="text"
						placeholder="Enter Benefit Title"
						className="form-fild  w-100"
						value={formData.benefit_one_title}
						maxLength={100}
						onChange={e => setFormData({ ...formData, benefit_one_title: e.target.value })}
					/>

					{errors.benefit_one_title && <small className="error-message text-danger">{errors.benefit_one_title}</small>}

					<div className="row mt-2">
						<div className="col-sm-8">
							<label className="font-small  weight-medium text-sonic-silver w-100 mb-2">
								Benefit One Desc
							</label>
						</div>
					</div>

					<TextEditor
						height={100}
						value={formData.benefit_one_desc && formData.benefit_one_desc}
						onChange={handleBenefitOneDesc}
					/>
					<br /> <br />
					{errors.benefit_one_desc && <small className="error-message text-danger mt-4">{errors.benefit_one_desc}</small>}

					<div className="row">
						<div className="col-sm-8">
							<label className="font-small  weight-medium text-sonic-silver w-100 mb-2">
								Benefit Two Title
							</label>
						</div>
						<div className="col-sm-4 text-right">
							<p className="Chinese-silver font-x-small weight-light">100</p>
						</div>
					</div>
					<input
						type="text"
						placeholder="Enter Benefit Title"
						className="form-fild  w-100"
						value={formData.benefit_two_title}
						maxLength={100}
						onChange={e => setFormData({ ...formData, benefit_two_title: e.target.value })}
					/>

					{errors.benefit_two_title && <small className="error-message text-danger">{errors.benefit_two_title}</small>}

					<div className="row mt-2">
						<div className="col-sm-8">
							<label className="font-small  weight-medium text-sonic-silver w-100 mb-2">
								Benefit Two Desc
							</label>
						</div>
					</div>
					<TextEditor
						height={100}
						value={formData.benefit_two_desc && formData.benefit_two_desc}
						onChange={handleBenefitTwoDesc}
					/>
					<br /> <br />
					{errors.benefit_two_desc && <small className="error-message text-danger mt-4">{errors.benefit_two_desc}</small>}

					<div className="row">
						<div className="col-sm-8">
							<label className="font-small  weight-medium text-sonic-silver w-100 mb-2">
								Benefit Three Title
							</label>
						</div>
						<div className="col-sm-4 text-right">
							<p className="Chinese-silver font-x-small weight-light">100</p>
						</div>
					</div>
					<input
						type="text"
						placeholder="Enter Benefit Title"
						className="form-fild  w-100"
						value={formData.benefit_three_title}
						maxLength={100}
						onChange={e => setFormData({ ...formData, benefit_three_title: e.target.value })}
					/>

					{errors.benefit_three_title && <small className="error-message text-danger">{errors.benefit_three_title}</small>}

					<div className="row mt-2">
						<div className="col-sm-8">
							<label className="font-small  weight-medium text-sonic-silver w-100 mb-2">
								Benefit Three Desc
							</label>
						</div>
					</div>

					<TextEditor
						height={100}
						value={formData.benefit_three_desc && formData.benefit_three_desc}
						onChange={handleBenefitThreeDesc}
					/>
					<br /> <br />
					{errors.benefit_three_desc && <small className="error-message text-danger mt-4">{errors.benefit_three_desc}</small>}

					<div className="row">
						<div className="col-sm-8">
							<label className="font-small  weight-medium text-sonic-silver w-100 mb-2">
								Benefit Four Title
							</label>
						</div>
						<div className="col-sm-4 text-right">
							<p className="Chinese-silver font-x-small weight-light">100</p>
						</div>
					</div>
					<input
						type="text"
						placeholder="Enter Benefit Title"
						className="form-fild  w-100"
						value={formData.benefit_four_title}
						maxLength={100}
						onChange={e => setFormData({ ...formData, benefit_four_title: e.target.value })}
					/>

					{errors.benefit_four_title && <small className="error-message text-danger">{errors.benefit_four_title}</small>}

					<div className="row mt-2">
						<div className="col-sm-8">
							<label className="font-small  weight-medium text-sonic-silver w-100 mb-2">
								Benefit Four Desc
							</label>
						</div>
					</div>

					<TextEditor
						height={100}
						value={formData.benefit_four_desc && formData.benefit_four_desc}
						onChange={handleBenefitFourDesc}
					/>

					<br /> <br />
					{errors.benefit_four_desc && <small className="error-message text-danger mt-4">{errors.benefit_four_desc}</small>}

					<label className="font-small  weight-medium text-sonic-silver w-100 mt-4 pb-2">Associated to</label>
					<select
						className="form-fild  w-50"
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
					<br></br>
					{errors.service_id && <small className="error-message text-danger">{errors.service_id}</small>}

					<div className="modal-ft">
						<div className="row mt-4">
							<div className="col-sm-3 col-4">
								<button
									type="button"
									onClick={() => setaddNewQa(false)}
									className="btn btn-cancel w-100 save-pad cancel-class"
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
									{!isLoading ? (qa_id ? 'Update' : 'Save') : 'Please wait...'}
								</button>
							</div>
						</div>
					</div>
				</form>
			</Popup>
		</div>
	);
}
