import type { TrendingProfile } from "./trendingData";

export type ProposalGender = "female" | "male";

export interface ProposalRegion {
  slug: string;
  name: string;
  cities: { city: string; country: string }[];
}

export interface ProposalCategory {
  slug: string;
  name: string;
}

export interface ProposalCategoryLink extends ProposalCategory {
  href: string;
}

export const proposalRegions: ProposalRegion[] = [
  {
    slug: "lahore",
    name: "Lahore",
    cities: [{ city: "Lahore", country: "Pakistan" }],
  },
  {
    slug: "islamabad-rawalpindi",
    name: "Islamabad / Rawalpindi",
    cities: [
      { city: "Islamabad", country: "Pakistan" },
      { city: "Rawalpindi", country: "Pakistan" },
    ],
  },
  {
    slug: "south-punjab",
    name: "South Punjab",
    cities: [
      { city: "Multan", country: "Pakistan" },
      { city: "Bahawalpur", country: "Pakistan" },
      { city: "Rahim Yar Khan", country: "Pakistan" },
      { city: "Dera Ghazi Khan", country: "Pakistan" },
    ],
  },
  {
    slug: "karachi",
    name: "Karachi",
    cities: [{ city: "Karachi", country: "Pakistan" }],
  },
  {
    slug: "kpk",
    name: "KPK",
    cities: [
      { city: "Peshawar", country: "Pakistan" },
      { city: "Abbottabad", country: "Pakistan" },
      { city: "Mardan", country: "Pakistan" },
    ],
  },
  {
    slug: "kashmir",
    name: "Kashmir",
    cities: [
      { city: "Muzaffarabad", country: "Pakistan" },
      { city: "Mirpur", country: "Pakistan" },
    ],
  },
  {
    slug: "punjab-other-cities",
    name: "Punjab Other Cities",
    cities: [
      { city: "Faisalabad", country: "Pakistan" },
      { city: "Sialkot", country: "Pakistan" },
      { city: "Gujranwala", country: "Pakistan" },
      { city: "Sargodha", country: "Pakistan" },
    ],
  },
  {
    slug: "international",
    name: "International",
    cities: [
      { city: "Dubai", country: "United Arab Emirates" },
      { city: "Toronto", country: "Canada" },
      { city: "London", country: "United Kingdom" },
      { city: "Doha", country: "Qatar" },
    ],
  },
];

const commonCategories: ProposalCategory[] = [
  { slug: "doctors", name: "Doctors" },
  { slug: "engineers", name: "Engineers" },
  { slug: "other-educated", name: "Other Educated" },
  { slug: "late-marriage", name: "Late Marriage" },
  { slug: "second-marriage", name: "2nd Marriage" },
  { slug: "ahle-tashi", name: "Ahle Tashi" },
];

const regionalCategoryOrder: Record<string, string[]> = {
  "punjab-other-cities": [
    "doctors",
    "engineers",
    "other-educated",
    "second-marriage",
    "late-marriage",
    "ahle-tashi",
  ],
  international: [
    "doctors",
    "engineers",
    "other-educated",
    "second-marriage",
    "late-marriage",
    "ahle-tashi",
  ],
};

export function getProposalCategories(
  region: ProposalRegion,
): ProposalCategory[] {
  const preferredOrder = regionalCategoryOrder[region.slug] ?? [
    "doctors",
    "engineers",
    "other-educated",
    "late-marriage",
    "second-marriage",
    "ahle-tashi",
  ];

  return preferredOrder
    .map((slug) => commonCategories.find((category) => category.slug === slug))
    .filter((category): category is ProposalCategory => Boolean(category))
    .map((category) => ({
      ...category,
      name:
        region.slug === "international" &&
        category.slug === "second-marriage"
          ? "Second Marriage"
          : category.name,
    }));
}

export function getProposalCategoryLinks(
  gender: ProposalGender,
  region: ProposalRegion,
): ProposalCategoryLink[] {
  return getProposalCategories(region).map((category) => ({
    ...category,
    href: `/proposals/${gender}/${region.slug}-${category.slug}`,
  }));
}

export function getProposalGenderLabel(gender: ProposalGender): string {
  return gender === "female" ? "Female" : "Male";
}

const femalePortraits = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=720&q=85",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=720&q=85",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=720&q=85",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=720&q=85",
];

const malePortraits = [
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=720&q=85",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=720&q=85",
  "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=720&q=85",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=720&q=85",
];

export const proposalGenderPortraits = {
  female: femalePortraits[0],
  male: malePortraits[1],
};

const castes = ["Rajpoot", "Sheikh", "Syed", "Malik", "Qureshi", "Arain"];
const femaleContacts = [
  "Mrs. Nosheen",
  "Mrs. Amna Sheikh",
  "Mrs. Saira Khalid",
];
const maleContacts = [
  "Mr. Rizwan Ali",
  "Mr. Tariq Mahboob",
  "Mr. Faisal Imran",
];

const doctorEducation = [
  "MBBS from King Edward Medical University",
  "MBBS from Dow Medical College",
  "BDS from University of Health Sciences",
  "MBBS from Allama Iqbal Medical College",
];
const engineerEducation = [
  "Software Engineering from FAST-NUCES",
  "Electrical Engineering from NUST",
  "Civil Engineering from UET Lahore",
  "Computer Engineering from COMSATS University",
];
const generalEducation = [
  "MBA from Lahore University of Management Sciences",
  "MS Computer Science from Quaid-i-Azam University",
  "MA Education from University of the Punjab",
  "MSc Finance from University of Karachi",
];
const generalProfessions = [
  "Business Professional",
  "Lecturer",
  "Financial Analyst",
  "Project Manager",
];

function whatsappForSample(id: string): string {
  return `https://wa.me/?text=${encodeURIComponent(
    `Hello, I'd like to ask Trust Forever about sample profile ${id}.`,
  )}`;
}

function getProfileEducation(
  categorySlug: string,
  index: number,
): { education: string; profession: string } {
  if (categorySlug === "doctors") {
    return {
      education: doctorEducation[index % doctorEducation.length],
      profession: ["Physician", "Dentist", "Medical Officer", "Consultant"][index % 4],
    };
  }
  if (categorySlug === "engineers") {
    return {
      education: engineerEducation[index % engineerEducation.length],
      profession: [
        "Software Engineer",
        "Electrical Engineer",
        "Civil Engineer",
        "Project Engineer",
      ][index % 4],
    };
  }
  return {
    education: generalEducation[index % generalEducation.length],
    profession: generalProfessions[index % generalProfessions.length],
  };
}

export function createSampleProposalProfiles(
  gender: ProposalGender,
  region: ProposalRegion,
  category: ProposalCategory,
): TrendingProfile[] {
  const profileGender: TrendingProfile["gender"] =
    gender === "female" ? "Female" : "Male";
  const genderCode = gender === "female" ? "F" : "M";
  const regionCode = region.slug
    .split("-")
    .map((part) => part.slice(0, 1).toUpperCase())
    .join("");
  const categoryCode = category.slug
    .split("-")
    .map((part) => part.slice(0, 1).toUpperCase())
    .join("");
  const portraits = gender === "female" ? femalePortraits : malePortraits;
  const contacts = gender === "female" ? femaleContacts : maleContacts;

  return Array.from({ length: 8 }, (_, index) => {
    const id = `TF-DEMO-${genderCode}-${regionCode}-${categoryCode}-${String(index + 1).padStart(2, "0")}`;
    const location = region.cities[index % region.cities.length];
    const age =
      category.slug === "late-marriage"
        ? 35 + (index % 7)
        : category.slug === "second-marriage"
          ? 32 + (index % 11)
          : 25 + (index % 9);
    const { education, profession } = getProfileEducation(
      category.slug,
      index,
    );

    return {
      id,
      premium: index % 3 === 0,
      gender: profileGender,
      maritalStatus:
        category.slug === "second-marriage"
          ? index % 3 === 0
            ? "Widowed"
            : "Divorced"
          : "Single",
      country: location.country,
      city: location.city,
      caste: category.slug === "ahle-tashi" ? "Ahle Tashi" : castes[index % castes.length],
      dob: `01-${String((index % 12) + 1).padStart(2, "0")}-${String(2026 - age)}`,
      height: `${gender === "female" ? "5ft" : "5ft"} ${gender === "female" ? 1 + (index % 7) : 6 + (index % 7)}in`,
      education,
      profession,
      image: portraits[index % portraits.length],
      contactPerson: contacts[index % contacts.length],
      whatsapp: whatsappForSample(id),
    };
  });
}

export function resolveProposalListing(
  genderParam: string,
  categorySlug: string,
): {
  gender: ProposalGender;
  region: ProposalRegion;
  category: ProposalCategory;
} | null {
  if (genderParam !== "female" && genderParam !== "male") {
    return null;
  }

  for (const region of proposalRegions) {
    const category = getProposalCategories(region).find(
      (candidate) => `${region.slug}-${candidate.slug}` === categorySlug,
    );
    if (category) {
      return {
        gender: genderParam,
        region,
        category,
      };
    }
  }
  return null;
}
