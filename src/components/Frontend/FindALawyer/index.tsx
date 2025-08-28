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
	getAllCountries,
	getCitiesByState
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
	const searchParams = useSearchParams();
	const [lawyers, setLawyers]: any = useState(filterlawyer || []);
	const [filterPopup, setFilterPopup] = useState(false);
	const [services, setServices]: any = useState([]);
	const [countries, setCountries]: any = useState([]);
	const [experience, setExperience]: any = useState([]);
	const [jurisdication, setJurisdication]: any = useState([]);
	const [sort, setSort]: any = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [cities, setCities]: any = useState([]);
	const [selectedState, setSelectedState] = useState(''); // Track selected state

	// Get URL parameters
	const serviceParam = searchParams.get("service");
	const cityParam = searchParams.get("city");
	const stateParam = searchParams.get("state");
	// const countryParam = searchParams.get('country');

	// Initialize filter data with URL parameters if they exist
	const initialData = {
		p_service_name: serviceParam || null,
		p_country_name: cityParam || null,
		p_country_slug: null,
		p_experience_name: null,
		p_jurisdiction_name: null,
		p_gender: null,
		p_state_name: stateParam || null,
		sort: null
	};

	const [filterData, setFilterData]: any = useState(initialData);
	const [totalPages, setTotalPages] = useState(0);
	const itemsPerPage = 12;

	const handleServices = () => {
		getAllServices().then(res => {
			setServices(res.data);
		});
	};

	const handleCountries = () => {
		getAllCountries().then(res => {
			setCountries(res.data);
		});
	};


	// const handleLawyers = (data: any, page: number = currentPage) => {
	// 	getAllLawyersOrFilter(data).then(res => {
	// 		let filteredLawyers = res.data;


	// 		setLawyers(filteredLawyers?.slice((page - 1) * itemsPerPage, ((page - 1) * itemsPerPage) + itemsPerPage));
	// 		setFilterPopup(false);
	// 		setFilterData(data);
	// 		setTotalPages(Math.ceil(filteredLawyers.length / itemsPerPage));
	// 	});
	// };
	const handleLawyers = (data: any, page: number = 1) => {
		const requestData = {
			...data,
			page: page,
			per_page: itemsPerPage
		};

		getAllLawyersOrFilter(requestData).then(res => {
			setLawyers(res.data);
			setFilterPopup(false);
			setFilterData(data);

			// Set pagination info from backend
			if (res.pagination) {
				setTotalPages(res.pagination.last_page);
				setCurrentPage(res.pagination.current_page);
			} else {
				// Fallback for non-paginated responses
				setTotalPages(1);
				setCurrentPage(1);
			}
		});
	};

	// const handleSort = (sort: any) => {
	// 	const newFilterData = { ...filterData, sort: sort };
	// 	setFilterData(newFilterData);
	// 	setSort(sort);
	// 	handleLawyers(newFilterData);
	// 	setCurrentPage(1);
	// };
	const handleSort = (sort: any) => {
		const newFilterData = { ...filterData, sort: sort };
		setFilterData(newFilterData);
		setSort(sort);
		handleLawyers(newFilterData, 1); // Reset to page 1 when sorting
		setCurrentPage(1);
	};

	const handleExperience = () => {
		getExperience().then(res => {
			setExperience(res.data);
		});
	};

	// const handleSearchLawyer = (e: any) => {
	// 	if (e.target.value.length > 2) {
	// 		getLawyersDataByName({ name: e.target.value }).then(res => {
	// 			setLawyers(res.data);
	// 		});
	// 	} else {
	// 		handleLawyers(filterData);
	// 	}
	// };
	const handleSearchLawyer = (e: any) => {
		if (e.target.value.length > 2) {
			getLawyersDataByName({ name: e.target.value }).then(res => {
				setLawyers(res.data);
				// Reset pagination for search results
				setCurrentPage(1);
				setTotalPages(1);
			});
		} else {
			handleLawyers(filterData, 1); // Reset to page 1 when clearing search
		}
	};


	const handleJurisdication = () => {
		getJurisdication().then(res => {
			setJurisdication(res.data);
		});
	};

	useEffect(() => {
		handleServices();
		handleCountries();
		handleExperience();
		handleJurisdication();

		if (stateParam) {
			setSelectedState(stateParam);
			getCitiesByState(stateParam).then(res => {
				setCities(res.data);
			});
		}

		// Create initial filter data that includes URL parameters
		const initialFilterData = {
			p_service_name: serviceParam || null,
			p_country_name: cityParam || null, // This will handle city filtering through the API
			p_country_slug: null,
			p_experience_name: null,
			p_jurisdiction_name: null,
			p_gender: null,
			sort: null,
			p_state_name: stateParam || null,

		};

		handleLawyers(initialFilterData, 1);
		setFilterData(initialFilterData);
	}, [serviceParam, cityParam, stateParam]);

	const handlePageChange = (newPage: any) => {
		setCurrentPage(newPage);
		handleLawyers(filterData, newPage);
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
									onClick={() => setFilterPopup(true)}
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
							<div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-4" key={index}>
								{/* <LawyerCard lawyer={item} /> */}
								<LawyerCard lawyer={item} Key={index} />

							</div>
						))
					) : (
						<div className="no-record">
							<h5>No matching record found!</h5>
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

			{/* Filter Popup */}
			<Popup
				show={filterPopup}
				size="sm"
				title="Filter"
				footer={false}
				onCancel={() => setFilterPopup(false)}
				onOk={() => setFilterPopup(false)}
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
											onClick={e => setFilterData({ ...filterData, p_service_name: null })}
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
														setFilterData({ ...filterData, p_service_name: item.name })
													}
													key={index}
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
											onClick={e => setFilterData({ ...filterData, p_country_name: null })}
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
														setFilterData({ ...filterData, p_country_name: item.name })
													}
													key={index}
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

					<button onClick={() => {
						const clearedData = {
							p_service_name: null,
							p_country_name: null,
							p_country_slug: null,
							p_experience_name: null,
							p_jurisdiction_name: null,
							p_gender: null,
							sort: null
						};
						setFilterData(clearedData);
						handleLawyers(clearedData);
						router.push('/find-a-professional');
					}} className="w-100 mt-2 clear-btn">
						Clear Filters
					</button>
				</div>
			</Popup>
		</div>
	);
}