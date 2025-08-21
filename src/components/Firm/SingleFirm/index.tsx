'use client';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPinIcon } from '@heroicons/react/20/solid';
import { BsBookmark, BsFillBookmarkFill } from 'react-icons/bs';
import Image from 'next/image';
import './singleFirm.css';
import { getSingleFirmDetails, isFirmSaved, saveFirm, getLawyersOfFirms } from '../../../../lib/frontendapi';
import {
    FacebookShareButton,
    FacebookIcon,
    RedditShareButton,
    RedditIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon
} from 'next-share';
import LawyerProfileLoadingPlaceholder from '@/commonUI/LawyerProfileLoadingPlaceholder';
import AuthContext from '@/context/AuthContext';
import ImageComponent from '@/commonUI/ImageComponent';
import LawyerCard from '@/components/lawyer/LawyerCard';
import { PiLinkSimpleHorizontalBold } from "react-icons/pi";
import UpperFooter from '@/components/public/UpperFooter';

const currentYear = new Date().getFullYear();

interface Props {
    slug?: string;
}

export default function SingleFirm({ slug = '' }: Props) {
    const { user } = useContext(AuthContext)
    const [isSticky, setIsSticky] = useState(false);
    const [bookmark, setbookmark] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const [activeTab, setActiveTab] = useState('about');
    const [share, setshare] = useState(false);
    const toggleShowMore = () => setShowMore(!showMore);
    const [user_Id, setUserId] = useState('');
    const [lawyer_Id, setlawyersId] = useState('');
    const [firm_Id, setFirmId] = useState('');
    const [single_firm, setSingleFirmData] = useState<any>('');
    const [lawyers, setLawyers] = useState([]);

    useEffect(() => {
        handleSingleFirmDetails(slug);
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setIsSticky(true);
            } else {
                setActiveTab('about');
                setIsSticky(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            if (user) {
                setUserId(user?.id);
            }
            const res = await getSingleFirmDetails(slug);
            setFirmId(res.data.id);
            fetchlawyerData(res.data.id);

        };

        const fetchlawyerData = async (firm_id: string) => {
            const data = {
                firmId: firm_id
            };
            const res = await getLawyersOfFirms(data);
            if (res.status === true) {
                setLawyers(res.data);
            } else {
                console.error('Failed to fetch lawyers:', res.error);
            }
        };

        fetchData();
    }, [user_Id]);


    const handleSingleFirmDetails = async (id: any) => {
        try {
            const res = await getSingleFirmDetails(id);
            if (res.status == true) {
                setSingleFirmData(res.data);

                checkFirmSaved(res.data.id, user?.id);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const checkFirmSaved = (firm_id: any, member_id: any) => {
        isFirmSaved({
            memberId: member_id,
            firmId: firm_id
        }).then((res: any) => {
            if (res.data == '1') {
                setbookmark(true);
            } else {
                setbookmark(false);
            }
        });
    };

    const handleSavefirm = (id: any) => {
        saveFirm({
            memberId: user_Id,
            firmId: id
        }).then(res => {
            handleSingleFirmDetails(id);
            if (res.data == 'Saved Firm successfully.') {
                setbookmark(true);
            } else {
                setbookmark(false);
            }
        });
    };
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        setisLoading(false);
    });
    const [showAllLawyers, setShowAllLawyers] = useState(false);
    const imageUrl = single_firm?.image
        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/connect-Legal/Blogs/${single_firm.image}`
        : `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/default/1920x1080.png`;

    return (
        <div>

            <section className="blog-section start blogSection">
                <div className="container">
                    <div className="text-left-line text-start pt-lg-5 mt-2">
                        {isLoading ? (
                            <div
                                style={{
                                    height: '20px',
                                    backgroundColor: 'rgb(249,242,239)',
                                    width: '20%',
                                    marginBottom: '10px'
                                }}
                            ></div>
                        ) : (
                            <ul>
                                <li>
                                    <Link href="/" className="unactive">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <img
                                        src="/images/legal-service/arrow-right.png"
                                        alt="right arrow"
                                        width={15}
                                        height={15}
                                    />
                                </li>
                                <li>
                                    <Link href="/find-a-professional" className="unactive">
                                        Firm
                                    </Link>
                                </li>
                                <li>
                                    <Image
                                        src="/images/legal-service/arrow-right.png"
                                        alt="right arrow"
                                        width={15}
                                        height={15}
                                    />
                                </li>
                                <li>
                                    <Link href="JavaScript:void(0)">{single_firm?.firm_name}</Link>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {isLoading ? (
                                <LawyerProfileLoadingPlaceholder />
                            ) : (
                                <div className="profile-data data-same border-0">
                                    <div className="row">
                                        <div className="col-md-2 col-3">
                                            <div className="profile-user" style={{ textAlign: 'center' }}>

                                                <ImageComponent
                                                    className="w-130 m-img-fixed"
                                                    src={imageUrl}
                                                    alt={single_firm?.firm_name}
                                                    height={120}
                                                    width={120}
                                                    style={{ borderRadius: '10px' }}
                                                />
                                                {/* <div style={{
                                                    backgroundImage: `url(${single_firm?.image ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/connect-Legal/Blogs/${single_firm?.image}` : "/images/firm/test.png"})`,
                                                    backgroundSize: 'cover',
                                                    backgroundRepeat: 'no-repeat',
                                                    backgroundPosition: 'center',
                                                    width: '100%',
                                                    height: '150px',
                                                    borderRadius: '10px'
                                                }}>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="col-md-10 col-9">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="data-profile-user">
                                                        <h2 style={{ lineHeight: '35px' }}> {single_firm?.firm_name}</h2>
                                                    </div>
                                                </div>
                                                <div className="col-6 text-end">
                                                    <div className="data-profile-user">
                                                        <img
                                                            src="/images/profile/fluent_share-16-filled.png"
                                                            width={25}
                                                            height={25}
                                                            alt="share lawyer profile"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => setshare(!share)}
                                                        />

                                                        {user_Id && user_Id == user_Id && (
                                                            <>
                                                                {bookmark ? (
                                                                    <BsFillBookmarkFill
                                                                        style={{ cursor: 'pointer' }}
                                                                        onClick={() =>
                                                                            handleSavefirm(single_firm.id)
                                                                        }
                                                                        color="#c49073"
                                                                        width={20}
                                                                    />
                                                                ) : (
                                                                    <BsBookmark
                                                                        style={{ cursor: 'pointer' }}
                                                                        onClick={() =>
                                                                            handleSavefirm(single_firm.id)
                                                                        }
                                                                        color="#c49073"
                                                                        width={20}
                                                                    />
                                                                )}
                                                            </>
                                                        )}

                                                        {share && (
                                                            <div className="mt-3">
                                                                <FacebookShareButton
                                                                    url={`${process.env.NEXT_PUBLIC_BASE_URL}/firms/${single_firm.slug}`}
                                                                >
                                                                    <FacebookIcon size={32} round className="m-2" />
                                                                </FacebookShareButton>
                                                                <RedditShareButton
                                                                    url={`${process.env.NEXT_PUBLIC_BASE_URL}/firms/${single_firm.slug}`}
                                                                >
                                                                    <RedditIcon size={32} round className="m-2" />
                                                                </RedditShareButton>
                                                                <WhatsappShareButton
                                                                    url={`${process.env.NEXT_PUBLIC_BASE_URL}/firms/${single_firm.slug}`}
                                                                >
                                                                    <WhatsappIcon size={32} round className="m-2" />
                                                                </WhatsappShareButton>
                                                                <LinkedinShareButton
                                                                    url={`${process.env.NEXT_PUBLIC_BASE_URL}/firms/${single_firm.slug}`}
                                                                >
                                                                    <LinkedinIcon size={32} round className="m-2" />
                                                                </LinkedinShareButton>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-8">
                                                    <div className="company-detail">
                                                        {single_firm?.member_count > 0 ? (
                                                            // <p>{single_firm?.member_count} Professionals Online</p>
                                                            <p>{single_firm?.member_count} {single_firm?.member_count == 1 ? 'Lawyer Online' : 'Professionals Online'}</p>

                                                        ) : (
                                                            <></>
                                                        )}
                                                        {single_firm?.country && (
                                                            <p>
                                                                <MapPinIcon width={20} height={20} />{' '}
                                                                {single_firm?.country}
                                                            </p>
                                                        )}

                                                        <div className="atypebtn mt-2">
                                                            {single_firm?.services &&
                                                                single_firm.services
                                                                    .split(',')
                                                                    .map((service: any, index: any) => (
                                                                        <Link
                                                                            href="JavaScript:void(0)"
                                                                            key={index}
                                                                            className="mb-2 mx-1 first_child"
                                                                        >
                                                                            {service}
                                                                        </Link>
                                                                    ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 text-end pt-3  d-none d-lg-block">
                                                    <>
                                                        {single_firm?.member_count > 0 ? (
                                                            <span
                                                                className="text-white"
                                                                onClick={() => {
                                                                    const ourLawyerSection = document.getElementById('silder-section');
                                                                    if (ourLawyerSection) {
                                                                        ourLawyerSection.scrollIntoView({ behavior: 'smooth' });
                                                                    }
                                                                }}
                                                            >
                                                                <button className="btn-commn">Our Professionals</button>
                                                            </span>)
                                                            :
                                                            (
                                                                <></>
                                                            )}
                                                    </>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 text-end pt-3 d-block d-lg-none">
                                        <div className="company-detail-btn">
                                            {user?.id != lawyer_Id && (
                                                <Link
                                                    href={`/find-a-professional/${slug}/make-an-inquiry`}
                                                    className="text-white"
                                                >
                                                    <button className="btn-commn">Our Professionals</button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </section >

            <div className="gapMarginAndCover"></div>

            <div className="banking-law padding-cover" id="banking-law" style={{ background: '#EAF9F4' }}>
                <div className="container">
                    <div className="row align-items-center g-3">
                        <div className="col-lg-8 col-12">
                            <div className="bank-law">
                                <h2 style={{ color: '#c49073' }}>About us</h2>
                                <br />
                                <h5>We Specialize In:</h5>
                                <p>
                                    {single_firm?.specializations &&
                                        single_firm.specializations
                                            .split(',')
                                            .map((specialization: any, index: any) => (
                                                <Link
                                                    href="JavaScript:void(0)"
                                                    key={index}
                                                    className="mb-2 mx-1 first_child set-spe"
                                                    style={{ color: '#4F4F4F' }}
                                                >
                                                    {specialization}
                                                </Link>
                                            ))}
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-8 ">
                            <div className='row justify-content-end'>
                                <div className="col-lg-4 p-lg-0 text-lg-center">
                                    <div>
                                        {single_firm?.website_url && (
                                            <p>
                                                <a
                                                    href={single_firm?.website_url}
                                                    target="_blank"
                                                    className="green-medium-2  font-medium" rel="noreferrer"
                                                >
                                                    <PiLinkSimpleHorizontalBold />
                                                    {/* <Image
                                                        src="/images/Blogs/iconoir_linkedin.svg"
                                                        alt="iconoir_linkedin"
                                                        width={20}
                                                        height={20}
                                                    /> */}
                                                    {' '}
                                                    &nbsp; Website
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="col-lg-4  p-lg-0">
                                    <div>

                                        {single_firm?.linkedin_url && (
                                            <p>
                                                <a
                                                    href={single_firm?.linkedin_url}
                                                    target="_blank"
                                                    className="green-medium-2  font-medium" rel="noreferrer"
                                                >
                                                    <Image
                                                        src="/images/Blogs/iconoir_linkedin.svg"
                                                        alt="iconoir_linkedin"
                                                        width={20}
                                                        height={20}
                                                    />{' '}
                                                    &nbsp; LinkedIn
                                                </a>
                                            </p>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <br />
                <div className="banking-law" id="banking-law">
                    <div className="container">
                        <div className="row align-items-center g-3">
                            <div className="col-lg-12">
                                <div className="bank-law">
                                    <h5>Bio:</h5>
                                    <p>
                                        {/* {single_firm?.bio && (
                                            <>
                                                {single_firm.bio.length > 250 ? (
                                                    <>
                                                        {showMore ? (
                                                            <>
                                                                {single_firm.bio}{' '}
                                                                <a
                                                                    href="JavaScript:void(0)"
                                                                    onClick={toggleShowMore}
                                                                    className="green-medium-2 font-x-small weight-semi-bold"
                                                                >
                                                                    Show Less
                                                                </a>
                                                            </>
                                                        ) : (
                                                            <>
                                                                {single_firm.bio.substring(0, 250)}{' '}
                                                                <a
                                                                    href="JavaScript:void(0)"
                                                                    onClick={toggleShowMore}
                                                                    className="green-medium-2 font-x-small weight-semi-bold"
                                                                >
                                                                    Show More
                                                                </a>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    single_firm.bio
                                                )}
                                            </>
                                        )} */}
                                        {single_firm?.bio && (
                                            <>
                                                {
                                                    single_firm.bio.length > 600 ? (
                                                        <>
                                                            {showMore ? (
                                                                <>
                                                                    <div dangerouslySetInnerHTML={{ __html: single_firm.bio }} />
                                                                    <a
                                                                        href="JavaScript:void(0)"
                                                                        onClick={toggleShowMore}
                                                                        className="green-medium-2 font-x-small weight-semi-bold"
                                                                    >
                                                                        Show Less
                                                                    </a>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div dangerouslySetInnerHTML={{ __html: single_firm.bio.substring(0, 600) }} />
                                                                    <a
                                                                        href="JavaScript:void(0)"
                                                                        onClick={toggleShowMore}
                                                                        className="green-medium-2 font-x-small weight-semi-bold"
                                                                    >
                                                                        Show More
                                                                    </a>
                                                                </>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <div dangerouslySetInnerHTML={{ __html: single_firm.bio }} />
                                                    )
                                                }
                                            </>
                                        )}

                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <section id="silder-section">
                <div className="container" >
                    <div className="needlawyer-text-firm" >
                        <h2 className="text-start Discover-lawyer" style={{ color: '#c49073' }} >
                            {lawyers.length ? 'Our Legal Team' : ''}
                        </h2>
                    </div>
                    <div className="row mt-4">
                        {/* {lawyers.length > 0 ? (
                            lawyers.map((item: any, index: any) => (
                                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-4">
                                    <LawyerCard lawyer={item} Key={index} />
                                </div>
                            ))
                        ) : (
                            <>
                            </>
                        )}
                        {lawyers.length > 4 && !showAllLawyers && (
                            <div className="text-center all-btn mt-5">
                                <button onClick={() => setShowAllLawyers(true)}>View All</button>
                            </div>
                        )} */}
                        {lawyers.length > 0 ? (
                            <>
                                {lawyers.slice(0, showAllLawyers ? lawyers.length : 4).map((item: any, index: any) => (
                                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-4">
                                        <LawyerCard lawyer={item} Key={index} />
                                    </div>
                                ))}
                                {lawyers.length > 4 && !showAllLawyers && (
                                    <div className="text-center all-btn mt-5">
                                        <button onClick={() => setShowAllLawyers(true)}>View All</button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <></>
                        )}


                    </div>
                </div>
            </section>
            <div className='mt-5'>
                <UpperFooter />
            </div>

        </div >

    );
}
