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



export default async function RootLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string }; }) {
	const messages = await getMessages();
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
				<Script
					id="google-analytics"
					strategy="afterInteractive"
					src="https://www.googletagmanager.com/gtag/js?id=G-QYGKTVG6NQ"
				/>
				<Script id="tag_manager" strategy="afterInteractive">
					{`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-QYGKTVG6NQ');
          `}
				</Script>
				<Script id="ldfdr" strategy="afterInteractive">
					{`
            (function(ss,ex){
              window.ldfdr=window.ldfdr||function(){(ldfdr._q=ldfdr._q||[]).push([].slice.call(arguments));};
              (function(d,s){
                fs=d.getElementsByTagName(s)[0];
                function ce(src){
                  var cs=d.createElement(s);
                  cs.src=src;
                  cs.async=1;
                  fs.parentNode.insertBefore(cs,fs);
                };
                ce('https://sc.lfeeder.com/lftracker_v1_'+ss+(ex?'_'+ex:'')+'.js');
              })(document,'script');
            })('p1e024BzvjZ4GB6d');
          `}
				</Script>
			</head>
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




