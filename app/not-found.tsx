import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-state">
      <p className="section-kicker">404 · SCOOP NOT FOUND</p>
      <h1>This flavour wandered off.</h1>
      <p>The page you were looking for is not on today&apos;s menu.</p>
      <Link className="button button-primary" href="/">Back to Janushan</Link>
    </main>
  );
}
