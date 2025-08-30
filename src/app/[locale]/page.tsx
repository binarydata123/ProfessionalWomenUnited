import React from 'react';
import Banner from '@/components/public/Banner';
import UpperFooter from '@/components/public/UpperFooter';
import Link from 'next/link';
import { getServiceWithTags, getAllMetaData, getAllLawyersData } from '../../../lib/frontendapi';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { MapChart } from '@/components/MapChart';
import DirectoryTabs from '@/components/DirectoryTabs';
import ProfessionalCard from '@/components/ProfessionalCard';

export async function generateMetadata(): Promise<Metadata> {
	const meta = await getAllMetaData({ title: 'homepage_meta_title', description: 'homepage_meta_description' });
	return {
		title: meta.data.homepage_meta_title ? meta.data.homepage_meta_title : `Home | ${process.env.NEXT_APP_NAME}`,
		description: meta.data.homepage_meta_description
			? meta.data.homepage_meta_description
			: `${process.env.NEXT_APP_NAME}`,
		alternates: {
			canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`
		},
		openGraph: {
			title: meta.data.homepage_meta_title
				? meta.data.homepage_meta_title
				: `Home | ${process.env.NEXT_APP_NAME}`,
			description: meta.data.homepage_meta_description
				? meta.data.homepage_meta_description
				: `${process.env.NEXT_APP_NAME}`,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
			siteName: `${process.env.NEXT_APP_NAME}`,
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

export default async function Page() {
	const t = await getTranslations('Index');
	const res: any = await getData();
	const lawyers = res?.lawyers;
	const services = res?.services;


	return (
		<>
			<div className="landing-page-wrapper">
				<div className="banner-container">

					<Banner />

					<DirectoryTabs />

					{/* <section >
						<div className="container">

							<div className="row">
								<div className="col-md-12 homeSlider">

									<ProfessionalCard />
									<div className="text-end all-btn">
										<Link href="/find-a-professional">
											<button>{t('view_all')}</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</section> */}

					{/* <section id="needlawyer"> */}
					<div className="row">

						<div className="col-md-12">
							<div className="needlawyer-text pt-lg-0 pt-4 hover">

								<MapChart />
							</div>
						</div>
					</div>
					{/* </div> */}
					{/* </section> */}
				</div>
				<UpperFooter />
			</div>
		</>
	);
}

async function getData() {
	try {
		const lawyers = await getAllLawyersData();
		const services = await getServiceWithTags();
		return {
			lawyers: lawyers.data,
			services: services.data
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return null;
	}
}
