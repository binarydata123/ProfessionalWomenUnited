'use client';
import React from 'react';
import Link from 'next/link';
import './auth.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<>
			<div className="container-fluid p-0 position-relative">
				<div className="p-0">
					<div className="d-flex auth-layout-row">
						<div className="video-style p-lg-0 bg-light">
							<div className="left-video-area" style={pathname === '/auth/lawyer/step-2' ? { height: '120vh' } : { height: '100vh' }}>
								{pathname === '/auth/lawyer/step-2' ? (
									<>
										<img src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className="sidebar-img" />
									</>
								) : pathname.includes('auth/lawyer') ? (
									// <img src="/auth-bg-img.jpg" id="background-video" alt="bg-image" />
									<img src="/auth-bg-img.jpg"  alt="bg-image" />
								) : (

									<img src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className="sidebar-img" />
								)}
							</div>
						</div>
						<div className="toggle-main">
							<Navbar expand="lg" className=" d-block d-md-none" id="mobile-auth-header">
								<Container fluid className="p-0 class-toggle">
									<Link href={'/'}>
										<img className="logo-img class-add-mobile" src={'/footer.png'} alt="logo" />
									</Link>
									<Navbar.Toggle aria-controls="navbarScroll">
										<Image src={'/mobile-menu-toggle.png'} width={30} height={30} alt="" />
									</Navbar.Toggle>
									<Navbar.Collapse id="navbarScroll">
										<form className="d-flex justify-content-end p-2 btn-header" role="search">
											<Link className="btn btn-outline-success btn-lawyer" href="/for-lawyers">
												For Professionals
											</Link>
											<Link
												className="btn btn-outline-success btn-login ml-add"
												href="/auth/login"
											>
												Login
											</Link>
										</form>
									</Navbar.Collapse>
								</Container>
							</Navbar>
						</div>
						<div className="p-lg-0 geust-layout-content-box bg-light">
							<form
								className="d-flex justify-content-end text-right p-2 btn-header d-none d-md-block"
								role="search"
							>
								<Link className="btn btn-outline-success btn-lawyer" href="/">
									For Professionals
								</Link>
								<Link className="btn btn-outline-success btn-login set-ar-log" href="/auth/login">
									Login
								</Link>
							</form>
							<div className="auth-contnet">{children}</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
