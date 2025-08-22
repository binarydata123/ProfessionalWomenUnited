import React from 'react';
import './footer.css';
import Image from 'next/image';
import Link from 'next/link';
export default function Footer() {
	return (
		<footer className="ft-part fixed-footer mt-5 ">
			<div className="container">
				<div className="row">
					<div className="col-md-3 m-center">
						<Link className="navbar-brand" href="#">
							<Image src="/images/off-logo.png" alt="round-user" width={200} height={30} />
						</Link>
					</div>
					<div className="col-md-9 m-center">
						<ul className="list-footer">
							<li>
								<Link href="/" target="blank">
									Home
								</Link>
							</li>
							<li>
								<Link href="/find-a-professional" target="blank">
									Find A Professional
								</Link>
							</li>
							<li>
								<Link href="/legal-services/banking" target="blank">
									professional services
								</Link>
							</li>
							<li>
								<Link href="/legal-forum" target="blank">
									Legal Forum
								</Link>
							</li>
							<li>
								<Link href="/blogs" target="blank">
									Insights
								</Link>
							</li>
							<li>
								<Link href="/about-us" target="blank">
									About
								</Link>
							</li>
							<li>
								<Link href="/contact-us" target="blank">
									Contact
								</Link>
							</li>
							<li>
								<Link href="/auth/choose-profile" target="blank">
									For Professionals
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className="chevron">
					<hr className="line" />
					<Link href="#">
						{' '}
						<i className="fa-solid fa-circle-chevron-up dask-none"></i>
					</Link>
				</div>

				<div className="row mb-3 m-center">
					<div className="col-md-3">
						<p className="link-part">
							<Link href="#">
								<i className="fa-brands fa-facebook-f" />
							</Link>
							<Link href="#">
								<i className="fa-brands fa-instagram" />
							</Link>
							<Link href="#">
								<i className="fa-brands fa-linkedin" />
							</Link>
						</p>
					</div>
					<div className="col-md-9 text-right m-center">
						<p className="copy-right text-sonic-silver  font-x-small weight-light">
							© 2024 Proudly Powered by Professional Women United
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
