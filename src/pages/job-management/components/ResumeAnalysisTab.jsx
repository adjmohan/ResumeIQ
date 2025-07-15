import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ResumeAnalysisTab = ({ job }) => {
  const [sortBy, setSortBy] = useState('match');
  const [filterBy, setFilterBy] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const mockCandidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      matchPercentage: 92,
      experience: "5 years",
      location: "San Francisco, CA",
      skills: ["React", "JavaScript", "Node.js", "AWS", "Python"],
      education: "MS Computer Science",
      resumeUrl: "/resumes/sarah-johnson.pdf",
      appliedDate: "2025-01-10",
      status: "shortlisted",
      summary: `Experienced full-stack developer with strong background in React and Node.js. \nPrevious experience at tech startups with focus on scalable web applications.`
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      matchPercentage: 88,
      experience: "7 years",
      location: "New York, NY",
      skills: ["JavaScript", "React", "TypeScript", "Docker", "Kubernetes"],
      education: "BS Software Engineering",
      resumeUrl: "/resumes/michael-chen.pdf",
      appliedDate: "2025-01-12",
      status: "reviewed",
      summary: `Senior software engineer with expertise in modern JavaScript frameworks. \nStrong background in containerization and cloud deployment.`
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@email.com",
      phone: "+1 (555) 345-6789",
      matchPercentage: 85,
      experience: "4 years",
      location: "Austin, TX",
      skills: ["Python", "Django", "PostgreSQL", "AWS", "Git"],
      education: "BS Computer Science",
      resumeUrl: "/resumes/emily-rodriguez.pdf",
      appliedDate: "2025-01-13",
      status: "new",
      summary: `Backend developer with strong Python skills and database expertise. \nExperience with cloud infrastructure and API development.`
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@email.com",
      phone: "+1 (555) 456-7890",
      matchPercentage: 79,
      experience: "3 years",
      location: "Seattle, WA",
      skills: ["React", "Vue.js", "CSS", "HTML", "JavaScript"],
      education: "BS Information Technology",
      resumeUrl: "/resumes/david-kim.pdf",
      appliedDate: "2025-01-14",
      status: "new",
      summary: `Frontend developer with experience in multiple JavaScript frameworks. \nStrong design sense and user experience focus.`
    },
    {
      id: 5,
      name: "Lisa Thompson",
      email: "lisa.thompson@email.com",
      phone: "+1 (555) 567-8901",
      matchPercentage: 76,
      experience: "6 years",
      location: "Chicago, IL",
      skills: ["Java", "Spring", "MySQL", "REST APIs", "Microservices"],
      education: "MS Software Engineering",
      resumeUrl: "/resumes/lisa-thompson.pdf",
      appliedDate: "2025-01-15",
      status: "reviewed",
      summary: `Java developer with enterprise application experience. \nSpecialized in microservices architecture and API design.`
    }
  ];

  const sortOptions = [
    { value: 'match', label: 'Match Percentage' },
    { value: 'name', label: 'Name' },
    { value: 'experience', label: 'Experience' },
    { value: 'date', label: 'Application Date' }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Candidates' },
    { value: 'new', label: 'New Applications' },
    { value: 'reviewed', label: 'Reviewed' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'text-primary bg-primary/10';
      case 'reviewed': return 'text-warning bg-warning/10';
      case 'shortlisted': return 'text-success bg-success/10';
      case 'rejected': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 80) return 'text-warning';
    if (percentage >= 70) return 'text-accent';
    return 'text-muted-foreground';
  };

  const filteredCandidates = mockCandidates
    .filter(candidate => {
      const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFilter = filterBy === 'all' || candidate.status === filterBy;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchPercentage - a.matchPercentage;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'date':
          return new Date(b.appliedDate) - new Date(a.appliedDate);
        default:
          return 0;
      }
    });

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action}`);
  };

  const handleCandidateAction = (candidateId, action) => {
    console.log(`Candidate ${candidateId} action: ${action}`);
  };

  if (!job) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Job Selected</h3>
          <p className="text-muted-foreground">Select a job to view resume analysis results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Resume Analysis Results</h2>
          <p className="text-muted-foreground">AI-powered candidate matching for {job.title}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Export Results
          </Button>
          <Button variant="default" size="sm" iconName="Upload" iconPosition="left">
            Upload Resumes
          </Button>
        </div>
      </div>

      {/* Analysis Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted/50 rounded-lg">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{mockCandidates.length}</div>
          <div className="text-sm text-muted-foreground">Total Candidates</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-success">
            {mockCandidates.filter(c => c.matchPercentage >= 80).length}
          </div>
          <div className="text-sm text-muted-foreground">High Match (&gt;80%)</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-warning">
            {mockCandidates.filter(c => c.status === 'shortlisted').length}
          </div>
          <div className="text-sm text-muted-foreground">Shortlisted</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">
            {Math.round(mockCandidates.reduce((sum, c) => sum + c.matchPercentage, 0) / mockCandidates.length)}%
          </div>
          <div className="text-sm text-muted-foreground">Avg Match Score</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search candidates by name or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
          />
          <Select
            options={filterOptions}
            value={filterBy}
            onChange={setFilterBy}
            placeholder="Filter by status"
          />
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
        <div className="flex items-center space-x-2">
          <input type="checkbox" className="rounded border-border" />
          <span className="text-sm text-muted-foreground">Select all candidates</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => handleBulkAction('shortlist')}>
            Shortlist Selected
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleBulkAction('reject')}>
            Reject Selected
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleBulkAction('export')}>
            Export Selected
          </Button>
        </div>
      </div>

      {/* Candidates List */}
      <div className="space-y-4">
        {filteredCandidates.map((candidate) => (
          <div key={candidate.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <input type="checkbox" className="mt-1 rounded border-border" />
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{candidate.name}</h3>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium capitalize
                      ${getStatusColor(candidate.status)}
                    `}>
                      {candidate.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center">
                      <Icon name="Mail" size={14} className="mr-2" />
                      <span>{candidate.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Phone" size={14} className="mr-2" />
                      <span>{candidate.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="MapPin" size={14} className="mr-2" />
                      <span>{candidate.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Briefcase" size={14} className="mr-2" />
                      <span>{candidate.experience} experience</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="GraduationCap" size={14} className="mr-2" />
                      <span>{candidate.education}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Calendar" size={14} className="mr-2" />
                      <span>Applied {new Date(candidate.appliedDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-foreground whitespace-pre-line">{candidate.summary}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {candidate.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-3">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${getMatchColor(candidate.matchPercentage)}`}>
                    {candidate.matchPercentage}%
                  </div>
                  <div className="text-xs text-muted-foreground">Match Score</div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCandidateAction(candidate.id, 'view')}
                    iconName="Eye"
                    iconSize={14}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCandidateAction(candidate.id, 'download')}
                    iconName="Download"
                    iconSize={14}
                  />
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleCandidateAction(candidate.id, 'shortlist')}
                    iconName="UserCheck"
                    iconSize={14}
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleCandidateAction(candidate.id, 'reject')}
                    iconName="UserX"
                    iconSize={14}
                  />
                </div>
              </div>
            </div>

            {/* Match Details */}
            <div className="border-t border-border pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-foreground">Skills Match:</span>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div 
                      className="bg-success h-2 rounded-full transition-all duration-300"
                      style={{ width: `${candidate.matchPercentage}%` }}
                    />
                  </div>
                </div>
                <div>
                  <span className="font-medium text-foreground">Experience Match:</span>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div 
                      className="bg-warning h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(60, candidate.matchPercentage - 10)}%` }}
                    />
                  </div>
                </div>
                <div>
                  <span className="font-medium text-foreground">Education Match:</span>
                  <div className="w-full bg-muted rounded-full h-2 mt-1">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(70, candidate.matchPercentage - 5)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between pt-4">
        <div className="text-sm text-muted-foreground">
          Showing {filteredCandidates.length} of {mockCandidates.length} candidates
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled iconName="ChevronLeft" iconSize={16}>
            Previous
          </Button>
          <span className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">1</span>
          <Button variant="outline" size="sm" disabled iconName="ChevronRight" iconSize={16}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysisTab;