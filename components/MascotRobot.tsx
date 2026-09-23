/**
 * Animated mascot for the About section: a levitating robot with a glossy visor,
 * glowing lens eyes, a lightning badge on the chest and coiled spring hands.
 *
 * Drawn entirely in SVG and driven by CSS keyframes — no WebGL, no client JS.
 * It animates on the compositor and collapses to a static frame under
 * prefers-reduced-motion.
 *
 * Draw order matters: body and visor first, then the arms on top, so the
 * ball joints read as attached to the outside of the body instead of being
 * swallowed by it.
 */
type Props = { className?: string };

export default function MascotRobot({ className }: Props) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 320 380"
        role="img"
        aria-label="Levitating robot mascot with glowing eyes over a ring of light"
        className="h-auto w-full"
      >
        <defs>
          <radialGradient id="mrBody" cx="36%" cy="24%" r="82%">
            <stop offset="0%" stopColor="#fdfefe" />
            <stop offset="44%" stopColor="#e0e2e6" />
            <stop offset="100%" stopColor="#9aa0a9" />
          </radialGradient>
          <linearGradient id="mrVisor" x1="16%" y1="0%" x2="84%" y2="100%">
            <stop offset="0%" stopColor="#6a6e77" />
            <stop offset="20%" stopColor="#202227" />
            <stop offset="68%" stopColor="#08080a" />
            <stop offset="100%" stopColor="#33353b" />
          </linearGradient>
          <linearGradient id="mrGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff0a8" />
            <stop offset="42%" stopColor="#f7d445" />
            <stop offset="100%" stopColor="#dfa30f" />
          </linearGradient>
          <radialGradient id="mrHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.32" />
            <stop offset="52%" stopColor="#6366f1" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="mrFloor" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f7d445" stopOpacity="0.24" />
            <stop offset="70%" stopColor="#f7d445" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#f7d445" stopOpacity="0" />
          </radialGradient>
          <filter id="mrBlur" x="-70%" y="-70%" width="240%" height="240%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
          <filter id="mrEye" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur stdDeviation="4.5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Halo behind the character */}
        <circle cx="160" cy="198" r="126" fill="url(#mrHalo)" className="mascot-halo" />

        {/* Floor: glow, contact shadow, ring */}
        <ellipse cx="160" cy="338" rx="104" ry="26" fill="url(#mrFloor)" className="mascot-ring" />
        <ellipse
          cx="160"
          cy="338"
          rx="60"
          ry="12"
          fill="#000000"
          filter="url(#mrBlur)"
          className="mascot-shadow"
        />
        <ellipse
          cx="160"
          cy="338"
          rx="90"
          ry="17"
          fill="none"
          stroke="url(#mrGold)"
          strokeWidth="1.7"
          className="mascot-ring"
        />
        <ellipse
          cx="160"
          cy="338"
          rx="62"
          ry="11"
          fill="none"
          stroke="url(#mrGold)"
          strokeWidth="0.9"
          opacity="0.45"
        />

        <g className="mascot-float">
          <g className="mascot-sway">
            {/* Body */}
            <path
              className="mr-body"
              d="M160 112 C204 112 240 158 240 208 C240 264 202 302 160 302 C118 302 80 264 80 208 C80 158 116 112 160 112 Z"
              fill="url(#mrBody)"
            />

            {/* Visor: narrower than the body at its base so it reads as a head */}
            <ellipse cx="160" cy="142" rx="56" ry="44" fill="url(#mrVisor)" />
            {/* Specular sweep */}
            <ellipse
              cx="136"
              cy="122"
              rx="20"
              ry="8"
              fill="#ffffff"
              opacity="0.24"
              transform="rotate(-32 136 122)"
            />
            {/* Collar shadow where the visor meets the body */}
            <ellipse cx="160" cy="184" rx="48" ry="9" fill="#7f848d" opacity="0.45" />

            {/* Eyes: lens shaped, angled inward so the face reads as determined */}
            <g className="mascot-eyes" filter="url(#mrEye)" fill="url(#mrGold)">
              <ellipse cx="134" cy="141" rx="17" ry="8.5" transform="rotate(-17 134 141)" />
              <ellipse cx="186" cy="141" rx="17" ry="8.5" transform="rotate(17 186 141)" />
            </g>
            {/* Eye highlights */}
            <g fill="#fffdf5" opacity="0.9">
              <circle cx="128" cy="136.5" r="2.6" />
              <circle cx="180" cy="136.5" r="2.6" />
            </g>

            {/* Chest badge */}
            <path
              d="M188 232 L174 256 L146 256 L132 232 L146 208 L174 208 Z"
              fill="#131316"
              stroke="url(#mrGold)"
              strokeWidth="5"
              strokeLinejoin="round"
            />
            <path d="M166 216 L149 240 L159 240 L152 261 L171 236 L161 236 Z" fill="url(#mrGold)" />

            {/* Arms on top of the body so the joints stay visible */}
            <g stroke="url(#mrBody)" strokeWidth="24" strokeLinecap="round" fill="none">
              <path d="M98 196 L74 244" />
              <path d="M74 244 L60 280" />
              <path d="M222 196 L246 244" />
              <path d="M246 244 L260 280" />
            </g>

            {/* Shoulder, elbow and wrist joints */}
            <g fill="#d6d9de" stroke="#a2a8b1" strokeWidth="1.1">
              <circle cx="98" cy="196" r="15" />
              <circle cx="222" cy="196" r="15" />
              <circle cx="74" cy="244" r="11.5" />
              <circle cx="246" cy="244" r="11.5" />
              <circle cx="60" cy="280" r="7.5" />
              <circle cx="260" cy="280" r="7.5" />
            </g>

            {/* Coiled spring hands, drawn side-on as a real helix */}
            <g
              stroke="url(#mrGold)"
              strokeWidth="3.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              <path d="M46 286 L72 294 L46 302 L72 310 L46 318" />
              <path d="M274 286 L248 294 L274 302 L248 310 L274 318" />
            </g>
          </g>
        </g>

        {/* Drifting sparks */}
        <g fill="#22d3ee">
          <circle cx="52" cy="146" r="2.4" className="mascot-spark" opacity="0.5" />
          <circle
            cx="272"
            cy="124"
            r="1.9"
            className="mascot-spark"
            opacity="0.4"
            style={{ animationDelay: "1.4s" }}
          />
          <circle
            cx="292"
            cy="226"
            r="2.1"
            className="mascot-spark"
            opacity="0.45"
            style={{ animationDelay: "2.6s" }}
          />
          <circle
            cx="34"
            cy="238"
            r="1.6"
            className="mascot-spark"
            opacity="0.35"
            style={{ animationDelay: "3.7s" }}
          />
        </g>
      </svg>
    </div>
  );
}
