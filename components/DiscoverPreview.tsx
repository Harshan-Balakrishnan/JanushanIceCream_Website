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
        <p className="section-kicker">THE JANUSHAN EXPERIENCE</p>
        <h2>Made for moments.<br /><em>Remembered by flavour.</em></h2>
        <p className="section-intro">Since 2004, Janushan Ice Cream has been part of everyday moments in Vavuniya. Explore the menu, discover your flavour, create your own scoop and order your favourite the easy way.</p>
        <div className="feature-grid">
          <article><strong>01</strong><h3>Discover</h3><p>Explore our signature ice creams, cones and special treats through a premium product-first menu.</p></article>
          <article><strong>02</strong><h3>Create</h3><p>Choose your base, flavour, scoops, toppings and sauce to make a creation that is yours.</p></article>
          <article><strong>03</strong><h3>Enjoy</h3><p>When you know what you want, order directly through WhatsApp or find us in Vavuniya.</p></article>
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
