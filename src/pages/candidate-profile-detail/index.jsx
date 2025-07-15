import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActionSidebar from '../../components/ui/QuickActionSidebar';
import CandidateSummaryCard from './components/CandidateSummaryCard';
import NavigationControls from './components/NavigationControls';
import ResumeOverviewTab from './components/ResumeOverviewTab';
import SkillsAnalysisTab from './components/SkillsAnalysisTab';
import ExperienceTimelineTab from './components/ExperienceTimelineTab';
import EducationDetailsTab from './components/EducationDetailsTab';
import JobRequirementsPanel from './components/JobRequirementsPanel';
import RecruiterNotesPanel from './components/RecruiterNotesPanel';
import RelatedCandidatesPanel from './components/RelatedCandidatesPanel';
import Button from '../../components/ui/Button';

// Import AI services
import { generateCandidateAnalysis, generateCandidateFeedback, predictCandidateSuccess } from '../../services/candidateAnalysisService';
import { generateInterviewQuestions } from '../../services/jobMatchingService';

const CandidateProfileDetail = () => {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [jobRequirements, setJobRequirements] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [candidateAnalysis, setCandidateAnalysis] = useState(null);
  const [candidateFeedback, setCandidateFeedback] = useState(null);
  const [successPrediction, setSuccessPrediction] = useState(null);
  const [interviewQuestions, setInterviewQuestions] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recruiterNotes, setRecruiterNotes] = useState([]);

  // Load candidate data from localStorage
  useEffect(() => {
    const selectedCandidate = localStorage.getItem('selectedCandidate');
    const selectedJobRequirements = localStorage.getItem('selectedJobRequirements');
    
    if (selectedCandidate) {
      try {
        const candidateData = JSON.parse(selectedCandidate);
        setCandidate(candidateData);
        
        // Load existing analysis if available
        if (candidateData.detailedAnalysis) {
          setCandidateAnalysis(candidateData.detailedAnalysis);
        }
      } catch (error) {
        console.error('Error loading candidate:', error);
      }
    }
    
    if (selectedJobRequirements) {
      try {
        const jobData = JSON.parse(selectedJobRequirements);
        setJobRequirements(jobData);
      } catch (error) {
        console.error('Error loading job requirements:', error);
      }
    }
  }, []);

  // Generate comprehensive candidate analysis
  const handleGenerateAnalysis = async () => {
    if (!candidate) return;
    
    setIsAnalyzing(true);
    
    try {
      const analysis = await generateCandidateAnalysis(candidate);
      setCandidateAnalysis(analysis);
      
      // Update candidate in localStorage
      const updatedCandidate = { ...candidate, detailedAnalysis: analysis };
      localStorage.setItem('selectedCandidate', JSON.stringify(updatedCandidate));
      setCandidate(updatedCandidate);
      
    } catch (error) {
      console.error('Error generating analysis:', error);
      alert('Failed to generate analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Generate candidate feedback
  const handleGenerateFeedback = async () => {
    if (!candidate) return;
    
    setIsAnalyzing(true);
    
    try {
      const feedback = await generateCandidateFeedback(candidate, jobRequirements);
      setCandidateFeedback(feedback);
      
    } catch (error) {
      console.error('Error generating feedback:', error);
      alert('Failed to generate feedback. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Predict candidate success
  const handlePredictSuccess = async () => {
    if (!candidate || !jobRequirements) return;
    
    setIsAnalyzing(true);
    
    try {
      const prediction = await predictCandidateSuccess(candidate, jobRequirements);
      setSuccessPrediction(prediction);
      
    } catch (error) {
      console.error('Error predicting success:', error);
      alert('Failed to predict success. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Generate interview questions
  const handleGenerateInterviewQuestions = async () => {
    if (!candidate || !jobRequirements) return;
    
    setIsAnalyzing(true);
    
    try {
      const questions = await generateInterviewQuestions(candidate, jobRequirements);
      setInterviewQuestions(questions);
      
    } catch (error) {
      console.error('Error generating interview questions:', error);
      alert('Failed to generate interview questions. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAddNote = (note) => {
    const newNote = {
      id: Date.now(),
      text: note,
      timestamp: new Date(),
      author: 'Current User' // In a real app, this would be the logged-in user
    };
    setRecruiterNotes(prev => [newNote, ...prev]);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleNavigateCandidate = (direction) => {
    // In a real app, this would navigate to the next/previous candidate
    console.log('Navigate candidate:', direction);
  };

  if (!candidate) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground mb-4">No candidate selected</h1>
              <Button 
                onClick={() => navigate('/candidate-ranking-results')}
                variant="default"
              >
                Back to Rankings
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
                {candidate.personalInfo?.name || 'Candidate Profile'}
              </h1>
              <p className="text-muted-foreground">
                Detailed analysis and insights powered by AI
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handleGenerateAnalysis}
                iconName="Brain"
                iconPosition="left"
                disabled={isAnalyzing}
              >
                {candidateAnalysis ? 'Refresh Analysis' : 'Generate AI Analysis'}
              </Button>
              
              <Button
                variant="default"
                onClick={() => navigate('/candidate-ranking-results')}
                iconName="ArrowLeft"
                iconPosition="left"
              >
                Back to Rankings
              </Button>
            </div>
          </div>

          {/* Navigation Controls */}
          <NavigationControls 
            onNavigate={handleNavigateCandidate}
            currentCandidate={candidate}
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Candidate Summary */}
              <CandidateSummaryCard 
                candidate={candidate}
                jobRequirements={jobRequirements}
                candidateAnalysis={candidateAnalysis}
              />

              {/* AI Insights Panel */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">AI-Powered Insights</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    onClick={handleGenerateFeedback}
                    iconName="MessageSquare"
                    iconPosition="left"
                    disabled={isAnalyzing}
                    className="justify-start"
                  >
                    Generate Feedback
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handlePredictSuccess}
                    iconName="TrendingUp"
                    iconPosition="left"
                    disabled={isAnalyzing || !jobRequirements}
                    className="justify-start"
                  >
                    Predict Success
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={handleGenerateInterviewQuestions}
                    iconName="HelpCircle"
                    iconPosition="left"
                    disabled={isAnalyzing || !jobRequirements}
                    className="justify-start"
                  >
                    Interview Questions
                  </Button>
                  
                  <Button
                    variant="ghost"
                    onClick={() => console.log('Compare candidates')}
                    iconName="GitCompare"
                    iconPosition="left"
                    className="justify-start"
                  >
                    Compare Candidates
                  </Button>
                </div>

                {/* AI Analysis Results */}
                {candidateAnalysis && (
                  <div className="mt-6 p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">AI Analysis Summary</h4>
                    <p className="text-sm text-muted-foreground">{candidateAnalysis.overallAssessment}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-sm font-medium">Overall Rating:</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full transition-all duration-300"
                            style={{ width: `${(candidateAnalysis.overallRating / 10) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{candidateAnalysis.overallRating}/10</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Success Prediction */}
                {successPrediction && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Success Prediction</h4>
                    <p className="text-sm text-green-800">{successPrediction.recommendation}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-sm font-medium text-green-900">Success Probability:</span>
                      <span className="text-sm font-bold text-green-900">{Math.round(successPrediction.successProbability)}%</span>
                    </div>
                  </div>
                )}

                {/* Interview Questions */}
                {interviewQuestions && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">AI-Generated Interview Questions</h4>
                    <div className="space-y-2 text-sm text-blue-800">
                      {interviewQuestions.technical?.slice(0, 3).map((question, index) => (
                        <div key={index}>• {question}</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tabbed Content */}
              <div className="bg-card border border-border rounded-lg">
                {/* Tab Navigation */}
                <div className="border-b border-border">
                  <nav className="flex space-x-8 px-6">
                    {[
                      { id: 'overview', label: 'Overview', icon: 'User' },
                      { id: 'skills', label: 'Skills Analysis', icon: 'Brain' },
                      { id: 'experience', label: 'Experience', icon: 'Briefcase' },
                      { id: 'education', label: 'Education', icon: 'GraduationCap' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={`
                          flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors
                          ${activeTab === tab.id 
                            ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                          }
                        `}
                      >
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'overview' && (
                    <ResumeOverviewTab 
                      candidate={candidate}
                      candidateAnalysis={candidateAnalysis}
                      candidateFeedback={candidateFeedback}
                    />
                  )}
                  {activeTab === 'skills' && (
                    <SkillsAnalysisTab 
                      candidate={candidate}
                      jobRequirements={jobRequirements}
                      candidateAnalysis={candidateAnalysis}
                    />
                  )}
                  {activeTab === 'experience' && (
                    <ExperienceTimelineTab 
                      candidate={candidate}
                      candidateAnalysis={candidateAnalysis}
                    />
                  )}
                  {activeTab === 'education' && (
                    <EducationDetailsTab 
                      candidate={candidate}
                      candidateAnalysis={candidateAnalysis}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <JobRequirementsPanel 
                jobRequirements={jobRequirements}
                candidate={candidate}
              />
              
              <RecruiterNotesPanel 
                notes={recruiterNotes}
                onAddNote={handleAddNote}
              />
              
              <RelatedCandidatesPanel 
                currentCandidate={candidate}
                onViewCandidate={(candidateId) => {
                  console.log('View related candidate:', candidateId);
                }}
              />
            </div>
          </div>
        </div>
      </main>
      
      <QuickActionSidebar />
    </div>
  );
};

export default CandidateProfileDetail;