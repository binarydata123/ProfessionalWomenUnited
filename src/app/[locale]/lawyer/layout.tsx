'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import '../layout.css';
export default function LowyerLayout({ children }: { children: React.ReactNode }) {
	const role = 'lawyer';
	const pathname = usePathname();
	const isDynamicInquiryPath = /\/lawyer\/inquiries\/\d+/.test(pathname);
	return (
		<div className="lawyer-layout-wrapper">
			<div className="d-flex m-d-flex-none">
				<Sidebar />
				<div className="right-part">
					<Header />
					<div className={`main-content ${isDynamicInquiryPath ? '' : 'add-content-user'}`}>{children}</div>
				</div>
			</div>
			{/* {!isDynamicInquiryPath && <Footer />} */}
		</div>
	);
}
