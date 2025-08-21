'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminMenu() {
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (!pathname.includes('/admin/')) {
			redirectToLogin();
		}
	}, [pathname]);

	function redirectToLogin() {
		router.push('/auth/login');
	}

	return (
		<>
			<li>
				<Link href={`/admin/dashboard`} className={pathname.includes('dashboard') ? 'active' : ''}>
					Dashboard
				</Link>
			</li>

			<li>
				{/* <span className="menu-title">User Mgmt.</span> */}
				<ul className="dropdown-menu-list menu-border">
					<li>
						<Link
							className={`dropdown-item ${pathname.includes('user-mgmt/professionals') ? 'active' : ''}`}
							href="/admin/user-mgmt/professionals"
						>
							Professionals
						</Link>
					</li>
					<li>
						<Link
							className={`dropdown-item ${pathname.includes('user-mgmt/users') ? 'active' : ''}`}
							href="/admin/user-mgmt/users"
						>
							Users
						</Link>
					</li>
					{/* <li>
						<Link
							className={`dropdown-item ${pathname.includes('user-mgmt/firms') ? 'active' : ''}`}
							href="/admin/user-mgmt/firms"
						>
							Firms
						</Link>
					</li> */}
					<li>
						<Link
							className={`dropdown-item ${pathname.includes('user-mgmt/inquiries') ? 'active' : ''}`}
							href="/admin/user-mgmt/inquiries"
						>
							Inquiries
						</Link>
					</li>
				</ul>
			</li>

			<li>
				{/* <span className="menu-title">Content Mgmt.</span> */}
				<ul className="menu-border">
					{/* <li>
						<Link
							className={`dropdown-item ${pathname.includes('content-mgmt/legal-forum') ? 'active' : ''}`}
							href="/admin/content-mgmt/legal-forum"
						>
							Legal Forum
						</Link>
					</li> */}
					<li>
						<Link
							className={`dropdown-item ${pathname.includes('content-mgmt/reviews') ? 'active' : ''}`}
							href="/admin/content-mgmt/reviews"
						>
							Reviews
						</Link>
					</li>
					<li>
						<Link
							className={`dropdown-item ${pathname.includes('content-mgmt/blogs') ? 'active' : ''}`}
							href="/admin/content-mgmt/blogs"
						>
							Blogs
						</Link>
					</li>
					{/* <li>
						<Link
							className={`dropdown-item ${pathname.includes('content-mgmt/tag-mgmt') ? 'active' : ''}`}
							href="/admin/content-mgmt/tag-mgmt"
						>
							Tag Mgmt.
						</Link>
					</li> */}
					{/* <li>
						<Link
							className={`dropdown-item ${pathname.includes('content-mgmt/service-qa') ? 'active' : ''}`}
							href="/admin/content-mgmt/service-qa"
						>
							Service QA
						</Link>
					</li> */}
					{/* <li>
						<Link
							className={`dropdown-item ${pathname.includes('content-mgmt/service-benefit') ? 'active' : ''}`}
							href="/admin/content-mgmt/service-benefit"
						>
							Service Benefit
						</Link>
					</li> */}
				</ul>
			</li>

			<li>
				<Link href={`/admin/support`} className={pathname.includes('support') ? 'active' : ''}>
					Support
				</Link>
			</li>

			<li>
				{/* <span className="menu-title">Settings</span> */}
				<ul className="menu-border">
					<li>
						<Link
							className={`dropdown-item ${pathname === '/admin/settings/general' ? 'active' : ''}`}
							href="/admin/settings/general"
						>
							General
						</Link>
					</li>
					<li>
						<Link
							className={`dropdown-item ${pathname.includes('/admin/settings/global-parameters') ? 'active' : ''}`}
							href="/admin/settings/global-parameters/authors"
						>
							Global Parameters
						</Link>
					</li>
					<li>
						<Link
							className={`dropdown-item ${pathname === '/admin/settings/roles-and-permissions' ? 'active' : ''}`}
							href="/admin/settings/roles-and-permissions"
						>
							Roles & Permissions
						</Link>
					</li>
				</ul>
			</li>
		</>
	);
}


// 'use client';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { ChevronDownIcon } from '@heroicons/react/24/solid';
// import { usePathname, useRouter } from 'next/navigation';

// export default function AdminMenu() {
// 	const [taggleUserMgmt, settaggleUserMgmt] = useState(true);
// 	const [tagglContentMgmt, settagglContentMgmt] = useState(true);
// 	const [tagglSetting, settagglSetting] = useState(true);
// 	const router = useRouter();
// 	const pathname = usePathname();
// 	useEffect(() => {
// 		if (pathname.includes('/admin/')) {
// 		} else {
// 			redirectToLogin();
// 		}
// 	}, []);

// 	function redirectToLogin() {
// 		router.push('/auth/login');
// 	}

// 	const toggleMenu = (index: number) => {
// 		if (index === 1) {
// 			settaggleUserMgmt(prevState => !prevState);
// 			settagglContentMgmt(true);
// 			settagglSetting(true);
// 		} else if (index === 3) {
// 			settagglSetting(prevState => !prevState);
// 			settagglContentMgmt(true);
// 			settaggleUserMgmt(true);
// 		} else {
// 			settagglContentMgmt(prevState => !prevState);
// 			settaggleUserMgmt(true);
// 			settagglSetting(true);
// 		}
// 	};

// 	return (
// 		<>
// 			<li>
// 				<Link href={`/admin/dashboard`} className={pathname.includes('dashboard') ? 'active' : ''}>
// 					{/* <img
//             src="/icon/Dashboard-Icon.png"
//             alt="left-menu-1"
//             className="left-menu-icon"
//           /> */}
// 					Dashboard
// 				</Link>
// 			</li>
// 			<li>
// 				<Link href="#" className="d-flex justify-content-between" onClick={() => toggleMenu(1)}>
// 					User Mgmt.
// 					<ChevronDownIcon width={20} color={'#000'} />
// 				</Link>
// 				<ul className={`dropdown-menu-list menu-border ${taggleUserMgmt ? 'd-none' : ''}`}>
// 					<li>
// 						<Link
// 							className={`dropdown-item ${pathname.includes('user-mgmt/professionals') ? 'active' : ''}`}
// 							href="/admin/user-mgmt/professionals"
// 						>
// 							Professionals
// 						</Link>
// 					</li>
// 					<li>
// 						<Link
// 							className={`dropdown-item ${pathname.includes('user-mgmt/users') ? 'active' : ''}`}
// 							href="/admin/user-mgmt/users"
// 						>
// 							Users
// 						</Link>
// 					</li>
// 					<li>
// 						<Link
// 							className={`dropdown-item ${pathname.includes('user-mgmt/firms') ? 'active' : ''}`}
// 							href="/admin/user-mgmt/firms"
// 						>
// 							Firms
// 						</Link>
// 					</li>
// 					<li>
// 						<Link
// 							className={`dropdown-item ${pathname.includes('user-mgmt/inquiries') ? 'active' : ''}`}
// 							href="/admin/user-mgmt/inquiries"
// 						>
// 							Inquiries
// 						</Link>
// 					</li>
// 				</ul>
// 			</li>
// 			<li>
// 				<Link href="#" className="d-flex justify-content-between" onClick={() => toggleMenu(2)}>
// 					Content Mgmt.
// 					<ChevronDownIcon width={20} color={'#000'} />
// 				</Link>
// 				<ul className={`menu-border ${tagglContentMgmt ? 'd-none' : ''}`}>
// 					<li>
// 						<Link
// 							className={`dropdown-item ${pathname.includes('content-mgmt/legal-forum') ? 'active' : ''}`}
// 							href="/admin/content-mgmt/legal-forum"
// 						>
// 							Legal Forum
// 						</Link>
// 					</li>
// 					<li>
// 						<Link
// 							className={`dropdown-item ${pathname.includes('content-mgmt/reviews') ? 'active' : ''}`}
// 							href="/admin/content-mgmt/reviews"
// 						>
// 							Reviews
// 						</Link>
// 					</li>
// 					<li>
// 						<Link
// 							className={`dropdown-item ${pathname.includes('content-mgmt/blogs') ? 'active' : ''}`}
// 							href="/admin/content-mgmt/blogs"
// 						>
// 							Blogs
// 						</Link>
// 					</li>
// 					<li>
// 						<Link
// 							className={`dropdown-item ${pathname.includes('content-mgmt/tag-mgmt') ? 'active' : ''}`}
// 							href="/admin/content-mgmt/tag-mgmt"
// 						>
// 							Tag Mgmt.
// 						</Link>
// 					</li>
// 					<li>
// 						<Link
// 							className={`dropdown-item ${pathname.includes('content-mgmt/service-qa') ? 'active' : ''}`}
// 							href="/admin/content-mgmt/service-qa"
// 						>
// 							Service QA
// 						</Link>
// 					</li>
// 					<li>
// 						<Link
// 							className={`dropdown-item ${pathname.includes('content-mgmt/service-benefit') ? 'active' : ''}`}
// 							href="/admin/content-mgmt/service-benefit"
// 						>
// 							Service Benefit
// 						</Link>
// 					</li>
// 				</ul>
// 			</li>
// 			<li>
// 				<Link href={`/admin/support`} className={pathname.includes('support') ? 'active' : ''}>
// 					Support
// 				</Link>
// 			</li>
// 			<li>
// 				<Link href="#" className="d-flex justify-content-between" onClick={() => toggleMenu(3)}>
// 					Settings
// 					<ChevronDownIcon width={20} color={'#000'} />
// 				</Link>
// 				<ul className={`menu-border ${tagglSetting ? 'd-none' : ''}`}>
// 					<li>
// 						<Link
// 							className={`dropdown-item ${pathname === '/admin/settings/general' ? 'active' : ''}`}
// 							href="/admin/settings/general"
// 						>
// 							General
// 						</Link>
// 					</li>
// 					<li>
// 						<Link
// 							className={`dropdown-item ${pathname.includes('/admin/settings/global-parameters') ? 'active' : ''
// 								}`}
// 							href="/admin/settings/global-parameters"
// 						>
// 							Global Parameters
// 						</Link>
// 					</li>
// 					<li>
// 						<Link
// 							className={`dropdown-item ${pathname === '/admin/settings/roles-and-permissions' ? 'active' : ''
// 								}`}
// 							href="/admin/settings/roles-and-permissions"
// 						>
// 							Roles & Permissions
// 						</Link>
// 					</li>
// 				</ul>
// 			</li>
// 		</>
// 	);
// }
