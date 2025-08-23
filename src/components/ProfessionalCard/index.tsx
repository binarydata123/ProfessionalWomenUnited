"use client";

import { useState, useEffect } from "react";
import "./style.css";

type Professional = {
  id: number;
  name: string;
  specialty: string;
  city: string;
  state: string;
  image: string;
  rating: number;
  reviews: number;
  phone: string;
  email: string;
  verified: boolean;
};

const professionalsData: Professional[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Gynecologist",
    city: "New York",
    state: "NY",
    image:
      "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9,
    reviews: 247,
    phone: "(555) 123-4567",
    email: "sarah.johnson@example.com",
    verified: true,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dentist",
    city: "Los Angeles",
    state: "CA",
    image:
      "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    reviews: 189,
    phone: "(555) 234-5678",
    email: "michael.chen@example.com",
    verified: true,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    city: "Miami",
    state: "FL",
    image:
      "https://images.pexels.com/photos/7659568/pexels-photo-7659568.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9,
    reviews: 312,
    phone: "(555) 345-6789",
    email: "emily.rodriguez@example.com",
    verified: true,
  },
  {
    id: 4,
    name: "Jessica Thompson",
    specialty: "Family Professional Attorney",
    city: "Chicago",
    state: "IL",
    image:
      "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7,
    reviews: 156,
    phone: "(555) 456-7890",
    email: "jessica.thompson@example.com",
    verified: true,
  },
  {
    id: 5,
    name: "Robert Martinez",
    specialty: "Personal Injury Attorney",
    city: "Houston",
    state: "TX",
    image:
      "https://images.pexels.com/photos/8112198/pexels-photo-8112198.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    reviews: 203,
    phone: "(555) 567-8901",
    email: "robert.martinez@example.com",
    verified: true,
  },
  {
    id: 6,
    name: "Amanda Foster",
    specialty: "Criminal Defense Attorney",
    city: "Phoenix",
    state: "AZ",
    image:
      "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9,
    reviews: 178,
    phone: "(555) 678-9012",
    email: "amanda.foster@example.com",
    verified: true,
  },
  {
    id: 7,
    name: "David Kim",
    specialty: "Real Estate Agent",
    city: "Seattle",
    state: "WA",
    image:
      "https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    reviews: 267,
    phone: "(555) 789-0123",
    email: "david.kim@example.com",
    verified: true,
  },
  {
    id: 8,
    name: "Dr. Lisa Williams",
    specialty: "Counselor",
    city: "Denver",
    state: "CO",
    image:
      "https://images.pexels.com/photos/7659586/pexels-photo-7659586.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9,
    reviews: 194,
    phone: "(555) 890-1234",
    email: "lisa.williams@example.com",
    verified: true,
  },
  {
    id: 9,
    name: "James Wilson",
    specialty: "Accountant",
    city: "Atlanta",
    state: "GA",
    image:
      "https://images.pexels.com/photos/8112202/pexels-photo-8112202.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.7,
    reviews: 142,
    phone: "(555) 901-2345",
    email: "james.wilson@example.com",
    verified: true,
  },
];

const specialties = [
  "All Professionals",
  "Gynecologist",
  "Dentist",
  "Pediatrician",
  "Family Professional Attorney",
  "Personal Injury Attorney",
  "Criminal Defense Attorney",
  "Real Estate Agent",
  "Counselor",
  "Accountant",
];

export default function Home() {
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<string>("All Professionals");
  const [filtered, setFiltered] = useState<Professional[]>(professionalsData);

  useEffect(() => {
    if (selectedSpecialty === "All Professionals") {
      setFiltered(professionalsData);
    } else {
      setFiltered(
        professionalsData.filter((p) => p.specialty === selectedSpecialty)
      );
    }
  }, [selectedSpecialty]);

  const viewProfile = (id: number) => {
    const prof = professionalsData.find((p) => p.id === id);
    // alert(`Viewing profile for ${prof?.name}`);
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <h1>
            Find Trusted <span className="highlight">Professionals</span>
          </h1>
          <p>
            Connect with verified professionals in your area. From healthcare to
            professional services, find the expertise you need with confidence.
          </p>
        </div>
      </header>

      <main className="container">
        {/* Filter Section */}
        <section className="filter-section">
          <div className="filter-buttons">
            {specialties.map((spec) => (
              <button
                key={spec}
                className={`filter-btn ${selectedSpecialty === spec ? "active" : ""
                  }`}
                onClick={() => setSelectedSpecialty(spec)}
              >
                {spec}
              </button>
            ))}
          </div>
        </section>

        {/* Professionals Grid */}
        <section className="professionals-grid">
          {filtered.map((prof) => (
            <div key={prof.id} className="professional-card">
              <div className="card-image">
                <img src={prof.image} alt={prof.name} />
                <div className="image-overlay"></div>
              </div>
              <div className="card-content">
                <h3 className="professional-name">{prof.name}</h3>
                <p className="professional-specialty">{prof.specialty}</p>

                <div className="professional-info">
                  <div className="info-item">
                    <svg className="icon" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    <span>
                      {prof.city}, {prof.state}
                    </span>
                  </div>
                </div>

                <div className="action-buttons">
                  <button
                    className="btn-secondary"
                    onClick={() => viewProfile(prof.id)}
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Stats Section */}
        {/* <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-item stat-1">
              <h3>500+</h3>
              <p>Verified Professionals</p>
            </div>
            <div className="stat-item stat-2">
              <h3>50,000+</h3>
              <p>Satisfied Clients</p>
            </div>
            <div className="stat-item stat-3">
              <h3>4.8</h3>
              <p>Average Rating</p>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  );
}
