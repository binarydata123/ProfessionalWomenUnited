import AskAlawyer from '@/components/public/AskAlawyer';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    return {
        title: 'Ask a Lawyer - Connect Legal',
        description: 'Get legal advice and answers to your questions from experienced lawyers on Connect Legal. Ask a lawyer today!',
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/legal-forum/${params.slug}/ask-a-lawyer`
        },
        openGraph: {
            title: 'Ask a Lawyer - Connect Legal',
            description: 'Get legal advice and answers to your questions from experienced lawyers on Connect Legal. Ask a lawyer today!',
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/legal-forum/${params.slug}/ask-a-lawyer`,
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

export default function Page({ params }: { params: { slug: string } }) {
    return <AskAlawyer slug={params.slug} />;
}
