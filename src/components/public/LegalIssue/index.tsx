import React from 'react';
import './legalissue.css';
import Link from 'next/link';

interface Props {
	tags: any;
}

export default function LegalIssue({ tags }: Props) {
	return (
		<>
			<section id="legal-issues" className="legal-issues mt-5 mb-5">
				<div className="container text-center">
					<div className="needlawyer-text text-center">
						<h6 className="text-center p-0">professional issueS</h6>
					</div>
					<h1 className="text-black">
						What do clients {' '}
						<span>
							more frequently <br /> searched for?{' '}
						</span>
					</h1>
					<h5>Select the professional issue that you face and connect with a legal expert.</h5>
					<ul className="pt-3">
						{tags &&
							tags.map((tag: any, index: number) => (
								<li key={index}>
									<Link href={`/legal-forum/${tag.slug}/?tag_id=${tag.tag_id}`}>{tag.tag_name}</Link>
								</li>
							))}
					</ul>
				</div>
			</section>
		</>
	);
}
