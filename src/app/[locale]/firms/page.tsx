import { Metadata } from 'next';
import Firm from '@/components/Firm';
import { getAllFirmsData, getAllMetaData } from '../../../../lib/frontendapi';

export async function generateMetadata(): Promise<Metadata> {
	const meta = await getAllMetaData({
		title: 'firms_meta_title',
		description: 'firms_meta_description'
	});
	return {
		title: meta.data.firms_meta_title
			? meta.data.firms_meta_title
			: `Firms | ${process.env.NEXT_APP_NAME}`,
		description: meta.data.firms_meta_description
			? meta.data.firms_meta_description
			: `${process.env.NEXT_APP_NAME}`,
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/firms`
		},
		openGraph: {
			title: meta.data.firms_meta_title
				? meta.data.firms_meta_title
				: `Firms | ${process.env.NEXT_APP_NAME}`,
			description: meta.data.firms_meta_description
				? meta.data.firms_meta_description
				: `${process.env.NEXT_APP_NAME}`,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/firms`,
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

	console.log(data,'da32423423ta')
	return (
		<>
			<Firm allfirm={data.firm} />
		</>
	);
}

async function getData() {
	try {
		const firm = await getAllFirmsData();
		return {
			firm: firm.data
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
}
