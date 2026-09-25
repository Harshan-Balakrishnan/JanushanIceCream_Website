import NavBar from "@/components/NavBar";
import EntranceExperience from "@/components/EntranceExperience";
import DiscoverPreview from "@/components/DiscoverPreview";
import CinematicFooter from "@/components/CinematicFooter";
import StructuredData from "@/components/StructuredData";
import StoreStatusBar from "@/components/StoreStatusBar";

export default function Home() {
  return (
    <main>
      <StructuredData />
      <NavBar />
      <EntranceExperience />
      <StoreStatusBar />
      <DiscoverPreview />
      <CinematicFooter />
    </main>
  );
}
