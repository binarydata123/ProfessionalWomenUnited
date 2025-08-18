import React from 'react';
import './style.css';
import Link from 'next/link';
import { capitalizeFirstLetterOfEachWord } from '@/app/[locale]/commonfunctions/commonfunctions';

interface BenefitsItem {
    id: number;
    service_id: number;
    benefit_one_title: string;
    benefit_one_desc: string;
    benefit_two_title: string;
    benefit_two_desc: string;
    benefit_three_title: string;
    benefit_three_desc: string;
    benefit_four_title: string;
    benefit_four_desc: string;
    status: string;
    created_by: number;
    created_at: string;
    updated_by: number | null;
    updated_at: string | null;
    deleted_by: number | null;
    deleted_at: string | null;
}

interface GotBenefitsProps {
    data: BenefitsItem[];
}

export default function HowBenefitsLawyer({ data }: GotBenefitsProps) {
    const firstItem = data[0];
    const benefits = [
        {
            title: `${firstItem?.benefit_one_title}`,
            text: `${firstItem?.benefit_one_desc}`,
        },
        {
            title: `${firstItem?.benefit_two_title}`,
            text: `${firstItem?.benefit_two_desc}`,
        },
        {
            title: `${firstItem?.benefit_three_title}`,
            text: `${firstItem?.benefit_three_desc}`,
        },
        {
            title: `${firstItem?.benefit_four_title}`,
            text: `${firstItem?.benefit_four_desc}`,
        },
    ];
    return (
        <>
            <section className='howBenefitsLawyer'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="titleHow">
                                <div className="needlawyer-text">
                                    <h6 className="text-start">BENEFITS</h6>
                                    <h2 className="text-start Discover-lawyer">
                                        How lawyers can assist in <span className="">banking-related</span> legal matters?
                                    </h2>
                                </div>
                                <Link href={'/find-a-lawyer'}>
                                    <button className="w-40 btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2">
                                        <span className="text-white"> Find a Lawyer </span>
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                {benefits.map((benefit, index) => (
                                    <div className="col-lg-6" key={index}>
                                        <div className="titleHow pt-lg-0">
                                            <div className="needlawyer-text pt-4">
                                                <h4 className="text-start">{capitalizeFirstLetterOfEachWord(benefit.title)}</h4>
                                            </div>
                                            <div className="text-start Discover-lawyer" dangerouslySetInnerHTML={{ __html: benefit.text }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
