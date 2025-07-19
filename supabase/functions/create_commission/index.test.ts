import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Mock Supabase client
const supabase = {
  from: (table) => ({
    select: (columns) => ({
      eq: (column, value) => ({
        single: async () => {
          if (table === 'bookings' && column === 'id') {
            return { data: { id: value, transaction_type: 'rent', properties: { price: 1000 } }, error: null }
          }
          if (table === 'settings' && column === 'key') {
            return { data: { value: { value: '0.05' } }, error: null }
          }
          return { data: null, error: new Error('Not found') }
        }
      })
    }),
    insert: (data) => ({
        then: (callback) => callback({ error: null })
    })
  })
};


Deno.test("create_platform_commission", async (t) => {
    await t.step("should create a commission when payment is confirmed", async () => {
        const req = new Request('http://localhost', {
            method: 'POST',
            body: JSON.stringify({ record: { status: 'confirmed', booking_id: '123' } })
        })

        const res = await serve(req)
        const json = await res.json()

        assertEquals(res.status, 200)
        assertEquals(json.message, "Commission created successfully")
    })

    await t.step("should not create a commission when payment is not confirmed", async () => {
        const req = new Request('http://localhost', {
            method: 'POST',
            body: JSON.stringify({ record: { status: 'pending', booking_id: '123' } })
        })

        const res = await serve(req)
        const json = await res.json()

        assertEquals(res.status, 200)
        assertEquals(json.message, "Payment not confirmed")
    })
})
