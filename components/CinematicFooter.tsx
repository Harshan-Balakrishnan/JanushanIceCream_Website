import Image from "next/image";

export default function CinematicFooter() {
  return (
    <footer className="cinematic-footer" id="footer">
      <div className="footer-stars">{Array.from({ length: 18 }).map((_, i) => <i key={i} />)}</div>
      <div className="footer-orbit footer-orbit-one" />
      <div className="footer-orbit footer-orbit-two" />
      <div className="footer-cone" aria-hidden="true"><span className="footer-scoop" /><span className="footer-cone-body" /></div>
      <Image src="/brand/Brand Logo.png" alt="Janushan Ice Cream" width={390} height={390} className="footer-logo" />
      <p className="footer-kicker">JANUSHAN ICE CREAM · SINCE 2004</p>
      <h2>A Scoop of <em>Happiness.</em></h2>
      <p className="footer-line">Made fresh. Served with love.</p>
      <div className="social-links" aria-label="Janushan Ice Cream social links">
        <a className="social-link facebook" href="https://www.facebook.com/janushanicecream" target="_blank" rel="noreferrer" aria-label="Janushan Ice Cream on Facebook">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.6v8h2.9Z"/></svg>
          <span>Facebook</span>
        </a>
        <a className="social-link instagram" href="https://www.instagram.com/janushan_ice_cream/" target="_blank" rel="noreferrer" aria-label="Janushan Ice Cream on Instagram">
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.4" cy="6.7" r="1.2" fill="currentColor"/></svg>
          <span>Instagram</span>
        </a>
        <a className="social-link google" href="https://www.google.com/search?q=Janushan+Ice+Cream+Vavuniya" target="_blank" rel="noreferrer" aria-label="Janushan Ice Cream Google reviews">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.4 12.2c0-.7-.1-1.4-.2-2h-9.2v3.8h5.3a4.5 4.5 0 0 1-2 3v2.5h3.2c1.9-1.7 2.9-4.1 2.9-7.3Z"/><path fill="currentColor" d="M12 21.7c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 .9-3.4.9-2.6 0-4.8-1.8-5.6-4.2H3.1V16c1.7 3.4 5 5.7 8.9 5.7Z"/><path fill="currentColor" d="M6.4 13.5a5.8 5.8 0 0 1 0-3.1V8H3.1a9.8 9.8 0 0 0 0 8l3.3-2.5Z"/><path fill="currentColor" d="M12 6.2c1.5 0 2.8.5 3.8 1.5l2.8-2.8C17 3.3 14.7 2.3 12 2.3 8.1 2.3 4.8 4.6 3.1 8l3.3 2.5C7.2 8 9.4 6.2 12 6.2Z"/></svg>
          <span>Google Reviews</span>
        </a>
      </div>
      <a className="footer-top" href="#home">Back to the top ↑</a>
      <div className="footer-bottom"><span>© Janushan Ice Cream</span><span>Made in Sri Lanka</span></div>
    </footer>
  );
}
