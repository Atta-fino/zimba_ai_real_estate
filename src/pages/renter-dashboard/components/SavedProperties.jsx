import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import AppImage from '../../../components/AppImage';
import { Link } from 'react-router-dom';
import { getPropertyTypeDisplay } from '../../../utils/enums'; // If needed for type display

// Mock Saved Properties Data
const mockSavedPropertiesData = [
  {
    id: 'prop1',
    title: 'Spacious 3-Bedroom Apartment in Lekki',
    location: 'Lekki Phase 1, Lagos',
    price: 5000000,
    currency: 'NGN',
    propertyType: 'apartment',
    images: ['/assets/images/stock/apartment_1_a.jpg'],
    bedrooms: 3,
    bathrooms: 2,
    trustScore: 4.9, // Example
  },
  {
    id: 'propX', // A property not in other mocks, to show variety
    title: 'Charming Townhouse with Garden View',
    location: 'Ikoyi, Lagos',
    price: 12000000,
    currency: 'NGN',
    propertyType: 'townhouse',
    images: ['/assets/images/stock/townhouse_1_a.jpg'],
    bedrooms: 4,
    bathrooms: 3,
    trustScore: 4.7,
  },
];

const SavedPropertyCard = ({ property, onUnsave }) => {
  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency || 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl flex flex-col">
      <Link to={`/property-detail-view/${property.id}`} className="block">
        <AppImage
          src={property.images[0] || '/assets/images/no_image.png'}
          alt={property.title}
          className="w-full h-48 object-cover"
          fallbackSrc="/assets/images/no_image.png"
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/property-detail-view/${property.id}`} className="hover:underline">
            <h3 className="text-md font-semibold text-foreground mb-1 line-clamp-2">{property.title}</h3>
        </Link>
        <p className="text-xs text-muted-foreground mb-1 flex items-center">
          <Icon name="MapPin" size={12} className="mr-1" /> {property.location}
        </p>
        <p className="text-sm text-muted-foreground mb-2">
          {getPropertyTypeDisplay(property.propertyType)}
          {property.bedrooms ? ` • ${property.bedrooms} bed(s)` : ''}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2">
            <span className="text-lg font-bold text-primary">{formatPrice(property.price, property.currency)}</span>
             {property.trustScore && (
                <span className="flex items-center text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                    <Icon name="Star" size={12} className="mr-1 fill-current"/> {property.trustScore} Trust
                </span>
            )}
        </div>
         <Button onClick={() => onUnsave(property.id)} variant="destructive_outline" size="sm" className="w-full mt-3">
            <Icon name="HeartOff" size={14} className="mr-1.5" /> Unsave Property
        </Button>
      </div>
    </div>
  );
};


const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState(mockSavedPropertiesData);

  const handleUnsaveProperty = (propertyId) => {
    console.log(`Unsaving property ${propertyId}`);
    setSavedProperties(prev => prev.filter(p => p.id !== propertyId));
    // In a real app, also call API to update backend
    alert(`Property ${propertyId} removed from your saved list! (This is a simulation)`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold font-heading text-foreground">My Saved Properties ({savedProperties.length})</h2>
      </div>

      {savedProperties.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg shadow">
          <Icon name="HeartCrack" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Saved Properties Yet</h3>
          <p className="text-muted-foreground mb-4">Start exploring and save properties you love to find them here easily.</p>
          <Link to="/property-search-listing-grid">
            <Button variant="default">
              <Icon name="Search" size={16} className="mr-2" />
              Explore Properties
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {savedProperties.map(property => (
            <SavedPropertyCard
              key={property.id}
              property={property}
              onUnsave={handleUnsaveProperty}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedProperties;
