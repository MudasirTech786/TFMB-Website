type ProposalGenderAvatarProps = {
  variant: "male" | "female";
};

export default function ProposalGenderAvatar({ variant }: ProposalGenderAvatarProps) {
  const isMale = variant === "male";

  return (
    <div className={`proposal-avatar-scene ${variant}`} aria-hidden="true">
      <svg viewBox="0 0 320 360" className="proposal-avatar-svg" role="img">
        {isMale ? (
          <>
            <defs>
              <linearGradient id="male-suit" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4dfe9" />
                <stop offset="100%" stopColor="#7a8691" />
              </linearGradient>
            </defs>
            <ellipse cx="160" cy="320" rx="92" ry="18" fill="rgba(11,42,74,0.15)" />
            <g className="avatar-figure" transform="translate(25,5)">
              <circle cx="135" cy="70" r="46" fill="#f0d0b2" />
              <path d="M92 72c8-42 70-58 92-26 8 12 12 28 8 42-10 10-22 16-36 18-17 2-42-8-64-34Z" fill="#1c2431" />
              <path d="M111 101h51c8 0 14 6 14 14v18c0 13-11 24-24 24h-30c-13 0-24-11-24-24v-18c0-8 6-14 13-14Z" fill="#f2d9be" />
              <path d="M82 136l36-24 33 21 51 14-8 93H82l-7-99 7-5Z" fill="url(#male-suit)" />
              <path d="M109 136l28 23 26-23 14 23-17 65h-44l-13-65 6-23Z" fill="#f6f3ee" opacity="0.92" />
              <path d="M143 138l11 27 6 39-17 0-9-39 9-27Z" fill="#c8a45d" />
              <path d="M130 166l-17 59h33l-16-59Z" fill="#c8a45d" opacity="0.9" />
              <path d="M161 164l15 54h34l-25-35-24-19Z" fill="#d8c19a" opacity="0.8" />
              <path d="M90 155l-24 71h38l14-64-28-7Z" fill="#9aa3ad" opacity="0.8" />
              <path d="M86 195h44l-8 76H73l13-76Z" fill="#2b415d" opacity="0.92" />
              <path d="M154 196h58l-11 77h-56l9-77Z" fill="#1f2f42" opacity="0.92" />
              <circle cx="119" cy="83" r="4" fill="#2a2a2a" className="avatar-eye" />
              <circle cx="148" cy="83" r="4" fill="#2a2a2a" className="avatar-eye" />
              <path d="M115 96c7 7 18 7 25 0" stroke="#b78555" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M78 110c13 6 23 8 37 5" stroke="#e8d9bf" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.7"/>
            </g>
          </>
        ) : (
          <>
            <defs>
              <linearGradient id="female-blazer" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e7e4dd" />
                <stop offset="100%" stopColor="#b6bfd1" />
              </linearGradient>
            </defs>
            <ellipse cx="160" cy="322" rx="96" ry="18" fill="rgba(11,42,74,0.14)" />
            <g className="avatar-figure" transform="translate(20,10)">
              <path d="M119 59c-14-1-28 10-32 25-4 15 0 34 13 41 5 3 10 5 17 5 22 0 34-9 42-25 9-18 5-42-18-46-7-1-15-1-22 0Z" fill="#1a2435" />
              <circle cx="141" cy="83" r="48" fill="#f1d0b1" />
              <path d="M98 80c3-29 24-49 49-49 35 0 58 22 58 54 0 18-7 30-17 39-11-1-19-4-25-8-7-5-12-12-17-19-7-10-17-16-28-17-9-1-15 0-20 0Z" fill="#1c1b24" />
              <circle cx="122" cy="86" r="4" fill="#2b2b2b" className="avatar-eye" />
              <circle cx="158" cy="86" r="4" fill="#2b2b2b" className="avatar-eye" />
              <path d="M123 101c10 9 22 9 31 0" stroke="#b67f4d" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M105 120h69c13 0 24 11 24 24v21c0 28-14 48-30 62h-51c-18-13-31-34-31-62v-21c0-13 11-24 19-24Z" fill="url(#female-blazer)" />
              <path d="M130 120l7 40 8 60h-25l-9-60 19-40Z" fill="#f7f6f1" opacity="0.92" />
              <path d="M165 120l-7 41-8 59h28l11-59-24-41Z" fill="#e6cb87" opacity="0.9" />
              <path d="M122 147h40l15 26-21 53h-34l-16-53 16-26Z" fill="#10263d" opacity="0.9" />
              <path d="M123 244h40l-6 60h-28l-6-60Z" fill="#c8a45d" opacity="0.9" />
              <path d="M90 154l-27 67h38l14-63-25-4Z" fill="#c7d2db" opacity="0.82" />
              <path d="M192 155l27 72h-34l-13-63 20-9Z" fill="#c7d2db" opacity="0.82" />
              <path d="M78 213h27l-9 76H64l14-76Z" fill="#0a2542" opacity="0.9" />
              <path d="M184 210h39l9 76h-32l-16-76Z" fill="#0a2542" opacity="0.9" />
            </g>
          </>
        )}
      </svg>
    </div>
  );
}
