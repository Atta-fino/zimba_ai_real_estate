import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const OnboardingStep = ({ 
  step, 
  isActive, 
  onNext, 
  onSkip, 
  userRole, 
  language,
  translations 
}) => {
  const t = translations[language] || translations.en;

  const stepContent = {
    1: {
      title: t.step1Title,
      subtitle: t.step1Subtitle,
      description: t.step1Description,
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      icon: "Shield",
      color: "bg-success",
      features: [
        { icon: "BadgeCheck", text: t.verifiedLandlords },
        { icon: "Star", text: t.trustScore },
        { icon: "Users", text: t.realTestimonials }
      ]
    },
    2: {
      title: t.step2Title,
      subtitle: t.step2Subtitle,
      description: t.step2Description,
      image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?w=800&h=600&fit=crop",
      icon: "Lock",
      color: "bg-primary",
      features: [
        { icon: "Shield", text: t.secureEscrow },
        { icon: "CreditCard", text: t.protectedPayments },
        { icon: "CheckCircle", text: t.fundRelease }
      ]
    },
    3: {
      title: t.step3Title,
      subtitle: t.step3Subtitle,
      description: t.step3Description,
      image: "https://images.pixabay.com/photo/2016/11/29/03/53/architecture-1867187_1280.jpg?w=800&h=600&fit=crop",
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
  };

  const content = stepContent[step];

  if (!isActive) return null;

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Hero Image Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src={content.image}
          alt={content.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Floating Icon */}
        <div className={`absolute top-6 right-6 w-12 h-12 ${content.color} rounded-full flex items-center justify-center shadow-lg`}>
          <Icon name={content.icon} size={24} color="white" />
        </div>
        
        {/* Title Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
            {content.title}
          </h2>
          <p className="text-white/90 font-body text-lg">
            {content.subtitle}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 px-6 py-8">
        <div className="max-w-md mx-auto">
          {/* Description */}
          <p className="text-muted-foreground font-body text-center mb-8 leading-relaxed">
            {content.description}
          </p>

          {/* Features List */}
          <div className="space-y-4 mb-8">
            {content.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg hover:shadow-card transition-shadow duration-200"
              >
                <div className={`w-10 h-10 ${content.color} rounded-full flex items-center justify-center`}>
                  <Icon name={feature.icon} size={20} color="white" />
                </div>
                <span className="font-body font-medium text-foreground">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Interactive Element */}
          {step === 1 && (
            <div className="bg-muted rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Star" size={20} color="white" />
                </div>
                <div>
                  <p className="font-body font-semibold text-foreground">TrustScore: 4.8/5</p>
                  <p className="font-caption text-xs text-muted-foreground">{t.sampleLandlord}</p>
                </div>
              </div>
              <p className="font-caption text-sm text-muted-foreground italic">
                "{t.testimonialText}"
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="bg-primary/10 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-body font-medium text-foreground">{t.escrowStatus}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                  <span className="font-caption text-sm text-success">{t.active}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={16} className="text-primary" />
                <span className="font-caption text-sm text-muted-foreground">
                  {t.fundsProtected}
                </span>
              </div>
            </div>
          )}

          {step === 3 && userRole === 'diaspora' && (
            <div className="bg-accent/10 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Video" size={20} className="text-accent" />
                <span className="font-body font-medium text-foreground">{t.virtualTourAvailable}</span>
              </div>
              <p className="font-caption text-sm text-muted-foreground">
                {t.virtualTourDescription}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-8">
        <div className="max-w-md mx-auto space-y-3">
          <Button
            variant="default"
            fullWidth
            onClick={onNext}
            iconName="ChevronRight"
            iconPosition="right"
            className="touch-target"
          >
            {step === 3 ? t.getStarted : t.next}
          </Button>
          
          <Button
            variant="ghost"
            fullWidth
            onClick={onSkip}
            className="text-muted-foreground touch-target"
          >
            {t.skip}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep;