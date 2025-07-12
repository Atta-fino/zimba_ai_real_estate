import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RegistrationForm = ({ selectedRole, language, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+234',
    password: '',
    confirmPassword: '',
    whatsappNumber: '',
    whatsappVerification: false,
    agreeToTerms: false,
    // Role-specific fields
    propertyExperience: '',
    currentLocation: '',
    businessLicense: ''
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

  const translations = {
    en: {
      personalInfo: 'Personal Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email Address',
      phone: 'Phone Number',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      whatsapp: 'WhatsApp Number',
      whatsappVerify: 'Verify WhatsApp for enhanced trust',
      agreeTerms: 'I agree to the Terms of Service and Privacy Policy',
      createAccount: 'Create Account',
      passwordWeak: 'Weak',
      passwordMedium: 'Medium',
      passwordStrong: 'Strong',
      // Role-specific
      propertyExp: 'Property Management Experience',
      currentLoc: 'Current Location',
      businessLic: 'Business License Number',
      expYears: 'years',
      selectExp: 'Select experience level',
      selectCountry: 'Select your country',
      optional: '(Optional)',
      required: 'This field is required',
      emailInvalid: 'Please enter a valid email',
      passwordMismatch: 'Passwords do not match',
      phoneInvalid: 'Please enter a valid phone number'
    },
    fr: {
      personalInfo: 'Informations Personnelles',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Adresse Email',
      phone: 'Numéro de Téléphone',
      password: 'Mot de Passe',
      confirmPassword: 'Confirmer le Mot de Passe',
      whatsapp: 'Numéro WhatsApp',
      whatsappVerify: 'Vérifier WhatsApp pour une confiance renforcée',
      agreeTerms: 'J\'accepte les Conditions de Service et la Politique de Confidentialité',
      createAccount: 'Créer un Compte',
      passwordWeak: 'Faible',
      passwordMedium: 'Moyen',
      passwordStrong: 'Fort',
      propertyExp: 'Expérience en Gestion Immobilière',
      currentLoc: 'Localisation Actuelle',
      businessLic: 'Numéro de Licence Commerciale',
      expYears: 'années',
      selectExp: 'Sélectionner le niveau d\'expérience',
      selectCountry: 'Sélectionner votre pays',
      optional: '(Optionnel)',
      required: 'Ce champ est requis',
      emailInvalid: 'Veuillez entrer un email valide',
      passwordMismatch: 'Les mots de passe ne correspondent pas',
      phoneInvalid: 'Veuillez entrer un numéro de téléphone valide'
    },
    ar: {
      personalInfo: 'المعلومات الشخصية',
      firstName: 'الاسم الأول',
      lastName: 'اسم العائلة',
      email: 'عنوان البريد الإلكتروني',
      phone: 'رقم الهاتف',
      password: 'كلمة المرور',
      confirmPassword: 'تأكيد كلمة المرور',
      whatsapp: 'رقم واتساب',
      whatsappVerify: 'تحقق من واتساب لتعزيز الثقة',
      agreeTerms: 'أوافق على شروط الخدمة وسياسة الخصوصية',
      createAccount: 'إنشاء حساب',
      passwordWeak: 'ضعيف',
      passwordMedium: 'متوسط',
      passwordStrong: 'قوي',
      propertyExp: 'خبرة إدارة العقارات',
      currentLoc: 'الموقع الحالي',
      businessLic: 'رقم رخصة العمل',
      expYears: 'سنوات',
      selectExp: 'اختر مستوى الخبرة',
      selectCountry: 'اختر بلدك',
      optional: '(اختياري)',
      required: 'هذا الحقل مطلوب',
      emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
      passwordMismatch: 'كلمات المرور غير متطابقة',
      phoneInvalid: 'يرجى إدخال رقم هاتف صحيح'
    },
    sw: {
      personalInfo: 'Maelezo ya Kibinafsi',
      firstName: 'Jina la Kwanza',
      lastName: 'Jina la Ukoo',
      email: 'Anwani ya Barua Pepe',
      phone: 'Nambari ya Simu',
      password: 'Nenosiri',
      confirmPassword: 'Thibitisha Nenosiri',
      whatsapp: 'Nambari ya WhatsApp',
      whatsappVerify: 'Thibitisha WhatsApp kwa kuongeza uaminifu',
      agreeTerms: 'Nakubali Masharti ya Huduma na Sera ya Faragha',
      createAccount: 'Unda Akaunti',
      passwordWeak: 'Dhaifu',
      passwordMedium: 'Wastani',
      passwordStrong: 'Imara',
      propertyExp: 'Uzoefu wa Usimamizi wa Mali',
      currentLoc: 'Mahali pa Sasa',
      businessLic: 'Nambari ya Leseni ya Biashara',
      expYears: 'miaka',
      selectExp: 'Chagua kiwango cha uzoefu',
      selectCountry: 'Chagua nchi yako',
      optional: '(Si lazima)',
      required: 'Sehemu hii inahitajika',
      emailInvalid: 'Tafadhali ingiza barua pepe sahihi',
      passwordMismatch: 'Maneno ya siri hayalingani',
      phoneInvalid: 'Tafadhali ingiza nambari sahihi ya simu'
    },
    am: {
      personalInfo: 'የግል መረጃ',
      firstName: 'የመጀመሪያ ስም',
      lastName: 'የአባት ስም',
      email: 'የኢሜይል አድራሻ',
      phone: 'የስልክ ቁጥር',
      password: 'የይለፍ ቃል',
      confirmPassword: 'የይለፍ ቃል ያረጋግጡ',
      whatsapp: 'የWhatsApp ቁጥር',
      whatsappVerify: 'ለተሻለ እምነት WhatsApp ያረጋግጡ',
      agreeTerms: 'የአገልግሎት ውሎችን እና የግላዊነት ፖሊሲን እቀበላለሁ',
      createAccount: 'መለያ ይፍጠሩ',
      passwordWeak: 'ደካማ',
      passwordMedium: 'መካከለኛ',
      passwordStrong: 'ጠንካራ',
      propertyExp: 'የንብረት አስተዳደር ልምድ',
      currentLoc: 'አሁን ያለበት ቦታ',
      businessLic: 'የንግድ ፈቃድ ቁጥር',
      expYears: 'ዓመታት',
      selectExp: 'የልምድ ደረጃ ይምረጡ',
      selectCountry: 'ሀገርዎን ይምረጡ',
      optional: '(አማራጭ)',
      required: 'ይህ መስክ ያስፈልጋል',
      emailInvalid: 'እባክዎ ትክክለኛ ኢሜይል ያስገቡ',
      passwordMismatch: 'የይለፍ ቃሎች አይዛመዱም',
      phoneInvalid: 'እባክዎ ትክክለኛ የስልክ ቁጥር ያስገቡ'
    }
  };

  const t = translations[language] || translations.en;

  const countryCodes = [
    { value: '+234', label: '🇳🇬 Nigeria (+234)' },
    { value: '+233', label: '🇬🇭 Ghana (+233)' },
    { value: '+254', label: '🇰🇪 Kenya (+254)' },
    { value: '+27', label: '🇿🇦 South Africa (+27)' },
    { value: '+212', label: '🇲🇦 Morocco (+212)' },
    { value: '+20', label: '🇪🇬 Egypt (+20)' },
    { value: '+255', label: '🇹🇿 Tanzania (+255)' },
    { value: '+256', label: '🇺🇬 Uganda (+256)' },
    { value: '+225', label: '🇨🇮 Côte d\'Ivoire (+225)' },
    { value: '+251', label: '🇪🇹 Ethiopia (+251)' }
  ];

  const experienceOptions = [
    { value: '0-1', label: `0-1 ${t.expYears}` },
    { value: '2-5', label: `2-5 ${t.expYears}` },
    { value: '6-10', label: `6-10 ${t.expYears}` },
    { value: '10+', label: `10+ ${t.expYears}` }
  ];

  const countryOptions = [
    { value: 'NG', label: '🇳🇬 Nigeria' },
    { value: 'GH', label: '🇬🇭 Ghana' },
    { value: 'KE', label: '🇰🇪 Kenya' },
    { value: 'ZA', label: '🇿🇦 South Africa' },
    { value: 'MA', label: '🇲🇦 Morocco' },
    { value: 'EG', label: '🇪🇬 Egypt' },
    { value: 'TZ', label: '🇹🇿 Tanzania' },
    { value: 'UG', label: '🇺🇬 Uganda' },
    { value: 'CI', label: '🇨🇮 Côte d\'Ivoire' },
    { value: 'ET', label: '🇪🇹 Ethiopia' }
  ];

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const getPasswordStrengthText = (strength) => {
    if (strength <= 2) return t.passwordWeak;
    if (strength <= 3) return t.passwordMedium;
    return t.passwordStrong;
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = t.required;
    if (!formData.lastName.trim()) newErrors.lastName = t.required;
    if (!formData.email.trim()) {
      newErrors.email = t.required;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t.emailInvalid;
    }
    if (!formData.phone.trim()) newErrors.phone = t.required;
    if (!formData.password) {
      newErrors.password = t.required;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t.passwordMismatch;
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = t.required;
    }

    // Role-specific validation
    if (selectedRole === 'landlord' && !formData.propertyExperience) {
      newErrors.propertyExperience = t.required;
    }
    if (selectedRole === 'diaspora' && !formData.currentLocation) {
      newErrors.currentLocation = t.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
          {t.personalInfo}
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={t.firstName}
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            error={errors.firstName}
            required
          />
          
          <Input
            label={t.lastName}
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            error={errors.lastName}
            required
          />
        </div>

        <Input
          label={t.email}
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          required
          className="mt-4"
        />

        <div className="mt-4 grid grid-cols-3 gap-2">
          <Select
            label="Country Code"
            options={countryCodes}
            value={formData.countryCode}
            onChange={(value) => handleInputChange('countryCode', value)}
            className="col-span-1"
          />
          
          <Input
            label={t.phone}
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={errors.phone}
            required
            className="col-span-2"
          />
        </div>

        <Input
          label={`${t.whatsapp} ${t.optional}`}
          type="tel"
          value={formData.whatsappNumber}
          onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
          className="mt-4"
        />

        {formData.whatsappNumber && (
          <Checkbox
            label={t.whatsappVerify}
            checked={formData.whatsappVerification}
            onChange={(e) => handleInputChange('whatsappVerification', e.target.checked)}
            className="mt-2"
          />
        )}

        <div className="mt-4 space-y-4">
          <Input
            label={t.password}
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            error={errors.password}
            required
          />
          
          {formData.password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-caption text-muted-foreground">
                  Password Strength: {getPasswordStrengthText(passwordStrength)}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength)}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                />
              </div>
            </div>
          )}

          <Input
            label={t.confirmPassword}
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
            required
          />
        </div>
      </div>

      {/* Role-specific fields */}
      {selectedRole === 'landlord' && (
        <div className="space-y-4">
          <Select
            label={t.propertyExp}
            options={experienceOptions}
            value={formData.propertyExperience}
            onChange={(value) => handleInputChange('propertyExperience', value)}
            placeholder={t.selectExp}
            error={errors.propertyExperience}
            required
          />
        </div>
      )}

      {selectedRole === 'diaspora' && (
        <div className="space-y-4">
          <Select
            label={t.currentLoc}
            options={countryOptions}
            value={formData.currentLocation}
            onChange={(value) => handleInputChange('currentLocation', value)}
            placeholder={t.selectCountry}
            error={errors.currentLocation}
            required
          />
        </div>
      )}

      {selectedRole === 'agent' && (
        <div className="space-y-4">
          <Input
            label={`${t.businessLic} ${t.optional}`}
            type="text"
            value={formData.businessLicense}
            onChange={(e) => handleInputChange('businessLicense', e.target.value)}
          />
        </div>
      )}

      <div className="space-y-4">
        <Checkbox
          label={t.agreeTerms}
          checked={formData.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
          error={errors.agreeToTerms}
          required
        />

        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          fullWidth
          className="py-3"
        >
          <Icon name="UserPlus" size={18} />
          {t.createAccount}
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;