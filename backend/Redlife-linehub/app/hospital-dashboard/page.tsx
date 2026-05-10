"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Calendar, Building, Droplet, FileText, LogOut, Users, Activity, AlertCircle } from "lucide-react"
import { useAuth } from "@/components/auth-context"
import { ThreeWelcome } from "@/components/three-welcome"
import { useRouter } from "next/navigation"
import { MobileDashboardMenu } from "@/components/mobile-dashboard-menu"

interface Campaign {
  id: number
  name: string
  date: string
  location: string
  status: string
}

interface BloodRequest {
  id: number
  targetCenter: string
  bloodGroup: string
  units: number
  urgency: string
  notes: string
  status: string
}

interface PatientRequest {
  id: number
  patientName: string
  bloodGroup: string
  units: number
  priority: string
  date: string
  status: string
}

interface Inventory {
  [key: string]: number
}

export default function HospitalDashboardPage() {
  const router = useRouter()
  const { isLoggedIn, userName } = useAuth()
  const [showWelcome, setShowWelcome] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("overview")

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    const hasShownWelcome = sessionStorage.getItem("hasShownHospitalWelcome")
    if (!hasShownWelcome) {
      setShowWelcome(true)
      sessionStorage.setItem("hasShownHospitalWelcome", "true")
      setTimeout(() => setShowWelcome(false), 5000)
    }
  }, [isLoggedIn, router])

  // Campaigns state
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: 1, name: "Community Blood Drive", date: "2025-11-25", location: "City Hall", status: "Upcoming" },
    { id: 2, name: "College Campus Drive", date: "2025-11-18", location: "State University", status: "Upcoming" },
    { id: 3, name: "Corporate Wellness Day", date: "2025-10-10", location: "Tech Park", status: "Completed" },
  ])
  const [newCampaign, setNewCampaign] = useState({ name: "", date: "", location: "" })

  // Blood requests state
  const [bloodRequests, setBloodRequests] = useState<BloodRequest[]>([
    {
      id: 1,
      targetCenter: "Central Blood Bank",
      bloodGroup: "O+",
      units: 5,
      urgency: "High",
      notes: "Emergency case",
      status: "Pending",
    },
  ])
  const [newRequest, setNewRequest] = useState({ targetCenter: "", bloodGroup: "", units: 0, urgency: "", notes: "" })

  // Patient requests state
  const [patientRequests, setPatientRequests] = useState<PatientRequest[]>([
    {
      id: 1,
      patientName: "John Doe",
      bloodGroup: "A+",
      units: 2,
      priority: "High",
      date: "2025-11-16",
      status: "Pending",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      bloodGroup: "O-",
      units: 3,
      priority: "Critical",
      date: "2025-11-15",
      status: "Fulfilled",
    },
  ])
  const [newPatientRequest, setNewPatientRequest] = useState({
    patientName: "",
    bloodGroup: "",
    units: 0,
    priority: "",
    date: "",
  })

  // Inventory state
  const [inventory, setInventory] = useState<Inventory>({
    "O+": 45,
    "O-": 12,
    "A+": 28,
    "A-": 8,
    "B+": 35,
    "B-": 5,
    "AB+": 22,
    "AB-": 3,
  })
  const [editingBloodType, setEditingBloodType] = useState<string | null>(null)
  const [editValue, setEditValue] = useState<number>(0)

  const handleAddCampaign = () => {
    if (newCampaign.name && newCampaign.date && newCampaign.location) {
      setCampaigns([...campaigns, { id: Date.now(), ...newCampaign, status: "Upcoming" }])
      setNewCampaign({ name: "", date: "", location: "" })
      alert("Campaign added successfully!")
    } else {
      alert("Please fill in all campaign details")
    }
  }

  const handleDeleteCampaign = (id: number) => {
    if (confirm("Are you sure you want to delete this campaign?")) {
      setCampaigns(campaigns.filter((c) => c.id !== id))
      alert("Campaign deleted successfully!")
    }
  }

  const handleAddRequest = () => {
    if (newRequest.targetCenter && newRequest.bloodGroup && newRequest.units > 0 && newRequest.urgency) {
      setBloodRequests([...bloodRequests, { id: Date.now(), ...newRequest, status: "Pending" }])
      setNewRequest({ targetCenter: "", bloodGroup: "", units: 0, urgency: "", notes: "" })
      alert("Blood request submitted successfully!")
    } else {
      alert("Please fill in all required fields")
    }
  }

  const handleDeleteRequest = (id: number) => {
    if (confirm("Are you sure you want to delete this request?")) {
      setBloodRequests(bloodRequests.filter((r) => r.id !== id))
      alert("Request deleted successfully!")
    }
  }

  const handleAddPatientRequest = () => {
    if (
      newPatientRequest.patientName &&
      newPatientRequest.bloodGroup &&
      newPatientRequest.units > 0 &&
      newPatientRequest.priority &&
      newPatientRequest.date
    ) {
      setPatientRequests([...patientRequests, { id: Date.now(), ...newPatientRequest, status: "Pending" }])
      setNewPatientRequest({ patientName: "", bloodGroup: "", units: 0, priority: "", date: "" })
      alert("Patient request added successfully!")
    } else {
      alert("Please fill in all patient request details")
    }
  }

  const handleUpdatePatientRequestStatus = (id: number, status: string) => {
    setPatientRequests(patientRequests.map((r) => (r.id === id ? { ...r, status } : r)))
    alert(`Patient request status updated to: ${status}`)
  }

  const handleDeletePatientRequest = (id: number) => {
    if (confirm("Are you sure you want to delete this patient request?")) {
      setPatientRequests(patientRequests.filter((r) => r.id !== id))
      alert("Patient request deleted successfully!")
    }
  }

  const handleEditInventory = (bloodType: string) => {
    setEditingBloodType(bloodType)
    setEditValue(inventory[bloodType])
  }

  const handleSaveInventory = () => {
    if (editingBloodType) {
      setInventory({ ...inventory, [editingBloodType]: editValue })
      setEditingBloodType(null)
      alert(`${editingBloodType} inventory updated to ${editValue} units`)
    }
  }

  // Inventory chart data
  const inventoryData = Object.entries(inventory).map(([type, units]) => ({
    bloodType: type,
    units,
  }))

  const menuItems = [
    { id: "overview", label: "Overview", icon: Building },
    { id: "campaigns", label: "Campaigns", icon: Calendar },
    { id: "request-blood", label: "Request Blood", icon: Droplet },
    { id: "inventory", label: "Inventory", icon: Building },
    { id: "raise-request", label: "Raise Blood Request", icon: FileText },
  ]

  return (
    <>
      {showWelcome && <ThreeWelcome userName={userName || "Hospital"} userType="hospital" />}
      <MobileDashboardMenu items={menuItems} activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Hospital Blood Centre Dashboard</h1>
            <p className="text-muted-foreground">Manage campaigns, requests, and inventory</p>
          </div>

          {/* Navigation Tabs - Hidden on mobile, use dropdown instead */}
          <div className="hidden lg:flex flex-wrap gap-2">
            {menuItems.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeSection === section.id
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg"
                      : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {section.label}
                </button>
              )
            })}
          </div>

          {/* Overview Section */}
          {activeSection === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-6 border-2 border-primary/20">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Total Inventory</p>
                  <p className="text-3xl font-bold text-primary">
                    {Object.values(inventory).reduce((a, b) => a + b, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Units available</p>
                </Card>
                <Card className="p-6 border-2 border-accent/20">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Campaigns</p>
                  <p className="text-3xl font-bold text-accent">{campaigns.length}</p>
                  <p className="text-xs text-muted-foreground">Active campaigns</p>
                </Card>
                <Card className="p-6 border-2 border-yellow-500/20">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Requests Out</p>
                  <p className="text-3xl font-bold text-yellow-600">{bloodRequests.length}</p>
                  <p className="text-xs text-muted-foreground">Pending requests</p>
                </Card>
                <Card className="p-6 border-2 border-red-500/20">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Patient Requests</p>
                  <p className="text-3xl font-bold text-red-600">
                    {patientRequests.filter((r) => r.status === "Pending").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Needs attention</p>
                </Card>
              </div>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Blood Inventory Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={inventoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bloodType" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="units" fill="#dc2626" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}

          {/* Campaigns Section */}
          {activeSection === "campaigns" && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <LogOut className="w-5 h-5" />
                  Create New Campaign
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Campaign Name</label>
                    <Input
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                      placeholder="Community Blood Drive"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Date</label>
                    <Input
                      type="date"
                      value={newCampaign.date}
                      onChange={(e) => setNewCampaign({ ...newCampaign, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Input
                      value={newCampaign.location}
                      onChange={(e) => setNewCampaign({ ...newCampaign, location: e.target.value })}
                      placeholder="City Hall"
                    />
                  </div>
                </div>
                <Button onClick={handleAddCampaign} className="bg-primary hover:bg-accent">
                  <LogOut className="w-4 h-4 mr-2" />
                  Add Campaign
                </Button>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Campaigns List</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold">Campaign Name</th>
                        <th className="text-left py-3 px-4 font-semibold">Date</th>
                        <th className="text-left py-3 px-4 font-semibold">Location</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((campaign) => (
                        <tr key={campaign.id} className="border-b border-border">
                          <td className="py-3 px-4">{campaign.name}</td>
                          <td className="py-3 px-4">{campaign.date}</td>
                          <td className="py-3 px-4">{campaign.location}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                campaign.status === "Upcoming"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                                  : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              }`}
                            >
                              {campaign.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button onClick={() => handleDeleteCampaign(campaign.id)} variant="destructive" size="sm">
                              <AlertCircle className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {/* Request Blood Section */}
          {activeSection === "request-blood" && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Request Blood from Another Centre</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Target Centre / Hospital</label>
                    <select
                      value={newRequest.targetCenter}
                      onChange={(e) => setNewRequest({ ...newRequest, targetCenter: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    >
                      <option value="">Select centre</option>
                      <option value="Central Blood Bank">Central Blood Bank</option>
                      <option value="City Hospital">City Hospital</option>
                      <option value="Regional Medical Center">Regional Medical Center</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Blood Group</label>
                    <select
                      value={newRequest.bloodGroup}
                      onChange={(e) => setNewRequest({ ...newRequest, bloodGroup: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    >
                      <option value="">Select blood group</option>
                      {Object.keys(inventory).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Units Required</label>
                    <Input
                      type="number"
                      value={newRequest.units || ""}
                      onChange={(e) => setNewRequest({ ...newRequest, units: Number.parseInt(e.target.value) || 0 })}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Urgency</label>
                    <select
                      value={newRequest.urgency}
                      onChange={(e) => setNewRequest({ ...newRequest, urgency: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    >
                      <option value="">Select urgency</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Notes</label>
                    <textarea
                      value={newRequest.notes}
                      onChange={(e) => setNewRequest({ ...newRequest, notes: e.target.value })}
                      placeholder="Additional details..."
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background min-h-[80px]"
                    />
                  </div>
                </div>
                <Button onClick={handleAddRequest} className="bg-primary hover:bg-accent">
                  <Users className="w-4 h-4 mr-2" />
                  Submit Request
                </Button>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Outgoing Requests</h2>
                <div className="space-y-3">
                  {bloodRequests.map((request) => (
                    <div key={request.id} className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{request.targetCenter}</p>
                          <p className="text-sm text-muted-foreground">
                            {request.bloodGroup} - {request.units} units - {request.urgency} priority
                          </p>
                          {request.notes && <p className="text-xs text-muted-foreground mt-1">{request.notes}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              request.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            }`}
                          >
                            {request.status}
                          </span>
                          <Button onClick={() => handleDeleteRequest(request.id)} variant="destructive" size="sm">
                            <AlertCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Inventory Section */}
          {activeSection === "inventory" && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Blood Inventory Management</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(inventory).map(([bloodType, units]) => (
                    <Card key={bloodType} className="p-4 border-2 border-primary/20">
                      <div className="text-center space-y-2">
                        <p className="text-xs text-muted-foreground font-semibold">{bloodType}</p>
                        {editingBloodType === bloodType ? (
                          <div className="space-y-2">
                            <Input
                              type="number"
                              value={editValue}
                              onChange={(e) => setEditValue(Number.parseInt(e.target.value) || 0)}
                              className="text-center"
                            />
                            <div className="flex gap-1">
                              <Button onClick={handleSaveInventory} size="sm" className="flex-1 text-xs">
                                Save
                              </Button>
                              <Button
                                onClick={() => setEditingBloodType(null)}
                                size="sm"
                                variant="outline"
                                className="flex-1 text-xs"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-2xl font-bold text-primary">{units}</p>
                            <Button
                              onClick={() => handleEditInventory(bloodType)}
                              size="sm"
                              variant="outline"
                              className="w-full"
                            >
                              <Activity className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                          </>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* Raise Request Section */}
          {activeSection === "raise-request" && (
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Raise Blood Request for Patient</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Patient Name</label>
                    <Input
                      value={newPatientRequest.patientName}
                      onChange={(e) => setNewPatientRequest({ ...newPatientRequest, patientName: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Blood Group</label>
                    <select
                      value={newPatientRequest.bloodGroup}
                      onChange={(e) => setNewPatientRequest({ ...newPatientRequest, bloodGroup: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    >
                      <option value="">Select blood group</option>
                      {Object.keys(inventory).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Units Needed</label>
                    <Input
                      type="number"
                      value={newPatientRequest.units || ""}
                      onChange={(e) =>
                        setNewPatientRequest({ ...newPatientRequest, units: Number.parseInt(e.target.value) || 0 })
                      }
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <select
                      value={newPatientRequest.priority}
                      onChange={(e) => setNewPatientRequest({ ...newPatientRequest, priority: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    >
                      <option value="">Select priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Required Date</label>
                    <Input
                      type="date"
                      value={newPatientRequest.date}
                      onChange={(e) => setNewPatientRequest({ ...newPatientRequest, date: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleAddPatientRequest} className="bg-primary hover:bg-accent">
                  <Users className="w-4 h-4 mr-2" />
                  Raise Request
                </Button>
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Patient Requests</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold">Patient</th>
                        <th className="text-left py-3 px-4 font-semibold">Blood Group</th>
                        <th className="text-left py-3 px-4 font-semibold">Units</th>
                        <th className="text-left py-3 px-4 font-semibold">Priority</th>
                        <th className="text-left py-3 px-4 font-semibold">Date</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patientRequests.map((request) => (
                        <tr key={request.id} className="border-b border-border">
                          <td className="py-3 px-4">{request.patientName}</td>
                          <td className="py-3 px-4">{request.bloodGroup}</td>
                          <td className="py-3 px-4">{request.units}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                request.priority === "Critical"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                                  : request.priority === "High"
                                    ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                              }`}
                            >
                              {request.priority}
                            </span>
                          </td>
                          <td className="py-3 px-4">{request.date}</td>
                          <td className="py-3 px-4">
                            <select
                              value={request.status}
                              onChange={(e) => handleUpdatePatientRequestStatus(request.id, e.target.value)}
                              className="px-2 py-1 rounded border border-border bg-background text-xs"
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Fulfilled">Fulfilled</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <Button
                              onClick={() => handleDeletePatientRequest(request.id)}
                              variant="destructive"
                              size="sm"
                            >
                              <AlertCircle className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
