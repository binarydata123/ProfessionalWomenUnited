'use client';
import { useState, useEffect, useContext } from 'react'; // Import useState
import './edit-page.css';
import ReactPhoneInput from 'react-phone-input-2';
import { RiCloseLine } from 'react-icons/ri';
import {
	getAllCountries,
	getAllJurisdictions,
	getAllServices,
	getSingleUserDetails,
	getLawyerMemberPracticeData
} from '../../../../../../../../lib/frontendapi';

import {
	getAllSpecialization,
	updateLawyerByAdmin,
	removeProfilePictureByAdmin,
	getLawyerPaymentInfo,
	getAllFirms
} from '../../../../../../../../lib/adminapi';
import Popup from '@/commonUI/Popup';

import { toast } from 'react-toastify';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthContext from '@/context/AuthContext';
import dynamic from 'next/dynamic';
import { formatDateToDDMMYYYY } from '@/app/[locale]/commonfunctions/commonfunctions';

const TextEditor = dynamic(() => import('../../../../../../../commonUI/TextEditor'), {
	ssr: false
});
interface FormData {
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	gender: string;
	location: string;
	linkedin_url: string;
	license_number: string;
	acquired: string;
	status: string;
	designation: string;
	company_name: string;
	bio: string;
	jurisdiction: string;
	primary_practice_area: string;
	practice_areas: string[];
	specialization: string;
	selectedSpecializationIds: string;
	paymentMethods: any;
	hourly_rate: string;
	free_consultation_duration: string;
	profile_image: string;
	plan: string;
	firm_id: string;
}

interface Specialization {
	id: any;
	name: any;
}

export default function Page({ params }: { params: { id: string } }) {
	const { user } = useContext(AuthContext)
	const [formData, setFormData] = useState<FormData>({
		first_name: '',
		last_name: '',
		email: '',
		phone_number: '',
		gender: '',
		location: '',
		linkedin_url: '',
		license_number: '',
		acquired: '',
		status: '',
		designation: '',
		company_name: '',
		bio: '',
		jurisdiction: '',
		primary_practice_area: '',
		practice_areas: [],
		specialization: '',
		selectedSpecializationIds: '',
		hourly_rate: '',
		paymentMethods: {
			cash: false,
			bankTransfer: false,
			cheque: false
		},
		free_consultation_duration: '',
		profile_image: '',
		plan: '',
		firm_id: ''
	});

	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [user_id, setUserId] = useState('');
	const [allcountries, setCountries] = useState([]);
	const [allSpecialization, setSpecializations] = useState<Specialization[]>([]);
	const [alljurisdictions, setJurisdictions] = useState([]);
	const [allservices, setServices] = useState([]);
	const [isFreeConsultationChecked, setIsFreeConsultationChecked] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
	const [image, setImage] = useState('');
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [profileimagecheck, setPofileImageCheck] = useState(false);
	const [deleteImagePopop, setdeleteImagePopop] = useState(false);
	const [payment_details, setPaymentDetails] = useState<any>({});
	const [allfirmName, setAllfirmName] = useState([]);

	const router = useRouter();

	useEffect(() => {
		if (user)
			user?.id ? setUserId(user?.id) : setUserId('');

		getAllCountriesData();
		getAllJurisdictionsData();
		getAllServicesData();
		hnadleGetAllSpecialization(user?.id);
		getSingleUserDetailsData(params.id);
		getAllLawyerMemberPracticeData(params.id);
		fetchLawyerPaymentInfo(user?.id, params.id);
		getfirmsNameData();
	}, []);

	const getSingleUserDetailsData = async (id: any) => {
		try {
			const res = await getSingleUserDetails(id);
			if (res.status == true) {
				setFormData({
					...formData,
					first_name: res.data.first_name,
					last_name: res.data.last_name,
					email: res.data.email,
					phone_number: res.data.phone_number,
					gender: res.data.gender,
					linkedin_url: res.data.linkedin_url,
					license_number: res.data.license_number,
					acquired: res.data.acquired,
					status: res.data.status,
					designation: res.data.designation,
					company_name: res.data.company_name,
					firm_id: res.data.firm_id,
					bio: res.data.bio,
					selectedSpecializationIds: res.data.specialization_id,
					location: res.data.location_id,
					jurisdiction: res.jurisdiction_id,
					primary_practice_area: res.service_id,
					free_consultation_duration: res.data.consultation_duration,
					hourly_rate: res.data.hourly_rate_range,
					paymentMethods: {
						cash: res.data.payment_method == 'cash' ? true : false,
						bankTransfer: res.data.payment_method == 'bank transfer' ? true : false,
						cheque: res.data.payment_method == 'cheque' ? true : false
					}
				});

				if (res.data.profile_image) {
					setImagePreview(`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/profile/${res.data.profile_image}`);
					setPofileImageCheck(true);
				}

				// fetch specialization of user
				const defaultSpecialization = res.data.specialization_id.split(',').map(Number);
				setSelectedOptions(defaultSpecialization);

				setIsFreeConsultationChecked(res.data.consultation_duration === null ? false : true);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const fetchLawyerPaymentInfo = async (userId: any, lawyerid: string) => {
		try {
			const res = await getLawyerPaymentInfo(userId, lawyerid);
			if (res.status == true) {
				setPaymentDetails(res.data);

				setFormData(prevFormData => ({
					...prevFormData,
					plan: res.data.plan_type
				}));
			} else {
				setPaymentDetails('');
			}
		} catch (err) {
			console.log(err);
		}
	};

	const getAllLawyerMemberPracticeData = async (user_id: any) => {
		try {
			const res = await getLawyerMemberPracticeData(user_id);
			if (res.status == true) {
				// setCountries(res.data);

				const dataToProcess = res.data.slice(1);

				if (dataToProcess.length > 0) {
					const selectedPracticeAreas = dataToProcess.map((data: any) => data.service_id);

					setFormData(prevFormData => ({
						...prevFormData,
						practice_areas: selectedPracticeAreas
					}));
				}
			}
		} catch (err) {
			console.log(err);
		}
	};
	const getfirmsNameData = async () => {
		try {
			const data = {
				user_id: user?.id
			}
			const res = await getAllFirms(data);
			if (res.status === "success") {
				setAllfirmName(res.data);
			} else {
				console.error("Failed to fetch firms:", res);
			}
		} catch (err) {
			console.error("Error fetching firms:", err);
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

	const hnadleGetAllSpecialization = async (id: any) => {
		try {
			const res = await getAllSpecialization(id);
			if (res.status == true) {
				setSpecializations(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	function validateForm() {
		const newErrors: { [key: string]: string } = {};
		if (!formData.first_name) {
			newErrors.first_name = 'First name is required';
		}
		if (!formData.last_name) {
			newErrors.last_name = 'Last name is required';
		}
		if (!formData.email) {
			newErrors.email = 'Email is required';
		}

		if (!formData.phone_number) {
			newErrors.phone_number = 'Phone number is required';
		}
		if (!formData.gender) {
			newErrors.gender = 'Gender is required';
		}
		if (!formData.location) {
			newErrors.location = 'Location is required';
		}
		if (!formData.license_number) {
			newErrors.license_number = 'License number is required';
		}
		if (!formData.acquired) {
			newErrors.acquired = 'Acquired is required';
		} else if (!/^\d{4}$/.test(formData.acquired)) {
			newErrors.acquired = 'Enter a valid year';
		}
		if (!formData.status) {
			newErrors.status = 'Status is required';
		}
		if (!formData.designation) {
			newErrors.designation = 'Designation is required';
		}
		// if (!formData.firm_id) {
		// 	newErrors.firm_id = 'Company name is required';
		// }
		if (!formData.bio) {
			newErrors.bio = 'Bio is required';
		}
		// if (!formData.jurisdiction) {
		// 	newErrors.jurisdiction = 'Jurisdiction is required';
		// }
		if (!formData.primary_practice_area) {
			newErrors.primary_practice_area = 'Profession is required';
		}

		if (isFreeConsultationChecked) {
			if (!formData.hourly_rate) {
				newErrors.hourly_rate = 'hourly rate is required';
			} else if (!/^\d+$/.test(formData.hourly_rate)) {
				newErrors.hourly_rate = 'Hourly rate must be a number';
			}
			if (
				!formData.paymentMethods.cash &&
				!formData.paymentMethods.bankTransfer &&
				!formData.paymentMethods.cheque
			) {
				newErrors.paymentMethods = 'Select at least one payment method';
			}
			if (!formData.free_consultation_duration) {
				newErrors.free_consultation_duration = 'Consultation duration is required';
			}
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
				id: params.id,
				user_id: user_id,
				first_name: formData.first_name,
				last_name: formData.last_name,
				phone_number: formData.phone_number,
				gender: formData.gender,
				location: formData.location,
				linkedin_url: formData.linkedin_url,
				license_number: formData.license_number,
				acquired: formData.acquired,
				status: formData.status,
				designation: formData.designation,
				company_name: formData.company_name,
				firm_id: formData.firm_id,
				bio: formData.bio,
				jurisdiction: formData.jurisdiction,
				primary_practice_area: formData.primary_practice_area,
				practice_areas: formData.practice_areas,
				specialization: formData.selectedSpecializationIds,
				paymentMethods: isFreeConsultationChecked
					? Object.keys(formData.paymentMethods)
						.filter(method => formData.paymentMethods[method])
						.join(', ')
					: '',
				free_consultation_duration: isFreeConsultationChecked ? formData.free_consultation_duration : '',
				hourly_rate: isFreeConsultationChecked ? formData.hourly_rate : '',
				profile_image: image,
				plan: formData.plan
			};

			updateLawyerByAdmin(data)
				.then(res => {
					if (res.status == true) {
						toast.success(res.message);
						setTimeout(function () {
							router.push('/admin/settings/roles-and-permissions');
							setIsLoading(false);
						}, 2000);
					} else {
						toast.error(res.message);
						setIsLoading(false);
					}
				})
				.catch(err => {
					if (err.response && err.response.data && err.response.data.errors) {
						const errors = err.response.data.errors;
						if (errors.email) {
							toast.error(errors.email[0]);
						} else {
							toast.error('An error occurred while creating a new lawyer');
						}
					} else {
						toast.error('An error occurred during while creating a new lawyer');
					}
					setIsLoading(false);
				});
		} else {
			setIsLoading(false);
		}
	}

	function addPracticeArea(event: any) {
		event.preventDefault();
		if (formData.practice_areas.length < 3) {
			const newPracticeAreas = [...formData.practice_areas, ''];
			setFormData({
				...formData,
				practice_areas: newPracticeAreas
			});
		} else {
			toast.error('Maximum 3 Profession can be added.');
		}
	}

	function handlePracticeAreaChange(index: number, value: string) {
		const newPracticeAreas = [...formData.practice_areas];
		newPracticeAreas[index] = value;
		setFormData({
			...formData,
			practice_areas: newPracticeAreas
		});
	}

	function removePracticeArea(index: number) {
		const newPracticeAreas = [...formData.practice_areas];
		newPracticeAreas.splice(index, 1);
		setFormData({
			...formData,
			practice_areas: newPracticeAreas
		});
	}

	const practiceAreaInputs = formData.practice_areas.map((area, index) => (
		<div key={index}>
			<label className="font-small  weight-medium text-sonic-silver w-100 mt-4 d-flex justify-content-between">
				Profession {index + 1}
				<span className="remove-spcl log-red" onClick={() => removePracticeArea(index)}>
					Remove
				</span>
			</label>
			<select
				className="form-fild  w-100"
				value={area}
				name=""
				onChange={e => handlePracticeAreaChange(index, e.target.value)}
			>
				<option value="">Select Profession</option>
				{allservices.map((services: any) => (
					<option key={services.id} value={services.id}>
						{services.name}
					</option>
				))}
			</select>
			{errors.primary_practice_area && (
				<small className="error-message text-danger d-block">{errors.primary_practice_area}</small>
			)}
		</div>
	));

	const options = allSpecialization.map(item => ({
		id: item.id,
		value: item.name
	}));

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		// alert(e.target.value)
		const { name, value } = e.target;
		setFormData(prevFormData => ({
			...prevFormData,
			[name]: value
		}));
	};

	const handleOptionClick = (option: { id: number; value: string }) => {
		if (selectedOptions.includes(option.id)) {
			toast.error('Option already selected');
		} else if (selectedOptions.length >= 5) {
			toast.error('You can only select up to 5 specialization');
		} else {
			const updatedSelectedOptions = [...selectedOptions, option.id];
			setSelectedOptions(updatedSelectedOptions);

			const selectedSpecializationIds = updatedSelectedOptions.join(',');
			setFormData(prevFormData => ({
				...prevFormData,
				selectedSpecializationIds,
				specialization: ''
			}));
		}
	};

	const handleRemoveOption = (index: number) => {
		const updatedOptions = [...selectedOptions];
		updatedOptions.splice(index, 1);

		const selectedSpecializationIds = updatedOptions.join(',');
		setSelectedOptions(updatedOptions);
		setFormData(prevFormData => ({
			...prevFormData,
			selectedSpecializationIds
		}));
	};

	const handleFileInputChange = (event: any) => {
		event.preventDefault();

		const selectedFile = event.target.files[0];
		setImage(selectedFile);
		setPofileImageCheck(false);
		if (selectedFile.type.includes('image')) {
			// Check if a new blog image is selected and set the appropriate states
			if (selectedFile) {
				setImagePreview(URL.createObjectURL(selectedFile));
			}
		} else {
			toast.error('Please upload an valid image file (JPEG,JPG,PNG).');
		}
	};

	const handleRemoveProflePic = async () => {
		try {
			const response = await removeProfilePictureByAdmin(params.id, user_id);
			if (response.status === true) {
				setdeleteImagePopop(false);
				toast.success('Profile image successfully removed');
				setImagePreview('');
				setPofileImageCheck(false);
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		} finally {
			setdeleteImagePopop(false);
		}
	};

	const handleDescriptionChange = (newValue: string) => {
		setFormData(prevFormData => ({
			...prevFormData,
			bio: newValue
		}));
	};


	return (
		<div className="edit-profile-wrapper">
			<div className="right-body p-0">
				<form onSubmit={handleSubmit}>
					<h5 className="font-x-large22 weight-bold green-dark" id="basic-information">
						Basic Information
					</h5>
					<div className="row mt-2">
						<div className="col-lg-12 col-xl-8">
							<div className="profile-picture">
								<p className="font-small  weight-medium text-sonic-silver mt-2">Profile Picture</p>
								<div className="row mb-3 align-items-center">
									<div className="col-sm-2 col-3 pr-0 mt-1">
										{imagePreview ? (
											<Image
												src={imagePreview}
												alt="Preview"
												className="mt-2"
												height={100}
												width={100}
												style={{ objectFit: 'contain' }}
											/>
										) : (
											<Image
												src={
													process.env.NEXT_PUBLIC_IMAGE_URL +
													'/images/default/Profile Avatar.png'
												}
												height={100}
												width={100}
												alt="Preview"
												style={{ objectFit: 'contain' }}
												className="img-circle"
											/>
										)}
									</div>
									<div className="col-sm-10 col-9">
										<div className="file-btn-upload  d-md-flex">
											<input type="file" className="file-up" onChange={handleFileInputChange} />
											<button className="bg-893168 weight-semi-bold font-small save-pad">
												<img
													src="/images/gallery-add.png"
													alt="Upload Icon"
													className="img-set"
													onChange={handleFileInputChange}
												/>{' '}
												&nbsp; Upload Picture
											</button>{' '}
											{profileimagecheck && (
												<button
													className="bg-893168 weight-semi-bold font-small ml-2"
													onClick={() => setdeleteImagePopop(true)}
													type="button"
												>
													Remove Picture
												</button>
											)}
										</div>
									</div>
								</div>

								<label className="font-small  weight-medium text-sonic-silver w-100 pb-2">
									First Name
								</label>
								<input
									type="text"
									placeholder="Sara"
									className="form-fild  w-100"
									value={formData.first_name}
									onChange={e => setFormData({ ...formData, first_name: e.target.value })}
								/>
								{errors.first_name && (
									<small className="error-message text-danger d-block">{errors.first_name}</small>
								)}
								<label className="font-small  weight-medium text-sonic-silver w-100 mt-4 pb-2">
									Last Name
								</label>
								<input
									type="text"
									placeholder="Ali"
									className="form-fild  w-100"
									value={formData.last_name}
									onChange={e => setFormData({ ...formData, last_name: e.target.value })}
								/>
								{errors.last_name && (
									<small className="error-message text-danger d-block">{errors.last_name}</small>
								)}
								<label className="font-small  weight-medium text-sonic-silver w-100 mt-4 pb-2">
									Email ID
								</label>
								<input
									type="email"
									placeholder="sara.ali@gmail.com"
									className="form-fild  w-100"
									value={formData.email}
									disabled
									style={{ backgroundColor: '#E0E0E0' }}
									onChange={e => setFormData({ ...formData, email: e.target.value })}
								/>
								{errors.email && (
									<small className="error-message text-danger d-block">{errors.email}</small>
								)}

								<ReactPhoneInput
									containerClass="mt-3"
									placeholder="+971 12 3500 123"
									inputClass="form-fild w-100 mt-2"
									specialLabel="Contact Number"
									value={formData.phone_number}
									country={'us'}
									onChange={value => setFormData({ ...formData, phone_number: value })}
								/>
								{errors.phone_number && (
									<small className="error-message text-danger d-block">{errors.phone_number}</small>
								)}
								<div className="row">
									<div className="col-sm-6 col-6">
										<label className="font-small  weight-medium text-sonic-silver w-100 mt-4 pb-2">
											Gender
										</label>
										<select
											className="form-fild  w-100"
											value={formData.gender}
											onChange={e => setFormData({ ...formData, gender: e.target.value })}
										>
											<option value="">Select Gender</option>
											<option value="female">Female</option>
											<option value="male">Male</option>
											<option value="other">Other</option>
										</select>
										{errors.gender && (
											<small className="error-message text-danger d-block">{errors.gender}</small>
										)}
									</div>
									<div className="col-sm-6 col-6">
										<label className="font-small  weight-medium text-sonic-silver w-100 mt-4 pb-2">
											Location
										</label>
										<select
											className="form-fild  w-100"
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
										{errors.location && (
											<small className="error-message text-danger d-block">
												{errors.location}
											</small>
										)}
									</div>
								</div>

								<label className="font-small  weight-medium text-sonic-silver w-100 mt-4 pb-2">
									LinkedIn
								</label>
								<input
									type="text"
									placeholder="https://ae.linkedin.com/in/sara-ali"
									className="form-fild  w-100"
									value={formData.linkedin_url}
									onChange={e => setFormData({ ...formData, linkedin_url: e.target.value })}
								/>
								{errors.linkedin_url && (
									<small className="error-message text-danger d-block">{errors.linkedin_url}</small>
								)}
							</div>
						</div>
					</div>

					<div>
						<div className="row mt-5">
							<div className="col-sm-12">
								<h5 className="font-x-large22 weight-bold green-dark" id="professional-information">
									Professional Information
								</h5>
								<p className="font-small  weight-light text-sonic-silver mb-3">
									Tell us about your professional experience
								</p>
							</div>
							<div className="col-md-6 col-lg-12 col-xl-6">
								<div className="profile-picture">
									<label className="font-small  weight-medium text-sonic-silver w-100 pb-2">
										License Number
									</label>
									<input
										type="text"
										placeholder="4365VD"
										className="form-fild  w-100"
										value={formData.license_number}
										onChange={e => setFormData({ ...formData, license_number: e.target.value })}
									/>
									{errors.license_number && (
										<small className="error-message text-danger d-block">
											{errors.license_number}
										</small>
									)}
									<div className="row">
										<div className="col-sm-6 col-6">
											<label className="font-small  weight-medium text-sonic-silver w-100 mt-4 pb-2">
												Acquired
											</label>
											<input
												type="text"
												placeholder="Enter Year"
												className="form-fild  w-100"
												pattern="[0-9]*"
												value={formData.acquired}
												onChange={e => {
													const newValue = e.target.value.replace(/\D/g, '');
													if (newValue.length <= 4) {
														setFormData({ ...formData, acquired: newValue });
													}
												}}
												maxLength={4}
											/>
											{errors.acquired && (
												<small className="error-message text-danger d-block">
													{errors.acquired}
												</small>
											)}
										</div>
										<div className="col-sm-6 col-6">
											<label className="font-small  weight-medium text-sonic-silver w-100 mt-4 pb-2">
												Status
											</label>
											<select
												className="form-fild  w-100"
												value={formData.status}
												onChange={e => setFormData({ ...formData, status: e.target.value })}
											>
												<option value="">Select Status</option>
												<option value="active">Active</option>
												<option value="deactive">Inactive</option>
											</select>
											{errors.status && (
												<small className="error-message text-danger d-block">
													{errors.status}
												</small>
											)}
										</div>
									</div>

									<label className="font-small  weight-medium text-sonic-silver w-100 mt-4 pb-2">
										Designation
									</label>
									<input
										type="text"
										placeholder="Business Attorney"
										className="form-fild  w-100"
										value={formData.designation}
										onChange={e => setFormData({ ...formData, designation: e.target.value })}
									/>
									{errors.designation && (
										<small className="error-message text-danger d-block">
											{errors.designation}
										</small>
									)}
									{/* <label className="font-small  weight-medium text-sonic-silver w-100 mt-4 pb-2">
										Company Name
									</label>
									<select
										className="form-fild w-100"
										value={formData.firm_id}
										onChange={(e) => setFormData({ ...formData, firm_id: e.target.value })}
									>
										<option value="">Select Category</option>
										{allfirmName.map((firm: any) => (
											<option key={firm.id} value={firm.id}>
												{firm.firm_name}
											</option>
										))}
									</select>
									{errors.firm_id && (
										<small className="error-message text-danger d-block">
											{errors.firm_id}
										</small>
									)} */}
									<label className="font-small weight-medium text-sonic-silver w-100 mt-4 pb-2">
										Bio
									</label>
									{/* <textarea
										placeholder="Share your experience as a lawyer..."
										className="form-fild w-100"
										value={formData.bio}
										onChange={e => setFormData({ ...formData, bio: e.target.value })}
									/> */}
									<TextEditor
										value={formData.bio && formData.bio}
										onChange={handleDescriptionChange}
									/>
									{errors.bio && (
										<small className="error-message text-danger d-block">{errors.bio}</small>
									)}
								</div>
							</div>
						</div>
					</div>

					<br />
					<hr className="line-hr" />
					<br />

					<div className="row">
						<div className="col-md-6 col-lg-12 col-xl-6">
							<div className="profile-picture">
								<h5 className="font-x-large22 weight-bold green-dark" id="practice-area">
									Profession{' '}
								</h5>
								<p className="font-small  weight-light text-sonic-silver">
									Tell us about your professional expertise
								</p>

								{/* <label className="font-small  weight-medium text-sonic-silver w-100 mt-4 pb-2">
									Select Jurisdiction
								</label>
								<select
									className="form-fild  w-100"
									value={formData.jurisdiction}
									onChange={e => setFormData({ ...formData, jurisdiction: e.target.value })}
								>
									<option value="">Select Jurisdiction</option>
									{alljurisdictions.map((jurisdiction: any) => (
										<option key={jurisdiction.id} value={jurisdiction.id}>
											{jurisdiction.jurisdiction_name}
										</option>
									))}
								</select>
								{errors.jurisdiction && (
									<small className="error-message text-danger d-block">{errors.jurisdiction}</small>
								)} */}
								<label className="font-small  weight-medium text-sonic-silver w-100 mt-4 pb-2">
									Primary Profession
								</label>
								<select
									className="form-fild  w-100"
									value={formData.primary_practice_area}
									onChange={e =>
										setFormData({
											...formData,
											primary_practice_area: e.target.value
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
								{errors.primary_practice_area && (
									<small className="error-message text-danger d-block">
										{errors.primary_practice_area}
									</small>
								)}

								{practiceAreaInputs}
								<p className="mt-3">
									<a
										href="#"
										onClick={addPracticeArea}
										className="font-small weight-semi-bold green-medium-2 "
									>
										<i className="fa-solid fa-square-plus"></i> Add Profession{' '}
									</a>
								</p>

								<label className="font-small weight-medium text-sonic-silver w-100 mt-3 pb-2">
									Specialization
								</label>
								<div className="icon-fild p-set mt-1 position-relative">
									<input
										type="text"
										placeholder=""
										className="form-fild w-100"
										name="specialization"
										value={formData.specialization}
										onChange={handleInputChange}
									/>
									<Image
										src="/images/search-normal.svg"
										alt="search-normal"
										className="magnify-search"
										width={20}
										height={20}
									/>
								</div>

								{formData.specialization && (
									<ul className="options-list">
										{options
											.filter(option =>
												option.value
													.toLowerCase()
													.includes(formData.specialization.toLowerCase())
											)
											.map((option, index) => (
												<li key={option.id} onClick={() => handleOptionClick(option)}>
													{option.value}
												</li>
											))}
									</ul>
								)}

								<div className="selected-options">
									{selectedOptions.map((optionId, index) => {
										const selectedOption = options.find(opt => opt.id === optionId);
										return (
											<button className="btn-green mt-2 mr-1">
												{selectedOption ? selectedOption.value : ''}
												<img
													src="/images/close-square.svg"
													alt="close-square"
													className="mx-2"
													onClick={() => handleRemoveOption(index)}
												/>
											</button>
										);
									})}
								</div>
								<br />
								<br />
								<h5 className="font-x-large22 weight-bold green-dark" id="rates">
									Rates &nbsp;{' '}
								</h5>
								<p className="font-small  weight-medium text-sonic-silver mt-2"></p>

								<div className="form-fild-des class-add-checkbox">
									<div className="row mt-2">
										<div className="col-sm-12">
											<p className="text-sonic-silver weight-medium font-small mb-2">
												Do you wish to offer free consultation?
											</p>
										</div>
										<div className="col-lg-2 col-md-3">
											<label className="social-link font-small weight-medium w-100 mt-2 d-flex ">
												<input
													type="radio"
													name="freeConsultation"
													value="yes"
													className="active"
													checked={isFreeConsultationChecked}
													onChange={() => setIsFreeConsultationChecked(true)}
												/>
												<span className="checkmark mx-1"></span> Yes
											</label>
										</div>
										<div className="col-lg-2 col-md-3">
											<label className="social-link font-small weight-medium w-100 mt-2">
												<input
													type="radio"
													name="freeConsultation"
													value="no"
													className="active"
													checked={!isFreeConsultationChecked}
													onChange={() => setIsFreeConsultationChecked(false)}
												/>
												<span className="checkmark"></span> No
											</label>
										</div>
									</div>
								</div>

								{isFreeConsultationChecked && (
									<div className="free-consult-box">
										<div className="row">
											<div className="col-sm-12 pr-0">
												<label className="font-small  weight-medium text-sonic-silver w-100 mt-3 pb-2">
													Free Consultation Duration
												</label>
											</div>
											<div className="col-sm-12">
												<select
													className="form-fild w-100"
													value={formData.free_consultation_duration}
													onChange={e =>
														setFormData({
															...formData,
															free_consultation_duration: e.target.value
														})
													}
												>
													<option value="">Please select free consultation duration</option>
													<option value="15 minutes">15 minutes</option>
													<option value="30 minutes">30 minutes</option>
													<option value="45 minutes">45 minutes</option>
													<option value="60 minutes">60 minutes</option>
													<option value="120 minutes">120 minutes</option>
												</select>
												{errors.free_consultation_duration && (
													<small className="error-message text-danger d-block">
														{errors.free_consultation_duration}
													</small>
												)}
											</div>
										</div>

										<label className="font-small  weight-medium text-sonic-silver w-100 mt-4 pb-2">
											Your hourly rate
										</label>
										<input
											type="text"
											placeholder="USD"
											className="form-fild  w-100"
											value={formData.hourly_rate}
											onChange={e => setFormData({ ...formData, hourly_rate: e.target.value })}
										/>
										{errors.hourly_rate && (
											<small className="error-message text-danger d-block">
												{errors.hourly_rate}
											</small>
										)}

										<div className="form-fild-des mt-4">
											<div className="row mt-2">
												<div className="col-sm-12">
													<p className="text-sonic-silver weight-medium font-small mb-2">
														Payments Methods
													</p>
												</div>
												<div className="col-lg-3 col-md-3">
													<label className="social-link font-small weight-medium w-100 mt-2">
														<input
															type="checkbox"
															name="paymentMethods"
															value="cash"
															checked={formData.paymentMethods.cash}
															onChange={e => {
																const isChecked = e.target.checked;
																setFormData(prevData => ({
																	...prevData,
																	paymentMethods: {
																		...prevData.paymentMethods,
																		cash: isChecked
																	}
																}));
															}}
														/>
														<span className="checkmark"></span> Cash
													</label>
												</div>
												<div className="col-lg-4 col-md-3">
													<label className="social-link font-small weight-medium w-100 mt-2">
														<input
															type="checkbox"
															name="paymentMethods"
															value="bank transfer"
															checked={formData.paymentMethods.bankTransfer}
															onChange={e => {
																const isChecked = e.target.checked;
																setFormData(prevData => ({
																	...prevData,
																	paymentMethods: {
																		...prevData.paymentMethods,
																		bankTransfer: isChecked
																	}
																}));
															}}
														/>
														<span className="checkmark"></span> Bank Transfer
													</label>
												</div>
												<div className="col-lg-4 col-md-3">
													<label className="social-link font-small weight-medium w-100 mt-2">
														<input
															type="checkbox"
															name="paymentMethods"
															value="cheque"
															checked={formData.paymentMethods.cheque}
															onChange={e => {
																const isChecked = e.target.checked;
																setFormData(prevData => ({
																	...prevData,
																	paymentMethods: {
																		...prevData.paymentMethods,
																		cheque: isChecked
																	}
																}));
															}}
														/>
														<span className="checkmark"></span> Cheque
													</label>
												</div>
											</div>
											{errors.paymentMethods && (
												<small className="error-message text-danger d-block">
													{errors.paymentMethods}
												</small>
											)}
										</div>
									</div>
								)}

								<h5 className="font-x-large22 weight-bold green-dark mt-4" id="rates">
									Upgrade Account &nbsp;{' '}
								</h5>

								{payment_details.start_date && payment_details.end_date && (
									<div className="row mb-3">
										<div className="col-sm-5">
											<p className="weight-medium font-medium green-medium-2 mt-3">Start</p>
											<p className="weight-light font-small color-light">
												{formatDateToDDMMYYYY(payment_details.start_date)}
											</p>
										</div>
										<div className="col-sm-5">
											<p className="weight-medium font-medium green-medium-2 mt-3">Expiry</p>
											<p className="weight-light font-small color-light">
												{formatDateToDDMMYYYY(payment_details.end_date)}
											</p>
										</div>
									</div>
								)}

								<select
									className="form-fild  w-100"
									value={formData.plan}
									onChange={e => setFormData({ ...formData, plan: e.target.value })}
								>
									<option value="">Choose Plan Type</option>
									<option value={'one-time'}>Monthly Plan</option>
									<option value={'quarterly'}>Quarterly Plan</option>
								</select>
							</div>
						</div>
					</div>

					<br />
					<div className="row ">
						<div className="col-sm-12 text-end">
							<button
								type="submit"
								className="bg-893168 float-end weight-semi-bold font-small save-pad mx-2"
							>
								{!isLoading ? 'Save Changes' : 'Please wait...'}
							</button>
							<div className="text-end all-btn mr-2">
								<Link href="/admin/settings/roles-and-permissions">
									<button>Cancel</button>
								</Link>
							</div>
						</div>
					</div>
				</form>
			</div>
			<Popup
				show={deleteImagePopop}
				title="Delete Picture ?"
				size="sm"
				footer={false}
				onCancel={() => setdeleteImagePopop(false)}
				okText="confirm"
				closeText="Cancel"
			>
				<p>This action will remove the Profile picture.</p>
				<div className="modal-footer mt-3">
					<button type="button" className="btn btn-cancel" onClick={() => setdeleteImagePopop(false)}>
						Cancel
					</button>
					<button className="bg-893168 weight-semi-bold font-small " onClick={handleRemoveProflePic}>
						Confirm
					</button>
				</div>
			</Popup>
		</div>
	);
}
