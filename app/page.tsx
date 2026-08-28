'use client';

import { type FormEvent, useEffect, useRef } from 'react';

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
    let startWidth = 1;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const smooth = (from: number, to: number, value: number) => {
      const amount = clamp((value - from) / (to - from));
      return amount * amount * (3 - 2 * amount);
    };

    const update = () => {
      frame = 0;
      const progress = clamp((window.scrollY - heroTop) / travel);
      const move = smooth(0.02, 0.48, progress);
      const mobile = window.innerWidth < 640;
      const targetMarkWidth = mobile ? 72 : 92;
      const markWidthShare = 0.52201;
      const markLeftShare = 0.31052;
      const targetScale = Math.min(0.46, Math.max(0.12, targetMarkWidth / (startWidth * markWidthShare)));
      const cornerInset = mobile ? 16 : 24;
      const targetLeft = window.innerWidth - cornerInset - startWidth * (markLeftShare + markWidthShare) * targetScale;
      const targetTop = mobile ? 16 : 20;
      const desiredLeft = startLeft + (targetLeft - startLeft) * move;
      const desiredTop = startTop + (targetTop - startTop) * move;
      const scale = 1 + (targetScale - 1) * move;

      logo.style.transform = `translate3d(${desiredLeft - startLeft}px, ${desiredTop - startTop}px, 0) scale(${scale})`;
      logo.style.opacity = String(1 - smooth(0.94, 1, progress));

      if (progress > 0.01) activated = true;
      if (activated) {
        wordmark.style.animation = 'none';
        wordmark.style.clipPath = 'inset(0)';
        wordmark.style.transform = 'none';
        wordmark.style.opacity = String(1 - smooth(0.06, 0.3, progress));
        openMark.style.animation = 'none';
        openMark.style.opacity = '1';
        closedMark.style.animation = 'none';
        closedMark.style.opacity = '0';
      }

      copy.style.opacity = String(1 - smooth(0.02, 0.26, progress));
      copy.style.transform = `translateY(${-18 * smooth(0.02, 0.26, progress)}px)`;
      cue.style.opacity = String(1 - smooth(0, 0.14, progress));
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

  const handleWaitlistSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email') ?? '').trim();
    if (!email) return;
    window.location.href = `mailto:hello@mayoom.com?subject=${encodeURIComponent('Join the Mayoom waitlist')}&body=${encodeURIComponent(`Please add ${email} to the Mayoom waitlist.`)}`;
  };

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

          <div className="landing-intro" aria-label="Usernames and passwords disappear. Mayoom remains.">
            <div className="delete-x" aria-hidden="true">×</div>
            <div className="delete-control" aria-hidden="true">Delete identity</div>
            <div className="login-ui">
              <label className="demo-field username-field">
                <span>Username</span>
                <input value="shopper@email.com" readOnly tabIndex={-1} />
              </label>
              <label className="demo-field password-field">
                <span>Password</span>
                <input value="••••••••••••" readOnly tabIndex={-1} />
              </label>
              <button className="demo-button" type="button" tabIndex={-1}>Sign up</button>
            </div>
            <div className="private-state">
              <img src="/mayoom-blink-open.svg" alt="" />
              <p>shop privately with mayoom.</p>
            </div>
          </div>

          <div className="hero-inner">
            <div className="logo-stage" ref={logoRef} aria-label="Mayoom">
              <img ref={wordmarkRef} className="logo-wordmark" src="/mayoom-text-logo.svg" alt="" />
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
            href="#information"
            aria-label="Swipe down for your disposable identity for anti-scam shopping"
          >
            <span>Swipe down for your disposable identity for anti-scam shopping</span>
            <span className="arrow" aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <div className="information-page" id="information">
        <section className="info-section section-one" aria-labelledby="section-one-title">
          <div className="section-copy">
            <p className="section-number">01</p>
            <h2 id="section-one-title">Detach your points, orders, and rewards.</h2>

            <div className="prose">
              <p>Your favorite stores keep your shopping life behind the same identity for years.</p>
              <p className="short-lines">Your email.<br />Your password.<br />Your orders.<br />Your points.<br />Your rewards.</p>
              <p><strong>Mayoom separates what you own from the identity used to access it.</strong></p>
              <p>Your points, orders, and rewards can stay.</p>
              <p><strong>Your shopping identity can be disposed of and replaced.</strong></p>
              <p>So when an old identity gets stolen, there’s less waiting behind it for a scammer.</p>
              <p className="positioning-line"><strong>Your value stays. Your identity doesn’t.</strong></p>
            </div>
          </div>

        </section>

        <section className="info-section section-two" aria-labelledby="section-two-title">
          <div className="section-copy">
            <p className="section-number">02</p>
            <h2 id="section-two-title">We can’t get back $15.9 billion in losses. But we can prevent the next scam.</h2>
            <p className="stat-line">Americans reported losing <strong>$15.9 billion to fraud in 2025.</strong></p>

            <div className="prose">
              <p>Scammers keep getting better at stealing the information we leave behind.</p>
              <p>So we’re changing what gets left behind.</p>
              <p>With Mayoom, stores can give every legitimate purchase a temporary identity and record the intent behind changes to your points, rewards, and orders.</p>
              <p>If value moves without a legitimate reason: <strong>something’s wrong.</strong></p>
              <p>Instead of only asking: <em>Does this look like a scam?</em></p>
              <p>Mayoom can help stores ask: <strong>Was this ever authorized at all?</strong></p>
            </div>
          </div>

          <div className="intent-demo" aria-label="Comparison between customer intent and store records">
            <div className="intent-heading"><span>Customer intent</span><span>Store record</span></div>
            <div className="intent-row"><span>+ 200 points</span><span>+ 200 <b aria-label="matches">✓</b></span></div>
            <div className="intent-row"><span>− 500 points</span><span>− 500 <b aria-label="matches">✓</b></span></div>
            <div className="intent-row alert-row"><span>no transaction</span><span>− 2,000 <b aria-label="unexplained">!</b></span></div>
            <p>If value moves, there should be a reason.</p>
          </div>
        </section>

        <section className="info-section section-three" aria-labelledby="section-three-title">
          <div className="section-copy">
            <p className="section-number">03</p>
            <h2 id="section-three-title">Restoring trust and privacy to your favorite stores.</h2>

            <div className="prose">
              <p>You shouldn’t have to choose between enjoying a store and trusting it with a permanent copy of your shopping identity.</p>
              <p>Mayoom works with stores to maintain their anti-scam layer on their behalf.</p>
              <p className="short-lines">Less permanent identity.<br />Less reusable access.<br />Less customer information worth stealing.</p>
              <p>While your favorite stores can still remember what matters:</p>
              <p><strong>your points, your purchases, your rewards, and what they owe you.</strong></p>
            </div>
          </div>
        </section>

        <footer className="waitlist-cta" aria-labelledby="waitlist-title">
          <p className="locked-positioning">Disposable identity for anti-scam shopping.</p>
          <h2 id="waitlist-title">Join the free waitlist</h2>
          <form className="waitlist-form" onSubmit={handleWaitlistSubmit}>
            <label htmlFor="waitlist-email">Email</label>
            <div className="form-row">
              <input id="waitlist-email" name="email" type="email" autoComplete="email" placeholder="you@email.com" required />
              <button type="submit">Join free waitlist</button>
            </div>
          </form>
        </footer>
      </div>
    </main>
  );
}
