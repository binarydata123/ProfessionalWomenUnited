import Image from 'next/image';
import React, {useCallback, useState} from 'react';

interface ViewProfileProps {
	laywerData: {
		full_name: string;
		location_name: any;
		phone_number: any;
		email: any;
		gender: any;
		profile_image: string | null;
		profile_image_alt_text: string;
	};
}
export default function ViewProfile({laywerData}: ViewProfileProps) {
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

	const profileImageSrc = laywerData.profile_image
		? '/images/profile/' + laywerData.profile_image
		: laywerData.gender === 'male'
		  ? '/images/default/group-243.png'
		  : laywerData.gender === 'female'
		    ? '/images/default/group-242.png'
		    : '/images/default/group-243.png';

	return (
		<div className="view-profile-wrapper">
			<Image
				src={process.env.NEXT_PUBLIC_IMAGE_URL + profileImageSrc}
				alt="profile-circle"
				width={80}
				height={80}
				style={{borderRadius: '50px'}}
			/>

			<h5 className="modal-title f-22 weight-bold green-dark mt-2" id="exampleModalLabel">
				{laywerData.full_name}
			</h5>
			<p className="weight-medium font-small color-light">{laywerData.location_name}</p>

			<p className="text-sonic-silver weight-medium font-x-small color-light mt-3">Email ID</p>
			<p className="weight-light font-small color-light">
				<a className="weight-light font-small color-light" href={`mailto:${laywerData.email}`}>
					{laywerData.email}
				</a>{' '}
				&nbsp;
				<Image
					src={copyStatus.email ? '/images/aftercopy.png' : '/images/copy.png'}
					alt="copy"
					data-copy-type="email"
					width={20}
					height={20}
					onClick={() => handleCopyToClipboard(laywerData.email, 'email')}
					style={{
						cursor: 'pointer'
					}}
				/>
			</p>

			{laywerData.phone_number && (
				<div>
					<p className="text-sonic-silver weight-medium font-x-small color-light mt-3">Contact Number</p>
					<p className="weight-light font-small color-light">
						<a className="weight-light font-small color-light" href={`tel:${laywerData.phone_number}`}>
							{laywerData.phone_number}
						</a>{' '}
						&nbsp;
						<Image
							src={copyStatus.phone ? '/images/aftercopy.png' : '/images/copy.png'}
							alt="copy"
							data-copy-type="email"
							width={20}
							height={20}
							onClick={() => handleCopyToClipboard(laywerData.phone_number, 'phone')}
							style={{
								cursor: 'pointer'
							}}
						/>
					</p>
				</div>
			)}

			{laywerData.gender && (
				<div>
					<p className="text-sonic-silver weight-medium font-x-small color-light mt-3">Gender</p>
					<p className="weight-light font-small color-light">{laywerData.gender}</p>
				</div>
			)}
		</div>
	);
}
