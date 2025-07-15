import React from 'react';
import Icon from '../../../components/AppIcon';

const JobRequirementsPanel = ({ jobData, matchData }) => {
  const getMatchColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getMatchBg = (percentage) => {
    if (percentage >= 80) return 'bg-success/10';
    if (percentage >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  return (
    <div className="space-y-6">
      {/* Job Overview */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-foreground mb-3">Job Requirements</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Briefcase" size={14} className="text-muted-foreground" />
            <span className="text-foreground">{jobData.title}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Building" size={14} className="text-muted-foreground" />
            <span className="text-foreground">{jobData.company}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={14} className="text-muted-foreground" />
            <span className="text-foreground">{jobData.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-foreground">{jobData.type}</span>
          </div>
        </div>
      </div>

      {/* Match Overview */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Overall Match</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Match</span>
            <span className={`font-semibold ${getMatchColor(matchData.overall)}`}>
              {matchData.overall}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                matchData.overall >= 80 ? 'bg-success' :
                matchData.overall >= 60 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${matchData.overall}%` }}
            />
          </div>
        </div>
      </div>

      {/* Requirements Breakdown */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Requirements Analysis</h4>
        <div className="space-y-3">
          {matchData.breakdown.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">{item.category}</span>
                <span className={`text-sm font-medium ${getMatchColor(item.percentage)}`}>
                  {item.percentage}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    item.percentage >= 80 ? 'bg-success' :
                    item.percentage >= 60 ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                {item.matched}/{item.total} requirements met
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Must-Have Requirements */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Must-Have Requirements</h4>
        <div className="space-y-2">
          {jobData.mustHave.map((requirement, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon
                name={requirement.met ? 'CheckCircle2' : 'XCircle'}
                size={16}
                className={requirement.met ? 'text-success' : 'text-error'}
              />
              <span className={`text-sm ${requirement.met ? 'text-foreground' : 'text-muted-foreground'}`}>
                {requirement.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Nice-to-Have Requirements */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Nice-to-Have</h4>
        <div className="space-y-2">
          {jobData.niceToHave.map((requirement, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon
                name={requirement.met ? 'CheckCircle2' : 'Circle'}
                size={16}
                className={requirement.met ? 'text-success' : 'text-muted-foreground'}
              />
              <span className={`text-sm ${requirement.met ? 'text-foreground' : 'text-muted-foreground'}`}>
                {requirement.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Salary Range */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Compensation</h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Salary Range</span>
            <span className="text-foreground font-medium">{jobData.salaryRange}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Benefits</span>
            <span className="text-foreground">{jobData.benefits}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Remote Work</span>
            <span className="text-foreground">{jobData.remote}</span>
          </div>
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Brain" size={16} className="text-accent" />
          <h4 className="font-medium text-foreground">AI Recommendation</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          {matchData.recommendation}
        </p>
      </div>
    </div>
  );
};

export default JobRequirementsPanel;