"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, FileText } from "lucide-react"
import { useAuth } from "@/components/auth-context"
import { ThreeWelcome } from "@/components/three-welcome"
import { useRouter } from "next/navigation"
import { MobileDashboardMenu } from "@/components/mobile-dashboard-menu"

export default function DoctorDashboardPage() {
  const router = useRouter()
  const { isLoggedIn, userName } = useAuth()
  const [showWelcome, setShowWelcome] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("pending")

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    const hasShownWelcome = sessionStorage.getItem("hasShownDoctorWelcome")
    if (!hasShownWelcome) {
      setShowWelcome(true)
      sessionStorage.setItem("hasShownDoctorWelcome", "true")
      setTimeout(() => setShowWelcome(false), 5000)
    }
  }, [isLoggedIn, router])

  const [pendingRequests, setPendingRequests] = useState([
    {
      id: "#BR-2025-10-001",
      patient: "John Doe",
      age: 45,
      bloodType: "O+",
      units: 2,
      reason: "Post-surgical transfusion required",
      hospital: "Central Hospital",
      doctor: "Dr. Smith",
      submittedAt: "2 hours ago",
    },
    {
      id: "#BR-2025-10-004",
      patient: "Emily Johnson",
      age: 32,
      bloodType: "A-",
      units: 1,
      reason: "Emergency blood loss",
      hospital: "City Medical Center",
      doctor: "Dr. Brown",
      submittedAt: "30 minutes ago",
    },
  ])

  const verifiedRequests = [
    {
      id: "#BR-2025-10-002",
      patient: "Jane Smith",
      bloodType: "A+",
      units: 1,
      status: "In Progress",
      foundUnits: 1,
      verifiedAt: "4 hours ago",
    },
  ]

  const handleApprove = (id: string) => {
    const approvedRequest = pendingRequests.find((r) => r.id === id)
    if (approvedRequest) {
      alert(`Request ${id} has been approved and sent to donors!`)
      setPendingRequests(pendingRequests.filter((r) => r.id !== id))
    }
  }

  const handleReject = (id: string) => {
    const rejectedRequest = pendingRequests.find((r) => r.id === id)
    if (rejectedRequest) {
      const reason = prompt("Please provide a reason for rejection:")
      if (reason) {
        alert(`Request ${id} has been rejected. Reason: ${reason}`)
        setPendingRequests(pendingRequests.filter((r) => r.id !== id))
      }
    }
  }

  const menuItems = [
    { id: "pending", label: "Pending Review", icon: AlertCircle },
    { id: "verified", label: "Verified Requests", icon: CheckCircle },
  ]

  return (
    <>
      {showWelcome && <ThreeWelcome userName={userName || "Doctor"} userType="doctor" />}
      <MobileDashboardMenu items={menuItems} activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome, Dr. {userName}!</h1>
            <p className="text-muted-foreground">Review and verify blood requests from healthcare providers</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 border-2 border-accent/20">
              <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Pending Review</p>
              <p className="text-2xl font-bold text-accent">{pendingRequests.length}</p>
            </Card>
            <Card className="p-4 border-2 border-primary/20">
              <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Verified Today</p>
              <p className="text-2xl font-bold text-primary">12</p>
            </Card>
            <Card className="p-4 border-2 border-green-500/20">
              <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Completed</p>
              <p className="text-2xl font-bold text-green-600">8</p>
            </Card>
            <Card className="p-4 border-2 border-red-500/20">
              <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Rejected</p>
              <p className="text-2xl font-bold text-red-600">2</p>
            </Card>
          </div>

          {/* Pending Requests */}
          <div className="space-y-6">
            {activeSection === "pending" && (
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-accent" />
                  Pending Verification
                </h2>

                <div className="space-y-4">
                  {pendingRequests.length > 0 ? (
                    pendingRequests.map((request) => (
                      <Card key={request.id} className="p-6 border-l-4 border-l-accent">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Request ID</p>
                            <p className="font-mono font-bold text-accent">{request.id}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Patient</p>
                            <p className="font-semibold">{request.patient}</p>
                            <p className="text-sm text-muted-foreground">
                              {request.age} years • {request.bloodType}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Units Needed</p>
                            <p className="font-bold text-lg">{request.units}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Hospital</p>
                            <p className="text-sm">{request.hospital}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Submitted</p>
                            <p className="text-sm">{request.submittedAt}</p>
                          </div>
                        </div>

                        <div className="mb-4 p-3 bg-muted rounded-lg">
                          <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Medical Reason</p>
                          <p className="text-sm">{request.reason}</p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleApprove(request.id)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve Request
                          </Button>
                          <Button onClick={() => handleReject(request.id)} variant="destructive" className="flex-1">
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject Request
                          </Button>
                          <Button variant="outline" className="flex-1 bg-transparent">
                            <FileText className="w-4 h-4 mr-2" />
                            View Documents
                          </Button>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <Card className="p-8 text-center">
                      <p className="text-muted-foreground">No pending requests for verification</p>
                    </Card>
                  )}
                </div>
              </div>
            )}

            {/* Verified Requests */}
            {activeSection === "verified" && (
              <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Verified Requests
                </h2>

                <div className="space-y-4">
                  {verifiedRequests.map((request) => (
                    <Card key={request.id} className="p-6 border-l-4 border-l-green-600">
                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Request ID</p>
                          <p className="font-mono font-bold text-green-600">{request.id}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                            Patient & Blood Type
                          </p>
                          <p className="font-semibold">{request.patient}</p>
                          <p className="text-sm text-muted-foreground">{request.bloodType}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Units Status</p>
                          <p className="text-sm font-semibold">
                            {request.foundUnits}/{request.units} found
                          </p>
                          <p className="text-sm text-muted-foreground">{request.status}</p>
                        </div>
                        <div className="flex items-end">
                          <Button variant="outline" size="sm" className="w-full bg-transparent">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
