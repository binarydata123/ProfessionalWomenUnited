'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import './layout.css';
import Footer from '@/components/common/Footer';
export default function UserLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isDynamicInquiryPath = /\/user\/messages\/\d+/.test(pathname);
	return (
		<>
			<div className="outer-container">
				<div className="d-flex m-d-flex-none padd">
					<Sidebar />
					<div className="right-part">
						<Header />
						<div className={`main-content ${isDynamicInquiryPath ? '' : 'add-content-user'}`}>
							{children}
						</div>
					</div>
				</div>
				{/* {!isDynamicInquiryPath && <Footer />} */}
			</div>
		</>
	);
}
