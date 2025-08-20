'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function MegaMenuRasAlKhaimah({ onclose }: any) {
	const [isActive, setIsActive] = useState(false);
	const [isActivemegamenu, setIsActiveMegaMenu] = useState(false);
	const t = useTranslations('menupage');

	const handleButtonClick = (event: any) => {
		// Prevent the button click when the span inside it is clicked
		if (event.target.tagName !== 'SPAN') {
			setIsActive(!isActive);
			setIsActiveMegaMenu(!isActivemegamenu);
		}
	};

	const handleLinkClick = () => {
		setIsActive(false);
		setIsActiveMegaMenu(false);
		const collapseOne = document.getElementById('collapseOne6');
		if (collapseOne) {
			collapseOne.classList.remove('show'); // Remove the 'show' class from the accordion
		}
		onclose(); // Call the onclose function to close the accordion
	};

	return (
		<>
			<div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="heading3" data-bs-parent="#accordionExample">
				<div className="accordion-body">
					<div className="accordion-item">
						<h2 className={`accordion-header ${isActive ? 'setMegaMenuAdd' : ''}`}>
							<button
								id="moveIconeMenu"
								className={`accordion-button megamenu set-pad-left-menu ${isActivemegamenu ? 'megaMenuactive' : ''
									} `}
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapseOne6"
								aria-expanded="true"
								aria-controls="collapseOne6"
								onClick={handleButtonClick}
								style={{ color: '#4F4F4F' }}>
								<span onClick={() => { window.location.href = '/lawyers-in-ras-al-khaimah'; }}>{t('Ras_Al_Khaimah')}</span>
							</button>
						</h2>
						<div
							id="collapseOne6"
							// className="accordion-collapse collapse megaMenuactiveCollapse"
							className={`accordion-collapse collapse megaMenuactiveCollapse ${isActivemegamenu ? 'show' : ''
								}`}
							data-bs-parent="#accordionExample1">
							<div className="accordion-body">
								<ul className="list-mega set-scrol-menu sharjah">
									<div>
										{/* <div className="d-flex g-5 align-items-center ">
											<div className=" p-0 text-center">
												<img
													src="/images/legal-service/Banking.png"
													alt="Banking"
													style={{
														width: '25px',
														verticalAlign: 'baseline'
													}}
												/>
											</div>
											<div className=" p-0">
												<h6
													style={{
														color: 'rgba(9, 63, 56, 1)',
														fontWeight: '700'
													}}>
													Banking Law
												</h6>
											</div>
										</div> */}
										{/* <li>
											<Link
												href="/lawyers-in-sharjah"
												className="set-color-sub-menus"
												onClick={handleLinkClick}>
												Best Professionals Sharjah
											</Link>
										</li> */}
										{/* <li>
											<Link href="/crypto-lawyer-dubai" className="set-color-sub-menus" onClick={onclose}>
												Crypto Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/bankruptcy-lawyer-uae"
												className="set-color-sub-menus"
												onClick={onclose}>
												Bankrupcty Lawyer
											</Link>
										</li> */}
									</div>
									{/* <div>
										<div className="d-flex g-4 align-items-center">
											<div className=" p-0 text-center">
												<img
													src="/images/legal-service/Business.png"
													alt="Banking"
													style={{
														width: '25px',
														verticalAlign: 'baseline'
													}}
												/>
											</div>
											<div className="p-0 ">
												<h6
													style={{
														color: 'rgba(9, 63, 56, 1)',
														fontWeight: '700'
													}}>
													Buisness Law
												</h6>
											</div>
										</div>
										<li>
											<Link
												href="/business-lawyer-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Business Lawyer
											</Link>
										</li>
										<li>
											<Link href="/corporate-lawyer-dubai" className="set-color-sub-menus">
												Corporate Professionals
											</Link>
										</li>
									</div>
									<div>
										<div className="d-flex g-4 align-items-center">
											<div className=" p-0 text-center">
												<img
													src="/images/legal-service/Commercial.png"
													alt="Banking"
													style={{
														width: '25px',
														verticalAlign: 'baseline'
													}}
												/>
											</div>
											<div className=" p-0">
												<h6
													style={{
														color: 'rgba(9, 63, 56, 1)',
														fontWeight: '700'
													}}>
													Commercial Law
												</h6>
											</div>
										</div>
										<li>
											<Link
												href="/commercial-lawyer-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Commercial Professionals
											</Link>
										</li>
										<li>
											<Link
												href="/dubai-construction-lawyer"
												onClick={onclose}
												className="set-color-sub-menus">
												Construction Professionals
											</Link>
										</li>
										<li>
											<Link
												href="/construction-accidents-lawyer-uae"
												onClick={onclose}
												className="set-color-sub-menus">
												Construction Accident Lawyer
											</Link>
										</li>
									</div>
									<div>
										<div className="d-flex g-4 align-items-center">
											<div className=" p-0 text-center">
												<img
													src="/images/legal-service/Inheritance.png"
													alt="Banking"
													style={{
														width: '25px',
														verticalAlign: 'baseline'
													}}
												/>
											</div>
											<div className=" p-0">
												<h6
													style={{
														color: 'rgba(9, 63, 56, 1)',
														fontWeight: '700'
													}}>
													Inheritence Law
												</h6>
											</div>
										</div>
										<li>
											<Link
												href="/business-lawyer-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Business Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/corporate-lawyer-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Corporate Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/inheritance-lawyer-uae"
												onClick={onclose}
												className="set-color-sub-menus">
												Inheritance Lawyer
											</Link>
										</li>
									</div>

									<div>
										<div className="d-flex g-4 align-items-center">
											<div className=" p-0 text-center">
												<img
													src="/images/legal-service/Civil.png"
													alt="Banking"
													style={{
														width: '25px',
														verticalAlign: 'baseline'
													}}
												/>
											</div>
											<div className=" p-0">
												<h6
													style={{
														color: 'rgba(9, 63, 56, 1)',
														fontWeight: '700'
													}}>
													Civil Law
												</h6>
											</div>
										</div>
										<li>
											<Link
												href="/civil-lawyer-dubai"
												className="set-color-sub-menus"
												onClick={onclose}>
												Civil Professionals
											</Link>
										</li>
										<li>
											<Link
												href="/find-a-lawyer"
												className="set-color-sub-menus"
												onClick={onclose}>
												Accident Professionals
											</Link>
										</li>
										<li>
											<Link
												href="/car-accident-lawyer-dubai"
												className="set-color-sub-menus"
												onClick={onclose}>
												Car / Auto accident Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/motorcycle-accident-lawyer-dubai"
												className="set-color-sub-menus"
												onClick={onclose}>
												Motorcycle Accident Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/truck-accident-lawyer-dubai"
												className="set-color-sub-menus"
												onClick={onclose}>
												Truck Accident Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/bicycle-accident-lawyer-dubai"
												className="set-color-sub-menus"
												onClick={onclose}>
												Bicycle Accident Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/uber-accidents-lawyer-dubai"
												className="set-color-sub-menus"
												onClick={onclose}>
												Uber Accidents Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/personal-injury-lawyer-dubai"
												className="set-color-sub-menus"
												onClick={onclose}>
												Personal Injury Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/injury-lawyer-dubai"
												className="set-color-sub-menus"
												onClick={onclose}>
												Injury Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/premises-liability-lawyer-uae"
												className="set-color-sub-menus"
												onClick={onclose}>
												Premsies Liability Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/product-liability-lawyer-dubai"
												className="set-color-sub-menus"
												onClick={onclose}>
												Product Liability Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/medical-malpractice-lawyer"
												onClick={onclose}
												className="set-color-sub-menus">
												Medical Malpractise Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/hospital-negligence-lawyer-uae"
												onClick={onclose}
												className="set-color-sub-menus">
												Hospital Negligence Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/brain-injury-lawyer-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Brain Injury Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/disability-lawyers-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Disability Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/immigration-lawyer-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Immigration Lawyer
											</Link>
										</li>
									</div>

									<div>
										<div className="d-flex g-4 align-items-center">
											<div className=" p-0 text-center">
												<img
													src="/images/legal-service/Family.png"
													alt="Banking"
													style={{
														width: '25px',
														verticalAlign: 'baseline'
													}}
												/>
											</div>
											<div className=" p-0">
												<h6
													style={{
														color: 'rgba(9, 63, 56, 1)',
														fontWeight: '700'
													}}>
													Family Law
												</h6>
											</div>
										</div>
										<li>
											<Link
												href="/family-lawyer-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Family Professionals
											</Link>
										</li>
										<li>
											<Link
												href="/divorce-lawyer-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Divorce Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/child-custody-lawyer-uae"
												onClick={onclose}
												className="set-color-sub-menus">
												Child Custody Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/child-support-lawyer"
												onClick={onclose}
												className="set-color-sub-menus">
												Child Support Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/marriage-lawyers-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Marriage Lawyer
											</Link>
										</li>
									</div>
									<div>
										<div className="d-flex g-4 align-items-center">
											<div className=" p-0 text-center">
												<img
													src="/images/legal-service/Dispute Resolution.png"
													alt="Banking"
													style={{
														width: '25px',
														verticalAlign: 'baseline'
													}}
												/>
											</div>
											<div className=" p-0">
												<h6
													style={{
														color: 'rgba(9, 63, 56, 1)',
														fontWeight: '700'
													}}>
													Dispute Resolution Law
												</h6>
											</div>
										</div>
										<li>
											<Link
												href="/rental-dispute-lawyer-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Rental Dispute Professionals
											</Link>
										</li>

										<li>
											<Link
												href="/dispute-lawyer-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Dispute Resolution Lawyer
											</Link>
										</li>
									</div>
									<div>
										<div className="d-flex g-4 align-items-center">
											<div className=" p-0 text-center">
												<img
													src="/images/legal-service/Islamic Finance.png"
													alt="Banking"
													style={{
														width: '25px',
														verticalAlign: 'baseline'
													}}
												/>
											</div>
											<div className=" p-0">
												<h6
													style={{
														color: 'rgba(9, 63, 56, 1)',
														fontWeight: '700'
													}}>
													Islamic Law
												</h6>
											</div>
										</div>
										<li>
											<Link
												href="/rental-dispute-lawyer-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Rental Dispute Professionals
											</Link>
										</li>

										<li>
											<Link href="/financial-lawyer-dubai" onClick={onclose} className="set-color-sub-menus">
												Finance
											</Link>
										</li>
										<li>
											<Link
												href="/bankruptcy-lawyer-uae"
												className="set-color-sub-menus"
												onClick={onclose}>
												Bankrupcty Lawyer
											</Link>
										</li>
									</div>
									<div>
										<div className="d-flex g-4 align-items-center">
											<div className=" p-0 text-center">
												<img
													src="/images/legal-service/Maritime.png"
													alt="Banking"
													style={{
														width: '25px',
														verticalAlign: 'baseline'
													}}
												/>
											</div>
											<div className=" p-0">
												<h6
													style={{
														color: 'rgba(9, 63, 56, 1)',
														fontWeight: '700'
													}}>
													Maritime Law
												</h6>
											</div>
										</div>
										<li>
											<Link
												href="/maritime-lawyer-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Maritime Lawyer
											</Link>
										</li>
									</div>
									<div>
										<div className="d-flex g-4 align-items-center">
											<div className=" p-0 text-center">
												<img
													src="/images/legal-service/Employment.png"
													alt="Banking"
													style={{
														width: '25px',
														verticalAlign: 'baseline'
													}}
												/>
											</div>
											<div className=" p-0">
												<h6
													style={{
														color: 'rgba(9, 63, 56, 1)',
														fontWeight: '700'
													}}>
													Employment Law
												</h6>
											</div>
										</div>
										<li>
											<Link
												href="/employment-lawyer-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Employment Professionals
											</Link>
										</li>
										<li>
											<Link
												href="/labour-lawyer-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Labour Lawyer
											</Link>
										</li>
									</div>
									<div>
										<div className="d-flex g-4 align-items-center">
											<div className=" p-0 text-center">
												<img
													src="/images/legal-service/Real Estate.png"
													alt="Banking"
													style={{
														width: '25px',
														verticalAlign: 'baseline'
													}}
												/>
											</div>
											<div className=" p-0">
												<h6
													style={{
														color: 'rgba(9, 63, 56, 1)',
														fontWeight: '700'
													}}>
													Real Estate Law
												</h6>
											</div>
										</div>
										<li>
											<Link
												href="/real-estate-lawyer-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Real Estate Professionals
											</Link>
										</li>
										<li>
											<Link
												href="/property-lawyer-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Property Professionals
											</Link>
										</li>
									</div>
									<div>
										<div className="d-flex g-4 align-items-center">
											<div className=" p-0 text-center">
												<img
													src="/images/legal-service/Criminal.png"
													alt="Banking"
													style={{
														width: '25px',
														verticalAlign: 'baseline'
													}}
												/>
											</div>
											<div className=" p-0">
												<h6
													style={{
														color: 'rgba(9, 63, 56, 1)',
														fontWeight: '700'
													}}>
													Criminal Law
												</h6>
											</div>
										</div>
										<li>
											<Link
												href="/criminal-lawyers-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Criminal Professionals
											</Link>
										</li>
										<li>
											<Link
												href="/corporate-lawyer-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Coporate Lawyer
											</Link>
										</li>
									</div>
									<div>
										<div className="d-flex g-4 align-items-center">
											<div className=" p-0 text-center">
												<img
													src="/images/legal-service/Intellectual Property.png"
													alt="Banking"
													style={{
														width: '25px',
														verticalAlign: 'baseline'
													}}
												/>
											</div>
											<div className=" p-0">
												<h6
													style={{
														color: 'rgba(9, 63, 56, 1)',
														fontWeight: '700'
													}}>
													Intellectual Property Law
												</h6>
											</div>
										</div>
										<li>
											<Link
												href="/intellectual-property-lawyer-dubai"
												onClick={onclose}
												className="set-color-sub-menus">
												Intellectual Property Lawyer
											</Link>
										</li>
										<li>
											<Link href="/patent-lawyer-dubai" onClick={onclose} className="set-color-sub-menus">
												Patent Lawyer
											</Link>
										</li>
										<li>
											<Link
												href="/entertainment-lawyer-dubai												"
												onClick={onclose}
												className="set-color-sub-menus">
												Entertainement Lawyer
											</Link>
										</li>
									</div> */}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
