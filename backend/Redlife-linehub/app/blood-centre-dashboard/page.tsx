"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Droplet, LogOut, Zap, AlertCircle, Clock, Users, TrendingUp, Edit, Download, Plus } from "lucide-react"
import { UpdateStockModal } from "@/components/update-stock-modal"
import { AddAppointmentModal } from "@/components/add-appointment-modal"
import { ViewRequestsModal } from "@/components/view-requests-modal"
import { RequestBloodModal } from "@/components/request-blood-modal"
import { ThreeWelcome } from "@/components/three-welcome"
import { MobileDashboardMenu } from "@/components/mobile-dashboard-menu"

interface Appointment {
  id: number
  patientName: string
  bloodGroup: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed"
}

const DUMMY_APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    patientName: "Raj Kumar",
    bloodGroup: "O+",
    date: "2025-12-15",
    time: "09:00 AM",
    status: "confirmed",
  },
  {
    id: 2,
    patientName: "Priya Singh",
    bloodGroup: "B+",
    date: "2025-12-15",
    time: "10:30 AM",
    status: "pending",
  },
  {
    id: 3,
    patientName: "Amit Patel",
    bloodGroup: "AB+",
    date: "2025-12-16",
    time: "02:00 PM",
    status: "confirmed",
  },
  {
    id: 4,
    patientName: "Sneha Reddy",
    bloodGroup: "O-",
    date: "2025-12-16",
    time: "03:30 PM",
    status: "pending",
  },
  {
    id: 5,
    patientName: "Vikram Das",
    bloodGroup: "A+",
    date: "2025-12-17",
    time: "11:00 AM",
    status: "completed",
  },
]

export default function BloodCentreDashboard() {
  const router = useRouter()
  const [centreName, setCentreName] = useState("")
  const [centreId, setCentreId] = useState("")
  const [appointments, setAppointments] = useState<Appointment[]>(DUMMY_APPOINTMENTS)
  const [lastLogin, setLastLogin] = useState("")
  const [bloodStock, setBloodStock] = useState<any[]>([])
  const [showWelcome, setShowWelcome] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("overview")

  const [showUpdateStockModal, setShowUpdateStockModal] = useState(false)
  const [showAddAppointmentModal, setShowAddAppointmentModal] = useState(false)
  const [showViewRequestsModal, setShowViewRequestsModal] = useState(false)
  const [showRequestBloodModal, setShowRequestBloodModal] = useState(false)

  useEffect(() => {
    const storedCentreName = localStorage.getItem("bloodCentreName")
    const storedCentreId = localStorage.getItem("centreId")
    const isBloodCentre = localStorage.getItem("isBloodCentre")

    if (!isBloodCentre || !storedCentreName) {
      router.push("/blood-centre-login")
      return
    }

    setCentreName(storedCentreName)
    setCentreId(storedCentreId || "")
    setLastLogin(new Date().toLocaleString())

    const hasShownWelcome = sessionStorage.getItem("hasShownBloodCentreWelcome")
    if (!hasShownWelcome) {
      setShowWelcome(true)
      sessionStorage.setItem("hasShownBloodCentreWelcome", "true")
      setTimeout(() => setShowWelcome(false), 5000)
    }

    loadBloodStock()
    loadAppointments()
  }, [router])

  const loadBloodStock = () => {
    const savedStock = JSON.parse(localStorage.getItem("bloodStockData") || "{}")
    const BLOOD_GROUPS = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]
    const stock = BLOOD_GROUPS.map((type) => ({
      type,
      units: savedStock[type] || 0,
      status: (savedStock[type] || 0) === 0 ? "critical" : (savedStock[type] || 0) < 5 ? "low" : "adequate",
    }))
    setBloodStock(stock)
  }

  const loadAppointments = () => {
    const saved = JSON.parse(localStorage.getItem("appointments") || "[]")
    if (saved.length > 0) {
      setAppointments(saved)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("bloodCentreName")
    localStorage.removeItem("centreId")
    localStorage.removeItem("isBloodCentre")
    localStorage.removeItem("centreEmail")
    router.push("/blood-centre-login")
  }

  const handleGenerateReport = () => {
    const stockData = JSON.parse(localStorage.getItem("bloodStockData") || "{}")
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]")
    const requests = JSON.parse(localStorage.getItem("bloodRequests") || "[]")

    const reportDate = new Date().toLocaleDateString("en-IN")
    const totalStock = Object.values(stockData).reduce((sum: number, qty: any) => sum + qty, 0)
    const pendingRequests = requests.filter((req: any) => req.status === "Pending").length
    const upcomingAppointments = appointments.filter(
      (apt: any) => apt.date >= new Date().toISOString().split("T")[0],
    ).length

    const reportHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Blood Centre Report - ${reportDate}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { text-align: center; border-bottom: 2px solid #c00; padding-bottom: 10px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
          th { background-color: #c00; color: white; font-weight: bold; }
          .stats { display: flex; justify-content: space-around; margin: 30px 0; }
          .stat-box { border: 1px solid #ddd; padding: 15px; text-align: center; border-radius: 5px; }
          .stat-number { font-size: 32px; font-weight: bold; color: #c00; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>RedLifeline Hub Foundation</h1>
          <h2>Blood Centre Dashboard Report</h2>
          <p>Generated on: ${reportDate}</p>
        </div>
        
        <div class="stats">
          <div class="stat-box">
            <div class="stat-number">${totalStock}</div>
            <div>Total Blood Units</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">${pendingRequests}</div>
            <div>Pending Requests</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">${upcomingAppointments}</div>
            <div>Upcoming Appointments</div>
          </div>
        </div>
        
        <h3>Blood Stock Inventory</h3>
        <table>
          <tr><th>Blood Group</th><th>Available Units</th><th>Status</th></tr>
          ${Object.entries(stockData)
            .map(
              ([group, qty]: any) => `
            <tr>
              <td>${group}</td>
              <td>${qty}</td>
              <td>${qty < 5 ? '<span style="color: red;">Low Stock</span>' : '<span style="color: green;">Adequate</span>'}</td>
            </tr>
          `,
            )
            .join("")}
        </table>
        
        <h3>Recent Appointments</h3>
        <table>
          <tr><th>Name</th><th>Blood Group</th><th>Date</th><th>Time</th><th>Status</th></tr>
          ${appointments
            .slice(-10)
            .map(
              (apt: any) => `
            <tr>
              <td>${apt.patientName || apt.name}</td>
              <td>${apt.bloodGroup}</td>
              <td>${apt.date}</td>
              <td>${apt.time}</td>
              <td>${apt.status}</td>
            </tr>
          `,
            )
            .join("")}
        </table>
      </body>
      </html>
    `

    const reportWindow = window.open("", "_blank")
    if (reportWindow) {
      reportWindow.document.write(reportHTML)
      reportWindow.document.close()
    }
  }

  const criticalStock = bloodStock.filter((b) => b.status === "critical").length
  const lowStock = bloodStock.filter((b) => b.status === "low").length
  const totalAppointments = appointments.length
  const pendingAppointments = appointments.filter((a) => a.status === "pending").length

  const menuItems = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "stock", label: "Blood Stock", icon: Droplet },
    { id: "appointments", label: "Appointments", icon: Users },
    { id: "actions", label: "Quick Actions", icon: Zap },
  ]

  return (
    <div className="min-h-screen bg-background">
      <MobileDashboardMenu items={menuItems} activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Droplet className="w-6 h-6 text-primary fill-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Blood Centre</p>
                <p className="font-bold text-lg leading-none">{centreName}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2 bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        {showWelcome && <ThreeWelcome userName={centreName} userType="blood-centre" />}
        <div className="mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Welcome back, {centreName.split(" ")[0]}!</h1>
            <p className="text-muted-foreground">Centre ID: {centreId}</p>
            <p className="text-sm text-muted-foreground">Last login: {lastLogin}</p>
          </div>
        </div>

        {/* Stats Grid */}
        {(activeSection === "overview" || activeSection === "stock" || activeSection === "appointments") && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-muted-foreground">Total Appointments</p>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <p className="text-3xl font-bold">{totalAppointments}</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-muted-foreground">Pending Requests</p>
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <p className="text-3xl font-bold">{pendingAppointments}</p>
                <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
              </div>
            </Card>

            <Card className="p-6 border-destructive/20 bg-destructive/5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-muted-foreground">Critical Stock</p>
                  <div className="p-2 bg-destructive/10 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-destructive">{criticalStock}</p>
                <p className="text-xs text-muted-foreground">Blood groups need urgent replenishment</p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-muted-foreground">Low Stock</p>
                  <div className="p-2 bg-amber-500/10 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
                <p className="text-3xl font-bold">{lowStock}</p>
                <p className="text-xs text-muted-foreground">Monitor for reordering</p>
              </div>
            </Card>
          </div>
        )}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Blood Stock Section */}
            {(activeSection === "overview" || activeSection === "stock") && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Current Blood Stock</h2>
                    <p className="text-sm text-muted-foreground">Real-time inventory status</p>
                  </div>
                  <Button size="sm" onClick={() => setShowUpdateStockModal(true)} className="flex items-center gap-2">
                    <Edit className="w-4 h-4" />
                    Update Stock
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {bloodStock.map((blood) => {
                    const statusColor = {
                      adequate: "border-primary/20 bg-primary/5",
                      low: "border-amber-500/20 bg-amber-500/5",
                      critical: "border-destructive/20 bg-destructive/5",
                    }[blood.status]

                    const textColor = {
                      adequate: "text-primary",
                      low: "text-amber-600",
                      critical: "text-destructive",
                    }[blood.status]

                    return (
                      <div key={blood.type} className={`p-4 border rounded-lg ${statusColor}`}>
                        <p className="text-lg font-bold mb-2">{blood.type}</p>
                        <p className={`text-2xl font-bold ${textColor}`}>{blood.units}</p>
                        <p className="text-xs text-muted-foreground mt-2 capitalize">{blood.status} units</p>
                      </div>
                    )
                  })}
                </div>
              </Card>
            )}

            {/* Appointments Section */}
            {(activeSection === "overview" || activeSection === "appointments") && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">Upcoming Appointments</h2>
                    <p className="text-sm text-muted-foreground">Next 7 days</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setShowAddAppointmentModal(true)}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Appointment
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">Patient Name</th>
                        <th className="text-left py-3 px-4 font-semibold">Blood Group</th>
                        <th className="text-left py-3 px-4 font-semibold">Date & Time</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {appointments.slice(0, 5).map((apt) => (
                        <tr key={apt.id} className="hover:bg-accent/5 transition-colors">
                          <td className="py-3 px-4">{apt.patientName}</td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-primary">{apt.bloodGroup}</span>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {apt.date} at {apt.time}
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                apt.status === "confirmed"
                                  ? "bg-primary/10 text-primary"
                                  : apt.status === "pending"
                                    ? "bg-amber-500/10 text-amber-600"
                                    : "bg-green-500/10 text-green-600"
                              }`}
                            >
                              {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button size="sm" variant="ghost">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View All Appointments
                </Button>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            {(activeSection === "overview" || activeSection === "actions") && (
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    onClick={() => setShowUpdateStockModal(true)}
                    className="w-full justify-start gap-3 bg-primary hover:bg-accent text-primary-foreground"
                  >
                    <Zap className="w-4 h-4" />
                    Update Stock
                  </Button>
                  <Button
                    onClick={() => setShowViewRequestsModal(true)}
                    variant="outline"
                    className="w-full justify-start gap-3"
                  >
                    <Users className="w-4 h-4" />
                    View Requests
                  </Button>
                  <Button
                    onClick={() => setShowAddAppointmentModal(true)}
                    variant="outline"
                    className="w-full justify-start gap-3"
                  >
                    <Plus className="w-4 h-4" />
                    Add Appointment
                  </Button>
                  <Button
                    onClick={handleGenerateReport}
                    variant="outline"
                    className="w-full justify-start gap-3 bg-transparent"
                  >
                    <Download className="w-4 h-4" />
                    Generate Report
                  </Button>
                </div>
              </Card>
            )}

            {/* Critical Alerts */}
            {(activeSection === "overview" || activeSection === "stock") && criticalStock > 0 && (
              <Card className="p-6 border-destructive/20 bg-destructive/5">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-destructive" />
                  <h3 className="text-xl font-bold text-destructive">Critical Alerts</h3>
                </div>
                <div className="space-y-3">
                  {bloodStock
                    .filter((b) => b.status === "critical")
                    .map((blood) => (
                      <div
                        key={blood.type}
                        className="p-3 bg-white/50 dark:bg-background/50 rounded border border-destructive/20"
                      >
                        <p className="text-sm font-semibold">{blood.type} Blood Group</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {blood.units} units left - {blood.units === 0 ? "Out of stock" : "Order immediately"}
                        </p>
                      </div>
                    ))}
                </div>
              </Card>
            )}

            {/* Centre Information */}
            {activeSection === "overview" && (
              <Card className="p-6 bg-primary/5 border-primary/20">
                <h3 className="font-bold mb-4">Centre Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Centre Name</p>
                    <p className="font-semibold">{centreName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Centre ID</p>
                    <p className="font-mono font-semibold">{centreId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Last Login</p>
                    <p className="text-xs">{lastLogin}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Modals */}
      <UpdateStockModal
        isOpen={showUpdateStockModal}
        onClose={() => setShowUpdateStockModal(false)}
        onUpdate={loadBloodStock}
      />
      <AddAppointmentModal
        isOpen={showAddAppointmentModal}
        onClose={() => setShowAddAppointmentModal(false)}
        onAdd={loadAppointments}
      />
      <ViewRequestsModal isOpen={showViewRequestsModal} onClose={() => setShowViewRequestsModal(false)} />
      <RequestBloodModal isOpen={showRequestBloodModal} onClose={() => setShowRequestBloodModal(false)} />
    </div>
  )
}
