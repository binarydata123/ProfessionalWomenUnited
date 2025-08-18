import React from 'react';
import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/24/solid';
interface Props {
	currentPage?: any;
	totalPages?: any;
	handlePageChange?: any;
}

export default function Pagination({currentPage, totalPages, handlePageChange}: Props) {
	return (
		<nav className="pagination-outer text-md-end text-center" aria-label="Page navigation" id="pagination">
			<ul className="pagination legal-insights">
				<li className="page-item">
					<a
						href="#"
						onClick={e => {
							e.preventDefault();
							if (currentPage > 1) {
								handlePageChange(currentPage - 1);
							}
						}}
						className={`page-link  ${currentPage <= 1 ? 'disabled' : ''}`}
					>
						<span aria-hidden="true">
							<ArrowLeftIcon
								style={{border: `1px solid ${currentPage > 1 ? '#02142d' : '#CCCCCC'}`}}
								color={currentPage > 1 ? '#02142d' : '#CCCCCC'}
							/>
						</span>
					</a>
				</li>
				{Array.from({length: totalPages}).map((_, index) => (
					<li key={index} className={`${currentPage == index + 1 ? 'active_pagination' : ''} page-item`}>
						<a
							href=""
							onClick={e => {
								e.preventDefault();
								handlePageChange(index + 1);
							}}
							className={`page-link`}
						>
							{index + 1}
						</a>
					</li>
				))}
				<li className="page-item">
					<a
						href="#"
						onClick={e => {
							e.preventDefault();
							if (currentPage < totalPages) {
								handlePageChange(currentPage + 1);
							}
						}}
						className={`page-link ${currentPage >= totalPages ? 'disabled' : ''}`}
					>
						<span aria-hidden="true">
							<ArrowRightIcon
								style={{border: `1px solid ${currentPage < totalPages ? '#02142d' : '#CCCCCC'}`}}
								color={currentPage < totalPages ? '#02142d' : '#CCCCCC'}
							/>
						</span>
					</a>
				</li>
			</ul>
		</nav>
	);
}
