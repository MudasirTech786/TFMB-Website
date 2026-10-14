import type { Metadata } from "next";
import Image from "next/image";
import Footer from "../../components/Footer";
import { Icon } from "../../components/Icons";
import Navbar from "../../components/Navbar";
import ContactForm from "../../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Trust Forever",
  description:
    "Start a conversation with Trust Forever. Ask about matchmaking services and receive personal guidance from our team.",
};

const whatsappUrl =
  "https://wa.me/923022525228?text=Hello%2C%20I%27d%20like%20a%20free%20matrimonial%20consultation.";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="contact-page">
        <section
          className="contact-section home-section-spacing home-section-gutter"
          aria-labelledby="contact-page-title"
        >
          <div className="contact-container">
            <header className="home-section-header contact-intro">
              <span className="eyebrow home-section-eyebrow">
                WE’RE HERE FOR YOU
              </span>
              <h1 className="home-section-title" id="contact-page-title">
                Let’s Start a <em>Conversation</em>
              </h1>
              <p className="home-section-description">
                Whether you have questions about our matchmaking services or
                need guidance on your journey towards finding a life partner,
                our team is here to help.
              </p>
              <span className="contact-intro-rule" aria-hidden="true">
                <i />
                <b />
                <i />
              </span>
            </header>

            <div className="contact-layout">
              <section className="contact-story" aria-labelledby="contact-story-title">
                <div className="contact-image">
                  <Image
                    src="/images/couple1.jpg"
                    alt="A newlywed Pakistani couple sharing a joyful moment together"
                    fill
                    priority
                    sizes="(max-width: 760px) 100vw, (max-width: 1100px) 45vw, 520px"
                  />
                </div>
                <div className="contact-information">
                  <span className="contact-information-eyebrow">
                    PERSONAL, THOUGHTFUL GUIDANCE
                  </span>
                  <h2 id="contact-story-title">We’re Happy to Hear From You</h2>
                  <p className="contact-information-copy">
                    Every meaningful connection begins with a conversation.
                    Reach out to learn more about our services, ask a question,
                    or receive guidance from our team.
                  </p>

                  <div className="contact-details">
                    <div className="contact-detail">
                      <span className="contact-detail-icon">
                        <Icon name="chat" size={18} />
                      </span>
                      <div>
                        <span className="contact-detail-label">EMAIL</span>
                        <a href="mailto:trustforevermarriagebureau@gmail.com">
                          trustforevermarriagebureau@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="contact-detail">
                      <span className="contact-detail-icon">
                        <Icon name="calendar" size={18} />
                      </span>
                      <div>
                        <span className="contact-detail-label">
                          WHATSAPP AVAILABILITY
                        </span>
                        <span>7 days a week, 9:00 AM – 11:00 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <ContactForm />
            </div>

            <ul className="contact-trust-strip" aria-label="Our approach">
              <li>
                <Icon name="users" size={19} />
                <span>Personalized guidance</span>
              </li>
              <li>
                <Icon name="heart" size={19} />
                <span>Respectful communication</span>
              </li>
              <li>
                <Icon name="shield" size={19} />
                <span>Support throughout your journey</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
