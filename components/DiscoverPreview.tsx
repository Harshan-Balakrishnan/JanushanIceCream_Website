import ProductUniverse from "@/components/ProductUniverse";
import FlavourUniverse from "@/components/FlavourUniverse";
import IceCreamBuilder from "@/components/IceCreamBuilder";
import StoryTimeline from "@/components/StoryTimeline";
import ScoopWall from "@/components/ScoopWall";
import PromotionRibbon from "@/components/PromotionRibbon";
import FindJanushan from "@/components/FindJanushan";
import ContactExperience from "@/components/ContactExperience";

export default function DiscoverPreview() {
  return (
    <>
      <section className="discover section" id="discover">
        <p className="section-kicker">WELCOME TO OUR WORLD</p>
        <h2>Ice cream should feel like an <em>experience.</em></h2>
        <p className="section-intro">Explore the menu, discover five flavour worlds, build a custom creation and find the Vavuniya shop. The experience is designed to move from curiosity to craving to a real-world visit.</p>
        <div className="feature-grid">
          <article><strong>01</strong><h3>Discover</h3><p>Products become immersive stories instead of ordinary cards.</p></article>
          <article><strong>02</strong><h3>Play</h3><p>Flavour, motion and interaction respond naturally to the visitor.</p></article>
          <article><strong>03</strong><h3>Crave</h3><p>Large food imagery and controlled motion keep the product as the hero.</p></article>
        </div>
      </section>

      <ProductUniverse />

      <FlavourUniverse />

      <IceCreamBuilder />

      <StoryTimeline />

      <PromotionRibbon />

      <ScoopWall />

      <FindJanushan />

      <ContactExperience />
    </>
  );
}
