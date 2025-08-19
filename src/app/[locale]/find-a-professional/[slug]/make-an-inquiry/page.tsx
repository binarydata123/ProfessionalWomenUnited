import MakeAnInquiry from '@/components/public/MakeAnInquiry';
import './making-an-Inquiry.css';

import type {Metadata} from 'next';

export const metadata: Metadata = {
	title: `Make an inquiry   ${process.env.NEXT_APP_NAME}`,
	description: '...'
};

export default function page({params}: {params: {slug: string}}) {
	return <MakeAnInquiry slug={params.slug} />;
}
