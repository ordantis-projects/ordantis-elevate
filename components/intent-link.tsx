"use client";

import Link from "next/link";
import { useState, type ComponentProps } from "react";

// Keep Next's navigation semantics, but avoid downloading whole routes merely
// because the header or hero is visible. Mouse, keyboard and touch show intent.
export function IntentLink({ onPointerEnter, onPointerMove, onFocus, onTouchStart, ...props }: Omit<ComponentProps<typeof Link>, "prefetch">) {
  const [active, setActive] = useState(false);
  return <Link {...props} prefetch={active ? null : false}
    // A pointerenter can be synthesized when an overlay disappears under a
    // stationary cursor. Require actual mouse movement so dismissing the
    // cookie panel cannot warm an unrelated route.
    onPointerEnter={onPointerEnter}
    onPointerMove={(event) => { if (event.pointerType === "mouse") setActive(true); onPointerMove?.(event); }}
    onFocus={(event) => { setActive(true); onFocus?.(event); }}
    onTouchStart={(event) => { setActive(true); onTouchStart?.(event); }}
  />;
}
