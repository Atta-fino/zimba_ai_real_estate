import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PrimaryTabNavigation from '../../components/ui/PrimaryTabNavigation';
import { cn } from '../../utils/cn';
import CheckoutForm from './components/CheckoutForm';

// Mock property data
const mockProperties = [
    {
      id: 1,
      title: 'Modern 2-Bedroom Apartment',
      price: 850000,
      currency: 'NGN',
      location: 'Victoria Island, Lagos',
      landlord: { name: 'Mr. Adebayo' },
      escrowEnabled: true,
    },
    {
      id: 2,
      title: 'Luxury Self-Contain Studio',
      price: 450000,
      currency: 'NGN',
      location: 'Ikeja GRA, Lagos',
      landlord: { name: 'Mrs. Okoro' },
      escrowEnabled: false,
    }
  ];


const LanguageContext = React.createContext({ language: 'en' });

const EscrowPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const [property, setProperty] = useState(null);
  const [escrowState, setEscrowState] = useState('initiated'); // states: initiated, payment_pending, payment_confirmed, move_in_pending, completed, dispute
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const foundProperty = mockProperties.find(p => p.id.toString() === id);
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      // Handle property not found, maybe redirect
    }
  }, [id]);

  const t = {
    en: {
      title: "Escrow & Payment",
      backToProperty: "Back to Property Details",
      timeline: "Transaction Timeline",
      step1: "You initiated the transaction",
      step1Desc: "The rental process has started. Next step is to fund the escrow.",
      step2: "Fund Escrow",
      step2Desc: "Pay the total amount into the secure escrow account.",
      step3: "Landlord Confirms",
      step3Desc: "The landlord will confirm the payment and prepare for your move-in.",
      step4: "Move-In Day",
      step4Desc: "After you move in, we'll release the funds to the landlord.",
      step5: "Transaction Complete",
      step5Desc: "Congratulations on your new home!",
      summary: "Transaction Summary",
      rent: "Annual Rent",
      serviceFee: "Service Fee (5%)",
      total: "Total Payable",
      securePay: "Proceed to Secure Payment",
      paymentNotice: "You will be redirected to our secure payment partner to complete this transaction.",
      status: "Status",
      contactSupport: "Contact Support",
    },
  };

  const timelineSteps = [
    { id: 'initiated', title: t.en.step1, description: t.en.step1Desc },
    { id: 'payment_pending', title: t.en.step2, description: t.en.step2Desc },
    { id: 'payment_confirmed', title: t.en.step3, description: t.en.step3Desc },
    { id: 'move_in_pending', title: t.en.step4, description: t.en.step4Desc },
    { id: 'completed', title: t.en.step5, description: t.en.step5Desc },
  ];

  const currentStepIndex = timelineSteps.findIndex(step => step.id === escrowState);

  const stripePromise = loadStripe('pk_test_51Hh2Y2LgR1gX5X5X5X5X5X5X5X5X5X5X5X5X5X5X5X5X5X5X5X5X5X5X5X5X5X5X');

  const [transactionId, setTransactionId] = useState(null);

  const handleSuccessfulCheckout = async () => {
    if (transactionId) {
      await fetch(`http://localhost:3001/api/escrow/${transactionId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'payment_confirmed' }),
      });
      setEscrowState('payment_confirmed');
    }
  };

  useEffect(() => {
    if (property) {
      const createTransaction = async () => {
        const response = await fetch('http://localhost:3001/api/escrow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            propertyId: property.id,
            tenantId: 'tenant123', // Replace with actual tenant ID
            landlordId: 'landlord456', // Replace with actual landlord ID
            amount: totalPayable,
          }),
        });
        const data = await response.json();
        setTransactionId(data.transactionId);
      };
      createTransaction();
    }
  }, [property]);

  if (!property) {
    return <div>Loading...</div>; // Or a proper skeleton loader
  }

  const serviceFee = property.price * 0.05;
  const totalPayable = property.price + serviceFee;

  const formatPrice = (price, currency) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PrimaryTabNavigation />

      <main className="pt-16 md:pt-24 pb-20 md:pb-8">
        <div className="container mx-auto px-4 lg:px-6 py-6">
          <Link to={`/property-detail-view/${id}`} className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground mb-4">
            <Icon name="ArrowLeft" size={16} />
            <span>{t.en.backToProperty}</span>
          </Link>

          <h1 className="text-3xl font-bold font-heading mb-2">{t.en.title}</h1>
          <p className="text-muted-foreground mb-8">For "{property.title}"</p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Timeline */}
            <div className="lg:col-span-1">
              <h2 className="text-xl font-semibold mb-4">{t.en.timeline}</h2>
              <div className="relative">
                {timelineSteps.map((step, index) => (
                  <div key={step.id} className="relative flex items-start pb-8">
                    <div className="flex flex-col items-center mr-4">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center",
                        index <= currentStepIndex ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        <Icon name="Check" size={16} />
                      </div>
                      {index < timelineSteps.length - 1 && (
                        <div className={cn(
                          "w-0.5 h-full mt-2",
                          index < currentStepIndex ? "bg-primary" : "bg-muted"
                        )} />
                      )}
                    </div>
                    <div className="pt-1">
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-lg p-6 shadow-card">
                <h2 className="text-xl font-semibold mb-4">{t.en.summary}</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{t.en.rent}</span>
                    <span className="font-semibold">{formatPrice(property.price, property.currency)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{t.en.serviceFee}</span>
                    <span className="font-semibold">{formatPrice(serviceFee, property.currency)}</span>
                  </div>
                  <div className="border-t border-border my-4"></div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>{t.en.total}</span>
                    <span>{formatPrice(totalPayable, property.currency)}</span>
                  </div>
                </div>

                <div className="mt-6">
                  {escrowState === 'initiated' && (
                    <Elements stripe={stripePromise}>
                      <CheckoutForm
                        amount={totalPayable}
                        currency={property.currency}
                        onSuccessfulCheckout={handleSuccessfulCheckout}
                      />
                    </Elements>
                  )}

                  {escrowState !== 'initiated' && (
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="font-semibold">{t.en.status}: <span className="capitalize">{escrowState.replace('_', ' ')}</span></p>
                      <p className="text-sm text-muted-foreground mt-1">Further actions will be available once the current step is completed.</p>
                      {escrowState === 'move_in_pending' && (
                        <Button variant="destructive" size="sm" className="mt-4" onClick={() => {
                          alert('Dispute raised. Our support team will contact you shortly.');
                        }}>
                          Raise a Dispute
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="mt-4">
                        <Icon name="MessageCircle" size={14} className="mr-2" />
                        {t.en.contactSupport}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EscrowPage;
