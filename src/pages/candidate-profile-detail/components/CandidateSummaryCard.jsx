import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CandidateSummaryCard = ({ candidate, onAction }) => {
  const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getMatchBgColor = (percentage) => {
    if (percentage >= 80) return 'bg-success/10';
    if (percentage >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      {/* Profile Header */}
      <div className="text-center mb-6">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-muted">
          <Image
            src={candidate.avatar}
            alt={`${candidate.name} profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-1">{candidate.name}</h2>
        <p className="text-sm text-muted-foreground mb-2">{candidate.title}</p>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getMatchBgColor(candidate.matchPercentage)} ${getMatchColor(candidate.matchPercentage)}`}>
          <Icon name="Target" size={14} className="mr-1" />
          {candidate.matchPercentage}% Match
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-3 text-sm">
          <Icon name="Mail" size={16} className="text-muted-foreground" />
          <span className="text-foreground">{candidate.email}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <Icon name="Phone" size={16} className="text-muted-foreground" />
          <span className="text-foreground">{candidate.phone}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <Icon name="MapPin" size={16} className="text-muted-foreground" />
          <span className="text-foreground">{candidate.location}</span>
        </div>
        <div className="flex items-center space-x-3 text-sm">
          <Icon name="Linkedin" size={16} className="text-muted-foreground" />
          <a href={candidate.linkedin} className="text-primary hover:underline">
            LinkedIn Profile
          </a>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-foreground">{candidate.experience}</div>
          <div className="text-xs text-muted-foreground">Years Exp.</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-foreground">{candidate.skillsMatched}</div>
          <div className="text-xs text-muted-foreground">Skills Match</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <Button
          variant="default"
          fullWidth
          iconName="UserCheck"
          iconPosition="left"
          onClick={() => onAction('shortlist')}
        >
          Shortlist Candidate
        </Button>
        <Button
          variant="outline"
          fullWidth
          iconName="Calendar"
          iconPosition="left"
          onClick={() => onAction('schedule')}
        >
          Schedule Interview
        </Button>
        <Button
          variant="ghost"
          fullWidth
          iconName="MessageSquare"
          iconPosition="left"
          onClick={() => onAction('message')}
        >
          Send Message
        </Button>
        <Button
          variant="destructive"
          fullWidth
          iconName="UserX"
          iconPosition="left"
          onClick={() => onAction('reject')}
        >
          Reject
        </Button>
      </div>

      {/* Application Status */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Status:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            candidate.status === 'Under Review' ?'bg-warning/10 text-warning'
              : candidate.status === 'Shortlisted' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
          }`}>
            {candidate.status}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-muted-foreground">Applied:</span>
          <span className="text-foreground">{candidate.appliedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default CandidateSummaryCard;