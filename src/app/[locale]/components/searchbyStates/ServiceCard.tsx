import Link from 'next/link';
import { Service } from '../../types';

// Map service names to icons
const serviceIcons: Record<string, string> = {
    'Gynecologist': 'fas fa-stethoscope',
    'Dentist': 'fas fa-tooth',
    'Pediatrician': 'fas fa-baby',
    'Family Professional Attorney': 'fas fa-users',
    'Personal Injury Attorney': 'fas fa-gavel',
    'Criminal Defense Attorney': 'fas fa-shield-alt',
    'Real Estate Agent': 'fas fa-home',
    'Counselor': 'fas fa-heart',
    'Accountant': 'fas fa-calculator'
};

// Map service names to descriptions
const serviceDescriptions: Record<string, string> = {
    'Gynecologist': "Women's health specialists",
    'Dentist': "Oral health and dental care",
    'Pediatrician': "Children's healthcare specialists",
    'Family Professional Attorney': "Family law and legal matters",
    'Personal Injury Attorney': "Personal injury and compensation law",
    'Criminal Defense Attorney': "Criminal law and defense",
    'Real Estate Agent': "Property buying and selling",
    'Counselor': "Mental health and therapy",
    'Accountant': "Financial and tax services"
};

interface ServiceCardProps {
    service: Service;
    state: string;
    city: string;
}

export default function ServiceCard({ service, state, city }: ServiceCardProps) {
    // Get icon and description based on service name
    const iconClass = serviceIcons[service.name] || 'fas fa-briefcase';
    const description = serviceDescriptions[service.name] || 'Professional service';

    return (
        <Link
            href={`/professions?state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}&service=${service.id}`}
            className="text-decoration-none"
        >
            <div className="professional-card">
                <div className="icon-container">
                    <i className={iconClass}></i>
                </div>
                <h3 className="professional-name">{service.name}</h3>
                <p className="professional-desc">{description}</p>
            </div>
        </Link>
    );
}