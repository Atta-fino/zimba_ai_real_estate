import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';

// Mock data for countries and languages
const supportedCountries = [
  { name: "Ghana", code: "GH", flag: "🇬🇭", languages: ['English', 'Pidgin'] },
  { name: "Nigeria", code: "NG", flag: "🇳🇬", languages: ['English', 'Yoruba', 'Pidgin'] },
  { name: "Kenya", code: "KE", flag: "🇰🇪", languages: ['English', 'Swahili'] },
  { name: "South Africa", code: "ZA", flag: "🇿🇦", languages: ['English', 'Zulu', 'Xhosa'] },
  { name: "Côte d’Ivoire", code: "CI", flag: "🇨🇮", languages: ['French'] },
  { name: "Senegal", code: "SN", flag: "🇸🇳", languages: ['French', 'Wolof'] },
  { name: "Ethiopia", code: "ET", flag: "🇪🇹", languages: ['Amharic', 'English'] },
  { name: "Rwanda", code: "RW", flag: "🇷🇼", languages: ['Kinyarwanda', 'English'] },
  { name: "Uganda", code: "UG", flag: "🇺🇬", languages: ['English', 'Luganda'] },
  { name: "Tanzania", code: "TZ", flag: "🇹🇿", languages: ['Swahili', 'English'] },
];

const allLanguages = [...new Set(supportedCountries.flatMap(c => c.languages))].sort();

const userRoles = [
    { id: 'renter', title: 'Renter or Buyer', description: 'Find your next home to rent or buy.', icon: 'Home' },
    { id: 'landlord', title: 'Landlord or Agent', description: 'List and manage your properties.', icon: 'Building' },
    { id: 'diaspora', title: 'Diaspora User', description: 'Invest or find a home from abroad.', icon: 'Globe' },
]

// Step 1: Create Account
const Step1_CreateAccount = ({ formData, setFormData, nextStep }) => {
    const handleChange = (e) => setFormData(prev => ({...prev, [e.target.name]: e.target.value}));
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        // Add more validation as needed
        nextStep();
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Create your Zimba Account</h2>
            <p className="text-sm text-muted-foreground">Let's start with the basics. You can always change these later.</p>
            <div>
                <label className="text-sm font-medium text-muted-foreground" htmlFor="email">Email Address</label>
                <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" />
            </div>
            <div>
                <label className="text-sm font-medium text-muted-foreground" htmlFor="password">Password</label>
                <Input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required minLength="8" placeholder="Create a strong password" />
            </div>
             <div>
                <label className="text-sm font-medium text-muted-foreground" htmlFor="confirmPassword">Confirm Password</label>
                <Input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Confirm your password" />
            </div>
            <Button type="submit" className="w-full" size="lg">Continue</Button>
        </form>
    );
};

// Step 2: Country & Language
const Step2_CountryLanguage = ({ formData, setFormData, nextStep, prevStep }) => {
    const handleCountryChange = (value) => {
        const selectedCountry = supportedCountries.find(c => c.code === value);
        setFormData(prev => ({
            ...prev,
            country: value,
            // Auto-select first language of the country if not already set or not in new list
            language: selectedCountry && !selectedCountry.languages.includes(prev.language) ? selectedCountry.languages[0] : prev.language
        }));
    };
    const handleLanguageChange = (value) => setFormData(prev => ({...prev, language: value}));
    const handleSubmit = (e) => { e.preventDefault(); nextStep(); };

    const availableLanguages = supportedCountries.find(c => c.code === formData.country)?.languages || allLanguages;

    return (
         <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">Your Region & Language</h2>
            <p className="text-sm text-muted-foreground">This helps us personalize your experience with local content and currency.</p>
            <div>
                <label className="text-sm font-medium text-muted-foreground" htmlFor="country">Country</label>
                <Select id="country" name="country" value={formData.country} onValueChange={handleCountryChange} required>
                    <option value="" disabled>Select your country</option>
                    {supportedCountries.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
                </Select>
            </div>
            <div>
                <label className="text-sm font-medium text-muted-foreground" htmlFor="language">Preferred Language</label>
                <Select id="language" name="language" value={formData.language} onValueChange={handleLanguageChange} required>
                    {availableLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </Select>
            </div>
            <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={prevStep} className="w-full">Back</Button>
                <Button type="submit" className="w-full">Continue</Button>
            </div>
        </form>
    );
};

// Step 3: User Role
const Step3_UserRole = ({ formData, setFormData, nextStep, prevStep }) => {
    const handleRoleSelect = (roleId) => {
        setFormData(prev => ({...prev, role: roleId}));
        // Automatically go to next step on selection for a smoother flow
        setTimeout(() => nextStep(), 200);
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">How will you be using Zimba?</h2>
            <p className="text-sm text-muted-foreground">Choose your primary role. You can explore other roles later.</p>
            <div className="space-y-3">
                {userRoles.map(role => (
                    <button key={role.id} onClick={() => handleRoleSelect(role.id)}
                        className={`w-full p-4 border-2 rounded-lg flex items-center text-left transition-all duration-200
                            ${formData.role === role.id ? 'border-primary bg-primary/10 shadow-lg' : 'border-border hover:border-primary/50'}`}
                    >
                        <Icon name={role.icon} size={28} className="mr-4 text-primary"/>
                        <div>
                            <h3 className="font-semibold text-foreground">{role.title}</h3>
                            <p className="text-xs text-muted-foreground">{role.description}</p>
                        </div>
                        {formData.role === role.id && <Icon name="CheckCircle" size={20} className="ml-auto text-primary"/>}
                    </button>
                ))}
            </div>
             <div className="pt-2">
                <Button type="button" variant="outline" onClick={prevStep} className="w-full">Back</Button>
            </div>
        </div>
    );
};

// Step 4: Trust & Escrow Intro
const Step4_TrustIntro = ({ prevStep, submitForm }) => {
    return (
        <div className="text-center space-y-4">
            <div className="p-4 bg-green-50 rounded-full inline-block">
                <Icon name="ShieldCheck" size={40} className="text-green-600"/>
            </div>
            <h2 className="text-2xl font-semibold text-foreground">Welcome to a Safer Way to Rent & Buy!</h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
                At Zimba, your security is our priority. Every transaction is protected by our secure Escrow system, and our TrustScore helps you connect with reliable people. You're in safe hands.
            </p>
            <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={prevStep} className="w-full">Back</Button>
                <Button onClick={submitForm} className="w-full" size="lg">Complete Signup</Button>
            </div>
        </div>
    );
};


const SignupPage = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        country: 'NG', // Default to Nigeria
        language: 'English',
        role: '',
    });

    const nextStep = () => setCurrentStep(prev => prev + 1);
    const prevStep = () => setCurrentStep(prev => prev - 1);

    const submitForm = async () => {
        console.log("Submitting final form data:", {
            email: formData.email,
            password: '***', // Don't log password
            country: formData.country,
            language: formData.language,
            role: formData.role
        });
        // Simulate API call
        alert("Signup successful! Welcome to Zimba! You will now be redirected to your dashboard. (Simulation)");
        // Redirect based on role
        if (formData.role === 'landlord') {
            navigate('/landlord-dashboard');
        } else {
            navigate('/dashboard'); // Default to renter/buyer dashboard
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1_CreateAccount formData={formData} setFormData={setFormData} nextStep={nextStep} />;
            case 2:
                return <Step2_CountryLanguage formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 3:
                return <Step3_UserRole formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
            case 4:
                return <Step4_TrustIntro prevStep={prevStep} submitForm={submitForm} />;
            default:
                return <Step1_CreateAccount formData={formData} setFormData={setFormData} nextStep={nextStep} />;
        }
    }

    const progressPercentage = ((currentStep - 1) / 3) * 100;

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-primary">Join Zimba</h1>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="bg-primary h-1.5 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>

                <div className="bg-card p-8 rounded-2xl shadow-2xl">
                    {renderStep()}
                </div>

                 <p className="text-center text-sm text-muted-foreground mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-primary hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
