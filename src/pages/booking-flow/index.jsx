import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PaymentSummary from '../../components/ui/PaymentSummary';
import { useDiaspora } from '../../context/DiasporaContext';
import { addBooking } from '../../data/mockBookings'; // Import the addBooking function

// Mock data fetch for a single property
const fetchPropertyForBooking = async (propertyId) => {
  console.log("Fetching property for booking:", propertyId);
  // In a real app, you'd fetch this from your backend.
  // We'll use a simplified mock object for this flow.
  const mockProperty = {
    id: propertyId,
    title: 'Modern Downtown Apartment',
    location: '123 Main St, Ikeja, Lagos',
    price: 350000, // This would be the base price for the transaction
    currency: 'NGN',
    landlordName: 'Adeola Property Pro',
    image: '/assets/images/stock/apartment_1_a.jpg',
  };
  return mockProperty;
};

// Step 1: Confirmation of Details
const Step1_ConfirmDetails = ({ property, onNext, isDiaspora }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Confirm Your Booking Details</h2>
      <div className="bg-muted/50 p-4 rounded-lg flex items-center gap-4 mb-6">
        <img src={property.image} alt={property.title} className="w-24 h-24 object-cover rounded-md" />
        <div>
          <h3 className="font-semibold text-foreground">{property.title}</h3>
          <p className="text-sm text-muted-foreground">{property.location}</p>
          <p className="text-xs text-muted-foreground mt-1">with {property.landlordName}</p>
        </div>
      </div>

      {/* Date Pickers - Placeholder */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-muted-foreground mb-1">Select Your Dates (if applicable)</label>
        <div className="flex gap-4">
          <input type="date" className="w-full p-2 border border-border rounded-md bg-input" disabled/>
          <input type="date" className="w-full p-2 border border-border rounded-md bg-input" disabled/>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Date selection for short-lets coming soon.</p>
      </div>

      <PaymentSummary
        basePrice={property.price}
        commissionRate={0.05} // 5% platform fee
        isDiasporaTransaction={isDiaspora}
        diasporaFeeRate={0.02} // 2% diaspora fee
        currency={property.currency}
      />
      <Button onClick={onNext} size="lg" className="w-full mt-6">
        Proceed to Payment
      </Button>
    </div>
  );
};

// Step 2: Mock Payment
const Step2_Payment = ({ onPay, onBack, totalAmount, currency }) => {
    const formatPrice = (amount) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: currency, minimumFractionDigits: 2 }).format(amount);

    return (
        <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Secure Payment Gateway</h2>
            <p className="text-muted-foreground mb-6">You are about to pay the total amount into Zimba's secure escrow.</p>
            <div className="bg-primary/10 p-6 rounded-lg mb-6">
                <p className="text-muted-foreground">Total Amount</p>
                <p className="text-4xl font-bold text-primary">{formatPrice(totalAmount)}</p>
            </div>
            <p className="text-xs text-muted-foreground mb-6">This simulates a secure payment process with our trusted payment partners.</p>
            <div className="flex gap-4">
                <Button onClick={onBack} variant="outline" size="lg" className="flex-1">Go Back</Button>
                <Button onClick={onPay} size="lg" className="flex-1">Pay Now</Button>
            </div>
        </div>
    );
};

// Step 3: Confirmation
const Step3_Confirmation = ({ property, bookingId }) => {
  return (
    <div className="text-center">
        <div className="p-4 bg-green-50 rounded-full inline-block mb-4">
            <Icon name="PartyPopper" size={40} className="text-green-600"/>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Booking Confirmed & Secured!</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Congratulations! Your booking for **{property.title}** is confirmed. Your payment is now safely held in Zimba Escrow.
        </p>
        <div className="bg-muted/50 p-4 rounded-lg text-left text-sm space-y-2 mb-6">
            <p><strong>Booking ID:</strong> {bookingId}</p>
            <p><strong>Next Step:</strong> Contact your landlord, {property.landlordName}, to arrange for key collection. Once you have the keys and are satisfied, you must confirm this in your dashboard to release the funds.</p>
        </div>
        <Link to="/dashboard?tab=my-bookings">
            <Button size="lg">Go to My Bookings</Button>
        </Link>
    </div>
  );
};


const BookingFlowPage = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const { isDiasporaUser } = useDiaspora();

  const [currentStep, setCurrentStep] = useState(1);
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const totalAmount = property ? property.price * (1 + 0.05 + (isDiasporaUser ? 0.02 : 0)) : 0;

  useEffect(() => {
    if (!propertyId) {
      setError("No property specified for booking.");
      setIsLoading(false);
      return;
    }
    const loadProperty = async () => {
      try {
        const propData = await fetchPropertyForBooking(propertyId);
        if (propData) {
          setProperty(propData);
        } else {
          setError("Could not find the property you're trying to book.");
        }
      } catch (err) {
        setError("An error occurred while fetching property details.");
      } finally {
        setIsLoading(false);
      }
    };
    loadProperty();
  }, [propertyId]);

  const handleNextStep = () => setCurrentStep(prev => prev + 1);
  const handlePrevStep = () => setCurrentStep(prev => prev - 1);

  const handlePayment = () => {
      console.log("Simulating payment processing...");
      setIsLoading(true);
      setTimeout(() => {
          const newBookingId = `booking_${property.id}_${Date.now()}`;
          const newBooking = {
              id: newBookingId,
              propertyId: property.id,
              propertyName: property.title,
              propertyImage: property.image,
              landlordName: property.landlordName,
              startDate: '2024-11-01', // Mocked dates for now
              endDate: '2025-10-31',
              totalPrice: totalAmount,
              currency: property.currency,
              escrow_state: 'escrow_active', // Payment is "made", so escrow is active
              bookedAt: new Date().toISOString(),
          };
          addBooking(newBooking);
          console.log(`Payment successful! New booking created with ID: ${newBookingId}`);
          handleNextStep();
          setIsLoading(false);
      }, 1500);
  };

  const renderContent = () => {
    if (isLoading) return <div className="text-center p-12"><Icon name="LoaderCircle" className="animate-spin text-primary mx-auto" size={48}/></div>;
    if (error) return <div className="text-center p-12 text-red-500">{error}</div>;
    if (!property) return <div className="text-center p-12">Property data could not be loaded.</div>;

    switch (currentStep) {
      case 1:
        return <Step1_ConfirmDetails property={property} onNext={handleNextStep} isDiaspora={isDiasporaUser} />;
      case 2:
        return <Step2_Payment onPay={handlePayment} onBack={handlePrevStep} totalAmount={totalAmount} currency={property.currency}/>;
      case 3:
        return <Step3_Confirmation property={property} bookingId={`booking_${property.id}_${new Date().getTime()}`} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-card p-8 rounded-2xl shadow-2xl">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default BookingFlowPage;
