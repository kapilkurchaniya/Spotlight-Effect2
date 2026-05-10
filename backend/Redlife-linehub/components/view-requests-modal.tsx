'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle } from 'lucide-react'

interface ViewRequestsModalProps {
  isOpen: boolean
  onClose: () => void
  onUpdate: () => void
}

interface BloodRequest {
  id: number
  requester: string
  bloodGroup: string
  quantity: number
  status: string
  requestDate: string
  urgency?: string
}

export function ViewRequestsModal({ isOpen, onClose, onUpdate }: ViewRequestsModalProps) {
  const [requests, setRequests] = useState<BloodRequest[]>([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    if (isOpen) {
      const savedRequests = JSON.parse(localStorage.getItem('bloodRequests') || '[]')
      setRequests(savedRequests)
    }
  }, [isOpen])

  const handleRequest = (requestId: number, newStatus: string) => {
    const updatedRequests = requests.map(req => {
      if (req.id === requestId) {
        return { ...req, status: newStatus }
      }
      return req
    })
    setRequests(updatedRequests)
    localStorage.setItem('bloodRequests', JSON.stringify(updatedRequests))
    onUpdate()
  }

  const filteredRequests = filter === 'All' 
    ? requests 
    : requests.filter(req => req.status === filter)

  const statusColor = (status: string) => {
    switch(status) {
      case 'Pending': return 'bg-amber-500/10 text-amber-700'
      case 'Approved': return 'bg-green-500/10 text-green-700'
      case 'Rejected': return 'bg-red-500/10 text-red-700'
      default: return 'bg-gray-500/10 text-gray-700'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Blood Requests</DialogTitle>
          <DialogDescription>
            Manage incoming blood requests from hospitals
          </DialogDescription>
        </DialogHeader>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4">
          {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              onClick={() => setFilter(status)}
              size="sm"
            >
              {status}
            </Button>
          ))}
        </div>

        {/* Requests Table */}
        {filteredRequests.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No requests found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRequests.map(req => (
              <div key={req.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center mb-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Requester</p>
                    <p className="font-semibold">{req.requester}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Blood Group</p>
                    <p className="font-bold text-lg text-primary">{req.bloodGroup}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Quantity</p>
                    <p className="font-semibold">{req.quantity} units</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-semibold">{req.requestDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <Badge className={statusColor(req.status)}>
                      {req.status}
                    </Badge>
                  </div>
                </div>

                {req.status === 'Pending' && (
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-green-600 hover:bg-green-50"
                      onClick={() => handleRequest(req.id, 'Approved')}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleRequest(req.id, 'Rejected')}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
