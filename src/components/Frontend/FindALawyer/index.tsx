'use client';
import { useState, useEffect } from 'react';
import AccordionUI from '@/commonUI/Accordion';
import DefaultButton from '@/commonUI/DefaultButton';
import DropDown from '@/commonUI/DropDown';
import FormInput from '@/commonUI/FormInput';
import Popup from '@/commonUI/Popup';
import LawyerCard from '@/components/lawyer/LawyerCard';
import './find-a-lawyer.css';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { CheckIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import {
	getAllLawyersOrFilter,
	getAllServices,
	getExperience,
	getJurisdication,
	getLawyersDataByName,
	getAllCountries
} from '../../../../lib/frontendapi';
import PrimaryButton from '@/commonUI/PrimaryButton';
import Pagination from '@/commonUI/Pagination';
import AccordionItem from '@/commonUI/AccordionItem';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

interface Props {
	filterlawyer?: any;
}

export default function Page({ filterlawyer }: Props) {
	const router = useRouter();
	const [lawyers, setlawyers]: any = useState(filterlawyer);
	const [filterPopup, setfilterPopup] = useState(false);
	const [services, setservices]: any = useState([]);
	const [countries, setCountries]: any = useState([]);
	const [experience, setexperience]: any = useState([]);
	const [jurisdication, setjurisdication]: any = useState([]);
	const [sort, setsort]: any = useState('');
	const [currentPage, setCurrentPage] = useState(1);

	const initialData = {
		p_service_name: null,
		p_country_name: null,
		p_country_slug: null,
		p_experience_name: null,
		p_jurisdiction_name: null,
		p_gender: null,
		sort: null
	};
	const searchParams = useSearchParams();
	const country = searchParams.get('country');

	const [filterData, setfilterData]: any = useState(initialData);
	const [totalPages, setTotallawyers] = useState(0);
	const itemsPerPage = 16;
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;


	const handleServices = () => {
		getAllServices().then(res => {
			setservices(res.data);
		});
	};
	const handleCountries = () => {
		getAllCountries().then(res => {
			setCountries(res.data);
		});
	};

	const handleLawyers = (data: {}) => {
		getAllLawyersOrFilter(data).then(res => {
			let filteredLawyers;
			if (country) {
				filteredLawyers = res.data.filter((lawyer: any) => lawyer.location_slug === country);
			} else {
				filteredLawyers = res.data;
			}
			setlawyers(filteredLawyers?.slice((currentPage - 1) * itemsPerPage, ((currentPage - 1) * itemsPerPage) + itemsPerPage));
			setfilterPopup(false);
			setfilterData(data);
			setTotallawyers(Math.ceil(filteredLawyers.length / itemsPerPage));
		});
	};


	const handleSort = (sort: any) => {
		setfilterData({ ...filterData, sort: sort });
		setsort(sort);
		handleLawyers(filterData);
		setCurrentPage(1);
	};

	const handleExperience = () => {
		getExperience().then(res => {
			setexperience(res.data);
		});
	};

	const handleSearchLawyer = (e: any) => {
		if (e.target.value.length > 2) {
			getLawyersDataByName({ name: e.target.value }).then(res => {
				setlawyers(res.data);
			});
		} else {
			handleLawyers(filterData);
		}
	};

	const handleJurisdication = () => {
		getJurisdication().then(res => {
			setjurisdication(res.data);
		});
	};

	useEffect(() => {
		handleLawyers(currentPage);
		handleLawyers(filterData);
		handleServices();
		handleCountries();
		handleExperience();
		handleJurisdication();
	}, [sort, currentPage]);

	const handlePageChange = (newPage: any) => {
		setCurrentPage(newPage);
		handleLawyers(newPage)
	};

	return (
		<div className="find-a-lawyer-wrapper">
			<div className="search-filter-area ">
				<div className="container">
					<div className="row">
						<div className="col-lg-9 col-md-9 col-sm-12 mb-2">
							<div className="icon-fild icon-g class-add">
								<input
									type="text"
									placeholder="Search for a professional"
									className="form-fild find-a-lawyer-input w-100 sp-right"
									onChange={e => handleSearchLawyer(e)}
								/>
								<img
									src="/images/FOR-LAWYERS-PAGE/search-normal.svg"
									alt="search-normal"
									className="search-normal"
								/>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-12">
							<div className="filter-btn">
								<DefaultButton
									onClick={() => setfilterPopup(true)}
									background="#fff"
									color="#c49073"
									height={48}
									className="max-width-126 w-100"
									showIcon={false}
								>
									Filter
									<Image
										src="/images/FOR-LAWYERS-PAGE/candle-2.png"
										style={{ marginLeft: '10px' }}
										alt="find-a-lawyer-filter-image"
										width="20"
										height="20"
									/>
								</DefaultButton>
								<DropDown
									label={
										<DefaultButton
											background="#fff"
											color="#c49073"
											height={48}
											className="max-width-115"
											showIcon={false}
										>
											Sort
											<Image
												src="/images/FOR-LAWYERS-PAGE/sort.png"
												style={{ paddingLeft: '10px' }}
												alt="find-a-lawyer-sort-image"
												width="30"
												height="20"
											/>
										</DefaultButton>
									}
								>
									<div
										className={`d-flex justify-content-between cursor-pointer ${filterData.sort === null && 'active'
											}`}
									>
										<p className="font-weight-400 font-14" onClick={() => handleSort(null)}>
											None
										</p>
										{filterData.sort === null && <CheckIcon width={20} color={'#02142d'} />}
									</div>
									<div
										className={`d-flex justify-content-between cursor-pointer ${filterData.sort === 'highest' && 'active'
											}`}
										onClick={() => handleSort('highest')}
									>
										<p className=" font-weight-400 font-14">Highest Rated</p>
										{filterData.sort === 'highest' && <CheckIcon width={20} color={'#02142d'} />}
									</div>
									<div
										className={`d-flex justify-content-between cursor-pointer ${filterData.sort === 'newest' && 'active'
											}`}
										onClick={() => handleSort('newest')}
									>
										<p className=" font-weight-400 font-14">Newest</p>
										{filterData.sort === 'newest' && <CheckIcon width={20} color={'#02142d'} />}
									</div>
								</DropDown>
							</div>
						</div>
					</div>
				</div>
			</div>

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
									alt="Find A Professional right arrow"
									width={15}
									height={15}
								/>
							</li>
							<li>
								<Link href="/find-a-professional" >
									<h1 className="active">Find a professional</h1>
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="row">
					{lawyers?.length > 0 ? (
						lawyers?.map((item: any, index: any) => (
							<div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-4">
								<LawyerCard lawyer={item} Key={index} />
							</div>
						))
					) : (
						<div className="no-record">
							<h5>No matching record found!</h5>
							{/* <PrimaryButton className="mt-3" onClick={() => handleLawyers(initialData)}>
								View all professionals
							</PrimaryButton> */}
						</div>
					)}

					<div className="col-lg-12 d-flex justify-content-end py-4">
						{totalPages > 1 && (
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								handlePageChange={handlePageChange}
							/>
						)}
					</div>
				</div>
			</div>
			<Popup
				show={filterPopup}
				size="sm"
				title="Filter"
				footer={false}
				onCancel={() => setfilterPopup(false)}
				onOk={() => setfilterPopup(false)}
			>
				<div className="mt-2 mb-2 set-accordian">
					<ul>
						<AccordionUI flush={true}>
							<li>
								<AccordionItem title="Profession" Key={'1'}>
									<FormInput name="search" placeholder={'Search Profession'} />
									<ul className="service-list-group mt-1">
										<li
											className={`d-flex justify-content-between filter-items ${filterData.p_service_name === null && 'active'
												}`}
											onClick={e => setfilterData({ ...filterData, p_service_name: null })}
										>
											<p>All</p>
											{filterData.p_service_name === null && (
												<CheckIcon color={'#02142d'} className="" height={20} width={20} />
											)}
										</li>
										{services ? (
											services.map((item: any, index: number) => (
												<li
													className={`d-flex justify-content-between filter-items mt-1 ${filterData.p_service_name === item.name && 'active'
														}`}
													onClick={e =>
														setfilterData({ ...filterData, p_service_name: item.name })
													}
												>
													<p>{item.name}</p>
													{filterData.p_service_name === item.name && (
														<CheckIcon
															color={'#02142d'}
															className=""
															height={20}
															width={20}
														/>
													)}
												</li>
											))
										) : (
											<center>
												<h4>No record found!!</h4>
											</center>
										)}
									</ul>
								</AccordionItem>
							</li>
							<li>
								<AccordionItem title="Location" Key={'5'}>
									<ul className="service-list-group mt-1">
										<li
											className={`d-flex justify-content-between filter-items ${filterData.p_country_name === null && 'active'
												}`}
											onClick={e => setfilterData({ ...filterData, p_country_name: null })}
										>
											<p>All</p>
											{filterData.p_country_name === null && (
												<CheckIcon color={'#02142d'} className="" height={20} width={20} />
											)}
										</li>
										{countries ? (
											countries.map((item: any, index: number) => (
												<li
													className={`d-flex justify-content-between filter-items mt-1 ${filterData.p_country_name === item.name && 'active'
														}`}
													onClick={e =>
														setfilterData({ ...filterData, p_country_name: item.name })
													}
												>
													<p>{item.name}</p>
													{filterData.p_country_name === item.name && (
														<CheckIcon
															color={'#02142d'}
															className=""
															height={20}
															width={20}
														/>
													)}
												</li>
											))
										) : (
											<center>
												<h4>No record found!!</h4>
											</center>
										)}
									</ul>
								</AccordionItem>
							</li>
							{/* <li>
								<AccordionItem title="Years of Experience" Key={'2'}>
									<ul className="service-list-group mt-1">
										{experience &&
											experience.map((item: any, index: number) => (
												<li
													className={`d-flex justify-content-between filter-items mt-1 ${filterData.p_experience_name === item.experience && 'active'
														}`}
													onClick={e =>
														setfilterData({
															...filterData,
															p_experience_name: item.experience
														})
													}
												>
													<p>{item.experience}</p>
													{filterData.p_experience_name === item.experience && (
														<CheckIcon
															color={'#02142d'}
															className=""
															height={20}
															width={20}
														/>
													)}
												</li>
											))}
									</ul>
								</AccordionItem>
							</li> */}
							{/* <li>
								<AccordionItem title="Jurisdiction" Key={'3'}>
									<ul className="service-list-group mt-1">
										{jurisdication &&
											jurisdication.map((item: any, index: number) => (
												<li
													className={`d-flex justify-content-between filter-items mt-1 ${filterData.p_jurisdiction_name === item.jurisdiction_name &&
														'active'
														}`}
													onClick={e =>
														setfilterData({
															...filterData,
															p_jurisdiction_name: item.jurisdiction_name
														})
													}
												>
													<p>{item.jurisdiction_name}</p>
													{filterData.p_jurisdiction_name === item.jurisdiction_name && (
														<CheckIcon
															color={'#02142d'}
															className=""
															height={20}
															width={20}
														/>
													)}
												</li>
											))}
									</ul>
								</AccordionItem>
							</li> */}
							{/* <li>
								<AccordionItem title="Gender" Key={'4'}>
									<ul className="service-list-group mt-2">
										<li
											className={`d-flex justify-content-between filter-items mt-1 ${filterData.p_gender === null && 'active'
												}`}
											onClick={e => setfilterData({ ...filterData, p_gender: 'All' })}
										>
											<p>All</p>
										</li>
										<li
											className={`d-flex justify-content-between filter-items mt-1 ${filterData.p_gender === 'male' && 'active'
												}`}
											onClick={e => setfilterData({ ...filterData, p_gender: 'male' })}
										>
											<p>Male</p>
										</li>
										<li
											className={`d-flex justify-content-between filter-items mt-1 ${filterData.p_gender === 'female' && 'active'
												}`}
											onClick={e => setfilterData({ ...filterData, p_gender: 'Female' })}
										>
											<p>Female</p>
										</li>
										<li
											className={`d-flex justify-content-between filter-items mt-1 ${filterData.p_gender === 'others' && 'active'
												}`}
											onClick={e => setfilterData({ ...filterData, p_gender: 'others' })}
										>
											<p>Others</p>
										</li>
									</ul>
								</AccordionItem>
							</li> */}
						</AccordionUI>
					</ul>

					<DefaultButton
						onClick={() => handleLawyers(filterData)}
						className="w-100 mt-4"
						showIcon={false}
						background={'#c49073'}
					>
						Show results
					</DefaultButton>

					<button onClick={() => handleLawyers(initialData)} className="w-100 mt-2 clear-btn">
						Clear Filters
					</button>
				</div>
			</Popup>
		</div>
	);
}
