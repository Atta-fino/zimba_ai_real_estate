import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RoleSelector from './components/RoleSelector';
import SocialLoginButtons from './components/SocialLoginButtons';
import RegistrationForm from './components/RegistrationForm';
import TrustIndicators from './components/TrustIndicators';
import LoginToggle from './components/LoginToggle';
import LoginForm from './components/LoginForm';

// Language Context
const LanguageContext = React.createContext({
  language: 'en',
  setLanguage: () => {}
});

const UserRegistrationAuthentication = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useContext(LanguageContext);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [selectedRole, setSelectedRole] = useState('renter');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const translations = {
    en: {
      createAccount: 'Create Your Account',
      joinZimba: 'Join Zimba AI Real Estate',
      getStarted: 'Get started with secure property rentals',
      backToSignup: 'Back to Sign Up',
      createNewAccount: 'Create new account',
      dontHaveAccount: 'Don\'t have an account?',
      signUp: 'Sign Up',
      accountCreated: 'Account Created Successfully! 🎉',
      verificationSent: 'We\'ve sent a verification email to your inbox. Please check your email and click the verification link to activate your account.',
      continueToApp: 'Continue to App',
      languageSelector: 'Language'
    },
    fr: {
      createAccount: 'Créer Votre Compte',
      joinZimba: 'Rejoignez Zimba AI Real Estate',
      getStarted: 'Commencez avec des locations immobilières sécurisées',
      backToSignup: 'Retour à l\'inscription',
      createNewAccount: 'Créer un nouveau compte',
      dontHaveAccount: 'Vous n\'avez pas de compte?',
      signUp: 'S\'inscrire',
      accountCreated: 'Compte Créé avec Succès! 🎉',
      verificationSent: 'Nous avons envoyé un email de vérification dans votre boîte de réception. Veuillez vérifier votre email et cliquer sur le lien de vérification pour activer votre compte.',
      continueToApp: 'Continuer vers l\'App',
      languageSelector: 'Langue'
    },
    ar: {
      createAccount: 'إنشاء حسابك',
      joinZimba: 'انضم إلى زيمبا AI العقارية',
      getStarted: 'ابدأ مع إيجارات عقارية آمنة',
      backToSignup: 'العودة للتسجيل',
      createNewAccount: 'إنشاء حساب جديد',
      dontHaveAccount: 'ليس لديك حساب؟',
      signUp: 'إنشاء حساب',
      accountCreated: 'تم إنشاء الحساب بنجاح! 🎉',
      verificationSent: 'لقد أرسلنا بريد إلكتروني للتحقق إلى صندوق الوارد الخاص بك. يرجى التحقق من بريدك الإلكتروني والنقر على رابط التحقق لتفعيل حسابك.',
      continueToApp: 'المتابعة إلى التطبيق',
      languageSelector: 'اللغة'
    },
    sw: {
      createAccount: 'Unda Akaunti Yako',
      joinZimba: 'Jiunge na Zimba AI Real Estate',
      getStarted: 'Anza na ukodishaji salama wa mali',
      backToSignup: 'Rudi kwenye Usajili',
      createNewAccount: 'Unda akaunti mpya',
      dontHaveAccount: 'Huna akaunti?',
      signUp: 'Jisajili',
      accountCreated: 'Akaunti Imeundwa Kwa Ufanisi! 🎉',
      verificationSent: 'Tumetuma barua pepe ya uthibitisho kwenye sanduku lako la barua. Tafadhali angalia barua pepe yako na ubofye kiungo cha uthibitisho ili kuamilisha akaunti yako.',
      continueToApp: 'Endelea kwenye Programu',
      languageSelector: 'Lugha'
    },
    am: {
      createAccount: 'መለያዎን ይፍጠሩ',
      joinZimba: 'ዚምባ AI ሪል እስቴት ይቀላቀሉ',
      getStarted: 'ደህንነቱ የተጠበቀ የንብረት ኪራይ ይጀምሩ',
      backToSignup: 'ወደ ምዝገባ ተመለስ',
      createNewAccount: 'አዲስ መለያ ይፍጠሩ',
      dontHaveAccount: 'መለያ የለዎትም?',
      signUp: 'ተመዝገብ',
      accountCreated: 'መለያ በተሳካ ሁኔታ ተፈጥሯል! 🎉',
      verificationSent: 'ወደ መልእክት ሳጥንዎ የማረጋገጫ ኢሜይል ልከናል። እባክዎ ኢሜይልዎን ይመልከቱ እና መለያዎን ለማንቃት የማረጋገጫ አገናኙን ይጫኑ።',
      continueToApp: 'ወደ መተግበሪያ ይቀጥሉ',
      languageSelector: 'ቋንቋ'
    }
  };

  const t = translations[currentLanguage] || translations.en;

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
    { code: 'am', name: 'አማርኛ', flag: '🇪🇹' }
  ];

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('zimba-language') || 'en';
    setCurrentLanguage(savedLanguage);
    if (setLanguage) {
      setLanguage(savedLanguage);
    }
  }, [setLanguage]);

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('zimba-language', langCode);
    if (setLanguage) {
      setLanguage(langCode);
    }
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    try {
      // Mock social login
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store mock user data
      const mockUser = {
        id: 'social_' + Date.now(),
        email: `user@${provider}.com`,
        name: 'Social User',
        role: selectedRole,
        provider: provider,
        verified: true
      };
      
      localStorage.setItem('zimba-user-token', 'mock-social-token');
      localStorage.setItem('zimba-user-data', JSON.stringify(mockUser));
      
      navigate('/property-search-listing-grid');
    } catch (error) {
      console.error('Social login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistrationSubmit = async (formData) => {
    setIsLoading(true);
    try {
      // Mock registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store mock user data
      const mockUser = {
        id: 'user_' + Date.now(),
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        role: selectedRole,
        phone: formData.phone,
        verified: false
      };
      
      localStorage.setItem('zimba-user-data', JSON.stringify(mockUser));
      setShowSuccessMessage(true);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (formData) => {
    setIsLoading(true);
    try {
      // Mock login API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store mock user data
      const mockUser = {
        id: 'user_existing',
        email: formData.email,
        name: 'John Doe',
        role: 'renter',
        verified: true
      };
      
      localStorage.setItem('zimba-user-token', 'mock-login-token');
      localStorage.setItem('zimba-user-data', JSON.stringify(mockUser));
      
      navigate('/property-search-listing-grid');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Mock forgot password
    alert('Password reset link sent to your email!');
  };

  const handleContinueToApp = () => {
    localStorage.setItem('zimba-user-token', 'mock-verified-token');
    navigate('/property-search-listing-grid');
  };

  if (showSuccessMessage) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-card rounded-xl shadow-modal p-8 text-center space-y-6">
          <div className="flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mx-auto">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-heading font-bold text-foreground">
              {t.accountCreated}
            </h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              {t.verificationSent}
            </p>
          </div>

          <Button
            variant="default"
            onClick={handleContinueToApp}
            fullWidth
            className="py-3"
          >
            <Icon name="ArrowRight" size={18} />
            {t.continueToApp}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon name="Home" size={24} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-heading font-bold text-foreground">Zimba AI</span>
              <span className="text-sm font-caption text-muted-foreground -mt-1">Real Estate</span>
            </div>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <span className="hidden sm:inline font-caption text-sm text-muted-foreground">
              {t.languageSelector}:
            </span>
            <select
              value={currentLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-2 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column - Form */}
          <div className="order-2 lg:order-1">
            <div className="max-w-md mx-auto lg:mx-0 bg-card rounded-xl shadow-card p-6 lg:p-8 space-y-6">
              {!isLoginMode ? (
                <>
                  {/* Registration Header */}
                  <div className="text-center">
                    <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
                      {t.createAccount}
                    </h1>
                    <p className="font-body text-muted-foreground">
                      {t.getStarted}
                    </p>
                  </div>

                  {/* Role Selection */}
                  <RoleSelector
                    selectedRole={selectedRole}
                    onRoleChange={setSelectedRole}
                    language={currentLanguage}
                  />

                  {/* Social Login */}
                  <SocialLoginButtons
                    language={currentLanguage}
                    onSocialLogin={handleSocialLogin}
                  />

                  {/* Registration Form */}
                  <RegistrationForm
                    selectedRole={selectedRole}
                    language={currentLanguage}
                    onSubmit={handleRegistrationSubmit}
                    isLoading={isLoading}
                  />

                  {/* Login Toggle */}
                  <LoginToggle
                    language={currentLanguage}
                    onToggleToLogin={() => setIsLoginMode(true)}
                  />
                </>
              ) : (
                <>
                  {/* Login Form */}
                  <LoginForm
                    language={currentLanguage}
                    onSubmit={handleLoginSubmit}
                    isLoading={isLoading}
                    onForgotPassword={handleForgotPassword}
                  />

                  {/* Social Login */}
                  <SocialLoginButtons
                    language={currentLanguage}
                    onSocialLogin={handleSocialLogin}
                  />

                  {/* Back to Registration */}
                  <div className="text-center space-y-3 p-4 bg-muted/30 rounded-lg border border-border/50">
                    <p className="font-body text-sm text-muted-foreground">
                      {t.dontHaveAccount}
                    </p>
                    
                    <Button
                      variant="outline"
                      onClick={() => setIsLoginMode(false)}
                      className="flex items-center justify-center space-x-2"
                    >
                      <Icon name="UserPlus" size={16} />
                      <span>{t.signUp}</span>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Column - Trust Indicators */}
          <div className="order-1 lg:order-2">
            <div className="max-w-md mx-auto lg:mx-0">
              <TrustIndicators language={currentLanguage} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserRegistrationAuthentication;