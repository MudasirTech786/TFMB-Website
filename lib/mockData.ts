export interface Profile {
  id: string;
  name: string;
  age: number;
  city: string;
  education: string;
  profession: string;
  image: string;
  gender: "Man" | "Woman";
  maritalStatus: string;
  educationLevel: string;
  cast: string;
}

export interface Category {
  name: string;
  description: string;
  image: string;
  href: string;
}

export interface Region {
  name: string;
  count: string;
  image: string;
}

export interface SuccessStory {
  names: string;
  location: string;
  quote: string;
  image: string;
}

export interface Matchmaker {
  name: string;
  role: string;
  image: string;
}

export const profiles: Profile[] = [
  { id: "TFMB-0001", name: "Ali Raza", age: 28, city: "Lahore", education: "BS Computer Science", profession: "Software Engineer", gender: "Man", maritalStatus: "Never Married", educationLevel: "Bachelor's", cast: "Rajput", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=720&q=85" },
  { id: "TFMB-0002", name: "Ayesha Khan", age: 26, city: "Islamabad", education: "MSc Computer Science", profession: "Lecturer", gender: "Woman", maritalStatus: "Never Married", educationLevel: "Master's", cast: "Sheikh", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=720&q=85" },
  { id: "TFMB-0003", name: "Usman Tariq", age: 32, city: "Karachi", education: "MBA", profession: "Business Owner", gender: "Man", maritalStatus: "Divorced", educationLevel: "Master's", cast: "Arain", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=720&q=85" },
  { id: "TFMB-0004", name: "Sara Ahmed", age: 24, city: "Faisalabad", education: "BSc Engineering", profession: "Engineer", gender: "Woman", maritalStatus: "Never Married", educationLevel: "Professional Degree", cast: "Syed", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=720&q=85" },
  { id: "TFMB-0005", name: "Hassan Mahmood", age: 36, city: "Dubai", education: "MBA", profession: "Project Manager", gender: "Man", maritalStatus: "Married", educationLevel: "Master's", cast: "Malik", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=720&q=85" },
  { id: "TFMB-0006", name: "Fatima Noor", age: 29, city: "Karachi", education: "MBBS", profession: "Physician", gender: "Woman", maritalStatus: "Never Married", educationLevel: "Professional Degree", cast: "Qureshi", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=720&q=85" },
  { id: "TFMB-0007", name: "Bilal Ahmed", age: 31, city: "Sialkot", education: "ACCA", profession: "Chartered Accountant", gender: "Man", maritalStatus: "Never Married", educationLevel: "Master's", cast: "Arain", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=720&q=85" },
  { id: "TFMB-0008", name: "Zainab Ali", age: 27, city: "Quetta", education: "Pharm-D", profession: "Pharmacist", gender: "Woman", maritalStatus: "Never Married", educationLevel: "Professional Degree", cast: "Baloch", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=720&q=85" },
  { id: "TFMB-0009", name: "Hamza Sheikh", age: 30, city: "Rawalpindi", education: "BSc Civil Engineering", profession: "Civil Engineer", gender: "Man", maritalStatus: "Never Married", educationLevel: "Bachelor's", cast: "Mughal", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=720&q=85" },
];

export const categories: Category[] = [
  { name: "Men Profiles", description: "Thoughtful introductions", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=640&q=85", href: "#profiles" },
  { name: "Women Profiles", description: "Graceful & genuine", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=640&q=85", href: "#profiles" },
  { name: "International", description: "Across the globe", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=640&q=85", href: "#regions" },
  { name: "Lahore", description: "The heart of Punjab", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=640&q=85", href: "#regions" },
  { name: "Islamabad / Rawalpindi", description: "Capital connections", image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?auto=format&fit=crop&w=640&q=85", href: "#regions" },
  { name: "Karachi", description: "City by the sea", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=640&q=85", href: "#regions" },
  { name: "KPK", description: "Rooted in tradition", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=640&q=85", href: "#regions" },
  { name: "South Punjab", description: "Rich heritage, warm hearts", image: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=640&q=85", href: "#regions" },
  { name: "Other Cities", description: "Find your hometown", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=640&q=85", href: "#regions" },
];

export const regions: Region[] = [
  { name: "International", count: "Worldwide connections", image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=85" },
  { name: "Lahore", count: "The heart of Punjab", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=900&q=85" },
  { name: "Islamabad / Rawalpindi", count: "Capital connections", image: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?auto=format&fit=crop&w=900&q=85" },
  { name: "Karachi", count: "City by the sea", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=900&q=85" },
  { name: "KPK", count: "From the mountains", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85" },
  { name: "South Punjab", count: "A heritage of its own", image: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?auto=format&fit=crop&w=900&q=85" },
  { name: "Other Cities", count: "Across Pakistan", image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85" },
];

export const stories: SuccessStory[] = [
  { names: "Zara & Hamza", location: "Lahore, Pakistan", quote: "Trust Forever made our search easy and stress-free. We found not just a partner, but a best friend for life.", image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=85" },
  { names: "Mariam & Saad", location: "Islamabad, Pakistan", quote: "The team listened to our families and helped us meet with care. We are grateful for the thoughtful guidance from day one.", image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85" },
  { names: "Noor & Bilal", location: "Karachi, Pakistan", quote: "A respectful, personal experience that brought two families together. Our journey began with one honest conversation.", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=85" },
];

export const matchmakers: Matchmaker[] = [
  { name: "Amina Shah", role: "Senior Matchmaker", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=240&q=85" },
  { name: "Omar Siddiqui", role: "Family Consultant", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=85" },
  { name: "Sana Malik", role: "Matchmaker", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=240&q=85" },
  { name: "Farah Iqbal", role: "Client Relations", image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=240&q=85" },
  { name: "Khalid Noor", role: "Family Consultant", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=85" },
];
