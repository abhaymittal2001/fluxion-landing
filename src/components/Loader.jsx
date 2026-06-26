import { useEffect, useRef } from 'react';

/*
 * Entry loader — total orchestration budget < 500ms.
 * The page content is ALWAYS in the DOM (so it is crawlable and TTI is not
 * blocked); this overlay simply fades out over the loader window via WAAPI. It
 * is purely visual and removes its own pointer-events immediately so it never
 * delays interactivity.
 */
export default function Loader() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.pointerEvents = 'none'; // never block TTI

    const anim = el.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: 420,
      delay: 60,
      easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
      fill: 'forwards',
    });
    anim.onfinish = () => el.remove();

    // Stagger the hero entry items within the same <500ms window.
    document.querySelectorAll('[data-entry]').forEach((node, i) => {
      node.animate(
        [
          { opacity: 0, transform: 'translateY(16px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 320, delay: 80 + i * 60, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'backwards' }
      );
    });
  }, []);

  return (
    <div ref={ref} className="fixed inset-0 z-50 flex items-center justify-center bg-ink" aria-hidden="true">
      <div className="flex items-center gap-3">
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" className="animate-pulse text-accent">
          <path d="M4 7h6M4 12h10M4 17h7M16 5l4 4-4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="font-display text-xl font-bold">Fluxion</span>
      </div>
    </div>
  );
}
