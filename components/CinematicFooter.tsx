import Image from "next/image";

export default function CinematicFooter() {
  return (
    <footer className="cinematic-footer" id="footer">
      <div className="footer-stars">{Array.from({ length: 18 }).map((_, i) => <i key={i} />)}</div>
      <div className="footer-orbit footer-orbit-one" />
      <div className="footer-orbit footer-orbit-two" />
      <Image src="/brand/Brand Logo.png" alt="Janushan Ice Cream" width={390} height={390} className="footer-logo" />
      <p className="footer-kicker">JANUSHAN ICE CREAM · SINCE 2004</p>
      <h2>A Scoop of <em>Happiness.</em></h2>
      <p className="footer-line">Made fresh. Served with love.</p>
      <p className="footer-address">No: 256/4, Kali Kovil Road, Nelukkulam, Vavuniya, Sri Lanka · 024 222 6041</p>
      <div className="social-links" aria-label="Janushan Ice Cream social links">
        <a className="social-link facebook" href="https://www.facebook.com/janushanicecream" target="_blank" rel="noreferrer" aria-label="Janushan Ice Cream on Facebook">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.6v8h2.9Z"/></svg>
          <span>Facebook</span>
        </a>
        <a className="social-link instagram" href="https://www.instagram.com/janushan_ice_cream/" target="_blank" rel="noreferrer" aria-label="Janushan Ice Cream on Instagram">
          <svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="footer-instagram-gradient" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#FFDC80"/><stop offset=".35" stop-color="#F77737"/><stop offset=".65" stop-color="#E1306C"/><stop offset="1" stop-color="#833AB4"/></linearGradient></defs><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" fill="none" stroke="url(#footer-instagram-gradient)" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="url(#footer-instagram-gradient)" stroke-width="2"/><circle cx="17.4" cy="6.7" r="1.2" fill="#E1306C"/></svg>
          <span>Instagram</span>
        </a>
        <a className="social-link google" href="https://www.google.com/search?q=Janushan+Ice+Cream+Vavuniya" target="_blank" rel="noreferrer" aria-label="Janushan Ice Cream Google reviews">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"/><path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.75Z"/><path fill="#FBBC05" d="M6.54 13.84A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.26.31-1.84V7.63H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.37l3.25-2.53Z"/><path fill="#EA4335" d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.13 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.71 5.38l3.25 2.53C7.31 7.85 9.46 6.13 12 6.13Z"/></svg>
          <span>Google Reviews</span>
        </a>
      </div>
      <nav className="footer-nav" aria-label="Footer navigation">
        <a href="#menu">Menu</a>
        <a href="#flavours">Flavours</a>
        <a href="#story">Our Story</a>
        <a href="#gallery">Gallery</a>
        <a href="#locations">Find Us</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="footer-top" href="#home">Back to the top ↑</a>
      <div className="footer-bottom">
        <span>© 2026 Janushan Ice Cream</span>
        <span>Made in Sri Lanka</span>
        <span>All rights reserved.</span>
      </div>
    </footer>
  );
}
