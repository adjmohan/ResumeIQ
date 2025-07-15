import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const QuickActionSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const getContextualActions = () => {
    switch (location.pathname) {
      case '/dashboard':
        return [
          { 
            label: 'New Job Posting', 
            icon: 'Plus', 
            action: () => window.location.href = '/job-management',
            variant: 'default'
          },
          { 
            label: 'Upload Resumes', 
            icon: 'Upload', 
            action: () => window.location.href = '/resume-upload-processing',
            variant: 'outline'
          },
          { 
            label: 'Quick Search', 
            icon: 'Search', 
            action: () => window.location.href = '/search-advanced-filtering',
            variant: 'ghost'
          },
          { 
            label: 'View Reports', 
            icon: 'BarChart3', 
            action: () => console.log('View Reports'),
            variant: 'ghost'
          }
        ];
      
      case '/job-management':
        return [
          { 
            label: 'Create Job', 
            icon: 'Plus', 
            action: () => console.log('Create Job'),
            variant: 'default'
          },
          { 
            label: 'Import Jobs', 
            icon: 'Download', 
            action: () => console.log('Import Jobs'),
            variant: 'outline'
          },
          { 
            label: 'Job Templates', 
            icon: 'FileText', 
            action: () => console.log('Job Templates'),
            variant: 'ghost'
          }
        ];
      
      case '/resume-upload-processing': case'/candidate-ranking-results': case'/candidate-profile-detail':
        return [
          { 
            label: 'Upload More', 
            icon: 'Upload', 
            action: () => window.location.href = '/resume-upload-processing',
            variant: 'default'
          },
          { 
            label: 'Export Results', 
            icon: 'Download', 
            action: () => console.log('Export Results'),
            variant: 'outline'
          },
          { 
            label: 'Filter Candidates', 
            icon: 'Filter', 
            action: () => console.log('Filter Candidates'),
            variant: 'ghost'
          },
          { 
            label: 'Bulk Actions', 
            icon: 'CheckSquare', 
            action: () => console.log('Bulk Actions'),
            variant: 'ghost'
          }
        ];
      
      case '/search-advanced-filtering':
        return [
          { 
            label: 'Save Search', 
            icon: 'Bookmark', 
            action: () => console.log('Save Search'),
            variant: 'default'
          },
          { 
            label: 'Clear Filters', 
            icon: 'X', 
            action: () => console.log('Clear Filters'),
            variant: 'outline'
          },
          { 
            label: 'Export List', 
            icon: 'Download', 
            action: () => console.log('Export List'),
            variant: 'ghost'
          }
        ];
      
      default:
        return [];
    }
  };

  const actions = getContextualActions();

  if (actions.length === 0) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed right-6 top-24 z-1000">
        <div className="bg-card border border-border rounded-lg shadow-lg p-4 w-56 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground">Quick Actions</h3>
            <Icon name="Zap" size={16} className="text-accent" />
          </div>
          
          <div className="space-y-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                variant={action.variant}
                size="sm"
                onClick={action.action}
                className="w-full justify-start"
                iconName={action.icon}
                iconPosition="left"
                iconSize={16}
              >
                {action.label}
              </Button>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground">
              <div className="flex items-center space-x-1 mb-1">
                <Icon name="Clock" size={12} />
                <span>Last updated: 2 min ago</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Activity" size={12} />
                <span>System status: Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-1000">
        <div className="flex items-center justify-around p-4">
          {actions.slice(0, 4).map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={action.action}
              className="flex-col h-auto py-2 px-3"
            >
              <Icon name={action.icon} size={18} className="mb-1" />
              <span className="text-xs">{action.label.split(' ')[0]}</span>
            </Button>
          ))}
          
          {actions.length > 4 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex-col h-auto py-2 px-3"
            >
              <Icon name="MoreHorizontal" size={18} className="mb-1" />
              <span className="text-xs">More</span>
            </Button>
          )}
        </div>
        
        {/* Expanded Mobile Actions */}
        {isExpanded && actions.length > 4 && (
          <div className="border-t border-border bg-muted p-4 animate-slide-in">
            <div className="grid grid-cols-2 gap-2">
              {actions.slice(4).map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  size="sm"
                  onClick={() => {
                    action.action();
                    setIsExpanded(false);
                  }}
                  className="justify-start"
                  iconName={action.icon}
                  iconPosition="left"
                  iconSize={16}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default QuickActionSidebar;