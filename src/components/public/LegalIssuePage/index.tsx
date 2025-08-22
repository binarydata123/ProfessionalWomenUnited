'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { getAllServices } from '../../../../lib/frontendapi';
import FormTextarea from '@/commonUI/FormTextArea';
import { useRouter } from 'next/navigation';

export default function LegalIssuePage() {
    const [legalIssue, setlegalIssue] = useState('');
    const [legalIssueService, setlegalIssueService] = useState('');
    const [legalIssueEdit, setlegalIssueEdit] = useState(true);
    const [services, setservices]: any = useState([]);
    const [errors, seterrors]: any = useState({
        service: '',
        issue: ''
    });
    const router = useRouter();

    useEffect(() => {
        handleServices();
        handleLegalIssue();
    }, []);

    const handleLegalIssue = (e: any = null) => {
        const issue = window.sessionStorage.getItem('legal_issue');
        if (issue) {
            setlegalIssue(issue);
        }
    };

    const handleServices = () => {
        getAllServices().then(res => {
            setservices(res.data);
        });
    };

    const handleSubmit = () => {
        if (!legalIssue) {
            seterrors({ issue: 'Please describe your issue!' });
            return;
        }
        if (!legalIssueService) {
            seterrors({ service: 'Service is required.' });
            return;
        }
        window.sessionStorage.setItem('legal_issue', legalIssue);

        if (legalIssueService) {
            router.push('/legal-issue/' + legalIssueService);
        }
        // router.push('/legal-issue/' + legalIssueService);

    };


    return (
        <>
            {legalIssueService}
            <div className="main-section">
                <div className="container">
                    <div className="row py-lg-5">
                        <div className="col-lg-6">
                            <div className="needlawyer-text">
                                <h1 className="text-start">
                                    <span className="span-legal-issue"> Please let us know more </span> to help you
                                    better!
                                </h1>
                                <FormTextarea
                                    className="form-control"
                                    aria-label="With textarea"
                                    rows={6}
                                    label={
                                        <div className="d-flex justify-content-between align-items-center">
                                            Your professional issue
                                            <div>
                                                <p
                                                    className="mb-1 cursor-pointer float-end"
                                                // onClick={() => setlegalIssueEdit(!legalIssueEdit)}
                                                >
                                                    {/* <img src="/images/Home/edit-2.png" alt="Edit" /> Edit */}
                                                </p>
                                            </div>
                                        </div>
                                    }
                                    disabled={!legalIssueEdit}
                                    error={errors.issue}
                                    onChange={e => setlegalIssue(e.target.value)}
                                    placeholder="Describe your professional issue..."
                                    value={legalIssue}
                                    maxLength={500}
                                />
                            </div>
                            <div className="pt-3" id="edit-connect">
                                <h5 className="pb-lg-3 pt-3 pt-lg-0">What is your professional issue about?</h5>
                                <div>
                                    <div className="dropdown" style={{ width: '250px' }}>
                                        <button
                                            className="dropdown-toggle"
                                            type="button"
                                            id="dropdownMenuButton1"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <span
                                                className={`dropdown-toggle ${legalIssueService !== '' ? 'text-dark' : ''
                                                    }`}
                                            >
                                                {legalIssueService || 'Choose an issue'}
                                            </span>
                                        </button>
                                        <Image
                                            src="/images/legal-service/Vector.png"
                                            alt="Vector-image"
                                            width={20}
                                            height={20}
                                        />
                                        <p className="text-danger text-start">{errors.service}</p>
                                        <ul className="dropdown-menu shadow-lg" aria-labelledby="dropdownMenuButton1">
                                            {services &&
                                                services.map((service: any, index: number) => (
                                                    <li
                                                        className={`p-2 ${legalIssueService !== '' ? 'text-dark' : ''}`}
                                                        onClick={() => setlegalIssueService(service.name)}
                                                    >
                                                        {service.name}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="text-area">
                                <p>By clicking "Continue" I affirm that I have read and agree to the Q&A Disclaimer.</p>
                                <button
                                    onClick={handleSubmit}
                                    className="w-100 btn-commn btn-get-free  d-flex align-items-center justify-content-center gap-2"
                                    style={{ color: 'white' }}
                                >
                                    <span className="text-white">Continue</span>
                                    <span className="border border-radius-1 banner-arrow-btn">
                                        <ChevronRightIcon width={20} color={'#fff'} />
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-6 d-none d-lg-block">
                            <div className="please-let-me">
                                <img src="/images/Home/let-me.png" alt="By clicking Continue" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}