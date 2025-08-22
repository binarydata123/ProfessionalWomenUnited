'use client';
import React, { useState, useContext } from 'react';
import './profile.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DefaultButton from '@/commonUI/DefaultButton';
import AuthContext from '@/context/AuthContext';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const { user } = useContext(AuthContext)

	return (
		<>
			<div className="height-fixed1">
				<div className="right-body pb-0 pl-3 pr-4 position-relative">
					<div className="" id="sticky">
						<h4 className="font-xx-large social-link weight-semi-bold">Professional Profile</h4>
						<div className="row">
							<div className="col-sm-9">
								<div className="nav-tab p-set" id="drop-fixed">
									<ul>
										<li className={pathname === '/professional/profile' ? 'active' : ''}>
											<Link aria-current="page" href="/professional/profile">
												Overview
											</Link>
										</li>
										<li
											className={`nav-item dropdown ${pathname === '/professional/profile/edit' ? 'active' : ''
												}`}>
											<Link
												className="nav-link dropdown-toggle"
												href="/professional/profile/edit"
												id="navbarDropdownMenuLink">
												Edit Profile <i className="fa-solid fa-angle-down"></i>
											</Link>
											<ul className="dropdown-menu shadow-lg p-0">
												<li className="active">
													<Link className="dropdown-item actives" href="/professional/profile/edit">
														Basic Information
													</Link>
												</li>
												<li>
													<Link
														className="dropdown-item"
														href="/professional/profile/edit#professional-information">
														Professional Information
													</Link>
												</li>
												<li>
													<Link
														className="dropdown-item"
														href="/professional/profile/edit#practice-area">
														Practice Area
													</Link>
												</li>
												<li>
													<Link className="dropdown-item" href="/professional/profile/edit#rates">
														Rates
													</Link>
												</li>
											</ul>
										</li>
										<li className={pathname === '/professional/profile/reviews' ? 'active' : ''}>
											<Link href="/professional/profile/reviews">Reviews</Link>
										</li>
										{user?.firm_owner == 1 ? (
											<li className={pathname === '/professional/profile/firm-edit' ? 'active' : ''}>
												<Link href="/professional/profile/firm-edit">Edit Firm</Link>
											</li>
										) : null}

									</ul>
								</div>
							</div>
							{/* <div className="col-sm-3 text-right">
            {pathname === '/professional/profile/edit' ?
              <DefaultButton showIcon={false}>Save Changes</DefaultButton>
              : null
            }
          </div> */}
						</div>
					</div>
				</div>
				<div className="">{children}</div>
			</div>
		</>
	);
}
