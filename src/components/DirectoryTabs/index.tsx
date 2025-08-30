// components/DirectoryTabs.tsx
'use client';

import { useState, useEffect } from 'react';
import { getAllCountries } from '../../../lib/frontendapi';
import { useRouter } from 'next/navigation';

const professionals = [
  'Gynecologist',
  'Dentist',
  'Pediatrician',
  'Family Professional Attorney',
  'Personal Injury Attorney',
  'Criminal Defense Attorney',
  'Real Estate Agent',
  'Counselor',
  'Accountant'
];




const DirectoryTabs = () => {
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState<'professionals' | 'cities'>('professionals');
  const [searchTerm, setSearchTerm] = useState('');
  // const [filteredCities, setFilteredCities] = useState(topUSCities);
  const [filteredProfessionals, setFilteredProfessionals] = useState(professionals);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [allCities, setAllCities] = useState<string[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);

  const handleSelectProfessional = (professional: string) => {
    router.push(`/find-a-professional?service=${encodeURIComponent(professional)}`);
  };

  const handleSelectCity = (city: string) => {
    router.push(`/find-a-professional?city=${encodeURIComponent(city)}`);
  };


  useEffect(() => {
    if (currentTab === 'cities') {
      fetchCities();
    }
  }, [currentTab]);

  const fetchCities = async () => {
    setLoadingCities(true);
    try {
      const res: any = await getAllCountries(); // API call
      if (res.status && res.data) {
        // API returns data array
        const cityNames = res.data.slice(0, 200).map((c: any) => `${c.name}`);
        setAllCities(cityNames);
        setFilteredCities(cityNames);
      } else {
        setAllCities([]);
        setFilteredCities([]);
      }
    } catch (err) {
      console.error('Cities API error', err);
      setAllCities([]);
      setFilteredCities([]);
    } finally {
      setLoadingCities(false);
    }
  };


  useEffect(() => {
    if (currentTab === 'professionals') {
      const filtered = professionals.filter(p =>
        p.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProfessionals(filtered);
    } else {
      const filtered = allCities.filter(c =>
        c.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  }, [searchTerm, currentTab, allCities]);

  return (
    <section className="directory-container py-5 bg-white"> {/* Added bg-white */}
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5 px-3">
          <h1
            className="fw-bold mb-3 text-[#1B3067]"
            style={{ fontSize: 'clamp(28px, 5vw, 48px)' }} // responsive font size
          >
            Professional <span className="highlight" style={{ color: '#BE8363' }}>Directory</span>
          </h1>
          <p className="lead text-gray-600 text-sm md:text-base">
            Find professionals and explore cities across the United States
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="d-flex justify-content-center">
          <ul
            className="nav nav-tabs mb-4 d-flex justify-content-center flex-wrap gap-2 w-100"
            id="directoryTabs"
            role="tablist"
            style={{ maxWidth: "400px" }} // ✅ keeps it centered & not stretched full width
          >
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${currentTab === 'professionals' ? 'active' : ''}`}
                onClick={() => setCurrentTab('professionals')}
                style={{ whiteSpace: 'nowrap', fontSize: '14px' }}
              >
                <i className="fas fa-user me-2"></i>Search by Professions
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${currentTab === 'cities' ? 'active' : ''}`}
                onClick={() => setCurrentTab('cities')}
                style={{ whiteSpace: 'nowrap', fontSize: '14px' }}
              >
                <i className="fas fa-map-marker-alt me-2"></i>Search by USA Cities
              </button>
            </li>
          </ul>
        </div>


        {/* Search Bar */}
        <div className="search-container mb-5">
          <div className="position-relative">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              className="form-control search-input"
              placeholder={currentTab === 'professionals' ? 'Search profession...' : 'Search cities...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Professionals Tab */}
          <div className={`tab-pane ${currentTab === 'professionals' ? 'show active' : 'fade'}`}>


            {filteredProfessionals.length === 0 ? (
              <div className="no-results">
                <i className="fas fa-search mb-3 text-gray-300" style={{ fontSize: '3rem' }}></i>
                <p className="text-gray-500">No professionals found matching your search.</p>
              </div>
            ) : (
              <div className="row g-4">
                {filteredProfessionals.map((professional, index) => (
                  <div key={index} className="col-md-6 col-lg-4"
                    onClick={() => handleSelectProfessional(professional)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="professional-card">
                      <div className="d-flex align-items-center">
                        <div className="professional-icon">
                          <i className="fas fa-user text-white"></i>
                        </div>
                        <div>
                          <h6 className="text-[#1B3067] font-semibold m-0">{professional}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cities Tab */}
          <div className={`tab-pane ${currentTab === 'cities' ? 'show active' : 'fade'}`}>
            <div className="d-flex align-items-center mb-4">
              <i className="fas fa-map-marker-alt me-2 text-[#BE8363]" style={{ fontSize: '1.5rem' }}></i>
              <h2 className="section-title mb-0">Top US Cities</h2>
              <span className="badge-count">{filteredCities.length} cities</span>
            </div>
            {loadingCities ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : filteredCities.length === 0 ? (
              <div className="no-results text-center">
                <i className="fas fa-search mb-3 text-gray-300" style={{ fontSize: '3rem' }}></i>
                <p className="text-gray-500">No cities found matching your search.</p>
              </div>
            ) : (
              <div className="row g-3">
                {filteredCities.map((city, index) => (
                  <div key={index} className="col-md-6 col-lg-3"
                    onClick={() => handleSelectCity(city)} // ✅ redirect
                    style={{ cursor: "pointer" }}
                  >
                    <div className="city-card">
                      <div className="d-flex align-items-center">
                        <div className="city-icon">
                          <i className="fas fa-map-marker-alt text-white"></i>
                        </div>
                        <div>
                          <h6 className="text-[#1B3067] font-semibold m-0">{city}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .professional-card {
          background: white;
          border-radius: 8px;
          padding: 1rem;
          border: 1px solid #e9ecef;
          transition: all 0.3s ease;
          cursor: pointer;
          height: 100%;
        }

        .professional-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border-color: #BE8363;
        }

        .professional-icon {
          width: 40px;
          height: 40px;
          background-color: #02142d;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.75rem;
        }

        .city-card {
          background: white;
          border-radius: 8px;
          padding: 1rem;
          border: 1px solid #e9ecef;
          transition: all 0.3s ease;
          cursor: pointer;
          height: 100%;
        }

        .city-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          border-color: #CA2129;
        }

        .city-icon {
          width: 40px;
          height: 40px;
          background-color: #CA2129;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 0.75rem;
        }

        .section-title {
          color: #1B3067;
          font-weight: 600;
          margin-bottom: 0;
        }

        .no-results {
          text-align: center;
          padding: 3rem 0;
        }

        .badge-count {
          background-color: #BE8363;
          color: white;
          font-size: 0.8rem;
          padding: 0.25rem 0.5rem;
          border-radius: 20px;
          margin-left: 0.5rem;
        }

        .nav-tabs .nav-link {
          border: none;
          color: #6c757d;
          font-weight: 500;
          padding: 1rem 1.5rem;
          border-radius: 0;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
        }

        .nav-tabs .nav-link:hover {
          color: #BE8363;
          background-color: transparent;
        }

        .nav-tabs .nav-link.active {
          color: #BE8363;
          font-weight: 600;
          border-bottom: 3px solid #BE8363;
          background-color: transparent;
        }

        .search-container {
          max-width: 400px;
          margin: 0 auto;
        }

        .search-input {
          border-radius: 50px;
          padding: 0.75rem 1rem 0.75rem 3rem;
          border: 2px solid #e9ecef;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          border-color: #BE8363;
          box-shadow: 0 0 0 0.2rem rgba(190, 131, 99, 0.25);
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
        }
      `}</style>
    </section>
  );
};

export default DirectoryTabs;