import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../../../components/Footer";
import Navbar from "../../../../components/Navbar";
import TrendingProfileCard from "../../../../components/TrendingProfileCard";
import {
  getProposalGenderLabel,
  resolveProposalListing,
} from "../../../../lib/availableProposals";
import { getProposalProfilesForListing } from "../../../../lib/proposalProfiles";

export default async function ProposalListingPage({
  params,
}: {
  params: Promise<{ gender: string; slug: string }>;
}) {
  const { gender, slug } = await params;
  const resolved = resolveProposalListing(gender, slug);

  if (!resolved) {
    notFound();
  }

  const profiles = getProposalProfilesForListing(
    resolved.gender,
    resolved.region.slug,
    resolved.category.slug,
  );

  const genderLabel = getProposalGenderLabel(resolved.gender);

  return (
    <>
      <Navbar />
      <main className="proposal-page proposal-listing-page">
        <section className="proposal-section home-section-spacing home-section-gutter">
          <div className="proposal-container">
            <nav className="proposal-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/proposals">Available Proposals</Link>
              <span aria-hidden="true">/</span>
              <Link href={`/proposals/${resolved.gender}`}>
                {genderLabel} Proposals
              </Link>
              <span aria-hidden="true">/</span>
              <span>{resolved.region.name}</span>
              <span aria-hidden="true">/</span>
              <span>{resolved.category.name}</span>
            </nav>

            <header className="proposal-listing-header">
              <div>
                <span className="eyebrow home-section-eyebrow">
                  TRUST FOREVER INTRODUCTIONS
                </span>
                <h1 className="home-section-title" id="proposal-listing-title">
                  {genderLabel} {resolved.region.name} {resolved.category.name}
                </h1>
                <p className="proposal-selection-supporting">
                  Explore thoughtfully selected profiles for this category and
                  begin your journey with confidence.
                </p>
              </div>

              <div className="proposal-listing-actions">
                <Link className="proposal-back-link" href={`/proposals/${resolved.gender}`}>
                  ← Back to Categories
                </Link>
              </div>
            </header>

            <div className="proposal-listing-meta">
              <span>{profiles.length} profiles</span>
              <span>{resolved.region.name}</span>
              <span>{resolved.category.name}</span>
            </div>

            {profiles.length > 0 ? (
              <div className="proposal-list-grid">
                {profiles.map((profile) => (
                  <TrendingProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            ) : (
              <div className="proposal-empty-state" role="status">
                <h2>No profiles found</h2>
                <p>
                  There are no matching introductions for this category at the
                  moment. Please browse a nearby region or return to the full list.
                </p>
                <Link className="proposal-back-link" href={`/proposals/${resolved.gender}`}>
                  Browse categories
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
