'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  LogOut, Trash2, Plus, Edit2, Save, X, Users, Briefcase, 
  MessageSquare, Settings, Eye
} from 'lucide-react'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [leads, setLeads] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [services, setServices] = useState([])
  const [editingItem, setEditingItem] = useState(null)
  const [newItem, setNewItem] = useState({})
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    const savedToken = localStorage.getItem('adminToken')
    if (savedToken) {
      setToken(savedToken)
      setIsAuthenticated(true)
      loadData(savedToken)
    }
  }, [])

  const loadData = async (authToken) => {
    const headers = { 'Authorization': `Bearer ${authToken}` }

    try {
      const [leadsRes, testimonialsRes, portfolioRes, servicesRes] = await Promise.all([
        fetch('/api/leads', { headers }),
        fetch('/api/testimonials'),
        fetch('/api/portfolio'),
        fetch('/api/services')
      ])

      const leadsData = await leadsRes.json()
      const testimonialsData = await testimonialsRes.json()
      const portfolioData = await portfolioRes.json()
      const servicesData = await servicesRes.json()

      if (leadsData.success) setLeads(leadsData.leads || [])
      if (testimonialsData.success) setTestimonials(testimonialsData.testimonials || [])
      if (portfolioData.success) setPortfolio(portfolioData.projects || [])
      if (servicesData.success) setServices(servicesData.services || [])
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await response.json()
      
      if (data.success) {
        setToken(data.token)
        setIsAuthenticated(true)
        localStorage.setItem('adminToken', data.token)
        loadData(data.token)
      } else {
        alert('Invalid password')
      }
    } catch (error) {
      alert('Login failed')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setToken('')
    localStorage.removeItem('adminToken')
  }

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return

    try {
      const response = await fetch(`/api/${type}?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await response.json()
      
      if (data.success) {
        loadData(token)
        alert('Deleted successfully')
      }
    } catch (error) {
      alert('Delete failed')
    }
  }

  const handleAdd = async (type) => {
    try {
      const response = await fetch(`/api/${type}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(newItem)
      })
      const data = await response.json()
      
      if (data.success) {
        loadData(token)
        setShowAddForm(false)
        setNewItem({})
        alert('Added successfully')
      } else {
        alert(data.error || 'Failed to add')
      }
    } catch (error) {
      alert('Add failed')
    }
  }

  const handleUpdate = async (type) => {
    try {
      const response = await fetch(`/api/${type}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(editingItem)
      })
      const data = await response.json()
      
      if (data.success) {
        loadData(token)
        setEditingItem(null)
        alert('Updated successfully')
      }
    } catch (error) {
      alert('Update failed')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-[#D4AF37]/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-[#D4AF37]">
                Admin Login
              </CardTitle>
              <p className="text-center text-[#A1A1AA] mt-2">The Snag Dashboard</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#0A0A0A] border-[#D4AF37]/20 text-white"
                  required
                />
                <Button 
                  type="submit" 
                  className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black font-semibold"
                >
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1A1A1A] to-[#0A0A0A] border-b border-[#D4AF37]/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#D4AF37]">The Snag Admin</h1>
            <p className="text-sm text-[#A1A1AA]">Content Management Dashboard</p>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="border-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/10"
              onClick={() => window.open('/', '_blank')}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Site
            </Button>
            <Button
              variant="outline"
              className="border-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/10"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-[#D4AF37]/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users className="w-12 h-12 text-[#D4AF37]" />
                <div>
                  <p className="text-3xl font-bold text-white">{leads.length}</p>
                  <p className="text-sm text-[#A1A1AA]">Total Leads</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-[#3B82F6]/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Briefcase className="w-12 h-12 text-[#3B82F6]" />
                <div>
                  <p className="text-3xl font-bold text-white">{portfolio.length}</p>
                  <p className="text-sm text-[#A1A1AA]">Portfolio Items</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-[#D4AF37]/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <MessageSquare className="w-12 h-12 text-[#D4AF37]" />
                <div>
                  <p className="text-3xl font-bold text-white">{testimonials.length}</p>
                  <p className="text-sm text-[#A1A1AA]">Testimonials</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-[#3B82F6]/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Settings className="w-12 h-12 text-[#3B82F6]" />
                <div>
                  <p className="text-3xl font-bold text-white">{services.length}</p>
                  <p className="text-sm text-[#A1A1AA]">Services</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="leads" className="w-full">
          <TabsList className="bg-[#1A1A1A] border border-[#D4AF37]/20">
            <TabsTrigger value="leads" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              Leads
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-[#D4AF37] data-[state=active]:text-black">
              Services
            </TabsTrigger>
          </TabsList>

          {/* Leads Tab */}
          <TabsContent value="leads" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-[#D4AF37]/20">
              <CardHeader>
                <CardTitle className="text-[#D4AF37]">Contact Leads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leads.map((lead) => (
                    <div key={lead.id} className="bg-[#0A0A0A] p-4 rounded-lg border border-[#D4AF37]/10">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-[#A1A1AA]">Name</p>
                          <p className="text-white font-semibold">{lead.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-[#A1A1AA]">Email</p>
                          <p className="text-white">{lead.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-[#A1A1AA]">WhatsApp</p>
                          <p className="text-white">{lead.whatsapp}</p>
                        </div>
                        <div>
                          <p className="text-sm text-[#A1A1AA]">Service</p>
                          <p className="text-white">{lead.service}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-sm text-[#A1A1AA]">Message</p>
                          <p className="text-white">{lead.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {leads.length === 0 && (
                    <p className="text-center text-[#A1A1AA] py-8">No leads yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-[#D4AF37]/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-[#D4AF37]">Portfolio Projects</CardTitle>
                  <Button
                    onClick={() => {
                      setShowAddForm(!showAddForm)
                      setNewItem({})
                    }}
                    className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showAddForm && (
                  <div className="bg-[#0A0A0A] p-6 rounded-lg border border-[#D4AF37]/20 mb-6">
                    <h3 className="text-white font-bold mb-4">Add New Project</h3>
                    <div className="space-y-4">
                      <Input
                        placeholder="Project Name"
                        value={newItem.name || ''}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white"
                      />
                      <Input
                        placeholder="Type (e.g., Mobile App, Website)"
                        value={newItem.type || ''}
                        onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                        className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white"
                      />
                      <Textarea
                        placeholder="Description"
                        value={newItem.description || ''}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                        className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleAdd('portfolio')}
                          className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          onClick={() => {
                            setShowAddForm(false)
                            setNewItem({})
                          }}
                          variant="outline"
                          className="border-[#D4AF37]/20 text-[#D4AF37]"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {portfolio.map((project) => (
                    <div key={project.id} className="bg-[#0A0A0A] p-4 rounded-lg border border-[#D4AF37]/10">
                      {editingItem?.id === project.id ? (
                        <div className="space-y-4">
                          <Input
                            value={editingItem.name}
                            onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                            className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white"
                          />
                          <Input
                            value={editingItem.type}
                            onChange={(e) => setEditingItem({ ...editingItem, type: e.target.value })}
                            className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white"
                          />
                          <Textarea
                            value={editingItem.description}
                            onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                            className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleUpdate('portfolio')}
                              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
                            >
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button
                              onClick={() => setEditingItem(null)}
                              variant="outline"
                              className="border-[#D4AF37]/20 text-[#D4AF37]"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                          <p className="text-sm text-[#D4AF37] mb-2">{project.type}</p>
                          <p className="text-[#A1A1AA] mb-4">{project.description}</p>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => setEditingItem(project)}
                              variant="outline"
                              size="sm"
                              className="border-[#D4AF37]/20 text-[#D4AF37]"
                            >
                              <Edit2 className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDelete('portfolio', project.id)}
                              variant="outline"
                              size="sm"
                              className="border-red-500/20 text-red-500"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  {portfolio.length === 0 && (
                    <p className="text-center text-[#A1A1AA] py-8">No portfolio items yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-[#D4AF37]/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-[#D4AF37]">Testimonials</CardTitle>
                  <Button
                    onClick={() => {
                      setShowAddForm(!showAddForm)
                      setNewItem({})
                    }}
                    className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Testimonial
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showAddForm && (
                  <div className="bg-[#0A0A0A] p-6 rounded-lg border border-[#D4AF37]/20 mb-6">
                    <h3 className="text-white font-bold mb-4">Add New Testimonial</h3>
                    <div className="space-y-4">
                      <Input
                        placeholder="Client Name"
                        value={newItem.name || ''}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white"
                      />
                      <Input
                        placeholder="Company"
                        value={newItem.company || ''}
                        onChange={(e) => setNewItem({ ...newItem, company: e.target.value })}
                        className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white"
                      />
                      <Textarea
                        placeholder="Testimonial Message"
                        value={newItem.message || ''}
                        onChange={(e) => setNewItem({ ...newItem, message: e.target.value })}
                        className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white"
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleAdd('testimonials')}
                          className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          onClick={() => {
                            setShowAddForm(false)
                            setNewItem({})
                          }}
                          variant="outline"
                          className="border-[#D4AF37]/20 text-[#D4AF37]"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-[#0A0A0A] p-4 rounded-lg border border-[#D4AF37]/10">
                      {editingItem?.id === testimonial.id ? (
                        <div className="space-y-4">
                          <Input
                            value={editingItem.name}
                            onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                            className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white"
                          />
                          <Input
                            value={editingItem.company}
                            onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                            className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white"
                          />
                          <Textarea
                            value={editingItem.message}
                            onChange={(e) => setEditingItem({ ...editingItem, message: e.target.value })}
                            className="bg-[#1A1A1A] border-[#D4AF37]/20 text-white"
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleUpdate('testimonials')}
                              className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-black"
                            >
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button
                              onClick={() => setEditingItem(null)}
                              variant="outline"
                              className="border-[#D4AF37]/20 text-[#D4AF37]"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <p className="text-white italic mb-4">"{testimonial.message}"</p>
                          <p className="text-[#D4AF37] font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-[#A1A1AA]">{testimonial.company}</p>
                          <div className="flex gap-2 mt-4">
                            <Button
                              onClick={() => setEditingItem(testimonial)}
                              variant="outline"
                              size="sm"
                              className="border-[#D4AF37]/20 text-[#D4AF37]"
                            >
                              <Edit2 className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDelete('testimonials', testimonial.id)}
                              variant="outline"
                              size="sm"
                              className="border-red-500/20 text-red-500"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  {testimonials.length === 0 && (
                    <p className="text-center text-[#A1A1AA] py-8">No testimonials yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="mt-6">
            <Card className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-[#D4AF37]/20">
              <CardHeader>
                <CardTitle className="text-[#D4AF37]">Services (Currently Hardcoded)</CardTitle>
                <p className="text-sm text-[#A1A1AA]">Services are currently displayed from the frontend code</p>
              </CardHeader>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
