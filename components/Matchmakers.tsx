import Image from "next/image";
import { matchmakers } from "../lib/mockData";
import { Icon } from "./Icons";

export default function Matchmakers() {
  return (
    <section
      className="section matchmakers-section home-section-spacing home-section-gutter"
      id="contact"
    >
      <header className="matchmakers-editorial">
        <span className="matchmakers-eyebrow">HERE FOR YOUR JOURNEY</span>
        <h2 className="matchmakers-title">
          A team that understands
          <br />
          <em>your story</em>
        </h2>
        <p className="matchmakers-intro">
          Experienced, respectful and dedicated to finding the right match for
          you.
        </p>
        <span className="matchmakers-divider" aria-hidden="true">
          <i />
          <b />
          <i />
        </span>
      </header>

      <div className="matchmakers-team">
        <div className="matchmakers-portraits" aria-label="Meet our team">
          {matchmakers.map((person) => (
            <span className="matchmakers-portrait" key={person.name}>
              <Image
                src={person.image}
                width={240}
                height={240}
                alt={`${person.name}, ${person.role}`}
                sizes="(max-width: 640px) 68px, 118px"
              />
            </span>
          ))}
          <span className="matchmakers-team-count">A team of five</span>
        </div>

        <div className="matchmakers-team-copy">
          <span className="matchmakers-kicker">PERSONAL, THOUGHTFUL GUIDANCE</span>
          <h3>Meet your personal matchmakers</h3>
          <p>
            Every journey is different. Our dedicated team takes the time to
            listen, understand what matters to you, and guide you and your
            family with care.
          </p>
          <a className="matchmakers-team-link" href="mailto:trustforevermarriagebureau@gmail.com">
            Meet our team
            <Icon name="arrow" size={17} />
          </a>
        </div>
      </div>

      <div className="matchmakers-consultation">
        <span
          className="matchmakers-consultation-glow"
          aria-hidden="true"
        />
        <span
          className="matchmakers-consultation-frame"
          aria-hidden="true"
        />
        <div className="matchmakers-consultation-copy">
          <span className="matchmakers-consultation-label">
            <Icon name="chat" size={17} />
            YOUR NEXT STEP STARTS WITH A CONVERSATION
          </span>
          <h3>
            Free Consultation
            <br />
            <em>on WhatsApp</em>
          </h3>
          <p>
            Talk to our experts and get personalized guidance for your perfect
            match. No pressure, just a thoughtful conversation.
          </p>
        </div>

        <div className="matchmakers-consultation-action">
          <span className="matchmakers-availability">
            <i aria-hidden="true" />
            Available now
          </span>
          <a
            className="matchmakers-whatsapp-button"
            href="https://wa.me/923204793274?text=Hello%2C%20I%27d%20like%20a%20free%20matrimonial%20consultation."
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="whatsapp" size={20} />
            Chat on WhatsApp
            <Icon name="arrow" size={17} />
          </a>
          <p className="matchmakers-hours">
            Available 7 days a week
            <br />
            9:00 AM – 11:00 PM
          </p>
        </div>
      </div>
    </section>
  );
}
