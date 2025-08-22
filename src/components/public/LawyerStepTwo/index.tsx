'use client';
import { useState, useEffect, useContext } from 'react'; // Import useState
import React from 'react';
import { ArrowSmallLeftIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/navigation';
import {
	getAllCountries,
	getAllJurisdictions,
	getAllServices,
	getSingleUserDetails,
	getFirmByNameSearch,
	getAdminSettingData,
	getAllFirmsData
} from '../../../../lib/frontendapi';
import { updateLaywerData } from '../../../../lib/lawyerapi';
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Link from 'next/link';
import { toast } from 'react-toastify';
import AuthContext from '@/context/AuthContext';
import Cookies from 'js-cookie';
import Popup from '@/commonUI/Popup';
import AddFirmLawyer from '@/components/lawyer/Popup/AddFirmLawyer';


interface FormData {
	license_number: string;
	designation: string;
	law_firm_name: string;
	jurisdiction_id: string;
	service_id: string;
	phone_number: string;
	location: string;
	gender: string;
	profile_status: string;
}

export default function LawyerStepTwo() {
	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = () => {
		setIsFocused(false);
	};

	const { user } = useContext(AuthContext)
	const router = useRouter();

	const [formData, setFormData] = useState<FormData>({
		license_number: '',
		designation: '',
		law_firm_name: '',
		jurisdiction_id: '', // Assign a default number value here
		phone_number: '',
		location: '', // Assign a default number value here
		gender: 'female',
		service_id: '', // Assign a default number value here
		profile_status: ''
	});

	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [user_id, setUserId] = useState('');
	const [allcountries, setCountries] = useState([]);
	const [alljurisdictions, setJurisdictions] = useState([]);
	const [allservices, setServices] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [addNewfirm, setaddNewFirm] = useState(false);
	const [lawFirmName, setLawFirmName] = useState('');
	const [lawFirmSuggestions, setLawFirmSuggestions] = useState([]);
	const [selectedLawFirmId, setSelectedLawFirmId] = useState('');
	const [showLawFirmSuggestions, setShowLawFirmSuggestions] = useState(false);
	const [isSearchResultsEmpty, setIsSearchResultsEmpty] = useState(false);
	const [settings, SetAdminSetting] = useState<any>({});
	const [firmDetails, setFirmDetails] = useState(null);

	useEffect(() => {
		if (user)
			fetchAdminSettingData(user?.id);
		fetchFirmDetails()
	}, [user]);

	const fetchAdminSettingData = async (user_id: any) => {
		try {
			const res = await getAdminSettingData(user_id);
			if (res.status == true) {
				SetAdminSetting(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const fetchFirmDetails = async () => {
		try {
			const response = await getAllFirmsData();
			if (response.status === true) {
				setFirmDetails(response.data);
			}
		} catch (error) {
			console.error('Error fetching firm details:', error);
		}
	};

	useEffect(() => {
		getAllCountriesData();
		getAllJurisdictionsData();
		getAllServicesData();
		if (user) {
			if (user?.role == 'professional') {
				user?.role ? setUserId(user?.id) : setUserId('');
				getSingleUserDetailsData(user?.id);
			} else {
				router.push('/auth/login');
			}
		}
	}, [user]);

	const getSingleUserDetailsData = async (id: any) => {
		try {
			const res = await getSingleUserDetails(id);
			if (res.status == true) {
				setFormData({
					...formData,
					license_number: res.data.license_number,
					designation: res.data.designation,
					law_firm_name: res.data.law_firm_name,
					phone_number: res.data.phone_number,
					gender: res.data.gender,
					location: res.data.location_id,
					jurisdiction_id: res.jurisdiction_id,
					service_id: res.service_id
				});
			}
		} catch (err) {
			console.log(err);
		}
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

	const getAllJurisdictionsData = async () => {
		try {
			const res = await getAllJurisdictions();
			if (res.status == true) {
				setJurisdictions(res.data);
			}
		} catch (err) {
			console.log(err);
		}
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

	function validateForm() {
		const newErrors: { [key: string]: string } = {};
		// if (!formData.license_number) {
		// 	newErrors.license_number = 'License number is required';
		// }
		if (!formData.designation) {
			newErrors.designation = 'Designation is required';
		}
		// if (!selectedLawFirmId) {
		// 	newErrors.firm_id = 'Law firm is required';
		// }
		// if (!formData.jurisdiction_id) {
		// 	newErrors.jurisdiction_id = 'Jurisdiction is required';
		// }
		if (!formData.service_id) {
			newErrors.service_id = 'Service is required';
		}
		if (!formData.phone_number) {
			newErrors.phone_number = 'Phone number is required';
		}
		if (!formData.location) {
			newErrors.location = 'Location is required';
		}
		// if (!formData.gender) {
		// 	newErrors.gender = 'Gender is required';
		// }

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
		const isValid = validateForm();
		if (isValid) {
			const id = Cookies.get("userId")
			const data = {
				user_id: id,
				license_number: formData.license_number,
				designation: formData.designation,
				law_firm_name: formData.law_firm_name,
				jurisdiction_id: formData.jurisdiction_id,
				service_id: formData.service_id,
				phone_number: formData.phone_number,
				location: formData.location,
				// gender: formData.gender,
				gender: 'female',
				firm_id: selectedLawFirmId,
				firm_owner: selectedLawFirmId ? true : false,
				profile_status: '',
			};
			if (settings.payment_membership === 'false') {
				data.profile_status = 'completed';
			} else {
				data.profile_status = 'payment-step';
			}
			updateLaywerData(data)
				.then(res => {
					if (res.status == true) {
						toast.success(res.message);
						if (formData.gender == 'female') {
							window.localStorage.setItem('gender', 'female');
						}
						setTimeout(async () => {
							const res = await getAdminSettingData(user_id);

							if (res.status == true) {
								SetAdminSetting(res.data);
								if (res.data.payment_membership === 'false') {
									router.push('/auth/professional/verify-otp');
									Cookies.set('membership', 'false')
								} else {
									router.push('/auth/professional/choose-pricing-plan');
									Cookies.set('membership', 'true')
								}
							}

							// router.push('/auth/professional/choose-pricing-plan');
							// router.push('/auth/professional/verify-otp');
						}, 1000);
					} else {
						toast.error(res.message);
					}
				})
				.catch(err => {
					if (err.response) {
						toast.error('An error occurred during registration');
					}
				})
				.finally(() => {
					setTimeout(() => {
						setIsLoading(false);
					}, 1000);
				});
		} else {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		if (lawFirmName.trim() !== '') {
			getFirmSuggestions(lawFirmName);
		} else {
			setLawFirmSuggestions([]);
		}

	}, [lawFirmName]);

	const defaultName = (data: any) => {
		setLawFirmName(data.inserted_id)
	}

	const getFirmSuggestions = async (firmName: any) => {
		try {
			const trimmedFirmName = firmName.trim();
			if (trimmedFirmName !== '') {
				const response = await getFirmByNameSearch({ p_firm_name: trimmedFirmName });
				if (response.status === 'success') {
					const filteredSuggestions = response.data.filter((firm: any) =>
						firm.firm_name.toLowerCase().includes(trimmedFirmName.toLowerCase())
					);
					setLawFirmSuggestions(filteredSuggestions);
					setIsSearchResultsEmpty(filteredSuggestions.length === 0);
				} else {
					console.error('Error fetching law firm suggestions:', response.message);
				}
			} else {
				setLawFirmSuggestions([]);
				setIsSearchResultsEmpty(false);
			}
		} catch (error) {
			console.error('Error fetching law firm suggestions:', error);
		}
	};

	const handleFirmSelection = (firmId: any, firmName: any) => {
		setSelectedLawFirmId(firmId);
		setLawFirmName(firmName);
		setShowLawFirmSuggestions(false);
	};



	return (
		<>
			<div className="auth-page-wrapper" id="stepTwo">
				<Link href="/auth/choose-profile" className="backtobtn">
					<ArrowSmallLeftIcon width={20} />
					Back
				</Link>
				<div className="row">
					<div className="">
						<div className="main-login">
							<h1>
								<span>A bit about your</span> legal career
							</h1>
							<p className="p-text-label">
								Please share information about your legal career with us. This will help clients reach
								you easily.
							</p>
							<form className="commanclassall" id="paymentform" onSubmit={handleSubmit}>
								<div className="row">
									<div className="col-md-12">
										<div className="form-group">
											<label htmlFor="exampleInputEmail1" className="pb-2">
												License Number
											</label>
											<input
												type="text"
												className="form-control"
												value={formData.license_number}
												maxLength={30}
												onChange={e =>
													setFormData({
														...formData,
														license_number: e.target.value
													})
												}
											/>
											{/* {errors.license_number && (
												<small className="error-message text-danger d-block">
													{errors.license_number}
												</small>
											)} */}
										</div>
									</div>
									<div className="col-md-12">
										<div className="form-group">
											<label htmlFor="exampleInputEmail1" className="pb-2 ">
												Designation*
											</label>
											<input
												type="text"
												className="form-control"
												placeholder="Your position (eg. Partner, Associate, etc...)"
												value={formData.designation}
												maxLength={50}
												onChange={e =>
													setFormData({
														...formData,
														designation: e.target.value
													})
												}
											/>
											{errors.designation && (
												<small className="error-message text-danger d-block">
													{errors.designation}
												</small>
											)}
										</div>
									</div>
									{/* <div className="col-md-12">
										<div className="form-group">
											<label htmlFor="exampleInputEmail1" className="pb-2 ">
												Name*
											</label>
											<input
												type="text"
												id="lawFirmName"
												className="form-control"
												placeholder="Type to search law firm name"
												value={lawFirmName}
												onChange={(e) => setLawFirmName(e.target.value)}
												onFocus={() => setShowLawFirmSuggestions(true)}
											/>
											<div className={`select-firm ${isFocused ? 'visible' : ''}`}>
												{showLawFirmSuggestions && (
													<div className={`select-firm ${isFocused ? 'visible' : ''}`}>
														{lawFirmSuggestions.length > 0 ? (
															<ul style={{ cursor: 'pointer' }}>
																{lawFirmSuggestions.map((firm: any) => (
																	<li key={firm.id} onClick={() => handleFirmSelection(firm.id, firm.firm_name)}>
																		{firm.firm_name}
																	</li>
																))}
															</ul>
														) : (
															<>
																{isSearchResultsEmpty && (
																	<div>
																		Legal firm not listed?{' '}
																		<span onClick={() => {
																			setaddNewFirm(true);
																		}} style={{ cursor: 'pointer' }}>Click here to add them</span>
																	</div>
																)}
															</>
														)}
													</div>
												)}

											</div>
											{selectedLawFirmId && <input type="hidden" value={selectedLawFirmId} />}

											{errors.firm_id && (
												<small className="error-message text-danger d-block">
													{errors.firm_id}
												</small>
											)}
										</div>
									</div> */}
									{/* <div className="col-md-12">
										<div className="form-group">
											<label htmlFor="exampleInputEmail1" className="pb-2 ">
												Jurisdiction*
											</label>
											<div className="select-wrapper">
												<select
													className="select bg-white"
													value={formData.jurisdiction_id}
													onChange={e =>
														setFormData({
															...formData,
															jurisdiction_id: e.target.value
														})
													}
												>
													<option value="">Select Jurisdiction</option>
													{alljurisdictions.map((jurisdiction: any) => (
														<option key={jurisdiction.id} value={jurisdiction.id}>
															{jurisdiction.jurisdiction_name}
														</option>
													))}
												</select>
												<span className="select-icon entypo-arrow-combo" />
											</div>
											{errors.jurisdiction_id && (
												<small className="error-message text-danger d-block">
													{errors.jurisdiction_id}
												</small>
											)}
										</div>
									</div> */}
									<div className="col-md-12">
										<div className="form-group">
											<label htmlFor="exampleInputEmail1" className="pb-2 ">
												Practice Area*
											</label>
											<div className="select-wrapper">
												<select
													className="select bg-white"
													value={formData.service_id}
													onChange={e =>
														setFormData({
															...formData,
															service_id: e.target.value
														})
													}
												>
													<option value="">Select Practice Area</option>
													{allservices.map((services: any) => (
														<option key={services.id} value={services.id}>
															{services.name}
														</option>
													))}
												</select>
												<span className="select-icon entypo-arrow-combo" />
											</div>
											{errors.service_id && (
												<small className="error-message text-danger d-block">
													{errors.service_id}
												</small>
											)}
										</div>
									</div>
									<div className="col-md-12">
										<div className="form-group">
											<label htmlFor="exampleInputEmail1" className="pb-2 pt-2">
												Contact Number*
											</label>
											<ReactPhoneInput
												inputClass="form-control"
												value={formData.phone_number}
												country={"us"}
												onChange={value => setFormData({ ...formData, phone_number: value })}
											/>
											{errors.phone_number && (
												<small className="error-message text-danger">
													{errors.phone_number}
												</small>
											)}
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<label htmlFor="exampleInputEmail1" className="pb-2  d-block">
												Gender*
											</label>
											<div className="bg-fff">
												<select
													className="form-fild w-100"
													// value={formData.gender}
													// onChange={e => setFormData({ ...formData, gender: e.target.value })}
													value="female"
													disabled
												>
													{/* <option value="">Select Gender</option>
													<option value="male">Male</option>
													<option value="female">Female</option>
													<option value="other">Other</option> */}
													<option value="female">Female</option>
												</select>
												<span className="select-icon entypo-arrow-combo" />
											</div>
											{errors.gender && (
												<small className="error-message text-danger d-block">
													{errors.gender}
												</small>
											)}
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<label htmlFor="exampleInputEmail1" className="pb-2 ">
												Location*
											</label>
											<div className="bg-fff">
												<select
													className="form-fild w-100"
													value={formData.location}
													onChange={e => setFormData({ ...formData, location: e.target.value })}
												>
													<option value="">Select Location</option>
													{allcountries.map((countries: any) => (
														<option key={countries.id} value={countries.id}>
															{countries.name}
														</option>
													))}
												</select>
												<span className="select-icon entypo-arrow-combo" />
											</div>
											{errors.location && (
												<small className="error-message text-danger d-block">
													{errors.location}
												</small>
											)}
										</div>
									</div>
								</div>

								<button
									type="submit"
									className="btn btn-outline-success text-center btn-lawyer mt-3 w-100"
								>
									{!isLoading ? 'Continue' : 'Please wait...'}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div >
			<Popup
				size="lg"
				show={addNewfirm}
				className="create-tags"
				title="Add a Firm"
				onCancel={() => setaddNewFirm(false)}
				onOk={() => setaddNewFirm(false)}
				footer={false}
			>
				<AddFirmLawyer latestId={(data: any) => defaultName(data)} firmId={undefined} firmdata={undefined} firmDetails={firmDetails} onCancel={() => { setaddNewFirm(false) }} />
			</Popup>
		</>
	);
}
