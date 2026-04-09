import React from 'react';
import Script from 'next/script';
import ToastrContainer from '@/commonUI/ToastrContainer';
import BootstrapJS from '@/commonUI/BootstrapJS';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import './varible.css';
import './rtl.css';
import { AuthContextProvider } from '@/context/AuthContext';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { GoogleAnalytics } from '@next/third-parties/google'
<<<<<<< HEAD

=======
>>>>>>> 6e077dd849754ceeef3a084973caea184d52382c


export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string }; }) {
	const messages = await getMessages();
	const gaKey = process.env.NEXT_PUBLIC_GOOGLE_ANALYTIC_KEY || "";
<<<<<<< HEAD

=======
>>>>>>> 6e077dd849754ceeef3a084973caea184d52382c
	return (
		<html lang={locale} dir={locale === 'ar' ? 'rtl' : ''}>
			<head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
				/>

				<link rel="icon" href="/favicon.ico" />
				<link
					href="https://fonts.googleapis.com/css2?family=Epilogue:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700&family=Manrope:wght@400;500;600;700;800&display=swap"
					rel="stylesheet"
				/>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
				/>
				<link href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css" rel="stylesheet" />

				<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<<<<<<< HEAD
				<Script
					id="google-analytics"
					strategy="afterInteractive"
					src="https://www.googletagmanager.com/gtag/js?id=G-QYGKTVG6NQ"
				/>
			
			</head>
			<GoogleAnalytics gaId={gaKey} />

=======
			</head>
			<GoogleAnalytics gaId={gaKey} />
>>>>>>> 6e077dd849754ceeef3a084973caea184d52382c
			<body>
				<NextIntlClientProvider messages={messages}>
					<div className="toastr-container">
						<BootstrapJS />
						<ToastrContainer />
					</div>
					<AuthContextProvider locale={locale}>
						<div className={locale}>
							{children}
						</div>
					</AuthContextProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}




