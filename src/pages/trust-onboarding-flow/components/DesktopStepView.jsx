import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DesktopStepView = ({ 
  currentStep, 
  onStepChange, 
  onComplete, 
  userRole, 
  language, 
  translations 
}) => {
  const t = translations[language] || translations.en;

  const steps = [
    {
      id: 1,
      title: t.step1Title,
      subtitle: t.step1Subtitle,
      description: t.step1Description,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      icon: "Shield",
      color: "bg-success",
      features: [
        { icon: "BadgeCheck", text: t.verifiedLandlords },
        { icon: "Star", text: t.trustScore },
        { icon: "Users", text: t.realTestimonials }
      ]
    },
    {
      id: 2,
      title: t.step2Title,
      subtitle: t.step2Subtitle,
      description: t.step2Description,
      image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?w=600&h=400&fit=crop",
      icon: "Lock",
      color: "bg-primary",
      features: [
        { icon: "Shield", text: t.secureEscrow },
        { icon: "CreditCard", text: t.protectedPayments },
        { icon: "CheckCircle", text: t.fundRelease }
      ]
    },
    {
      id: 3,
      title: t.step3Title,
      subtitle: t.step3Subtitle,
      description: t.step3Description,
      image: "https://images.pixabay.com/photo/2016/11/29/03/53/architecture-1867187_1280.jpg?w=600&h=400&fit=crop",
      icon: "Globe",
      color: "bg-accent",
      features: userRole === 'diaspora' ? [
        { icon: "Video", text: t.virtualTours },
        { icon: "Upload", text: t.documentUpload },
        { icon: "UserCheck", text: t.agentConnection }
      ] : [
        { icon: "DollarSign", text: t.flexPay },
        { icon: "Globe", text: t.multiCurrency },
        { icon: "MapPin", text: t.localSupport }
      ]
    }
  ];

  return (
    <div className="hidden lg:block bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
            {t.buildingTrust}
          </h1>
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto">
            {t.desktopSubtitle}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`bg-card border rounded-xl overflow-hidden transition-all duration-300 cursor-pointer hover:shadow-lg ${
                currentStep === step.id
                  ? 'border-primary shadow-card scale-105'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => onStepChange(step.id)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className={`absolute top-4 right-4 w-10 h-10 ${step.color} rounded-full flex items-center justify-center`}>
                  <Icon name={step.icon} size={20} color="white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground font-body mb-4">
                  {step.subtitle}
                </p>
                
                {/* Features */}
                <div className="space-y-3">
                  {step.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <div className={`w-6 h-6 ${step.color} rounded-full flex items-center justify-center`}>
                        <Icon name={feature.icon} size={14} color="white" />
                      </div>
                      <span className="font-caption text-sm text-foreground">
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Current Step Detail */}
        <div className="bg-card border border-border rounded-xl p-8">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 ${steps[currentStep - 1].color} rounded-full flex items-center justify-center`}>
                  <Icon name={steps[currentStep - 1].icon} size={24} color="white" />
                </div>
                <div>
                  <h2 className="text-2xl font-heading font-bold text-foreground">
                    {steps[currentStep - 1].title}
                  </h2>
                  <p className="text-muted-foreground font-body">
                    {steps[currentStep - 1].subtitle}
                  </p>
                </div>
              </div>
              
              <p className="text-foreground font-body text-lg leading-relaxed mb-6">
                {steps[currentStep - 1].description}
              </p>

              {/* Interactive Elements */}
              {currentStep === 1 && (
                <div className="bg-success/10 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Star" size={20} color="white" />
                    </div>
                    <div>
                      <p className="font-body font-semibold text-foreground">TrustScore: 4.8/5</p>
                      <p className="font-caption text-sm text-muted-foreground">{t.sampleLandlord}</p>
                    </div>
                  </div>
                  <p className="font-body text-foreground italic">
                    "{t.testimonialText}"
                  </p>
                </div>
              )}

              <div className="flex items-center space-x-4">
                <Button
                  variant="default"
                  onClick={() => {
                    if (currentStep < 3) {
                      onStepChange(currentStep + 1);
                    } else {
                      onComplete();
                    }
                  }}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  {currentStep === 3 ? t.getStarted : t.next}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={onComplete}
                >
                  {t.skip}
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden">
                <Image
                  src={steps[currentStep - 1].image}
                  alt={steps[currentStep - 1].title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopStepView;