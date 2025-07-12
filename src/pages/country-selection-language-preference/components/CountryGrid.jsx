import React from 'react';
import Icon from '../../../components/AppIcon';

const CountryGrid = ({ countries, selectedCountry, onCountrySelect, language }) => {
  const translations = {
    en: {
      selectCountry: 'Select your country',
      supportedLanguages: 'Supported languages'
    },
    fr: {
      selectCountry: 'Sélectionnez votre pays',
      supportedLanguages: 'Langues prises en charge'
    },
    ar: {
      selectCountry: 'اختر بلدك',
      supportedLanguages: 'اللغات المدعومة'
    },
    sw: {
      selectCountry: 'Chagua nchi yako',
      supportedLanguages: 'Lugha zinazotumika'
    },
    am: {
      selectCountry: 'ሀገርዎን ይምረጡ',
      supportedLanguages: 'የሚደገፉ ቋንቋዎች'
    }
  };

  const t = translations[language] || translations.en;

  return (
    <div className="w-full">
      <h2 className="text-xl font-heading font-semibold text-foreground mb-6 text-center">
        {t.selectCountry}
      </h2>
      
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-h-80 overflow-y-auto">
        {countries.map((country) => (
          <button
            key={country.code}
            onClick={() => onCountrySelect(country)}
            className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 touch-target hover:shadow-card ${
              selectedCountry?.code === country.code
                ? 'border-primary bg-primary/5 shadow-card'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
          >
            <div className="w-12 h-8 mb-2 rounded overflow-hidden flex items-center justify-center bg-muted">
              <span className="text-2xl">{country.flag}</span>
            </div>
            <span className="font-body text-sm font-medium text-center text-foreground mb-1">
              {country.name}
            </span>
            <div className="flex flex-wrap justify-center gap-1">
              {country.languages.map((lang, index) => (
                <span
                  key={lang}
                  className="text-xs font-caption text-muted-foreground"
                >
                  {lang}{index < country.languages.length - 1 && ','}
                </span>
              ))}
            </div>
            {selectedCountry?.code === country.code && (
              <Icon name="Check" size={16} className="text-primary mt-1" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CountryGrid;