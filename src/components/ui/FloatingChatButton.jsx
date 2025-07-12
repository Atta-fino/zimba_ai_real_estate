import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

// Language Context
const LanguageContext = React.createContext({
  language: 'en'
});

const FloatingChatButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(true);
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      chat: 'Chat Support',
      help: 'Need Help?',
      quickHelp: 'Quick Help',
      findProperty: 'Find Property',
      bookViewing: 'Book Viewing',
      priceInfo: 'Price Information',
      verification: 'Verification Help'
    },
    fr: {
      chat: 'Support Chat',
      help: 'Besoin d\'aide?',
      quickHelp: 'Aide Rapide',
      findProperty: 'Trouver Propriété',
      bookViewing: 'Réserver Visite',
      priceInfo: 'Info Prix',
      verification: 'Aide Vérification'
    },
    ar: {
      chat: 'دعم الدردشة',
      help: 'تحتاج مساعدة؟',
      quickHelp: 'مساعدة سريعة',
      findProperty: 'العثور على عقار',
      bookViewing: 'حجز معاينة',
      priceInfo: 'معلومات السعر',
      verification: 'مساعدة التحقق'
    },
    sw: {
      chat: 'Msaada wa Mazungumzo',
      help: 'Unahitaji Msaada?',
      quickHelp: 'Msaada wa Haraka',
      findProperty: 'Tafuta Mali',
      bookViewing: 'Weka Ratiba ya Kuona',
      priceInfo: 'Maelezo ya Bei',
      verification: 'Msaada wa Uthibitisho'
    },
    am: {
      chat: 'የውይይት ድጋፍ',
      help: 'እርዳታ ይፈልጋሉ?',
      quickHelp: 'ፈጣን እርዳታ',
      findProperty: 'ንብረት ያግኙ',
      bookViewing: 'እይታ ያስይዙ',
      priceInfo: 'የዋጋ መረጃ',
      verification: 'የማረጋገጫ እርዳታ'
    }
  };

  const t = translations[language] || translations.en;

  const quickActions = [
    { label: t.findProperty, icon: 'Search', action: () => handleQuickAction('find-property') },
    { label: t.bookViewing, icon: 'Calendar', action: () => handleQuickAction('book-viewing') },
    { label: t.priceInfo, icon: 'DollarSign', action: () => handleQuickAction('price-info') },
    { label: t.verification, icon: 'Shield', action: () => handleQuickAction('verification') }
  ];

  const handleQuickAction = (actionType) => {
    // Handle quick action logic
    setIsExpanded(false);
    // Navigate to chat with pre-filled message based on action
  };

  const handleChatClick = () => {
    setHasNewMessages(false);
  };

  return (
    <>
      {/* Desktop Version - Integrated Panel Toggle */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-50">
        {isExpanded && (
          <div className="mb-4 bg-card border border-border rounded-lg shadow-modal p-4 w-64 animate-slide-up">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-semibold text-sm">{t.quickHelp}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="p-1"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-muted rounded-lg transition-colors duration-200 touch-target"
                >
                  <Icon name={action.icon} size={16} className="text-primary" />
                  <span className="font-body text-sm">{action.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <Link
                to="/ai-chat-support-interface"
                onClick={handleChatClick}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
              >
                <Icon name="MessageCircle" size={16} />
                <span className="font-body font-medium text-sm">{t.chat}</span>
              </Link>
            </div>
          </div>
        )}

        <Button
          variant="default"
          size="lg"
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-14 h-14 rounded-full shadow-modal hover:shadow-lg transition-all duration-200"
        >
          <Icon name={isExpanded ? "X" : "MessageCircle"} size={24} />
          {hasNewMessages && !isExpanded && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-spring" />
          )}
        </Button>
      </div>

      {/* Mobile Version - Floating Action Button */}
      <div className="lg:hidden fixed bottom-20 right-4 z-50">
        {isExpanded && (
          <div className="mb-4 bg-card border border-border rounded-lg shadow-modal p-4 w-72 animate-slide-up">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-heading font-semibold text-sm">{t.quickHelp}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="p-1"
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  className="flex flex-col items-center space-y-2 px-3 py-3 hover:bg-muted rounded-lg transition-colors duration-200 touch-target"
                >
                  <Icon name={action.icon} size={20} className="text-primary" />
                  <span className="font-caption text-xs text-center">{action.label}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <Link
                to="/ai-chat-support-interface"
                onClick={handleChatClick}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 touch-target"
              >
                <Icon name="MessageCircle" size={18} />
                <span className="font-body font-medium text-sm">{t.chat}</span>
              </Link>
            </div>
          </div>
        )}

        <Button
          variant="default"
          size="lg"
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-14 h-14 rounded-full shadow-modal hover:shadow-lg transition-all duration-200"
        >
          <Icon name={isExpanded ? "X" : "MessageCircle"} size={24} />
          {hasNewMessages && !isExpanded && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-spring" />
          )}
        </Button>

        {/* Help Text */}
        {!isExpanded && (
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-foreground text-background px-3 py-1 rounded-lg text-xs font-caption whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {t.help}
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-foreground" />
          </div>
        )}
      </div>

      {/* Overlay for mobile expanded state */}
      {isExpanded && (
        <div
          className="lg:hidden fixed inset-0 z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default FloatingChatButton;