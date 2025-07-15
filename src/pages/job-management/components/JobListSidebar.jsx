import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const JobListSidebar = ({ jobs, selectedJob, onJobSelect, onCreateNew }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'draft', label: 'Draft' },
    { value: 'closed', label: 'Closed' },
    { value: 'paused', label: 'Paused' }
  ];

  const departmentOptions = [
    { value: 'all', label: 'All Departments' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || job.department.toLowerCase() === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'draft': return 'text-warning bg-warning/10';
      case 'closed': return 'text-error bg-error/10';
      case 'paused': return 'text-secondary bg-secondary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="h-full bg-card border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Job Postings</h2>
          <Button
            variant="default"
            size="sm"
            onClick={onCreateNew}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            New Job
          </Button>
        </div>

        {/* Search */}
        <Input
          type="search"
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3"
        />

        {/* Filters */}
        <div className="space-y-3">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
          />
          
          <Select
            options={departmentOptions}
            value={departmentFilter}
            onChange={setDepartmentFilter}
            placeholder="Filter by department"
          />
        </div>
      </div>

      {/* Job List */}
      <div className="flex-1 overflow-y-auto">
        {filteredJobs.length === 0 ? (
          <div className="p-4 text-center">
            <Icon name="Briefcase" size={48} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No jobs found</p>
          </div>
        ) : (
          <div className="p-2">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => onJobSelect(job)}
                className={`
                  p-3 rounded-lg cursor-pointer transition-colors duration-200 mb-2
                  ${selectedJob?.id === job.id 
                    ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted'
                  }
                `}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-foreground text-sm line-clamp-2">
                    {job.title}
                  </h3>
                  <span className={`
                    px-2 py-1 rounded-full text-xs font-medium capitalize
                    ${getStatusColor(job.status)}
                  `}>
                    {job.status}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Icon name="Building2" size={12} className="mr-1" />
                    <span>{job.department}</span>
                  </div>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Icon name="MapPin" size={12} className="mr-1" />
                    <span>{job.location}</span>
                  </div>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Icon name="Calendar" size={12} className="mr-1" />
                    <span>Posted {formatDate(job.postedDate)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                    <div className="flex items-center">
                      <Icon name="Users" size={12} className="mr-1" />
                      <span>{job.applicants} applicants</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Eye" size={12} className="mr-1" />
                      <span>{job.views} views</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-border bg-muted/50">
        <div className="text-xs text-muted-foreground">
          <div className="flex justify-between mb-1">
            <span>Total Jobs:</span>
            <span className="font-medium">{jobs.length}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>Active:</span>
            <span className="font-medium text-success">
              {jobs.filter(j => j.status === 'active').length}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Draft:</span>
            <span className="font-medium text-warning">
              {jobs.filter(j => j.status === 'draft').length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListSidebar;