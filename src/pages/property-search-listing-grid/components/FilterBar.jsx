import React, { useState, useContext } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

// Language Context
const LanguageContext = React.createContext({
  language: 'en'
});

const FilterBar = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const { language } = useContext(LanguageContext);
  const [tempFilters, setTempFilters] = useState(filters);

  const translations = {
    en: {
      filters: 'Filters',
      propertyType: 'Property Type',
      priceRange: 'Price Range',
      location: 'Location',
      amenities: 'Amenities',
      trustScore: 'Minimum TrustScore',
      from: 'From',
      to: 'To',
      apply: 'Apply Filters',
      clear: 'Clear All',
      close: 'Close',
      any: 'Any location'
    },
    fr: {
      filters: 'Filtres',
      propertyType: 'Type de propriété',
      priceRange: 'Gamme de prix',
      location: 'Emplacement',
      amenities: 'Commodités',
      trustScore: 'TrustScore minimum',
      from: 'De',
      to: 'À',
      apply: 'Appliquer les filtres',
      clear: 'Tout effacer',
      close: 'Fermer',
      any: 'N\'importe quel endroit'
    },
    ar: {
      filters: 'المرشحات',
      propertyType: 'نوع العقار',
      priceRange: 'نطاق السعر',
      location: 'الموقع',
      amenities: 'وسائل الراحة',
      trustScore: 'الحد الأدنى لنقاط الثقة',
      from: 'من',
      to: 'إلى',
      apply: 'تطبيق المرشحات',
      clear: 'مسح الكل',
      close: 'إغلاق',
      any: 'أي موقع'
    },
    sw: {
      filters: 'Vichujio',
      propertyType: 'Aina ya Mali',
      priceRange: 'Kiwango cha Bei',
      location: 'Mahali',
      amenities: 'Vifaa',
      trustScore: 'Kiwango cha chini cha Kuaminiwa',
      from: 'Kutoka',
      to: 'Hadi',
      apply: 'Tumia Vichujio',
      clear: 'Futa Yote',
      close: 'Funga',
      any: 'Mahali popote'
    },
    am: {
      filters: 'ማጣሪያዎች',
      propertyType: 'የንብረት አይነት',
      priceRange: 'የዋጋ ክልል',
      location: 'መገኛ ቦታ',
      amenities: 'አገልግሎቶች',
      trustScore: 'ዝቅተኛ የመተማመን ነጥብ',
      from: 'ከ',
      to: 'እስከ',
      apply: 'ማጣሪያዎች ተግብር',
      clear: 'ሁሉንም አጽዳ',
      close: 'ዝጋ',
      any: 'ማንኛውም ቦታ'
    }
  };

  const t = translations[language] || translations.en;

  const propertyTypes = [
  'Hostels',
  'Self-Contain',
  'Apartments',
  'Townhouse',
  'Compound',
  'Office',
  'Stall'];


  const amenitiesList = [
  'Parking',
  'Security',
  'Swimming Pool',
  'WiFi',
  'Kitchen',
  'AC',
  'Gym',
  'Elevator',
  'Balcony',
  'Garden'];


  const handlePropertyTypeChange = (type, checked) => {
    const newTypes = checked ?
    [...tempFilters.propertyTypes, type] :
    tempFilters.propertyTypes.filter((t) => t !== type);

    setTempFilters((prev) => ({
      ...prev,
      propertyTypes: newTypes
    }));
  };

  const handleAmenityChange = (amenity, checked) => {
    const newAmenities = checked ?
    [...tempFilters.amenities, amenity] :
    tempFilters.amenities.filter((a) => a !== amenity);

    setTempFilters((prev) => ({
      ...prev,
      amenities: newAmenities
    }));
  };

  const handlePriceRangeChange = (field, value) => {
    setTempFilters((prev) => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [field]: value
      }
    }));
  };

  const handleTrustScoreChange = (value) => {
    setTempFilters((prev) => ({
      ...prev,
      trustScoreMin: parseFloat(value) || 0
    }));
  };

  const applyFilters = () => {
    onFiltersChange(tempFilters);
    onClose();
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      propertyTypes: [],
      priceRange: { min: '', max: '' },
      location: '',
      amenities: [],
      trustScoreMin: 0
    };
    setTempFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Slide-up Panel */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-50 bg-card border-t border-border rounded-t-2xl animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-heading font-semibold">{t.filters}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>
        
        <div className="max-h-96 overflow-y-auto p-4 space-y-6">
          <FilterContent
            t={t}
            tempFilters={tempFilters}
              setTempFilters={setTempFilters}
            propertyTypes={propertyTypes}
            amenitiesList={amenitiesList}
            handlePropertyTypeChange={handlePropertyTypeChange}
            handleAmenityChange={handleAmenityChange}
            handlePriceRangeChange={handlePriceRangeChange}
            handleTrustScoreChange={handleTrustScoreChange} />

        </div>
        
        <div className="flex items-center space-x-3 p-4 border-t border-border">
          <Button variant="outline" onClick={clearAllFilters} className="flex-1">
            {t.clear}
          </Button>
          <Button onClick={applyFilters} className="flex-1">
            {t.apply}
          </Button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-24 bottom-0 w-80 bg-card border-r border-border z-40 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-semibold">{t.filters}</h2>
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              {t.clear}
            </Button>
          </div>
          
          <div className="space-y-8">
            <FilterContent
              t={t}
              tempFilters={tempFilters}
              setTempFilters={setTempFilters}
              propertyTypes={propertyTypes}
              amenitiesList={amenitiesList}
              handlePropertyTypeChange={handlePropertyTypeChange}
              handleAmenityChange={handleAmenityChange}
              handlePriceRangeChange={handlePriceRangeChange}
              handleTrustScoreChange={handleTrustScoreChange} />

          </div>
          
          <div className="mt-8">
            <Button onClick={applyFilters} className="w-full">
              {t.apply}
            </Button>
          </div>
        </div>
      </div>
    </>);

};

const FilterContent = ({
  t,
  tempFilters,
  propertyTypes,
  amenitiesList,
  handlePropertyTypeChange,
  handleAmenityChange,
  handlePriceRangeChange,
  handleTrustScoreChange, setTempFilters
}) =>
<>
    {/* Property Type */}
    <div>
      <h3 className="font-heading font-medium mb-3">{t.propertyType}</h3>
      <div className="space-y-2">
        {propertyTypes.map((type) =>
      <Checkbox
        key={type}
        id={`property-${type}`}
        checked={tempFilters.propertyTypes.includes(type)}
        onCheckedChange={(checked) => handlePropertyTypeChange(type, checked)}
        label={type} />

      )}
      </div>
    </div>

    {/* Price Range */}
    <div>
      <h3 className="font-heading font-medium mb-3">{t.priceRange}</h3>
      <div className="flex items-center space-x-3">
        <Input
        type="number"
        placeholder={t.from}
        value={tempFilters.priceRange.min}
        onChange={(e) => handlePriceRangeChange('min', e.target.value)}
        className="flex-1" />

        <span className="text-muted-foreground">-</span>
        <Input
        type="number"
        placeholder={t.to}
        value={tempFilters.priceRange.max}
        onChange={(e) => handlePriceRangeChange('max', e.target.value)}
        className="flex-1" />

      </div>
    </div>

    {/* Location */}
    <div>
      <h3 className="font-heading font-medium mb-3">{t.location}</h3>
      <Input
      type="text"
      placeholder={t.any}
      value={tempFilters.location}
      onChange={(e) => setTempFilters((prev) => ({ ...prev, location: e.target.value }))} />

    </div>

    {/* Amenities */}
    <div>
      <h3 className="font-heading font-medium mb-3">{t.amenities}</h3>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {amenitiesList.map((amenity) =>
      <Checkbox
        key={amenity}
        id={`amenity-${amenity}`}
        checked={tempFilters.amenities.includes(amenity)}
        onCheckedChange={(checked) => handleAmenityChange(amenity, checked)}
        label={amenity} />

      )}
      </div>
    </div>

    {/* Trust Score */}
    <div>
      <h3 className="font-heading font-medium mb-3">{t.trustScore}</h3>
      <Input
      type="range"
      min="0"
      max="5"
      step="0.1"
      value={tempFilters.trustScoreMin}
      onChange={(e) => handleTrustScoreChange(e.target.value)}
      className="w-full" />

      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
        <span>0.0</span>
        <span className="font-medium text-foreground">{tempFilters.trustScoreMin.toFixed(1)}</span>
        <span>5.0</span>
      </div>
    </div>
  </>;


export default FilterBar;