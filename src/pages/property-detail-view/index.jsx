import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AppImage from '../../components/AppImage';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';

// Mock property data - in a real app, this would be fetched from an API
const mockProperties = [
  {
    id: 1,
    title: 'Modern 2-Bedroom Apartment',
    price: 850000,
    currency: 'NGN',
    location: 'Victoria Island, Lagos',
    propertyType: 'Apartments',
    images: ['/assets/images/no_image.png', '/assets/images/no_image.png', '/assets/images/no_image.png'],
    trustScore: 4.8,
    verified: true,
    features: ['2 Beds', '2 Baths', '85 sqm'],
    amenities: ['Parking', 'Security', 'Swimming Pool', 'WiFi', 'Kitchen', 'AC'],
    landlordResponsive: true,
    virtualTour: true,
    favorite: false,
    description: 'A stunning and spacious 2-bedroom apartment in the heart of Victoria Island. This modern home offers a luxurious living experience with top-notch amenities and excellent security. The open-plan living area is perfect for entertaining guests, and the large windows provide breathtaking city views.',
    landlord: {
      name: 'Mr. Adebayo',
      avatar: '/assets/images/no_image.png',
      rating: 4.9,
      reviews: 32,
    },
    escrowEnabled: true,
  },
  {
    id: 2,
    title: 'Luxury Self-Contain Studio',
    price: 450000,
    currency: 'NGN',
    location: 'Ikeja GRA, Lagos',
    propertyType: 'Self-Contain',
    images: ['/assets/images/no_image.png'],
    trustScore: 4.5,
    verified: true,
    features: ['1 Bed', '1 Bath', '45 sqm'],
    amenities: ['WiFi', 'Kitchen', 'AC'],
    landlordResponsive: false,
    virtualTour: false,
    favorite: true,
    description: 'This luxury self-contain studio in Ikeja GRA is perfect for a young professional or student. It comes fully furnished with modern appliances and offers a comfortable and convenient living space.',
    landlord: {
      name: 'Mrs. Okoro',
      avatar: '/assets/images/no_image.png',
      rating: 4.2,
      reviews: 12,
    },
    escrowEnabled: false,
  }
];

const LanguageContext = React.createContext({
  language: 'en'
});

const PropertyDetailView = () => {
  const { id } = useParams();
  const { language } = useContext(LanguageContext);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setLoading(true);
    const foundProperty = mockProperties.find(p => p.id.toString() === id);
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      setError('Property not found');
    }
    setLoading(false);
  }, [id]);

  const t = {
    en: {
      verified: 'Verified Property',
      verifiedDesc: 'This property has been verified by our team, ensuring the accuracy of the listing details.',
      highTrustScore: 'High Trust Score',
      highTrustScoreDesc: 'This score is based on factors like landlord responsiveness, tenant reviews, and payment history.',
      escrowProtection: 'Escrow Protection Available',
      escrowProtectionDesc: 'Secure your payment with our escrow service. We hold your funds until you\'ve confirmed your satisfaction.',
      initiateEscrow: 'Initiate Escrow',
      contactAgent: 'Contact Agent',
      share: 'Share',
      addToFavorites: 'Add to Favorites',
      removeFromFavorites: 'Remove from Favorites',
      description: 'Description',
      features: 'Features',
      amenities: 'Amenities',
      landlord: 'Landlord',
      reviews: 'reviews',
      virtualTour: 'Virtual Tour',
    },
  };

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen"><p>{error}</p></div>;
  }

  if (!property) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PrimaryTabNavigation />

      <main className="pt-16 md:pt-24 pb-20 md:pb-8">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          {/* Back to search link */}
          <Link to="/property-search-listing-grid" className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <Icon name="ArrowLeft" size={16} />
            <span>Back to search results</span>
          </Link>

          {/* Image Gallery */}
          <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mb-6">
            <AppImage src={property.images[currentImageIndex]} alt={property.title} className="w-full h-full object-cover" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold font-heading mb-2">{property.title}</h1>
              <div className="flex items-center space-x-2 text-muted-foreground mb-4">
                <Icon name="MapPin" size={16} />
                <span>{property.location}</span>
              </div>

              <div className="mb-6 pb-6 border-b border-border">
                <h2 className="text-xl font-semibold mb-3">{t.en.description}</h2>
                <p className="text-muted-foreground">{property.description}</p>
              </div>

              <div className="mb-6 pb-6 border-b border-border">
                <h2 className="text-xl font-semibold mb-3">{t.en.features}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Icon name="Check" size={16} className="text-success" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">{t.en.amenities}</h2>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((amenity, index) => (
                    <span key={index} className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">{amenity}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside>
              <div className="sticky top-28">
                <div className="bg-card border border-border rounded-lg p-6 shadow-card">
                  <div className="text-3xl font-bold font-heading mb-4">{formatPrice(property.price, property.currency)} <span className="text-base font-normal text-muted-foreground">/ year</span></div>

                  {/* Trust Badges Section */}
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <Icon name="BadgeCheck" size={20} className="text-success mt-1" />
                      <div>
                        <h4 className="font-semibold">{t.en.verified}</h4>
                        <p className="text-sm text-muted-foreground">{t.en.verifiedDesc}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Icon name="Star" size={20} className="text-accent mt-1" />
                      <div>
                        <h4 className="font-semibold">{t.en.highTrustScore} ({property.trustScore})</h4>
                        <p className="text-sm text-muted-foreground">{t.en.highTrustScoreDesc}</p>
                      </div>
                    </div>
                    {property.escrowEnabled && (
                      <div className="flex items-start space-x-3">
                        <Icon name="Shield" size={20} className="text-primary mt-1" />
                        <div>
                          <h4 className="font-semibold">{t.en.escrowProtection}</h4>
                          <p className="text-sm text-muted-foreground">{t.en.escrowProtectionDesc}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {property.escrowEnabled ? (
                    <Link to={`/escrow/${property.id}`} className="w-full">
                      <Button size="lg" className="w-full mb-2">
                        <Icon name="Lock" size={16} className="mr-2" />
                        {t.en.initiateEscrow}
                      </Button>
                    </Link>
                  ) : (
                    <Button size="lg" className="w-full mb-2" disabled>
                      Escrow Not Available
                    </Button>
                  )}
                  <Link to={`/chat/${property.id}`} className="w-full">
                    <Button variant="outline" size="lg" className="w-full">
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      {t.en.contactAgent}
                    </Button>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyDetailView;
