import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CountryGrid from './components/CountryGrid';
import LanguageSelector from './components/LanguageSelector';
import OnboardingHeader from './components/OnboardingHeader';
import ContinueButton from './components/ContinueButton';

// Language Context
const LanguageContext = React.createContext({
  language: 'en',
  setLanguage: () => {}
});

const CountrySelectionLanguagePreference = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useContext(LanguageContext);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(language || 'en');
  const [isLanguageSelectorVisible, setIsLanguageSelectorVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock countries data with African focus
  const countries = [
    {
      code: 'NG',
      name: 'Nigeria',
      flag: '🇳🇬',
      languages: ['English'],
      supportedLanguages: [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' }
      ],
      currency: 'NGN',
      region: 'West Africa'
    },
    {
      code: 'GH',
      name: 'Ghana',
      flag: '🇬🇭',
      languages: ['English'],
      supportedLanguages: [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' }
      ],
      currency: 'GHS',
      region: 'West Africa'
    },
    {
      code: 'KE',
      name: 'Kenya',
      flag: '🇰🇪',
      languages: ['English', 'Swahili'],
      supportedLanguages: [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
        { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇰🇪' }
      ],
      currency: 'KES',
      region: 'East Africa'
    },
    {
      code: 'ZA',
      name: 'South Africa',
      flag: '🇿🇦',
      languages: ['English'],
      supportedLanguages: [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' }
      ],
      currency: 'ZAR',
      region: 'Southern Africa'
    },
    {
      code: 'MA',
      name: 'Morocco',
      flag: '🇲🇦',
      languages: ['Arabic', 'French'],
      supportedLanguages: [
        { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' }
      ],
      currency: 'MAD',
      region: 'North Africa'
    },
    {
      code: 'EG',
      name: 'Egypt',
      flag: '🇪🇬',
      languages: ['Arabic'],
      supportedLanguages: [
        { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' }
      ],
      currency: 'EGP',
      region: 'North Africa'
    },
    {
      code: 'TZ',
      name: 'Tanzania',
      flag: '🇹🇿',
      languages: ['English', 'Swahili'],
      supportedLanguages: [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
        { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇹🇿' }
      ],
      currency: 'TZS',
      region: 'East Africa'
    },
    {
      code: 'UG',
      name: 'Uganda',
      flag: '🇺🇬',
      languages: ['English', 'Swahili'],
      supportedLanguages: [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
        { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇺🇬' }
      ],
      currency: 'UGX',
      region: 'East Africa'
    },
    {
      code: 'CI',
      name: 'Côte d\'Ivoire',
      flag: '🇨🇮',
      languages: ['French'],
      supportedLanguages: [
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' }
      ],
      currency: 'XOF',
      region: 'West Africa'
    },
    {
      code: 'ET',
      name: 'Ethiopia',
      flag: '🇪🇹',
      languages: ['Amharic', 'English'],
      supportedLanguages: [
        { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹' },
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' }
      ],
      currency: 'ETB',
      region: 'East Africa'
    },
    {
      code: 'RW',
      name: 'Rwanda',
      flag: '🇷🇼',
      languages: ['English', 'French'],
      supportedLanguages: [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' }
      ],
      currency: 'RWF',
      region: 'East Africa'
    },
    {
      code: 'SN',
      name: 'Senegal',
      flag: '🇸🇳',
      languages: ['French'],
      supportedLanguages: [
        { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' }
      ],
      currency: 'XOF',
      region: 'West Africa'
    }
  ];

  // Load saved preferences on mount
  useEffect(() => {
    const savedCountry = localStorage.getItem('zimba-selected-country');
    const savedLanguage = localStorage.getItem('zimba-language');
    
    if (savedCountry) {
      const country = countries.find(c => c.code === savedCountry);
      if (country) {
        setSelectedCountry(country);
      }
    }
    
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    localStorage.setItem('zimba-selected-country', country.code);
    
    // Auto-open language selector if country has multiple languages
    if (country.supportedLanguages.length > 1) {
      setIsLanguageSelectorVisible(true);
    } else {
      // Auto-select the only available language
      const onlyLanguage = country.supportedLanguages[0];
      setSelectedLanguage(onlyLanguage.code);
      setLanguage(onlyLanguage.code);
      localStorage.setItem('zimba-language', onlyLanguage.code);
    }
  };

  const handleLanguageSelect = (languageCode) => {
    setSelectedLanguage(languageCode);
    setLanguage(languageCode);
    localStorage.setItem('zimba-language', languageCode);
    setIsLanguageSelectorVisible(false);
  };

  const handleContinue = async () => {
    if (!selectedCountry || !selectedLanguage) return;
    
    setIsLoading(true);
    
    try {
      // Save final selections
      localStorage.setItem('zimba-onboarding-country', selectedCountry.code);
      localStorage.setItem('zimba-onboarding-language', selectedLanguage);
      localStorage.setItem('zimba-onboarding-step', '1');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to next step
      navigate('/user-registration-authentication');
    } catch (error) {
      console.error('Error saving preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isSelectionComplete = selectedCountry && selectedLanguage;
  const availableLanguages = selectedCountry?.supportedLanguages || [];

  return (
    <div className={`min-h-screen bg-background ${selectedLanguage === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <OnboardingHeader language={selectedLanguage} />

          {/* Main Content Card */}
          <div className="bg-card border border-border rounded-2xl shadow-card p-6 md:p-8 mb-8">
            {/* Country Selection */}
            <CountryGrid
              countries={countries}
              selectedCountry={selectedCountry}
              onCountrySelect={handleCountrySelect}
              language={selectedLanguage}
            />

            {/* Selected Country Info */}
            {selectedCountry && (
              <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{selectedCountry.flag}</span>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">
                        {selectedCountry.name}
                      </h3>
                      <p className="font-caption text-sm text-muted-foreground">
                        {selectedCountry.region} • {selectedCountry.currency}
                      </p>
                    </div>
                  </div>
                  
                  {availableLanguages.length > 1 && (
                    <button
                      onClick={() => setIsLanguageSelectorVisible(true)}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200 touch-target"
                    >
                      <span className="font-body text-sm font-medium">
                        {availableLanguages.find(l => l.code === selectedLanguage)?.name || 'Select Language'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Continue Button */}
          <div className="max-w-md mx-auto">
            <ContinueButton
              isEnabled={isSelectionComplete}
              onContinue={handleContinue}
              language={selectedLanguage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Language Selector Modal */}
      <LanguageSelector
        availableLanguages={availableLanguages}
        selectedLanguage={selectedLanguage}
        onLanguageSelect={handleLanguageSelect}
        isVisible={isLanguageSelectorVisible}
        onClose={() => setIsLanguageSelectorVisible(false)}
        currentLanguage={selectedLanguage}
      />
    </div>
  );
};

export default CountrySelectionLanguagePreference;