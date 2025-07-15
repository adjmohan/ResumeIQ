import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RelatedCandidatesPanel = ({ candidates, onViewCandidate }) => {
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
      {/* Similar Candidates */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Similar Candidates</h3>
          <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="right">
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {candidates.similar.map((candidate) => (
            <div
              key={candidate.id}
              className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200 cursor-pointer"
              onClick={() => onViewCandidate(candidate.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={candidate.avatar}
                    alt={`${candidate.name} profile`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground truncate">{candidate.name}</h4>
                    <span className={`text-xs font-medium ${getMatchColor(candidate.matchPercentage)}`}>
                      {candidate.matchPercentage}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{candidate.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Icon name="MapPin" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{candidate.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-2">
                <div className="w-full bg-muted rounded-full h-1">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      candidate.matchPercentage >= 80 ? 'bg-success' :
                      candidate.matchPercentage >= 60 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${candidate.matchPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alternative Candidates */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Alternative Profiles</h3>
          <Button variant="ghost" size="sm" iconName="Shuffle" iconPosition="right">
            Refresh
          </Button>
        </div>

        <div className="space-y-3">
          {candidates.alternatives.map((candidate) => (
            <div
              key={candidate.id}
              className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors duration-200 cursor-pointer"
              onClick={() => onViewCandidate(candidate.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={candidate.avatar}
                    alt={`${candidate.name} profile`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-foreground truncate">{candidate.name}</h4>
                    <span className={`text-xs font-medium ${getMatchColor(candidate.matchPercentage)}`}>
                      {candidate.matchPercentage}%
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{candidate.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{candidate.uniqueStrength}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Tool */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h4 className="font-medium text-foreground mb-3">Compare Candidates</h4>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="GitCompare"
            iconPosition="left"
          >
            Side-by-Side Compare
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="BarChart3"
            iconPosition="left"
          >
            Skills Comparison
          </Button>
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="FileText"
            iconPosition="left"
          >
            Generate Report
          </Button>
        </div>
      </div>

      {/* Search Suggestions */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Search" size={16} className="text-accent" />
          <h4 className="font-medium text-foreground">Search Suggestions</h4>
        </div>
        <div className="space-y-2 text-sm">
          <button className="w-full text-left p-2 rounded hover:bg-muted transition-colors duration-200">
            <span className="text-foreground">Find candidates with React + Node.js</span>
          </button>
          <button className="w-full text-left p-2 rounded hover:bg-muted transition-colors duration-200">
            <span className="text-foreground">Similar experience level (5-7 years)</span>
          </button>
          <button className="w-full text-left p-2 rounded hover:bg-muted transition-colors duration-200">
            <span className="text-foreground">Same location preferences</span>
          </button>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Brain" size={16} className="text-primary" />
          <h4 className="font-medium text-foreground">AI Insights</h4>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• 3 similar candidates have been successfully hired for similar roles</p>
          <p>• Average time-to-hire for this profile type: 18 days</p>
          <p>• Consider expanding search to include remote candidates</p>
        </div>
      </div>
    </div>
  );
};

export default RelatedCandidatesPanel;