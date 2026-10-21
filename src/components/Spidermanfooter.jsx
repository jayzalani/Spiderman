import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";
import { GiSpiderMask } from "react-icons/gi";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const quotes = [
  "With great power comes great responsibility",
  "I’m just your friendly neighborhood Spider-Man.",
  "The city needs me, and I’ll never back down.",
  "Every swing is a fight for what’s right.",
  "No matter the challenge, I rise, I fight, I protect.",
];

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord />, label: "Discord" },
  { href: "https://twitter.com", icon: <FaTwitter />, label: "Twitter" },
  { href: "https://youtube.com", icon: <FaYoutube />, label: "YouTube" },
  { href: "https://medium.com", icon: <FaMedium />, label: "Medium" },
];

/* Decorative web in the corner of the dark half.
   Built once from maths so there is no giant hand-written SVG path. */
const buildWeb = () => {
  const toPoint = (angle, radius) => {
    const rad = (angle * Math.PI) / 180;
    return [100 + Math.cos(rad) * radius, Math.sin(rad) * radius];
  };
  const fmt = (n) => n.toFixed(2);

  const angles = Array.from({ length: 8 }, (_, i) => 90 + (i * 90) / 7);
  const radii = [14, 28, 44, 62, 84];

  const rays = angles.map((a) => {
    const [x, y] = toPoint(a, 140);
    return `M100 0 L${fmt(x)} ${fmt(y)}`;
  });

  const arcs = [];
  radii.forEach((r) => {
    for (let i = 0; i < angles.length - 1; i++) {
      const [x1, y1] = toPoint(angles[i], r);
      const [x2, y2] = toPoint(angles[i + 1], r);
      const [cx, cy] = toPoint((angles[i] + angles[i + 1]) / 2, r * 0.86);
      arcs.push(`M${fmt(x1)} ${fmt(y1)} Q${fmt(cx)} ${fmt(cy)} ${fmt(x2)} ${fmt(y2)}`);
    }
  });

  return [...rays, ...arcs].join(" ");
};

const WEB_PATH = buildWeb();

/* One copy of the giant title. It is rendered twice (light half + dark half)
   so the colour flips exactly where the text crosses the border. */
const renderTitle = (colorClass) => (
  <div
    aria-hidden="true"
    className={`slide-text special-font select-none whitespace-nowrap uppercase leading-[0.8] will-change-transform text-[21vw] md:text-[15vw] ${colorClass}`}
  >
    <b>
      SPIDER<span className="text-red-100">MAN</span>
    </b>
  </div>
);

const SpidermanFooter = () => {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      const slideTexts = q(".slide-text");
      const lines = q(".quote-line");
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 768px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reduceMotion } = context.conditions;

          // Hide every quote except the first one to start with.
          gsap.set(lines, { autoAlpha: 0 });

          // Reduced motion: no pinning, just show the final composition.
          if (reduceMotion) {
            gsap.set(slideTexts, { x: 0 });
            gsap.set(lines[lines.length - 1], { autoAlpha: 1 });
            return;
          }

          gsap.set(lines[0], { autoAlpha: 1 });

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "+=200%",
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
            },
          });

          // The title slides along the border line.
          tl.fromTo(
            slideTexts,
            { x: desktop ? "-42vw" : "-75vw" },
            { x: 0, duration: 1 },
            0
          );

          // Quotes take turns; the last one stays on screen at the end.
          const slot = 1 / lines.length;
          lines.forEach((line, i) => {
            const start = i * slot;
            if (i > 0) {
              tl.fromTo(
                line,
                { autoAlpha: 0, y: 14 },
                { autoAlpha: 1, y: 0, duration: 0.04, ease: "power2.out" },
                start
              );
            }
            if (i < lines.length - 1) {
              tl.to(
                line,
                { autoAlpha: 0, y: -14, duration: 0.04, ease: "power2.in" },
                start + slot - 0.05
              );
            }
          });
        }
      );

      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <footer
      ref={rootRef}
      id="footer"
      className="relative h-dvh w-screen overflow-hidden bg-blue-50"
    >
      <h2 className="sr-only">Spider-Man</h2>

      {/* ---------- TOP HALF: light, matches the rest of the site ---------- */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #F0F2FA 0%, #DFDFF0 100%)",
        }}
      >
        <div className="absolute bottom-0 left-[3vw] translate-y-1/2">
          {renderTitle("text-blue-200")}
        </div>
      </div>

      {/* ---------- BOTTOM HALF: dark footer ---------- */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 0%, rgba(235,51,27,0.30) 0%, rgba(235,51,27,0) 70%), linear-gradient(180deg, #0d0d16 0%, #050508 100%)",
        }}
      >
        {/* web decoration */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="pointer-events-none absolute right-0 top-0 h-[85%] w-auto aspect-square opacity-[0.14]"
        >
          <path
            d={WEB_PATH}
            fill="none"
            stroke="#F0F2FA"
            strokeWidth="0.35"
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute left-[3vw] top-0 -translate-y-1/2">
          {renderTitle("text-white")}
        </div>

        {/* footer content: same items as before */}
        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-white/10">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row md:px-12">
            <p className="text-center font-general text-xs font-light text-white/60 md:text-left">
              ©Nova 2024. All rights reserved
            </p>

            <div className="flex justify-center gap-5 md:justify-start">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-lg text-white/60 transition-colors duration-500 ease-in-out hover:text-red-100"
                >
                  {link.icon}
                </a>
              ))}
            </div>

            <a
              href="#privacy-policy"
              className="text-center font-general text-xs font-light text-white/60 transition-colors duration-300 hover:text-white hover:underline md:text-right"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* ---------- BORDER LINE (the "web strand" the title slides on) ---------- */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 z-10 h-px -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #eb331b 20%, #eb331b 80%, transparent 100%)",
          boxShadow: "0 0 18px 2px rgba(235,51,27,0.55)",
        }}
      />

      {/* ---------- QUOTE: overlays both halves ---------- */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-30 w-[min(92vw,46rem)] -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-black/60 px-6 py-5 backdrop-blur-md md:gap-5 md:px-8">
          <GiSpiderMask className="shrink-0 text-3xl text-red-100 md:text-4xl" />
          <div className="grid flex-1">
            {quotes.map((line) => (
              <p
                key={line}
                className="quote-line col-start-1 row-start-1 font-general text-xs font-semibold uppercase leading-relaxed tracking-[0.18em] text-white opacity-0 md:text-sm"
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SpidermanFooter;