import Image from "next/image";
import { Icon } from "./Icons";
import type { TrendingProfile } from "../lib/trendingData";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "01-01-1998" → "1 Jan 1998" */
function formatDob(dob: string): string {
  const [d, m, y] = dob.split("-");
  const day = parseInt(d, 10);
  const month = MONTHS[parseInt(m, 10) - 1];
  return Number.isNaN(day) || !month ? dob : `${day} ${month} ${y}`;
}

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

      <dl className="tb-details">
        <div className="tb-row"><dt><Icon name="user" size={14} />Gender</dt><dd>{profile.gender}</dd></div>
        <div className="tb-row"><dt><Icon name="heart" size={14} />Marital Status</dt><dd>{profile.maritalStatus}</dd></div>
        <div className="tb-row"><dt><Icon name="globe" size={14} />Country</dt><dd>{profile.country}</dd></div>
        <div className="tb-row"><dt><Icon name="pin" size={14} />City</dt><dd>{profile.city}</dd></div>
        <div className="tb-row"><dt><Icon name="users" size={14} />Cast</dt><dd>{profile.caste}</dd></div>
        <div className="tb-row"><dt><Icon name="calendar" size={14} />Date of Birth</dt><dd>{formatDob(profile.dob)}</dd></div>
        <div className="tb-row"><dt><Icon name="ruler" size={14} />Height</dt><dd>{profile.height}</dd></div>
      </dl>

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