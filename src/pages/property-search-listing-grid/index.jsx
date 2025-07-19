import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import SearchInput from './components/SearchInput';
import FilterBar from './components/FilterBar';
import SortDropdown from './components/SortDropdown';
import PropertyCard from './components/PropertyCard';
import MapToggle from './components/MapToggle';
import LoadingSkeleton from './components/LoadingSkeleton';
import EmptyState from './components/EmptyState';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
// From feat/commission-system
import Mapbox from '../../components/Mapbox';
import { Marker, Popup } from 'react-map-gl';
import useSupercluster from 'use-supercluster';
import { FlyToInterpolator } from 'react-map-gl';
import DrawControl from '../../components/DrawControl';
import * as turf from '@turf/turf';

// From main
import MapboxView from '../../components/MapboxView';
import OfflineState from '../../components/ui/OfflineState';
import { mockPropertiesData } from '../../data/mockProperties';

// Language Context
const LanguageContext = React.createContext({
  language: 'en'
});

const PropertySearchListingGrid = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 6.5244,
    longitude: 3.3792,
    zoom: 10
  });
  const points = sortedProperties.map(property => ({
    type: "Feature",
    properties: {
      cluster: false,
      propertyId: property.id,
      ...property
    },
    geometry: {
      type: "Point",
      coordinates: [property.longitude, property.latitude]
    }
  }));
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds: viewport.bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 }
  });
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  
  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    propertyTypes: [],
    priceRange: { min: '', max: '' },
    location: '',
    amenities: [],
    trustScoreMin: 0
  });
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'map'
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [isOffline, setIsOffline] = useState(false); // Add offline state

  // Translations
  const translations = {
    en: {
      searchPlaceholder: 'Search properties, locations...',
      filters: 'Filters',
      sort: 'Sort',
      map: 'Map',
      grid: 'Grid',
      properties: 'Properties',
      noResults: 'No properties found',
      noResultsDesc: 'Try adjusting your search or filters',
      clearFilters: 'Clear Filters',
      loadMore: 'Load More',
      applied: 'applied'
    },
    fr: {
      searchPlaceholder: 'Rechercher des propriétés, lieux...',
      filters: 'Filtres',
      sort: 'Trier',
      map: 'Carte',
      grid: 'Grille',
      properties: 'Propriétés',
      noResults: 'Aucune propriété trouvée',
      noResultsDesc: 'Essayez d\'ajuster votre recherche ou vos filtres',
      clearFilters: 'Effacer les filtres',
      loadMore: 'Charger plus',
      applied: 'appliqué'
    },
    ar: {
      searchPlaceholder: 'البحث عن العقارات والمواقع...',
      filters: 'المرشحات',
      sort: 'ترتيب',
      map: 'خريطة',
      grid: 'شبكة',
      properties: 'العقارات',
      noResults: 'لم يتم العثور على عقارات',
      noResultsDesc: 'حاول تعديل البحث أو المرشحات',
      clearFilters: 'مسح المرشحات',
      loadMore: 'تحميل المزيد',
      applied: 'مطبق'
    },
    sw: {
      searchPlaceholder: 'Tafuta mali, maeneo...',
      filters: 'Vichujio',
      sort: 'Panga',
      map: 'Ramani',
      grid: 'Gridi',
      properties: 'Mali',
      noResults: 'Hakuna mali zilizopatikana',
      noResultsDesc: 'Jaribu kubadilisha utafutaji au vichujio',
      clearFilters: 'Futa Vichujio',
      loadMore: 'Pakia Zaidi',
      applied: 'imetumika'
    },
    am: {
      searchPlaceholder: 'ንብረት፣ ቦታዎች ይፈልጉ...',
      filters: 'ማጣሪያዎች',
      sort: 'መደብ',
      map: 'ካርታ',
      grid: 'ፍርግርግ',
      properties: 'ንብረቶች',
      noResults: 'ምንም ንብረት አልተገኘም',
      noResultsDesc: 'የእርስዎን ፍለጋ ወይም ማጣሪያዎች ለማስተካከል ይሞክሩ',
      clearFilters: 'ማጣሪያዎችን አጽዳ',
      loadMore: 'ተጨማሪ ጫን',
      applied: 'ተተግብሯል'
    }
  };

  const t = translations[language] || translations.en;

// Mock property data
const mockProperties = [
  {
    id: 1,
    title: 'Modern 2-Bedroom Apartment',
    price: 850000,
    currency: 'NGN',
    location: 'Victoria Island, Lagos',
    propertyType: 'Apartments',
    images: ['/assets/images/no_image.png'],
    trustScore: 4.8,
    verified: true,
    features: ['2 Beds', '2 Baths', '85 sqm'],
    amenities: ['Parking', 'Security', 'Swimming Pool'],
    landlordResponsive: true,
    virtualTour: true,
    favorite: false,
    latitude: 6.4281,
    longitude: 3.4214,
    landlord: {
      verification_status: 'approved'
    }
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
    latitude: 6.6018,
    longitude: 3.3515,
    landlord: {
      verification_status: 'pending'
    }
  }
];

  // Filter properties based on current filters and search
  const filteredProperties = properties.filter(property => {
    // Exclude hidden properties from public view
    if (property.status === 'hidden') {
      return false;
    }

    const matchesSearch = !searchQuery || 
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPropertyType = selectedFilters.propertyTypes.length === 0 ||
      selectedFilters.propertyTypes.includes(property.propertyType);
    
    const matchesPriceRange = (!selectedFilters.priceRange.min || property.price >= parseInt(selectedFilters.priceRange.min)) &&
      (!selectedFilters.priceRange.max || property.price <= parseInt(selectedFilters.priceRange.max));
    
    const matchesTrustScore = property.trustScore >= selectedFilters.trustScoreMin;

    return matchesSearch && matchesPropertyType && matchesPriceRange && matchesTrustScore;
  });

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.id - a.id;
      case 'trustscore':
        return b.trustScore - a.trustScore;
      default:
        return 0;
    }
  });

  // Calculate active filters count
  const activeFiltersCount = 
    selectedFilters.propertyTypes.length +
    (selectedFilters.priceRange.min || selectedFilters.priceRange.max ? 1 : 0) +
    (selectedFilters.location ? 1 : 0) +
    selectedFilters.amenities.length +
    (selectedFilters.trustScoreMin > 0 ? 1 : 0);

  // Load initial data
  useEffect(() => {
    const loadProperties = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProperties(mockPropertiesData); // Use the central mock data store
      setLoading(false);
    };

    loadProperties();
  }, []);

  // Handle infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        if (!loadingMore && hasMore && sortedProperties.length > 0) {
          setLoadingMore(true);
          // Simulate loading more data
          setTimeout(() => {
            setLoadingMore(false);
            // For demo, don't actually load more
            setHasMore(false);
          }, 1000);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore, hasMore, sortedProperties.length]);

const handleFilterChange = (newFilters) => {
  setSelectedFilters(newFilters);
};

const handleSearchChange = async (query) => {
  // Insert your search logic here
};



    if (query) {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
      );
      const data = await response.json();
      if (data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        setViewport({ ...viewport, latitude, longitude, zoom: 12 });
      }
    }
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      propertyTypes: [],
      priceRange: { min: '', max: '' },
      location: '',
      amenities: [],
      trustScoreMin: 0
    });
    setSearchQuery('');
  };

  const toggleFavorite = (propertyId) => {
    setProperties(prevProperties =>
      prevProperties.map(property =>
        property.id === propertyId
          ? { ...property, favorite: !property.favorite }
          : property
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PrimaryTabNavigation />
      
      {/* Main Content */}
      <main className="pt-16 md:pt-24 pb-20 md:pb-8">
        {/* Search and Controls */}
        <div className="sticky top-16 md:top-24 z-30 bg-background border-b border-border">
          <div className="px-4 lg:px-6 py-4">
            {/* Search Input */}
            <SearchInput
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder={t.searchPlaceholder}
            />

            {/* Controls Bar */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-3">
                {/* Filter Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="relative"
                >
                  <Icon name="Filter" size={16} />
                  <span className="ml-2">{t.filters}</span>
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>

                {/* Sort Dropdown */}
                <SortDropdown value={sortBy} onChange={setSortBy} />
              </div>

              {/* View Toggle and Map */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  {sortedProperties.length} {t.properties}
                </span>
                <MapToggle viewMode={viewMode} onChange={setViewMode} />
              </div>
            </div>

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center justify-between mt-3 p-3 bg-muted rounded-lg">
                <span className="text-sm text-muted-foreground">
                  {activeFiltersCount} {t.applied}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-destructive hover:text-destructive"
                >
                  {t.clearFilters}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Filter Sidebar/Panel */}
        <FilterBar
          isOpen={showFilters}
          onClose={() => setShowFilters(false)}
          filters={selectedFilters}
          onFiltersChange={handleFilterChange}
        />

        {/* Content Area */}
        <div className="px-4 lg:px-6 py-6">
          {isOffline && <div className="mb-6"><OfflineState onRetry={() => console.log("Retrying connection...")}/></div>}
          {loading ? (
            <LoadingSkeleton />
          ) : sortedProperties.length === 0 ? (
            <EmptyState
              title={t.noResults}
              description={t.noResultsDesc}
              onClearFilters={activeFiltersCount > 0 ? clearAllFilters : undefined}
            />
          ) : viewMode === 'grid' ? (
            <>
              {/* Property Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>

              {/* Load More / Loading */}
              {loadingMore && (
                <div className="mt-8">
                  <LoadingSkeleton count={4} />
                </div>
              )}

              {!hasMore && sortedProperties.length > 0 && (
                <div className="text-center mt-8 py-4">
                  <p className="text-muted-foreground">You've seen all available properties</p>
                </div>
              )}
            </>
          ) : (
// components/MapboxView.tsx

import React, { useState, useMemo, useCallback } from 'react';
import Mapbox from './Mapbox'; // assuming it's a wrapper around react-map-gl
import { Marker, Popup, FlyToInterpolator } from 'react-map-gl';
import DrawControl from './DrawControl';
import useSupercluster from 'use-supercluster';
import * as turf from '@turf/turf';

interface Property {
  id: number;
  title: string;
  price: number;
  currency: string;
  latitude: number;
  longitude: number;
  [key: string]: any;
}

interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
  [key: string]: any;
}

interface MapboxViewProps {
  properties: Property[];
  viewport: Viewport;
  onMove: (evt: any) => void;
  selectedProperty?: Property | null;
  onSelectProperty: (property: Property | null) => void;
  onDrawPolygon: (polygon: GeoJSON.Feature) => void;
}

const MapboxView: React.FC<MapboxViewProps> = ({
  properties,
  viewport,
  onMove,
  selectedProperty,
  onSelectProperty,
  onDrawPolygon
}) => {
  const [points] = useState(
    properties.map(property => ({
      type: 'Feature',
      properties: {
        cluster: false,
        propertyId: property.id,
        ...property
      },
      geometry: {
        type: 'Point',
        coordinates: [property.longitude, property.latitude]
      }
    }))
  );

  const bounds = useMemo(() => {
    if (points.length === 0) return null;
    const coords = points.map(p => p.geometry.coordinates);
    const lons = coords.map(c => c[0]);
    const lats = coords.map(c => c[1]);
    return [
      Math.min(...lons),
      Math.min(...lats),
      Math.max(...lons),
      Math.max(...lats)
    ];
  }, [points]);

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  const handleDraw = useCallback((e: any) => {
    const polygon = e.features[0];
    onDrawPolygon(polygon);
  }, [onDrawPolygon]);

  return (
    <Mapbox
      {...viewport}
      onMove={onMove}
      style={{ width: '100%', height: '100%' }}
    >
      {clusters.map((cluster: any) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } = cluster.properties;

        if (isCluster) {
          return (
            <Marker key={cluster.id} longitude={longitude} latitude={latitude}>
              <div
                className="cluster-marker"
                style={{
                  width: `${10 + (pointCount / points.length) * 20}px`,
                  height: `${10 + (pointCount / points.length) * 20}px`,
                }}
                onClick={() => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  );
                  onMove({
                    viewState: {
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
                      transitionDuration: 'auto'
                    }
                  });
                }}
              >
                {pointCount}
              </div>
            </Marker>
          );
        }

        return (
          <Marker
            key={cluster.properties.propertyId}
            longitude={longitude}
            latitude={latitude}
            onClick={() => onSelectProperty(cluster.properties)}
          />
        );
      })}

      <DrawControl
        position="top-left"
        displayControlsDefault={false}
        controls={{ polygon: true, trash: true }}
        onCreate={handleDraw}
      />

      {selectedProperty && (
        <Popup
          longitude={selectedProperty.longitude}
          latitude={selectedProperty.latitude}
          onClose={() => onSelectProperty(null)}
          closeOnClick={false}
        >
          <div>
            <h2>{selectedProperty.title}</h2>
            <p>{selectedProperty.price} {selectedProperty.currency}</p>
          </div>
        </Popup>
      )}
    </Mapbox>
  );
};

export default MapboxView;
          )}
        </div>
      </main>

      {/* Overlay for mobile filter */}
      {showFilters && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setShowFilters(false)}
        />
      )}
    </div>
  );
};

export default PropertySearchListingGrid;