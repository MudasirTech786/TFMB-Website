import Link from "next/link";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import TrendingProfileCard from "../../../components/TrendingProfileCard";
import {
  searchPublicProfiles,
  type PublicProfileSearchFilters,
} from "../../../lib/publicTrendingProfiles";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

const maritalLabels: Record<string, string> = {
  unmarried: "Never Married",
  married: "Married",
  divorced: "Divorced",
  widowed: "Widow / Widower",
};

const educationLabels: Record<string, string> = {
  matric: "Matric",
  intermediate: "Intermediate",
  bachelors: "Bachelor's",
  masters: "Master's",
  mphil: "MPhil",
  phd: "PhD",
  professional: "Professional Degree",
};

export default async function ProfileSearchResultsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = await searchParams;
  const pageValue = firstValue(query.page);
  const requestedPage = Number(pageValue ?? 1);
  const filters: PublicProfileSearchFilters = {
    gender: firstValue(query.gender),
    marital_status: firstValue(query.marital_status),
    education: firstValue(query.education),
    caste: firstValue(query.caste),
    sect: firstValue(query.sect),
    city: firstValue(query.city),
    search: firstValue(query.search),
    profession: firstValue(query.profession),
    min_age: firstValue(query.min_age),
    max_age: firstValue(query.max_age),
    page: Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1,
    per_page: 24,
  };
  const { profiles, total, currentPage, lastPage, error } = await searchPublicProfiles(filters);
  const pageHref = (nextPage: number) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (key !== "page" && key !== "per_page" && value) params.set(key, String(value));
    }
    params.set("page", String(nextPage));
    return `/profiles/search?${params.toString()}`;
  };
  const appliedFilters = [
    filters.gender && (filters.gender === "male" ? "Male" : "Female"),
    filters.marital_status && maritalLabels[filters.marital_status],
    filters.education && educationLabels[filters.education],
    filters.caste,
    filters.sect && `Sect: ${filters.sect}`,
    filters.city,
    filters.search && `Search: ${filters.search}`,
    filters.profession && `Profession: ${filters.profession}`,
    filters.min_age && `Age ${filters.min_age}+`,
    filters.max_age && `Up to ${filters.max_age}`,
  ].filter(Boolean);

  return (
    <>
      <Navbar />
      <main className="proposal-page proposal-listing-page">
        <section className="proposal-section home-section-spacing home-section-gutter">
          <div className="proposal-container">
            <nav className="proposal-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              <span>Profile search</span>
            </nav>

            <header className="proposal-listing-header">
              <div>
                <span className="eyebrow home-section-eyebrow">TRUST FOREVER INTRODUCTIONS</span>
                <h1 className="home-section-title">Search Results</h1>
                <p className="proposal-selection-supporting">
                  {appliedFilters.length > 0
                    ? `Profiles matching ${appliedFilters.join(" · ")}`
                    : "The latest matching profiles from our database."}
                </p>
              </div>
              <div className="proposal-listing-actions">
                <Link className="proposal-back-link" href="/#search">Update Search</Link>
              </div>
            </header>

            {!error && profiles.length > 0 && (
              <div className="proposal-listing-meta">
                <span>{profiles.length} {profiles.length === 1 ? "profile" : "profiles"} shown</span>
                {total > profiles.length && <span>{total} matches · page {currentPage} of {lastPage}</span>}
              </div>
            )}

            {error ? (
              <div className="proposal-empty-state" role="alert">
                <h2>Search is temporarily unavailable</h2>
                <p>Please try again shortly or return to the search form.</p>
                <Link className="proposal-back-link" href="/#search">Back to Search</Link>
              </div>
            ) : profiles.length > 0 ? (
              <div className="proposal-list-grid">
                {profiles.map((profile) => (
                  <TrendingProfileCard key={profile.id} profile={profile} variant="directory" showMudasirContact />
                ))}
                {lastPage > 1 && <nav className="proposal-pagination" aria-label="Profile pages">
                  {currentPage > 1 && <Link className="proposal-back-link" href={pageHref(currentPage - 1)}>Previous</Link>}
                  <span>Page {currentPage} of {lastPage}</span>
                  {currentPage < lastPage && <Link className="proposal-back-link" href={pageHref(currentPage + 1)}>Next</Link>}
                </nav>}
              </div>
            ) : (
              <div className="proposal-empty-state" role="status">
                <h2>No matching profiles found</h2>
                <p>Try changing one or more preferences to see other available profiles.</p>
                <Link className="proposal-back-link" href="/#search">Change Search</Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
