import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Mock Supabase client
const supabase = {
  from: (table) => ({
    select: (columns) => ({
      eq: (column, value) => ({
        single: async () => {
          if (table === 'users' && column === 'id') {
            return { data: { id: value, role: 'diaspora', country: 'US' }, error: null }
          }
          if (table === 'properties' && column === 'id') {
            return { data: { country_code: 'GH' }, error: null }
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


Deno.test("apply_diaspora_escrow_fee", async (t) => {
    await t.step("should apply fee for diaspora user", async () => {
        const req = new Request('http://localhost', {
            method: 'POST',
            body: JSON.stringify({ record: { user_id: '123', property_id: '456', amount: 1000 } })
        })

        const res = await serve(req)
        const json = await res.json()

        assertEquals(res.status, 200)
        assertEquals(json.message, "Diaspora escrow fee processed")
    })
})
