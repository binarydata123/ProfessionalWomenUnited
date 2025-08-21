'use client';
import React, { useState, useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { usePathname } from 'next/navigation';
import AdminMenu from '@/commonUI/AdminMenu';
import Popup from '@/commonUI/Popup';
import { useRouter } from 'next/navigation';
import DefaultButton from '@/commonUI/DefaultButton';
import { getNotifications, getUnreadNotificationCount, markReadNotifications } from '../../../../lib/lawyerapi';
import {
	getUserNotifications,
	getUserUnreadNotificationCount,
	markUserReadNotifications
} from '../../../../lib/enduserapi';
import {
	getAdminNotifications,
	getAdminUnreadNotificationCount,
	markAdminReadNotifications
} from '../../../../lib/adminapi';
import UserMenu from '@/commonUI/UserMenu';
import LawyerMenu from '@/commonUI/LawyerMenu';
import AuthContext from '@/context/AuthContext';
import { formatTime } from '@/app/[locale]/commonfunctions/commonfunctions';
import { MdDashboard } from 'react-icons/md';
import { IoMdSettings } from "react-icons/io";
import { TbHelpSquareFilled } from "react-icons/tb";

export default function Header() {
	const { user, logout } = useContext(AuthContext)
	const [showNotifications, setShowNotifications] = useState(false);
	const [showInformation, setShowInformation] = useState(false);
	const [menuCollapse, setMenuCollapse] = useState(true);
	const handleToggleMenu = () => {
		setMenuCollapse(prevState => !prevState);
	};

	const [notifications, setNotifications]: any = useState([]);
	const [unreadNotificationCount, setUnreadNotificationCount] = useState<number>(0);

	const [userNotifications, setUserNotifications]: any = useState([]);
	const [unreadUserNotificationCount, setUserUnreadNotificationCount] = useState<number>(0);

	const [adminNotifications, setAdminNotifications]: any = useState([]);
	const [unreadAdminNotificationCount, setAdminUnreadNotificationCount] = useState<number>(0);
	const [user_id, setUserId] = useState('');
	const [image, setImage]: any = useState('');

	const [user_role, setUserRole] = useState('');


	useEffect(() => {
		user?.id ? setUserId(user?.id) : setUserId('');
		user?.profile_image ? setImage(user?.profile_image) : setImage('');
		user?.role ? setUserRole(user?.role) : setUserRole('');
	}, []);

	const toggleNotification = () => {
		//  setShowNotifications(prevState => !prevState);
		setShowNotifications(prevShowNotifications => !prevShowNotifications);

		if (user?.role === 'admin') {
			handleAdminGetNotifications(user?.id, 5);
		} else if (user?.role === 'enduser') {
			handleUserGetNotifications(user?.id, 5);
		} else {
			handleGetNotifications(user?.id, 5);
		}
	};

	const pathname = usePathname();
	const pathnameSegments = pathname.split('/');
	const role = pathnameSegments[1];
	const router = useRouter();
	const isDashboardPage = pathname.includes('/dashboard');


	const notifactionBoxRef = useRef<HTMLDivElement | null>(null); // Specify the type

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (notifactionBoxRef.current && !notifactionBoxRef.current.contains(event.target as Node)) {
				setShowNotifications(false);
			}
		};
		if (showNotifications) {
			document.addEventListener('click', handleClickOutside);
		}
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [showNotifications]);

	useEffect(() => {
		if (user)
			getUserData();
	}, []);

	const getUserData = () => {

		const now = new Date();
		const expirationDate = new Date(user?.expiration);

		if (now > expirationDate) {
			const syntheticEvent = { preventDefault: () => { } }; // Creating a minimal synthetic event
			handleLogout(syntheticEvent);
		}

		if (user?.two_step === 'false') {
			router.push('/auth/two-factor-authentication');
			return; // Return early to prevent the code below from executing.
		}

		if (user?.role === 'admin') {
			handleAdminGetNotificationCount(user?.id);
		} else if (user?.role === 'enduser') {
			handleUserGetNotificationCount(user?.id);
		} else {
			handleGetNotificationCount(user?.id);
		}
	};

	function handleLogout(e: any) {
		e.preventDefault();
		logout()
	}

	const handleMarkReadClick = () => {
		if (user?.role === 'admin') {
			handleAdminMarkReadNotifications(user?.id);
		} else if (user?.role === 'enduser') {
			handleUserMarkReadNotifications(user?.id);
		} else {
			handleMarkReadNotifications(user?.id);
		}
	};

	const handleGetNotifications = async (user_id: any, count: number) => {
		try {
			const res = await getNotifications(user_id, count);
			if (res.status === true) {
				setNotifications(res.data);
			}
		} catch (error) {
			console.error('Error fetching notifications:', error);
		}
	};

	const handleMarkReadNotifications = async (user_id: any) => {
		try {
			const res = await markReadNotifications(user_id);
			if (res.status === true) {
				// setNotifications(res.data);
				handleGetNotificationCount(user_id);
			}
		} catch (error) {
			console.error('Error fetching notifications:', error);
		}
	};

	const handleGetNotificationCount = async (user_id: any) => {
		try {
			const res = await getUnreadNotificationCount(user_id);
			if (res.status === true) {
				setUnreadNotificationCount(res.data);
			}
		} catch (error) {
			console.error('Error fetching notifications:', error);
		}
	};

	const handleUserGetNotifications = async (user_id: any, count: number) => {
		try {
			const res = await getUserNotifications(user_id, count);
			if (res.status === true) {
				setUserNotifications(res.data);
			}
		} catch (error) {
			console.error('Error fetching notifications:', error);
		}
	};

	const handleUserMarkReadNotifications = async (user_id: any) => {
		try {
			const res = await markUserReadNotifications(user_id);
			if (res.status === true) {
				// setUserNotifications(res.data);
				handleUserGetNotificationCount(user_id);
			}
		} catch (error) {
			console.error('Error fetching notifications:', error);
		}
	};

	const handleUserGetNotificationCount = async (user_id: any) => {
		try {
			const res = await getUserUnreadNotificationCount(user_id);
			if (res.status === true) {
				setUserUnreadNotificationCount(res.data);
			}
		} catch (error) {
			console.error('Error fetching notifications:', error);
		}
	};

	const handleAdminGetNotifications = async (user_id: any, count: number) => {
		try {
			const res = await getAdminNotifications(user_id, count);
			if (res.status === true) {
				setAdminNotifications(res.data);
			}
		} catch (error) {
			console.error('Error fetching notifications:', error);
		}
	};

	const handleAdminMarkReadNotifications = async (user_id: any) => {
		try {
			const res = await markAdminReadNotifications(user_id);
			if (res.status === true) {
				// setUserNotifications(res.data);
				handleAdminGetNotificationCount(user_id);
			}
		} catch (error) {
			console.error('Error fetching notifications:', error);
		}
	};

	const handleAdminGetNotificationCount = async (user_id: any) => {
		try {
			const res = await getAdminUnreadNotificationCount(user_id);
			if (res.status === true) {
				setAdminUnreadNotificationCount(res.data);
			}
		} catch (error) {
			console.error('Error fetching notifications:', error);
		}
	};

	const closeMenu = () => {
		handleToggleMenu();
	};

	const profileImageSrc = user?.profile_image
		? `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/profile/${user?.profile_image}`
		: user?.gender == 'male' || user?.gender == 'other'
			? `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/default/group-243.png`
			: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/default/group-242.png`;

	return (
		<div className="top-header">
			<ul className="head-icons m-none">
				<li className="bell-icons">
					{user?.role === 'enduser' ? (
						<Link href="#" onClick={toggleNotification} className="pog">
							{/* <BellIcon width={25} color={'#b0e8d8'} />{' '} */}
							<Image src="/images/notification.svg" width={30} height={30} alt="notification" />
							<small className="num">{unreadUserNotificationCount}</small>
						</Link>
					) : user?.role === 'admin' ? (
						<Link href="#" onClick={toggleNotification} className="pog">
							{/* <BellIcon width={25} color={'#b0e8d8'} />{' '} */}
							<Image src="/images/notification.svg" width={30} height={30} alt="notification" />
							<small className="num">{unreadAdminNotificationCount}</small>
						</Link>
					) : (
						<Link href="#" onClick={toggleNotification} className="pog">
							{/* <BellIcon width={25} color={'#b0e8d8'} />{' '} */}
							<Image src="/images/notification.svg" width={30} height={30} alt="notification" />
							<small className="num">{unreadNotificationCount}</small>
						</Link>
					)}

					<div className={`notifaction-box ${showNotifications ? '' : 'd-none'}`} ref={notifactionBoxRef}>
						<div className="box-not">
							<div className="row">
								<div className="col-7">
									<h4 className="font-medium weight-semi-bold green-medium-2">Notifications</h4>
								</div>
								<div className="col-5 text-right">
									<h5
										className="font-x-small weight-semi-bold green-medium-2"
										style={{ cursor: 'pointer' }}
										onClick={handleMarkReadClick}
									>
										Mark as Read
									</h5>
								</div>
							</div>
						</div>
						{notifications &&
							notifications.map((notification: any, index: number) => (
								<div className="box-not h-80" key={index}>
									<h4 className="font-small social-link weight-light">
										{notification.notification?.includes('<a') ? (
											<span
												dangerouslySetInnerHTML={{
													__html: notification.notification?.replace(
														/<a href="([^"]+)">([^<]+)<\/a>/,
														(match: any, href: any, text: any) => {
															return `<a href="${href}" style="color:#c49073" target="_blank">${text}</a>`;
														}
													)
												}}
											/>
										) : notification.notification?.length < 80 ? (
											notification.notification
										) : (
											notification.notification?.slice(0, 80) + '...'
										)}
									</h4>
									<p className="font-x-small weight-light text-sonic-silver">
										{formatTime(notification.created_at)}
									</p>
								</div>
							))}

						{userNotifications &&
							userNotifications.map((notification: any, index: number) => (
								<div className="box-not h-80" key={index}>
									<h4 className="font-small social-link weight-light">
										{notification.notification?.includes('<a') ? (
											<span
												dangerouslySetInnerHTML={{
													__html: notification.notification?.replace(
														/<a href="([^"]+)">([^<]+)<\/a>/,
														(match: any, href: any, text: any) => {
															return `<a href="${href}" style="color:#c49073" target="_blank">${text}</a>`;
														}
													)
												}}
											/>
										) : notification.notification?.length < 80 ? (
											notification.notification
										) : (
											notification.notification?.slice(0, 80) + '...'
										)}
									</h4>
									<p className="font-x-small weight-light text-sonic-silver">
										{formatTime(notification.created_at)}
									</p>
								</div>
							))}

						{adminNotifications &&
							adminNotifications.map((notification: any, index: number) => (
								<div className="box-not h-80" key={index}>
									<h4 className="font-small social-link weight-light">
										{notification.notification?.includes('<a') ? (
											<span
												dangerouslySetInnerHTML={{
													__html: notification.notification?.replace(
														/<a href="([^"]+)">([^<]+)<\/a>/,
														(match: any, href: any, text: any) => {
															return `<a href="${href}" style="color:#c49073" target="_blank">${text}</a>`;
														}
													)
												}}
											/>
										) : notification.notification?.length < 80 ? (
											notification.notification
										) : (
											notification.notification?.slice(0, 80) + '...'
										)}
									</h4>
									<p className="font-x-small weight-light text-sonic-silver">
										{formatTime(notification.created_at)}
									</p>
								</div>
							))}

						<div className="box-not ">
							<p className="text-center">
								{/* <Link
                  href={`${usePathname().includes('/admin')
                    ? '/admin'
                    : usePathname().includes('/lawyer')
                      ? '/lawyer'
                      : usePathname().includes('/user')
                        ? '/user'
                        : ''
                    }/notifications`}

                  className="green-medium-2 font-medium weight-bold"
                  onClick={() => setShowNotifications(false)}>
                  {' '}
                  View All{' '}
                </Link> */}

								<Link
									href={`${usePathname().includes('/admin')
										? '/admin'
										: usePathname().includes('/lawyer')
											? '/lawyer'
											: '/user'
										}/notifications`}
									className="green-medium-2 font-medium weight-bold"
									onClick={() => setShowNotifications(false)}
								>
									View All
								</Link>
							</p>
						</div>
					</div>
				</li>
				<li className="user-profile">
					{user?.role !== 'admin' ? (
						<>
							{image ? (
								<Image
									src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/profile/${image}`}
									alt="user-img"
									width={30}
									height={30}
									className="rounded-circle"
								/>
							) : (
								<img src={profileImageSrc} alt="user-img2" width={42} height={42} className="rounded-circle" />
							)}
						</>
					)
						: <p style={{ marginTop: '7px' }}>
							<Image
								src="https://pro-women.api.ai-developer.site/images/favicon.png"
								alt="user-img"
								width={30}
								height={30}
								className="rounded-circle"
							/>
						</p>}


				</li>
				<li className="admin-profile-dropdown-btn">
					<div className="pog-down">
						<div className="dropdown">
							<button
								className="btn btn-secondary dropdown-toggle"
								style={{ background: '#fff' }}
								type="button"
								id="dropdownMenu2"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<ChevronDownIcon width={20} color={'#c49073'} />
							</button>
							<ul className="dropdown-menu header-dropdown" aria-labelledby="dropdownMenu2">
								<li>
									<Link href="#" className="weight-semi-bold">
										{' '}
										{/* Hello{' '} */}
										{/* {user?.first_name && user?.first_name.length > 10
											? `${user?.first_name.substring(0, 10)}..`
											: user?.first_name} */}
										{user?.role !== 'admin' ? (
											<>
												Hello{' '}
												{user?.first_name &&
													(user?.first_name.length > 10
														? `${user?.first_name.substring(0, 10)}..`
														: user?.first_name)}
											</>
										) : (
											<>
												{user?.first_name}

											</>
										)}
									</Link>
								</li>

								<li className="">
									{/* <Link href={`${isDashboardPage ? `/` : `/${user_role}/dashboard`}`}> */}
									<Link href={`${isDashboardPage ? `/` : `/`}`}>

										{/* <Image src="/images/left-menu-1.png" alt="left-menu-1" width={18} height={18} /> */}
										<MdDashboard color={'#c49073'} size={18} />

										&nbsp; {isDashboardPage ? 'Go to Home' : 'Go to Dashboard'}
									</Link>
								</li>

								<li>
									<Link
										// href={`/${user_role}/profile-settings`}
										href={(() => {
											if (user?.role === 'admin') {
												return `${process.env.NEXT_PUBLIC_BASE_URL}/admin/profile-settings`;
											} else if (user?.role === 'lawyer') {
												return `${process.env.NEXT_PUBLIC_BASE_URL}/lawyer/profile-settings`;
											} else {
												return `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-settings`;
											}
										})()}
									>
										{/* <Image src="/images/left-menu-5.png" alt="left-menu-5" width={18} height={18} /> */}
										<IoMdSettings color={'#c49073'} size={18} />

										{' '}

										&nbsp; Settings
									</Link>
								</li>

								<li>
									<Link href="/contact-us">
										{/* <Image src="/images/left-menu-6.png" alt="left-menu-6" width={18} height={18} /> */}
										<TbHelpSquareFilled color={'#c49073'} size={18} />

										{' '}
										&nbsp; Help
									</Link>
								</li>

								<li onClick={handleLogout} className="log-out">
									<Link href="/auth/login" className="log-red">
										<Image src="/images/left-menu-7.png" alt="left-menu-7" width={18} height={18} />{' '}
										&nbsp; Log Out
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</li>
			</ul>

			<div className="container dask-none">
				<nav className="navbar navbar-expand-lg navbar-light">
					<Link className="navbar-brand" href="#">
						<Image
							src="/images/off-logo.png"
							alt="round-user"
							width={150}
							height={150}
							layout="responsive"
							className="logos"
						/>
					</Link>
					<button
						className="navbar-toggler p-0"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<div className={`toggle ${!menuCollapse ? 'active' : ''}`} onClick={handleToggleMenu}>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</button>
					<div
						className="collapse navbar-collapse"
						style={{ display: `${menuCollapse ? 'none' : 'block'}` }}
						id="navbarSupportedContent"
					>
						{/* <div className="row mt-3">
              <div className="col-6">
                <div className="row ">
                  <div className="col-sm-2 col-4 w-12">
                    <Image
                      src={profileImageSrc}
                      alt="user-img2"
                      width={42}
                      height={42}
                      className="rounded-circle"
                    />
                  </div>
                  <div className="col-sm-10 col-8 pl-0">
                    <h4 className="font-small social-link weight-light mt-2-user">
                      <b className=" weight-bold">{capitalizeFirstLetterOfEachWord(user?.name)}</b>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="col-6 text-right">
                <div className="drop-a">
                  <div className="dropdown ">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenu2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <ChevronDownIcon width={20} />
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenu2">
                      <li>
                        <Link href="#" className="weight-semi-bold">
                          {' '}
                          Hello{' '}
                          {user?.name && user?.name.length > 10
                            ? `${user?.name.substring(0, 10)}..`
                            : user?.name}
                        </Link>
                      </li>

                      <li className="w-normal">
                        <Link href={`/${role}/dashboard`}>
                          <Image
                            src="/images/left-menu-1.png"
                            alt="left-menu-1"
                            width={18}
                            height={18}
                          />
                          &nbsp; Go to Dashboard
                        </Link>
                      </li>

                      <li>
                        <Link href={`/${role}/profile-settings`}>
                          <Image
                            src="/images/left-menu-5.png"
                            alt="left-menu-5"
                            width={18}
                            height={18}
                          />{' '}
                          &nbsp; Settings
                        </Link>
                      </li>

                      <li>
                        <Link href="#">
                          <Image
                            src="/images/left-menu-6.png"
                            alt="left-menu-6"
                            width={18}
                            height={18}
                          />{' '}
                          &nbsp; Help
                        </Link>
                      </li>

                      <li onClick={handleLogout} className="log-out">
                        <Link href="#" className="log-red">
                          <Image
                            src="/images/left-menu-7.png"
                            alt="left-menu-7"
                            width={18}
                            height={18}
                          />{' '}
                          &nbsp; Log Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div> */}

						<div className="accordion mobile-drop-down border-0" id="accordionExample">
							<div className="accordion-item">
								<h2 className="accordion-header" id="headingOne">
									<button
										className="accordion-button"
										id="mobile-drop-down"
										type="button"
										data-bs-toggle="collapse"
										data-bs-target="#collapseOne"
										aria-expanded="true"
										aria-controls="collapseOne"
									>
										<div className="col-10">
											<div className="d-flex align-items-center">
												<div className="img-class">
													<Image
														src={user?.role !== 'admin' ? profileImageSrc : 'https://pro-women.api.ai-developer.site/images/favicon.png'}
														alt="user-img2"
														width={42}
														height={42}
														className="rounded-circle"
													/>
												</div>
												<div className="user-name">
													<h4 className="font-small social-link weight-light">
														<Link
															href="#"
															className="weight-semi-bold"
															style={{ color: '#1f1f1f' }}
														>
															{' '}
															{/* Hello{' '} */}
															{/* {user?.name && user?.name.length > 15
																? `${user?.name.substring(0, 15)}`
																: user?.name} */}
															{user?.role !== 'admin' ? (
																<>
																	Hello{' '}
																	{user?.first_name &&
																		(user?.first_name.length > 10
																			? `${user?.first_name.substring(0, 10)}..`
																			: user?.first_name)}
																</>
															) : (
																<>
																	{user?.first_name}
																</>
															)}
														</Link>
													</h4>
												</div>
											</div>
										</div>
									</button>
								</h2>
								<div
									id="collapseOne"
									className="accordion-collapse collapse"
									aria-labelledby="headingOne"
									data-bs-parent="#accordionExample"
								>
									<div className="accordion-body my-drop-class border-0">
										<div className="drop-a">
											<div className="">
												<ul>
													<li className="w-normal">
														<Link href={`/${role}/dashboard`}>
															<Image
																src="/images/left-menu-1.png"
																alt="left-menu-1"
																width={18}
																height={18}
															/>
															&nbsp; Go to Dashboard
														</Link>
													</li>

													<li>
														<Link href={`/${role}/profile-settings`}>
															<Image
																src="/images/left-menu-5.png"
																alt="left-menu-5"
																width={18}
																height={18}
															/>{' '}
															&nbsp; Settings
														</Link>
													</li>

													<li>
														<Link href="#">
															<Image
																src="/images/left-menu-6.png"
																alt="left-menu-6"
																width={18}
																height={18}
															/>{' '}
															&nbsp; Help
														</Link>
													</li>

													<li onClick={handleLogout} className="log-out">
														<Link href="#" className="log-red">
															<Image
																src="/images/left-menu-7.png"
																alt="left-menu-7"
																width={18}
																height={18}
															/>{' '}
															&nbsp; Log Out
														</Link>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<ul className="left-menu">
							{user_role === 'enduser' && <UserMenu closeMenu={closeMenu} />}
							{user_role === 'admin' && <AdminMenu />}
							{user_role === 'lawyer' && <LawyerMenu closeMenu={closeMenu} />}
						</ul>
					</div>
				</nav>
			</div>

			<Popup
				show={showInformation}
				className="user-info-modal basic-information"
				okText="Save Changes"
				title="Basic Information"
				okButtonClass="w-75"
				onCancel={() => setShowInformation(false)}
				onOk={() => setShowInformation(false)}
			>
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
			</Popup>
		</div>
	);
}
