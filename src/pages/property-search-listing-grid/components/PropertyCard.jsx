import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import AppImage from '../../../components/AppImage';
import VerifiedBadge from '../../../components/VerifiedBadge';

// Language Context
const LanguageContext = React.createContext({
  language: 'en'
});

const PropertyCard = ({ property, onToggleFavorite }) => {
  const { language } = useContext(LanguageContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const translations = {
    en: {
      addToFavorites: 'Add to favorites',
      removeFromFavorites: 'Remove from favorites',
      share: 'Share property',
      verified: 'Verified',
      virtualTour: 'Virtual Tour',
      responsiveLandlord: 'Responsive Landlord',
      contactAgent: 'Contact Agent',
      viewDetails: 'View Details'
    },
    fr: {
      addToFavorites: 'Ajouter aux favoris',
      removeFromFavorites: 'Retirer des favoris',
      share: 'Partager la propriété',
      verified: 'Vérifié',
      virtualTour: 'Visite virtuelle',
      responsiveLandlord: 'Propriétaire réactif',
      contactAgent: 'Contacter l\'agent',
      viewDetails: 'Voir les détails'
    },
    ar: {
      addToFavorites: 'إضافة إلى المفضلة',
      removeFromFavorites: 'إزالة من المفضلة',
      share: 'مشاركة العقار',
      verified: 'موثق',
      virtualTour: 'جولة افتراضية',
      responsiveLandlord: 'مالك متجاوب',
      contactAgent: 'اتصل بالوكيل',
      viewDetails: 'عرض التفاصيل'
    },
    sw: {
      addToFavorites: 'Ongeza kwenye vipendwa',
      removeFromFavorites: 'Ondoa kwenye vipendwa',
      share: 'Shiriki mali',
      verified: 'Imethibitishwa',
      virtualTour: 'Ziara ya Kimtandao',
      responsiveLandlord: 'Mwenye Nyumba Mwepesi',
      contactAgent: 'Wasiliana na Wakala',
      viewDetails: 'Ona Maelezo'
    },
    am: {
      addToFavorites: 'ወደ ተወዳጆች ጨምር',
      removeFromFavorites: 'ከተወዳጆች አስወግድ',
      share: 'ንብረት አካፍል',
      verified: 'የተረጋገጠ',
      virtualTour: 'ምናባዊ ጉብኝት',
      responsiveLandlord: 'ፈጣን ቤት ባለቤት',
      contactAgent: 'ወኪል አነጋግር',
      viewDetails: 'ዝርዝሮች ይመልከቱ'
    }
  };

  const t = translations[language] || translations.en;

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite(property.id);
  };

  const handleShare = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href
      });
    }
  };

  return (
    <Link
      to={`/property-detail-view/${property.id}`}
      className="group block bg-card border border-border rounded-lg overflow-hidden shadow-card hover:shadow-modal transition-all duration-200 hover:-translate-y-1"
    >
      {/* Image Carousel */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <AppImage
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
              <Icon name="ChevronRight" size={16} />
            </Button>

            {/* Image Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Top Row Badges */}
        <div className="absolute top-3 left-3 flex items-center space-x-2">
          {/* Property Type Badge */}
          <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
            {property.propertyType}
          </span>
          
          {/* Virtual Tour Badge */}
          {property.virtualTour && (
            <span className="px-2 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center space-x-1">
              <Icon name="Video" size={12} />
              <span>{t.virtualTour}</span>
            </span>
          )}
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-3 right-3 flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFavoriteClick}
            className="bg-black/50 text-white hover:bg-black/70"
            aria-label={property.favorite ? t.removeFromFavorites : t.addToFavorites}
          >
            <Icon 
              name={property.favorite ? "Heart" : "Heart"} 
              size={16}
              className={property.favorite ? "fill-current text-red-500" : ""}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="bg-black/50 text-white hover:bg-black/70"
            aria-label={t.share}
          >
            <Icon name="Share" size={16} />
          </Button>
        </div>

        {/* Verification Badge */}
        {property.verified && (
          <div className="absolute bottom-3 left-3">
            <span className="px-2 py-1 bg-success text-success-foreground text-xs font-medium rounded-full flex items-center space-x-1">
              <Icon name="BadgeCheck" size={12} />
              <span>{t.verified}</span>
            </span>
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="p-4">
        {/* Price and Trust Score */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-heading font-bold text-foreground">
            {formatPrice(property.price, property.currency)}
          </h3>
          <div className="flex items-center space-x-1 px-2 py-1 bg-muted rounded-full">
            <Icon name="Star" size={14} className="text-accent fill-current" />
            <span className="text-sm font-medium">{property.trustScore}</span>
          </div>
        </div>

        {/* Title */}
        <h4 className="font-body font-semibold text-foreground mb-1 line-clamp-2">
          {property.title}
        </h4>

        {/* Location */}
        <p className="text-sm text-muted-foreground mb-3 flex items-center space-x-1">
          <Icon name="MapPin" size={14} />
          <span>{property.location}</span>
        </p>

        {/* Features */}
        <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
          {property.features?.map((feature, index) => (
            <span key={index} className="flex items-center space-x-1">
              <span>{feature}</span>
            </span>
          ))}
        </div>

        {/* Amenities */}
        {property.amenities?.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                +{property.amenities.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
            {/* Landlord Responsiveness */}
            {property.landlordResponsive && (
            <div className="flex items-center space-x-1 text-success text-sm mb-2">
                <Icon name="Clock" size={14} />
                <span>{t.responsiveLandlord}</span>
            </div>
            )}
            {property.landlord?.verification_status === 'approved' && <VerifiedBadge />}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-2 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle contact agent
            }}
          >
            <Icon name="MessageCircle" size={14} />
            <span className="ml-1">{t.contactAgent}</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            className="flex-1"
          >
            {t.viewDetails}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;