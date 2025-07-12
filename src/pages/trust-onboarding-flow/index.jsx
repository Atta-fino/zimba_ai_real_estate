import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingStep from './components/OnboardingStep';
import ProgressIndicator from './components/ProgressIndicator';
import WelcomeHeader from './components/WelcomeHeader';
import DesktopStepView from './components/DesktopStepView';

// Language Context
const LanguageContext = React.createContext({
  language: 'en',
  setLanguage: () => {}
});

const TrustOnboardingFlow = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [userRole, setUserRole] = useState('renter');
  const [userName, setUserName] = useState('');

  const totalSteps = 3;

  // Load user data from localStorage or context
  useEffect(() => {
    const savedLanguage = localStorage.getItem('zimba-language') || 'en';
    const savedUserRole = localStorage.getItem('zimba-user-role') || 'renter';
    const savedUserName = localStorage.getItem('zimba-user-name') || '';
    
    setUserRole(savedUserRole);
    setUserName(savedUserName);
  }, []);

  const translations = {
    en: {
      // Navigation
      step: "Step",
      of: "of",
      next: "Next",
      skip: "Skip",
      getStarted: "Get Started",
      
      // Welcome messages
      welcomeRenter: "Welcome to Zimba AI",
      welcomeLandlord: "Welcome, Property Owner",
      welcomeDiaspora: "Welcome Home",
      renterSubtitle: "Find your perfect home with confidence and security",
      landlordSubtitle: "Connect with verified tenants and grow your property business",
      diasporaSubtitle: "Your trusted bridge to properties back home",
      
      // Trust indicators
      secure: "Secure",
      verified: "Verified",
      trusted: "Trusted",
      
      // Step 1 - Verified Landlords
      step1Title: "Verified Landlords 🏠",
      step1Subtitle: "Meet trusted property owners",
      step1Description: "Every landlord on Zimba AI goes through our comprehensive verification process. We check IDs, property ownership, and track their responsiveness to ensure you're dealing with legitimate, reliable property owners.",
      verifiedLandlords: "ID & Property Verified",
      trustScore: "TrustScore Rating System",
      realTestimonials: "Real Tenant Reviews",
      sampleLandlord: "Verified Landlord - Accra, Ghana",
      testimonialText: "Professional and responsive. Made my property search so much easier!",
      
      // Step 2 - Secure Escrow
      step2Title: "Secure Escrow 🔒",
      step2Subtitle: "Your money is protected",
      step2Description: "Our escrow service holds your deposit and rent payments securely until you receive your keys and confirm everything is as promised. No more worries about losing money to fraudulent listings.",
      secureEscrow: "Bank-Level Security",
      protectedPayments: "Protected Transactions",
      fundRelease: "Automatic Fund Release",
      escrowStatus: "Escrow Protection",
      active: "Active",
      fundsProtected: "Your funds are secure",
      
      // Step 3 - Regional Features
      step3Title: "Built for Africa 🌍",
      step3Subtitle: "Features designed for you",
      step3Description: "From FlexPay options that work with your salary schedule to multi-currency support for diaspora users, we understand the unique needs of African property seekers.",
      flexPay: "FlexPay Options",
      multiCurrency: "Multi-Currency Support",
      localSupport: "Local Language Support",
      virtualTours: "Virtual Property Tours",
      documentUpload: "Secure Document Upload",
      agentConnection: "Trusted Agent Network",
      virtualTourAvailable: "Virtual Tour Available",
      virtualTourDescription: "View properties remotely with our 360° virtual tours",
      
      // Desktop specific
      buildingTrust: "Building Trust in African Real Estate",
      desktopSubtitle: "Discover how Zimba AI creates a secure, transparent property marketplace"
    },
    fr: {
      // Navigation
      step: "Étape",
      of: "de",
      next: "Suivant",
      skip: "Ignorer",
      getStarted: "Commencer",
      
      // Welcome messages
      welcomeRenter: "Bienvenue sur Zimba AI",
      welcomeLandlord: "Bienvenue, Propriétaire",
      welcomeDiaspora: "Bienvenue à la Maison",
      renterSubtitle: "Trouvez votre maison parfaite en toute confiance et sécurité",
      landlordSubtitle: "Connectez-vous avec des locataires vérifiés et développez votre activité immobilière",
      diasporaSubtitle: "Votre pont de confiance vers les propriétés de votre pays",
      
      // Trust indicators
      secure: "Sécurisé",
      verified: "Vérifié",
      trusted: "Fiable",
      
      // Step 1
      step1Title: "Propriétaires Vérifiés 🏠",
      step1Subtitle: "Rencontrez des propriétaires de confiance",
      step1Description: "Chaque propriétaire sur Zimba AI passe par notre processus de vérification complet. Nous vérifions les pièces d'identité, la propriété et suivons leur réactivité.",
      verifiedLandlords: "ID et Propriété Vérifiés",
      trustScore: "Système de Note de Confiance",
      realTestimonials: "Vrais Avis de Locataires",
      sampleLandlord: "Propriétaire Vérifié - Accra, Ghana",
      testimonialText: "Professionnel et réactif. A rendu ma recherche de propriété si facile!",
      
      // Step 2
      step2Title: "Séquestre Sécurisé 🔒",
      step2Subtitle: "Votre argent est protégé",
      step2Description: "Notre service de séquestre détient vos dépôts et paiements de loyer en sécurité jusqu\'à ce que vous receviez vos clés.",
      secureEscrow: "Sécurité Bancaire",
      protectedPayments: "Transactions Protégées",
      fundRelease: "Libération Automatique des Fonds",
      escrowStatus: "Protection Séquestre",
      active: "Actif",
      fundsProtected: "Vos fonds sont sécurisés",
      
      // Step 3
      step3Title: "Conçu pour l\'Afrique 🌍",
      step3Subtitle: "Fonctionnalités conçues pour vous",
      step3Description: "Des options FlexPay qui fonctionnent avec votre horaire de salaire au support multi-devises pour les utilisateurs de la diaspora.",
      flexPay: "Options FlexPay",
      multiCurrency: "Support Multi-Devises",
      localSupport: "Support Langue Locale",
      virtualTours: "Visites Virtuelles",
      documentUpload: "Upload Sécurisé de Documents",
      agentConnection: "Réseau d\'Agents de Confiance",
      virtualTourAvailable: "Visite Virtuelle Disponible",
      virtualTourDescription: "Visitez les propriétés à distance avec nos visites virtuelles 360°",
      
      // Desktop specific
      buildingTrust: "Construire la Confiance dans l\'Immobilier Africain",
      desktopSubtitle: "Découvrez comment Zimba AI crée un marché immobilier sécurisé et transparent"
    },
    ar: {
      // Navigation
      step: "خطوة",
      of: "من",
      next: "التالي",
      skip: "تخطي",
      getStarted: "ابدأ",
      
      // Welcome messages
      welcomeRenter: "مرحباً بك في زيمبا AI",
      welcomeLandlord: "مرحباً، مالك العقار",
      welcomeDiaspora: "مرحباً بعودتك للوطن",
      renterSubtitle: "اعثر على منزلك المثالي بثقة وأمان",
      landlordSubtitle: "تواصل مع مستأجرين موثقين وطور أعمالك العقارية",
      diasporaSubtitle: "جسرك الموثوق للعقارات في وطنك",
      
      // Trust indicators
      secure: "آمن",
      verified: "موثق",
      trusted: "موثوق",
      
      // Step 1
      step1Title: "ملاك موثقون 🏠",
      step1Subtitle: "تعرف على ملاك عقارات موثوقين",
      step1Description: "كل مالك عقار في زيمبا AI يمر بعملية التحقق الشاملة. نتحقق من الهويات وملكية العقارات ونتابع استجابتهم.",
      verifiedLandlords: "هوية وعقار موثق",
      trustScore: "نظام تقييم الثقة",
      realTestimonials: "مراجعات حقيقية من المستأجرين",
      sampleLandlord: "مالك موثق - أكرا، غانا",
      testimonialText: "مهني ومتجاوب. جعل البحث عن العقار سهلاً جداً!",
      
      // Step 2
      step2Title: "ضمان آمن 🔒",
      step2Subtitle: "أموالك محمية",
      step2Description: "خدمة الضمان لدينا تحتفظ بودائعك ومدفوعات الإيجار بأمان حتى تستلم مفاتيحك وتؤكد أن كل شيء كما وُعد.",
      secureEscrow: "أمان مصرفي",
      protectedPayments: "معاملات محمية",
      fundRelease: "إطلاق تلقائي للأموال",
      escrowStatus: "حماية الضمان",
      active: "نشط",
      fundsProtected: "أموالك آمنة",
      
      // Step 3
      step3Title: "مصمم لأفريقيا 🌍",
      step3Subtitle: "ميزات مصممة لك",
      step3Description: "من خيارات FlexPay التي تعمل مع جدول راتبك إلى دعم العملات المتعددة لمستخدمي الشتات.",
      flexPay: "خيارات الدفع المرن",
      multiCurrency: "دعم العملات المتعددة",
      localSupport: "دعم اللغة المحلية",
      virtualTours: "جولات افتراضية",
      documentUpload: "رفع آمن للمستندات",
      agentConnection: "شبكة وكلاء موثوقين",
      virtualTourAvailable: "جولة افتراضية متاحة",
      virtualTourDescription: "شاهد العقارات عن بُعد بجولاتنا الافتراضية 360°",
      
      // Desktop specific
      buildingTrust: "بناء الثقة في العقارات الأفريقية",
      desktopSubtitle: "اكتشف كيف تخلق زيمبا AI سوقاً عقارياً آمناً وشفافاً"
    },
    sw: {
      // Navigation
      step: "Hatua",
      of: "ya",
      next: "Ifuatayo",
      skip: "Ruka",
      getStarted: "Anza",
      
      // Welcome messages
      welcomeRenter: "Karibu Zimba AI",
      welcomeLandlord: "Karibu, Mmiliki wa Mali",
      welcomeDiaspora: "Karibu Nyumbani",
      renterSubtitle: "Pata nyumba yako kamili kwa kujiamini na usalama",
      landlordSubtitle: "Unganisha na wapangaji waliohakikiwa na ukuze biashara yako ya mali",
      diasporaSubtitle: "Daraja lako la kuaminika kwa mali nyumbani",
      
      // Trust indicators
      secure: "Salama",
      verified: "Imehakikiwa",
      trusted: "Inaaminika",
      
      // Step 1
      step1Title: "Wamiliki Waliohakikiwa 🏠",
      step1Subtitle: "Kutana na wamiliki wa mali wanaaminika",
      step1Description: "Kila mmiliki wa mali kwenye Zimba AI anapitia mchakato wetu kamili wa uhakiki. Tunahakiki vitambulisho, umiliki wa mali, na kufuatilia majibu yao.",
      verifiedLandlords: "Kitambulisho na Mali Imehakikiwa",
      trustScore: "Mfumo wa Kiwango cha Kuamini",
      realTestimonials: "Maoni ya Kweli ya Wapangaji",
      sampleLandlord: "Mmiliki Aliyehakikiwa - Accra, Ghana",
      testimonialText: "Mtaalamu na mwenye kujibu. Alifanya utafutaji wangu wa mali kuwa rahisi sana!",
      
      // Step 2
      step2Title: "Escrow Salama 🔒",
      step2Subtitle: "Pesa zako zimelindwa",
      step2Description: "Huduma yetu ya escrow inashikilia amana zako na malipo ya kodi kwa usalama hadi upokee funguo zako na kuthibitisha kuwa kila kitu ni kama ilivyoahidiwa.",
      secureEscrow: "Usalama wa Kiwango cha Benki",
      protectedPayments: "Miamala Iliyolindwa",
      fundRelease: "Utoaji wa Kiotomatiki wa Fedha",
      escrowStatus: "Ulinzi wa Escrow",
      active: "Inatumika",
      fundsProtected: "Fedha zako ni salama",
      
      // Step 3
      step3Title: "Imejengwa kwa Afrika 🌍",
      step3Subtitle: "Vipengele vilivyoundwa kwa ajili yako",
      step3Description: "Kutoka chaguo za FlexPay zinazofanya kazi na ratiba yako ya mshahara hadi msaada wa sarafu nyingi kwa watumiaji wa diaspora.",
      flexPay: "Chaguo za FlexPay",
      multiCurrency: "Msaada wa Sarafu Nyingi",
      localSupport: "Msaada wa Lugha za Kienyeji",
      virtualTours: "Ziara za Kimtandao",
      documentUpload: "Upakiaji Salama wa Hati",
      agentConnection: "Mtandao wa Madalali Wanaaminika",
      virtualTourAvailable: "Ziara ya Kimtandao Inapatikana",
      virtualTourDescription: "Ona mali kwa mbali kwa ziara zetu za kimtandao za 360°",
      
      // Desktop specific
      buildingTrust: "Kujenga Imani katika Mali za Afrika",
      desktopSubtitle: "Gundua jinsi Zimba AI inavyounda soko la mali salama na wazi"
    },
    am: {
      // Navigation
      step: "ደረጃ",
      of: "ከ",
      next: "ቀጣይ",
      skip: "ዝለል",
      getStarted: "ጀምር",
      
      // Welcome messages
      welcomeRenter: "ወደ ዚምባ AI እንኳን በደህና መጡ",
      welcomeLandlord: "እንኳን በደህና መጡ፣ የንብረት ባለቤት",
      welcomeDiaspora: "ወደ ቤት እንኳን በደህና መጡ",
      renterSubtitle: "በመተማመን እና በደህንነት የእርስዎን ፍጹም ቤት ያግኙ",
      landlordSubtitle: "ከተረጋገጡ ተከራዮች ጋር ይገናኙ እና የንብረት ንግድዎን ያሳድጉ",
      diasporaSubtitle: "ወደ ቤት ወደ ንብረቶች የሚወስድዎ የታመነ ድልድይ",
      
      // Trust indicators
      secure: "ደህንነቱ የተጠበቀ",
      verified: "የተረጋገጠ",
      trusted: "የታመነ",
      
      // Step 1
      step1Title: "የተረጋገጡ ቤት ባለቤቶች 🏠",
      step1Subtitle: "የታመኑ የንብረት ባለቤቶችን ይገናኙ",
      step1Description: "በዚምባ AI ላይ ያለ እያንዳንዱ ቤት ባለቤት በእኛ አጠቃላይ የማረጋገጫ ሂደት ውስጥ ያልፋል። መታወቂያዎችን፣ የንብረት ባለቤትነትን እንፈትሻለን።",
      verifiedLandlords: "መታወቂያ እና ንብረት የተረጋገጠ",
      trustScore: "የመተማመኛ ነጥብ ስርዓት",
      realTestimonials: "እውነተኛ የተከራይ ግምገማዎች",
      sampleLandlord: "የተረጋገጠ ቤት ባለቤት - አክራ፣ ጋና",
      testimonialText: "ሙያዊ እና ምላሽ ሰጪ። የንብረት ፍለጋዬን በጣም ቀላል አድርጎታል!",
      
      // Step 2
      step2Title: "ደህንነቱ የተጠበቀ ኤስክሮው 🔒",
      step2Subtitle: "ገንዘብዎ የተጠበቀ ነው",
      step2Description: "የእኛ ኤስክሮው አገልግሎት የእርስዎን ተቀማጭ ገንዘብ እና የኪራይ ክፍያዎች በደህንነት ይይዛል ቁልፎችዎን እስከሚቀበሉ ድረስ።",
      secureEscrow: "የባንክ ደረጃ ደህንነት",
      protectedPayments: "የተጠበቁ ግብይቶች",
      fundRelease: "ራስ-ሰር የገንዘብ መልቀቅ",
      escrowStatus: "የኤስክሮው ጥበቃ",
      active: "ንቁ",
      fundsProtected: "ገንዘብዎ ደህንነቱ የተጠበቀ ነው",
      
      // Step 3
      step3Title: "ለአፍሪካ የተሰራ 🌍",
      step3Subtitle: "ለእርስዎ የተነደፉ ባህሪያት",
      step3Description: "ከደመወዝ መርሃ ግብርዎ ጋር የሚሰሩ የFlexPay አማራጮች እስከ ለዲያስፖራ ተጠቃሚዎች ባለብዙ ምንዛሬ ድጋፍ።",
      flexPay: "FlexPay አማራጮች",
      multiCurrency: "ባለብዙ ምንዛሬ ድጋፍ",
      localSupport: "የአካባቢ ቋንቋ ድጋፍ",
      virtualTours: "ምናባዊ ንብረት ጉብኝቶች",
      documentUpload: "ደህንነቱ የተጠበቀ ሰነድ መስቀል",
      agentConnection: "የታመነ ወኪል አውታረ መረብ",
      virtualTourAvailable: "ምናባዊ ጉብኝት ይገኛል",
      virtualTourDescription: "ንብረቶችን በእኛ 360° ምናባዊ ጉብኝቶች በርቀት ይመልከቱ",
      
      // Desktop specific
      buildingTrust: "በአፍሪካ ሪል እስቴት ውስጥ መተማመንን መገንባት",
      desktopSubtitle: "ዚምባ AI እንዴት ደህንነቱ የተጠበቀ፣ ግልጽ የንብረት ገበያ እንደሚፈጥር ያግኙ"
    }
  };

  const t = translations[language] || translations.en;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    // Mark onboarding as complete
    localStorage.setItem('zimba-onboarding-complete', 'true');
    localStorage.setItem('zimba-trust-onboarding-complete', 'true');
    
    // Navigate to main app
    navigate('/property-search-listing-grid');
  };

  const handleStepChange = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile View */}
      <div className="lg:hidden">
        {/* Welcome Header */}
        <WelcomeHeader
          userName={userName}
          userRole={userRole}
          language={language}
          translations={translations}
        />

        {/* Progress Indicator */}
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          language={language}
          translations={translations}
        />

        {/* Onboarding Steps */}
        <div className="flex-1">
          <OnboardingStep
            step={currentStep}
            isActive={true}
            onNext={handleNext}
            onSkip={handleSkip}
            userRole={userRole}
            language={language}
            translations={translations}
          />
        </div>
      </div>

      {/* Desktop View */}
      <DesktopStepView
        currentStep={currentStep}
        onStepChange={handleStepChange}
        onComplete={handleComplete}
        userRole={userRole}
        language={language}
        translations={translations}
      />

      {/* Bottom spacing for mobile navigation */}
      <div className="lg:hidden h-20" />
    </div>
  );
};

export default TrustOnboardingFlow;