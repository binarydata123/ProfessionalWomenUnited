import Image from 'next/image';
import React from 'react';
import './style.css';
import DefaultButton from '@/commonUI/DefaultButton';

export default function BasicInformation() {
	return (
		<div className="basic-information-wrapper">
			<p className="weight-medium font-small color-light">Tell us about yourself</p>
			<p className="font-small  weight-medium text-sonic-silver mt-2">Profile Picture</p>
			<div className="row mb-3">
				<div className="col-sm-2 col-3 pr-0 mt-1">
					<Image src="/images/profile-circle.png" alt="profile-circle" width={70} height={70} />
				</div>
				<div className="col-sm-10 col-9">
					<div className="file-btn-upload mt-3">
						<input type="file" className="file-up d-none" />
						<DefaultButton
							showIcon={false}
							className="bg-893168 weight-semi-bold font-small save-pad b-r-btn"
						>
							<i className="fa-solid fa-image"></i> &nbsp; Upload Picture
						</DefaultButton>
					</div>
				</div>
			</div>
			<form>
				<label className="font-small  weight-medium text-sonic-silver w-100">First Name</label>
				<input type="text" placeholder="Sara" className="form-fild  w-100" />

				<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">Last Name</label>
				<input type="text" placeholder="All" className="form-fild  w-100" />

				<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">Email ID</label>
				<input type="text" placeholder="sara.ali@gmail.com" className="form-fild  w-100" />

				<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">Contact Number</label>
				<input type="text" placeholder="Contact Number" className="form-fild  w-100" />

				<div className="row">
					<div className="col-sm-6 col-6">
						<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">Gender</label>
						<select className="form-fild  w-100">
							<option>Female</option>
							<option>Male</option>
						</select>
					</div>
					<div className="col-sm-6 col-6">
						<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">Location</label>
						<select className="form-fild  w-100">
							<option>Dubai (DXB)</option>
							<option>Dubai (DXB)</option>
						</select>
					</div>
				</div>
			</form>
		</div>
	);
}
