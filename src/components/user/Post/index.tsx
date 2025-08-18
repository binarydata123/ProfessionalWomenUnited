'use client';
import LinkButton from '@/commonUI/LinkButton';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import {
	IsQuestionLiked,
} from '../../../../lib/enduserapi';
import AuthContext from '@/context/AuthContext';
import { formatDateTime } from '@/app/[locale]/commonfunctions/commonfunctions';

interface Props {
	postdata?: any;
}

export default function Post({ postdata }: Props) {
	const [user_id, setUserId] = useState('');
	const { user } = useContext(AuthContext);
	useEffect(() => {
		user?.id ? setUserId(user?.id) : setUserId('');
		handleIsLiked(postdata.id, user_id);
	}, [user_id]);


	const handleIsLiked = (forum_id = postdata.id, userId: any = user_id) => {
		IsQuestionLiked({ forum_id: forum_id, user_id: userId }).then(res => {
			return res.data[0].is_liked;
		});
	};

	return (
		<div className="recent-reviews pt-2 pb-2 fff">
			<p className="font-small social-link weight-semi-bold">{postdata.question}</p>
			<p className="text-sonic-silver weight-light font-x-small mb-2 pb-3">
				Answered on {formatDateTime(postdata.created_at)}{' '}
			</p>
			<div className="row top-border border-bottom py-2">
				<div className="col-lg-9 col-md-8">
					<div className="pt-2">
						<ul className="like-unlike">
							<li className="like">
								<img src="/images/legal/like.png" className="response-like-icons" alt=" Helpful" />
								Helpful
								<span>
									({postdata.thumbs_up_down ? postdata.thumbs_up_down.split(' / ')[0] : '0'}){' '}
								</span>
							</li>
							<li className="unlike">
								<img src="/images/legal/dislike.png" className="response-like-icons" />
								Not Helpful{' '}
								<span>({postdata.thumbs_up_down ? postdata.thumbs_up_down.split(' / ')[1] : '0'})</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="col-lg-3 col-md-4 text-right">
					<p className="mt-2 m-center">
						<Link href={`/legal-forum/${postdata.service_slug}/${postdata.slug}`}>
							<button className="btn-tertiary  right-icon right-border-icon">
								{' '}
								View Post <LinkButton />{' '}
							</button>
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
