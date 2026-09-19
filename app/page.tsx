import NavBar from "@/components/NavBar";
import EntranceExperience from "@/components/EntranceExperience";
import DiscoverPreview from "@/components/DiscoverPreview";
import CinematicFooter from "@/components/CinematicFooter";
import StructuredData from "@/components/StructuredData";

export default function Home() {
  return (
    <main>
      <StructuredData />
      <NavBar />
      <EntranceExperience />
      <DiscoverPreview />
      <CinematicFooter />
      <a
        className="quick-order"
        href="https://wa.me/94776015041?text=Hi%20Janushan%20Ice%20Cream!%20I'd%20like%20to%20ask%20about%20today's%20menu."
        target="_blank"
        rel="noreferrer"
        aria-label="Ask Janushan Ice Cream on WhatsApp"
      >
        <span aria-hidden="true">◔</span>
        <span><small>QUICK ORDER</small><strong>WhatsApp</strong></span>
      </a>
    </main>
  );
}
