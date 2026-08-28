export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <video
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
        <div className="hero-video-overlay" aria-hidden="true" />

        <div className="hero-inner">
          <div className="logo-stage" aria-label="Mayoom">
            <img className="logo-wordmark" src="/mayoom-wordmark.svg" alt="" />
            <img className="blink-frame blink-open" src="/mayoom-blink-open.svg" alt="" />
            <img className="blink-frame blink-mid" src="/mayoom-blink-mid.svg" alt="" />
            <img className="blink-frame blink-closed" src="/mayoom-blink-closed.svg" alt="" />
          </div>

          <div className="hero-copy">
            <h1 id="hero-title">
              Who&apos;s going to tell him there&apos;s nothing to steal?
            </h1>
            <p className="tagline">
              Meet your <strong>disposable identity for anti-scam shopping.</strong>
            </p>
          </div>
        </div>

        <a className="scroll-cue" href="#waitlist" aria-label="Swipe down for demo">
          <span>Swipe down for demo</span>
          <span className="arrow" aria-hidden="true">↓</span>
        </a>
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
