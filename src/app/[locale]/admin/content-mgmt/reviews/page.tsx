'use client';
import React, { useState, useEffect, useContext } from 'react';
import Popup from '@/commonUI/Popup';
import Table from '@/commonUI/Table';
import { getAllReviewsFilteredForAdmin } from '../../../../../../lib/adminapi';
import Pagination from '@/commonUI/Pagination';
import Link from 'next/link';
import DropDown from '@/commonUI/DropDown';
import EyeButton from '@/commonUI/TableActionButtons/EyeButton';
import IconButton from '@/commonUI/IconButton';
import { StarIcon } from '@heroicons/react/20/solid';
import ReportAccount from '@/components/admin/modals/ReportAccount';
import Image from 'next/image';
import AuthContext from '@/context/AuthContext';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { formatDateToDDMMYYYYMMAPPORVAL } from '@/app/[locale]/commonfunctions/commonfunctions';

export default function lawyers() {
	const { user } = useContext(AuthContext)
	const [user_id, setUserId] = useState('');
	const [filter_lawyer, SetFilterLawyer] = useState([]);
	const [name, setName] = useState('');
	const [reviews, setReviews] = useState('');
	const [rating, setRating] = useState('');
	const [reportAccount, setreportAccount] = useState(false);

	const [lawyer_id, setLawyerId] = useState('');

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
			handleChange('name', '', user?.id);
		}
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
			case 'reviews':
				setReviews(value);
				break;
			case 'rating':
				setRating(value);
				break;
			default:
				break;
		}

		const data = {
			name: inputName === 'name' ? value : name,
			reviews: inputName === 'reviews' ? value : reviews,
			rating: inputName === 'rating' ? value : rating,
			user_id: user_id
		};

		getAllReviewsFilteredForAdminData(data);
	};

	const getAllReviewsFilteredForAdminData = async (data: any) => {
		try {
			const response = await getAllReviewsFilteredForAdmin(data);
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

	const closeReportPopup = () => {
		setreportAccount(false);
		handleChange('name', '', user_id);
	};

	return (
		<div>
			<div className="form-part mt-2">
				<div className="row g-3 align-items-center">
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
					<div className="col-sm-6 col-md-6 col-lg-2">
						<select
							className="form-fild  w-100"
							value={rating}
							onChange={e => handleChange('rating', e.target.value, user_id)}
						>
							<option value={''}>Rating</option>
							<option value={'1'}>1 Star</option>
							<option value={'2'}>2 Star</option>
							<option value={'3'}>3 Star</option>
							<option value={'4'}>4 Star</option>
							<option value={'5'}>5 Star</option>
						</select>
					</div>

					<div className="col-sm-6 col-md-6 col-lg-2">
						<select
							className="form-fild add-icon w-100"
							value={reviews}
							onChange={e => handleChange('reviews', e.target.value, user_id)}
						>
							<option value={''}>Sort</option>
							<option value={'highest'}>Highest</option>
							<option value={'lowest'}>Lowest</option>
							<option value={'newest'}>Newest</option>
						</select>
					</div>
				</div>
			</div>

			<p className="font-small weight-light social-link mt-3 mb-3">
				Displaying <span className="span-color-dash weight-bold">{filter_lawyer.length}</span> reviews
			</p>

			<div className="table-part mt-3">
				<Table
					columns={['Name', 'Designation', 'Rating', 'Reported', 'Created On', 'Actions']}
					data={currentLawyer}
				>
					{(rowData, index) => (
						<tr key={index}>
							<td data-th="Name">
								<OverlayTrigger
									placement="top"
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class text-capitalize">{rowData.review_to_name}</Tooltip>}>
									<span className="font-small weight-light social-link text-capitalize">
										{rowData.review_to_name && rowData.review_to_name.length > 50
											? rowData.review_to_name.substring(0, 50) + '...'
											: rowData.review_to_name}
									</span>
								</OverlayTrigger>
							</td>
							<td data-th="Designation">
								<OverlayTrigger
									placement="top"
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class text-capitalize">{rowData.designation} <br />
										{/* {rowData.company_name} */}
									</Tooltip>}>
									<span className="font-small weight-medium social-link" title={rowData.designation}>
										{rowData.designation && rowData.designation.length > 30
											? rowData.designation.substring(0, 30) + '...'
											: rowData.designation}
									</span>
								</OverlayTrigger>
								{/* <p className="font-x-small text-sonic-silver weight-light">
									{rowData.company_name && rowData.company_name.length > 30
										? rowData.company_name.substring(0, 30) + '...'
										: rowData.company_name}
								</p> */}
							</td>

							<td data-th="Rating">
								<p className="font-small weight-medium social-link d-flex">
									<StarIcon width={20} color={'#c49073'} />
									<b style={{ marginTop: '4px' }}>
										{rowData?.avg_rating ? rowData.avg_rating.split('(')[0] : ''}
									</b>
								</p>
								<p className="font-x-small text-sonic-silver weight-light">
									({rowData?.avg_rating ? rowData.avg_rating.split('(')[1] : ''})
								</p>
							</td>

							<td data-th="Reported">
								<p className="font-x-small social-link weight-medium">{rowData.report_count}</p>
							</td>

							<td data-th="Created On">
								<OverlayTrigger
									placement="top"
									overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class text-capitalize">{formatDateToDDMMYYYYMMAPPORVAL(rowData.review_created)}</Tooltip>}>
									<span className="font-x-small social-link weight-medium">
										{formatDateToDDMMYYYYMMAPPORVAL(rowData.review_created)}
									</span>
								</OverlayTrigger>
							</td>

							<td data-th="Actions " className="text-center ">
								<Link href={`/admin/content-mgmt/reviews/${rowData.review_to}`}>
									<EyeButton Tooltip="View Reviews" />
								</Link>
								<DropDown
									align={'end'}
									label={
										<IconButton>
											<i className="fa-solid fa-ellipsis"></i>
										</IconButton>
									}
								>
									<ul>
										<li>
											<Link href={`/find-a-professional/${rowData.slug}`}>View Profile</Link>
										</li>
										<li
											onClick={() => {
												setreportAccount(true);
												setLawyerId(rowData?.id);
											}}
										>
											Report Account
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
