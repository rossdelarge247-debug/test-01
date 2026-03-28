import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ImportedProfile, AuthProvider } from '../types';

interface CandidateSession {
  authProvider: AuthProvider;
  importedProfile: ImportedProfile | null;
  recommendedTaskIds: string[];
  roleAnswers: Record<string, string>; // roleId → free-text answer
  setAuthProvider: (p: AuthProvider) => void;
  setImportedProfile: (p: ImportedProfile | null) => void;
  setRecommendedTaskIds: (ids: string[]) => void;
  setRoleAnswers: (answers: Record<string, string>) => void;
  clearSession: () => void;
}

const CandidateSessionContext = createContext<CandidateSession>({
  authProvider: 'none',
  importedProfile: null,
  recommendedTaskIds: [],
  roleAnswers: {},
  setAuthProvider: () => {},
  setImportedProfile: () => {},
  setRecommendedTaskIds: () => {},
  setRoleAnswers: () => {},
  clearSession: () => {},
});

export function CandidateSessionProvider({ children }: { children: ReactNode }) {
  const [authProvider, setAuthProvider] = useState<AuthProvider>('none');
  const [importedProfile, setImportedProfile] = useState<ImportedProfile | null>(null);
  const [recommendedTaskIds, setRecommendedTaskIds] = useState<string[]>([]);
  const [roleAnswers, setRoleAnswers] = useState<Record<string, string>>({});

  function clearSession() {
    setAuthProvider('none');
    setImportedProfile(null);
    setRecommendedTaskIds([]);
    setRoleAnswers({});
  }

  return (
    <CandidateSessionContext.Provider
      value={{
        authProvider,
        importedProfile,
        recommendedTaskIds,
        roleAnswers,
        setAuthProvider,
        setImportedProfile,
        setRecommendedTaskIds,
        setRoleAnswers,
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
