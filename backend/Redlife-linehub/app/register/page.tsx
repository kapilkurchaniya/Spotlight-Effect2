"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowRight, Check, Heart, AlertCircle, Shield } from "lucide-react"
import { useAuth } from "@/components/auth-context"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [step, setStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState<"donor" | "doctor" | "hospital">("donor")

  const [otp, setOtp] = useState("")
  const [generatedOtp, setGeneratedOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    bloodType: "",
    location: "",
    password: "",
    confirmPassword: "",
    aadharCard: "",
    doctorLicense: "",
    hospitalId: "",
  })

  const [healthAnswers, setHealthAnswers] = useState({
    recentDonation: false,
    medication: false,
    chronicDisease: false,
    bloodPressure: false,
    travel: false,
    tattoo: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    console.log("[v0] Input changed:", name, value) // Added debug log
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleHealthChange = (key: string) => {
    setHealthAnswers((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSendOtp = () => {
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(randomOtp)
    setOtpSent(true)
    alert(`OTP sent to ${formData.phone}: ${randomOtp}`)
  }

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setOtpVerified(true)
      alert("Phone number verified successfully!")
    } else {
      alert("Invalid OTP. Please try again.")
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await register({ ...formData, healthAnswers, userType })

      if (userType === "donor") {
        router.push("/donor-dashboard")
      } else if (userType === "doctor") {
        router.push("/doctor-dashboard")
      } else {
        router.push("/hospital-dashboard")
      }
    } catch (err) {
      console.error("Registration failed:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const isStep1Valid =
    formData.fullName &&
    formData.email &&
    formData.phone &&
    formData.dateOfBirth &&
    formData.gender &&
    (userType === "donor" ? formData.bloodType && formData.aadharCard && otpVerified : true) &&
    (userType === "doctor" ? formData.doctorLicense : true) &&
    (userType === "hospital" ? formData.hospitalId : true) &&
    formData.location

  const isStep2Valid =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword &&
    formData.password.length >= 8
  const hasRisks = Object.values(healthAnswers).some((v) => v)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-8 text-center space-y-2 animate-slideInUp">
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text">Become a Life Saver</h1>
          <p className="text-muted-foreground text-lg">Join our network of verified members</p>
        </div>

        {step === 0 && (
          <Card className="p-8 mb-6 glass border-white/20 animate-slideInUp">
            <h2 className="text-2xl font-bold mb-6 text-center">Select Your Role</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  setUserType("donor")
                  setStep(1)
                }}
                className="p-6 rounded-lg border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all text-center group"
              >
                <Heart className="w-12 h-12 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg mb-2">Donor</h3>
                <p className="text-sm text-muted-foreground">Register to donate blood</p>
              </button>
              <button
                onClick={() => {
                  setUserType("doctor")
                  setStep(1)
                }}
                className="p-6 rounded-lg border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all text-center group"
              >
                <Shield className="w-12 h-12 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg mb-2">Doctor</h3>
                <p className="text-sm text-muted-foreground">Register as medical professional</p>
              </button>
              <button
                onClick={() => {
                  setUserType("hospital")
                  setStep(1)
                }}
                className="p-6 rounded-lg border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all text-center group"
              >
                <Heart className="w-12 h-12 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-lg mb-2">Hospital</h3>
                <p className="text-sm text-muted-foreground">Register as blood centre</p>
              </button>
            </div>
          </Card>
        )}

        {step > 0 && (
          <>
            <div className="mb-8 flex justify-between">
              {[1, 2, userType === "donor" ? 3 : null].filter(Boolean).map((s, idx) => (
                <div
                  key={s}
                  className="flex flex-col items-center flex-1 animate-slideInUp"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold mb-2 transition-all duration-300 ${
                      step >= s!
                        ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30"
                        : "bg-muted/50 text-muted-foreground glass border-white/20"
                    }`}
                  >
                    {step > s! ? <Check className="w-5 h-5" /> : s}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                    {s === 1 ? "Personal Info" : s === 2 ? "Security" : "Health Check"}
                  </p>
                </div>
              ))}
            </div>

            <Card className="p-8 mb-6 glass border-white/20 animate-slideInUp [animation-delay:0.2s]">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Tell Us About You</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name</label>
                      <Input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="bg-white/50 dark:bg-slate-800/50 border-white/20 glass"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="bg-white/50 dark:bg-slate-800/50 border-white/20 glass"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        maxLength={10}
                        className="bg-white/50 dark:bg-slate-800/50 border-white/20 glass"
                      />
                    </div>

                    {userType === "donor" && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold mb-2">Aadhar Card Number</label>
                          <Input
                            type="text"
                            name="aadharCard"
                            value={formData.aadharCard}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012"
                            maxLength={12}
                            className="bg-white/50 dark:bg-slate-800/50 border-white/20 glass"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-semibold mb-2">Phone OTP Verification</label>
                          <div className="flex gap-2">
                            <Input
                              type="text"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                              placeholder="Enter OTP"
                              maxLength={6}
                              disabled={!otpSent || otpVerified}
                              className="bg-white/50 dark:bg-slate-800/50 border-white/20 glass"
                            />
                            {!otpVerified && (
                              <Button
                                type="button"
                                onClick={otpSent ? handleVerifyOtp : handleSendOtp}
                                disabled={!formData.phone || formData.phone.length < 10}
                                className="bg-gradient-to-r from-primary to-accent text-white"
                              >
                                {otpSent ? "Verify" : "Send OTP"}
                              </Button>
                            )}
                            {otpVerified && (
                              <div className="flex items-center gap-2 text-green-600 px-4">
                                <Check className="w-5 h-5" />
                                <span className="text-sm font-semibold">Verified</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {userType === "doctor" && (
                      <div>
                        <label className="block text-sm font-semibold mb-2">Medical License Number</label>
                        <Input
                          type="text"
                          name="doctorLicense"
                          value={formData.doctorLicense}
                          onChange={handleInputChange}
                          placeholder="MED-123456"
                          className="bg-white/50 dark:bg-slate-800/50 border-white/20 glass"
                        />
                      </div>
                    )}

                    {userType === "hospital" && (
                      <div>
                        <label className="block text-sm font-semibold mb-2">Hospital ID (Health Ministry)</label>
                        <Input
                          type="text"
                          name="hospitalId"
                          value={formData.hospitalId}
                          onChange={handleInputChange}
                          placeholder="HOSP-1234"
                          className="bg-white/50 dark:bg-slate-800/50 border-white/20 glass"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-semibold mb-2">Date of Birth</label>
                      <Input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="bg-white/50 dark:bg-slate-800/50 border-white/20 glass"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/50 dark:bg-slate-800/50 glass focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {userType === "donor" && (
                      <div>
                        <label className="block text-sm font-semibold mb-2">Blood Type</label>
                        <select
                          name="bloodType"
                          value={formData.bloodType}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-white/20 rounded-lg bg-white/50 dark:bg-slate-800/50 glass focus:ring-2 focus:ring-primary/50 cursor-pointer appearance-auto"
                          style={{ minHeight: "42px" }}
                        >
                          <option value="">Select blood type</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                        </select>
                      </div>
                    )}

                    <div className={userType === "donor" ? "" : "sm:col-span-2"}>
                      <label className="block text-sm font-semibold mb-2">Location</label>
                      <Input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="City, State"
                        className="bg-white/50 dark:bg-slate-800/50 border-white/20 glass"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep(0)}
                      className="flex-1 rounded-full glass border-white/20"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!isStep1Valid}
                      className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold rounded-full glow-effect disabled:opacity-50"
                    >
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Security */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Secure Your Account</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Password</label>
                      <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        minLength={8}
                        className="bg-white/50 dark:bg-slate-800/50 border-white/20 glass"
                      />
                      <p className="text-xs text-muted-foreground mt-1">Minimum 8 characters</p>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Confirm Password</label>
                      <Input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className="bg-white/50 dark:bg-slate-800/50 border-white/20 glass"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-sm text-foreground">
                      Your account will be secured with end-to-end encryption. Your health information is protected
                      under HIPAA regulations.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="flex-1 rounded-full glass border-white/20"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => (userType === "donor" ? setStep(3) : handleSubmit())}
                      disabled={!isStep2Valid}
                      className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold rounded-full glow-effect disabled:opacity-50"
                    >
                      {userType === "donor" ? (
                        <>
                          Continue <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      ) : (
                        <>
                          <Heart className="w-4 h-4 mr-2" />
                          Complete Registration
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Health Questionnaire (Donors Only) */}
              {step === 3 && userType === "donor" && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold">Health Assessment</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Please answer honestly to verify your eligibility to donate blood. This information is confidential
                    and protected.
                  </p>

                  {hasRisks && (
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        You answered "Yes" to some questions. Please contact our medical team for approval.
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    {[
                      { key: "recentDonation", label: "Have you donated blood in the last 56 days?" },
                      { key: "medication", label: "Are you currently taking any medications?" },
                      { key: "chronicDisease", label: "Do you have any chronic diseases or conditions?" },
                      { key: "bloodPressure", label: "Do you have high blood pressure or heart disease?" },
                      { key: "travel", label: "Have you traveled outside the country in the last year?" },
                      { key: "tattoo", label: "Have you received a tattoo or piercing in the last 12 months?" },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className="flex items-start gap-3 cursor-pointer p-4 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 transition-colors glass border-white/10 group"
                      >
                        <input
                          type="checkbox"
                          checked={healthAnswers[item.key as keyof typeof healthAnswers]}
                          onChange={() => handleHealthChange(item.key)}
                          className="mt-1 w-5 h-5 accent-primary cursor-pointer rounded"
                        />
                        <span className="text-sm group-hover:text-primary transition-colors">{item.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="flex-1 rounded-full glass border-white/20"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold rounded-full glow-effect disabled:opacity-50"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Completing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          Complete Registration
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </>
        )}

        {/* Login Link */}
        <div className="text-center animate-slideInUp [animation-delay:0.3s]">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-accent font-semibold transition-colors">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
