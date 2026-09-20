export default function CustomerInfo() {
  const faqs = [
    {
      q: "Where is Janushan Ice Cream?",
      a: "You can find us at No: 256/4, Kali Kovil Road, Nelukkulam, Vavuniya, Sri Lanka.",
    },
    {
      q: "Can I order through WhatsApp?",
      a: "Yes. Send us the products you want on WhatsApp and we can confirm availability with you.",
    },
    {
      q: "What flavours are available?",
      a: "Our featured flavours include Strawberry, Mango, Chocolate, Vanilla and Mix Fruit. Availability can change, so WhatsApp us for today's options.",
    },
    {
      q: "How can I check today's opening hours?",
      a: "Opening times can change. Call 024 222 6041 or WhatsApp 077 601 5041 before visiting if you need to confirm today's hours.",
    },
  ];

  return (
    <section className="customer-info section" id="faq" aria-labelledby="customer-info-title">
      <div className="customer-info-head">
        <p className="section-kicker">QUICK ANSWERS</p>
        <h2 id="customer-info-title">Before you take your <em>first scoop.</em></h2>
        <p>Everything you need to know before visiting or placing a quick order.</p>
      </div>
      <div className="faq-list">
        {faqs.map((item, index) => (
          <details key={item.q} className="faq-item">
            <summary>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.q}</strong>
              <i aria-hidden="true">+</i>
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
