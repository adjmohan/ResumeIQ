import React from 'react';

import Button from '../../../components/ui/Button';

const NavigationControls = ({ 
  currentCandidate, 
  totalCandidates, 
  onPrevious, 
  onNext, 
  onBackToResults 
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      {/* Back to Results */}
      <Button
        variant="ghost"
        iconName="ArrowLeft"
        iconPosition="left"
        onClick={onBackToResults}
      >
        Back to Results
      </Button>

      {/* Candidate Navigation */}
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          iconName="ChevronLeft"
          iconPosition="left"
          onClick={onPrevious}
          disabled={currentCandidate === 1}
        >
          Previous
        </Button>
        
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Candidate</span>
          <span className="font-medium text-foreground">
            {currentCandidate} of {totalCandidates}
          </span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          iconName="ChevronRight"
          iconPosition="right"
          onClick={onNext}
          disabled={currentCandidate === totalCandidates}
        >
          Next
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          iconName="Share"
          iconPosition="left"
        >
          Share
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="Download"
          iconPosition="left"
        >
          Export
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreHorizontal"
        />
      </div>
    </div>
  );
};

export default NavigationControls;