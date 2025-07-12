import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ userName, userRole, language, translations }) => {
  const t = translations[language] || translations.en;

  const getRoleSpecificWelcome = () => {
    switch (userRole) {
      case 'landlord':
        return {
          title: t.welcomeLandlord,
          subtitle: t.landlordSubtitle,
          emoji: '🏠'
        };
      case 'diaspora':
        return {
          title: t.welcomeDiaspora,
          subtitle: t.diasporaSubtitle,
          emoji: '🌍'
        };
      default:
        return {
          title: t.welcomeRenter,
          subtitle: t.renterSubtitle,
          emoji: '🔑'
        };
    }
  };

  const welcome = getRoleSpecificWelcome();

  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <div className="px-6 py-8">
        <div className="max-w-md mx-auto text-center">
          {/* Logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg backdrop-blur-sm">
                <Icon name="Home" size={28} color="white" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xl font-heading font-bold">Zimba AI</span>
                <span className="text-sm font-caption opacity-90 -mt-1">Real Estate</span>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mb-6">
            <div className="text-4xl mb-3">{welcome.emoji}</div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold mb-3">
              {welcome.title}
              {userName && (
                <span className="block text-xl md:text-2xl font-medium opacity-90 mt-1">
                  {userName}!
                </span>
              )}
            </h1>
            <p className="text-primary-foreground/90 font-body leading-relaxed">
              {welcome.subtitle}
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span className="font-caption">{t.secure}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="BadgeCheck" size={16} />
              <span className="font-caption">{t.verified}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Heart" size={16} />
              <span className="font-caption">{t.trusted}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;