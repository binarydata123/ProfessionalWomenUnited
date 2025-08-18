'use client';
import React, {useState} from 'react';
import Link from 'next/link';
import Popup from '@/commonUI/Popup';
import Table from '@/commonUI/Table';
import DropDown from '@/commonUI/DropDown';
import EyeButton from '@/commonUI/TableActionButtons/EyeButton';
import MessageButton from '@/commonUI/TableActionButtons/MessageButton';
import UserProfile from '@/components/admin/modals/UserProfile';
import SendMessage from '@/components/admin/modals/SendMessage';
import ReportAccount from '@/components/admin/modals/ReportAccount';
import IconButton from '@/commonUI/IconButton';
import ToolTip from '@/commonUI/ToolTip';
import Image from 'next/image';

export default function Page() {
	const [viewProfile, setviewProfile] = useState(false);
	const [sendMessage, setsendMessage] = useState(false);
	const [reportAccount, setreportAccount] = useState(false);
	const [data, SetData] = useState([{}, {}, {}, {}, {}, {}]);

	return (
		<div>
			<div className="form-part mt-2">
				<div className="row align-items-center g-3">
					<div className="col-sm-4">
						<div className="icon-fild icon-g p-set position-relative">
							<input
								type="text"
								placeholder="Search for a lawyer"
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
							<option>Law Firm</option>
							<option>Law Firm</option>
							<option>Law Firm</option>
							<option>Law Firm</option>
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
				Displaying<span className="span-color-dash weight-bold">n</span> lawyers
			</p>
			<div className="table-part">
				<Table columns={['Name', 'Designation', 'Reported By', 'Actions']} data={data}>
					{(rowData, index) => (
						<tr>
							<td data-th="Name">
								<p className="font-small weight-light social-link">Client Name</p>
							</td>
							<td data-th="Designation">
								<p className="font-small weight-medium social-link">alan.moore@gmail.com</p>
								<p className="font-x-small text-sonic-silver weight-light">+971 501233456</p>
							</td>
							<td data-th="Reported By">
								<p className="font-small weight-light social-link text-primary">Admin</p>
							</td>
							<td data-th="Actions ">
								<EyeButton onClick={() => setviewProfile(true)} Tooltip="View Profile" />
								<ToolTip title={'View'} placement="bottom">
									<IconButton>
										<img src="/icon/document-icon.png" width="15" height="15" alt="" />
									</IconButton>
								</ToolTip>
								<DropDown
									align={'end'}
									label={
										<IconButton>
											<i className="fa-solid fa-ellipsis"></i>
										</IconButton>
									}
								>
									<ul>
										<li>
											<Link href={'/find-a-lawyer/test-lawyer'} target="_blank">
												View Public Profile
											</Link>
										</li>
										<li>
											<Link href={'#'} onClick={() => setreportAccount(true)}>
												Report Account
											</Link>
										</li>
									</ul>
								</DropDown>
							</td>
						</tr>
					)}
				</Table>
			</div>
			<Popup
				show={viewProfile}
				onCancel={() => setviewProfile(false)}
				onOk={() => setviewProfile(false)}
				footer={false}
			>
				<UserProfile />
			</Popup>

			<Popup
				title="Send Message"
				show={sendMessage}
				size="sm"
				onCancel={() => setsendMessage(false)}
				onOk={() => setsendMessage(false)}
			>
				<SendMessage />
			</Popup>

			<Popup
				title="Report Account"
				show={reportAccount}
				size="sm"
				onCancel={() => setreportAccount(false)}
				onOk={() => setreportAccount(false)}
			>
				<ReportAccount />
			</Popup>
		</div>
	);
}
