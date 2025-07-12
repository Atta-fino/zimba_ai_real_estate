import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

// Language Context
const LanguageContext = React.createContext({
  language: 'en',
  setLanguage: () => {}
});

const OnboardingFlowController = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language } = useContext(LanguageContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const translations = {
    en: {
      step: 'Step',
      of: 'of',
      next: 'Next',
      back: 'Back',
      finish: 'Get Started',
      skip: 'Skip',
      progress: 'Progress'
    },
    fr: {
      step: 'Étape',
      of: 'de',
      next: 'Suivant',
      back: 'Retour',
      finish: 'Commencer',
      skip: 'Ignorer',
      progress: 'Progrès'
    },
    ar: {
      step: 'خطوة',
      of: 'من',
      next: 'التالي',
      back: 'السابق',
      finish: 'ابدأ',
      skip: 'تخطي',
      progress: 'التقدم'
    },
    sw: {
      step: 'Hatua',
      of: 'ya',
      next: 'Ifuatayo',
      back: 'Nyuma',
      finish: 'Anza',
      skip: 'Ruka',
      progress: 'Maendeleo'
    },
    am: {
      step: 'ደረጃ',
      of: 'ከ',
      next: 'ቀጣይ',
      back: 'ተመለስ',
      finish: 'ጀምር',
      skip: 'ዝለል',
      progress: 'እድገት'
    }
  };

  const t = translations[language] || translations.en;

  const onboardingSteps = [
    {
      path: '/country-selection-language-preference',
      title: 'Country & Language',
      description: 'Select your location and preferred language',
      icon: 'Globe',
      required: true
    },
    {
      path: '/user-registration-authentication',
      title: 'Create Account',
      description: 'Set up your account to get started',
      icon: 'UserPlus',
      required: true
    },
    {
      path: '/trust-onboarding-flow',
      title: 'Trust & Verification',
      description: 'Complete verification for secure transactions',
      icon: 'Shield',
      required: false
    }
  ];

  // Check if user has completed onboarding
  useEffect(() => {
    const onboardingStatus = localStorage.getItem('zimba-onboarding-complete');
    const userToken = localStorage.getItem('zimba-user-token');
    
    if (onboardingStatus === 'true' && userToken) {
      setIsOnboardingComplete(true);
    } else {
      // Determine current step based on current path
      const stepIndex = onboardingSteps.findIndex(step => step.path === location.pathname);
      if (stepIndex !== -1) {
        setCurrentStep(stepIndex);
      }
    }
  }, [location.pathname]);

  // If onboarding is complete, render children normally
  if (isOnboardingComplete) {
    return children;
  }

  // If not on an onboarding path, redirect to first step
  const isOnboardingPath = onboardingSteps.some(step => step.path === location.pathname);
  if (!isOnboardingPath) {
    navigate('/country-selection-language-preference');
    return null;
  }

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      navigate(onboardingSteps[nextStep].path);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      navigate(onboardingSteps[prevStep].path);
    }
  };

  const handleFinish = () => {
    localStorage.setItem('zimba-onboarding-complete', 'true');
    setIsOnboardingComplete(true);
    navigate('/property-search-listing-grid');
  };

  const handleSkip = () => {
    if (!onboardingSteps[currentStep].required) {
      handleNext();
    }
  };

  const progressPercentage = ((currentStep + 1) / onboardingSteps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Onboarding Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Home" size={24} color="white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold text-foreground">Zimba AI</span>
                <span className="text-sm font-caption text-muted-foreground -mt-1">Real Estate</span>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-caption text-sm text-muted-foreground">
                {t.step} {currentStep + 1} {t.of} {onboardingSteps.length}
              </span>
              <span className="font-caption text-sm text-muted-foreground">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Step Information */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                <Icon name={onboardingSteps[currentStep].icon} size={24} className="text-primary" />
              </div>
            </div>
            <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
              {onboardingSteps[currentStep].title}
            </h1>
            <p className="text-muted-foreground font-body">
              {onboardingSteps[currentStep].description}
            </p>
          </div>

          {/* Step Navigation */}
          <div className="flex items-center justify-center mt-6 space-x-2">
            {onboardingSteps.map((step, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index <= currentStep
                    ? 'bg-primary' :'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Navigation Footer */}
      <div className="bg-card border-t border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center space-x-2"
            >
              <Icon name="ChevronLeft" size={16} />
              <span>{t.back}</span>
            </Button>

            <div className="flex items-center space-x-3">
              {!onboardingSteps[currentStep].required && (
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="text-muted-foreground"
                >
                  {t.skip}
                </Button>
              )}
              
              <Button
                variant="default"
                onClick={currentStep === onboardingSteps.length - 1 ? handleFinish : handleNext}
                className="flex items-center space-x-2"
              >
                <span>
                  {currentStep === onboardingSteps.length - 1 ? t.finish : t.next}
                </span>
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlowController;