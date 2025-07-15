import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedOptions = ({ onOptionsChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedJob, setSelectedJob] = useState('');
  const [autoMatch, setAutoMatch] = useState(true);
  const [extractSkills, setExtractSkills] = useState(true);
  const [parseExperience, setParseExperience] = useState(true);
  const [generateSummary, setGenerateSummary] = useState(false);

  const jobOptions = [
    { value: '', label: 'Select a job posting' },
    { value: 'senior-developer', label: 'Senior Software Developer' },
    { value: 'product-manager', label: 'Product Manager' },
    { value: 'data-scientist', label: 'Data Scientist' },
    { value: 'ui-designer', label: 'UI/UX Designer' },
    { value: 'marketing-specialist', label: 'Marketing Specialist' },
    { value: 'business-analyst', label: 'Business Analyst' }
  ];

  const handleOptionsChange = () => {
    const options = {
      selectedJob,
      autoMatch,
      extractSkills,
      parseExperience,
      generateSummary
    };
    onOptionsChange(options);
  };

  React.useEffect(() => {
    handleOptionsChange();
  }, [selectedJob, autoMatch, extractSkills, parseExperience, generateSummary]);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div 
        className="p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Settings" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Advanced Options</h3>
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-muted-foreground" 
          />
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 space-y-6 animate-fade-in">
          {/* Job Assignment */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Job Assignment
            </label>
            <Select
              options={jobOptions}
              value={selectedJob}
              onChange={setSelectedJob}
              placeholder="Choose a job for immediate matching"
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Assign uploaded resumes to a specific job posting for automatic matching analysis
            </p>
          </div>

          {/* Processing Options */}
          <div className="space-y-4">
            <label className="text-sm font-medium text-foreground">
              Processing Features
            </label>
            
            <div className="space-y-3">
              <Checkbox
                label="Auto-match with job requirements"
                description="Automatically calculate match percentages against job descriptions"
                checked={autoMatch}
                onChange={(e) => setAutoMatch(e.target.checked)}
              />
              
              <Checkbox
                label="Extract skills and technologies"
                description="Identify and categorize technical and soft skills from resumes"
                checked={extractSkills}
                onChange={(e) => setExtractSkills(e.target.checked)}
              />
              
              <Checkbox
                label="Parse experience levels"
                description="Analyze work history and calculate years of experience"
                checked={parseExperience}
                onChange={(e) => setParseExperience(e.target.checked)}
              />
              
              <Checkbox
                label="Generate candidate summaries"
                description="Create AI-powered summaries for each candidate profile"
                checked={generateSummary}
                onChange={(e) => setGenerateSummary(e.target.checked)}
              />
            </div>
          </div>

          {/* Bulk Processing Settings */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Bulk Processing
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Zap" size={16} className="text-warning" />
                  <span className="text-sm font-medium">Fast Mode</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Quick processing with basic extraction
                </p>
              </div>
              
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Target" size={16} className="text-success" />
                  <span className="text-sm font-medium">Detailed Mode</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Comprehensive analysis with full features
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedJob('');
                setAutoMatch(true);
                setExtractSkills(true);
                setParseExperience(true);
                setGenerateSummary(false);
              }}
              iconName="RotateCcw"
              iconPosition="left"
            >
              Reset to Defaults
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(false)}
              >
                Collapse
              </Button>
              
              <Button
                variant="default"
                size="sm"
                iconName="Save"
                iconPosition="left"
              >
                Save Settings
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedOptions;