'use client';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import AuthContext from '@/context/AuthContext';
import { useTranslations } from 'next-intl';

export default function AjmanLawyers({ onclose }: any) {
	const t = useTranslations('menupage');
	const { user } = useContext(AuthContext);
	console.log(user);
	const [isFixed, setIsFixed] = useState(false);
	const [srollcount, setScrolCount] = useState(0);
	const [activeLink, setActiveLink] = useState('');

	useEffect(() => {
		const handleScroll = () => {
			const threshold = 600;
			const scrollY = window.scrollY;

			if (scrollY <= threshold) {
				setIsFixed(true);
			} else {
				setIsFixed(false);
				setScrolCount(0);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		window.addEventListener('scroll', listenToScroll);
		return () => window.removeEventListener('scroll', listenToScroll);
	}, []);

	const listenToScroll = () => {
		const heightToHideFrom = 5;
		const winScroll = window.scrollY;

		if (winScroll > heightToHideFrom) {
			isVisible && setIsVisible(false);
		} else {
			setIsVisible(true);
		}
	};

	const handleMouseEnter = (link: string) => {
		setActiveLink(link);
	};

	const handleMouseLeave = () => {
		setActiveLink('');
	};

	return (
		<>
			<div className=" py-3 scroll-menu" id="">
				<div className="row g-3">
					<div className="col-md-3">
						<div className="tab-pane fade show active" role="tabpanel">
							<ul className="list-mega">
								<div>
									<div className="row align-items-center">
										{/* <div className="col-2 p-0 text-center">
											<img
												src="/images/legal-service/Banking.png"
												alt="Banking"
												style={{ width: '70%' }}
											/>
										</div> */}
										{/* <div className="col-10 p-0">
											<h6 className="set-menu-head">Banking Law</h6>
										</div> */}
									</div>
									{/* <li>
										<Link
											href="/lawyers-in-sharjah"
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'banking' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('banking')}
											onMouseLeave={handleMouseLeave}>
											Best Professionals Sharjah
										</Link>
									</li> */}
									{/* <li>
										<Link
											href="/crypto-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'crypto' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('crypto')}
											onMouseLeave={handleMouseLeave}>
											Crypto Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/bankruptcy-lawyer-uae"
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'bankruptcy' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('bankruptcy')}
											onMouseLeave={handleMouseLeave}>
											Bankrupcty Lawyer
										</Link>
									</li> */}
								</div>
								{/* <div className="set-hading-pading">
									<div className="row align-items-center">
										<div className="col-2 p-0 text-center">
											<img
												src="/images/legal-service/Business.png"
												alt="Banking"
												style={{ width: '70%' }}
											/>
										</div>
										<div className="col-10 p-0">
											<h6 className="set-menu-head">Buisness Law</h6>
										</div>
									</div>

									<li>
										<Link
											href="/business-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'buisness' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('buisness')}
											onMouseLeave={handleMouseLeave}>
											Business Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/corporate-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'corporate' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('corporate')}
											onMouseLeave={handleMouseLeave}>
											Corporate Lawyer
										</Link>
									</li>
								</div>
								<div className="set-hading-pading">
									<div className="row align-items-center">
										<div className="col-2 p-0 text-center">
											<img
												src="/images/legal-service/Commercial.png"
												alt="Banking"
												style={{ width: '70%' }}
											/>
										</div>
										<div className="col-10 p-0">
											<h6 className="set-menu-head">Commercial Law</h6>
										</div>
									</div>

									<li>
										<Link
											href="/commercial-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'commercialLawyer' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('commercialLawyer')}
											onMouseLeave={handleMouseLeave}>
											Commercial Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/dubai-construction-lawyer"
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'constructionlawyer' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('constructionlawyer')}
											onMouseLeave={handleMouseLeave}>
											Construction Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/construction-accidents-lawyer-uae"
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'constAccident' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('constAccident')}
											onMouseLeave={handleMouseLeave}>
											Construction Accident Lawyer
										</Link>
									</li>
								</div>
								<div className="set-hading-pading">
									<div className="row align-items-center">
										<div className="col-2 p-0 text-center">
											<img
												src="/images/legal-service/Inheritance.png"
												alt="Banking"
												style={{ width: '70%' }}
											/>
										</div>
										<div className="col-10 p-0">
											<h6 className="set-menu-head">Inheritence Law</h6>
										</div>
									</div>
									<li>
										<Link
											href="/lawyers-in-sharjah"
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'intbuisness' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('intbuisness')}
											onMouseLeave={handleMouseLeave}>
											Best Professionals Sharjah
										</Link>
									</li>
									<li>
										<Link
											href="/corporate-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'custody' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('custody')}
											onMouseLeave={handleMouseLeave}>
											Coporate Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/inheritance-lawyer-uae"
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'inheritence' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('inheritence')}
											onMouseLeave={handleMouseLeave}>
											Inheritance Lawyer
										</Link>
									</li>
								</div> */}
							</ul>
						</div>
					</div>
					{/* <div className="col-md-3">
						<div className="tab-pane fade show active" role="tabpanel">
							<ul className="list-mega">
								<div>
									<div className="row align-items-center">
										<div className="col-2 p-0 text-center">
											<img
												src="/images/legal-service/Civil.png"
												alt="Banking"
												style={{width: '70%'}}
											/>
										</div>
										<div className="col-10 p-0">
											<h6 className="set-menu-head">Civil Law</h6>
										</div>
									</div>

									<li>
										<Link
											href="/civil-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'civillawyer' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('civillawyer')}
											onMouseLeave={handleMouseLeave}>
											Civil Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/car-accident-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'carlawyer' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('carlawyer')}
											onMouseLeave={handleMouseLeave}>
											Car / Auto accident Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/motorcycle-accident-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'motorlawyer' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('motorlawyer')}
											onMouseLeave={handleMouseLeave}>
											Motorcycle Accident Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/truck-accident-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'trucklawyer' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('trucklawyer')}
											onMouseLeave={handleMouseLeave}>
											Truck Accident Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/bicycle-accident-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'bicyclelawyer' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('bicyclelawyer')}
											onMouseLeave={handleMouseLeave}>
											Bicycle Accident Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/uber-accidents-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'uberlawyer' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('uberlawyer')}
											onMouseLeave={handleMouseLeave}>
											Uber Accidents Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/personal-injury-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'personallawyer' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('personallawyer')}
											onMouseLeave={handleMouseLeave}>
											Personal Injury Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/injury-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'injurylawyer' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('injurylawyer')}
											onMouseLeave={handleMouseLeave}>
											Injury Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/premises-liability-lawyer-uae"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'premsieslawyer' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('premsieslawyer')}
											onMouseLeave={handleMouseLeave}>
											Premsies Liability Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/product-liability-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'productlawyer' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('productlawyer')}
											onMouseLeave={handleMouseLeave}>
											Product Liability Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/medical-malpractice-lawyer"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'medical' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('medical')}
											onMouseLeave={handleMouseLeave}>
											Medical Malpractise Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/hospital-negligence-lawyer-uae"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'hospital' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('hospital')}
											onMouseLeave={handleMouseLeave}>
											Hospital Negligence Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/brain-injury-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'brain' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('brain')}
											onMouseLeave={handleMouseLeave}>
											Brain Injury Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/disability-lawyers-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'disability' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('disability')}
											onMouseLeave={handleMouseLeave}>
											Disability Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/immigration-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'immigration' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('immigration')}
											onMouseLeave={handleMouseLeave}>
											Immigration Lawyer
										</Link>
									</li>
								</div>
							</ul>
						</div>
					</div>
					<div className="col-md-3">
						<div className="tab-pane fade show active" role="tabpanel">
							<ul className="list-mega">
								<div>
									<div className="row align-items-center">
										<div className="col-2 p-0 text-center">
											<img
												src="/images/legal-service/Family.png"
												alt="Banking"
												style={{width: '70%'}}
											/>
										</div>
										<div className="col-10 p-0">
											<h6 className="set-menu-head">Family Law</h6>
										</div>
									</div>
									<li>
										<Link
											href="/family-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'family' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('family')}
											onMouseLeave={handleMouseLeave}>
											Family Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/divorce-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'divocee' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('divocee')}
											onMouseLeave={handleMouseLeave}>
											Divorce Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/child-custody-lawyer-uae"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'childcustody' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('childcustody')}
											onMouseLeave={handleMouseLeave}>
											Child Custody Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/child-support-lawyer"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'childsuport' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('childsuport')}
											onMouseLeave={handleMouseLeave}>
											Child Support Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/marriage-lawyers-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'marriage' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('marriage')}
											onMouseLeave={handleMouseLeave}>
											Marriage Lawyer
										</Link>
									</li>
								</div>
								<div className="set-hading-pading">
									<div className="row align-items-center">
										<div className="col-2 p-0 text-center">
											<img
												src="/images/legal-service/Dispute Resolution.png"
												alt="Banking"
												style={{width: '70%'}}
											/>
										</div>
										<div className="col-10 p-0">
											<h6 className="set-menu-head"> Dispute Resolution Law</h6>
										</div>
									</div>
									<li>
										<Link
											href="/rental-dispute-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'rental' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('rental')}
											onMouseLeave={handleMouseLeave}>
											Rental Dispute Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/dispute-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'disputelaw' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('disputelaw')}
											onMouseLeave={handleMouseLeave}>
											Dispute Resolution Lawyer
										</Link>
									</li>
								</div>
								<div className="set-hading-pading">
									<div className="d-flex">
										<img
											src="/images/legal-service/Islamic Finance.png"
											alt="Banking"
											style={{width: '12%'}}
										/>
										<h6 className="set-menu-head" style={{marginTop: '13px'}}>
											Islamic Finance Law
										</h6>
									</div>
									<li>
										<Link
											href="/rental-dispute-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'rentalfinance' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('rentalfinance')}
											onMouseLeave={handleMouseLeave}>
											Rental Dispute Professionals
										</Link>
									</li>
									<li>
										<Link
											href="/financial-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'finance' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('finance')}
											onMouseLeave={handleMouseLeave}>
											Finance Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/bankruptcy-lawyer-uae"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'bankruptcyfinance' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('bankruptcyfinance')}
											onMouseLeave={handleMouseLeave}>
											Bankrupcty Lawyer
										</Link>
									</li>
								</div>
								<div className="set-hading-pading">
									<div className="d-flex">
										<img
											src="/images/legal-service/Maritime.png"
											alt="Banking"
											style={{width: '12%'}}
										/>
										<h6 className="set-menu-head" style={{marginTop: '13px'}}>
											Maritime Law
										</h6>
									</div>

									<li>
										<Link
											href="/maritime-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'maritime' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('maritime')}
											onMouseLeave={handleMouseLeave}>
											Maritime Lawyer
										</Link>
									</li>
								</div>
							</ul>
						</div>
					</div>
					<div className="col-md-3">
						<div className="tab-pane fade show active" role="tabpanel">
							<ul className="list-mega">
								<div>
									<div className="row align-items-center">
										<div className="col-2 p-0 text-center">
											<img
												src="/images/legal-service/Employment.png"
												alt="Banking"
												style={{width: '70%'}}
											/>
										</div>
										<div className="col-10 p-0">
											<h6 className="set-menu-head">Employment Law</h6>
										</div>
									</div>

									<li>
										<Link
											href="/employment-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'employement' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('employement')}
											onMouseLeave={handleMouseLeave}>
											Employment Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/labour-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'labour' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('labour')}
											onMouseLeave={handleMouseLeave}>
											Labour Lawyer
										</Link>
									</li>
								</div>
								<div className="set-hading-pading">
									<div className="row align-items-center">
										<div className="col-2 p-0 text-center">
											<img
												src="/images/legal-service/Real Estate.png"
												alt="Banking"
												style={{width: '70%'}}
											/>
										</div>
										<div className="col-10 p-0">
											<h6 className="set-menu-head">Real Estate Law</h6>
										</div>
									</div>
									<li>
										<Link
											href="/real-estate-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'estate' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('estate')}
											onMouseLeave={handleMouseLeave}>
											Real Estate Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/property-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'property' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('property')}
											onMouseLeave={handleMouseLeave}>
											Property Lawyer
										</Link>
									</li>
								</div>
								<div className="set-hading-pading">
									<div className="row align-items-center">
										<div className="col-2 p-0 text-center">
											<img
												src="/images/legal-service/Criminal.png"
												alt="Banking"
												style={{width: '70%'}}
											/>
										</div>
										<div className="col-10 p-0">
											<h6 className="set-menu-head">Criminal Law</h6>
										</div>
									</div>

									<li>
										<Link
											href="/criminal-lawyers-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'criminal' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('criminal')}
											onMouseLeave={handleMouseLeave}>
											Criminal Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/corporate-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'coprtcustody' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('coprtcustody')}
											onMouseLeave={handleMouseLeave}>
											Coporate Lawyer
										</Link>
									</li>
								</div>

								<div className="set-hading-pading">
									<div className="row align-items-center">
										<div className="col-2 p-0 text-center">
											<img
												src="/images/legal-service/Intellectual Property.png"
												alt="Banking"
												style={{width: '70%'}}
											/>
										</div>
										<div className="col-10 p-0">
											<h6 className="set-menu-head"> Intellectual Property Law</h6>
										</div>
									</div>
									<li>
										<Link
											href="/intellectual-property-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'intelectual' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('intelectual')}
											onMouseLeave={handleMouseLeave}>
											Intellectual Property Lawyer
										</Link>
									</li>

									<li>
										<Link
											href="/patent-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'patent' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('patent')}
											onMouseLeave={handleMouseLeave}>
											Patent Lawyer
										</Link>
									</li>
									<li>
										<Link
											href="/entertainment-lawyer-dubai"
											onClick={onclose}
											className={`set-color-sub-menus ${
												activeLink === 'entermaint' ? 'active-link-mega-menu' : ''
											}`}
											onMouseEnter={() => handleMouseEnter('entermaint')}
											onMouseLeave={handleMouseLeave}>
											Entertainement Lawyer
										</Link>
									</li>
								</div>
							</ul>
						</div>
					</div> */}
				</div>
			</div>
			<div className="pt-4 lawyer-set-dubai" style={{ float: 'right' }}>
				<div>
					<Link
						href="/lawyers-in-ajman"
						className="pop-head-set gap-3 d-flex justify-content-between align-items-center margin-btm-lawyer"
						onClick={onclose}
						style={{ paddingRight: '50px' }}>
						<span
							style={{
								color: 'rgba(32, 140, 132, 1)',
								fontWeight: '600'
							}}
							className="lawyer-set-dubai">
							{t('View_All_Lawyers_in_Ajman')}
						</span>
						<span className="dropdown-arrow2"></span>
					</Link>
				</div>
			</div>
		</>
	);
}
