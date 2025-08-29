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
			<div className="container-fluid p-0 position-relative auth-layout-container">
				<div className="p-0">
					<div className="d-flex auth-layout-row">
						<div className="video-style p-lg-0 bg-light">
							<div className="left-video-area d-none d-lg-block" style={pathname === '/auth/professional/step-2' ? { height: '120vh' } : { height: '100vh' }}>
								{pathname === '/auth/professional/step-2' ? (
									<>
										<img src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className="sidebar-img" />
									</>
								) : pathname.includes('auth/professional') ? (
									<img src="/auth-bg-img.jpg" alt="bg-image" />
								) : (
									<img src='https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' className="sidebar-img" />
								)}
							</div>
						</div>

						<div className="toggle-main">
							<Navbar expand="lg" className="d-block d-md-none mobile-navbar" id="mobile-auth-header">
								<Container fluid className="p-0 class-toggle">
									<div className="mobile-nav-header">
										<Link href={'/'}>
											<img className="logo-img mobile-logo" src={'/footer.png'} alt="logo" />
										</Link>
										<Navbar.Toggle aria-controls="navbarScroll">
											<Image src={'/mobile-menu-toggle.png'} width={30} height={30} alt="" />
										</Navbar.Toggle>
									</div>
									<Navbar.Collapse id="navbarScroll">
										<form className="d-flex mobile-auth-buttons" role="search">
											<Link className="btn btn-outline-success btn-lawyer" href="/auth/choose-profile">
												Registration for Invitees
											</Link>
											<Link className="btn btn-outline-success btn-login" href="/auth/login">
												Login
											</Link>
										</form>
									</Navbar.Collapse>
								</Container>
							</Navbar>
						</div>

						<div className="p-lg-0 geust-layout-content-box bg-light">
							<form className="d-flex justify-content-end text-right p-2 btn-header d-none d-md-flex" role="search">
								<Link className="btn btn-outline-success btn-lawyer" href="/auth/choose-profile">
									Registration for Invitees
								</Link>
								<Link className="btn btn-outline-success btn-login set-ar-log" href="/auth/login">
									Login
								</Link>
							</form>
							<div className="auth-content">{children}</div>
						</div>
					</div>
				</div>
			</div>

			{/* Add mobile-specific CSS */}
			<style jsx>{`
        @media (max-width: 767px) {
          .auth-layout-container {
            min-height: 100vh;
            background-color: #f8f9fa;
          }
          
          .auth-layout-row {
            flex-direction: column;
            min-height: 100vh;
          }
          
          .geust-layout-content-box {
            width: 100% !important;
            padding: 15px;
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          
          .mobile-navbar {
            background: white;
            padding: 10px 15px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .mobile-nav-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
			padding: 0px 10px;
          }
          
          .mobile-logo {
            position: relative !important;
            width: 120px !important;
            top: 0 !important;
            left: 0 !important;
          }
          
          .mobile-auth-buttons {
            flex-direction: column;
            gap: 10px;
            padding: 15px 15px;
            width: 100%;
          }
          
          .mobile-auth-buttons .btn {
            width: 100%;
            text-align: center;
          }
          
		  .auth-content {
  display: flex;
  flex-direction: column;
}
          
          .auth-page-wrapper {
            padding: 0 !important;
          }
          
          .main-login {
            max-width: 100% !important;
            padding: 20px 0;
          }
        }
        
        @media (max-width: 480px) {
          .geust-layout-content-box {
            padding: 10px;
          }
          
          .mobile-logo {
            width: 100px !important;
          }
        }
      `}</style>
		</>
	);
}