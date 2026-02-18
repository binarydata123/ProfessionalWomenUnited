import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './view-profile.css';

interface ViewProfileProps {
	userData: {
		full_name: string;
		location_name: any;
		phone_number: any;
		email: any;
		gender: any;
		profile_image: string | null;
		profile_image_alt_text: string;
	};
}
export default function ViewProfile({ userData }: ViewProfileProps) {
	const [copyStatus, setCopyStatus] = useState({
		email: false,
		phone: false
	});
	const handleCopyToClipboard = useCallback((value: string, copyType: string) => {
		const tempInput = document.createElement('input');
		tempInput.value = value;
		document.body.appendChild(tempInput);
		tempInput.select();
		document.execCommand('copy');
		document.body.removeChild(tempInput);
		setCopyStatus((prevStatus: any) => ({
			...prevStatus,
			[copyType]: true
		}));
	}, []);

	const profileImageSrc = userData.profile_image
		? '/images/profile/' + userData.profile_image
		: userData.gender === 'male'
			? '/images/default/group-242.png'
			: userData.gender === 'female'
				? '/images/default/group-242.png'
				: '/images/default/group-242.png';

	return (
		<div className="view-profile-wrapper">
			{/* <Image
				src={process.env.NEXT_PUBLIC_IMAGE_URL + profileImageSrc}
				// src="/images/Profile-Avatar2.png"
				alt="profile-circle"
				width={80}
				height={80}
				style={{borderRadius: '50px'}}
			/> */}

			<h5 className="modal-title f-22 weight-bold green-dark mt-2" id="exampleModalLabel">
				{userData.full_name}
			</h5>
			<p className="weight-medium font-small color-light">{userData.location_name}</p>

			<p className="text-sonic-silver weight-medium font-x-small color-light mt-3">Email ID</p>
			<p className="weight-light font-small color-light">
				<a className="weight-light font-small color-light" href={`mailto:${userData.email}`}>
					{userData.email}
				</a>{' '}
				&nbsp;
				<Image
					src={copyStatus.email ? '/images/aftercopy.png' : '/images/copy.png'}
					alt="copy"
					data-copy-type="email"
					width={20}
					height={20}
					onClick={() => handleCopyToClipboard(userData.email, 'email')}
					style={{
						cursor: 'pointer'
					}}
				/>
			</p>

			{userData.phone_number && (
				<div>
					<p className="text-sonic-silver weight-medium font-x-small color-light mt-3">Contact Number</p>
					<p className="weight-light font-small color-light">
						<a className="weight-light font-small color-light" href={`tel:${userData.phone_number}`}>
							{userData.phone_number}
						</a>{' '}
						&nbsp;
						<Image
							src={copyStatus.phone ? '/images/aftercopy.png' : '/images/copy.png'}
							alt="copy"
							data-copy-type="email"
							width={20}
							height={20}
							onClick={() => handleCopyToClipboard(userData.phone_number, 'phone')}
							style={{
								cursor: 'pointer'
							}}
						/>
					</p>
				</div>
			)}

			{userData.gender && (
				<div>
					<p className="text-sonic-silver weight-medium font-x-small color-light mt-3">Gender</p>
					<p className="weight-light font-small color-light">{userData.gender}</p>
				</div>
			)}
			{/* <div className="">
          <Button
              type="submit"
              className=" text-white text-center mt-2 mx-2 border-1 p-0 border-add-class">
              {'Report'}
            </Button>
            <Button
              type="submit"
              className=" text-white border-add-clas-bg mt-2">
              {'Message'}
            </Button>
          </div> */}
		</div>
	);
}
