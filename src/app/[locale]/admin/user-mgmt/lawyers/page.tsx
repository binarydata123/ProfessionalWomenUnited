'use client';
import React, { useState, useEffect, useContext } from 'react';
import Popup from '@/commonUI/Popup';
import Link from 'next/link';
import DropDown from '@/commonUI/DropDown';
import Table from '@/commonUI/Table';
import LawyerProfile from '@/components/admin/modals/LawyerProfile';
import SendMessage from '@/components/admin/modals/SendMessage';
import ReportAccount from '@/components/admin/modals/ReportAccount';
import EyeButton from '@/commonUI/TableActionButtons/EyeButton';
import MessageButton from '@/commonUI/TableActionButtons/MessageButton';
import { getAllLawyersFilteredForAdmin } from '../../../../../../lib/adminapi';
import { getAllCountries, getSingleLawyerDetails } from '../../../../../../lib/frontendapi';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Pagination from '@/commonUI/Pagination';
import Image from 'next/image';
import AuthContext from '@/context/AuthContext';
import { formatDateToDDMMYYYYMM } from '@/app/[locale]/commonfunctions/commonfunctions';

export default function lawyers() {
	const { user } = useContext(AuthContext)
	const [user_id, setUserId] = useState('');
	const [filter_lawyer, SetFilterLawyer] = useState([]);
	const [viewProfile, setViewProfile] = useState(false);
	const [sendMessage, setSendMessage] = useState(false);
	const [reportAccount, setReportAccount] = useState(false);
	const [name, setName] = useState('');
	const [location, setLocation] = useState('');
	const [gender, setGender] = useState('');
	const [plan, setPlan] = useState('');
	const [firmname, setFirmname] = useState('');
	const [status, setStatus] = useState('active');
	const [allCountries, setCountries] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPageStr = process.env.NEXT_PUBLIC_ITEM_PER_PAGE ?? '0';
	const itemsPerPage = parseInt(itemsPerPageStr, 10); // Parse to an integer with base 10

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentLawyer = filter_lawyer.slice(startIndex, endIndex);
	const totalPages = Math.ceil(filter_lawyer.length / itemsPerPage);

	const [single_lawyer, setSingleLawyerData] = useState<any>('');
	const [lawyer_current_plan, setLawyerCurrentPlan] = useState<any>('');

	const [lawyer_id, setLawyerId] = useState('');

	useEffect(() => {
		if (user) {
			user?.id ? setUserId(user?.id) : setUserId('');
			getAllCountriesData();
			handleChange('status', 'active', user?.id);
		}
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
			case 'gender':
				setGender(value);
				break;
			case 'plan':
				setPlan(value);
				break;
			default:
				break;
		}

		const data = {
			name: inputName === 'name' ? value : name,
			location: inputName === 'location' ? value : location,
			gender: inputName === 'gender' ? value : gender,
			plan: inputName === 'plan' ? value : plan,
			status: status,
			user_id: user_id
		};

		getAllLawyersFilteredForAdminData(data);
	};

	const getAllLawyersFilteredForAdminData = async (data: any) => {
		try {
			const response = await getAllLawyersFilteredForAdmin(data);
			if (response.status == true) {
				SetFilterLawyer(response.lawyers);

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
				setLawyerCurrentPlan(plan);
				setViewProfile(true);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const closeReportPopup = () => {
		setReportAccount(false);
		handleChange('status', 'active', user_id);
	};

	const closeLawyerProfile = () => {
		setViewProfile(false);
		handleChange('status', 'active', user_id);
	};

	const closeSendMessagePopup = () => {
		setSendMessage(false);
		handleChange('status', 'active', user_id);
	};

	return (
		<div>
			<div className="form-part mt-2">
				<div className="row align-items-center g-3">
					<div className="col-sm-6 col-md-6 col-lg-3">
						<div className="icon-fild icon-g p-set position-relative">
							<input
								type="text"
								placeholder="Search for a lawyer"
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
						<select
							className="form-fild  w-100"
							value={gender}
							onChange={e => handleChange('gender', e.target.value, user_id)}
						>
							<option value={''}>Select Gender</option>
							<option value={'male'}>Male</option>
							<option value={'female'}>Female</option>
							<option value={'other'}>Other</option>
						</select>
					</div>
					<div className="col-sm-6 col-md-6 col-lg-3">
						<select
							className="form-fild  w-100"
							value={plan}
							onChange={e => handleChange('plan', e.target.value, user_id)}
						>
							<option value={''}>Select Plan</option>
							<option value={'monthly'}>Monthly</option>
							<option value={'Gold plan (yearly)'}>Yearly</option>
							<option value={'Not purchased'}>Not Purchased</option>
						</select>
					</div>
				</div>
			</div>

			<p className="font-small weight-light social-link mt-3 mb-3">
				Displaying <span className="span-color-dash weight-bold">{filter_lawyer.length}</span> lawyers
			</p>

			<div className="table-part">
				<Table columns={['Name', 'Designation', 'Plan', 'Last Online', 'Actions']} data={currentLawyer}>
					{(rowData, index) => (
						<tr key={index}>
							<td data-th="Name">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip className="in" id="tooltip-top" > {rowData.full_name} </Tooltip>}>
									<span onClick={() => handleSingleLawyerDetails(rowData?.id, rowData?.plan_name)}
										style={{ cursor: 'pointer' }}>
										{rowData.full_name && rowData.full_name.length > 50
											? rowData.full_name.substring(0, 50) + '...'
											: rowData.full_name}
									</span>
								</OverlayTrigger>
							</td>
							<td data-th="Designation">
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip className="in" id="tooltip-top" > {rowData.designation} </Tooltip>}>
									<span>
										{rowData.designation && rowData.designation.length > 30
											? rowData.designation.substring(0, 30) + '...'
											: rowData.designation}
									</span>
								</OverlayTrigger>
								<br />
								<OverlayTrigger
									placement="top"
									delay={{ show: 250, hide: 400 }}
									overlay={<Tooltip className="in" id="tooltip-top" > {rowData.company_name} </Tooltip>}>
									<span className="font-x-small text-sonic-silver weight-light" >
										{/* {rowData.company_name && rowData.company_name.length > 30
											? rowData.company_name.substring(0, 30) + '...'
											: rowData.company_name} */}

										{rowData.firm_name && rowData.firm_name.length > 30
											? rowData.firm_name.substring(0, 30) + '...'
											: rowData.firm_name}
									</span></OverlayTrigger>
							</td>
							<td data-th="Plan">

								<button className="monthly">
									{/* {rowData.plan_name == 'monthly'
										? 'Monthly'
										: rowData.plan_name == 'quarterly'
											? 'Quarterly'
											: 'Not Purchased'} */}
									{rowData.plan_name}
								</button>
							</td>
							<td data-th="Last Online">
								<p className="font-x-small social-link weight-medium">
									{formatDateToDDMMYYYYMM(rowData.last_seen)}
								</p>
							</td>
							<td data-th="Actions" className="text-right">
								<EyeButton
									onClick={() => handleSingleLawyerDetails(rowData?.id, rowData?.plan_name)}
									Tooltip="View Profile"
								/>

								<MessageButton
									Tooltip={'Send Message'}
									onClick={() => {
										setSendMessage(true);
										setLawyerId(rowData?.id);
									}}
								/>
								<DropDown align={'end'} label={<i className="fa-solid fa-ellipsis"></i>}>
									<ul>
										<li>
											<Link href={`/find-a-lawyer/${rowData.slug}`} target="_blank">
												View Public Profile
											</Link>
										</li>
										<li>
											<Link
												href={''}
												onClick={() => {
													setReportAccount(true);
													setLawyerId(rowData?.id);
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
				show={viewProfile}
				onCancel={() => setViewProfile(false)}
				onOk={() => setViewProfile(false)}
				footer={false}
			>
				<LawyerProfile
					single_lawyer={single_lawyer}
					lawyer_current_plan={lawyer_current_plan}
					closeLawyerProfile={closeLawyerProfile}
				/>
			</Popup>

			<Popup
				title="Send Message"
				show={sendMessage}
				size="sm"
				okText="Report"
				footer={false}
				onCancel={() => setSendMessage(false)}
				onOk={() => setSendMessage(false)}
			>
				<SendMessage lawyerId={lawyer_id} closeSendMessagePopup={closeSendMessagePopup} />
			</Popup>

			<Popup
				title="Report Account"
				show={reportAccount}
				size="sm"
				footer={false}
				onCancel={() => setReportAccount(false)}
				onOk={() => setReportAccount(false)}
			>
				<ReportAccount lawyerId={lawyer_id} closeReportPopup={closeReportPopup} />
			</Popup>
		</div>
	);
}
