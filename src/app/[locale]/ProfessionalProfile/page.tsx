'use client'
import Head from 'next/head';
import { FormEvent } from 'react';

export default function ProfessionalProfile() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.subject || !data.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email as string)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Success message
    alert('Thank you for your message! I will get back to you within 24 hours.');
    
    // Reset form
    e.currentTarget.reset();
    
    // In a real application, you would send this data to your server
    console.log('Form submitted:', data);
  };

  return (
    <>
      <Head>
        <title>Dr. Sarah Johnson - Professional Profile</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    'primary': '#BE8363',
                    'secondary': '#1B3067',
                    'accent': '#CA2129'
                  }
                }
              }
            }
          `
        }} />
      </Head>

      <div className="bg-gray-50">
        {/* Hero Section with Contact Form */}
        <section className="hero-gradient text-white py-16" style={{ background: 'linear-gradient(135deg, #1B3067 0%, #BE8363 100%)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Professional Info */}
              <div>
                <div className="flex items-center mb-6">
                  <img 
                    src="https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300" 
                    alt="Dr. Sarah Johnson" 
                    className="w-24 h-24 rounded-full object-cover mr-6 border-4 border-white/20"
                  />
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold mb-2">Dr. Sarah Johnson</h1>
                    <p className="text-xl mb-1">OB-GYN Specialist</p>
                    <p className="text-lg text-gray-200">MD, FACOG</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-lg mb-3 text-gray-200 font-medium">Women's Health & Reproductive Medicine</p>
                  <p className="text-base text-gray-300 leading-relaxed">
                    Board-certified gynecologist specializing in comprehensive women's healthcare, 
                    reproductive medicine, and minimally invasive surgical procedures. 
                    Committed to providing personalized, compassionate care for women of all ages.
                  </p>
                </div>
                
                {/* Key Specializations */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Key Specializations</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center text-sm text-gray-200">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      Reproductive Health
                    </div>
                    <div className="flex items-center text-sm text-gray-200">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      Fertility Consultation
                    </div>
                    <div className="flex items-center text-sm text-gray-200">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      Prenatal Care
                    </div>
                    <div className="flex items-center text-sm text-gray-200">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      Minimally Invasive Surgery
                    </div>
                    <div className="flex items-center text-sm text-gray-200">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      Hormone Therapy
                    </div>
                    <div className="flex items-center text-sm text-gray-200">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                      Preventive Care
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">15+</div>
                    <div className="text-sm text-gray-200">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">2,500+</div>
                    <div className="text-sm text-gray-200">Patients Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">98%</div>
                    <div className="text-sm text-gray-200">Success Rate</div>
                  </div>
                </div>

                {/* Professional Highlights */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Professional Highlights</h3>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-200">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Fellow of American College of Obstetricians & Gynecologists
                    </div>
                    <div className="flex items-center text-sm text-gray-200">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Board Certified in Obstetrics & Gynecology
                    </div>
                    <div className="flex items-center text-sm text-gray-200">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Advanced Laparoscopic Surgery Certified
                    </div>
                    <div className="flex items-center text-sm text-gray-200">
                      <svg className="w-4 h-4 mr-2 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      Member of Society for Reproductive Endocrinology
                    </div>
                  </div>
                </div>

                {/* Availability & Emergency */}
                <div className="mb-6">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">Availability</h3>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-200">Available Today</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-200 mb-3">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <div className="flex items-center text-sm text-gray-200">
                      <svg className="w-4 h-4 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      24/7 Emergency Consultation Available
                    </div>
                  </div>
                </div>
                
                {/* Contact Information */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    <div>
                      <span className="font-medium">(555) 123-4567</span>
                      <span className="text-sm text-gray-300 ml-2">Direct Line</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    <div>
                      <span className="font-medium">dr.johnson@medicalpractice.com</span>
                      <span className="text-sm text-gray-300 ml-2">Secure Email</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <div>
                      <span className="font-medium">123 Medical Center Blvd, Suite 200</span><br />
                      <span className="text-gray-300">Healthcare City, HC 12345</span><br />
                      <span className="text-sm text-gray-300">Free Parking Available</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-secondary mb-6 text-center">Contact Me</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-secondary mb-2">First Name *</label>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-secondary mb-2">Last Name *</label>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-secondary mb-2">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-2">Subject *</label>
                    <select 
                      id="subject" 
                      name="subject" 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="consultation">General Consultation</option>
                      <option value="appointment">Appointment Request</option>
                      <option value="follow-up">Follow-up Question</option>
                      <option value="urgent">Urgent Matter</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">Message *</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={4} 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="Please describe your inquiry or concern..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                    </svg>
                    Send Message
                  </button>
                  
                  <p className="text-sm text-gray-600 text-center mt-3">
                    I'll get back to you within 24 hours.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-secondary mb-8 text-center">About Dr. Johnson</h2>
              <div className="text-lg text-gray-700 leading-relaxed mb-12 text-center">
                <p className="mb-6">
                  Dr. Sarah Johnson is a board-certified gynecologist with over 15 years of experience in women's health. 
                  She specializes in reproductive medicine, minimally invasive surgery, and comprehensive gynecological care.
                </p>
                <p>
                  Dr. Johnson is committed to providing compassionate, personalized care to women of all ages, 
                  ensuring each patient receives the highest quality medical attention in a comfortable and supportive environment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-secondary text-center mb-12">Services Offered</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200">
                <div className="text-primary mb-4 flex justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary mb-3 text-center">Reproductive Health</h3>
                <p className="text-gray-600 text-sm text-center">Comprehensive reproductive health services including fertility consultations and family planning.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200">
                <div className="text-primary mb-4 flex justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary mb-3 text-center">Preventive Care</h3>
                <p className="text-gray-600 text-sm text-center">Regular screenings, annual exams, and preventive care to maintain optimal health.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200">
                <div className="text-primary mb-4 flex justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary mb-3 text-center">Pregnancy Care</h3>
                <p className="text-gray-600 text-sm text-center">Complete prenatal care and support throughout your pregnancy journey.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200">
                <div className="text-primary mb-4 flex justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary mb-3 text-center">Specialized Surgery</h3>
                <p className="text-gray-600 text-sm text-center">Minimally invasive surgical procedures with advanced techniques and technology.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-secondary text-center mb-12">Additional Specializations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary mb-2">Hormone Therapy</h3>
                <p className="text-gray-600">Comprehensive hormone replacement therapy and management.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary mb-2">Emergency Care</h3>
                <p className="text-gray-600">24/7 emergency consultation and urgent care services.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-secondary mb-2">Patient Education</h3>
                <p className="text-gray-600">Comprehensive health education and wellness programs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-secondary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Dr. Sarah Johnson</h3>
              <p className="text-gray-300 mb-6">OB-GYN Specialist | Women's Health & Reproductive Medicine</p>
              
              <div className="flex justify-center items-center space-x-8 mb-8">
                <a href="tel:(555) 123-4567" className="flex items-center hover:text-primary transition-colors duration-200">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  (555) 123-4567
                </a>
                
                <a href="mailto:dr.johnson@medicalpractice.com" className="flex items-center hover:text-primary transition-colors duration-200">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Email
                </a>
              </div>
              
              <div className="border-t border-gray-600 pt-8">
                <p className="text-gray-400 text-sm">
                  © 2025 Dr. Sarah Johnson. All rights reserved. | Professional Healthcare Services
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}