export default function ContactExperience() {
  const socials = [
    { label: "Instagram", href: "https://www.instagram.com/janushan_ice_cream/", icon: "◎" },
    { label: "Facebook", href: "https://www.facebook.com/janushanicecream", icon: "f" },
  ];

  return (
    <section className="contact-world section" id="contact">
      <div className="contact-glow" />
      <div className="contact-copy">
        <p className="section-kicker">SAY HELLO</p>
        <h2>Have something <em>sweet</em> in mind?</h2>
        <p>For product enquiries, shop information, availability or anything Janushan Ice Cream, reach us directly.</p>
        <p className="contact-social-label">Follow Janushan</p>
        <div className="social-links contact-socials">
          {socials.map((social) => <a key={social.label} className="social-link" href={social.href} target="_blank" rel="noopener noreferrer" aria-label={`Follow Janushan Ice Cream on ${social.label}`}><span className="social-icon" aria-hidden="true">{social.icon}</span>{social.label}</a>)}
        </div>
      </div>

      <div className="contact-cards">
        <a href="tel:+94242226041" className="contact-card"><span>01</span><small>CALL</small><strong>024 222 6041</strong><i>↗</i></a>
        <a href="https://wa.me/94776015041" target="_blank" rel="noopener noreferrer" className="contact-card"><span>02</span><small>WHATSAPP</small><strong>077 601 5041</strong><i>↗</i></a>
        <a href="mailto:ramayabalan08@gmail.com" className="contact-card"><span>03</span><small>EMAIL</small><strong>ramayabalan08@gmail.com</strong><i>↗</i></a>
      </div>
    </section>
  );
}
