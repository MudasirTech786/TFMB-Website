import Image from "next/image";
import { Icon } from "./Icons";
import type { TrendingProfile } from "../lib/trendingData";

/** "Software Engineering from PUCIT" → { title, detail: "from PUCIT" } in two lines */
function splitEducation(education: string) {
  const at = education.indexOf(" from ");
  return at > 0
    ? { title: education.slice(0, at), detail: education.slice(at + 1) }
    : { title: education, detail: null };
}

/**
 * TrendingProfileCard — a private, professionally managed matrimonial biodata card.
 * Displays an official profile reference, premium status, structured details,
 * education, profession and a bureau contact. Ready to be fed from an API.
 */
export default function TrendingProfileCard({ profile }: { profile: TrendingProfile }) {
  const education = splitEducation(profile.education);
  const age = (() => {
    const dobValue = profile.dob.split("-").reverse().join("-");
    const dobDate = new Date(dobValue);
    if (Number.isNaN(dobDate.getTime())) return null;

    const now = new Date();
    let years = now.getFullYear() - dobDate.getFullYear();
    const hasBirthdayPassed =
      now.getMonth() > dobDate.getMonth() ||
      (now.getMonth() === dobDate.getMonth() && now.getDate() >= dobDate.getDate());

    if (!hasBirthdayPassed) years -= 1;
    return years;
  })();

  const profileHeading = profile.profession
    ? `${profile.profession} from ${profile.city}`
    : `Profile ${profile.id}`;

  return (
    <article className="trend-card">
      <div className="tb-photo">
        <Image
          src={profile.image}
          alt={`Profile ${profile.id}`}
          fill
          draggable={false}
          sizes="(max-width: 640px) 92vw, (max-width: 1023px) 48vw, 31vw"
        />
        <span className="tb-shade" aria-hidden="true" />
        {profile.premium && (
          <span className="tb-premium"><i aria-hidden="true">✦</i>Premium</span>
        )}
        <span className="tb-id"><b>Profile ID</b><strong>{profile.id}</strong></span>
      </div>

      <div className="tb-summary">
        <div className="tb-summary-row">
          <span className="tb-profile-label">Profile ID</span>
          <span className="tb-profile-value">{profile.id}</span>
        </div>
        <h2 className="tb-profile-heading">{profileHeading}</h2>
      </div>

      <div className="tb-quick-stats" aria-label="Profile summary">
        <div className="tb-stat">
          <span className="tb-stat-label">Age</span>
          <strong>{age ?? "—"}</strong>
        </div>
        <div className="tb-stat">
          <span className="tb-stat-label">Height</span>
          <strong>{profile.height}</strong>
        </div>
        <div className="tb-stat">
          <span className="tb-stat-label">Status</span>
          <strong>{profile.maritalStatus}</strong>
        </div>
      </div>

      <div className="tb-location-row">
        <span className="tb-location-label"><Icon name="pin" size={13} />Location</span>
        <span className="tb-location-value">{profile.city}, {profile.country}</span>
      </div>

      <div className="tb-sec tb-education">
        <span className="tb-sec-label"><Icon name="cap" size={14} />Education</span>
        <p className="tb-edu-title">{education.title}</p>
        {education.detail && <p className="tb-edu-detail">{education.detail}</p>}
      </div>

      <div className="tb-sec tb-profession">
        <span className="tb-sec-label"><Icon name="briefcase" size={14} />Profession</span>
        <p className="tb-prof-value">{profile.profession}</p>
      </div>

      <div className="tb-contact">
        <span className="tb-contact-label">For More Information</span>
        <p className="tb-contact-name">{profile.contactPerson}</p>
        <div className="tb-contact-actions">
          <a className="tb-whatsapp" href={profile.whatsapp} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={14} />WhatsApp</a>
          <a className="tb-view" href="#profiles">View Full Profile <Icon name="arrow" size={13} /></a>
        </div>
      </div>
    </article>
  );
}