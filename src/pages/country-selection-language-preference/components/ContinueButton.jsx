import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContinueButton = ({ 
  isEnabled, 
  onContinue, 
  language, 
  isLoading = false 
}) => {
  const translations = {
    en: {
      continue: 'Continue',
      selectBoth: 'Please select country and language to continue'
    },
    fr: {
      continue: 'Continuer',
      selectBoth: 'Veuillez sélectionner le pays et la langue pour continuer'
    },
    ar: {
      continue: 'متابعة',
      selectBoth: 'يرجى اختيار البلد واللغة للمتابعة'
    },
    sw: {
      continue: 'Endelea',
      selectBoth: 'Tafadhali chagua nchi na lugha ili kuendelea'
    },
    am: {
      continue: 'ቀጥል',
      selectBoth: 'እባክዎ ለመቀጠል ሀገር እና ቋንቋ ይምረጡ'
    }
  };

  const t = translations[language] || translations.en;

  return (
    <div className="w-full space-y-4">
      {!isEnabled && (
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <Icon name="Info" size={16} />
          <span className="font-caption text-sm text-center">
            {t.selectBoth}
          </span>
        </div>
      )}
      
      <Button
        variant="default"
        size="lg"
        fullWidth
        disabled={!isEnabled}
        loading={isLoading}
        onClick={onContinue}
        iconName="ChevronRight"
        iconPosition="right"
        className="touch-target"
      >
        {t.continue}
      </Button>
    </div>
  );
};

export default ContinueButton;