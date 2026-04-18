'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Sparkles, Target, Video, Mic, Globe, Palette, Calendar, 
  TrendingUp, Search, Building2, Users, CheckCircle2,
  ArrowRight, Mail, Phone, MapPin, Linkedin, Twitter,
  Instagram, Facebook, Quote
} from 'lucide-react'

const services = [
  { icon: Target, title: 'Branding & Positioning', description: 'Build a brand that stands out with clarity and purpose' },
  { icon: Users, title: 'Social Media Management', description: 'Engage your audience with strategic content' },
  { icon: Video, title: 'Video Editing', description: 'Premium video production for modern brands' },
  { icon: Mic, title: 'Podcast Editing', description: 'Professional audio editing for your voice' },
  { icon: Globe, title: 'Website Management', description: 'Modern, fast, and conversion-focused websites' },
  { icon: Palette, title: 'UI/UX Design', description: 'Beautiful interfaces that users love' },
  { icon: Calendar, title: 'Event Management', description: 'Seamless execution of memorable experiences' },
  { icon: TrendingUp, title: 'Lead Generation', description: 'Strategic campaigns that convert' },
  { icon: Sparkles, title: 'Meta Ads', description: 'Data-driven advertising with proven ROI' },
  { icon: Search, title: 'SEO', description: 'Rank higher, get discovered, grow organic traffic' },
  { icon: Building2, title: 'Government Projects Support', description: 'Trusted partner for public sector initiatives' },
  { icon: Globe, title: 'International Projects', description: 'Global standards from local roots' }
]

const portfolio = [
  { name: 'TED-Ed', type: 'Education Platform', description: 'Global educational content strategy' },
  { name: 'Goa Book Festival', type: 'Cultural Event', description: 'Digital presence for literary celebration' },
  { name: 'World Book Fair', type: 'International Event', description: 'Marketing and social media management' },
  { name: 'Rajgir Zoo Safari App', type: 'Mobile Application', description: 'UI/UX design and development' },
  { name: 'International Clients', type: 'Global Projects', description: 'Serving brands across continents' },
  { name: 'Community Events', type: 'Local Impact', description: 'Building connections in Nalanda' }
]

const whyChooseUs = [
  { title: 'Rooted in Values', description: 'Built on the wisdom of Nalanda - discipline, clarity, and truth' },
  { title: 'Founder-Led Execution', description: 'Direct access to Sujal Nagwanshi for every project' },
  { title: 'Fast Communication', description: 'Quick responses, transparent updates, zero delays' },
  { title: 'Premium Quality', description: 'World-class standards in every deliverable' },
  { title: 'Long-Term Thinking', description: 'Partnerships built to last, not quick fixes' },
  { title: 'Global from Local', description: 'International expertise rooted in Nalanda' }
]

const stats = [
  { number: '30+', label: 'Projects Completed' },
  { number: '15+', label: 'International Clients' },
  { number: '100%', label: 'Founder Led' },
  { number: '2+', label: 'Years Experience' }
]

export default function Home() {
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', service: '', message: '' })
  const [testimonials, setTestimonials] = useState([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const scale = useTransform(scrollY, [0, 300], [1, 0.8])

  useEffect(() => {
    // Load testimonials from API
    fetch('/api/testimonials').then(res => res.json()).then(data => {
      if (data.success && data.testimonials?.length > 0) {
        setTestimonials(data.testimonials)
      }
    }).catch(() => {})

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      if (testimonials.length > 0) {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (data.success) {
        alert('Thank you! We\'ll get back to you soon.')
        setFormData({ name: '', email: '', whatsapp: '', service: '', message: '' })
      } else {
        alert('Something went wrong. Please try again.')
      }
    } catch (error) {
      alert('Error submitting form. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1531169509526-f8f1fdaa4a67?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGdyYWRpZW50fGVufDB8fHxibHVlfDE3NzYxNjUyNzV8MA&ixlib=rb-4.1.0&q=85"
            alt="Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/50 to-[#0A0A0A]"></div>
        </div>
        
        <motion.div 
          style={{ opacity, scale }}
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        >
          <motion.img
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            src="https://customer-assets.emergentagent.com/job_1c2e70d1-2b59-494f-af27-fc00c899fa13/artifacts/8873ezox_The%20Snag%20%20%281%29.png"
            alt="The Snag"
            className="h-24 mx-auto mb-8"
          />
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent"
          >
            Built in Nalanda.<br />Designed for the World.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-[#A1A1AA] max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            The Snag helps founders, brands, and organizations grow through strategy, design, 
            automation, and execution—inspired by the wisdom of Nalanda and the discipline of modern systems.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-semibold px-8 py-6 text-lg"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Book a Call
              <ArrowRight className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 py-6 text-lg"
              onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
            >
              View Work
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="w-6 h-10 border-2 border-[#D4AF37] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#D4AF37] rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1707130871276-434b78941491?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwyfHxhYnN0cmFjdCUyMGdyYWRpZW50fGVufDB8fHxibHVlfDE3NzYxNjUyNzV8MA&ixlib=rb-4.1.0&q=85"
            alt="About Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://customer-assets.emergentagent.com/job_1c2e70d1-2b59-494f-af27-fc00c899fa13/artifacts/4ls9omfh_Sujal%20Nagwanshi.png"
                alt="Sujal Nagwanshi"
                className="rounded-2xl shadow-2xl border-4 border-[#D4AF37]/20"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl font-bold mb-6 text-[#D4AF37]">About The Snag</h2>
              <p className="text-xl text-[#A1A1AA] mb-8 leading-relaxed">
                Founded by <span className="text-white font-semibold">Sujal Nagwanshi</span>, 
                The Snag is a digital-first consultancy rooted in Nalanda, the historic center of learning. 
                We build brands and systems with trust, clarity, and long-term thinking.
              </p>
              <p className="text-lg text-[#A1A1AA] mb-8 leading-relaxed">
                From the land where Buddha taught wisdom and discipline, we bring those values to modern 
                digital execution—helping brands grow with integrity and purpose.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="text-center p-6 bg-gradient-to-br from-[#D4AF37]/10 to-[#3B82F6]/10 rounded-xl border border-[#D4AF37]/20"
                  >
                    <div className="text-4xl font-bold text-[#D4AF37] mb-2">{stat.number}</div>
                    <div className="text-sm text-[#A1A1AA]">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-32 px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1610801653372-eeda4cbcd298?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwcm9mZXNzaW9uYWx8ZW58MHx8fGJsdWV8MTc3NjE2NTI4MHww&ixlib=rb-4.1.0&q=85"
            alt="Services Background"
            className="w-full h-full object-cover opacity-5"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#D4AF37] to-[#3B82F6] bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto">
              Comprehensive digital solutions for modern brands
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <Icon className="w-12 h-12 text-[#D4AF37] mb-4" />
                      <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-sm text-[#A1A1AA]">{service.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="relative py-32 px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1604079628040-94301bb21b91?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYWRpZW50fGVufDB8fHxibHVlfDE3NzYxNjUyNzV8MA&ixlib=rb-4.1.0&q=85"
            alt="Portfolio Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Featured <span className="text-[#D4AF37]">Work</span>
            </h2>
            <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto">
              Trusted by organizations across the world
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-[#3B82F6]/20 hover:border-[#3B82F6] transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#3B82F6] rounded-xl mb-4 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
                    <p className="text-sm text-[#D4AF37] mb-3">{project.type}</p>
                    <p className="text-[#A1A1AA]">{project.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Why Choose <span className="text-[#D4AF37]">The Snag</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex gap-4"
              >
                <CheckCircle2 className="w-8 h-8 text-[#D4AF37] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{reason.title}</h3>
                  <p className="text-[#A1A1AA]">{reason.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
                Client <span className="text-[#D4AF37]">Testimonials</span>
              </h2>
            </motion.div>

            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] p-12 rounded-2xl border border-[#D4AF37]/20 relative"
            >
              <Quote className="w-16 h-16 text-[#D4AF37] opacity-20 absolute top-8 left-8" />
              <p className="text-2xl text-white mb-6 relative z-10 italic">
                "{testimonials[currentTestimonial]?.message}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37] to-[#3B82F6] rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {testimonials[currentTestimonial]?.name?.[0]}
                  </span>
                </div>
                <div>
                  <p className="font-bold text-white">{testimonials[currentTestimonial]?.name}</p>
                  <p className="text-sm text-[#A1A1AA]">{testimonials[currentTestimonial]?.company}</p>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentTestimonial ? 'bg-[#D4AF37] w-8' : 'bg-[#A1A1AA]'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Founder Message */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-[#D4AF37]">
              <img 
                src="https://customer-assets.emergentagent.com/job_1c2e70d1-2b59-494f-af27-fc00c899fa13/artifacts/4ls9omfh_Sujal%20Nagwanshi.png"
                alt="Sujal Nagwanshi"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-3xl font-bold text-[#D4AF37] mb-4">A Message from the Founder</h3>
            <p className="text-2xl text-white italic mb-6 max-w-3xl mx-auto leading-relaxed">
              "Built from Nalanda, the Land of Buddha, with discipline, trust, and consistency."
            </p>
            <p className="text-lg text-[#A1A1AA] max-w-3xl mx-auto">
              — Sujal Nagwanshi, Founder, The Snag
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1717343656288-a1c0c23ba2df?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBwcm9mZXNzaW9uYWx8ZW58MHx8fGJsdWV8MTc3NjE2NTI4MHww&ixlib=rb-4.1.0&q=85"
            alt="Contact Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Let's <span className="text-[#D4AF37]">Connect</span>
            </h2>
            <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto">
              Ready to build something exceptional? Get in touch.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-[#D4AF37]/20">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Input 
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-[#0A0A0A] border-[#D4AF37]/20 text-white placeholder:text-[#A1A1AA]"
                      />
                    </div>
                    <div>
                      <Input 
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-[#0A0A0A] border-[#D4AF37]/20 text-white placeholder:text-[#A1A1AA]"
                      />
                    </div>
                    <div>
                      <Input 
                        placeholder="WhatsApp Number"
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        required
                        className="bg-[#0A0A0A] border-[#D4AF37]/20 text-white placeholder:text-[#A1A1AA]"
                      />
                    </div>
                    <div>
                      <Input 
                        placeholder="Service Needed"
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        required
                        className="bg-[#0A0A0A] border-[#D4AF37]/20 text-white placeholder:text-[#A1A1AA]"
                      />
                    </div>
                    <div>
                      <Textarea 
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="bg-[#0A0A0A] border-[#D4AF37]/20 text-white placeholder:text-[#A1A1AA]"
                      />
                    </div>
                    <Button 
                      type="submit"
                      className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-semibold py-6 text-lg"
                    >
                      Send Message
                      <ArrowRight className="ml-2" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-start gap-4">
                <MapPin className="w-8 h-8 text-[#D4AF37] flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Location</h3>
                  <p className="text-[#A1A1AA]">Biharsharif, Nalanda, Bihar<br />The Land of Buddha</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="w-8 h-8 text-[#D4AF37] flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Email</h3>
                  <p className="text-[#A1A1AA]">hello@thesnag.in</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-8 h-8 text-[#D4AF37] flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Phone</h3>
                  <p className="text-[#A1A1AA]">+91 XXXXX XXXXX</p>
                </div>
              </div>

              <div className="pt-8">
                <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 rounded-full flex items-center justify-center transition-all">
                    <Linkedin className="w-6 h-6 text-[#D4AF37]" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 rounded-full flex items-center justify-center transition-all">
                    <Twitter className="w-6 h-6 text-[#D4AF37]" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 rounded-full flex items-center justify-center transition-all">
                    <Instagram className="w-6 h-6 text-[#D4AF37]" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 rounded-full flex items-center justify-center transition-all">
                    <Facebook className="w-6 h-6 text-[#D4AF37]" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] border-t border-[#D4AF37]/20 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img 
                src="https://customer-assets.emergentagent.com/job_1c2e70d1-2b59-494f-af27-fc00c899fa13/artifacts/8873ezox_The%20Snag%20%20%281%29.png"
                alt="The Snag"
                className="h-16 mb-4"
              />
              <p className="text-[#A1A1AA]">
                Nalanda-First Digital Systems
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="text-[#A1A1AA] hover:text-[#D4AF37] transition-colors">Services</a></li>
                <li><a href="#portfolio" className="text-[#A1A1AA] hover:text-[#D4AF37] transition-colors">Portfolio</a></li>
                <li><a href="#contact" className="text-[#A1A1AA] hover:text-[#D4AF37] transition-colors">Contact</a></li>
                <li><a href="/admin" className="text-[#A1A1AA] hover:text-[#D4AF37] transition-colors">Admin</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Location</h4>
              <p className="text-[#A1A1AA]">
                Biharsharif, Nalanda, Bihar<br />
                The Land of Buddha
              </p>
            </div>
          </div>
          <div className="border-t border-[#D4AF37]/20 pt-8 text-center text-[#A1A1AA]">
            <p>© {new Date().getFullYear()} The Snag. All rights reserved. Built with discipline and wisdom from Nalanda.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
