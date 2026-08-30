export default function ContactExperience() {
  return (
    <section className="contact-world section" id="contact">
      <div className="contact-glow" />
      <div className="contact-copy">
        <p className="section-kicker">SAY HELLO</p>
        <h2>
          Have something <em>sweet</em> in mind?
        </h2>
        <p>
          For product enquiries, shop information or anything Janushan Ice
          Cream, reach us directly through the contact channels printed on the
          brand&apos;s packaging.
        </p>
      </div>

      <div className="contact-cards">
        <a
          href="tel:+94242226041"
          className="contact-card"
        >
          <span>01</span>
          <small>CALL</small>
          <strong>024 222 6041</strong>
          <i>↗</i>
        </a>

        <a
          href="https://wa.me/94776015041"
          target="_blank"
          rel="noreferrer"
          className="contact-card"
        >
          <span>02</span>
          <small>WHATSAPP</small>
          <strong>077 601 5041</strong>
          <i>↗</i>
        </a>

        <a
          href="mailto:ramayabalan08@gmail.com"
          className="contact-card"
        >
          <span>03</span>
          <small>EMAIL</small>
          <strong>ramayabalan08@gmail.com</strong>
          <i>↗</i>
        </a>
      </div>
    </section>
  );
}