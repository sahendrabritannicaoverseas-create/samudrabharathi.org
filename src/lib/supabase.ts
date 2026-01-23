import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Category {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category_id: string;
  event_date: string;
  location: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
  categories?: Category;
}

export interface Media {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'video';
  url: string;
  event_id?: string;
  featured: boolean;
  display_order: number;
  created_at: string;
}
