import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { CandidateSessionProvider } from './context/CandidateSessionContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './styles/themes.css';

// Landing
import { HomePage } from './pages/landing/HomePage';
import { HowItWorksPage } from './pages/landing/HowItWorksPage';

// Audience landing pages
import { CandidateLanding } from './pages/candidate/CandidateLanding';
import { EmployerLanding } from './pages/employer/EmployerLanding';

// Candidate
import { CandidateSignUp } from './pages/candidate/CandidateSignUp';
import { LinkedInImport } from './pages/candidate/LinkedInImport';
import { ReviewImportedProfile } from './pages/candidate/ReviewImportedProfile';
import { CVUpload } from './pages/candidate/CVUpload';
import { RecommendedSignals } from './pages/candidate/RecommendedSignals';
import { CandidateOnboarding } from './pages/candidate/CandidateOnboarding';
import { RoleFamilySelection } from './pages/candidate/RoleFamilySelection';
import { SignalTaskFlow } from './pages/candidate/SignalTaskFlow';
import { ProfileComplete } from './pages/candidate/ProfileComplete';
import { CandidateDashboard } from './pages/candidate/CandidateDashboard';
import { CandidateProfile } from './pages/candidate/CandidateProfile';
import { CandidateFitExplorer } from './pages/candidate/CandidateFitExplorer';

// Employer
import { EmployerOnboarding } from './pages/employer/EmployerOnboarding';
import { EmployerDashboard } from './pages/employer/EmployerDashboard';
import { CreateFitPack } from './pages/employer/CreateFitPack';
import { FitPackDetail } from './pages/employer/FitPackDetail';
import { CandidateComparison } from './pages/employer/CandidateComparison';

// Analysis
import { FitAnalysisPage } from './pages/analysis/FitAnalysisPage';

function AppShell() {
  const { themeId } = useTheme();
  return (
    <div className="min-h-screen bg-gray-50" data-theme={themeId}>
      <Navbar />
      <Routes>
            {/* Public */}
            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />

            {/* Audience landing pages */}
            <Route path="/candidate" element={<CandidateLanding />} />
            <Route path="/employer" element={<EmployerLanding />} />

            {/* Candidate — sign-up & LinkedIn import */}
            <Route path="/candidate/signup" element={<CandidateSignUp />} />
            <Route path="/candidate/linkedin-import" element={<LinkedInImport />} />
            <Route path="/candidate/review-import" element={<ReviewImportedProfile />} />
            <Route path="/candidate/cv-upload" element={<CVUpload />} />
            <Route path="/candidate/recommended-signals" element={<RecommendedSignals />} />

            {/* Candidate — signal flow */}
            <Route path="/candidate/onboarding" element={<CandidateOnboarding />} />
            <Route path="/candidate/role-family" element={<RoleFamilySelection />} />
            <Route path="/candidate/signal-tasks" element={<SignalTaskFlow />} />
            <Route path="/candidate/profile-complete" element={<ProfileComplete />} />
            <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
            <Route path="/candidate/profile" element={<CandidateProfile />} />
            <Route path="/candidate/profile/:id" element={<CandidateProfile />} />
            <Route path="/candidate/fit/:id" element={<CandidateFitExplorer />} />

            {/* Employer */}
            <Route path="/employer/onboarding" element={<EmployerOnboarding />} />
            <Route path="/employer/dashboard" element={<EmployerDashboard />} />
            <Route path="/employer/create-fit-pack" element={<CreateFitPack />} />
            <Route path="/employer/fit-pack/:id" element={<FitPackDetail />} />
            <Route path="/employer/candidates/:roleId" element={<CandidateComparison />} />

            {/* Analysis */}
            <Route path="/analysis/:candidateId/:roleId" element={<FitAnalysisPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CandidateSessionProvider>
          <AppShell />
        </CandidateSessionProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
