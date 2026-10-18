import Image from "next/image";
import Link from "next/link";

export type IconName =
  | "search"
  | "menu"
  | "close"
  | "check"
  | "heart"
  | "arrow"
  | "pin"
  | "cap"
  | "briefcase"
  | "shield"
  | "users"
  | "globe"
  | "spark"
  | "chat"
  | "landmark"
  | "waves"
  | "trees"
  | "building"
  | "factory"
  | "trophy"
  | "mountain"
  | "castle"
  | "facebook"
  | "instagram"
  | "youtube"
  | "tiktok"
  | "x"
  | "user"
  | "calendar"
  | "ruler"
  | "whatsapp";

export function Icon({
  name,
  size = 20,
  filled = false,
  className,
}: {
  name: IconName;
  size?: number;
  filled?: boolean;
  className?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: filled ? "currentColor" : "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    className,
  };
  const paths: Record<IconName, React.ReactNode> = {
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 5 5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    check: (
      <>
        <path d="m5 12 4 4L19 6" />
      </>
    ),
    heart: (
      <path d="M20.8 8.8c0 5-8.8 10.2-8.8 10.2S3.2 13.8 3.2 8.8a4.6 4.6 0 0 1 8.8-1.9 4.6 4.6 0 0 1 8.8 1.9Z" />
    ),
    arrow: (
      <>
        <path d="M4 12h15M13 5l7 7-7 7" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    cap: (
      <>
        <path d="m2 9 10-5 10 5-10 5L2 9Z" />
        <path d="M6 11v5c3.5 3 8.5 3 12 0v-5M22 9v6" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="7" width="18" height="14" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
        <path d="m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z" />
      </>
    ),
    chat: (
      <>
        <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" />
      </>
    ),
    landmark: (
      <>
        <path d="m3 9 9-6 9 6M4 10h16M5 10v9M9 10v9M15 10v9M19 10v9M3 21h18M3 19h18" />
      </>
    ),
    waves: (
      <>
        <path d="M2 8c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 13c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2M2 18c2.5 0 2.5-2 5-2s2.5 2 5 2 2.5-2 5-2 2.5 2 5 2" />
      </>
    ),
    trees: (
      <>
        <path d="m12 3 5 7h-3l4 6h-5v5h-2v-5H6l4-6H7l5-7ZM5 13l-3 4h2l-2 3h6M19 13l3 4h-2l2 3h-6" />
      </>
    ),
    building: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="1" />
        <path d="M9 7h2M14 7h2M9 11h2M14 11h2M9 15h2M14 15h2M10 21v-3h4v3" />
      </>
    ),
    factory: (
      <>
        <path d="M3 21V10l6 4v-4l6 4V6h5v15H3ZM15 6V3h5v3M7 18h2M12 18h2M17 18h2" />
      </>
    ),
    trophy: (
      <>
        <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4v2a4 4 0 0 0 4 4M17 6h3v2a4 4 0 0 1-4 4" />
      </>
    ),
    mountain: (
      <>
        <path d="m3 20 7-13 4 7 2-3 5 9H3Z" />
        <path d="m8 11 2 2 2-2M15 14l1 1 1-1" />
      </>
    ),
    castle: (
      <>
        <path d="M3 21V8l3 2V6l3 3V5l3 4V4l3 5 3-3v5l3-2v12H3ZM10 21v-7h4v7M6 14h1M17 14h1" />
      </>
    ),
    facebook: (
      <>
        <path d="M15 21v-8h3l.5-4H15V7c0-1.2.4-2 2-2h2V1.4C18.3 1.2 17.1 1 16 1c-3.3 0-5 2-5 5.4V9H8v4h3v8Z" />
      </>
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
    youtube: (
      <>
        <path d="M22 12s0-4-1-5-9-1-9-1-8 0-9 1-1 5-1 5 0 4 1 5 9 1 9 1 8 0 9-1 1-5 1-5Z" />
        <path d="m10 9 5 3-5 3V9Z" />
      </>
    ),
    tiktok: (
      <path d="M19.6 7.2a6.7 6.7 0 0 1-4.2-1.5v8.1a5.8 5.8 0 1 1-5-5.7v3.2a2.6 2.6 0 1 0 1.8 2.5V2h3.2c.2 2.1 1.9 3.8 4.2 4v1.2Z" />
    ),
    x: (
      <>
        <path d="m4 4 16 16M20 4 4 20" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" />
      </>
    ),
    ruler: (
      <>
        <rect x="2.5" y="9" width="19" height="6" rx="1.5" />
        <path d="M7 9.5v2M11 9.5v3M15 9.5v2M19 9.5v2.5" />
      </>
    ),
    whatsapp: (
      <>
        <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z" />
        <path d="M14.9 14.3c-.9.9-2.2 1-3.3 0-1-.8-1.7-1.9-2.2-2.9 0-.5.3-.9.9-1 .2 0 .4.1.6.2.1.1.2.1.3.2l.5 1c.2.3.1.7-.2 1 .3.5.7 1 1.1 1.3.2-.2.5-.5.8-.3.2.1.4.2.5.4.3.3.5.5.8.5.4 0 .8.3.8.9 0 .4-.4.7-.8.9Z" />
      </>
    ),
  };
  return <svg {...common}>{paths[name]}</svg>;
}

export function Brand({
  light = false,
  tagline = false,
}: {
  light?: boolean;
  tagline?: boolean;
}) {
  return (
    <Link
      href="/#home"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="Trust Forever home"
    >
      <Image
        src="/images/hero/logo-horizontal.png"
        alt=""
        width={880}
        height={160}
        sizes="(max-width: 480px) 132px, (max-width: 950px) 170px, 225px"
        preload={tagline}
        className="brand-logo"
        style={{
          width: "var(--brand-logo-width, 225px)",
          height: "auto",
          maxWidth: "100%",
        }}
      />
      {tagline}
    </Link>
  );
}
