import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

export default function HireSection() {
    return (
        <section className="questions-part">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 text-right order-lg-0 order-last">
                        <div className="still" id="accordianSectionGreen">
                            <h3 className="font-smaller weight-bold text-black-add-fig">
                                Why Should I Hire a <br />{' '}
                                <span className="green-medium-2">
                                    Immigration Lawyer <br />{' '}
                                </span>{' '}
                                from Professional Women United?
                            </h3>
                            <div className="accordion mt-4" id="setbotomspace">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingEight">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseEight"
                                            aria-expanded="true"
                                            aria-controls="collapseEight">
                                            In-Depth Knowledge of Immigration Laws
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseEight"
                                        className="accordion-collapse collapse show"
                                        aria-labelledby="headingEight"
                                        data-bs-parent="#accordionExample">
                                        <div className="accordion-body border-0">
                                            Professional Women United's immigration lawyers possess extensive knowledge of
                                            immigration laws and procedures. They’ll help you find the best
                                            immigration lawyers in Dubai who will help you navigate through the
                                            ever-changing regulations and legal precedents to provide the most
                                            current advice and representation. Their years-long expertise is crucial
                                            in ensuring that your immigration applications and processes meet all
                                            legal requirements, maximizing your chances of success.
                                            <br /> The immigration lawyers in our network are skilled in addressing
                                            various types of immigration issues, from visas and work permits to
                                            citizenship applications. You’ll receive tailored strategies based on
                                            their specific needs and circumstances, ensuring a personalized and
                                            comprehensive approach to their immigration matters.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingNine">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseNine"
                                            aria-expanded="false"
                                            aria-controls="collapseNine">
                                            Proven Success in Complex Cases
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseNine"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingNine"
                                        data-bs-parent="#accordionExample">
                                        <div className="accordion-body border-0">
                                            If you’re looking for an “immigration lawyer near me” with a proven
                                            record of winning cases, you’re in the right place. Be it navigating
                                            difficult visa applications, resolving deportation disputes, or
                                            assisting with asylum claims, our network of experts brings a wealth of
                                            experience and expertise to the table. Clients rely on them for our
                                            ability to secure favorable outcomes in even the most challenging
                                            scenarios. Their thorough understanding of immigration law, combined
                                            with strategic problem-solving skills, demonstrates their commitment to
                                            delivering excellent results for clients, even in the face of
                                            complicated legal challenges.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTen">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTen"
                                            aria-expanded="false"
                                            aria-controls="collapseTen">
                                            Efficient and Effective Solutions
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseTen"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingTen"
                                        data-bs-parent="#accordionExample">
                                        <div className="accordion-body border-0">
                                            The immigration lawyers on Professional Women United prioritize providing efficient
                                            and effective solutions for your immigration needs. Streamlining
                                            processes and minimizing unnecessary delays saves you valuable time and
                                            reduces stress. Their approach focuses on achieving the best possible
                                            outcome quickly and with minimal hassle.
                                            <br /> Clients can trust them to navigate complex legal landscapes,
                                            including bureaucratic red tape, to ensure a smooth and successful
                                            immigration journey. The attorneys in our network strive to provide
                                            clear guidance and support, allowing you to focus on your personal or
                                            business goals without being weighed down by legal concerns.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingEleven">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseEleven"
                                            aria-expanded="false"
                                            aria-controls="collapseEleven">
                                            Personalized Attention and Support
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseEleven"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingEleven"
                                        data-bs-parent="#accordionExample">
                                        <div className="accordion-body border-0">
                                            Professional Women United offers personalized attention and support to every client,
                                            understanding that each individual's situation and goals are unique. Our
                                            immigration lawyers take the time to listen to your story and assess
                                            your specific needs, providing customized advice and representation.
                                            <br />
                                            This tailored approach ensures you receive the most suitable legal
                                            strategies for your case. Our network of attorneys is known for its
                                            approachable and compassionate manner, making clients feel comfortable
                                            and supported throughout the immigration process. With a dedicated
                                            advocate by your side, you can trust that your interests will be
                                            prioritized every step of the way.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTweleve">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTweleve"
                                            aria-expanded="false"
                                            aria-controls="collapseTweleve">
                                            Strong Communication and Guidance
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseTweleve"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingTweleve"
                                        data-bs-parent="#accordionExample">
                                        <div className="accordion-body border-0">
                                            Immigration lawyers excel in strong communication and guidance, ensuring
                                            you stay informed throughout your immigration journey. They take the
                                            time to explain complex legal concepts in clear and concise terms,
                                            allowing you to make informed decisions about your case.
                                            <br /> Our attorneys are responsive to your questions and concerns,
                                            offering timely and accurate advice to guide you through the process.
                                            They understand that clear communication is key to building trust and
                                            confidence, and their commitment to keeping you updated at every stage
                                            sets us apart as a reliable and supportive legal partner.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThirteen">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThirteen"
                                            aria-expanded="false"
                                            aria-controls="collapseThirteen">
                                            Expertise in U.S. Immigration Law
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseThirteen"
                                        className="accordion-collapse collapse"
                                        aria-labelledby="headingThirteen"
                                        data-bs-parent="#accordionExample">
                                        <div className="accordion-body border-0">
                                            US immigration lawyers in Dubai specialize in providing services
                                            tailored for US citizens navigating the complexities of immigration
                                            processes. The US immigration lawyers in our network are well-versed in
                                            the intricacies of US immigration law and can assist you with various
                                            issues, such as visa applications, green card processes, and citizenship
                                            applications. <br />
                                            Clients benefit from attorneys’ expertise in US immigration law,
                                            ensuring that all procedures are handled accurately and efficiently.
                                            With their personalized guidance and support, they help US citizens
                                            achieve their immigration goals seamlessly and in compliance with legal
                                            standards
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="about-btn-two mt-lg-5 mt-3">
                                <button className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 w-100-percentue half-button">
                                    <span className="text-white set-lawyer-icon">
                                        <Link href="/find-a-professional" style={{ color: 'white' }}>
                                            Find A Professional
                                        </Link>{' '}
                                        <span className="border-btn-lawyer">
                                            <ChevronRightIcon width={20} color={'#fff'} />
                                        </span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 mb-lg-0 mb-4">
                        <Image src="/images/car/Group2944.png" alt=" Still have questions?" width={516} height={549} />
                    </div>
                </div>
            </div>
        </section>
    )
}
