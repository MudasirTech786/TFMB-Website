import { Icon } from "./Icons";
export default function WhatsAppCTA() {
  return (
    <aside className="whatsapp-card">
      <div className="whatsapp-topline">
        <span className="whatsapp-icon">
          <Icon name="chat" size={23} />
        </span>
        <span className="availability">
          <i /> Available now
        </span>
      </div>
      <span className="eyebrow">LET&apos;S TALK</span>
      <h3>
        Free Consultation
        <br />
        <em>on WhatsApp</em>
      </h3>
      <p>
        Talk to our experts and get personalized guidance for your perfect
        match.
      </p>
      <a
        className="whatsapp-button"
        href="https://wa.me/?text=Hello%2C%20I%27d%20like%20a%20free%20matrimonial%20consultation."
        target="_blank"
        rel="noreferrer"
      >
        Chat on WhatsApp <Icon name="arrow" size={16} />
      </a>
      <small>
        Available 7 days a week
        <br />
        9:00 AM – 11:00 PM
      </small>
      <div className="whatsapp-flower" aria-hidden="true">
        ✳
      </div>
    </aside>
  );
}
