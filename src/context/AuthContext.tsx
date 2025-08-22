'use client'
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { usePathname, useRouter } from 'next/navigation';
import Providers from '@/components/Providers';
import Footer from '@/components/public/Footer';
import Header from '@/components/public/Header';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL
});

interface AuthContextDefaults {
    user?: any;
    setUser: (user: any) => void;
    logout: () => Promise<void>;
    login: (email: string, password: string) => Promise<string>;
    locale: string | undefined
}

interface AuthContextProp {
    children?: React.ReactNode;
    locale?: string;
}

const AuthContext = createContext<AuthContextDefaults>({
    logout: () => Promise.resolve(),
    login: () => Promise.resolve(''),
    setUser: () => { },
    locale: ''
});

const AuthContextProvider = ({ children, locale }: AuthContextProp) => {
    const [user, setUser] = useState<any | undefined>();
    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        const token = Cookies.get("session_token")

        if (token) {
            const cancelTokenSource = axios.CancelToken.source();
            const config = {
                cancelToken: cancelTokenSource.token,
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
                params: {
                    token: token
                }
            };

            axios
                .get(`${process.env.NEXT_PUBLIC_API_URL}/authentication/session`, config)
                .then((response) => {
                    const data = response.data;
                    if (data.status == true) {
                        if (data.user.signupComplete === false && data.user.role === 'professional') {
                            router.push('/auth/professional/step-2')
                        }
                        if (data.user.role === 'enduser' && data.user.otp) {
                            router.push('/auth/two-factor-authentication')
                        }
                        if (data.user.status != 'deactive' || pathname.includes('/auth/'))
                            setUser(data.user);
                    } else {
                        Cookies.remove('session_token');
                        window.sessionStorage.removeItem('token')
                        toast.error(data.message)
                    }
                })
                .catch((error) => {
                    if (axios.isCancel(error)) {
                        console.log("Request canceled:", error.message);
                    } else {
                        console.log("Error:", error);
                    }
                });

            // Return a cleanup function to cancel the request on component unmount
            return () => {
                cancelTokenSource.cancel("Request canceled due to component unmount");
            };
        } else {
            setUser(undefined);
            if (pathname.includes('/admin/') || pathname.includes('/professional/') || pathname.includes('/user/')) {
                toast.error('You are not logged in or your session has expired. Please log in again to access this page.');
                router.push('/auth/login');
            }
        }
    }, []);


    const login = async (email: string, password: string) => {
        const response = await api.post('/login', { email, password });
        if (response.data.status == false) {
            toast.error(response.data.message)
        }

        if (response.data.status == true) {
            const { token, user } = response.data.data;
            axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            Cookies.set('email', email);
            window.sessionStorage.setItem('email', email)
            setUser(user);
            if (user?.two_factor_auth == "yes") {
                toast.success('User logged in successfully. Two-factor authentication code has been sent to your email.')
            }
            return response.data.data;
        }
    };

    const logout = async (): Promise<void> => {
        const token = Cookies.get("session_token")
        const res = await api.post('/authentication/logout', { token: token });
        if (res.data.status == true) {
            setUser(undefined);
            Cookies.remove('session_token');
            window.sessionStorage.removeItem('token')
            toast.success(res.data.message)
            router.push('/auth/login')
        } else {
            toast.error(res.data.message)
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                logout,
                setUser,
                login,
                locale
            }}
        >
            <div className={`main-wrapper main-container ${pathname.includes('/auth') ? 'bg-back color' : ''}`}>
                <div className="header-container">
                    {pathname.includes('/auth/') ||
                        pathname.includes('/admin') ||
                        pathname.includes('/professional/') ||
                        pathname.includes('/user') ? null : (
                        <Header locale={locale} />
                    )}
                </div>
                <div className="childrenPadd">
                    <Providers>{children}</Providers>
                </div>
                <div className="footer-container footerpos">
                    {pathname.includes('/auth/') ||
                        pathname.includes('/admin') ||
                        pathname.includes('/professional/') ||
                        pathname.includes('/user') ? null : (
                        <Footer />
                    )}
                </div>
            </div>
        </AuthContext.Provider>
    );
};

export { AuthContextProvider };
export default AuthContext;
