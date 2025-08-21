'use client';
import Link from 'next/link';
import React, { useState, useEffect, useContext } from 'react';
import LinkButton from '@/commonUI/LinkButton';
import DefaultButton from '@/commonUI/DefaultButton';
import CountCard from '@/components/common/CountCard';
import { getProfileOverview, getProfileDetails } from '../../../../../lib/lawyerapi';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import AuthContext from '@/context/AuthContext';

interface lawyerDetails {
	bio: any;
	specializ_name: any;
	acquired: any;
	location_name: any;
	status: any;
	updated_at: any;
	license_for_years: any;
	hourly_rate_range: any;
	payment_method: any;
	linkedin_url: any;
	slug: any;
	jurisdiction_name: any;
	profile_status: any;
}

export default function Profile() {
	const { user } = useContext(AuthContext)
	const [selectedValue, setSelectedValue] = useState('all_time');
	const [user_id, setUserId] = useState('');
	const [profileViewCount, setProfileViewCount] = useState<number>(0);
	const [reviewCount, setReviewCount] = useState<number>(0);
	const [inquiresCount, setInquiresCount] = useState<number>(0);
	const [lawyerDetails, setLawyerDetails] = useState<lawyerDetails | null>(null);
	const [showMore, setShowMore] = useState(false);

	const toggleShowMore = () => setShowMore(!showMore);

	useEffect(() => {
		user?.id ? setUserId(user?.id) : setUserId('');
		fetchProfileOverview(user?.id, selectedValue);
		fetchProfileDetails(user?.id);
	}, []);

	const handleDropdownChange = (event: any) => {
		const selectedValue = event.target.getAttribute('data-value');
		setSelectedValue(selectedValue);
		fetchProfileOverview(user_id, selectedValue);
	};

	const fetchProfileOverview = async (user_id: any, timestamp: string) => {
		try {
			const res = await getProfileOverview(user_id, timestamp);
			if (res.status == true) {
				setProfileViewCount(res.profileCount);
				setReviewCount(res.reviewCount);
				setInquiresCount(res.inquiryCount);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const fetchProfileDetails = async (user_id: any) => {
		try {
			const res = await getProfileDetails(user_id);
			if (res.status == true) {
				setLawyerDetails(res.data[0]);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const capitalizeFirstLetter = (string: string) => {
		if (!string) {
			return '';
		}

		const words = string.split(',').map(word => {
			const trimmedWord = word.trim();
			return trimmedWord.charAt(0).toUpperCase() + trimmedWord.slice(1);
		});

		return words.join(', ');
	};

	return (
		<div className="lawyer-profile-wrapper">
			<div className="right-body bg-profile">
				<div className="row">
					<div className="col-6">
						<h4 className="font-x-large green-dark weight-bold mt-2">Profile Insights</h4>
					</div>
					<div className="col-6 text-right pl-0">
						<div className="dropdown down-btn">
							<span className="font-x-small text-sonic-silver weight-bold">Show</span> &nbsp;
							<button
								className="btn btn-secondary dropdown-toggle bg-white"
								type="button"
								id="dropdownMenuButton1"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								{capitalizeFirstLetter(selectedValue.replace(/_/g, ' '))} &nbsp;{' '}
								<i className="fa-solid fa-angle-down"></i>
							</button>
							<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
								<li onClick={handleDropdownChange}>
									<Link className="dropdown-item" data-value="last_30_days" href="">
										Last 30 days
									</Link>
								</li>
								<li onClick={handleDropdownChange}>
									<Link className="dropdown-item" data-value="last_90_days" href="">
										Last 90 days
									</Link>
								</li>
								<li onClick={handleDropdownChange}>
									<Link className="dropdown-item" data-value="all_time" href="">
										All time
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div className="row mt-2">
					<div className="col-sm-4 col-6 mb-3">
						<CountCard
							countColor={'#c49073'}
							href="/lawyer/profile"
							linkColor="#BE8363"
							backgroundImage="/images/white-dash-card-1.JPG"
							linkText="Profile Views"
							count={profileViewCount}
						/>
					</div>
					<div className="col-sm-4 col-6 mb-3">
						<CountCard
							countColor={'#c49073'}
							href="/lawyer/profile/reviews"
							linkColor="#BE8363"
							backgroundImage="/images/white-dash-card-2.JPG"
							linkText="Reviews"
							count={reviewCount}
						/>
					</div>
					<div className="col-sm-4 col-12">
						<CountCard
							countColor={'#c49073'}
							href="/lawyer/inquiries"
							linkColor="#BE8363"
							backgroundImage="/images/white-dash-card-3.JPG"
							linkText="Inquiries"
							count={inquiresCount}
						/>
					</div>
				</div>
			</div>
			{lawyerDetails?.profile_status !== 'completed' ? (
				<div className="complete-profile-wrapper right-body mt-1">
					<div className="top-title d-flex justify-content-between">
						<div className="left-content">
							<h1>Complete your profile to start connecting with clients... </h1>
							<p>Completing your profile allows you to stand out to your clients.</p>
						</div>
						<button className="btn-primary-small right-icon right-border-icon">
							{' '}
							Complete Profile <ChevronRightIcon width={20} height={20} />{' '}
						</button>
					</div>
				</div>
			) : null}
			<div className="right-body">
				<div className="row mb-3">
					<div className="col-6">
						<h5 className="font-x-large22 weight-bold green-dark">About</h5>
					</div>
					<div className="col-6 text-right">
						<Link target="_blank" href={`/find-a-professional/${lawyerDetails?.slug}`}>
							<LinkButton>View Public Profile</LinkButton>
						</Link>
					</div>
				</div>
				<p className="datail-item pb-3">
					{lawyerDetails?.linkedin_url ? (
						<Link
							target="_blank"
							href={lawyerDetails.linkedin_url}
							className={1 === 1 ? 'text-secondary' : 'text-light-green'}
						>
							<p className="d-flex align-items-center" style={{ color: '#02142d' }}>
								<img width={25} src="/images/Blogs/iconoir_linkedin.svg" alt="View Public Profile" />
								<span className="mx-2">LinkedIn</span>
							</p>
						</Link>
					) : (
						<Link target="" href="#" className={1 === 1 ? 'text-secondary' : 'text-light-green'}>
							<p className="d-flex align-items-center" style={{ color: '#02142d' }}>
								<img width={25} src="/images/Blogs/iconoir_linkedin.svg" alt="View Public Profile" />
								<span className="mx-2">LinkedIn</span>
							</p>
						</Link>
					)}
				</p>

				{/* <p className="text-sonic-silver d-flex align-items-center">
					<Link href="" className="green-medium-2  font-medium d-flex align-items-center">
						<img width={27} src={'/icon/map.svg'} alt={'xyz'} />{' '}
						<span className="mx-2">Legal Jurisdiction:-</span>
					</Link>{' '}
					{lawyerDetails?.jurisdiction_name || ' '}
					{lawyerDetails?.jurisdiction_name ? lawyerDetails.jurisdiction_name.split(',')[0] : ' '}
				</p> */}

				<p className="font-medium  weight-medium text-sonic-silver mt-2"> Specializes In: </p>
				<p className="font-small  weight-light text-sonic-silver">{lawyerDetails?.specializ_name || '-'}</p>

				<p className="font-medium  weight-medium text-sonic-silver mt-2"> Bio: </p>
				{/* <p className="font-small  weight-light text-sonic-silver">{lawyerDetails?.bio || '-'}</p> */}
				{/* <p className="font-small weight-light text-sonic-silver">{lawyerDetails?.bio ? <div dangerouslySetInnerHTML={{ __html: lawyerDetails.bio }} /> : '-'}</p> */}
				{/* <p>
					<Link href="#" className="green-medium-2  font-x-small weight-semi-bold">
						{' '}
						Show More
					</Link>
				</p> */}
				{showMore ? (
					<>
						{lawyerDetails?.bio ? <div dangerouslySetInnerHTML={{ __html: lawyerDetails.bio }} /> : '-'}
						<a
							href="JavaScript:void(0)"
							onClick={toggleShowMore}
							className="green-medium-2 font-x-small weight-semi-bold"
						>
							Show Less
						</a>
					</>
				) : (
					<>
						<div dangerouslySetInnerHTML={{ __html: lawyerDetails?.bio?.substring(0, 500) }} />
						<a
							href="JavaScript:void(0)"
							onClick={toggleShowMore}
							className="green-medium-2 font-x-small weight-semi-bold"
						>
							Show More
						</a>
					</>
				)}

				<p className="font-medium  weight-medium text-sonic-silver mt-2">
					{' '}
					Licensed for {lawyerDetails?.license_for_years || ''} years:{' '}
				</p>

				<div className="row">
					<div className="col-sm-7">
						<div className="card-acquired mt-2">
							<div className="row">
								<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
									<p className="font-x-small text-sonic-silver weight-light">Acquired</p>
									<p className="font-medium  weight-medium text-sonic-silver mt-2">
										{lawyerDetails?.acquired || ''}{' '}
									</p>
								</div>
								<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
									<p className="font-x-small text-sonic-silver weight-light">Location</p>
									<p className="font-medium  weight-medium text-sonic-silver mt-2">
										{lawyerDetails?.location_name || ' '}{' '}
									</p>
								</div>
								<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
									<p className="font-x-small text-sonic-silver weight-light">Status</p>
									<p className="font-medium  weight-medium green-medium-2 mt-2">
										{lawyerDetails?.status || ''}
									</p>
								</div>
								<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
									<p className="font-x-small text-sonic-silver weight-light">Updated</p>
									<p className="font-medium  weight-medium text-sonic-silver mt-2">
										{lawyerDetails?.updated_at ? lawyerDetails.updated_at.split(' ')[0] : ''}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<br />

				<h5 className="font-x-large22 weight-bold green-dark">Cost</h5>
				<p className="font-small  weight-light text-sonic-silver mt-1 mb-1">Hourly Rates</p>
				{lawyerDetails?.hourly_rate_range ? (
					<p className="font-large weight-bold green-medium-2">USD {lawyerDetails?.hourly_rate_range}/hr</p>
				) : (
					'-'
				)}

				<p className="font-small  weight-light text-sonic-silver mt-2 mb-1">Payment Methods</p>
				{lawyerDetails?.payment_method ? (
					<p className="font-large weight-bold green-medium-2">
						{capitalizeFirstLetter(lawyerDetails?.payment_method)}
					</p>
				) : (
					'-'
				)}
			</div>
		</div>
	);
}
