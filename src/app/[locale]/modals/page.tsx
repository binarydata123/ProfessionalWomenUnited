import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './style.css';
export default function popup() {
	return (
		<div>
			<div className="container pt-5">
				<div className="popup-1">
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal"
					>
						Report User
					</button>

					<div
						className="modal fade"
						id="exampleModal"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog max-338">
							<div className="modal-content">
								<div className="modal-body">
									<div className="colse-icon text-right">
										<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
									</div>
									<h5
										className="modal-title f-22 weight-bold social-link mb-4"
										id="exampleModalLabel"
									>
										Report User
									</h5>
									<p className="text-sonic-silver weight-medium font-small ">Select a reason:</p>
									<div className="form-fild-des">
										<label className="social-link font-small weight-medium w-100 mt-2">
											<input type="checkbox" />
											<span className="checkmark"></span>
											Inappropriate/Offensive
										</label>
										<label className="social-link font-small weight-medium w-100 mt-2">
											<input type="checkbox" />
											<span className="checkmark"></span>
											Spam (ads, self-promotion)
										</label>
										<label className="social-link font-small weight-medium w-100 mt-2">
											<input type="checkbox" />
											<span className="checkmark"></span>
											Other
										</label>
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-cancel" data-bs-dismiss="modal">
										Cancel
									</button>
									<button className="bg-893168 weight-semi-bold font-small  mar-top-min b-r-btn">
										Report
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="popup-2 mt-3">
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal2"
					>
						Report User 2
					</button>

					<div
						className="modal fade"
						id="exampleModal2"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog max-338">
							<div className="modal-content">
								<div className="modal-body">
									<div className="colse-icon text-right">
										<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
									</div>
									<h5
										className="modal-title f-22 weight-bold social-link mb-4"
										id="exampleModalLabel"
									>
										Report User
									</h5>
									<p className="text-sonic-silver weight-medium font-small ">Select a reason:</p>
									<div className="form-fild-des">
										<label className="social-link font-small weight-medium w-100 mt-2">
											<input type="checkbox" />
											<span className="checkmark"></span>
											Inappropriate/Offensive
										</label>
										<label className="social-link font-small weight-medium w-100 mt-2">
											<input type="checkbox" />
											<span className="checkmark"></span>
											Spam (ads, self-promotion)
										</label>
										<label className="social-link font-small weight-medium w-100 mt-2">
											<input type="checkbox" />
											<span className="checkmark"></span>
											Other
										</label>

										<textarea
											className="form-fild  w-100 h-110"
											placeholder="Please state a reason..."
										>
											{' '}
										</textarea>
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-cancel" data-bs-dismiss="modal">
										Cancel
									</button>
									<button className="bg-893168 weight-semi-bold font-small  mar-top-min b-r-btn">
										Report
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="popup-3 mt-3">
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal3"
					>
						Delete Message?
					</button>

					<div
						className="modal fade"
						id="exampleModal3"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog max-338">
							<div className="modal-content">
								<div className="modal-body">
									<div className="colse-icon text-right">
										<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
									</div>
									<h5
										className="modal-title f-22 weight-bold social-link mb-4"
										id="exampleModalLabel"
									>
										{' '}
										Delete Message?
									</h5>
									<p className="text-sonic-silver weight-medium font-small ">
										This action will remove the message from your inbox.
									</p>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-cancel" data-bs-dismiss="modal">
										Cancel
									</button>
									<button className="bg-893168 weight-semi-bold font-small  mar-top-min b-r-btn">
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="popup-4 mt-3">
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal4"
					>
						Popup 4
					</button>

					<div
						className="modal fade"
						id="exampleModal4"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog max-338">
							<div className="modal-content">
								<div className="modal-body">
									<div className="colse-icon text-right">
										<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
									</div>
									<Image
										src="/images/profile-circle.png"
										alt="profile-circle"
										width={80}
										height={80}
									/>

									<h5 className="modal-title f-22 weight-bold green-dark mt-2" id="exampleModalLabel">
										{' '}
										Client Name
									</h5>
									<p className="weight-medium font-small color-light">Location</p>

									<p className="text-sonic-silver weight-medium font-x-small color-light mt-3">
										Email ID
									</p>
									<p className="weight-light font-small color-light">
										sara.ali@gmail.com &nbsp;
										<Image src="/images/copy.png" alt="copy" width={20} height={20} />
									</p>

									<p className="text-sonic-silver weight-medium font-x-small color-light mt-3">
										Contact Number
									</p>
									<p className="weight-light font-small color-light">
										+971 55 1234567 &nbsp;
										<Image src="/images/copy.png" alt="copy" width={20} height={20} />
									</p>

									<p className="text-sonic-silver weight-medium font-x-small color-light mt-3">
										Gender
									</p>
									<p className="weight-light font-small color-light">Female</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<h1 className="mt-5">User Dashboard - Regular User</h1>

				<div className="popup-5 mt-3">
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal5"
					>
						Basic Information
					</button>

					<div
						className="modal fade basic-information"
						id="exampleModal5"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog max-512">
							<div className="modal-content">
								<div className="modal-body">
									<div className="colse-icon text-right">
										<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
									</div>
									<h5
										className="modal-title f-22 weight-bold  green-dark mt-2"
										id="exampleModalLabel"
									>
										Basic Information
									</h5>
									<p className="weight-medium font-small color-light">Tell us about yourself</p>

									<p className="font-small  weight-medium text-sonic-silver mt-2">Profile Picture</p>
									<div className="row mb-3 align-items-center">
										<div className="col-sm-2 col-3 pr-0 mt-1">
											<Image
												src="/images/profile-circle.png"
												alt="profile-circle"
												width={70}
												height={70}
											/>
										</div>
										<div className="col-sm-10 col-9">
											<div className="file-btn-upload mt-3">
												<input type="file" className="file-up" />
												<button className="bg-893168 weight-semi-bold font-small save-pad b-r-btn">
													<i className="fa-solid fa-image"></i> &nbsp; Upload Picturedd
												</button>
											</div>
										</div>
									</div>

									<form>
										<label className="font-small  weight-medium text-sonic-silver w-100">
											First Name
										</label>
										<input type="text" placeholder="Sara" className="form-fild  w-100" />

										<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">
											Last Name
										</label>
										<input type="text" placeholder="All" className="form-fild  w-100" />

										<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">
											Email ID
										</label>
										<input
											type="text"
											placeholder="sara.ali@gmail.com"
											className="form-fild  w-100"
										/>

										<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">
											Contact Number
										</label>
										<input type="text" placeholder="Contact Number" className="form-fild  w-100" />

										<div className="row">
											<div className="col-sm-6 col-6">
												<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">
													Gender
												</label>
												<select className="form-fild  w-100">
													<option>Female</option>
													<option>Male</option>
												</select>
											</div>
											<div className="col-sm-6 col-6">
												<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">
													Location
												</label>
												<select className="form-fild  w-100">
													<option>Dubai (DXB)</option>
													<option>Dubai (DXB)</option>
												</select>
											</div>
										</div>
									</form>
								</div>
								<div className="modal-footer modal-ft">
									<div className="row align-items-center">
										<div className="col-sm-3 col-4 p-0">
											<button
												type="button"
												className="btn btn-cancel w-100 save-pad"
												data-bs-dismiss="modal"
											>
												Cancel
											</button>
										</div>
										<div className="col-sm-9 col-8 pr-0">
											<button className="bg-893168 weight-semi-bold font-small w-100  mar-top-min b-r-btn save-pad">
												Save Changes
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<h1 className="mt-5">Admin Dashboard</h1>

				<div className="popup-6 mt-3">
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal6"
					>
						Professionals - Active - View Profile
					</button>

					<div
						className="modal fade"
						id="exampleModal6"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog max-768">
							<div className="modal-content">
								<div className="modal-body">
									<div className="colse-icon text-right close-min">
										<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
									</div>

									<div className="row m-center">
										<div className="col-sm-2 pr-0">
											<Image
												src="/images/user-popup.png"
												alt="user-popup"
												width={130}
												height={130}
												layout="responsive"
												className="w-130 m-img-fixed"
											/>
										</div>
										<div className="col-sm-10">
											<p className="font-large social-link weight-bold ">
												Sara Ali <span className="sub-span">Monthly Subscription</span>
											</p>
											<p className="font-small  weight-semi-bold social-link  ">
												Business Attorney at Company Name
											</p>
											<ul className="rating-location">
												<li className="loc">
													<i className="fa-solid fa-location-dot"></i> Dubai
												</li>
												<li className="rev">
													{' '}
													<i className="fa-solid fa-star"></i> <b>4.1</b>{' '}
													<span>(10 reviews)</span>
												</li>
											</ul>
											<button className="btn-mini success-btn mr-1 mb-2">Business Professional</button>
											<button className="btn-mini danger-btn mr-1 mb-2">
												Licensed for 9 years
											</button>
											<button className="btn-mini danger-btn">Free Consultation: 30 mins</button>
										</div>
									</div>

									<div className="row mt-4 mb-4 align-items-center">
										<div className="col-sm-4 m-m-b-1  mb-2">
											<button
												type="button"
												className="btn btn-cancel w-100 save-pad"
												data-bs-dismiss="modal"
											>
												Upgrade Account
											</button>
										</div>
										<div className="col-sm-4 m-m-b-1 modal-ft">
											<button
												type="button"
												className="btn btn-cancel w-100 save-pad"
												data-bs-dismiss="modal"
											>
												Report Account
											</button>
										</div>
										<div className="col-sm-4   ">
											<button className="bg-893168 weight-semi-bold font-small w-100  mar-top-min b-r-btn save-pad">
												Message
											</button>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-8 col-5">
											<h5 className="modal-title f-22 weight-bold  green-dark">About</h5>
										</div>
										<div className="col-sm-4 col-7 text-right">
											{/* <p><a className="boysenberry font-small weight-semi-bold " href="#">View Public Profile <i className="fa-solid fa-angle-right box-right icon-size-10"></i></a></p> */}
											<button className="btn-tertiary font-small-12 right-icon right-border-icon">
												{' '}
												View all<i className="fa-solid fa-angle-right"></i>{' '}
											</button>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-5">
											<p className="weight-medium font-medium green-medium-2 mt-3">Email ID</p>
											<p className="weight-light font-small color-light">
												sara.ali@gmail.com &nbsp;
												<Image src="/images/copy.png" alt="copy" width={20} height={20} />
											</p>
										</div>
										<div className="col-sm-5">
											<p className="weight-medium font-medium green-medium-2 mt-3">
												Contact Number
											</p>
											<p className="weight-light font-small color-light">
												+971 55 1234567 &nbsp;
												<Image src="/images/copy.png" alt="copy" width={20} height={20} />
											</p>
										</div>
									</div>

									<p className="weight-medium font-medium green-medium-2 mt-3">Gender</p>
									<p className="weight-light font-small color-light">Female</p>

									<p className="weight-medium font-medium green-medium-2 mt-3">
										<i className="fa-brands fa-linkedin-in box-right icon-size-min"></i> LinkedIn
									</p>

									<p className="weight-medium font-medium green-medium-2 mt-3">
										License Number:{' '}
										<span className="weight-light font-small color-light">1234SBA</span>
									</p>

									<p className="weight-medium font-medium green-medium-2 mt-3">
										<i className="fa-regular fa-image   "></i> Legal Jurisdiction:{' '}
										<span className="weight-light font-small color-light">
											DIFC, Mainland Courts
										</span>
									</p>

									<p className="weight-medium font-medium text-sonic-silver mt-3">Specializes In:</p>
									<p className="weight-light font-small color-light">
										Unauthorized Transactions, Fraudulent Activities, Breach of contracts{' '}
									</p>

									<p className="weight-medium font-medium text-sonic-silver mt-3">Bio:</p>
									<p className="weight-light font-small color-light">
										Lorem ipsum dolor sit amet consectetur. Fermentum neque varius nam nunc
										consectetur. Massa a nulla hendrerit auctor ornare vel arcu quis ut.
										Pellentesque malesuada euismod ullamcorper enim congue suspendisse cras lacinia
										viverra. At a commodo lorem ipsum diam arcu maecenas. Consequat felis aliquam
										ullamcorper quisque nibh adipiscing facilisis.
									</p>

									<p className="weight-medium font-medium text-sonic-silver mt-3">
										Licensed for 9 years:
									</p>

									<p className="font-medium  weight-medium text-sonic-silver mt-2">
										{' '}
										Licensed for 9 years:{' '}
									</p>

									<div className="row">
										<div className="col-sm-10">
											<div className="card-acquired mt-2">
												<div className="row">
													<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
														<p className="font-x-small text-sonic-silver weight-light">
															Acquired
														</p>
														<p className="font-medium  weight-medium text-sonic-silver mt-2">
															2014{' '}
														</p>
													</div>
													<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
														<p className="font-x-small text-sonic-silver weight-light">
															Location
														</p>
														<p className="font-medium  weight-medium text-sonic-silver mt-2">
															DXB{' '}
														</p>
													</div>
													<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
														<p className="font-x-small text-sonic-silver weight-light">
															Status
														</p>
														<p className="font-medium  weight-medium green-medium-2 mt-2">
															ACTIVE{' '}
														</p>
													</div>
													<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
														<p className="font-x-small text-sonic-silver weight-light">
															Updated
														</p>
														<p className="font-medium  weight-medium text-sonic-silver mt-2">
															23/05/2023{' '}
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>

									<h5 className="modal-title f-22 weight-bold  green-dark mt-4">Cost</h5>

									<p className="weight-light font-small color-light mt-2">Hourly Rates</p>
									<p className="modal-title font-large weight-bold  green-medium-2 ">
										USD 500 - USD 1000/hr
									</p>

									<p className="weight-light font-small color-light mt-2">Payment Methods</p>
									<p className="modal-title font-large weight-bold  green-medium-2 ">
										Cash/Bank Transfer
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="popup-7 mt-3">
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal7"
					>
						Professionals - Active - View Profile
					</button>

					<div
						className="modal fade"
						id="exampleModal7"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog max-768">
							<div className="modal-content">
								<div className="modal-body">
									<div className="colse-icon text-right close-min">
										<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
									</div>

									<div className="row m-center">
										<div className="col-sm-2 pr-0">
											<Image
												src="/images/user-popup.png"
												alt="user-popup"
												width={130}
												height={130}
												layout="responsive"
												className="w-130  m-img-fixed"
											/>
										</div>
										<div className="col-sm-10">
											<p className="font-large social-link weight-bold ">
												Sara Ali <span className="sub-span">Monthly Subscription</span>
											</p>
											<p className="font-small  weight-semi-bold social-link  ">
												Business Attorney at Company Name
											</p>
											<ul className="rating-location">
												<li className="loc">
													<i className="fa-solid fa-location-dot"></i> Dubai
												</li>
												<li className="rev">
													{' '}
													<i className="fa-solid fa-star"></i> <b>4.1</b>{' '}
													<span>(10 reviews)</span>
												</li>
											</ul>
											<button className="btn-mini success-btn mr-1 mb-2">Business Profession</button>
											<button className="btn-mini danger-btn mr-1  mb-2">
												Licensed for 9 years
											</button>
											<button className="btn-mini danger-btn">Free Consultation: 30 mins</button>
										</div>
									</div>

									<div className="row mt-3 mb-4">
										<div className="col-sm-4 m-m-b-1 mb-2">
											<button
												type="button"
												className="btn btn-cancel w-100 save-pad"
												data-bs-dismiss="modal"
											>
												Upgrade Account
											</button>
										</div>
										<div className="col-sm-4 m-m-b-1 modal-ft  mb-2">
											<button
												type="button"
												className="btn btn-cancel w-100 save-pad"
												data-bs-dismiss="modal"
											>
												Report Account
											</button>
										</div>
										<div className="col-sm-4  ">
											<button className="bg-893168 weight-semi-bold font-small w-100  mar-top-min b-r-btn save-pad">
												Message
											</button>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-8">
											<h5 className="modal-title f-22 weight-bold  green-dark">
												How would you like to upgrade account?
											</h5>
										</div>
										<div className="col-sm-4 text-right">
											<p>
												<a className="boysenberry font-small weight-semi-bold " href="#">
													View Public Profile{' '}
													<i className="fa-solid fa-angle-right box-right icon-size-10"></i>
												</a>
											</p>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-5">
											<p className="weight-medium font-medium green-medium-2 mt-3">Start</p>
											<p className="weight-light font-small color-light">DD/MM/YYYY</p>
										</div>
										<div className="col-sm-5">
											<p className="weight-medium font-medium green-medium-2 mt-3">Expiry</p>
											<p className="weight-light font-small color-light">DD/MM/YYYY</p>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-6">
											<form>
												<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">
													Choose Type
												</label>
												<select className="form-fild  w-100">
													<option>Monthly Plan</option>
													<option>Monthly Plan</option>
												</select>

												<div className="row">
													<div className="col-sm-12 col-12">
														{' '}
														<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">
															Duration
														</label>{' '}
													</div>
													<div className="col-sm-6 col-6">
														<select className="form-fild  w-100">
															<option>Number</option>
															<option>Number</option>
														</select>
													</div>
													<div className="col-sm-6 col-6">
														<select className="form-fild  w-100">
															<option>Select Period</option>
															<option>Select Period</option>
														</select>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="popup-8 mt-3">
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal8"
					>
						Report User 8
					</button>

					<div
						className="modal fade"
						id="exampleModal8"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog max-400">
							<div className="modal-content">
								<div className="modal-body">
									<div className="colse-icon text-right">
										<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
									</div>
									<h5
										className="modal-title f-22 weight-bold social-link mb-4"
										id="exampleModalLabel"
									>
										Send Message
									</h5>
									<div className="row">
										<div className="col-8">
											<p className="text-sonic-silver weight-medium font-small ">
												Write a message*
											</p>
										</div>
										<div className="col-4 text-right">
											<p className="Chinese-silver font-x-small weight-light">2000</p>
										</div>
									</div>

									<div className="form-fild-des">
										<textarea
											placeholder="Lorem ipsum dolor sit amet consectetur. Sed id enim eget risus suspendisse fringilla eu. Ut duis suspendisse tortor auctor pretium sed. Potenti pharetra quis lacus tristique condimentum quis sit et. In purus nunc tempus urna congue felis dolor."
											className="form-fild  w-100 h-175"
										>
											{' '}
										</textarea>

										<div className="row mt-2">
											<div className="col-sm-12">
												<p className="text-sonic-silver weight-medium font-small mb-2">
													How would you like to send this message?
												</p>
											</div>
											<div className="col-md-5">
												<label className="social-link font-small weight-medium w-100 mt-2">
													<input type="checkbox" />
													<span className="checkmark"></span>
													In Platform
												</label>
											</div>
											<div className="col-md-4">
												<label className="social-link font-small weight-medium w-100 mt-2">
													<input type="checkbox" />
													<span className="checkmark"></span>
													Email
												</label>
											</div>
											<div className="col-md-3">
												<label className="social-link font-small weight-medium w-100 mt-2">
													<input type="checkbox" />
													<span className="checkmark"></span>
													Both
												</label>
											</div>
										</div>
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn btn-cancel" data-bs-dismiss="modal">
										Cancel
									</button>
									<button className="bg-893168 weight-semi-bold font-small  mar-top-min b-r-btn">
										Report
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="popup-9 mt-3">
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal9"
					>
						popup 9
					</button>

					<div
						className="modal fade"
						id="exampleModal9"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog max-768">
							<div className="modal-content">
								<div className="modal-body">
									<div className="colse-icon text-right close-min">
										<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
									</div>

									<div className="row m-center">
										<div className="col-sm-2 pr-0">
											<Image
												src="/images/user-popup.png"
												alt="user-popup"
												width={130}
												height={130}
												layout="responsive"
												className="w-130 m-img-fixed"
											/>
										</div>
										<div className="col-sm-10">
											<p className="font-large social-link weight-bold ">
												Sara Ali <span className="sub-span">Monthly Subscription</span>
											</p>
											<p className="font-small  weight-semi-bold social-link  ">
												Business Attorney at Company Name
											</p>
											<ul className="rating-location">
												<li className="loc">
													<i className="fa-solid fa-location-dot"></i> Dubai
												</li>
												<li className="rev">
													{' '}
													<i className="fa-solid fa-star"></i> <b>4.1</b>{' '}
													<span>(10 reviews)</span>
												</li>
											</ul>
											<button className="btn-mini success-btn mr-1 mb-2">Business Profession</button>
											<button className="btn-mini danger-btn mr-1 mb-2">
												Licensed for 9 years
											</button>
											<button className="btn-mini danger-btn ">Free Consultation: 30 mins</button>
										</div>
									</div>

									<div className="row mt-3 mb-4">
										<div className="col-sm-6 m-m-b-1 modal-ft mb-2">
											<button
												type="button"
												className="btn btn-cancel w-100 save-pad"
												data-bs-dismiss="modal"
											>
												<i className="fa-solid fa-xmark"></i> &nbsp; Reject
											</button>
										</div>
										<div className="col-sm-6 ">
											<button className="bg-893168 weight-semi-bold font-small w-100  mar-top-min b-r-btn save-pad  btn-approve">
												<i className="fa-solid fa-check"></i> &nbsp; Approve
											</button>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-8 col-4">
											<h5 className="modal-title f-22 weight-bold  green-dark">About</h5>
										</div>
										<div className="col-sm-4 col-8 text-right  ">
											<p>
												<a className="boysenberry font-small weight-semi-bold " href="#">
													View Public Profile{' '}
													<i className="fa-solid fa-angle-right box-right icon-size-10"></i>
												</a>
											</p>
										</div>
									</div>

									<div className="row">
										<div className="col-sm-5">
											<p className="weight-medium font-medium green-medium-2 mt-3">Email ID</p>
											<p className="weight-light font-small color-light">
												sara.ali@gmail.com &nbsp;
												<Image src="/images/copy.png" alt="copy" width={20} height={20} />
											</p>
										</div>
										<div className="col-sm-5">
											<p className="weight-medium font-medium green-medium-2 mt-3">
												Contact Number
											</p>
											<p className="weight-light font-small color-light">
												+971 55 1234567 &nbsp;
												<Image src="/images/copy.png" alt="copy" width={20} height={20} />
											</p>
										</div>
									</div>

									<p className="weight-medium font-medium green-medium-2 mt-3">Gender</p>
									<p className="weight-light font-small color-light">Female</p>

									<p className="weight-medium font-medium green-medium-2 mt-3">
										<i className="fa-brands fa-linkedin-in box-right icon-size-min"></i> LinkedIn
									</p>

									<p className="weight-medium font-medium green-medium-2 mt-3">
										License Number:{' '}
										<span className="weight-light font-small color-light">1234SBA</span>
									</p>

									<p className="weight-medium font-medium green-medium-2 mt-3">
										<i className="fa-regular fa-image   "></i> Legal Jurisdiction:{' '}
										<span className="weight-light font-small color-light">
											DIFC, Mainland Courts
										</span>
									</p>

									<p className="weight-medium font-medium text-sonic-silver mt-3">Specializes In:</p>
									<p className="weight-light font-small color-light">
										Unauthorized Transactions, Fraudulent Activities, Breach of contracts{' '}
									</p>

									<p className="weight-medium font-medium text-sonic-silver mt-3">Bio:</p>
									<p className="weight-light font-small color-light">
										Lorem ipsum dolor sit amet consectetur. Fermentum neque varius nam nunc
										consectetur. Massa a nulla hendrerit auctor ornare vel arcu quis ut.
										Pellentesque malesuada euismod ullamcorper enim congue suspendisse cras lacinia
										viverra. At a commodo lorem ipsum diam arcu maecenas. Consequat felis aliquam
										ullamcorper quisque nibh adipiscing facilisis.
									</p>

									<p className="weight-medium font-medium text-sonic-silver mt-3">
										Licensed for 9 years:
									</p>

									<p className="font-medium  weight-medium text-sonic-silver mt-2">
										{' '}
										Licensed for 9 years:{' '}
									</p>

									<div className="row">
										<div className="col-sm-10">
											<div className="card-acquired mt-2">
												<div className="row">
													<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
														<p className="font-x-small text-sonic-silver weight-light">
															Acquired
														</p>
														<p className="font-medium  weight-medium text-sonic-silver mt-2">
															2014{' '}
														</p>
													</div>
													<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
														<p className="font-x-small text-sonic-silver weight-light">
															Location
														</p>
														<p className="font-medium  weight-medium text-sonic-silver mt-2">
															DXB{' '}
														</p>
													</div>
													<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
														<p className="font-x-small text-sonic-silver weight-light">
															Status
														</p>
														<p className="font-medium  weight-medium green-medium-2 mt-2">
															ACTIVE{' '}
														</p>
													</div>
													<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
														<p className="font-x-small text-sonic-silver weight-light">
															Updated
														</p>
														<p className="font-medium  weight-medium text-sonic-silver mt-2">
															23/05/2023{' '}
														</p>
													</div>
												</div>
											</div>
										</div>
									</div>

									<h5 className="modal-title f-22 weight-bold  green-dark mt-4">Cost</h5>

									<p className="weight-light font-small color-light mt-2">Hourly Rates</p>
									<p className="modal-title font-large weight-bold  green-medium-2 ">
										USD 500 - USD 1000/hr
									</p>

									<p className="weight-light font-small color-light mt-2">Payment Methods</p>
									<p className="modal-title font-large weight-bold  green-medium-2 ">
										Cash/Bank Transfer
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="popup-10 mt-3">
					<button
						type="button"
						className="btn btn-primary"
						data-bs-toggle="modal"
						data-bs-target="#exampleModal10"
					>
						popup 10
					</button>

					<div
						className="modal fade"
						id="exampleModal10"
						aria-labelledby="exampleModalLabel"
						aria-hidden="true"
					>
						<div className="modal-dialog max-768">
							<div className="modal-content">
								<div className="modal-body">
									<div className="colse-icon text-right close-min">
										<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
									</div>

									<div className="row m-center">
										<div className="col-sm-2 pr-0">
											<Image
												src="/images/user-popup.png"
												alt="user-popup"
												width={130}
												height={130}
												layout="responsive"
												className="w-130 m-img-fixed"
											/>
										</div>
										<div className="col-sm-10">
											<p className="font-large social-link weight-bold ">
												Sara Ali <span className="sub-span">Monthly Subscription</span>
											</p>
											<p className="font-small  weight-semi-bold social-link  ">
												Business Attorney at Company Name
											</p>
											<ul className="rating-location">
												<li className="loc">
													<i className="fa-solid fa-location-dot"></i> Dubai
												</li>
												<li className="rev">
													{' '}
													<i className="fa-solid fa-star"></i> <b>4.1</b>{' '}
													<span>(10 reviews)</span>
												</li>
											</ul>
											<button className="btn-mini success-btn mr-1 mb-2">Business Profession</button>
											<button className="btn-mini danger-btn mr-1 mb-2">
												Licensed for 9 years
											</button>
											<button className="btn-mini danger-btn ">Free Consultation: 30 mins</button>
										</div>
									</div>

									<div className="row mt-3">
										<div className="col-sm-5">
											<p className="weight-medium font-medium green-medium-2 mt-3">Email ID</p>
											<p className="weight-light font-small color-light">
												sara.ali@gmail.com &nbsp;
												<Image src="/images/copy.png" alt="copy" width={20} height={20} />
											</p>
										</div>
										<div className="col-sm-5">
											<p className="weight-medium font-medium green-medium-2 mt-3">
												Contact Number
											</p>
											<p className="weight-light font-small color-light">
												+971 55 1234567 &nbsp;
												<Image src="/images/copy.png" alt="copy" width={20} height={20} />
											</p>
										</div>
									</div>

									<p className="weight-medium font-medium green-medium-2 mt-3">Gender</p>
									<p className="weight-light font-small color-light">Female</p>

									<p className="weight-medium font-medium green-medium-2 mt-3">
										<i className="fa-brands fa-linkedin-in box-right icon-size-min"></i> LinkedIn
									</p>

									<div className="row">
										<div className="col-sm-5">
											<p className="weight-medium font-medium green-medium-2 mt-3">
												License Number:{' '}
												<span className="weight-light font-small color-light">1234SBA</span>
											</p>
										</div>
										<div className="col-sm-7">
											<p className="weight-medium font-medium green-medium-2 mt-3">
												<i className="fa-regular fa-image   "></i> Legal Jurisdiction:{' '}
												<span className="weight-light font-small color-light">
													DIFC, Mainland Courts
												</span>
											</p>
										</div>
									</div>
								</div>

								<div className="row mt-4">
									<div className="col-sm-8 col-7">
										{' '}
										<h5 className="modal-title f-22 weight-bold  green-dark ">Reported for:</h5>
									</div>
									<div className="col-sm-4 col-5 text-right">
										{/* <p><a className="boysenberry font-small weight-semi-bold " href="#">View Public Profile <i className="fa-solid fa-angle-right box-right icon-size-10"></i></a></p> */}
										<button className="btn-tertiary font-small-12 right-icon right-border-icon">
											{' '}
											View all<i className="fa-solid fa-angle-right"></i>{' '}
										</button>
									</div>
								</div>

								<div className="row mt-4">
									<div className="col-sm-8 col-7">
										{' '}
										<h5 className="modal-title f-22 weight-bold  green-dark ">Reported for:</h5>
									</div>
									<div className="col-sm-4 col-5 text-right">
										<p>
											<a className="boysenberry font-small weight-semi-bold " href="#">
												View Public Profile{' '}
												<i className="fa-solid fa-angle-right box-right icon-size-10"></i>
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
									Reported by User Name{' '}
									<span className="green-medium-2"> (View Profile | Public Profile)</span>
								</p>

								<div className="row mt-3 mb-4">
									<div className="col-sm-6 m-m-b-1 modal-ft mb-2">
										<button
											type="button"
											className="btn btn-cancel w-100 save-pad"
											data-bs-dismiss="modal"
										>
											<i className="fa-solid fa-xmark"></i> &nbsp; Suspend
										</button>
									</div>
									<div className="col-sm-6 ">
										<button className="bg-893168 weight-semi-bold font-small w-100  mar-top-min b-r-btn save-pad  btn-approve">
											<i className="fa-solid fa-check"></i> &nbsp; Approve
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="popup-11 mt-3">
				<button
					type="button"
					className="btn btn-primary"
					data-bs-toggle="modal"
					data-bs-target="#exampleModal11"
				>
					popup 11
				</button>

				<div className="modal fade" id="exampleModal11" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog max-768">
						<div className="modal-content">
							<div className="modal-body">
								<div className="colse-icon text-right close-min">
									<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
								</div>

								<div className="row m-center">
									<div className="col-sm-2 pr-0">
										<Image
											src="/images/user-popup.png"
											alt="user-popup"
											width={130}
											height={130}
											layout="responsive"
											className="w-130 m-img-fixed"
										/>
									</div>
									<div className="col-sm-10">
										<p className="font-large social-link weight-bold ">
											Sara Ali <span className="sub-span">Monthly Subscription</span>
										</p>
										<p className="font-small  weight-semi-bold social-link  ">
											Business Attorney at Company Name
										</p>
										<ul className="rating-location">
											<li className="loc">
												<i className="fa-solid fa-location-dot"></i> Dubai
											</li>
											<li className="rev">
												{' '}
												<i className="fa-solid fa-star"></i> <b>4.1</b>{' '}
												<span>(10 reviews)</span>
											</li>
										</ul>
										<button className="btn-mini success-btn mr-1 mb-2">Business Profession</button>
										<button className="btn-mini danger-btn mr-1 mb-2">Licensed for 9 years</button>
										<button className="btn-mini danger-btn ">Free Consultation: 30 mins</button>
									</div>
								</div>

								<div className="row mt-3">
									<div className="col-sm-5">
										<p className="weight-medium font-medium green-medium-2 mt-3">Email ID</p>
										<p className="weight-light font-small color-light">
											sara.ali@gmail.com &nbsp;
											<Image src="/images/copy.png" alt="copy" width={20} height={20} />
										</p>
									</div>
									<div className="col-sm-5">
										<p className="weight-medium font-medium green-medium-2 mt-3">Contact Number</p>
										<p className="weight-light font-small color-light">
											+971 55 1234567 &nbsp;
											<Image src="/images/copy.png" alt="copy" width={20} height={20} />
										</p>
									</div>
								</div>

								<p className="weight-medium font-medium green-medium-2 mt-3">Gender</p>
								<p className="weight-light font-small color-light">Female</p>

								<p className="weight-medium font-medium green-medium-2 mt-3">
									<i className="fa-brands fa-linkedin-in box-right icon-size-min"></i> LinkedIn
								</p>

								<div className="row">
									<div className="col-sm-5">
										<p className="weight-medium font-medium green-medium-2 mt-3">
											License Number:{' '}
											<span className="weight-light font-small color-light">1234SBA</span>
										</p>
									</div>
									<div className="col-sm-7">
										<p className="weight-medium font-medium green-medium-2 mt-3">
											<i className="fa-regular fa-image   "></i> Legal Jurisdiction:{' '}
											<span className="weight-light font-small color-light">
												DIFC, Mainland Courts
											</span>
										</p>
									</div>
								</div>
								<br />
								<p className="font-medium  weight-medium text-sonic-silver mt-2">
									{' '}
									Licensed for 9 years:{' '}
								</p>

								<div className="row">
									<div className="col-sm-10">
										<div className="card-acquired mt-2">
											<div className="row">
												<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
													<p className="font-x-small text-sonic-silver weight-light">
														Acquired
													</p>
													<p className="font-medium  weight-medium text-sonic-silver mt-2">
														2014{' '}
													</p>
												</div>
												<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
													<p className="font-x-small text-sonic-silver weight-light">
														Location
													</p>
													<p className="font-medium  weight-medium text-sonic-silver mt-2">
														DXB{' '}
													</p>
												</div>
												<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
													<p className="font-x-small text-sonic-silver weight-light">
														Status
													</p>
													<p className="font-medium  weight-medium green-medium-2 mt-2">
														ACTIVE{' '}
													</p>
												</div>
												<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
													<p className="font-x-small text-sonic-silver weight-light">
														Updated
													</p>
													<p className="font-medium  weight-medium text-sonic-silver mt-2">
														23/05/2023{' '}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="row mt-4">
									<div className="col-sm-8 col-7">
										{' '}
										<h5 className="modal-title f-22 weight-bold  green-dark ">Reported for:</h5>
									</div>
									<div className="col-sm-4 col-5 text-right">
										<p>
											<a className="boysenberry font-small weight-semi-bold " href="#">
												View Public Profile{' '}
												<i className="fa-solid fa-angle-right box-right icon-size-10"></i>
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
									Reported by User Name{' '}
									<span className="green-medium-2"> (View Profile | Public Profile)</span>
								</p>

								<div className="row mt-3 mb-4">
									<div className="col-sm-9 m-m-b-1 modal-ft mb-2">
										<button
											type="button"
											className="btn btn-cancel w-100 save-pad"
											data-bs-dismiss="modal"
										>
											<i className="fa-solid fa-xmark"></i> &nbsp; Delete Profile
										</button>
									</div>
									<div className="col-sm-3 ">
										<button className="bg-893168 weight-semi-bold font-small w-100  mar-top-min b-r-btn save-pad  btn-approve">
											{' '}
											Re-Evaluate
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="popup-12 mt-3">
				<button
					type="button"
					className="btn btn-primary"
					data-bs-toggle="modal"
					data-bs-target="#exampleModal12"
				>
					Popup 12
				</button>

				<div className="modal fade" id="exampleModal12" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog max-338">
						<div className="modal-content">
							<div className="modal-body">
								<div className="colse-icon text-right">
									<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
								</div>
								<Image src="/images/Profile-Avatar2.png" alt="Profile-Avatar2" width={80} height={80} />

								<h5 className="modal-title f-22 weight-bold green-dark mt-2" id="exampleModalLabel">
									{' '}
									Client Name
								</h5>
								<p className="weight-medium font-small color-light">Location</p>

								<p className="text-sonic-silver weight-medium font-x-small color-light mt-3 mb-1">
									Email ID
								</p>
								<p className="weight-light font-small color-light">
									alan.moore@gmail.com &nbsp;
									<Image src="/images/copy.png" alt="copy" width={20} height={20} />
								</p>

								<p className="text-sonic-silver weight-medium font-x-small color-light mt-3  mb-1">
									Contact Number
								</p>
								<p className="weight-light font-small color-light">
									+971 55 1234567 &nbsp;
									<Image src="/images/copy.png" alt="copy" width={20} height={20} />
								</p>

								<p className="text-sonic-silver weight-medium font-x-small color-light mt-3">Gender</p>
								<p className="weight-light font-small color-light">Female</p>

								<div className="row mt-3">
									<div className="col-sm-5 m-m-b-1 modal-ft  mb-2">
										<button
											type="button"
											className="btn btn-cancel w-100 save-pad"
											data-bs-dismiss="modal"
										>
											Report
										</button>
									</div>
									<div className="col-sm-7">
										<button className="bg-893168 weight-semi-bold font-small w-100  mar-top-min b-r-btn save-pad">
											Message
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="popup-13 mt-3">
				<button
					type="button"
					className="btn btn-primary"
					data-bs-toggle="modal"
					data-bs-target="#exampleModal13"
				>
					popup 13
				</button>

				<div className="modal fade" id="exampleModal13" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog max-600">
						<div className="modal-content">
							<div className="modal-body">
								<div className="colse-icon text-right close-min">
									<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
								</div>

								<Image src="/images/Profile-Avatar2.png" alt="Profile-Avatar2" width={80} height={80} />

								<h5 className="modal-title f-22 weight-bold green-dark mt-2" id="exampleModalLabel">
									{' '}
									Client Name
								</h5>
								<p className="weight-medium font-small color-light">Location</p>

								<div className="row">
									<div className="col-sm-5">
										<p className="text-sonic-silver weight-medium font-x-small color-light mt-3 mb-1">
											Email ID
										</p>
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
												View Public Profile{' '}
												<i className="fa-solid fa-angle-right box-right icon-size-10"></i>
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
									Reported by User Name{' '}
									<span className="green-medium-2"> (View Profile | Public Profile)</span>
								</p>

								<div className="row mt-3 mb-4">
									<div className="col-sm-6 m-m-b-1 modal-ft mb-2">
										<button
											type="button"
											className="btn btn-cancel w-100 save-pad"
											data-bs-dismiss="modal"
										>
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
						</div>
					</div>
				</div>
			</div>

			<div className="popup-14 mt-3">
				<button
					type="button"
					className="btn btn-primary"
					data-bs-toggle="modal"
					data-bs-target="#exampleModal14"
				>
					popup 14
				</button>

				<div className="modal fade" id="exampleModal14" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog max-768">
						<div className="modal-content">
							<div className="modal-body">
								<div className="colse-icon text-right close-min">
									<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
								</div>

								<div className="row mt-4">
									<div className="col-sm-8 col-10">
										{' '}
										<h5 className="modal-title f-22 weight-bold  social-link ">Chat Transcript</h5>
									</div>
								</div>

								<div className="row mt-3">
									<div className="col-sm-3 text-right">
										<p className="social-link font-small weight-bold ">Client Name:</p>
										<p className="social-link font-xx-small weight-bold ">September 23, 8:00AM</p>
									</div>
									<div className="col-sm-9">
										<p className="font-x-small weight-light text-sonic-silver">
											Lorem ipsum dolor sit amet consectetur. Nunc scelerisque justo imperdiet
											nunc enim fusce. Luctus mattis eget suspendisse id nulla proin pellentesque
											sed. Cursus neque congue enim at lacus amet lacus a sit. Adipiscing platea
											suspendisse eu egestas ullamcorper massa tellus diam. Cum magna laoreet leo
											convallis ac pellentesque dictumst.Tempus mauris blandit neque duis id. Et
											posuere quis quis ullamcorper dolor mattis urna. Purus facilisis neque
											viverra eget fermentum eleifend lectus consectetur.
										</p>
									</div>
								</div>

								<hr className="hr-line2 mt-4 mb-4" />

								<div className="row mt-3">
									<div className="col-sm-3 text-right">
										<p className="social-link font-small weight-bold ">Professional Name:</p>
										<p className="social-link font-xx-small weight-bold ">July 23, 8:00AM</p>
									</div>
									<div className="col-sm-9">
										<p className="font-x-small weight-light text-sonic-silver">
											Lorem ipsum dolor sit amet consectetur. Nunc scelerisque justo imperdiet
											nunc enim fusce. Luctus mattis eget suspendisse id nulla proin pellentesque
											sed. Cursus neque congue enim at lacus amet lacus a sit. Adipiscing platea
											suspendisse eu egestas ullamcorper massa tellus diam. Cum magna laoreet leo
											convallis ac pellentesque dictumst.Tempus mauris blandit neque duis id. Et
											posuere quis quis ullamcorper dolor mattis urna. Purus facilisis neque
											viverra eget fermentum eleifend lectus consectetur.
										</p>
									</div>
								</div>

								<hr className="hr-line2 mt-4 mb-4" />

								<div className="row mt-3">
									<div className="col-sm-3 text-right">
										<p className="social-link font-small weight-bold ">Client Name:</p>
										<p className="social-link font-xx-small weight-bold ">July 23, 8:00AM</p>
									</div>
									<div className="col-sm-9">
										<p className="font-x-small weight-light text-sonic-silver">
											Lorem ipsum dolor sit amet consectetur. Nunc scelerisque justo imperdiet
											nunc enim fusce.
										</p>
									</div>
								</div>

								<hr className="hr-line2 mt-4 mb-4" />

								<div className="row mt-3">
									<div className="col-sm-3 text-right">
										<p className="social-link font-small weight-bold ">Professional Name:</p>
										<p className="social-link font-xx-small weight-bold ">July 23, 8:00AM</p>
									</div>
									<div className="col-sm-9">
										<p className="font-x-small weight-light text-sonic-silver">
											Lorem ipsum dolor sit amet consectetur. Nunc scelerisque justo imperdiet
											nunc enim fusce. Luctus mattis eget suspendisse id nulla proin pellentesque
											sed. Cursus neque congue enim at lacus amet lacus a sit.{' '}
										</p>
									</div>
								</div>

								<hr className="hr-line2 mt-4 mb-4" />
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="popup-15 mt-3">
				<button
					type="button"
					className="btn btn-primary"
					data-bs-toggle="modal"
					data-bs-target="#exampleModal15"
				>
					Remove 7 inquiries
				</button>

				<div className="modal fade" id="exampleModal15" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog max-338">
						<div className="modal-content">
							<div className="modal-body">
								<Image src="/images/Featured-icon.png" alt="Featured-icon" width={56} height={56} />

								<h5
									className="modal-title f-22 weight-bold social-link mt-2 mb-2"
									id="exampleModalLabel"
								>
									{' '}
									Remove 7 inquiries
								</h5>
								<p className="color-999999 weight-medium font-small mb-4">
									This action cannot be undone. Do you want to proceed?
								</p>
								<div className="modal-ft ">
									<div className="row">
										<div className="col-sm-5 mb-2">
											<button
												type="button"
												className="btn btn-cancel w-100"
												data-bs-dismiss="modal"
											>
												Cancel
											</button>
										</div>
										<div className="col-sm-7">
											<button className="bg-893168 weight-semi-bold font-small  mar-top-min b-r-btn w-100">
												Delete
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="popup-16 mt-3">
				<button
					type="button"
					className="btn btn-primary"
					data-bs-toggle="modal"
					data-bs-target="#exampleModal16"
				>
					Create Professional Service
				</button>

				<div className="modal fade" id="exampleModal16" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog max-680">
						<div className="modal-content">
							<div className="modal-body">
								<div className="colse-icon text-right">
									<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
								</div>
								<h5 className="modal-title f-22 weight-bold  green-dark mt-2" id="exampleModalLabel">
									Create Professional Service
								</h5>

								<form className="mt-2">
									<div className="row">
										<div className="col-sm-8">
											<label className="font-small  weight-medium text-sonic-silver w-100">
												Name the tag
											</label>
										</div>
										<div className="col-sm-4 text-right">
											<p className="Chinese-silver font-x-small weight-light">100</p>
										</div>
									</div>
									<input type="text" placeholder="Enter name" className="form-fild  w-100" />

									<div className="modal-ft">
										<div className="row mt-4">
											<div className="col-sm-3 col-4">
												<button
													type="button"
													className="btn btn-cancel w-100 save-pad"
													data-bs-dismiss="modal"
												>
													Cancel
												</button>
											</div>
											<div className="col-sm-9 col-8">
												<button className="bg-893168 weight-semi-bold font-small w-100  mar-top-min b-r-btn save-pad">
													Save
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="popup-17 mt-3">
				<button
					type="button"
					className="btn btn-primary"
					data-bs-toggle="modal"
					data-bs-target="#exampleModal17"
				>
					Create Tag
				</button>
				<div className="modal fade" id="exampleModal17" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog max-680">
						<div className="modal-content">
							<div className="modal-body">
								<div className="colse-icon text-right">
									<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
								</div>
								<h5 className="modal-title f-22 weight-bold  green-dark mt-2" id="exampleModalLabel">
									Create Tag
								</h5>

								<form className="mt-2">
									<div className="row">
										<div className="col-sm-8">
											<label className="font-small  weight-medium text-sonic-silver w-100">
												Name the tag
											</label>
										</div>
										<div className="col-sm-4 text-right">
											<p className="Chinese-silver font-x-small weight-light">100</p>
										</div>
									</div>
									<input type="text" placeholder="Tag Name" className="form-fild  w-100" />

									<label className="font-small  weight-medium text-sonic-silver w-100 mt-4">
										Associated to
									</label>
									<select className="form-fild  w-100">
										<option>Select Professional Service</option>
										<option>Select Professional Service</option>
									</select>

									<div className="modal-ft">
										<div className="row mt-4">
											<div className="col-sm-3 col-4">
												<button
													type="button"
													className="btn btn-cancel w-100 save-pad"
													data-bs-dismiss="modal"
												>
													Cancel
												</button>
											</div>
											<div className="col-sm-9 col-8">
												<button className="bg-893168 weight-semi-bold font-small w-100  mar-top-min b-r-btn save-pad">
													Save
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>

			<h1 className="mt-5">Frontend</h1>

			<div className="popup-18 mt-3">
				<button
					type="button"
					className="btn btn-primary"
					data-bs-toggle="modal"
					data-bs-target="#exampleModal18"
				>
					Filters
				</button>

				<div className="modal fade" id="exampleModal18" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog max-351">
						<div className="modal-content">
							<div className="modal-body">
								<div className="colse-icon text-right">
									<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
								</div>
								<h5 className="modal-title f-22 weight-bold social-link mb-3" id="exampleModalLabel">
									Filters
								</h5>

								<div className="faq-popup">
									<div className="accordion border-0" id="accordionExample">
										<div className="accordion-item">
											<h2 className="accordion-header" id="headingOne">
												<button
													className="accordion-button"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target="#collapseOne"
													aria-expanded="true"
													aria-controls="collapseOne"
												>
													Profession
												</button>
											</h2>
											<div
												id="collapseOne"
												className="accordion-collapse collapse show"
												aria-labelledby="headingOne"
												data-bs-parent="#accordionExample"
											>
												<div className="accordion-body border-0">
													<div className="search-form">
														<input
															type="text"
															className="field-des"
															placeholder="Search Profession"
														/>
														<i className="fa-solid fa-magnifying-glass"></i>
													</div>
													<ul className="list-search mt-3">
														<li className="active">
															All <i className="fa-solid fa-check"></i>
														</li>
														<li>Business</li>
														<li>Banking</li>
														<li>Property</li>
														<li>Commercial</li>
														<li>Intellectual Property</li>
														<li>Family</li>
														<li>Inheritance</li>
														<li>Criminal</li>
														<li>Finance</li>
														<li>Tax</li>
														<li>Divorce</li>
														<li>Employment & labor</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="headingTwo">
												<button
													className="accordion-button collapsed"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target="#collapseTwo"
													aria-expanded="false"
													aria-controls="collapseTwo"
												>
													Years of Experience
												</button>
											</h2>
											<div
												id="collapseTwo"
												className="accordion-collapse collapse"
												aria-labelledby="headingTwo"
												data-bs-parent="#accordionExample"
											>
												<div className="accordion-body border-0">
													<ul className="list-search mt-3">
														<li className="active">
															All <i className="fa-solid fa-check"></i>
														</li>
														<li>1 - 3 years</li>
														<li>3 - 5 years</li>
														<li>5 - 10 years</li>
														<li>10+ years</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="headingThree">
												<button
													className="accordion-button collapsed"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target="#collapseThree"
													aria-expanded="false"
													aria-controls="collapseThree"
												>
													Jurisdiction
												</button>
											</h2>
											<div
												id="collapseThree"
												className="accordion-collapse collapse"
												aria-labelledby="headingThree"
												data-bs-parent="#accordionExample"
											>
												<div className="accordion-body border-0">
													<ul className="list-search mt-3">
														<li className="active">
															Show All <i className="fa-solid fa-check"></i>
														</li>
														<li>DIFC</li>
														<li>Mainland Courts</li>
														<li>United Kingdom</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2 className="accordion-header" id="headingFour">
												<button
													className="accordion-button collapsed"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target="#collapseFour"
													aria-expanded="false"
													aria-controls="collapseFour"
												>
													Gender
												</button>
											</h2>
											<div
												id="collapseFour"
												className="accordion-collapse collapse"
												aria-labelledby="headingFour"
												data-bs-parent="#accordionExample"
											>
												<div className="accordion-body border-0">
													<ul className="list-search mt-3">
														<li className="active">
															{' '}
															All <i className="fa-solid fa-check"></i>
														</li>
														<li>Male</li>
														<li>Female</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button className="btn-primary-small-true w-100">Show results</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="popup-19 mt-3">
				<button
					type="button"
					className="btn btn-primary"
					data-bs-toggle="modal"
					data-bs-target="#exampleModal19"
				>
					Thank You
				</button>

				<div className="modal fade" id="exampleModal19" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog max-338">
						<div className="modal-content">
							<div className="modal-body">
								<div className="colse-icon text-right">
									<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
								</div>
								<div className="check-ani text-center mb-3">
									<img src="/images/ani.png" alt="ani" className="fa-spin" />
									<img src="/images/check.png" alt="ani" className="check-ani-img" />
								</div>
								<h5
									className="modal-title f-22 weight-bold social-link mb-3 text-center"
									id="exampleModalLabel"
								>
									<span className="thank-you">Thank You!</span> Your review <br />
									was submitted.
								</h5>

								<button className="btn-primary mb-2 w-100">Go to Dashboard</button>
								<button className="btn-secondary w-100">Go Home</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="popup-20 mt-3">
				<button
					type="button"
					className="btn btn-primary"
					data-bs-toggle="modal"
					data-bs-target="#exampleModal20"
				>
					Your Inquiry was submitted.
				</button>

				<div className="modal fade" id="exampleModal20" aria-labelledby="exampleModalLabel" aria-hidden="true">
					<div className="modal-dialog max-338">
						<div className="modal-content">
							<div className="modal-body">
								<div className="colse-icon text-right">
									<i className="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
								</div>
								<div className="check-ani text-center mb-3">
									<img src="/images/ani.png" alt="ani" className="fa-spin" />
									<img src="/images/check.png" alt="ani" className="check-ani-img" />
								</div>
								<h5
									className="modal-title f-22 weight-bold social-link mb-4 text-center"
									id="exampleModalLabel"
								>
									{' '}
									Your Inquiry was submitted.
								</h5>
								<p className="font-medium social-link weight-light text-center mb-3">
									This professional typically responds in 48 hours. Go to your dashboard to see updates.{' '}
								</p>

								<button className="btn-primary mb-2 w-100">Go to Dashboard</button>
								<button className="btn-secondary w-100">Go Home</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
