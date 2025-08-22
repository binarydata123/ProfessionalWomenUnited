'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import AdminMenu from '@/commonUI/AdminMenu';
import UserMenu from '@/commonUI/UserMenu';
import LawyerMenu from '@/commonUI/LawyerMenu';
import './sidebar.css';
import AuthContext from '@/context/AuthContext';

export default function Sidebar() {
	const { user } = useContext(AuthContext)

	return (
		<div className="left-part">
			<div className="left-fixed">
				<Link href={'/'}>
					<img src="/footer.png" alt="off-logo" className="dash-logo" />
				</Link>
				<ul className="left-menu">
					{user?.role === 'enduser' && <UserMenu />}
					{user?.role === 'admin' && <AdminMenu />}
					{user?.role === 'professional' && <LawyerMenu />}
				</ul>
			</div>
		</div>
	);
}
