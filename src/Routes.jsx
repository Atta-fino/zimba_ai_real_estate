import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import CountrySelectionLanguagePreference from "pages/country-selection-language-preference";
import TrustOnboardingFlow from "pages/trust-onboarding-flow";
import AiChatSupportInterface from "pages/ai-chat-support-interface";
import UserRegistrationAuthentication from "pages/user-registration-authentication";
import PropertySearchListingGrid from "pages/property-search-listing-grid";
import NotFound from "pages/NotFound";
import OnboardingFlowController from "pages/onboarding/OnboardingFlowController";
import Dashboard from "pages/dashboard/Dashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<CountrySelectionLanguagePreference />} />
        <Route path="/country-selection-language-preference" element={<CountrySelectionLanguagePreference />} />
        <Route path="/trust-onboarding-flow" element={<TrustOnboardingFlow />} />
        <Route path="/ai-chat-support-interface" element={<AiChatSupportInterface />} />
        <Route path="/user-registration-authentication" element={<UserRegistrationAuthentication />} />
        <Route path="/property-search-listing-grid" element={<PropertySearchListingGrid />} />
        <Route path="/onboarding" element={<OnboardingFlowController />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;