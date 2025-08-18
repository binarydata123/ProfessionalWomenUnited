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
							<div className="left-video-area">
								{/* <Link href={'/'}>
									<img className="logo-img d-none d-md-block" src={'/footer.png'} alt="logo" />
								</Link> */}
								{pathname === '/auth/lawyer/step-2' ? (
									// <img src="/" id="background-video" alt="bg-image" />
									<></>
								) : pathname.includes('auth/lawyer') ? (
									<img src="/auth-bg-img.jpg" id="background-video" alt="bg-image" />
								) : (
									// <video autoPlay muted loop id="background-video">
									<video autoPlay muted loop playsInline id="background-video">
										<source src="/video/onboarding-animation-540.mp4" type="video/mp4" />
										Your browser does not support the video tag.
									</video>
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
												For Lawyers
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
