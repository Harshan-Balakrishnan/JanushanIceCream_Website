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
      <a className="footer-top" href="#home">Back to the top ↑</a>
      <div className="footer-bottom"><span>© Janushan Ice Cream</span><span>Made in Sri Lanka</span></div>
    </footer>
  );
}
