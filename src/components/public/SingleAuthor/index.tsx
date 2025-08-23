'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Blog from '../Blog';
import Pagination from '@/commonUI/Pagination';

interface SingleAuthorProps {
    Author: any;
}

export default function SingleAuthor({ Author }: SingleAuthorProps) {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 18;

    useEffect(() => {
        fetchBlogs(currentPage);
    }, [currentPage]);

    // Calculate total pages based on total blogs count
    const totalPages = Math.ceil(Author.blogs.total / itemsPerPage);

    // Fetch blogs for current page
    const fetchBlogs = async (page: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-author/${Author.author.slug}?page=${page}`);
            const data = await response.json();
            setBlogs(data.data.blogs.data);
            setCurrentPage(data.data.blogs.current_page);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <div className='single-author-wrapper container'>
            <div id="main-div" className="pb-0">
                <section className="about-banner parent-container pb-0">
                    <div className="row align-items-center">
                        <div className="row">
                            <div className="col-sm-12 mt-2 mb-2">
                                <ul className="list-12 mb-3">
                                    <li>
                                        <Link href="/">Our Author </Link>
                                    </li>
                                    <li>
                                        <Image
                                            src="/images/legal-service/arrow-right.png"
                                            alt="Find A Professional right arrow"
                                            width={15}
                                            height={15}
                                        />
                                    </li>
                                    <li>
                                        <Link href="/find-a-professional" >
                                            <h1 className="active">{Author.author.name}</h1>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <Image
                                width={200}
                                height={200}
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${Author.author.profile_image ?
                                    `/professional-women/Blogs/${Author.author.profile_image}`
                                    :
                                    `images/default/${Author.author.gender == 'male'
                                        ? 'male-lawyer-306x200.png'
                                        : 'female-lawyer-306x200.png'}`
                                    }`}
                                alt=''
                                layout='responsive'
                                style={{ borderRadius: "8px" }}
                            />
                        </div>
                        <div className="col-sm-9">
                            <div className="col-sm-12 justify-content-between">
                                <div className='mb-2'>
                                    <Link href={`/author/${Author.author.slug}`}>
                                        <h3 className='author-name'>{Author.author.name}</h3>
                                    </Link>
                                    <p className='post'>{Author.author.designation}</p>
                                </div>
                                {
                                    Author.linkedin &&
                                    <Link className="social-icon" href={Author.author.linkedin || '#'}>
                                        <Image
                                            width={20}
                                            height={20}
                                            src={'/icon/linkedin-icon.png'}
                                            alt=''
                                        />
                                    </Link>
                                }
                            </div>
                            <p className="about-author mt-2">
                                {Author.author.description}
                            </p>
                            {
                                Author.blogs.services &&
                                <p className='about-author-bottom mt-2'>Writes about:</p>
                            }
                            <div className="d-flex gap-2 mt-2">
                                {
                                    (() => {
                                        const uniqueServiceNames = new Set();
                                        const renderedButtons = [];

                                        for (const blog of Author.blogs.data.slice(0, 20)) {
                                            const serviceName = blog.services ? blog.services.name : null;

                                            if (serviceName && !uniqueServiceNames.has(serviceName)) {
                                                uniqueServiceNames.add(serviceName);
                                                renderedButtons.push(
                                                    <button className='author-write-about' key={serviceName}>
                                                        {`${serviceName} Law`}
                                                    </button>
                                                );
                                                if (uniqueServiceNames.size === 5) {
                                                    break;
                                                }
                                            }
                                        }

                                        return renderedButtons;
                                    })()
                                }

                            </div>
                        </div>
                    </div>
                    <div className="blog-section-heading text-center mt-5 mb-5">
                        <h1>All posts by {Author.author?.name?.split(' ')[0]}</h1>
                    </div>

                    <div className="row">
                        {blogs?.length > 0 ? (
                            blogs?.map((blog: any, index: number) => (
                                <div className="col-sm-4" key={index}>
                                    <Blog blog={blog} />
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center mt-2 mb-2">
                                <p className="text-muted">
                                    {blogs.length === 0
                                        ? 'It seems like there are no blogs available at the moment. Check back later or explore more content on our platform.'
                                        : 'It seems like there are no authors available at the moment. Check back later or explore more content on our platform.'}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="legal-sights mt-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                        />
                    </div>

                </section>
            </div>
        </div>
    )
}
