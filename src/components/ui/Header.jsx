import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

// Language Context (would be provided by app-level context)
const LanguageContext = React.createContext({
  language: 'en',
  setLanguage: () => {},
  languages: [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
    { code: 'am', name: 'አማርኛ', flag: '🇪🇹' }
  ]
});

const Header = () => {
  const location = useLocation();
  const { language, setLanguage, languages } = useContext(LanguageContext);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Mock user data - would come from auth context
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/assets/images/avatar.jpg',
    role: 'buyer', // buyer, seller, agent, admin
    isVerified: true
  };

  const translations = {
    en: {
      discover: 'Discover',
      messages: 'Messages',
      profile: 'Profile',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      dashboard: 'Dashboard',
      settings: 'Settings',
      signOut: 'Sign Out',
      verified: 'Verified',
      menu: 'Menu'
    },
    fr: {
      discover: 'Découvrir',
      messages: 'Messages',
      profile: 'Profil',
      signIn: 'Se connecter',
      signUp: "S\'inscrire",
      dashboard: 'Tableau de bord',
      settings: 'Paramètres',
      signOut: 'Se déconnecter',
      verified: 'Vérifié',
      menu: 'Menu'
    },
    ar: {
      discover: 'اكتشف',
      messages: 'الرسائل',
      profile: 'الملف الشخصي',
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب',
      dashboard: 'لوحة التحكم',
      settings: 'الإعدادات',
      signOut: 'تسجيل الخروج',
      verified: 'موثق',
      menu: 'القائمة'
    },
    sw: {
      discover: 'Gundua',
      messages: 'Ujumbe',
      profile: 'Wasifu',
      signIn: 'Ingia',
      signUp: 'Jisajili',
      dashboard: 'Dashibodi',
      settings: 'Mipangilio',
      signOut: 'Toka',
      verified: 'Imethibitishwa',
      menu: 'Menyu'
    },
    am: {
      discover: 'ያግኙ',
      messages: 'መልዕክቶች',
      profile: 'መገለጫ',
      signIn: 'ግባ',
      signUp: 'ተመዝገብ',
      dashboard: 'ዳሽቦርድ',
      settings: 'ቅንብሮች',
      signOut: 'ውጣ',
      verified: 'የተረጋገጠ',
      menu: 'ዝርዝር'
    }
  };

  const t = translations[language] || translations.en;
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsLanguageDropdownOpen(false);
    localStorage.setItem('zimba-language', langCode);
  };

  const handleSignOut = () => {
    // Handle sign out logic
    setIsUserMenuOpen(false);
  };

  const navigationItems = [
    {
      label: t.discover,
      path: '/property-search-listing-grid',
      icon: 'Search',
      active: location.pathname === '/property-search-listing-grid' || location.pathname === '/property-detail-view'
    },
    {
      label: t.messages,
      path: '/ai-chat-support-interface',
      icon: 'MessageCircle',
      active: location.pathname === '/ai-chat-support-interface',
      badge: 3 // Notification count
    },
    {
      label: t.profile,
      path: '/user-registration-authentication',
      icon: 'User',
      active: location.pathname === '/user-registration-authentication'
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <Link to="/property-search-listing-grid" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Home" size={20} color="white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-heading font-bold text-foreground">Zimba AI</span>
            <span className="text-xs font-caption text-muted-foreground -mt-1">Real Estate</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 ${
                item.active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={18} />
              <span className="font-body font-medium">{item.label}</span>
              {item.badge && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-accent rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center space-x-2"
            >
              <span className="text-lg">{currentLanguage.flag}</span>
              <span className="hidden sm:inline font-caption text-sm">{currentLanguage.name}</span>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {isLanguageDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal z-50">
                <div className="py-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-muted transition-colors duration-200 ${
                        language === lang.code ? 'bg-muted text-primary' : 'text-foreground'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-body">{lang.name}</span>
                      {language === lang.code && (
                        <Icon name="Check" size={16} className="ml-auto text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          {user ? (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <div className="flex items-center space-x-1">
                    <span className="font-body font-medium text-sm">{user.name}</span>
                    {user.isVerified && (
                      <Icon name="BadgeCheck" size={14} className="text-success" />
                    )}
                  </div>
                  <span className="font-caption text-xs text-muted-foreground">{t.verified}</span>
                </div>
                <Icon name="ChevronDown" size={16} className="hidden sm:inline" />
              </Button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-popover border border-border rounded-lg shadow-modal z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="font-body font-medium text-sm">{user.name}</p>
                      <p className="font-caption text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <Link
                      to="/user-registration-authentication"
                      className="flex items-center space-x-3 px-4 py-2 hover:bg-muted transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Icon name="LayoutDashboard" size={16} />
                      <span className="font-body">{t.dashboard}</span>
                    </Link>
                    <Link
                      to="/user-registration-authentication"
                      className="flex items-center space-x-3 px-4 py-2 hover:bg-muted transition-colors duration-200"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Icon name="Settings" size={16} />
                      <span className="font-body">{t.settings}</span>
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-muted transition-colors duration-200 text-destructive"
                    >
                      <Icon name="LogOut" size={16} />
                      <span className="font-body">{t.signOut}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/user-registration-authentication">{t.signIn}</Link>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link to="/user-registration-authentication">{t.signUp}</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            <span className="sr-only">{t.menu}</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`relative flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 touch-target ${
                  item.active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={20} />
                <span className="font-body font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-accent rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Overlay for dropdowns */}
      {(isLanguageDropdownOpen || isUserMenuOpen || isMobileMenuOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsLanguageDropdownOpen(false);
            setIsUserMenuOpen(false);
            setIsMobileMenuOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;