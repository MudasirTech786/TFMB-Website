import Image from "next/image";

type ProposalGenderAvatarProps = {
  variant: "male" | "female";
};

const avatarAssets = {
  male: {
    src: "/images/proposals/male-proposal.jpg",
    position: "center 31%",
  },
  female: {
    src: "/images/proposals/female-proposal.jpg",
    position: "center 30%",
  },
} as const;

export default function ProposalGenderAvatar({ variant }: ProposalGenderAvatarProps) {
  const avatar = avatarAssets[variant];

  return (
    <div className={`proposal-avatar-scene ${variant}`} aria-hidden="true">
      <Image
        src={avatar.src}
        alt=""
        fill
        sizes="(max-width: 760px) 100vw, (max-width: 1420px) 50vw, 680px"
        className="proposal-avatar-image"
        style={{ objectPosition: avatar.position }}
        preload
      />
    </div>
  );
}
