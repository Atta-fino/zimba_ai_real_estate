// A simple in-memory store for mock properties to persist across pages during a session.

export let mockPropertiesData = [
  { id: 'prop1', title: 'Spacious 3-Bedroom Apartment in Lekki', landlord_name: 'Aisha Bello', landlord_id: 'landlord_A', location: 'Lekki Phase 1, Lagos', status: 'active', latitude: 6.4478, longitude: 3.4723 },
  { id: 'prop2', title: 'Modern Office Space in Ikeja', landlord_name: 'Babatunde Adebayo', landlord_id: 'landlord_B', location: 'Ikeja GRA, Lagos', status: 'active', latitude: 6.6018, longitude: 3.3515 },
  { id: 'prop3', title: 'Cozy Self-Contain in Yaba', landlord_name: 'Aisha Bello', landlord_id: 'landlord_A', location: 'Yaba, Lagos', status: 'pending_approval', latitude: 6.5126, longitude: 3.3857 },
  { id: 'prop_flagged_123', title: '"Luxury" Apartment with No Running Water', landlord_name: 'Mr. Ghost', landlord_id: 'user_landlord_789', location: 'Unknown', status: 'active' },
  { id: 'prop_scam_456', title: 'Too Good To Be True Deal', landlord_name: 'Scammer Inc.', landlord_id: 'user_scammer_001', location: 'Unknown', status: 'hidden' },
];

export const updatePropertyStatus = (propertyId, newStatus) => {
    const propIndex = mockPropertiesData.findIndex(p => p.id === propertyId);
    if (propIndex !== -1) {
        mockPropertiesData[propIndex].status = newStatus;
        console.log(`MOCK DB: Updated property ${propertyId} status to ${newStatus}`);
    }
};

export const getPropertyById = (propertyId) => {
    return mockPropertiesData.find(p => p.id === propertyId);
};
