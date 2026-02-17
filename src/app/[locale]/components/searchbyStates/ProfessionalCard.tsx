import Link from 'next/link';
import { Professional } from '../../types';
import {
    FaMapMarkerAlt,
    FaStar,
    FaRegStar,
    FaStarHalfAlt,
    FaPhoneAlt,
    FaEnvelope,
    FaClock,
    FaCertificate,
    FaUserMd
} from 'react-icons/fa';

interface ProfessionalCardProps {
    professional: Professional;
}

export default function ProfessionalCard({ professional }: ProfessionalCardProps) {
    // Function to render star ratings
    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-warning" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key={fullStars} className="text-warning" />);
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={fullStars + i + (hasHalfStar ? 1 : 0)} className="text-warning" />);
        }

        return stars;
    };

    // Generate mock data for missing fields (for demo purposes)
    const professionalData = {
        name: professional.full_name,
        rating: professional.rating || 4.5,
        reviews: professional.reviewCount || 25,
        phone: professional.phone_number || '(555) 123-4567',
        email: professional.email || 'professional@example.com',
        address: `${professional.city || 'City'}, ${professional.state || 'State'}`,
        specialties: [professional.service_name || 'Specialized Care'],
    };

    return (
        <div className="professional-card-data h-100">
            <div className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-4">
                    <div className="d-flex align-items-center">
                        <div className="profile-icon me-3">
                            {professional.profile_image ? (
                                <img
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/images/profile/${encodeURIComponent(professional.profile_image)}`}
                                    alt={professional.full_name}
                                    className="rounded-circle"
                                    style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                                />
                            ) : (
                                <FaUserMd className="fs-5" />
                            )}
                        </div>
                        <div>
                            <Link href={`/find-a-professional/${professional?.slug}`}>
                                <h3 className="professional-name h5 mb-1">{professionalData.name}</h3>
                            </Link>
                            <div className="d-flex align-items-center">
                                <div className="d-flex align-items-center me-2">
                                    <span className="rating me-1">★</span>
                                    <span className="text-muted small fw-medium">{professionalData.rating}</span>
                                </div>
                                {/* <span className="text-muted small">({professionalData.reviews} reviews)</span> */}
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center experience-badge">
                        {/* <FaCertificate className="me-1" />
                        <span className="small fw-medium">{professionalData.experience}</span> */}
                    </div>
                </div>

                <div className="mb-4">
                    <div className="d-flex align-items-center mb-2 text-muted">
                        <FaMapMarkerAlt className="info-icon me-2" />
                        <span className="small">{professionalData.address}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2 text-muted">
                        <FaPhoneAlt className="info-icon me-2" />
                        <a href={`tel:${professionalData.phone}`} className="small text-decoration-none text-muted">
                            {professionalData.phone}
                        </a>
                    </div>
                    <div className="d-flex align-items-center mb-2 text-muted">
                        <FaEnvelope className="info-icon me-2" />
                        <a href={`mailto:${professionalData.email}`} className="small text-decoration-none text-muted">
                            {professionalData.email}
                        </a>
                    </div>
                </div>

                <div className="mb-4">
                    <h6 className="text-navy fw-medium mb-2">Specialties:</h6>
                    <div className="d-flex flex-wrap gap-2">
                        {professionalData.specialties?.map((specialty: any, index: any) => (
                            <span key={index} className="specialty-badge">
                                {specialty}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="d-flex gap-3">
                    <a
                        href={`tel:${professionalData?.phone}`} className="flex-grow-1">
                        <button className="btn btn-coral w-100 py-2">
                            Contact Now
                        </button></a>
                    <Link href={`/find-a-professional/${professional?.slug}`} className="flex-grow-1">
                        <button className="btn btn-tan w-100 py-2">
                            View Profile
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}