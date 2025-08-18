'use client';
import React from 'react';
import './admin.css';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {

	return (
		<div className="d-flex m-d-flex-none">
			<Sidebar />
			<div className="right-part">
				<Header />
				<div className="main-content">{children}</div>
			</div>
		</div>
	);
}
