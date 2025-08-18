'use client';
import React, { useState, useEffect, useContext } from 'react';
import '../legal-community.css';
import Link from 'next/link';
import ImagePlaceholder from '@/commonUI/ImagePlaceholder';
import Post from '@/components/lawyer/Post';
import { getAllContributions } from '../../../../../../lib/lawyerapi';
import Pagination from '@/commonUI/Pagination';
import AuthContext from '@/context/AuthContext';

export default function Contribution() {
	const { user } = useContext(AuthContext)
	const [user_id, setUserId] = useState('');
	const [allContributions, setAllContributions] = useState([]);
	const [sortOrder, setSortOrder] = useState('newly');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	useEffect(() => {
		user?.id ? setUserId(user?.id) : setUserId('');
		fetchAllContribution(user?.id, sortOrder);
	}, []);

	const fetchAllContribution = async (user_id: any, sortby: string) => {
		try {
			const response = await getAllContributions(user_id, sortby);
			setAllContributions(response.data);
		} catch (error) {
			console.error('Error in fetching top contributors:', error);
		}
	};

	const handleSortChange = (newSortOrder: string) => {
		setSortOrder(newSortOrder);
		fetchAllContribution(user_id, newSortOrder);
	};

	const handlePageChange = (page: any) => {
		setCurrentPage(page);
	};

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	return (
		<div>
			<div className="pb-0">
				<div className="nav-tab p-0 border-0">
					<ul className="sort">
						<li className="nav-item dropdown p-0">
							<Link
								className="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdownMenuLink"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								{sortOrder === 'newly' ? 'Newest' : 'Oldest'} &nbsp;&nbsp;{' '}
								<img src="/images/arrow-down.png" className="p-0" alt="Newest" />
							</Link>
							<ul className="dropdown-menu p-0" aria-labelledby="navbarDropdownMenuLink">
								<li className="p-0 m-0 active">
									<Link className="dropdown-item" href="#" onClick={() => handleSortChange('newly')}>
										Newest
									</Link>
								</li>
								<li className="p-0 m-0">
									<Link className="dropdown-item" href="#" onClick={() => handleSortChange('oldest')}>
										Oldest
									</Link>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<div className="mt-4">
					{allContributions ? (
						allContributions
							.slice(startIndex, endIndex)
							.map((item, index) => <Post index={index} item={item} />)
					) : (
						<ImagePlaceholder
							buttonText="Go to Legal Forum"
							text="You don’t have any contributions."
							image={'/images/review-placeholder.png'}
							height={320}
						/>
					)}
				</div>
				{allContributions && allContributions.length > 10 && (
					<div className="text-right mt-5 m-none float-end d-flex">
						<p className="mt-2 weight-light text-sonic-silver">
							Showing {Math.min(currentPage * itemsPerPage, allContributions.length)} of{' '}
							{allContributions.length}
						</p>
						<Pagination
							currentPage={currentPage}
							totalPages={Math.ceil(allContributions.length / itemsPerPage)}
							handlePageChange={handlePageChange}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
