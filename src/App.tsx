import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';

// Landing
import { HomePage } from './pages/landing/HomePage';
import { HowItWorksPage } from './pages/landing/HowItWorksPage';

// Candidate
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

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />

          {/* Candidate */}
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
    </BrowserRouter>
  );
}
