import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResumeOverviewTab = ({ resumeData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const sections = [
    {
      title: 'Professional Summary',
      content: resumeData.summary,
      icon: 'User'
    },
    {
      title: 'Key Achievements',
      content: resumeData.achievements,
      icon: 'Award'
    },
    {
      title: 'Technical Skills',
      content: resumeData.technicalSkills,
      icon: 'Code'
    },
    {
      title: 'Certifications',
      content: resumeData.certifications,
      icon: 'Certificate'
    }
  ];

  return (
    <div className="space-y-6">
      {/* AI Analysis Header */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Brain" size={20} className="text-accent" />
          <h3 className="font-semibold text-foreground">AI Resume Analysis</h3>
          <div className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
            Confidence: {resumeData.aiConfidence}%
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Our AI has analyzed this resume and extracted key information with high confidence. 
          The candidate shows strong alignment with the job requirements.
        </p>
      </div>

      {/* Resume Sections */}
      <div className="space-y-4">
        {sections.map((section, index) => (
          <div key={index} className="bg-card border border-border rounded-lg">
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <Icon name={section.icon} size={18} className="text-primary" />
                <h4 className="font-medium text-foreground">{section.title}</h4>
              </div>
            </div>
            <div className="p-4">
              <div className={`text-sm text-foreground leading-relaxed ${
                !isExpanded && section.content.length > 300 ? 'line-clamp-4' : ''
              }`}>
                {section.content}
              </div>
              {section.content.length > 300 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 p-0 h-auto"
                >
                  {isExpanded ? 'Show Less' : 'Show More'}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Original Resume Actions */}
      <div className="bg-muted rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Original Resume</h4>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
          >
            Download PDF
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="Eye"
            iconPosition="left"
          >
            View Original
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconName="FileText"
            iconPosition="left"
          >
            Raw Text
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeOverviewTab;