// components/DirectoryTabs.tsx
'use client';

import { useState, useEffect } from 'react';

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

const topUSCities = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
  'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
  'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'San Francisco, CA',
  'Charlotte, NC', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Washington, DC',
  'Boston, MA', 'El Paso, TX', 'Detroit, MI', 'Nashville, TN', 'Portland, OR',
  'Memphis, TN', 'Oklahoma City, OK', 'Las Vegas, NV', 'Louisville, KY', 'Baltimore, MD',
  'Milwaukee, WI', 'Albuquerque, NM', 'Tucson, AZ', 'Fresno, CA', 'Sacramento, CA',
  'Kansas City, MO', 'Long Beach, CA', 'Mesa, AZ', 'Atlanta, GA', 'Colorado Springs, CO',
  'Raleigh, NC', 'Omaha, NE', 'Miami, FL', 'Oakland, CA', 'Minneapolis, MN',
  'Tulsa, OK', 'Cleveland, OH', 'Wichita, KS', 'Arlington, TX', 'New Orleans, LA',
  'Bakersfield, CA', 'Tampa, FL', 'Honolulu, HI', 'Aurora, CO', 'Anaheim, CA',
  'Santa Ana, CA', 'St. Louis, MO', 'Riverside, CA', 'Corpus Christi, TX', 'Lexington, KY',
  'Pittsburgh, PA', 'Anchorage, AK'
];


const DirectoryTabs = () => {
  const [currentTab, setCurrentTab] = useState<'professionals' | 'cities'>('professionals');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCities, setFilteredCities] = useState(topUSCities);
  const [filteredProfessionals, setFilteredProfessionals] = useState(professionals);

  useEffect(() => {
    if (currentTab === 'professionals') {
      const filtered = professionals.filter(professional =>
        professional.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProfessionals(filtered);
    } else {
      const filtered = topUSCities.filter(city =>
        city.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  }, [searchTerm, currentTab]);

  return (
    <section className="directory-container py-5 bg-white"> {/* Added bg-white */}
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3 text-[#1B3067]" style={{ fontSize: '48px' }}> Professional <span className="highlight" style={{ color: '#BE8363' }}>Directory</span></h1>
          <p className="lead text-gray-600">
            Find professionals and explore cities across the United States
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="d-flex justify-content-center"> {/* Add this wrapper div */}
          <ul className="nav nav-tabs mb-4" id="directoryTabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${currentTab === 'professionals' ? 'active' : ''}`}
                onClick={() => setCurrentTab('professionals')}
              >
                <i className="fas fa-user me-2"></i>Search by Professionals
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${currentTab === 'cities' ? 'active' : ''}`}
                onClick={() => setCurrentTab('cities')}
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
              placeholder={currentTab === 'professionals' ? 'Search professionals...' : 'Search cities...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Professionals Tab */}
          <div className={`tab-pane ${currentTab === 'professionals' ? 'show active' : 'fade'}`}>
            {/* <div className="d-flex align-items-center mb-4">
              <i className="fas fa-users me-2 text-[#BE8363]" style={{ fontSize: '1.5rem' }}></i>
              <h2 className="section-title mb-0">Professional Services</h2>
            </div> */}

            {filteredProfessionals.length === 0 ? (
              <div className="no-results">
                <i className="fas fa-search mb-3 text-gray-300" style={{ fontSize: '3rem' }}></i>
                <p className="text-gray-500">No professionals found matching your search.</p>
              </div>
            ) : (
              <div className="row g-4">
                {filteredProfessionals.map((professional, index) => (
                  <div key={index} className="col-md-6 col-lg-4">
                    <div className="professional-card">
                      <div className="professional-icon">
                        <i className="fas fa-user text-white"></i>
                      </div>
                      <h5 className="text-[#1B3067] font-semibold">{professional}</h5>
                      <p className="text-gray-500 mb-0">Professional Services</p>
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

            {filteredCities.length === 0 ? (
              <div className="no-results">
                <i className="fas fa-search mb-3 text-gray-300" style={{ fontSize: '3rem' }}></i>
                <p className="text-gray-500">No cities found matching your search.</p>
              </div>
            ) : (
              <div className="row g-3">
                {filteredCities.map((city, index) => (
                  <div key={index} className="col-md-6 col-lg-3">
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
          border-radius: 12px;
          padding: 1.5rem;
          border: 1px solid #e9ecef;
          transition: all 0.3s ease;
          cursor: pointer;
          height: 100%;
        }

        .professional-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          border-color: #BE8363;
        }

        .professional-icon {
          width: 60px;
          height: 60px;
          background-color: #BE8363;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
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
          margin-bottom: 2rem;
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
  color: #BE8363; /* Active text ka color */
  font-weight: 600;
  border-bottom: 3px solid #BE8363; /* optional underline highlight */
  background-color: transparent; /* background same rahe */
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