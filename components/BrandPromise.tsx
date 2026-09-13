export default function BrandPromise() {
  const promises = [
    { number: "01", title: "Made for the moment", copy: "Every Janushan visit is about simple pleasure — a cold scoop, a good conversation and a moment worth remembering." },
    { number: "02", title: "Flavours worth returning to", copy: "From Strawberry and Mango to Chocolate, Vanilla and Mix Fruit, our menu keeps familiar favourites at the heart of the experience." },
    { number: "03", title: "Vavuniya, since 2004", copy: "Born in Vavuniya and still serving the community today, Janushan brings its shop and mobile van experience to the next generation." },
  ];

  return (
    <section className="brand-promise" aria-labelledby="promise-title">
      <div className="brand-promise-head">
        <div>
          <p className="section-kicker">THE JANUSHAN PROMISE</p>
          <h2 id="promise-title">More than a scoop.<br /><em>A little moment of happiness.</em></h2>
        </div>
        <p>Great ice cream brands give people more than a product. They create a feeling people want to come back to. That is the experience we are building at Janushan.</p>
      </div>

      <div className="brand-promise-grid">
        {promises.map((promise) => (
          <article key={promise.number}>
            <span>{promise.number}</span>
            <h3>{promise.title}</h3>
            <p>{promise.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
