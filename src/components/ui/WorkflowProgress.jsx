import React from 'react';
import Icon from '../AppIcon';

const WorkflowProgress = ({ 
  isVisible = false, 
  currentStep = 1, 
  totalSteps = 4, 
  stepLabel = 'Processing resumes...', 
  progress = 0,
  onCancel 
}) => {
  const steps = [
    { label: 'Upload', icon: 'Upload' },
    { label: 'Process', icon: 'Cpu' },
    { label: 'Analyze', icon: 'Brain' },
    { label: 'Complete', icon: 'CheckCircle' }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed top-16 left-0 right-0 bg-card border-b border-border z-1030 animate-slide-in">
      <div className="max-w-4xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="animate-pulse-subtle">
              <Icon name="Loader2" size={20} className="animate-spin text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">{stepLabel}</span>
          </div>
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-out animate-fill"
              style={{ width: `${progress}%`, '--fill-width': `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{progress}% complete</span>
            <span>Step {currentStep} of {totalSteps}</span>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isUpcoming = stepNumber > currentStep;

            return (
              <div key={step.label} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300
                  ${isCompleted 
                    ? 'bg-success border-success text-success-foreground' 
                    : isCurrent 
                      ? 'bg-primary border-primary text-primary-foreground animate-pulse-subtle'
                      : 'bg-muted border-border text-muted-foreground'
                  }
                `}>
                  {isCompleted ? (
                    <Icon name="Check" size={14} />
                  ) : (
                    <Icon name={step.icon} size={14} />
                  )}
                </div>
                <span className={`
                  ml-2 text-xs font-medium
                  ${isCompleted 
                    ? 'text-success' 
                    : isCurrent 
                      ? 'text-primary' :'text-muted-foreground'
                  }
                `}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className={`
                    w-12 h-0.5 mx-4 transition-colors duration-300
                    ${isCompleted ? 'bg-success' : 'bg-border'}
                  `} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkflowProgress;