# The Snag - Setup Instructions

## 🎉 Your Premium Website is Ready!

The Snag website has been built with:
- ✅ Beautiful, premium dark theme with gold accents
- ✅ Framer Motion animations
- ✅ Responsive mobile-first design
- ✅ Full admin dashboard
- ✅ Contact form with lead capture
- ✅ Portfolio management
- ✅ Testimonials system

## 🔧 Complete Supabase Setup

### Step 1: Run Database Setup SQL

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project: `nfywmyglslgoyqkfhmxe`
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New Query"**
5. Copy and paste the entire contents of `/app/supabase-setup.sql`
6. Click **"Run"** to execute the SQL
7. You should see: "Database setup complete! All tables created successfully."

### Step 2: Get Your Supabase Anon Key

1. In Supabase Dashboard, go to **Settings** → **API**
2. Under **Project API keys**, find **"anon" / "public"** key
3. Copy the `anon` key (it's a long JWT token starting with `eyJ...`)
4. Update `/app/.env` file:
   - Replace `NEXT_PUBLIC_SUPABASE_ANON_KEY` value with your actual anon key

### Step 3: Restart the Server

```bash
sudo supervisorctl restart nextjs
```

## 🔐 Admin Dashboard Access

**URL:** https://nalanda-creative.preview.emergentagent.com/admin

**Default Password:** `admin123`

⚠️ **Important:** Change this password in production! Update `.env` → `ADMIN_PASSWORD`

## 📋 Admin Dashboard Features

Once logged in, you can:
- **Leads Tab:** View all contact form submissions
- **Portfolio Tab:** Add, edit, delete portfolio projects
- **Testimonials Tab:** Manage client testimonials
- **Services Tab:** (Currently hardcoded in frontend)

## 🎨 Color System

- Background: `#0A0A0A` (Deep Black)
- Text: `#FFFFFF` (White)
- Accent Gold: `#D4AF37` (Premium Gold)
- Accent Blue: `#3B82F6` (Modern Blue)
- Soft Gray: `#A1A1AA` (Muted Text)

## 📁 File Structure

```
/app/
├── app/
│   ├── page.js              # Main homepage
│   ├── admin/page.js        # Admin dashboard
│   ├── layout.js            # Root layout
│   ├── globals.css          # Global styles
│   └── api/[[...path]]/route.js  # API routes
├── lib/
│   └── supabase.js          # Supabase client
├── components/ui/           # shadcn components
├── .env                     # Environment variables
└── supabase-setup.sql       # Database schema
```

## 🚀 API Endpoints

### Public Endpoints
- `GET /api/testimonials` - Get all testimonials
- `GET /api/portfolio` - Get all portfolio projects
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Require Authorization)
- `POST /api/admin/login` - Admin login
- `GET /api/leads` - Get all leads
- `POST /api/portfolio` - Add portfolio project
- `PUT /api/portfolio` - Update portfolio project
- `DELETE /api/portfolio?id={id}` - Delete portfolio project
- `POST /api/testimonials` - Add testimonial
- `PUT /api/testimonials` - Update testimonial
- `DELETE /api/testimonials?id={id}` - Delete testimonial

## 🎯 Next Steps

1. **Complete Supabase Setup** (Steps above)
2. **Test the website:** https://nalanda-creative.preview.emergentagent.com
3. **Login to admin:** https://nalanda-creative.preview.emergentagent.com/admin
4. **Add real testimonials** through the admin dashboard
5. **Customize content** as needed
6. **Add social media links** (currently placeholder `#` links in footer)
7. **Update contact information** (email, phone in Contact section)

## 🔧 Customization

### Update Logo
Replace the logo URL in:
- `/app/app/page.js` (Hero section & Footer)

### Update Founder Photo
Replace the founder photo URL in:
- `/app/app/page.js` (About section & Founder message)

### Update Background Images
Replace image URLs in relevant sections in `/app/app/page.js`

## 📱 Features

### Animations
- Smooth scroll reveals
- Card hover effects
- Floating scroll indicator
- Testimonial slider
- Gradient text effects

### Responsive Design
- Mobile-first approach
- Tablet optimized
- Desktop enhanced
- Touch-friendly UI

### SEO Ready
- Semantic HTML
- Fast loading
- Image optimization
- Meta tags ready

## 🎨 Design Philosophy

**Nalanda-First Digital Systems**
- Calm, intelligent, premium feel
- Modern execution with ancient wisdom
- High trust, founder-led approach
- Global standards from local roots

## 🐛 Troubleshooting

### If testimonials don't show:
1. Make sure Supabase SQL has been run
2. Check if anon key is correct in `.env`
3. Add testimonials through admin dashboard

### If contact form fails:
1. Verify Supabase connection
2. Check browser console for errors
3. Ensure all tables are created

### If admin login fails:
1. Password is `admin123` by default
2. Check `.env` → `ADMIN_PASSWORD`

## 📞 Support

For any issues or customizations, refer to:
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs
- Framer Motion: https://www.framer.com/motion

---

**Built from Nalanda, designed for the world. 🙏**
