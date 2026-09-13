export default function MobileOrderShortcut() {
  const message = "Hi Janushan Ice Cream, I would like to order. Please let me know today's available flavours and prices.";
  const href = `https://wa.me/94776015041?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Quick order on WhatsApp"
      style={{
        position: "fixed",
        right: 16,
        bottom: "max(16px, env(safe-area-inset-bottom))",
        zIndex: 100,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        minHeight: 54,
        padding: "8px 15px 8px 10px",
        border: "1px solid rgba(243,190,83,.55)",
        borderRadius: 999,
        background: "rgba(4,17,40,.94)",
        boxShadow: "0 14px 34px rgba(0,0,0,.3), 0 0 0 4px rgba(243,190,83,.08)",
        color: "#fff",
        textDecoration: "none",
        backdropFilter: "blur(18px)",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 36,
          height: 36,
          display: "grid",
          placeItems: "center",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f3be53, #ffe4a2)",
          color: "#041128",
          fontSize: 18,
          fontWeight: 900,
        }}
      >
        ↗
      </span>
      <span style={{ display: "grid", gap: 2 }}>
        <small style={{ color: "#f3be53", fontSize: 8, fontWeight: 900, letterSpacing: ".14em" }}>QUICK ORDER</small>
        <strong style={{ fontSize: 12, lineHeight: 1.1 }}>WhatsApp us</strong>
      </span>
    </a>
  );
}
