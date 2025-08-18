'use client';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import './legal-questions.css';
import { usePathname } from 'next/navigation';
import ImagePlaceholder from '@/commonUI/ImagePlaceholder';
import { getUserAllPost } from '../../../../../lib/enduserapi';
import AuthContext from '@/context/AuthContext';

export default function LegalCommunityLayout({ children }: { children: React.ReactNode }) {
	const { user } = useContext(AuthContext)
	const pathname = usePathname();

	const [showFilledState, setshowFilledState] = useState(true);

	const [user_id, setUserId] = useState('');
	const [post, setAllPost]: any = useState([]);

	useEffect(() => {
		if (user) {
			user?.id ? setUserId(user?.id) : setUserId('');
			getAllPostData(user?.id);
		}
	}, []);

	const getAllPostData = async (user_id: any) => {
		try {
			const res = await getUserAllPost({ memberId: user_id });
			if (res.status === true) {
				setAllPost(res.data);
			}
		} catch (error) {
			console.error('Error fetching forum count:', error);
		}
	};

	return (
		<div>
			<div className="right-body pb-0">
				<div id="sticky">
					<h4 className="font-xx-large social-link weight-semi-bold">Legal Questions</h4>
					<div className="nav-tab p-set mb-1 d-flex justify-content-between">
						<ul>
							<li className={`${pathname === '/user/legal-questions' ? 'active' : ''}`}>
								<Link aria-current="page" href="/user/legal-questions">
									Overview
								</Link>
							</li>
							<li className={`${pathname === '/user/legal-questions/posts' ? 'active' : ''}`}>
								<Link href="/user/legal-questions/posts">Posts ({post.length})</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="height-fixed1">
				<div className="">
					{showFilledState ? (
						children
					) : (
						<ImagePlaceholder
							height={400}
							image={'/images/review-placeholder.png'}
							buttonText="Go to Legal Forum"
							text="You don’t have any contributions."
						/>
					)}
				</div>
			</div>
		</div>
	);
}
