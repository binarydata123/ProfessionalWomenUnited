'use client';
import React, { useState, useEffect, useContext, useRef } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';



export default function MenuAllLawyer({ onclose }: any) {
	const t = useTranslations('menupage');

	return (
		<>


			<div
				id="collapseTwo"
				className="accordion-collapse collapse"
				data-bs-parent="#accordionExample">
				<div className="accordion-body">
					<div className="accordion-item">
						<h2 className="accordion-header">

							<Link
								href="/find-a-professional"
								className="pop-head-set d-flex justify-content-between align-items-center set-pad-left-menu">
								<span
									style={{
										color: 'rgba(196,144,115)',
										fontWeight: '600'
									}} >
									{t('View_All_Lawyers')}
								</span>
								<span className="dropdown-arrow1" style={{ paddingRight: '50px' }}></span>
							</Link>
						</h2>
					</div>
				</div>
			</div>
		</>
	);
}
