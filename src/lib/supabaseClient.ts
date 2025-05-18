import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://prmxjyolpfaxbovrxkvu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBybXhqeW9scGZheGJvdnJ4a3Z1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MDgxMzYsImV4cCI6MjA2MjQ4NDEzNn0.t-5HaFAuwiItSJcgDoFkLrmTHMciK-vCV5JXDO7LLrk';
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'pkce', // Use PKCE flow for secure OAuth in SPAs
  },
}); 