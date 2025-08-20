import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAdminLegalServiceImageSrc } from '@/app/[locale]/commonfunctions/commonfunctions';

interface Props {
	data?: any;
}

export default function Service({ data }: Props) {
	return (
		<>
			<div className="banking-law" id="banking-law">
				<div className="container">
					<div className="row align-items-center g-3">
						<div className="col-lg-6">
							<div className="bank-law">
								<h2>{data.name} </h2>
								<p>{data.description}</p>
								<Link href={'/find-a-professional'}>
									<button className="btn-commn mt-5">Find A Professional</button>
								</Link>
							</div>
						</div>
						<div className="col-lg-6">
							<div>
								<Image
									src={getAdminLegalServiceImageSrc(data.image)}
									width={530}
									height={350}
									alt={data.image_alt_text}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
