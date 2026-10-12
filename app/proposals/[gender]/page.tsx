import { notFound } from "next/navigation";
import ProposalCategoryPage from "../../../components/ProposalCategoryPage";
import type { ProposalGender } from "../../../lib/availableProposals";

export default async function ProposalGenderPage({
  params,
}: {
  params: Promise<{ gender: string }>;
}) {
  const { gender } = await params;

  if (gender !== "male" && gender !== "female") {
    notFound();
  }

  return <ProposalCategoryPage gender={gender as ProposalGender} />;
}
