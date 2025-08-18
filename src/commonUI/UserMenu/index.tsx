'use client';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { GetTotalUserUnreadInquiries } from '../../../lib/enduserapi';
import { useRouter, usePathname } from 'next/navigation';
import AuthContext from '@/context/AuthContext';

interface Props {
	closeMenu?: () => void;
}

export default function UserMenu({ closeMenu }: Props) {
	const { user, logout } = useContext(AuthContext)
	const [totalUnreadInquiries, setTotalUnreadInquiries] = useState(0);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		if (pathname.includes('/user/')) {
			if (user)
				fetchTotallInquiriesCount(user?.id);
		} else {
			redirectToLogin();
		}
	}, []);

	const fetchTotallInquiriesCount = async (user_id: any) => {
		try {
			const response = await GetTotalUserUnreadInquiries(user_id);
			setTotalUnreadInquiries(response.data[0].totalInq);
		} catch (error) {
			console.error('Error on fetching unread inquiries:', error);
		}
	};

	function redirectToLogin() {
		logout()
		router.push('/auth/login');
	}

	return (
		<>
			<li onClick={closeMenu}>
				<Link href={`/user/dashboard`} className={pathname.includes('dashboard') ? 'active' : ''}>
					<img src="/icon/Dashboard-Icon.png" alt="left-menu-1" className="left-menu-icon" />
					Dashboard
				</Link>
			</li>
			<li onClick={closeMenu}>
				<Link href={`/user/messages`} className={pathname.includes('messages') ? 'active' : ''}>
					<img src="/icon/Message-Icon.png" alt="left-menu-1" className="left-menu-icon" />
					Messages{' '}
					{totalUnreadInquiries > 0 && (
						<small className="num">
							{totalUnreadInquiries < 10 ? `0${totalUnreadInquiries}` : totalUnreadInquiries}
						</small>
					)}
				</Link>
			</li>
			<li onClick={closeMenu}>
				<Link href={`/user/legal-questions`} className={pathname.includes('legal-questions') ? 'active' : ''}>
					<img src="/icon/Legal-Forum-Icon.png" alt="left-menu-1" className="left-menu-icon" />
					Legal Questions
				</Link>
			</li>
			<li onClick={closeMenu}>
				<Link href={`/user/lawyers`} className={pathname.includes('lawyers') ? 'active' : ''}>
					<img src="/icon/Profile-Icon.png" alt="left-menu-1" className="left-menu-icon" />
					Lawyers
				</Link>
			</li>
		</>
	);
}
