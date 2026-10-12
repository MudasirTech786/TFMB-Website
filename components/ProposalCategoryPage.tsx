import Link from "next/link";
import Footer from "./Footer";
import { Icon, type IconName } from "./Icons";
import Navbar from "./Navbar";
import {
  getProposalCategoryLinks,
  getProposalGenderLabel,
  proposalRegions,
  type ProposalGender,
} from "../lib/availableProposals";

const categoryIcons: Record<string, IconName> = {
  doctors: "heart",
  engineers: "cap",
  "other-educated": "landmark",
  "late-marriage": "calendar",
  "second-marriage": "users",
  "ahle-tashi": "spark",
};

export default function ProposalCategoryPage({
  gender,
}: {
  gender: ProposalGender;
}) {
  const genderLabel = getProposalGenderLabel(gender);

  return (
    <>
      <Navbar />
      <main className="proposal-page">
        <section
          className="proposal-section proposal-category-section home-section-spacing home-section-gutter"
          aria-labelledby="proposal-category-title"
        >
          <div className="proposal-container">
            <nav className="proposal-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/proposals">Available Proposals</Link>
              <Icon name="arrow" size={13} />
              <span>{genderLabel} Proposals</span>
            </nav>

            <header className="home-section-header proposal-page-header">
              <span className="eyebrow home-section-eyebrow">
                THOUGHTFUL INTRODUCTIONS
              </span>
              <h1 className="home-section-title" id="proposal-category-title">
                Available {genderLabel} <em>Proposals</em>
              </h1>
              <p className="home-section-description proposal-page-description">
                The right partner, the right time.
              </p>
              <p className="proposal-selection-supporting">
                Browse proposal categories by region and find profiles that
                align with what matters to you.
              </p>
            </header>

            <nav className="proposal-region-nav" aria-label="Jump to a region">
              {proposalRegions.map((region) => (
                <a key={region.slug} href={`#region-${region.slug}`}>
                  {region.name}
                </a>
              ))}
            </nav>

            <div className="proposal-regions">
              {proposalRegions.map((region) => (
                <section
                  className="proposal-region"
                  id={`region-${region.slug}`}
                  key={region.slug}
                  aria-labelledby={`region-title-${region.slug}`}
                >
                  <header className="proposal-region-heading">
                    <span className="proposal-region-mark" aria-hidden="true">
                      <Icon name="pin" size={17} />
                    </span>
                    <div>
                      <h2 id={`region-title-${region.slug}`}>
                        {genderLabel} {region.name} Profiles
                      </h2>
                      <p>Explore proposals by category</p>
                    </div>
                    <span className="proposal-region-rule" aria-hidden="true" />
                  </header>

                  <div className="proposal-category-grid">
                    {getProposalCategoryLinks(gender, region).map((category) => (
                      <Link
                        className="proposal-category-card"
                        href={category.href}
                        key={category.slug}
                      >
                        <span className="proposal-category-icon">
                          <Icon
                            name={categoryIcons[category.slug] ?? "spark"}
                            size={18}
                          />
                        </span>
                        <span className="proposal-category-name">
                          {region.name} {category.name}
                        </span>
                        <Icon
                          className="proposal-category-arrow"
                          name="arrow"
                          size={15}
                        />
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
