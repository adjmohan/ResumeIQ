import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const FilterBar = ({ filters, onFiltersChange, onClearFilters, candidateCount }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [naturalQuery, setNaturalQuery] = useState('');

  const experienceLevels = [
    { value: 'entry', label: 'Entry Level (0-2 years)' },
    { value: 'mid', label: 'Mid Level (3-5 years)' },
    { value: 'senior', label: 'Senior Level (6-10 years)' },
    { value: 'lead', label: 'Lead/Principal (10+ years)' }
  ];

  const skillSuggestions = [
    'JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 
    'Kubernetes', 'Machine Learning', 'Data Analysis', 'Project Management'
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleNaturalQuerySubmit = () => {
    if (naturalQuery.trim()) {
      // Process natural language query
      console.log('Processing natural query:', naturalQuery);
      // This would typically parse the query and update filters
    }
  };

  const activeFiltersCount = Object.values(filters).filter(value => 
    Array.isArray(value) ? value.length > 0 : value !== '' && value !== null
  ).length;

  return (
    <div className="bg-card border border-border rounded-lg mb-6">
      {/* Main Filter Bar */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Filter Candidates</span>
            {activeFiltersCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">
              {candidateCount} candidates found
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
              iconPosition="right"
              iconSize={16}
            >
              {isExpanded ? 'Less' : 'More'} Filters
            </Button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search by name or skills..."
              value={filters.search || ''}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pr-10"
            />
            <Icon 
              name="Search" 
              size={16} 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
          </div>

          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Min %"
              value={filters.minMatch || ''}
              onChange={(e) => handleFilterChange('minMatch', e.target.value)}
              className="w-20"
            />
            <Input
              type="number"
              placeholder="Max %"
              value={filters.maxMatch || ''}
              onChange={(e) => handleFilterChange('maxMatch', e.target.value)}
              className="w-20"
            />
          </div>

          <Select
            options={experienceLevels}
            value={filters.experienceLevel || ''}
            onChange={(value) => handleFilterChange('experienceLevel', value)}
            placeholder="Experience level..."
            multiple
          />

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
              className="flex-1"
            >
              Clear
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              className="flex-1"
            >
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-border p-4 bg-muted/30 animate-slide-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Natural Language Query */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Natural Language Search
              </label>
              <div className="flex space-x-2">
                <Input
                  placeholder="e.g., 'Python developers with 5+ years and AWS experience'"
                  value={naturalQuery}
                  onChange={(e) => setNaturalQuery(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNaturalQuerySubmit}
                  iconName="Sparkles"
                  iconPosition="left"
                  iconSize={16}
                >
                  Search
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Use natural language to describe your ideal candidate
              </p>
            </div>

            {/* Skill Filters */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Required Skills
              </label>
              <div className="flex flex-wrap gap-2">
                {skillSuggestions.map((skill) => (
                  <Checkbox
                    key={skill}
                    label={skill}
                    checked={filters.skills?.includes(skill) || false}
                    onChange={(e) => {
                      const currentSkills = filters.skills || [];
                      const newSkills = e.target.checked
                        ? [...currentSkills, skill]
                        : currentSkills.filter(s => s !== skill);
                      handleFilterChange('skills', newSkills);
                    }}
                    size="sm"
                  />
                ))}
              </div>
            </div>

            {/* Education & Location */}
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Education Level"
                options={[
                  { value: 'bachelors', label: "Bachelor's Degree" },
                  { value: 'masters', label: "Master's Degree" },
                  { value: 'phd', label: 'PhD' },
                  { value: 'certification', label: 'Professional Certification' }
                ]}
                value={filters.education || ''}
                onChange={(value) => handleFilterChange('education', value)}
                placeholder="Any education level"
              />

              <Input
                label="Location"
                placeholder="City, State, or Remote"
                value={filters.location || ''}
                onChange={(e) => handleFilterChange('location', e.target.value)}
              />
            </div>

            {/* Availability & Salary */}
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Availability"
                options={[
                  { value: 'immediate', label: 'Immediate' },
                  { value: '2weeks', label: 'Within 2 weeks' },
                  { value: '1month', label: 'Within 1 month' },
                  { value: 'flexible', label: 'Flexible' }
                ]}
                value={filters.availability || ''}
                onChange={(value) => handleFilterChange('availability', value)}
                placeholder="Any availability"
              />

              <div className="flex space-x-2">
                <Input
                  label="Min Salary"
                  type="number"
                  placeholder="50000"
                  value={filters.minSalary || ''}
                  onChange={(e) => handleFilterChange('minSalary', e.target.value)}
                />
                <Input
                  label="Max Salary"
                  type="number"
                  placeholder="150000"
                  value={filters.maxSalary || ''}
                  onChange={(e) => handleFilterChange('maxSalary', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;