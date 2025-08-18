import { formatDateToDDMMYYYY } from '@/app/[locale]/commonfunctions/commonfunctions';
import LinkButton from '@/commonUI/LinkButton';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
	index?: number;
	item?: any;
}

export default function Post({ index = 0, item = 0 }: Props) {
	return (
		<div className="recent-reviews mt-4 fff">
			<p className="font-small social-link weight-semi-bold">{item.question}</p>
			<p className="text-sonic-silver weight-light font-x-small mb-2">
				Answered on • {formatDateToDDMMYYYY(item.datetime)}{' '}
			</p>
			<div className="row top-border">
				<div className="col-lg-9 col-md-8">
					<div className=" pt-2">
						<ul className="like-unlike">
							<li className="like">
								<Image src="/images/like.png" alt="user-img" width={22} height={22} />
								Helpful <span>({item.thumbs_up})</span>
							</li>
							<li className="unlike">
								<Image src="/images/un-like.png" alt="user-img" width={22} height={22} />
								Not Helpful <span>({item.thumbs_down})</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="col-lg-3 col-md-4 text-right">
					<LinkButton>
						<Link href={`/legal-forum/${item.service_slug}/${item.slug}`} className="link-color">
							View post
						</Link>
					</LinkButton>
				</div>
			</div>
		</div>
	);
}
