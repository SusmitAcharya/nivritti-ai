import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

let supabase;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Please connect to Supabase.')
  // Create a dummy client to prevent errors
  supabase = createClient('https://dummy.supabase.co', 'dummy-key')
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase };

// Auth helper functions
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData
    }
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/dashboard`
    }
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Database helper functions
export const saveQuestionnaireResponse = async (userId: string, response: any) => {
  const { data, error } = await supabase
    .from('questionnaire_responses')
    .insert([
      {
        user_id: userId,
        response: response
      }
    ])
  return { data, error }
}

export const createUploadSession = async (userId: string, filename: string, rowCount: number) => {
  const { data, error } = await supabase
    .from('upload_sessions')
    .insert([
      {
        user_id: userId,
        filename: filename,
        row_count: rowCount
      }
    ])
    .select()
  return { data, error }
}

export const saveAIOutput = async (userId: string, sessionId: string, outputType: string, result: any) => {
  const { data, error } = await supabase
    .from('ai_outputs')
    .insert([
      {
        user_id: userId,
        session_id: sessionId,
        output_type: outputType,
        result: result
      }
    ])
  return { data, error }
}

export const uploadFile = async (file: File, bucket: string, path: string) => {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file)
  return { data, error }
}

export const getFileUrl = (bucket: string, path: string) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  return data.publicUrl
}