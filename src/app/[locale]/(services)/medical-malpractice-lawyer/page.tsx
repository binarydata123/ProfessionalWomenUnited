import React from 'react';
import { Metadata } from 'next';
import MedicalMalpracticeLawyer from '@/components/services/MedicalMalpracticeLawyer';

export async function generateMetadata(): Promise<Metadata> {
	return {
		title: 'Medical Malpractice Lawyer – Connect Legal',
		description:
			'Address medical malpractice concerns with a medical malpractice lawyer in Dubai. Connect Legal can help you claim rightful compensation.',
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/medical-malpractice-lawyer`
		},
		openGraph: {
			title: 'Medical Malpractice Lawyer – Connect Legal			',
			description:
				'Address medical malpractice concerns with a medical malpractice lawyer in Dubai. Connect Legal can help you claim rightful compensation.',
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/medical-malpractice-lawyer`,
			siteName: process.env.NEXT_APP_NAME,
			images: [
				{
					url: `${process.env.NEXT_PUBLIC_BASE_URL}/OG-image.jpg`,
					width: 350,
					height: 50
				}
			],
			type: 'website'
		}
	};
}
export default function Page() {
	return (
		<>
			<MedicalMalpracticeLawyer />
		</>
	);
}
