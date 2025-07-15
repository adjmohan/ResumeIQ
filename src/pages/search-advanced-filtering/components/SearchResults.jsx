import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const SearchResults = ({ results, isLoading, searchQuery, onCandidateSelect, onExport }) => {
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('list');

  const sortOptions = [
    { value: 'relevance', label: 'Relevance Score' },
    { value: 'experience', label: 'Years of Experience' },
    { value: 'recent', label: 'Recently Updated' },
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'salary', label: 'Salary Expectation' }
  ];

  const mockResults = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior React Developer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c3c8e4?w=150&h=150&fit=crop&crop=face",
      location: "San Francisco, CA",
      experience: "6 years",
      relevanceScore: 95,
      skills: ["React", "Node.js", "TypeScript", "AWS", "GraphQL"],
      currentCompany: "TechCorp Inc.",
      salary: "$140,000",
      availability: "2 weeks",
      summary: `Experienced React developer with expertise in building scalable web applications. 
      Strong background in fintech and e-commerce platforms with proven track record of delivering 
      high-quality solutions.`,
      matchedTerms: ["React", "senior", "fintech", "experience"],
      lastActive: "2 days ago",
      portfolio: "https://sarahchen.dev",
      github: "https://github.com/sarahchen"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Full Stack Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      location: "Austin, TX",
      experience: "5 years",
      relevanceScore: 88,
      skills: ["React", "Node.js", "Python", "Docker", "MongoDB"],
      currentCompany: "StartupXYZ",
      salary: "$125,000",
      availability: "1 month",
      summary: `Versatile full-stack developer with strong React and Node.js skills. 
      Experience in startup environments and agile development methodologies.`,
      matchedTerms: ["React", "Node.js", "full stack", "experience"],
      lastActive: "1 day ago",
      portfolio: "https://mrodriguez.com",
      github: "https://github.com/mrodriguez"
    },
    {
      id: 3,
      name: "Emily Johnson",
      title: "Frontend Developer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      location: "Remote",
      experience: "4 years",
      relevanceScore: 82,
      skills: ["React", "Vue.js", "JavaScript", "CSS", "Figma"],
      currentCompany: "Design Studio",
      salary: "$110,000",
      availability: "Immediate",
      summary: `Creative frontend developer with strong design sensibilities. 
      Specializes in creating beautiful, responsive user interfaces with modern frameworks.`,
      matchedTerms: ["React", "frontend", "JavaScript"],
      lastActive: "3 hours ago",
      portfolio: "https://emilyjohnson.design",
      github: "https://github.com/emilyjohnson"
    },
    {
      id: 4,
      name: "David Kim",
      title: "Senior Software Engineer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      location: "Seattle, WA",
      experience: "8 years",
      relevanceScore: 91,
      skills: ["React", "Node.js", "Java", "Kubernetes", "PostgreSQL"],
      currentCompany: "BigTech Corp",
      salary: "$165,000",
      availability: "3 weeks",
      summary: `Senior software engineer with extensive experience in large-scale applications. 
      Strong background in system architecture and team leadership.`,
      matchedTerms: ["React", "senior", "experience", "Node.js"],
      lastActive: "1 week ago",
      portfolio: "https://davidkim.tech",
      github: "https://github.com/davidkim"
    },
    {
      id: 5,
      name: "Lisa Wang",
      title: "React Native Developer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      location: "New York, NY",
      experience: "3 years",
      relevanceScore: 79,
      skills: ["React", "React Native", "JavaScript", "iOS", "Android"],
      currentCompany: "Mobile Solutions",
      salary: "$115,000",
      availability: "2 weeks",
      summary: `Mobile-focused React developer with expertise in cross-platform development. 
      Experience in building consumer-facing mobile applications.`,
      matchedTerms: ["React", "mobile", "JavaScript"],
      lastActive: "5 days ago",
      portfolio: "https://lisawang.mobile",
      github: "https://github.com/lisawang"
    }
  ];

  const highlightText = (text, terms) => {
    if (!terms || terms.length === 0) return text;
    
    let highlightedText = text;
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  const getRelevanceColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 80) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getAvailabilityColor = (availability) => {
    if (availability === 'Immediate') return 'text-success';
    if (availability.includes('week')) return 'text-warning';
    return 'text-muted-foreground';
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-lg p-8">
        <div className="flex items-center justify-center space-x-3">
          <Icon name="Loader2" size={24} className="animate-spin text-primary" />
          <span className="text-lg text-muted-foreground">Searching candidates...</span>
        </div>
        
        <div className="mt-6 space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                <div className="w-16 h-16 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const displayResults = results.length > 0 ? results : mockResults;

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-foreground">
            Search Results
          </h2>
          <span className="text-sm text-muted-foreground">
            {displayResults.length} candidates found
            {searchQuery && (
              <span> for "{searchQuery}"</span>
            )}
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by..."
            className="w-48"
          />
          
          <div className="flex items-center border border-border rounded-md">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              iconName="List"
              iconSize={16}
            />
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              iconName="Grid3X3"
              iconSize={16}
            />
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Results List */}
      <div className={`
        ${viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
        }
      `}>
        {displayResults.map((candidate) => (
          <div
            key={candidate.id}
            className={`
              bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 cursor-pointer
              ${viewMode === 'grid' ? 'h-full' : ''}
            `}
            onClick={() => onCandidateSelect(candidate)}
          >
            {/* Candidate Header */}
            <div className="flex items-start space-x-4 mb-4">
              <Image
                src={candidate.avatar}
                alt={candidate.name}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground truncate">
                      {candidate.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {candidate.title} at {candidate.currentCompany}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <div className={`text-sm font-medium ${getRelevanceColor(candidate.relevanceScore)}`}>
                      {candidate.relevanceScore}% match
                    </div>
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-2">
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{candidate.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Briefcase" size={12} />
                    <span>{candidate.experience}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>Active {candidate.lastActive}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground line-clamp-3">
                {highlightText(candidate.summary, candidate.matchedTerms)}
              </p>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {candidate.skills.slice(0, 5).map((skill, index) => (
                  <span
                    key={index}
                    className={`
                      px-2 py-1 text-xs rounded-full
                      ${candidate.matchedTerms?.includes(skill.toLowerCase())
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                      }
                    `}
                  >
                    {skill}
                  </span>
                ))}
                {candidate.skills.length > 5 && (
                  <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                    +{candidate.skills.length - 5} more
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="DollarSign" size={14} className="text-muted-foreground" />
                  <span className="text-foreground">{candidate.salary}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} className="text-muted-foreground" />
                  <span className={getAvailabilityColor(candidate.availability)}>
                    {candidate.availability}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {candidate.portfolio && (
                  <a
                    href={candidate.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <Icon name="ExternalLink" size={14} />
                  </a>
                )}
                {candidate.github && (
                  <a
                    href={candidate.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <Icon name="Github" size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {displayResults.length > 0 && (
        <div className="flex justify-center pt-6">
          <Button
            variant="outline"
            onClick={() => console.log('Load more results')}
            iconName="ChevronDown"
            iconPosition="right"
            iconSize={16}
          >
            Load More Results
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;