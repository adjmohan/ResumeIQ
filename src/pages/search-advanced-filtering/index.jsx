import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import QuickActionSidebar from '../../components/ui/QuickActionSidebar';
import SearchBar from './components/SearchBar';
import AdvancedFilters from './components/AdvancedFilters';
import SearchResults from './components/SearchResults';
import SearchHistory from './components/SearchHistory';
import SavedSearches from './components/SavedSearches';
import Button from '../../components/ui/Button';

// Import AI services
import { intelligentSearch, answerCandidateQuestion, generateSearchSuggestions } from '../../services/searchService';

const SearchAdvancedFiltering = () => {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [chatMode, setChatMode] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [filters, setFilters] = useState({
    experienceLevel: '',
    location: '',
    skills: [],
    education: '',
    industry: '',
    availability: ''
  });

  // Load candidates from localStorage
  useEffect(() => {
    const parsedCandidates = localStorage.getItem('parsedCandidates');
    if (parsedCandidates) {
      try {
        const candidateData = JSON.parse(parsedCandidates);
        setCandidates(candidateData);
        generateInitialSuggestions(candidateData);
      } catch (error) {
        console.error('Error loading candidates:', error);
      }
    }
  }, []);

  // Generate initial search suggestions
  const generateInitialSuggestions = async (candidateData) => {
    try {
      const suggestions = await generateSearchSuggestions(candidateData);
      setSearchSuggestions(suggestions);
    } catch (error) {
      console.error('Error generating suggestions:', error);
    }
  };

  // Handle AI-powered search
  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setSearchQuery(query);
    
    try {
      // Use AI to perform intelligent search
      const searchResult = await intelligentSearch(query, candidates);
      
      // Map search results to candidate data
      const results = searchResult.results.map(result => {
        const candidate = candidates.find(c => c.id.toString() === result.candidateId);
        return {
          ...candidate,
          relevanceScore: result.relevanceScore,
          matchReasons: result.matchReasons,
          highlightedSkills: result.highlightedSkills,
          searchSummary: result.summary
        };
      });
      
      setSearchResults(results);
      
      // Add to search history
      const historyEntry = {
        id: Date.now(),
        query,
        timestamp: new Date(),
        resultCount: results.length,
        interpretation: searchResult.searchInterpretation
      };
      setSearchHistory(prev => [historyEntry, ...prev.slice(0, 9)]);
      
    } catch (error) {
      console.error('Error performing search:', error);
      alert('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Handle chat/question mode
  const handleChatQuestion = async (question) => {
    if (!question.trim()) return;
    
    setIsSearching(true);
    
    try {
      const answer = await answerCandidateQuestion(question, candidates);
      
      const chatEntry = {
        id: Date.now(),
        question,
        answer,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [chatEntry, ...prev]);
      
    } catch (error) {
      console.error('Error answering question:', error);
      alert('Failed to answer question. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSaveSearch = (searchName) => {
    const savedSearch = {
      id: Date.now(),
      name: searchName,
      query: searchQuery,
      filters,
      timestamp: new Date(),
      resultCount: searchResults.length
    };
    
    setSavedSearches(prev => [savedSearch, ...prev]);
    alert('Search saved successfully!');
  };

  const handleLoadSavedSearch = (savedSearch) => {
    setSearchQuery(savedSearch.query);
    setFilters(savedSearch.filters);
    handleSearch(savedSearch.query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    // Apply filters to search results
    if (searchResults.length > 0) {
      let filtered = [...searchResults];
      
      if (newFilters.experienceLevel) {
        filtered = filtered.filter(c => c.experienceLevel === newFilters.experienceLevel);
      }
      
      if (newFilters.location) {
        filtered = filtered.filter(c => 
          c.personalInfo?.location?.toLowerCase().includes(newFilters.location.toLowerCase())
        );
      }
      
      if (newFilters.skills.length > 0) {
        filtered = filtered.filter(c => {
          const candidateSkills = [
            ...(c.skills?.technical || []),
            ...(c.skills?.soft || [])
          ].map(skill => skill.toLowerCase());
          
          return newFilters.skills.some(skill => 
            candidateSkills.includes(skill.toLowerCase())
          );
        });
      }
      
      if (newFilters.education) {
        filtered = filtered.filter(c => 
          c.education?.some(edu => 
            edu.degree?.toLowerCase().includes(newFilters.education.toLowerCase())
          )
        );
      }
      
      setSearchResults(filtered);
    }
  };

  const handleViewProfile = (candidateId) => {
    const candidate = candidates.find(c => c.id === candidateId);
    if (candidate) {
      localStorage.setItem('selectedCandidate', JSON.stringify(candidate));
      navigate('/candidate-profile-detail');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                AI-Powered Candidate Search
              </h1>
              <p className="text-muted-foreground">
                Use natural language to search and filter candidates with advanced AI
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant={chatMode ? "default" : "outline"}
                onClick={() => setChatMode(!chatMode)}
                iconName="MessageSquare"
                iconPosition="left"
              >
                {chatMode ? "Exit Chat" : "AI Chat"}
              </Button>
              
              <Button
                variant="default"
                onClick={() => navigate('/candidate-ranking-results')}
                iconName="BarChart3"
                iconPosition="left"
              >
                View Rankings
              </Button>
            </div>
          </div>

          {/* Search Interface */}
          <div className="mb-8">
            <SearchBar
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              onSearch={handleSearch}
              onChatQuestion={handleChatQuestion}
              isSearching={isSearching}
              chatMode={chatMode}
              suggestions={searchSuggestions}
              onSuggestionClick={handleSuggestionClick}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="space-y-6">
              <AdvancedFilters 
                filters={filters}
                onFilterChange={handleFilterChange}
                candidates={candidates}
              />
              
              <SavedSearches 
                savedSearches={savedSearches}
                onLoadSearch={handleLoadSavedSearch}
                onSaveSearch={handleSaveSearch}
                currentQuery={searchQuery}
              />
              
              <SearchHistory 
                searchHistory={searchHistory}
                onSelectHistory={(query) => {
                  setSearchQuery(query);
                  handleSearch(query);
                }}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Chat History */}
              {chatMode && chatHistory.length > 0 && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">AI Chat History</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {chatHistory.map(entry => (
                      <div key={entry.id} className="border-b border-border pb-4">
                        <div className="text-sm font-medium text-foreground mb-1">
                          Q: {entry.question}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          A: {entry.answer}
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          {entry.timestamp.toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results */}
              <SearchResults
                results={searchResults}
                onViewProfile={handleViewProfile}
                isSearching={isSearching}
                searchQuery={searchQuery}
              />
            </div>
          </div>
        </div>
      </main>
      
      <QuickActionSidebar />
    </div>
  );
};

export default SearchAdvancedFiltering;