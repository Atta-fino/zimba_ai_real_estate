// supabase/functions/shared/supabase-client.ts

// This is a MOCK client for type safety and to illustrate interactions.
// In a real Supabase Edge Function, you'd import and use the actual Supabase client.
// import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Define types based on your schema (simplified)
export interface Booking {
  id: string;
  amount: number; // Assuming 'amount' is the total transaction value on the booking
  transaction_type: 'rent' | 'sale';
  currency_code: string;
  user_id: string; // User who made the booking
  property_id: string;
  // ... other booking fields
}

export interface User {
    id: string;
    role: string; // e.g., 'diaspora', 'renter', 'landlord'
    country: string; // User's country code
    // ... other user fields
}

export interface Property {
    id: string;
    country: string; // Property's country code
    // ... other property fields
}

export interface Commission {
  agent_id?: string | null;
  booking_id: string;
  amount: number;
  type: 'rent' | 'sale';
  currency_code: string; // Added for clarity, assuming it's part of commission record
}

export interface Setting {
  key: string;
  value: any; // In reality, value for rates would be number (e.g., 0.05)
}

export interface AnalyticsEvent {
    event_type: string;
    user_id: string;
    meta_json: Record<string, any>;
}


// Mock Supabase client interface
export interface MockSupabaseClient {
  from: (table: string) => {
    select: (columns?: string) => Promise<{ data: any[] | null; error: any | null }>;
    insert: (data: any[] | any) => Promise<{ data: any[] | null; error: any | null }>;
    // Add other methods like update, delete, rpc as needed
  };
}

// Create a mock client instance (this would be initialized with URL and anon key in real functions)
export const supabaseClient: MockSupabaseClient = {
  from: (table: string) => ({
    select: async (columns?: string) => {
      console.log(`MOCK DB: SELECT ${columns || '*'} FROM ${table}`);
      if (table === 'settings') {
        // Simulate fetching settings
        if (columns?.includes('key,value')) {
            return Promise.resolve({ data: [
                { key: 'rent_commission_rate', value: 0.05 },
                { key: 'sale_commission_rate', value: 0.03 },
                { key: 'diaspora_escrow_fee_rate', value: 0.02 } // Added for diaspora fee
            ], error: null });
        }
      }
      if (table === 'bookings' && columns?.includes('*')) {
        // Simulate fetching a booking
        return Promise.resolve({ data: [{ id: 'mock_booking_id', amount: 2500, transaction_type: 'rent', currency_code: 'NGN', user_id: 'mock_user_id', property_id: 'mock_property_id' }], error: null });
      }
      if (table === 'users' && columns?.includes('*')) {
        // Simulate fetching a user
        return Promise.resolve({data: [{id: 'mock_user_id', role: 'diaspora', country: 'US'}], error: null});
      }
       if (table === 'properties' && columns?.includes('*')) {
        // Simulate fetching a property
        return Promise.resolve({data: [{id: 'mock_property_id', country: 'NG'}], error: null});
      }
      return Promise.resolve({ data: [], error: null });
    },
    insert: async (data: any[] | any) => {
      console.log(`MOCK DB: INSERT INTO ${table} DATA:`, JSON.stringify(data, null, 2));
      // Simulate successful insert
      const returnData = Array.isArray(data) ? data : [data];
      return Promise.resolve({ data: returnData, error: null });
    },
  }),
};

console.log("Mock Supabase client loaded (for type safety and structure).");
