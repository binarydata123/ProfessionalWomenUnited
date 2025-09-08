'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import { STATES } from '../data/statesData';
import ServiceCard from '../components/searchbyStates/ServiceCard';
import './style.css';
import { useEffect, useState } from 'react';
import { getAllServices, getProfessionsByCity } from '../../../../lib/frontendapi';

export default function ServicesPage() {
    const searchParams = useSearchParams();
    const stateParam = searchParams.get('state');
    const city = searchParams.get('city');
    const [professions, setProfessions] = useState([]);
    const cityId = searchParams.get('cityId');
    const [loading, setLoading] = useState(true);

    const state = STATES.find(
        s => s.name.toLowerCase() === stateParam?.toLowerCase()
    );

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

    if (!stateParam || !city || !state) {
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
            {/* Content Section */}
            {/* <div className="container py-5 mt-3"> */}
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
                            {/* Back Button */}
                            {/* <Link
                                href={`/us-states?state=${encodeURIComponent(state.name)}`}
                                className="flex items-center space-x-2 text-coral hover:text-navy transition-colors duration-200 mb-4"
                            >
                                <FaArrowLeft className="me-2" />
                                <span>Back to Cities</span>
                            </Link> */}

                            {/* Page Title - Updated with Bootstrap styling */}
                            <div className="text-center mb-5">
                                <h1 className="page-title fw-bold mb-3">Select Professional Type</h1>
                                <p className="page-subtitle mb-3">Choose the type of professional you're looking for in {city}, {state.name}</p>
                                <div className="d-flex align-items-center justify-content-center location-text mb-2">
                                    <FaMapMarkerAlt className="me-2" />
                                    <span style={{ color: '#000' }}>{state.name} → {city}</span>
                                </div>
                            </div>

                            {/* Services Grid - Updated with Bootstrap styling */}
                            <div className="row g-3 g-md-4 px-2 px-md-0">
                                {professions.map((service: any) => (
                                    <div key={service.id} className="col-12 col-md-6 col-lg-4 fade-in">
                                        <ServiceCard
                                            service={service}
                                            state={state.name}
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