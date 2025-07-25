import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gdgnmgbahmdmqosychix.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkZ25tZ2JhaG1kbXFvc3ljaGl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzOTA1NTUsImV4cCI6MjA2Nzk2NjU1NX0.HJdRFW6XoWudpf7sTllXwQiBv9n0c17eMHTCxDBfCuM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
