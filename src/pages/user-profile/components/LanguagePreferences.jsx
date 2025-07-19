import React, { useState, useEffect } from 'react';
import Select from '../../../components/ui/Select'; // Assuming Select component exists and follows a standard pattern
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

// Mock current user language - this would typically come from a context or API
const mockCurrentUserLanguage = 'en'; // Default language_code

const supportedLanguages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français (French)', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية (Arabic)', flag: '🇸🇦' },
  { code: 'sw', name: 'Kiswahili (Swahili)', flag: '🇸🇼' },
  { code: 'am', name: 'አማርኛ (Amharic)', flag: '🇦🇲' },
];
// Note: The Swahili flag 🇸🇼 is a generic one, specific country flags like 🇰🇪 🇹🇿 🇺🇬 could be used if region is also selected.
// For Arabic 🇸🇦 is used as a common representation, though it's specific to Saudi Arabia.

const LanguagePreferences = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(mockCurrentUserLanguage);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setSelectedLanguage(mockCurrentUserLanguage);
  }, []);

  const handleLanguageChange = (value) => {
    // The Select component is assumed to pass the value directly.
    // If it passes an event, it would be e.target.value
    setSelectedLanguage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    console.log('Saving language preference:', selectedLanguage);
    // Simulate API call to update user.language_code
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Update mock current user language
    // In a real app: mockCurrentUser.language_code = selectedLanguage;
    // For this component's state:
    mockCurrentUserLanguage = selectedLanguage; // This global mock update is illustrative

    setIsLoading(false);
    setIsSuccess(true);
    // Optionally, trigger a page reload or context update to apply language changes globally
    setTimeout(() => setIsSuccess(false), 3000);
    // Consider showing a message "Please refresh for changes to take full effect" if needed
  };

  // The Select component structure might vary. Assuming it takes an array of options.
  // And its onChange provides the value directly.
  // The value for Select's option would be `language.code`.
  // The label could be `language.flag + " " + language.name`.

  return (
    <div className="p-6 md:p-8 bg-card rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold font-heading mb-6 text-foreground">Language & Region Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="languageSelect" className="block text-sm font-medium text-muted-foreground mb-1">Preferred Language</label>
          <p className="text-xs text-muted-foreground mb-3">
            Choose the language you'd like to experience Zimba in.
          </p>
          <Select
            id="languageSelect"
            value={selectedLanguage}
            onValueChange={handleLanguageChange} // Assuming onValueChange for Radix-like Select
            // If it's a standard <select>, it would be onChange={e => handleLanguageChange(e.target.value)}
            className="w-full md:max-w-md"
          >
            {/* This part depends on how src/components/ui/Select is implemented.
                It might expect <Select.Item> children or an options prop.
                Assuming it takes Radix-like Select.Item or similar.
                For a simple HTML select, it would be <option> tags.
            */}
            {supportedLanguages.map(lang => (
              // This is a placeholder for how options might be rendered.
              // Adjust according to your actual Select component.
              // If using a simple <select>:
              // <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>
              // If using a custom component that takes options array:
              // options={supportedLanguages.map(l => ({ value: l.code, label: `${l.flag} ${l.name}` }))}
              // For now, I'll assume a structure that might be used with ShadCN/Radix:
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </Select>
           {/* Fallback rendering if the Select component needs explicit options prop */}
           {/* <select
              id="languageSelect"
              value={selectedLanguage}
              onChange={e => handleLanguageChange(e.target.value)}
              className="mt-1 block w-full md:max-w-md pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
            >
            {supportedLanguages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>
            ))}
          </select> */}

        </div>

        {/* Placeholder for Region/Country - Future Enhancement */}
        <div className="pt-4 border-t border-border">
            <label className="block text-sm font-medium text-muted-foreground mb-1">Country (Display Only)</label>
            <p className="text-xs text-muted-foreground mb-2">
                Your registered country. This affects local laws and content display.
            </p>
            <Input
                type="text"
                value={"Nigeria 🇳🇬 (mocked)"} // This would come from user.country
                className="w-full md:max-w-md bg-muted/50 cursor-not-allowed"
                readOnly
                disabled
            />
            <p className="text-xs text-muted-foreground mt-1">Country selection is typically done at signup.</p>
        </div>


        <div className="flex items-center space-x-4 pt-4">
          <Button type="submit" disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <Icon name="LoaderCircle" size={18} className="animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Icon name="Save" size={18} className="mr-2" />
                Save Preferences
              </>
            )}
          </Button>
          {isSuccess && (
            <div className="flex items-center text-success">
              <Icon name="CheckCircle" size={20} className="mr-2" />
              <span>Language preference saved!</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default LanguagePreferences;
