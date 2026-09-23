"use client";

import { useEffect, useRef, useState } from "react";
import MascotRobot from "@/components/MascotRobot";

type Props = { className?: string };

/**
 * The mascot in the About section.
 *
 * Dark theme (the default) plays the supplied clip: a VP9 WebM first with an
 * H.264 fallback, muted and inline so it can autoplay without a gesture. Its
 * studio backdrop is hidden by an edge mask plus a matching portal, so it has
 * no rectangular boundary.
 *
 * Light theme swaps to the drawn SVG mascot. That is a deliberate choice, not
 * a fallback: the clip's backdrop is dark, and dark content on a white page is
 * always visible as a shape no matter how soft its edge is. The drawing has no
 * backdrop, so light mode is genuinely seamless.
 *
 * Which layer shows is decided in CSS, so the server and client markup match
 * and there is no flash before hydration. Reduced motion holds the poster frame.
 */
export default function MascotVideo({ className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sync = () => {
      const isLight = document.documentElement.dataset.theme === "light";
      if (isLight || reduced) {
        video.pause();
        return;
      }
      const attempt = video.play();
      if (attempt && typeof attempt.catch === "function") attempt.catch(() => {});
    };

    // No point decoding a hidden clip; pause it whenever light is active.
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    sync();

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="mascot-layer-video relative">
        <span aria-hidden className="mascot-portal" />

        <div className="mascot-mask-y relative">
          {failed ? (
            <MascotRobot />
          ) : (
            <video
              ref={videoRef}
              className="mascot-mask-x block h-auto w-full"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/mascot-poster.jpg"
              aria-hidden="true"
              tabIndex={-1}
              onError={() => setFailed(true)}
            >
              <source src="/mascot.webm" type="video/webm" />
              <source src="/mascot.mp4" type="video/mp4" />
            </video>
          )}
        </div>
      </div>

      <div className="mascot-layer-drawn">
        <MascotRobot />
      </div>
    </div>
  );
}
