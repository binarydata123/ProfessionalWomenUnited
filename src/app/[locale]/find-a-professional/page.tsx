import { getAllLawyersData, getAllMetaData } from '../../../../lib/frontendapi';
import { Metadata } from 'next';
import FindALawyer from '@/components/Frontend/FindALawyer';

export async function generateMetadata(): Promise<Metadata> {
	const meta = await getAllMetaData({
		title: 'find_a_lawyer_meta_title',
		description: 'find_a_lawyer_meta_description'
	});
	return {
		title: meta.data.find_a_lawyer_meta_title
			? meta.data.find_a_lawyer_meta_title
			: `Find a Professional | ${process.env.NEXT_APP_NAME}`,
		description: meta.data.find_a_lawyer_meta_description
			? meta.data.find_a_lawyer_meta_description
			: `${process.env.NEXT_APP_NAME}`,
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/find-a-lawyer`
		},
		openGraph: {
			title: meta.data.find_a_lawyer_meta_title
				? meta.data.find_a_lawyer_meta_title
				: `Find a Professional | ${process.env.NEXT_APP_NAME}`,
			description: meta.data.find_a_lawyer_meta_description
				? meta.data.find_a_lawyer_meta_description
				: `${process.env.NEXT_APP_NAME}`,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/find-a-lawyer`,
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

export default async function Page() {
	const data: any = await getData();
	return (
		<>
			<FindALawyer filterlawyer={data.lawyer} />
		</>
	);
}

async function getData() {
	try {
		const lawyer = await getAllLawyersData();

		return {
			lawyer: lawyer.data
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
}
