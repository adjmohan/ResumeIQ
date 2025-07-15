import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import WorkflowProgress from '../../components/ui/WorkflowProgress';
import QuickActionSidebar from '../../components/ui/QuickActionSidebar';
import UploadZone from './components/UploadZone';
import ProcessingQueue from './components/ProcessingQueue';
import ProcessingStats from './components/ProcessingStats';
import AdvancedOptions from './components/AdvancedOptions';
import ProcessingNotifications from './components/ProcessingNotifications';
import Button from '../../components/ui/Button';

// Import AI services
import { extractTextFromFile } from '../../services/textExtractionService';
import { parseResumeContent, generateCandidateSummary } from '../../services/resumeParsingService';

const ResumeUploadProcessing = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [parsedCandidates, setParsedCandidates] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [workflowProgress, setWorkflowProgress] = useState({
    isVisible: false,
    currentStep: 1,
    progress: 0,
    stepLabel: 'Initializing...'
  });
  const [notifications, setNotifications] = useState([]);
  const [processingOptions, setProcessingOptions] = useState({
    selectedJob: '',
    autoMatch: true,
    extractSkills: true,
    parseExperience: true,
    generateSummary: true
  });

  // AI-powered file processing
  const processFileWithAI = async (fileId, file) => {
    try {
      // Update file status to processing
      setFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'processing', progress: 10, estimatedTime: '2-3 minutes' }
          : f
      ));

      // Step 1: Extract text from file
      addNotification({
        type: 'info',
        title: 'Text Extraction',
        message: `Extracting text from ${file.name}...`,
        details: ['Using AI-powered text extraction']
      });

      const extractedText = await extractTextFromFile(file);
      
      setFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, progress: 30, estimatedTime: '90s' }
          : f
      ));

      // Step 2: Parse resume content with OpenAI
      addNotification({
        type: 'info',
        title: 'AI Analysis',
        message: `Analyzing resume content with AI...`,
        details: ['Extracting structured information', 'Identifying skills and experience']
      });

      const parsedData = await parseResumeContent(extractedText, file.name);
      
      setFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, progress: 70, estimatedTime: '30s' }
          : f
      ));

      // Step 3: Generate candidate summary if enabled
      let candidateData = parsedData;
      if (processingOptions.generateSummary) {
        addNotification({
          type: 'info',
          title: 'Summary Generation',
          message: `Generating professional summary...`,
          details: ['AI-powered summary creation']
        });

        const summary = await generateCandidateSummary(parsedData);
        candidateData = { ...parsedData, aiGeneratedSummary: summary };
      }

      setFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, progress: 100, status: 'complete', estimatedTime: null }
          : f
      ));

      // Add to parsed candidates
      setParsedCandidates(prev => [...prev, candidateData]);

      // Success notification
      addNotification({
        type: 'success',
        title: 'Processing Complete',
        message: `Successfully processed ${file.name}`,
        details: [
          `Skills extracted: ${candidateData.skills?.technical?.length || 0} technical skills`,
          `Experience: ${candidateData.totalYearsExperience || 0} years`,
          `Education: ${candidateData.education?.length || 0} degrees`,
          'AI analysis completed'
        ]
      });

    } catch (error) {
      console.error('Error processing file:', error);
      
      setFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'error', progress: 0, errorMessage: error.message }
          : f
      ));

      addNotification({
        type: 'error',
        title: 'Processing Failed',
        message: `Failed to process ${file.name}`,
        details: [error.message, 'Please try again or contact support']
      });
    }
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now() + Math.random(),
      timestamp: new Date(),
      ...notification
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const handleFilesSelected = (selectedFiles) => {
    const validFiles = selectedFiles.filter(file => {
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!validTypes.includes(file.type)) {
        addNotification({
          type: 'error',
          title: 'Invalid File Type',
          message: `${file.name} is not a supported format`,
          details: ['Supported formats: PDF, DOCX, TXT']
        });
        return false;
      }
      
      if (file.size > maxSize) {
        addNotification({
          type: 'error',
          title: 'File Too Large',
          message: `${file.name} exceeds 10MB limit`,
          details: [`File size: ${(file.size / 1024 / 1024).toFixed(2)}MB`]
        });
        return false;
      }
      
      return true;
    });

    const newFiles = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      status: 'queuing',
      progress: 0,
      estimatedTime: '2-3 minutes',
      errorMessage: null,
      file: file // Store the actual file object
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Start processing files with AI
    if (newFiles.length > 0) {
      setIsProcessing(true);
      setWorkflowProgress({
        isVisible: true,
        currentStep: 2,
        progress: 25,
        stepLabel: 'AI-powered resume processing...'
      });

      newFiles.forEach((fileData, index) => {
        setTimeout(() => {
          processFileWithAI(fileData.id, fileData.file);
        }, index * 2000); // Stagger processing to avoid rate limits
      });

      addNotification({
        type: 'info',
        title: 'AI Processing Started',
        message: `Started AI-powered processing of ${newFiles.length} file${newFiles.length !== 1 ? 's' : ''}`,
        details: [
          'OpenAI integration active',
          'Advanced text extraction',
          'Intelligent skill identification',
          'Estimated completion: 3-5 minutes per file'
        ]
      });
    }
  };

  const handleRetryFile = (fileId) => {
    const fileData = files.find(f => f.id === fileId);
    if (fileData) {
      setFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, status: 'queuing', progress: 0, errorMessage: null }
          : f
      ));
      
      setTimeout(() => {
        processFileWithAI(fileId, fileData.file);
      }, 1000);
    }
  };

  const handleRemoveFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    // Also remove from parsed candidates if exists
    setParsedCandidates(prev => prev.filter(c => c.fileName !== files.find(f => f.id === fileId)?.name));
  };

  const handleOptionsChange = (options) => {
    setProcessingOptions(options);
  };

  const handleDismissNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleDismissAllNotifications = () => {
    setNotifications([]);
  };

  const handleViewResults = () => {
    // Store parsed candidates in localStorage for access in other components
    localStorage.setItem('parsedCandidates', JSON.stringify(parsedCandidates));
    navigate('/candidate-ranking-results');
  };

  // Check if all files are processed
  useEffect(() => {
    const completedFiles = files.filter(f => f.status === 'complete').length;
    const totalFiles = files.length;
    
    if (totalFiles > 0 && completedFiles === totalFiles) {
      setIsProcessing(false);
      setWorkflowProgress({
        isVisible: true,
        currentStep: 4,
        progress: 100,
        stepLabel: 'AI processing completed successfully!'
      });

      setTimeout(() => {
        setWorkflowProgress(prev => ({ ...prev, isVisible: false }));
      }, 3000);
    }
  }, [files]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <WorkflowProgress {...workflowProgress} />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                AI-Powered Resume Processing
              </h1>
              <p className="text-muted-foreground">
                Upload resume files for advanced AI analysis and intelligent candidate matching
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/candidate-ranking-results')}
                iconName="BarChart3"
                iconPosition="left"
                disabled={parsedCandidates.length === 0}
              >
                View Results ({parsedCandidates.length})
              </Button>
              
              <Button
                variant="default"
                onClick={() => navigate('/job-management')}
                iconName="Plus"
                iconPosition="left"
              >
                New Job Posting
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <UploadZone 
                onFilesSelected={handleFilesSelected}
                isProcessing={isProcessing}
              />
              
              <ProcessingQueue
                files={files}
                onRetry={handleRetryFile}
                onRemove={handleRemoveFile}
              />
              
              <AdvancedOptions onOptionsChange={handleOptionsChange} />
              
              {/* Quick Actions */}
              {parsedCandidates.length > 0 && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Next Steps</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                      variant="default"
                      onClick={handleViewResults}
                      iconName="BarChart3"
                      iconPosition="left"
                      className="justify-start"
                    >
                      View AI Rankings ({parsedCandidates.length})
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => navigate('/search-advanced-filtering')}
                      iconName="Search"
                      iconPosition="left"
                      className="justify-start"
                    >
                      Advanced AI Search
                    </Button>
                    
                    <Button
                      variant="ghost"
                      onClick={() => console.log('Export results')}
                      iconName="Download"
                      iconPosition="left"
                      className="justify-start"
                    >
                      Export Results
                    </Button>
                    
                    <Button
                      variant="ghost"
                      onClick={() => console.log('Bulk actions')}
                      iconName="CheckSquare"
                      iconPosition="left"
                      className="justify-start"
                    >
                      Bulk Actions
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ProcessingStats files={files} />
              
              <ProcessingNotifications
                notifications={notifications}
                onDismiss={handleDismissNotification}
                onDismissAll={handleDismissAllNotifications}
              />
            </div>
          </div>
        </div>
      </main>
      
      <QuickActionSidebar />
    </div>
  );
};

export default ResumeUploadProcessing;