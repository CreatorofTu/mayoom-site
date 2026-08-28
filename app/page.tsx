export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">MAYOOM</p>
          <h1 id="hero-title">
            Never get your account stolen again.
            <br />
            There&apos;s no account to steal.
          </h1>
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
