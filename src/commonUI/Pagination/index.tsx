import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';

interface Props {
	currentPage?: number;
	totalPages?: number;
	handlePageChange?: (page: number) => void;
}

export default function Pagination({ currentPage = 1, totalPages = 1, handlePageChange }: Props) {
	const getVisiblePages = () => {
		const delta = 2; // Number of pages to show on each side of current page
		const range = [];
		const rangeWithDots = [];

		for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
			range.push(i);
		}

		if (currentPage - delta > 2) {
			rangeWithDots.push(1, '...');
		} else {
			rangeWithDots.push(1);
		}

		rangeWithDots.push(...range);

		if (currentPage + delta < totalPages - 1) {
			rangeWithDots.push('...', totalPages);
		} else if (totalPages > 1) {
			rangeWithDots.push(totalPages);
		}

		return rangeWithDots;
	};

	const visiblePages = getVisiblePages();

	return (
		<nav className="pagination-outer text-md-end text-center" aria-label="Page navigation" id="pagination">
			<ul className="pagination legal-insights">
				{/* Previous Button */}
				<li className="page-item">
					<a
						href="#"
						onClick={e => {
							e.preventDefault();
							if (currentPage > 1) {
								handlePageChange?.(currentPage - 1);
							}
						}}
						className={`page-link ${currentPage <= 1 ? 'disabled' : ''}`}
						aria-disabled={currentPage <= 1}
					>
						<span aria-hidden="true">
							<ArrowLeftIcon
								style={{ border: `1px solid ${currentPage > 1 ? '#02142d' : '#CCCCCC'}` }}
								color={currentPage > 1 ? '#02142d' : '#CCCCCC'}
							/>
						</span>
					</a>
				</li>

				{/* Page Numbers */}
				{visiblePages.map((page, index) => (
					<li
						key={index}
						className={`page-item ${page === currentPage ? 'active_pagination' : ''} ${page === '...' ? 'disabled' : ''}`}
					>
						{page === '...' ? (
							<span className="page-link">...</span>
						) : (
							<a
								href="#"
								onClick={e => {
									e.preventDefault();
									if (typeof page === 'number') {
										handlePageChange?.(page);
									}
								}}
								className="page-link"
							>
								{page}
							</a>
						)}
					</li>
				))}

				{/* Next Button */}
				<li className="page-item">
					<a
						href="#"
						onClick={e => {
							e.preventDefault();
							if (currentPage < totalPages) {
								handlePageChange?.(currentPage + 1);
							}
						}}
						className={`page-link ${currentPage >= totalPages ? 'disabled' : ''}`}
						aria-disabled={currentPage >= totalPages}
					>
						<span aria-hidden="true">
							<ArrowRightIcon
								style={{ border: `1px solid ${currentPage < totalPages ? '#02142d' : '#CCCCCC'}` }}
								color={currentPage < totalPages ? '#02142d' : '#CCCCCC'}
							/>
						</span>
					</a>
				</li>
			</ul>
		</nav>
	);
}