'use client';
import React, { useState, useEffect, useContext } from 'react';
import './usernotification.css';
import ImagePlaceholder from '@/commonUI/ImagePlaceholder';
import { getUserNotifications, markUserReadNotifications } from '../../../../lib/enduserapi';
import AuthContext from '@/context/AuthContext';
import { formatTime } from '@/app/[locale]/commonfunctions/commonfunctions';

export default function Notification() {
	const [notifcationCount, setNotifactionCount] = useState<number>(0);
	const [allNotifactions, setallNotifications]: any = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPageStr = process.env.NEXT_PUBLIC_ITEM_PER_PAGE ?? '0';
	const itemsPerPage = parseInt(itemsPerPageStr, 10); // Parse to an integer with base 10
	const { user } = useContext(AuthContext);

	useEffect(() => {
		handleGetNotifications(user?.id, notifcationCount);
		handleMarkReadNotifications(user?.id);
	}, []);

	const handleGetNotifications = async (user_id: any, count: number) => {
		try {
			const res = await getUserNotifications(user_id, count);
			if (res.status === true) {
				setallNotifications(res.data);
			}
		} catch (error) {
			console.error('Error fetching notifications:', error);
		}
	};

	const handleMarkReadNotifications = async (user_id: any) => {
		try {
			const res = await markUserReadNotifications(user_id);
		} catch (error) {
			console.error('Error fetching notifications:', error);
		}
	};

	// Calculate the index range for the current page
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentNotifications = allNotifactions.slice(indexOfFirstItem, indexOfLastItem);

	// Handle page change
	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber);
	};

	return (
		<div>
			<div className="right-body d-flex justify-content-between">
				<h4 className="font-xx-large social-link  weight-semi-bold">Notifications</h4>
			</div>
			<hr className="hr-line mt-0" />
			<div className="right-body">
				{currentNotifications.length > 0 ? (
					<div>
						{currentNotifications.map((notification: any, index: number) => (
							<div
								className={`card-inquiries bg-card-white mt-1 ${notification.is_read == 'unread' ? '' : 'bg-white'
									}`}
							>
								<div className="row">
									<div className="col-lg-11 col-md-10 col-10">
										<p className="font-small pt-2 pb-2 weight-medium text-sonic-silver w-100">
											{notification.notification.includes('<a') ? (
												<span
													dangerouslySetInnerHTML={{
														__html: notification.notification.replace(
															/<a href="([^"]+)">([^<]+)<\/a>/,
															(match: any, href: any, text: any) => {
																return `<a href="${href}" style="color:#093f38; font-weight:bold;text-decoration: none;">${text}</a>`;
															}
														)
													}}
												/>
											) : (
												notification.notification
											)}
										</p>
									</div>
									<div className="col-lg-1  col-md-2  col-2 text-right">
										<p className="text-sonic-silver font-small-12 weight-light mt-2 pt-1 time">
											{formatTime(notification.created_at)}
										</p>
									</div>
								</div>
							</div>
						))}
						<div className="pagination d-flex justify-content-center mt-3">
							<button
								onClick={() => handlePageChange(currentPage - 1)}
								className={`btn btn-pagination ${currentPage === 1 ? 'disabled' : 'active'}`}
							>
								<span className="button-text">Previous</span>
							</button>
							<button
								onClick={() => handlePageChange(currentPage + 1)}
								className={`btn btn-pagination ml-2 ${indexOfLastItem >= allNotifactions.length ? 'disabled' : 'active'
									}`}
							>
								<span className="button-text">Next</span>
							</button>
						</div>
					</div>
				) : (
					<div className={'text-center'}>
						<ImagePlaceholder
							showButton={false}
							title={'No New Notifications'}
							text="Check this section for updates, and general notifications."
							image={'/icon/iconamoon_notification-off-duotone.svg'}
							height={320}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
