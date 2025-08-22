'use client';
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { searchLegalForumTopic } from '../../../../lib/frontendapi';
import Link from 'next/link';

interface Props {
	slug?: string;
}

export default function LegalForumSearch({ slug = '' }: Props) {
	const [searchInput, setSearchInput]: any = useState(null);
	const [searchData, setSearchData]: any = useState([]);
	const anchorRef = useRef<HTMLInputElement | null>(null);
	const [showResults, setShowResults] = useState(false);

	const handleSearch = (e: any) => {
		e.preventDefault();
		setSearchInput(e.target.value);
		const data = {
			title: searchInput
		};
		searchInput &&
			searchLegalForumTopic(data).then(res => {
				setSearchData(res.data);
				setShowResults(true);
			});
	};

	useEffect(() => {
		window.addEventListener('click', handleClick);
		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, []);

	const handleClick = (event: MouseEvent) => {
		if (anchorRef.current && event.target instanceof Node && !anchorRef.current.contains(event.target)) {
			setShowResults(false);
		}
	};

	const handleInputClick = () => {
		if (searchData.length > 0) {
			setShowResults(true);
		}
	};

	return (
		<section>
			<div className="container">
				<div id="legal-serve">
					<Link href="/admin/dashboard">
						{' '}
						<span>Home</span>
					</Link>
					<span>
						<Image src="/images/legal-service/arrow-right.png" alt="arrow-right" width={16} height={16} />
					</span>
					<span>Legal Forum</span>
				</div>
				<div className="legal-text needlawyer-text">
					<h1>
						Legal <span> Forum</span>{' '}
					</h1>
					<h5 className="text-start">Your Professional Questions, answered by the pros.</h5>
					<div className="search-btn">
						<input
							type="text"
							name=""
							id=""
							ref={anchorRef}
							onChange={(e: any) => handleSearch(e)}
							onClick={handleInputClick}
							placeholder="Search for legal topics"
						/>
						<Image
							src="/images/legal/search-normal.png"
							alt="search-normal"
							width={22}
							height={22}
							className="searcth-img"
						/>
						<button className="" onClick={handleSearch}>
							Search
						</button>
					</div>
					{showResults && (
						<div className="result-box mt-2 bg-light shadow-lg">
							<ul>
								{searchData.map((item: any, index: number) => (
									<li key={index}>
										<Link
											href={`/legal-forum/${item.name
													? item.service_slug
													: item.tag_name
														? `${item.tag_slug}?tag_id=${item.tag_id}`
														: `${item.service_slug}/${item.slug}`
												}`}
										>
											{item.name || item.title || item.tag_name + ` (${item.service_name})`}
										</Link>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
