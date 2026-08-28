'use client';

import { useEffect, useRef } from 'react';

export default function Home() {
  const transitionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLImageElement>(null);
  const openMarkRef = useRef<HTMLImageElement>(null);
  const closedMarkRef = useRef<HTMLImageElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const transition = transitionRef.current;
    const hero = heroRef.current;
    const logo = logoRef.current;
    const wordmark = wordmarkRef.current;
    const openMark = openMarkRef.current;
    const closedMark = closedMarkRef.current;
    const copy = copyRef.current;
    const cue = cueRef.current;
    const video = videoRef.current;

    if (!transition || !hero || !logo || !wordmark || !openMark || !closedMark || !copy || !cue || !video) return;

    let frame = 0;
    let activated = false;
    let heroTop = 0;
    let travel = 1;
    let startLeft = 0;
    let startTop = 0;
    let startDocumentTop = 0;
    let startWidth = 1;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const smooth = (from: number, to: number, value: number) => {
      const amount = clamp((value - from) / (to - from));
      return amount * amount * (3 - 2 * amount);
    };

    const update = () => {
      frame = 0;
      const progress = clamp((window.scrollY - heroTop) / travel);
      const move = smooth(0.04, 0.76, progress);
      const mobile = window.innerWidth < 640;
      const targetMarkWidth = mobile ? 76 : 104;
      const markWidthShare = 0.52201;
      const markLeftShare = 0.31052;
      const targetScale = Math.min(0.46, Math.max(0.12, targetMarkWidth / (startWidth * markWidthShare)));
      const targetLeft = (mobile ? 16 : 24) - startWidth * markLeftShare * targetScale;
      const targetTop = mobile ? 16 : 22;
      const desiredLeft = startLeft + (targetLeft - startLeft) * move;
      const desiredTop = startTop + (targetTop - startTop) * move;
      const baseTop = startDocumentTop - window.scrollY;
      const scale = 1 + (targetScale - 1) * move;

      logo.style.transform = `translate3d(${desiredLeft - startLeft}px, ${desiredTop - baseTop}px, 0) scale(${scale})`;
      logo.style.opacity = String(1 - smooth(0.82, 1, progress));

      if (progress > 0.01) activated = true;
      if (activated) {
        wordmark.style.animation = 'none';
        wordmark.style.clipPath = 'inset(0)';
        wordmark.style.transform = 'none';
        wordmark.style.opacity = String(1 - smooth(0.12, 0.52, progress));
        openMark.style.animation = 'none';
        openMark.style.opacity = '1';
        closedMark.style.animation = 'none';
        closedMark.style.opacity = '0';
      }

      copy.style.opacity = String(1 - smooth(0.05, 0.42, progress));
      copy.style.transform = `translateY(${-18 * smooth(0.05, 0.42, progress)}px)`;
      cue.style.opacity = String(1 - smooth(0, 0.2, progress));
      video.style.opacity = String(1 - smooth(0.68, 1, progress));
      hero.style.opacity = String(1 - smooth(0.9, 1, progress));
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const measure = () => {
      const rect = logo.getBoundingClientRect();
      heroTop = transition.getBoundingClientRect().top + window.scrollY;
      travel = Math.max(1, transition.offsetHeight - window.innerHeight);
      startLeft = rect.left;
      startTop = rect.top + window.scrollY - heroTop;
      startDocumentTop = rect.top + window.scrollY;
      startWidth = rect.width;
      requestUpdate();
    };

    const resize = () => {
      logo.style.transform = 'none';
      window.requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', resize);
    window.requestAnimationFrame(measure);

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', resize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main>
      <section className="hero-transition" ref={transitionRef} aria-labelledby="hero-title">
        <div className="hero" ref={heroRef}>
          <video
            ref={videoRef}
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          >
            <source src="/mayoom-background.mp4" type="video/mp4" />
          </video>

          <div className="hero-inner">
            <div className="logo-stage" ref={logoRef} aria-label="Mayoom">
              <img ref={wordmarkRef} className="logo-wordmark" src="/mayoom-wordmark.svg" alt="" />
              <img ref={openMarkRef} className="blink-frame blink-open" src="/mayoom-blink-open.svg" alt="" />
              <img ref={closedMarkRef} className="blink-frame blink-closed" src="/mayoom-blink-closed.svg" alt="" />
            </div>

            <div className="hero-copy" ref={copyRef}>
              <h1 id="hero-title">Who&apos;s going to tell him there&apos;s nothing to steal?</h1>
            </div>
          </div>

          <a
            ref={cueRef}
            className="scroll-cue"
            href="#waitlist"
            aria-label="Swipe down for your disposable identity for anti-scam shopping"
          >
            <span>Swipe down for your disposable identity for anti-scam shopping</span>
            <span className="arrow" aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section className="waitlist" id="waitlist" aria-labelledby="waitlist-title">
        <h2 id="waitlist-title">Join free waitlist</h2>
        <a className="waitlist-button" href="mailto:hello@mayoom.com?subject=Join%20the%20Mayoom%20waitlist">
          Join free waitlist
        </a>
      </section>
    </main>
  );
}
