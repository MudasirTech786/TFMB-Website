import type { Metadata } from "next";
import Link from "next/link";
import "./about.css";
import { Icon } from "../../components/Icons";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export const metadata: Metadata = {
  title: "About Us | Trust Forever",
  description:
    "Learn about Trust Forever's matchmaking approach, member journey, and service process.",
};

const benefits = [
  {
    icon: "users" as const,
    title: "Extensive Network",
    description:
      "We maintain a broad member database to offer individuals a range of profiles and opportunities to explore potentially suitable matches.",
  },
  {
    icon: "heart" as const,
    title: "A Thoughtful Matching Process",
    description:
      "Our matching approach considers individual preferences and compatibility to help identify relevant proposals.",
  },
  {
    icon: "shield" as const,
    title: "Trusted and Respectful Service",
    description:
      "Established in 2010, Trust Forever aims to provide a respectful, professional experience focused on clear communication and the needs of individuals and families.",
  },
  {
    icon: "spark" as const,
    title: "Focus on Genuine Connections",
    description:
      "We encourage a careful approach to matchmaking, helping members evaluate suitable proposals and make informed decisions throughout their journey.",
  },
];

const joiningSteps = [
  <>
    We identify and shortlist <strong>potentially compatible profiles</strong>{" "}
    from the available member database.
  </>,
  <>
    You receive selected proposals with brief profile details and, where
    applicable and permitted, contact information.
  </>,
  <>
    Although a broad range of profiles may be available, our approach
    prioritizes <strong>relevant proposals over quantity</strong>.
  </>,
  <>
    Our aim is to help you explore potential life partners whose values,
    background, and future aspirations align with your preferences.
  </>,
];

const processSteps = [
  {
    number: "01",
    title: "Profile Creation",
    description:
      "Confirm your eligibility, submit your profile, and pay the applicable non-refundable registration fee to begin the process.",
  },
  {
    number: "02",
    title: "Matching Process",
    description:
      "Receive 3–4 proposals weekly through WhatsApp, according to the service terms. Review and shortlist profiles, and arrange meetings when there is mutual interest.",
  },
  {
    number: "03",
    title: "Finalization & Closure",
    description:
      "Any applicable final fee is payable according to the agreed service terms. The service concludes after a match or the expiry of the applicable service period. Misconduct may result in termination under the relevant terms.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  id?: string;
}) {
  return (
    <header className="home-section-header">
      <span className="eyebrow home-section-eyebrow">{eyebrow}</span>
      <h2 className="home-section-title" id={id}>{title}</h2>
      {description ? (
        <p className="home-section-description">{description}</p>
      ) : null}
    </header>
  );
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="tf-about">
        <section
          className="tf-about-intro home-section-gutter"
          aria-labelledby="about-title"
        >
          <div className="tf-about-container">
            <header className="home-section-header">
              <span className="eyebrow home-section-eyebrow">
                About Trust Forever Marriage Bureau
              </span>
              <h1 className="home-section-title" id="about-title">
                A Trusted Journey Towards Meaningful Relationships
              </h1>
              <p className="home-section-description">
                Trust Forever was established in Pakistan in 2010 and has
                developed its matchmaking approach through years of experience
                and insights into the needs of individuals and families seeking
                a life partner.
              </p>
            </header>
            <span className="tf-about-divider" aria-hidden="true" />
          </div>
        </section>

        <section
          className="tf-about-section home-section-spacing home-section-gutter"
          id="our-story"
          aria-labelledby="story-title"
        >
          <div className="tf-about-container tf-about-story">
            <div className="tf-about-story-heading">
              <SectionHeading
                eyebrow="Our Story"
                title="Our Story"
                id="story-title"
              />
              <span className="tf-about-established">
                <strong>2010</strong>
                <span>Established in Pakistan</span>
              </span>
            </div>
            <div className="tf-about-story-copy">
              <p>
                Trust Forever was established in Pakistan in 2010 and has since
                grown into a recognized matchmaking platform. Over the years,
                our experience and insights from the field have helped us
                develop a thoughtful matchmaking process designed around
                individual preferences and family expectations.
              </p>
              <p>
                Our reputation is built on the service we provide and our
                commitment to helping people navigate an important life
                decision with care.
              </p>
              <p>
                At Trust Forever, we believe your success is our shared
                mission. We aim to support you throughout your matchmaking
                journey, provided we are kept informed about your preferences
                and evolving needs.
              </p>
            </div>
          </div>
        </section>

        <section
          className="tf-about-section tf-about-why home-section-spacing home-section-gutter"
          id="why-trust-forever"
          aria-labelledby="why-title"
        >
          <div className="tf-about-container">
            <SectionHeading
              eyebrow="Why Trust Forever?"
              title="Why Choose Trust Forever?"
              id="why-title"
              description="Choosing the right matchmaking service is an important decision that requires trust, credibility, and a thoughtful process. Trust Forever combines its experience with a broad member network to help individuals explore suitable life-partner proposals."
            />
            <p className="tf-about-mantra">
              Experience. <span>Trust.</span> Meaningful Connections.
            </p>
            <div className="tf-about-benefits">
              {benefits.map((benefit, index) => (
                <article className="tf-about-benefit" key={benefit.title}>
                  <span className="tf-about-benefit-icon" aria-hidden="true">
                    <Icon name={benefit.icon} size={20} />
                  </span>
                  <span className="tf-about-benefit-number">
                    0{index + 1}
                  </span>
                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="tf-about-section home-section-spacing home-section-gutter"
          id="joining"
          aria-labelledby="joining-title"
        >
          <div className="tf-about-container tf-about-joining">
            <div className="tf-about-joining-intro">
              <SectionHeading
                eyebrow="Your Membership"
                title="What Happens When You Join?"
                id="joining-title"
                description="Your journey begins by completing the Trust Forever registration form. This helps us understand your background, preferences, and the qualities you are looking for in a life partner."
              />
            </div>
            <ol className="tf-about-checklist">
              {joiningSteps.map((step, index) => (
                <li key={index}>
                  <span aria-hidden="true">
                    <Icon name="check" size={14} />
                  </span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="tf-about-section tf-about-process home-section-spacing home-section-gutter"
          id="how-it-works"
          aria-labelledby="process-title"
        >
          <div className="tf-about-container">
            <SectionHeading
              eyebrow="The Process"
              title="How It Works"
              id="process-title"
              description="Step Into a World of Meaningful Proposals"
            />
            <ol className="tf-about-steps">
              {processSteps.map((step) => (
                <li className="tf-about-step" key={step.number}>
                  <span className="tf-about-step-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="tf-about-closing home-section-gutter"
          id="about-contact"
          aria-labelledby="closing-title"
        >
          <div className="tf-about-closing-inner">
            <div>
              <span className="tf-about-closing-eyebrow">
                Your Journey Starts Here
              </span>
              <h2 id="closing-title">
                Take the Next Step Towards a Meaningful Connection
              </h2>
              <p>
                Every matchmaking journey begins with understanding what
                matters to you. Connect with our team to learn more about the
                process and the available services.
              </p>
            </div>
            <div className="tf-about-closing-actions">
              <a
                className="button button-gold"
                href="https://wa.me/923022525228?text=Hello%2C%20I%27d%20like%20a%20free%20matrimonial%20consultation."
                target="_blank"
                rel="noreferrer"
              >
                Talk to Our Team
                <Icon name="arrow" size={16} />
              </a>
              <Link className="tf-about-membership-link" href="/proposals">
                Explore Membership
                <Icon name="arrow" size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
