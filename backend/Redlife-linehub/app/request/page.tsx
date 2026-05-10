"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { AlertCircle, CheckCircle, FileUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function RequestBloodPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    bloodType: "",
    unitsNeeded: "1",
    urgencyLevel: "routine",
    hospitalName: "",
    department: "",
    doctorName: "",
    doctorLicense: "",
    prescriptionFile: null as File | null,
    medicalReason: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, prescriptionFile: files[0] }))
    }
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      alert("Blood request submitted successfully! A doctor will verify within 2 hours.")
      setStep(1)
      setFormData({
        patientName: "",
        age: "",
        bloodType: "",
        unitsNeeded: "1",
        urgencyLevel: "routine",
        hospitalName: "",
        department: "",
        doctorName: "",
        doctorLicense: "",
        prescriptionFile: null,
        medicalReason: "",
      })
      setSubmitted(false)
    }, 1000)
  }

  const isStep1Valid = formData.patientName && formData.age && formData.bloodType && formData.unitsNeeded
  const isStep2Valid = formData.hospitalName && formData.department && formData.doctorName && formData.doctorLicense
  const isStep3Valid = formData.prescriptionFile && formData.medicalReason

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center py-12">
        <Card className="p-12 text-center max-w-md space-y-6">
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-primary fill-primary" />
          </div>
          <h1 className="text-3xl font-bold">Request Submitted</h1>
          <p className="text-muted-foreground">
            Your blood request has been submitted successfully. A verified doctor will review and validate your request
            within 2 hours.
          </p>
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 space-y-1">
            <p className="text-sm font-semibold text-primary">Request ID: #BR-2025-10-001</p>
            <p className="text-xs text-muted-foreground">Save this ID for tracking your request</p>
          </div>
          <Button asChild className="w-full bg-primary hover:bg-accent text-primary-foreground">
            <Link href="/request-status">Track Request</Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-8 text-center space-y-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold">Request Blood</h1>
          <p className="text-muted-foreground">Doctor-verified blood request form</p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          className="mb-8 flex justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {[1, 2, 3].map((s) => (
            <motion.div key={s} className="flex flex-col items-center flex-1" whileHover={{ scale: 1.05 }}>
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all duration-300 ${
                  step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
                animate={{
                  scale: step === s ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
              >
                {s}
              </motion.div>
              <p className="text-xs sm:text-sm text-muted-foreground text-center">
                {s === 1 ? "Patient Info" : s === 2 ? "Doctor Details" : "Documentation"}
              </p>
              {s < 3 && (
                <div
                  className={`hidden sm:block h-1 flex-1 mx-2 transition-all duration-300 ${step > s ? "bg-primary" : "bg-muted"}`}
                ></div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Form Card with AnimatePresence for step transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card className="p-8 mb-6">
              {/* Step 1: Patient Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Patient Information</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Patient Name</label>
                      <Input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Age</label>
                      <Input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="35"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Blood Type Needed</label>
                      <select
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
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
                    <div>
                      <label className="block text-sm font-medium mb-2">Units Needed</label>
                      <Input
                        type="number"
                        name="unitsNeeded"
                        value={formData.unitsNeeded}
                        onChange={handleInputChange}
                        min="1"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-2">Urgency Level</label>
                      <select
                        name="urgencyLevel"
                        value={formData.urgencyLevel}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background"
                      >
                        <option value="routine">Routine (within 24 hours)</option>
                        <option value="urgent">Urgent (within 6 hours)</option>
                        <option value="emergency">Emergency (immediately)</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    onClick={() => setStep(2)}
                    disabled={!isStep1Valid}
                    className="w-full bg-primary hover:bg-accent text-primary-foreground"
                  >
                    Continue
                  </Button>
                </div>
              )}

              {/* Step 2: Doctor Verification */}
              {step === 2 && (
                <div className="space-y-6">
                  <motion.div
                    className="p-4 bg-primary/10 border border-primary/20 rounded-lg flex gap-3"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">
                      This form requires verification by a licensed medical professional. Ensure all doctor information
                      is accurate and current.
                    </p>
                  </motion.div>

                  <h2 className="text-xl font-bold">Doctor Verification</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Hospital/Clinic Name</label>
                      <Input
                        type="text"
                        name="hospitalName"
                        value={formData.hospitalName}
                        onChange={handleInputChange}
                        placeholder="Central Hospital"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Department</label>
                      <Input
                        type="text"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        placeholder="Emergency / Surgery"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Doctor Name</label>
                      <Input
                        type="text"
                        name="doctorName"
                        value={formData.doctorName}
                        onChange={handleInputChange}
                        placeholder="Dr. Jane Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Doctor License Number</label>
                      <Input
                        type="text"
                        name="doctorLicense"
                        value={formData.doctorLicense}
                        onChange={handleInputChange}
                        placeholder="MD-12345678"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!isStep2Valid}
                      className="flex-1 bg-primary hover:bg-accent text-primary-foreground"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Documentation */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold">Medical Documentation</h2>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Medical Reason for Blood Transfusion</label>
                      <textarea
                        name="medicalReason"
                        value={formData.medicalReason}
                        onChange={handleInputChange}
                        placeholder="Describe the medical condition or procedure requiring blood transfusion..."
                        className="w-full px-3 py-2 border border-border rounded-md bg-background min-h-32"
                      />
                    </div>

                    <div className="border-2 border-dashed border-border rounded-lg p-6">
                      <label className="cursor-pointer">
                        <div className="flex flex-col items-center gap-2">
                          <FileUp className="w-8 h-8 text-muted-foreground" />
                          <div className="text-center">
                            <p className="font-medium text-sm">Upload Prescription or Medical Report</p>
                            <p className="text-xs text-muted-foreground">PDF, JPG, or PNG (Max 5MB)</p>
                          </div>
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {formData.prescriptionFile && (
                      <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-primary" />
                        <p className="text-sm text-foreground">{formData.prescriptionFile.name}</p>
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      By submitting this form, you confirm that all information is accurate and that you are an
                      authorized medical professional. Your request will be reviewed by a verified doctor within 2
                      hours.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!isStep3Valid}
                      className="flex-1 bg-primary hover:bg-accent text-primary-foreground"
                    >
                      Submit Request
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
