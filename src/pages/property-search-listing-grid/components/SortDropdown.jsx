import React, { useState, useContext } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

// Language Context
const LanguageContext = React.createContext({
  language: 'en'
});

const SortDropdown = ({ value, onChange }) => {
  const { language } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);

  const translations = {
    en: {
      sortBy: 'Sort by',
      relevance: 'Relevance',
      priceLow: 'Price: Low to High',
      priceHigh: 'Price: High to Low',
      newest: 'Newest First',
      trustScore: 'Highest TrustScore'
    },
    fr: {
      sortBy: 'Trier par',
      relevance: 'Pertinence',
      priceLow: 'Prix: Croissant',
      priceHigh: 'Prix: Décroissant',
      newest: 'Plus récent',
      trustScore: 'Meilleur TrustScore'
    },
    ar: {
      sortBy: 'ترتيب حسب',
      relevance: 'الصلة',
      priceLow: 'السعر: من المنخفض إلى المرتفع',
      priceHigh: 'السعر: من المرتفع إلى المنخفض',
      newest: 'الأحدث أولاً',
      trustScore: 'أعلى نقاط ثقة'
    },
    sw: {
      sortBy: 'Panga kwa',
      relevance: 'Umuhimu',
      priceLow: 'Bei: Chini hadi Juu',
      priceHigh: 'Bei: Juu hadi Chini',
      newest: 'Mpya Zaidi Kwanza',
      trustScore: 'Alama za Juu za Kuaminiwa'
    },
    am: {
      sortBy: 'መደብ በ',
      relevance: 'ተዛማጅነት',
      priceLow: 'ዋጋ: ዝቅተኛ ወደ ከፍተኛ',
      priceHigh: 'ዋጋ: ከፍተኛ ወደ ዝቅተኛ',
      newest: 'አዲስ መጀመሪያ',
      trustScore: 'ከፍተኛ የመተማመን ነጥብ'
    }
  };

  const t = translations[language] || translations.en;

  const sortOptions = [
    { value: 'relevance', label: t.relevance },
    { value: 'price-low', label: t.priceLow },
    { value: 'price-high', label: t.priceHigh },
    { value: 'newest', label: t.newest },
    { value: 'trustscore', label: t.trustScore }
  ];

  const currentOption = sortOptions.find(option => option.value === value);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <Icon name="ArrowUpDown" size={16} />
        <span>{t.sortBy}</span>
        <span className="hidden sm:inline text-muted-foreground">•</span>
        <span className="hidden sm:inline">{currentOption?.label}</span>
        <Icon name="ChevronDown" size={16} />
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-modal z-50">
            <div className="py-2">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-muted transition-colors duration-200 ${
                    value === option.value ? 'bg-muted text-primary' : 'text-foreground'
                  }`}
                >
                  <span className="font-body">{option.label}</span>
                  {value === option.value && (
                    <Icon name="Check" size={16} className="ml-auto text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SortDropdown;