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
        <p className="section-kicker">WELCOME TO JANUSHAN</p>
        <h2>Fresh scoops. <em>Happy moments.</em></h2>
        <p className="section-intro">Discover Janushan Ice Cream — proudly serving Vavuniya since 2004. Explore our favourite treats, choose your flavour, build your own creation and find the easiest way to order.</p>
        <div className="feature-grid">
          <article><strong>01</strong><h3>Choose</h3><p>Browse our ice creams, cones and special treats for your next scoop.</p></article>
          <article><strong>02</strong><h3>Build</h3><p>Mix your favourite base, flavour, topping and sauce into a custom creation.</p></article>
          <article><strong>03</strong><h3>Order</h3><p>Ready to enjoy? Send your selection straight to Janushan on WhatsApp.</p></article>
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
