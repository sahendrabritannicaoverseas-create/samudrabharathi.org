/*
  # Samudra Bharathi Tamil Nadu Trust Website Schema

  ## Overview
  Creates the database schema for managing the trust's website content including events, media, and categories.

  ## New Tables
  
  ### `categories`
  Stores different types of activities (competitions, cultural programs, social initiatives, etc.)
  - `id` (uuid, primary key)
  - `name` (text) - Category name
  - `description` (text) - Category description
  - `created_at` (timestamptz) - Creation timestamp
  
  ### `events`
  Stores all events and activities organized by the trust
  - `id` (uuid, primary key)
  - `title` (text) - Event title
  - `description` (text) - Event description
  - `category_id` (uuid, foreign key) - Links to categories table
  - `event_date` (date) - Date of the event
  - `location` (text) - Event location
  - `featured` (boolean) - Whether to feature on homepage
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp
  
  ### `media`
  Stores photos and video links for the trust's activities
  - `id` (uuid, primary key)
  - `title` (text) - Media title
  - `description` (text) - Media description
  - `type` (text) - Type: 'image' or 'video'
  - `url` (text) - Image URL or YouTube video link
  - `event_id` (uuid, foreign key) - Optional link to specific event
  - `featured` (boolean) - Whether to feature in gallery
  - `display_order` (integer) - Order for displaying media
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for all content (website is public)
  - Restricted write access (will be managed through admin interface)
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  event_date date DEFAULT CURRENT_DATE,
  location text DEFAULT '',
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create media table
CREATE TABLE IF NOT EXISTS media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  type text NOT NULL CHECK (type IN ('image', 'video')),
  url text NOT NULL,
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (website content is public)
CREATE POLICY "Public can view categories"
  ON categories FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view events"
  ON events FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public can view media"
  ON media FOR SELECT
  TO public
  USING (true);

-- Insert default categories
INSERT INTO categories (name, description) VALUES
  ('Competitions', 'Various competitions organized by the trust'),
  ('Cultural Programs', 'Cultural events and programs celebrating Tamil heritage'),
  ('Social Initiatives', 'Community service and social welfare activities'),
  ('Workshops', 'Educational and skill development workshops'),
  ('Celebrations', 'Festival celebrations and special occasions')
ON CONFLICT DO NOTHING;
