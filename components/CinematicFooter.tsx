import Image from "next/image";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/janushan_ice_cream/", icon: "◎" },
  { label: "Facebook", href: "https://www.facebook.com/janushanicecream", icon: "f" },
];

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
      <div className="social-links" aria-label="Janushan Ice Cream social media">
        {socials.map((social) => <a key={social.label} className="social-link" href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Follow Janushan Ice Cream on ${social.label}`}><span className="social-icon" aria-hidden="true">{social.icon}</span>{social.label}</a>)}
      </div>
      <a className="footer-top" href="#home">Back to the top ↑</a>
      <div className="footer-bottom"><span>© Janushan Ice Cream</span><span>Made in Sri Lanka</span></div>
    </footer>
  );
}
