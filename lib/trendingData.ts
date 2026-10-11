/**
 * Trending profile data for the matrimonial biodata showcase.
 *
 * All records are CLEARLY FICTIONAL dummy data used only to demonstrate the
 * card design. This module is intentionally isolated so the local array can
 * later be replaced by a Laravel API response with the same shape — the UI
 * never hard-codes any profile markup.
 */

export interface TrendingProfile {
  id: string;
  premium: boolean;
  gender: "Male" | "Female";
  maritalStatus: string;
  country: string;
  city: string;
  caste: string;
  /** DD-MM-YYYY */
  dob: string;
  height: string;
  /** e.g. "Software Engineering from PUCIT" */
  education: string;
  profession: string;
  image: string;
  contactPerson: string;
  whatsapp: string;
}

const wa = (id: string) =>
  `https://wa.me/?text=${encodeURIComponent(
    `Hello, I'd like to enquire about profile ${id} on Trust Forever.`
  )}`;

export const trendingProfiles: TrendingProfile[] = [
  {
    id: "IMB24114",
    premium: true,
    gender: "Female",
    maritalStatus: "Single",
    country: "Pakistan",
    city: "Lahore",
    caste: "Rajpoot",
    dob: "01-01-1998",
    height: "5ft 4in",
    education: "Software Engineering from PUCIT",
    profession: "Doing Job",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=720&q=85",
    contactPerson: "Mrs. Nosheen",
    whatsapp: wa("IMB24114"),
  },
  {
    id: "IMB24087",
    premium: true,
    gender: "Male",
    maritalStatus: "Single",
    country: "Pakistan",
    city: "Islamabad",
    caste: "Malik",
    dob: "14-08-1994",
    height: "5ft 9in",
    education: "MBA from LUMS",
    profession: "Business Owner",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=720&q=85",
    contactPerson: "Mr. Rizwan Ali",
    whatsapp: wa("IMB24087"),
  },
  {
    id: "IMB24103",
    premium: false,
    gender: "Female",
    maritalStatus: "Single",
    country: "Pakistan",
    city: "Karachi",
    caste: "Syed",
    dob: "22-04-1999",
    height: "5ft 2in",
    education: "MBBS from Dow Medical College",
    profession: "Physician",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=720&q=85",
    contactPerson: "Mrs. Amna Sheikh",
    whatsapp: wa("IMB24103"),
  },
  {
    id: "IMB24071",
    premium: false,
    gender: "Male",
    maritalStatus: "Single",
    country: "Pakistan",
    city: "Sialkot",
    caste: "Arain",
    dob: "09-11-1993",
    height: "5ft 10in",
    education: "ACCA from SKANS School of Accountancy",
    profession: "Chartered Accountant",
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=720&q=85",
    contactPerson: "Mr. Tariq Mahboob",
    whatsapp: wa("IMB24071"),
  },
  {
    id: "IMB24128",
    premium: true,
    gender: "Female",
    maritalStatus: "Single",
    country: "Pakistan",
    city: "Rawalpindi",
    caste: "Janjua",
    dob: "17-07-1997",
    height: "5ft 3in",
    education: "MA English Literature from Quaid-i-Azam University",
    profession: "Lecturer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=720&q=85",
    contactPerson: "Mrs. Saira Khalid",
    whatsapp: wa("IMB24128"),
  },
  {
    id: "IMB24059",
    premium: false,
    gender: "Male",
    maritalStatus: "Single",
    country: "Pakistan",
    city: "Faisalabad",
    caste: "Sheikh",
    dob: "02-03-1995",
    height: "5ft 8in",
    education: "BSc Accounting & Finance from University of Agriculture",
    profession: "Banker",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=720&q=85",
    contactPerson: "Mr. Faisal Imran",
    whatsapp: wa("IMB24059"),
  },
];