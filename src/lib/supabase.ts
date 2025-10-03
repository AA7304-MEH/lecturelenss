import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validate environment variables
const isValidUrl = (url: string) => {
  try {
    return url && (url.startsWith('http://') || url.startsWith('https://')) && !url.includes('your_supabase')
  } catch {
    return false
  }
}

const isValidKey = (key: string) => {
  return key && !key.includes('your_supabase') && key.length > 20
}

// Export validation status for use in API routes
export const supabaseConfigValid = isValidUrl(supabaseUrl) && isValidKey(supabaseAnonKey)

// Create Supabase client - will only work if environment variables are properly set
export const supabase = createClient(
  supabaseConfigValid ? supabaseUrl : 'https://placeholder.supabase.co',
  supabaseConfigValid ? supabaseAnonKey : 'placeholder-key-that-wont-work'
)

export type TranscriptRecord = {
  id: string
  transcript: string
  summary: string
  created_at: string
  title?: string
}