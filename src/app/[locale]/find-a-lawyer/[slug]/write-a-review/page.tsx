import React from 'react';
import './write-a-review.css';
import WriteAReview from '@/components/public/WriteAReview';
import { getSingleLawyerDetails } from '../../../../../../lib/frontendapi';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: `Write a review | ${process.env.NEXT_APP_NAME}`,
	description: '...'
};

export default async function Page({ params }: { params: { slug: string } }) {
	const lawyer = await getData(params.slug);
	return <WriteAReview slug={params.slug} lawyer={lawyer} />;
}

async function getData(slug: string) {
	try {
		const lawyer = await getSingleLawyerDetails(slug);
		return lawyer.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
}
