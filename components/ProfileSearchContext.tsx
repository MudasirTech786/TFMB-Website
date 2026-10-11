"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export interface ProfileFilters {
  lookingFor: string;
  maritalStatus: string;
  education: string;
  cast: string;
  location: string;
}

interface ProfileSearchState {
  filters: ProfileFilters;
  hasSearched: boolean;
  searchProfiles: (filters: ProfileFilters) => void;
}

const ProfileSearchContext = createContext<ProfileSearchState | null>(null);

export function ProfileSearchProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<ProfileFilters>({
    lookingFor: "",
    maritalStatus: "",
    education: "",
    cast: "",
    location: "",
  });
  const [hasSearched, setHasSearched] = useState(false);

  function searchProfiles(nextFilters: ProfileFilters) {
    setFilters(nextFilters);
    setHasSearched(true);
  }

  return (
    <ProfileSearchContext.Provider value={{ filters, hasSearched, searchProfiles }}>
      {children}
    </ProfileSearchContext.Provider>
  );
}

export function useProfileSearch() {
  const context = useContext(ProfileSearchContext);
  if (!context) {
    throw new Error("Profile search components must be rendered inside ProfileSearchProvider.");
  }
  return context;
}
