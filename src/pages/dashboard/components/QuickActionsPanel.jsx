import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = () => {
  const quickActions = [
    {
      title: 'Create New Job',
      description: 'Post a new job opening and start receiving applications',
      icon: 'Plus',
      variant: 'default',
      action: () => window.location.href = '/job-management'
    },
    {
      title: 'Upload Resumes',
      description: 'Upload and process candidate resumes with AI analysis',
      icon: 'Upload',
      variant: 'outline',
      action: () => window.location.href = '/resume-upload-processing'
    },
    {
      title: 'Run Bulk Analysis',
      description: 'Analyze multiple resumes against job requirements',
      icon: 'Zap',
      variant: 'secondary',
      action: () => console.log('Run Bulk Analysis')
    }
  ];

  const recentJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      applications: 24,
      status: 'active',
      posted: '2 days ago'
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      applications: 18,
      status: 'active',
      posted: '4 days ago'
    },
    {
      id: 3,
      title: 'Marketing Manager',
      applications: 31,
      status: 'closed',
      posted: '1 week ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <div key={index} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200">
              <Button
                variant={action.variant}
                onClick={action.action}
                iconName={action.icon}
                iconPosition="left"
                className="w-full justify-start mb-2"
              >
                {action.title}
              </Button>
              <p className="text-sm text-muted-foreground">{action.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Jobs</h2>
          <button 
            onClick={() => window.location.href = '/job-management'}
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
          >
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {recentJobs.map((job) => (
            <div key={job.id} className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-foreground">{job.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  job.status === 'active' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                }`}>
                  {job.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{job.applications} applications</span>
                <span>{job.posted}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Searches */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Saved Searches</h2>
          <button 
            onClick={() => window.location.href = '/search-advanced-filtering'}
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
          >
            Manage
          </button>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors duration-200">
            <span className="text-sm text-foreground">React Developers</span>
            <span className="text-xs text-muted-foreground">12 results</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors duration-200">
            <span className="text-sm text-foreground">Senior Designers</span>
            <span className="text-xs text-muted-foreground">8 results</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors duration-200">
            <span className="text-sm text-foreground">Marketing Specialists</span>
            <span className="text-xs text-muted-foreground">15 results</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;