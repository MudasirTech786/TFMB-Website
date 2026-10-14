import Image from "next/image";
import { Icon } from "./Icons";
import type { PublicTrendingProfile } from "../lib/publicTrendingProfiles";
import type { TrendingProfile } from "../lib/trendingData";

/** "Software Engineering from PUCIT" → { title, detail: "from PUCIT" } in two lines */
function splitEducation(education: string) {
  const at = education.indexOf(" from ");
  return at > 0
    ? { title: education.slice(0, at), detail: education.slice(at + 1) }
    : { title: education, detail: null };
}

function currentPakistanDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Karachi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const part = (type: "year" | "month" | "day") => Number(parts.find((item) => item.type === type)?.value);
  return { year: part("year"), month: part("month"), day: part("day") };
}

function ageOnPakistanDate(birthYear: number, birthMonth: number, birthDay: number) {
  const today = currentPakistanDate();
  return today.year - birthYear - (today.month < birthMonth || (today.month === birthMonth && today.day < birthDay) ? 1 : 0);
}

/**
 * TrendingProfileCard — a private, professionally managed matrimonial biodata card.
 * Displays an official profile reference, premium status, structured details,
 * education, profession and a bureau contact. Ready to be fed from an API.
 */
type TrendingProfileCardProps = {
  profile: PublicTrendingProfile | TrendingProfile;
  variant?: "image" | "directory";
  detail?: boolean;
  showMudasirContact?: boolean;
};

export default function TrendingProfileCard({ profile, variant = "image", detail = false, showMudasirContact = false }: TrendingProfileCardProps) {
  if (variant === "directory") {
    const hasPublicAge = "age" in profile;
    const directoryAge = hasPublicAge
      ? profile.age
      : (() => {
          const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(profile.dob);
          if (!match) return null;
          const [, day, month, year] = match;
          return ageOnPakistanDate(Number(year), Number(month), Number(day));
        })();
    const whatsapp = "whatsapp" in profile ? profile.whatsapp : null;
    const contactPerson = "contactPerson" in profile ? profile.contactPerson : null;
    const city = profile.city;
    const country = "country" in profile ? profile.country : null;
    const detailHref = `/profiles/${encodeURIComponent(profile.id)}`;
    const location = [city, country].filter(Boolean).join(", ");

    return (
      <article className="trend-card home-trend-card">
        <div className="home-trend-id-row">
          <span className="home-trend-id"><span>Profile ID</span><strong>{profile.id}</strong></span>
        </div>

        <div className="home-trend-intro">
          {profile.profession && <div className="home-trend-profession"><span>Profession</span><p>{profile.profession}</p></div>}
          {location && <p className="home-trend-location"><span>Location</span><Icon name="pin" size={15} />{location}</p>}
        </div>

        <dl className="home-trend-facts" aria-label="Profile information">
          {profile.gender && <div className="home-trend-fact"><dt>Gender</dt><dd>{profile.gender}</dd></div>}
          {profile.maritalStatus && <div className="home-trend-fact"><dt>Marital status</dt><dd>{profile.maritalStatus}</dd></div>}
          {"sect" in profile && profile.sect && <div className="home-trend-fact"><dt>Sect</dt><dd>{profile.sect}</dd></div>}
          {directoryAge !== null && <div className="home-trend-fact"><dt>Age</dt><dd>{directoryAge} years</dd></div>}
          {profile.height && <div className="home-trend-fact"><dt>Height</dt><dd>{profile.height}</dd></div>}
          {profile.caste && <div className="home-trend-fact"><dt>Caste</dt><dd>{profile.caste}</dd></div>}
          {profile.education && <div className="home-trend-fact home-trend-education"><dt>Education</dt><dd>{profile.education}</dd></div>}
        </dl>

        <div className="home-trend-contact">
          {showMudasirContact ? (
            <div className="home-trend-featured-contact">
              <div className="home-trend-featured-contact-copy">
                <span className="home-trend-contact-label">For More Information</span>
                <p className="home-trend-contact-person">Mr. Mudasir</p>
              </div>
              <a
                className="home-trend-featured-contact-link"
                href={`https://wa.me/923022525228?text=${encodeURIComponent(`Need Details ${profile.id}`)}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`WhatsApp Mr. Mudasir about profile ${profile.id}`}
              >
                <Icon name="whatsapp" size={16} />
                +92 302 2525228
              </a>
            </div>
          ) : (
            <>
              {contactPerson && <><span className="home-trend-contact-label">For More Information</span><p className="home-trend-contact-person">{contactPerson}</p></>}
              <div className="home-trend-actions">
                {whatsapp && <a className="home-trend-whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={16} />WhatsApp</a>}
                {!detail && <a className="home-trend-view" href={detailHref}>View Full Profile <Icon name="arrow" size={14} /></a>}
              </div>
            </>
          )}
        </div>
      </article>
    );
  }

  if (!("image" in profile)) return null;

  const education = splitEducation(profile.education);
  const age = (() => {
    const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(profile.dob);
    if (!match) return null;
    const [, day, month, year] = match;
    return ageOnPakistanDate(Number(year), Number(month), Number(day));
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
