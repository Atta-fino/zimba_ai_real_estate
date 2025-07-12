import React from 'react';
import Icon from '../../../components/AppIcon';

const OnboardingHeader = ({ language }) => {
  const translations = {
    en: {
      welcome: 'Welcome to Zimba AI',
      subtitle: 'Your trusted African real estate platform',
      step: 'Step 1 of 3'
    },
    fr: {
      welcome: 'Bienvenue sur Zimba AI',
      subtitle: 'Votre plateforme immobilière africaine de confiance',
      step: 'Étape 1 sur 3'
    },
    ar: {
      welcome: 'مرحباً بك في زيمبا AI',
      subtitle: 'منصة العقارات الأفريقية الموثوقة',
      step: 'الخطوة 1 من 3'
    },
    sw: {
      welcome: 'Karibu Zimba AI',
      subtitle: 'Jukwaa lako la uaminifu la mali za Afrika',
      step: 'Hatua ya 1 kati ya 3'
    },
    am: {
      welcome: 'ወደ ዚምባ AI እንኳን በደህና መጡ',
      subtitle: 'የእርስዎ የታመነ የአፍሪካ ሪል እስቴት መድረክ',
      step: 'ደረጃ 1 ከ 3'
    }
  };

  const t = translations[language] || translations.en;

  return (
    <div className={`text-center mb-8 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl">
            <Icon name="Home" size={28} color="white" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-heading font-bold text-foreground">Zimba AI</span>
            <span className="text-sm font-caption text-muted-foreground -mt-1">Real Estate</span>
          </div>
        </div>
      </div>

      {/* Welcome Text */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
          {t.welcome}
        </h1>
        <p className="text-lg font-body text-muted-foreground mb-4">
          {t.subtitle}
        </p>
        
        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-8 h-2 bg-primary rounded-full" />
          <div className="w-8 h-2 bg-muted rounded-full" />
          <div className="w-8 h-2 bg-muted rounded-full" />
        </div>
        <span className="font-caption text-sm text-muted-foreground">{t.step}</span>
      </div>

      {/* African Cultural Elements */}
      <div className="flex items-center justify-center space-x-4 mb-6">
        <span className="text-2xl">🌍</span>
        <span className="text-2xl">🏠</span>
        <span className="text-2xl">🤝</span>
        <span className="text-2xl">✨</span>
      </div>
    </div>
  );
};

export default OnboardingHeader;