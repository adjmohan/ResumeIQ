import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingStats = ({ files }) => {
  const stats = {
    total: files.length,
    queuing: files.filter(f => f.status === 'queuing').length,
    processing: files.filter(f => f.status === 'processing').length,
    complete: files.filter(f => f.status === 'complete').length,
    error: files.filter(f => f.status === 'error').length
  };

  const completionRate = stats.total > 0 ? Math.round((stats.complete / stats.total) * 100) : 0;

  const statItems = [
    {
      label: 'Total Files',
      value: stats.total,
      icon: 'Files',
      color: 'text-foreground'
    },
    {
      label: 'In Queue',
      value: stats.queuing,
      icon: 'Clock',
      color: 'text-warning'
    },
    {
      label: 'Processing',
      value: stats.processing,
      icon: 'Loader2',
      color: 'text-primary'
    },
    {
      label: 'Completed',
      value: stats.complete,
      icon: 'CheckCircle',
      color: 'text-success'
    },
    {
      label: 'Errors',
      value: stats.error,
      icon: 'XCircle',
      color: 'text-error'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Processing Overview</h3>
          <div className="text-2xl font-bold text-primary">{completionRate}%</div>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3 mb-4">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-500"
            style={{ width: `${completionRate}%` }}
          />
        </div>
        
        <div className="text-sm text-muted-foreground">
          {stats.complete} of {stats.total} files processed
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Status Breakdown</h3>
        
        <div className="space-y-3">
          {statItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name={item.icon} size={16} className={item.color} />
                <span className="text-sm text-foreground">{item.label}</span>
              </div>
              <span className="text-sm font-medium text-foreground">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Processing Guidelines */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Upload Guidelines</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={14} className="text-success mt-0.5" />
            <span className="text-muted-foreground">
              Maximum file size: 10MB per file
            </span>
          </div>
          
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={14} className="text-success mt-0.5" />
            <span className="text-muted-foreground">
              Supported formats: PDF, DOCX, TXT
            </span>
          </div>
          
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={14} className="text-success mt-0.5" />
            <span className="text-muted-foreground">
              Batch upload up to 50 files
            </span>
          </div>
          
          <div className="flex items-start space-x-2">
            <Icon name="Check" size={14} className="text-success mt-0.5" />
            <span className="text-muted-foreground">
              Processing time: 30-60 seconds per file
            </span>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-foreground">AI Processing</span>
            </div>
            <span className="text-xs text-success">Online</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm text-foreground">File Storage</span>
            </div>
            <span className="text-xs text-success">Active</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span className="text-sm text-foreground">Queue Load</span>
            </div>
            <span className="text-xs text-warning">Moderate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingStats;