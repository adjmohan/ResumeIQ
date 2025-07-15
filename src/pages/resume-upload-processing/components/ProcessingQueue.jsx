import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingQueue = ({ files, onRetry, onRemove }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'queuing':
        return { name: 'Clock', color: 'text-warning' };
      case 'processing':
        return { name: 'Loader2', color: 'text-primary animate-spin' };
      case 'complete':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'error':
        return { name: 'XCircle', color: 'text-error' };
      default:
        return { name: 'File', color: 'text-muted-foreground' };
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'queuing':
        return 'In Queue';
      case 'processing':
        return 'Processing';
      case 'complete':
        return 'Complete';
      case 'error':
        return 'Error';
      default:
        return 'Unknown';
    }
  };

  const getFileIcon = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return { name: 'FileText', color: 'text-error' };
      case 'docx':
        return { name: 'FileText', color: 'text-primary' };
      case 'txt':
        return { name: 'FileText', color: 'text-secondary' };
      default:
        return { name: 'File', color: 'text-muted-foreground' };
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (files.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <Icon name="Inbox" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No files uploaded</h3>
        <p className="text-sm text-muted-foreground">
          Upload resume files to start processing
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Processing Queue</h3>
          <div className="text-sm text-muted-foreground">
            {files.length} file{files.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        {files.map((file) => {
          const statusIcon = getStatusIcon(file.status);
          const fileIcon = getFileIcon(file.name);

          return (
            <div key={file.id} className="p-4 hover:bg-muted/50 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                {/* File Icon */}
                <div className="flex-shrink-0">
                  <Icon name={fileIcon.name} size={20} className={fileIcon.color} />
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  {file.status === 'processing' && (
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Format: {file.name.split('.').pop().toUpperCase()}</span>
                    {file.estimatedTime && (
                      <span>ETA: {file.estimatedTime}</span>
                    )}
                    {file.progress !== undefined && (
                      <span>{file.progress}% complete</span>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <Icon name={statusIcon.name} size={16} className={statusIcon.color} />
                    <span className="text-sm font-medium text-foreground">
                      {getStatusText(file.status)}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-1">
                    {file.status === 'error' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRetry(file.id)}
                        iconName="RotateCcw"
                        iconSize={14}
                      >
                        Retry
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemove(file.id)}
                      iconName="Trash2"
                      iconSize={14}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {file.status === 'error' && file.errorMessage && (
                <div className="mt-2 p-2 bg-error/10 border border-error/20 rounded text-sm text-error">
                  {file.errorMessage}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProcessingQueue;