import React from 'react';
import Icon from '../../../components/AppIcon';

const LanguageSelector = ({ 
  availableLanguages, 
  selectedLanguage, 
  onLanguageSelect, 
  isVisible, 
  onClose,
  currentLanguage 
}) => {
  const translations = {
    en: {
      selectLanguage: 'Choose your language',
      currency: 'Currency',
      numberFormat: 'Number format',
      dateFormat: 'Date format',
      close: 'Close'
    },
    fr: {
      selectLanguage: 'Choisissez votre langue',
      currency: 'Devise',
      numberFormat: 'Format numérique',
      dateFormat: 'Format de date',
      close: 'Fermer'
    },
    ar: {
      selectLanguage: 'اختر لغتك',
      currency: 'العملة',
      numberFormat: 'تنسيق الأرقام',
      dateFormat: 'تنسيق التاريخ',
      close: 'إغلاق'
    },
    sw: {
      selectLanguage: 'Chagua lugha yako',
      currency: 'Sarafu',
      numberFormat: 'Muundo wa nambari',
      dateFormat: 'Muundo wa tarehe',
      close: 'Funga'
    },
    am: {
      selectLanguage: 'ቋንቋዎን ይምረጡ',
      currency: 'ምንዛሪ',
      numberFormat: 'የቁጥር ቅርጸት',
      dateFormat: 'የቀን ቅርጸት',
      close: 'ዝጋ'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const getLocalizationPreview = (langCode) => {
    const previews = {
      en: { currency: 'USD $', number: '1,234.56', date: '12/07/2025' },
      fr: { currency: 'EUR €', number: '1 234,56', date: '12/07/2025' },
      ar: { currency: 'SAR ر.س', number: '١٬٢٣٤٫٥٦', date: '٢٠٢٥/٠٧/١٢' },
      sw: { currency: 'KES KSh', number: '1,234.56', date: '12/07/2025' },
      am: { currency: 'ETB ብር', number: '1,234.56', date: '12/07/2025' }
    };
    return previews[langCode] || previews.en;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={`relative w-full md:w-96 bg-card border border-border rounded-t-2xl md:rounded-2xl shadow-modal max-h-[80vh] overflow-hidden ${
        currentLanguage === 'ar' ? 'text-right' : 'text-left'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-heading font-semibold text-foreground">
            {t.selectLanguage}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        {/* Language Options */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {availableLanguages.map((language) => {
            const preview = getLocalizationPreview(language.code);
            return (
              <button
                key={language.code}
                onClick={() => onLanguageSelect(language.code)}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 touch-target ${
                  selectedLanguage === language.code
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                } ${currentLanguage === 'ar' ? 'text-right' : 'text-left'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{language.flag}</span>
                    <div>
                      <span className="font-body font-medium text-foreground block">
                        {language.name}
                      </span>
                      <span className="font-caption text-sm text-muted-foreground">
                        {language.nativeName}
                      </span>
                    </div>
                  </div>
                  {selectedLanguage === language.code && (
                    <Icon name="Check" size={20} className="text-primary" />
                  )}
                </div>

                {/* Localization Preview */}
                <div className="mt-3 pt-3 border-t border-border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-caption text-muted-foreground">{t.currency}:</span>
                    <span className="font-mono text-foreground">{preview.currency}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-caption text-muted-foreground">{t.numberFormat}:</span>
                    <span className="font-mono text-foreground">{preview.number}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-caption text-muted-foreground">{t.dateFormat}:</span>
                    <span className="font-mono text-foreground">{preview.date}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;