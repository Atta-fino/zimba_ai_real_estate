// A simple in-memory store for mock users to persist across pages during a session.

export let mockUsersData = [
  { id: 'landlord_A', name: 'Aisha Bello', email: 'aisha.bello@example.com', role: 'landlord', country: 'NG', status: 'active', is_verified: false, verification_status: 'pending_human_review' },
  { id: 'landlord_B', name: 'Babatunde Adebayo', email: 'babatunde.a@example.com', role: 'landlord', country: 'NG', status: 'active', is_verified: false, verification_status: 'pending_human_review' },
  { id: 'renter_1', name: 'Chidinma Okoro', email: 'chidinma.o@example.com', role: 'renter', country: 'KE', status: 'active', is_verified: true, verification_status: 'not_applicable' },
  { id: 'diaspora_1', name: 'David Chen', email: 'david.chen@example.com', role: 'diaspora', country: 'US', status: 'active', is_verified: true, verification_status: 'not_applicable' },
  { id: 'admin_1', name: 'Admin User', email: 'admin@zimba.com', role: 'admin', country: 'GH', status: 'active', is_verified: true, verification_status: 'not_applicable' },
  { id: 'renter_2', name: 'Femi Adekunle', email: 'femi.a@example.com', role: 'renter', country: 'NG', status: 'suspended', is_verified: true, verification_status: 'not_applicable' },
  { id: 'user_landlord_789', name: 'Mr. Ghost', email: 'mr.ghost@example.com', role: 'landlord', country: 'NG', status: 'active', is_verified: false, verification_status: 'not_verified'},
];

export const updateUserVerificationStatus = (userId, newStatus, isVerified) => {
    const userIndex = mockUsersData.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        mockUsersData[userIndex].verification_status = newStatus;
        mockUsersData[userIndex].is_verified = isVerified;
        console.log(`MOCK DB: Updated user ${userId} verification status to ${newStatus}`);
    }
};

export const updateUserStatus = (userId, newStatus) => {
    const userIndex = mockUsersData.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        mockUsersData[userIndex].status = newStatus;
        console.log(`MOCK DB: Updated user ${userId} status to ${newStatus}`);
    }
};

export const getUserById = (userId) => {
    return mockUsersData.find(u => u.id === userId);
}
