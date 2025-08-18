'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function MenuMobilePracticeArea({ onclose }: any) {
	const [isActive, setIsActive] = useState(false);
	const [isActivemegamenu, setIsActiveMegaMenu] = useState(false);
	const t = useTranslations('menupage');

	const handleButtonClick = () => {
		setIsActive(!isActive);
		setIsActiveMegaMenu(!isActivemegamenu);
	};

	const handleLinkClick = () => {
		setIsActive(false);
		setIsActiveMegaMenu(false);
		const collapseOne = document.getElementById('collapseOne1');
		if (collapseOne) {
			collapseOne.classList.remove('show'); // Remove the 'show' class from the accordion
		}
		onclose(); // Call the onclose function to close the accordion
	};

	return (
		<>
			<div
				id="collapseFifteen"
				className="accordion-collapse collapse"
				aria-labelledby="headingtwo"
				data-bs-parent="#accordionExample">
				<div className="accordion-body">
					<ul className="list-mega set-scrol-menu">
						<div>
							<div className="d-flex g-5 align-items-center ">
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
									<Link href="/legal-services/banking" onClick={onclose}>
										<h6
											style={{
												color: 'rgba(9, 63, 56, 1)',
												fontWeight: '700'
											}}>
											{t('Banking_Law')}
										</h6>
									</Link>
								</div>
							</div>
							<li>
								<Link
									href="/banking-lawyer-uae"
									className="set-color-sub-menus"
									onClick={handleLinkClick}>
									{t('Banking_Lawyer')}
								</Link>
							</li>
							<li>
								<Link href="/crypto-lawyer-dubai" className="set-color-sub-menus" onClick={onclose}>
									{t('Crypto_Lawyer')}
								</Link>
							</li>
							<li>
								<Link href="/bankruptcy-lawyer-uae" className="set-color-sub-menus" onClick={onclose}>
									{t('Bankruptcy_Lawyer')}
								</Link>
							</li>
						</div>
						<div>
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
									<Link href="/legal-services/business" onClick={onclose}>
										<h6
											style={{
												color: 'rgba(9, 63, 56, 1)',
												fontWeight: '700'
											}}>
											{t('Business_Law')}
										</h6>
									</Link>
								</div>
							</div>
							<li>
								<Link href="/business-lawyer-dubai" onClick={onclose} className="set-color-sub-menus">
									{t('Business_Lawyer')}
								</Link>
							</li>
							<li>
								<Link href="/corporate-lawyer-dubai" className="set-color-sub-menus">
									{t('Corporate_Lawyer')}
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
									<Link href="/legal-services/commercial" onClick={onclose}>
										<h6
											style={{
												color: 'rgba(9, 63, 56, 1)',
												fontWeight: '700'
											}}>
											{t('Commercial_Law')}
										</h6>
									</Link>
								</div>
							</div>
							<li>
								<Link href="/commercial-lawyer-dubai" onClick={onclose} className="set-color-sub-menus">
									{t('Commercial_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/dubai-construction-lawyer"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Construction_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/construction-accidents-lawyer-uae"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Construction_Accident_Lawyer')}
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
									<Link href="/legal-services/inheritance" onClick={onclose}>
										<h6
											style={{
												color: 'rgba(9, 63, 56, 1)',
												fontWeight: '700'
											}}>
											{t('Inheritance_Law')}
										</h6>
									</Link>
								</div>
							</div>
							<li>
								<Link href="/business-lawyer-dubai" onClick={onclose} className="set-color-sub-menus">
									{t('Business_Lawyer')}
								</Link>
							</li>
							<li>
								<Link href="/corporate-lawyer-dubai" onClick={onclose} className="set-color-sub-menus">
									{t('Corporate_Lawyer')}
								</Link>
							</li>
							<li>
								<Link href="/inheritance-lawyer-uae" onClick={onclose} className="set-color-sub-menus">
									{t('Inheritance_Lawyer')}
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
									<Link href="/legal-services/civil" onClick={onclose}>
										<h6
											style={{
												color: 'rgba(9, 63, 56, 1)',
												fontWeight: '700'
											}}>
											{t('Civil_Law')}
										</h6>
									</Link>
								</div>
							</div>
							<li>
								<Link href="/civil-lawyer-dubai" className="set-color-sub-menus" onClick={onclose}>
									{t('Civil_Lawyer')}
								</Link>
							</li>
							{/* <li>
								<Link href="/find-a-lawyer" className="set-color-sub-menus" onClick={onclose}>
									Accident Lawyers
								</Link>
							</li> */}
							<li>
								<Link
									href="/car-accident-lawyer-dubai"
									className="set-color-sub-menus"
									onClick={onclose}>
									{t('Car_Auto_Accident_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/motorcycle-accident-lawyer-dubai"
									className="set-color-sub-menus"
									onClick={onclose}>
									{t('Motorcycle_Accident_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/truck-accident-lawyer-dubai"
									className="set-color-sub-menus"
									onClick={onclose}>
									{t('Truck_Accident_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/bicycle-accident-lawyer-dubai"
									className="set-color-sub-menus"
									onClick={onclose}>
									{t('Bicycle_Accident_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/uber-accidents-lawyer-dubai"
									className="set-color-sub-menus"
									onClick={onclose}>
									{t('Uber_Accidents_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/personal-injury-lawyer-dubai"
									className="set-color-sub-menus"
									onClick={onclose}>
									{t('Personal_Injury_Lawyer')}
								</Link>
							</li>
							<li>
								<Link href="/injury-lawyer-dubai" className="set-color-sub-menus" onClick={onclose}>
									{t('Injury_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/premises-liability-lawyer-uae"
									className="set-color-sub-menus"
									onClick={onclose}>
									{t('Premises_Liability_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/product-liability-lawyer-dubai"
									className="set-color-sub-menus"
									onClick={onclose}>
									{t('Product_Liability_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/medical-malpractice-lawyer"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Medical_Malpractice_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/hospital-negligence-lawyer-uae"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Hospital_Negligence_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/brain-injury-lawyer-dubai"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Brain_Injury_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/disability-lawyers-dubai"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Disability_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/immigration-lawyer-dubai"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Immigration_Lawyer')}
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
									<Link href="/legal-services/family" onClick={onclose}>
										<h6
											style={{
												color: 'rgba(9, 63, 56, 1)',
												fontWeight: '700'
											}}>
											{t('Family_Law')}
										</h6>
									</Link>
								</div>
							</div>
							<li>
								<Link
									href="/family-lawyer-dubai"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Family_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/divorce-lawyer-dubai"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Divorce_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/child-custody-lawyer-uae"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Child_Custody_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/child-support-lawyer"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Child_Support_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/marriage-lawyers-dubai"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Marriage_Lawyer')}
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
									<Link href="/rental-dispute-lawyer-dubai" onClick={onclose}>
										<h6
											style={{
												color: 'rgba(9, 63, 56, 1)',
												fontWeight: '700'
											}}>
											{t('Dispute_Resolution_Law')}
										</h6>
									</Link>
								</div>
							</div>
							<li>
								<Link
									href="/rental-dispute-lawyer-dubai"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Rental_Dispute_Lawyer')}
								</Link>
							</li>

							<li>
								<Link
									href="/dispute-lawyer-dubai"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Dispute_Resolution_Lawyer')}
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
									<Link href="/legal-services/islamic-finance" onClick={onclose}>
										<h6
											style={{
												color: 'rgba(9, 63, 56, 1)',
												fontWeight: '700'
											}}>
											{t('Islamic_Finance_Law')}
										</h6>
									</Link>
								</div>
							</div>
							<li>
								<Link
									href="/rental-dispute-lawyer-dubai"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Rental_Dispute_Lawyer')}
								</Link>
							</li>

							<li>
								<Link href="/financial-lawyer-dubai" onClick={onclose} className="set-color-sub-menus">
									{t('Finance_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/bankruptcy-lawyer-uae"
									className="set-color-sub-menus"
									onClick={onclose}>
									{t('Bankruptcy_Lawyer')}
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
									<Link href="#" onClick={onclose}>
										<h6
											style={{
												color: 'rgba(9, 63, 56, 1)',
												fontWeight: '700'
											}}>
											{t('Maritime_Law')}
										</h6>
									</Link>
								</div>
							</div>
							<li>
								<Link
									href="/maritime-lawyer-dubai"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Maritime_Lawyer')}
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
									<Link href="/legal-services/employment" onClick={onclose}>
										<h6
											style={{
												color: 'rgba(9, 63, 56, 1)',
												fontWeight: '700'
											}}>
											{t('Employment_Law')}
										</h6>
									</Link>
								</div>
							</div>
							<li>
								<Link
									href="/employment-lawyer-dubai"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Employment_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/labour-lawyer-dubai"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Labour_Lawyer')}
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
									<Link href="/legal-services/real-estate" onClick={onclose}>
										<h6
											style={{
												color: 'rgba(9, 63, 56, 1)',
												fontWeight: '700'
											}}>
											{t('Real_Estate_Law')}
										</h6>
									</Link>
								</div>
							</div>
							<li>
								<Link
									href="/real-estate-lawyer-dubai"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Real_Estate_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/property-lawyer-dubai"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Property_Lawyer')}
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
									<Link href="/legal-services/criminal" onClick={onclose}>
										<h6
											style={{
												color: 'rgba(9, 63, 56, 1)',
												fontWeight: '700'
											}}>
											{t('Criminal_Law')}
										</h6>
									</Link>
								</div>
							</div>
							<li>
								<Link
									href="/criminal-lawyers-dubai"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Criminal_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/corporate-lawyer-dubai"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Corporate_Lawyer')}
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
									<Link href="/legal-services/intellectual-property" onClick={onclose}>
										<h6
											style={{
												color: 'rgba(9, 63, 56, 1)',
												fontWeight: '700'
											}}>
											{t('Intellectual_Property_Law')}
										</h6>
									</Link>
								</div>
							</div>
							<li>
								<Link
									href="/intellectual-property-lawyer-dubai"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Intellectual_Property_Lawyer')}
								</Link>
							</li>
							<li>
								<Link href="/patent-lawyer-dubai" onClick={onclose} className="set-color-sub-menus">
									{t('Patent_Lawyer')}
								</Link>
							</li>
							<li>
								<Link
									href="/entertainment-lawyer-dubai												"
									onClick={onclose}
									className="set-color-sub-menus">
									{t('Entertainment_Lawyer')}
								</Link>
							</li>
						</div>
					</ul>
				</div>
			</div>
		</>
	);
}
