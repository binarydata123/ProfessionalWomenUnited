'use client';
import { useState, useEffect, useContext } from 'react';
import ReactPhoneInput from 'react-phone-input-2';
import UserDashboard from '@/components/user/dashboard';
import './dash.css';
import EmptyState from '@/components/user/dashboard/EmptyState';
import Popup from '@/commonUI/Popup';
import { SaveUserProfile, getUserDetailData, deleteUserimage } from '../../../../../lib/enduserapi';
import { toast } from 'react-toastify';
import { getAllCountries } from '../../../../../lib/frontendapi';
import AuthContext from '@/context/AuthContext';
import Cookies from 'js-cookie';
import { capitalizeFirstWord, getLawyerImageSrc70x70 } from '../../commonfunctions/commonfunctions';

export default function Dashboard() {

	const { user } = useContext(AuthContext)
	const [showFilledState, setshowFilledState] = useState(false);
	const [showInformation, setshowInformation] = useState(false);
	const [user_id, setUserId]: any = useState('');
	const [username, setUserName] = useState('');
	const [firstname, setUserFirstname] = useState('');
	const [lastname, setUseLastname] = useState('');
	const [email, setUserEmail] = useState('');
	const [phonenumber, setUserPhone] = useState('');
	const [gender, setUserGender] = useState('');
	const [locationsid, setUserLocation] = useState('');
	const [allcountries, setCountries] = useState([]);
	const [image, setImage] = useState('');
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [profile_image, setUserImagee] = useState('');
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [deleteImagePopop, setdeleteImagePopop] = useState(false);

	useEffect(() => {
		if (user?.id) {
			setUserId(user?.id);
			setUserName(user?.first_name);
		}
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
		if (!firstname) {
			newErrors.first_name = 'First name is required';
		}
		if (!lastname) {
			newErrors.last_name = 'Last name is required';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const isValid = validateForm();
		if (isValid) {
			const data = {
				user_id: user_id,
				first_name: firstname,
				last_name: lastname,
				email: email,
				phone_number: phonenumber,
				gender: gender,
				location_id: locationsid,
				profile_image: image
			};
			SaveUserProfile(data)
				.then(res => {
					toast.success(res.message, {
						position: toast.POSITION.TOP_RIGHT
					});
					Cookies.set('name', `${res.user.first_name} ${res.user.last_name || ''}`);
					Cookies.set('profile_image', res.user.profile_image);
					window.location.reload();
					setshowInformation(false);
				})
				.catch(() => {
					toast.error('Error occurred', {
						position: toast.POSITION.BOTTOM_RIGHT
					});
				});
		}
	};

	const handleViewProfile = async (memberId: number) => {
		const data = {
			memberId: memberId
		};

		try {
			const response = await getUserDetailData(data);
			if (response.status === true) {
				setUserFirstname(response.data.first_name);
				setUseLastname(response.data.last_name);
				setUserEmail(response.data.email);
				setUserPhone(response.data.phone_number);
				setUserGender(response.data.gender !== null ? response.data.gender : gender);
				setUserLocation(response.data.location_id !== null ? response.data.location_id : locationsid);
				setUserImagee(response.data.profile_image);
			}
		} catch (error) {
			console.error('Error reporting messages:', error);
		}
	};

	const handleFileInputChange = (e: any) => {
		const file = e.target.files[0];
		setImage(file);
		const reader = new FileReader();
		reader.onload = () => {
			setImagePreview(reader.result as string);
		};
		reader.readAsDataURL(file);
	};

	const handledeleteImagePopup = () => {
		setshowInformation(false);
		setdeleteImagePopop(true);
	};

	const handleDeleteImage = async () => {
		try {
			const data = {
				id: user_id
			};
			const res = await deleteUserimage(data);
			if (res.status === true) {
				setImagePreview('');
				setshowInformation(false);
				setdeleteImagePopop(false);
				Cookies.set('profile_image', '');
				window.location.reload();
			} else {
				toast.error(res.message, {
					position: toast.POSITION.TOP_RIGHT
				});
			}
		} catch (error) {
			console.error('Error deleting image:', error);
		}
	};

	return (
		<div className="right-body">
			<div className="mmm">
				<div className="d-flex justify-content-between">
					<h2 className="font-smaller weight-bold social-link py-3">
						{/* Hello{' '} */}
						<span className="green-medium-2">
							{' '}
							{capitalizeFirstWord(username)}, {''}
							<img
								src="/icon/edit.svg"
								alt="edit Icon"
								width={30}
								className="img-set"
								id={user_id}
								onClick={() => {
									setshowInformation(true);
									handleViewProfile(user_id);
								}}
								style={{ cursor: 'pointer' }}
							/>
						</span>
					</h2>
				</div>
				<div className="main-content-wrapper">{!showFilledState ? <UserDashboard /> : <EmptyState />}</div>
			</div>
			<Popup
				show={showInformation}
				className="user-info-modal basic-information"
				title="Basic Information"
				onCancel={() => setshowInformation(false)}
			>
				<form onSubmit={handleSubmit}>
					<div className="basic-information-wrapper">
						<p className="weight-medium font-small color-light">Tell us about yourself</p>
						<p className="font-small  weight-medium text-sonic-silver mt-2">Profile Picture</p>
						<div className="row mb-3">
							<div className="logo-box-data">
								{imagePreview ? (
									<img src={imagePreview} alt="Preview" className="" height={70} width={70} />
								) : (
									<img
										src={getLawyerImageSrc70x70(profile_image, gender)}
										alt="profile-image"
										width={70}
										height={70}
									/>
								)}
							</div>

							<div className="col-sm-10 col-9">
								<div className="file-btn-upload mt-3 d-md-flex">
									<input
										type="file"
										className="file-up"
										name="profile_image"
										onChange={handleFileInputChange}
									/>
									<button className="bg-893168 weight-semi-bold font-small save-pad b-r-btn">
										<i className="fa-solid fa-image" onChange={handleFileInputChange}></i> &nbsp;
										Upload Picture
									</button>{' '}
									{profile_image && (
										<button
											className="bg-893168 weight-semi-bold save-pad font-small ml-2"
											onClick={() => handledeleteImagePopup()}
											type="button"
										>
											Remove Picture
										</button>
									)}
								</div>
							</div>
						</div>

						<label className="font-small weight-medium text-sonic-silver w-100">First Name</label>
						<input
							type="text"
							name="firstname"
							placeholder="Sara"
							className="form-fild w-100"
							value={firstname}
							onChange={e => setUserFirstname(e.target.value)}
							maxLength={20}
						/>
						{errors.first_name && (
							<small className="error-message text-danger d-block">{errors.first_name}</small>
						)}

						<label className="font-small weight-medium text-sonic-silver w-100 mt-4">Last Name</label>
						<input
							type="text"
							name="lastname"
							placeholder="All"
							className="form-fild w-100"
							value={lastname}
							onChange={e => setUseLastname(e.target.value)}
							maxLength={20}
						/>

						{errors.last_name && (
							<small className="error-message text-danger d-block">{errors.last_name}</small>
						)}
						<label className="font-small weight-medium text-sonic-silver w-100 mt-4">Email ID</label>
						<input
							type="text"
							name="email"
							placeholder="sara.ali@gmail.com"
							className="form-fild w-100"
							value={email}
							onChange={e => setUserEmail(e.target.value)}
							disabled
						/>

						<ReactPhoneInput
							containerClass="mt-4"
							placeholder="+971 12 3500 123"
							inputClass="form-fild  w-100 mt-1"
							specialLabel="Contact Number"
							value={phonenumber}
							country={'us'}
							onChange={value => setUserPhone(value)}
						/>

						<div className="row">
							<div className="col-sm-6 col-6">
								<label className="font-small weight-medium text-sonic-silver w-100 mt-4">Gender</label>
								<select
									name="gender"
									className="form-fild w-100"
									value={gender}
									onChange={e => setUserGender(e.target.value)}
								>
									<option value="female">Female</option>
									<option value="male">Male</option>
									<option value="other">Other</option>
								</select>
							</div>
							<div className="col-sm-6 col-6">
								<label className="font-small weight-medium text-sonic-silver w-100 mt-4">
									Location
								</label>
								<select
									name="locationsid"
									className="form-fild w-100"
									value={locationsid}
									onChange={e => setUserLocation(e.target.value)}
								>
									<option value="">Select Location</option>
									{allcountries.map((countries: any) => (
										<option key={countries.id} value={countries.id}>
											{countries.name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="modal-footer modal-ft">
							<div className="row align-items-center">
								<div className="col-sm-3 col-4 p-0">
									<button
										type="button"
										className="btn btn-cancel w-100 save-pad"
										data-bs-dismiss="modal"
										onClick={() => {
											setshowInformation(false);
										}}
									>
										Cancel
									</button>
								</div>
								<div className="col-sm-9 col-8 pr-0">
									<button
										type="submit"
										className="bg-893168 weight-semi-bold font-small w-100  mar-top-min b-r-btn save-pad"
									>
										Save Changes
									</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</Popup>

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
					<button className="bg-893168 weight-semi-bold font-small " onClick={handleDeleteImage}>
						Confirm
					</button>
				</div>
			</Popup>
		</div>
	);
}
