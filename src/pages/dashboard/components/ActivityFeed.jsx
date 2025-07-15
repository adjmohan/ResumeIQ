import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'resume_upload',
      title: 'New resume uploaded',
      description: 'Sarah Johnson uploaded resume for Senior Developer position',
      timestamp: '2 minutes ago',
      icon: 'Upload',
      iconColor: 'bg-primary'
    },
    {
      id: 2,
      type: 'ai_processing',
      title: 'AI analysis completed',
      description: '15 resumes processed for Marketing Manager role',
      timestamp: '5 minutes ago',
      icon: 'Brain',
      iconColor: 'bg-accent'
    },
    {
      id: 3,
      type: 'job_created',
      title: 'New job posting created',
      description: 'Frontend Developer position added by Mike Chen',
      timestamp: '12 minutes ago',
      icon: 'Briefcase',
      iconColor: 'bg-success'
    },
    {
      id: 4,
      type: 'candidate_ranked',
      title: 'Candidate ranking updated',
      description: 'Top 10 candidates identified for UX Designer role',
      timestamp: '18 minutes ago',
      icon: 'Trophy',
      iconColor: 'bg-warning'
    },
    {
      id: 5,
      type: 'team_action',
      title: 'Team collaboration',
      description: 'Emma Wilson shared candidate profile with hiring team',
      timestamp: '25 minutes ago',
      icon: 'Users',
      iconColor: 'bg-secondary'
    },
    {
      id: 6,
      type: 'export_completed',
      title: 'Export completed',
      description: 'Candidate rankings exported to CSV format',
      timestamp: '32 minutes ago',
      icon: 'Download',
      iconColor: 'bg-muted'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Recent Activity</h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.iconColor}`}>
              <Icon name={activity.icon} size={16} color="white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-foreground mb-1">{activity.title}</h3>
              <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
              <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors duration-200">
              <Icon name="MoreHorizontal" size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;