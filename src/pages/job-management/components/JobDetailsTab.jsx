import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const JobDetailsTab = ({ job, isEditing, onSave, onCancel, onEdit }) => {
  const [formData, setFormData] = useState({
    title: job?.title || '',
    department: job?.department || '',
    location: job?.location || '',
    employmentType: job?.employmentType || 'full-time',
    experienceLevel: job?.experienceLevel || 'mid',
    salaryMin: job?.salaryMin || '',
    salaryMax: job?.salaryMax || '',
    description: job?.description || '',
    benefits: job?.benefits || [],
    isRemote: job?.isRemote || false,
    isUrgent: job?.isUrgent || false
  });

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

  const benefitOptions = [
    'Health Insurance',
    'Dental Insurance',
    'Vision Insurance',
    '401(k) Matching',
    'Flexible PTO',
    'Remote Work',
    'Professional Development',
    'Stock Options',
    'Gym Membership',
    'Commuter Benefits'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBenefitToggle = (benefit) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.includes(benefit)
        ? prev.benefits.filter(b => b !== benefit)
        : [...prev.benefits, benefit]
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'draft': return 'text-warning bg-warning/10';
      case 'closed': return 'text-error bg-error/10';
      case 'paused': return 'text-secondary bg-secondary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  if (!job && !isEditing) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Icon name="Briefcase" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Job Selected</h3>
          <p className="text-muted-foreground mb-4">Select a job from the sidebar to view details</p>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Create New Job
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold text-foreground">
            {isEditing ? 'Edit Job Details' : job?.title}
          </h2>
          {!isEditing && job?.status && (
            <span className={`
              px-3 py-1 rounded-full text-sm font-medium capitalize
              ${getStatusColor(job.status)}
            `}>
              {job.status}
            </span>
          )}
        </div>
        
        {!isEditing ? (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Copy" iconPosition="left">
              Duplicate
            </Button>
            <Button variant="default" size="sm" onClick={onEdit} iconName="Edit" iconPosition="left">
              Edit Job
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="default" size="sm" onClick={handleSave} iconName="Save" iconPosition="left">
              Save Changes
            </Button>
          </div>
        )}
      </div>

      {/* Form Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <Input
            label="Job Title"
            type="text"
            value={isEditing ? formData.title : job?.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            disabled={!isEditing}
            required
          />

          <Select
            label="Department"
            options={departmentOptions}
            value={isEditing ? formData.department : job?.department}
            onChange={(value) => handleInputChange('department', value)}
            disabled={!isEditing}
            required
          />

          <Input
            label="Location"
            type="text"
            value={isEditing ? formData.location : job?.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            disabled={!isEditing}
            required
          />

          <Select
            label="Employment Type"
            options={employmentTypeOptions}
            value={isEditing ? formData.employmentType : job?.employmentType}
            onChange={(value) => handleInputChange('employmentType', value)}
            disabled={!isEditing}
            required
          />

          <Select
            label="Experience Level"
            options={experienceLevelOptions}
            value={isEditing ? formData.experienceLevel : job?.experienceLevel}
            onChange={(value) => handleInputChange('experienceLevel', value)}
            disabled={!isEditing}
            required
          />
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Minimum Salary"
              type="number"
              value={isEditing ? formData.salaryMin : job?.salaryMin}
              onChange={(e) => handleInputChange('salaryMin', e.target.value)}
              disabled={!isEditing}
              placeholder="50000"
            />
            <Input
              label="Maximum Salary"
              type="number"
              value={isEditing ? formData.salaryMax : job?.salaryMax}
              onChange={(e) => handleInputChange('salaryMax', e.target.value)}
              disabled={!isEditing}
              placeholder="80000"
            />
          </div>

          {/* Job Options */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Job Options</label>
            <div className="space-y-2">
              <Checkbox
                label="Remote Work Available"
                checked={isEditing ? formData.isRemote : job?.isRemote}
                onChange={(e) => handleInputChange('isRemote', e.target.checked)}
                disabled={!isEditing}
              />
              <Checkbox
                label="Urgent Hiring"
                checked={isEditing ? formData.isUrgent : job?.isUrgent}
                onChange={(e) => handleInputChange('isUrgent', e.target.checked)}
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Benefits & Perks</label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {benefitOptions.map((benefit) => (
                <Checkbox
                  key={benefit}
                  label={benefit}
                  size="sm"
                  checked={isEditing 
                    ? formData.benefits.includes(benefit)
                    : job?.benefits?.includes(benefit)
                  }
                  onChange={() => handleBenefitToggle(benefit)}
                  disabled={!isEditing}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">Job Description</label>
        <div className="min-h-[200px] p-4 border border-border rounded-md bg-background">
          {isEditing ? (
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full h-48 resize-none bg-transparent text-foreground placeholder-muted-foreground focus:outline-none"
              placeholder="Enter detailed job description..."
            />
          ) : (
            <div className="text-foreground whitespace-pre-wrap">
              {job?.description || 'No description available'}
            </div>
          )}
        </div>
      </div>

      {/* Job Stats (View Mode Only) */}
      {!isEditing && job && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{job.applicants}</div>
            <div className="text-sm text-muted-foreground">Applicants</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{job.views}</div>
            <div className="text-sm text-muted-foreground">Views</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{job.shortlisted || 0}</div>
            <div className="text-sm text-muted-foreground">Shortlisted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{job.interviewed || 0}</div>
            <div className="text-sm text-muted-foreground">Interviewed</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailsTab;