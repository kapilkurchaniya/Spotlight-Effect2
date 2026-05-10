'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    userType: 'donor',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for your message! We will get back to you within 24 hours.')
    setFormData({ name: '', email: '', subject: '', message: '', userType: 'donor' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? Our team is here to help. Reach out to us through any of the following methods.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Phone className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="font-bold mb-2">Call Us</h3>
            <p className="text-sm text-muted-foreground mb-3">+1 (800) RED-LIFE</p>
            <p className="text-xs text-muted-foreground">Available 24/7</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Mail className="w-6 h-6 text-accent" />
              </div>
            </div>
            <h3 className="font-bold mb-2">Email Us</h3>
            <p className="text-sm text-muted-foreground mb-3">hello@redlifelinehub.org</p>
            <p className="text-xs text-muted-foreground">Within 24 hours</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
            </div>
            <h3 className="font-bold mb-2">Visit Us</h3>
            <p className="text-sm text-muted-foreground mb-3">123 Medical Center Dr</p>
            <p className="text-xs text-muted-foreground">Healthcare City, HC 12345</p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Clock className="w-6 h-6 text-accent" />
              </div>
            </div>
            <h3 className="font-bold mb-2">Office Hours</h3>
            <p className="text-sm text-muted-foreground mb-3">Mon-Fri: 9AM-6PM</p>
            <p className="text-xs text-muted-foreground">Sat-Sun: 10AM-4PM</p>
          </Card>
        </div>

        {/* Contact Form and Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">I am a:</label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="donor">Blood Donor</option>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="hospital">Hospital Admin</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us your message..."
                    rows={6}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-accent text-primary-foreground font-semibold"
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Frequently Asked</h3>
              <div className="space-y-4">
                {[
                  { q: 'How do I become a donor?', a: 'Visit our registration page and complete the health questionnaire.' },
                  { q: 'Is my data private?', a: 'Yes, we comply with HIPAA and encrypt all sensitive information.' },
                  { q: 'How urgent is your support?', a: 'We respond to emergencies within 30 minutes, 24/7.' },
                  { q: 'Do you work with hospitals?', a: 'Yes, we partner with hospitals for inventory management.' },
                ].map((item, idx) => (
                  <div key={idx} className="pb-4 border-b border-border last:border-0 last:pb-0">
                    <p className="font-semibold text-sm mb-1">{item.q}</p>
                    <p className="text-xs text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border-2 border-primary">
              <h3 className="font-bold mb-3">Emergency Support</h3>
              <p className="text-sm text-muted-foreground mb-3">
                For urgent blood requests, call our emergency hotline.
              </p>
              <p className="font-bold text-lg text-primary">+1 (800) 733-3543</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
