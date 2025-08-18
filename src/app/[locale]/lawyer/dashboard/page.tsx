'use client';
import React, { useContext, useEffect, useState } from 'react';
import LawyerDashboard from '@/components/lawyer/dashboard';
import EmptyState from '@/components/lawyer/dashboard/EmptyState';
import './dash.css';
import { getSingleUserDetails } from '../../../../../lib/frontendapi';
import AuthContext from '@/context/AuthContext';
import { capitalizeFirstWord } from '../../commonfunctions/commonfunctions';

export default function Dashboard() {
	const { user } = useContext(AuthContext)
	const [showFilledState, setshowFilledState] = useState(true);
	const [username, setUserName] = useState('');
	const [planname, setPlanName] = useState('');
	const [plandayleft, setPlanDayleft] = useState<any>('');
	const [viewProfile, setviewProfile] = useState(false);

	const calculateDaysLeft = (targetDate: string) => {
		const today = new Date();
		const target = new Date(targetDate);
		const timeDiff = Number(target) - Number(today); // Explicitly cast to number
		const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
		return daysLeft;
	};

	useEffect(() => {
		if (user) {
			getSingleUserDetailsData(user?.id);
		}
	}, []);

	const getSingleUserDetailsData = async (id: any) => {
		try {
			const res = await getSingleUserDetails(id);
			if (res.status == true) {
				setUserName(res.data.first_name);
				setPlanName(res.plan_name);
				const daysLeft = calculateDaysLeft(res.data.subscription_expiry_date);
				setPlanDayleft(daysLeft);

				const today = new Date();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="lawyer-dashboard-wrapper">
			<div className="right-body">
				<div className="mmm m-top-sp">
					<div className="row">
						<div className="col-lg-12 col-xl-6">
							<h2 className="font-smaller weight-bold social-link">
								{/* Hello  */}
								<span className="green-medium-2"> {capitalizeFirstWord(username)},</span>
							</h2>
							<p className="text-sonic-silver font-medium weight-medium">
								In the last 30 days you had...
							</p>
						</div>
						<div className="col-lg-12 col-xl-6">
							<div className="row justify-content-end">
								<div className="col-sm-9 col-7">
									<p className="green-dark  font-x-small weight-medium mt-3">
										Subscribed to{' '}
										<span className="green-medium-2 weight-bold text-capitalize">
											{' '}
											{planname}
											{/* Firm Focus Plan */}
										</span>
									</p>
									<div className="pag-box mt-2">
										<div className="pag-box mt-2">
											<div className="g-pag-box"></div>
										</div>
									</div>
								</div>

								{/* <div className="col-sm-3 col-5 text-right">
                    <button className="btn-primary w-100 b-r-100 mt-2 m-pad-min" onClick={()=>setviewProfile(true)}>
                      {' '}
                      Upgrade
                    </button>
                  </div> */}
							</div>
						</div>
					</div>

					{showFilledState ? <LawyerDashboard /> : <EmptyState />}
				</div>
			</div>
		</div>
	);
}
