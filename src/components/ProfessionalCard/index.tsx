"use client";

import { useState, useEffect } from "react";
import { getServicesAndMembers } from '../../../lib/frontendapi';
import "./style.css";
import ImageComponent from "@/commonUI/ImageComponent";
import ClipLoader from "react-spinners/ClipLoader";
import Link from "next/link";
type Professional = {
  id: number;
  first_name: string;
  last_name: string;
  slug: string;
  profile_image: string;
  service_name?: string;
  city_name?: string;
  state_name?: string;
};

type Service = {
  id: number;
  name: string;
};

export default function ProfessionalCard() {
  const [services, setServices] = useState<Service[]>([]);
  const [members, setMembers] = useState<Professional[]>([]);
  const [selectedService, setSelectedService] = useState<number | "all">("all");
  const [loading, setLoading] = useState<boolean>(true); // loading state

  // first load
  useEffect(() => {
    loadData();
  }, []);

  // reload members when service changes
  useEffect(() => {
    if (selectedService === "all") {
      loadData();
    } else {
      loadData(selectedService);
    }
  }, [selectedService]);

  const loadData = async (serviceId?: number) => {
    setLoading(true); // start loading
    try {
      const res: any = await getServicesAndMembers(serviceId ? { service_id: serviceId } : {});
      if (res.status) {
        setServices(res.services);
        setMembers(res.members);
      }
    } catch (err) {
      console.error("API error", err);
    } finally {
      setLoading(false); // stop loading
    }
  };


  const capitalize = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
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
            legal & professional services, find the expertise you need with
            confidence.
          </p>
        </div>
      </header>

      <main className="container">
        {/* Filter Section */}
        <section className="filter-section">
          <div className="filter-buttons">
            <button
              className={`filter-btn ${selectedService === "all" ? "active" : ""}`}
              onClick={() => setSelectedService("all")}
            >
              All Professionals
            </button>
            {services.map((service) => (
              <button
                key={service.id}
                className={`filter-btn ${selectedService === service.id ? "active" : ""
                  }`}
                onClick={() => setSelectedService(service.id)}
              >
                {service.name}
              </button>
            ))}
          </div>
        </section>

        {/* Professionals Grid */}
        <section className="professionals-grid">
          {loading ? (
            <div className="loading-spinner">
              {/* You can use a spinner image or CSS spinner */}
              <div className="spinner-wrapper">
                {/* <ClipLoader color="#c49073" size={60} /> */}
                <p className="text-center">Loading...</p>

              </div>            </div>
          ) : members.length > 0 ? (
            members.slice(0, 6).map((prof) => (
              <div key={prof.id} className="professional-card">
                <div className="card-image">
                  <ImageComponent
                    src={
                      prof?.profile_image
                        ? `${process.env.NEXT_PUBLIC_BASE_URL}/images/${prof.profile_image}`
                        : '/images/women.png'
                    }
                    alt={`${prof.first_name} ${prof.last_name}`}
                    className="image-width-cording"
                    width={200}
                    height={200}
                  />
                  <div className="image-overlay"></div>
                </div>
                <div className="card-content">
                  <h3 className="professional-name">
                    {capitalize(prof.first_name)} {capitalize(prof.last_name)}
                  </h3>
                  <p className="professional-specialty">
                    {prof.service_name || "Not Found"}
                  </p>
                  <div className="professional-info">
                    <div className="info-item">
                      <span>{prof.city_name}, {prof.state_name}</span>
                    </div>
                  </div>
                  <div className="action-buttons">
                    <Link
                      href={`/find-a-professional/${prof.slug}`}
                      className="btn-secondary"
                      target="_blank"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results text-center">
              <p className="text-center">Not Found</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

