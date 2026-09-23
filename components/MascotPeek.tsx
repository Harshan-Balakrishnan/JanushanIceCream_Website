"use client";

import Image from "next/image";

type MascotPeekProps = {
  className?: string;
  alt?: string;
  priority?: boolean;
};

export default function MascotPeek({
  className = "",
  alt = "",
  priority = false,
}: MascotPeekProps) {
  return (
    <span className={"mascot-peek " + className} aria-hidden={alt ? undefined : true}>
      <Image
        src="/brand/mascot-peek.png"
        alt={alt}
        width={420}
        height={350}
        className="mascot-peek-image"
        priority={priority}
      />
      <Image
        src="/brand/mascot-peek.png"
        alt=""
        width={420}
        height={350}
        className="mascot-peek-head-layer"
        aria-hidden="true"
      />
      <span className="mascot-blink" aria-hidden="true" />
    </span>
  );
}
