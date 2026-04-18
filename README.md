# The Snag - Premium Digital Agency Website

> **Built in Nalanda. Designed for the World.**

A modern, full-stack website for The Snag digital agency with Next.js, Tailwind CSS, Framer Motion, and Supabase.

![The Snag](https://customer-assets.emergentagent.com/job_1c2e70d1-2b59-494f-af27-fc00c899fa13/artifacts/8873ezox_The%20Snag%20%20%281%29.png)

## 🌟 Features

- **Premium Design**: Dark theme with gold accents (#0A0A0A, #D4AF37, #3B82F6)
- **Smooth Animations**: Framer Motion for scroll reveals and hover effects
- **Full Admin Dashboard**: Manage portfolio, testimonials, and leads
- **Supabase Backend**: PostgreSQL database with real-time capabilities
- **Responsive Design**: Mobile-first approach, works on all devices
- **SEO Optimized**: Fast loading, semantic HTML
- **Contact Form**: Lead capture with database storage

## 📋 Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React

## 🚀 Quick Start

### 1. Prerequisites

- Node.js 18+ installed
- Yarn package manager (`npm install -g yarn`)
- Supabase account (free tier works)

### 2. Installation

```bash
# Install dependencies
yarn install
```

### 3. Environment Setup

```bash
# Copy example env file
cp .env.example .env

# Edit .env with your Supabase credentials
```

**Required Environment Variables:**

Get from [Supabase Dashboard](https://supabase.com/dashboard):

1. **NEXT_PUBLIC_SUPABASE_URL**: 
   - Dashboard → Your Project → Settings → API → Project URL

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**: 
   - Dashboard → Your Project → Settings → API → anon/public key

3. **DATABASE_URL**: 
   - Dashboard → Your Project → Connect → Transaction Pooler → Connection String

### 4. Database Setup

Run the SQL script in Supabase:

1. Go to Supabase Dashboard → SQL Editor
2. Click "+ New Query"
3. Copy contents of `supabase-setup.sql`
4. Run the query (Cmd/Ctrl + Enter)

This creates:
- `leads` table (contact form submissions)
- `portfolio` table (project showcase)
- `testimonials` table (client reviews)
- `services` table (service offerings)

### 5. Run Development Server

```bash
yarn dev
```

Visit: http://localhost:3000

## 🎯 Project Structure

```
the-snag/
├── app/
│   ├── page.js              # Homepage
│   ├── admin/page.js        # Admin dashboard
│   ├── layout.js            # Root layout
│   ├── globals.css          # Global styles
│   └── api/[[...path]]/route.js  # API routes
├── components/ui/           # shadcn/ui components
├── lib/
│   ├── supabase.js         # Supabase client
│   └── utils.js            # Utility functions
├── hooks/                  # Custom React hooks
├── .env.example            # Environment variables template
├── supabase-setup.sql      # Database schema
├── setup-database.js       # Database seeding script
├── package.json            # Dependencies
└── README.md              # This file
```

## 🔐 Admin Dashboard

**Access:** http://localhost:3000/admin
**Default Password:** `admin123`

⚠️ **IMPORTANT**: Change the admin password in `.env` → `ADMIN_PASSWORD` before deploying!

### Admin Features:
- View all contact leads
- Add/Edit/Delete portfolio projects
- Add/Edit/Delete testimonials
- Real-time statistics dashboard

## 📝 Customization

### Update Contact Information

Edit `/app/app/page.js`:

```javascript
// Search for "Contact Section" and update:
- Email: hello@thesnag.in
- Phone: +91 XXXXX XXXXX
- Location: Biharsharif, Nalanda, Bihar
```

### Update Social Media Links

In footer section of `/app/app/page.js`, replace `#` with actual URLs:

```javascript
<a href="https://linkedin.com/company/thesnag">
<a href="https://twitter.com/thesnag">
<a href="https://instagram.com/thesnag">
<a href="https://facebook.com/thesnag">
```

### Change Color Scheme

Update Tailwind config or use CSS variables in `/app/globals.css`:

- Background: `#0A0A0A`
- Gold: `#D4AF37`
- Blue: `#3B82F6`

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables for Production

Add these in Vercel/deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_BASE_URL` (your production URL)

## 🔧 API Endpoints

### Public
- `GET /api/testimonials` - Get all testimonials
- `GET /api/portfolio` - Get all projects
- `POST /api/contact` - Submit contact form

### Admin (Requires Authorization Header)
- `POST /api/admin/login` - Admin login
- `GET /api/leads` - Get all leads
- `POST /api/portfolio` - Add project
- `PUT /api/portfolio` - Update project
- `DELETE /api/portfolio?id={id}` - Delete project
- `POST /api/testimonials` - Add testimonial
- `PUT /api/testimonials` - Update testimonial
- `DELETE /api/testimonials?id={id}` - Delete testimonial

## 🎨 Design System

### Colors
- **Background**: `#0A0A0A` (Deep Black)
- **Text**: `#FFFFFF` (White)
- **Accent Gold**: `#D4AF37` (Premium Gold)
- **Accent Blue**: `#3B82F6` (Trust Blue)
- **Muted**: `#A1A1AA` (Soft Gray)

### Typography
- Headings: Bold, large sizes
- Body: Regular weight, comfortable line-height
- Gradients on key headings for premium feel

### Components
All UI components from shadcn/ui:
- Buttons, Cards, Inputs, Textareas
- Tabs, Dialogs, Dropdowns
- Fully customizable and accessible

## 📖 Pages Overview

### Homepage (`/`)
- Hero section with logo and CTA buttons
- About section with founder photo and stats
- 12 service cards
- Portfolio showcase (6 projects)
- Why Choose Us section
- Testimonials slider
- Founder message
- Contact form
- Footer with links

### Admin Dashboard (`/admin`)
- Login page
- Dashboard with stats
- Leads management
- Portfolio CRUD
- Testimonials CRUD

## 🧪 Testing

### Test Contact Form
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "whatsapp": "+91 1234567890",
    "service": "Web Development",
    "message": "Test message"
  }'
```

### Test API Endpoints
```bash
# Get testimonials
curl http://localhost:3000/api/testimonials

# Get portfolio
curl http://localhost:3000/api/portfolio
```

## 📦 Dependencies

### Main
- next: 14.2.3
- react: 18
- @supabase/supabase-js: ^2.39.0
- framer-motion: ^11.0.3
- tailwindcss: ^3.4.1
- lucide-react: ^0.516.0

### UI Components
- @radix-ui/* (various)
- shadcn/ui components
- clsx, tailwind-merge

## 🛠️ Development

### Available Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn lint         # Run linter
```

### Hot Reload
The development server supports hot reload for:
- Frontend changes (automatic)
- API route changes (automatic)
- Environment variables (requires restart)

## 🐛 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is Transaction Pooler (port 6543), not direct connection
- Check Supabase credentials are correct
- Ensure SQL setup script was run

### Admin Login Not Working
- Check `ADMIN_PASSWORD` in `.env`
- Default is `admin123`

### Testimonials Not Showing
- Run `supabase-setup.sql` in Supabase SQL Editor
- Verify tables exist in Supabase dashboard
- Check browser console for errors

### Images Not Loading
- Verify asset URLs are accessible
- Check CORS settings if self-hosting images

## 📄 License

This project was built for The Snag digital agency.

## 🙏 Credits

**Founder**: Sujal Nagwanshi
**Agency**: The Snag
**Tagline**: Nalanda-First Digital Systems
**Location**: Biharsharif, Nalanda, Bihar

Built with discipline, trust, and consistency from Nalanda, the Land of Buddha.

---

## 📞 Support

For questions or issues:
- Email: hello@thesnag.in
- Location: Biharsharif, Nalanda, Bihar

**Built from Nalanda, designed for the world. 🙏**
