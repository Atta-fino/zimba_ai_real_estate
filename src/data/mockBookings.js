// A simple in-memory store for mock bookings to persist across pages during a session.
// In a real app, this would be managed by a state management library like Redux or Zustand,
// and would be populated by API calls.

export let mockRenterBookingsData = [
  {
    id: 'bookingRenter1',
    propertyId: 'prop1',
    propertyName: 'Spacious 3-Bedroom Apartment in Lekki',
    propertyImage: '/assets/images/stock/apartment_1_a.jpg',
    landlordName: 'Adeola Property Pro',
    startDate: '2024-08-01',
    endDate: '2025-07-31',
    totalPrice: 5000000,
    currency: 'NGN',
    escrow_state: 'escrow_active',
    bookedAt: '2024-07-15T10:30:00Z',
  },
  {
    id: 'bookingRenter2',
    propertyId: 'prop2',
    propertyName: 'Modern Office Space in Ikeja',
    propertyImage: '/assets/images/stock/office_1_a.jpg',
    landlordName: 'Chinedu Real Estate',
    startDate: '2024-09-01',
    endDate: '2024-09-30',
    totalPrice: 250000,
    currency: 'NGN',
    escrow_state: 'pending',
    bookedAt: '2024-07-28T11:00:00Z',
  },
];

export const addBooking = (newBooking) => {
  mockRenterBookingsData.unshift(newBooking); // Add to the beginning of the array
  console.log("MOCK DB: New booking added. Current bookings:", mockRenterBookingsData);
};

export const updateBookingStatus = (bookingId, newStatus) => {
    const bookingIndex = mockRenterBookingsData.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
        mockRenterBookingsData[bookingIndex].escrow_state = newStatus;
        console.log(`MOCK DB: Updated booking ${bookingId} to status ${newStatus}`);
    }
};
