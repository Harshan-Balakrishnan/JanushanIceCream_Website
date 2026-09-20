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
          For product enquiries, shop information, availability or orders,
          reach Janushan Ice Cream directly. For the fastest response, use WhatsApp.
        </p>
        <div className="contact-quick-links">
          <a className="button button-primary" href="https://wa.me/94776015041?text=Hi%20Janushan%20Ice%20Cream%20%F0%9F%91%8B%20I%20would%20like%20to%20place%20an%20order." target="_blank" rel="noreferrer">Order via WhatsApp ↗</a>
          <a className="button button-ghost" href="https://www.google.com/search?q=Janushan+Ice+Cream+Vavuniya" target="_blank" rel="noreferrer">Leave a Google Review ↗</a>
        </div>
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