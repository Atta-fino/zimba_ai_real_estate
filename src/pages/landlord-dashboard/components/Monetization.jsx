import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MonetizationFeatureCard = ({ iconName, title, description, actionText, onAction, tier }) => {
  let iconColor = "text-primary";
  if (tier === "pro") iconColor = "text-accent"; // Example: different color for Pro features

  return (
    <div className="bg-card rounded-xl shadow-lg p-6 flex flex-col items-start hover:shadow-xl transition-shadow duration-200">
      <div className={`p-3 rounded-full bg-primary/10 mb-4 ${tier === "pro" ? "bg-accent/10" : "bg-primary/10"}`}>
        <Icon name={iconName} size={28} className={iconColor} />
      </div>
      <h3 className="text-xl font-semibold font-heading text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 flex-grow">{description}</p>
      <Button onClick={onAction} variant={tier === "pro" ? "default" : "outline"} className="w-full mt-auto">
        {actionText}
      </Button>
    </div>
  );
};

const Monetization = () => {
  const handleBoostListing = () => {
    console.log('Boost Listing clicked - initiate payment flow or show options');
    // TODO: Navigate to boost listing flow / payment modal
  };

  const handleGetVerified = () => {
    console.log('Get Verified Badge clicked - navigate to verification process');
    // TODO: Navigate to verification info/submission page
  };

  const handleUpgradeToPro = () => {
    console.log('Upgrade to Pro Agent clicked - navigate to subscription/payment page');
    // TODO: Navigate to Pro Agent subscription page
  };

  return (
    <div className="p-1 md:p-0">
      <h2 className="text-2xl font-semibold font-heading text-foreground mb-6 px-1 md:px-0">Grow Your Reach & Trust</h2>
      <p className="text-muted-foreground mb-8 px-1 md:px-0">
        Unlock premium features to maximize your property's visibility, build more trust with tenants, and manage your listings like a pro.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MonetizationFeatureCard
          iconName="Rocket"
          title="🚀 Boost Listing"
          description="Increase your property's visibility by featuring it at the top of search results for a selected period. Attract more potential tenants faster."
          actionText="Boost Your Property"
          onAction={handleBoostListing}
        />
        <MonetizationFeatureCard
          iconName="BadgeCheck"
          title="🔐 Get Verified Landlord Badge"
          description="Build more trust by completing our verification process. Verified landlords stand out and attract more serious tenants. This involves ID and biometric checks."
          actionText="Complete Your Verification"
          onAction={handleGetVerified} // This could navigate to the Verification tab or prompt
        />
        <MonetizationFeatureCard
          iconName="Briefcase"
          title="💼 Upgrade to Pro Agent"
          description="Access advanced tools, analytics, priority support, and manage more listings with a Pro Agent subscription. Ideal for professional agents."
          actionText="Explore Pro Agent Benefits"
          onAction={handleUpgradeToPro}
          tier="pro"
        />
      </div>

      <div className="mt-12 p-6 bg-card rounded-lg shadow text-center border border-border">
        <Icon name="CreditCard" size={32} className="mx-auto text-primary mb-3" />
        <h3 className="text-lg font-semibold text-foreground">Secure Payments</h3>
        <p className="text-sm text-muted-foreground mt-1">
          All payments for premium features are processed securely via Paystack, Flutterwave, Stripe, or Wise.
        </p>
      </div>
    </div>
  );
};

export default Monetization;
