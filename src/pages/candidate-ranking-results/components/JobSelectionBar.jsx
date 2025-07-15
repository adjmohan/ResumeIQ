import React, { useState } from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const JobSelectionBar = ({ selectedJob, onJobChange, jobs, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const jobOptions = jobs.map(job => ({
    value: job.id,
    label: `${job.title} - ${job.department}`,
    description: `${job.applicants} candidates • Posted ${job.postedDate}`
  }));

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center space-x-2">
            <Icon name="Briefcase" size={20} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Analyzing candidates for:</span>
          </div>
          
          <div className="flex-1 max-w-md">
            <Select
              options={jobOptions}
              value={selectedJob}
              onChange={onJobChange}
              placeholder="Select a job position..."
              searchable
              className="min-w-0"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            loading={isRefreshing}
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={16}
          >
            Refresh
          </Button>
        </div>
      </div>

      {selectedJob && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Total Candidates:</span>
                <span className="font-medium text-foreground">
                  {jobs.find(job => job.id === selectedJob)?.applicants || 0}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Target" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Match Threshold:</span>
                <span className="font-medium text-foreground">70%</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">Processing Time:</span>
                <span className="font-medium text-foreground">2.3s</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse-subtle"></div>
              <span className="text-success text-xs font-medium">Analysis Complete</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobSelectionBar;