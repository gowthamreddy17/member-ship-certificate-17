// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vjaipyqvayppmgergohp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqYWlweXF2YXlwcG1nZXJnb2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcyNzY5MTYsImV4cCI6MjA0Mjg1MjkxNn0.jIBed519lpHNlEpgboig3vscxzg4QTkcyAhuNfhbwtU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
