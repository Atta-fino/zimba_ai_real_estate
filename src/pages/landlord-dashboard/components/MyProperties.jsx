import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import AppImage from '../../../components/AppImage';
import { getPropertyTypeDisplay } from '../../../utils/enums'; // For displaying property type

// Mock property data for the landlord
const mockLandlordProperties = [
  {
    id: 'prop1',
    title: 'Spacious 3-Bedroom Apartment in Lekki',
    location: 'Lekki Phase 1, Lagos',
    price: 5000000,
    currency: 'NGN',
    propertyType: 'apartment',
    status: 'active', // 'active', 'inactive', 'pending_approval', 'draft'
    images: ['/assets/images/stock/apartment_1_a.jpg', '/assets/images/stock/apartment_1_b.jpg'],
    bedrooms: 3,
    bathrooms: 2,
    activeBookings: 1,
    views: 120,
  },
  {
    id: 'prop2',
    title: 'Modern Office Space in Ikeja',
    location: 'Ikeja GRA, Lagos',
    price: 2500000,
    currency: 'NGN',
    propertyType: 'office_space',
    status: 'inactive',
    images: ['/assets/images/stock/office_1_a.jpg'],
    bedrooms: null, // N/A for office
    bathrooms: 1,
    activeBookings: 0,
    views: 45,
  },
  {
    id: 'prop3',
    title: 'Cozy Self-Contain in Yaba',
    location: 'Yaba, Lagos',
    price: 800000,
    currency: 'NGN',
    propertyType: 'single_room_self_contain',
    status: 'pending_approval',
    images: ['/assets/images/stock/self_contain_1_a.jpg'],
    bedrooms: 1,
    bathrooms: 1,
    activeBookings: 0,
    views: 78,
  },
];

const PropertyStatusBadge = ({ status }) => {
  let bgColor = 'bg-gray-200';
  let textColor = 'text-gray-700';
  let dotColor = 'bg-gray-500';
  let text = 'Unknown';

  switch (status) {
    case 'active':
      bgColor = 'bg-green-100';
      textColor = 'text-green-700';
      dotColor = 'bg-green-500';
      text = 'Active';
      break;
    case 'inactive':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-700';
      dotColor = 'bg-yellow-500';
      text = 'Inactive';
      break;
    case 'pending_approval':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-700';
      dotColor = 'bg-blue-500';
      text = 'Pending Approval';
      break;
    case 'draft':
      bgColor = 'bg-purple-100';
      textColor = 'text-purple-700';
      dotColor = 'bg-purple-500';
      text = 'Draft';
      break;
    default:
      text = status;
  }
  return (
    <span className={`px-2.5 py-1 inline-flex items-center text-xs font-semibold rounded-full ${bgColor} ${textColor}`}>
      <span className={`w-2 h-2 mr-1.5 rounded-full ${dotColor}`}></span>
      {text}
    </span>
  );
};


const MyProperties = ({ onViewPropertyBookings }) => { // Removed onAddNewProperty, onEditProperty as they will be handled by navigate
  const navigate = useNavigate();
  // In a real app, properties would be fetched or come from a global state
  const [properties, setProperties] = useState(mockLandlordProperties);

  const handleAddNewProperty = () => {
    navigate('/landlord-dashboard/properties/new');
  };

  const handleEditProperty = (propertyId) => {
    navigate(`/landlord-dashboard/properties/edit/${propertyId}`);
  };

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency || 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="p-1 md:p-0"> {/* Reduced padding on the container if cards have their own */}
      <div className="flex justify-between items-center mb-6 px-1 md:px-0">
        <h2 className="text-2xl font-semibold font-heading text-foreground">My Properties ({properties.length})</h2>
        <Button onClick={handleAddNewProperty} variant="default" size="lg">
          <Icon name="PlusCircle" size={18} className="mr-2" />
          Add New Property
        </Button>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg shadow">
          <Icon name="HomeOff" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Properties Yet</h3>
          <p className="text-muted-foreground mb-4">Start by adding your first property to Zimba.</p>
          <Button onClick={handleAddNewProperty} variant="default">
            <Icon name="PlusCircle" size={16} className="mr-2" />
            Add Your First Property
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {properties.map((prop) => (
            <div key={prop.id} className="bg-card rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <AppImage
                    src={prop.images[0] || '/assets/images/no_image.png'}
                    alt={prop.title}
                    className="h-48 w-full object-cover md:w-56 md:h-full"
                    fallbackSrc="/assets/images/no_image.png"
                  />
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-1">
                    <h3 className="text-xl font-bold font-heading text-foreground hover:text-primary transition-colors">
                      {/* <Link to={`/property-detail-view/${prop.id}`}> */}
                        {prop.title}
                      {/* </Link> */}
                    </h3>
                    <PropertyStatusBadge status={prop.status} />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1 flex items-center">
                    <Icon name="MapPin" size={14} className="mr-1.5" /> {prop.location}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {getPropertyTypeDisplay(prop.propertyType)}
                    {prop.bedrooms && ` • ${prop.bedrooms} bed(s)`}
                    {prop.bathrooms && ` • ${prop.bathrooms} bath(s)`}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mb-4">
                    <span className="font-semibold text-lg text-primary">{formatPrice(prop.price, prop.currency)}</span>
                    <span className="text-muted-foreground">
                      <Icon name="Eye" size={14} className="inline mr-1"/> {prop.views} views
                    </span>
                    <span className="text-muted-foreground">
                       <Icon name="CalendarCheck" size={14} className="inline mr-1"/> {prop.activeBookings} active bookings
                    </span>
                  </div>

                  <div className="border-t border-border pt-4 mt-4 flex flex-wrap gap-2 items-center">
                    <Button onClick={() => handleEditProperty(prop.id)} variant="outline" size="sm">
                      <Icon name="Edit3" size={14} className="mr-1.5" /> Edit
                    </Button>
                    <Button onClick={() => { /* Placeholder for View Details */ }} variant="outline" size="sm">
                      <Icon name="ExternalLink" size={14} className="mr-1.5" /> View Listing
                    </Button>
                     <Button onClick={() => onViewPropertyBookings(prop.id)} variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                      <Icon name="CalendarDays" size={14} className="mr-1.5" /> Manage Bookings ({prop.activeBookings})
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-500/10 ml-auto">
                        <Icon name="Trash2" size={14} className="mr-1.5"/> Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;
