'use client';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { getAllServices, getAllActiveTagsData } from '../../../../../../../../lib/frontendapi';
import {
	getSingleLegalForumDetailsByAdmin,
	updateSingleLegalForumData,
	deleteLegalForumByAdmin,
	updatelegalForumResponseStatus
} from '../../../../../../../../lib/adminapi';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import AuthContext from '@/context/AuthContext';
import { formatDateToDDMMYYYYMMAPPORVAL } from '@/app/[locale]/commonfunctions/commonfunctions';

interface FormData {
	question: string;
	slug: string;
	description: string;
	is_hiring_lawyer: string;
	service_id: string;
	tag_id: string;
	desktop_ad_path: string;
	mobile_ad_path: string;
	created_at: string;
	full_name: string;
	selectedTag: string;
	service_slug: string;
	status: string;
}

export default function Page({ params }: { params: { id: string } }) {
	const [formData, setFormData] = useState<FormData>({
		question: '',
		description: '',
		is_hiring_lawyer: '',
		service_id: '',
		tag_id: '',
		desktop_ad_path: '',
		mobile_ad_path: '',
		created_at: '',
		full_name: '',
		selectedTag: '',
		service_slug: '',
		slug: '',
		status: ''
	});

	const router = useRouter();
	const { user } = useContext(AuthContext)
	const [user_id, setUserId] = useState('');
	const [allservices, setServices] = useState([]);
	const [alltag, setTags] = useState([]);

	const [desktop, setDesktopImage] = useState('');
	const [desktopPreview, setDesktopImagePreview] = useState<string | null>(null);

	const [desktopImageCheck, setDesktopImageCheck] = useState(false);

	const [mobile, setMobileImage] = useState('');
	const [mobilePreview, setMobileImagePreview] = useState<string | null>(null);

	const [mobileImageCheck, setMobileImageCheck] = useState(false);

	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (user) {
			user?.id ? setUserId(user?.id) : setUserId('');
			fetchSingleLegalForumData(user?.id, params.id);
		}
		getAllServicesData();
		getAllTagsData();
	}, []);

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

	const getAllTagsData = async () => {
		try {
			const res = await getAllActiveTagsData();
			if (res.status == true) {
				setTags(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const fetchSingleLegalForumData = async (userId: any, blogId: string) => {
		try {
			const res = await getSingleLegalForumDetailsByAdmin(userId, blogId);
			if (res.status == true) {
				setFormData({
					...formData,
					question: res.data.question,
					description: res.data.description,
					is_hiring_lawyer: res.data.is_hiring_lawyer,
					service_id: res.data.service_id,
					created_at: res.data.created_at,
					full_name: res.data.full_name,
					selectedTag: res.data.tag_id,
					service_slug: res.data.service_slug,
					slug: res.data.slug,
					status: res.data.status
				});

				if (res.data.tag_id) {
					const defaultTag = res.data.tag_id.split(',').map(Number);
					setSelectedOptions(defaultTag);
				}

				if (res.data.desktop_ad_path) {
					setDesktopImagePreview(
						`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/Services/${res.data.desktop_ad_path}`
					);
				}

				if (res.data.mobile_ad_path) {
					setMobileImagePreview(
						`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/Services/${res.data.mobile_ad_path}`
					);
				}
			} else {
			}
		} catch (err) {
			console.log(err);
		}
	};

	function validateForm() {
		const newErrors: { [key: string]: string } = {};
		if (!formData.service_id) {
			newErrors.service_id = 'Profession is required';
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
		const isValid = validateForm();
		if (isValid) {
			const data = {
				id: params.id,
				user_id: user_id,
				is_hiring_lawyer: formData.is_hiring_lawyer,
				service_id: formData.service_id,
				tag_id: formData.selectedTag,
				desktop_ad_pic: desktop,
				mobile_ad_pic: mobile,
				desktopImageCheck: desktopImageCheck,
				mobileImageCheck: mobileImageCheck
			};
			// console.log(data)

			updateSingleLegalForumData(data)
				.then(res => {
					if (res.status == true) {
						toast.success(res.message);
						fetchSingleLegalForumData(user_id, params.id);
						setIsLoading(false);
					} else {
						setIsLoading(false);
						toast.error(res.message);
					}
				})
				.catch(err => {
					if (err.response) {
						toast.error('An error occurred');
					}
					setIsLoading(false);
				});
		} else {
			setIsLoading(false);
		}
	}

	const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setFormData({ ...formData, is_hiring_lawyer: value });
	};

	const tags = alltag.map((item: any) => ({
		id: item.id,
		value: item.tag_name
	}));

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData(prevFormData => ({
			...prevFormData,
			[name]: value
		}));
	};

	const handleOptionClick = (option: { id: number; value: string }) => {
		if (selectedOptions.includes(option.id)) {
			toast.error('Option already selected');
		} else {
			const updatedSelectedOptions = [...selectedOptions, option.id];
			setSelectedOptions(updatedSelectedOptions);

			const selectedTag = updatedSelectedOptions.join(',');
			setFormData(prevFormData => ({
				...prevFormData,
				selectedTag,
				tag_id: ''
			}));
		}
	};

	const handleRemoveOption = (index: number) => {
		const updatedOptions = [...selectedOptions];
		updatedOptions.splice(index, 1);

		const selectedTag = updatedOptions.join(',');
		setSelectedOptions(updatedOptions);
		setFormData(prevFormData => ({
			...prevFormData,
			selectedTag
		}));
	};

	const handleDesktopFile = (event: any) => {
		event.preventDefault();

		const selectedFile = event.target.files[0];
		setDesktopImage(selectedFile);
		setDesktopImageCheck(false);
		if (selectedFile.type.includes('image')) {
			// Check if a new blog image is selected and set the appropriate states
			if (selectedFile) {
				setDesktopImagePreview(URL.createObjectURL(selectedFile));
			}
		} else {
			toast.error('Please upload an valid image file (JPEG,JPG,PNG).');
		}
	};

	const handleDeleteDesktopFile = (event: any) => {
		event.preventDefault();
		setDesktopImage('');
		setDesktopImagePreview('');
		setDesktopImageCheck(true);
	};

	const handleMobileFile = (event: any) => {
		event.preventDefault();

		const selectedFile = event.target.files[0];
		setMobileImage(selectedFile);
		setMobileImageCheck(false);
		if (selectedFile.type.includes('image')) {
			// Check if a new blog image is selected and set the appropriate states
			if (selectedFile) {
				setMobileImagePreview(URL.createObjectURL(selectedFile));
			}
		} else {
			toast.error('Please upload an valid image file (JPEG,JPG,PNG).');
		}
	};

	const handleDeleteMobileFile = (event: any) => {
		event.preventDefault();
		setMobileImage('');
		setMobileImagePreview('');
		setMobileImageCheck(true);
	};

	const changeUserStatus = (id: any, updated_status: any) => {
		// Show a confirmation dialog

		let question;

		if (updated_status == 'deleted') {
			question = 'remove';
		} else if (updated_status == 'rejected') {
			question = 'reject';
		} else {
			question = 'approved';
		}

		Swal.fire({
			title: `Are you sure you want to ${question} the question ?`,
			text: `All responses related to this question will also be ${question == 'reject' ? 'remove' : question}.`,
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

					deleteLegalForumByAdmin(data)
						.then(res => {
							if (res.status == true) {
								Swal.fire('Success!', 'Question has been updated successfully', 'success');
								router.push('/admin/content-mgmt/legal-forum/approvals');
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

	const ViewPublicPost = (slug: any) => {
		if (slug == null) {
			toast.info('Please first assign a service to the questions');
		} else {
			window.open(`/legal-forum/${slug}/${formData.slug}`, '_blank');
		}
	};

	const changeResponseStatus = (id: any, updated_status: any) => {
		try {
			const data = {
				id: id,
				user_id: user_id,
				status: updated_status
			};

			updatelegalForumResponseStatus(data)
				.then(res => {
					if (res.status == true) {
						fetchSingleLegalForumData(user_id, params.id);
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
	};

	return (
		<>
			<Link href={'/admin/content-mgmt/legal-forum/approvals'}>
				<p className="font-small weight-semi-bold mt-3 boysenberry">
					<i className="fa-solid fa-arrow-left-long"></i>&nbsp; Back
				</p>
			</Link>
			<div className="text-right">
				<div className="text-right">
					<button
						type="button"
						className="btn-white   mr-1 mb-2"
						onClick={e => changeUserStatus(params?.id, 'deleted')}
					>
						Delete
					</button>

					<button
						type="button"
						className="btn-secondary mr-1 mb-2"
						onClick={e => changeUserStatus(params?.id, 'rejected')}
					>
						<i className="fa-solid fa-xmark"></i> Reject
					</button>

					{formData?.service_slug ? (
						<button
							className="btn-primary gap-2 mt-1 mx-1 mb-2"
							onClick={e => changeUserStatus(params?.id, 'approved')}
						>
							<i className="fa-solid fa-check"></i>&nbsp; Approve
						</button>
					) : (
						<button
							className="btn-primary gap-2 mt-1 mx-1 mb-2"
							onClick={e => ViewPublicPost(formData?.service_slug)}
						>
							<i className="fa-solid fa-check"></i>&nbsp; Approve
						</button>
					)}

					<button
						className="btn-get-free btn-commn mx-2 gap-2 hover mt-1 mb-2"
						onClick={e => ViewPublicPost(formData?.service_slug)}
					>
						View Public Post
					</button>
				</div>
			</div>
			<div className="post-form pt-5">
				{' '}
				<strong>
					Post from:{' '}
					<a href="#" style={{ color: '#c49073' }}>
						{formData.full_name}
					</a>{' '}
				</strong>{' '}
				<span> </span> on {formatDateToDDMMYYYYMMAPPORVAL(formData.created_at)}
			</div>
			<div className="d-flex justify-content-between py-3">
				<span className="max-text-lenth">Question</span>
				<span className="max-count">100</span>
			</div>
			<div className="form-fild-des mb-2">
				<input placeholder={formData.question} className="form-fild w-100 bg-f2f2f2" maxLength={100} disabled />
			</div>
			<div className="d-flex justify-content-between py-3">
				<span className="max-text-lenth">Description</span>
				<span className="max-count">2000</span>
			</div>
			<div className="form-fild-des">
				<textarea
					placeholder={formData.description}
					className="form-fild  w-100 h-129 bg-f2f2f2"
					maxLength={2000}
					disabled
				></textarea>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="form-fild-des">
					<div className="row mt-2">
						<div className="col-sm-12">
							<p className="text-sonic-silver weight-medium font-small mb-2">
								Do you plan on hiring a lawyer for this issue?*
							</p>
						</div>
						<div className="col-lg-1 col-md-1">
							<label className="social-link font-small weight-medium w-100 mt-2">
								<input
									type="radio"
									name="is_hiring_lawyer"
									value="yes"
									onChange={handleRadioChange}
									checked={formData.is_hiring_lawyer == 'yes'}
								/>
								<span className="checkmark"></span>
								Yes
							</label>
						</div>
						<div className="col-lg-1 col-md-1">
							<label className="social-link font-small weight-medium w-100 mt-2">
								<input
									type="radio"
									name="is_hiring_lawyer"
									value="no"
									onChange={handleRadioChange}
									checked={formData.is_hiring_lawyer == 'no'}
								/>
								<span className="checkmark"></span>
								No
							</label>
						</div>
						<div className="col-lg-1 col-md-1">
							<label className="social-link font-small weight-medium w-100 mt-2">
								<input
									type="radio"
									name="is_hiring_lawyer"
									value="maybe"
									onChange={handleRadioChange}
									checked={formData.is_hiring_lawyer == 'maybe'}
								/>
								<span className="checkmark"></span>
								Maybe
							</label>
						</div>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-lg-6">
						<h4 className="social-link manrope weight-bold weight-medium pb-4">Tags</h4>
						<label className="social-link font-small weight-medium w-100 mt-2 pb-2">Professional Service</label>

						<select
							className="form-fild  w-100"
							value={formData.service_id}
							onChange={e => setFormData({ ...formData, service_id: e.target.value })}
						>
							<option value="">Assign Serivce</option>
							{allservices.map((services: any) => (
								<option key={services.id} value={services.id}>
									{services.name}
								</option>
							))}
						</select>

						{errors.service_id && (
							<small className="error-message text-danger mt-2 mb-2 d-block">{errors.service_id}</small>
						)}

						<label className="social-link font-small weight-medium w-100 mt-3">Tags</label>

						<div className="icon-fild mt-1">
							<input
								type="text"
								placeholder="Search Tag"
								className="form-fild w-100"
								name="tag_id"
								value={formData.tag_id}
								onChange={handleInputChange}
							/>
							<i className="fa-solid fa-magnifying-glass"></i>
						</div>

						{/* {formData.service_id} */}

						{formData.tag_id && (
							<ul className="tag-options-list">
								{tags
									.filter(option => option.value.toLowerCase().includes(formData.tag_id))
									.map((option, index) => (
										<li key={option.id} onClick={() => handleOptionClick(option)}>
											{option.value}
										</li>
									))}
							</ul>
						)}

						<div className="selected-options">
							{selectedOptions.map((optionId, index) => {
								const selectedOption = tags.find(opt => opt.id === optionId);
								return (
									<div key={index} className="selected-option d-inline">
										<button className="btn-green mt-2 mr-1" key={index}>
											{selectedOption ? selectedOption.value : ''}
											<img
												src="/images/close-square.svg"
												alt="close-square"
												className="mx-2"
												onClick={() => handleRemoveOption(index)}
											/>
										</button>
									</div>
								);
							})}
						</div>

						<hr />

						<h4 className="social-link manrope weight-bold weight-medium mt-4 pb-3">Ad Placement</h4>
						<div className="row">
							<div className="col-sm-12">
								<p className="social-link font-small weight-medium w-100 mt-2">Upload Ad</p>
								<div className="row">
									<div className="col-sm-6 pr-0 m-pr-15">
										<div className="file-btn-upload mt-2">
											<input
												className="file-up w-100"
												type="file"
												onChange={handleDesktopFile}
												accept="image/jpeg, image/png"
											/>
											<button
												type="button"
												className="btn-get-free btn-commn gap-2 hover mt-1 mb-2 mr-1 w-100"
												onChange={handleDesktopFile}
											>
												<i className="fa-solid fa-arrow-up-from-bracket"></i> Upload for Desktop
											</button>
										</div>

										{desktopPreview && (
											<div className="">
												<Image
													src={desktopPreview}
													alt="Preview"
													className="mt-2 upload-data "
													height={200}
													width={200}
													style={{ objectFit: 'contain' }}
												/>
												<button
													type="button"
													className="icon-btn"
													onClick={handleDeleteDesktopFile}
												>
													<i className="fa-regular fa-trash-can"></i>
												</button>
											</div>
										)}
									</div>
									<div className="col-sm-6">
										<div className="file-btn-upload mt-2">
											<input
												className="file-up w-100"
												type="file"
												onChange={handleMobileFile}
												accept="image/jpeg, image/png"
											/>
											<button
												type="button"
												className="btn-get-free btn-commn gap-2 hover mt-1 mb-2 mr-1 w-100"
												onChange={handleMobileFile}
											>
												<i className="fa-solid fa-arrow-up-from-bracket"></i> Upload for Mobile
											</button>
										</div>
										{mobilePreview && (
											<div className="">
												<Image
													src={mobilePreview}
													alt="Preview"
													className="mt-2 upload-data "
													height={200}
													width={200}
													style={{ objectFit: 'contain' }}
												/>
												<button
													type="button"
													className="icon-btn"
													onClick={handleDeleteMobileFile}
												>
													<i className="fa-regular fa-trash-can"></i>
												</button>
											</div>
										)}
									</div>
								</div>

								<br />
								<br />
							</div>
						</div>
					</div>
					<div className="row ">
						<div className="col-sm-12 text-end">
							<button
								type="submit"
								className="bg-893168 float-end weight-semi-bold font-small save-pad mx-2"
							>
								{!isLoading ? 'Update' : 'Please wait...'}
							</button>
						</div>
					</div>
				</div>
			</form>
		</>
	);
}
