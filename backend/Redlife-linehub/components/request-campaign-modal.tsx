'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'

interface RequestCampaignModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RequestCampaignModal({ isOpen, onClose }: RequestCampaignModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    placeType: '',
    institutionName: '',
    address: '',
    city: '',
    startDate: '',
    endDate: '',
    expectedDonors: '',
  })
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.placeType ||
      !formData.institutionName ||
      !formData.address ||
      !formData.city ||
      !formData.startDate ||
      !formData.expectedDonors
    ) {
      alert('Please fill in all required fields')
      return
    }

    // Store campaign request in localStorage
    const requests = JSON.parse(localStorage.getItem('campaignRequests') || '[]')
    requests.push({
      ...formData,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
    })
    localStorage.setItem('campaignRequests', JSON.stringify(requests))

    setSubmitted(true)
    setTimeout(() => {
      onClose()
      setSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        placeType: '',
        institutionName: '',
        address: '',
        city: '',
        startDate: '',
        endDate: '',
        expectedDonors: '',
      })
    }, 2000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-6 h-6" />
        </button>

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="text-5xl">✓</div>
            <p className="font-semibold text-xl">Request Submitted!</p>
            <p className="text-muted-foreground">
              Your campaign request has been submitted. Our team will contact you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="font-bold text-2xl mb-2">Request a Blood Donation Campaign</h3>
              <p className="text-muted-foreground">
                Fill in the details below to request a blood donation campaign in your area.
              </p>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Personal Information</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Campaign Details */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Campaign Details</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Type of Place *</label>
                  <select
                    name="placeType"
                    value={formData.placeType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select type</option>
                    <option value="college">College</option>
                    <option value="school">School</option>
                    <option value="office">Office</option>
                    <option value="society">Society</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Institution/Place Name *</label>
                  <input
                    type="text"
                    name="institutionName"
                    value={formData.institutionName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Full Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">Expected Donors *</label>
                  <input
                    type="number"
                    name="expectedDonors"
                    value={formData.expectedDonors}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    min="1"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Date Range */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Preferred Date Range</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold mb-2 block">End Date (Optional)</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-accent text-primary-foreground"
              >
                Submit Request
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  )
}
