import React from 'react'
import Image from 'next/image';

export default function Faq() {
    return (
        <section className="gotQuestions">
            <section className="">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-xl-7 col-md-12">
                            <div className="gotTitle">
                                <p className="font-x-small green-medium-2 weight-bold mb-2">FAQs</p>
                                <h2 className="font-smaller  weight-bold mb-4">
                                    Got Questions? <br />
                                    <span className="green-medium-2"> We have answers.</span>
                                </h2>
                            </div>
                            <div className="gotAccordion" id="accordionExamplelegalquestion">
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
                                                What documents are required for a visa application in the UAE?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseOne"
                                            className="accordion-collapse collapse show"
                                            aria-labelledby="headingOne"
                                            data-bs-parent="#accordionExample">
                                            <div className="accordion-body border-0 text-white">
                                                The requirements vary depending on the type of visa but typically
                                                include a valid passport, a completed application form,
                                                passport-sized photos, and supporting documents such as proof of
                                                employment, health insurance, and accommodation. Consulting an
                                                immigration lawyer can help guarantee that you have the necessary
                                                documents.
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
                                                How long does it take to process a visa application in the UAE?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseTwo1"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingTwo1"
                                            data-bs-parent="#accordionExample">
                                            <div className="accordion-body border-0 text-white">
                                                Processing times vary depending on the visa type and individual
                                                circumstances. It can take anywhere from a few days to several
                                                weeks. An immigration lawyer can provide guidance on expected
                                                timelines and help speed up the process where possible.
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
                                                What should I do if my visa application is denied?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseThree"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingThree"
                                            data-bs-parent="#accordionExample">
                                            <div className="accordion-body border-0 text-white">
                                                If your visa application is denied, you may be able to appeal the
                                                decision or reapply after addressing the reasons for denial. An
                                                immigration lawyer can assist you in understanding the reason for
                                                the denial and advise you on the best course of action.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingFour">
                                            <button
                                                className="accordion-button text-white"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFour"
                                                aria-expanded="true"
                                                aria-controls="collapseFour">
                                                What are the residency visa requirements in the UAE?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseFour"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingFour"
                                            data-bs-parent="#accordionExample">
                                            <div className="accordion-body border-0 text-white">
                                                Residency visa requirements include having a sponsor such as an
                                                employer or family member, passing a medical examination, and
                                                meeting financial or employment criteria. An immigration lawyer can
                                                help you understand the specific requirements of your situation.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingFive">
                                            <button
                                                className="accordion-button text-white"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseFive"
                                                aria-expanded="true"
                                                aria-controls="collapseFive">
                                                Can I work in the UAE on a visit visa?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseFive"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingFive"
                                            data-bs-parent="#accordionExample">
                                            <div className="accordion-body border-0 text-white">
                                                No, you cannot legally work in the UAE on a visit visa. You must
                                                obtain a work visa if you want to work in the UAE. An immigration
                                                lawyer can guide you through the application process and ensure you
                                                meet all legal requirements.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingSix">
                                            <button
                                                className="accordion-button text-white"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target="#collapseSix"
                                                aria-expanded="true"
                                                aria-controls="collapseSix">
                                                How can an immigration lawyer assist with visa and residency
                                                applications?
                                            </button>
                                        </h2>
                                        <div
                                            id="collapseSix"
                                            className="accordion-collapse collapse"
                                            aria-labelledby="headingSix"
                                            data-bs-parent="#accordionExample">
                                            <div className="accordion-body border-0 text-white">
                                                An immigration lawyer can provide expert advice on the visa and
                                                residency application process, help prepare and review
                                                documentation, assist with appeals, and ensure compliance with UAE
                                                immigration laws. This can increase your chances of a successful
                                                application.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12 col-xl-5 col-md-12">
                            <Image src="/images/layer.png" alt="faq-img" className="mt-5 m-none effect" width={516} height={549} />
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}
