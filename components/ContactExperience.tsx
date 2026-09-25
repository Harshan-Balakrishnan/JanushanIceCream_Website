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
          reach Janushan Ice Cream directly. For the fastest response, call our order line.
        </p>
        <div className="contact-quick-links">
          <a className="button button-primary" href="tel:+94776015041">Call to order +94 77 601 5041</a>
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
          href="tel:+94776015041"
          className="contact-card"
        >
          <span>02</span>
          <small>CALL TO ORDER</small>
          <strong>+94 77 601 5041</strong>
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