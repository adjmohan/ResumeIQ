import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActionSidebar from '../../components/ui/QuickActionSidebar';
import FilterBar from './components/FilterBar';
import JobSelectionBar from './components/JobSelectionBar';
import JobRequirementsSidebar from './components/JobRequirementsSidebar';
import CandidateTable from './components/CandidateTable';
import Button from '../../components/ui/Button';

// Import AI services
import { parseJobRequirements, rankCandidates } from '../../services/jobMatchingService';
import { generateCandidateAnalysis } from '../../services/candidateAnalysisService';

const CandidateRankingResults = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [rankedCandidates, setRankedCandidates] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobRequirements, setJobRequirements] = useState(null);
  const [filters, setFilters] = useState({
    experienceLevel: '',
    location: '',
    skills: [],
    minScore: 0,
    maxScore: 100
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sortBy, setSortBy] = useState('score');
  const [sortOrder, setSortOrder] = useState('desc');

  // Load parsed candidates from localStorage
  useEffect(() => {
    const parsedCandidates = localStorage.getItem('parsedCandidates');
    if (parsedCandidates) {
      try {
        const candidateData = JSON.parse(parsedCandidates);
        setCandidates(candidateData);
        setRankedCandidates(candidateData);
      } catch (error) {
        console.error('Error loading candidates:', error);
      }
    }
  }, []);

  // Handle job selection and AI ranking
  const handleJobSelected = async (jobData) => {
    setSelectedJob(jobData);
    setIsAnalyzing(true);
    
    try {
      // Step 1: Parse job requirements with AI
      const parsedRequirements = await parseJobRequirements(jobData.description);
      setJobRequirements(parsedRequirements);
      
      // Step 2: Rank candidates using AI
      if (candidates.length > 0) {
        const ranked = await rankCandidates(candidates, parsedRequirements);
        setRankedCandidates(ranked);
      }
      
    } catch (error) {
      console.error('Error analyzing job and ranking candidates:', error);
      alert('Failed to analyze job requirements. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle candidate analysis
  const handleAnalyzeCandidate = async (candidateId) => {
    try {
      const candidate = rankedCandidates.find(c => c.id === candidateId);
      if (candidate) {
        const analysis = await generateCandidateAnalysis(candidate);
        
        // Update candidate with analysis
        setRankedCandidates(prev => prev.map(c => 
          c.id === candidateId 
            ? { ...c, detailedAnalysis: analysis }
            : c
        ));
      }
    } catch (error) {
      console.error('Error analyzing candidate:', error);
      alert('Failed to analyze candidate. Please try again.');
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    // Apply filters to ranked candidates
    let filtered = [...rankedCandidates];
    
    if (newFilters.experienceLevel) {
      filtered = filtered.filter(c => c.experienceLevel === newFilters.experienceLevel);
    }
    
    if (newFilters.location) {
      filtered = filtered.filter(c => 
        c.personalInfo?.location?.toLowerCase().includes(newFilters.location.toLowerCase())
      );
    }
    
    if (newFilters.skills.length > 0) {
      filtered = filtered.filter(c => {
        const candidateSkills = [
          ...(c.skills?.technical || []),
          ...(c.skills?.soft || [])
        ].map(skill => skill.toLowerCase());
        
        return newFilters.skills.some(skill => 
          candidateSkills.includes(skill.toLowerCase())
        );
      });
    }
    
    if (newFilters.minScore || newFilters.maxScore) {
      filtered = filtered.filter(c => {
        const score = c.overallScore || 0;
        return score >= newFilters.minScore && score <= newFilters.maxScore;
      });
    }
    
    setRankedCandidates(filtered);
  };

  const handleSortChange = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
    
    const sorted = [...rankedCandidates].sort((a, b) => {
      let aValue = a[field];
      let bValue = b[field];
      
      if (field === 'score') {
        aValue = a.overallScore || 0;
        bValue = b.overallScore || 0;
      } else if (field === 'name') {
        aValue = a.personalInfo?.name || '';
        bValue = b.personalInfo?.name || '';
      } else if (field === 'experience') {
        aValue = a.totalYearsExperience || 0;
        bValue = b.totalYearsExperience || 0;
      }
      
      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setRankedCandidates(sorted);
  };

  const handleViewProfile = (candidateId) => {
    // Store candidate data for profile view
    const candidate = rankedCandidates.find(c => c.id === candidateId);
    if (candidate) {
      localStorage.setItem('selectedCandidate', JSON.stringify(candidate));
      localStorage.setItem('selectedJobRequirements', JSON.stringify(jobRequirements));
      navigate('/candidate-profile-detail');
    }
  };

  const handleExportResults = () => {
    const exportData = {
      selectedJob,
      jobRequirements,
      candidates: rankedCandidates,
      filters,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `candidate-ranking-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                AI-Powered Candidate Rankings
              </h1>
              <p className="text-muted-foreground">
                Intelligent candidate matching and ranking based on job requirements
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handleExportResults}
                iconName="Download"
                iconPosition="left"
                disabled={rankedCandidates.length === 0}
              >
                Export Results
              </Button>
              
              <Button
                variant="default"
                onClick={() => navigate('/resume-upload-processing')}
                iconName="Upload"
                iconPosition="left"
              >
                Upload More Resumes
              </Button>
            </div>
          </div>

          {/* Job Selection */}
          <JobSelectionBar 
            selectedJob={selectedJob}
            onJobSelected={handleJobSelected}
            isAnalyzing={isAnalyzing}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="space-y-6">
              <JobRequirementsSidebar 
                jobRequirements={jobRequirements}
                selectedJob={selectedJob}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <FilterBar 
                filters={filters}
                onFilterChange={handleFilterChange}
                candidates={rankedCandidates}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />
              
              <CandidateTable
                candidates={rankedCandidates}
                onViewProfile={handleViewProfile}
                onAnalyzeCandidate={handleAnalyzeCandidate}
                jobRequirements={jobRequirements}
                isAnalyzing={isAnalyzing}
              />
            </div>
          </div>
        </div>
      </main>
      
      <QuickActionSidebar />
    </div>
  );
};

export default CandidateRankingResults;