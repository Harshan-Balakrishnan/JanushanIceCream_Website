export default function Loading() {
  return (
    <div className="site-state" role="status" aria-live="polite">
      <div className="state-scoop" aria-hidden="true" />
      <p>Preparing your scoop…</p>
    </div>
  );
}
