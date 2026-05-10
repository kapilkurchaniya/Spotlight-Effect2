'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Clock, CheckCircle, AlertCircle, Users } from 'lucide-react'

export default function RequestStatusPage() {
  const requests = [
    {
      id: '#BR-2025-10-001',
      patient: 'John Doe',
      bloodType: 'O+',
      units: 2,
      status: 'pending',
      doctorVerified: false,
      submittedAt: 'Oct 15, 2:30 PM',
      unitsMatched: 0,
    },
    {
      id: '#BR-2025-10-002',
      patient: 'Jane Smith',
      bloodType: 'A+',
      units: 1,
      status: 'verified',
      doctorVerified: true,
      doctor: 'Dr. James Wilson',
      submittedAt: 'Oct 14, 1:15 PM',
      unitsMatched: 1,
    },
    {
      id: '#BR-2025-10-003',
      patient: 'Robert Brown',
      bloodType: 'B-',
      units: 3,
      status: 'completed',
      doctorVerified: true,
      doctor: 'Dr. Sarah Johnson',
      submittedAt: 'Oct 13, 4:45 PM',
      unitsMatched: 3,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'verified':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'verified':
        return <AlertCircle className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold">Blood Request Status</h1>
          <p className="text-muted-foreground">Track all your blood requests and donations</p>
        </div>

        {/* Requests Grid */}
        <div className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id} className="p-6 border-l-4 border-l-primary hover:shadow-lg transition-shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
                {/* Request Info */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase font-semibold">Request ID</p>
                  <p className="font-mono font-bold text-primary">{request.id}</p>
                </div>

                {/* Patient Info */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase font-semibold">Patient</p>
                  <p className="font-semibold text-foreground">{request.patient}</p>
                  <p className="text-sm text-muted-foreground">{request.bloodType} • {request.units} units</p>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase font-semibold">Status</p>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    <span className="capitalize">{request.status}</span>
                  </div>
                  {request.doctorVerified && (
                    <p className="text-xs text-primary font-medium">✓ Doctor verified</p>
                  )}
                </div>

                {/* Donor Matching */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase font-semibold">Donor Match</p>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent" />
                    <p className="font-bold text-lg">{request.unitsMatched}/{request.units}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{request.unitsMatched} of {request.units} units found</p>
                </div>

                {/* Action */}
                <div className="flex flex-col gap-2 h-full justify-end">
                  <Button size="sm" className="bg-primary hover:bg-accent text-primary-foreground w-full" asChild>
                    <Link href="#">View Details</Link>
                  </Button>
                  {request.status !== 'completed' && (
                    <Button size="sm" variant="outline" className="w-full">
                      Update Status
                    </Button>
                  )}
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  <span>Submitted: {request.submittedAt}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* New Request Button */}
        <div className="mt-8 text-center">
          <Button size="lg" className="bg-primary hover:bg-accent text-primary-foreground" asChild>
            <Link href="/request">Create New Request</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
