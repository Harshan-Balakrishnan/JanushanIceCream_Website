import NavBar from "@/components/NavBar";
import EntranceExperience from "@/components/EntranceExperience";
import DiscoverPreview from "@/components/DiscoverPreview";
import CinematicFooter from "@/components/CinematicFooter";
import StructuredData from "@/components/StructuredData";
import StoreStatusBar from "@/components/StoreStatusBar";

export default function Home() {
  const whatsappMessage = encodeURIComponent("Hi Janushan Ice Cream 👋 I would like to place an order.");

  return (
    <main>
      <StructuredData />
      <NavBar />
      <EntranceExperience />
      <StoreStatusBar />
      <DiscoverPreview />
      <a
      className="whatsapp-quick-order"
      href={`https://wa.me/94776015041?text=${whatsappMessage}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Quick order on WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="#fff" d="M16 3.2A12.7 12.7 0 0 0 5.1 22.5L3.2 29l6.7-1.8A12.8 12.8 0 1 0 16 3.2Zm0 23.2c-2 0-3.9-.6-5.5-1.7l-.4-.3-3.9 1 1-3.8-.3-.4A10.3 10.3 0 1 1 16 26.4Zm5.7-7.6c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.9-1.7.1-.2 0-.4 0-.5l-.6-1.5c-.2-.4-.4-.4-.7-.4h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.8 4.3 1.8.8 2.4.9 3.3.8.5-.1 1.8-.7 2.1-1.3.3-.6.3-1.2.2-1.3-.1-.1-.3-.2-.6-.3Z"/></svg>
      <span>Quick Order</span>
    </a>
        <CinematicFooter />
    </main>
  );
}
