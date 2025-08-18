import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

export default function BenfitSection() {
    return (
        <section className="howBenefitsLawyer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 order-lg-0 order-last mt-lg-0 mt-5 benefit-margin-top margin-botm">
                        <Image src="/images/car/Benefits-pic.jpg" alt="Benefits-pic" width={512} height={720} />
                    </div>
                    <div className="col-lg-7 needlawyer-text-motor">
                        <div className="titleHow">
                            <h6 className="text-start">BENEFITS</h6>
                            <h2 className="text-black-add-fig Discover-lawyer discover-text-fun">
                                How lawyers can assist in
                                <span className="green-medium-2"> Immigration</span>-related legal matters?
                            </h2>
                            <div className="mt-4">
                                <Link href={'/find-a-lawyer'}>
                                    <button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 set-law-btn-2">
                                        <span className="text-white"> Find a Lawyer </span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="row mt-5 benefit-margin" style={{ marginBottom: '65px' }}>
                            <div className="col-lg-12">
                                <div className="titleHow pt-lg-0">
                                    <div className=" pt-4">
                                        <h4 className="text-start weight-bold" style={{ color: '#093F38' }}>
                                            Navigating Visa Applications and Renewals
                                        </h4>
                                    </div>
                                    <div className="text-start Discover-lawyer" />
                                    An immigration lawyer can assist clients with the complex process of applying
                                    for visas and renewing them. They ensure that all required documentation is
                                    completed accurately and submitted on time, minimizing the risk of delays or
                                    denials.
                                    <br /> Immigration lawyers can help clients understand the requirements for
                                    various visa types and guide them through the application process. This includes
                                    student visas, work visas, family-based visas, and more. With their expertise,
                                    immigration lawyers increase the chances of a successful application and smooth
                                    visa approval.
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="titleHow pt-lg-0">
                                    <div className=" pt-4">
                                        <h4 className="text-start weight-bold" style={{ color: '#093F38' }}>
                                            Handling Work Permits and Employment Visas
                                        </h4>
                                    </div>
                                    <div className="text-start Discover-lawyer" />
                                    Immigration lawyers provide vital support to individuals seeking work permits
                                    and employment visas. They help clients understand the specific requirements for
                                    working in a foreign country, such as meeting job qualifications and obtaining
                                    the necessary permits.
                                    <br />
                                    Immigration attorneys can also assist employers in ensuring compliance with
                                    immigration laws when hiring foreign workers. By collaborating with an
                                    immigration lawyer, both employees and employers can confidently navigate the
                                    legal complexities of the employment visa process.
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="titleHow pt-lg-0">
                                    <div className=" pt-4">
                                        <h4 className="text-start weight-bold" style={{ color: '#093F38' }}>
                                            Managing Citizenship and Naturalization Applications
                                        </h4>
                                    </div>
                                    <div className="text-start Discover-lawyer" />
                                    An immigration lawyer can be instrumental in guiding clients through the process
                                    of applying for citizenship and naturalization. These processes can be lengthy
                                    and require meticulous attention to detail. Immigration lawyers help clients
                                    understand the eligibility criteria, gather the necessary documentation, and
                                    prepare for interviews and examinations. <br />
                                    By working with an immigration lawyer, clients can ensure that their application
                                    is complete and accurately represents their qualifications, increasing their
                                    chances of successfully becoming citizens.
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="titleHow pt-lg-0">
                                    <div className=" pt-4">
                                        <h4 className="text-start weight-bold" style={{ color: '#093F38' }}>
                                            Providing Legal Support for Appeals and Reconsiderations
                                        </h4>
                                    </div>
                                    <div className="text-start Discover-lawyer" />
                                    When facing denials or complications in immigration cases, an immigration lawyer
                                    can provide crucial support. They guide clients through the appeals and
                                    reconsideration process, helping them understand their rights and options.
                                    Immigration lawyers can review the reasons for denial and identify potential
                                    solutions to address any issues.
                                    <br /> By representing clients in appeals or reconsiderations, immigration
                                    lawyers strive to secure positive outcomes, such as reversals of denial or
                                    approval of previously denied applications. Their expertise ensures that clients
                                    have the best chance of achieving their desired immigration status.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
