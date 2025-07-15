import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, searchQuery, setSearchQuery, suggestions, isLoading }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(value.length > 2);
    setSelectedSuggestion(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestion(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestion >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestion]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestion(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.query);
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
    onSearch(suggestion.query);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    searchRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {isLoading ? (
            <Icon name="Loader2" size={20} className="text-muted-foreground animate-spin" />
          ) : (
            <Icon name="Search" size={20} className="text-muted-foreground" />
          )}
        </div>
        
        <input
          ref={searchRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for candidates... (e.g., 'senior React developers with 5+ years experience in fintech')"
          className="w-full pl-12 pr-24 py-4 text-lg bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          disabled={isLoading}
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-4">
          {searchQuery && (
            <button
              onClick={handleClear}
              className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
              disabled={isLoading}
            >
              <Icon name="X" size={16} />
            </button>
          )}
          
          <Button
            onClick={handleSearch}
            disabled={!searchQuery.trim() || isLoading}
            size="sm"
            iconName="Search"
            iconPosition="left"
            iconSize={16}
          >
            Search
          </Button>
        </div>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-1020 max-h-80 overflow-y-auto animate-fade-in"
        >
          <div className="p-2">
            <div className="text-xs text-muted-foreground px-3 py-2 font-medium">
              Suggested Searches
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`
                  w-full text-left px-3 py-2 rounded-md transition-colors duration-200 flex items-start space-x-3
                  ${index === selectedSuggestion 
                    ? 'bg-accent text-accent-foreground' 
                    : 'hover:bg-muted'
                  }
                `}
              >
                <Icon name={suggestion.type === 'recent' ? 'Clock' : 'TrendingUp'} size={16} className="mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{suggestion.query}</div>
                  {suggestion.description && (
                    <div className="text-xs text-muted-foreground mt-1">{suggestion.description}</div>
                  )}
                  {suggestion.resultCount && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {suggestion.resultCount} candidates found
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;