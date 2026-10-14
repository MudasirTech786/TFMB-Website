import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../../../components/Footer";
import Navbar from "../../../../components/Navbar";
import TrendingProfileCard from "../../../../components/TrendingProfileCard";
import {
  getProposalGenderLabel,
  resolveProposalListing,
} from "../../../../lib/availableProposals";
import { searchPublicProfiles } from "../../../../lib/publicTrendingProfiles";

export default async function ProposalListingPage({
  params,
  searchParams,
}: {
  params: Promise<{ gender: string; slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const [{ gender, slug }, query] = await Promise.all([params, searchParams]);
  const resolved = resolveProposalListing(gender, slug);

  if (!resolved) {
    notFound();
  }

  const cityNames = resolved.region.cities.map(({ city }) => city).join(",");
  const pageValue = Array.isArray(query.page) ? query.page[0] : query.page;
  const requestedPage = Number(pageValue ?? 1);
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const { profiles, total, currentPage, lastPage, error } = await searchPublicProfiles({
    gender: resolved.gender,
    city: cityNames,
    category: resolved.category.slug,
    page,
    per_page: 24,
  });

  const genderLabel = getProposalGenderLabel(resolved.gender);
  const pageHref = (nextPage: number) => `/proposals/${resolved.gender}/${slug}?page=${nextPage}`;

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

            {!error && <div className="proposal-listing-meta">
              <span>{total} {total === 1 ? "profile" : "profiles"}</span>
              <span>{resolved.region.name}</span>
              <span>{resolved.category.name}</span>
              {lastPage > 1 && <span>Page {currentPage} of {lastPage}</span>}
            </div>}

            {error ? (
              <div className="proposal-empty-state" role="alert">
                <h2>Proposals are temporarily unavailable</h2>
                <p>Please try again shortly. No sample profiles are shown when the service is unavailable.</p>
                <Link className="proposal-back-link" href={`/proposals/${resolved.gender}`}>Browse categories</Link>
              </div>
            ) : profiles.length > 0 ? (
              <div className="proposal-list-grid">
                {profiles.map((profile) => (
                  <TrendingProfileCard
                    key={profile.id}
                    profile={profile}
                    variant="directory"
                    showMudasirContact
                  />
                ))}
                {lastPage > 1 && <nav className="proposal-pagination" aria-label="Profile pages">
                  {currentPage > 1 && <Link className="proposal-back-link" href={pageHref(currentPage - 1)}>Previous</Link>}
                  <span>Page {currentPage} of {lastPage}</span>
                  {currentPage < lastPage && <Link className="proposal-back-link" href={pageHref(currentPage + 1)}>Next</Link>}
                </nav>}
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
