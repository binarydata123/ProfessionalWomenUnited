'use client';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { getLawyerContributionData, updatelegalForumResponseStatus } from '../../../../../../../../lib/adminapi';
import { toast } from 'react-toastify';
import Image from 'next/image';
import AuthContext from '@/context/AuthContext';
import { formatDateLegalDate } from '@/app/[locale]/commonfunctions/commonfunctions';

export default function Page({ params }: { params: { id: string } }) {
	const { user } = useContext(AuthContext)
	const [user_id, setUserId] = useState('');
	const [lawyerContribution, setLawywerContribution] = useState<any[]>([]);

	useEffect(() => {
		if (user) {
			user?.id ? setUserId(user?.id) : setUserId('');
			fetchLawyerContributionData(user?.id, params.id);
		}
	}, []);

	const fetchLawyerContributionData = async (userId: any, lawyerId: string) => {
		try {
			const res = await getLawyerContributionData(userId, lawyerId);
			if (res.status == true) {
				setLawywerContribution(res.data);
			} else {
			}
		} catch (err) {
			console.log(err);
		}
	};

	const changeResponseStatus = (id: any, updated_status: any) => {
		try {
			const data = {
				id: id,
				user_id: user_id,
				status: updated_status
			};

			updatelegalForumResponseStatus(data)
				.then(res => {
					if (res.status == true) {
						fetchLawyerContributionData(user_id, params.id);

						if (updated_status == 'active') {
							toast.success('Reponse comment verified successfully');
						} else {
							toast.success('Reponse comment hide successfully');
						}
					} else {
						console.error('An error occurred');
					}
				})
				.catch(err => {
					if (err.response) {
						console.error('An error occurred');
					}
				});
		} catch (error) {
			console.error(error);
		}
	};

	const ViewPublicPost = (slug: any, legal_slug: any) => {
		if (slug == null) {
			toast.info('Please first assign a service to the questions');
		} else {
			window.open(`/legal-forum/${slug}/${legal_slug}`, '_blank');
		}
	};

	return (
		<div>
			<div className="right-body">
				<Link href={'/admin/content-mgmt/legal-forum/lawyer-contributions'}>
					<p className="font-small weight-semi-bold boysenberry">
						<i className="fa-solid fa-arrow-left-long"></i>&nbsp; Back
					</p>
				</Link>

				{lawyerContribution.length > 0 ? (
					lawyerContribution.map((response, index) => (
						<div key={index}>
							<p className="font-small weight-bold social-link mt-3 mb-2">{response.question}</p>
							<p className="font-x-small weight-medium social-link">
								Post from:{' '}
								<span className="color-208C84 weight-bold text-capitalize">{response.full_name} </span>{' '}
								on
								<span className="mx-1">{formatDateLegalDate(response.question_create_date)}</span>
							</p>
							<p className="social-link weight-medium font-x-small mt-3">
								{formatDateLegalDate(response.created_at)}{' '}
								{response.status == 'active' ? (
									<button
										className="monthly mx-2"
										style={{ color: '#02142d', backgroundColor: '#c490731F' }}
									>
										Verified
									</button>
								) : response.status == 'pending' ? (
									<button
										className="monthly mx-2"
										style={{ color: '#F79E1B', backgroundColor: '#FFAC331F' }}
									>
										Pending
									</button>
								) : (
									<button
										className="monthly mx-2"
										style={{ color: '#D04E4F', backgroundColor: '#D04E4F1F' }}
									>
										Hide
									</button>
								)}
							</p>

							<p className="font-x-small text-sonic-silver weight-light mt-2">{response.message}</p>
							<div className="row">
								<div className="col-sm-9">
									<label className="main social-link font-small weight-medium mt-2">
										<input
											type="checkbox"
											checked={response.status == 'deactive'}
											value="deactive"
											onChange={() => changeResponseStatus(response.id, 'deactive')}
										/>
										<span className="geekmark"></span>
										Hide Comment
									</label>
								</div>
								<div className="col-sm-3 text-right">
									<label className="main social-link font-small weight-medium mt-2">
										<input
											type="checkbox"
											checked={response.status == 'active'}
											value="active"
											onChange={() => changeResponseStatus(response.id, 'active')}
										/>
										<span className="geekmark"></span>
										Mark as Verified
									</label>
								</div>
							</div>

							<div className="row top-border pt-2 mb-4">
								<div className="col-lg-9 col-md-8">
									<div className=" pt-2">
										<ul className="like-unlike">
											<li className="like">
												<Image src="/images/like.png" alt="user-img" width={22} height={22} />
												Helpful <span>( {response.thumbs_up})</span>
											</li>
											<li className="unlike">
												<Image
													src="/images/un-like.png"
													alt="user-img"
													width={22}
													height={22}
												/>
												Not Helpful <span>( {response.thumbs_down})</span>
											</li>
										</ul>
									</div>
								</div>
								<div className="col-lg-3 col-md-4 text-right">
									<button
										className="btn-tertiary right-icon right-border-icon"
										onClick={e => ViewPublicPost(response?.service_slug, response?.legal_slug)}
									>
										{' '}
										View Post<i className="fa-solid fa-angle-right"></i>{' '}
									</button>
								</div>
							</div>
						</div>
					))
				) : (
					<p className="mt-2">No lawyer responses data found.</p>
				)}
			</div>
		</div>
	);
}
