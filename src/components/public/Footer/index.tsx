'use client';
import React, { useState, useEffect, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { FaFacebookF, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import './footer.css';
import AuthContext from '@/context/AuthContext';
import { useTranslations } from 'next-intl';

export default function Footer() {
	const t = useTranslations('menupage');
	const { locale } = useContext(AuthContext)
	const [showFooter, setshowFooter] = useState(true);
	const [appVersion, setAppVersion] = useState('');
	const pathname = usePathname();
	const scrollToTop = (e: any) => {
		e.preventDefault();
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	};
	useEffect(() => {
		if (
			pathname.includes('/auth') ||
			pathname.includes('/lawyer') ||
			pathname.includes('/admin') ||
			pathname.includes('/user')
		) {
			setshowFooter(false);
		}
		const versionNumber = process.env.APP_VERSION || '1.0.2';
		setAppVersion(versionNumber);
	}, []);

	const currentYear = new Date().getFullYear();

	return (
		// showFooter &&
		<footer
			className='text-center text-lg-start py-lg-5 py-3 footer-wrapper' style={{ backgroundColor: '#02142d' }}>
			<div className="container" >
				<div className="text-center">
					{/* <Image
						src={`${pathname === '/legal-services/banking' ||
							pathname === '/find-a-professional' ||
							pathname === '/ask-a-lawyer' ||
							pathname.includes('/legal-forum')
							? '/footer.png'
							: '/footer.png'
							}`}
						className="footerlogoIcon mb-lg-1"
						alt="site logo"
						width={160}
						height={140}
					/> */}
				</div>
				<ul className="justify-content-center link-footer">
					<li className="nav-item list-unstyled">
						<Link className="nav-link"
							href="/">
							Home
						</Link>
					</li>
					<li className="nav-item list-unstyled">
						<Link className="nav-link"
							href="/find-a-professional">
							Find a Professional
						</Link>
					</li>
					{/* <li className="nav-item list-unstyled">
						<Link className="nav-link"
							href="/firms">
							Firms
						</Link>
					</li> */}
					<li className="nav-item list-unstyled">
						<Link className="nav-link"
							href="/blogs">
							Insights
						</Link>
					</li>
					<li className="nav-item list-unstyled">
						<Link className="nav-link" href="/about-us">
							About
						</Link>
					</li>
					<li className="nav-item list-unstyled">
						<Link className="nav-link" href='/contact-us'>
							Contact
						</Link>
					</li>
				</ul>
				<div className="hr-line mb-3">
					<Link href="#" onClick={e => scrollToTop(e)}>
						{' '}
						<div className="circle-arrow">
							<ChevronUpIcon color="#fff" width={25} />
						</div>
					</Link>
				</div>
				<div className="row">
					<div className="d-flex align-items-center col-md-6">
						<div className="">
							<ul className="social-icon-link list-unstyled" >
								<li>
									<a target="_blank" href="https://www.facebook.com/connectlegaluae" rel="noreferrer">
										<FaFacebookF style={{ color: '#fff' }} />
									</a>
								</li>
								<li>
									<a
										target="_blank"
										href="https://www.instagram.com/connectlegaluae/"
										rel="noreferrer">
										<FaInstagram style={{ color: '#fff' }} />
									</a>
								</li>
								<li>
									<a
										target="_blank"
										href="https://www.linkedin.com/company/connect-legal-uae/"
										aria-label="LinkedIn Company Page"
										rel="noreferrer">
										<FaLinkedin style={{ color: '#fff' }} />
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-md-6 text-end">
						<div className="py-3 copy-right">
							<p className={`${locale} text-line`} style={{ color: '#fff' }}>© {currentYear} Professional Women United. {t('version')}: 0.0.1</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
