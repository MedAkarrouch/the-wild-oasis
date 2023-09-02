import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://oevbcgvtmwnrmqfhfvou.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ldmJjZ3Z0bXducm1xZmhmdm91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI0MzYwODcsImV4cCI6MjAwODAxMjA4N30.UFh8FfaOpQHTN1unckF5zE5gnRAn8eBUDk2wUvegJPg";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
