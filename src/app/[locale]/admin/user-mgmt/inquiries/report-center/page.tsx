import { EllipsisHorizontalIcon, EyeIcon } from '@heroicons/react/20/solid';
import { DocumentTextIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React from 'react';

export default function reportCenter() {
	return (
		<div>
			<div className="form-part mt-2">
				<div className="row align-items-center g-3">
					<div className="col-sm-4">
						<div className="icon-fild icon-g p-set position-relative">
							<input
								type="text"
								placeholder="Search For a professional"
								className="form-fild  w-100 sp-right"
							/>
							<Image
								src="/images/search-normal.png"
								width={24}
								height={24}
								alt="cdd"
								className="magnify-search"
							/>
						</div>
					</div>
					<div className="col-sm-3">
						<select className="form-fild  w-100">
							<option>Designation</option>
							<option>Designation</option>
							<option>Designation</option>
							<option>Designation</option>
						</select>
					</div>
					<div className="col-sm-3">
						<select className="form-fild  w-100">
							<option></option>
							<option></option>
							<option></option>
							<option></option>
						</select>
					</div>
					<div className="col-sm-2">
						<select className="form-fild  w-100">
							<option>Plan</option>
							<option>Plan</option>
							<option>Plan</option>
							<option>Plan</option>
						</select>
					</div>
				</div>
			</div>

			<p className="font-small weight-light social-link mt-3 mb-3">
				Displaying <span className="span-color-dash weight-bold">n</span> professionals
			</p>
			<div className="table-part">
				<table className="rwd-table">
					<tbody>
						<tr>
							<th className="fist">Name</th>
							<th>Designation</th>
							<th>Plan</th>
							<th>Last Online</th>
							<th className="text-right">Actions</th>
						</tr>
						<tr>
							<td data-th="Name">
								<p className="font-small weight-light social-link"> Lawyer Name</p>
							</td>
							<td data-th="Designation">
								<p className="font-small weight-medium social-link">Legal consultant</p>
								<p className="font-x-small text-sonic-silver weight-light">Hamdan Al Shamsi</p>
							</td>
							<td data-th="Plan">
								<button className="monthly">Monthly</button>
							</td>
							<td data-th="Last Online">
								<p className="font-x-small social-link weight-medium">23.01.23</p>
							</td>
							<td data-th="Actions " className="text-right ">
								<button className="icon-btn">
									<i className="fa-regular fa-eye"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-regular fa-message"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-solid fa-ellipsis"></i>
								</button>
							</td>
						</tr>
						<tr>
							<td data-th="Supplier Code">
								<p className="font-small weight-light social-link"> Lawyer Name</p>
							</td>
							<td data-th="Supplier Name">
								<p className="font-small weight-medium social-link">Legal consultant</p>
								<p className="font-x-small text-sonic-silver weight-light">Hamdan Al Shamsi</p>
							</td>
							<td data-th="Invoice Number">
								<button className="monthly">Monthly</button>
							</td>
							<td data-th="Invoice Date">
								<p className="font-x-small social-link weight-medium">23.01.23</p>
							</td>
							<td data-th="Due Date " className="text-right ">
								<button className="icon-btn">
									<i className="fa-regular fa-eye"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-regular fa-message"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-solid fa-ellipsis"></i>
								</button>
							</td>
						</tr>

						<tr>
							<td data-th="Supplier Code">
								<p className="font-small weight-light social-link"> Lawyer Name</p>
							</td>
							<td data-th="Supplier Name">
								<p className="font-small weight-medium social-link">Legal consultant</p>
								<p className="font-x-small text-sonic-silver weight-light">Hamdan Al Shamsi</p>
							</td>
							<td data-th="Invoice Number">
								<button className="monthly">Monthly</button>
							</td>
							<td data-th="Invoice Date">
								<p className="font-x-small social-link weight-medium">23.01.23</p>
							</td>
							<td data-th="Due Date " className="text-right ">
								<button className="icon-btn">
									<i className="fa-regular fa-eye"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-regular fa-message"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-solid fa-ellipsis"></i>
								</button>
							</td>
						</tr>

						<tr>
							<td data-th="Supplier Code">
								<p className="font-small weight-light social-link"> Lawyer Name</p>
							</td>
							<td data-th="Supplier Name">
								<p className="font-small weight-medium social-link">Legal consultant</p>
								<p className="font-x-small text-sonic-silver weight-light">Hamdan Al Shamsi</p>
							</td>
							<td data-th="Invoice Number">
								<button className="monthly">Monthly</button>
							</td>
							<td data-th="Invoice Date">
								<p className="font-x-small social-link weight-medium">23.01.23</p>
							</td>
							<td data-th="Due Date " className="text-right ">
								<button className="icon-btn">
									<i className="fa-regular fa-eye"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-regular fa-message"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-solid fa-ellipsis"></i>
								</button>
							</td>
						</tr>

						<tr>
							<td data-th="Supplier Code">
								<p className="font-small weight-light social-link"> Lawyer Name</p>
							</td>
							<td data-th="Supplier Name">
								<p className="font-small weight-medium social-link">Legal consultant</p>
								<p className="font-x-small text-sonic-silver weight-light">Hamdan Al Shamsi</p>
							</td>
							<td data-th="Invoice Number">
								<button className="monthly">Monthly</button>
							</td>
							<td data-th="Invoice Date">
								<p className="font-x-small social-link weight-medium">23.01.23</p>
							</td>
							<td data-th="Due Date " className="text-right ">
								<button className="icon-btn">
									<i className="fa-regular fa-eye"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-regular fa-message"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-solid fa-ellipsis"></i>
								</button>
							</td>
						</tr>

						<tr>
							<td data-th="Supplier Code">
								<p className="font-small weight-light social-link"> Lawyer Name</p>
							</td>
							<td data-th="Supplier Name">
								<p className="font-small weight-medium social-link">Legal consultant</p>
								<p className="font-x-small text-sonic-silver weight-light">Hamdan Al Shamsi</p>
							</td>
							<td data-th="Invoice Number">
								<button className="monthly">Monthly</button>
							</td>
							<td data-th="Invoice Date">
								<p className="font-x-small social-link weight-medium">23.01.23</p>
							</td>
							<td data-th="Due Date " className="text-right ">
								<button className="icon-btn">
									<i className="fa-regular fa-eye"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-regular fa-message"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-solid fa-ellipsis"></i>
								</button>
							</td>
						</tr>

						<tr>
							<td data-th="Supplier Code">
								<p className="font-small weight-light social-link"> Lawyer Name</p>
							</td>
							<td data-th="Supplier Name">
								<p className="font-small weight-medium social-link">Legal consultant</p>
								<p className="font-x-small text-sonic-silver weight-light">Hamdan Al Shamsi</p>
							</td>
							<td data-th="Invoice Number">
								<button className="monthly">Monthly</button>
							</td>
							<td data-th="Invoice Date">
								<p className="font-x-small social-link weight-medium">23.01.23</p>
							</td>
							<td data-th="Due Date " className="text-right ">
								<button className="icon-btn">
									<i className="fa-regular fa-eye"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-regular fa-message"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-solid fa-ellipsis"></i>
								</button>
							</td>
						</tr>

						<tr>
							<td data-th="Supplier Code">
								<p className="font-small weight-light social-link"> Lawyer Name</p>
							</td>
							<td data-th="Supplier Name">
								<p className="font-small weight-medium social-link">Legal consultant</p>
								<p className="font-x-small text-sonic-silver weight-light">Hamdan Al Shamsi</p>
							</td>
							<td data-th="Invoice Number">
								<button className="monthly">Monthly</button>
							</td>
							<td data-th="Invoice Date">
								<p className="font-x-small social-link weight-medium">23.01.23</p>
							</td>
							<td data-th="Due Date " className="text-right ">
								<button className="icon-btn">
									<i className="fa-regular fa-eye"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-regular fa-message"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-solid fa-ellipsis"></i>
								</button>
							</td>
						</tr>
						<tr>
							<td data-th="Supplier Code">
								<p className="font-small weight-light social-link"> Lawyer Name</p>
							</td>
							<td data-th="Supplier Name">
								<p className="font-small weight-medium social-link">Legal consultant</p>
								<p className="font-x-small text-sonic-silver weight-light">Hamdan Al Shamsi</p>
							</td>
							<td data-th="Invoice Number">
								<button className="monthly">Monthly</button>
							</td>
							<td data-th="Invoice Date">
								<p className="font-x-small social-link weight-medium">23.01.23</p>
							</td>
							<td data-th="Due Date " className="text-right ">
								<button className="icon-btn">
									<i className="fa-regular fa-eye"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-regular fa-message"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-solid fa-ellipsis"></i>
								</button>
							</td>
						</tr>

						<tr>
							<td data-th="Supplier Code">
								<p className="font-small weight-light social-link"> Lawyer Name</p>
							</td>
							<td data-th="Supplier Name">
								<p className="font-small weight-medium social-link">Legal consultant</p>
								<p className="font-x-small text-sonic-silver weight-light">Hamdan Al Shamsi</p>
							</td>
							<td data-th="Invoice Number">
								<button className="monthly">Monthly</button>
							</td>
							<td data-th="Invoice Date">
								<p className="font-x-small social-link weight-medium">23.01.23</p>
							</td>
							<td data-th="Due Date " className="text-right ">
								<button className="icon-btn">
									<i className="fa-regular fa-eye"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-regular fa-message"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-solid fa-ellipsis"></i>
								</button>
							</td>
						</tr>

						<tr>
							<td data-th="Supplier Code">
								<p className="font-small weight-light social-link"> Lawyer Name</p>
							</td>
							<td data-th="Supplier Name">
								<p className="font-small weight-medium social-link">Legal consultant</p>
								<p className="font-x-small text-sonic-silver weight-light">Hamdan Al Shamsi</p>
							</td>
							<td data-th="Invoice Number">
								<button className="monthly">Monthly</button>
							</td>
							<td data-th="Invoice Date">
								<p className="font-x-small social-link weight-medium">23.01.23</p>
							</td>
							<td data-th="Due Date " className="text-right ">
								<button className="icon-btn">
									<i className="fa-regular fa-eye"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-regular fa-message"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-solid fa-ellipsis"></i>
								</button>
							</td>
						</tr>

						<tr>
							<td data-th="Supplier Code">
								<p className="font-small weight-light social-link"> Lawyer Name</p>
							</td>
							<td data-th="Supplier Name">
								<p className="font-small weight-medium social-link">Legal consultant</p>
								<p className="font-x-small text-sonic-silver weight-light">Hamdan Al Shamsi</p>
							</td>
							<td data-th="Invoice Number">
								<button className="monthly">Monthly</button>
							</td>
							<td data-th="Invoice Date">
								<p className="font-x-small social-link weight-medium">23.01.23</p>
							</td>
							<td data-th="Due Date " className="text-right ">
								<button className="icon-btn">
									<i className="fa-regular fa-eye"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-regular fa-message"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-solid fa-ellipsis"></i>
								</button>
							</td>
						</tr>

						<tr>
							<td data-th="Supplier Code">
								<p className="font-small weight-light social-link"> Lawyer Name</p>
							</td>
							<td data-th="Supplier Name">
								<p className="font-small weight-medium social-link">Legal consultant</p>
								<p className="font-x-small text-sonic-silver weight-light">Hamdan Al Shamsi</p>
							</td>
							<td data-th="Invoice Number">
								<button className="monthly">Monthly</button>
							</td>
							<td data-th="Invoice Date">
								<p className="font-x-small social-link weight-medium">23.01.23</p>
							</td>
							<td data-th="Due Date " className="text-right ">
								<button className="icon-btn">
									<i className="fa-regular fa-eye"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-regular fa-message"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-solid fa-ellipsis"></i>
								</button>
							</td>
						</tr>

						<tr>
							<td data-th="Supplier Code">
								<p className="font-small weight-light social-link"> Lawyer Name</p>
							</td>
							<td data-th="Supplier Name">
								<p className="font-small weight-medium social-link">Legal consultant</p>
								<p className="font-x-small text-sonic-silver weight-light">Hamdan Al Shamsi</p>
							</td>
							<td data-th="Invoice Number">
								<button className="monthly">Monthly</button>
							</td>
							<td data-th="Invoice Date">
								<p className="font-x-small social-link weight-medium">23.01.23</p>
							</td>
							<td data-th="Due Date " className="text-right ">
								<button className="icon-btn">
									<i className="fa-regular fa-eye"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-regular fa-message"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-solid fa-ellipsis"></i>
								</button>
							</td>
						</tr>

						<tr>
							<td data-th="Supplier Code">
								<p className="font-small weight-light social-link"> Lawyer Name</p>
							</td>
							<td data-th="Supplier Name">
								<p className="font-small weight-medium social-link">Legal consultant</p>
								<p className="font-x-small text-sonic-silver weight-light">Hamdan Al Shamsi</p>
							</td>
							<td data-th="Invoice Number">
								<button className="monthly">Monthly</button>
							</td>
							<td data-th="Invoice Date">
								<p className="font-x-small social-link weight-medium">23.01.23</p>
							</td>
							<td data-th="Due Date " className="text-right ">
								<button className="icon-btn">
									<i className="fa-regular fa-eye"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-regular fa-message"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-solid fa-ellipsis"></i>
								</button>
							</td>
						</tr>

						<tr>
							<td data-th="Supplier Code">
								<p className="font-small weight-light social-link"> Lawyer Name</p>
							</td>
							<td data-th="Supplier Name">
								<p className="font-small weight-medium social-link">Legal consultant</p>
								<p className="font-x-small text-sonic-silver weight-light">Hamdan Al Shamsi</p>
							</td>
							<td data-th="Invoice Number">
								<button className="monthly">Monthly</button>
							</td>
							<td data-th="Invoice Date">
								<p className="font-x-small social-link weight-medium">23.01.23</p>
							</td>
							<td data-th="Due Date " className="text-right ">
								<button className="icon-btn">
									<i className="fa-regular fa-eye"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-regular fa-message"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-solid fa-ellipsis"></i>
								</button>
							</td>
						</tr>

						<tr>
							<td data-th="Supplier Code">
								<p className="font-small weight-light social-link"> Lawyer Name</p>
							</td>
							<td data-th="Supplier Name">
								<p className="font-small weight-medium social-link">Legal consultant</p>
								<p className="font-x-small text-sonic-silver weight-light">Hamdan Al Shamsi</p>
							</td>
							<td data-th="Invoice Number">
								<button className="monthly">Monthly</button>
							</td>
							<td data-th="Invoice Date">
								<p className="font-x-small social-link weight-medium">23.01.23</p>
							</td>
							<td data-th="Due Date " className="text-right ">
								<button className="icon-btn">
									<i className="fa-regular fa-eye"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-regular fa-message"></i>
								</button>
								<button className="icon-btn">
									<i className="fa-solid fa-ellipsis"></i>
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
