"use client";

import { useEffect, useId, useRef, useState, type FocusEvent, type FormEvent, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "./Icons";
import { useProfileSearch, type ProfileFilters } from "./ProfileSearchContext";

type IconName = Parameters<typeof Icon>[0]["name"];

interface MenuOption {
  label: string;
  value: string;
}

function SearchSelect({
  label,
  icon,
  value,
  placeholder,
  options,
  onChange,
}: {
  label: string;
  icon: IconName;
  value: string;
  placeholder: string;
  options: MenuOption[];
  onChange: (value: string) => void;
}) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [open, setOpen] = useState(false);
  const allOptions = [{ label: placeholder, value: "" }, ...options];
  const selectedIndex = Math.max(0, allOptions.findIndex((option) => option.value === value));
  const [activeIndex, setActiveIndex] = useState(selectedIndex);
  const selectedLabel = allOptions[selectedIndex]?.label ?? placeholder;

  useEffect(() => {
    if (!open) return;

    function closeOnOutsideClick(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpen(false);
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [open]);

  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus();
  }, [activeIndex, open]);

  function closeMenu(restoreFocus = false) {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }

  function choose(value: string) {
    onChange(value);
    closeMenu(true);
  }

  function moveOption(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
      return;
    }

    let nextIndex: number | undefined;
    if (event.key === "ArrowDown") nextIndex = (currentIndex + 1) % allOptions.length;
    if (event.key === "ArrowUp") nextIndex = (currentIndex - 1 + allOptions.length) % allOptions.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = allOptions.length - 1;

    if (nextIndex !== undefined) {
      event.preventDefault();
      setActiveIndex(nextIndex);
      optionRefs.current[nextIndex]?.focus();
    }
  }

  function renderOption(option: MenuOption, index: number) {
    return (
      <button
        className={`search-option${value === option.value ? " is-selected" : ""}`}
        id={`${id}-option-${index}`}
        key={option.value || "any"}
        type="button"
        role="option"
        aria-selected={value === option.value}
        ref={(element) => { optionRefs.current[index] = element; }}
        onClick={() => choose(option.value)}
        onKeyDown={(event) => moveOption(event, index)}
      >
        <span className="search-option-mark" aria-hidden="true">{value === option.value ? <Icon name="check" size={13} /> : null}</span>
        <span>{option.label}</span>
      </button>
    );
  }

  return (
    <div
      className={`search-field${open ? " is-open" : ""}`}
      onBlur={(event: FocusEvent<HTMLDivElement>) => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
      ref={rootRef}
    >
      <span className="search-field-label" id={`${id}-label`}><Icon name={icon} size={14} />{label}</span>
      <button
        aria-controls={`${id}-listbox`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={`${id}-label ${id}-value`}
        className={`search-select-trigger${value ? " has-value" : ""}`}
        id={`${id}-value`}
        onClick={() => {
          if (!open) setActiveIndex(selectedIndex);
          setOpen((current) => !current);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex(selectedIndex);
            setOpen(true);
          }
          if (event.key === "Escape") closeMenu();
        }}
        ref={triggerRef}
        role="combobox"
        type="button"
      >
        <span>{selectedLabel}</span>
        <Icon name="arrow" size={15} />
      </button>
      {open && (
        <div
          className="search-options"
          id={`${id}-listbox`}
          role="listbox"
          aria-labelledby={`${id}-label`}
        >
          {renderOption(allOptions[0], 0)}
          {options.map((option, index) => renderOption(option, index + 1))}
        </div>
      )}
    </div>
  );
}

export default function ProfileSearch() {
  const router = useRouter();
  const { searchProfiles } = useProfileSearch();
  const [filters, setFilters] = useState<ProfileFilters>({
    lookingFor: "",
    maritalStatus: "",
    sect: "",
    search: "",
  });

  function updateFilter(field: keyof ProfileFilters, value: string) {
    setFilters((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    searchProfiles(filters);

    const params = new URLSearchParams();
    if (filters.lookingFor) params.set("gender", filters.lookingFor.toLowerCase());
    if (filters.maritalStatus) params.set("marital_status", filters.maritalStatus);
    if (filters.sect.trim()) params.set("sect", filters.sect.trim());
    if (filters.search.trim()) params.set("search", filters.search.trim());
    router.push(`/profiles/search?${params.toString()}`);
  }

  return (
    <section className="search-wrap home-section-spacing home-section-gutter" id="search" aria-labelledby="search-title">
      <div className="search-intro home-section-header">
        <span className="eyebrow home-section-eyebrow">A THOUGHTFUL PLACE TO BEGIN</span>
        <h2 className="home-section-title" id="search-title">Find Your Perfect Match</h2>
        <p className="home-section-description">Discover sincere profiles based on your preferences and selected details.</p>
      </div>
      <form className="search-panel" onSubmit={handleSubmit}>
        <div className="search-panel-head">
          <span className="search-panel-emblem"><Icon name="spark" size={19} /></span>
          <div><strong>Begin with what matters</strong><span>Thoughtful preferences, meaningful introductions.</span></div>
          <span className="search-panel-promise"><Icon name="shield" size={14} /> Considered with care</span>
        </div>
        <label className="search-field search-text-field" htmlFor="profile-search-text">
          <span><Icon name="search" size={14} />Profile ID or name</span>
          <input
            autoComplete="off"
            id="profile-search-text"
            maxLength={255}
            onChange={(event) => updateFilter("search", event.target.value)}
            placeholder="e.g. TFMB-124 or a name"
            type="search"
            value={filters.search}
          />
        </label>
        <label className="search-field search-text-field" htmlFor="profile-search-sect">
          <span><Icon name="spark" size={14} />Sect</span>
          <input
            autoComplete="off"
            id="profile-search-sect"
            maxLength={255}
            onChange={(event) => updateFilter("sect", event.target.value)}
            placeholder="e.g. Ahle Tashi, Shia"
            type="search"
            value={filters.sect}
          />
        </label>
        <SearchSelect
          label="Looking For"
          icon="users"
          value={filters.lookingFor}
          placeholder="Any"
          options={[{ label: "Male", value: "male" }, { label: "Female", value: "female" }]}
          onChange={(value) => updateFilter("lookingFor", value)}
        />
        <SearchSelect
          label="Marital Status"
          icon="heart"
          value={filters.maritalStatus}
          placeholder="Any status"
          options={[
            { label: "Never Married", value: "unmarried" },
            { label: "Married", value: "married" },
            { label: "Divorced", value: "divorced" },
            { label: "Widow / Widower", value: "widowed" },
          ]}
          onChange={(value) => updateFilter("maritalStatus", value)}
        />
        <div className="search-panel-footer">
          <span><Icon name="shield" size={16} /> Every search is a step toward the right introduction.</span>
        </div>
        <button className="button search-button" type="submit">
          <Icon name="search" size={17} />
          <span>Search Profiles</span>
        </button>
      </form>
    </section>
  );
}
