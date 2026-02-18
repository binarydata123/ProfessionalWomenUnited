'use client';
import { useState, useEffect, useContext } from 'react'; // Import useState
import './edit-page.css';
import ReactPhoneInput from 'react-phone-input-2';
import { getAllCountries } from '../../../../../../../lib/frontendapi';
import Image from 'next/image';
import { createNewEndUserByAdmin } from '../../../../../../../lib/adminapi';
import { toast } from 'react-toastify';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthContext from '@/context/AuthContext';

interface FormData {
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string;
	gender: string;
	location: string;
	profile_image: string;
	password: string;
}

export default function Page() {
	const { user } = useContext(AuthContext)
	const [formData, setFormData] = useState<FormData>({
		first_name: '',
		last_name: '',
		email: '',
		phone_number: '',
		gender: '',
		location: '',
		profile_image: '',
		password: ''
	});

	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [user_id, setUserId] = useState('');
	const [allcountries, setCountries] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [image, setImage] = useState('');
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	useEffect(() => {
		if (user)
			user?.id ? setUserId(user?.id) : setUserId('');
		getAllCountriesData();
	}, []);

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

		if (!formData.password) {
			newErrors.password = 'Password is required';
		} else if (formData.password.length < 8) {
			newErrors.password = 'Password should be at least 8 characters long';
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

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
		const isValid = validateForm();
		if (isValid) {
			const data = {
				user_id: user_id,
				first_name: formData.first_name,
				last_name: formData.last_name,
				email: formData.email,
				password: formData.password,
				phone_number: formData.phone_number,
				gender: formData.gender,
				location: formData.location,
				profile_image: image
			};
			createNewEndUserByAdmin(data)
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
							toast.error('An error occurred while creating a new professional');
						}
					} else {
						toast.error('An error occurred during while creating a new professional');
					}
					setIsLoading(false);
				});
		} else {
			setIsLoading(false);
		}
	}

	const handleFileInputChange = (event: any) => {
		event.preventDefault();

		const selectedFile = event.target.files[0];
		setImage(selectedFile);
		if (selectedFile.type.includes('image')) {
			// Check if a new blog image is selected and set the appropriate states
			if (selectedFile) {
				setImagePreview(URL.createObjectURL(selectedFile));
			}
		} else {
			toast.error('Please upload an valid image file (JPEG,JPG,PNG).');
		}
	};

	return (
		<div className="edit-profile-wrapper">
			<div className="right-body ">
				<form onSubmit={handleSubmit}>
					<h5 className="font-x-large22 weight-bold green-dark" id="basic-information">
						Basic Information
					</h5>
					<p className="font-small  weight-light text-sonic-silver">Tell us about yourself</p>
					<div className="row mt-2">
						<div className="col-lg-12 col-xl-6">
							<p className="font-small  weight-medium text-sonic-silver mt-2">Profile Picture</p>
							<div className="row mb-3 align-items-center">
								<div className="col-sm-2 col-3 pr-0 mt-1">
									<div className="logo-box-data">
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
								</div>
								<div className="col-sm-10 col-9">
									<div className="file-btn-upload  d-md-flex">
										<input type="file" className="file-up " onChange={handleFileInputChange} />
										<button className="bg-893168 weight-semi-bold font-small save-pad">
											<img
												src="/images/gallery-add.png"
												alt="Upload Icon"
												className="img-set"
												onChange={handleFileInputChange}
											/>{' '}
											&nbsp; Upload Picture
										</button>{' '}
									</div>
								</div>
							</div>

							<label className="font-small  weight-medium text-sonic-silver w-100">First Name</label>
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
							<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">Last Name</label>
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
							<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">Email ID</label>
							<input
								type="email"
								placeholder="sara.ali@gmail.com"
								className="form-fild  w-100"
								value={formData.email}
								onChange={e => setFormData({ ...formData, email: e.target.value })}
							/>
							{errors.email && (
								<small className="error-message text-danger d-block">{errors.email}</small>
							)}

							<div className="form-grou mt-3 position-relative">
								<label htmlFor="exampleInputEmail1" className="pb-2">
									Password*
								</label>
								<input
									type={showPassword ? 'text' : 'password'}
									className="form-fild w-100 position-relative"
									placeholder="Password"
									value={formData.password}
									maxLength={50}
									onChange={e => setFormData({ ...formData, password: e.target.value })}
								/>

								<span
									className={`eye-icon position-absolute fafa_eye_add ${showPassword ? 'show' : ''}`}
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? (
										<EyeSlashIcon className="icon-class" width={20} />
									) : (
										<EyeIcon className="icon-class" width={20} />
									)}
								</span>
								{errors.password && (
									<small className="error-message text-danger">{errors.password}</small>
								)}
							</div>

							<ReactPhoneInput
								containerClass="mt-4"
								placeholder="+971 12 3500 123"
								inputClass="form-fild  w-100 mt-4"
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
									<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">
										Gender
									</label>
									<select
										className="form-fild  w-100"
										value={formData.gender}
										onChange={e => setFormData({ ...formData, gender: e.target.value })}
									>
										<option value="">Select gender</option>
										<option value="female">Female</option>
										<option value="male">Male</option>
										<option value="other">Other</option>
									</select>
									{errors.gender && (
										<small className="error-message text-danger d-block">{errors.gender}</small>
									)}
								</div>
								<div className="col-sm-6 col-6">
									<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">
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
										<small className="error-message text-danger d-block">{errors.location}</small>
									)}
								</div>
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
		</div>
	);
}
