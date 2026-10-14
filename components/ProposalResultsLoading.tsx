export default function ProposalResultsLoading() {
  return (
    <div role="status" aria-label="Loading proposals" className="proposal-results-loading">
      <span className="sr-only">Loading proposals…</span>
      <div className="proposal-results-loading-card" />
      <div className="proposal-results-loading-card" />
      <div className="proposal-results-loading-card" />
    </div>
  );
}
