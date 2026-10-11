const achievements = [
  { value: "8000+", label: "Premium Profile" },
  { value: "89%", label: "Successful Rishta" },
  { value: "100%", label: "Suitable Proposals" },
  { value: "100%", label: "Customer Support" },
] as const;

export default function StatsSection() {
  return (
    <section
      aria-label="Trust Forever achievements"
      className="home-section-compact border-y border-[#c8a45d]/10 px-5 sm:px-8"
      style={{ background: "var(--navy-gold-background)" }}
    >
      <dl className="mx-auto grid max-w-[1200px] grid-cols-2 lg:grid-cols-4">
        {achievements.map(({ value, label }, index) => (
          <div
            key={label}
            className="group relative flex min-h-[108px] flex-col items-center justify-center gap-2 px-2 py-4 text-center sm:min-h-[124px] sm:gap-2.5 lg:min-h-[132px]"
          >
            <dt className="order-2 text-[10px] font-medium tracking-[0.07em] text-[#f4eee2]/80 sm:text-[11px] lg:text-[12px]">
              {label}
            </dt>
            <dd
              className="order-1 m-0 text-[clamp(36px,6vw,56px)] font-normal leading-none tracking-[-0.045em] text-[#c8a45d] transition duration-300 group-hover:-translate-y-0.5 group-hover:text-[#dfc27f] motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
              style={{ fontFamily: "var(--serif)" }}
            >
              {value}
            </dd>

            {index < 2 && (
              <span
                aria-hidden="true"
                className="absolute inset-x-[22%] bottom-0 h-px bg-[#c8a45d]/15 lg:hidden"
              />
            )}
            {index < achievements.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute right-0 top-1/2 hidden h-10 -translate-y-1/2 lg:block lg:h-12 lg:w-px lg:bg-[#c8a45d]/20"
              />
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}
