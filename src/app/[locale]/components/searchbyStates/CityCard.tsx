import Link from 'next/link';
import { City } from '../../types';

interface CityCardProps {
    city: City;
    stateName: string;
}

export default function CityCard({ city, stateName }: CityCardProps) {
    return (
        <a
            href={`/services?state=${encodeURIComponent(stateName)}&city=${encodeURIComponent(
                city.name
            )}&cityId=${city.id}`}
            style={{ color: '#000' }}
        >
            {/* <div className="city-card card h-100 border-0 shadow-sm card-hover"> */}
            {/* <div className="card-body d-flex flex-column justify-content-center text-center py-4">
                    <h5 className="card-title text-navy mb-1">{city.name}</h5>
                </div> */}
            <div className="city-card">
                <div className="d-flex align-items-center">
                    <div className="city-icon">
                        <i className="fas fa-map-marker-alt text-white"></i>
                    </div>
                    <div>
                        <h6 className="text-[#1B3067] font-semibold m-0">{city.name}</h6>
                    </div>
                </div>
            </div>
            {/* </div> */}
        </a>
    );
}