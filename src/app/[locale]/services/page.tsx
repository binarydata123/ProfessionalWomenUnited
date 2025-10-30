'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import ServiceCard from '../components/searchbyStates/ServiceCard';
import './style.css';
import { useEffect, useState } from 'react';
import { getAllServices, getProfessionsByCity } from '../../../../lib/frontendapi';
import { IoIosArrowBack } from 'react-icons/io';

// Add helper function to convert abbreviation to full name
const getStateNameFromAbbreviation = (abbreviation: string): string => {
    const stateNames: Record<string, string> = {
        'AL': 'Alabama',
        'AK': 'Alaska',
        'AZ': 'Arizona',
        'AR': 'Arkansas',
        'CA': 'California',
        'CO': 'Colorado',
        'CT': 'Connecticut',
        'DE': 'Delaware',
        'FL': 'Florida',
        'GA': 'Georgia',
        'HI': 'Hawaii',
        'ID': 'Idaho',
        'IL': 'Illinois',
        'IN': 'Indiana',
        'IA': 'Iowa',
        'KS': 'Kansas',
        'KY': 'Kentucky',
        'LA': 'Louisiana',
        'ME': 'Maine',
        'MD': 'Maryland',
        'MA': 'Massachusetts',
        'MI': 'Michigan',
        'MN': 'Minnesota',
        'MS': 'Mississippi',
        'MO': 'Missouri',
        'MT': 'Montana',
        'NE': 'Nebraska',
        'NV': 'Nevada',
        'NH': 'New Hampshire',
        'NJ': 'New Jersey',
        'NM': 'New Mexico',
        'NY': 'New York',
        'NC': 'North Carolina',
        'ND': 'North Dakota',
        'OH': 'Ohio',
        'OK': 'Oklahoma',
        'OR': 'Oregon',
        'PA': 'Pennsylvania',
        'RI': 'Rhode Island',
        'SC': 'South Carolina',
        'SD': 'South Dakota',
        'TN': 'Tennessee',
        'TX': 'Texas',
        'UT': 'Utah',
        'VT': 'Vermont',
        'VA': 'Virginia',
        'WA': 'Washington',
        'WV': 'West Virginia',
        'WI': 'Wisconsin',
        'WY': 'Wyoming',
        'DC': 'District of Columbia'
    };
    return stateNames[abbreviation.toUpperCase()] || abbreviation;
};

export default function ServicesPage() {
    const searchParams = useSearchParams();
    const stateParam = searchParams.get('state'); // This is now abbreviation (CA)
    const city = searchParams.get('city');
    const [professions, setProfessions] = useState([]);
    const cityId = searchParams.get('cityId');
    const [loading, setLoading] = useState(true);

    // Convert abbreviation to full state name for display
    const stateFullName = stateParam ? getStateNameFromAbbreviation(stateParam) : '';
    console.log(stateFullName, 'stateFullName')
    console.log(stateParam, 'stateParam')

    useEffect(() => {
        getAllServicesData();
    }, [])

    const getAllServicesData = async () => {
        try {
            setLoading(true);
            const res = await getAllServices();
            if (res.status == true) {
                setProfessions(res.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (!stateParam || !city) {
        return (
            <div className="min-vh-100 bg-white py-5 d-flex align-items-center">
                <div className="container">
                    <div className="text-center">
                        <h1 className="display-5 fw-bold text-gray-900 mb-4">Invalid Parameters</h1>
                        <Link href="/" className="text-primary text-decoration-none d-inline-flex align-items-center">
                            <FaArrowLeft className="me-2" />
                            Back to Map
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 bg-white">
            {loading ? (
                <div className="min-vh-100 bg-white py-5 d-flex align-items-center">
                    <div className="container">
                        <div className="text-center">
                            <FaSpinner className="spinner me-2" />
                            <span>Loading Professions...</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="set-pad-top" >
                    <div className="row justify-content-center">
                        <div className="col-12 col-lg-10 col-xl-8">
                            {/* Back Button - Use state abbreviation in URL */}
                            <Link
                                href={`/us-states?state=${encodeURIComponent(stateParam)}`}
                                className="flex items-center space-x-2 text-coral hover:text-navy transition-colors duration-200 mb-4"
                            >
                                <IoIosArrowBack className="me-2" />
                                <span>Back</span>
                            </Link>

                            {/* Page Title - Use full state name for display */}
                            <div className="text-center mb-5">
                                <h1 className="page-title fw-bold mb-3">Select Professional Type</h1>
                                <p className="page-subtitle mb-3">Choose the type of professional you're looking for in {city}, {stateFullName}</p>
                                <div className="d-flex align-items-center justify-content-center location-text mb-2">
                                    <FaMapMarkerAlt className="me-2" />
                                    <span style={{ color: '#000' }}>{stateFullName} → {city}</span>
                                </div>
                            </div>

                            {/* Services Grid */}
                            <div className="row g-3 g-md-4 px-2 px-md-0">
                                {professions.map((service: any) => (
                                    <div key={service.id} className="col-12 col-md-6 col-lg-4 fade-in">
                                        <ServiceCard
                                            service={service}
                                            state={stateParam} // Pass full name for display
                                            city={city}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}