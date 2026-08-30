"use client";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#041128", color: "white", fontFamily: "system-ui" }}>
        <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center", padding: 24 }}>
          <div>
            <h1>Janushan needs a quick refresh.</h1>
            <p>Please try loading the experience again.</p>
            <button onClick={() => reset()} style={{ padding: "12px 20px", borderRadius: 999, border: 0, cursor: "pointer" }}>Try again</button>
          </div>
        </main>
      </body>
    </html>
  );
}
