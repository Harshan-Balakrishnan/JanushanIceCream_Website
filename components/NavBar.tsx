"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const links = [
  ["Discover", "#discover"],
  ["Menu", "#menu"],
  ["Flavours", "#flavours"],
  ["Build Yours", "#build"],
  ["Our Story", "#story"],
  ["Gallery", "#gallery"],
  ["Find Us", "#locations"],
  ["Contact", "#contact"],
] as const;

export default function NavBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <header className="nav-wrap">
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand-mark" href="#home" aria-label="Janushan Ice Cream home" onClick={() => setOpen(false)}>
          <Image src="/brand/janushan-logo.png" alt="" width={54} height={54} priority />
          <span>JANUSHAN ICE CREAM</span>
        </a>
        <div className="nav-links">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
        <a className="nav-cta" href="#menu">Explore Menu</a>
        <button
          className="nav-menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </nav>
      <div id="mobile-navigation" className={`mobile-navigation ${open ? "open" : ""}`} aria-hidden={!open} aria-label="Mobile navigation">
        {links.map(([label, href], index) => (
          <a key={href} href={href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            <span>{label}</span>
          </a>
        ))}
      </div>
    </header>
  );
}
