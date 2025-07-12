import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginToggle = ({ language, onToggleToLogin }) => {
  const translations = {
    en: {
      alreadyHaveAccount: 'Already have an account?',
      signIn: 'Sign In',
      welcomeBack: 'Welcome back! 👋'
    },
    fr: {
      alreadyHaveAccount: 'Vous avez déjà un compte?',
      signIn: 'Se connecter',
      welcomeBack: 'Bon retour! 👋'
    },
    ar: {
      alreadyHaveAccount: 'هل لديك حساب بالفعل؟',
      signIn: 'تسجيل الدخول',
      welcomeBack: 'مرحباً بعودتك! 👋'
    },
    sw: {
      alreadyHaveAccount: 'Una akaunti tayari?',
      signIn: 'Ingia',
      welcomeBack: 'Karibu tena! 👋'
    },
    am: {
      alreadyHaveAccount: 'አስቀድመው መለያ አለዎት?',
      signIn: 'ግባ',
      welcomeBack: 'እንኳን ደህና መጡ! 👋'
    }
  };

  const t = translations[language] || translations.en;

  return (
    <div className="text-center space-y-3 p-4 bg-muted/30 rounded-lg border border-border/50">
      <p className="font-body text-sm text-muted-foreground">
        {t.alreadyHaveAccount}
      </p>
      
      <Button
        variant="outline"
        onClick={onToggleToLogin}
        className="flex items-center justify-center space-x-2"
      >
        <Icon name="LogIn" size={16} />
        <span>{t.signIn}</span>
      </Button>
      
      <p className="font-caption text-xs text-muted-foreground">
        {t.welcomeBack}
      </p>
    </div>
  );
};

export default LoginToggle;