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
import { PatternFormat } from "react-number-format";


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
		const userId = Cookies.get('userId')
		if (user)
			fetchAdminSettingData(user?.id || userId);
	}, [user]);

	// useEffect(() => {
	// 	const userId = Cookies.get('userId')
	// 	alert(userId)
	// 	fetchAdminSettingData(userId);
	// }, []);

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
		// if (!formData.designation) {
		// 	newErrors.designation = 'Designation is required';
		// }
		// if (!selectedLawFirmId) {
		// 	newErrors.firm_id = 'Law firm is required';
		// }
		// if (!formData.jurisdiction_id) {
		// 	newErrors.jurisdiction_id = 'Jurisdiction is required';
		// }
		if (!formData.service_id) {
			newErrors.service_id = 'Profession is required';
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
				user_id: id || user?.id,
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


	// const handlePhoneChange = (value, country, e, formattedValue) => {
	// 	// Remove any non-digit characters
	// 	const cleanedValue = value.replace(/\D/g, '');

	// 	// For US numbers, we expect exactly 10 digits (without country code)
	// 	if (cleanedValue.length <= 10) {
	// 		setPhoneNumber(cleanedValue);
	// 		setIsValid(cleanedValue.length === 10);
	// 	}
	// };

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
								<span>A bit about your</span> professional career
							</h1>
							<p className="p-text-label">
								Please share information about your professional career with us. This will help clients reach
								you easily.
							</p>
							<form className="commanclassall" id="paymentform" onSubmit={handleSubmit}>
								<div className="row">
									<div className="col-md-12">

									</div>

									<div className="col-md-12">
										<div className="form-group">
											<label htmlFor="exampleInputEmail1" className="pb-2 ">
												Profession
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
													<option value="">Select Profession</option>
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
											<label htmlFor="exampleInputEmail1" className="pb-2  d-block">
												Contact Number*
											</label>
											{/* <ReactPhoneInput
												inputClass="form-control"
												value={formData.phone_number}
												country={"us"}
												onChange={value => setFormData({ ...formData, phone_number: value })}
											/> */}
											<PatternFormat
												className="form-control"
												format="(###) ###-####"
												mask="_"
												allowEmptyFormatting={false}
												value={formData.phone_number}
												placeholder="(201) 555-0123"
												onValueChange={(values) => {
													setFormData({ ...formData, phone_number: values.value });
													// values.value gives plain digits like "2125551234"
													// values.formattedValue gives "(212) 555-1234"
												}}
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
													value="female"
													disabled
												>
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
