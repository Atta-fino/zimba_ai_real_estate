import React, { useContext } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

// Language Context
const LanguageContext = React.createContext({
  language: 'en'
});

const MapToggle = ({ viewMode, onChange }) => {
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      map: 'Map',
      grid: 'Grid'
    },
    fr: {
      map: 'Carte',
      grid: 'Grille'
    },
    ar: {
      map: 'خريطة',
      grid: 'شبكة'
    },
    sw: {
      map: 'Ramani',
      grid: 'Gridi'
    },
    am: {
      map: 'ካርታ',
      grid: 'ፍርግርግ'
    }
  };

  const t = translations[language] || translations.en;

  return (
    <div className="flex items-center bg-muted rounded-lg p-1">
      <Button
        variant={viewMode === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('grid')}
        className="flex items-center space-x-1"
      >
        <Icon name="Grid3X3" size={16} />
        <span className="hidden sm:inline">{t.grid}</span>
      </Button>
      <Button
        variant={viewMode === 'map' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onChange('map')}
        className="flex items-center space-x-1"
      >
        <Icon name="Map" size={16} />
        <span className="hidden sm:inline">{t.map}</span>
      </Button>
    </div>
  );
};

export default MapToggle;