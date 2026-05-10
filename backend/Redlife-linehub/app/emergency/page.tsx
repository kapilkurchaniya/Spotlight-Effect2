'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, MessageCircle, MapPin, Clock, AlertCircle, Heart } from 'lucide-react'

interface EmergencyRequest {
  id: string
  bloodType: string
  units: number
  urgencyLevel: 'critical' | 'high' | 'medium'
  location: string
  patientName: string
  reason: string
  timeCreated: string
  donorsMatched: number
}

const EMERGENCY_REQUESTS: EmergencyRequest[] = [
  {
    id: '1',
    bloodType: 'O-',
    units: 5,
    urgencyLevel: 'critical',
    location: 'Apollo Hospital, Bhopal',
    patientName: 'Ram Singh',
    reason: 'Post-operative blood loss',
    timeCreated: '2 mins ago',
    donorsMatched: 3,
  },
  {
    id: '2',
    bloodType: 'A+',
    units: 3,
    urgencyLevel: 'high',
    location: 'Chirayu Hospital, Nakkar Khana',
    patientName: 'Priya Sharma',
    reason: 'Trauma emergency',
    timeCreated: '15 mins ago',
    donorsMatched: 7,
  },
]

export default function EmergencyPage() {
  const [selectedRequest, setSelectedRequest] = useState<EmergencyRequest | null>(null)

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <main className="min-h-screen bg-background py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Heart className="w-10 h-10 text-red-600" />
            Emergency Blood Requests
          </h1>
          <p className="text-muted-foreground">Active critical requests needing immediate donor matching</p>
        </div>

        {/* Emergency Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-950/20">
            <p className="text-sm text-muted-foreground mb-1">Active Emergencies</p>
            <p className="text-3xl font-bold text-red-600">{EMERGENCY_REQUESTS.length}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Avg Response Time</p>
            <p className="text-3xl font-bold text-primary">8 mins</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Donors Available</p>
            <p className="text-3xl font-bold text-accent">{EMERGENCY_REQUESTS.reduce((sum, r) => sum + r.donorsMatched, 0)}</p>
          </Card>
        </div>

        {/* Emergency Requests */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Request List */}
          <div className="lg:col-span-2 space-y-4">
            {EMERGENCY_REQUESTS.map((request) => (
              <Card
                key={request.id}
                className="p-6 border-2 border-red-200 hover:border-red-400 transition-colors cursor-pointer"
                onClick={() => setSelectedRequest(request)}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <p className="text-3xl font-bold text-primary">{request.bloodType}</p>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${getUrgencyColor(request.urgencyLevel)}`}>
                          {request.urgencyLevel.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{request.units} units needed</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent">{request.donorsMatched}</p>
                      <p className="text-xs text-muted-foreground">donors matched</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-600" />
                      <span><strong>Patient:</strong> {request.patientName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-orange-600" />
                      <span><strong>Reason:</strong> {request.reason}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{request.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>Requested {request.timeCreated}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1 bg-primary hover:bg-accent" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Hospital
                    </Button>
                    <Button className="flex-1" variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {selectedRequest ? (
              <Card className="p-6 sticky top-24">
                <h3 className="font-bold mb-4">Request Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Blood Type Needed</p>
                    <p className="text-2xl font-bold text-primary">{selectedRequest.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Quantity</p>
                    <p className="font-semibold">{selectedRequest.units} units</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Location</p>
                    <p className="text-sm">{selectedRequest.location}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Urgency</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getUrgencyColor(selectedRequest.urgencyLevel)}`}>
                      {selectedRequest.urgencyLevel.toUpperCase()}
                    </span>
                  </div>

                  {/* Emergency Contacts */}
                  <div className="pt-4 border-t space-y-3">
                    <Button className="w-full bg-red-600 hover:bg-red-700" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Emergency Call
                    </Button>
                    <Button className="w-full bg-green-600 hover:bg-green-700" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp Alert
                    </Button>
                    <Button className="w-full" variant="outline" size="sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>

                  {/* Matched Donors */}
                  <div className="pt-4 border-t">
                    <p className="text-xs font-semibold text-muted-foreground mb-3">Matched Donors ({selectedRequest.donorsMatched})</p>
                    <div className="space-y-2">
                      {[...Array(Math.min(selectedRequest.donorsMatched, 3))].map((_, idx) => (
                        <div key={idx} className="p-3 bg-primary/5 rounded-lg text-sm">
                          <p className="font-semibold">Donor {idx + 1}</p>
                          <p className="text-xs text-muted-foreground">Distance: {2 + idx} km away</p>
                        </div>
                      ))}
                      {selectedRequest.donorsMatched > 3 && (
                        <p className="text-xs text-muted-foreground text-center">+{selectedRequest.donorsMatched - 3} more available</p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-6 text-center sticky top-24">
                <p className="text-muted-foreground">Select a request to view details</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
