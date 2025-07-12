import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLoginButtons = ({ language, onSocialLogin }) => {
  const translations = {
    en: {
      continueWith: 'Continue with',
      google: 'Google',
      facebook: 'Facebook',
      orDivider: 'or'
    },
    fr: {
      continueWith: 'Continuer avec',
      google: 'Google',
      facebook: 'Facebook',
      orDivider: 'ou'
    },
    ar: {
      continueWith: 'المتابعة مع',
      google: 'جوجل',
      facebook: 'فيسبوك',
      orDivider: 'أو'
    },
    sw: {
      continueWith: 'Endelea na',
      google: 'Google',
      facebook: 'Facebook',
      orDivider: 'au'
    },
    am: {
      continueWith: 'ይቀጥሉ በ',
      google: 'ጉግል',
      facebook: 'ፌስቡክ',
      orDivider: 'ወይም'
    }
  };

  const t = translations[language] || translations.en;

  const socialProviders = [
    {
      id: 'google',
      name: t.google,
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300',
      hoverColor: 'hover:bg-gray-50'
    },
    {
      id: 'facebook',
      name: t.facebook,
      icon: 'Facebook',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600',
      hoverColor: 'hover:bg-blue-700'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.id}
            variant="outline"
            onClick={() => onSocialLogin(provider.id)}
            className={`${provider.bgColor} ${provider.textColor} ${provider.borderColor} ${provider.hoverColor} flex items-center justify-center space-x-2 py-3`}
          >
            <Icon name={provider.icon} size={18} />
            <span className="font-body font-medium text-sm">
              {t.continueWith} {provider.name}
            </span>
          </Button>
        ))}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground font-caption">
            {t.orDivider}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SocialLoginButtons;