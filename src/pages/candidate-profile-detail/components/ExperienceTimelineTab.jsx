import React from 'react';
import Icon from '../../../components/AppIcon';

const ExperienceTimelineTab = ({ experienceData }) => {
  const getRelevanceColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getRelevanceBg = (score) => {
    if (score >= 80) return 'bg-success/10';
    if (score >= 60) return 'bg-warning/10';
    return 'bg-muted';
  };

  return (
    <div className="space-y-6">
      {/* Experience Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{experienceData.totalYears}</div>
          <div className="text-sm text-muted-foreground">Total Experience</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{experienceData.relevantYears}</div>
          <div className="text-sm text-muted-foreground">Relevant Experience</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-foreground">{experienceData.companies}</div>
          <div className="text-sm text-muted-foreground">Companies</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
        
        <div className="space-y-6">
          {experienceData.positions.map((position, index) => (
            <div key={index} className="relative flex items-start space-x-4">
              {/* Timeline Dot */}
              <div className={`relative z-10 w-4 h-4 rounded-full border-2 ${
                position.relevanceScore >= 80 
                  ? 'bg-success border-success' 
                  : position.relevanceScore >= 60
                    ? 'bg-warning border-warning' :'bg-muted border-border'
              }`}></div>
              
              {/* Experience Card */}
              <div className="flex-1 bg-card border border-border rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{position.title}</h3>
                    <p className="text-primary font-medium">{position.company}</p>
                    <p className="text-sm text-muted-foreground">{position.duration} • {position.location}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRelevanceBg(position.relevanceScore)} ${getRelevanceColor(position.relevanceScore)}`}>
                    {position.relevanceScore}% Relevant
                  </div>
                </div>

                {/* Job Description */}
                <div className="mb-4">
                  <p className="text-sm text-foreground leading-relaxed">{position.description}</p>
                </div>

                {/* Key Achievements */}
                {position.achievements && position.achievements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-2">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {position.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                          <Icon name="ChevronRight" size={14} className="mt-0.5 text-primary" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills Used */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Skills & Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    {position.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Relevance Analysis */}
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Target" size={14} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">Relevance Analysis</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{position.relevanceReason}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Progression Analysis */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="TrendingUp" size={18} className="text-accent" />
          <h4 className="font-medium text-foreground">Career Progression Analysis</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-foreground mb-2">Strengths:</h5>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Consistent career growth with increasing responsibilities</li>
              <li>• Strong technical leadership experience</li>
              <li>• Experience across multiple industry domains</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-foreground mb-2">Growth Areas:</h5>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Could benefit from more enterprise-scale experience</li>
              <li>• Limited exposure to agile methodologies</li>
              <li>• Opportunity to develop team management skills</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimelineTab;