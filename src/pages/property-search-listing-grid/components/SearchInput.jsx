import React, { useState, useContext } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

// Language Context
const LanguageContext = React.createContext({
  language: 'en'
});

const SearchInput = ({ value, onChange, placeholder }) => {
  const { language } = useContext(LanguageContext);
  const [isFocused, setIsFocused] = useState(false);

  const translations = {
    en: {
      clear: 'Clear search',
      search: 'Search'
    },
    fr: {
      clear: 'Effacer la recherche',
      search: 'Rechercher'
    },
    ar: {
      clear: 'مسح البحث',
      search: 'بحث'
    },
    sw: {
      clear: 'Futa utafutaji',
      search: 'Tafuta'
    },
    am: {
      clear: 'ፍለጋ አጽዳ',
      search: 'ፈልግ'
    }
  };

  const t = translations[language] || translations.en;

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative">
      <div className={`relative flex items-center transition-all duration-200 ${
        isFocused ? 'ring-2 ring-ring' : ''
      }`}>
        <div className="absolute left-3 z-10">
          <Icon name="Search" size={20} className="text-muted-foreground" />
        </div>
        
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full h-12 pl-10 pr-12 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
        />
        
        {value && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-2 h-8 w-8 hover:bg-muted"
            aria-label={t.clear}
          >
            <Icon name="X" size={16} />
          </Button>
        )}
      </div>

      {/* Voice Search Button (for future enhancement) */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-muted"
        style={{ display: value ? 'none' : 'flex' }}
      >
        <Icon name="Mic" size={16} className="text-muted-foreground" />
      </Button>
    </div>
  );
};

export default SearchInput;