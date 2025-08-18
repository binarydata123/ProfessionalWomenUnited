'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import AuthorCard from '../AuthorCard'
import UpperFooter from '../UpperFooter'
import { getAllAuthor } from '../../../../lib/frontendapi'

interface AuthorProps {
    authors: any[];
}

export default function Author({ authors }: AuthorProps) {
    const [allAuthors, setAllAuthors] = useState(authors)
    useEffect(() => {
        getAllAuthor()
            .then((res) => {
                setAllAuthors(res.data)
            })
    }, [])

    return (
        <div className='author-wrapper container'>
            <div id="main-div" className="pb-0">
                <section className="about-banner parent-container pb-0">
                    <div className="row">
                        <div className="col-sm-7">
                            <div className="author-left-content">
                                <p className='top-text'>Meet our expert authors</p>
                                <h1 className='heading mt-3'>Our Authors</h1>
                                <h2 className='bottom-text mt-2'>Explore the diverse perspectives and expertise of our esteemed authors. Each brings a wealth of knowledge to our legal blog, providing insights and guidance on a variety of legal topics.</h2>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="author-right-content text-end">
                                <Image
                                    width={220}
                                    height={220}
                                    alt=''
                                    src={'/connect-Legal/Blogs/Frame 427324573.png'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row row-author-list mb-5">
                        {allAuthors.length > 0 ? (
                            allAuthors.map((author: any, index: number) => (
                                <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3 mt-4 mb-4" key={index}>
                                    <AuthorCard Author={author} />
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center mt-5 mb-5">
                                <hr className='mb-5' />
                                <h1 className='heading mt-2 primary-text'>No authors found!</h1>
                                <p className="text-muted">
                                    It seems like there are no authors available at the moment. Check back later or explore more content on our platform.
                                </p>
                                <hr className='mt-5' />
                            </div>
                        )}
                    </div>

                    <UpperFooter />
                </section>
            </div>
        </div>
    )
}
