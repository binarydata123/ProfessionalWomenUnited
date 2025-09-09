'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { City } from '../types';
import './style.css';
import CityCard from '../components/searchbyStates/CityCard';
import { getCitiesByState, getAllStates } from '../../../../lib/frontendapi';
import { IoIosArrowBack } from "react-icons/io";

// Add this helper function to get state abbreviation from name
const getStateAbbreviation = (stateName: string): string => {
    const stateAbbreviations: Record<string, string> = {
        'Alabama': 'AL',
        'Alaska': 'AK',
        'Arizona': 'AZ',
        'Arkansas': 'AR',
        'California': 'CA',
        'Colorado': 'CO',
        'Connecticut': 'CT',
        'Delaware': 'DE',
        'District of Columbia': 'DC',
        'Florida': 'FL',
        'Georgia': 'GA',
        'Hawaii': 'HI',
        'Idaho': 'ID',
        'Illinois': 'IL',
        'Indiana': 'IN',
        'Iowa': 'IA',
        'Kansas': 'KS',
        'Kentucky': 'KY',
        'Louisiana': 'LA',
        'Maine': 'ME',
        'Maryland': 'MD',
        'Massachusetts': 'MA',
        'Michigan': 'MI',
        'Minnesota': 'MN',
        'Mississippi': 'MS',
        'Missouri': 'MO',
        'Montana': 'MT',
        'Nebraska': 'NE',
        'Nevada': 'NV',
        'New Hampshire': 'NH',
        'New Jersey': 'NJ',
        'New Mexico': 'NM',
        'New York': 'NY',
        'North Carolina': 'NC',
        'North Dakota': 'ND',
        'Ohio': 'OH',
        'Oklahoma': 'OK',
        'Oregon': 'OR',
        'Pennsylvania': 'PA',
        'Rhode Island': 'RI',
        'South Carolina': 'SC',
        'South Dakota': 'SD',
        'Tennessee': 'TN',
        'Texas': 'TX',
        'Utah': 'UT',
        'Vermont': 'VT',
        'Virginia': 'VA',
        'Washington': 'WA',
        'West Virginia': 'WV',
        'Wisconsin': 'WI',
        'Wyoming': 'WY'
    };

    return stateAbbreviations[stateName] || stateName;
};

export default function USStatesPage() {
    const searchParams = useSearchParams();
    const stateParam = searchParams.get('state');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCities, setFilteredCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState<City[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [currentState, setCurrentState] = useState<any>(null);

    useEffect(() => {
        getAllStates()
            .then((res: any) => {
                // Handle both response formats
                if (Array.isArray(res)) {
                    setStates(res);
                } else if (res.status && Array.isArray(res.data)) {
                    setStates(res.data);
                } else {
                    console.error("Unexpected response format:", res);
                }
            })
            .catch(err => console.error("Error fetching states:", err));
    }, []);

    useEffect(() => {
        if (stateParam && states.length > 0) {
            // Decode URL parameter and find matching state
            const decodedStateParam = decodeURIComponent(stateParam);

            // Look for state by full name (using the 'state' property from API)
            const match = states.find(
                (s: any) => s.state?.toLowerCase() === decodedStateParam.toLowerCase()
            );

            setCurrentState(match);

            if (match) {
                setLoading(true);
                // Convert full state name to abbreviation for the API call
                const stateAbbreviation = getStateAbbreviation(match.state);

                console.log("Fetching cities for:", match.state, "Abbreviation:", stateAbbreviation);

                getCitiesByState(match.state)
                    .then((res: any) => {
                        if (res.status) {
                            setCities(res.data);
                            setFilteredCities(res.data);
                        } else {
                            console.error("Error in cities response:", res);
                        }
                    })
                    .catch(err => console.error("Error fetching cities:", err))
                    .finally(() => setLoading(false));
            } else {
                console.log("No state found for:", decodedStateParam, "Available states:", states);
            }
        }
    }, [stateParam, states]);

    useEffect(() => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            setFilteredCities(
                cities.filter(city =>
                    city.name.toLowerCase().includes(query)
                )
            );
        } else {
            setFilteredCities(cities);
        }
    }, [searchQuery, cities]);

    // If no state is selected, show a message or redirect
    if (!stateParam) {
        return (
            <div className="min-vh-100 bg-light py-5 d-flex align-items-center">
                <div className="container">
                    <div className="text-center">
                        <h1 className="display-5 fw-bold text-navy mb-4">Please Select a State</h1>
                        <p className="lead text-tan mb-4">Choose a state from the map to view cities</p>
                        <Link href="/" className="btn btn-coral text-white px-4 py-2 d-inline-flex align-items-center">
                            <FaArrowLeft className="me-2" />
                            Back to Map
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentState && states.length > 0) {
        const decodedStateParam = decodeURIComponent(stateParam);
        return (
            <div className="min-vh-100 bg-light py-5 d-flex align-items-center">
                <div className="container">
                    <div className="text-center">
                        <h1 className="display-5 fw-bold text-navy mb-4">State Not Found</h1>
                        <p className="text-muted">Could not find state: {decodedStateParam}</p>
                        <Link href="/" className="text-coral text-decoration-none d-inline-flex align-items-center">
                            <FaArrowLeft className="me-2" />
                            Back to Map
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 bg-light py-5">
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-12 col-xxl-10">

                        <Link
                            href='/'
                            className="flex items-center space-x-2 text-coral hover:text-navy transition-colors duration-200 mb-4"
                        >
                            <IoIosArrowBack className="me-2" />
                            <span>Back</span>
                        </Link>
                        {currentState && (
                            <>
                                <div className="text-center mb-5 mt-3 show-mobile">
                                    <h2 className="fw-bold text-navy mb-2">Cities in {currentState.state}</h2>
                                    <p className="lead text-tan">Select a city to find professionals</p>

                                </div>

                                {/* Search bar */}
                                <div className="row justify-content-center mb-5">
                                    <div className="col-12 col-md-10 col-lg-8">
                                        <div className="input-group">
                                            <span className="input-group-text bg-transparent border-end-0">
                                                <FaSearch className="text-muted" />
                                            </span>
                                            <input
                                                type="text"
                                                placeholder="Search city..."
                                                className="form-control border-start-0 search-box"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    {loading ? (
                                        <div className="col-12 text-center py-5">
                                            <p className="text-muted h5">Loading cities...</p>
                                        </div>
                                    ) : filteredCities.length > 0 ? (
                                        <div className="col-12">
                                            <div className="row g-4">
                                                {filteredCities.map(city => (
                                                    <div key={city.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                                        <CityCard
                                                            city={city}
                                                            stateName={currentState.state}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="col-12 d-flex justify-content-center align-items-center py-5">
                                            <p className="text-muted h5">No cities found matching your search.</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}