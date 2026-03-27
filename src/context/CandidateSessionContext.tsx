import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ImportedProfile, AuthProvider } from '../types';

interface CandidateSession {
  authProvider: AuthProvider;
  importedProfile: ImportedProfile | null;
  recommendedTaskIds: string[];
  setAuthProvider: (p: AuthProvider) => void;
  setImportedProfile: (p: ImportedProfile | null) => void;
  setRecommendedTaskIds: (ids: string[]) => void;
  clearSession: () => void;
}

const CandidateSessionContext = createContext<CandidateSession>({
  authProvider: 'none',
  importedProfile: null,
  recommendedTaskIds: [],
  setAuthProvider: () => {},
  setImportedProfile: () => {},
  setRecommendedTaskIds: () => {},
  clearSession: () => {},
});

export function CandidateSessionProvider({ children }: { children: ReactNode }) {
  const [authProvider, setAuthProvider] = useState<AuthProvider>('none');
  const [importedProfile, setImportedProfile] = useState<ImportedProfile | null>(null);
  const [recommendedTaskIds, setRecommendedTaskIds] = useState<string[]>([]);

  function clearSession() {
    setAuthProvider('none');
    setImportedProfile(null);
    setRecommendedTaskIds([]);
  }

  return (
    <CandidateSessionContext.Provider
      value={{
        authProvider,
        importedProfile,
        recommendedTaskIds,
        setAuthProvider,
        setImportedProfile,
        setRecommendedTaskIds,
        clearSession,
      }}
    >
      {children}
    </CandidateSessionContext.Provider>
  );
}

export function useCandidateSession() {
  return useContext(CandidateSessionContext);
}
