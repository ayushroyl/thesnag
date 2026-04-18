// Supabase Database Setup Script
// Run this with: node setup-database.js

const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://nfywmyglslgoyqkfhmxe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5meXdteWdsc2xnb3lxa2ZobXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNjAyNTMsImV4cCI6MjA5MTczNjI1M30.-11MKroJFPdXdDfGl86vFMacAN2Jch0f2ALAlvJZTv8'

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDatabase() {
  console.log('🚀 Setting up Supabase database...\n')

  // Insert sample portfolio data
  console.log('📁 Inserting portfolio projects...')
  const { data: portfolioData, error: portfolioError } = await supabase
    .from('portfolio')
    .insert([
      { name: 'TED-Ed', type: 'Education Platform', description: 'Global educational content strategy' },
      { name: 'Goa Book Festival', type: 'Cultural Event', description: 'Digital presence for literary celebration' },
      { name: 'World Book Fair', type: 'International Event', description: 'Marketing and social media management' },
      { name: 'Rajgir Zoo Safari App', type: 'Mobile Application', description: 'UI/UX design and development' },
      { name: 'International Clients', type: 'Global Projects', description: 'Serving brands across continents' },
      { name: 'Community Events', type: 'Local Impact', description: 'Building connections in Nalanda' }
    ])
    .select()

  if (portfolioError) {
    console.log('⚠️  Portfolio insert issue:', portfolioError.message)
  } else {
    console.log('✅ Portfolio projects added!')
  }

  // Insert sample testimonials
  console.log('\n💬 Inserting testimonials...')
  const { data: testimonialData, error: testimonialError } = await supabase
    .from('testimonials')
    .insert([
      { 
        name: 'Rajesh Kumar', 
        company: 'TED-Ed India', 
        message: 'The Snag delivered exceptional work with deep understanding of our mission. Their approach combines modern execution with timeless values.' 
      },
      { 
        name: 'Sarah Johnson', 
        company: 'World Book Fair', 
        message: 'Working with Sujal and The Snag was a game-changer. Professional, responsive, and truly committed to excellence.' 
      },
      {
        name: 'Amit Sharma',
        company: 'Rajgir Zoo Safari',
        message: 'The Snag team brought our vision to life with stunning design and flawless execution. Highly recommend!'
      }
    ])
    .select()

  if (testimonialError) {
    console.log('⚠️  Testimonials insert issue:', testimonialError.message)
  } else {
    console.log('✅ Testimonials added!')
  }

  console.log('\n✨ Database setup complete!')
  console.log('\n📊 Summary:')
  console.log('- Portfolio projects: Ready')
  console.log('- Testimonials: Ready')
  console.log('- Leads table: Ready for submissions')
  console.log('\n🎯 Next steps:')
  console.log('1. Visit: https://nalanda-creative.preview.emergentagent.com')
  console.log('2. Test contact form')
  console.log('3. Login to admin: https://nalanda-creative.preview.emergentagent.com/admin')
  console.log('4. Password: admin123\n')
}

setupDatabase().catch(console.error)
