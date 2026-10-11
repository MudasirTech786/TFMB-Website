import type { Metadata } from "next";
import Footer from "../../components/Footer";
import { Icon } from "../../components/Icons";
import Navbar from "../../components/Navbar";

export const metadata: Metadata = {
  title: "Our Services | Trust Forever",
  description:
    "Explore Trust Forever's personal matchmaking plans and choose the level of support that suits your journey.",
};

const services = [
  {
    plan: "PREMIUM",
    name: "FAST MATCH",
    duration: "1 Month",
    featured: true,
    features: [
      "60–70 verified proposals.",
      "Proposals sent directly through WhatsApp.",
      "Support from two dedicated staff members.",
      "Special assistance group for guidance.",
      "Daily support, including Fridays.",
      "Daily social media promotion.",
      "Profile promotion on 30 WhatsApp statuses.",
      "Privacy maintained according to our service policies.",
    ],
  },
  {
    plan: "STANDARD",
    name: "MATCHING",
    duration: "4 Months",
    featured: false,
    features: [
      "Proposals shared weekly.",
      "Matching based on your preferences.",
      "Assistance from two dedicated staff members.",
      "Guidance throughout the process.",
      "Careful, personalized matching.",
      "Weekly social media promotion.",
      "Profile sharing on WhatsApp numbers, according to the service terms.",
      "Privacy maintained according to our service policies.",
    ],
  },
];

const contactUrl =
  "https://wa.me/?text=Hello%2C%20I%27d%20like%20to%20learn%20more%20about%20Trust%20Forever.";

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="services-page-main">
        <section
          className="services-section home-section-spacing home-section-gutter"
          aria-labelledby="services-title"
        >
          <div className="services-section-inner">
            <header className="home-section-header services-intro">
              <span className="eyebrow home-section-eyebrow">
                OUR MATCHMAKING SERVICES
              </span>
              <h1 className="home-section-title" id="services-title">
                Find the Service That Fits Your <em>Journey</em>
              </h1>
              <p className="home-section-description">
                Explore our matchmaking plans and choose the level of support
                that suits your preferences and expectations.
              </p>
              <span className="services-intro-rule" aria-hidden="true">
                <i />
                <b />
                <i />
              </span>
            </header>

            <div className="services-grid">
              {services.map((service) => (
                <article
                  className={`service-card${service.featured ? " service-card-featured" : ""}`}
                  key={service.plan}
                  aria-labelledby={`service-${service.plan.toLowerCase()}-title`}
                >
                  <header className="service-card-header">
                    <span className="service-plan-label">{service.plan}</span>
                    <h2
                      className="service-duration"
                      id={`service-${service.plan.toLowerCase()}-title`}
                    >
                      {service.duration}
                    </h2>
                    <p className="service-plan-name">{service.name}</p>
                  </header>

                  <div className="service-card-body">
                    <ul className="service-features">
                      {service.features.map((feature) => (
                        <li key={feature}>
                          <span className="service-feature-check">
                            <Icon name="check" size={15} />
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      className="button service-card-cta"
                      href={contactUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Contact us about the ${service.duration} ${service.name} plan`}
                    >
                      Contact Us
                      <Icon name="arrow" size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
