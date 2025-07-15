import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadZone = ({ onFilesSelected, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    onFilesSelected(files);
  }, [onFilesSelected]);

  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    onFilesSelected(files);
  }, [onFilesSelected]);

  return (
    <div className="bg-card border border-border rounded-lg p-8 mb-6">
      <div
        className={`
          border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300
          ${isDragOver 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }
          ${isProcessing ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={`
            w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300
            ${isDragOver ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
          `}>
            <Icon name="Upload" size={32} />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              {isDragOver ? 'Drop files here' : 'Upload Resume Files'}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Drag and drop your resume files here, or click to browse. 
              Supports PDF, DOCX, and TXT formats up to 10MB each.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <Button
              variant="default"
              onClick={() => document.getElementById('file-input').click()}
              disabled={isProcessing}
              iconName="FolderOpen"
              iconPosition="left"
            >
              Browse Files
            </Button>
            
            <div className="text-xs text-muted-foreground">
              or drag files here
            </div>
          </div>

          <input
            id="file-input"
            type="file"
            multiple
            accept=".pdf,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {/* File Format Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
          <Icon name="FileText" size={20} className="text-error" />
          <div>
            <div className="text-sm font-medium">PDF Files</div>
            <div className="text-xs text-muted-foreground">Preferred format</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
          <Icon name="FileText" size={20} className="text-primary" />
          <div>
            <div className="text-sm font-medium">DOCX Files</div>
            <div className="text-xs text-muted-foreground">Word documents</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
          <Icon name="FileText" size={20} className="text-secondary" />
          <div>
            <div className="text-sm font-medium">TXT Files</div>
            <div className="text-xs text-muted-foreground">Plain text</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;