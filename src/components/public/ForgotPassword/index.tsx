'use client';
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { forgetPassword } from '../../../../lib/frontendapi';
import { isEmail } from '../../../utils/validation';
import FormInput from '@/commonUI/FormInput';
import { ArrowSmallLeftIcon } from '@heroicons/react/20/solid';


interface FormData {
    email: string;
}

export default function ForgotPassword() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        email: ''
    });
    const [errors, setErrors] = useState<any>({});

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const validationErrors = isEmail(formData.email);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        } else {
            setErrors({});
        }

        setIsLoading(true);
        const data = {
            email: formData.email
        };
        forgetPassword(data)
            .then(res => {
                setIsLoading(false);
                if (res.success === true) {
                    toast.success(res.msg);
                    router.push('/auth/login');
                } else {
                    toast.error(res.msg);
                }
            })
            .catch(err => {
                setIsLoading(false);
            });
    }

    return (
        <>
            <div className="auth-page-wrapper">
                <div className="row">
                    <div className="">
                        <div className="main-login">
                            <Link href="/auth/login" className="backtobtn mb-3">
                                <ArrowSmallLeftIcon width={20} />
                                Back
                            </Link>
                            <h1>
                                <span>Forgot</span> Password?
                            </h1>
                            <p className="p-text-label">Let’s get you connected.</p>
                            <form className="" id="paymentform" onSubmit={handleSubmit}>
                                <FormInput
                                    type="email"
                                    placeholder="user@email.com"
                                    value={formData.email}
                                    error={errors.email}
                                    label={'Email*'}
                                    onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-outline-success text-center btn-lawyer mt-3 w-100"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Please wait...' : 'Reset Password'}
                                </button>
                                <p className="f-12 text-right forgot register-page-link">
                                    <Link href="/auth/login" style={{ color: '#c49073' }}>Back to Login</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}