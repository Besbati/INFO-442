import React from 'react';
import '../styles/AboutPage.css';

function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-content">
        <h1 className="about-title">About Us</h1>

        <div className="about-section">
          <h2 className="section-title">Our Mission</h2>
          <p className="section-text">
            Know Before You Go empowers travelers and nature enthusiasts to make informed, responsible decisions
            by providing location-based information about endangered species. We believe that awareness is the
            first step toward conservation, and by connecting people with the vulnerable wildlife around them,
            we can collectively reduce unintentional harm to our planet's biodiversity.
          </p>
        </div>

        <div className="about-section">
          <h2 className="section-title">The Problem</h2>
          <p className="section-text">
            Despite growing interest in sustainable tourism and ecotourism, travelers often lack accessible,
            location-specific information about the endangered species near the places they visit. This gap
            between conservation knowledge and visitor awareness leads to:
          </p>
          <ul className="problem-list">
            <li>Unintentional habitat destruction through off-trail exploration</li>
            <li>Wildlife disturbance from approaching or interacting with protected species</li>
            <li>Continuing decline of vulnerable populations despite conservation efforts</li>
            <li>Missed opportunities for meaningful community involvement in conservation</li>
          </ul>
        </div>

        <div className="about-section">
          <h2 className="section-title">Our Solution</h2>
          <p className="section-text">
            We've created an interactive, map-based platform that allows users to:
          </p>
          <ul className="solution-list">
            <li>Search for endangered species by address or ZIP code within a customizable radius</li>
            <li>Explore species through an interactive map with visual icons for different taxonomic groups</li>
            <li>Access detailed information about each species, including endangerment levels and descriptions</li>
            <li>Learn about conservation status classifications and their meanings</li>
            <li>Discover practical ways to protect wildlife during their travels</li>
          </ul>
        </div>

        <div className="about-section">
          <h2 className="section-title">Our Goals</h2>

          <div className="goals-grid">
            <div className="goal-card">
              <h3 className="goal-title">Raise Awareness</h3>
              <p className="goal-text">
                Educate travelers about the endangered species living in and around the places they visit,
                fostering a deeper connection to local ecosystems.
              </p>
            </div>

            <div className="goal-card">
              <h3 className="goal-title">Inspire Action</h3>
              <p className="goal-text">
                Empower individuals to modify their behavior in ways that reduce harm to vulnerable species
                and their habitats.
              </p>
            </div>

            <div className="goal-card">
              <h3 className="goal-title">Build Community</h3>
              <p className="goal-text">
                Create a platform where conservation awareness becomes part of trip planning, making responsible
                travel the norm rather than the exception.
              </p>
            </div>
          </div>
        </div>

        <div className="about-section cta-section">
          <h2 className="cta-title">Join Us in Making a Difference</h2>
          <p className="cta-text">
            Every search, every discovery, and every action counts. Together, we can protect the incredible
            biodiversity that makes our planet unique. Start exploring today and become part of the solution.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
