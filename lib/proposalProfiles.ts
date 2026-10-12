import type { TrendingProfile } from "./trendingData";
import {
  getProposalCategories,
  proposalRegions,
  type ProposalGender,
  type ProposalRegion,
} from "./availableProposals";

const femaleNames = [
  "Ayesha Khan",
  "Sana Malik",
  "Maryam Ali",
  "Hira Abdullah",
  "Nadia Shah",
  "Rimsha Qureshi",
  "Zainab Tariq",
  "Maham Hussain",
  "Farah Ahmed",
  "Areeba Noor",
  "Laiba Usman",
  "Anam Waseem",
];

const maleNames = [
  "Hamza Rehman",
  "Usman Tariq",
  "Bilal Ahmed",
  "Arslan Khan",
  "Saad Malik",
  "Zeeshan Mir",
  "Ali Hassan",
  "Musa Raza",
  "Omer Siddiqui",
  "Talha Javed",
  "Adnan Iqbal",
  "Asim Yousaf",
];

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

const generalCastes = ["Rajpoot", "Sheikh", "Syed", "Malik", "Qureshi", "Arain"];
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

function whatsappForSample(id: string): string {
  return `https://wa.me/?text=${encodeURIComponent(
    `Hello, I'd like to ask Trust Forever about profile ${id}.`,
  )}`;
}

function getProfileEducation(categorySlug: string, index: number): {
  education: string;
  profession: string;
} {
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

function getPortraits(gender: ProposalGender): string[] {
  return gender === "female" ? femalePortraits : malePortraits;
}

function getContactPerson(gender: ProposalGender, index: number): string {
  return (gender === "female" ? femaleContacts : maleContacts)[index % 3];
}

function regionLabel(region: ProposalRegion): string {
  return region.slug
    .split("-")
    .map((part) => part.slice(0, 1).toUpperCase())
    .join("");
}

export function getProposalProfilesForListing(
  gender: ProposalGender,
  regionSlug: string,
  categorySlug: string,
): TrendingProfile[] {
  const region = proposalRegions.find((item) => item.slug === regionSlug);
  if (!region) return [];

  const category = getProposalCategories(region).find(
    (item) => item.slug === categorySlug,
  );
  if (!category) return [];

  const portraits = getPortraits(gender);
  const genderLabel = gender === "female" ? "Female" : "Male";
  const genderCode = gender === "female" ? "F" : "M";
  const categoryCode = category.slug
    .split("-")
    .map((part) => part.slice(0, 1).toUpperCase())
    .join("");

  return Array.from({ length: 8 }, (_, index) => {
    const listIndex = index + 1;
    const id = `TF-${genderCode}-${regionLabel(region)}-${categoryCode}-${String(listIndex).padStart(2, "0")}`;
    const location = region.cities[index % region.cities.length];
    const age = category.slug === "late-marriage"
      ? 35 + (index % 7)
      : category.slug === "second-marriage"
        ? 32 + (index % 11)
        : 25 + (index % 9);
    const { education, profession } = getProfileEducation(category.slug, index);

    return {
      id,
      premium: index % 3 === 0,
      gender: genderLabel,
      maritalStatus:
        category.slug === "second-marriage"
          ? index % 3 === 0
            ? "Widowed"
            : "Divorced"
          : "Single",
      country: location.country,
      city: location.city,
      caste:
        category.slug === "ahle-tashi"
          ? "Ahle Tashi"
          : generalCastes[index % generalCastes.length],
      dob: `01-${String((index % 12) + 1).padStart(2, "0")}-${String(2026 - age)}`,
      height: `${gender === "female" ? "5ft" : "5ft"} ${gender === "female" ? 1 + (index % 7) : 6 + (index % 7)}in`,
      education,
      profession,
      image: portraits[index % portraits.length],
      contactPerson: getContactPerson(gender, index),
      whatsapp: whatsappForSample(id),
    } satisfies TrendingProfile;
  });
}
