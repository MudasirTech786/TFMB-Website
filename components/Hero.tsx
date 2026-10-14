import { Icon } from "./Icons";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-image" />
      <div className="hero-shade" />
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow eyebrow-light">
            <i /> TRUST <b>•</b> RESPECT <b>•</b> COMPATIBILITY
          </span>
          <h1 className="hero-title">
            <span className="hero-title-main">
              Trust <span className="hero-title-accent">Forever</span>
            </span>
            <span className="hero-title-sub">Marriage Bureau</span>
          </h1>
          <p>
            At Trust Forever Marriage Bureau, we help sincere individuals find
            their life partners through a trusted, professional and personalized
            matchmaking service.
          </p>
          <a href="#search" className="button button-gold hero-journey-cta">
            Start Your Journey <Icon name="arrow" size={17} />
          </a>
          <div className="hero-note"></div>
        </div>
      </div>
    </section>
  );
}
