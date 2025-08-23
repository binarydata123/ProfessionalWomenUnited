'use client';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import ImagePlaceholder from '@/commonUI/ImagePlaceholder';
import { getUserAllPost } from '../../../../../../lib/enduserapi';
import Pagination from '@/commonUI/Pagination';
import Post from '@/components/user/Post';
import './posts.css';
import AuthContext from '@/context/AuthContext';
export default function Contribution() {
	const [user_id, setUserId] = useState('');
	const [post, setAllPost]: any = useState([]);
	const [sortOrder, setSortOrder] = useState('newly');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const currentPosts = post.slice(startIndex, endIndex);
	const totalPages = Math.ceil(post.length / itemsPerPage);
	const handlePageChange = (newPage: any) => {
		setCurrentPage(newPage);
	};
	const { user } = useContext(AuthContext);

	useEffect(() => {
		user?.id ? setUserId(user?.id) : setUserId('');
		getAllPostData(user?.id, sortOrder);
	}, []);

	const getAllPostData = async (user_id: any, sortby: string) => {
		try {
			const res = await getUserAllPost({ memberId: user_id, sortby });
			if (res.status === true) {
				setAllPost(res.data);
			}
		} catch (error) {
			console.error('Error fetching forum count:', error);
		}
	};

	const handleSortChange = (newSortOrder: string) => {
		setSortOrder(newSortOrder);
		getAllPostData(user_id, newSortOrder);
	};

	return (
		<div>
			<div className="nav-tab">
				<ul className="sort mt-4">
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

			{currentPosts.length > 0 ? (
				currentPosts.map((postdata: any, index: any) => <Post postdata={postdata} />)
			) : (
				<ImagePlaceholder
					height={300}
					image="/images/Empty.svg"
					text="You don’t have any contributions."
					buttonText="Go to Professional Forum"
					link="/legal-forum"
				/>
			)}
			<div className="text-right mt-5 m-none">
				<Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
			</div>
		</div>
	);
}
