-- The Snag Database Schema
-- Run this in Supabase SQL Editor to create all required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Leads Table (Contact Form Submissions)
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(50) NOT NULL,
  service VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolio Table
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_created_at ON portfolio(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(order_index ASC);

-- Insert sample portfolio data
INSERT INTO portfolio (name, type, description) VALUES
  ('TED-Ed', 'Education Platform', 'Global educational content strategy'),
  ('Goa Book Festival', 'Cultural Event', 'Digital presence for literary celebration'),
  ('World Book Fair', 'International Event', 'Marketing and social media management'),
  ('Rajgir Zoo Safari App', 'Mobile Application', 'UI/UX design and development'),
  ('International Clients', 'Global Projects', 'Serving brands across continents'),
  ('Community Events', 'Local Impact', 'Building connections in Nalanda')
ON CONFLICT DO NOTHING;

-- Insert sample testimonial
INSERT INTO testimonials (name, company, message) VALUES
  ('Rajesh Kumar', 'TED-Ed India', 'The Snag delivered exceptional work with deep understanding of our mission. Their approach combines modern execution with timeless values.'),
  ('Sarah Johnson', 'World Book Fair', 'Working with Sujal and The Snag was a game-changer. Professional, responsive, and truly committed to excellence.')
ON CONFLICT DO NOTHING;

-- Row Level Security (RLS) - Disable for now to allow direct access
ALTER TABLE leads DISABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio DISABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE services DISABLE ROW LEVEL SECURITY;

-- Success message
SELECT 'Database setup complete! All tables created successfully.' AS status;
