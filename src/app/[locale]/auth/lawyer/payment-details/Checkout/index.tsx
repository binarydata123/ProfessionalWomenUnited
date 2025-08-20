'use client';
import React, { useContext } from 'react';
import { useState, useEffect } from 'react'; // Import useState
import { useRouter } from 'next/navigation';
import { savePlanPayment } from '../../../../../../../lib/lawyerapi';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import AuthContext from '@/context/AuthContext';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import './style.css';
import { ArrowSmallLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

interface FormData {
    CardNumber: string;
    CardExpiredMonth: string;
    CardExpiredYear: string;
    CardCvv: string;
}
export default function Checkout() {
    const { user } = useContext(AuthContext)
    const router = useRouter();
    const [plan_type, setPlanType] = useState('');
    const [plan_amount, setPlanAmount] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [user_id, setUserId] = useState('');
    const [user_name, setUserName] = useState('');
    const [user_email, setUserEmail] = useState('');
    const [formData, setFormData] = useState<FormData>({
        CardNumber: '',
        CardExpiredMonth: '',
        CardExpiredYear: '',
        CardCvv: ''
    });

    // Use Stripe Elements hooks
    const stripe = useStripe();
    const elements: any = useElements();

    useEffect(() => {
        if (user) {
            const temp_plan_type = window.sessionStorage.getItem('temp_plan_type');
            const temp_plan_amount = window.sessionStorage.getItem('temp_plan_amount');

            if (user) {
                if (user?.id == null || user?.role == 'enduser' || temp_plan_type == null || temp_plan_amount == null) {
                    router.push('/auth/login');
                } else {
                    setPlanType(temp_plan_type);
                    setPlanAmount(temp_plan_amount);
                    setUserId(user?.id);
                    setUserEmail(user?.email || '');
                    setUserName(user?.name || '');
                }
            }
        }
    }, [user]);


    function SubmitPaymentForm(event: any) {
        event.preventDefault();
        setIsLoading(true);

        if (!stripe || !elements) {
            setIsLoading(false);
            return;
        }
        stripe.createToken(elements.getElement(CardElement)).then(result => {
            if (result.error) {
                toast.error(result.error.message);
                setIsLoading(false);
            } else {
                const token = result.token.id;
                const data = {
                    user_id: user_id,
                    user_name: user_name,
                    user_email: user_email,
                    amount: plan_amount,
                    plan_type: plan_type,
                    token: token // Include token in the data
                };
                savePlanPayment(data)
                    .then(res => {
                        if (res.status == true) {
                            if (plan_type == 'monthly') {
                                Swal.fire({
                                    icon: 'success',
                                    title: '<strong>Thank You</strong>',
                                    text:
                                        // 'Your 1 month free trial plan has been activated after that amount ' +
                                        'Your 1 month plan has been activated after that amount ' +
                                        plan_amount +
                                        ' AED will be charge monthly',
                                    showConfirmButton: true,
                                    confirmButtonColor: '#c49073'
                                }).then(function () {
                                    window.sessionStorage.setItem('payment_status', 'paid');
                                    router.push('/auth/lawyer/verify-otp');
                                });
                            } else {
                                Swal.fire({
                                    icon: 'success',
                                    title: '<strong>Thank You</strong>',
                                    text:
                                        'Your payment of amount ' +
                                        plan_amount +
                                        ' AED for yearly plan has been succesfuly done',
                                    showConfirmButton: true,
                                    confirmButtonColor: '#c49073'
                                }).then(function () {
                                    window.sessionStorage.setItem('payment_status', 'paid');
                                    router.push('/auth/lawyer/verify-otp');
                                });
                            }
                        } else {
                            toast.error(res.message);
                            setIsLoading(false);
                        }
                    })
                    .catch(err => {
                        const errorMessage = err.response.data.message;
                        toast.error(errorMessage);
                        setIsLoading(false);
                    });
            }
        });
    }
    return (

        <form onSubmit={SubmitPaymentForm}>
            <div className="col-md-12 mt-3">
                <label htmlFor="">Card Number*</label>
            </div>
            <div className="card-element-container mt-1">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                                backgroundColor: '#fff',
                                padding: '17px 16px 17px 20px',

                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                        hidePostalCode: true,
                    }}
                />
            </div>
            <div className="btn-plan">
                <button
                    type="submit"
                    className="btn-get-free btn-commn bg-change d-flex gap-2 justify-content-lg-0 justify-content-center w-100"
                    disabled={isLoading}
                >
                    {!isLoading ? (
                        <span className="">
                            {/* {plan_type == 'monthly'
                                ? 'Start 1 Month Free Trial.'
                                : `Pay ${Number(plan_amount)} AED`}{' '} */}
                            {
                                plan_type === 'monthly'
                                    ? `Pay ${Number(plan_amount)} AED`
                                    : `Pay ${Number(plan_amount)} AED`}{' '}
                        </span>
                    ) : (
                        <span className="">Processing.. </span>
                    )}
                    <span className="border-radius-1 banner-arrow-btn">
                        <ChevronRightIcon width={20} color={'#fff'} />
                    </span>
                </button>
            </div>
        </form>
    )
}
