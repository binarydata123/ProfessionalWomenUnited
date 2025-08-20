'use client';
import { ChevronRightIcon, PlusSmallIcon, StarIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import './style.css';
import Popup from '@/commonUI/Popup';
import { checkUserOnline, getSingleFirmDetails, getSingleLawyerDetails } from '../../../lib/frontendapi';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import ImageComponent from '@/commonUI/ImageComponent';
import CardLoadingPlaceholder from '@/commonUI/CardLoadingPlaceholder';
import LawyerLoadingPlaceholder from '@/commonUI/LawyerLoadingPlaceholder';
import { getAdminImageSrc306x200 } from '@/app/[locale]/commonfunctions/commonfunctions';

interface Props {
    firms?: any;
    Key: number;
    ShowLoader?: boolean;
}
export default function FirmCard({
    firms,
    Key,
    ShowLoader = true
}: Props) {

    const [single_firm, setSingleFirmData] = useState<any>('');
    const [showMore, setShowMore] = useState(false);
    const toggleShowMore = () => setShowMore(!showMore);
    const currentYear = new Date().getFullYear();
    const [viewProfile, setviewProfile] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    const handleSingleFirmDetails = async (id: any) => {
        try {
            const res = await getSingleFirmDetails(id);
            if (res.status == true) {
                setSingleFirmData(res.data);
                console.log(res.data);

                setviewProfile(true);
            }
        } catch (err) {
            console.log(err);
        }
    };


    if (isLoading && ShowLoader && process.env.NEXT_PUBLIC_DATA_LOADING_PLACEHOLDER === 'true') {
        return <LawyerLoadingPlaceholder />;
    }

    const imageUrl = firms?.image
        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/connect-Legal/Blogs/${firms.image}`
        : `${process.env.NEXT_PUBLIC_IMAGE_URL}/images/default/1920x1080.png`;
    return (
        <div className="lawyer-card-wrapper" >
            <div className="testimonial">
                <Link href={`/firms/${firms?.slug}`}>
                    <div className="pic pic-box1 position-relative">
                        <div className="portfolioDisc">
                        </div>
                        <div className="portfolioDisc_data">
                            {/* <ImageComponent
                                className="w-130 m-img-fixed"
                                src={firms?.image ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/connect-Legal/Blogs/${firms?.image}` : "/images/firm/test.png"}
                                alt={single_firm?.firm_name}
                                height={100}
                                width={100}
                            /> */}
                            <div style={{
                                backgroundImage: `url(${imageUrl})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center top',
                                width: '100%',
                                height: '190px',
                                borderRadius: '10px',
                                border: '1px solid #ccc'
                            }}>
                            </div>
                        </div>



                    </div>
                </Link>
                <Link href={`/firms/${firms?.slug}`}>
                    <h3 className="testimonial-title" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        {firms.firm_name && firms.firm_name.length > 20
                            ? firms.firm_name.substring(0, 20) + '...'
                            : firms.firm_name}
                    </h3>
                    <p className="description">
                        {/* {firms?.member_count > 0 ? `${firms?.member_count} Professionals Online` : ''} */}
                        <span>{firms?.member_count > 0 ? `${firms?.member_count} ${firms?.member_count == 1 ? 'Lawyer Online' : 'Professionals Online'}` : ''}</span>
                    </p>

                </Link>

                <p className="description">
                    {firms?.designation && firms.designation.length > 30
                        ? firms.designation.slice(0, 30) + '...'
                        : firms?.designation}
                </p>
                <div className="location-move">
                    <HiOutlineLocationMarker width={20} />
                    {firms?.country}
                </div>
                {/* <span className="btn-family-more">
                    {firms?.specializations && (
                        firms.specializations.split(',').map((specialization: any, index: any) => (
                            <button key={index}>{specialization.trim()} Law</button>
                        ))
                    )}
                </span> */}
                <span className="btn-family-more">
                    {firms?.services && (
                        <Link href={`/legal-services/${firms?.service_slug?.split(',')[0]}`}>
                            <button> {firms?.services?.split(',')[0]} Law</button>
                        </Link>
                    )}
                </span>
                <span className="btn-family-more ">
                    <Link href={`/firms/${firms?.slug}`}>
                        <span className="view-more-btn" >
                            More details
                        </span>
                    </Link>
                </span>
            </div>
            <Popup
                show={viewProfile}
                onCancel={() => setviewProfile(false)}
                onOk={() => setviewProfile(false)}
                footer={false}
            >
                <div className="" id="modal-body-style">
                    <div className="testimonial">
                        <div className="pic position-relative lawyer-img">

                            <ImageComponent
                                src={getAdminImageSrc306x200(firms?.profile_image, firms.gender)}
                                placeholderImgUrl={
                                    process.env.NEXT_PUBLIC_IMAGE_URL +
                                    `/images/default/${firms.gender == 'male' ? 'male-lawyer-306x200.png' : 'female-lawyer-306x200.png'
                                    }`
                                }
                                alt="user-popup"
                                className="image-width-cording"
                                width={200}
                                height={200}
                            />

                        </div>
                        <h3 className="testimonial-title" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            {single_firm?.full_name}
                        </h3>
                        {single_firm?.designation && <p className="description py-3">{single_firm?.designation}</p>}
                        {single_firm?.location_name && (
                            <div className="location-move p-0">
                                <Image
                                    src="/images/contact/location.png"
                                    alt="location icon image"
                                    width={20}
                                    height={20}
                                    objectFit="cover"
                                />
                                {single_firm?.location_name}
                            </div>
                        )}

                        <p className="stong-text m-0">
                            <span>
                                <StarIcon width={20} color="#208C84" style={{ marginRight: '5px', height: '30px' }} />
                            </span>


                        </p>

                        <div className="btn-family-more d-flex">
                            {firms?.service_name &&
                                firms.service_name.split(',').map((service: any, index: any) => (
                                    <button className="mx-1" key={index}>
                                        {service} Law
                                    </button>
                                ))}

                            {single_firm?.acquired && currentYear - single_firm?.acquired > 0 && (
                                <button className="btn-color ml-2">
                                    Licensed for {currentYear - single_firm?.acquired} years
                                </button>
                            )}

                            <br />
                            {single_firm?.consultation_duration && (
                                <button className="btn-color">
                                    Free Consultation: {single_firm?.consultation_duration}
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="detail-fil">
                        <div className="About-detail">
                            <h3>About {single_firm?.full_name}</h3>
                            <p className="mb-3">
                                <Image src="/images/map.png" alt="map icon image" width={20} height={20} />
                                Legal Jurisdiction: <span>{single_firm?.jurisdiction_name}</span>
                            </p>
                        </div>

                        <div className="more-detail">
                            {single_firm?.specializ_name && (
                                <>
                                    <strong>Specializes In:</strong>
                                    <p>{single_firm?.specializ_name}</p>
                                </>
                            )}

                            {single_firm?.bio && (
                                <>
                                    <strong>Bio:</strong>
                                    <p>
                                        {showMore
                                            ? single_firm?.bio
                                            : `${single_firm?.bio.slice(0, 150)}${single_firm?.bio.length > 150 ? '...' : ''
                                            }`}
                                    </p>

                                    {single_firm?.bio.length > 150 && (
                                        <div>
                                            <a
                                                href="JavaScript:void(0)"
                                                onClick={toggleShowMore}
                                                style={{ padding: '0px' }}
                                            >
                                                {' '}
                                                {showMore ? 'Show Less' : 'Show More'}{' '}
                                            </a>
                                        </div>
                                    )}
                                </>
                            )}
                            {single_firm?.hourly_rate_range && (
                                <>
                                    <h3 className="pb-0">Cost</h3>
                                    <p>Hourly Rates</p>
                                    <div className="body-font-text text-capitalize">
                                        {single_firm?.hourly_rate_range}
                                    </div>
                                </>
                            )}

                            {single_firm?.payment_method && (
                                <>
                                    <p>Payment Methods</p>
                                    <div className="body-font-text text-capitalize">
                                        {single_firm?.payment_method}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Popup>

        </div>
    );
}
