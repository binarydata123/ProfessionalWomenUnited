import SingleAuthor from '@/components/public/SingleAuthor'
import React from 'react'
import { getSingleAuthor } from '../../../../../lib/frontendapi';
import '../about.css'
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const author: any = await getData(params.slug);
    if (!author) {
        notFound();
    }
    return {
        title: author.data.author.name ? author.data.author.name : `Authors | ${process.env.NEXT_APP_NAME}`,
        description: author.data.author.description ? author.data.author.description : `${process.env.NEXT_APP_NAME}`,
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/author/${params.slug}`
        },
        openGraph: {
            title: author.data.author.name ? author.data.author.name : `Authors | ${process.env.NEXT_APP_NAME}`,
            description: author.data.author.description ? author.data.author.description : `${process.env.NEXT_APP_NAME}`,
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/author/${params.slug}`,
            siteName: `${process.env.NEXT_APP_NAME}`,
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_BASE_URL}/OG-image.jpg`,
                    width: 350,
                    height: 50,
                },
            ],
            type: 'website',
        },
    };
}


export default async function page({ params }: { params: { slug: string } }) {
    const data: any = await getData(params.slug);
    if (!data) {
        notFound();
    }
    return (
        <SingleAuthor Author={data.data} />
    )
}

async function getData(slug: string) {
    try {
        const author = await getSingleAuthor(slug);
        return {
            data: author.data,
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
