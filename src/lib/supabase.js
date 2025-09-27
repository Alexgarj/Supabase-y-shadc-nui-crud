import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yfugduwlqkcxeyrfwjec.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmdWdkdXdscWtjeGV5cmZ3amVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxMzc0ODUsImV4cCI6MjA3MzcxMzQ4NX0.9Vd6LLccCMsY4Q0Db9qI9pAsv4XuOxvvoL4jDMJB5dw'
if (!supabaseUrl || !supabaseKey) {
throw new Error('Missing Supabase environment variables')
}
export const supabase = createClient(supabaseUrl, supabaseKey)