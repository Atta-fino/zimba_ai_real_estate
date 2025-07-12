import React, { useContext } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

// Language Context
const LanguageContext = React.createContext({
  language: 'en'
});

const EmptyState = ({ title, description, onClearFilters }) => {
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      clearFilters: 'Clear Filters',
      searchTips: 'Search Tips:',
      tip1: 'Try using different keywords',
      tip2: 'Remove some filters to see more results',
      tip3: 'Check your spelling and try again'
    },
    fr: {
      clearFilters: 'Effacer les filtres',
      searchTips: 'Conseils de recherche:',
      tip1: 'Essayez d\'utiliser des mots-clés différents',
      tip2: 'Supprimez certains filtres pour voir plus de résultats',
      tip3: 'Vérifiez votre orthographe et réessayez'
    },
    ar: {
      clearFilters: 'مسح المرشحات',
      searchTips: 'نصائح البحث:',
      tip1: 'جرب استخدام كلمات مفتاحية مختلفة',
      tip2: 'قم بإزالة بعض المرشحات لرؤية المزيد من النتائج',
      tip3: 'تحقق من الإملاء وحاول مرة أخرى'
    },
    sw: {
      clearFilters: 'Futa Vichujio',
      searchTips: 'Vidokezo vya Utafutaji:',
      tip1: 'Jaribu kutumia maneno tofauti',
      tip2: 'Ondoa baadhi ya vichujio kuona matokeo zaidi',
      tip3: 'Angalia tahajia yako na ujaribu tena'
    },
    am: {
      clearFilters: 'ማጣሪያዎችን አጽዳ',
      searchTips: 'የፍለጋ ምክሮች:',
      tip1: 'የተለያዩ ቁልፍ ቃላትን መጠቀም ይሞክሩ',
      tip2: 'ተጨማሪ ውጤቶችን ለማየት አንዳንድ ማጣሪያዎችን ያስወግዱ',
      tip3: 'ፊደላቸውን ያረጋግጡ እና እንደገና ይሞክሩ'
    }
  };

  const t = translations[language] || translations.en;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Empty State Icon */}
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="Home" size={40} className="text-muted-foreground" />
      </div>
      
      {/* Title */}
      <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
        {title}
      </h2>
      
      {/* Description */}
      <p className="text-muted-foreground mb-6 max-w-md">
        {description}
      </p>
      
      {/* Clear Filters Button */}
      {onClearFilters && (
        <Button
          onClick={onClearFilters}
          variant="default"
          className="mb-8"
        >
          <Icon name="RotateCcw" size={16} />
          <span className="ml-2">{t.clearFilters}</span>
        </Button>
      )}
      
      {/* Search Tips */}
      <div className="bg-muted rounded-lg p-6 max-w-md">
        <h3 className="font-heading font-semibold text-foreground mb-3">
          {t.searchTips}
        </h3>
        <ul className="text-left text-sm text-muted-foreground space-y-2">
          <li className="flex items-start space-x-2">
            <Icon name="ChevronRight" size={16} className="mt-0.5 flex-shrink-0" />
            <span>{t.tip1}</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="ChevronRight" size={16} className="mt-0.5 flex-shrink-0" />
            <span>{t.tip2}</span>
          </li>
          <li className="flex items-start space-x-2">
            <Icon name="ChevronRight" size={16} className="mt-0.5 flex-shrink-0" />
            <span>{t.tip3}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EmptyState;