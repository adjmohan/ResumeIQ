import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TeamCollaboration = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Recruiter',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9a1e1e4?w=150&h=150&fit=crop&crop=face',
      status: 'online',
      activeJobs: 3,
      recentActivity: 'Reviewed 5 candidates for Frontend Developer role'
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      role: 'Hiring Manager',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'away',
      activeJobs: 2,
      recentActivity: 'Scheduled interviews for UX Designer position'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      role: 'HR Specialist',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      status: 'online',
      activeJobs: 4,
      recentActivity: 'Updated job requirements for Marketing Manager'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-success';
      case 'away': return 'bg-warning';
      case 'offline': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Team Collaboration</h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          View Team
        </button>
      </div>
      
      <div className="space-y-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className="relative">
              <Image
                src={member.avatar}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(member.status)}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-foreground">{member.name}</h3>
                <span className="text-xs text-muted-foreground">{member.activeJobs} active jobs</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{member.role}</p>
              <p className="text-xs text-muted-foreground">{member.recentActivity}</p>
            </div>
            
            <div className="flex space-x-1">
              <button className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <Icon name="MessageCircle" size={16} />
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors duration-200">
                <Icon name="Mail" size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Icon name="Users" size={16} />
            <span>3 team members online</span>
          </div>
          <button className="text-primary hover:text-primary/80 transition-colors duration-200">
            <Icon name="Plus" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamCollaboration;