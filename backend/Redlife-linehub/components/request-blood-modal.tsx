'use client'

import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

interface RequestBloodModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
}

const BLOOD_GROUPS = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-']
const HOSPITALS = [
  'AIIMS Delhi Blood Bank',
  'RGPV Hospital Blood Centre',
  'City Hospital Blood Bank',
  'RedCross Blood Bank - Bhopal',
  'Apollo Hospital Blood Centre',
  'Fortis Blood Bank',
  'Max Hospital Blood Centre',
  'Government Hospital Blood Bank'
]

export function RequestBloodModal({ isOpen, onClose, onSubmit }: RequestBloodModalProps) {
  const [formData, setFormData] = useState({
    targetBloodBank: '',
    bloodGroup: '',
    quantity: '',
    urgency: 'Normal',
    notes: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.targetBloodBank || !formData.bloodGroup || !formData.quantity) {
      alert('Please fill all required fields')
      return
    }

    const centreName = localStorage.getItem('bloodCentreName') || 'Current Blood Centre'
    const outgoingRequests = JSON.parse(localStorage.getItem('outgoingRequests') || '[]')
    outgoingRequests.push({
      id: Date.now(),
      requester: centreName,
      targetBloodBank: formData.targetBloodBank,
      bloodGroup: formData.bloodGroup,
      quantity: parseInt(formData.quantity),
      urgency: formData.urgency,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      notes: formData.notes,
    })
    localStorage.setItem('outgoingRequests', JSON.stringify(outgoingRequests))

    alert(`Blood request sent to ${formData.targetBloodBank}`)
    onSubmit()
    onClose()
    setFormData({ targetBloodBank: '', bloodGroup: '', quantity: '', urgency: 'Normal', notes: '' })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Request Blood Now</DialogTitle>
          <DialogDescription>
            Request blood from another hospital or blood bank
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hospital">Select Hospital / Blood Bank *</Label>
            <Select value={formData.targetBloodBank} onValueChange={(value) => setFormData({ ...formData, targetBloodBank: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select hospital" />
              </SelectTrigger>
              <SelectContent>
                {HOSPITALS.map(hospital => (
                  <SelectItem key={hospital} value={hospital}>{hospital}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bloodGroup">Blood Group *</Label>
            <Select value={formData.bloodGroup} onValueChange={(value) => setFormData({ ...formData, bloodGroup: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select blood group" />
              </SelectTrigger>
              <SelectContent>
                {BLOOD_GROUPS.map(group => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Units Required *</Label>
            <Input
              id="quantity"
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="Enter units needed"
              min="1"
              max="50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgency">Urgency Level</Label>
            <Select value={formData.urgency} onValueChange={(value) => setFormData({ ...formData, urgency: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Add any additional information..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary">
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
