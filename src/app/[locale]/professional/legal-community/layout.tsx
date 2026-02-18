'use client';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getAllContributions } from '../../../../../lib/lawyerapi';
import AuthContext from '@/context/AuthContext';

export default function LegalCommunityLayout({ children }: { children: React.ReactNode }) {
	const { user } = useContext(AuthContext);
	const [allContributionCount, setAllContributionCount] = useState<number>(0);
	const pathname = usePathname();

	useEffect(() => {
		fetchAllContributionCount(user?.id, 'newly');
	}, []);

	const fetchAllContributionCount = async (user_id: any, sortby: string) => {
		try {
			const response = await getAllContributions(user_id, sortby);
			setAllContributionCount(response.data.length);
		} catch (error) {
			console.error('Error in fetching top contributors:', error);
		}
	};

	const formattedCount =
		allContributionCount < 10 && allContributionCount >= 0
			? `0${allContributionCount}`
			: allContributionCount.toString();

	return (
		<section className="lawyer-leagal-community-wrapper">
			<div className="right-body">
				<div className="height-h class-add">
					<div id="sticky">
						<h4 className="font-xx-large social-link mb-3 weight-semi-bold pt-md-5 mt-3">
							professional community
						</h4>
						<div className="row mb-1">
							<div className="col-sm-12">
								<div className="nav-tab p-set">
									<ul>
										<li className={pathname === '/professional/legal-community' ? 'active' : ''}>
											<Link href="/professional/legal-community">Overview</Link>
										</li>
										<li
											className={
												pathname === '/professional/legal-community/contribution' ? 'active' : ''
											}
										>
											<Link href="/professional/legal-community/contribution">
												Contributions ({formattedCount})
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-2">{children}</div>
				</div>
			</div>
		</section>
	);
}
