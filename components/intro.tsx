import { Icon } from "./Icons";
import Image from "next/image";

export default function RegionalProfiles() {
  return (
    <section className="regions-section home-section-spacing home-section-gutter" id="regions" aria-labelledby="about-title">
      {/* Existing section background image — kept exactly as it was. */}
      <div className="regions-backdrop" />
      <div className="regions-content">
        <header className="about-heading home-section-header about-rise">
          <span className="eyebrow eyebrow-light home-section-eyebrow">WHO WE ARE</span>
          <h2 className="home-section-title home-section-title-light" id="about-title">
            Matchmaking Rooted in <em>Family</em>
          </h2>
          <span className="about-rule" aria-hidden="true">
            <i />
            <b />
            <i />
          </span>
        </header>

        <div className="about-layout">
          <div className="about-copy about-rise">
            <p className="about-welcome">
              Welcome to Trust Forever Marriage Bureau
            </p>
            <h3>Where Meaningful Connections Begin.</h3>
            <p className="about-text">
              For families across Pakistan and beyond, we bring sincerity and
              structure to the search for a life partner. Every profile is
              carefully reviewed, each introduction handled with discretion, and
              every step guided by an experienced matchmaker — because trust,
              once given, deserves to be honoured.
            </p>

            <ul className="about-trust">
              <li>
                <Icon name="shield" size={16} />
                <span>
                  <strong>100% Verified Profiles</strong>
                  <small>Personally reviewed</small>
                </span>
              </li>
              <li>
                <Icon name="users" size={16} />
                <span>
                  <strong>Dedicated Matchmakers</strong>
                  <small>Guidance at every step</small>
                </span>
              </li>
              <li>
                <Icon name="chat" size={16} />
                <span>
                  <strong>Private &amp; Discreet</strong>
                  <small>Confidential by design</small>
                </span>
              </li>
            </ul>

            <div className="about-cta">
              <a className="about-button" href="#stories">
                Explore Our Story <Icon name="arrow" size={16} />
              </a>
              <a className="about-link" href="#search">
                Browse profiles <Icon name="arrow" size={14} />
              </a>
            </div>
          </div>

          <div className="about-visual about-rise">
            <div className="about-frame">
              <span className="about-frame-corner tl" aria-hidden="true" />
              <span className="about-frame-corner tr" aria-hidden="true" />
              <div className="about-frame-inner">
                <Image
                  src="/images/couple1.jpg"
                  alt="A Trust Forever couple beginning their new life together"
                  fill
                  sizes="(max-width: 560px) 92vw, (max-width: 800px) 84vw, 540px"
                />
              </div>
              <span className="about-frame-caption">
                Two families, one new beginning.
              </span>
              <span className="about-frame-corner bl" aria-hidden="true" />
              <span className="about-frame-corner br" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
