import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SavedSearches = ({ onSearchSelect, onCreateAlert }) => {
  const [showCreateAlert, setShowCreateAlert] = useState(false);
  const [alertName, setAlertName] = useState('');
  const [alertFrequency, setAlertFrequency] = useState('daily');

  const savedSearches = [
    {
      id: 1,
      name: "Senior React Developers",
      query: "senior React developers with 5+ years experience in fintech",
      createdAt: new Date(Date.now() - 86400000 * 3),
      lastRun: new Date(Date.now() - 3600000 * 2),
      resultCount: 24,
      alertEnabled: true,
      alertFrequency: "daily",
      newResults: 3
    },
    {
      id: 2,
      name: "Python Data Scientists",
      query: "Python data scientists with machine learning experience",
      createdAt: new Date(Date.now() - 86400000 * 7),
      lastRun: new Date(Date.now() - 3600000 * 6),
      resultCount: 18,
      alertEnabled: false,
      alertFrequency: "weekly",
      newResults: 0
    },
    {
      id: 3,
      name: "Full Stack Fintech",
      query: "full stack developers Node.js React fintech startup",
      createdAt: new Date(Date.now() - 86400000 * 14),
      lastRun: new Date(Date.now() - 3600000 * 12),
      resultCount: 31,
      alertEnabled: true,
      alertFrequency: "weekly",
      newResults: 5
    },
    {
      id: 4,
      name: "DevOps Engineers",
      query: "DevOps engineers AWS Kubernetes Docker remote",
      createdAt: new Date(Date.now() - 86400000 * 21),
      lastRun: new Date(Date.now() - 3600000 * 24),
      resultCount: 15,
      alertEnabled: true,
      alertFrequency: "daily",
      newResults: 1
    }
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) {
      return `${days}d ago`;
    } else if (hours > 0) {
      return `${hours}h ago`;
    } else {
      return 'Just now';
    }
  };

  const handleCreateAlert = () => {
    if (alertName.trim()) {
      onCreateAlert({
        name: alertName,
        frequency: alertFrequency
      });
      setAlertName('');
      setShowCreateAlert(false);
    }
  };

  const handleToggleAlert = (searchId) => {
    console.log('Toggle alert for search:', searchId);
  };

  const handleDeleteSearch = (searchId) => {
    console.log('Delete search:', searchId);
  };

  const handleRunSearch = (search) => {
    onSearchSelect(search.query);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Bookmark" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Saved Searches</h3>
          <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
            {savedSearches.length}
          </span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCreateAlert(!showCreateAlert)}
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
        >
          Create Alert
        </Button>
      </div>

      {/* Create Alert Form */}
      {showCreateAlert && (
        <div className="p-4 border-b border-border bg-muted/30 animate-fade-in">
          <div className="space-y-4">
            <Input
              label="Alert Name"
              type="text"
              placeholder="e.g., Senior React Developers"
              value={alertName}
              onChange={(e) => setAlertName(e.target.value)}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Frequency
                </label>
                <select
                  value={alertFrequency}
                  onChange={(e) => setAlertFrequency(e.target.value)}
                  className="w-full px-3 py-2 bg-card border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleCreateAlert}
                disabled={!alertName.trim()}
                iconName="Check"
                iconPosition="left"
                iconSize={16}
              >
                Create Alert
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowCreateAlert(false);
                  setAlertName('');
                }}
                iconName="X"
                iconPosition="left"
                iconSize={16}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Saved Searches List */}
      <div className="divide-y divide-border">
        {savedSearches.map((search) => (
          <div key={search.id} className="p-4 hover:bg-muted/50 transition-colors duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-sm font-semibold text-foreground truncate">
                    {search.name}
                  </h4>
                  
                  {search.newResults > 0 && (
                    <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
                      {search.newResults} new
                    </span>
                  )}
                  
                  {search.alertEnabled && (
                    <Icon name="Bell" size={14} className="text-accent" />
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {search.query}
                </p>
                
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>Created {formatDate(search.createdAt)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>Last run {formatTimeAgo(search.lastRun)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{search.resultCount} results</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRunSearch(search)}
                  iconName="Play"
                  iconSize={14}
                />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleToggleAlert(search.id)}
                  iconName={search.alertEnabled ? "BellOff" : "Bell"}
                  iconSize={14}
                />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteSearch(search.id)}
                  iconName="Trash2"
                  iconSize={14}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {savedSearches.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Bookmark" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No saved searches</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Save your frequent searches to quickly access them later and set up alerts for new candidates.
          </p>
          <Button
            variant="outline"
            onClick={() => setShowCreateAlert(true)}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Create Your First Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavedSearches;