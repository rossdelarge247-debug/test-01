import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ImportedProfile, AuthProvider } from '../types';

interface CandidateSession {
  authProvider: AuthProvider;
  importedProfile: ImportedProfile | null;
  setAuthProvider: (p: AuthProvider) => void;
  setImportedProfile: (p: ImportedProfile | null) => void;
  clearSession: () => void;
}

const CandidateSessionContext = createContext<CandidateSession>({
  authProvider: 'none',
  importedProfile: null,
  setAuthProvider: () => {},
  setImportedProfile: () => {},
  clearSession: () => {},
});

export function CandidateSessionProvider({ children }: { children: ReactNode }) {
  const [authProvider, setAuthProvider] = useState<AuthProvider>('none');
  const [importedProfile, setImportedProfile] = useState<ImportedProfile | null>(null);

  function clearSession() {
    setAuthProvider('none');
    setImportedProfile(null);
  }

  return (
    <CandidateSessionContext.Provider
      value={{ authProvider, importedProfile, setAuthProvider, setImportedProfile, clearSession }}
    >
      {children}
    </CandidateSessionContext.Provider>
  );
}

export function useCandidateSession() {
  return useContext(CandidateSessionContext);
}
