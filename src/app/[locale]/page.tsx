import React from 'react';
import Banner from '@/components/public/Banner';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import UpperFooter from '@/components/public/UpperFooter';
import Image from 'next/image';
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

	const servicesData = [
		{
			name: "Health & Wellness",
			image: "Nicole-DAmbrogi.jpg",
			slug: "health-wellness",
			tags: [
				{ tag_id: 1, tag_name: "Gynecology & Women’s Health" },
				{ tag_id: 2, tag_name: "Dentistry & Oral Care" },
				{ tag_id: 3, tag_name: "Pediatrics & Child Care" },
				{ tag_id: 4, tag_name: "Counseling & Mental Wellness" },
			],
		},
		{
			name: "professional services",
			image: "Belashia-Wallace.jpg",
			slug: "legal-services",
			tags: [
				{ tag_id: 5, tag_name: "Family Law & Divorce" },
				{ tag_id: 6, tag_name: "Personal Injury Claims" },
				{ tag_id: 7, tag_name: "Criminal Defense" },
				{ tag_id: 8, tag_name: "Real Estate Law" },
			],
		},
		{
			name: "Financial Services",
			image: "women.png",
			slug: "financial-services",
			tags: [
				{ tag_id: 9, tag_name: "Tax Preparation" },
				{ tag_id: 10, tag_name: "Investment Planning" },
				{ tag_id: 11, tag_name: "Business Consulting" },
				{ tag_id: 12, tag_name: "Loan & Mortgage Advice" },
			],
		},
		{
			name: "Business Professionals",
			image: "Alexandra-Baron.jpg",
			slug: "business-professionals",
			tags: [
				{ tag_id: 13, tag_name: "Marketing & Branding" },
				{ tag_id: 14, tag_name: "Human Resources" },
				{ tag_id: 15, tag_name: "Partnerships" },
				{ tag_id: 16, tag_name: "Corporate Training" },
			],
		},
	];

	const professionals = [
		{
			id: 1,
			name: "Dr. Sarah Johnson",
			specialty: "Gynecologist",
			city: "New York",
			state: "NY",
			image: "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400",
			rating: 4.9,
			reviews: 247,
			phone: "(555) 123-4567",
			email: "sarah.johnson@example.com",
			verified: true
		},
		{
			id: 2,
			name: "Dr. Michael Chen",
			specialty: "Dentist",
			city: "Los Angeles",
			state: "CA",
			image: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400",
			rating: 4.8,
			reviews: 189,
			phone: "(555) 234-5678",
			email: "michael.chen@example.com",
			verified: true
		},
		{
			id: 3,
			name: "Dr. Emily Rodriguez",
			specialty: "Pediatrician",
			city: "Miami",
			state: "FL",
			image: "https://images.pexels.com/photos/7659568/pexels-photo-7659568.jpeg?auto=compress&cs=tinysrgb&w=400",
			rating: 4.9,
			reviews: 312,
			phone: "(555) 345-6789",
			email: "emily.rodriguez@example.com",
			verified: true
		},
		{
			id: 4,
			name: "Jessica Thompson",
			specialty: "Family Law Attorney",
			city: "Chicago",
			state: "IL",
			image: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400",
			rating: 4.7,
			reviews: 156,
			phone: "(555) 456-7890",
			email: "jessica.thompson@example.com",
			verified: true
		},
		{
			id: 5,
			name: "Robert Martinez",
			specialty: "Personal Injury Attorney",
			city: "Houston",
			state: "TX",
			image: "https://images.pexels.com/photos/8112198/pexels-photo-8112198.jpeg?auto=compress&cs=tinysrgb&w=400",
			rating: 4.8,
			reviews: 203,
			phone: "(555) 567-8901",
			email: "robert.martinez@example.com",
			verified: true
		},
		{
			id: 6,
			name: "Amanda Foster",
			specialty: "Criminal Defense Attorney",
			city: "Phoenix",
			state: "AZ",
			image: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400",
			rating: 4.9,
			reviews: 178,
			phone: "(555) 678-9012",
			email: "amanda.foster@example.com",
			verified: true
		},
		{
			id: 7,
			name: "David Kim",
			specialty: "Real Estate Agent",
			city: "Seattle",
			state: "WA",
			image: "https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=400",
			rating: 4.8,
			reviews: 267,
			phone: "(555) 789-0123",
			email: "david.kim@example.com",
			verified: true
		},
		{
			id: 8,
			name: "Dr. Lisa Williams",
			specialty: "Counselor",
			city: "Denver",
			state: "CO",
			image: "https://images.pexels.com/photos/7659586/pexels-photo-7659586.jpeg?auto=compress&cs=tinysrgb&w=400",
			rating: 4.9,
			reviews: 194,
			phone: "(555) 890-1234",
			email: "lisa.williams@example.com",
			verified: true
		},
		{
			id: 9,
			name: "James Wilson",
			specialty: "Accountant",
			city: "Atlanta",
			state: "GA",
			image: "https://images.pexels.com/photos/8112202/pexels-photo-8112202.jpeg?auto=compress&cs=tinysrgb&w=400",
			rating: 4.7,
			reviews: 142,
			phone: "(555) 901-2345",
			email: "james.wilson@example.com",
			verified: true
		}
	];

	return (
		<>
			<div className="landing-page-wrapper">
				<div className="banner-container">

					<Banner />

					<DirectoryTabs />

					<section >
						{/* <section id="silder-section"> */}
						<div className="container">
							{/* <div className="needlawyer-text">
								<h6 className="text-start">TOP LEGAL PROFESSIONAL</h6>
								<h2 className="text-start Discover-lawyer">
									<span className="span"> Discover the top Professional in US</span>
								</h2>
							</div> */}
							<div className="row">
								<div className="col-md-12 homeSlider">
									{/* {professionals?.length > 0 && (
										<Slider
											nav={false}
											loop={true}
											dots={true}
											className="mt-5"
											items={4}
											responsive={{
												0: {
													items: 1
												},
												600: {
													items: 2
												},
												768: {
													items: 2
												},
												991: {
													items: 3
												},
												1200: {
													items: 3
												},
												1366: {
													items: 4
												},
												1440: {
													items: 4
												},
												1500: {
													items: 4
												}
											}}>
											{professionals.map((lawyer: any, index: number) => (
												<LawyerCard
													ShowLoader={false}
													lawyer={lawyer}
													Key={index}
													showLocation={false}
												/>
											))}
										</Slider>
									)} */}
									<ProfessionalCard />
									<div className="text-end all-btn">
										{/* <Link href="/find-a-professional"> */}
										<button>{t('view_all')}</button>
									</div>
								</div>
							</div>
						</div>
					</section>
					{/* <section id="exportlegal">
						<div className="container">
							<div className="text-center">
								<div className="needlawyer-text">
									<h6 className="text-center" style={{ color: '#c49073' }}>WOMEN PROFESSIONALS DIRECTORY</h6>
									<h2 className="text-center">
										<span className="span">Find The Best Women</span>
										<br />
										<span className="highlight" style={{color:'#BE8363'}}>Professionals</span>
									</h2>
									<p className="text-center">Find the right professional in your city...</p>
								</div>
							</div>
							<div className="row justify-content-lg-0 justify-content-center">
								{servicesData.map((item, index) => (
									<div className="col-lg-12 col-xl-6 justify-content-center mt-4" key={index}>
										<div className="needuser">
											<div className="row justify-content-center align-items-center">
												<div className="col-lg-6 col-12 d-none d-lg-block">
													<div className="image-user hover">
														<Link href={`/${item.slug}`}>
															<Image
																src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/${item.image}`}
																alt={`For your ${item.name}`}
																width={600}
																height={250}
																layout="responsive"
																objectFit="cover"
															/>
														</Link>
													</div>
												</div>
												<div className="col-md-6">
													<div className="image-user-text">
														<Link href={`/${item.slug}`}>
															<h5>For Your {item.name}</h5>
														</Link>
														<div className="user-department">
															{item.tags.length > 0 ? (
																<ul>
																	{item.tags.map((tag, tagIndex) => (
																		<li key={tagIndex}>
																			<Link href={`/${item.slug}?tag_id=${tag.tag_id}`}>
																				{tag.tag_name}
																			</Link>
																		</li>
																	))}
																</ul>
															) : (
																<p>No tags available</p>
															)}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
							<div className="text-center pt-5 mb-5">
								<Link
									href={'/legal-services/banking'}
									className="w-17 change-width-two btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2 mx-auto">
									<span className="text-white"> {t('view_all_services')}</span>
									<span className="border border-radius-1 banner-arrow-btn">
										<ChevronRightIcon width={20} color={'#fff'} />
									</span>
								</Link>
							</div>
						</div>
					</section> */}
					{/* <ProfessionalDirectory/> */}
					<section id="needlawyer">
						{/* <div className="container"> */}
						<div className="row">

							<div className="col-md-12">
								<div className="needlawyer-text pt-lg-0 pt-4 hover">

									<MapChart />
								</div>
							</div>
						</div>
						{/* </div> */}
					</section>
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
