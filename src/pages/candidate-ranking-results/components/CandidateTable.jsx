import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CandidateTable = ({ 
  candidates, 
  selectedCandidates, 
  onCandidateSelect, 
  onSelectAll, 
  onSortChange, 
  sortConfig,
  onCandidateClick 
}) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRowExpansion = (candidateId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(candidateId)) {
      newExpanded.delete(candidateId);
    } else {
      newExpanded.add(candidateId);
    }
    setExpandedRows(newExpanded);
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 75) return 'text-primary';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getMatchBgColor = (percentage) => {
    if (percentage >= 90) return 'bg-success/10';
    if (percentage >= 75) return 'bg-primary/10';
    if (percentage >= 60) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const getSortIcon = (column) => {
    if (sortConfig.key !== column) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const handleSort = (column) => {
    onSortChange(column);
  };

  const renderSkillBadges = (skills, limit = 3) => {
    const displaySkills = skills.slice(0, limit);
    const remainingCount = skills.length - limit;

    return (
      <div className="flex flex-wrap gap-1">
        {displaySkills.map((skill, index) => (
          <span
            key={index}
            className={`px-2 py-1 text-xs rounded-full ${
              skill.match >= 90 
                ? 'bg-success/20 text-success' 
                : skill.match >= 70 
                  ? 'bg-primary/20 text-primary' :'bg-muted text-muted-foreground'
            }`}
          >
            {skill.name} {skill.match}%
          </span>
        ))}
        {remainingCount > 0 && (
          <span className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground">
            +{remainingCount} more
          </span>
        )}
      </div>
    );
  };

  const renderExpandedDetails = (candidate) => (
    <tr className="bg-muted/30 animate-slide-in">
      <td colSpan="7" className="p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Skill Matching Breakdown */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
              <Icon name="Target" size={16} className="mr-2" />
              Skill Matching Analysis
            </h4>
            <div className="space-y-2">
              {candidate.skillsDetailed.map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-card rounded border">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      skill.required ? 'bg-error/20 text-error' : 'bg-muted text-muted-foreground'
                    }`}>
                      {skill.required ? 'Required' : 'Preferred'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          skill.match >= 90 ? 'bg-success' : 
                          skill.match >= 70 ? 'bg-primary' : 'bg-warning'
                        }`}
                        style={{ width: `${skill.match}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{skill.match}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience & Education Details */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center">
              <Icon name="GraduationCap" size={16} className="mr-2" />
              Background Details
            </h4>
            <div className="space-y-4">
              <div className="p-3 bg-card rounded border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Experience Level</span>
                  <span className="text-sm text-muted-foreground">{candidate.experience}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {candidate.experienceDetails}
                </div>
              </div>

              <div className="p-3 bg-card rounded border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Education</span>
                  <span className="text-sm text-muted-foreground">{candidate.education}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {candidate.educationDetails}
                </div>
              </div>

              <div className="p-3 bg-card rounded border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Location</span>
                  <span className="text-sm text-muted-foreground">{candidate.location}</span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Availability: {candidate.availability}</span>
                  <span>Salary: {candidate.expectedSalary}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            iconSize={16}
            onClick={() => onCandidateClick(candidate.id)}
          >
            View Profile
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="MessageSquare"
            iconPosition="left"
            iconSize={16}
          >
            Contact
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="UserPlus"
            iconPosition="left"
            iconSize={16}
          >
            Shortlist
          </Button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={selectedCandidates.length === candidates.length && candidates.length > 0}
              indeterminate={selectedCandidates.length > 0 && selectedCandidates.length < candidates.length}
              onChange={onSelectAll}
            />
            <span className="text-sm font-medium text-foreground">
              {selectedCandidates.length > 0 
                ? `${selectedCandidates.length} selected` 
                : `${candidates.length} candidates`
              }
            </span>
          </div>

          {selectedCandidates.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="UserPlus"
                iconPosition="left"
                iconSize={16}
              >
                Shortlist Selected
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="UserX"
                iconPosition="left"
                iconSize={16}
              >
                Reject Selected
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                iconSize={16}
              >
                Export Selected
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 p-3"></th>
              <th className="text-left p-3">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Candidate</span>
                  <Icon name={getSortIcon('name')} size={14} />
                </button>
              </th>
              <th className="text-left p-3">
                <button
                  onClick={() => handleSort('matchPercentage')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Match</span>
                  <Icon name={getSortIcon('matchPercentage')} size={14} />
                </button>
              </th>
              <th className="text-left p-3">
                <button
                  onClick={() => handleSort('experience')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Experience</span>
                  <Icon name={getSortIcon('experience')} size={14} />
                </button>
              </th>
              <th className="text-left p-3">Key Skills</th>
              <th className="text-left p-3">
                <button
                  onClick={() => handleSort('appliedDate')}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span>Applied</span>
                  <Icon name={getSortIcon('appliedDate')} size={14} />
                </button>
              </th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <React.Fragment key={candidate.id}>
                <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="p-3">
                    <Checkbox
                      checked={selectedCandidates.includes(candidate.id)}
                      onChange={(e) => onCandidateSelect(candidate.id, e.target.checked)}
                    />
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={candidate.avatar}
                        alt={candidate.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <button
                          onClick={() => onCandidateClick(candidate.id)}
                          className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                        >
                          {candidate.name}
                        </button>
                        <div className="text-xs text-muted-foreground">{candidate.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchBgColor(candidate.matchPercentage)} ${getMatchColor(candidate.matchPercentage)}`}>
                        {candidate.matchPercentage}%
                      </div>
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            candidate.matchPercentage >= 90 ? 'bg-success' : 
                            candidate.matchPercentage >= 75 ? 'bg-primary' : 
                            candidate.matchPercentage >= 60 ? 'bg-warning' : 'bg-error'
                          }`}
                          style={{ width: `${candidate.matchPercentage}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-sm text-foreground">{candidate.experience}</div>
                    <div className="text-xs text-muted-foreground">{candidate.location}</div>
                  </td>
                  <td className="p-3">
                    {renderSkillBadges(candidate.skills)}
                  </td>
                  <td className="p-3">
                    <div className="text-sm text-foreground">{candidate.appliedDate}</div>
                    <div className="text-xs text-muted-foreground">{candidate.appliedTime}</div>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRowExpansion(candidate.id)}
                        iconName={expandedRows.has(candidate.id) ? "ChevronUp" : "ChevronDown"}
                        iconSize={16}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        iconSize={16}
                        onClick={() => onCandidateClick(candidate.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreHorizontal"
                        iconSize={16}
                      />
                    </div>
                  </td>
                </tr>
                {expandedRows.has(candidate.id) && renderExpandedDetails(candidate)}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {candidates.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No candidates found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search criteria to find more candidates.
          </p>
        </div>
      )}
    </div>
  );
};

export default CandidateTable;