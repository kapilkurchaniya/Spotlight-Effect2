"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Droplet, Bell, Calendar, Award, LogOut, User, History, Clock } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/components/auth-context"
import { ThreeWelcome } from "@/components/three-welcome"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { MobileDashboardMenu } from "@/components/mobile-dashboard-menu"

export default function DonorDashboardPage() {
  const router = useRouter()
  const { userName, isLoggedIn, userEmail, userData } = useAuth()
  const [showWelcome, setShowWelcome] = useState(false)
  const [donorName, setDonorName] = useState("")
  const [donorBloodType, setDonorBloodType] = useState("O+")
  const [donorCity, setDonorCity] = useState("Your City")
  const [activeSection, setActiveSection] = useState<string>("overview")

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    const hasShownWelcome = sessionStorage.getItem("hasShownWelcome")
    if (!hasShownWelcome) {
      setShowWelcome(true)
      sessionStorage.setItem("hasShownWelcome", "true")
      setTimeout(() => setShowWelcome(false), 5000)
    }

    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setDonorName(user.userName || user.fullName || userName || "Donor")
      setDonorBloodType(user.bloodType || "O+")
      setDonorCity(user.location || "Your City")
    } else {
      setDonorName(userName || "Donor")
    }
  }, [userName, isLoggedIn, router])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const menuItems = [
    { id: "overview", label: "Overview", icon: User },
    { id: "profile", label: "Profile", icon: User },
    { id: "history", label: "Donation History", icon: History },
    { id: "schedule", label: "Schedule Appointment", icon: Clock },
    { id: "notifications", label: "Notifications", icon: Bell },
  ]

  return (
    <>
      {showWelcome && <ThreeWelcome userName={donorName} userType="donor" />}
      <MobileDashboardMenu items={menuItems} activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h1 className="text-3xl font-bold">Welcome, {donorName}!</h1>
              <p className="text-muted-foreground">Your donor dashboard</p>
              {userData && (
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>Email: {userEmail}</p>
                  {userData.phone && <p>Phone: {userData.phone}</p>}
                </div>
              )}
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" asChild>
                <Link href="/">
                  <LogOut className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="hidden lg:flex flex-wrap gap-2 mb-6">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg"
                      : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              )
            })}
          </div>

          {/* Content Sections */}
          {activeSection === "overview" && (
            <>
              {/* Quick Stats */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  {
                    icon: Droplet,
                    title: "Total Donations",
                    value: "3",
                    subtitle: "Lives saved: 9",
                    color: "primary",
                    fill: true,
                  },
                  {
                    icon: Award,
                    title: "Eligibility Status",
                    value: "Eligible",
                    subtitle: `Next donation possible: ${new Date(Date.now() + 56 * 24 * 60 * 60 * 1000).toLocaleDateString()}`,
                    color: "accent",
                    fill: false,
                  },
                  {
                    icon: Droplet,
                    title: "Blood Type",
                    value: donorBloodType,
                    subtitle: "Common type, high demand",
                    color: "primary",
                    fill: true,
                  },
                ].map((stat, idx) => (
                  <motion.div key={idx} variants={itemVariants}>
                    <motion.div whileHover={{ y: -5, scale: 1.02 }} transition={{ duration: 0.2 }}>
                      <Card className={`p-6 border-2 border-${stat.color}/20`}>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-muted-foreground">{stat.title}</h3>
                            <stat.icon
                              className={`w-5 h-5 text-${stat.color} ${stat.fill ? `fill-${stat.color}` : ""}`}
                            />
                          </div>
                          <p className={`text-3xl font-bold text-${stat.color}`}>{stat.value}</p>
                          <p className="text-sm text-muted-foreground">{stat.subtitle}</p>
                        </div>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <motion.div
                  className="lg:col-span-2 space-y-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {/* Urgent Alert */}
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                    <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary animate-pulse-glow">
                      <div className="flex items-start gap-4">
                        <motion.div
                          className="p-3 bg-primary rounded-lg"
                          animate={{ rotate: [0, 5, -5, 0] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Bell className="w-6 h-6 text-primary-foreground" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1">Urgent Blood Request</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            O+ blood is urgently needed at Central Hospital for an emergency patient.
                          </p>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className="bg-primary hover:bg-accent text-primary-foreground" size="sm">
                              Respond Now
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>

                {/* Right Column */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {/* Donor Stats */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    <Card className="p-6">
                      <h2 className="text-lg font-bold mb-4">Your Impact</h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Lives Saved</span>
                          <motion.span
                            className="text-xl font-bold text-primary"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, type: "spring" }}
                          >
                            9
                          </motion.span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="bg-primary rounded-full h-2"
                            initial={{ width: 0 }}
                            animate={{ width: "60%" }}
                            transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">You're in the top 15% of donors!</p>
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>
              </div>
            </>
          )}

          {activeSection === "profile" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Card className="p-6 border-2 border-accent/20">
                <h2 className="text-xl font-bold mb-4">Your Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Name", value: donorName },
                    { label: "Blood Group", value: donorBloodType },
                    { label: "City", value: donorCity },
                    { label: "Status", value: "Verified", highlight: true },
                  ].map((field, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      <p className="text-sm text-muted-foreground">{field.label}</p>
                      <p className={`font-semibold ${field.highlight ? "text-accent" : ""}`}>{field.value}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeSection === "history" && (
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Recent Donations</h2>
              <div className="space-y-3">
                {[
                  { date: "Oct 15, 2025", location: "Central Blood Bank", units: 1, status: "Completed" },
                  { date: "Jul 18, 2025", location: "Mobile Unit - Downtown", units: 1, status: "Completed" },
                  { date: "Apr 22, 2025", location: "Central Blood Bank", units: 1, status: "Completed" },
                ].map((donation, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-start justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-3 flex-1">
                        <Calendar className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm">{donation.date}</p>
                          <p className="text-xs text-muted-foreground">{donation.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">{donation.units} unit</p>
                        <p className="text-xs text-primary">{donation.status}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          )}

          {activeSection === "schedule" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Card className="p-6 border-2 border-primary/20">
                <h2 className="text-xl font-bold mb-4">Schedule Your Next Donation</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Location</label>
                    <select className="w-full px-3 py-2 border border-border rounded-md bg-background transition-all duration-300 focus:ring-2 focus:ring-primary/50">
                      <option>Central Blood Bank</option>
                      <option>Mobile Unit - Downtown</option>
                      <option>Hospital A</option>
                    </select>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full bg-primary hover:bg-accent text-primary-foreground">
                      Schedule Appointment
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          )}

          {activeSection === "notifications" && (
            <Card className="p-6 h-fit">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </h2>
              <div className="space-y-3">
                {[
                  {
                    id: 1,
                    type: "urgent",
                    message: "O+ blood needed urgently at Central Hospital",
                    time: "2 hours ago",
                  },
                  {
                    id: 2,
                    type: "reminder",
                    message: "You are eligible to donate again. Schedule your appointment.",
                    time: "1 day ago",
                  },
                  { id: 3, type: "info", message: "Thank you! Your last donation saved 3 lives.", time: "7 days ago" },
                ].map((notif, idx) => (
                  <motion.div
                    key={notif.id}
                    className="pb-3 border-b border-border last:border-0 last:pb-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                    whileHover={{ x: -5 }}
                  >
                    <div className="flex gap-2 mb-1">
                      <div
                        className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                          notif.type === "urgent"
                            ? "bg-primary"
                            : notif.type === "reminder"
                              ? "bg-accent"
                              : "bg-muted-foreground"
                        }`}
                      />
                      <p className="text-xs font-medium text-muted-foreground">{notif.time}</p>
                    </div>
                    <p className="text-xs text-foreground">{notif.message}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}
