"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Droplet, Mail, Lock, ArrowRight, AlertCircle, CreditCard, Phone, FileCheck, Building2 } from "lucide-react"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

const HOSPITAL_CREDENTIALS = {
  id: "HOSP1234",
  password: "P@ss5678",
  healthMinistryId: "HM-2024-001",
}

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("donor")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const [aadharCard, setAadharCard] = useState("")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [doctorLicense, setDoctorLicense] = useState("")
  const [healthMinistryId, setHealthMinistryId] = useState("")

  const handleSendOtp = () => {
    if (!phone || phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number")
      return
    }
    setOtpSent(true)
    setError("")
    alert(`OTP sent to ${phone}. For demo, use any 6-digit code.`)
  }

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all required fields")
      return
    }

    // Validate based on user type
    if (userType === "donor") {
      if (!aadharCard || aadharCard.length !== 12) {
        setError("Please enter a valid 12-digit Aadhar card number")
        return
      }
      if (!phone || phone.length !== 10) {
        setError("Please enter a valid 10-digit phone number")
        return
      }
      if (!otpSent) {
        setError("Please send OTP to your phone number")
        return
      }
      if (!otp || otp.length !== 6) {
        setError("Please enter the 6-digit OTP")
        return
      }
    } else if (userType === "doctor") {
      if (!doctorLicense) {
        setError("Please enter your doctor license number")
        return
      }
    } else if (userType === "hospital") {
      if (!healthMinistryId) {
        setError("Please enter the Hospital ID given by Health Ministry")
        return
      }
      if (
        email !== HOSPITAL_CREDENTIALS.id ||
        password !== HOSPITAL_CREDENTIALS.password ||
        healthMinistryId !== HOSPITAL_CREDENTIALS.healthMinistryId
      ) {
        setError("Invalid Hospital credentials. Please use the credentials shown below.")
        return
      }
    }

    setIsLoading(true)
    setError("")

    try {
      const userName = email.split("@")[0] || "User"
      await login(email, password, userType, userName)

      // Route to appropriate dashboard
      if (userType === "donor") {
        router.push("/donor-dashboard")
      } else if (userType === "doctor") {
        router.push("/doctor-dashboard")
      } else {
        router.push("/hospital-dashboard")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-muted py-12 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Logo with gradient */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <Droplet className="w-8 h-8 fill-primary" />
            </motion.div>
            <span className="gradient-text">RedLifeline</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="p-8 glass border-white/20">
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Welcome Back</h1>
                <p className="text-muted-foreground">Sign in to continue saving lives</p>
              </div>

              <div className="grid grid-cols-3 gap-2 p-1 bg-muted/50 rounded-full glass">
                {[
                  { value: "donor", label: "Donor" },
                  { value: "doctor", label: "Doctor" },
                  { value: "hospital", label: "Hospital" },
                ].map((type) => (
                  <motion.button
                    key={type.value}
                    onClick={() => {
                      setUserType(type.value)
                      setError("")
                      setOtpSent(false)
                    }}
                    className={`py-2 px-3 rounded-full font-medium text-sm transition-all duration-300 ${
                      userType === type.value
                        ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {type.label}
                  </motion.button>
                ))}
              </div>

              {userType === "hospital" && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-lg animate-slideInUp">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                        Test Hospital Login Credentials
                      </h3>
                      <div className="space-y-1 text-sm">
                        <p className="font-mono text-blue-800 dark:text-blue-200">
                          <span className="font-semibold">ID:</span> {HOSPITAL_CREDENTIALS.id}
                        </p>
                        <p className="font-mono text-blue-800 dark:text-blue-200">
                          <span className="font-semibold">Password:</span> {HOSPITAL_CREDENTIALS.password}
                        </p>
                        <p className="font-mono text-blue-800 dark:text-blue-200">
                          <span className="font-semibold">Health Ministry ID:</span>{" "}
                          {HOSPITAL_CREDENTIALS.healthMinistryId}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300 animate-slideInUp">
                  {error}
                </div>
              )}

              <div className="space-y-4" onKeyPress={handleKeyPress}>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    {userType === "hospital" ? "Hospital ID" : "Email Address"}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      type={userType === "hospital" ? "text" : "email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={userType === "hospital" ? "HOSP1234" : "you@example.com"}
                      className="pl-10 bg-white/50 dark:bg-slate-800/50 border-white/20 glass focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                {userType === "donor" && (
                  <div>
                    <label className="block text-sm font-semibold mb-2">Aadhar Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="text"
                        value={aadharCard}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "").slice(0, 12)
                          setAadharCard(value)
                        }}
                        placeholder="123456789012"
                        maxLength={12}
                        className="pl-10 bg-white/50 dark:bg-slate-800/50 border-white/20 glass focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Enter your 12-digit Aadhar number</p>
                  </div>
                )}

                {userType === "doctor" && (
                  <div>
                    <label className="block text-sm font-semibold mb-2">Doctor License Number</label>
                    <div className="relative">
                      <FileCheck className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="text"
                        value={doctorLicense}
                        onChange={(e) => setDoctorLicense(e.target.value.toUpperCase())}
                        placeholder="MCI-12345678"
                        className="pl-10 bg-white/50 dark:bg-slate-800/50 border-white/20 glass focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Enter your medical council registration number</p>
                  </div>
                )}

                {userType === "hospital" && (
                  <div>
                    <label className="block text-sm font-semibold mb-2">Health Ministry ID</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="text"
                        value={healthMinistryId}
                        onChange={(e) => setHealthMinistryId(e.target.value)}
                        placeholder="HM-2024-001"
                        className="pl-10 bg-white/50 dark:bg-slate-800/50 border-white/20 glass focus:ring-2 focus:ring-primary/50"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Enter ID issued by Health Ministry</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-semibold mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 bg-white/50 dark:bg-slate-800/50 border-white/20 glass focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                {userType === "donor" && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone Number</label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Phone className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                          <Input
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "").slice(0, 10)
                              setPhone(value)
                              setOtpSent(false)
                            }}
                            placeholder="9876543210"
                            maxLength={10}
                            className="pl-10 bg-white/50 dark:bg-slate-800/50 border-white/20 glass focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={phone.length !== 10 || otpSent}
                          variant="outline"
                          className="whitespace-nowrap bg-transparent"
                        >
                          {otpSent ? "OTP Sent" : "Send OTP"}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">Enter your 10-digit mobile number</p>
                    </div>

                    {otpSent && (
                      <div className="animate-slideInUp">
                        <label className="block text-sm font-semibold mb-2">Enter OTP</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                          <Input
                            type="text"
                            value={otp}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                              setOtp(value)
                            }}
                            placeholder="123456"
                            maxLength={6}
                            className="pl-10 bg-white/50 dark:bg-slate-800/50 border-white/20 glass focus:ring-2 focus:ring-primary/50"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Enter the 6-digit OTP sent to your phone</p>
                      </div>
                    )}
                  </>
                )}

                <Link
                  href="#"
                  className="text-sm text-primary hover:text-accent transition-colors font-medium flex justify-end"
                >
                  Forgot password?
                </Link>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold rounded-full glow-effect transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                      Signing in...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Sign In
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </motion.div>

              {/* Register Link */}
              <div className="text-center pt-4 border-t border-white/20">
                <p className="text-sm text-muted-foreground mb-3">Don't have an account?</p>
                <Button variant="outline" asChild className="w-full rounded-full glass border-white/30 bg-transparent">
                  <Link href="/register">Create Account</Link>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Support Link */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Need help?{" "}
          <Link href="/contact" className="text-primary hover:text-accent transition-colors font-medium">
            Contact support
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
