import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const SkillsAnalysisTab = ({ skillsData }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Skills', count: skillsData.length },
    { id: 'matched', label: 'Matched', count: skillsData.filter(s => s.matched).length },
    { id: 'missing', label: 'Missing', count: skillsData.filter(s => !s.matched).length },
    { id: 'additional', label: 'Additional', count: skillsData.filter(s => s.additional).length }
  ];

  const filteredSkills = skillsData.filter(skill => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'matched') return skill.matched;
    if (selectedCategory === 'missing') return !skill.matched;
    if (selectedCategory === 'additional') return skill.additional;
    return true;
  });

  const getSkillColor = (skill) => {
    if (skill.matched && skill.proficiency >= 80) return 'bg-success/10 text-success border-success/20';
    if (skill.matched && skill.proficiency >= 60) return 'bg-warning/10 text-warning border-warning/20';
    if (skill.matched) return 'bg-primary/10 text-primary border-primary/20';
    if (skill.additional) return 'bg-accent/10 text-accent border-accent/20';
    return 'bg-muted text-muted-foreground border-border';
  };

  const getSkillIcon = (skill) => {
    if (skill.matched && skill.proficiency >= 80) return 'CheckCircle2';
    if (skill.matched) return 'Check';
    if (skill.additional) return 'Plus';
    return 'Minus';
  };

  return (
    <div className="space-y-6">
      {/* Skills Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedCategory === category.id
                ? 'border-primary bg-primary/5' :'border-border bg-card hover:bg-muted'
            }`}
          >
            <div className="text-2xl font-bold text-foreground">{category.count}</div>
            <div className="text-sm text-muted-foreground">{category.label}</div>
          </button>
        ))}
      </div>

      {/* Skills Matching Visualization */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Skills Analysis</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-muted-foreground">Strong Match</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-muted-foreground">Partial Match</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-muted rounded-full"></div>
              <span className="text-muted-foreground">Missing</span>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getSkillColor(skill)} transition-all duration-200 hover:shadow-sm`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon name={getSkillIcon(skill)} size={16} />
                  <div>
                    <div className="font-medium">{skill.name}</div>
                    {skill.category && (
                      <div className="text-xs opacity-75">{skill.category}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {skill.matched && (
                    <div className="text-right">
                      <div className="text-sm font-medium">{skill.proficiency}%</div>
                      <div className="text-xs opacity-75">Proficiency</div>
                    </div>
                  )}
                  {skill.yearsExperience && (
                    <div className="text-right">
                      <div className="text-sm font-medium">{skill.yearsExperience}y</div>
                      <div className="text-xs opacity-75">Experience</div>
                    </div>
                  )}
                </div>
              </div>
              
              {skill.matched && (
                <div className="mt-3">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        skill.proficiency >= 80 ? 'bg-success' :
                        skill.proficiency >= 60 ? 'bg-warning' : 'bg-primary'
                      }`}
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              )}
              
              {skill.evidence && (
                <div className="mt-2 text-xs opacity-75">
                  Evidence: {skill.evidence}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Lightbulb" size={18} className="text-accent" />
          <h4 className="font-medium text-foreground">AI Insights</h4>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• Candidate shows strong technical foundation with {skillsData.filter(s => s.matched && s.proficiency >= 80).length} expert-level skills</p>
          <p>• Missing {skillsData.filter(s => !s.matched).length} required skills, but has transferable experience</p>
          <p>• Additional skills in {skillsData.filter(s => s.additional).length} areas could be valuable for team diversity</p>
        </div>
      </div>
    </div>
  );
};

export default SkillsAnalysisTab;