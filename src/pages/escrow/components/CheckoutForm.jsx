import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CheckoutForm = ({ amount, currency, onSuccessfulCheckout }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // This is a mock API call to create a PaymentIntent.
    // In a real application, you would make a call to your own server to create the PaymentIntent.
    const response = await fetch('https://mock-payment-gateway.fly.dev/api/payment/create-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency }),
    });
    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        onSuccessfulCheckout();
      }
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" disabled={!stripe || processing} className="w-full mt-4">
        {processing ? (
          <>
            <Icon name="Loader" className="animate-spin mr-2" />
            Processing...
          </>
        ) : (
          `Pay ${new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount)}`
        )}
      </Button>
      {error && <div className="text-destructive mt-2">{error}</div>}
    </form>
  );
};

export default CheckoutForm;
