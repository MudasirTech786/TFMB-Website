export interface PublicTrendingProfile {
  id: string;
  gender: "Male" | "Female";
  maritalStatus: string | null;
  age: number | null;
  sect: string | null;
  height: string | null;
  caste: string | null;
  city: string | null;
  education: string | null;
  profession: string | null;
}

interface LaravelTrendingProfile {
  profile_id?: unknown;
  gender?: unknown;
  marital_status?: unknown;
  age?: unknown;
  sect?: unknown;
  height?: unknown;
  caste?: unknown;
  qualification?: unknown;
  educational_institution?: unknown;
  job?: unknown;
  business?: unknown;
  city?: unknown;
}

function nullableString(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
}

function mapProfile(value: unknown): PublicTrendingProfile | null {
  if (!value || typeof value !== "object") return null;

  const record = value as LaravelTrendingProfile;
  const id = nullableString(record.profile_id);
  const rawGender = nullableString(record.gender)?.toLowerCase();
  if (!id || (rawGender !== "male" && rawGender !== "female")) return null;

  const qualification = nullableString(record.qualification);
  const institution = nullableString(record.educational_institution);
  const education = [qualification, institution].filter(Boolean).join(" — ") || null;
  const profession = nullableString(record.job) ?? nullableString(record.business);
  const maritalStatus = nullableString(record.marital_status)?.toLowerCase();
  const maritalStatusLabel: Record<string, string> = {
    unmarried: "Never Married",
    married: "Married",
    divorced: "Divorced",
    widowed: "Widow / Widower",
  };

  return {
    id,
    gender: rawGender === "male" ? "Male" : "Female",
    maritalStatus: maritalStatus ? maritalStatusLabel[maritalStatus] ?? maritalStatus : null,
    age: typeof record.age === "number" && Number.isFinite(record.age) ? record.age : null,
    sect: nullableString(record.sect),
    height: nullableString(record.height),
    caste: nullableString(record.caste),
    city: nullableString(record.city),
    education,
    profession,
  };
}

export async function fetchPublicTrendingProfiles(): Promise<{
  profiles: PublicTrendingProfile[];
  error: boolean;
}> {
  const baseUrl = process.env.LARAVEL_API_URL?.trim().replace(/\/+$/, "");
  if (!baseUrl) return { profiles: [], error: true };
  const endpoint = /\/api$/i.test(baseUrl)
    ? `${baseUrl}/public/trending-profiles`
    : `${baseUrl}/api/public/trending-profiles`;

  try {
    const response = await fetch(endpoint, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!response.ok) return { profiles: [], error: true };

    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object" || !("profiles" in payload)) {
      return { profiles: [], error: true };
    }

    const records = (payload as { profiles?: unknown }).profiles;
    if (!Array.isArray(records)) return { profiles: [], error: true };

    return {
      profiles: records.map(mapProfile).filter((profile): profile is PublicTrendingProfile => profile !== null).slice(0, 10),
      error: false,
    };
  } catch {
    return { profiles: [], error: true };
  }
}

export interface PublicProfileSearchFilters {
  gender?: string;
  marital_status?: string;
  education?: string;
  caste?: string;
  sect?: string;
  city?: string;
  search?: string;
  profession?: string;
  category?: string;
  min_age?: string | number;
  max_age?: string | number;
  page?: string | number;
  per_page?: string | number;
}

export async function searchPublicProfiles(filters: PublicProfileSearchFilters): Promise<{
  profiles: PublicTrendingProfile[];
  total: number;
  currentPage: number;
  lastPage: number;
  error: boolean;
}> {
  const baseUrl = process.env.LARAVEL_API_URL?.trim().replace(/\/+$/, "");
  if (!baseUrl) return { profiles: [], total: 0, currentPage: 1, lastPage: 1, error: true };

  const endpointBase = /\/api$/i.test(baseUrl)
    ? `${baseUrl}/public/profiles/search`
    : `${baseUrl}/api/public/profiles/search`;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if ((typeof value === "string" || typeof value === "number") && String(value).trim() !== "") {
      params.set(key, String(value).trim());
    }
  }

  try {
    const response = await fetch(`${endpointBase}?${params.toString()}`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) return { profiles: [], total: 0, currentPage: 1, lastPage: 1, error: true };

    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object" || !("profiles" in payload)) {
      return { profiles: [], total: 0, currentPage: 1, lastPage: 1, error: true };
    }

    const responseBody = payload as {
      profiles?: unknown;
      total?: unknown;
      current_page?: unknown;
      last_page?: unknown;
    };
    if (!Array.isArray(responseBody.profiles)) return { profiles: [], total: 0, currentPage: 1, lastPage: 1, error: true };

    const profiles = responseBody.profiles
      .map(mapProfile)
      .filter((profile): profile is PublicTrendingProfile => profile !== null);
    return {
      profiles,
      total: typeof responseBody.total === "number" ? responseBody.total : profiles.length,
      currentPage: typeof responseBody.current_page === "number" ? responseBody.current_page : 1,
      lastPage: typeof responseBody.last_page === "number" ? responseBody.last_page : 1,
      error: false,
    };
  } catch {
    return { profiles: [], total: 0, currentPage: 1, lastPage: 1, error: true };
  }
}

export async function fetchPublicProfile(profileId: string): Promise<PublicTrendingProfile | null> {
  const baseUrl = process.env.LARAVEL_API_URL?.trim().replace(/\/+$/, "");
  if (!baseUrl) return null;
  const endpointBase = /\/api$/i.test(baseUrl) ? `${baseUrl}/public/profiles` : `${baseUrl}/api/public/profiles`;

  try {
    const response = await fetch(`${endpointBase}/${encodeURIComponent(profileId)}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    const payload: unknown = await response.json();
    if (!payload || typeof payload !== "object" || !("profile" in payload)) return null;
    return mapProfile((payload as { profile?: unknown }).profile);
  } catch {
    return null;
  }
}
