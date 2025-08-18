'use client';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import AuthContext from '@/context/AuthContext';
import { useTranslations } from 'next-intl';

export default function PracticeArea({ onclose }: any) {
	const { locale } = useContext(AuthContext);
	const [isFixed, setIsFixed] = useState(false);
	const [srollcount, setScrolCount] = useState(0);
	const [activeLink, setActiveLink] = useState('');
	const t = useTranslations('menupage');

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
					<div className="col-md-3 practiceAreaPadding">
						<div className="tab-pane fade show active" role="tabpanel">
							<ul className="list-mega">
								<div>
									<div className="row align-items-center">
										<div className="col-2 p-0 text-center">
											<img
												src="/images/legal-service/Banking.png"
												alt="Banking"
												style={{ width: '70%' }}
											/>
										</div>
										<div className="col-10 p-0">
											<Link href="/legal-services/banking" onClick={onclose}>
												<h6 className="set-menu-head">{t('Banking_Law')}</h6>
											</Link>
										</div>
									</div>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/banking-lawyer-uae`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'banking' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('banking')}
											onMouseLeave={handleMouseLeave}>
											{t('Banking_Lawyer')}
										</Link>
									</li>
									<li>
										<Link href="/crypto-lawyer-dubai" onClick={onclose} className={`set-color-sub-menus ${activeLink === 'crypto' ? 'active-link-mega-menu' : ''}`}
											onMouseEnter={() => handleMouseEnter('crypto')}
											onMouseLeave={handleMouseLeave}>
											{t('Crypto_Lawyer')}
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
											{t('Bankruptcy_Lawyer')}
										</Link>
									</li>
								</div>
								<div className="set-hading-pading">
									<div className="row align-items-center">
										<div className="col-2 p-0 text-center">
											<img
												src="/images/legal-service/Business.png"
												alt="Banking"
												style={{ width: '70%' }}
											/>
										</div>
										<div className="col-10 p-0">
											<Link href="/legal-services/business" onClick={onclose}>
												<h6 className="set-menu-head">{t('Business_Law')}</h6>
											</Link>
										</div>
									</div>

									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/business-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'buisness' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('buisness')}
											onMouseLeave={handleMouseLeave}>
											{t('Business_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/corporate-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'corporate' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('corporate')}
											onMouseLeave={handleMouseLeave}>
											{t('Corporate_Lawyer')}
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
											<Link href="/legal-services/commercial" onClick={onclose}>
												<h6 className="set-menu-head">{t('Commercial_Law')}</h6>
											</Link>
										</div>
									</div>

									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/commercial-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'commercialLawyer' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('commercialLawyer')}
											onMouseLeave={handleMouseLeave}>
											{t('Commercial_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/dubai-construction-lawyer`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'constructionlawyer' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('constructionlawyer')}
											onMouseLeave={handleMouseLeave}>
											{t('Construction_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/construction-accidents-lawyer-uae`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'constAccident' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('constAccident')}
											onMouseLeave={handleMouseLeave}>
											{t('Construction_Accident_Lawyer')}
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
											<Link href="/legal-services/inheritance" onClick={onclose}>
												<h6 className="set-menu-head">{t('Inheritance_Law')}</h6>
											</Link>
										</div>
									</div>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/business-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'intbuisness' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('intbuisness')}
											onMouseLeave={handleMouseLeave}>
											{t('Business_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/corporate-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'custody' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('custody')}
											onMouseLeave={handleMouseLeave}>
											{t('Corporate_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/inheritance-lawyer-uae`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'inheritence' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('inheritence')}
											onMouseLeave={handleMouseLeave}>
											{t('Inheritance_Lawyer')}
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
												src="/images/legal-service/Civil.png"
												alt="Banking"
												style={{ width: '70%' }}
											/>
										</div>
										<div className="col-10 p-0">
											<Link href="/legal-services/civil" onClick={onclose}>
												<h6 className="set-menu-head">{t('Civil_Law')}</h6>
											</Link>
										</div>
									</div>

									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/civil-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'civillawyer' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('civillawyer')}
											onMouseLeave={handleMouseLeave}>
											{t('Civil_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/car-accident-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'carlawyer' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('carlawyer')}
											onMouseLeave={handleMouseLeave}>
											{t('Car_Auto_Accident_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/motorcycle-accident-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'motorlawyer' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('motorlawyer')}
											onMouseLeave={handleMouseLeave}>
											{t('Motorcycle_Accident_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/truck-accident-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'trucklawyer' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('trucklawyer')}
											onMouseLeave={handleMouseLeave}>
											{t('Truck_Accident_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/bicycle-accident-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'bicyclelawyer' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('bicyclelawyer')}
											onMouseLeave={handleMouseLeave}>
											{t('Bicycle_Accident_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/uber-accidents-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'uberlawyer' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('uberlawyer')}
											onMouseLeave={handleMouseLeave}>
											{t('Uber_Accidents_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/personal-injury-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'personallawyer' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('personallawyer')}
											onMouseLeave={handleMouseLeave}>
											{t('Personal_Injury_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/injury-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'injurylawyer' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('injurylawyer')}
											onMouseLeave={handleMouseLeave}>
											{t('Injury_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/premises-liability-lawyer-uae`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'premsieslawyer' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('premsieslawyer')}
											onMouseLeave={handleMouseLeave}>
											{t('Premises_Liability_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/product-liability-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'productlawyer' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('productlawyer')}
											onMouseLeave={handleMouseLeave}>
											{t('Product_Liability_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/medical-malpractice-lawyer`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'medical' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('medical')}
											onMouseLeave={handleMouseLeave}>
											{t('Medical_Malpractice_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/hospital-negligence-lawyer-uae`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'hospital' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('hospital')}
											onMouseLeave={handleMouseLeave}>
											{t('Hospital_Negligence_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/brain-injury-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'brain' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('brain')}
											onMouseLeave={handleMouseLeave}>
											{t('Brain_Injury_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/disability-lawyers-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'disability' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('disability')}
											onMouseLeave={handleMouseLeave}>
											{t('Disability_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/immigration-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'immigration' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('immigration')}
											onMouseLeave={handleMouseLeave}>
											{t('Immigration_Lawyer')}
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
												style={{ width: '70%' }}
											/>
										</div>
										<div className="col-10 p-0">
											<Link href="/legal-services/family" onClick={onclose}>
												<h6 className="set-menu-head">{t('Family_Law')}</h6>
											</Link>
										</div>
									</div>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/family-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'family' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('family')}
											onMouseLeave={handleMouseLeave}>
											{t('Family_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/divorce-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'divocee' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('divocee')}
											onMouseLeave={handleMouseLeave}>
											{t('Divorce_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/child-custody-lawyer-uae`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'childcustody' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('childcustody')}
											onMouseLeave={handleMouseLeave}>
											{t('Child_Custody_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/child-support-lawyer`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'childsuport' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('childsuport')}
											onMouseLeave={handleMouseLeave}>
											{t('Child_Support_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/marriage-lawyers-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'marriage' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('marriage')}
											onMouseLeave={handleMouseLeave}>
											{t('Marriage_Lawyer')}
										</Link>
									</li>
								</div>
								<div className="set-hading-pading">
									<div className="row align-items-center">
										<div className="col-2 p-0 text-center">
											<img
												src="/images/legal-service/Dispute Resolution.png"
												alt="Banking"
												style={{ width: '70%' }}
											/>
										</div>
										<div className="col-10 p-0">
											<Link href="/legal-services/dispute-resolution" onClick={onclose}>
												<h6 className="set-menu-head"> {t('Dispute_Resolution_Law')}</h6>
											</Link>
										</div>
									</div>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/rental-dispute-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'rental' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('rental')}
											onMouseLeave={handleMouseLeave}>
											{t('Rental_Dispute_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/dispute-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'disputelaw' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('disputelaw')}
											onMouseLeave={handleMouseLeave}>
											{t('Dispute_Resolution_Lawyer')}
										</Link>
									</li>
								</div>
								<div className="set-hading-pading">
									<div className="d-flex">
										<img
											src="/images/legal-service/Islamic Finance.png"
											alt="Banking"
											style={{ width: '12%' }}
										/>
										<Link href="/legal-services/islamic-finance" onClick={onclose}>
											<h6 className="set-menu-head" style={{ marginTop: '13px' }}>
												{t('Islamic_Finance_Law')}
											</h6>
										</Link>
									</div>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/rental-dispute-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'rentalfinance' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('rentalfinance')}
											onMouseLeave={handleMouseLeave}>
											{t('Rental_Dispute_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/financial-lawyer-dubai`}

											onClick={onclose} className={`set-color-sub-menus ${activeLink === 'finance' ? 'active-link-mega-menu' : ''}`}
											onMouseEnter={() => handleMouseEnter('finance')}
											onMouseLeave={handleMouseLeave}>
											{t('Finance_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/bankruptcy-lawyer-uae`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'bankruptcyfinance' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('bankruptcyfinance')}
											onMouseLeave={handleMouseLeave}>
											{t('Bankruptcy_Lawyer')}
										</Link>
									</li>
								</div>
								<div className="set-hading-pading">
									<div className="d-flex">
										<img
											src="/images/legal-service/Maritime.png"
											alt="Banking"
											style={{ width: '12%' }}
										/>
										<Link href="#" onClick={onclose}>
											<h6 className="set-menu-head" style={{ marginTop: '13px' }}>
												{t('Maritime_Law')}
											</h6>
										</Link>
									</div>

									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/maritime-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'maritime' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('maritime')}
											onMouseLeave={handleMouseLeave}>
											{t('Maritime_Lawyer')}
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
												style={{ width: '70%' }}
											/>
										</div>
										<div className="col-10 p-0">
											<Link href="/legal-services/employment" onClick={onclose}>
												<h6 className="set-menu-head">{t('Employment_Law')}</h6>
											</Link>
										</div>
									</div>

									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/employment-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'employement' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('employement')}
											onMouseLeave={handleMouseLeave}>
											{t('Employment_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/labour-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'labour' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('labour')}
											onMouseLeave={handleMouseLeave}>
											{t('Labour_Lawyer')}
										</Link>
									</li>
								</div>
								<div className="set-hading-pading">
									<div className="row align-items-center">
										<div className="col-2 p-0 text-center">
											<img
												src="/images/legal-service/Real Estate.png"
												alt="Banking"
												style={{ width: '70%' }}
											/>
										</div>
										<div className="col-10 p-0">
											<Link href="/legal-services/real-estate" onClick={onclose}>
												<h6 className="set-menu-head">{t('Real_Estate_Law')}</h6>
											</Link>
										</div>
									</div>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/real-estate-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'estate' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('estate')}
											onMouseLeave={handleMouseLeave}>
											{t('Real_Estate_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/property-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'property' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('property')}
											onMouseLeave={handleMouseLeave}>
											{t('Property_Lawyer')}
										</Link>
									</li>
								</div>
								<div className="set-hading-pading">
									<div className="row align-items-center">
										<div className="col-2 p-0 text-center">
											<img
												src="/images/legal-service/Criminal.png"
												alt="Banking"
												style={{ width: '70%' }}
											/>
										</div>
										<div className="col-10 p-0">
											<Link href="/legal-services/criminal">
												<h6 className="set-menu-head" onClick={onclose}>
													{t('Criminal_Law')}
												</h6>
											</Link>
										</div>
									</div>

									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/criminal-lawyers-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'criminal' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('criminal')}
											onMouseLeave={handleMouseLeave}>
											{t('Criminal_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/corporate-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'coprtcustody' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('coprtcustody')}
											onMouseLeave={handleMouseLeave}>
											{t('Corporate_Lawyer')}
										</Link>
									</li>
								</div>

								<div className="set-hading-pading">
									<div className="row align-items-center">
										<div className="col-2 p-0 text-center">
											<img
												src="/images/legal-service/Intellectual Property.png"
												alt="Banking"
												style={{ width: '70%' }}
											/>
										</div>
										<div className="col-10 p-0">
											<Link href="/legal-services/intellectual-property" onClick={onclose}>
												<h6 className="set-menu-head"> {t('Intellectual_Property_Law')}</h6>
											</Link>
										</div>
									</div>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/intellectual-property-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'intelectual' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('intelectual')}
											onMouseLeave={handleMouseLeave}>
											{t('Intellectual_Property_Lawyer')}
										</Link>
									</li>

									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/patent-lawyer-dubai`}
											onClick={onclose} className={`set-color-sub-menus ${activeLink === 'patent' ? 'active-link-mega-menu' : ''}`}
											onMouseEnter={() => handleMouseEnter('patent')}
											onMouseLeave={handleMouseLeave}>
											{t('Patent_Lawyer')}
										</Link>
									</li>
									<li>
										<Link
											href={`${locale !== 'en' ? `/${locale}` : ''}/entertainment-lawyer-dubai`}
											onClick={onclose}
											className={`set-color-sub-menus ${activeLink === 'entermaint' ? 'active-link-mega-menu' : ''
												}`}
											onMouseEnter={() => handleMouseEnter('entermaint')}
											onMouseLeave={handleMouseLeave}>
											{t('Entertainment_Lawyer')}
										</Link>
									</li>
								</div>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
