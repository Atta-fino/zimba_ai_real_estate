import React from 'react';

const ProgressIndicator = ({ currentStep, totalSteps, language, translations }) => {
  const t = translations[language] || translations.en;
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="px-6 py-4 bg-card border-b border-border">
      <div className="max-w-md mx-auto">
        {/* Step Counter */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-caption text-sm text-muted-foreground">
            {t.step} {currentStep} {t.of} {totalSteps}
          </span>
          <span className="font-caption text-sm text-muted-foreground">
            {Math.round(progressPercentage)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Step Dots */}
        <div className="flex items-center justify-center space-x-3">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            return (
              <div
                key={stepNumber}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-primary scale-125'
                    : isCompleted
                    ? 'bg-success' :'bg-muted'
                }`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;