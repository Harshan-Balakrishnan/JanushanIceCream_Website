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

      <div className="footer-socials" aria-label="Janushan Ice Cream social links">
        <a href="https://www.instagram.com/janushan_ice_cream/" target="_blank" rel="noreferrer" aria-label="Follow Janushan Ice Cream on Instagram">
          <span aria-hidden="true">◎</span>
          <strong>Instagram</strong>
        </a>
        <a href="https://www.facebook.com/janushanicecream" target="_blank" rel="noreferrer" aria-label="Follow Janushan Ice Cream on Facebook">
          <span aria-hidden="true">f</span>
          <strong>Facebook</strong>
        </a>
        <a href="https://www.google.com/search?q=Janushan+Ice+Cream+Vavuniya" target="_blank" rel="noreferrer" aria-label="Review Janushan Ice Cream on Google">
          <span aria-hidden="true">★</span>
          <strong>Review us on Google</strong>
        </a>
      </div>

      <div className="footer-actions">
        <a className="footer-top" href="#home">Back to the top ↑</a>
        <a className="footer-order" href="https://wa.me/94776015041?text=Hi%20Janushan%20Ice%20Cream!%20I'd%20like%20to%20place%20an%20order." target="_blank" rel="noreferrer">Order on WhatsApp ↗</a>
      </div>

      <div className="footer-bottom">
        <span>© Janushan Ice Cream · Since 2004</span>
        <span>Vavuniya · Sri Lanka</span>
      </div>
    </footer>
  );
}
