import React from 'react';
import './Upperfooter.css';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function UpperFooter() {
    const t = useTranslations('Index');

    return (
        <>
            <section id="our-blogs" className="pt-1 pb-5">
                <div className="container p-lg-0">
                    <div className="row g-3">
                        <div className="col-md-5">
                            <div className="needlawyer-text blogs position-relative">
                                <h6 className="pt-0 c-3DC9A1">PROFESSIONAL INSIGHTS</h6>
                                <h2 className="text-white">Discover Career Resources and Industry Trends.</h2>
                                <Link
                                    href="/"
                                    className="w-40 align-items-center justify-content-lg-center gap-2 view-blogs"
                                >
                                    <div className="d-flex align-items-center joint">
                                        <span className="c-3DC9A1">Explore Resources</span>
                                        <span className="border-radius-1 banner-arrow-btn border-3DC9A1 color-add">
                                            <ChevronRightIcon width={20} color={'#c49073'} />
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="needlawyer-text blogs position-relative" id="bg-are-you">
                                <h6 className="pt-0 c-093F38 text-white">ARE YOU A PROFESSIONAL WOMAN?</h6>
                                <h2 className="" style={{ color: '#c49073' }}>
                                    Get Recognized and Expand Your Network.
                                </h2>
                                <Link
                                    href="/auth/choose-profile"
                                    className="w-40 align-items-center justify-content-lg-center gap-2 view-blogs"
                                >
                                    <div className="d-flex align-items-center joint">
                                        <span className="" style={{ color: '#fff' }}>
                                            Join Our Directory
                                        </span>
                                        <span
                                            className="border-radius-1 border-093F38 banner-arrow-btn"
                                            style={{ color: '#fff' }}
                                        >
                                            <ChevronRightIcon width={20} color={'#fff'} />
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}