'use client';
import React, { useContext } from 'react';
import { ArrowSmallLeftIcon } from '@heroicons/react/20/solid';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAllMemberShipPlan } from '../../../../lib/frontendapi';
import Link from 'next/link';
import Image from 'next/image';
import AuthContext from '@/context/AuthContext';
import './style.css';

interface MembershipPlan {
    id: number;
    name: string;
    description: string;
    monthly_amount: string;
    quarterly_amount: string;
    yearly_amount: string;
    monthly_desc: string;
    quarterly_desc: string;
    // ... other properties ...
}

export default function LawyerChoosePlan() {
    const router = useRouter();
    const { user } = useContext(AuthContext)
    const [isMonthly, setIsMonthly] = useState('monthly');
    const [membershipPlan, setMembershipPlan] = useState<MembershipPlan | null>(null);
    const [selectedPlan, setSelectedPlan] = useState('individuals');

    const handlePlanSelection = (plan: string) => {
        setSelectedPlan(plan === selectedPlan ? '' : plan);
    };


    useEffect(() => {
        getAllMemberShipPlanData();
        if (user) {
            if (user?.id && user?.role == 'lawyer') {
                getAllMemberShipPlanData();
            }
            else {
                router.push('/auth/login');
            }
        }
    }, []);

    const getAllMemberShipPlanData = async () => {
        try {
            const res = await getAllMemberShipPlan();
            if (res.status == true) {
                setMembershipPlan(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handlePriceSet = () => {
        if (user) {
            let tempPlanAmount;

            if (isMonthly === 'monthly') {
                tempPlanAmount = membershipPlan?.monthly_amount;
            } else {
                tempPlanAmount = membershipPlan?.yearly_amount;
            }

            // Set 'temp_plan_amount' and 'temp_plan_type' in session storage
            window.sessionStorage.setItem('temp_plan_amount', tempPlanAmount || '');
            window.sessionStorage.setItem('temp_plan_type', isMonthly);

            router.push('/auth/professional/payment-details');
        } else {
            router.push('/auth/login');
        }
    };

    const [plan, setPlan] = useState('');

    const handleMonthlyPlanToggle = () => {
        const newPlan = plan === 'yes' ? 'no' : 'yes';
        setPlan(newPlan);
        setIsMonthly(newPlan === 'yes' ? 'yearly' : 'monthly');
    };



    return (
        <>
            <section className="pricing-part-payment">

                <div className="auth-page-wrapper" id="stepTwo">
                    <Link href="/auth/professional/step-2" className="backtobtn">
                        <ArrowSmallLeftIcon width={20} />
                        Back
                    </Link>
                    <div className="row">
                        <div className="col-sm-8">
                            <h1 className="mt-2">
                                <span>Choose a </span> pricing plan
                            </h1>
                            <p className="mb-3 mt-2">
                                Choose a plan that works for you.
                                {/* We also offer FREE 1 month trial to Professional experts on our{' '}
                                <br /> platform. */}
                            </p>
                            {/* <div className="btn-group-893168">
                                <button
                                    className={`weight-semi-bold font-small common_plan mx-2 ${selectedPlan === 'individuals' ? 'active_plan' : 'inactive_plan'}`}
                                    onClick={() => handlePlanSelection('individuals')}
                                >
                                    For Individuals
                                </button>
                                <button
                                    className={`weight-semi-bold font-small common_plan mx-2 ${selectedPlan === 'firms' ? 'active_plan' : 'inactive_plan'}`}
                                    onClick={() => handlePlanSelection('firms')}
                                >
                                    For Firms
                                </button>
                            </div> */}
                        </div>
                    </div>
                    {selectedPlan === 'individuals' && (
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="card-box mt-3">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <Image
                                                src="/favicon.png"
                                                alt="A responsive image"
                                                width={50}
                                                height={50}
                                            />
                                            <h5 className="green-medium-2 weight-semi-bold font-xx-large mt-2">
                                                {/* {isMonthly == 'monthly' ? 'Solo Lawyer Plan' : ' Solo Lawyer Plan'} */}
                                                Solo Plan
                                            </h5>
                                        </div>
                                        <div className="col-sm-6 text-right tab-left">
                                            {isMonthly == 'monthly' ? (
                                                <h6 className="social-link weight-bold f-22 m-top-80">
                                                    USD{' '}
                                                    <span className="text-xx-50">
                                                        {membershipPlan && membershipPlan.monthly_amount}

                                                    </span>
                                                    /month
                                                </h6>
                                            ) : (
                                                <h6 className="social-link weight-bold f-22 m-top-80">
                                                    USD{' '}
                                                    <span className="text-xx-50">
                                                        {membershipPlan && membershipPlan.yearly_amount}

                                                    </span>
                                                    /yearly
                                                </h6>
                                            )}
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6 d-flex'>

                                        </div>
                                        <div className='col-md-6 d-flex'>
                                            <p className="font-small weight-medium social-link mt-2"> MONTHLY
                                            </p>
                                            <div className="switch-btn mt-2">
                                                <label className="switch ">
                                                    <input
                                                        type="checkbox"
                                                        checked={plan === 'yes'}
                                                        onChange={handleMonthlyPlanToggle}

                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                            <p className="font-small weight-medium social-link mt-2" style={{ paddingLeft: '10px' }}> YEARLY
                                            </p>
                                            <p className="font-small weight-medium social-link mt-2 set-flat-offer"> Flat 25% off
                                            </p>
                                        </div>

                                    </div>
                                    <div className="benefits mt-4">
                                        <p className="font-medium weight-semi-bold social-link">Benefits:</p>
                                        {isMonthly == 'monthly' &&
                                            membershipPlan &&
                                            membershipPlan.monthly_desc.split(',').map((desc, index) => (
                                                <p key={index} className="font-small weight-medium social-link mt-3">
                                                    <i className="fa-solid fa-check"></i> {desc.trim()}
                                                </p>
                                            ))}

                                        {isMonthly == 'yearly' &&
                                            membershipPlan &&
                                            membershipPlan.quarterly_desc.split(',').map((desc, index) => (
                                                <p key={index} className="font-small weight-medium social-link mt-3">
                                                    <i className="fa-solid fa-check"></i> {desc.trim()}
                                                </p>
                                            ))}
                                    </div>

                                    <div className="btn-plan mt-4">
                                        <button
                                            className="btn-get-free btn-commn bg-change d-flex gap-2 justify-content-lg-0 justify-content-center w-100"
                                            onClick={handlePriceSet}
                                        >
                                            <span className="">
                                                {' '}
                                                {/* {isMonthly == 'monthly'
                                                    ? ' Start 1 Month Free Trial'
                                                    : `Pay ${membershipPlan && membershipPlan.yearly_amount}`} */}
                                                {user ? (
                                                    isMonthly === 'monthly'
                                                        ? `Pay ${membershipPlan ? membershipPlan.monthly_amount : ''}`
                                                        : `Pay ${membershipPlan ? membershipPlan.yearly_amount : ''}`
                                                ) : (
                                                    <Link href="/auth/login" style={{ color: 'white' }}>
                                                        Login
                                                    </Link>
                                                )}
                                            </span>
                                            <span className="border-radius-1 banner-arrow-btn">
                                                <ChevronRightIcon width={20} color={'#fff'} />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedPlan === 'firms' && (
                        <div className="row">
                            <div className="col-lg-7">
                                <div className="card-box mt-3">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <Image
                                                src="/images/Group_2780.png"
                                                alt="A responsive image"
                                                width={50}
                                                height={50}
                                            />
                                            <h5 className="green-medium-2 weight-semi-bold font-xx-large mt-2">
                                                Firm Focus Plan
                                            </h5>
                                        </div>
                                        <div className="col-sm-6 text-right tab-left">
                                            <div className="social-link weight-bold f-22" style={{ marginTop: '50px' }}>
                                                <h6 className="social-link">
                                                    <span style={{ fontSize: '40px', fontWeight: '700' }}>
                                                        Let's Talk
                                                    </span>
                                                </h6>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="benefits mt-4">
                                        <p className="font-medium weight-semi-bold social-link">Benefits:</p>
                                        {isMonthly == 'monthly' &&
                                            membershipPlan &&
                                            membershipPlan.monthly_desc.split(',').map((desc, index) => (
                                                <p key={index} className="font-small weight-medium social-link mt-3">
                                                    <i className="fa-solid fa-check"></i> {desc.trim()}
                                                </p>
                                            ))}

                                        {isMonthly == 'quarterly' &&
                                            membershipPlan &&
                                            membershipPlan.quarterly_desc.split(',').map((desc, index) => (
                                                <p key={index} className="font-small weight-medium social-link mt-3">
                                                    <i className="fa-solid fa-check"></i> {desc.trim()}
                                                </p>
                                            ))}
                                    </div>

                                    <div className="btn-plan mt-4">
                                        <button
                                            className="btn-get-free btn-commn bg-change d-flex gap-2 justify-content-lg-0 justify-content-center w-100"
                                        >
                                            <span className="">
                                                {' '}
                                                <Link href="/contact-us" style={{ color: 'white' }} target="_blank">
                                                    Contact Sales
                                                </Link>
                                            </span>
                                            <span className="border-radius-1 banner-arrow-btn">
                                                <ChevronRightIcon width={20} color={'#fff'} />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}