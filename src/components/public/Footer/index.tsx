'use client';
import React, {useState, useEffect, useContext} from 'react';
import {usePathname} from 'next/navigation';
import {ChevronUpIcon} from '@heroicons/react/20/solid';
import {FaFacebookF, FaLinkedin, FaInstagram} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import './footer.css';
import AuthContext from '@/context/AuthContext';
import {useTranslations} from 'next-intl';

export default function Footer() {
	const t = useTranslations('menupage');
	const {locale} = useContext(AuthContext);
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
	const [copied, setCopied] = useState(false);
	useEffect(() => {
		if (
			pathname.includes('/auth') ||
			pathname.includes('/professional') ||
			pathname.includes('/admin') ||
			pathname.includes('/user')
		) {
			setshowFooter(false);
		}
		const versionNumber = process.env.APP_VERSION || '1.0.2';
		setAppVersion(versionNumber);
	}, []);

	const currentYear = new Date().getFullYear();

	const embedCode = `<a href="${process.env.NEXT_PUBLIC_BASE_URL}" target="_blank"><img src="${process.env.NEXT_PUBLIC_BASE_URL}/woman-of-the-year-badge.png" alt="Professional Women United" width="150" height="auto"/></a>`;

	const handleCopy = () => {
		navigator.clipboard.writeText(embedCode);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		// showFooter &&
		<footer className="text-center text-lg-start py-lg-5 py-3 footer-wrapper" style={{backgroundColor: '#02142d'}}>
			<div className="container">
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
				<div className="row">
					<div className="col-sm-9">
						<ul className="justify-content-center link-footer">
							<li className="nav-item list-unstyled">
								<Link className="nav-link" href="/">
									Home
								</Link>
							</li>
							<li className="nav-item list-unstyled">
								<Link className="nav-link" href="/find-a-professional">
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
								<Link className="nav-link" href="/blogs">
									Insights
								</Link>
							</li>
							<li className="nav-item list-unstyled">
								<Link className="nav-link" href="/about-us">
									About
								</Link>
							</li>
							<li className="nav-item list-unstyled">
								<Link className="nav-link" href="/contact-us">
									Contact
								</Link>
							</li>
						</ul>
					</div>
					<div className="col-sm-3">
						<div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md text-center p-2">
							{/* Badge Display */}
							<div className="flex justify-center mb-6">
								<img
									src="/woman-of-the-year-badge.png"
									alt="Woman of the Year - Professional Women United"
									style={{width: '100px', height: 'auto'}}
								/>
							</div>

							{/* Embed Instructions */}
							<p className="text-gray-700 mb-3" style={{fontSize: '12px'}}>
								Copy the embed code below to display this badge on your website:
							</p>

							<input
								readOnly
								value={embedCode}
								className="w-full border border-gray-300 rounded-md p-2 font-mono text-sm bg-gray-50 text-gray-800"
								//rows={5}
								style={{
									width: '100%',
									fontFamily: 'monospace',
									marginBottom: '10px'
								}}
							/>

							<button onClick={handleCopy} className={`copy-btn ${copied ? 'copied' : ''}`}>
								{copied ? 'Copied!' : 'Copy Embed Code'}
							</button>
						</div>
					</div>
				</div>
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
							<ul className="social-icon-link list-unstyled">
								<li>
									<a target="_blank" href="https://www.facebook.com" rel="noreferrer">
										<FaFacebookF style={{color: '#fff'}} />
									</a>
								</li>
								<li>
									<a target="_blank" href="https://www.instagram.com/" rel="noreferrer">
										<FaInstagram style={{color: '#fff'}} />
									</a>
								</li>
								<li>
									<a
										target="_blank"
										href="https://www.linkedin.com/"
										aria-label="LinkedIn Company Page"
										rel="noreferrer">
										<FaLinkedin style={{color: '#fff'}} />
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-md-6 text-end">
						<div className="py-3 copy-right">
							<p className={`${locale} text-line`} style={{color: '#fff'}}>
								© {currentYear} Professional Women United. {t('version')}: 0.0.1
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
