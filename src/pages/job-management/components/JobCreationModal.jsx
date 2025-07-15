import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const JobCreationModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    employmentType: 'full-time',
    experienceLevel: 'mid',
    salaryMin: '',
    salaryMax: '',
    description: '',
    requiredSkills: [],
    preferredSkills: [],
    education: 'bachelor',
    isRemote: false,
    isUrgent: false,
    status: 'draft'
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [newSkill, setNewSkill] = useState('');

  const departmentOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' }
  ];

  const employmentTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' }
  ];

  const experienceLevelOptions = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'lead', label: 'Lead/Principal (10+ years)' }
  ];

  const educationOptions = [
    { value: 'high-school', label: 'High School' },
    { value: 'associate', label: 'Associate Degree' },
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'phd', label: 'PhD' }
  ];

  const commonSkills = [
    'JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'Docker',
    'Git', 'Agile', 'Scrum', 'Project Management', 'Communication'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = (type, skill) => {
    if (skill.trim() && !formData[type].includes(skill.trim())) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], skill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (type, skill) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter(s => s !== skill)
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = (status = 'draft') => {
    const jobData = {
      ...formData,
      status,
      id: Date.now(),
      postedDate: new Date().toISOString(),
      applicants: 0,
      views: 0
    };
    onSave(jobData);
    onClose();
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      department: '',
      location: '',
      employmentType: 'full-time',
      experienceLevel: 'mid',
      salaryMin: '',
      salaryMax: '',
      description: '',
      requiredSkills: [],
      preferredSkills: [],
      education: 'bachelor',
      isRemote: false,
      isUrgent: false,
      status: 'draft'
    });
    setCurrentStep(1);
    setNewSkill('');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.title && formData.department && formData.location;
      case 2:
        return formData.description && formData.requiredSkills.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1050 p-4">
      <div className="bg-card border border-border rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Create New Job Posting</h2>
            <p className="text-sm text-muted-foreground">Step {currentStep} of 3</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Basic Info</span>
            <span className="text-sm font-medium text-foreground">Requirements</span>
            <span className="text-sm font-medium text-foreground">Review</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Job Title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g. Senior Software Engineer"
                  required
                />

                <Select
                  label="Department"
                  options={departmentOptions}
                  value={formData.department}
                  onChange={(value) => handleInputChange('department', value)}
                  required
                />

                <Input
                  label="Location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="e.g. San Francisco, CA"
                  required
                />

                <Select
                  label="Employment Type"
                  options={employmentTypeOptions}
                  value={formData.employmentType}
                  onChange={(value) => handleInputChange('employmentType', value)}
                />

                <Select
                  label="Experience Level"
                  options={experienceLevelOptions}
                  value={formData.experienceLevel}
                  onChange={(value) => handleInputChange('experienceLevel', value)}
                />

                <Select
                  label="Education Requirement"
                  options={educationOptions}
                  value={formData.education}
                  onChange={(value) => handleInputChange('education', value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Minimum Salary"
                  type="number"
                  value={formData.salaryMin}
                  onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                  placeholder="50000"
                />
                <Input
                  label="Maximum Salary"
                  type="number"
                  value={formData.salaryMax}
                  onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                  placeholder="80000"
                />
              </div>

              <div className="space-y-3">
                <Checkbox
                  label="Remote Work Available"
                  checked={formData.isRemote}
                  onChange={(e) => handleInputChange('isRemote', e.target.checked)}
                />
                <Checkbox
                  label="Urgent Hiring"
                  checked={formData.isUrgent}
                  onChange={(e) => handleInputChange('isUrgent', e.target.checked)}
                />
              </div>
            </div>
          )}

          {/* Step 2: Requirements */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-foreground">Job Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full h-32 p-3 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Describe the role, responsibilities, and what you're looking for..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Required Skills */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Required Skills</label>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Add required skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill('requiredSkills', newSkill)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addSkill('requiredSkills', newSkill)}
                      iconName="Plus"
                      iconSize={16}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary border border-primary/20"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill('requiredSkills', skill)}
                          className="ml-2 text-primary hover:text-primary/70"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Suggested skills:</p>
                    <div className="flex flex-wrap gap-1">
                      {commonSkills.filter(skill => !formData.requiredSkills.includes(skill)).slice(0, 6).map((skill) => (
                        <button
                          key={skill}
                          onClick={() => addSkill('requiredSkills', skill)}
                          className="px-2 py-1 text-xs bg-muted hover:bg-muted/80 rounded border border-border"
                        >
                          + {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Preferred Skills */}
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Preferred Skills</label>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Add preferred skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill('preferredSkills', newSkill)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addSkill('preferredSkills', newSkill)}
                      iconName="Plus"
                      iconSize={16}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.preferredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-accent/10 text-accent border border-accent/20"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill('preferredSkills', skill)}
                          className="ml-2 text-accent hover:text-accent/70"
                        >
                          <Icon name="X" size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-foreground mb-4">Job Posting Preview</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground">{formData.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formData.department} • {formData.location} • {formData.employmentType}
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium text-foreground mb-2">Description</h5>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {formData.description}
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium text-foreground mb-2">Required Skills</h5>
                    <div className="flex flex-wrap gap-2">
                      {formData.requiredSkills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {formData.preferredSkills.length > 0 && (
                    <div>
                      <h5 className="font-medium text-foreground mb-2">Preferred Skills</h5>
                      <div className="flex flex-wrap gap-2">
                        {formData.preferredSkills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-accent/10 text-accent text-sm rounded-full border border-accent/20"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {(formData.salaryMin || formData.salaryMax) && (
                    <div>
                      <h5 className="font-medium text-foreground mb-2">Salary Range</h5>
                      <p className="text-sm text-muted-foreground">
                        ${formData.salaryMin ? Number(formData.salaryMin).toLocaleString() : '0'} - 
                        ${formData.salaryMax ? Number(formData.salaryMax).toLocaleString() : '0'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex items-center space-x-2">
            {currentStep > 1 && (
              <Button variant="outline" onClick={handlePrevious} iconName="ChevronLeft" iconPosition="left">
                Previous
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {currentStep < 3 ? (
              <Button 
                variant="default" 
                onClick={handleNext}
                disabled={!isStepValid()}
                iconName="ChevronRight" 
                iconPosition="right"
              >
                Next
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={() => handleSave('draft')}>
                  Save as Draft
                </Button>
                <Button variant="default" onClick={() => handleSave('active')}>
                  Publish Job
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCreationModal;