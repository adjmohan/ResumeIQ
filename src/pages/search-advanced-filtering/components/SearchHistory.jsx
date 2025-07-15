import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchHistory = ({ onSearchSelect, onSaveSearch, currentQuery }) => {
  const [showHistory, setShowHistory] = useState(false);

  const recentSearches = [
    {
      id: 1,
      query: "senior React developers with 5+ years experience",
      timestamp: new Date(Date.now() - 3600000),
      resultCount: 24,
      saved: true
    },
    {
      id: 2,
      query: "Python data scientists with machine learning experience",
      timestamp: new Date(Date.now() - 7200000),
      resultCount: 18,
      saved: false
    },
    {
      id: 3,
      query: "full stack developers Node.js React fintech",
      timestamp: new Date(Date.now() - 10800000),
      resultCount: 31,
      saved: true
    },
    {
      id: 4,
      query: "DevOps engineers AWS Kubernetes Docker",
      timestamp: new Date(Date.now() - 14400000),
      resultCount: 15,
      saved: false
    },
    {
      id: 5,
      query: "mobile developers iOS Swift React Native",
      timestamp: new Date(Date.now() - 18000000),
      resultCount: 12,
      saved: false
    }
  ];

  const savedSearches = recentSearches.filter(search => search.saved);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ago`;
    } else if (minutes > 0) {
      return `${minutes}m ago`;
    } else {
      return 'Just now';
    }
  };

  const handleSaveCurrentSearch = () => {
    if (currentQuery.trim()) {
      onSaveSearch(currentQuery);
    }
  };

  const handleDeleteSearch = (searchId, event) => {
    event.stopPropagation();
    // Handle delete logic here
    console.log('Delete search:', searchId);
  };

  return (
    <div className="space-y-4">
      {/* Quick Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
            iconName={showHistory ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="left"
            iconSize={16}
          >
            Search History
          </Button>
          
          {recentSearches.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {recentSearches.length} recent searches
            </span>
          )}
        </div>
        
        {currentQuery && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveCurrentSearch}
            iconName="Bookmark"
            iconPosition="left"
            iconSize={14}
          >
            Save Search
          </Button>
        )}
      </div>

      {/* Saved Searches Quick Access */}
      {savedSearches.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Icon name="Bookmark" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Saved Searches</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {savedSearches.slice(0, 3).map((search) => (
              <button
                key={search.id}
                onClick={() => onSearchSelect(search.query)}
                className="flex items-center space-x-2 px-3 py-2 bg-accent/10 text-accent rounded-md text-sm hover:bg-accent/20 transition-colors duration-200"
              >
                <Icon name="Search" size={14} />
                <span className="truncate max-w-48">{search.query}</span>
                <span className="text-xs opacity-70">({search.resultCount})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Expanded History */}
      {showHistory && (
        <div className="bg-card border border-border rounded-lg p-4 animate-fade-in">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Recent Searches</h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
                iconSize={14}
              >
                Clear History
              </Button>
            </div>
            
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {recentSearches.map((search) => (
                <div
                  key={search.id}
                  className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors duration-200 cursor-pointer group"
                  onClick={() => onSearchSelect(search.query)}
                >
                  <div className="flex items-start space-x-3 flex-1 min-w-0">
                    <div className="flex-shrink-0 mt-1">
                      {search.saved ? (
                        <Icon name="Bookmark" size={16} className="text-accent" />
                      ) : (
                        <Icon name="Clock" size={16} className="text-muted-foreground" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">
                        {search.query}
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                        <span>{formatTimeAgo(search.timestamp)}</span>
                        <span>{search.resultCount} results</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSaveSearch(search.query);
                      }}
                      iconName={search.saved ? "BookmarkCheck" : "Bookmark"}
                      iconSize={14}
                    />
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleDeleteSearch(search.id, e)}
                      iconName="Trash2"
                      iconSize={14}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchHistory;