'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit2, Trash2, PlusIcon } from 'lucide-react'

export default function InventoryManagementPage() {
  const [bloodUnits, setBloodUnits] = useState([
    { id: 1, bloodType: 'O+', units: 45, collected: '2025-10-01', expires: '2025-10-28', status: 'Active' },
    { id: 2, bloodType: 'O-', units: 12, collected: '2025-10-10', expires: '2025-10-15', status: 'Active' },
    { id: 3, bloodType: 'A+', units: 28, collected: '2025-10-03', expires: '2025-10-30', status: 'Active' },
    { id: 4, bloodType: 'A-', units: 8, collected: '2025-10-13', expires: '2025-10-15', status: 'Active' },
  ])

  const [appointments, setAppointments] = useState([
    { id: 1, donor: 'John Smith', bloodType: 'O+', date: '2025-10-20', time: '10:00 AM', status: 'Scheduled' },
    { id: 2, donor: 'Jane Doe', bloodType: 'A+', date: '2025-10-20', time: '02:00 PM', status: 'Scheduled' },
    { id: 3, donor: 'Mike Johnson', bloodType: 'B+', date: '2025-10-21', time: '09:00 AM', status: 'Scheduled' },
  ])

  const [showAddUnit, setShowAddUnit] = useState(false)
  const [newUnit, setNewUnit] = useState({ bloodType: '', units: '', collected: '', expires: '' })

  const handleAddUnit = () => {
    if (newUnit.bloodType && newUnit.units && newUnit.collected && newUnit.expires) {
      setBloodUnits([
        ...bloodUnits,
        {
          id: Math.max(...bloodUnits.map(u => u.id), 0) + 1,
          bloodType: newUnit.bloodType,
          units: parseInt(newUnit.units),
          collected: newUnit.collected,
          expires: newUnit.expires,
          status: 'Active',
        },
      ])
      setNewUnit({ bloodType: '', units: '', collected: '', expires: '' })
      setShowAddUnit(false)
      alert('Blood unit added successfully!')
    }
  }

  const handleDeleteUnit = (id: number) => {
    setBloodUnits(bloodUnits.filter(u => u.id !== id))
    alert('Blood unit removed!')
  }

  const handleCompleteAppointment = (id: number) => {
    const appointment = appointments.find(a => a.id === id)
    if (appointment) {
      alert(`Donation from ${appointment.donor} completed! ${appointment.bloodType} blood unit added to inventory.`)
      setAppointments(appointments.filter(a => a.id !== id))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Inventory Management</h1>
          <p className="text-muted-foreground">Manage blood units, appointments, and donor information</p>
        </div>

        {/* Tabs Navigation */}
        <div className="border-b border-border">
          <div className="flex gap-6">
            <button className="pb-3 px-1 border-b-2 border-primary font-semibold text-foreground">
              Blood Units
            </button>
            <button className="pb-3 px-1 text-muted-foreground hover:text-foreground transition-colors">
              Appointments
            </button>
            <button className="pb-3 px-1 text-muted-foreground hover:text-foreground transition-colors">
              Reports
            </button>
          </div>
        </div>

        {/* Blood Units Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Blood Units</h2>
            <Button
              onClick={() => setShowAddUnit(!showAddUnit)}
              className="bg-primary hover:bg-accent text-primary-foreground"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Add Unit
            </Button>
          </div>

          {/* Add Unit Form */}
          {showAddUnit && (
            <Card className="p-6 bg-primary/5 border-2 border-primary">
              <h3 className="font-bold mb-4">Add New Blood Unit</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Blood Type</label>
                  <select
                    value={newUnit.bloodType}
                    onChange={(e) => setNewUnit({ ...newUnit, bloodType: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm"
                  >
                    <option value="">Select</option>
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
                  <label className="block text-sm font-medium mb-1">Units</label>
                  <Input
                    type="number"
                    value={newUnit.units}
                    onChange={(e) => setNewUnit({ ...newUnit, units: e.target.value })}
                    placeholder="1"
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Collected</label>
                  <Input
                    type="date"
                    value={newUnit.collected}
                    onChange={(e) => setNewUnit({ ...newUnit, collected: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Expires</label>
                  <Input
                    type="date"
                    value={newUnit.expires}
                    onChange={(e) => setNewUnit({ ...newUnit, expires: e.target.value })}
                    className="text-sm"
                  />
                </div>
                <div className="flex gap-2 items-end">
                  <Button
                    onClick={handleAddUnit}
                    size="sm"
                    className="flex-1 bg-primary hover:bg-accent text-primary-foreground"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setShowAddUnit(false)}
                    size="sm"
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Blood Units Table */}
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Blood Type</th>
                    <th className="text-left py-3 px-4 font-semibold">Units</th>
                    <th className="text-left py-3 px-4 font-semibold">Collected</th>
                    <th className="text-left py-3 px-4 font-semibold">Expires</th>
                    <th className="text-left py-3 px-4 font-semibold">Status</th>
                    <th className="text-left py-3 px-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bloodUnits.map((unit) => (
                    <tr key={unit.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-bold text-primary">{unit.bloodType}</td>
                      <td className="py-3 px-4">{unit.units}</td>
                      <td className="py-3 px-4 text-muted-foreground">{unit.collected}</td>
                      <td className="py-3 px-4 text-muted-foreground">{unit.expires}</td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-green-200 text-green-800">
                          {unit.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteUnit(unit.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Appointments Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Upcoming Appointments</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {appointments.map((apt) => (
              <Card key={apt.id} className="p-4 border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-semibold">Donor</p>
                    <p className="font-bold">{apt.donor}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">Blood Type</p>
                      <p className="font-semibold text-primary">{apt.bloodType}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Time</p>
                      <p className="font-semibold">{apt.time}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Date</p>
                    <p className="font-semibold">{apt.date}</p>
                  </div>
                  <Button
                    onClick={() => handleCompleteAppointment(apt.id)}
                    className="w-full bg-primary hover:bg-accent text-primary-foreground text-sm"
                  >
                    Mark Complete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
