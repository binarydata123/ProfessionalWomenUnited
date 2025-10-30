'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaArrowLeft, FaMapMarkerAlt, FaSpinner } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { STATES } from '../data/statesData';
import ProfessionalCard from '../components/searchbyStates/ProfessionalCard';
import { getMembersByService } from '../../../../lib/frontendapi';
import './style.css'
import { IoIosArrowBack } from 'react-icons/io';

interface Service {
    id: number;
    service_id: number;
    name: string;
    icon?: string;
    description?: string;
    service_name?: string;
}

export default function ProfessionalsPage() {
    const searchParams = useSearchParams();
    const stateParam = searchParams.get('state'); // This is abbreviation (CA)
    const cityParam = searchParams.get('city');
    const serviceIdParam = searchParams.get('service');

    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Decode URL parameters
    const stateAbbreviation = stateParam ? decodeURIComponent(stateParam) : null;
    const city = cityParam ? decodeURIComponent(cityParam) : null;
    const serviceId = serviceIdParam;

    // Find state by abbreviation instead of name
    const state = STATES.find(s =>
        s.abbreviation.toLowerCase() === stateAbbreviation?.toLowerCase()
    );

    // Get state name for display
    const stateName = state ? state.name : stateAbbreviation;

    // Fetch services on component mount
    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const response = await getMembersByService(serviceIdParam, city);
                setServices(response.data);
                setError(null);
            } catch (err) {
                console.error('Failed to fetch services:', err);
                setError('Failed to load services. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (serviceIdParam && city) {
            fetchServices();
        }
    }, [serviceIdParam, city]);

    // Show loading state
    if (loading) {
        return (
            <div className="min-vh-100 bg-white py-5 d-flex align-items-center">
                <div className="container">
                    <div className="text-center">
                        <FaSpinner className="spinner me-2" />
                        <span>Loading professions...</span>
                    </div>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="min-vh-100 bg-white py-5 d-flex align-items-center">
                <div className="container">
                    <div className="text-center">
                        <h1 className="display-5 fw-bold text-gray-900 mb-4">Error</h1>
                        <p className="text-muted mb-3">{error}</p>
                        <Link href="/" className="text-primary text-decoration-none d-inline-flex align-items-center">
                            <FaArrowLeft className="me-2" />
                            Back to Map
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // ✅ Validate parameters - Check if required parameters are present
    if (!stateAbbreviation || !city || !serviceId) {
        console.log('Validation failed:', {
            stateAbbreviation, city, serviceId,
            availableServices: services
        });

        return (
            <div className="min-vh-100 bg-white py-5 d-flex align-items-center">
                <div className="container">
                    <div className="text-center">
                        <h1 className="display-5 fw-bold text-gray-900 mb-4">Invalid Parameters</h1>
                        <p className="text-muted mb-3">Please check your search parameters and try again.</p>
                        <p className="text-muted small">
                            Missing required parameters.
                            {services.length > 0 && ` Available services: ${services.map(s => s.id).join(', ')}`}
                        </p>
                        <Link href="/" className="text-primary text-decoration-none d-inline-flex align-items-center">
                            <FaArrowLeft className="me-2" />
                            Back to Map
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Check if service exists in the fetched data
    const service = services.find(s => {
        if (!serviceId) return false;
        const numericServiceId = Number(serviceId);
        return s.service_id === numericServiceId;
    });

    // If service doesn't exist in the fetched data, show invalid service message
    if (!service) {
        return (
            <div className="min-vh-100 bg-white py-5 d-flex align-items-center">
                <div className="container">
                    <div className="text-center">
                        <div className="col-12 d-flex align-items-center justify-content-center py-5">
                            <div className="text-center">
                                <p className="text-muted h5 mb-4">No professionals found for this service in {city}.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-vh-100 bg-white">
            {/* Content Section */}
            <div className="container py-5 mt-3">
                <div className="row justify-content-center">
                    <div className="col-12 mt-5 setmargin-above">
                        {/* Back Button - Use state abbreviation in URL */}
                        <Link
                            href={`/services?state=${encodeURIComponent(stateAbbreviation)}&city=${encodeURIComponent(city)}`}
                            className="flex items-center space-x-2 text-coral hover:text-navy transition-colors duration-200 mb-4"
                        >
                            <IoIosArrowBack className="me-2" />
                            <span>Back</span>
                        </Link>

                        {/* Page Title - Updated with Bootstrap styling */}
                        <div className="text-center mb-5 show-mobile">
                            <h1 className="page-title fw-bold mb-3">{service.service_name}s in {city}</h1>
                            <div className="d-flex align-items-center justify-content-center location-text">
                                <FaMapMarkerAlt className="me-2" />
                                <span className="resultsLocationText">{stateName} → {city} → {service.service_name}</span>
                            </div>
                        </div>

                        {/* Professionals Count */}
                        <div className="mb-4">
                            <p className="text-muted">
                                {services.length} professional{services.length !== 1 ? 's' : ''} found
                            </p>
                        </div>

                        {/* Professionals Grid - Two Columns with Bootstrap styling */}
                        <div className="row g-4">
                            {services.length > 0 ? (
                                services.map((professional: any) => (
                                    <div key={professional.id} className="col-12 col-lg-6">
                                        <ProfessionalCard
                                            professional={professional}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 d-flex align-items-center justify-content-center py-5">
                                    <div className="text-center">
                                        <p className="text-muted h5 mb-4">No professionals found for this service in {city}.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}