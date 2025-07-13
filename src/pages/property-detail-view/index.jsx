import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPropertyTypeDisplay, getFeatureDisplay } from '../../utils/enums';
import { useDiaspora } from '../../context/DiasporaContext'; // Import the hook
import AppImage from '../../components/AppImage';
import Icon from '../../components/AppIcon'; // Assuming you have an Icon component
import Button from '../../components/ui/Button'; // Assuming you have a Button component

// Mock data fetching function (replace with your actual API call)
const fetchPropertyById = async (id) => {
  console.log(`Fetching property with id: ${id}`);
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay

  // Extended mock data
  const mockProperties = {
    "1": {
      id: "1",
      title: "Modern Downtown Apartment",
      price: 350000,
      currency: 'NGN',
      location: "123 Main St, Ikeja, Lagos",
      propertyType: 'apartment',
      description: "A stunning modern apartment in the heart of the city. Features incredible views, high-end finishes, and proximity to all amenities. This 2-bedroom, 2-bathroom unit offers an open-concept living space, a gourmet kitchen with stainless steel appliances, and a private balcony. Building amenities include a fitness center, rooftop pool, and 24/7 security.",
      images: [
        '/assets/images/stock/apartment_1_a.jpg',
        '/assets/images/stock/apartment_1_b.jpg',
        '/assets/images/stock/apartment_1_c.jpg',
      ],
      bedrooms: 2,
      bathrooms: 2,
      area: 120, // sqm
      features: ['air_conditioner', 'pool', 'parking_spot', 'fiber_internet', 'ensuite_bathroom', 'cctv_surveillance'],
      agent: {
        name: 'Adeola Property Pro',
        phone: '+234 801 234 5678',
        email: 'adeola@propertypro.ng',
        avatar: '/assets/images/stock/agent_female_1.jpg',
        badges: ['Human Verified', 'SuperHost'] // Added badges
      },
      virtualTourLink: 'https://my.matterport.com/show/?m=DEMO',
      verified: true,
      trustedForDiaspora: true, // New flag for the badge
      trustScore: 4.9,
      amenities: ['Gym', 'Swimming Pool', '24/7 Security', 'Covered Parking', 'Elevator'],
      yearBuilt: 2020,
      lotSize: null, // Not applicable for apartment
      postedDate: '2024-07-15',
      availability: 'available',
      nearbyPlaces: ['City Mall (5 min walk)', 'Central Park (10 min walk)', 'Metro Station (2 min walk)'],
      floorPlan: '/assets/images/stock/floor_plan_1.png'
    },
    "2": {
      id: "2",
      title: "Spacious Family Villa with Garden",
      price: 1200000,
      currency: 'NGN',
      location: "45 Crescent Rd, Lekki Phase 1, Lagos",
      propertyType: 'detached_house',
      description: "An expansive and luxurious detached house perfect for families. This beautiful villa boasts a large private garden, multiple living areas, and premium fittings throughout. With 5 bedrooms and 5 bathrooms, there's ample space for everyone. The property includes a private swimming pool, a home office, and a dedicated space for a generator.",
      images: [
        '/assets/images/stock/house_1_a.jpg',
        '/assets/images/stock/house_1_b.jpg',
        '/assets/images/stock/house_1_c.jpg',
      ],
      bedrooms: 5,
      bathrooms: 5,
      area: 450, // sqm
      features: ['garage', 'pool', 'cctv_surveillance', 'ensuite_bathroom', 'home_office_space', 'compound_space', 'water_storage', 'generator_power'],
      agent: {
        name: 'Chinedu Real Estate',
        phone: '+234 709 876 5432',
        email: 'chinedu@realestate.ng',
        avatar: '/assets/images/stock/agent_male_1.jpg'
      },
      virtualTourLink: null,
      verified: true,
      trustScore: 4.7,
      amenities: ['Private Garden', 'Swimming Pool', 'Security Post', 'Boys Quarters', 'Study Room'],
      yearBuilt: 2015,
      lotSize: 800, // sqm
      postedDate: '2024-07-10',
      availability: 'available',
      nearbyPlaces: ['Greenwood School (5 min drive)', 'Lekki Conservation Centre (15 min drive)'],
      floorPlan: '/assets/images/stock/floor_plan_2.png'
    }
  };
  // Use a default if ID not found, or handle error appropriately
  return mockProperties[id] || Promise.reject(new Error("Property not found"));
};

// A simple LanguageContext placeholder if you don't have one globally
const LanguageContext = React.createContext({ language: 'en', translations: {} });

const PropertyDetailView = () => {
  const { id } = useParams();
  const { isDiasporaUser } = useDiaspora(); // Use the diaspora hook
  const { language } = useContext(LanguageContext); // Use if you have global language context

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadProperty = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPropertyById(id);
        setProperty(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch property details.');
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProperty();
    }
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (property?.images?.length || 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (property?.images?.length || 1)) % (property?.images?.length || 1));
  };

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('en-NG', { // Use 'en-NG' for Naira formatting, or make dynamic
      style: 'currency',
      currency: currency || 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
        <p className="ml-4 text-lg">Loading Property Details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <Icon name="AlertTriangle" size={48} className="mx-auto text-red-500 mb-4" />
        <h2 className="text-2xl font-semibold text-red-600 mb-2">Oops! Something went wrong.</h2>
        <p className="text-red-500 mb-4">{error}</p>
        <Link to="/property-search-listing-grid">
          <Button variant="outline">Back to Listings</Button>
        </Link>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container mx-auto p-4 text-center">
         <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold text-foreground mb-2">Property Not Found</h2>
        <p className="text-muted-foreground mb-4">The property you are looking for does not exist or may have been removed.</p>
        <Link to="/property-search-listing-grid">
          <Button variant="default">Go to Listings</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Back to search results link */}
        <div className="mb-6">
          <Link to="/property-search-listing-grid" className="text-primary hover:text-primary/80 flex items-center">
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Back to Search Results
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (Images & Main Info) */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-6 bg-muted rounded-lg overflow-hidden shadow-lg">
              <AppImage
                src={property.images[currentImageIndex]}
                alt={`${property.title} - image ${currentImageIndex + 1}`}
                className="w-full h-[400px] md:h-[500px] object-cover transition-opacity duration-300"
                fallbackSrc="/assets/images/no_image.png"
              />
              {property.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/60 text-white hover:bg-black/80 rounded-full p-2"
                  >
                    <Icon name="ChevronLeft" size={24} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/60 text-white hover:bg-black/80 rounded-full p-2"
                  >
                    <Icon name="ChevronRight" size={24} />
                  </Button>
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {property.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                          index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`View image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
               {property.verified && (
                <span className="absolute top-3 left-3 px-3 py-1 bg-success text-success-foreground text-sm font-medium rounded-full flex items-center shadow">
                  <Icon name="BadgeCheck" size={16} className="mr-1.5" /> Verified
                </span>
              )}
            </div>

            {/* Header Section */}
            <div className="mb-6 p-6 bg-card border border-border rounded-lg shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-2 sm:mb-0">
                  {property.title}
                </h1>
                <div className="flex items-center space-x-2">
                   <Button variant="outline" size="sm" onClick={() => {/* Share action */}}>
                     <Icon name="Share2" size={16} className="mr-2"/> Share
                   </Button>
                   <Button variant="outline" size="sm" onClick={() => {/* Favorite action */}}>
                     <Icon name="Heart" size={16} className="mr-2"/> Favorite
                   </Button>
                </div>
              </div>
              <p className="text-lg text-muted-foreground mb-3 flex items-center">
                <Icon name="MapPin" size={18} className="mr-2 text-primary" /> {property.location}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-3">
                <span className="text-2xl font-semibold text-primary">
                  {formatPrice(property.price, property.currency)}
                </span>
                <span className="px-3 py-1 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                  {getPropertyTypeDisplay(property.propertyType)}
                </span>
                {property.trustScore && (
                  <span className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Star" size={16} className="mr-1 text-yellow-400 fill-current" /> Trust Score: {property.trustScore}/5
                  </span>
                )}
                {isDiasporaUser && property.trustedForDiaspora && (
                    <span className="flex items-center text-sm font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                        <Icon name="Globe" size={14} className="mr-1.5"/> Trusted for Diaspora
                    </span>
                )}
              </div>
            </div>

            {/* Key Details Section */}
            <div className="mb-6 p-6 bg-card border border-border rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold font-heading mb-4">Key Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center">
                  <Icon name="BedDouble" size={20} className="mr-2 text-primary"/>
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Bath" size={20} className="mr-2 text-primary"/>
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Maximize" size={20} className="mr-2 text-primary"/>
                  <span>{property.area} m²</span>
                </div>
                {property.yearBuilt && (
                  <div className="flex items-center">
                    <Icon name="Calendar" size={20} className="mr-2 text-primary"/>
                    <span>Built: {property.yearBuilt}</span>
                  </div>
                )}
                {property.lotSize && (
                  <div className="flex items-center">
                    <Icon name="LandPlot" size={20} className="mr-2 text-primary"/>
                    <span>Lot: {property.lotSize} m²</span>
                  </div>
                )}
                 <div className="flex items-center">
                  <Icon name="CheckCircle" size={20} className="mr-2 text-primary"/>
                  <span>Status: <span className="capitalize">{property.availability}</span></span>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-6 p-6 bg-card border border-border rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold font-heading mb-3">About this Property</h2>
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Features Section */}
            {property.features && property.features.length > 0 && (
              <div className="mb-6 p-6 bg-card border border-border rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold font-heading mb-4">Features</h2>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-3">
                  {property.features.map((featureKey) => (
                    <li key={featureKey} className="flex items-center text-muted-foreground">
                      <Icon name="Check" size={18} className="mr-2 text-success" />
                      {getFeatureDisplay(featureKey)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Amenities Section */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="mb-6 p-6 bg-card border border-border rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold font-heading mb-4">Amenities</h2>
                 <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity, index) => (
                      <span key={index} className="px-3 py-1.5 bg-muted text-muted-foreground text-sm rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
              </div>
            )}

            {/* Virtual Tour & Floor Plan */}
            {(property.virtualTourLink || property.floorPlan) && (
              <div className="mb-6 p-6 bg-card border border-border rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold font-heading mb-4">Media & Tours</h2>
                <div className="flex flex-wrap gap-3">
                  {property.virtualTourLink && (
                    <a href={property.virtualTourLink} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline">
                        <Icon name="Video" size={18} className="mr-2"/> View Virtual Tour
                      </Button>
                    </a>
                  )}
                  {isDiasporaUser && (
                     <Button variant="default" onClick={() => console.log('Requesting virtual tour...')}>
                        <Icon name="Camera" size={18} className="mr-2"/> Request a Live Virtual Tour
                     </Button>
                  )}
                  {property.floorPlan && (
                     <a href={property.floorPlan} target="_blank" rel="noopener noreferrer"> {/* Or open in a modal */}
                       <Button variant="outline">
                         <Icon name="LayoutGrid" size={18} className="mr-2"/> View Floor Plan
                       </Button>
                     </a>
                  )}
                </div>
              </div>
            )}

            {/* Nearby Places Section */}
            {property.nearbyPlaces && property.nearbyPlaces.length > 0 && (
              <div className="mb-6 p-6 bg-card border border-border rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold font-heading mb-4">What's Nearby?</h2>
                <ul className="list-disc list-inside pl-1 space-y-1 text-muted-foreground">
                  {property.nearbyPlaces.map((place, index) => (
                    <li key={index}>{place}</li>
                  ))}
                </ul>
              </div>
            )}


          </div>

          {/* Right Column (Agent Info & Actions) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6"> {/* Sticky for agent card */}
              {/* Agent Card */}
              {property.agent && (
                <div className="p-6 bg-card border border-border rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <AppImage
                      src={property.agent.avatar}
                      alt={property.agent.name}
                      className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-primary"
                      fallbackSrc="/assets/images/no_image.png"
                    />
                    <div>
                      <h3 className="text-lg font-semibold font-heading">{property.agent.name}</h3>
                      <p className="text-sm text-muted-foreground mb-1">Listing Agent</p>
                      {/* Display Landlord Badges */}
                      {property.agent.badges && property.agent.badges.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {property.agent.badges.map(badge => (
                            <span key={badge} className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                              badge === 'SuperHost' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'
                            }`}>
                              {badge === 'SuperHost' && <Icon name="Award" size={12} className="inline mr-1 -mt-0.5"/>}
                              {badge !== 'SuperHost' && <Icon name="BadgeCheck" size={12} className="inline mr-1 -mt-0.5"/>}
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button className="w-full mb-2">
                    <Icon name="Phone" size={16} className="mr-2"/> Call Agent ({property.agent.phone})
                  </Button>
                  <Button variant="outline" className="w-full mb-2">
                     <Icon name="Mail" size={16} className="mr-2"/> Email Agent
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => alert('Opening chat with landlord... (Simulation)')}>
                     <Icon name="MessageSquare" size={16} className="mr-2"/> Chat with Landlord
                  </Button>
                </div>
              )}

              {/* Price & Action Summary */}
               <div className="p-6 bg-card border border-border rounded-lg shadow-lg">
                  <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                  <p className="text-3xl font-bold text-primary mb-4">
                    {formatPrice(property.price, property.currency)}
                  </p>
                  <Button size="lg" className="w-full mb-2">
                    Request a Viewing
                  </Button>
                   <Button size="lg" variant="default" className="w-full mb-3 bg-green-600 hover:bg-green-700" onClick={() => alert('Proceeding to secure escrow... (Simulation)')}>
                        <Icon name="Lock" size={18} className="mr-2"/> Secure with Escrow
                   </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Posted on: {new Date(property.postedDate).toLocaleDateString()}
                  </p>
               </div>

              {/* Safety Tips or Other Info */}
              <div className="p-4 bg-accent/20 border border-accent/30 rounded-lg text-sm text-accent-foreground/80">
                <div className="flex items-start">
                  <Icon name="ShieldCheck" size={20} className="mr-2 mt-0.5 text-accent"/>
                  <div>
                    <h4 className="font-semibold mb-1">Property Viewing Safety</h4>
                    <p>Always meet in public if possible for initial discussions. Verify agent credentials.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailView;
