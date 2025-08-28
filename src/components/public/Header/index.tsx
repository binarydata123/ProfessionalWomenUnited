'use client';
import React, { useState, useEffect, useContext, useRef } from 'react';
import './header.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { getAllServices, updateLastSeen } from '../../../../lib/frontendapi';
import AuthContext from '@/context/AuthContext';
import { useTranslations } from 'next-intl';
import { MdDashboard } from 'react-icons/md';
import { IoMdSettings } from 'react-icons/io';
import { TbHelpSquareFilled } from 'react-icons/tb';

export default function Header({ locale }: any) {
	const t = useTranslations('menupage');
	const { user, logout } = useContext(AuthContext);
	const [menutoggle, setmenutoggle] = useState(false);
	const [menuCollappse, setmenuCollappse] = useState(true);
	const [services, setServices] = useState([]);
	const pathname = usePathname();
	const handleToggleMenu = () => {
		setmenutoggle(prevState => !prevState);
		setmenuCollappse(prevState => !prevState);
	};
	const [isLawyerMenuOpen, setLawyerMenuOpen] = useState(false);
	const menuRef = useRef<HTMLUListElement>(null);



	const [menuCollapse, setMenuCollapse] = useState(false);

	const handleClickOutside = (event: any) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setMenuCollapse(false);
		}
	};
	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	useEffect(() => {
		getUserData();
		handleServices();
	}, []);

	const handleServices = () => {
		getAllServices().then(res => {
			setServices(res.data);
		});
	};

	const getUserData = () => {
		if (user?.id) {
			logCurrentTime(user?.id);
			const intervalId = setInterval(logCurrentTime, 2 * 60 * 1000);
			return () => {
				clearInterval(intervalId);
			};
		}
	};

	function logCurrentTime(id: any) {
		const currentTime = new Date();
		updateLastSeen({
			last_seen: currentTime,
			user_id: id
		});
	}

	function handleLogout(e: any) {
		e.preventDefault();
		logout();
	}

	const profileImageSrc = user?.profile_image
		? `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/profile/${user?.profile_image}`
		: user?.gender == 'male' || user?.gender == 'other'
			? `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/default/group-242.png`
			: `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/default/group-242.png`;


	return (
		<>
			<div className={locale} id={`${locale == 'ar' ? `${locale}` : 'en-fix'}`}>
				<header
					className={`header-wrapper ${pathname === `/${locale}/legal-services/banking` ||
						pathname === `/find-a-professional` ||
						pathname === `/${locale}/ask-a-lawyer` ||
						pathname.includes(`/${locale}/legal-forum`)
						? 'top-header-light'
						: 'top-header-light'
						}`}>
					<nav className="navbar navbar-expand-xl">
						<div className={`${locale} container p-xl-0 p-2 `}>
							<Link className="navbar-brand" href="/">
								<img
									src={`${pathname === `/${locale}/legal-services/banking` ||
										pathname === `/find-a-professional` ||
										pathname === `/${locale}/ask-a-lawyer` ||
										pathname.includes(`/${locale}/legal-forum`)
										? '/1logo.webp'
										: '/1logo.webp'
										}`}
									className="logo-icon p-lg-0 p-2"
									alt="site logo"
									onClick={() => setLawyerMenuOpen(false)}
								/>
							</Link>

							<button
								className="navbar-toggler p-lg-0 p-0 "
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#navbarSupportedContentPublic"
								aria-controls="navbarSupportedContentPublic"
								aria-expanded="false"
								aria-label="Toggle navigation">
								<div className={`toggle ${!menuCollappse ? 'active' : ''}`} onClick={handleToggleMenu}>
									<span />
									<span />
									<span />
								</div>
							</button>
							<div
								style={{ display: `${menuCollappse ? 'none' : 'block'}` }}
								className={`collapse navbar-collapse`}
								id="navbarSupportedContentPublic">
								{user?.id && (
									<div
										className="accordion mobile-drop-down d-block d-xl-none border-0"
										id="accordionExample">
										<div className="accordion-item p-lg-0 p-0 m-2">
											<h2 className="accordion-header" id="headingOne">
												<button
													className="accordion-button"
													id="mobile-drop-down"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target="#collapseOne"
													aria-expanded="true"
													aria-controls="collapseOne">
													<div className=" col-sm-8 col-6">
														<div className="row align-items-center">
															<div className="col-sm-2 col-4 w-12">
																<Image
																	src={user?.role !== 'admin' ? profileImageSrc : 'https://api.professionalwomenunited.com/images/favicon.png'}
																	alt="user-img2"
																	width={42}
																	height={42}
																	className="rounded-circle"
																/>
															</div>
															<div className="col-sm-10 col-8 pl-0">
																<h4 className="font-small social-link weight-light mt-2-user">
																	<Link
																		href="#"
																		className="weight-semi-bold"
																		style={{ color: '#1f1f1f' }}>
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
												data-bs-parent="#accordionExample">
												<div className="accordion-body my-drop-class border-0">
													<div className="drop-a">
														<div className="top-header-light">
															<ul>
																<li className="w-normal">
																	<Link
																		href={(() => {
																			if (user?.role === 'admin') {
																				return `${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard`;
																			} else if (user?.role === 'professional') {
																				return `${process.env.NEXT_PUBLIC_BASE_URL}/professional/dashboard`;
																			} else {
																				return `${process.env.NEXT_PUBLIC_BASE_URL}/user/dashboard`;
																			}
																		})()}>
																		{/* <Image
																			src="/images/left-menu-1.png"
																			alt="left-menu-1"
																			width={18}
																			height={18}
																		/> */}
																		<MdDashboard color={'#c49073'} size={18} />
																		&nbsp; {t('goToDashboard')}
																	</Link>
																</li>

																<li>
																	<Link
																		href={(() => {
																			if (user?.role === 'admin') {
																				return `${process.env.NEXT_PUBLIC_BASE_URL}/admin/profile-settings`;
																			} else if (user?.role === 'professional') {
																				return `${process.env.NEXT_PUBLIC_BASE_URL}/professional/profile-settings`;
																			} else {
																				return `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-settings`;
																			}
																		})()}>
																		{/* <Image
																			src="/images/left-menu-5.png"
																			alt="left-menu-1"
																			width={18}
																			height={18}
																		/> */}
																		<IoMdSettings color={'#c49073'} size={18} />
																		&nbsp; {t('settings')}
																	</Link>
																</li>

																<li>
																	<Link href="#" style={{ color: '#1F1F1F' }}>
																		{/* <Image
																			src="/images/left-menu-6.png"
																			alt="left-menu-6"
																			width={18}
																			height={18}
																		/> */}
																		<TbHelpSquareFilled color={'#c49073'} size={18} />{' '}

																		&nbsp; {t('help')}
																	</Link>
																</li>

																<li onClick={handleLogout} className="log-out">
																	<Link href="#" className="log-red">
																		<Image
																			src="/images/left-menu-7.png"
																			alt="left-menu-7"
																			width={18}
																			height={18}
																		/>
																		&nbsp; {t('logout')}
																	</Link>
																</li>
															</ul>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								)}
								{/* <ul className="navbar-nav me-auto mb-lg-0 mb-2 social-icon homecss">
								 */}
								<ul className="navbar-nav mx-auto mb-lg-0 mb-2 social-icon homecss">

									<li className="nav-item">
										<Link
											onClick={() => {
												setmenuCollappse(true);
												setLawyerMenuOpen(false);
											}}
											className={`nav-link ${pathname === '/' ? 'active' : null}`}
											aria-current="page"
											href={locale === 'en' ? '/' : `/${locale}`}>
											Home
										</Link>
									</li>

									<li className="nav-item">
										<Link
											onClick={() => {
												setmenuCollappse(true);
												setLawyerMenuOpen(false);
											}}
											className={`nav-link ${pathname === '/professional' ? 'active' : null}`}
											aria-current="page"
											href='/find-a-professional'>
											Find a Professional
										</Link>
									</li>

									{/* <li className="nav-item">
										<Link
											onClick={() => {
												setmenuCollappse(true);
												setLawyerMenuOpen(false);
											}}
											className={`nav-link ${pathname === '/firms' ? 'active' : null}`}
											aria-current="page"
											href='/firms'>
											Firms
										</Link>
									</li> */}

									<li className="nav-item">
										<Link
											onClick={() => {
												setmenuCollappse(true);
												setLawyerMenuOpen(false);
											}}
											className={`nav-link ${pathname === '/blogs' ? 'active' : null}`}
											aria-current="page"
											href='/blogs'>
											Insights
										</Link>
									</li>

									<li className="nav-item">
										<Link
											onClick={() => {
												setmenuCollappse(true);
												setLawyerMenuOpen(false);
											}}
											className={`nav-link ${pathname === '/about-us' ? 'active' : null}`}
											href='/about-us'>
											{t('about')}
										</Link>
									</li>
									<li className="nav-item">
										<Link
											onClick={() => {
												setmenuCollappse(true);
												setLawyerMenuOpen(false);
											}}
											className={`nav-link ${pathname === '/contact-us' ? 'active' : null}`}
											href='/contact-us'>
											{t('contact')}
										</Link>
									</li>
								</ul>
								<div className={`${locale == 'ar' ? 'withArlogin' : `${user?.id ? 'withEnlogin' : ''}`}`}>
									<form className="d-xl-flex btn-header p-2 position-relative align-items-center" role="search">
										{user?.id ? (
											<Link
												href={(() => {
													if (user?.role === 'admin') {
														return `${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard`;
													} else if (user?.role === 'professional') {
														return `${process.env.NEXT_PUBLIC_BASE_URL}/professional/dashboard`;
													} else {
														return `${process.env.NEXT_PUBLIC_BASE_URL}/user/dashboard`;
													}
												})()}
												className="btn btn-outline-success btn-lawyer hide-btn d-block d-md-none w-100 text-center"
												type="submit">
												Go to Dashboard
											</Link>
										) : (
											<Link
												href='/auth/choose-profile'
												className='btn btn-outline-success btn-lawyer hide-btn w-100 text-center set-bt'
												type="submit">
												For Professionals
											</Link>
										)}
										{user?.id ? (
											<>

												<Link href="#" className="pog- mx-2 d-none d-xl-block">
													<>
														{user?.role !== 'admin' ? (
															<>
																{user?.profile_image ? (
																	<Image
																		src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/profile/${user?.profile_image}`}
																		alt="user-img"
																		width={42}
																		height={42}
																		className="rounded-circle"
																	/>
																) : (
																	<img src={profileImageSrc} alt="user-img2" width={42} height={42} className="rounded-circle" />
																)}
															</>
														)
															: <p style={{ marginTop: '7px' }}>
																<Image
																	src="https://api.professionalwomenunited.com/images/favicon.png"
																	alt="user-img"
																	width={30}
																	height={30}
																	className="rounded-circle"
																/>
															</p>}
													</>

												</Link>
												<Link href="#" className="pog-down d-none d-xl-block">
													<div className="dropdown ">
														<button
															className="btn btn-secondary dropdown-toggle mt-2"
															style={{ background: '#fff' }}
															type="button"
															id="dropdownMenu2"
															data-bs-toggle="dropdown"
															aria-expanded="false">
															<ChevronDownIcon width={20} color={'#c49073'} />
														</button>
														<ul
															className="dropdown-menu header-dropdown shadow-lg"
															style={{ right: 0, left: 'unset' }}
															aria-labelledby="dropdownMenu2">
															<li>
																<Link href="#" className="weight-semi-bold" title={user?.name}>

																	{user?.role !== 'admin' ? (
																		<>
																			Hello{' '}
																			{user?.first_name &&
																				(user?.first_name.length > 10
																					? `${user?.first_name.split(' ')[0]}`
																					: user?.first_name)}
																		</>
																	) : (
																		<span style={{ fontSize: '15px' }}>
																			{user?.first_name}
																		</span>
																	)}

																</Link>
															</li>

															<li className="">
																<Link
																	href={(() => {
																		if (user?.role === 'admin') {
																			return `${process.env.NEXT_PUBLIC_BASE_URL}/admin/dashboard`;
																		} else if (user?.role === 'professional') {
																			return `${process.env.NEXT_PUBLIC_BASE_URL}/professional/dashboard`;
																		} else {
																			return `${process.env.NEXT_PUBLIC_BASE_URL}/user/dashboard`;
																		}
																	})()}>
																	{/* <Image
																		src="/images/left-menu-1.png"
																		alt="left-menu-1"
																		width={18}
																		height={18}
																	/> */}
																	<MdDashboard color={'#c49073'} size={18} />

																	&nbsp; {t('goToDashboard')}
																</Link>
															</li>

															<li>
																<Link
																	href={(() => {
																		if (user?.role === 'admin') {
																			return `${process.env.NEXT_PUBLIC_BASE_URL}/admin/profile-settings`;
																		} else if (user?.role === 'professional') {
																			return `${process.env.NEXT_PUBLIC_BASE_URL}/professional/profile-settings`;
																		} else {
																			return `${process.env.NEXT_PUBLIC_BASE_URL}/user/profile-settings`;
																		}
																	})()}>
																	{/* <Image
																		src="/images/left-menu-5.png"
																		alt="left-menu-1"
																		width={18}
																		height={18}
																	/> */}
																	<IoMdSettings color={'#c49073'} size={18} />{' '}

																	&nbsp; {t('settings')}
																</Link>
															</li>

															<li>
																<Link href="/contact-us">
																	{/* <Image
																		src="/images/left-menu-6.png"
																		alt="left-menu-6"
																		width={18}
																		height={18}
																	/> */}
																	<TbHelpSquareFilled color={'#c49073'} size={18} />{' '}

																	&nbsp; {t('help')}
																</Link>
															</li>

															<li className="log-out" onClick={handleLogout}>
																<Image
																	src="/images/left-menu-7.png"
																	alt="left-menu-7"
																	width={18}
																	height={18}
																/>
																&nbsp; {t('logout')}
															</li>

														</ul>
													</div>
												</Link>

											</>
										) : (
											<>
												<Link
													className="btn btn-outline-success btn-login mt-xl-0 mt-2"
													href='/auth/login'>
													Login
												</Link>
											</>
										)}

									</form>
								</div>
							</div>
						</div>
					</nav >
				</header >
			</div>
		</>
	);
}
