import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
export default function StatistcsSection() {
    return (
        <section className="why-join">
            <div className="container">
                <div className="row mt-md-5 align-items-end">
                    <div className="col-lg-12 col-xl-12 col-md-12">
                        <h2 className="font-smaller weight-bold text-white">
                            <span className="green-med">Immigration and</span>{' '}
                            <span className="green-med-col">Residence Regulations </span>
                        </h2>
                        <div className="accordion-body border-0 text-white">
                            The Federal Law No. 6 of 1973 outlines the legal provisions for the entry, residence,
                            and deportation of foreigners in the United Arab Emirates. It provides clear guidelines
                            on the requirements for entry, the responsibilities of transport operators, and the
                            issuance of visas and permits.
                        </div>
                    </div>

                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-xl-12 col-md-12">
                                <div className="gotTitle"></div>
                                <div className="gotAccordion" id="accordionExampleset">
                                    <div className="accordion mt-5" id="accordionExample">
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingOne">
                                                <button
                                                    className="accordion-button text-white"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseOne"
                                                    aria-expanded="true"
                                                    aria-controls="collapseOne">
                                                    Entry Requirements for Foreigners
                                                </button>
                                            </h2>
                                            <div
                                                id="collapseOne"
                                                className="accordion-collapse collapse show"
                                                aria-labelledby="headingOne"
                                                data-bs-parent="#accordionExample">
                                                <div className="accordion-body border-0 text-white">
                                                    Foreigners are individuals who are not nationals of the United
                                                    Arab Emirates. To enter the country, foreigners must meet
                                                    specific requirements.
                                                    <ul className="custom-bullets mt-3 mb-3">
                                                        <li>
                                                            Entry through approved ports: Foreigners must enter the
                                                            UAE through designated ports as specified by the
                                                            executive regulations of the law.
                                                        </li>
                                                        <li>
                                                            Possession of valid travel documents: A valid passport
                                                            or equivalent documents are necessary to enter and exit
                                                            the UAE. These documents must allow the holder to return
                                                            to their country of origin.
                                                        </li>
                                                        <li>
                                                            Valid visa or entry permit: Foreigners must have a valid
                                                            visa or entry permit. As decreed by the Cabinet, some
                                                            exemptions exist for certain nationalities.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingTwo1">
                                                <button
                                                    className="accordion-button text-white"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseTwo1"
                                                    aria-expanded="true"
                                                    aria-controls="collapseTwo1">
                                                    Responsibilities of Carriers and Employers
                                                </button>
                                            </h2>
                                            <div
                                                id="collapseTwo1"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingTwo1"
                                                data-bs-parent="#accordionExample">
                                                <div className="accordion-body border-0 text-white">
                                                    Transporters and employers have obligations when it comes to the
                                                    entry and residence of foreigners in the UAE.
                                                    <ul className="custom-bullets mt-3 mb-3">
                                                        <li>
                                                            Transporter obligations: Captains of vessels, aircraft,
                                                            and drivers of other transport means must submit a
                                                            manifest with the names and particulars of passengers
                                                            and crew. They are responsible for ensuring passengers
                                                            have valid documents and must report any suspicions to
                                                            the authorities.
                                                        </li>
                                                        <li>
                                                            Employer obligations: Employers must notify the Federal
                                                            Authority for Identity and Citizenship or the police
                                                            when employing a foreigner within 48 hours of the
                                                            foreigner joining the service and at the end of the
                                                            service.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="headingThree">
                                                <button
                                                    className="accordion-button text-white"
                                                    type="button"
                                                    data-bs-toggle="collapse"
                                                    data-bs-target="#collapseThree"
                                                    aria-expanded="true"
                                                    aria-controls="collapseThree">
                                                    Issuance of Entry Visas and Residence Permits
                                                </button>
                                            </h2>
                                            <div
                                                id="collapseThree"
                                                className="accordion-collapse collapse"
                                                aria-labelledby="headingThree"
                                                data-bs-parent="#accordionExample">
                                                <div className="accordion-body border-0 text-white">
                                                    Foreigners can obtain entry visas and residence permits
                                                    according to specific criteria.
                                                    <ul className="custom-bullets mt-3 mb-3">
                                                        <li>
                                                            Issuance by authorized entities: The Federal Authority
                                                            for Identity and Citizenship, embassies, and consular
                                                            bodies can issue permits and visas according to the
                                                            executive regulations of the law.
                                                        </li>
                                                        <li>
                                                            Visit visas: Visit visas allow foreigners to stay for a
                                                            specified period, typically 96 hours, and are subject to
                                                            conditions such as valid travel documents and onward
                                                            tickets.
                                                        </li>
                                                        <li>
                                                            Residence permits: Foreigners may obtain residence
                                                            permits, which are issued, renewed, or canceled
                                                            according to the executive regulations of the law.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="about-btn-two mt-lg-5 mt-3">
                                    <button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue findlawyermargin">
                                        <span className="text-white findlawyertext">
                                            <Link
                                                href={'/auth/create-profile/?role=lawyer'}
                                                style={{ color: 'white' }}>
                                                Find a Lawyer
                                            </Link>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
