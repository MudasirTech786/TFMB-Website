import Link from "next/link";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import TrendingProfileCard from "../../../components/TrendingProfileCard";
import { fetchPublicProfile } from "../../../lib/publicTrendingProfiles";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;
  const profile = await fetchPublicProfile(profileId);

  return (
    <>
      <Navbar />
      <main className="proposal-page proposal-listing-page">
        <section className="proposal-section home-section-spacing home-section-gutter">
          <div className="proposal-container">
            <nav className="proposal-breadcrumbs" aria-label="Breadcrumb">
              <Link href="/proposals">Available Proposals</Link>
              <span aria-hidden="true">/</span>
              <span>Profile details</span>
            </nav>
            {profile ? (
              <>
                <header className="proposal-listing-header">
                  <div>
                    <span className="eyebrow home-section-eyebrow">TRUST FOREVER INTRODUCTIONS</span>
                    <h1 className="home-section-title">Profile {profile.id}</h1>
                    <p className="proposal-selection-supporting">Public information shared by Trust Forever.</p>
                  </div>
                  <div className="proposal-listing-actions">
                    <Link className="proposal-back-link" href={`/proposals/${profile.gender.toLowerCase()}`}>Browse proposals</Link>
                  </div>
                </header>
                <div className="proposal-list-grid">
                  <TrendingProfileCard profile={profile} variant="directory" detail />
                </div>
              </>
            ) : (
              <div className="proposal-empty-state" role="status">
                <h1>Profile unavailable</h1>
                <p>This profile could not be loaded. It may no longer be available, or the proposal service may be temporarily offline.</p>
                <Link className="proposal-back-link" href="/proposals">Browse available proposals</Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
