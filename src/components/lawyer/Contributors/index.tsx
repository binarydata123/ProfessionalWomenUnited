import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { getLawyerImageSrc70x70 } from '@/app/[locale]/commonfunctions/commonfunctions';

interface Props {
	index?: number;
	item?: any;
}

export default function Contributors({ index = 0, item = 0 }: Props) {
	return (
		<div className="card-notifaction mt-2">
			<Link href={`/find-a-lawyer/${item.slug}`}>
				<div className="row align-items-center">
					<div className="col-2">
						<p className="font-small weight-bold text-dark text-end">#{index + 1}</p>
					</div>
					<div className="col-7">
						<div className="row align-items-center">
							<div className="col p-0">
								<Image
									// src="/images/user-img.png"
									src={getLawyerImageSrc70x70(item.profile_image, item.gender)}
									alt="user-img"
									width={40}
									height={40}
									style={{ borderRadius: '40px' }}
								/>
							</div>
							<div className="col-9">
								<div className="name-location">
									<OverlayTrigger
										placement="top"
										overlay={<Tooltip id="tooltip-top" className="in custom-tooltip-class text-capitalize">{item.full_name}</Tooltip>}>
										<span className="font-x-small weight-semi-bold social-link ">{item.full_name}</span>
									</OverlayTrigger>
									<p className="social-link weight-light font-small-12">{item.service_name}</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-3 text-right pl-0">
						<p className="green-medium-2 weight-semi-bold font-medium">{item.message_count}</p>
					</div>
				</div>
			</Link>
		</div>
	);
}
