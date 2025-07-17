import React, { useState } from 'react';
import Step1_EmailPassword from './Step1_EmailPassword';
import Step2_CountryLanguage from './Step2_CountryLanguage';
import Step3_Role from './Step3_Role';
import Step4_TrustEscrowIntro from './Step4_TrustEscrowIntro';

const OnboardingFlowController = () => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({});

  const handleNext = (data) => {
    setUserData({ ...userData, ...data });
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleFinish = (data) => {
    const finalUserData = { ...userData, ...data };
    // TODO: Create user account with finalUserData
    console.log('Final user data:', finalUserData);
  };

  switch (step) {
    case 1:
      return <Step1_EmailPassword onNext={handleNext} />;
    case 2:
      return <Step2_CountryLanguage onNext={handleNext} onBack={handleBack} />;
    case 3:
      return <Step3_Role onNext={handleNext} onBack={handleBack} />;
    case 4:
      return <Step4_TrustEscrowIntro onFinish={handleFinish} onBack={handleBack} />;
    default:
      return null;
  }
};

export default OnboardingFlowController;
