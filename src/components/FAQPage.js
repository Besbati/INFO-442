import React from 'react';
import '../styles/FAQPage.css';

function FAQPage() {
  const endangermentLevels = [
    {
      code: 'EX',
      name: 'Extinct',
      color: '#000000',
      description: 'No known individuals remain. The species has completely disappeared from Earth. Examples include the Dodo and Passenger Pigeon.'
    },
    {
      code: 'EW',
      name: 'Extinct in the Wild',
      color: '#00008B',
      description: 'Survives only in captivity or as a naturalized population outside its historic range. No wild populations exist. Examples include the Hawaiian Crow.'
    },
    {
      code: 'CR',
      name: 'Critically Endangered',
      color: '#8B0000',
      description: 'Faces an extremely high risk of extinction in the wild. Population has decreased by 80-90% or fewer than 250 mature individuals remain. Examples include the Sumatran Rhino and Vaquita.'
    },
    {
      code: 'EN',
      name: 'Endangered',
      color: '#FF8C00',
      description: 'Faces a high risk of extinction in the wild. Population has decreased by 50-70% or fewer than 2,500 mature individuals remain. Examples include the Giant Panda and Snow Leopard.'
    },
    {
      code: 'VU',
      name: 'Vulnerable',
      color: '#FFD700',
      description: 'Faces a high risk of endangerment in the wild. Population has decreased by 30-50% or fewer than 10,000 mature individuals remain. Examples include the African Lion and Polar Bear.'
    },
    {
      code: 'NT',
      name: 'Near Threatened',
      color: '#90EE90',
      description: 'Close to qualifying for a threatened category in the near future. Not currently threatened but conservation efforts are needed to prevent decline.'
    },
    {
      code: 'LC',
      name: 'Least Concern',
      color: '#228B22',
      description: 'Widespread and abundant. Not currently at risk of extinction. These species have stable or growing populations.'
    }
  ];

  return (
    <div className="faq-page">
      <div className="faq-content">
        <h1 className="faq-title">FAQ</h1>

        <div className="faq-section">
          <h2 className="faq-question">What are the levels of endangerment?</h2>

          <div className="endangerment-levels">
            {endangermentLevels.map((level) => (
              <div key={level.code} className="level-card">
                <div className="level-header">
                  <span
                    className="level-indicator"
                    style={{ backgroundColor: level.color }}
                  ></span>
                  <h3 className="level-name">{level.name} ({level.code})</h3>
                </div>
                <p className="level-description">{level.description}</p>
              </div>
            ))}

            <div className="why-matters-card">
              <h3 className="why-matters-title">Why Does This Matter?</h3>
              <p className="why-matters-text">
                Understanding endangerment levels helps us prioritize conservation efforts and protect biodiversity.
                Each species plays a unique role in its ecosystem, and losing them can have cascading effects on the
                environment and human communities.
              </p>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <h2 className="faq-question">How is endangerment data collected?</h2>
          <p className="faq-answer">
            Our data comes from iNaturalist, a community-driven platform where scientists and nature enthusiasts
            document species observations. We filter for research-grade observations (verified by multiple users)
            and species with conservation status from the IUCN Red List and other authoritative databases.
          </p>
          <p className="faq-answer">
            <strong>Important:</strong> The species shown have been documented in your search area through citizen
            science observations. This may include native species, invasive species, and migratory species - all
            with conservation concerns somewhere in the world. A species being shown doesn't necessarily mean it's
            native to the area, but that it has been observed there and has a conservation status designation.
          </p>
          <p className="faq-answer">
            We require at least 2 observations per species to reduce misidentifications, but some inaccuracies may
            still occur. The data provides valuable insights into biodiversity and conservation awareness in your area.
          </p>
        </div>

        <div className="faq-section">
          <h2 className="faq-question">What are some simple ways of protecting wildlife from human harm?</h2>
          <div className="faq-answer">
            <ul className="protection-list">
              <li><strong>Stay on designated trails:</strong> Wandering off trails can damage sensitive habitats and disturb nesting areas.</li>
              <li><strong>Observe from a distance:</strong> Never approach, touch, or feed wildlife. Use binoculars or zoom lenses instead.</li>
              <li><strong>Keep pets leashed:</strong> Pets can stress wildlife and spread diseases to native species.</li>
              <li><strong>Dispose of trash properly:</strong> Litter can harm wildlife through ingestion or entanglement.</li>
              <li><strong>Respect restricted areas:</strong> These zones protect critical habitats during sensitive times like breeding seasons.</li>
              <li><strong>Avoid using flash photography:</strong> Bright lights can disorient wildlife, especially birds and nocturnal animals.</li>
              <li><strong>Report injured wildlife:</strong> Contact local wildlife authorities rather than attempting rescue yourself.</li>
              <li><strong>Support conservation efforts:</strong> Donate to or volunteer with local conservation organizations.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQPage;
