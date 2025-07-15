import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Dashboard from "pages/dashboard";
import ResumeUploadProcessing from "pages/resume-upload-processing";
import SearchAdvancedFiltering from "pages/search-advanced-filtering";
import CandidateRankingResults from "pages/candidate-ranking-results";
import CandidateProfileDetail from "pages/candidate-profile-detail";
import JobManagement from "pages/job-management";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume-upload-processing" element={<ResumeUploadProcessing />} />
        <Route path="/search-advanced-filtering" element={<SearchAdvancedFiltering />} />
        <Route path="/candidate-ranking-results" element={<CandidateRankingResults />} />
        <Route path="/candidate-profile-detail" element={<CandidateProfileDetail />} />
        <Route path="/job-management" element={<JobManagement />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;