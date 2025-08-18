'use client';
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllAuthor, getAllServices } from './../../../../../../../lib/frontendapi';
import { toast } from 'react-toastify';
import { CreateBlogByAdmin } from '../../../../../../../lib/adminapi';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import AuthContext from '@/context/AuthContext';
const TextEditor = dynamic(() => import('../../../../../../commonUI/TextEditor'), {
	ssr: false
});

interface FormData {
	title: string;
	description: string;
	image: string;
	service_id: string;
	meta_title: string;
	meta_description: string;
	desktop_ad_pic: string;
	mobile_ad_pic: string;
	author_name: string;
	author_designation: string;
	tag: string;
	author_profile_pic: string;
	time_to_read: string;
	slug: string;
	publish_date: string;
	author_id: number | string;
}

export default function Create() {
	const { user } = useContext(AuthContext)
	const router = useRouter();

	const [formData, setFormData] = useState<FormData>({
		title: '',
		description: '',
		image: '',
		service_id: '',
		meta_title: '',
		meta_description: '',
		desktop_ad_pic: '',
		mobile_ad_pic: '',
		author_name: '',
		author_designation: '',
		tag: '',
		author_profile_pic: '',
		time_to_read: '',
		slug: '',
		publish_date: '',
		author_id: ''
	});
	const [isLoading, setIsLoading] = useState(false);
	const [user_id, setUserId] = useState('');
	const [allServices, setServices] = useState([]);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const [banner, setBannerImage] = useState('');
	const [bannerPreview, setBannerImagePreview] = useState<string | null>(null);

	const [desktop, setDesktopImage] = useState('');
	const [desktopPreview, setDesktopImagePreview] = useState<string | null>(null);

	const [mobile, setMobileImage] = useState('');
	const [mobilePreview, setMobileImagePreview] = useState<string | null>(null);

	const [authors, setAuthors] = useState([])

	useEffect(() => {
		if (user) {
			user?.id ? setUserId(user?.id) : setUserId('');
		}
		getAllServicesData();
		handleAuthors()
	}, []);

	const handleAuthors = () => {
		getAllAuthor()
			.then((res) => {
				setAuthors(res.data)
			})
	}

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

	const handleBannerFile = (event: any) => {
		event.preventDefault();

		const selectedFile = event.target.files[0];
		setBannerImage(selectedFile);
		if (selectedFile.type.includes('image')) {
			// Check if a new blog image is selected and set the appropriate states
			if (selectedFile) {
				setBannerImagePreview(URL.createObjectURL(selectedFile));
			}
		} else {
			toast.error('Please upload an valid image file (JPEG,JPG,PNG).');
		}
	};

	const handleDeleteBannerFile = (event: any) => {
		event.preventDefault();
		setBannerImage('');
		setBannerImagePreview('');
	};

	const handleDesktopFile = (event: any) => {
		event.preventDefault();

		const selectedFile = event.target.files[0];
		setDesktopImage(selectedFile);
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
	};

	const handleMobileFile = (event: any) => {
		event.preventDefault();

		const selectedFile = event.target.files[0];
		setMobileImage(selectedFile);
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
	};

	const handleDescriptionChange = (newValue: any) => {
		setFormData({ ...formData, description: newValue });
	};

	function validateForm() {
		const newErrors: { [key: string]: string } = {};
		if (!formData.title) {
			newErrors.title = 'Blog title is required';
		}
		if (!formData.author_id) {
			newErrors.author_id = 'Please select author';
		}
		if (!formData.service_id) {
			newErrors.service_id = 'Service is required';
		}

		if (!formData.slug) {
			newErrors.slug = 'Blog slug is required';
		}

		if (!formData.publish_date) {
			newErrors.publish_date = 'Blog publish date is required';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
		const clickedButton = event.currentTarget.querySelector('button[type="submit"]:focus');
		const buttonValue = clickedButton?.getAttribute('data-action');

		const isValid = validateForm();
		if (isValid) {
			const data = {
				title: formData.title,
				slug: formData.slug,
				service_id: formData.service_id,
				description: formData.description,
				meta_title: formData.meta_title,
				meta_description: formData.meta_description,
				author_name: formData.author_name,
				author_designation: formData.author_designation,
				image: banner,
				author_profile_pic: '',
				desktop_ad_pic: desktop,
				mobile_ad_pic: mobile,
				blog_type: buttonValue,
				tag: formData.tag,
				time_to_read: formData.time_to_read,
				user_id: user_id,
				publish_date: formData.publish_date,
				author_id: formData.author_id
			};
			CreateBlogByAdmin(data)
				.then(res => {
					if (res.status == true) {
						toast.success(res.message);
						router.push('/admin/content-mgmt/blogs');
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

	const handleChangeTitle = (e: any) => {
		const title = e.target.value;
		const slug = generateSlug(title);
		setFormData({ ...formData, title, slug });
	};

	const handleChangeSlug = (e: any) => {
		// Allow the user to edit the slug, but remove invalid characters and spaces
		const editedSlug = e.target.value.toLowerCase().replace(/[^a-zA-Z0-9-]+/g, ''); // Allow only alphanumeric characters and hyphens
		setFormData({ ...formData, slug: editedSlug });
	};

	const generateSlug = (title: any) => {
		// Convert the title to a slug by replacing spaces and special characters
		return title
			.toLowerCase()
			.replace(/[^a-zA-Z0-9]+/g, '-')
			.replace(/^-+|-+$/g, ''); // Remove leading and trailing dashes
	};

	return (
		<div>
			<Link href={'/admin/content-mgmt/blogs'}>
				<p className="font-small weight-semi-bold mt-3 boysenberry">
					<i className="fa-solid fa-arrow-left-long"></i>&nbsp; Back
				</p>
			</Link>
			<form className="mt-2" onSubmit={handleSubmit}>
				<div className="text-right">
					<button type="submit" className="btn-secondary mr-1 mb-2" data-action="draft" disabled={isLoading}>
						Save As Draft
					</button>
					<button
						type="submit"
						className="btn-primary mt-1 mb-2"
						data-action="published"
						disabled={isLoading}
					>
						Publish
					</button>
				</div>

				<label className="social-link weight-medium font-small">Blog Title</label>

				<div className="form-fild-des">
					<input
						placeholder="Enter blog title"
						className="form-fild w-100 mb-2"
						value={formData.title}
						onChange={handleChangeTitle}
						maxLength={2000}
					/>
				</div>

				{errors.title && <small className="error-message text-danger  mb-2 d-block">{errors.title}</small>}

				<label className="social-link weight-medium font-small">Blog Slug</label>

				<div className="form-fild-des">
					<input
						placeholder="Enter blog slug"
						className="form-fild w-100 mb-2"
						value={formData.slug}
						onChange={handleChangeSlug}
						maxLength={2000}
					/>
				</div>

				{errors.slug && <small className="error-message text-danger  mb-2 d-block">{errors.slug}</small>}

				<label className="social-link weight-medium font-small">Blog Description</label>

				<TextEditor
					height={300}
					value={formData.description && formData.description}
					onChange={handleDescriptionChange}
				/>

				{errors.description && (
					<small className="error-message text-danger mt-5 pt-2 mb-2 d-block">{errors.description}</small>
				)}

				<label className="social-link font-small weight-medium w-100 mt-5 pt-4">Assign a category</label>
				<select
					className="form-fild  w-100"
					value={formData.service_id}
					onChange={e => setFormData({ ...formData, service_id: e.target.value })}
				>
					<option value="">Select Category</option>
					{allServices.map((services: any) => (
						<option key={services.id} value={services.id}>
							{services.name}
						</option>
					))}
				</select>

				{errors.service_id && (
					<small className="error-message text-danger mt-2 mb-2 d-block">{errors.service_id}</small>
				)}

				<label className="social-link font-small weight-medium w-100 mt-2">Tag</label>
				<input
					placeholder="Education,Science,Medical"
					className="form-fild w-100 "
					type="text"
					value={formData.tag}
					onChange={e => setFormData({ ...formData, tag: e.target.value })}
				/>

				<label className="social-link font-small weight-medium w-100 mt-2">Time To Read</label>
				<select
					className="form-fild  w-100"
					value={formData.time_to_read}
					onChange={e => setFormData({ ...formData, time_to_read: e.target.value })}
				>
					<option value={''}>Select time to read</option>
					<option value={'1 min read'}>1 min read</option>
					<option value={'2 min read'}>2 min read</option>
					<option value={'3 min read'}>3 min read</option>
					<option value={'5 min read'}>5 min read</option>
					<option value={'7 min read'}>7 min read</option>
					<option value={'10 min read'}>10 min read</option>
					<option value={'15 min read'}>15 min read</option>
					<option value={'20 min read'}>20 min read</option>
				</select>

				<label className="social-link weight-medium font-small mt-2">Blog Publish Date</label>
				<div className="row">
					<div className="col-sm-5 pr-0 m-pr-   15">
						<div className="form-fild-des">
							<input
								type="date"
								className="form-fild mb-2"
								value={formData.publish_date}
								onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
							/>
						</div>
					</div>
				</div>
				{errors.publish_date && <small className="error-message text-danger  mb-2 d-block">{errors.publish_date}</small>}

				<label className="social-link font-small weight-medium w-100 mt-2">Banner Image</label>

				<div className="row">
					<div className="col-sm-5 pr-0 m-pr-   15">
						<div className="file-btn-upload mt-2">
							<input
								className="file-up w-100"
								type="file"
								onChange={handleBannerFile}
								accept="image/jpeg, image/png"
							/>
							<button
								type="button"
								className="btn-get-free btn-commn gap-2 hover mt-1 mb-2 mr-1 w-100"
								onChange={handleBannerFile}
							>
								<i className="fa-solid fa-arrow-up-from-bracket"></i> Upload Banner Image
							</button>
						</div>
					</div>
				</div>
				{bannerPreview && (
					<div className="">
						<Image
							src={bannerPreview}
							alt="Preview"
							className="mt-2 upload-data "
							height={200}
							width={200}
							style={{ objectFit: 'contain' }}
						/>
						<button type="button" className="icon-btn" onClick={handleDeleteBannerFile}>
							<i className="fa-regular fa-trash-can"></i>
						</button>
					</div>
				)}

				<h4 className="font-large weight-medium social-link mt-4">Author </h4>
				<select
					className="form-fild  w-100"
					value={formData.author_id}
					onChange={e => setFormData({ ...formData, author_id: e.target.value })}>
					<option value={''}>Select Author</option>
					{
						authors.map((author: any, index: number) => (
							<option value={author.id} key={index}>{author.name}</option>
						))
					}
				</select>
				{errors.author_id && (
					<small className="error-message text-danger mt-2 mb-2 d-block">{errors.author_id}</small>
				)}

				<h4 className="font-large weight-medium social-link mt-4">Meta </h4>
				<label className="social-link font-small weight-medium w-100 mt-2">Meta Title</label>
				<input
					placeholder="Enter meta title"
					className="form-fild w-100 "
					type="text"
					value={formData.meta_title}
					onChange={e => setFormData({ ...formData, meta_title: e.target.value })}
				/>

				<label className="social-link font-small weight-medium w-100 mt-2">Meta Description</label>
				<textarea
					className="form-fild  w-100 h-129 "
					value={formData.meta_description}
					onChange={e => setFormData({ ...formData, meta_description: e.target.value })}
					placeholder="Enter Meta Descrption"
				></textarea>

				<h4 className="font-large weight-medium social-link mt-4">Ad Placement</h4>

				<div className="row">
					<div className="col-sm-7">
						<p className="social-link font-small weight-medium w-100 mt-2">Upload Ad</p>
						<div className="row">
							<div className="col-sm-5 pr-0 m-pr-   15">
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
									{/* <p className="font-small-12 text-sonic-silver weight-light">
                    For Desktop:306x612px
                  </p> */}
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
										<button type="button" className="icon-btn" onClick={handleDeleteDesktopFile}>
											<i className="fa-regular fa-trash-can"></i>
										</button>
									</div>
								)}
							</div>
							<div className="col-sm-5">
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
									{/* <p className="font-small-12 text-sonic-silver weight-light">
                    For Mobile: 351x306px
                  </p> */}
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
										<button type="button" className="icon-btn" onClick={handleDeleteMobileFile}>
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
			</form>
		</div>
	);
}
