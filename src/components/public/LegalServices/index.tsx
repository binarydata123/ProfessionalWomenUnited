'use client';
import React, { useState, useEffect } from 'react';
import Slider from '@/commonUI/Slider';
import Image from 'next/image';
import Service from '@/components/public/Service';
import LegalIssue from '@/components/public/LegalIssue';
import LegalQuetion from '@/components/public/LegalQuetion';
import { getAllLawyersOrFilter, getServiceBenefits, getAllServiceQa, getAlltags } from '../../../../lib/frontendapi';
import LawyerCard from '@/components/lawyer/LawyerCard';
import HowBenefitsLawyer from '../HowBenefitsLawyer';
import GotQuestions from '../GotQuestions';
import Link from 'next/link';
import { getAdminLegalServiceImageSrc } from '@/app/[locale]/commonfunctions/commonfunctions';

const responsive = {
	0: {
		items: 2
	},
	600: {
		items: 2
	},
	991: {
		items: 3
	},
	1024: {
		items: 4
	},
	1366: {
		items: 6
	},
	1440: {
		items: 6
	},
	1500: {
		items: 6
	}
};

interface Props {
	service?: any;
	allServices?: any;
}

export default function LegalServices({ service, allServices }: Props) {
	const [allServicesName, setAllServicesName]: any = useState(allServices);
	const [startPosition, setStartPosition]: any = useState(0);
	const [relatedLawyer, setRelatedLawyer]: any = useState([]);
	const [serviceQa, setServiceQa] = useState([]);
	const [serviceBenefits, setServiceBenefits] = useState([]);
	const [tags, setTags] = useState([]);

	useEffect(() => {
		handleRelatedLawyer(service.slug);
		handleTags('banking');
		handleServiceQa(service.id);
		handleServiceBenefits(service.id);
		allServicesName.forEach((item: any, index: number) => {
			if (item.id == service.id) {
				setStartPosition(index)
			}
		});
	}, []);

	const handleRelatedLawyer = (service: string, count = 3) => {
		const data = {
			count: count,
			p_service_name: service
		};
		getAllLawyersOrFilter(data).then(res =>
			res.status ? setRelatedLawyer(res.data) : handleRelatedLawyer('', 10)
		);
	};

	const handleServiceQa = (id: any) => {
		getAllServiceQa(id)
			.then((res) => {
				setServiceQa(res);
			})
	}

	const handleServiceBenefits = (id: any) => {
		getServiceBenefits(id)
			.then((res) => {
				setServiceBenefits(res.data);
				// console.log(res.data);
			})
	}

	const handleTags = (service: string) => {
		getAlltags({ count: 7, service: service }).then(res => {
			setTags(res.data);
		});
	};

	return (
		<>
			<div className="container">
				<div id="legal-serve" className='legel-service-padding'>
					<span>Home</span>
					<span>
						<Image src="/images/legal-service/arrow-right.png" alt="arrow-right" width={16} height={16} />
					</span>
					<span>professional services</span>
				</div>
				<div className="col-md-12">
					{allServicesName && (
						<Slider
							key={service}
							className="mt-5"
							items={6}
							loop={false}
							nav={true}
							dots={false}
							startPosition={startPosition}
							responsive={responsive}
						>
							{allServicesName.map((serviceName: any, index: any) => (
								<div
									className={`legal-service ${serviceName.slug === service.slug ? 'active' : ''}`}
									key={index}
								>
									<Link href='/find-a-professional'>
										<Image
											src={getAdminLegalServiceImageSrc(serviceName.icon)}
											width={80}
											height={80}
											alt={serviceName.icon_alt_text}
										/>
										<h3>{serviceName.name}</h3>
									</Link>
								</div>
							))}
						</Slider>
					)}
					<Service data={service} />
					{relatedLawyer.length > 0 ? (
						<div className="needlawyer-text mt-5">
							<h6>TOP Professional experts?</h6>
							<h2 style={{ color: '#000' }}>
								Discover the {' '}
								<span className="needlawyer-text" style={{ color: '#02142d' }}>top {service.name} lawyers in Dubai</span>
							</h2>
						</div>
					) : (
						<></>
					)
					}
					{relatedLawyer && (
						<Slider
							key={relatedLawyer}
							className="mt-5"
							items={4}
							loop={false}
							nav={true}
							responsive={{
								0: {
									items: 1
								},
								600: {
									items: 2
								},
								991: {
									items: 4
								}
							}}
							dots={false}
						>
							{relatedLawyer.map((lawyer: any, index: number) => (
								<LawyerCard ShowLoader={false} lawyer={lawyer} Key={index} />
							))}
						</Slider>
					)}

				</div>
			</div>
			<LegalIssue tags={tags} />
			{serviceBenefits.length > 0 && <HowBenefitsLawyer data={serviceBenefits} />}

			{serviceQa.length > 0 && <GotQuestions data={serviceQa} />}

			<LegalQuetion />

		</>
	);
}
