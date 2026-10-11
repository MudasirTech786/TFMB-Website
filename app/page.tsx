import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProfileSearch from "../components/ProfileSearch";
import { ProfileSearchProvider } from "../components/ProfileSearchContext";
import ExploreCities from "../components/ExploreCities";
import IntroProfiles from "../components/intro";
import TrendingProfiles from "../components/TrendingProfiles";
import SuccessStories from "../components/SuccessStories";
import StatsSection from "../components/StatsSection";
import Matchmakers from "../components/Matchmakers";
import HomepageMotion from "../components/HomepageMotion";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <ProfileSearchProvider>
        <main>
          <HomepageMotion />
          <Hero />
          <ProfileSearch />
          <ExploreCities />
          <IntroProfiles />
          <TrendingProfiles />
          <SuccessStories />
          <StatsSection />
          <Matchmakers />
        </main>
      </ProfileSearchProvider>
      <Footer />
    </>
  );
}
