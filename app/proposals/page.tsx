import type { Metadata } from "next";
import Link from "next/link";
import Footer from "../../components/Footer";
import { Icon } from "../../components/Icons";
import Navbar from "../../components/Navbar";
import ProposalGenderAvatar from "../../components/ProposalGenderAvatar";

export const metadata: Metadata = {
  title: "Available Proposals | Trust Forever",
  description: "Explore sincere marriage proposals with Trust Forever.",
};

export default function ProposalsPage() {
  return (
    <>
      <Navbar />
      <main className="proposal-page proposal-selection-page">
        <section
          className="proposal-section home-section-spacing home-section-gutter"
          aria-labelledby="proposal-selection-title"
        >
          <div className="proposal-container">
            <header className="home-section-header proposal-page-header">
              <span className="eyebrow home-section-eyebrow">
                THOUGHTFUL INTRODUCTIONS
              </span>
              <h1 className="home-section-title" id="proposal-selection-title">
                Available <em>Proposals</em>
              </h1>
              <p className="home-section-description proposal-page-description">
                Your journey to a meaningful connection starts here.
              </p>
              <p className="proposal-selection-supporting">
                Explore carefully organized marriage proposals and discover a
                partner who shares your values, ambitions, and dreams.
              </p>
            </header>

            <div className="proposal-gender-grid">
              <Link
                className="proposal-gender-card proposal-gender-card-female"
                href="/proposals/female"
                aria-label="Explore female profiles"
              >
                <ProposalGenderAvatar variant="female" />
                <span className="proposal-gender-overlay" aria-hidden="true" />
                <span className="proposal-gender-content">
                  <span className="proposal-gender-badge">
                    <Icon name="user" size={15} filled />
                    FOR WOMEN
                  </span>
                  <span className="proposal-gender-title">Female Proposals</span>
                  <span className="proposal-gender-divider" aria-hidden="true" />
                  <span className="proposal-gender-description">
                    Discover profiles of eligible women from Pakistan and
                    around the world.
                  </span>
                  <span className="proposal-gender-cta">
                    Explore Female Profiles <Icon name="arrow" size={17} />
                  </span>
                </span>
              </Link>

              <Link
                className="proposal-gender-card proposal-gender-card-male"
                href="/proposals/male"
                aria-label="Explore male profiles"
              >
                <ProposalGenderAvatar variant="male" />
                <span className="proposal-gender-overlay" aria-hidden="true" />
                <span className="proposal-gender-content">
                  <span className="proposal-gender-badge">
                    <Icon name="user" size={15} filled />
                    FOR MEN
                  </span>
                  <span className="proposal-gender-title">Male Proposals</span>
                  <span className="proposal-gender-divider" aria-hidden="true" />
                  <span className="proposal-gender-description">
                    Discover profiles of eligible men from Pakistan and around
                    the world.
                  </span>
                  <span className="proposal-gender-cta">
                    Explore Male Profiles <Icon name="arrow" size={17} />
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
