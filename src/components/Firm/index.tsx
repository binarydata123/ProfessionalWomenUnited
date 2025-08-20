'use client';
import { useState, useEffect } from 'react';
import './firm.css';
import { CiSearch } from "react-icons/ci";
import Image from 'next/image';
import Link from 'next/link';
import Pagination from '@/commonUI/Pagination';
import FirmCard from '../FirmCard';
import { getAllFirmsData } from '../../../lib/frontendapi';
import PlusSmallIcon from '@heroicons/react/20/solid/PlusSmallIcon';

interface Props {
	allfirm?: any;
}

export default function Page({ allfirm }: Props) {

	console.log(allfirm,'allfirm')
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	// const [totalPages, setTotallawyers] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	const [firms, setFirmData] = useState(allfirm ? allfirm.slice(0, 8) : []);
	const itemsPerPage = 4;


	useEffect(() => {
		if (!allfirm) {
			getAllFirmsData().then(res => {
				const initialFirms = res.data.slice(0, 8);
				setFirmData(initialFirms);
				setTotalPages(Math.ceil(res.data.length / itemsPerPage));
			}).catch(error => {
				console.error("Error fetching data:", error);
			});
		} else {
			const initialFirms = allfirm.slice(0, 8);
			setFirmData(initialFirms);
			setTotalPages(Math.ceil(allfirm.length / itemsPerPage));
		}
	}, [allfirm, itemsPerPage]);


	const handleLoadMore = () => {
		const nextPage = currentPage + 1;
		const startIndex = firms.length;
		const nextFirms = allfirm.slice(startIndex, startIndex + itemsPerPage);
		setFirmData((prevFirms: any) => [...prevFirms, ...nextFirms]);
		setCurrentPage(nextPage);
	};


	// const startIndex = (currentPage - 1) * itemsPerPage;
	// const endIndex = startIndex + itemsPerPage;


	const handleSearchChange = (event: any) => {
		setSearchTerm(event.target.value);
	};

	// Filter firms based on search term
	const filteredFirms = firms.filter((firm: any) =>
		firm.firm_name.toLowerCase().includes(searchTerm.toLowerCase())
	);
	return (
		<div className="find-a-lawyer-wrapper">
			<div className="search-filter-area-set">
				<div className="container">
					<div className="row">
						<div className="col-sm-12 mt-2 mb-2">
							<ul className="list-12 mb-3">
								<li>
									<Link href="/">Home</Link>
								</li>
								<li>
									<Image
										src="/images/legal-service/arrow-right.png"
										alt="find a lawyer right arrow"
										width={15}
										height={15}
									/>
								</li>
								<li>
									<Link href="/find-a-professional" >
										<h1 className="active">Firms</h1>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row align-items-center">
					<div className="col-lg-6 col-md-6 col-sm-12">
						<div className="filter-btn">
							<h3 className="social-link mobile-m-0 ">
								Explore trusted {' '}
								<span className="green-medium-2 ">Legal Firms</span>
							</h3>
						</div>
					</div>
					<div className="col-lg-6 col-md-6 col-sm-12 mb-2">
						<div className="icon-fild icon-g class-add">
							<CiSearch />
							<input
								type="text"
								placeholder="Search for Firms"
								className="form-fild find-a-lawyer-input w-100 sp-right"
								value={searchTerm}
								onChange={handleSearchChange}
							/>
						</div>
					</div>
				</div>
				<br />
				<br />
				<div className="row">
					{filteredFirms.length > 0 ? (
						filteredFirms.map((item: any, index: any) => (
							<div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-4">
								<FirmCard firms={item} Key={index} />
							</div>
						))
					) : (
						<div className="no-record">
							<h5>No matching record found!</h5>
						</div>
					)}
				</div>
			</div>

			{firms.length < (allfirm ? allfirm.length : 0) && (
				<div className="text-center all-btn justify-content-center mx-auto d-flex">
					<button
						className="btn-get-free btn-commn d-flex align-items-center justify-content-center gap-2"
						onClick={handleLoadMore}
					>
						<span className="border-radius-1 banner-arrow-btn">
							<PlusSmallIcon width={20} color={'#BE8363'} />
						</span>
						<span>Load More</span>
					</button>
				</div>
			)}
		</div>
	);
}
