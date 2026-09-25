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
        className="floating-call-button"
        href="tel:+94776015041"
        aria-label="Call JIC at +94 77 601 5041"
        title="Call JIC"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.62 10.79a15.46 15.46 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z" />
        </svg>
      </a>
    </main>
  );
}
