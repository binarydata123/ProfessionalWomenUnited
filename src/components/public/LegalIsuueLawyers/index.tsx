'use client';
import { PlusSmallIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react';
import { getAllLawyersOrFilter } from '../../../../lib/frontendapi';
import ImagePlaceholder from '@/commonUI/ImagePlaceholder';
import LegalIssueLawyers from '@/components/lawyer/LegalIssueLawyers';

interface Props {
	relatedLawyers?: any;
	service?: string;
}

export default function LegalIsuueLawyers({ relatedLawyers, service = '' }: Props) {
	const [lawyers, setlawyers] = useState<any[]>(relatedLawyers || []);
	const [count, setcount]: any = useState(8);

	const handleLawyers = () => {
		setcount(count + 1);
		const data = {
			p_service_name: service,
			count: count
		};
		if (lawyers.length < 8) {
			data.p_service_name = '';
		}
		getAllLawyersOrFilter(data).then(res => {
			setlawyers(res.data);
		});
	};

	return (
		<section id="silder-section">
			<div className="container">
				<div className="needlawyer-text">
					<h1 className="text-start">
						Top legal experts
						<span className="span">
							{" "}to <br />
							resolve your issue
						</span>
					</h1>
					<p>Choose one to continue</p>
				</div>
				<div className="row">
					{lawyers && lawyers.length > 0 ? (
						lawyers.map((item: any, index: any) => (
							<div className="col-lg-3 col-md-4 col-sm-12">
								<LegalIssueLawyers ContinueButton={true} lawyer={item} Key={index} />
							</div>
						))
					) : (
						<ImagePlaceholder
							showButton={false}
							image={'/images/search-placeholder.png'}
							height={200}
							text="Oops! there is no Lawyer assosiated with this service"
						/>
					)}
				</div>
				<div className="text-center all-btn mt-5 justify-content-center mx-auto d-flex">
					<button
						onClick={handleLawyers}
						className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2"
					>
						<span className="border-radius-1 banner-arrow-btn">
							<PlusSmallIcon width={20} color={'#BE8363'} />
						</span>
						<span>{lawyers && lawyers.length < 8 ? 'See All Professionals' : 'Load More'}</span>
					</button>
				</div>
			</div>
		</section>
	);
}
