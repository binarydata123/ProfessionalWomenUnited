import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { formatDateToDDMMYYYYMM } from '@/app/[locale]/commonfunctions/commonfunctions';

export default function LawyerInfo(props: any) {
	const lawyer_info = props.lawyerInfo;

	const [showMore, setShowMore] = useState(false);
	const toggleShowMore = () => setShowMore(!showMore);

	const currentYear = new Date().getFullYear();

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

	return (
		<div className="lawyer-info-wrapper">
			{/* <div className="row">
        <div className="col-sm-8 col-5">
          <h5 className="modal-title f-22 weight-bold  green-dark">About</h5>
        </div>
        <div className="col-sm-4 col-7 text-right">
          <p>
            <a
              className="boysenberry font-small weight-semi-bold "
              target="_blank"
              href={`/find-a-lawyer/${lawyer_info.slug}`}>
              View Public Profile{' '}
              <i className="fa-solid fa-angle-right box-right icon-size-10"></i>
            </a>
          </p>
        </div>
      </div> */}

			<div className="row">
				<div className="col-sm-5">
					<p className="weight-medium font-medium green-medium-2 mt-3">Email ID</p>
					<p className="weight-light font-small color-light">
						<a className="weight-light font-small color-light" href={`mailto:${lawyer_info.email}`}>
							{lawyer_info.email}
						</a>{' '}
						&nbsp;
						<Image
							src={copyStatus.email ? '/images/aftercopy.png' : '/images/copy.png'}
							alt="copy"
							data-copy-type="email"
							width={20}
							height={20}
							onClick={() => handleCopyToClipboard(lawyer_info.email, 'email')}
							style={{
								cursor: 'pointer'
							}}
						/>
					</p>
				</div>
				<div className="col-sm-5">
					<p className="weight-medium font-medium green-medium-2 mt-3">Contact Number</p>
					<p className="weight-light font-small color-light">
						<a className="weight-light font-small color-light" href={`tel:${lawyer_info.phone_number}`}>
							{lawyer_info.phone_number}
						</a>{' '}
						&nbsp;
						<Image
							src={copyStatus.phone ? '/images/aftercopy.png' : '/images/copy.png'}
							alt="copy"
							data-copy-type="email"
							width={20}
							height={20}
							onClick={() => handleCopyToClipboard(lawyer_info.phone_number, 'phone')}
							style={{
								cursor: 'pointer'
							}}
						/>
					</p>
				</div>
			</div>

			{lawyer_info.gender && (
				<>
					<p className="weight-medium font-medium green-medium-2 mt-3">Gender</p>
					<p className="weight-light font-small color-light">{lawyer_info.gender}</p>
				</>
			)}

			{lawyer_info.linkedin_url && (
				<p className="weight-medium font-medium green-medium-2 mt-3">
					<a href={lawyer_info.linkedin_url} target="_blank" className="green-medium-2" rel="noreferrer">
						<i className="fa-brands fa-linkedin-in box-right icon-size-min"></i>{' '}
					</a>
				</p>
			)}

			<div className="row mb-4">
				<div className="col-sm-5">
					<p className="weight-medium font-medium green-medium-2 mt-3">License Number:</p>
					<p className="weight-light font-small color-light">{lawyer_info.license_number}</p>
				</div>
				<div className="col-sm-5">
					<p className="weight-medium font-medium green-medium-2 mt-3">Legal Jurisdiction:</p>
					{lawyer_info.phone_number && (
						<p className="weight-light font-small color-light">{lawyer_info.jurisdiction_name}</p>
					)}
				</div>
			</div>

			{lawyer_info?.acquired && currentYear - lawyer_info?.acquired > 0 && (
				<p className="weight-medium font-medium text-sonic-silver mt-3">
					Licensed for {currentYear - lawyer_info?.acquired} years
				</p>
			)}

			<div className="row">
				<div className="col-sm-10">
					<div className="card-acquired mt-2">
						<div className="row">
							{lawyer_info?.acquired && currentYear - lawyer_info?.acquired > 0 && (
								<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
									<p className="font-x-small text-sonic-silver weight-light">Acquired</p>
									<p className="font-medium  weight-medium text-sonic-silver mt-2">
										{lawyer_info?.acquired}
									</p>
								</div>
							)}

							{lawyer_info?.location_name && (
								<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
									<p className="font-x-small text-sonic-silver weight-light">Location</p>
									<p className="font-medium  weight-medium text-sonic-silver mt-2">
										{lawyer_info?.location_name}
									</p>
								</div>
							)}

							{lawyer_info?.status && (
								<div className="col-lg-3 col-md-6 col-6 mb-2 mt-2">
									<p className="font-x-small text-sonic-silver weight-light">Location</p>
									<p className="font-medium  weight-medium text-sonic-silver mt-2">
										{lawyer_info?.status}
									</p>
								</div>
							)}

							{lawyer_info?.updated_at && (
								<div className="col-lg-6 col-md-6 col-6 mb-2 mt-2">
									<p className="font-x-small text-sonic-silver weight-light">Updated</p>
									<p className="font-medium  weight-medium text-sonic-silver mt-2">
										{formatDateToDDMMYYYYMM(lawyer_info?.updated_at)}
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
