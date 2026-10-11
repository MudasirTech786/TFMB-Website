import Link from "next/link";
import Footer from "./Footer";
import { Icon } from "./Icons";
import Navbar from "./Navbar";

export default function ComingSoonPage({
  section,
  title,
  description,
}: {
  section: string;
  title: string;
  description: string;
}) {
  return (
    <>
      <Navbar />
      <main className="relative isolate flex min-h-[min(760px,calc(100svh-82px))] items-center justify-center overflow-hidden bg-[#f8f6f0] px-5 py-16 text-center sm:px-8">
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full border border-[#b79358]/15" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-20 top-22 h-56 w-56 rounded-full border border-[#b79358]/20" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-36 -bottom-24 h-[28rem] w-[28rem] rounded-full border border-[#183d32]/10" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(255,254,250,0.96)_0%,rgba(248,246,240,0.35)_55%,transparent_78%)]" aria-hidden="true" />

        <section className="relative w-full max-w-3xl py-8">
          <div className="mx-auto mb-9 grid size-24 place-items-center rounded-full border border-[#b79358]/35 bg-[#fffefa]/80 text-[#b79358] shadow-[0_18px_55px_rgba(24,61,50,0.08)] sm:size-28">
            <span className="grid size-[4.25rem] place-items-center rounded-full border border-[#b79358]/25 sm:size-[5rem]">
              <Icon name="spark" size={34} />
            </span>
          </div>

          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#b79358]/30 bg-white/70 px-4 py-2 text-[10px] font-bold tracking-[0.24em] text-[#987845]">
            <span className="size-1.5 rounded-full bg-[#b79358]" />
            {section.toUpperCase()}
          </p>
          <h1 className="font-[var(--serif)] text-5xl font-normal leading-[1.06] tracking-[-0.045em] text-[#0b2a4a] sm:text-6xl md:text-7xl">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-[#68716a] sm:text-base">
            {description}
          </p>

          <div className="mx-auto my-9 flex items-center justify-center gap-3 text-[#b79358]" aria-hidden="true">
            <span className="h-px w-12 bg-[#b79358]/40" />
            <Icon name="heart" size={16} />
            <span className="h-px w-12 bg-[#b79358]/40" />
          </div>

          <p className="text-[10px] font-bold tracking-[0.3em] text-[#183d32]/65">SOMETHING MEANINGFUL IS ON ITS WAY</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/#home"
              className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#183d32] px-7 text-xs font-semibold tracking-wide text-white transition hover:bg-[#285444] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b79358]"
            >
              <Icon name="arrow" size={16} />
              Back to Home
            </Link>
            <a
              href="https://wa.me/?text=Hello%2C%20I%27d%20like%20to%20learn%20more%20about%20Trust%20Forever."
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-3 border border-[#183d32]/20 bg-white/65 px-7 text-xs font-semibold tracking-wide text-[#183d32] transition hover:border-[#183d32]/45 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b79358]"
            >
              <Icon name="chat" size={16} />
              Talk to Our Team
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
