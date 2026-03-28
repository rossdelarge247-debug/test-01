import { createContext, useContext, useState, type ReactNode } from 'react';
import type { ImportedProfile, AuthProvider } from '../types';

interface CandidateSession {
  authProvider: AuthProvider;
  importedProfile: ImportedProfile | null;
  recommendedTaskIds: string[];
  roleAnswers: Record<string, string>; // roleId → free-text answer
  taskReflections: Record<string, string>; // taskId → free-text reflection
  setAuthProvider: (p: AuthProvider) => void;
  setImportedProfile: (p: ImportedProfile | null) => void;
  setRecommendedTaskIds: (ids: string[]) => void;
  setRoleAnswers: (answers: Record<string, string>) => void;
  setTaskReflection: (taskId: string, value: string) => void;
  clearSession: () => void;
}

const CandidateSessionContext = createContext<CandidateSession>({
  authProvider: 'none',
  importedProfile: null,
  recommendedTaskIds: [],
  roleAnswers: {},
  taskReflections: {},
  setAuthProvider: () => {},
  setImportedProfile: () => {},
  setRecommendedTaskIds: () => {},
  setRoleAnswers: () => {},
  setTaskReflection: () => {},
  clearSession: () => {},
});

export function CandidateSessionProvider({ children }: { children: ReactNode }) {
  const [authProvider, setAuthProvider] = useState<AuthProvider>('none');
  const [importedProfile, setImportedProfile] = useState<ImportedProfile | null>(null);
  const [recommendedTaskIds, setRecommendedTaskIds] = useState<string[]>([]);
  const [roleAnswers, setRoleAnswers] = useState<Record<string, string>>({});
  const [taskReflections, setTaskReflections] = useState<Record<string, string>>({});

  function setTaskReflection(taskId: string, value: string) {
    setTaskReflections((prev) => ({ ...prev, [taskId]: value }));
  }

  function clearSession() {
    setAuthProvider('none');
    setImportedProfile(null);
    setRecommendedTaskIds([]);
    setRoleAnswers({});
    setTaskReflections({});
  }

  return (
    <CandidateSessionContext.Provider
      value={{
        authProvider,
        importedProfile,
        recommendedTaskIds,
        roleAnswers,
        taskReflections,
        setAuthProvider,
        setImportedProfile,
        setRecommendedTaskIds,
        setRoleAnswers,
        setTaskReflection,
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
