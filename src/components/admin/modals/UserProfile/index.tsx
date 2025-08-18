import Image from 'next/image';
import React from 'react';

export default function UserProfile() {
	return (
		<div className="user-profile-wrapper">
			<Image src="/images/Profile-Avatar2.png" alt="Profile-Avatar2" width={80} height={80} />

			<h5 className="modal-title f-22 weight-bold green-dark mt-2" id="exampleModalLabel">
				{' '}
				Client Name
			</h5>
			<p className="weight-medium font-small color-light">Location</p>

			<div className="row">
				<div className="col-sm-5">
					<p className="text-sonic-silver weight-medium font-x-small color-light mt-3 mb-1">Email ID</p>
					<p className="weight-light font-small color-light">
						alan.moore@gmail.com &nbsp;
						<Image src="/images/copy.png" alt="copy" width={20} height={20} />
					</p>
				</div>
				<div className="col-sm-5">
					<p className="text-sonic-silver weight-medium font-x-small color-light mt-3  mb-1">
						Contact Number
					</p>
					<p className="weight-light font-small color-light">
						+971 55 1234567 &nbsp;
						<Image src="/images/copy.png" alt="copy" width={20} height={20} />
					</p>
				</div>
			</div>

			<p className="text-sonic-silver weight-medium font-x-small color-light mt-3">Gender</p>
			<p className="weight-light font-small color-light">Female</p>

			<div className="row mt-4">
				<div className="col-sm-8 col-7">
					{' '}
					<h5 className="modal-title f-22 weight-bold  green-dark ">Reported for:</h5>
				</div>
				<div className="col-sm-4 col-5 text-right">
					<p>
						<a className="boysenberry font-small weight-semi-bold " href="#">
							View Public Profile <i className="fa-solid fa-angle-right box-right icon-size-10"></i>
						</a>
					</p>
				</div>
			</div>

			<div className="form-fild-des mt-3 mb-3">
				<label className="social-link font-small weight-medium w-100 mt-2">
					<input type="checkbox" />
					<span className="checkmark"></span>
					Spam (ads, self-promotion)
				</label>
			</div>

			<p className="weight-light font-small color-light mt-2">
				Reported by User Name <span className="green-medium-2"> (View Profile | Public Profile)</span>
			</p>

			<div className="row mt-3 mb-4">
				<div className="col-sm-6 m-m-b-1 modal-ft mb-2">
					<button type="button" className="btn btn-cancel w-100 save-pad" data-bs-dismiss="modal">
						<i className="fa-solid fa-xmark"></i> &nbsp; Suspend Account
					</button>
				</div>
				<div className="col-sm-6 ">
					<button className="bg-893168 weight-semi-bold font-small w-100  mar-top-min b-r-btn save-pad  btn-approve">
						<i className="fa-solid fa-check"></i> &nbsp; Approve Account
					</button>
				</div>
			</div>
		</div>
	);
}
