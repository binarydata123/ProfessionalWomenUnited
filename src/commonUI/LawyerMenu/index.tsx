'use client';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { GetTotalUnreadInquiries } from '../../../lib/lawyerapi';
import { usePathname, useRouter } from 'next/navigation';
import AuthContext from '@/context/AuthContext';
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { FaMessage } from "react-icons/fa6";

interface Props {
	closeMenu?: () => void;
}

export default function LawyerMenu({ closeMenu }: Props) {
	const { user, logout } = useContext(AuthContext)
	const [totalUnreadInquiries, setTotalUnreadInquiries] = useState(0);
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		if (user) {
			if (pathname.includes('/professional/')) {
				fetchTotallInquiriesCount(user?.id);
			} else {
				redirectToLogin();
			}
		}
	}, []);

	function redirectToLogin() {
		logout()
		router.push('/auth/login');
	}

	const fetchTotallInquiriesCount = async (user_id: any) => {
		try {
			const response = await GetTotalUnreadInquiries(user_id);
			setTotalUnreadInquiries(response.data[0].totalInq);
		} catch (error) {
			console.error('Error on fetching unread inquiries:', error);
		}
	};

	return (
		<>
			<li onClick={closeMenu}>
				<Link href={`/professional/dashboard`} className={pathname.includes('dashboard') ? 'active' : ''}>
					{/* <img src="/icon/Dashboard-Icon.png" alt="left-menu-1" className="left-menu-icon" /> */}
					<MdDashboard color={'#c49073'} className="left-menu-icon" />

					Dashboard
				</Link>
			</li>
			<li onClick={closeMenu}>
				{/* <Link className={pathname.includes('/professional/profile') ? 'active' : ''} href="/professional/profile"> */}
				<Link className={pathname === '/professional/profile' ? 'active' : ''} href="/professional/profile">
					{/* <img src="/icon/Profile-Icon.png" alt="left-menu-2" className="left-menu-icon" /> */}
					<FaUser color={'#c49073'} className="left-menu-icon" />
					Profile
				</Link>
			</li>
			{/* {user?.firm_owner == 1 ? (
				<li onClick={closeMenu}>
					<Link className={pathname.includes('/professional/profile/firm-edit') ? 'active' : ''} href="/professional/profile/firm-edit">
						<i className="fa-solid fa-building left-menu-icon" style={{ color: '#02142d' }}></i>
						Firm
					</Link>
				</li>
			) : null} */}

			<li onClick={closeMenu}>
				<Link href="/professional/inquiries" className={pathname.includes('/professional/inquiries') ? 'active' : ''}>
					{/* <img src="/images/left-menu-3.png" alt="left-menu-3" className="left-menu-icon" />  */}
					<FaMessage color={'#c49073'} className="left-menu-icon" />

					Inquiries{' '}
					{totalUnreadInquiries > 0 && (
						<small className="num">
							{totalUnreadInquiries < 10 ? `0${totalUnreadInquiries}` : totalUnreadInquiries}
						</small>
					)}
				</Link>
			</li>

			{/* <li onClick={closeMenu}>
				<Link
					href="/professional/legal-community"
					className={pathname.includes('/professional/legal-community') ? 'active' : ''}
				>
					<img src="/icon/Legal-Forum-Icon.png" alt="left-menu-4" className="left-menu-icon" /> Legal
					Community
				</Link>
			</li> */}
			<Link
				href="/professional/legal-community"
				style={{ background: '#c49073' }}
				className={pathname.includes('/') ? 'active btn-commn w-100 d-block mt-3 d-block d-md-none' : ''}
			>
				Go to Website
			</Link>
		</>
	);
}
