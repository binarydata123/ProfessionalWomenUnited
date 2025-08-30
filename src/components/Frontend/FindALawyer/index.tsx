'use client';
import { useState, useEffect } from 'react';
import AccordionUI from '@/commonUI/Accordion';
import DefaultButton from '@/commonUI/DefaultButton';
import DropDown from '@/commonUI/DropDown';
import Popup from '@/commonUI/Popup';
import LawyerCard from '@/components/lawyer/LawyerCard';
import './find-a-lawyer.css';
import { CheckIcon, XMarkIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import {
	getAllLawyersOrFilter,
	getAllServices,
	getExperience,
	getJurisdication,
	getLawyersDataByName,
	getAllCountries,
	getCitiesByState,
	getAllCities,
	getAllProfessions, getAllStates
} from '../../../../lib/frontendapi';
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
	const [states, setStates]: any = useState([]);
	const [selectedState, setSelectedState] = useState('');

	// State for search functionality
	const [stateSearchTerm, setStateSearchTerm] = useState('');
	const [citySearchTerm, setCitySearchTerm] = useState('');
	const [showAllStates, setShowAllStates] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [showFilters, setShowFilters] = useState(false);
	const [showAllCities, setShowAllCities] = useState(false);

	// Get URL parameters
	const serviceParam = searchParams.get("service");
	const cityParam = searchParams.get("city");
	const stateParam = searchParams.get("state");

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
	const [appliedFilters, setAppliedFilters] = useState({
		states: stateParam ? [stateParam] : [],
		cities: cityParam ? [cityParam] : [],
		professions: serviceParam ? [serviceParam] : []
	});
	const [totalPages, setTotalPages] = useState(0);
	const itemsPerPage = 15;

	const handleServices = () => {
		getAllServices().then(res => {
			setServices(res.data);
		});
	};
	const handleStates = async () => {
		const data = await getAllStates();
		setStates(data || []);
	};

	const handleCities = async () => {
		const data = await getAllCities();
		setCities(data || []);
	};

	const handleCountries = () => {
		getAllCountries().then(res => {
			setCountries(res.data);
		});
	};

	const handleLawyers = (data: any, page: number = 1) => {
		const requestData = {
			...data,
			page: page,
			per_page: itemsPerPage
		};

		getAllLawyersOrFilter(requestData).then(res => {
			setLawyers(res.data);
			setFilterPopup(false);

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

	const handleSort = (sort: any) => {
		const newFilterData = { ...filterData, sort: sort };
		setFilterData(newFilterData);
		setSort(sort);
		handleLawyers(newFilterData, 1);
		setCurrentPage(1);
	};

	const handleExperience = () => {
		getExperience().then(res => {
			setExperience(res.data);
		});
	};

	const handleSearchLawyer = (e: any) => {
		if (e.target.value.length > 2) {
			getLawyersDataByName({ name: e.target.value }).then(res => {
				setLawyers(res.data);
				setCurrentPage(1);
				setTotalPages(1);
			});
		} else {
			handleLawyers(filterData, 1);
		}
	};

	const handleJurisdication = () => {
		getJurisdication().then(res => {
			setJurisdication(res.data);
		});
	};

	const applyFilters = () => {
		const newFilterData = {
			...filterData,
			p_service_name: appliedFilters.professions.length > 0 ? appliedFilters.professions.join(',') : null,
			p_state_name: appliedFilters.states.length > 0 ? appliedFilters.states.join(',') : null,
			p_country_name: appliedFilters.cities.length > 0 ? appliedFilters.cities.join(',') : null
		};

		setFilterData(newFilterData);
		handleLawyers(newFilterData, 1);
	};

	const clearFilters = () => {
		const clearedData = {
			p_service_name: null,
			p_country_name: null,
			p_country_slug: null,
			p_experience_name: null,
			p_jurisdiction_name: null,
			p_gender: null,
			p_state_name: null,
			sort: null
		};

		setAppliedFilters({
			states: [],
			cities: [],
			professions: []
		});

		setFilterData(clearedData);
		handleLawyers(clearedData);
		router.push('/find-a-professional');
	};

	const removeFilter = (type: string, value: string) => {
		let newAppliedFilters = { ...appliedFilters };

		if (type === 'state') {
			newAppliedFilters.states = appliedFilters.states.filter(state => state !== value);
			// If removing a state, also remove any cities from that state
			const citiesToRemove = cities
				.filter((city: any) => city.state === value)
				.map((city: any) => city.name);
			newAppliedFilters.cities = appliedFilters.cities.filter(city => !citiesToRemove.includes(city));
		} else if (type === 'city') {
			newAppliedFilters.cities = appliedFilters.cities.filter(city => city !== value);
		} else if (type === 'profession') {
			newAppliedFilters.professions = appliedFilters.professions.filter(prof => prof !== value);
		}

		setAppliedFilters(newAppliedFilters);

		const newFilterData = {
			...filterData,
			p_service_name: newAppliedFilters.professions.length > 0 ? newAppliedFilters.professions.join(',') : null,
			p_state_name: newAppliedFilters.states.length > 0 ? newAppliedFilters.states.join(',') : null,
			p_country_name: newAppliedFilters.cities.length > 0 ? newAppliedFilters.cities.join(',') : null
		};

		setFilterData(newFilterData);
		handleLawyers(newFilterData, 1);
	};

	useEffect(() => {
		handleServices();
		handleCountries();
		handleExperience();
		handleJurisdication();
		handleStates();
		handleCities();

		if (stateParam) {
			setSelectedState(stateParam);
			getCitiesByState(stateParam).then(res => {
				setCities(res.data);
			});
		}

		const initialFilterData = {
			p_service_name: serviceParam || null,
			p_country_name: cityParam || null,
			p_country_slug: null,
			p_experience_name: null,
			p_jurisdiction_name: null,
			p_gender: null,
			sort: null,
			p_state_name: stateParam || null,
		};

		handleLawyers(initialFilterData, 1);
		setFilterData(initialFilterData);
		setAppliedFilters({
			states: stateParam ? [stateParam] : [],
			cities: cityParam ? [cityParam] : [],
			professions: serviceParam ? [serviceParam] : []
		});
	}, [serviceParam, cityParam, stateParam]);

	const handlePageChange = (newPage: any) => {
		setCurrentPage(newPage);
		handleLawyers(filterData, newPage);
	};

	// Filter cities based on selected states
	const filteredCities = cities.filter((city: any) =>
		appliedFilters.states.length === 0 || appliedFilters.states.includes(city.state)
	);

	// Handle checkbox changes
	const handleCheckboxChange = (type: string, value: string, checked: boolean) => {
		setAppliedFilters(prev => {
			const currentValues = prev[type as keyof typeof prev] as string[];

			if (checked) {
				// Add the value
				return {
					...prev,
					[type]: [...currentValues, value]
				};
			} else {
				// Remove the value
				return {
					...prev,
					[type]: currentValues.filter(item => item !== value)
				};
			}
		});
	};

	// Filter states based on search term
	const filteredStates = states.filter((state: any) =>
		state.state.toLowerCase().includes(stateSearchTerm.toLowerCase())
	);

	// Filter cities based on search term
	const filteredCitiesBySearch = filteredCities.filter((city: any) =>
		city.name.toLowerCase().includes(citySearchTerm.toLowerCase())
	);

	// Get limited states for display (10 by default, or all if showAllStates is true)
	const displayedStates = showAllStates ? filteredStates : filteredStates.slice(0, 10);

	// Get limited cities for display (10 by default, or all if showAllCities is true)
	const displayedCities = showAllCities ? filteredCitiesBySearch : filteredCitiesBySearch.slice(0, 10);

	// Check screen size on mount and resize
	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobile(window.innerWidth < 992);
		};

		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);

		return () => window.removeEventListener('resize', checkScreenSize);
	}, []);

	return (
		<div className="find-a-lawyer-wrapper full-width-page">

			<div className="search-filter-area">
				<div className="container-full">
					<div className="row">
						<div className="col-lg-10 col-md-10 col-sm-12 mb-2">
							<div className="icon-fild icon-g class-add">
								<input
									type="text"
									placeholder="Search by name"
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
						<div className="col-lg-2 col-md-2 col-sm-12">
							{/* <div className="filter-btn"> */}
							{!isMobile && (
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
							)}
							{/* </div> */}
						</div>
					</div>
					{/* Mobile Filter and Sort Row */}
					{isMobile && (
						<div className="filter-btn mobile-filter-row">
							<DefaultButton
								onClick={() => setShowFilters(!showFilters)}
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
					)}
				</div>
			</div>

			{/* Applied Filters Bar */}
			{(appliedFilters.states.length > 0 || appliedFilters.cities.length > 0 || appliedFilters.professions.length > 0) && (
				<div className="applied-filters-bar">
					<div className="container-full">
						<div className="d-flex align-items-center flex-wrap">
							<span className="filter-label">Applied Filters:</span>
							{appliedFilters.states.map(state => (
								<div key={state} className="applied-filter-item">
									<span>State: {state}</span>
									<button onClick={() => removeFilter('state', state)}>
										<XMarkIcon width={14} height={14} />
									</button>
								</div>
							))}
							{appliedFilters.cities.map(city => (
								<div key={city} className="applied-filter-item">
									<span>City: {city}</span>
									<button onClick={() => removeFilter('city', city)}>
										<XMarkIcon width={14} height={14} />
									</button>
								</div>
							))}
							{appliedFilters.professions.map(prof => (
								<div key={prof} className="applied-filter-item">
									<span>Profession: {prof}</span>
									<button onClick={() => removeFilter('profession', prof)}>
										<XMarkIcon width={14} height={14} />
									</button>
								</div>
							))}
							<button className="clear-all-btn" onClick={clearFilters}>
								Clear All
							</button>
						</div>
					</div>
				</div>
			)}

			<div className="container-full main-content-area">
				<div className="grid-container">
					{/* Sidebar Filter */}
					<div className={`filter-sidebar ${isMobile ? (showFilters ? 'mobile-visible' : 'mobile-hidden') : ''}`}>
						<div className="sidebar-header">
							<h3>Filters</h3>
						</div>

						<div className="sidebar-content">
							{/* State Filter */}
							<div className="filter-section">
								<h4 className="filter-title">State</h4>
								<div className="filter-search">
									<input
										type="text"
										placeholder="Search states..."
										value={stateSearchTerm}
										onChange={(e) => setStateSearchTerm(e.target.value)}
										className="filter-search-input"
									/>
								</div>
								<div className="filter-options">
									{displayedStates.length > 0 ? (
										displayedStates.map((state: any) => (
											<div key={state.id} className="filter-option">
												<input
													type="checkbox"
													id={`state-${state.id}`}
													name="state"
													checked={appliedFilters.states.includes(state.state)}
													onChange={(e) =>
														handleCheckboxChange('states', state.state, e.target.checked)
													}
												/>
												<label htmlFor={`state-${state.id}`}>{state.state}</label>
											</div>
										))
									) : (
										<div className="no-results">No states found</div>
									)}
								</div>
								{filteredStates.length > 10 && (
									<button
										className="show-more-less-btn"
										onClick={() => setShowAllStates(!showAllStates)}
									>
										{showAllStates ? (
											<>
												<span>Show Less</span>
												<ChevronUpIcon width={14} height={14} />
											</>
										) : (
											<>
												<span>Show More ({filteredStates.length - 10})</span>
												<ChevronDownIcon width={14} height={14} />
											</>
										)}
									</button>
								)}
							</div>

							{/* City Filter */}
							<div className="filter-section">
								<h4 className="filter-title">City</h4>
								<div className="filter-search">
									<input
										type="text"
										placeholder="Search cities..."
										value={citySearchTerm}
										onChange={(e) => setCitySearchTerm(e.target.value)}
										className="filter-search-input"
									/>
								</div>
								<div className="filter-options">
									{displayedCities.length > 0 ? (
										displayedCities.map((city: any) => (
											<div key={city.id} className="filter-option">
												<input
													type="checkbox"
													id={`city-${city.id}`}
													name="city"
													checked={appliedFilters.cities.includes(city.name)}
													onChange={(e) =>
														handleCheckboxChange('cities', city.name, e.target.checked)
													}
												/>
												<label htmlFor={`city-${city.id}`}>{city.name}</label>
											</div>
										))
									) : (
										<div className="no-results">No cities found</div>
									)}
								</div>
								{filteredCitiesBySearch.length > 10 && (
									<button
										className="show-more-less-btn"
										onClick={() => setShowAllCities(!showAllCities)}
									>
										{showAllCities ? (
											<>
												<span>Show Less</span>
												<ChevronUpIcon width={14} height={14} />
											</>
										) : (
											<>
												<span>Show More ({filteredCitiesBySearch.length - 10})</span>
												<ChevronDownIcon width={14} height={14} />
											</>
										)}
									</button>
								)}
							</div>

							{/* Profession Filter */}
							<div className="filter-section">
								<h4 className="filter-title">Profession</h4>
								<div className="filter-options">
									{services.map((service: any) => (
										<div key={service.id} className="filter-option">
											<input
												type="checkbox"
												id={`profession-${service.id}`}
												name="profession"
												checked={appliedFilters.professions.includes(service.name)}
												onChange={(e) => handleCheckboxChange('professions', service.name, e.target.checked)}
											/>
											<label htmlFor={`profession-${service.id}`}>{service.name}</label>
										</div>
									))}
								</div>
							</div>
						</div>

						<div className="sidebar-footer">
							<button className="apply-filters-btn" onClick={applyFilters}>
								Apply Filters
							</button>
							<button className="clear-filters-btn" onClick={clearFilters}>
								Clear All
							</button>
						</div>
					</div>

					{/* Main Content */}
					<div className="lawyers-grid">
						<div className="breadcrumb-section">
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

						<div className="lawyers-container">
							{lawyers?.length > 0 ? (
								lawyers?.map((item: any, index: any) => (
									<div className="lawyer-card-item" key={index}>
										<LawyerCard lawyer={item} Key={index} />
									</div>
								))
							) : (
								<div className="no-record">
									<h5>No matching record found!</h5>
								</div>
							)}
						</div>

						<div className="pagination-section">
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
			</div>

			{/* Filter Popup (keeping the original as backup) */}
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
								<AccordionItem title="State" Key={'1'}>
									<div className="filter-search">
										<input
											type="text"
											placeholder="Search states..."
											value={stateSearchTerm}
											onChange={(e) => setStateSearchTerm(e.target.value)}
											className="filter-search-input"
										/>
									</div>
									<ul className="service-list-group mt-1">
										{filteredStates.map((state: any) => (
											<li
												className={`d-flex justify-content-between filter-items mt-1 ${appliedFilters.states.includes(state.state) && 'active'
													}`}
												onClick={() => handleCheckboxChange('states', state.state, !appliedFilters.states.includes(state.state))}
												key={state.id}
											>
												<p>{state.state}</p>
												{appliedFilters.states.includes(state.state) && (
													<CheckIcon
														color={'#02142d'}
														className=""
														height={20}
														width={20}
													/>
												)}
											</li>
										))}
										{filteredStates.length === 0 && (
											<li className="filter-note">No states found</li>
										)}
									</ul>
								</AccordionItem>
							</li>
							<li>
								<AccordionItem title="City" Key={'2'}>
									<div className="filter-search">
										<input
											type="text"
											placeholder="Search cities..."
											value={citySearchTerm}
											onChange={(e) => setCitySearchTerm(e.target.value)}
											className="filter-search-input"
										/>
									</div>
									<ul className="service-list-group mt-1">
										{filteredCitiesBySearch.map((city: any) => (
											<li
												className={`d-flex justify-content-between filter-items mt-1 ${appliedFilters.cities.includes(city.name) && 'active'
													}`}
												onClick={() => {
													if (appliedFilters.states.length > 0) {
														handleCheckboxChange('cities', city.name, !appliedFilters.cities.includes(city.name))
													}
												}}
												key={city.id}
											>
												<p>{city.name}</p>
												{appliedFilters.cities.includes(city.name) && (
													<CheckIcon
														color={'#02142d'}
														className=""
														height={20}
														width={20}
													/>
												)}
											</li>
										))}
										{appliedFilters.states.length === 0 && (
											<li className="filter-note">Select a state first</li>
										)}
										{appliedFilters.states.length > 0 && filteredCitiesBySearch.length === 0 && (
											<li className="filter-note">No cities found</li>
										)}
									</ul>
								</AccordionItem>
							</li>
							<li>
								<AccordionItem title="Profession" Key={'3'}>
									<ul className="service-list-group mt-1">
										{services.map((service: any) => (
											<li
												className={`d-flex justify-content-between filter-items mt-1 ${appliedFilters.professions.includes(service.name) && 'active'
													}`}
												onClick={() => handleCheckboxChange('professions', service.name, !appliedFilters.professions.includes(service.name))}
												key={service.id}
											>
												<p>{service.name}</p>
												{appliedFilters.professions.includes(service.name) && (
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
							</li>
						</AccordionUI>
					</ul>

					<DefaultButton
						onClick={applyFilters}
						className="w-100 mt-4"
						showIcon={false}
						background={'#c49073'}
					>
						Show results
					</DefaultButton>

					<button onClick={clearFilters} className="w-100 mt-2 clear-btn">
						Clear Filters
					</button>
				</div>
			</Popup>
		</div>
	);
}