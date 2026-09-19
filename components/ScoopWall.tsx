"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCatalogCollection } from "@/hooks/useCatalogCollection";
import { defaultGallery, type GalleryItem } from "@/lib/catalog";

export default function ScoopWall() {
  const { items: gallery, live } = useCatalogCollection<GalleryItem>("gallery", defaultGallery);
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((active + 1) % gallery.length);
      if (event.key === "ArrowLeft") setActive((active - 1 + gallery.length) % gallery.length);
    };
    document.body.style.overflow = "hidden"; window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [active, gallery.length]);
  return <section className="scoop-wall section" id="gallery"><div className="gallery-head"><div><p className="section-kicker">THE SCOOP WALL</p><h2>A little closer to <em>happiness.</em></h2></div><p>{live ? "Live gallery curated from the Janushan Control Room." : "Tap any frame and step into a full-screen Janushan moment."}</p></div><div className="scoop-grid">{gallery.map((item,index)=><button className={`scoop-frame frame-${(index%8)+1}`} type="button" key={item.id} onClick={()=>setActive(index)} aria-label={`View ${item.title}`}><Image src={item.image} alt={item.title} fill sizes="(max-width: 760px) 92vw, 34vw"  /><span className="scoop-frame-shade"/><span className="scoop-frame-copy"><small>{String(index+1).padStart(2,"0")}</small><strong>{item.title}</strong><em>{item.tag}</em></span></button>)}</div>{active!==null&&gallery[active]&&<div className="gallery-lightbox" role="dialog" aria-modal="true" onMouseDown={(e)=>e.currentTarget===e.target&&setActive(null)}><button className="lightbox-close" aria-label="Close gallery" onClick={()=>setActive(null)}>×</button><button className="lightbox-arrow lightbox-prev" aria-label="Previous gallery image" onClick={()=>setActive((active-1+gallery.length)%gallery.length)}>←</button><div className="lightbox-card"><div className="lightbox-image"><Image src={gallery[active].image} alt={gallery[active].title} fill sizes="90vw" priority /></div><div className="lightbox-copy"><span>JANUSHAN MOMENT</span><h3>{gallery[active].title}</h3><p>{gallery[active].tag}</p></div></div><button className="lightbox-arrow lightbox-next" aria-label="Next gallery image" onClick={()=>setActive((active+1)%gallery.length)}>→</button></div>}</section>;
}
