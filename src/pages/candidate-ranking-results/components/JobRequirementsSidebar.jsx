import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const JobRequirementsSidebar = ({ selectedJob, jobData, onExport }) => {
  const [exportOptions, setExportOptions] = useState({
    format: 'csv',
    fields: ['name', 'email', 'matchPercentage', 'experience', 'skills'],
    includeDetails: false
  });

  if (!selectedJob || !jobData) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center">
          <Icon name="Briefcase" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select a Job</h3>
          <p className="text-muted-foreground text-sm">
            Choose a job position to view requirements and export options.
          </p>
        </div>
      </div>
    );
  }

  const exportFields = [
    { id: 'name', label: 'Candidate Name' },
    { id: 'email', label: 'Email Address' },
    { id: 'matchPercentage', label: 'Match Percentage' },
    { id: 'experience', label: 'Experience Level' },
    { id: 'skills', label: 'Key Skills' },
    { id: 'education', label: 'Education' },
    { id: 'location', label: 'Location' },
    { id: 'availability', label: 'Availability' },
    { id: 'salary', label: 'Expected Salary' }
  ];

  const handleExport = () => {
    onExport(exportOptions);
  };

  const toggleField = (fieldId) => {
    setExportOptions(prev => ({
      ...prev,
      fields: prev.fields.includes(fieldId)
        ? prev.fields.filter(f => f !== fieldId)
        : [...prev.fields, fieldId]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Job Requirements */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Job Requirements</h3>
          <Icon name="Target" size={20} className="text-primary" />
        </div>

        <div className="space-y-4">
          {/* Job Title & Department */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">{jobData.title}</h4>
            <p className="text-xs text-muted-foreground">{jobData.department} • {jobData.location}</p>
          </div>

          {/* Required Skills */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
              <Icon name="Code" size={16} className="mr-2" />
              Required Skills
            </h4>
            <div className="space-y-2">
              {jobData.requiredSkills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="text-sm">{skill.name}</span>
                  <span className="text-xs bg-error/20 text-error px-2 py-1 rounded">
                    {skill.importance}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Skills */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2 flex items-center">
              <Icon name="Plus" size={16} className="mr-2" />
              Preferred Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {jobData.preferredSkills.map((skill, index) => (
                <span key={index} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Experience & Education */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1 flex items-center">
                <Icon name="Briefcase" size={16} className="mr-2" />
                Experience
              </h4>
              <p className="text-sm text-muted-foreground">{jobData.experienceRequired}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-foreground mb-1 flex items-center">
                <Icon name="GraduationCap" size={16} className="mr-2" />
                Education
              </h4>
              <p className="text-sm text-muted-foreground">{jobData.educationRequired}</p>
            </div>
          </div>

          {/* Job Stats */}
          <div className="pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-lg font-semibold text-foreground">{jobData.applicants}</div>
                <div className="text-xs text-muted-foreground">Total Applicants</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-success">{jobData.qualifiedCandidates}</div>
                <div className="text-xs text-muted-foreground">Qualified (&gt;70%)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Export Results</h3>
          <Icon name="Download" size={20} className="text-primary" />
        </div>

        <div className="space-y-4">
          {/* Export Format */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Format</label>
            <div className="flex space-x-2">
              <Button
                variant={exportOptions.format === 'csv' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setExportOptions(prev => ({ ...prev, format: 'csv' }))}
                className="flex-1"
              >
                CSV
              </Button>
              <Button
                variant={exportOptions.format === 'pdf' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setExportOptions(prev => ({ ...prev, format: 'pdf' }))}
                className="flex-1"
              >
                PDF
              </Button>
              <Button
                variant={exportOptions.format === 'excel' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setExportOptions(prev => ({ ...prev, format: 'excel' }))}
                className="flex-1"
              >
                Excel
              </Button>
            </div>
          </div>

          {/* Fields Selection */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Include Fields</label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {exportFields.map((field) => (
                <label key={field.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={exportOptions.fields.includes(field.id)}
                    onChange={() => toggleField(field.id)}
                    className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                  />
                  <span className="text-sm text-foreground">{field.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={exportOptions.includeDetails}
                onChange={(e) => setExportOptions(prev => ({ ...prev, includeDetails: e.target.checked }))}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
              />
              <span className="text-sm text-foreground">Include detailed skill analysis</span>
            </label>
          </div>

          {/* Export Button */}
          <Button
            variant="default"
            onClick={handleExport}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
            className="w-full"
          >
            Export {exportOptions.format.toUpperCase()}
          </Button>
        </div>

        {/* Quick Export Presets */}
        <div className="mt-4 pt-4 border-t border-border">
          <label className="text-sm font-medium text-foreground mb-2 block">Quick Export</label>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport({ format: 'csv', fields: ['name', 'email', 'matchPercentage'], includeDetails: false })}
              iconName="Zap"
              iconPosition="left"
              iconSize={14}
              className="w-full justify-start"
            >
              Top Candidates (CSV)
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onExport({ format: 'pdf', fields: exportFields.map(f => f.id), includeDetails: true })}
              iconName="FileText"
              iconPosition="left"
              iconSize={14}
              className="w-full justify-start"
            >
              Detailed Report (PDF)
            </Button>
          </div>
        </div>
      </div>

      {/* Analysis Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Analysis Summary</h3>
          <Icon name="BarChart3" size={20} className="text-primary" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Excellent Match (&gt;90%)</span>
            <span className="text-sm font-medium text-success">{jobData.matchDistribution.excellent}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Good Match (75-90%)</span>
            <span className="text-sm font-medium text-primary">{jobData.matchDistribution.good}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Fair Match (60-75%)</span>
            <span className="text-sm font-medium text-warning">{jobData.matchDistribution.fair}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Poor Match (&lt;60%)</span>
            <span className="text-sm font-medium text-error">{jobData.matchDistribution.poor}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground">
            <div className="flex items-center space-x-1 mb-1">
              <Icon name="Clock" size={12} />
              <span>Last analysis: {new Date().toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Cpu" size={12} />
              <span>Processing time: 2.3 seconds</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobRequirementsSidebar;