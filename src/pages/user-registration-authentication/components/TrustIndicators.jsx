import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = ({ language }) => {
  const translations = {
    en: {
      whyZimba: 'Why Choose Zimba AI? 🏠',
      secureEscrow: 'Secure Escrow Protection',
      escrowDesc: 'Your payments are protected until you receive your keys',
      verifiedLandlords: 'Verified Landlords Only',
      landlordsDesc: 'All property owners go through our strict verification process',
      aiSupport: '24/7 AI Chat Support',
      supportDesc: 'Get instant help with bookings, payments, and property questions',
      flexPay: 'FlexPay Options',
      flexPayDesc: 'Pay rent monthly instead of yearly with our flexible payment plans',
      diasporaFriendly: 'Diaspora-Friendly',
      diasporaDesc: 'Rent properties from abroad with virtual tours and agent support',
      trustedBy: 'Trusted by 50,000+ Africans',
      countries: 'Available in 10+ African countries'
    },
    fr: {
      whyZimba: 'Pourquoi Choisir Zimba AI? 🏠',
      secureEscrow: 'Protection Escrow Sécurisée',
      escrowDesc: 'Vos paiements sont protégés jusqu\'à ce que vous receviez vos clés',
      verifiedLandlords: 'Propriétaires Vérifiés Uniquement',
      landlordsDesc: 'Tous les propriétaires passent par notre processus de vérification strict',
      aiSupport: 'Support Chat IA 24/7',
      supportDesc: 'Obtenez une aide instantanée pour les réservations, paiements et questions immobilières',
      flexPay: 'Options FlexPay',
      flexPayDesc: 'Payez le loyer mensuellement au lieu d\'annuellement avec nos plans flexibles',
      diasporaFriendly: 'Adapté à la Diaspora',
      diasporaDesc: 'Louez des propriétés depuis l\'étranger avec des visites virtuelles et un support d\'agent',
      trustedBy: 'Approuvé par 50 000+ Africains',
      countries: 'Disponible dans 10+ pays africains'
    },
    ar: {
      whyZimba: 'لماذا تختار زيمبا AI؟ 🏠',
      secureEscrow: 'حماية الضمان الآمن',
      escrowDesc: 'مدفوعاتك محمية حتى تستلم مفاتيحك',
      verifiedLandlords: 'ملاك موثقون فقط',
      landlordsDesc: 'جميع مالكي العقارات يمرون بعملية التحقق الصارمة لدينا',
      aiSupport: 'دعم الدردشة بالذكاء الاصطناعي 24/7',
      supportDesc: 'احصل على مساعدة فورية في الحجوزات والمدفوعات وأسئلة العقارات',
      flexPay: 'خيارات FlexPay',
      flexPayDesc: 'ادفع الإيجار شهرياً بدلاً من سنوياً مع خططنا المرنة',
      diasporaFriendly: 'مناسب للمهجر',
      diasporaDesc: 'استأجر العقارات من الخارج مع الجولات الافتراضية ودعم الوكيل',
      trustedBy: 'موثوق من قبل 50,000+ أفريقي',
      countries: 'متوفر في 10+ دول أفريقية'
    },
    sw: {
      whyZimba: 'Kwa Nini Uchague Zimba AI? 🏠',
      secureEscrow: 'Ulinzi wa Escrow Salama',
      escrowDesc: 'Malipo yako yamelindwa hadi upokee funguo zako',
      verifiedLandlords: 'Wamiliki Waliohakikiwa Tu',
      landlordsDesc: 'Wamiliki wote wa mali wanapitia mchakato wetu mkali wa uhakiki',
      aiSupport: 'Msaada wa Mazungumzo ya AI 24/7',
      supportDesc: 'Pata msaada wa haraka na uhifadhi, malipo na maswali ya mali',
      flexPay: 'Chaguo za FlexPay',
      flexPayDesc: 'Lipa kodi kila mwezi badala ya kila mwaka na mipango yetu ya kubadilika',
      diasporaFriendly: 'Inafaa kwa Diaspora',
      diasporaDesc: 'Kodisha mali kutoka nje na ziara za mtandaoni na msaada wa wakala',
      trustedBy: 'Imekubalika na Waafrika 50,000+',
      countries: 'Inapatikana katika nchi 10+ za Afrika'
    },
    am: {
      whyZimba: 'ዚምባ AI ን ለምን ይምረጡ? 🏠',
      secureEscrow: 'ደህንነቱ የተጠበቀ የኤስክሮው ጥበቃ',
      escrowDesc: 'ክፍያዎችዎ ቁልፎችዎን እስከሚቀበሉ ድረስ የተጠበቁ ናቸው',
      verifiedLandlords: 'የተረጋገጡ የቤት ባለቤቶች ብቻ',
      landlordsDesc: 'ሁሉም የንብረት ባለቤቶች በእኛ ጥብቅ የማረጋገጫ ሂደት ውስጥ ያልፋሉ',
      aiSupport: '24/7 AI ውይይት ድጋፍ',
      supportDesc: 'በቦታ ማስያዝ፣ ክፍያዎች እና የንብረት ጥያቄዎች ላይ ፈጣን እርዳታ ያግኙ',
      flexPay: 'FlexPay አማራጮች',
      flexPayDesc: 'በተለዋዋጭ የክፍያ እቅዶቻችን በየወሩ ኪራይ ይክፈሉ ከየዓመቱ ይልቅ',
      diasporaFriendly: 'ለዲያስፖራ ተስማሚ',
      diasporaDesc: 'ከውጭ ንብረቶችን በምናባዊ ጉብኝቶች እና የወኪል ድጋፍ ይከራዩ',
      trustedBy: 'በ50,000+ አፍሪካውያን የታመነ',
      countries: 'በ10+ የአፍሪካ ሀገራት ውስጥ ይገኛል'
    }
  };

  const t = translations[language] || translations.en;

  const trustFeatures = [
    {
      icon: 'Shield',
      title: t.secureEscrow,
      description: t.escrowDesc,
      color: 'text-green-600'
    },
    {
      icon: 'BadgeCheck',
      title: t.verifiedLandlords,
      description: t.landlordsDesc,
      color: 'text-blue-600'
    },
    {
      icon: 'MessageCircle',
      title: t.aiSupport,
      description: t.supportDesc,
      color: 'text-purple-600'
    },
    {
      icon: 'CreditCard',
      title: t.flexPay,
      description: t.flexPayDesc,
      color: 'text-orange-600'
    },
    {
      icon: 'Globe',
      title: t.diasporaFriendly,
      description: t.diasporaDesc,
      color: 'text-indigo-600'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          {t.whyZimba}
        </h2>
        <div className="space-y-1">
          <p className="text-sm font-body text-muted-foreground">
            {t.trustedBy}
          </p>
          <p className="text-xs font-caption text-muted-foreground">
            {t.countries}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {trustFeatures.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-card rounded-lg border border-border/50">
            <div className={`flex-shrink-0 ${feature.color}`}>
              <Icon name={feature.icon} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-body font-semibold text-sm text-foreground mb-1">
                {feature.title}
              </h3>
              <p className="font-caption text-xs text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-lg p-4 border border-border/50">
        <div className="flex items-center justify-center space-x-4 text-center">
          <div className="flex items-center space-x-2">
            <Icon name="Star" size={16} className="text-yellow-500" />
            <span className="font-body font-semibold text-sm">4.8/5</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="font-caption text-xs text-muted-foreground">50K+ Users</span>
          </div>
          <div className="w-px h-4 bg-border" />
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-accent" />
            <span className="font-caption text-xs text-muted-foreground">10+ Countries</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustIndicators;