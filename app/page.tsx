import NavBar from "@/components/NavBar";
import EntranceExperience from "@/components/EntranceExperience";
import DiscoverPreview from "@/components/DiscoverPreview";
import CinematicFooter from "@/components/CinematicFooter";
import StructuredData from "@/components/StructuredData";
import MobileOrderShortcut from "@/components/MobileOrderShortcut";

export default function Home() {
  return (
    <main id="main-content">
      <StructuredData />
      <NavBar />
      <EntranceExperience />
      <DiscoverPreview />
      <CinematicFooter />
      <MobileOrderShortcut />
    </main>
  );
}
