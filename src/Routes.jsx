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
import UserProfilePage from "pages/user-profile";
import LandlordDashboardPage from "pages/landlord-dashboard";
import PropertyEditorPage from "pages/property-editor";
import CommissionsOverview from "pages/admin-dashboard/panels/CommissionsOverview"; // Will be rendered by AdminDashboardPage
import RenterDashboardPage from "pages/renter-dashboard";
import SignupPage from "pages/signup";
import LoginPage from "pages/login";
import AdminDashboardPage from "pages/admin-dashboard"; // Import AdminDashboardPage
import NotFound from "pages/NotFound";

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
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-registration-authentication" element={<UserRegistrationAuthentication />} />
        <Route path="/property-search-listing-grid" element={<PropertySearchListingGrid />} />
        <Route path="/property-detail-view/:id" element={<PropertyDetailView />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/landlord-dashboard" element={<LandlordDashboardPage />} />
        <Route path="/landlord-dashboard/properties/new" element={<PropertyEditorPage />} />
        <Route path="/landlord-dashboard/properties/edit/:propertyId" element={<PropertyEditorPage />} />
        {/* Admin Dashboard Main Route - it will handle sub-panel rendering */}
        <Route path="/admin/*" element={<AdminDashboardPage />} />
        <Route path="/dashboard" element={<RenterDashboardPage />} /> {/* Renter/Buyer Dashboard */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;