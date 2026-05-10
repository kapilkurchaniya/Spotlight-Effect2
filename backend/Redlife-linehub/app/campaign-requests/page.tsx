"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User, Phone, Mail, MapPin, Calendar, Users, CheckCircle, Clock, XCircle } from "lucide-react"

interface CampaignRequest {
  id: number
  name: string
  email: string
  phone: string
  placeType: string
  placeName: string
  address: string
  city: string
  dateRange: string
  donorsExpected: number
  status: "Pending" | "Approved" | "Rejected" | "Completed"
  submittedDate: string
}

export default function CampaignRequestsPage() {
  const [requests, setRequests] = useState<CampaignRequest[]>([])
  const [filter, setFilter] = useState("All")
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<CampaignRequest | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    placeType: "",
    placeName: "",
    address: "",
    city: "",
    startDate: "",
    endDate: "",
    donorsExpected: "",
  })

  useEffect(() => {
    loadRequests()
  }, [])

  const loadRequests = () => {
    const saved = JSON.parse(localStorage.getItem("campaignRequests") || "[]")
    setRequests(saved)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.placeType ||
      !formData.placeName ||
      !formData.startDate ||
      !formData.endDate
    ) {
      alert("Please fill all required fields")
      return
    }

    const newRequest: CampaignRequest = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      placeType: formData.placeType,
      placeName: formData.placeName,
      address: formData.address,
      city: formData.city,
      dateRange: `${formData.startDate} to ${formData.endDate}`,
      donorsExpected: Number.parseInt(formData.donorsExpected) || 0,
      status: "Pending",
      submittedDate: new Date().toLocaleDateString("en-IN"),
    }

    const updated = [newRequest, ...requests]
    setRequests(updated)
    localStorage.setItem("campaignRequests", JSON.stringify(updated))

    setFormData({
      name: "",
      email: "",
      phone: "",
      placeType: "",
      placeName: "",
      address: "",
      city: "",
      startDate: "",
      endDate: "",
      donorsExpected: "",
    })
    setShowAddForm(false)
    alert("Campaign request submitted successfully!")
  }

  const handleStatusChange = (requestId: number, newStatus: string) => {
    const updated = requests.map((req) =>
      req.id === requestId ? { ...req, status: newStatus as CampaignRequest["status"] } : req,
    )
    setRequests(updated)
    localStorage.setItem("campaignRequests", JSON.stringify(updated))
  }

  const filteredRequests = filter === "All" ? requests : requests.filter((req) => req.status === filter)

  const statusConfig = {
    Pending: { icon: Clock, color: "bg-amber-500/10 text-amber-700", bg: "bg-amber-50" },
    Approved: { icon: CheckCircle, color: "bg-green-500/10 text-green-700", bg: "bg-green-50" },
    Rejected: { icon: XCircle, color: "bg-red-500/10 text-red-700", bg: "bg-red-50" },
    Completed: { icon: CheckCircle, color: "bg-blue-500/10 text-blue-700", bg: "bg-blue-50" },
  }

  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "Pending").length,
    approved: requests.filter((r) => r.status === "Approved").length,
    completed: requests.filter((r) => r.status === "Completed").length,
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold">Campaign Requests</h1>
              <p className="text-muted-foreground mt-2">Manage blood donation campaign requests from organizations</p>
            </div>
            <Button size="lg" onClick={() => setShowAddForm(true)} className="bg-primary">
              + New Request
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Total Requests</p>
              <p className="text-3xl font-bold">{stats.total}</p>
            </Card>
            <Card className="p-4 border-amber-500/20 bg-amber-500/5">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-3xl font-bold text-amber-700">{stats.pending}</p>
            </Card>
            <Card className="p-4 border-green-500/20 bg-green-500/5">
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-3xl font-bold text-green-700">{stats.approved}</p>
            </Card>
            <Card className="p-4 border-blue-500/20 bg-blue-500/5">
              <p className="text-sm text-muted-foreground">Completed</p>
              <p className="text-3xl font-bold text-blue-700">{stats.completed}</p>
            </Card>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {["All", "Pending", "Approved", "Rejected", "Completed"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              onClick={() => setFilter(status)}
              size="sm"
            >
              {status}
            </Button>
          ))}
        </div>

        {/* Requests Grid */}
        {filteredRequests.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">No campaign requests found</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredRequests.map((request) => {
              const config = statusConfig[request.status] || statusConfig["Pending"]
              const StatusIcon = config.icon

              return (
                <Card key={request.id} className={`p-6 hover:shadow-lg transition-shadow ${config.bg}`}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start mb-4">
                    {/* Organization */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground font-semibold uppercase">Organization</p>
                      <div className="space-y-1">
                        <p className="font-bold text-lg">{request.placeName}</p>
                        <p className="text-sm text-muted-foreground">{request.placeType}</p>
                      </div>
                    </div>

                    {/* Contact */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground font-semibold uppercase">Contact Person</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <p className="font-medium text-sm">{request.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <p className="text-sm">{request.phone}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <p className="text-sm truncate">{request.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground font-semibold uppercase">Location</p>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium">{request.city}</p>
                          <p className="text-xs text-muted-foreground">{request.address}</p>
                        </div>
                      </div>
                    </div>

                    {/* Campaign Details */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground font-semibold uppercase">Campaign</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <p className="text-sm">{request.dateRange}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <p className="text-sm font-medium">{request.donorsExpected} donors expected</p>
                        </div>
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground font-semibold uppercase">Status</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <StatusIcon className="w-4 h-4" />
                          <Badge className={config.color}>{request.status}</Badge>
                        </div>
                        {request.status === "Pending" && (
                          <div className="flex gap-2 mt-3">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 hover:bg-green-50 flex-1 bg-transparent"
                              onClick={() => handleStatusChange(request.id, "Approved")}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:bg-red-50 flex-1 bg-transparent"
                              onClick={() => handleStatusChange(request.id, "Rejected")}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submitted Date */}
                  <div className="pt-4 border-t text-xs text-muted-foreground">
                    Submitted on {request.submittedDate}
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Add Request Form Dialog */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Submit Campaign Request</DialogTitle>
            <DialogDescription>Request a blood donation campaign for your organization</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="10-digit mobile number"
                  pattern="[6-9]{1}[0-9]{9}"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="placeType">Place Type *</Label>
                <Select
                  value={formData.placeType}
                  onValueChange={(value) => setFormData({ ...formData, placeType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="College">College</SelectItem>
                    <SelectItem value="School">School</SelectItem>
                    <SelectItem value="Office">Office</SelectItem>
                    <SelectItem value="Society">Society</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="placeName">Organization Name *</Label>
                <Input
                  id="placeName"
                  value={formData.placeName}
                  onChange={(e) => setFormData({ ...formData, placeName: e.target.value })}
                  placeholder="e.g., ABC College"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="City name"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Full address"
                rows={2}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="donorsExpected">Expected Donors *</Label>
                <Input
                  id="donorsExpected"
                  type="number"
                  value={formData.donorsExpected}
                  onChange={(e) => setFormData({ ...formData, donorsExpected: e.target.value })}
                  placeholder="Number of donors"
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end pt-4">
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary">
                Submit Request
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  )
}
