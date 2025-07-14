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
import PropertyDetailView from "pages/property-detail-view";
import EscrowPage from "pages/escrow";
import LoginPage from "pages/login";
import ProfilePage from "pages/profile";
import ChatPage from "pages/chat";
import NotFound from "pages/NotFound";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

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
        <RoutSe path="/property-search-listing-grid" element={<PropertySearchListingGrid />} />
        <Route path="/property-detail-view/:id" element={<PropertyDetailView />} />
        <Route path="/escrow/:id" element={<PrivateRoute><EscrowPage /></PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/chat/:propertyId" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;