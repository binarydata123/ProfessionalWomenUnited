'use client';
import AuthContext from '@/context/AuthContext';
import { useRouter, usePathname } from '@/navigation';
import { useEffect, useState, useRef, useContext } from 'react';

export default function LanguageChanger({ locale }: any) {
    const { user } = useContext(AuthContext)
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'en', name: 'English', icon: 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/128/Flag_of_United_Kingdom.png' },
        { code: 'ar', name: 'Arabic', icon: 'https://cdn3.iconfinder.com/data/icons/o-shaped-flag-1/128/O_shaped_asian_flag-36-64.png' }
    ];

    const handleChange = (e: any) => {
        const newLocale = e.target.value;
        localStorage.setItem('language', newLocale);
        router.push(pathname, { locale: newLocale });
        setIsOpen(false);
    };

    const handleDropdownToggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const storedLocale = localStorage.getItem('language');
        if (window.history) {
            if (window.history.length === 2) {
                window.localStorage.setItem('language', 'en')
                router.push(pathname, { locale: 'en' });
            } else {
                if ((storedLocale && storedLocale !== locale)) {
                    router.push(pathname, { locale: storedLocale });
                }
            }
        }
    }, [locale]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const setCookie = (locale: any) => {
            document.cookie = `NEXT_LOCALE=${locale};`;
        };
        return () => {
            setCookie('en');
        };
    }, []);


    return (
        // <div className={`${user?.id ? 'switch-lang' : 'withoutlogin'}`} ref={dropdownRef}>
        <div className={`${user?.id ? 'switch-lang' : 'withoutlogin'} ${locale ? `${locale} locale-class` : ''}`} ref={dropdownRef}>
            {/* <div className={`${locale} current-lang`} onClick={handleDropdownToggle}> */}
            <div className={`${!user?.id ? `${locale} current-lang` : 'current-lang-set font-padd'}`} onClick={handleDropdownToggle} style={{ cursor: 'pointer' }}>
                <img src={languages.find(lang => lang.code === locale)?.icon} className="lang-flag" />
                <p className="lang-text d-block d-xl-none lnguaue-style">{languages.find(lang => lang.code === locale)?.name}</p>
            </div>
            {isOpen && (
                <div className="lang-dropdown">
                    {languages.map((lang) => (
                        <div className="selecting-lang" key={lang.code} onClick={() => handleChange({ target: { value: lang.code } })}>
                            <img src={lang.icon} className="lang-flag" />
                            <p className="lang-text">{lang.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
