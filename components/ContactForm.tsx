"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./Icons";

export default function ContactForm() {
  const [notice, setNotice] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      "Message delivery is not connected yet. Your details are still in the form; please contact us directly by email or WhatsApp.",
    );
  }

  return (
    <section className="contact-form-panel" aria-labelledby="contact-form-title">
      <div className="contact-form-heading">
        <span className="contact-form-eyebrow">GET IN TOUCH</span>
        <h2 id="contact-form-title">Send Us a Message</h2>
        <p>Tell us how we can help, and our team will get back to you.</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-fields">
          <div className="contact-field">
            <label htmlFor="contact-name">Full Name <span aria-hidden="true">*</span></label>
            <input
              autoComplete="name"
              id="contact-name"
              name="name"
              placeholder="Enter your full name"
              maxLength={120}
              required
            />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email">Email Address <span aria-hidden="true">*</span></label>
            <input
              autoComplete="email"
              id="contact-email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              maxLength={254}
              required
            />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-phone">Phone Number</label>
            <input
              autoComplete="tel"
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              maxLength={40}
            />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-interest">I’m Interested In</label>
            <select id="contact-interest" name="interest" defaultValue="">
              <option value="">Choose an area (optional)</option>
              <option>General Inquiry</option>
              <option>Matrimonial Services</option>
              <option>Membership Information</option>
              <option>Consultation</option>
              <option>Other</option>
            </select>
          </div>
          <div className="contact-field contact-field-full">
            <label htmlFor="contact-subject">Subject</label>
            <input
              id="contact-subject"
              name="subject"
              placeholder="What is your message about?"
              maxLength={160}
            />
          </div>
          <div className="contact-field contact-field-full">
            <label htmlFor="contact-message">
              Your Message <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              placeholder="Tell us how we can help you..."
              rows={5}
              maxLength={3000}
              required
            />
          </div>
        </div>

        <button className="contact-submit-button" type="submit">
          Send Message
          <Icon name="arrow" size={17} />
        </button>
        <p className="contact-reassurance">
          Your inquiry will be handled with care and respect.
        </p>
        <p className="contact-form-notice" role="status" aria-live="polite">
          {notice}
        </p>
      </form>
    </section>
  );
}
