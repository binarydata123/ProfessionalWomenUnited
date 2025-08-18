'use client';
import React, { useState, useEffect, useContext } from 'react';
import Table from '@/commonUI/Table';
import { getAlBlogsFilteredForAdmin, deleteBlogsByAdmin } from '../../../../../../lib/adminapi';
import { getAllServices } from './../../../../../../lib/frontendapi';
import Pagination from '@/commonUI/Pagination';
import DeleteButton from '@/commonUI/TableActionButtons/DeleteButton';
import EditButton from '@/commonUI/TableActionButtons/EditButton';
import DefaultButton from '@/commonUI/DefaultButton';
import Swal from 'sweetalert2';
import Link from 'next/link';
import EyeButton from '@/commonUI/TableActionButtons/EyeButton';
import Image from 'next/image';
import AuthContext from '@/context/AuthContext';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { formatDateToDDMMYYYYMMAPPORVAL } from '@/app/[locale]/commonfunctions/commonfunctions';

export default function blog() {
	const { user } = useContext(AuthContext)
	const [user_id, setUserId] = useState('');
	const [filter_lawyer, SetFilterLawyer] = useState([]);
	const [name, setName] = useState('');
	const [service, setService] = useState('');
	const [sort_by, setSortBy] = useState('');
	const [allServices, setServices] = useState([]);
	const [status, setStatus] = useState('');

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
			getAllServicesData();
			handleChange('sort_by', '', user?.id);
		}
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
			case 'status':
				setStatus(value);
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
			status: inputName === 'status' ? value : status,
			sort_by: inputName === 'sort_by' ? value : sort_by,
			user_id: user_id
		};

		getAlBlogsFilteredForAdminData(data);
	};

	const getAlBlogsFilteredForAdminData = async (data: any) => {
		try {
			const response = await getAlBlogsFilteredForAdmin(data);
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

	const changeUserStatus = (id: any, updated_status: any) => {
		// Show a confirmation dialog

		Swal.fire({
			title: 'Are you sure?',
			text: 'You Want to remove the blog',
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

					deleteBlogsByAdmin(data)
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

	return (
		<div>
			<div className="form-part mt-2">
				<div className="row align-items-center g-3">
					<div className="col-sm-6 col-md-6 col-lg-3">
						<div className="icon-fild icon-g p-set position-relative">
							<input
								type="text"
								placeholder="Search for a Blog"
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
							{allServices.map((services: any) => (
								<option key={services.id} value={services.id}>
									{services.name}
								</option>
							))}
						</select>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-2">
						<select
							className="form-fild  w-100"
							value={status}
							onChange={e => handleChange('status', e.target.value, user_id)}
						>
							<option value={''}>Status</option>
							<option value={'published'}>Published</option>
							<option value={'draft'}>Draft</option>
						</select>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-2">
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
					<div className="col-sm-6 col-md-6 col-lg-2">
						<Link href={'/admin/content-mgmt/blogs/create'}>
							<DefaultButton
								height={55}
								showIcon={false}
								className="w-100 d-flex align-items-center justify-content-center create-blog"
							>
								<p className="d-flex align-items-center font-bold">
									{' '}
									<span className="plues-icon">+</span> Create Blog
								</p>
							</DefaultButton>
						</Link>
					</div>
				</div>
			</div>

			<p className="font-small weight-light social-link mt-3 mb-3">
				Displaying <span className="span-color-dash weight-bold">{filter_lawyer.length}</span> blogs
			</p>

			<div className="table-part mt-3">
				<Table columns={['Questions', 'Post Date', 'Category', 'Status', 'Actions']} data={currentLawyer}>
					{(rowData, index) => (
						<tr key={index}>
							<td data-th="Questions">
								<Link href={`/blogs/${rowData.slug}`} target="_blank">
									{' '}
									<OverlayTrigger
										placement="top"
										overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class text-capitalize">{rowData.title}</Tooltip>}>
										<span
											className="font-small weight-light social-link text-capitalize"
										>
											{rowData.title && rowData.title.length > 200
												? rowData.title.substring(0, 200) + '...'
												: rowData.title}
										</span>
									</OverlayTrigger>
								</Link>
							</td>
							<td data-th="Post Date">
								<OverlayTrigger
									placement="top"
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class text-capitalize">{formatDateToDDMMYYYYMMAPPORVAL(rowData.created_at)}</Tooltip>}>
									<span className="font-x-small social-link weight-medium">
										{formatDateToDDMMYYYYMMAPPORVAL(rowData.created_at)}
									</span>
								</OverlayTrigger>
							</td>
							<td data-th="Category">
								<OverlayTrigger
									placement="top"
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class text-capitalize">{rowData.service_name}</Tooltip>}>
									<span className="font-small weight-medium social-link">{rowData.service_name}</span>
								</OverlayTrigger>
							</td>

							<td data-th="Status">
								<p className="font-small weight-medium social-link text-capitalize">{rowData.status}</p>
							</td>

							<td data-th="Actions " className="text-right ">
								<Link href={`/blogs/${rowData.slug}`} target="_blank">
									{' '}
									<EyeButton Tooltip="View Blog"></EyeButton>
								</Link>
								<Link href={`/admin/content-mgmt/blogs/edit/${rowData.id}`}>
									<EditButton Tooltip="Edit Blog" />
								</Link>
								<DeleteButton
									Tooltip="Delete Blog"
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
		</div>
	);
}
