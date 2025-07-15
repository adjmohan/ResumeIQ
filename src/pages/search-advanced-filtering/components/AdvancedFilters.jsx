import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AdvancedFilters = ({ filters, onFiltersChange, onClearFilters, isExpanded, onToggleExpanded }) => {
  const [activeSection, setActiveSection] = useState('skills');

  const skillOptions = [
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'java', label: 'Java' },
    { value: 'aws', label: 'AWS' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'postgresql', label: 'PostgreSQL' },
    { value: 'graphql', label: 'GraphQL' }
  ];

  const experienceOptions = [
    { value: '0-1', label: '0-1 years' },
    { value: '1-3', label: '1-3 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-8', label: '5-8 years' },
    { value: '8-12', label: '8-12 years' },
    { value: '12+', label: '12+ years' }
  ];

  const educationOptions = [
    { value: 'high-school', label: 'High School' },
    { value: 'associate', label: 'Associate Degree' },
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'phd', label: 'PhD' },
    { value: 'bootcamp', label: 'Coding Bootcamp' }
  ];

  const locationOptions = [
    { value: 'remote', label: 'Remote' },
    { value: 'new-york', label: 'New York, NY' },
    { value: 'san-francisco', label: 'San Francisco, CA' },
    { value: 'seattle', label: 'Seattle, WA' },
    { value: 'austin', label: 'Austin, TX' },
    { value: 'chicago', label: 'Chicago, IL' },
    { value: 'boston', label: 'Boston, MA' },
    { value: 'denver', label: 'Denver, CO' }
  ];

  const companyTypeOptions = [
    { value: 'startup', label: 'Startup' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'fintech', label: 'Fintech' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'saas', label: 'SaaS' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'government', label: 'Government' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.skills?.length > 0) count++;
    if (filters.experience?.length > 0) count++;
    if (filters.education?.length > 0) count++;
    if (filters.location?.length > 0) count++;
    if (filters.companyTypes?.length > 0) count++;
    if (filters.salaryMin || filters.salaryMax) count++;
    if (filters.availableOnly) count++;
    if (filters.recentlyActive) count++;
    return count;
  };

  const filterSections = [
    { id: 'skills', label: 'Skills', icon: 'Code' },
    { id: 'experience', label: 'Experience', icon: 'Briefcase' },
    { id: 'education', label: 'Education', icon: 'GraduationCap' },
    { id: 'location', label: 'Location', icon: 'MapPin' },
    { id: 'company', label: 'Company', icon: 'Building' },
    { id: 'other', label: 'Other', icon: 'Settings' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleExpanded}
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="left"
            iconSize={16}
          >
            Advanced Filters
          </Button>
          {getActiveFiltersCount() > 0 && (
            <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
              {getActiveFiltersCount()} active
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            disabled={getActiveFiltersCount() === 0}
            iconName="X"
            iconPosition="left"
            iconSize={14}
          >
            Clear All
          </Button>
        </div>
      </div>

      {/* Filter Content */}
      {isExpanded && (
        <div className="p-4">
          {/* Filter Section Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
            {filterSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`
                  flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-t-md transition-colors duration-200
                  ${activeSection === section.id
                    ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon name={section.icon} size={16} />
                <span>{section.label}</span>
              </button>
            ))}
          </div>

          {/* Filter Content Sections */}
          <div className="space-y-6">
            {activeSection === 'skills' && (
              <div className="space-y-4">
                <Select
                  label="Required Skills"
                  description="Select skills that candidates must have"
                  multiple
                  searchable
                  clearable
                  options={skillOptions}
                  value={filters.skills || []}
                  onChange={(value) => handleFilterChange('skills', value)}
                  placeholder="Search and select skills..."
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Minimum Skill Level"
                    options={[
                      { value: 'beginner', label: 'Beginner' },
                      { value: 'intermediate', label: 'Intermediate' },
                      { value: 'advanced', label: 'Advanced' },
                      { value: 'expert', label: 'Expert' }
                    ]}
                    value={filters.skillLevel || ''}
                    onChange={(value) => handleFilterChange('skillLevel', value)}
                    placeholder="Any level"
                  />
                  
                  <Input
                    label="Minimum Skills Count"
                    type="number"
                    placeholder="e.g., 3"
                    value={filters.minSkillsCount || ''}
                    onChange={(e) => handleFilterChange('minSkillsCount', e.target.value)}
                    min="1"
                    max="20"
                  />
                </div>
              </div>
            )}

            {activeSection === 'experience' && (
              <div className="space-y-4">
                <Select
                  label="Experience Range"
                  description="Select acceptable experience levels"
                  multiple
                  options={experienceOptions}
                  value={filters.experience || []}
                  onChange={(value) => handleFilterChange('experience', value)}
                  placeholder="Select experience ranges..."
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Minimum Years"
                    type="number"
                    placeholder="e.g., 2"
                    value={filters.minExperience || ''}
                    onChange={(e) => handleFilterChange('minExperience', e.target.value)}
                    min="0"
                    max="50"
                  />
                  
                  <Input
                    label="Maximum Years"
                    type="number"
                    placeholder="e.g., 10"
                    value={filters.maxExperience || ''}
                    onChange={(e) => handleFilterChange('maxExperience', e.target.value)}
                    min="0"
                    max="50"
                  />
                </div>
              </div>
            )}

            {activeSection === 'education' && (
              <div className="space-y-4">
                <Select
                  label="Education Level"
                  description="Select minimum education requirements"
                  multiple
                  options={educationOptions}
                  value={filters.education || []}
                  onChange={(value) => handleFilterChange('education', value)}
                  placeholder="Select education levels..."
                />
                
                <Input
                  label="Field of Study"
                  type="text"
                  placeholder="e.g., Computer Science, Engineering"
                  value={filters.fieldOfStudy || ''}
                  onChange={(e) => handleFilterChange('fieldOfStudy', e.target.value)}
                />
              </div>
            )}

            {activeSection === 'location' && (
              <div className="space-y-4">
                <Select
                  label="Preferred Locations"
                  description="Select acceptable work locations"
                  multiple
                  searchable
                  options={locationOptions}
                  value={filters.location || []}
                  onChange={(value) => handleFilterChange('location', value)}
                  placeholder="Search locations..."
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Radius (miles)"
                    type="number"
                    placeholder="e.g., 50"
                    value={filters.radius || ''}
                    onChange={(e) => handleFilterChange('radius', e.target.value)}
                    min="1"
                    max="500"
                  />
                  
                  <div className="space-y-2">
                    <Checkbox
                      label="Open to relocation"
                      checked={filters.openToRelocation || false}
                      onChange={(e) => handleFilterChange('openToRelocation', e.target.checked)}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'company' && (
              <div className="space-y-4">
                <Select
                  label="Company Types"
                  description="Select preferred company types"
                  multiple
                  options={companyTypeOptions}
                  value={filters.companyTypes || []}
                  onChange={(value) => handleFilterChange('companyTypes', value)}
                  placeholder="Select company types..."
                />
                
                <Input
                  label="Previous Companies"
                  type="text"
                  placeholder="e.g., Google, Microsoft, Amazon"
                  value={filters.previousCompanies || ''}
                  onChange={(e) => handleFilterChange('previousCompanies', e.target.value)}
                  description="Comma-separated list of companies"
                />
              </div>
            )}

            {activeSection === 'other' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Minimum Salary ($)"
                    type="number"
                    placeholder="e.g., 80000"
                    value={filters.salaryMin || ''}
                    onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
                    min="0"
                    step="1000"
                  />
                  
                  <Input
                    label="Maximum Salary ($)"
                    type="number"
                    placeholder="e.g., 150000"
                    value={filters.salaryMax || ''}
                    onChange={(e) => handleFilterChange('salaryMax', e.target.value)}
                    min="0"
                    step="1000"
                  />
                </div>
                
                <div className="space-y-3">
                  <Checkbox
                    label="Available for immediate start"
                    description="Show only candidates available within 2 weeks"
                    checked={filters.availableOnly || false}
                    onChange={(e) => handleFilterChange('availableOnly', e.target.checked)}
                  />
                  
                  <Checkbox
                    label="Recently active"
                    description="Show only candidates active within last 30 days"
                    checked={filters.recentlyActive || false}
                    onChange={(e) => handleFilterChange('recentlyActive', e.target.checked)}
                  />
                  
                  <Checkbox
                    label="Has portfolio/GitHub"
                    description="Show only candidates with online portfolios"
                    checked={filters.hasPortfolio || false}
                    onChange={(e) => handleFilterChange('hasPortfolio', e.target.checked)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFilters;