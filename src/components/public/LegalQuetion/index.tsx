import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';
export default function LegalQuetion() {
	return (
		<>
			<section id="needlawyer" className="getlegal pb-5">
				<div className="container" id="bg-color">
					<div className="row">
						<div className="col-md-6 d-none d-lg-block">
							<div className="needlawyer-text pt-lg-0 pt-4 hover">
								<Image
									src="/images/Home/get-a.png"
									alt="Join Our Professional Forum and Get Expert
Advice for Free"
									height={370}
									width={620}
									layout="responsive"
								/>
							</div>
						</div>
						<div className="col-md-6">
							<div className="needlawyer-text pt-0">
								<h6 className="pt-0">GOT A PROFESSIONAL QUESTION?</h6>
								<h2>
									<span className="span">Join Our Professional Forum and </span>
									Get Expert
									<br /> Advice for Free.
								</h2>
								<p>
									Make an appointment with Advocates and Legal consultancy, Today! or chat with a
									lawyer online for free in Dubai and across UAE now, We work on a wide range of legal
									matters. Our professional services.
								</p>
								<Link href={'/legal-forum'}>
									<button className="w-40 btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2">
										<span className="text-white"> Visit Professional Forum </span>
										<span className="border border-radius-1 banner-arrow-btn">
											<ChevronRightIcon width={20} color={'#fff'} />
										</span>
									</button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
