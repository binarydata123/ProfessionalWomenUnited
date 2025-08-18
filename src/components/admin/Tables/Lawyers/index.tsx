import React from 'react';
import Link from 'next/link';
import {useState} from 'react';
import Popup from '@/commonUI/Popup';
import DropDown from '@/commonUI/DropDown';
import LawyerProfile from '@/components/admin/modals/LawyerProfile';
import SendMessage from '@/components/admin/modals/SendMessage';
import ReportAccount from '@/components/admin/modals/ReportAccount';
import EyeButton from '@/commonUI/TableActionButtons/EyeButton';
import MessageButton from '@/commonUI/TableActionButtons/MessageButton';

export default function Lawyers() {
	const [viewProfile, setviewProfile] = useState(false);
	const [sendMessage, setsendMessage] = useState(false);
	const [reportAccount, setreportAccount] = useState(false);

	return (
		<>
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
					<EyeButton onClick={() => setviewProfile(true)} Tooltip="View Profile" />
					<MessageButton Tooltip={'Send Message'} onClick={() => setsendMessage(true)} />
					<DropDown align={'end'} label={<i className="fa-solid fa-ellipsis"></i>}>
						<ul>
							<li>
								<Link href={'#'}>View Public Profile</Link>
							</li>
							<li>
								<Link href={''} onClick={() => setreportAccount(true)}>
									Report Account
								</Link>
							</li>
						</ul>
					</DropDown>
				</td>
			</tr>

			<Popup
				show={viewProfile}
				onCancel={() => setviewProfile(false)}
				onOk={() => setviewProfile(false)}
				footer={false}
			>
				<LawyerProfile />
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
		</>
	);
}
