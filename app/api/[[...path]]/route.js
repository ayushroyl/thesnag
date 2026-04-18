import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Helper function to verify admin authentication
function verifyAdmin(request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  const token = authHeader.split(' ')[1]
  return token === process.env.ADMIN_PASSWORD
}

// GET /api
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get('path') || ''

  try {
    // GET /api/testimonials
    if (path === '/testimonials' || request.url.includes('/api/testimonials')) {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return NextResponse.json({ success: true, testimonials: data || [] })
    }

    // GET /api/portfolio
    if (path === '/portfolio' || request.url.includes('/api/portfolio')) {
      const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return NextResponse.json({ success: true, projects: data || [] })
    }

    // GET /api/services
    if (path === '/services' || request.url.includes('/api/services')) {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true })
      
      if (error) throw error
      return NextResponse.json({ success: true, services: data || [] })
    }

    // GET /api/leads (admin only)
    if (path === '/leads' || request.url.includes('/api/leads')) {
      if (!verifyAdmin(request)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
      }

      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return NextResponse.json({ success: true, leads: data || [] })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'The Snag API',
      endpoints: ['/contact', '/testimonials', '/portfolio', '/services', '/leads']
    })
  } catch (error) {
    console.error('GET Error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// POST /api
export async function POST(request) {
  try {
    const url = new URL(request.url)
    const body = await request.json()

    // POST /api/contact
    if (url.pathname.includes('/api/contact')) {
      const { name, email, whatsapp, service, message } = body

      if (!name || !email || !whatsapp || !service || !message) {
        return NextResponse.json({ 
          success: false, 
          error: 'All fields are required' 
        }, { status: 400 })
      }

      const { data, error } = await supabase
        .from('leads')
        .insert([{ name, email, whatsapp, service, message }])
        .select()

      if (error) throw error
      return NextResponse.json({ success: true, lead: data[0] })
    }

    // POST /api/admin/login
    if (url.pathname.includes('/api/admin/login')) {
      const { password } = body

      if (password === process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ 
          success: true, 
          token: process.env.ADMIN_PASSWORD 
        })
      }

      return NextResponse.json({ 
        success: false, 
        error: 'Invalid password' 
      }, { status: 401 })
    }

    // POST /api/testimonials (admin only)
    if (url.pathname.includes('/api/testimonials')) {
      if (!verifyAdmin(request)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
      }

      const { name, company, message } = body
      if (!name || !company || !message) {
        return NextResponse.json({ 
          success: false, 
          error: 'Name, company, and message are required' 
        }, { status: 400 })
      }

      const { data, error } = await supabase
        .from('testimonials')
        .insert([{ name, company, message }])
        .select()

      if (error) throw error
      return NextResponse.json({ success: true, testimonial: data[0] })
    }

    // POST /api/portfolio (admin only)
    if (url.pathname.includes('/api/portfolio')) {
      if (!verifyAdmin(request)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
      }

      const { name, type, description } = body
      if (!name || !type || !description) {
        return NextResponse.json({ 
          success: false, 
          error: 'Name, type, and description are required' 
        }, { status: 400 })
      }

      const { data, error } = await supabase
        .from('portfolio')
        .insert([{ name, type, description }])
        .select()

      if (error) throw error
      return NextResponse.json({ success: true, project: data[0] })
    }

    // POST /api/services (admin only)
    if (url.pathname.includes('/api/services')) {
      if (!verifyAdmin(request)) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
      }

      const { title, description, order_index } = body
      if (!title || !description) {
        return NextResponse.json({ 
          success: false, 
          error: 'Title and description are required' 
        }, { status: 400 })
      }

      const { data, error } = await supabase
        .from('services')
        .insert([{ title, description, order_index: order_index || 0 }])
        .select()

      if (error) throw error
      return NextResponse.json({ success: true, service: data[0] })
    }

    return NextResponse.json({ 
      success: false, 
      error: 'Endpoint not found' 
    }, { status: 404 })

  } catch (error) {
    console.error('POST Error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// DELETE /api
export async function DELETE(request) {
  try {
    const url = new URL(request.url)
    const { searchParams } = url

    if (!verifyAdmin(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: 'ID is required' 
      }, { status: 400 })
    }

    // DELETE /api/testimonials
    if (url.pathname.includes('/api/testimonials')) {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)

      if (error) throw error
      return NextResponse.json({ success: true })
    }

    // DELETE /api/portfolio
    if (url.pathname.includes('/api/portfolio')) {
      const { error } = await supabase
        .from('portfolio')
        .delete()
        .eq('id', id)

      if (error) throw error
      return NextResponse.json({ success: true })
    }

    // DELETE /api/services
    if (url.pathname.includes('/api/services')) {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)

      if (error) throw error
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ 
      success: false, 
      error: 'Endpoint not found' 
    }, { status: 404 })

  } catch (error) {
    console.error('DELETE Error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// PUT /api
export async function PUT(request) {
  try {
    const url = new URL(request.url)
    const body = await request.json()
    const { id } = body

    if (!verifyAdmin(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    if (!id) {
      return NextResponse.json({ 
        success: false, 
        error: 'ID is required' 
      }, { status: 400 })
    }

    // PUT /api/testimonials
    if (url.pathname.includes('/api/testimonials')) {
      const { name, company, message } = body
      const { data, error } = await supabase
        .from('testimonials')
        .update({ name, company, message })
        .eq('id', id)
        .select()

      if (error) throw error
      return NextResponse.json({ success: true, testimonial: data[0] })
    }

    // PUT /api/portfolio
    if (url.pathname.includes('/api/portfolio')) {
      const { name, type, description } = body
      const { data, error } = await supabase
        .from('portfolio')
        .update({ name, type, description })
        .eq('id', id)
        .select()

      if (error) throw error
      return NextResponse.json({ success: true, project: data[0] })
    }

    // PUT /api/services
    if (url.pathname.includes('/api/services')) {
      const { title, description, order_index } = body
      const { data, error } = await supabase
        .from('services')
        .update({ title, description, order_index })
        .eq('id', id)
        .select()

      if (error) throw error
      return NextResponse.json({ success: true, service: data[0] })
    }

    return NextResponse.json({ 
      success: false, 
      error: 'Endpoint not found' 
    }, { status: 404 })

  } catch (error) {
    console.error('PUT Error:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
