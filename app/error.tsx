"use client";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="site-state" role="alert">
      <p className="section-kicker">SOMETHING MELTED</p>
      <h1>We couldn&apos;t serve this page.</h1>
      <p>Please try again. Your Janushan experience is still here.</p>
      <button className="button button-primary" onClick={() => reset()}>Try again</button>
    </main>
  );
}
