import type { Metadata } from "next";
import ComingSoonPage from "../../components/ComingSoonPage";

export const metadata: Metadata = {
  title: "Available Proposals | Trust Forever",
  description: "Explore sincere marriage proposals with Trust Forever.",
};

export default function ProposalsPage() {
  return (
    <ComingSoonPage
      section="Available Proposals"
      title="Coming Soon."
      description="We’re creating a thoughtful space to discover sincere profiles and introductions. Available proposals will be here soon."
    />
  );
}
