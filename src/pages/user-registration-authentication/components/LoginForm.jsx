import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ language, onSubmit, isLoading, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});

  const translations = {
    en: {
      welcomeBack: 'Welcome Back! 👋',
      signInToAccount: 'Sign in to your account',
      email: 'Email Address',
      password: 'Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      signIn: 'Sign In',
      required: 'This field is required',
      emailInvalid: 'Please enter a valid email',
      wrongCredentials: 'Invalid email or password. Please try again.',
      mockCredentials: 'Use: john@example.com / password123'
    },
    fr: {
      welcomeBack: 'Bon Retour! 👋',
      signInToAccount: 'Connectez-vous à votre compte',
      email: 'Adresse Email',
      password: 'Mot de Passe',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié?',
      signIn: 'Se connecter',
      required: 'Ce champ est requis',
      emailInvalid: 'Veuillez entrer un email valide',
      wrongCredentials: 'Email ou mot de passe invalide. Veuillez réessayer.',
      mockCredentials: 'Utilisez: john@example.com / password123'
    },
    ar: {
      welcomeBack: 'مرحباً بعودتك! 👋',
      signInToAccount: 'سجل الدخول إلى حسابك',
      email: 'عنوان البريد الإلكتروني',
      password: 'كلمة المرور',
      rememberMe: 'تذكرني',
      forgotPassword: 'نسيت كلمة المرور؟',
      signIn: 'تسجيل الدخول',
      required: 'هذا الحقل مطلوب',
      emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
      wrongCredentials: 'بريد إلكتروني أو كلمة مرور غير صحيحة. يرجى المحاولة مرة أخرى.',
      mockCredentials: 'استخدم: john@example.com / password123'
    },
    sw: {
      welcomeBack: 'Karibu Tena! 👋',
      signInToAccount: 'Ingia kwenye akaunti yako',
      email: 'Anwani ya Barua Pepe',
      password: 'Nenosiri',
      rememberMe: 'Nikumbuke',
      forgotPassword: 'Umesahau nenosiri?',
      signIn: 'Ingia',
      required: 'Sehemu hii inahitajika',
      emailInvalid: 'Tafadhali ingiza barua pepe sahihi',
      wrongCredentials: 'Barua pepe au nenosiri si sahihi. Jaribu tena.',
      mockCredentials: 'Tumia: john@example.com / password123'
    },
    am: {
      welcomeBack: 'እንኳን ደህና መጡ! 👋',
      signInToAccount: 'ወደ መለያዎ ይግቡ',
      email: 'የኢሜይል አድራሻ',
      password: 'የይለፍ ቃል',
      rememberMe: 'አስታውሰኝ',
      forgotPassword: 'የይለፍ ቃል ረሳዎት?',
      signIn: 'ግባ',
      required: 'ይህ መስክ ያስፈልጋል',
      emailInvalid: 'እባክዎ ትክክለኛ ኢሜይል ያስገቡ',
      wrongCredentials: 'ልክ ያልሆነ ኢሜይል ወይም የይለፍ ቃል። እባክዎ እንደገና ይሞክሩ።',
      mockCredentials: 'ይጠቀሙ: john@example.com / password123'
    }
  };

  const t = translations[language] || translations.en;

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = t.required;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.emailInvalid;
    }
    
    if (!formData.password) {
      newErrors.password = t.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Mock authentication check
      if (formData.email === 'john@example.com' && formData.password === 'password123') {
        onSubmit(formData);
      } else {
        setErrors({ 
          general: `${t.wrongCredentials}\n${t.mockCredentials}` 
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          {t.welcomeBack}
        </h2>
        <p className="font-body text-muted-foreground">
          {t.signInToAccount}
        </p>
      </div>

      {errors.general && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} className="text-destructive mt-0.5" />
            <div className="flex-1">
              <p className="font-body text-sm text-destructive whitespace-pre-line">
                {errors.general}
              </p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label={t.email}
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
        />

        <Input
          label={t.password}
          type="password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          error={errors.password}
          required
        />

        <div className="flex items-center justify-between">
          <Checkbox
            label={t.rememberMe}
            checked={formData.rememberMe}
            onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
          />
          
          <Button
            variant="link"
            onClick={onForgotPassword}
            className="text-sm p-0 h-auto"
          >
            {t.forgotPassword}
          </Button>
        </div>

        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          className="py-3"
        >
          <Icon name="LogIn" size={18} />
          {t.signIn}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;