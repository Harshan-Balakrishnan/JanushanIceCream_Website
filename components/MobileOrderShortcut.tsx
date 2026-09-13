export default function MobileOrderShortcut() {
  const message = "Hi Janushan Ice Cream, I would like to order. Please let me know today's available flavours and prices.";
  const href = `https://wa.me/94776015041?text=${encodeURIComponent(message)}`;

  return (
    <a
      className="mobile-order-shortcut"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Order on WhatsApp"
    >
      <span className="mobile-order-shortcut-icon" aria-hidden="true">⌕</span>
      <span>
        <small>QUICK ORDER</small>
        <strong>WhatsApp us</strong>
      </span>
    </a>
  );
}
