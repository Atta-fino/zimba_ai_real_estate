import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import AppImage from '../../../components/AppImage';
import { Link } from 'react-router-dom';
import { mockRenterBookingsData, updateBookingStatus } from '../../../data/mockBookings';

// Reusable Escrow Status Badge (similar to BookingStatusBadge but could be tailored)
const EscrowStateBadge = ({ state }) => {
  let baseClasses = "px-2.5 py-1 inline-flex items-center text-xs font-semibold rounded-full";
  let specificClasses = "";
  let dotColor = "";
  let text = state.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());

  switch (state) {
    case 'pending': // Pending landlord confirmation
      specificClasses = "bg-yellow-100 text-yellow-700";
      dotColor = "bg-yellow-500";
      text = "Pending Confirmation";
      break;
    case 'confirmed': // Confirmed by landlord, awaiting payment / escrow funding
      specificClasses = "bg-blue-100 text-blue-700";
      dotColor = "bg-blue-500";
      text = "Confirmed (Pay Escrow)";
      break;
    case 'escrow_active': // Payment secured in escrow
      specificClasses = "bg-indigo-100 text-indigo-700";
      dotColor = "bg-indigo-500";
      text = "Escrow Active (Awaiting Keys)";
      break;
    case 'keys_received': // Renter confirmed receiving keys
      specificClasses = "bg-teal-100 text-teal-700";
      dotColor = "bg-teal-500";
      text = "Keys Received (Rent Active)";
      break;
    case 'complete': // Booking period ended, funds released
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


const MyBookings = () => {
  // Use a state that is initialized from the mock data store but can be updated independently
  const [bookings, setBookings] = useState(mockRenterBookingsData);
  // TODO: Add filter state (e.g., 'active', 'past', 'all')

  const handleConfirmKeysReceived = (bookingId) => {
    console.log(`Renter confirmed keys received for booking ${bookingId}`);
    updateBookingStatus(bookingId, 'keys_received');
    setBookings([...mockRenterBookingsData]); // Trigger re-render by creating a new array reference
    alert("Thank you for confirming! Your landlord will be notified, and the escrow process will proceed.");
  };

  const handlePayEscrow = (bookingId) => {
    console.log(`Pay Escrow clicked for booking ${bookingId}`);
    alert("You would now be redirected to a secure payment page to fund the escrow for this booking. (This is a simulation)");
    updateBookingStatus(bookingId, 'escrow_active');
    setBookings([...mockRenterBookingsData]); // Trigger re-render
  };


  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  const formatPrice = (price, currency) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: currency || 'NGN', minimumFractionDigits: 2 }).format(price);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold font-heading text-foreground">My Bookings & Escrow Status</h2>
        {/* TODO: Add filter dropdown for bookings */}
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-lg shadow">
          <Icon name="CalendarX2" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">You have no bookings yet.</h3>
          <p className="text-muted-foreground mb-4">Find your perfect place and start your Zimba journey!</p>
          <Link to="/property-search-listing-grid">
            <Button variant="default">
              <Icon name="Search" size={16} className="mr-2" />
              Find Properties
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map(booking => (
            <div key={booking.id} className="bg-card rounded-xl shadow-lg overflow-hidden">
              <div className="p-5 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start mb-3">
                  <div>
                    <Link to={`/property-detail-view/${booking.propertyId}`} className="hover:underline">
                        <h3 className="text-lg font-semibold text-primary">{booking.propertyName}</h3>
                    </Link>
                    <p className="text-xs text-muted-foreground">Landlord: {booking.landlordName} • Booking ID: {booking.id}</p>
                  </div>
                  <EscrowStateBadge state={booking.escrow_state} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-muted-foreground font-medium">Move-in Date:</p>
                    <p className="text-foreground">{formatDate(booking.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium">Move-out Date:</p>
                    <p className="text-foreground">{formatDate(booking.endDate)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground font-medium">Total Price:</p>
                    <p className="text-foreground font-semibold">{formatPrice(booking.totalPrice, booking.currency)}</p>
                  </div>
                </div>
                 <p className="text-xs text-muted-foreground mb-4">
                    Booked on: {formatDate(booking.bookedAt)}
                </p>

                <div className="border-t border-border pt-4 flex flex-wrap gap-2 items-center">
                  {booking.escrow_state === 'confirmed' && (
                     <Button onClick={() => handlePayEscrow(booking.id)} variant="default" size="sm">
                        <Icon name="CreditCard" size={14} className="mr-1.5" /> Pay into Escrow
                      </Button>
                  )}
                  {booking.escrow_state === 'escrow_active' && (
                    <Button onClick={() => handleConfirmKeysReceived(booking.id)} variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                      <Icon name="KeyRound" size={14} className="mr-1.5" /> I've Received My Keys!
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Icon name="MessageSquare" size={14} className="mr-1.5" /> Chat with Landlord
                  </Button>
                  {/* More actions like "View Payment History", "Report Issue" can be added */}
                   <Link to={`/property-detail-view/${booking.propertyId}`} className="ml-auto">
                       <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          <Icon name="Eye" size={14} className="mr-1.5"/> View Property
                        </Button>
                   </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
