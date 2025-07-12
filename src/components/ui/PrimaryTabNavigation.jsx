import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

// Language Context
const LanguageContext = React.createContext({
  language: 'en'
});

const PrimaryTabNavigation = () => {
  const location = useLocation();
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      discover: 'Discover',
      messages: 'Messages',
      profile: 'Profile'
    },
    fr: {
      discover: 'Découvrir',
      messages: 'Messages',
      profile: 'Profil'
    },
    ar: {
      discover: 'اكتشف',
      messages: 'الرسائل',
      profile: 'الملف الشخصي'
    },
    sw: {
      discover: 'Gundua',
      messages: 'Ujumbe',
      profile: 'Wasifu'
    },
    am: {
      discover: 'ያግኙ',
      messages: 'መልዕክቶች',
      profile: 'መገለጫ'
    }
  };

  const t = translations[language] || translations.en;

  const navigationItems = [
    {
      label: t.discover,
      path: '/property-search-listing-grid',
      icon: 'Search',
      active: location.pathname === '/property-search-listing-grid' || location.pathname === '/property-detail-view'
    },
    {
      label: t.messages,
      path: '/ai-chat-support-interface',
      icon: 'MessageCircle',
      active: location.pathname === '/ai-chat-support-interface',
      badge: 3 // Notification count
    },
    {
      label: t.profile,
      path: '/user-registration-authentication',
      icon: 'User',
      active: location.pathname === '/user-registration-authentication'
    }
  ];

  return (
    <>
      {/* Desktop Navigation - Horizontal Bar */}
      <nav className="hidden md:flex items-center justify-center bg-card border-b border-border sticky top-16 z-40">
        <div className="flex items-center space-x-8 px-6 py-4">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 touch-target ${
                item.active
                  ? 'bg-primary text-primary-foreground shadow-card'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={20} />
              <span className="font-body font-medium">{item.label}</span>
              {item.badge && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-accent rounded-full animate-spring">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile Navigation - Bottom Tab Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="flex items-center justify-around px-4 py-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex flex-col items-center justify-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200 touch-target ${
                item.active
                  ? 'text-primary' :'text-muted-foreground'
              }`}
            >
              <div className="relative">
                <Icon name={item.icon} size={24} />
                {item.badge && (
                  <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-accent rounded-full animate-spring">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="font-caption text-xs font-medium">{item.label}</span>
              {item.active && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default PrimaryTabNavigation;