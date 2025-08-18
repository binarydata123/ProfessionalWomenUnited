import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '@/context/AuthContext';

export default function ReviewSubmitted() {
	const { user } = useContext(AuthContext)
	const [userRole, setuserRole] = useState('');

	useEffect(() => {
		if (user) {
			user?.role
				? setuserRole(user?.role == 'enduser' ? 'user' : user?.role)
				: setuserRole('');
		}
	}, []);

	return (
		<div className="review-submitted-modal">
			<div className="text-center thank-you">
				<Image src="/images/profile/submit.png" width={80} height={80} alt="Thank You!" />
				<h6>
					<span>Thank You!</span> Your review <br /> was submitted.
				</h6>
				<div className="footer-btn">
					<button className="w-100 btn-commn mb-1">
						<Link href={`/${userRole}/dashboard`} style={{ color: '#fff' }}>
							Go to Dashboard
						</Link>
					</button>
					<button className=" w-100 btn-commn bg-remove">
						<Link href="/">Go Home</Link>
					</button>
				</div>
			</div>
		</div>
	);
}
