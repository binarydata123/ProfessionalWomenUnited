'use client';
import React, { useState, useEffect, useContext } from 'react';
import { getAdminSettingData, UpdateAdminSettings, updateLogoAndFaviconByAdmin } from '../../../../../../lib/adminapi';
import AuthContext from '@/context/AuthContext';
import { toast } from 'react-toastify';

export default function Page() {
	const { user } = useContext(AuthContext)
	const [settings, SetAdminSetting] = useState<any>({});

	useEffect(() => {
		if (user)
			fetchAdminSettingData(user?.id);
	}, []);

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

	const handleChangeSingleValue = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		SetAdminSetting((prevSettings: any) => ({
			...prevSettings,
			[name]: value
		}));
	};

	const handleBlurSingleValue = async (e: any) => {
		const data = {
			settings: settings
		};
		UpdateAdminSettings(data).then(res => {
			if (res.status == true) {
				toast.success('Setting saved successfully')
			}
		});
	};

	return (
		<div>
			<div className="row mt-4 font-icon admin_genral_css">
				<div className="col-sm-4">
					<div className="bank-law green-medium-2 fw-bold mt-3">
						<h4>Home Page</h4>
					</div>
				</div>
				<div className="col-sm-8">
					<label className="font-small weight-medium text-sonic-silver mt-2">Meta Title</label>
					<input
						placeholder="Enter meta title here"
						name="homepage_meta_title"
						className="form-fild w-100 "
						type="text"
						value={settings.homepage_meta_title}
						onBlur={handleBlurSingleValue}
						onChange={handleChangeSingleValue}
					/>
					<label className="font-small weight-medium text-sonic-silver mt-2">Meta Description</label>
					<input
						placeholder="Enter meta title Description"
						name="homepage_meta_description"
						className="form-fild w-100 "
						type="text"
						value={settings.homepage_meta_description}
						onBlur={handleBlurSingleValue}
						onChange={handleChangeSingleValue}
					/>
				</div>
			</div>
			<hr></hr>
			<div className="row mt-4 font-icon admin_genral_css">
				<div className="col-sm-4">
					<div className="bank-law green-medium-2 fw-bold mt-3">
						<h4>Find A Lawyer Page</h4>
					</div>
				</div>
				<div className="col-sm-8">
					<label className="font-small weight-medium text-sonic-silver mt-2">Meta Title</label>
					<input
						placeholder="Enter meta title here"
						name="find_a_lawyer_meta_title"
						className="form-fild w-100 "
						value={settings.find_a_lawyer_meta_title}
						onBlur={handleBlurSingleValue}
						onChange={handleChangeSingleValue}
						type="text"
					/>
					<label className="font-small weight-medium text-sonic-silver mt-2">Meta Description</label>
					<input
						placeholder="Enter meta title Description"
						name="find_a_lawyer_meta_description"
						className="form-fild w-100 "
						value={settings.find_a_lawyer_meta_description}
						onBlur={handleBlurSingleValue}
						onChange={handleChangeSingleValue}
						type="text"
					/>
				</div>
			</div>
			<hr></hr>
			<div className="row mt-4 font-icon admin_genral_css">
				<div className="col-sm-4">
					<div className="bank-law green-medium-2 fw-bold mt-3">
						<h4>Legal Services Page</h4>
					</div>
				</div>
				<div className="col-sm-8">
					<label className="font-small weight-medium text-sonic-silver mt-2">Meta Title</label>
					<input
						placeholder="Enter meta title here"
						name="legal_services_meta_title"
						className="form-fild w-100 "
						value={settings.legal_services_meta_title}
						onBlur={handleBlurSingleValue}
						onChange={handleChangeSingleValue}
						type="text"
					/>
					<label className="font-small weight-medium text-sonic-silver mt-2">Meta Description</label>
					<input
						placeholder="Enter meta title Description"
						name="legal_services_meta_description"
						className="form-fild w-100 "
						value={settings.legal_services_meta_description}
						onBlur={handleBlurSingleValue}
						onChange={handleChangeSingleValue}
						type="text"
					/>
				</div>
			</div>
			<hr></hr>
			<div className="row mt-4 font-icon admin_genral_css">
				<div className="col-sm-4">
					<div className="bank-law green-medium-2 fw-bold mt-3">
						<h4>Legal Forum Page</h4>
					</div>
				</div>
				<div className="col-sm-8">
					<label className="font-small weight-medium text-sonic-silver mt-2">Meta Title</label>
					<input
						placeholder="Enter meta title here"
						name="legal_forum_meta_title"
						className="form-fild w-100 "
						value={settings.legal_forum_meta_title}
						onBlur={handleBlurSingleValue}
						onChange={handleChangeSingleValue}
						type="text"
					/>
					<label className="font-small weight-medium text-sonic-silver mt-2">Meta Description</label>
					<input
						placeholder="Enter meta title Description"
						name="legal_forum_meta_description"
						className="form-fild w-100 "
						value={settings.legal_forum_meta_description}
						onBlur={handleBlurSingleValue}
						onChange={handleChangeSingleValue}
						type="text"
					/>
				</div>
			</div>

			<hr></hr>
			<div className="row mt-4 font-icon admin_genral_css">
				<div className="col-sm-4">
					<div className="bank-law green-medium-2 fw-bold mt-3">
						<h4>Blogs Page</h4>
					</div>
				</div>
				<div className="col-sm-8">
					<label className="font-small weight-medium text-sonic-silver mt-2">Meta Title</label>
					<input
						placeholder="Enter meta title here"
						name="blogs_meta_title"
						className="form-fild w-100 "
						value={settings.blogs_meta_title}
						onBlur={handleBlurSingleValue}
						onChange={handleChangeSingleValue}
						type="text"
					/>
					<label className="font-small weight-medium text-sonic-silver mt-2">Meta Description</label>
					<input
						placeholder="Enter meta title Description"
						name="blogs_meta_description"
						className="form-fild w-100 "
						value={settings.blogs_meta_description}
						onBlur={handleBlurSingleValue}
						onChange={handleChangeSingleValue}
						type="text"
					/>
				</div>
			</div>

			<hr></hr>
			<div className="row mt-4 font-icon admin_genral_css">
				<div className="col-sm-4">
					<div className="bank-law green-medium-2 fw-bold mt-3">
						<h4>About us Page</h4>
					</div>
				</div>
				<div className="col-sm-8">
					<label className="font-small weight-medium text-sonic-silver mt-2">Meta Title</label>
					<input
						placeholder="Enter meta title here"
						name="about_us_meta_title"
						className="form-fild w-100 "
						value={settings.about_us_meta_title}
						onBlur={handleBlurSingleValue}
						onChange={handleChangeSingleValue}
						type="text"
					/>
					<label className="font-small weight-medium text-sonic-silver mt-2">Meta Description</label>
					<input
						placeholder="Enter meta title Description"
						name="about_us_meta_description"
						className="form-fild w-100 "
						value={settings.about_us_meta_description}
						onBlur={handleBlurSingleValue}
						onChange={handleChangeSingleValue}
						type="text"
					/>
				</div>
			</div>

			<hr></hr>
			<div className="row mt-4 font-icon admin_genral_css">
				<div className="col-sm-4">
					<div className="bank-law green-medium-2 fw-bold mt-3">
						<h4>Contact us Page</h4>
					</div>
				</div>
				<div className="col-sm-8">
					<label className="font-small weight-medium text-sonic-silver mt-2">Meta Title</label>
					<input
						placeholder="Enter meta title here"
						name="contact_us_meta_title"
						value={settings.contact_us_meta_title}
						onBlur={handleBlurSingleValue}
						onChange={handleChangeSingleValue}
						className="form-fild w-100 "
						type="text"
					/>
					<label className="font-small weight-medium text-sonic-silver mt-2">Meta Description</label>
					<input
						placeholder="Enter meta title Description"
						name="contact_us_meta_description"
						value={settings.contact_us_meta_description}
						onBlur={handleBlurSingleValue}
						onChange={handleChangeSingleValue}
						className="form-fild w-100 "
						type="text"
					/>
				</div>
			</div>
			<hr></hr>
			<div className="row mt-4 font-icon admin_genral_css">
				<div className="col-sm-4">
					<div className="bank-law green-medium-2 fw-bold mt-3">
						<h4>Firm Page</h4>
					</div>
				</div>
				<div className="col-sm-8">
					<label className="font-small weight-medium text-sonic-silver mt-2">Meta Title</label>
					<input
						placeholder="Enter meta title here"
						name="firms_meta_title"
						className="form-fild w-100 "
						value={settings.firms_meta_title}
						onBlur={handleBlurSingleValue}
						onChange={handleChangeSingleValue}
						type="text"
					/>
					<label className="font-small weight-medium text-sonic-silver mt-2">Meta Description</label>
					<input
						placeholder="Enter meta title Description"
						name="firms_meta_description"
						className="form-fild w-100 "
						value={settings.firms_meta_description}
						onBlur={handleBlurSingleValue}
						onChange={handleChangeSingleValue}
						type="text"
					/>
				</div>
			</div>


			<hr></hr>
			<div className="row mt-4 font-icon admin_genral_css">
				<div className="col-sm-4">
					<div className="bank-law green-medium-2 fw-bold mt-3">
						<h4>For lawyer Page</h4>
					</div>
				</div>
				<div className="col-sm-8">
					<label className="font-small weight-medium text-sonic-silver mt-2">Meta Title</label>
					<input
						placeholder="Enter meta title here"
						name="for_lawyers_meta_title"
						value={settings.for_lawyers_meta_title}
						onBlur={handleBlurSingleValue}
						onChange={handleChangeSingleValue}
						className="form-fild w-100 "
						type="text"
					/>
					<label className="font-small weight-medium text-sonic-silver mt-2">Meta Description</label>
					<input
						placeholder="Enter meta title Description"
						name="for_lawyers_meta_description"
						value={settings.for_lawyers_meta_description}
						onBlur={handleBlurSingleValue}
						onChange={handleChangeSingleValue}
						className="form-fild w-100 "
						type="text"
					/>
				</div>
			</div>
			<div className="row mt-4 font-icon admin_genral_css">
				<div className="col-sm-4">
					<div className='row'>
						<div className="col-sm-12">
							<div className="bank-law green-medium-2 fw-bold mt-3">
								<h4 className="mb-2">Payment Mode</h4>
							</div>
							<div className="row">
								<div className="col-md-6 col-sm-12">
									<select
										className="form-control"
										name="payment_mode"
										value={settings.payment_mode}
										onBlur={handleBlurSingleValue}
										onChange={handleChangeSingleValue}
									>
										<option value="testing">Testing</option>
										<option value="live">Live</option>
									</select>
								</div>
								<div className="col-md-6 col-sm-12">
									<button type="button" className="btn btn-success">
										update
									</button>
								</div>
							</div>
						</div>
						<div className="col-sm-12 mt-4">
							<div className="bank-law green-medium-2 fw-bold mt-3">
								<h4 className="mb-2">Membership Mode</h4>
							</div>
							<div className="row">
								<div className="col-md-6 col-sm-12">
									<select
										className="form-control"
										name="payment_membership"
										value={settings.payment_membership}
										onBlur={handleBlurSingleValue}
										onChange={handleChangeSingleValue}
									>
										<option value="true">On</option>
										<option value="false">Off</option>
									</select>
								</div>
								<div className="col-md-6 col-sm-12">
									<button type="button" className="btn btn-success">
										update
									</button>
								</div>
							</div>
						</div>
					</div>

				</div>
				<div className="col-sm-8">
					<div className="row">
						<div className="col-sm-6">
							<label className="font-small weight-medium text-sonic-silver mt-2">
								Stripe Test Secret Key
							</label>
							<input
								placeholder="Enter stripe test secret key"
								className="form-fild w-100 "
								name="stripe_test_secret_key"
								type="text"
								value={settings.stripe_test_secret_key}
								onBlur={handleBlurSingleValue}
								onChange={handleChangeSingleValue}
							/>
						</div>
						<div className="col-sm-6">
							<label className="font-small weight-medium text-sonic-silver mt-2">
								Stripe Test Publish Key
							</label>
							<input
								placeholder="Enter stripe test publish key"
								name="stripe_test_publish_key"
								className="form-fild w-100 "
								type="text"
								value={settings.stripe_test_publish_key}
								onBlur={handleBlurSingleValue}
								onChange={handleChangeSingleValue}
							/>
						</div>
					</div>
					<div className="row mt-2">
						<div className="col-sm-6">
							<label className="font-small weight-medium text-sonic-silver mt-2">
								Stripe Live Secret Key
							</label>
							<input
								placeholder="Enter stripe live secret key"
								name="stripe_live_secret_key"
								className="form-fild w-100 "
								type="text"
								value={settings.stripe_live_secret_key}
								onBlur={handleBlurSingleValue}
								onChange={handleChangeSingleValue}
							/>
						</div>
						<div className="col-sm-6">
							<label className="font-small weight-medium text-sonic-silver mt-2">
								Stripe Live Publish Key
							</label>
							<input
								placeholder="Enter stripe live secret key"
								name="stripe_live_publish_key"
								className="form-fild w-100 "
								type="text"
								value={settings.stripe_live_publish_key}
								onBlur={handleBlurSingleValue}
								onChange={handleChangeSingleValue}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
