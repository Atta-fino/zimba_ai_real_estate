import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import AppImage from '../../../components/AppImage'; // To show property image thumbnail

// Mock bookings data
const mockBookingsData = [
  {
    id: 'booking1',
    propertyId: 'prop1',
    propertyName: 'Spacious 3-Bedroom Apartment in Lekki',
    propertyImage: '/assets/images/stock/apartment_1_a.jpg',
    renterName: 'Chidinma Okoro',
    renterAvatar: '/assets/images/stock/avatar_female_1.jpg', // Placeholder
    startDate: '2024-08-01',
    endDate: '2025-07-31',
    totalPrice: 5000000,
    currency: 'NGN',
    status: 'confirmed', // pending, confirmed, escrow_active, keys_received, complete, cancelled
    bookedAt: '2024-07-15T10:30:00Z',
  },
  {
    id: 'booking2',
    propertyId: 'prop1',
    propertyName: 'Spacious 3-Bedroom Apartment in Lekki',
    propertyImage: '/assets/images/stock/apartment_1_a.jpg',
    renterName: 'Babatunde Adebayo',
    renterAvatar: '/assets/images/stock/avatar_male_1.jpg',
    startDate: '2024-09-01',
    endDate: '2024-11-30', // Short let
    totalPrice: 1200000,
    currency: 'NGN',
    status: 'pending',
    bookedAt: '2024-07-20T14:00:00Z',
  },
  {
    id: 'booking3',
    propertyId: 'prop2',
    propertyName: 'Modern Office Space in Ikeja',
    propertyImage: '/assets/images/stock/office_1_a.jpg',
    renterName: 'FlexCorp Inc.',
    renterAvatar: '/assets/images/no_image.png', // Company logo or placeholder
    startDate: '2024-07-01',
    endDate: '2025-06-30',
    totalPrice: 2500000,
    currency: 'NGN',
    status: 'escrow_active',
    bookedAt: '2024-06-10T09:00:00Z',
  },
    {
    id: 'booking4',
    propertyId: 'prop1',
    propertyName: 'Spacious 3-Bedroom Apartment in Lekki',
    propertyImage: '/assets/images/stock/apartment_1_a.jpg',
    renterName: 'Fatima Aliyu',
    renterAvatar: '/assets/images/stock/avatar_female_2.jpg',
    startDate: '2023-01-15',
    endDate: '2024-01-14',
    totalPrice: 4800000,
    currency: 'NGN',
    status: 'complete',
    bookedAt: '2023-01-05T11:00:00Z',
  },
];

const BookingStatusBadge = ({ status }) => {
  let baseClasses = "px-2.5 py-1 inline-flex items-center text-xs font-semibold rounded-full";
  let specificClasses = "";
  let dotColor = "";
  let text = status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()); // Capitalize

  switch (status) {
    case 'pending':
      specificClasses = "bg-yellow-100 text-yellow-700";
      dotColor = "bg-yellow-500";
      break;
    case 'confirmed':
      specificClasses = "bg-blue-100 text-blue-700";
      dotColor = "bg-blue-500";
      break;
    case 'escrow_active':
      specificClasses = "bg-indigo-100 text-indigo-700";
      dotColor = "bg-indigo-500";
      break;
    case 'keys_received': // Or similar "Payment Released" or "Active Tenancy"
      specificClasses = "bg-teal-100 text-teal-700";
      dotColor = "bg-teal-500";
      text = "Keys Received / Active";
      break;
    case 'complete':
      specificClasses = "bg-green-100 text-green-700";
      dotColor = "bg-green-500";
      break;
    case 'cancelled':
      specificClasses = "bg-red-100 text-red-700";
      dotColor = "bg-red-500";
      break;
    default:
      specificClasses = "bg-gray-100 text-gray-700";
      dotColor = "bg-gray-500";
  }
  return (
    <span className={`${baseClasses} ${specificClasses}`}>
      <span className={`w-2 h-2 mr-1.5 rounded-full ${dotColor}`}></span>
      {text}
    </span>
  );
};

const LandlordBookings = () => {
  const [bookings, setBookings] = useState(mockBookingsData);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'confirmed', 'active', 'completed'

  const handleUpdateBookingStatus = (bookingId, newStatus) => {
    console.log(`Updating booking ${bookingId} to ${newStatus}`);
    // Simulate API call and update local state
    setBookings(prevBookings =>
      prevBookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b)
    );
    // Add success/error handling in a real app
  };

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency || 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // TODO: Implement filtering logic based on `filter` state
  const filteredBookings = bookings; // Placeholder

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold font-heading text-foreground">Manage Bookings ({filteredBookings.length})</h2>
        {/* TODO: Add filter dropdown */}
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg shadow">
          <Icon name="CalendarX2" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Bookings Found</h3>
          <p className="text-muted-foreground">There are currently no bookings matching your criteria.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredBookings.map(booking => (
            <div key={booking.id} className="bg-card rounded-xl shadow-lg overflow-hidden">
              <div className="p-5 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors">
                      {/* <Link to={`/property-detail-view/${booking.propertyId}`}> */}
                        {booking.propertyName}
                      {/* </Link> */}
                    </h3>
                     <p className="text-xs text-muted-foreground">Booking ID: {booking.id}</p>
                  </div>
                  <BookingStatusBadge status={booking.status} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-muted-foreground font-medium">Renter:</p>
                    <div className="flex items-center mt-1">
                        <AppImage src={booking.renterAvatar} alt={booking.renterName} className="w-8 h-8 rounded-full mr-2 object-cover"/>
                        <span className="text-foreground">{booking.renterName}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium">Dates:</p>
                    <p className="text-foreground">{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium">Total Price:</p>
                    <p className="text-foreground font-semibold">{formatPrice(booking.totalPrice, booking.currency)}</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mb-4">
                    Booked on: {formatDate(booking.bookedAt)} ({new Date(booking.bookedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit'})})
                </p>

                <div className="border-t border-border pt-4 flex flex-wrap gap-2 items-center">
                  {booking.status === 'pending' && (
                    <>
                      <Button onClick={() => handleUpdateBookingStatus(booking.id, 'confirmed')} variant="default" size="sm">
                        <Icon name="CheckCircle" size={14} className="mr-1.5" /> Confirm Booking
                      </Button>
                      <Button onClick={() => handleUpdateBookingStatus(booking.id, 'cancelled')} variant="destructive_outline" size="sm">
                        <Icon name="XCircle" size={14} className="mr-1.5" /> Decline
                      </Button>
                    </>
                  )}
                  {booking.status === 'confirmed' && (
                     <Button onClick={() => handleUpdateBookingStatus(booking.id, 'escrow_active')} variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Icon name="ShieldCheck" size={14} className="mr-1.5" /> Mark as Escrow Active
                      </Button>
                  )}
                   {booking.status === 'escrow_active' && (
                     <Button onClick={() => handleUpdateBookingStatus(booking.id, 'keys_received')} variant="default" size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                        <Icon name="KeyRound" size={14} className="mr-1.5" /> Confirm Keys Handover
                      </Button>
                  )}
                  {/* Add more actions based on status */}
                  <Button variant="outline" size="sm">
                    <Icon name="MessageSquare" size={14} className="mr-1.5" /> Chat with Renter
                  </Button>
                   <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 ml-auto">
                      <Icon name="Eye" size={14} className="mr-1.5"/> View Details
                    </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandlordBookings;
