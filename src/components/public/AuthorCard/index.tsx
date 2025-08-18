"use client"
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

interface AuthorProps {
    Author: any;
}

export default function AuthorCard({ Author }: AuthorProps) {
    const [showFullDescription, setShowFullDescription] = useState(false)
    return (
        <div className='author-card-wrapper'>
            <div className="row">
                <Link href={`/author/${Author.slug}`}>
                    <div className="col-sm-12">
                        <Image
                            width={292}
                            height={191}
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${Author.profile_image ?
                                `/connect-Legal/Blogs/${Author.profile_image}`
                                :
                                `images/default/${Author.gender == 'male'
                                    ? 'male-lawyer-306x200.png'
                                    : 'female-lawyer-306x200.png'}`
                                }`}
                            alt=''
                            className='w-100'
                            style={{ borderRadius: "8px", objectFit: "cover" }} />
                    </div>
                </Link>
                <div className="d-flex col-sm-12 mt-3 gap-1">
                    <div style={{ width: "90%" }}>
                        <Link href={`/author/${Author.slug}`}>
                            <p className='author-name'>{Author.name}</p>

                            <p className='post' style={{ color: "#4F4F4F" }}>{Author.designation}</p>
                        </Link>
                    </div>
                    {
                        Author.linkedin &&
                        <Link className="social-icon text-end" style={{ width: "10%" }} href={Author.linkedin}>
                            <Image
                                width={20}
                                height={20}


                                src={'/icon/linkedin-icon.png'}
                                alt=''
                            />
                        </Link>
                    }
                </div>
                <Link href={`/author/${Author.slug}`}>
                    <p className={`about-author mt-2 ${!showFullDescription ? 'multiline-ellipsis' : ''}`} style={{ color: "#1F1F1F" }}>
                        {Author.description}
                    </p>
                </Link>
                <span className='primary-text' style={{ fontSize: '14px', cursor: "pointer" }} onClick={() => setShowFullDescription(!showFullDescription)}>View {!showFullDescription ? 'more' : 'less'}</span>
            </div>
        </div>
    )
}
